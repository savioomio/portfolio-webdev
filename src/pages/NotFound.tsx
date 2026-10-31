import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-wrap flex-col justify-center px-[var(--gl)] py-32">
      <p className="font-display text-lg font-extrabold text-gold-ink">Erro 404</p>
      <h1 className="mt-2 max-w-[14em] text-[clamp(2.4rem,6vw,4.6rem)] font-black leading-[1.06] tracking-[-0.025em]">
        Esta página saiu de <span className="highlight">estoque</span>
      </h1>
      <p className="mt-4 max-w-[34em] text-lg text-mute">
        O endereço não existe ou mudou de lugar. Volte para a vitrine ou veja a lista de projetos.
      </p>
      <div className="mt-7 flex flex-wrap gap-2.5">
        <ButtonLink to="/">Ir para o início</ButtonLink>
        <ButtonLink to="/projetos" variant="outline">
          Ver os projetos
        </ButtonLink>
      </div>
    </main>
  );
}
