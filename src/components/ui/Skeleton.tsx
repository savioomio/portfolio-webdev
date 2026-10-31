import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-[skeleton_1.6s_ease-in-out_infinite] rounded-lg bg-line motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}
