import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

/** Cena pequena de um canvas dentro do trilho: renderizador, câmera e ajuste de tamanho. */
export function createMiniScene(canvas: HTMLCanvasElement, fov: number) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const scene = new Scene();
  const camera = new PerspectiveCamera(fov, 1, 0.1, 40);

  const size = () => {
    const width = canvas.clientWidth || 1;
    const height = canvas.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  size();

  return { renderer, scene, camera, size };
}
