const timeline = [
  {
    when: "out/2024 até hoje",
    title: "Front-End Pleno na Wicomm",
    text: "Remoto. Referência técnica em VTEX FastStore e dev lead em projetos FastStore.",
  },
  {
    when: "set/2023 a ago/2024",
    title: "Estágio bolsista no IF Baiano",
    text: "Callidus Link: automação e monitoramento de consumo hídrico com IoT.",
  },
  {
    when: "Wackathon da Wicomm",
    title: "Segundo lugar, em dupla",
    text: "Uma loja completa construída só com prompts.",
  },
  {
    when: "2026 a 2029",
    title: "Engenharia de Software na FIAP",
    text: "Bacharelado, depois do técnico em Informática para Internet no IF Baiano.",
  },
];

export function Experience() {
  return (
    <section
      id="hoje"
      className="relative scroll-mt-20 bg-bg px-[var(--gl)] py-[clamp(72px,11svh,130px)]"
    >
      <div className="mx-auto grid w-full max-w-wrap items-start gap-[clamp(24px,5vw,72px)] md:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)]">
        <div>
          <h2 className="text-[clamp(2.2rem,4.4vw,4rem)] font-black leading-[1.04] tracking-[-0.022em]">
            3 anos de experiência, 2 deles em e-commerce
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
                  <p className="mt-[3px] text-mute">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <figure className="max-w-[260px] md:max-w-none">
          <img
            src="/media/wackathon.webp"
            alt="Anúncio dos vencedores do Wackathon Wicomm: a minha dupla ficou em 2º lugar"
            width={480}
            height={480}
            loading="lazy"
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
