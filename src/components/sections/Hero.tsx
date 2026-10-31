import { ButtonLink } from "@/components/ui/Button";
import { stores } from "@/content/site";

export function Hero() {
  return (
    <section
      data-stage
      className="relative flex min-h-svh items-start px-[var(--gl)] pb-10 pt-[84px] md:items-center md:pb-14 md:pt-24"
    >
      <div className="glass relative z-[1] w-full p-6 md:w-[min(760px,60%)] md:p-[clamp(24px,3.4vw,46px)]">
        <h1 className="text-[clamp(2.7rem,5.6vw,5.3rem)] font-black leading-[1.1] tracking-[-0.025em]">
          Especialista em <span className="highlight">e-commerce</span> VTEX e Wake
        </h1>
        <p className="mt-5 max-w-[40em] text-[clamp(1.06rem,1.45vw,1.28rem)] leading-normal">
          Sou desenvolvedor front-end. São {stores.total} lojas em VTEX e Wake, {stores.wordpress}{" "}
          projetos reais em WordPress e 3 anos de experiência, 1 deles de estágio.
        </p>
        <div className="mt-[26px] flex flex-wrap gap-2.5">
          <ButtonLink to="/#lojas">Ver as lojas</ButtonLink>
          <ButtonLink to="/#historia" variant="outline">
            Ver os projetos
          </ButtonLink>
        </div>
      </div>
      <svg
        className="sheet-poster"
        viewBox="0 0 300 330"
        aria-hidden="true"
        fill="#fff"
        stroke="#D9A000"
        strokeWidth="2.5"
      >
        <path d="M98 4h104v100h94v102h-94v120H98V206H4V104h94z" />
        <path
          d="M98 104h104M98 206h104M98 104v102M202 104v102"
          strokeDasharray="10 7"
          fill="none"
        />
      </svg>
      <div
        aria-hidden="true"
        className="absolute bottom-[26px] right-[var(--gr)] hidden gap-5 text-sm font-bold text-gold-ink md:flex"
      >
        <span className="inline-flex items-center gap-2">
          <i className="w-[34px] border-t-2 border-[#D9A000]" />
          corte
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="w-[34px] border-t-2 border-dashed border-[#D9A000]" />
          vinco
        </span>
      </div>
    </section>
  );
}
