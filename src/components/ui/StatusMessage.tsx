import type { ReactNode } from "react";

interface StatusMessageProps {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}

/** Aviso de erro ou de lista vazia, igual em todas as páginas. */
export function StatusMessage({ title, children, action }: StatusMessageProps) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gold p-6">
      <h3 className="text-xl font-extrabold">{title}</h3>
      {children && <p className="mt-1.5 text-mute">{children}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
