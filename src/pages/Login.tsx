import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, type LoginValues } from "@/schemas/loginSchema";
import { signIn } from "@/services/auth";

export default function Login() {
  const { status } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [failed, setFailed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setFailed(false);
    try {
      await signIn(email, password);
      navigate((state as { from?: string } | null)?.from ?? "/dashboard", { replace: true });
    } catch {
      setFailed(true);
    }
  });

  if (status === "signedIn") return <Navigate to="/dashboard" replace />;

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center px-[var(--gl)] py-28">
      <h1 className="text-[2.4rem] font-black leading-[1.1] tracking-[-0.02em]">Área do dono</h1>
      <p className="mt-1.5 text-mute">Entre para ver as mensagens e escolher os destaques.</p>
      <Card className="mt-6">
        <form onSubmit={onSubmit} noValidate>
          <Field id="login-email" label="E-mail" error={errors.email?.message}>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby="login-email-erro"
              {...register("email")}
            />
          </Field>
          <Field id="login-senha" label="Senha" error={errors.password?.message}>
            <Input
              id="login-senha"
              type="password"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby="login-senha-erro"
              {...register("password")}
            />
          </Field>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Spinner />}
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
          <p role="status" className="mt-2.5 min-h-[1.5em] font-bold text-danger">
            {failed && "E-mail ou senha incorretos."}
          </p>
        </form>
      </Card>
    </main>
  );
}
