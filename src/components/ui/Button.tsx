import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-display font-extrabold leading-none no-underline transition-[background-color,color,transform] duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-gold text-[#1D1809] hover:bg-gold-hover",
        outline: "shadow-[inset_0_0_0_2px_var(--ink)] hover:bg-ink hover:text-bg",
        solid: "bg-ink text-bg hover:opacity-90",
        ghost: "hover:bg-gold-soft",
      },
      size: {
        md: "min-h-12 px-[22px] text-base",
        sm: "min-h-10 px-[15px] text-[15px]",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

type ButtonLinkProps = LinkProps & ButtonVariants;

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

interface ExternalButtonProps extends ButtonVariants {
  href: string;
  className?: string;
  children: ReactNode;
}

export function ExternalButton({ className, variant, size, ...props }: ExternalButtonProps) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
