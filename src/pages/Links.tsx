import { Github, Globe, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/layout/Seo";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { site } from "@/content/site";
import { seoForLinks } from "@/lib/seo";

interface LinkItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

const links: LinkItem[] = [
  { label: "WhatsApp", href: site.whatsapp, icon: MessageCircle },
  { label: "LinkedIn", href: site.linkedin, icon: Linkedin },
  { label: "GitHub", href: site.github, icon: Github },
  { label: "Instagram", href: site.instagram, icon: Instagram },
  { label: "E-mail", href: `mailto:${site.email}`, icon: Mail },
];

const itemClass = (variant: "primary" | "outline") =>
  buttonVariants({ variant, className: "w-full justify-start gap-3" });

export default function Links() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center px-[var(--gl)] py-28">
      <Seo data={seoForLinks()} />
      <h1 className="text-[2.4rem] font-black leading-[1.1] tracking-[-0.02em]">{site.name}</h1>
      <p className="mt-1.5 text-mute">{site.title}</p>
      <ul className="mt-6 grid gap-2.5">
        <li>
          <Link to="/" className={itemClass("primary")}>
            <Globe className="size-5" aria-hidden="true" />
            Meu portfólio
          </Link>
        </li>
        {links.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a href={href} className={itemClass("outline")} target="_blank" rel="noreferrer">
              <Icon className="size-5" aria-hidden="true" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
