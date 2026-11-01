export interface StoreCounts {
  faststore: number;
  storeFramework: number;
  wake: number;
  wordpress: number;
}

export const DEFAULT_COUNTS: StoreCounts = {
  faststore: 11,
  storeFramework: 11,
  wake: 11,
  wordpress: 2,
};

interface CountsRow {
  faststore: unknown;
  store_framework: unknown;
  wake: unknown;
  wordpress: unknown;
}

const isCount = (value: unknown): value is number =>
  Number.isInteger(value) && (value as number) >= 0;

/** Só aceita a linha inteira: número quebrado no banco não pode ir para o site. */
export function parseCounts(row: CountsRow | undefined): StoreCounts | null {
  if (!row) return null;
  const counts = {
    faststore: row.faststore,
    storeFramework: row.store_framework,
    wake: row.wake,
    wordpress: row.wordpress,
  };
  return Object.values(counts).every(isCount) ? (counts as StoreCounts) : null;
}

/** Lê as contagens no build. Sem banco, o deploy continua com os valores padrão. */
export async function readCounts(url?: string, key?: string): Promise<StoreCounts> {
  if (!url || !key) return DEFAULT_COUNTS;
  try {
    const response = await fetch(`${url}/rest/v1/site_stats?select=*&id=eq.1`, {
      headers: { apikey: key },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`Banco respondeu ${response.status}`);
    const [row] = (await response.json()) as CountsRow[];
    return parseCounts(row) ?? DEFAULT_COUNTS;
  } catch (error) {
    console.warn(`Contagens padrão no build: ${(error as Error).message}`);
    return DEFAULT_COUNTS;
  }
}
