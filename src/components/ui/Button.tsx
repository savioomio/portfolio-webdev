import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./buttonVariants";

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
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
