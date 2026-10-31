import { lazy, Suspense } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { site } from "@/content/site";
import { useInView } from "@/hooks/useInView";

const ContactForm = lazy(() =>
  import("./ContactForm").then((module) => ({ default: module.ContactForm })),
);

/** Mesma altura do formulário, para a página não pular quando ele entrar. */
function FormPlaceholder() {
  return (
    <div className="flex min-h-[430px] items-center justify-center">
      <Spinner className="text-2xl" label="Carregando o formulário" />
    </div>
  );
}

export function Contact() {
  const { ref, inView } = useInView<HTMLElement>("600px 0px");

  return (
    <section
      ref={ref}
      id="contato"
      className="on-gold relative scroll-mt-20 bg-gold px-[var(--gl)] py-[clamp(72px,12svh,120px)] text-[#1D1809]"
    >
      <div className="mx-auto grid w-full max-w-wrap items-start gap-[clamp(24px,5vw,72px)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div>
          <h2 className="max-w-[11em] text-[clamp(2.2rem,4.4vw,4rem)] font-black leading-[1.04] tracking-[-0.022em]">
            Vamos embalar sua próxima loja?
          </h2>
          <dl className="mt-5 grid gap-2.5">
            <div>
              <dt className="text-sm font-bold">E-mail</dt>
              <dd className="font-display text-[clamp(1.02rem,1.6vw,1.24rem)] font-extrabold leading-tight [overflow-wrap:anywhere]">
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-bold">LinkedIn</dt>
              <dd className="font-display text-[clamp(1.02rem,1.6vw,1.24rem)] font-extrabold leading-tight">
                <a href={site.linkedin}>linkedin.com/in/savioomio</a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-bold">GitHub</dt>
              <dd className="font-display text-[clamp(1.02rem,1.6vw,1.24rem)] font-extrabold leading-tight">
                <a href={site.github}>github.com/savioomio</a>
              </dd>
            </div>
          </dl>
        </div>
        {inView ? (
          <Suspense fallback={<FormPlaceholder />}>
            <ContactForm />
          </Suspense>
        ) : (
          <FormPlaceholder />
        )}
      </div>
    </section>
  );
}
