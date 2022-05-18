export type ScoreTable = {
  metadata: {
    finished: number;
    total: number;
  };
  rows: Score[];
};

export type Score = {
  name: string;
  score: number;
};
