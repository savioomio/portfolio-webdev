import { cn } from "@/lib/utils";

export function Spinner({ className, label }: { className?: string; label?: string }) {
  return (
    <span
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        "inline-block size-[1.1em] animate-spin rounded-full border-[3px] border-current border-r-transparent motion-reduce:animate-[spin_3s_linear_infinite]",
        className,
      )}
    />
  );
}
