import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const controlClass =
  "w-full rounded-[10px] bg-surface px-[13px] py-[11px] font-body text-base leading-snug text-ink shadow-[inset_0_0_0_2px_var(--line)] outline-none focus:shadow-[inset_0_0_0_3px_var(--ink)] aria-[invalid=true]:shadow-[inset_0_0_0_3px_var(--danger)]";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

export function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="mb-3 grid gap-[5px]">
      <label htmlFor={id} className="font-display text-[15px] font-extrabold leading-tight">
        {label}
      </label>
      {children}
      <span id={`${id}-erro`} role="alert" className="min-h-[1.3em] text-sm font-bold text-danger">
        {error}
      </span>
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlClass, "min-h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(controlClass, className)} {...props} />;
}
