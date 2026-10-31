export interface HandPose {
  /** Polegar: 0 é aberto e 1 é fechado. */
  t: number;
  /** Indicador, médio, anelar e mínimo: 0 é esticado e 1 é fechado. */
  f: [number, number, number, number];
  /** Dedos em gancho. */
  k?: [number, number, number, number];
  /** Dedos abertos, como no V. */
  sp?: number;
}

/** As 16 letras que a mão real fez. As poses são uma aproximação. */
export const handPoses: Record<string, HandPose> = {
  A: { t: 0.28, f: [1, 1, 1, 1] },
  B: { t: 1, f: [0, 0, 0, 0] },
  C: { t: 0.42, f: [0.46, 0.46, 0.46, 0.46] },
  D: { t: 0.8, f: [0, 0.78, 0.78, 0.78] },
  E: { t: 0.92, f: [0.72, 0.72, 0.72, 0.72], k: [1, 1, 1, 1] },
  G: { t: 0.9, f: [0, 1, 1, 1] },
  I: { t: 1, f: [1, 1, 1, 0] },
  L: { t: 0, f: [0, 1, 1, 1] },
  O: { t: 0.66, f: [0.62, 0.62, 0.62, 0.62] },
  S: { t: 1, f: [1, 1, 1, 1] },
  T: { t: 0.72, f: [0.66, 0, 0, 0] },
  U: { t: 1, f: [0, 0, 1, 1] },
  V: { t: 1, f: [0, 0, 1, 1], sp: 1 },
  W: { t: 1, f: [0, 0, 0, 1] },
  X: { t: 1, f: [0.82, 1, 1, 1], k: [1, 0, 0, 0] },
  Y: { t: 0, f: [1, 1, 1, 0] },
};

export const openHand: HandPose = { t: 0.1, f: [0, 0, 0, 0] };
