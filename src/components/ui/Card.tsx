import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-2xl border-2 border-line bg-surface p-5 md:p-6", className)}
      {...props}
    />
  );
}
