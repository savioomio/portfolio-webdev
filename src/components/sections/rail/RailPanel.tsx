import type { CSSProperties, ReactNode } from "react";
import type { Project } from "@/content/projects";

interface RailPanelProps {
  project: Project;
  style?: CSSProperties;
  children: ReactNode;
}

export function RailPanel({ project, style, children }: RailPanelProps) {
  return (
    <article
      id={`p-${project.slug}`}
      data-panel
      className="panel"
      style={{ "--c": project.color, "--k": project.ink, ...style } as CSSProperties}
    >
      {children}
    </article>
  );
}
