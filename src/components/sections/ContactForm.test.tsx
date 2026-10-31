import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { sendContactMessage } from "@/services/messages";
import { ContactForm } from "./ContactForm";

vi.mock("@/services/messages", () => ({ sendContactMessage: vi.fn() }));

const send = vi.mocked(sendContactMessage);

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Nome"), "Maria Silva");
  await user.type(screen.getByLabelText("E-mail"), "maria@empresa.com");
  await user.type(screen.getByLabelText("Mensagem"), "Quero conversar sobre uma loja em VTEX.");
}

describe("ContactForm", () => {
  beforeEach(() => {
    send.mockReset();
  });

  it("mostra uma mensagem específica em cada campo e não envia", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(await screen.findByText("Escreva seu nome, com pelo menos 2 letras.")).toBeVisible();
    expect(screen.getByText("E-mail inválido. Use o formato nome@empresa.com.")).toBeVisible();
    expect(screen.getByText("A mensagem precisa ter no mínimo 20 caracteres.")).toBeVisible();
    expect(screen.getByLabelText("E-mail")).toHaveAttribute("aria-invalid", "true");
    expect(send).not.toHaveBeenCalled();
  });

  it("mostra o erro ao sair do campo inválido", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("E-mail"), "maria");
    await user.tab();

    expect(await screen.findByText(/E-mail inválido/)).toBeVisible();
  });

  it("bloqueia o botão durante o envio e não duplica a mensagem", async () => {
    let finish = () => {};
    send.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          finish = resolve;
        }),
    );
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);

    const button = screen.getByRole("button", { name: "Enviar mensagem" });
    await user.dblClick(button);

    const sending = await screen.findByRole("button", { name: /Enviando/ });
    expect(sending).toBeDisabled();
    expect(send).toHaveBeenCalledTimes(1);

    finish();
    expect(await screen.findByText(/Mensagem enviada/)).toBeVisible();
    expect(screen.getByLabelText("Nome")).toHaveValue("");
  });

  it("avisa quando o envio falha e mantém o que foi escrito", async () => {
    send.mockRejectedValue(new Error("fora do ar"));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);

    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(await screen.findByText(/Não consegui enviar agora/)).toBeVisible();
    expect(screen.getByLabelText("Nome")).toHaveValue("Maria Silva");
  });

  it("não grava nada quando um robô preenche o campo-armadilha", async () => {
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);
    await fillForm(user);
    await user.type(container.querySelector('input[name="website"]') as HTMLElement, "spam.com");

    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    await waitFor(() => expect(screen.getByText(/Mensagem enviada/)).toBeVisible());
    expect(send).not.toHaveBeenCalled();
  });
});
