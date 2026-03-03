// Passage Dossier types for the Scripture Misuse Expansion Pack

export interface ScholarlySource {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  readonly description: string;
  readonly type: "text-base" | "translation" | "lexicon" | "reference";
}

export interface MisuseType {
  readonly id: string;
  readonly category: "text-level" | "context-level" | "ethics-pastoral";
  readonly name: string;
  readonly definition: string;
  readonly userSignature: string;
  readonly correctionApproach: string;
}

export interface KeyTerm {
  readonly original: string;
  readonly transliteration: string;
  readonly language: "hebrew" | "aramaic" | "greek";
  readonly glossRange: string;
  readonly significance: string;
}

export interface PassageDossier {
  readonly id: string;
  readonly priority: "P1" | "P2";
  readonly passage: string;
  readonly commonQuoteForm: string;
  readonly context: {
    readonly historicalLinguistic: string;
    readonly keyTerms: readonly KeyTerm[];
    readonly translationIssues: string;
  };
  readonly misuses: {
    readonly types: readonly string[];
    readonly description: string;
    readonly concreteExamples: string;
  };
  readonly loveImpact: string;
  readonly clarifiedReading: {
    readonly reframe: string;
    readonly appResponse: string;
  };
}

export function getDossierById(
  dossiers: readonly PassageDossier[],
  id: string,
): PassageDossier | undefined {
  return dossiers.find((d) => d.id === id);
}

export function getDossiersByMisuseType(
  dossiers: readonly PassageDossier[],
  misuseTypeId: string,
): readonly PassageDossier[] {
  return dossiers.filter((d) => d.misuses.types.includes(misuseTypeId));
}

export function getP1Dossiers(
  dossiers: readonly PassageDossier[],
): readonly PassageDossier[] {
  return dossiers.filter((d) => d.priority === "P1");
}
