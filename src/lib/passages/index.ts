import type { PassageDossier } from "../passage-types";
import { otDossiers } from "./old-testament";
import { ntDossiers } from "./new-testament";

export const allDossiers: readonly PassageDossier[] = [
  ...otDossiers,
  ...ntDossiers,
];

export function getDossierBySlug(slug: string): PassageDossier | undefined {
  return allDossiers.find((d) => d.id === slug);
}

export function getDossiersByTestament(
  testament: "ot" | "nt",
): readonly PassageDossier[] {
  if (testament === "ot") return otDossiers;
  return ntDossiers;
}
