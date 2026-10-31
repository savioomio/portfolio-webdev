import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

interface PanelCopyProps {
  project: Project;
  className?: string;
  /** Aparece acima do título. */
  top?: ReactNode;
  /** Aparece logo abaixo do período. */
  lead?: ReactNode;
  hideFacts?: boolean;
  children?: ReactNode;
}

export function PanelCopy({ project, className, top, lead, hideFacts, children }: PanelCopyProps) {
  return (
    <div className={cn("min-w-0", className)}>
      {top}
      <h3 className="panel-title">{project.headline ?? project.name}</h3>
      <p className="panel-period">{project.period}</p>
      {lead}
      {project.body.map((paragraph) => (
        <p key={paragraph} className="panel-text">
          {paragraph}
        </p>
      ))}
      {children}
      {!hideFacts && project.facts.length > 0 && (
        <ul className="panel-facts panel-wide">
          {project.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      )}
      <Link className="panel-link" to={`/projetos/${project.slug}`}>
        Ver o projeto
      </Link>
      {project.links.map((link) => (
        <a key={link.href} className="panel-link" href={link.href} target="_blank" rel="noreferrer">
          {link.label}
        </a>
      ))}
    </div>
  );
}
