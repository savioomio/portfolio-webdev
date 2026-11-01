import { describe, expect, it } from "vitest";
import {
  PLATAO_TIMING,
  plataoCycle,
  plataoExamples,
  plataoFinalScene,
  plataoSceneAt,
} from "./platao";

const MS = plataoExamples.vtex.ms;

describe("plataoSceneAt", () => {
  it("começa ouvindo, sem nenhuma fala", () => {
    expect(plataoSceneAt(0, MS)).toMatchObject({
      stage: "listening",
      clientSpoke: false,
      youSpoke: false,
      triggered: false,
    });
  });

  it("mostra primeiro a fala do cliente, depois a sua e então a frase que acorda o Platão", () => {
    const { client, you, trigger } = PLATAO_TIMING;
    expect(plataoSceneAt(client, MS)).toMatchObject({ clientSpoke: true, youSpoke: false });
    expect(plataoSceneAt(you, MS)).toMatchObject({ youSpoke: true, triggered: false });
    expect(plataoSceneAt(trigger, MS)).toMatchObject({ triggered: true, stage: "listening" });
  });

  it("busca durante o tempo real da resposta, do passo 0 ao 3", () => {
    const start = PLATAO_TIMING.search;
    expect(plataoSceneAt(start, MS)).toMatchObject({ stage: "searching", step: 0, seconds: 0 });
    expect(plataoSceneAt(start + MS - 1, MS)).toMatchObject({ stage: "searching", step: 3 });
  });

  it("responde e depois sai de cena", () => {
    const answered = PLATAO_TIMING.search + MS;
    expect(plataoSceneAt(answered, MS)).toMatchObject({ stage: "answer", leaving: false });
    expect(plataoSceneAt(answered + PLATAO_TIMING.reading, MS).leaving).toBe(true);
  });

  it("recomeça no fim do ciclo", () => {
    expect(plataoSceneAt(plataoCycle(MS), MS)).toEqual(plataoSceneAt(0, MS));
  });

  it("não quebra com tempo negativo", () => {
    expect(plataoSceneAt(-50, MS).stage).toBe("answer");
  });
});

describe("plataoFinalScene", () => {
  it("é a resposta pronta, sem sair de cena", () => {
    expect(plataoFinalScene(MS)).toMatchObject({ stage: "answer", leaving: false });
  });
});

describe("plataoExamples", () => {
  it("só o modo VTEX tem conta da loja", () => {
    expect(plataoExamples.vtex.store).toBe(true);
    expect(plataoExamples.wake.store).toBe(false);
  });

  it("cada exemplo traz a frase de dúvida dentro da própria fala", () => {
    for (const example of Object.values(plataoExamples)) {
      expect(example.said.toLowerCase()).toContain(example.trigger);
    }
  });
});
