import {
  BufferAttribute,
  BufferGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { createMiniScene } from "./miniScene";

interface MeshPart {
  v: number;
  i: number;
  o: number;
}

/** Malha compactada: posições em Int16, normais em Int8 e índices em Uint16. */
async function loadWinchGeometry() {
  const [[part], buffer] = await Promise.all([
    fetch("/media/guincho.json").then((response) => response.json() as Promise<MeshPart[]>),
    fetch("/media/guincho.bin").then((response) => response.arrayBuffer()),
  ]);
  const positions = new Int16Array(buffer.slice(part.o, part.o + part.v * 6));
  const normals = new Int8Array(buffer.slice(part.o + part.v * 6, part.o + part.v * 9));
  const indices = new Uint16Array(
    buffer.slice(part.o + part.v * 9, part.o + part.v * 9 + part.i * 2),
  );
  const position = new Float32Array(part.v * 3);
  const normal = new Float32Array(part.v * 3);
  for (let i = 0; i < part.v * 3; i++) {
    position[i] = positions[i] / 16000;
    normal[i] = normals[i] / 127;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(position, 3));
  geometry.setAttribute("normal", new BufferAttribute(normal, 3));
  geometry.setIndex(new BufferAttribute(indices, 1));
  return geometry;
}

/** Guincho do drone: gira sozinho e responde ao arraste. */
export async function createWinchScene(canvas: HTMLCanvasElement, reduced: boolean) {
  const stage = createMiniScene(canvas, 24);
  stage.scene.add(new HemisphereLight(0xffffff, 0x1d4f9c, 1.7));
  const key = new DirectionalLight(0xfff2dc, 2.7);
  key.position.set(3, 4, 5);
  stage.scene.add(key);

  const mesh = new Mesh(
    await loadWinchGeometry(),
    new MeshStandardMaterial({ color: "#F5B800", roughness: 0.44, metalness: 0.1 }),
  );
  mesh.rotation.x = Math.PI / 2;
  const turn = new Group();
  turn.add(mesh);
  stage.scene.add(turn);
  stage.camera.position.set(0, 1.9, 5.8);
  stage.camera.lookAt(0, 0, 0);

  let spin = 0.7;
  let dragX: number | null = null;
  let velocity = 0;
  const box = canvas.parentElement as HTMLElement;

  const onDown = (event: PointerEvent) => {
    dragX = event.clientX;
    velocity = 0;
    box.setPointerCapture(event.pointerId);
  };
  const onMove = (event: PointerEvent) => {
    if (dragX === null) return;
    velocity = (event.clientX - dragX) * 0.012;
    spin += velocity;
    dragX = event.clientX;
  };
  const onUp = () => {
    dragX = null;
  };
  box.addEventListener("pointerdown", onDown);
  box.addEventListener("pointermove", onMove);
  box.addEventListener("pointerup", onUp);
  box.addEventListener("pointercancel", onUp);

  return {
    size: stage.size,
    draw() {
      if (dragX === null && !reduced) {
        spin += 0.006 + velocity;
        velocity *= 0.94;
      }
      turn.rotation.set(0.1, spin, 0);
      stage.renderer.render(stage.scene, stage.camera);
    },
    dispose() {
      box.removeEventListener("pointerdown", onDown);
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerup", onUp);
      box.removeEventListener("pointercancel", onUp);
      stage.release();
    },
  };
}

export type WinchScene = Awaited<ReturnType<typeof createWinchScene>>;
