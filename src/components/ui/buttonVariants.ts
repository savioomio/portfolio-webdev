import { cva } from "class-variance-authority";

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
