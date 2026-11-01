/** Largura de cada linha, em múltiplos da altura: varia para o mosaico não virar uma grade. */
const ROW_TARGETS = [1.5, 2.8, 2.2];
/** Abaixo disso, a última linha ficaria alta demais e entra na anterior. */
const MIN_LAST_ROW = 1.6;

const rowRatio = <T>(row: T[], ratioOf: (item: T) => number) =>
  row.reduce((sum, item) => sum + ratioOf(item), 0);

/** Agrupa as mídias em linhas de alturas diferentes, sem cortar nenhuma. */
export function mosaicRows<T>(items: T[], ratioOf: (item: T) => number) {
  const rows: T[][] = [];
  let row: T[] = [];

  for (const item of items) {
    row.push(item);
    if (rowRatio(row, ratioOf) >= ROW_TARGETS[rows.length % ROW_TARGETS.length]) {
      rows.push(row);
      row = [];
    }
  }
  if (row.length > 0) rows.push(row);

  const last = rows.at(-1);
  if (rows.length > 1 && last && rowRatio(last, ratioOf) < MIN_LAST_ROW) {
    rows.pop();
    rows[rows.length - 1].push(...last);
  }
  return rows;
}
