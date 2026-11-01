import {
  BackSide,
  BufferGeometry,
  CanvasTexture,
  CircleGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Float32BufferAttribute,
  FrontSide,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PCFShadowMap,
  PerspectiveCamera,
  Plane,
  PlaneGeometry,
  Raycaster,
  SRGBColorSpace,
  Scene,
  Shape,
  ShapeGeometry,
  ShadowMaterial,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
  type BufferGeometry as Geometry,
  type Material,
  type Object3D,
} from "three";
import { brandLogos, type Brand } from "@/content/brandLogos";
import { stores } from "@/content/site";
import { clamp, ease, lerp } from "@/lib/utils";

type Point = [number, number];

interface LineBuffer {
  p: number[];
  i: number[];
}

interface FoldPanel {
  pivot: Group;
  alongX: boolean;
  sign: number;
  angle: number;
  from: number;
  to: number;
  /** Faixa em que o painel volta a abrir, como a aba do envelope. */
  reopen?: [number, number, number];
}

interface Sheet {
  root: Group;
  panels: FoldPanel[];
  lineMat: MeshBasicMaterial;
  outer: MeshStandardMaterial;
  handles?: Mesh[];
  seal?: Group;
  foldMat?: MeshBasicMaterial;
  letter?: Mesh;
  letterRange?: [number, number];
}

interface PanelOptions {
  at: Point;
  dir: "x+" | "x-" | "z+" | "z-";
  len: number;
  wid: number;
  angle: number;
  from: number;
  to: number;
  tri?: boolean;
  /** Arredonda a ponta do triângulo. */
  round?: boolean;
  joined?: boolean;
  print?: CanvasTexture;
  lift?: number;
  reopen?: [number, number, number];
}

const LINE_GOLD = "#D9A000";
const logoPath = (brand: Brand) => brandLogos[brand].paths.map((path) => new Path2D(path.d));

/** Imprime o logo e uma legenda em branco, como se fossem tinta na embalagem. */
function printedTexture(brand: Brand, subtitle: string) {
  const logo = brandLogos[brand];
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const scale = Math.min(760 / logo.width, 300 / logo.height);
  ctx.fillStyle = "#fff";
  ctx.save();
  ctx.translate(512 - (logo.width * scale) / 2, 214 - (logo.height * scale) / 2);
  ctx.scale(scale, scale);
  logoPath(brand).forEach((path) => ctx.fill(path, "evenodd"));
  ctx.restore();
  ctx.textAlign = "center";
  ctx.font = "900 74px Nunito, system-ui, sans-serif";
  ctx.fillText(subtitle, 512, 452);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** A página que sobe de dentro do envelope: um site pequeno, com o logo e a contagem. */
function sitePageTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 744;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, 1024, 744);

  ctx.fillStyle = "#123F55";
  ctx.fillRect(0, 0, 1024, 44);
  ["#F71963", "#F5B800", "#FFFFFF"].forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(34 + i * 30, 22, 9, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#21759B";
  ctx.fillRect(0, 44, 1024, 250);
  ctx.save();
  ctx.translate(58, 84);
  ctx.scale(170 / 24, 170 / 24);
  ctx.fillStyle = "#FFFFFF";
  logoPath("wordpress").forEach((path) => ctx.fill(path, "evenodd"));
  ctx.restore();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 84px Nunito, system-ui, sans-serif";
  ctx.fillText(`${stores.wordpress} projetos`, 268, 160);
  ctx.fillText("reais", 268, 244);

  ctx.fillStyle = "#F5B800";
  ctx.beginPath();
  ctx.roundRect(58, 330, 300, 66, 14);
  ctx.fill();
  ctx.fillStyle = "#1D1809";
  ctx.font = "900 34px Nunito, system-ui, sans-serif";
  ctx.fillText("Publicado", 124, 375);

  ctx.fillStyle = "#D5DEE3";
  [
    [58, 440, 908],
    [58, 482, 860],
    [58, 524, 896],
    [58, 566, 640],
  ].forEach(([x, y, width]) => {
    ctx.beginPath();
    ctx.roundRect(x, y, width, 20, 10);
    ctx.fill();
  });

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** Face do selo: o W em relevo, com a luz marcando o desenho. */
function sealTextures() {
  const draw = (background: string, ink: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 512;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, 512, 512);
    ctx.save();
    ctx.translate(72, 72);
    ctx.scale(368 / 24, 368 / 24);
    ctx.fillStyle = ink;
    logoPath("wordpress").forEach((path) => ctx.fill(path, "evenodd"));
    ctx.restore();
    return new CanvasTexture(canvas);
  };
  const map = draw("#F5B800", "#7A5600");
  map.colorSpace = SRGBColorSpace;
  return { map, bumpMap: draw("#FFFFFF", "#000000") };
}

function addQuad(buffer: LineBuffer, a: Point, b: Point, width: number) {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const length = Math.hypot(dx, dz) || 1;
  const nx = ((-dz / length) * width) / 2;
  const nz = ((dx / length) * width) / 2;
  const index = buffer.p.length / 3;
  buffer.p.push(
    a[0] + nx,
    0.004,
    a[1] + nz,
    b[0] + nx,
    0.004,
    b[1] + nz,
    b[0] - nx,
    0.004,
    b[1] - nz,
    a[0] - nx,
    0.004,
    a[1] - nz,
  );
  buffer.i.push(index, index + 1, index + 2, index, index + 2, index + 3);
}

function addStroke(buffer: LineBuffer, a: Point, b: Point, dashed = false) {
  if (!dashed) return addQuad(buffer, a, b, 0.03);
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
  for (let u = 0; u < length; u += 0.25) {
    const end = Math.min(length, u + 0.15);
    addQuad(
      buffer,
      [lerp(a[0], b[0], u / length), lerp(a[1], b[1], u / length)],
      [lerp(a[0], b[0], end / length), lerp(a[1], b[1], end / length)],
      0.03,
    );
  }
}

function linesMesh(buffer: LineBuffer, material: Material) {
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(buffer.p, 3));
  geometry.setIndex(buffer.i);
  return new Mesh(geometry, material);
}

/** Cria o motor da faca: uma folha plana que dobra em caixa, sacola e envelope. */
export function createFacaScene(canvas: HTMLCanvasElement, reduced: boolean) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  const lowPower = window.innerWidth <= 860;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.5 : 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 60);
  scene.add(new HemisphereLight(0xffffff, 0xf2e4c0, 2.45));
  const sun = new DirectionalLight(0xffffff, 2.9);
  sun.position.set(-6, 10, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(lowPower ? 1024 : 2048, lowPower ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 30 });
  sun.shadow.radius = 8;
  sun.shadow.bias = -0.0006;
  scene.add(sun);

  const floor = new Mesh(new PlaneGeometry(70, 70), new ShadowMaterial({ opacity: 0.2 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.015;
  floor.receiveShadow = true;
  scene.add(floor);

  const inner = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.9,
    side: FrontSide,
    shadowSide: DoubleSide,
  });
  const lineMaterial = new MeshBasicMaterial({
    color: new Color(LINE_GOLD),
    side: DoubleSide,
    transparent: true,
  });
  const outerOf = (hex: string) =>
    new MeshStandardMaterial({
      color: new Color(hex),
      roughness: 0.5,
      side: BackSide,
      shadowSide: DoubleSide,
    });

  function addFaces(group: Object3D, geometry: Geometry, outer: Material) {
    const front = new Mesh(geometry, inner);
    const back = new Mesh(geometry, outer);
    front.castShadow = back.castShadow = true;
    front.receiveShadow = true;
    group.add(front, back);
  }

  /** Painel com dobradiça: `dir` diz para que lado ele se estende na folha plana. */
  function addPanel(sheet: Sheet, parent: Object3D, options: PanelOptions) {
    const pivot = new Group();
    pivot.position.set(options.at[0], options.lift ?? 0, options.at[1]);
    parent.add(pivot);
    const alongX = options.dir[0] === "x";
    const sign = options.dir[1] === "+" ? 1 : -1;
    const point = (a: number, c: number): Point => (alongX ? [sign * a, c] : [c, sign * a]);
    const buffer: LineBuffer = { p: [], i: [] };
    let geometry: Geometry;

    if (options.tri) {
      const shape = new Shape();
      const a = point(0, -options.wid / 2);
      const b = point(0, options.wid / 2);
      const tip = point(options.len, 0);
      const toVector = ([x, z]: Point) => new Vector2(x, -z);
      if (options.round) {
        const near = (from: Point) =>
          [lerp(from[0], tip[0], 0.8), lerp(from[1], tip[1], 0.8)] as Point;
        const start = toVector(a);
        const before = toVector(near(a));
        const after = toVector(near(b));
        const end = toVector(b);
        shape.moveTo(start.x, start.y);
        shape.lineTo(before.x, before.y);
        shape.quadraticCurveTo(toVector(tip).x, toVector(tip).y, after.x, after.y);
        shape.lineTo(end.x, end.y);
        shape.closePath();
      } else {
        const vertices = [toVector(a), toVector(b), toVector(tip)];
        const area =
          (vertices[1].x - vertices[0].x) * (vertices[2].y - vertices[0].y) -
          (vertices[2].x - vertices[0].x) * (vertices[1].y - vertices[0].y);
        if (area < 0) vertices.reverse();
        shape.setFromPoints(vertices);
      }
      geometry = new ShapeGeometry(shape, 18);
      geometry.rotateX(-Math.PI / 2);
      addStroke(buffer, a, b, true);
      addStroke(buffer, a, tip);
      addStroke(buffer, b, tip);
    } else {
      geometry = new PlaneGeometry(
        alongX ? options.len : options.wid,
        alongX ? options.wid : options.len,
      );
      geometry.rotateX(-Math.PI / 2);
      geometry.translate(
        alongX ? (sign * options.len) / 2 : 0,
        0,
        alongX ? 0 : (sign * options.len) / 2,
      );
      addStroke(buffer, point(0, -options.wid / 2), point(0, options.wid / 2), true);
      if (!options.joined) {
        addStroke(
          buffer,
          point(options.len, -options.wid / 2),
          point(options.len, options.wid / 2),
        );
      }
      addStroke(buffer, point(0, -options.wid / 2), point(options.len, -options.wid / 2));
      addStroke(buffer, point(0, options.wid / 2), point(options.len, options.wid / 2));
    }

    addFaces(pivot, geometry, sheet.outer);
    pivot.add(linesMesh(buffer, sheet.lineMat));

    if (options.print) {
      const printGeometry = new PlaneGeometry(options.wid * 0.86, options.wid * 0.43);
      printGeometry.rotateX(Math.PI / 2);
      printGeometry.translate(0, -0.006, sign * options.len * 0.5);
      pivot.add(
        new Mesh(
          printGeometry,
          new MeshBasicMaterial({ map: options.print, transparent: true, side: FrontSide }),
        ),
      );
    }

    sheet.panels.push({
      pivot,
      alongX,
      sign,
      angle: options.angle,
      from: options.from,
      to: options.to,
      reopen: options.reopen,
    });
    return pivot;
  }

  const newSheet = (hex: string): Sheet => ({
    root: new Group(),
    panels: [],
    lineMat: lineMaterial.clone(),
    outer: outerOf(hex),
  });
  const flatBase = (width: number, depth: number) => {
    const geometry = new PlaneGeometry(width, depth);
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  };

  function makeBox() {
    const sheet = newSheet("#F71963");
    const w = 2.3;
    const d = 1.7;
    const h = 1.4;
    const Q = Math.PI / 2;
    addFaces(sheet.root, flatBase(w, d), sheet.outer);
    addPanel(sheet, sheet.root, {
      at: [w / 2, 0],
      dir: "x+",
      len: h,
      wid: d,
      angle: Q,
      from: 0,
      to: 0.45,
    });
    addPanel(sheet, sheet.root, {
      at: [-w / 2, 0],
      dir: "x-",
      len: h,
      wid: d,
      angle: Q,
      from: 0.05,
      to: 0.5,
    });
    addPanel(sheet, sheet.root, {
      at: [0, d / 2],
      dir: "z+",
      len: h,
      wid: w,
      angle: Q,
      from: 0.1,
      to: 0.55,
      print: printedTexture("vtex", `${stores.vtex} LOJAS`),
    });
    const back = addPanel(sheet, sheet.root, {
      at: [0, -d / 2],
      dir: "z-",
      len: h,
      wid: w,
      angle: Q,
      from: 0.15,
      to: 0.6,
      joined: true,
    });
    const lid = addPanel(sheet, back, {
      at: [0, -h],
      dir: "z-",
      len: d,
      wid: w,
      angle: Q,
      from: 0.62,
      to: 1,
      joined: true,
      print: printedTexture("vtex", "FASTSTORE"),
    });
    // A aba dobra antes de a tampa fechar e passa a mais de 90° para entrar por dentro da frente
    addPanel(sheet, lid, {
      at: [0, -d],
      dir: "z-",
      len: 0.42,
      wid: w * 0.94,
      angle: Q * 1.12,
      from: 0.5,
      to: 0.72,
    });
    return sheet;
  }

  function makeBag() {
    const sheet = newSheet("#C505F2");
    const w = 1.9;
    const d = 0.85;
    const h = 2.4;
    const Q = Math.PI / 2;
    addFaces(sheet.root, flatBase(w, d), sheet.outer);
    const front = addPanel(sheet, sheet.root, {
      at: [0, d / 2],
      dir: "z+",
      len: h,
      wid: w,
      angle: Q,
      from: 0,
      to: 0.55,
      print: printedTexture("wake", `${stores.wake} LOJAS`),
    });
    const back = addPanel(sheet, sheet.root, {
      at: [0, -d / 2],
      dir: "z-",
      len: h,
      wid: w,
      angle: Q,
      from: 0.05,
      to: 0.6,
    });
    addPanel(sheet, sheet.root, {
      at: [w / 2, 0],
      dir: "x+",
      len: h,
      wid: d,
      angle: Q,
      from: 0.2,
      to: 0.75,
    });
    addPanel(sheet, sheet.root, {
      at: [-w / 2, 0],
      dir: "x-",
      len: h,
      wid: d,
      angle: Q,
      from: 0.25,
      to: 0.8,
    });
    sheet.handles = [];
    (
      [
        [front, h],
        [back, -h],
      ] as [Group, number][]
    ).forEach(([panel, z]) => {
      const handle = new Mesh(
        new TorusGeometry(0.36, 0.03, 10, 28, Math.PI),
        new MeshStandardMaterial({ color: new Color("#F5B800"), roughness: 0.4, metalness: 0.2 }),
      );
      handle.rotation.x = z > 0 ? Math.PI / 2 : -Math.PI / 2;
      handle.position.set(0, 0, z);
      handle.castShadow = true;
      handle.scale.setScalar(0.001);
      panel.add(handle);
      sheet.handles?.push(handle);
    });
    return sheet;
  }

  /** Envelope: fecha as abas, ganha o selo, e a aba volta a abrir para a página subir. */
  function makeMail() {
    const sheet = newSheet("#21759B");
    const w = 3;
    const d = 2;
    const P = Math.PI;
    // As abas ficam um pouco acima da base para a página passar entre elas
    const lift = 0.05;
    addFaces(sheet.root, flatBase(w, d), sheet.outer);

    const page = new PlaneGeometry(w * 0.84, d * 0.9);
    page.rotateX(-Math.PI / 2);
    sheet.letter = new Mesh(
      page,
      new MeshStandardMaterial({
        map: sitePageTexture(),
        roughness: 0.62,
        side: DoubleSide,
        shadowSide: DoubleSide,
      }),
    );
    sheet.letter.position.y = 0.024;
    sheet.letter.castShadow = true;
    sheet.letter.visible = false;
    sheet.letterRange = [0.74, 1];
    sheet.root.add(sheet.letter);

    sheet.foldMat = new MeshBasicMaterial({
      color: new Color("#123F55"),
      side: DoubleSide,
      transparent: true,
      opacity: 0,
    });

    addPanel(sheet, sheet.root, {
      at: [-w / 2, 0],
      dir: "x-",
      len: w * 0.52,
      wid: d,
      angle: P * 0.985,
      from: 0,
      to: 0.3,
      tri: true,
      lift,
    });
    addPanel(sheet, sheet.root, {
      at: [w / 2, 0],
      dir: "x+",
      len: w * 0.52,
      wid: d,
      angle: P * 0.98,
      from: 0.06,
      to: 0.36,
      tri: true,
      lift,
    });
    const bottom = addPanel(sheet, sheet.root, {
      at: [0, d / 2],
      dir: "z+",
      len: d * 0.62,
      wid: w,
      angle: P * 0.972,
      from: 0.2,
      to: 0.5,
      tri: true,
      lift,
    });
    const seams: LineBuffer = { p: [], i: [] };
    addQuad(seams, [-w / 2, 0], [0, d * 0.62], 0.03);
    addQuad(seams, [w / 2, 0], [0, d * 0.62], 0.03);
    const seamLines = linesMesh(seams, sheet.foldMat);
    seamLines.position.y = -0.012;
    bottom.add(seamLines);
    const flap = addPanel(sheet, sheet.root, {
      at: [0, -d / 2],
      dir: "z-",
      len: d * 0.72,
      wid: w,
      angle: P * 0.962,
      from: 0.36,
      to: 0.62,
      tri: true,
      round: true,
      lift: 0.01,
      reopen: [0.74, 0.92, P * 1.08],
    });

    // Forro dourado por dentro da aba: aparece quando ela abre
    const liner = new Shape();
    liner.moveTo(-w * 0.4, 0.02);
    liner.lineTo(-w * 0.1, d * 0.52);
    liner.quadraticCurveTo(0, d * 0.62, w * 0.1, d * 0.52);
    liner.lineTo(w * 0.4, 0.02);
    liner.closePath();
    const linerGeometry = new ShapeGeometry(liner, 12);
    linerGeometry.rotateX(-Math.PI / 2);
    linerGeometry.scale(1, 1, 1);
    linerGeometry.translate(0, 0.006, 0);
    flap.add(
      new Mesh(
        linerGeometry,
        new MeshStandardMaterial({ color: new Color("#F5B800"), roughness: 0.55, side: FrontSide }),
      ),
    );

    // Selo em relevo, preso à ponta da aba
    const textures = sealTextures();
    sheet.seal = new Group();
    const rim = new Mesh(
      new CylinderGeometry(0.4, 0.42, 0.07, 48),
      new MeshStandardMaterial({ color: new Color("#D99A00"), roughness: 0.4, metalness: 0.3 }),
    );
    rim.castShadow = true;
    const faceGeometry = new CircleGeometry(0.39, 48);
    faceGeometry.rotateX(Math.PI / 2);
    const face = new Mesh(
      faceGeometry,
      new MeshStandardMaterial({
        map: textures.map,
        bumpMap: textures.bumpMap,
        bumpScale: 2,
        roughness: 0.42,
        metalness: 0.25,
      }),
    );
    face.position.y = -0.037;
    sheet.seal.add(rim, face);
    sheet.seal.position.set(0, -0.06, -d * 0.54);
    sheet.seal.scale.setScalar(0.001);
    flap.add(sheet.seal);
    return sheet;
  }

  const sheets = [makeBox(), makeBag(), makeMail()];
  sheets.forEach((sheet) => scene.add(sheet.root));

  function setFold(sheet: Sheet, fold: number) {
    for (const panel of sheet.panels) {
      let angle = panel.angle * ease(clamp((fold - panel.from) / (panel.to - panel.from)));
      if (panel.reopen) {
        const [start, end, back] = panel.reopen;
        angle -= back * ease(clamp((fold - start) / (end - start)));
      }
      if (panel.alongX) panel.pivot.rotation.z = panel.sign * angle;
      else panel.pivot.rotation.x = -panel.sign * angle;
    }
    if (sheet.seal && sheet.foldMat) {
      sheet.seal.scale.setScalar(Math.max(0.001, ease(clamp((fold - 0.6) / 0.1))));
      sheet.foldMat.opacity = ease(clamp((fold - 0.56) / 0.12));
    }
    if (sheet.letter && sheet.letterRange) {
      const [start, end] = sheet.letterRange;
      const rise = ease(clamp((fold - start) / (end - start)));
      sheet.letter.visible = rise > 0.001;
      sheet.letter.position.z = -rise * 0.98;
    }
    sheet.lineMat.opacity = 1 - ease(clamp((fold - 0.3) / 0.4));
    sheet.lineMat.visible = sheet.lineMat.opacity > 0.01;
    sheet.handles?.forEach((handle) =>
      handle.scale.setScalar(Math.max(0.001, ease(clamp((fold - 0.82) / 0.18)))),
    );
  }

  const raycaster = new Raycaster();
  const ground = new Plane(new Vector3(0, 1, 0), 0);
  const groundAt = (x: number, y: number) => {
    raycaster.setFromCamera(new Vector2(x, y), camera);
    return raycaster.ray.intersectPlane(ground, new Vector3()) ?? new Vector3();
  };
  const cameraTop = new Vector3(0, 12, 0.02);
  const cameraSide = new Vector3(0, 8.6, 8.4);

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  resize();

  return {
    resize,
    /** `s` é a posição na rolagem: 0 é o topo e cada inteiro é uma plataforma. */
    frame(s: number, time: number, pointerX: number, pointerY: number) {
      const tilt = ease(clamp(s / 0.8));
      camera.position.lerpVectors(cameraTop, cameraSide, tilt);
      camera.lookAt(0, 0, 0);
      camera.updateMatrixWorld();

      const small = window.innerWidth <= 860;
      const hero = small ? groundAt(0.1, -0.6) : groundAt(0.25, -0.03);
      const holds = small
        ? [groundAt(0, 0.56), groundAt(0, 0.44), groundAt(0, 0.36)]
        : [groundAt(0.29, -0.2), groundAt(-0.2, -0.26), groundAt(0.36, -0.24)];
      const heroScale = small ? 0.5 : 0.8;
      const holdScale = small ? 0.58 : 1.2;
      const mailScale = small ? 0.52 : 1.02;
      const away = small ? 7 : 13;

      sheets.forEach((sheet, i) => {
        const step = i + 1;
        const last = i === sheets.length - 1;
        // Uma peça abre por inteiro, as duas deslizam juntas e só então a nova dobra
        const foldIn = i === 0 ? ease(clamp(s / 0.82)) : ease(clamp((s - (step - 0.4)) / 0.38));
        const foldOut = last ? 0 : ease(clamp((s - (step + 0.1)) / 0.3));
        const fold = foldIn * (1 - foldOut);
        setFold(sheet, fold);

        const slideIn = i === 0 ? 0 : 1 - ease(clamp((s - (step - 0.6)) / 0.22));
        const slideOut = last
          ? ease(clamp((s - (step + 0.4)) / 0.34))
          : ease(clamp((s - (step + 0.4)) / 0.22));
        sheet.root.visible = slideIn < 0.999 && slideOut < 0.999;

        const settled = i === 0 ? ease(clamp(s / 0.7)) : 1;
        const position = sheet.root.position;
        position.lerpVectors(i === 0 ? hero : holds[i], holds[i], settled);
        position.x += slideIn * away - slideOut * away;
        position.y = i === 0 ? (1 - settled) * 0.16 : 0;
        const scale = i === 2 ? mailScale : holdScale;
        sheet.root.scale.setScalar(lerp(i === 0 ? heroScale : scale, scale, settled));

        const sway = reduced ? 0.4 : Math.sin(time * 0.4) * 0.14;
        const stand = i === 2 ? fold * 0.95 : 0;
        const flatTurn = i === 0 ? (1 - settled) * (small ? 0 : -Math.PI / 2) : 0;
        const baseTurn = i === 2 ? -0.22 : i === 1 ? 0.46 : -0.52;
        sheet.root.rotation.set(
          stand + pointerY * 0.08 * fold,
          flatTurn + fold * baseTurn + (sway + pointerX * 0.28) * fold,
          0,
        );
        if (i === 2) position.y = fold * 0.5;
      });

      renderer.render(scene, camera);
    },
    dispose() {
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}

export type FacaScene = ReturnType<typeof createFacaScene>;
