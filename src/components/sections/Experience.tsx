import { useZoom } from "@/hooks/useZoom";

interface Milestone {
  when: string;
  title: string;
  text: string;
  /** Cargos em ordem: o traço entre eles mostra a evolução. */
  roles?: string[];
  /** Conquista dentro do período. */
  achievement?: string;
}

/** Do mais antigo ao mais recente. */
const timeline: Milestone[] = [
  {
    when: "set/2023 a ago/2024",
    title: "Estágio bolsista no IF Baiano",
    text: "Callidus Link: automação e monitoramento de consumo hídrico com IoT.",
  },
  {
    when: "out/2024 até hoje",
    title: "Wicomm",
    roles: ["Desenvolvedor Web", "Desenvolvedor Web Pleno"],
    text: "Remoto. Atuo como referência técnica em VTEX nos projetos da empresa, não só nos de FastStore.",
    achievement:
      "Segundo lugar no primeiro Wackathon, em dupla: uma loja completa feita só com prompts.",
  },
  {
    when: "2026 a 2029",
    title: "Engenharia de Software na FIAP",
    text: "Bacharelado, depois do técnico em Informática para Internet no IF Baiano.",
  },
];

const wackathon = {
  src: "/media/wackathon.webp",
  alt: "Anúncio dos vencedores do Wackathon Wicomm: a minha dupla ficou em 2º lugar",
};

export function Experience() {
  const zoom = useZoom();

  return (
    <section
      id="hoje"
      className="relative scroll-mt-20 bg-bg px-[var(--gl)] py-[clamp(72px,11svh,130px)]"
    >
      <div className="mx-auto grid w-full max-w-wrap items-start gap-[clamp(24px,5vw,72px)] md:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)]">
        <div>
          <h2 className="text-[clamp(2.2rem,4.4vw,4rem)] font-black leading-[1.04] tracking-[-0.022em]">
            2 anos de experiência no mercado, mais 1 de estágio
          </h2>
          <ul className="mt-[26px] border-t-2 border-dashed border-gold">
            {timeline.map((item) => (
              <li
                key={item.title}
                className="grid gap-0.5 border-b-2 border-dashed border-gold py-[15px] md:grid-cols-[190px_minmax(0,1fr)] md:gap-[18px]"
              >
                <span className="font-display text-[15px] font-extrabold leading-normal text-gold-ink">
                  {item.when}
                </span>
                <div>
                  <h3 className="text-[1.26rem] font-extrabold leading-tight">{item.title}</h3>
                  {item.roles && (
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-display font-extrabold text-gold-ink">
                      {item.roles.map((role, index) => (
                        <span key={role} className="inline-flex items-center gap-2">
                          {index > 0 && (
                            <i aria-hidden="true" className="w-8 border-t-[3px] border-gold" />
                          )}
                          {role}
                        </span>
                      ))}
                    </p>
                  )}
                  <p className="mt-[3px] text-mute">{item.text}</p>
                  {item.achievement && (
                    <p className="mt-2.5 flex gap-2 font-bold">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] size-2 shrink-0 rounded-full bg-gold"
                      />
                      {item.achievement}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <figure>
          <img
            src={wackathon.src}
            alt={wackathon.alt}
            width={480}
            height={480}
            loading="lazy"
            {...zoom(wackathon)}
            className="h-auto w-full rounded-[14px]"
          />
          <figcaption className="mt-2 text-sm text-mute">
            Segundo lugar no primeiro Wackathon da Wicomm.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
