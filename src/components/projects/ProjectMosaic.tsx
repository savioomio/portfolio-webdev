import { Play } from "lucide-react";
import type { Project } from "@/content/projects";
import { useZoom } from "@/hooks/useZoom";
import { hdSrcSet } from "@/lib/media";
import { mosaicRows } from "@/lib/mosaic";

interface Tile {
  src: string;
  alt: string;
  image: string;
  poster?: string;
  ratio: number;
}

function tilesOf(project: Project): Tile[] {
  const videos = [...(project.video ? [project.video] : []), ...(project.moreVideos ?? [])];
  return [
    ...videos.map((video) => ({
      src: video.src,
      alt: video.label,
      image: video.poster,
      poster: video.poster,
      ratio: video.width / video.height,
    })),
    ...project.gallery.map((image) => ({
      src: image.src,
      alt: image.alt,
      image: image.src,
      ratio: image.width / image.height,
    })),
  ];
}

/** Vídeos e fotos do projeto: no mosaico o vídeo é só a capa, e ele toca no visor. */
export function ProjectMosaic({ project }: { project: Project }) {
  const zoom = useZoom();
  const rows = mosaicRows(tilesOf(project), (tile) => tile.ratio);

  if (rows.length === 0) return null;

  return (
    <section aria-label="Vídeos e imagens do projeto" className="mosaic">
      {rows.map((row) => (
        <div key={row[0].src} className="mosaic-row">
          {row.map((tile) => (
            <div
              key={tile.src}
              className="mosaic-tile"
              style={{ flex: `${tile.ratio} ${tile.ratio} 0`, aspectRatio: tile.ratio }}
            >
              <img
                src={tile.image}
                alt={tile.alt}
                loading="lazy"
                {...zoom({ src: tile.src, alt: tile.alt, poster: tile.poster })}
                srcSet={hdSrcSet(tile.image)}
              />
              {tile.poster && (
                <span className="mosaic-play" aria-hidden="true">
                  <Play className="size-6 fill-current" />
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
