import type { ScholarlySource } from "./passage-types";

export const scholarlySources: readonly ScholarlySource[] = [
  {
    id: "bhs",
    name: "Biblia Hebraica Stuttgartensia",
    shortName: "BHS",
    type: "text-base",
    description:
      "Critical edition of the Hebrew Bible based on the Leningrad Codex",
  },
  {
    id: "bhq",
    name: "Biblia Hebraica Quinta",
    shortName: "BHQ",
    type: "text-base",
    description: "Ongoing successor to BHS",
  },
  {
    id: "na28",
    name: "Nestle-Aland Novum Testamentum Graece (28th ed.)",
    shortName: "NA28",
    type: "text-base",
    description: "Critical edition of the Greek New Testament",
  },
  {
    id: "ubs5",
    name: "United Bible Societies Greek New Testament (5th ed.)",
    shortName: "UBS5",
    type: "text-base",
    description:
      "Critical edition of the Greek NT, companion to NA28",
  },
  {
    id: "lxx",
    name: "Septuaginta (Rahlfs-Hanhart)",
    shortName: "LXX",
    type: "text-base",
    description: "Greek Old Testament, revised 2006",
  },
  {
    id: "net",
    name: "New English Translation (NET Bible)",
    shortName: "NET",
    type: "translation",
    description:
      "Chosen for unusually explicit translator notes and text-critical notes",
  },
  {
    id: "bdb",
    name: "Brown-Driver-Briggs Hebrew and English Lexicon",
    shortName: "BDB",
    type: "lexicon",
    description:
      "Hebrew/Aramaic semantic range and usage (1906, open-access)",
  },
  {
    id: "bdag",
    name: "Greek-English Lexicon of the NT (3rd ed.)",
    shortName: "BDAG",
    type: "lexicon",
    description: "Standard Greek NT lexicon",
  },
  {
    id: "halot",
    name: "Hebrew and Aramaic Lexicon of the OT",
    shortName: "HALOT",
    type: "lexicon",
    description: "Brill scholarly Hebrew/Aramaic lexicon",
  },
  {
    id: "sbl",
    name: "Bible Odyssey (Society of Biblical Literature)",
    shortName: "SBL/BibleOdyssey",
    type: "reference",
    description:
      "Academically oriented background articles and dictionary entries",
  },
];

export function getSourceById(id: string): ScholarlySource | undefined {
  return scholarlySources.find((s) => s.id === id);
}
