import type { ReactNode } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { stores } from "@/content/site";
import { cn } from "@/lib/utils";

const headingClass =
  "text-[clamp(2.2rem,4.4vw,4rem)] font-black leading-[1.04] tracking-[-0.022em]";

function StoreRow({
  count,
  title,
  children,
}: {
  count: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-4 border-b-2 border-dashed border-[var(--c)] py-[13px]">
      <b className="min-w-[1.5em] font-display text-[2.1rem] font-black leading-none text-[var(--c2)]">
        {count}
      </b>
      <div>
        <h3 className="text-[1.22rem] font-extrabold leading-tight">{title}</h3>
        <p className="mt-[3px] text-base">{children}</p>
      </div>
    </li>
  );
}

interface PlatformProps {
  id?: string;
  brandClass: string;
  align?: "left" | "right";
  children: ReactNode;
}

function Platform({ id, brandClass, align = "left", children }: PlatformProps) {
  return (
    <section
      id={id}
      data-stage
      className={cn("platform", brandClass, align === "right" && "platform-right md:justify-end")}
    >
      <div className="glass">{children}</div>
    </section>
  );
}

export function Storefront() {
  return (
    <>
      <Platform id="lojas" brandClass="brand-vtex">
        <BrandLogo brand="vtex" className="mb-[18px] h-[46px] w-auto text-vtex md:h-16" />
        <h2 className={headingClass}>{stores.vtex} participações em lojas VTEX</h2>
        <p className="mt-3">Meu forte: participei de lojas do começo ao fim.</p>
        <ul className="mt-[18px] border-t-2 border-dashed border-[var(--c)]">
          <StoreRow count={stores.faststore} title="FastStore">
            Atuo como referência técnica em VTEX nos projetos da empresa, não só nos de FastStore.
          </StoreRow>
          <StoreRow count={stores.storeFramework} title="Store Framework">
            Desenvolvimento e manutenção de lojas em VTEX IO.
          </StoreRow>
        </ul>
        <p className="mt-3">
          Também publiquei a{" "}
          <a
            className="font-bold text-[var(--c2)]"
            href="https://github.com/savioomio/faststore-login-extension"
          >
            extensão de login para FastStore
          </a>
          , que loga um usuário VTEX em localhost sem copiar cookie na mão.
        </p>
      </Platform>

      <Platform brandClass="brand-wake" align="right">
        <BrandLogo brand="wake" className="mb-[18px] h-[34px] w-auto text-ink md:h-[50px]" />
        <h2 className={headingClass}>{stores.wake} participações em lojas Wake</h2>
        <p className="mt-3">
          Participei de {stores.wake} entregas de lojas Wake de alta performance, feitas com
          Scriban.
        </p>
      </Platform>

      <Platform brandClass="brand-wp">
        <BrandLogo
          brand="wordpress"
          className="mb-[18px] h-[46px] w-auto text-wp dark:text-wp-ink md:h-16"
        />
        <h2 className={headingClass}>{stores.wordpress} projetos em WordPress</h2>
        <p className="mt-3">
          Blogs para e-commerce, em WordPress e PHP. O site da mão robótica, lá embaixo, também saiu
          em WordPress.
        </p>
      </Platform>
    </>
  );
}
