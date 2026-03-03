import type { MisuseType } from "./passage-types";

export const misuseTypes: readonly MisuseType[] = [
  // Text-Level Errors
  {
    id: "misquotation",
    category: "text-level",
    name: "Misquotation",
    definition: "Wording doesn't match actual text",
    userSignature: '"The Bible says..." + wrong wording',
    correctionApproach:
      "Gently correct wording, show actual verse and context window",
  },
  {
    id: "translation-trap",
    category: "text-level",
    name: "Translation Trap",
    definition: "One English word carries wrong sense",
    userSignature:
      'Uses "helper," "perfect," "judge," "heart" with modern English meaning',
    correctionApproach:
      "Surface original-language keyword + sense range, show alternate translations",
  },
  {
    id: "semantic-narrowing",
    category: "text-level",
    name: "Semantic Narrowing",
    definition: "Word has range but is flattened to one meaning",
    userSignature: "Treats a word as if it only means one thing",
    correctionApproach:
      "Show full semantic range from lexicon, give examples of same word used differently in Scripture",
  },
  {
    id: "concept-drift",
    category: "text-level",
    name: "Concept Drift",
    definition:
      "A biblical concept's meaning has shifted across cultures or centuries",
    userSignature:
      "Uses a biblical word with its modern English meaning rather than its ancient sense",
    correctionApproach:
      "Show original cultural/linguistic meaning, trace how the concept shifted, clarify what the text meant in context",
  },

  // Context-Level Errors
  {
    id: "verse-isolation",
    category: "context-level",
    name: "Verse Isolation / Context Collapse",
    definition: "Ignores paragraph, chapter, or book-level argument",
    userSignature:
      "Quotes a single verse with no surrounding awareness",
    correctionApproach:
      "Show +/-10-20 verse context window, identify the argument the verse lives inside",
  },
  {
    id: "genre-confusion",
    category: "context-level",
    name: "Genre Confusion",
    definition:
      "Treats poetry as law, proverb as promise, prophecy as prediction",
    userSignature:
      "Applies a passage as if it were a different literary type",
    correctionApproach:
      "Name the genre, explain how that genre functions, reframe application",
  },
  {
    id: "covenant-transfer",
    category: "context-level",
    name: "Covenant Transfer Error",
    definition:
      "Maps Israel/temple/covenant promises onto modern nation or self",
    userSignature:
      '"Heal our land" = my country, "bless Israel" = foreign policy',
    correctionApproach:
      "Identify original audience and covenant setting, translate the principle forward carefully",
  },
  {
    id: "audience-shift",
    category: "context-level",
    name: "Audience Shift",
    definition: "Ignores who the text was written to/for",
    userSignature:
      "Applies text meant for specific audience universally without care",
    correctionApproach:
      "Name original audience, show what transfers and what doesn't",
  },

  // Ethics / Pastoral Errors
  {
    id: "weaponization",
    category: "ethics-pastoral",
    name: "Weaponization",
    definition:
      "Verse used to control, shame, or dominate another person",
    userSignature:
      "Using Scripture to justify control over someone",
    correctionApproach:
      "Switch to Jesus-shaped ethic, prioritize safety, refuse to aid coercion",
  },
  {
    id: "spiritual-bypassing",
    category: "ethics-pastoral",
    name: "Spiritual Bypassing",
    definition:
      "Platitudes used to avoid grief, pain, or lament",
    userSignature:
      '"Everything happens for a reason," "all things work together" used to shut down pain',
    correctionApproach:
      "Invite lament + prayer, name pain, then offer hope grounded in God's action",
  },
  {
    id: "trauma-misapplication",
    category: "ethics-pastoral",
    name: "Trauma Misapplication",
    definition: "Safety ignored in application",
    userSignature:
      "Telling someone to stay in danger, endure abuse, or accept harm as God's will",
    correctionApproach:
      "Safety-first response, refuse coercive reading, encourage seeking safe support",
  },
  {
    id: "command-as-condemnation",
    category: "ethics-pastoral",
    name: "Command-as-Condemnation",
    definition: "Shaming struggling people with imperative verses",
    userSignature:
      '"If you\'re anxious you lack faith," "fear not means stop being afraid"',
    correctionApproach:
      "Validate the struggle, reframe command as invitation/practice, normalize human experience",
  },
  {
    id: "transactionalism",
    category: "ethics-pastoral",
    name: "Transactionalism",
    definition:
      "God reduced to a vending machine -- do X, get Y",
    userSignature:
      '"If I obey/give/pray enough, God will..."',
    correctionApproach:
      "Name the covenant/genre context, reframe God's character as relational not transactional",
  },
  {
    id: "prosperity-drift",
    category: "ethics-pastoral",
    name: "Prosperity Drift",
    definition:
      "Comfort/wealth/success framed as guaranteed outcome",
    userSignature:
      '"God promised my career will succeed," "abundant life = rich"',
    correctionApproach:
      "Show original context, reframe around faithfulness and presence rather than outcomes",
  },
];

export function getMisuseTypeById(id: string): MisuseType | undefined {
  return misuseTypes.find((m) => m.id === id);
}

export function getMisuseTypesByCategory(
  category: MisuseType["category"],
): readonly MisuseType[] {
  return misuseTypes.filter((m) => m.category === category);
}
