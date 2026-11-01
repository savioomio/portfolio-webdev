import { createContext, useContext, type KeyboardEvent, type SyntheticEvent } from "react";

export interface ZoomMedia {
  src: string;
  alt: string;
  /** Só os vídeos têm: é o que separa vídeo de imagem no visor. */
  poster?: string;
}

export interface ZoomItem extends ZoomMedia {
  ratio: number;
}

type ZoomElement = HTMLImageElement | HTMLVideoElement;

export const ZoomContext = createContext<(item: ZoomItem) => void>(() => undefined);

/** Proporção do arquivo, porque no painel a mídia costuma aparecer recortada. */
function ratioOf(element: ZoomElement) {
  const [width, height] =
    element instanceof HTMLVideoElement
      ? [element.videoWidth, element.videoHeight]
      : [element.naturalWidth, element.naturalHeight];
  return width && height ? width / height : element.clientWidth / element.clientHeight;
}

/** Devolve as propriedades que tornam uma imagem ou vídeo clicável para ampliar. */
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
      onClick: show,
      onKeyDown: (event: KeyboardEvent<ZoomElement>) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        show(event);
      },
    };
  };
}
