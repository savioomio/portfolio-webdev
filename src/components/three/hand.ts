import {
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { handPoses, openHand } from "@/content/handPoses";
import { lerp } from "@/lib/utils";
import { createMiniScene } from "./miniScene";

const FINGERS = ["ind", "med", "ane", "min"] as const;
const FINGER_LENGTHS = [
  [0.62, 0.42, 0.32],
  [0.68, 0.46, 0.34],
  [0.62, 0.43, 0.32],
  [0.48, 0.33, 0.27],
];
const FINGER_X = [0.58, 0.2, -0.19, -0.57];
const HAND_YAW = -0.2;

/**
 * Mão robótica modelada aqui, peça por peça, com o mesmo esqueleto da mão real:
 * três falanges em cada dedo, polegar opositor e pinos nas articulações.
 */
export function createHandScene(canvas: HTMLCanvasElement, reduced: boolean) {
  const stage = createMiniScene(canvas, 24);
  stage.scene.add(new HemisphereLight(0xfff6e6, 0x6a55c8, 1.6));
  const key = new DirectionalLight(0xfff0d6, 2.3);
  key.position.set(-2.4, 3, 4);
  stage.scene.add(key);
  const rim = new DirectionalLight(0xd9ccff, 1);
  rim.position.set(3, 1, -3);
  stage.scene.add(rim);

  const shell = new MeshStandardMaterial({ color: "#EDE0C4", roughness: 0.58 });
  const dark = new MeshStandardMaterial({ color: "#2B2158", roughness: 0.5 });
  const pinMaterial = new MeshStandardMaterial({
    color: "#F5B800",
    roughness: 0.4,
    metalness: 0.3,
  });
  const nodes: Record<string, Group> = {};

  const turn = new Group();
  stage.scene.add(turn);
  const palm = new Group();
  turn.add(palm);

  const addSegment = (parent: Group, length: number, width: number, depth: number) => {
    const segment = new Mesh(
      new RoundedBoxGeometry(width, length * 0.93, depth, 3, Math.min(width, depth) * 0.3),
      shell,
    );
    segment.position.y = length / 2;
    const pin = new Mesh(new CylinderGeometry(width * 0.3, width * 0.3, width * 1.06, 18), dark);
    pin.rotation.z = Math.PI / 2;
    const cap = new Mesh(
      new CylinderGeometry(width * 0.13, width * 0.13, width * 1.12, 12),
      pinMaterial,
    );
    cap.rotation.z = Math.PI / 2;
    parent.add(segment, pin, cap);
  };

  const buildChain = (name: string, root: Group, lengths: number[], width: number) => {
    let parent = root;
    lengths.forEach((length, i) => {
      const joint = new Group();
      joint.position.y = i === 0 ? 0 : lengths[i - 1];
      parent.add(joint);
      addSegment(joint, length, width * (1 - i * 0.07), width * 0.86);
      nodes[`${name}${i + 1}`] = joint;
      parent = joint;
    });
  };

  // Palma, com a placa escura onde passam os tendões
  const palmBody = new Mesh(new RoundedBoxGeometry(1.62, 1.66, 0.46, 4, 0.15), shell);
  palmBody.position.y = 0.05;
  const plate = new Mesh(new RoundedBoxGeometry(1.24, 1.2, 0.06, 3, 0.03), dark);
  plate.position.set(0, 0.03, 0.225);
  palm.add(palmBody, plate);

  FINGER_X.forEach((x, i) => {
    const tendon = new Mesh(new CylinderGeometry(0.018, 0.018, 1.16, 8), pinMaterial);
    tendon.position.set(x * 0.92, 0.03, 0.262);
    palm.add(tendon);

    const base = new Group();
    base.position.set(x, 0.9, 0);
    palm.add(base);
    buildChain(FINGERS[i], base, FINGER_LENGTHS[i], i === 3 ? 0.31 : 0.34);
  });

  // Punho e antebraço
  const wrist = new Mesh(new CylinderGeometry(0.52, 0.58, 0.26, 32), dark);
  wrist.position.y = -0.9;
  const forearm = new Mesh(new CylinderGeometry(0.56, 0.7, 1.5, 32), shell);
  forearm.position.y = -1.76;
  palm.add(wrist, forearm);

  // Polegar: sai da lateral da palma e cruza a frente dela ao fechar
  const thumbBase = new Group();
  thumbBase.position.set(0.72, -0.42, 0.1);
  thumbBase.rotation.z = -0.78;
  palm.add(thumbBase);
  buildChain("pol", thumbBase, [0.64, 0.46, 0.36], 0.38);

  const current = { t: 0.1, f: [0, 0, 0, 0], k: [0, 0, 0, 0], sp: 0 };
  const target = { t: 0.1, f: [0, 0, 0, 0], k: [0, 0, 0, 0], sp: 0 };

  const apply = () => {
    FINGERS.forEach((name, i) => {
      const curl = current.f[i];
      const hook = current.k[i];
      nodes[`${name}1`].rotation.x = curl * (1.42 - hook * 0.9);
      nodes[`${name}2`].rotation.x = curl * 1.56;
      nodes[`${name}3`].rotation.x = curl * 1.12;
    });
    nodes.ind1.rotation.z = -0.2 * current.sp;
    nodes.med1.rotation.z = 0.1 * current.sp;
    nodes.pol1.rotation.z = current.t * 1.12;
    nodes.pol1.rotation.x = current.t * 0.82;
    nodes.pol2.rotation.x = current.t * 0.62;
    nodes.pol3.rotation.x = current.t * 0.58;
  };
  apply();

  const frameCamera = () => {
    const small = canvas.clientWidth < 420;
    stage.camera.position.set(0, 0.42, small ? 14 : 9.4);
    stage.camera.lookAt(0, 0.42, 0);
  };
  frameCamera();

  return {
    set(letter: string) {
      const pose = handPoses[letter] ?? openHand;
      target.t = pose.t;
      target.f = [...pose.f];
      target.k = [...(pose.k ?? [0, 0, 0, 0])];
      target.sp = pose.sp ?? 0;
      if (reduced) {
        Object.assign(current, {
          t: target.t,
          f: [...target.f],
          k: [...target.k],
          sp: target.sp,
        });
        apply();
      }
    },
    size() {
      stage.size();
      frameCamera();
    },
    draw(time: number, pointerX: number) {
      const amount = reduced ? 1 : 0.17;
      current.t = lerp(current.t, target.t, amount);
      current.sp = lerp(current.sp, target.sp, amount);
      for (let i = 0; i < 4; i++) {
        current.f[i] = lerp(current.f[i], target.f[i], amount);
        current.k[i] = lerp(current.k[i], target.k[i], amount);
      }
      apply();
      turn.rotation.y = HAND_YAW + (reduced ? 0 : Math.sin(time * 0.5) * 0.09) + pointerX * 0.22;
      stage.renderer.render(stage.scene, stage.camera);
    },
    dispose() {
      stage.renderer.dispose();
    },
  };
}

export type HandScene = ReturnType<typeof createHandScene>;
