import { createContext, useContext, type KeyboardEvent, type SyntheticEvent } from "react";
import { hdSrcSet } from "@/lib/media";

export interface ZoomMedia {
  src: string;
  alt: string;
  /** Só os vídeos têm: é o que separa vídeo de imagem no visor. */
  poster?: string;
}

export interface ZoomItem extends ZoomMedia {
  ratio: number;
}

type ZoomElement = HTMLImageElement | HTMLButtonElement;

export const ZoomContext = createContext<(item: ZoomItem) => void>(() => undefined);

/** Proporção do arquivo, porque no painel a mídia costuma aparecer recortada. */
function ratioOf(element: ZoomElement) {
  const video = element.querySelector("video");
  const [width, height] = video
    ? [video.videoWidth, video.videoHeight]
    : [(element as HTMLImageElement).naturalWidth, (element as HTMLImageElement).naturalHeight];
  return width && height ? width / height : element.clientWidth / element.clientHeight;
}

/** Propriedades que tornam clicável uma imagem, ou o botão que envolve um vídeo. */
export function useZoom() {
  const open = useContext(ZoomContext);

  return (media: ZoomMedia) => {
    const show = (event: SyntheticEvent<ZoomElement>) =>
      open({ ...media, ratio: ratioOf(event.currentTarget) });

    return {
      role: "button",
      tabIndex: 0,
      "aria-label": `Ampliar: ${media.alt}`,
      "data-zoom": true,
      srcSet: media.poster ? undefined : hdSrcSet(media.src),
      onClick: show,
      onKeyDown: (event: KeyboardEvent<ZoomElement>) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        show(event);
      },
    };
  };
}
