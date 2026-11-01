import { Github, Globe, Instagram, Linkedin, Mail } from "lucide-react";
import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/layout/Seo";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/content/site";
import { seoForLinks } from "@/lib/seo";

interface LinkItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

const links: LinkItem[] = [
  { label: "WhatsApp", href: site.whatsapp, icon: WhatsAppIcon },
  { label: "LinkedIn", href: site.linkedin, icon: Linkedin },
  { label: "GitHub", href: site.github, icon: Github },
  { label: "Instagram", href: site.instagram, icon: Instagram },
  { label: "E-mail", href: `mailto:${site.email}`, icon: Mail },
];

const itemClass = (variant: "primary" | "outline") =>
  buttonVariants({ variant, className: "link-glass w-full justify-start gap-3" });

export default function Links() {
  return (
    <main className="links-page">
      <Seo data={seoForLinks()} />
      {/* Geradas pelo motor 3D: a página abre sem carregar a cena */}
      <img
        className="links-bag"
        src="/media/links-sacola.webp"
        alt=""
        width={760}
        height={656}
        fetchPriority="high"
      />
      <img
        className="links-box"
        src="/media/links-caixa.webp"
        alt=""
        width={760}
        height={656}
        fetchPriority="high"
      />
      <h1 className="text-[2.4rem] font-black leading-[1.1] tracking-[-0.02em]">{site.name}</h1>
      <p className="mt-1.5 max-w-[11em] text-mute">{site.title}</p>
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
