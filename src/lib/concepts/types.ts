export interface Concept {
  id: string;
  slug: string;
  domainId: string;
  name: string;
  summary: string;
  lensTags: string[];
  relatedConceptSlugs: string[];
  relatedTextRefs: string[];
  layers: {
    accessible: string;
    intermediate: string;
    advanced: string;
  };
  honestAnalysis?: string;
}
