export interface WordCorrection {
  id: string;
  greek: string;
  transliteration: string;
  commonTranslation: string;
  actualMeaning: string;
  explanation: string;
  keyVerses: Array<{ ref: string; text: string }>;
  whyItMatters: string;
  category: WordCategory;
}

export type WordCategory =
  | "theological"
  | "salvation"
  | "power"
  | "relational"
  | "prayer"
  | "kingdom";
