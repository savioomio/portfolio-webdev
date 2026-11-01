import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

/** Logo do projeto, em um selo claro quando o arquivo não tem fundo próprio. */
export function ProjectLogo({ logo, className }: { logo: Project["logo"]; className?: string }) {
  if (!logo) return null;

  return (
    <span className={cn("inline-block rounded-xl", logo.chip && "bg-[#F7FFF4] p-2", className)}>
      <img
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className="h-[1lh] w-auto rounded-[8px]"
      />
    </span>
  );
}
