export type DrankOrder = { name: string; amounts: number[] };

export type DranksData = {
  metadata: { header: string[] };
  rows: DrankOrder[];
};
