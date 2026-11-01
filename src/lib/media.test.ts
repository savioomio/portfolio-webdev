import { describe, expect, it } from "vitest";
import { hdSrc, hdSrcSet } from "./media";

describe("hdSrc", () => {
  it("troca pela versão em alta quando ela existe", () => {
    expect(hdSrc("/media/mao.mp4")).toBe("/media/mao-hd.mp4");
  });

  it("mantém o arquivo quando não há versão em alta", () => {
    expect(hdSrc("/media/tenda.webp")).toBe("/media/tenda.webp");
  });
});

describe("hdSrcSet", () => {
  it("só existe para quem tem versão em alta", () => {
    expect(hdSrcSet("/media/tenda.webp")).toBeUndefined();
    expect(hdSrcSet("/media/voo-bristol.webp")).toBe(
      "/media/voo-bristol.webp 1x, /media/voo-bristol-hd.webp 2x",
    );
  });
});
