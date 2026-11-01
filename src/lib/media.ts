/** Mídias com versão em alta: `foto.webp` tem `foto-hd.webp`, e `video.mp4` tem `video-hd.mp4`. */
const HD_MEDIA = new Set([
  "/media/aranha-hd.mp4",
  "/media/aranha-perto-hd.mp4",
  "/media/aranha-perto-hd.webp",
  "/media/drone-bristol-hd.webp",
  "/media/mao-hd.mp4",
  "/media/mao-poster-hd.webp",
  "/media/medalhas-tenda-hd.webp",
  "/media/missao-guincho-hd.mp4",
  "/media/missao-guincho-hd.webp",
  "/media/syn-camera-hd.webp",
  "/media/syn-captura-hd.webp",
  "/media/syn-pronto-hd.webp",
  "/media/syn-tela-ajustes-hd.webp",
  "/media/syn-tela-galeria-hd.webp",
  "/media/syn-trilhas-hd.webp",
  "/media/synesthesia-app-hd.mp4",
  "/media/synesthesia-app-poster-hd.webp",
  "/media/voo-bristol-hd.webp",
  "/media/gm-assistente-hd.webp",
  "/media/drones-equipe-bandeiras-hd.webp",
  "/media/imav-equipe-hd.webp",
  "/media/imav-apresentacao-hd.webp",
  "/media/imav-cracha-hd.webp",
  "/media/drone-notebook-hd.webp",
  "/media/imav-ajuste-hd.webp",
  "/media/callidus-bancada-hd.webp",
  "/media/mao-pecas-hd.webp",
  "/media/gm-gestao-b-hd.webp",
  "/media/trofeu-hd.webp",
  "/media/platao-inicio-vtex-hd.webp",
  "/media/platao-historico-hd.webp",
]);

/** Endereço da versão em alta, ou o próprio arquivo quando ela não existe. */
export function hdSrc(src: string) {
  const hd = src.replace(/\.(\w+)$/, "-hd.$1");
  return HD_MEDIA.has(hd) ? hd : src;
}

/** O navegador só baixa a versão em alta em tela de alta densidade. */
export function hdSrcSet(src: string) {
  const hd = hdSrc(src);
  return hd === src ? undefined : `${src} 1x, ${hd} 2x`;
}
