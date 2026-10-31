import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { useContactForm } from "@/hooks/useContactForm";

export function ContactForm() {
  const { form, onSubmit, result } = useContactForm();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={onSubmit} noValidate>
      <Field id="contato-nome" label="Nome" error={errors.name?.message}>
        <Input
          id="contato-nome"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby="contato-nome-erro"
          {...register("name")}
        />
      </Field>
      <Field id="contato-email" label="E-mail" error={errors.email?.message}>
        <Input
          id="contato-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby="contato-email-erro"
          {...register("email")}
        />
      </Field>
      <Field id="contato-mensagem" label="Mensagem" error={errors.message?.message}>
        <Textarea
          id="contato-mensagem"
          rows={4}
          aria-invalid={Boolean(errors.message)}
          aria-describedby="contato-mensagem-erro"
          {...register("message")}
        />
      </Field>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Site
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      <Button type="submit" variant="solid" disabled={isSubmitting}>
        {isSubmitting && <Spinner />}
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </Button>
      <p role="status" className="mt-2.5 min-h-[1.5em] font-bold">
        {result === "success" && "Mensagem enviada. Respondo em breve, obrigado!"}
        {result === "error" &&
          "Não consegui enviar agora. Tente de novo ou me chame pelo e-mail ao lado."}
      </p>
    </form>
  );
}
