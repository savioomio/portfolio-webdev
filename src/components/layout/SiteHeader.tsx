import { Link } from "react-router-dom";
import { ButtonLink } from "@/components/ui/Button";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/#lojas", label: "Lojas" },
  { to: "/#hoje", label: "Experiência" },
  { to: "/projetos", label: "Projetos" },
];

export function SiteHeader() {
  return (
    <header className="glass fixed [view-transition-name:site-header] left-[var(--gl)] right-[var(--gr)] top-[max(12px,env(safe-area-inset-top,0px))] z-20 flex items-center gap-2 !rounded-[14px] py-1.5 pl-[18px] pr-1.5">
      <Link
        to="/"
        className="mr-auto inline-flex items-center gap-2 whitespace-nowrap font-display text-[19px] font-black leading-none tracking-[-0.01em] no-underline"
      >
        <img src="/favicon.png" alt="" width={28} height={28} className="size-7 rounded-lg" />
        {site.name}
      </Link>
      <nav aria-label="Principal" className="hidden gap-0.5 md:flex">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={buttonVariants({ variant: "ghost", size: "sm", className: "rounded-[9px]" })}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <ThemeToggle />
      <ButtonLink to="/#contato" size="sm">
        Falar comigo
      </ButtonLink>
    </header>
  );
}
