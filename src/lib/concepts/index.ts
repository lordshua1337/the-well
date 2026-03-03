export type { Concept } from "./types";
import type { Concept } from "./types";

import { domain1Concepts } from "./d1-hebrew-bible";
import { domain2Concepts } from "./d2-new-testament";
import { domain3Concepts } from "./d3-non-canonical";
import { domain4Concepts } from "./d4-languages";
import { domain5Concepts } from "./d5-church-history";
import { domain6Concepts } from "./d6-theology";
import { domain7Concepts } from "./d7-contemplative";
import { domain8Concepts } from "./d8-liturgy";
import { domain9Concepts } from "./d9-comparative";
import { domain10Concepts } from "./d10-archaeology";
import { domain11Concepts } from "./d11-hermeneutics";
import { domain12Concepts } from "./d12-denominations";
import { domain13Concepts } from "./d13-pastoral";

export const concepts: Concept[] = [
  ...domain1Concepts,
  ...domain2Concepts,
  ...domain3Concepts,
  ...domain4Concepts,
  ...domain5Concepts,
  ...domain6Concepts,
  ...domain7Concepts,
  ...domain8Concepts,
  ...domain9Concepts,
  ...domain10Concepts,
  ...domain11Concepts,
  ...domain12Concepts,
  ...domain13Concepts,
];

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find((c) => c.slug === slug);
}

export function getConceptsByDomain(domainId: string): Concept[] {
  return concepts.filter((c) => c.domainId === domainId);
}

export function searchConcepts(query: string): Concept[] {
  const q = query.toLowerCase();
  return concepts.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q) ||
      c.layers.accessible.toLowerCase().includes(q) ||
      c.lensTags.some((t) => t.toLowerCase().includes(q))
  );
}
