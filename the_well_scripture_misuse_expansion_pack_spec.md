# The Well — Scripture Misuse Expansion Pack Specification

---

## ⚠️ CRITICAL: BUILD RULES — READ BEFORE DOING ANYTHING

**This is an EXPANSION PACK. It ADDS to the existing Well application. It does NOT replace anything.**

- **DO NOT** delete, overwrite, replace, or refactor any existing code, components, data, routes, or styles.
- **DO NOT** restructure existing navigation, card systems, chat infrastructure, or search.
- **DO NOT** rename, reorganize, or "improve" existing files, directories, or architecture.
- **DO** add new modules, components, data files, and routes that integrate with the existing structure.
- **DO** extend existing interfaces/types where needed — append to them, never rewrite them.
- **DO** use the existing navigation, styling, and component patterns already in the codebase.
- **If something in this spec conflicts with existing implementation decisions, the existing implementation wins.** Ask before overriding.

**Integration approach:**
1. Read and understand the existing codebase FIRST before writing anything.
2. Identify existing data models, component patterns, routing, state management, and chat/AI infrastructure.
3. Add expansion pack content using those same patterns.
4. New modules (Passage Dossiers, Misuse Taxonomy, Chatbot Protocol) plug into existing navigation and chat — they don't live in a parallel universe.
5. The 50 passage dossiers feed into existing card, chat, search, and AI response systems as a new content layer.

---

## PURPOSE

This spec adds three capabilities to The Well:

1. **50 Passage Dossiers** — structured entries for high-frequency, high-impact biblical passages commonly misquoted, weaponized, or decontextualized
2. **Misuse Taxonomy + Detection** — classification system that the AI layer uses to identify misuse patterns in user messages and route to corrective pathways
3. **Chatbot Protocol** — rules, guardrails, and generation method for producing responses that are scripturally faithful, pastorally safe, and non-formulaic

Claude Code: implement exactly what's specified. Every field is intentional. Don't improvise theology. Don't summarize dossiers. Don't template-ify the pastoral voice.

---

## SCHOLARLY SOURCE BASE

All dossier content references these primary sources. Store as app-level constants for citation rendering.

```typescript
interface ScholarlySource {
  id: string;
  name: string;
  shortName: string;
  description: string;
  type: "text-base" | "translation" | "lexicon" | "reference";
}
```

| id | name | shortName | type | description |
|----|------|-----------|------|-------------|
| `bhs` | Biblia Hebraica Stuttgartensia | BHS | text-base | Critical edition of the Hebrew Bible based on the Leningrad Codex |
| `bhq` | Biblia Hebraica Quinta | BHQ | text-base | Ongoing successor to BHS |
| `na28` | Nestle-Aland Novum Testamentum Graece (28th ed.) | NA28 | text-base | Critical edition of the Greek New Testament |
| `ubs5` | United Bible Societies Greek New Testament (5th ed.) | UBS5 | text-base | Critical edition of the Greek NT, companion to NA28 |
| `lxx` | Septuaginta (Rahlfs-Hanhart) | LXX | text-base | Greek Old Testament, revised 2006 |
| `net` | New English Translation (NET Bible) | NET | translation | Chosen for unusually explicit translator notes and text-critical notes |
| `bdb` | Brown-Driver-Briggs Hebrew and English Lexicon | BDB | lexicon | Hebrew/Aramaic semantic range and usage (1906, open-access) |
| `bdag` | Greek-English Lexicon of the NT (3rd ed.) | BDAG | lexicon | Standard Greek NT lexicon |
| `halot` | Hebrew and Aramaic Lexicon of the OT | HALOT | lexicon | Brill scholarly Hebrew/Aramaic lexicon |
| `sbl` | Bible Odyssey (Society of Biblical Literature) | SBL/BibleOdyssey | reference | Academically oriented background articles and dictionary entries |

---

## MODULE 1: MISUSE TAXONOMY

### Purpose
Classification system used by the AI layer to (1) detect the error type from a user's message and (2) select the corrective pathway. Every passage dossier tags one or more misuse types.

### Data Model

```typescript
interface MisuseType {
  id: string;
  category: "text-level" | "context-level" | "ethics-pastoral";
  name: string;
  definition: string;
  userSignature: string; // Typical phrasing pattern in user messages
  correctionApproach: string; // What the AI does when this is detected
}
```

### Text-Level Errors

| id | name | definition | userSignature | correctionApproach |
|----|------|-----------|---------------|-------------------|
| `misquotation` | Misquotation | Wording doesn't match actual text | "The Bible says…" + wrong wording | Gently correct wording, show actual verse and context window |
| `translation-trap` | Translation Trap | One English word carries wrong sense | Uses "helper," "perfect," "judge," "heart" with modern English meaning | Surface original-language keyword + sense range, show alternate translations |
| `semantic-narrowing` | Semantic Narrowing | Word has range but is flattened to one meaning | Treats a word as if it only means one thing | Show full semantic range from lexicon, give examples of same word used differently in Scripture |

### Context-Level Errors

| id | name | definition | userSignature | correctionApproach |
|----|------|-----------|---------------|-------------------|
| `verse-isolation` | Verse Isolation / Context Collapse | Ignores paragraph, chapter, or book-level argument | Quotes a single verse with no surrounding awareness | Show ±10-20 verse context window, identify the argument the verse lives inside |
| `genre-confusion` | Genre Confusion | Treats poetry as law, proverb as promise, prophecy as prediction | Applies a passage as if it were a different literary type | Name the genre, explain how that genre functions, reframe application |
| `covenant-transfer` | Covenant Transfer Error | Maps Israel/temple/covenant promises onto modern nation or self | "Heal our land" = my country, "bless Israel" = foreign policy | Identify original audience and covenant setting, translate the principle forward carefully |
| `audience-shift` | Audience Shift | Ignores who the text was written to/for | Applies text meant for specific audience universally without care | Name original audience, show what transfers and what doesn't |

### Ethics / Pastoral Errors

| id | name | definition | userSignature | correctionApproach |
|----|------|-----------|---------------|-------------------|
| `weaponization` | Weaponization | Verse used to control, shame, or dominate another person | Using Scripture to justify control over someone | Switch to Jesus-shaped ethic, prioritize safety, refuse to aid coercion |
| `spiritual-bypassing` | Spiritual Bypassing | Platitudes used to avoid grief, pain, or lament | "Everything happens for a reason," "all things work together" used to shut down pain | Invite lament + prayer, name pain, then offer hope grounded in God's action |
| `trauma-misapplication` | Trauma Misapplication | Safety ignored in application | Telling someone to stay in danger, endure abuse, or accept harm as God's will | Safety-first response, refuse coercive reading, encourage seeking safe support |
| `command-as-condemnation` | Command-as-Condemnation | Shaming struggling people with imperative verses | "If you're anxious you lack faith," "fear not means stop being afraid" | Validate the struggle, reframe command as invitation/practice, normalize human experience |
| `transactionalism` | Transactionalism | God reduced to a vending machine — do X, get Y | "If I obey/give/pray enough, God will…" | Name the covenant/genre context, reframe God's character as relational not transactional |
| `prosperity-drift` | Prosperity Drift | Comfort/wealth/success framed as guaranteed outcome | "God promised my career will succeed," "abundant life = rich" | Show original context, reframe around faithfulness and presence rather than outcomes |

---

## MODULE 2: 50 PASSAGE DOSSIERS

### Data Model

```typescript
interface PassageDossier {
  id: string;
  priority: "P1" | "P2"; // P1 = highest misuse risk + engagement
  passage: string; // e.g., "Genesis 1:26-28"
  commonQuoteForm: string; // How people typically cite it
  
  context: {
    historicalLinguistic: string; // What's actually going on in the text
    keyTerms: KeyTerm[]; // Original language terms that matter
    translationIssues: string; // Where English obscures meaning
  };
  
  misuses: {
    types: string[]; // IDs from MisuseType taxonomy
    description: string; // How it gets misused
    concreteExamples: string; // Real-world cultural/political/counseling examples
  };
  
  loveImpact: string; // How the misuse distorts felt access to God's love
  
  clarifiedReading: {
    reframe: string; // Corrected understanding
    appResponse: string; // Short, human, pastoral response for chat/card use
  };
}

interface KeyTerm {
  original: string; // Hebrew/Aramaic/Greek word
  transliteration: string;
  language: "hebrew" | "aramaic" | "greek";
  glossRange: string; // Semantic range
  significance: string; // Why this term matters for this passage
}
```

---

### GENESIS

#### Dossier: Genesis 1:26-28

```yaml
id: gen-1-26-28
priority: P1
passage: "Genesis 1:26-28"
commonQuoteForm: "Have dominion…subdue"

context:
  historicalLinguistic: |
    "Dominion" is tied to humanity as God's image, implying representative 
    stewardship not exploitation. Humanity is God's image-bearer — the authority 
    is delegated and accountable.
  keyTerms:
    - original: "רָדָה"
      transliteration: "radah"
      language: hebrew
      glossRange: "rule, have dominion, tread down"
      significance: "Has a range — can mean careful governance or harsh treading. Context of image-bearing points to stewardship."
  translationIssues: |
    "Dominion" in English sounds like domination. The Hebrew carries a range 
    that includes shepherding-style rule, not just conquest.

misuses:
  types: ["semantic-narrowing", "weaponization"]
  description: "Used to justify ecological exploitation, domination politics, or 'strong rule' as inherently godly."
  concreteExamples: "Cited to dismiss environmental stewardship. Used in political rhetoric to frame aggressive leadership as biblical mandate."

loveImpact: "Makes God's image look like conquest, not care. People who've been dominated see God as endorsing their oppression."

clarifiedReading:
  reframe: "God gives authority as accountable service. Image-bearing means stewardship that protects life."
  appResponse: "Being made in God's image means carrying his care into the world — not exploiting it. Authority in Scripture looks like a shepherd, not a conqueror."
```

#### Dossier: Genesis 2:18

```yaml
id: gen-2-18
priority: P1
passage: "Genesis 2:18"
commonQuoteForm: "Helper"

context:
  historicalLinguistic: |
    The word translated "helper" is used elsewhere in the OT to describe God 
    himself as helper. It does not imply inferiority or subordination.
  keyTerms:
    - original: "עֵזֶר"
      transliteration: "ezer"
      language: hebrew
      glossRange: "help, succor, one who helps"
      significance: "Used of God in Psalms (e.g., Ps 33:20, 70:5). Describes strength brought to a situation, not servitude."
  translationIssues: |
    English "helper" sounds like assistant or subordinate. Hebrew ezer describes 
    a corresponding partner who brings strength — not a junior role.

misuses:
  types: ["translation-trap", "weaponization"]
  description: "Reducing women to assistants or spiritual minors based on one English word."
  concreteExamples: "Used in complementarian arguments to establish fixed hierarchy. Cited in counseling to tell women their role is support-only."

loveImpact: "Turns partnership into hierarchy and blocks mutual love. Women internalize lesser-than identity as 'biblical.'"

clarifiedReading:
  reframe: "'A partner corresponding to him' — not a subordinate. God addresses loneliness with mutuality."
  appResponse: "The word ezer is used of God himself as Israel's helper. It means strength brought alongside — a partner, not a servant. God's design is mutuality, not hierarchy."
```

#### Dossier: Genesis 3:16

```yaml
id: gen-3-16
priority: P1
passage: "Genesis 3:16"
commonQuoteForm: "Your desire…he will rule"

context:
  historicalLinguistic: |
    Describes fractured relational dynamics after the fall — not a divine ideal 
    or command for how relationships should work.
  keyTerms:
    - original: "תְּשׁוּקָה"
      transliteration: "teshuqah"
      language: hebrew
      glossRange: "longing, desire, urge"
      significance: "Debated — could be desire toward or desire to control. Either way, it describes brokenness, not prescription."
    - original: "מָשַׁל"
      transliteration: "mashal"
      language: hebrew
      glossRange: "rule, have dominion, govern"
      significance: "Describes what WILL happen in fallen reality, not what SHOULD happen."
  translationIssues: |
    English makes it sound like a command ("he will rule over you"). Hebrew 
    describes a consequence of the fall — diagnosis, not prescription.

misuses:
  types: ["weaponization", "genre-confusion"]
  description: "'God ordained male domination' or 'women's desire = manipulative control.'"
  concreteExamples: "Used in marriage counseling to normalize unilateral authority. Cited to frame women's agency as sinful desire for control."

loveImpact: "Sanctifies imbalance and normalizes harm. Makes God appear to endorse domination as design."

clarifiedReading:
  reframe: "This is diagnosis of brokenness, not a command. Redemption moves relationships toward mutual honor and love."
  appResponse: "Genesis 3:16 describes what went wrong, not what God wants. The fall fractured relationships. Redemption restores them toward mutual honor — not domination."
```

#### Dossier: Genesis 9:25-27

```yaml
id: gen-9-25-27
priority: P1
passage: "Genesis 9:25-27"
commonQuoteForm: "Curse of Ham"

context:
  historicalLinguistic: |
    The curse targets Canaan specifically, not a blanket racial group. NET notes 
    highlight the historical-link logic within the narrative — not racial destiny.
  keyTerms: []
  translationIssues: |
    The text curses Canaan (a specific descendant), not Ham broadly. Mapping 
    this onto modern ethnic groups requires eisegesis that the text does not support.

misuses:
  types: ["weaponization", "audience-shift"]
  description: "Used historically to justify slavery and racism by mapping descendants onto modern ethnic groups."
  concreteExamples: "Cited extensively in pro-slavery theology. Still surfaces in white supremacist and Christian nationalist rhetoric."

loveImpact: "Makes Scripture a tool of oppression, severing trust in God's goodness for anyone targeted by this reading."

clarifiedReading:
  reframe: "The text is not a racial hierarchy charter. Racialized readings are a misuse of the passage."
  appResponse: "The curse in Genesis 9 targets Canaan specifically within a narrative context. It has been catastrophically misused to justify racism and slavery. That reading is not in the text — it was imposed on it."
```

#### Dossier: Genesis 12:3

```yaml
id: gen-12-3
priority: P1
passage: "Genesis 12:3"
commonQuoteForm: "Bless those who bless you"

context:
  historicalLinguistic: |
    Spoken to Abram within covenant promise, before "Israel" as a nation exists. 
    The blessing theme aims at "all families of the earth" — universal scope.
  keyTerms: []
  translationIssues: |
    "Bless/curse" language in covenant context functions differently than modern 
    transactional blessing. The trajectory is toward universal blessing, not 
    partisan loyalty tests.

misuses:
  types: ["covenant-transfer", "verse-isolation"]
  description: "Used to mandate modern foreign policy or nationalist agendas."
  concreteExamples: "Cited in U.S. political debate to frame specific foreign policy positions as biblically mandatory."

loveImpact: "Makes God's love feel partisan and transactional — contingent on geopolitical alignment."

clarifiedReading:
  reframe: "God's covenant purposes move toward blessing all nations. Apply as hospitality, anti-antisemitism, and peacemaking — not policy slogans."
  appResponse: "God's promise to Abraham bends toward blessing all nations. Using it as a foreign policy proof-text flattens a covenant that's meant to expand love, not restrict it."
```

---

### EXODUS

#### Dossier: Exodus 20:13

```yaml
id: exod-20-13
priority: P1
passage: "Exodus 20:13"
commonQuoteForm: "Thou shalt not kill"

context:
  historicalLinguistic: |
    The Hebrew verb specifically targets unauthorized taking of human life — not 
    every possible category of killing.
  keyTerms:
    - original: "רָצַח"
      transliteration: "ratsakh"
      language: hebrew
      glossRange: "murder, slay (unlawfully)"
      significance: "Narrower than English 'kill.' Refers to criminal/unauthorized killing. Other Hebrew verbs cover warfare, execution, etc."
  translationIssues: |
    "Kill" in English is absolute. Hebrew ratsakh is a specific category — 
    unlawful/criminal killing. The command affirms sanctity of life while 
    leaving moral reasoning space for complex cases.

misuses:
  types: ["translation-trap", "semantic-narrowing"]
  description: "Polarized ethics debates that treat the verse as one-word absolutism without categories."
  concreteExamples: "Used as a blanket argument in capital punishment, warfare, and self-defense debates without engaging the Hebrew distinction."

loveImpact: "Turns moral complexity into shame or ideology warfare. People feel condemned for any position."

clarifiedReading:
  reframe: "The command teaches the sanctity of life and forbids criminal violence. Moral reasoning remains necessary."
  appResponse: "The Hebrew word here is ratsakh — unlawful killing, not every form of taking life. The command protects the sanctity of human life. It doesn't eliminate the need for moral discernment in complex situations."
```

#### Dossier: Exodus 21:24-25

```yaml
id: exod-21-24-25
priority: P1
passage: "Exodus 21:24-25"
commonQuoteForm: "Eye for eye"

context:
  historicalLinguistic: |
    Lex talionis functions as measured justice in a legal setting — it LIMITS 
    retaliation to proportional response. It's a ceiling, not a floor.
  keyTerms: []
  translationIssues: |
    English "eye for an eye" sounds like a revenge mandate. In ANE legal 
    context, it was revolutionary restraint — you can't escalate beyond the harm done.

misuses:
  types: ["genre-confusion", "verse-isolation"]
  description: "'Bible commands revenge' or using it to reject Jesus' teaching in Matthew 5."
  concreteExamples: "Cited as evidence the OT God is cruel. Used to justify personal retaliation. Also used to create OT vs NT conflict."

loveImpact: "Paints God as endorsing cruelty rather than restraint."

clarifiedReading:
  reframe: "This is legal proportionality, not personal vengeance. Jesus presses disciples beyond retaliation into love-shaped responses."
  appResponse: "Eye for eye was a legal limit — you can't escalate beyond the harm done. It's a ceiling on revenge, not an endorsement of it. Jesus takes it further: move past retaliation entirely into creative love."
```

---

### LEVITICUS

#### Dossier: Leviticus 18:22

```yaml
id: lev-18-22
priority: P1
passage: "Leviticus 18:22"
commonQuoteForm: "Abomination"

context:
  historicalLinguistic: |
    Part of Israel's holiness code, framed by identity, worship, and boundary-
    setting in an ancient Near Eastern context. NET renders "detestable act."
  keyTerms: []
  translationIssues: |
    "Abomination" in English carries absolute moral horror. The Hebrew 
    toevah has a range that includes ritual/cultural boundary violations. 
    Genre and context must govern interpretation.

misuses:
  types: ["verse-isolation", "weaponization"]
  description: "Either used as a blunt weapon against LGBTQ+ people, or dismissed entirely without genre/context work."
  concreteExamples: "Cited on protest signs. Used to justify rejection of individuals. Conversely, dismissed with 'that's just the OT' without serious engagement."

loveImpact: "Weaponization yields shame and fear, not love-driven holiness. People experience God as hostile."

clarifiedReading:
  reframe: "Treat as law-text with careful context, canonical reading, and pastoral restraint. Do not use as a cudgel or slogan."
  appResponse: "This verse sits inside Israel's holiness code in an ancient Near Eastern context. It requires careful, honest engagement — not sloganeering in either direction. The Well doesn't weaponize Scripture against people."
```

#### Dossier: Leviticus 19:18

```yaml
id: lev-19-18
priority: P1
passage: "Leviticus 19:18"
commonQuoteForm: "Love your neighbor"

context:
  historicalLinguistic: |
    Sits inside justice commands (Lev 19:15-18) — not a standalone sentiment 
    but embedded in concrete ethical instructions about fairness, dignity, 
    and non-vengeance.
  keyTerms: []
  translationIssues: |
    "Love" in English sounds like a feeling. In this context, love is enacted 
    fairness, dignity, and refusal of vengeance — it's behavioral.

misuses:
  types: ["verse-isolation", "semantic-narrowing"]
  description: "Reduced to a sentiment while ignoring the justice, fairness, and non-vengeance context it lives in."
  concreteExamples: "Used as a vague niceness command while ignoring systemic injustice. Cited to avoid confrontation: 'just love people' = don't challenge anything."

loveImpact: "Love becomes vague and toothless — not tangible enough to change anything."

clarifiedReading:
  reframe: "Biblical 'love' is enacted fairness, dignity, and refusal of vengeance. Jesus elevates it as a core command."
  appResponse: "Love your neighbor isn't a greeting card. In Leviticus 19, it's surrounded by commands about justice, fair wages, and not taking revenge. Biblical love has teeth — it acts."
```

---

### DEUTERONOMY

#### Dossier: Deuteronomy 6:5

```yaml
id: deut-6-5
priority: P1
passage: "Deuteronomy 6:5"
commonQuoteForm: "Love God with all your heart"

context:
  historicalLinguistic: |
    "Heart" in biblical Hebrew includes intellect and volition, not only emotion. 
    NET footnote makes this explicit.
  keyTerms:
    - original: "לֵב / לֵבָב"
      transliteration: "lev / levav"
      language: hebrew
      glossRange: "heart, mind, inner person, will, understanding"
      significance: "Biblical 'heart' is the seat of thought and decision, not just feeling. Loving God involves the whole self."
  translationIssues: |
    English "heart" = emotions. Hebrew lev = mind + will + emotions. This 
    creates a false faith/feeling equation.

misuses:
  types: ["translation-trap", "concept-drift"]
  description: "'God only wants feelings' or guilt when emotions fluctuate."
  concreteExamples: "People in dry spiritual seasons assume they've failed God because they don't feel strong emotion. Used to shame intellectual questioning."

loveImpact: "People confuse dry feelings with spiritual failure."

clarifiedReading:
  reframe: "Loving God involves the whole self — including mind and choices. Love is covenant loyalty expressed in life."
  appResponse: "In Hebrew, 'heart' includes your mind, your will, and your choices — not just your feelings. Loving God with all your heart means orienting your whole life, not maintaining an emotional high."
```

#### Dossier: Deuteronomy 28

```yaml
id: deut-28
priority: P2
passage: "Deuteronomy 28"
commonQuoteForm: "Blessed…cursed"

context:
  historicalLinguistic: |
    Covenant blessings and curses tied to Israel's obedience within a specific 
    covenant frame — Sinai covenant terms, not universal spiritual laws.
  keyTerms: []
  translationIssues: |
    "Blessed/cursed" in English sounds like universal karma. In context, these 
    are specific covenant terms for a specific people at a specific moment.

misuses:
  types: ["covenant-transfer", "transactionalism"]
  description: "Prosperity moralism: 'If you obey, you'll be rich and healthy.'"
  concreteExamples: "Prosperity gospel preaching. National destiny claims. Used to shame people in poverty or illness as disobedient."

loveImpact: "Creates fear-based faith and shame in suffering. Sick or poor people feel cursed."

clarifiedReading:
  reframe: "These are covenant terms for Israel. Christ-shaped discipleship treats suffering with honesty and hope."
  appResponse: "Deuteronomy 28 is covenant language for Israel at Sinai — not a universal formula. Suffering doesn't mean you're cursed. Jesus walked straight into suffering and called it faithful."
```

---

### HISTORICAL BOOKS

#### Dossier: Joshua 1:9

```yaml
id: josh-1-9
priority: P1
passage: "Joshua 1:9"
commonQuoteForm: "Be strong and courageous"

context:
  historicalLinguistic: |
    Spoken to Joshua as a specific commissioning for leadership. The courage 
    is grounded in "I am with you" — God's presence, not personal grit.
  keyTerms: []
  translationIssues: |
    English hears "be strong and courageous" as self-help motivation. 
    The Hebrew framing grounds it entirely in divine presence.

misuses:
  types: ["verse-isolation", "audience-shift"]
  description: "Generic hype slogan for exams, sports, and motivational content — detached from dependence on God's presence."
  concreteExamples: "On merchandise, sports gear, graduation cards. Used without any reference to the 'I am with you' foundation."

loveImpact: "Encouragement becomes self-reliance. When courage fails, God feels absent."

clarifiedReading:
  reframe: "Courage is grounded in 'I am with you,' not in personal grit."
  appResponse: "Joshua's courage isn't bootstrapping. It's grounded in one thing: 'I will be with you wherever you go.' The strength comes from presence, not performance."
```

#### Dossier: 2 Chronicles 7:14

```yaml
id: 2chr-7-14
priority: P1
passage: "2 Chronicles 7:14"
commonQuoteForm: "Heal their land"

context:
  historicalLinguistic: |
    Temple dedication context — God's promise tied to "this place" (the temple) 
    and covenant people (Israel). The "land" is specific, not any modern nation.
  keyTerms: []
  translationIssues: |
    "My people" and "their land" have specific referents in the original 
    context that get silently transferred to modern nations.

misuses:
  types: ["covenant-transfer", "audience-shift"]
  description: "National revival proof-text, especially in U.S. civil religion."
  concreteExamples: "Recited at political rallies, National Day of Prayer events, legislative sessions. 'If America prays, God will heal America.'"

loveImpact: "Makes God's love feel like a national deal — transactional and partisan."

clarifiedReading:
  reframe: "God calls his people to humility and repentance. The text is not a blank check for modern nation-states."
  appResponse: "This promise was spoken at Solomon's temple dedication to covenant Israel. The transferable principle is humility and repentance. The non-transferable part is 'this land = my country.'"
```

---

### PSALMS

#### Dossier: Psalm 23

```yaml
id: ps-23
priority: P2
passage: "Psalm 23"
commonQuoteForm: "The Lord is my shepherd"

context:
  historicalLinguistic: |
    Pastoral metaphor for God's presence THROUGH danger — "valley of the shadow 
    of death" is central, not incidental. The psalm doesn't promise avoidance 
    of hardship.
  keyTerms: []
  translationIssues: |
    Familiarity breeds flattening. People know the words so well they stop 
    hearing "through the darkest valley."

misuses:
  types: ["spiritual-bypassing", "prosperity-drift"]
  description: "'If God is my shepherd, I won't face hardship.'"
  concreteExamples: "Used as comfort verse while implying suffering means God isn't shepherding. Quoted at funerals in ways that shut down grief."

loveImpact: "When hardship comes, people feel abandoned by the shepherd they were promised."

clarifiedReading:
  reframe: "The psalm promises presence and guidance THROUGH the darkest valley, not a pain-free path."
  appResponse: "Psalm 23 doesn't promise you'll avoid the valley. It promises you won't walk through it alone. The shepherd's presence is the point — not the absence of danger."
```

#### Dossier: Psalm 37:4

```yaml
id: ps-37-4
priority: P1
passage: "Psalm 37:4"
commonQuoteForm: "Desires of your heart"

context:
  historicalLinguistic: |
    Wisdom psalm about trust under injustice. "Give desires" is framed by 
    delight in God and righteous living — not a wish-fulfillment promise.
  keyTerms: []
  translationIssues: |
    "Desires of your heart" in English sounds like "whatever you want." 
    The psalm's logic is that delighting in God reshapes what you desire.

misuses:
  types: ["prosperity-drift", "verse-isolation"]
  description: "Prosperity claim: 'If I worship, God funds my wish list.'"
  concreteExamples: "Prosperity gospel preaching. Vision board theology. 'Name it and claim it' culture."

loveImpact: "Turns God into a dispenser, not a Father. When desires aren't met, faith breaks."

clarifiedReading:
  reframe: "God reshapes desires as we delight in him. Prayer becomes alignment, not leverage."
  appResponse: "The psalm isn't saying God will give you whatever you want. It's saying that when you delight in God, your desires begin to align with his. Prayer becomes partnership, not a wish list."
```

#### Dossier: Psalm 46:10

```yaml
id: ps-46-10
priority: P1
passage: "Psalm 46:10"
commonQuoteForm: "Be still…"

context:
  historicalLinguistic: |
    In context of conflict and upheaval — closer to "stop striving" and 
    recognize God's sovereignty. It's a call to trust under pressure, 
    not a meditation technique.
  keyTerms: []
  translationIssues: |
    "Be still" in English = quiet/passive. Hebrew sense is closer to 
    "cease striving" or "let go" — active trust, not passivity.

misuses:
  types: ["translation-trap", "verse-isolation"]
  description: "Quietism: 'Do nothing.' Or shaming people who take action during crisis."
  concreteExamples: "Used to discourage advocacy, protest, or practical problem-solving. Quoted to people in crisis as 'just be still.'"

loveImpact: "People feel spiritually wrong for acting responsibly."

clarifiedReading:
  reframe: "Stillness is trust under pressure, not irresponsibility."
  appResponse: "This psalm is set in the middle of chaos — nations raging, kingdoms falling. 'Be still' isn't 'do nothing.' It's 'stop white-knuckling control and recognize who God is.' Trust and action aren't opposites."
```

#### Dossier: Psalm 91

```yaml
id: ps-91
priority: P1
passage: "Psalm 91"
commonQuoteForm: "No plague…no harm"

context:
  historicalLinguistic: |
    A liturgical assurance of divine protection — trains the heart to seek 
    refuge in God. Not a guarantee of immunity from all harm.
  keyTerms: []
  translationIssues: |
    Poetic/liturgical language read as contractual guarantee. The genre 
    (worship/prayer) is different from legal promise.

misuses:
  types: ["genre-confusion", "prosperity-drift"]
  description: "Treated as an immunity charm against disease or tragedy, especially during crises."
  concreteExamples: "Claimed during COVID as reason to refuse precautions. Used as 'faith shield' against medical treatment."

loveImpact: "When harm occurs, faith can collapse into betrayal — 'God promised and didn't deliver.'"

clarifiedReading:
  reframe: "The psalm trains the heart to refuge in God. It is not a contract eliminating suffering."
  appResponse: "Psalm 91 teaches refuge in God — not immunity from pain. If suffering comes, it doesn't mean God broke a promise. It means you need refuge even more. The psalm is a prayer, not an insurance policy."
```

---

### PROVERBS

#### Dossier: Proverbs 3:5-6

```yaml
id: prov-3-5-6
priority: P2
passage: "Proverbs 3:5-6"
commonQuoteForm: "Lean not on your own understanding"

context:
  historicalLinguistic: |
    Wisdom literature teaching that trust and "acknowledging" God shape wise 
    paths. Written in a tradition that CELEBRATES learning and wisdom.
  keyTerms: []
  translationIssues: |
    "Lean not on your own understanding" in English sounds anti-intellectual. 
    In Proverbs — a book that exists to build wisdom — it means don't be 
    arrogantly self-sufficient.

misuses:
  types: ["verse-isolation", "semantic-narrowing"]
  description: "Anti-intellectualism: 'Don't question, don't learn, don't think critically.'"
  concreteExamples: "Used to discourage education, scientific inquiry, therapy, or asking hard theological questions."

loveImpact: "Makes faith fragile and fearful of truth."

clarifiedReading:
  reframe: "Trust God WITH your mind, and let humility govern your reasoning."
  appResponse: "Proverbs is a book that exists to build wisdom — it's pro-thinking. 'Lean not on your own understanding' means don't be arrogantly self-sufficient. It's a call to humility, not anti-intellectualism."
```

#### Dossier: Proverbs 13:24

```yaml
id: prov-13-24
priority: P1
passage: "Proverbs 13:24"
commonQuoteForm: "Spare the rod…"

context:
  historicalLinguistic: |
    Proverb about disciplined love — wisdom literature using metaphorical 
    language about formation. Not a license for violence.
  keyTerms: []
  translationIssues: |
    "Rod" in English = instrument of hitting. In shepherd/wisdom imagery, 
    the rod guides and protects. The proverb is about engaged parenting, 
    not hitting.

misuses:
  types: ["weaponization", "genre-confusion"]
  description: "Justifying harsh punishment, corporal punishment, or abusive parenting."
  concreteExamples: "Cited to defend physical abuse of children. Used to override child protection guidance."

loveImpact: "Associates God with harm, not protection. Children learn God hurts."

clarifiedReading:
  reframe: "Discipline is loving formation. If 'discipline' harms, it has crossed into misuse."
  appResponse: "The proverb is about engaged, loving formation — not violence. A shepherd's rod guides and protects. If 'discipline' causes harm, it's no longer discipline. It's abuse wearing a Bible verse."
```

#### Dossier: Proverbs 29:18

```yaml
id: prov-29-18
priority: P2
passage: "Proverbs 29:18"
commonQuoteForm: "Without vision the people perish"

context:
  historicalLinguistic: |
    "Vision" is prophetic revelation — God's word/guidance. NET explicitly 
    renders "prophetic vision." Not corporate strategy.
  keyTerms: []
  translationIssues: |
    English "vision" = goals/ambition. Hebrew refers to prophetic revelation 
    from God — a completely different category.

misuses:
  types: ["translation-trap", "audience-shift"]
  description: "Business 'vision casting' proof-text."
  concreteExamples: "Cited in corporate leadership talks, church growth conferences, and entrepreneurship content as justification for leader-driven vision."

loveImpact: "Replaces God's word with human ambition."

clarifiedReading:
  reframe: "Without God's revealed guidance, communities unravel. The blessing is tied to keeping God's instruction."
  appResponse: "The 'vision' here is prophetic revelation — God's word to his people. It's not a business strategy verse. The proverb says: without God's guidance, things fall apart. With it, people flourish."
```

---

### ECCLESIASTES

#### Dossier: Ecclesiastes 3:1-8

```yaml
id: eccl-3-1-8
priority: P2
passage: "Ecclesiastes 3:1-8"
commonQuoteForm: "A time for everything"

context:
  historicalLinguistic: |
    Poetic reflection on seasons in a world that feels cyclical and contested. 
    The Teacher observes — he's not endorsing every action listed.
  keyTerms: []
  translationIssues: |
    English reads "a time to kill, a time to heal" as God endorsing both 
    equally. The genre is observational poetry, not moral prescription.

misuses:
  types: ["genre-confusion", "spiritual-bypassing"]
  description: "Fatalism: 'Everything is God's will, so don't resist evil.'"
  concreteExamples: "Used to justify passivity in the face of injustice. Quoted to normalize harmful situations as 'God's timing.'"

loveImpact: "Can numb moral responsibility and compassion."

clarifiedReading:
  reframe: "Naming seasons is not endorsing every action. Wisdom discerns what time it is and what love requires."
  appResponse: "Ecclesiastes observes that life has seasons — it's not saying God endorses everything that happens. Wisdom doesn't shrug at evil and say 'it's just a season.' Wisdom asks: what does love require right now?"
```

---

### PROPHETS

#### Dossier: Isaiah 41:10

```yaml
id: isa-41-10
priority: P1
passage: "Isaiah 41:10"
commonQuoteForm: "Fear not… I will help you"

context:
  historicalLinguistic: |
    Addressed to God's servant people in fear — emphasizing presence, help, 
    and upheld strength. God's first move is toward the fearful, not against them.
  keyTerms: []
  translationIssues: |
    "Fear not" in English sounds like a command to stop feeling afraid. 
    In context, it's assurance — "don't be afraid, BECAUSE I am with you."

misuses:
  types: ["command-as-condemnation"]
  description: "Used to shame anxiety: 'If you fear, you lack faith.'"
  concreteExamples: "Quoted to anxious people as a rebuke. Used in counseling to dismiss anxiety disorders as spiritual failure."

loveImpact: "Converts comfort into condemnation. The verse designed to help becomes a weapon."

clarifiedReading:
  reframe: "God's first move is presence. Fear can be met with help, not shame."
  appResponse: "God doesn't say 'fear not' as a scolding. He says it as a promise: you don't have to be afraid because I'm here. Fear is met with presence, not punishment."
```

#### Dossier: Jeremiah 17:9

```yaml
id: jer-17-9
priority: P2
passage: "Jeremiah 17:9"
commonQuoteForm: "The heart is deceitful above all things"

context:
  historicalLinguistic: |
    "Heart" can mean mind/inner self. NET renders "human mind," highlighting 
    cognitive-moral depth. The verse diagnoses self-deception, not total 
    depravity of all human feeling.
  keyTerms: []
  translationIssues: |
    English "heart is deceitful" = don't trust any feelings ever. Hebrew 
    lev includes mind/will, and the diagnosis is about self-deception 
    capacity, not wholesale rejection of inner life.

misuses:
  types: ["command-as-condemnation", "semantic-narrowing"]
  description: "Used to invalidate feelings, distrust everyone, or encourage self-loathing."
  concreteExamples: "Quoted in counseling to dismiss someone's emotional experience. Used to override victims' instincts about danger."

loveImpact: "Drives secrecy and despair instead of healing. People learn to distrust themselves completely."

clarifiedReading:
  reframe: "The verse diagnoses human self-deception and invites God's searching mercy — not self-hatred."
  appResponse: "Jeremiah isn't telling you to hate yourself or distrust every feeling. He's naming a real thing: we can deceive ourselves. The next verse is the key — God searches the heart. That's mercy, not condemnation."
```

#### Dossier: Jeremiah 29:11

```yaml
id: jer-29-11
priority: P1
passage: "Jeremiah 29:11"
commonQuoteForm: "Plans to prosper you"

context:
  historicalLinguistic: |
    Part of Jeremiah's letter to exiles in Babylon. The promise comes with 
    instructions to settle in, build houses, and seek the welfare (shalom) 
    of the city they're exiled to. Fulfillment is 70 years out.
  keyTerms: []
  translationIssues: |
    "Prosper" in English = financial/career success. Hebrew shalom = 
    wholeness, peace, wellbeing. The timeline is generational, not next quarter.

misuses:
  types: ["verse-isolation", "prosperity-drift"]
  description: "Personal success guarantee for near-term outcomes."
  concreteExamples: "On coffee mugs, graduation cards, vision boards. Used as personal promise of career success with zero exile context."

loveImpact: "When life hurts, people assume God lied or forgot them."

clarifiedReading:
  reframe: "God's plans include hope in exile — often through patient endurance and communal goodness, not instant success."
  appResponse: "Jeremiah 29:11 was written to people in exile who'd be waiting 70 years. The promise is real — but it came with 'build houses, plant gardens, seek the shalom of the city.' Hope isn't a shortcut. It's faithful endurance."
```

#### Dossier: Habakkuk 2:4

```yaml
id: hab-2-4
priority: P2
passage: "Habakkuk 2:4"
commonQuoteForm: "The righteous shall live by faith"

context:
  historicalLinguistic: |
    Hebrew emunah includes steadfastness and faithfulness — not just mental 
    belief. Habakkuk is wrestling with injustice and God's seeming inaction.
  keyTerms:
    - original: "אֱמוּנָה"
      transliteration: "emunah"
      language: hebrew
      glossRange: "firmness, faithfulness, fidelity, steadfastness"
      significance: "Broader than English 'faith' (mental belief). Includes lived fidelity and steady trust over time."
  translationIssues: |
    "Faith" in English often = belief/assent. Hebrew emunah = steadfast 
    faithfulness. This shapes the entire faith-vs-works debate.

misuses:
  types: ["semantic-narrowing", "transactionalism"]
  description: "Moralism ('prove faith by effort') or passive belief divorced from fidelity."
  concreteExamples: "Used in faith-vs-works arguments where both sides miss the Hebrew sense of steady, lived faithfulness."

loveImpact: "Produces either pride (I'm faithful enough) or despair (I'll never believe hard enough)."

clarifiedReading:
  reframe: "Faith is trusting God's promise and living steady fidelity amid injustice."
  appResponse: "Emunah isn't just 'believing.' It's steady faithfulness — trusting God's promise and living like it's true even when the world looks unjust. That's what Habakkuk is doing: arguing with God and staying anyway."
```

---

### MATTHEW

#### Dossier: Matthew 5:14

```yaml
id: matt-5-14
priority: P2
passage: "Matthew 5:14"
commonQuoteForm: "City on a hill"

context:
  historicalLinguistic: |
    Jesus addresses disciples as a visible community. "City on a hill" is 
    about the Jesus-community's witness through good works pointing to the Father.
  keyTerms: []
  translationIssues: |
    The phrase has been politicized far beyond its original scope — especially 
    in American rhetoric since Winthrop (1630) through Reagan and beyond.

misuses:
  types: ["covenant-transfer", "audience-shift"]
  description: "National exceptionalism: 'America is God's city on a hill.'"
  concreteExamples: "Used in presidential speeches, political rallies, and Christian nationalist rhetoric. Winthrop's 1630 sermon established the transfer."

loveImpact: "Replaces kingdom humility with national pride. God's love gets nationalized."

clarifiedReading:
  reframe: "The 'city' is the Jesus-community whose good works point to the Father, not a nation-state."
  appResponse: "Jesus is talking to his disciples about being visible through good works that glorify God. He's not describing a nation. The 'city on a hill' is the community of Jesus — and its light is meant for everybody."
```

#### Dossier: Matthew 5:39

```yaml
id: matt-5-39
priority: P1
passage: "Matthew 5:39"
commonQuoteForm: "Turn the other cheek"

context:
  historicalLinguistic: |
    In the Sermon on the Mount, Jesus confronts misuse of retaliation logic 
    and calls for non-retaliatory, creative love. He forbids revenge — 
    not self-protection.
  keyTerms: []
  translationIssues: |
    "Turn the other cheek" in English = passive doormat. Scholars note the 
    cultural specifics of the backhand slap (left cheek) suggest an act of 
    dignified resistance, not passive submission to violence.

misuses:
  types: ["trauma-misapplication", "weaponization"]
  description: "Counseling victims to stay in abuse or never seek safety/justice."
  concreteExamples: "Told to abuse victims by pastors and counselors. Used to shame people who set boundaries or leave dangerous situations."

loveImpact: "Makes love look like self-erasure, not dignity."

clarifiedReading:
  reframe: "Forgo revenge. Do not forgo safety. Love can resist evil without mirroring it."
  appResponse: "Jesus forbids revenge, not safety. Love does not require you to remain in danger. You can forgive without staying exposed to harm. If someone is using this verse to keep you unsafe, that is a misuse of Scripture."
```

#### Dossier: Matthew 5:48

```yaml
id: matt-5-48
priority: P2
passage: "Matthew 5:48"
commonQuoteForm: "Be perfect"

context:
  historicalLinguistic: |
    Greek teleios often means mature or complete, not flawless performance.
  keyTerms:
    - original: "τέλειος"
      transliteration: "teleios"
      language: greek
      glossRange: "complete, mature, having reached its end/goal"
      significance: "Not 'morally flawless.' Means whole-hearted, mature, reaching the intended goal. Luke's parallel says 'merciful.'"
  translationIssues: |
    English "perfect" = flawless. Greek teleios = mature/complete. 
    Luke 6:36 parallels with "merciful" — completely different feel.

misuses:
  types: ["translation-trap", "command-as-condemnation"]
  description: "Perfectionism and spiritual scrupulosity."
  concreteExamples: "Drives obsessive religious behavior. Used to shame any failure as spiritual inadequacy."

loveImpact: "People experience God as impossible to please."

clarifiedReading:
  reframe: "Jesus calls for whole-hearted maturity in love, not flawless performance."
  appResponse: "The Greek word teleios means complete or mature — not morally flawless. Luke's version says 'be merciful.' Jesus is calling you toward whole-hearted love, not a standard you can never reach."
```

#### Dossier: Matthew 6:33

```yaml
id: matt-6-33
priority: P2
passage: "Matthew 6:33"
commonQuoteForm: "Seek first the kingdom"

context:
  historicalLinguistic: |
    Part of Jesus' anxiety/needs discourse — not a denial of practical needs 
    but a reordering of priorities within God's care.
  keyTerms: []
  translationIssues: |
    "Seek first" sounds like "ignore everything else." In context, Jesus 
    has just said the Father knows what you need. It's about priority, 
    not denial of material reality.

misuses:
  types: ["spiritual-bypassing", "verse-isolation"]
  description: "Used to spiritualize ignoring practical responsibilities."
  concreteExamples: "'Just seek first and quit your job.' 'Don't worry about money, seek the kingdom.' Used to discourage financial planning."

loveImpact: "Sets people up for avoidable crisis and guilt when practical needs demand attention."

clarifiedReading:
  reframe: "Prioritize God's reign and righteousness while receiving daily provision with wisdom."
  appResponse: "Jesus isn't telling you to ignore your bills. He's saying your Father knows what you need — so don't let anxiety about provision displace your deepest orientation toward God's kingdom. Priority, not denial."
```

#### Dossier: Matthew 6:34

```yaml
id: matt-6-34
priority: P1
passage: "Matthew 6:34"
commonQuoteForm: "Do not worry about tomorrow"

context:
  historicalLinguistic: |
    Paired with "today has enough trouble of its own" — Jesus names trouble 
    as real, not illusory. He's teaching where to place tomorrow: in the 
    Father's care.
  keyTerms: []
  translationIssues: |
    "Do not worry" in English = stop feeling anxious (a command to control 
    your emotions). Jesus is addressing a posture of trust, not shaming 
    a neurological response.

misuses:
  types: ["command-as-condemnation"]
  description: "Shaming anxious people."
  concreteExamples: "Quoted to people with anxiety disorders as spiritual rebuke. Used to dismiss legitimate concerns about the future."

loveImpact: "Anxiety becomes spiritual failure rather than human suffering that God meets with care."

clarifiedReading:
  reframe: "Jesus names trouble as real. He teaches where to place tomorrow: in the Father's care."
  appResponse: "Jesus doesn't pretend tomorrow is fine — he says today has enough trouble of its own. He's teaching you where to put your worry: in the Father's hands. That's a practice of trust, not a demand to stop feeling."
```

#### Dossier: Matthew 7:1

```yaml
id: matt-7-1
priority: P1
passage: "Matthew 7:1"
commonQuoteForm: "Judge not…"

context:
  historicalLinguistic: |
    Greek krinō can include condemn. Jesus critiques hypocritical condemnation 
    while in the same passage calling for discernment (planks and specks).
  keyTerms:
    - original: "κρίνω"
      transliteration: "krinō"
      language: greek
      glossRange: "judge, decide, evaluate, condemn"
      significance: "Has a range. Jesus isn't banning evaluation — he's targeting hypocritical condemnation."
  translationIssues: |
    English "judge" = any evaluation. Greek krinō here targets hypocritical 
    condemnation. Jesus then immediately tells you to deal with your own 
    plank FIRST — implying you do address the speck afterward.

misuses:
  types: ["verse-isolation", "semantic-narrowing"]
  description: "'No one can ever tell me I'm wrong. Judge not.'"
  concreteExamples: "Used to shut down accountability, moral discernment, or confrontation of harm. Quoted to silence any criticism."

loveImpact: "Blocks repentance, repair, and truth-telling in love."

clarifiedReading:
  reframe: "Don't condemn. Do practice humble self-examination and honest discernment."
  appResponse: "Jesus warns against condemning people while ignoring your own mess. He's not banning discernment — he's calling for humility. Deal with your plank first, then you can see clearly to help your neighbor."
```

#### Dossier: Matthew 18:20

```yaml
id: matt-18-20
priority: P2
passage: "Matthew 18:20"
commonQuoteForm: "Where two or three gather"

context:
  historicalLinguistic: |
    Immediate context is reconciliation, witnesses, binding/loosing, communal 
    discernment — not a generic small-group promise.
  keyTerms: []
  translationIssues: |
    Detached from its paragraph, it sounds like "God only shows up in groups." 
    In context, it's about Jesus' presence in communal truth-seeking and 
    reconciliation work.

misuses:
  types: ["verse-isolation"]
  description: "'God is only present if we have enough people,' or generic small-group slogan."
  concreteExamples: "Used as church attendance minimum. Quoted to dismiss solo prayer or individual encounter with God."

loveImpact: "Turns God's presence into a headcount condition."

clarifiedReading:
  reframe: "Jesus assures presence in humble communal seeking, especially in reconciliation and prayerful discernment."
  appResponse: "Jesus says this in a passage about reconciliation and communal discernment — not as a minimum attendance rule. God's presence isn't conditional on group size. But Jesus does promise something special when people come together to seek truth and repair."
```

---

### LUKE

#### Dossier: Luke 6:38

```yaml
id: luke-6-38
priority: P2
passage: "Luke 6:38"
commonQuoteForm: "Give and it will be given to you"

context:
  historicalLinguistic: |
    Jesus teaches generosity and reciprocity of measure — the "measure" 
    warns against stinginess and harshness, not a prosperity contract.
  keyTerms: []
  translationIssues: |
    "Give and it will be given" in English sounds like a financial ROI promise. 
    In context, it's about the quality of mercy and generosity you extend to others.

misuses:
  types: ["transactionalism", "prosperity-drift"]
  description: "Fundraising pressure: 'Give to get.'"
  concreteExamples: "Used in prosperity gospel giving appeals. Cited to pressure donations with promised returns."

loveImpact: "Reduces God to a transaction partner."

clarifiedReading:
  reframe: "Give freely and you'll find God's generosity shaping your life. The 'measure' warns against stinginess and harshness."
  appResponse: "Jesus isn't running a spiritual investment scheme. The 'measure' principle is about the quality of mercy you extend — not a financial multiplier. Give because God is generous, not to trigger a return."
```

#### Dossier: Luke 15:7

```yaml
id: luke-15-7
priority: P2
passage: "Luke 15:7"
commonQuoteForm: "More joy over one sinner who repents"

context:
  historicalLinguistic: |
    Spoken against grumbling religious critics — the "99" comparison is 
    rhetorical, not a ranking. The point is God's joy in restoration.
  keyTerms: []
  translationIssues: |
    English hears "more joy over one" as "the 99 don't matter." The 
    rhetorical structure is designed to challenge the critics, not devalue 
    the faithful.

misuses:
  types: ["verse-isolation", "audience-shift"]
  description: "Shaming 'faithful' people or implying God doesn't value the steady."
  concreteExamples: "Used to guilt longtime church members. Creates rivalry between 'prodigals' and 'elder brothers.'"

loveImpact: "Creates rivalry instead of shared joy."

clarifiedReading:
  reframe: "Heaven rejoices at repentance. The point is God's joy in restoration, not contempt for the faithful."
  appResponse: "Jesus is responding to religious leaders who grumble about who he eats with. The point isn't that the faithful don't matter — it's that God's heart explodes with joy when someone comes home. That joy is the story."
```

---

### JOHN

#### Dossier: John 3:16-18

```yaml
id: john-3-16-18
priority: P1
passage: "John 3:16-18"
commonQuoteForm: "God so loved the world" / "not to condemn"

context:
  historicalLinguistic: |
    Gospel core: love, gift, belief, and non-condemnation. Verse 17 — 
    "God did not send his Son to condemn the world" — is often completely 
    forgotten while 16 is quoted.
  keyTerms: []
  translationIssues: |
    The word "believe" (pisteuō) carries more weight than mental assent — 
    it includes trust, allegiance, and commitment. "World" (kosmos) means 
    the whole creation, not just the elect.

misuses:
  types: ["verse-isolation", "weaponization"]
  description: "Used as a slogan while practicing condemnation and shame. Or truncated to exclude verse 17."
  concreteExamples: "On signs at sporting events as a slogan without context. Quoted alongside condemnation of specific groups — contradicting verse 17."

loveImpact: "People associate God with condemnation rather than rescue."

clarifiedReading:
  reframe: "God's love gives, and Jesus comes to save, not condemn. Truth is offered as light for healing."
  appResponse: "God so loved the world that he gave. Verse 17 is the part people forget: God sent Jesus not to condemn the world, but to save it. If your version of John 3:16 sounds like condemnation, you've lost the plot."
```

#### Dossier: John 10:10

```yaml
id: john-10-10
priority: P2
passage: "John 10:10"
commonQuoteForm: "Life abundantly"

context:
  historicalLinguistic: |
    "Abundant life" sits in shepherd-and-thief discourse — life under 
    the good shepherd's protection, not necessarily material wealth.
  keyTerms: []
  translationIssues: |
    "Abundant" in English = plentiful/wealthy. Greek perisson = 
    exceeding, surplus. The abundance is life quality under the 
    shepherd, not material accumulation.

misuses:
  types: ["prosperity-drift", "verse-isolation"]
  description: "Prosperity promise: 'abundant = rich and easy.'"
  concreteExamples: "Prosperity gospel staple. Used to frame material comfort as evidence of spiritual health."

loveImpact: "When 'abundance' doesn't look like comfort, people despair."

clarifiedReading:
  reframe: "Jesus offers deep life and protection under his shepherding, even amid conflict and loss."
  appResponse: "The 'abundant life' is set in a passage about sheep, thieves, and a shepherd who lays down his life. Abundance here is the depth and safety of life under Jesus' care — not a prosperity promise."
```

#### Dossier: John 14:6

```yaml
id: john-14-6
priority: P1
passage: "John 14:6"
commonQuoteForm: "I am the way, the truth, and the life. No one comes to the Father except through me."

context:
  historicalLinguistic: |
    Spoken as comfort to disciples before Jesus' death. Thomas asks "how 
    can we know the way?" and Jesus answers relationally — he IS the way 
    to the Father. It's a relational claim about access.
  keyTerms: []
  translationIssues: |
    English emphasis falls on "no one" (exclusion). The sentence's gravity 
    is on "I am" (invitation) — Jesus is answering a fearful disciple's 
    question about how to follow.

misuses:
  types: ["weaponization", "verse-isolation"]
  description: "Weaponized as contempt or hostility toward outsiders."
  concreteExamples: "Used on protest signs against other religions. Deployed as a conversation-ender rather than a conversation-starter."

loveImpact: "Signals exclusion rather than invitation."

clarifiedReading:
  reframe: "Jesus is the way because he reveals the Father and carries us into God's life. Speak it as invitation and witness."
  appResponse: "A frightened disciple asks 'how do we follow you?' and Jesus says: I am the way. It's comfort, not a weapon. The claim is about Jesus opening access to the Father — speak it as invitation, not as a door slammed shut."
```

---

### ACTS

#### Dossier: Acts 2:38-40

```yaml
id: acts-2-38-40
priority: P2
passage: "Acts 2:38-40"
commonQuoteForm: "Repent and be baptized"

context:
  historicalLinguistic: |
    Covenant-entry responses to the gospel announcement at Pentecost. 
    "Repent" = turn/reorient toward Jesus. Baptism = public identification 
    and entry into Spirit-gifted community.
  keyTerms: []
  translationIssues: |
    "Repent" in English sounds like groveling guilt. Greek metanoeō = 
    change of mind/direction. It's reorientation, not self-flagellation.

misuses:
  types: ["transactionalism"]
  description: "Checklist spirituality: 'Do these steps to earn forgiveness.'"
  concreteExamples: "Used to make salvation feel like a multi-step process you can fail at. Baptism treated as magic rather than covenant sign."

loveImpact: "Grace feels earned instead of received."

clarifiedReading:
  reframe: "Repentance is turning toward Jesus. Baptism names allegiance and entry into a Spirit-gifted community."
  appResponse: "Repentance isn't groveling — it's turning around. Baptism isn't earning anything — it's identifying publicly with Jesus and his people. These are responses to grace, not requirements to earn it."
```

#### Dossier: Acts 4:12

```yaml
id: acts-4-12
priority: P2
passage: "Acts 4:12"
commonQuoteForm: "No other name under heaven"

context:
  historicalLinguistic: |
    Peter speaks under pressure before authorities. The exclusive claim 
    functions as public witness and courage under threat — not triumphalism.
  keyTerms: []
  translationIssues: |
    "No other name" in English lands as superiority/exclusion. In context, 
    it's a bold, costly confession before hostile powers.

misuses:
  types: ["weaponization", "audience-shift"]
  description: "Triumphalism and contempt rather than humble testimony."
  concreteExamples: "Used aggressively in interfaith contexts. Deployed as arrogance rather than the costly witness it was in Acts."

loveImpact: "Pushes people away from love."

clarifiedReading:
  reframe: "Speak with courage and humility. The claim is about rescue in Jesus, not superiority."
  appResponse: "Peter says this while being interrogated by authorities. It costs him something. When we say 'no other name,' it should carry that same weight — courage and humility, not arrogance."
```

---

### ROMANS

#### Dossier: Romans 8:28

```yaml
id: rom-8-28
priority: P1
passage: "Romans 8:28"
commonQuoteForm: "All things work together for good"

context:
  historicalLinguistic: |
    Paul describes God's active work alongside believers — "with those who 
    love him, who are called according to his purpose." The "good" is 
    conformity to Christ (v.29), not material comfort.
  keyTerms: []
  translationIssues: |
    "All things work together for good" in English sounds like automatic 
    happy endings. The Greek construction emphasizes God as the active agent 
    weaving purpose in partnership with believers.

misuses:
  types: ["spiritual-bypassing"]
  description: "Platitude used to silence grief: 'Don't cry, it's all good.'"
  concreteExamples: "Said to grieving people at funerals. Used to shut down lament, anger, or honest prayer."

loveImpact: "Blocks lament and honest prayer. People feel they can't bring real pain to God."

clarifiedReading:
  reframe: "God weaves good in partnership with those who love him. This supports hope and calling, not denial."
  appResponse: "Romans 8:28 isn't a platitude. It's Paul's declaration that God is actively at work — even in suffering — shaping something redemptive. But the very next verses talk about suffering, groaning, and endurance. Don't skip the grief to get to the good."
```

#### Dossier: Romans 13:1-7

```yaml
id: rom-13-1-7
priority: P1
passage: "Romans 13:1-7"
commonQuoteForm: "Submit to governing authorities"

context:
  historicalLinguistic: |
    Paul addresses civic order with moral constraints across the whole letter. 
    Romans 12 and 13:8-10 frame this passage — love of neighbor constrains 
    political obedience. Historically cited to sanctify unjust systems.
  keyTerms: []
  translationIssues: |
    "Submit" in English = obey without question. Greek hypotassō carries 
    a range that includes voluntary ordering/positioning, not blank obedience.

misuses:
  types: ["weaponization", "verse-isolation"]
  description: "'God ordains whatever the state does.' Used to silence protest or justify cruelty."
  concreteExamples: "Cited by U.S. officials to justify immigration enforcement. Used historically to defend slavery, apartheid, and authoritarian compliance."

loveImpact: "Makes God appear allied with oppression."

clarifiedReading:
  reframe: "Submit to legitimate public order, but read within the Bible's justice ethic and the call to love neighbor. Refuse cherry-picking."
  appResponse: "Romans 13 sits between Romans 12 ('overcome evil with good') and Romans 13:8 ('love your neighbor'). Read the whole thing. Paul is talking about public order, not blind obedience to unjust power. The Bible's justice ethic doesn't pause for this passage."
```

---

### 1 CORINTHIANS

#### Dossier: 1 Corinthians 10:13

```yaml
id: 1cor-10-13
priority: P1
passage: "1 Corinthians 10:13"
commonQuoteForm: "God won't give you more than you can handle"

context:
  historicalLinguistic: |
    "Temptation" can also mean "testing." The verse promises God's 
    faithfulness and a way to endure — not manageable life circumstances.
  keyTerms: []
  translationIssues: |
    The popular misquote ("God won't give you more than you can handle") 
    is NOT what the verse says. The actual promise is about temptation/testing 
    and God providing a way to endure it.

misuses:
  types: ["misquotation"]
  description: "Misquoted as 'God won't give you more than you can handle.'"
  concreteExamples: "Said to people in crisis, implying they should be able to handle anything. Used to dismiss the need for help."

loveImpact: "When people can't handle it, they assume God failed them or they failed God."

clarifiedReading:
  reframe: "God is faithful in testing and temptation. The promise is presence and a path to endure, not painless hardship."
  appResponse: "This verse doesn't say 'God won't give you more than you can handle.' That's a misquote. What Paul actually says is that God is faithful and won't let you be tested beyond what you can bear — and he'll provide a way through. The promise is God's faithfulness, not your capacity."
```

#### Dossier: 1 Corinthians 13:4-8

```yaml
id: 1cor-13-4-8
priority: P2
passage: "1 Corinthians 13:4-8"
commonQuoteForm: "Love is patient, love is kind"

context:
  historicalLinguistic: |
    Paul describes love as cruciform virtue in a letter addressing a deeply 
    divided church. It's about spiritual maturity and community character, 
    not romantic mood.
  keyTerms: []
  translationIssues: |
    Familiarity from weddings strips the passage of its church-community 
    context. Paul is addressing people who are tearing each other apart.

misuses:
  types: ["verse-isolation", "genre-confusion"]
  description: "Wedding aesthetic disconnected from everyday patience, truth, and endurance."
  concreteExamples: "Read at weddings, printed on decor. Rarely applied to actual conflict, church division, or daily self-giving."

loveImpact: "Love becomes performance or sentiment, not transformation."

clarifiedReading:
  reframe: "Love is practiced character that mirrors God. Use as a daily exam of self-giving, not an Instagram caption."
  appResponse: "Paul wrote this to a church that was fighting over everything. Love is patient and kind isn't a wedding decoration — it's a challenge to a community in conflict. Read it Monday morning, not just at the altar."
```

---

### 2 CORINTHIANS

#### Dossier: 2 Corinthians 12:9-10

```yaml
id: 2cor-12-9-10
priority: P2
passage: "2 Corinthians 12:9-10"
commonQuoteForm: "My grace is sufficient / power in weakness"

context:
  historicalLinguistic: |
    Paul's personal experience of asking God to remove suffering ("thorn 
    in the flesh") and receiving grace instead. Not an endorsement of harm.
  keyTerms: []
  translationIssues: |
    "Power in weakness" in English can sound like "suffering is good." 
    Paul's point is that God's grace meets him in weakness — not that 
    weakness or harm should be sought or maintained.

misuses:
  types: ["trauma-misapplication", "spiritual-bypassing"]
  description: "Romanticizing trauma ('God wants me broken') or discouraging treatment and help."
  concreteExamples: "Used to discourage therapy, medication, or leaving harmful situations. 'God's grace is sufficient' used to shut down requests for help."

loveImpact: "People confuse suffering with holiness."

clarifiedReading:
  reframe: "God meets weakness with grace. Seek healing and safety while learning dependence."
  appResponse: "Paul asked God to remove his suffering. God didn't. But he said: my grace is enough. That's not 'suffering is good.' It's 'I'm with you in it.' Seek healing. Accept help. And let God's grace meet you where you are."
```

---

### EPHESIANS

#### Dossier: Ephesians 2:8-9

```yaml
id: eph-2-8-9
priority: P1
passage: "Ephesians 2:8-9"
commonQuoteForm: "Saved by grace through faith, not by works"

context:
  historicalLinguistic: |
    Salvation is gift, not wages. "Faith" (pistis) includes trust and 
    allegiance — not just mental assent. Verse 10 (often dropped) adds 
    "created for good works."
  keyTerms:
    - original: "πίστις"
      transliteration: "pistis"
      language: greek
      glossRange: "faith, trust, faithfulness, allegiance, fidelity"
      significance: "Broader than 'belief.' Includes trust, loyalty, and lived allegiance. Not just agreeing to a proposition."
  translationIssues: |
    "Faith" in English often = mental belief. Greek pistis includes trust 
    and allegiance. "Works" gets weaponized in both directions — either 
    to eliminate all discipleship or to smuggle in earning.

misuses:
  types: ["verse-isolation", "semantic-narrowing"]
  description: "Either 'works don't matter ever' (antinomianism) or 'you must earn grace' (legalism)."
  concreteExamples: "Used to dismiss ethical living: 'I'm saved by grace, behavior doesn't matter.' Or used to add requirements: 'grace + these works = saved.'"

loveImpact: "Either empties discipleship or crushes with effort."

clarifiedReading:
  reframe: "Grace saves. Faith receives. Works follow as fruit, not payment."
  appResponse: "Grace saves. Faith receives. And verse 10 — the one people skip — says we're created for good works. It's not either/or. Grace frees you to live differently, not to stop caring."
```

#### Dossier: Ephesians 5:21-22

```yaml
id: eph-5-21-22
priority: P1
passage: "Ephesians 5:21-22"
commonQuoteForm: "Wives, submit to your husbands"

context:
  historicalLinguistic: |
    Verse 21 — "submitting to one another out of reverence for Christ" — 
    frames the entire household code. Text-critical notes show verse 22's 
    verb may rely on verse 21 in early manuscripts (no independent verb).
  keyTerms:
    - original: "ὑποτάσσω"
      transliteration: "hypotassō"
      language: greek
      glossRange: "arrange under, submit, subordinate, defer"
      significance: "The mutual version in v.21 governs the household code. The husband's charge is to love as Christ loved the church — self-sacrificial death."
  translationIssues: |
    Starting at verse 22 instead of 21 changes everything. The mutual 
    submission frame in 21 governs the entire section. Skipping it creates 
    a one-directional hierarchy the text doesn't support.

misuses:
  types: ["weaponization", "verse-isolation"]
  description: "Used to demand unilateral control or tolerate abuse."
  concreteExamples: "Cited by abusers to demand compliance. Used in counseling to tell victims to submit to harm. The verse is weaponized when 5:21 and the Christlike self-giving charge are ignored."

loveImpact: "Converts covenant love into coercion. People experience marriage and God as unsafe."

clarifiedReading:
  reframe: "Any 'submission' reading MUST be governed by Christlike love and self-giving. Never use it to keep someone unsafe."
  appResponse: "Start at verse 21: 'submit to one another out of reverence for Christ.' That's the frame. Husbands are told to love like Christ loved — by laying down his life. Any reading that produces coercion or danger has left the text behind. Safety and dignity are non-negotiable."
```

---

### PHILIPPIANS

#### Dossier: Philippians 4:6-7

```yaml
id: phil-4-6-7
priority: P1
passage: "Philippians 4:6-7"
commonQuoteForm: "Do not be anxious about anything"

context:
  historicalLinguistic: |
    "Do not be anxious" is paired with a practice: prayer, petition, 
    thanksgiving. The result is God's peace guarding heart and mind. 
    It's a practice, not a performance standard.
  keyTerms: []
  translationIssues: |
    "Do not be anxious" in English sounds like "stop having anxiety." 
    Paul prescribes a practice (prayer + thanksgiving) and promises a 
    result (peace) — it's not a rebuke for feeling anxious.

misuses:
  types: ["command-as-condemnation"]
  description: "Anxiety-shaming: 'Just stop it. The Bible says don't be anxious.'"
  concreteExamples: "Used in pastoral counseling to shame people with anxiety disorders. Quoted to dismiss medication, therapy, or honest expression of worry."

loveImpact: "People feel condemned for symptoms they can't control."

clarifiedReading:
  reframe: "Bring anxiety to God with honesty. The text guides a practice of prayerful trust, not punishment."
  appResponse: "Paul doesn't say 'stop feeling anxious and you're a bad Christian if you do.' He says: here's what to do with your anxiety — bring it to God with prayer and thanksgiving. The verse is a practice, not a punishment."
```

#### Dossier: Philippians 4:13

```yaml
id: phil-4-13
priority: P1
passage: "Philippians 4:13"
commonQuoteForm: "I can do all things through Christ who strengthens me"

context:
  historicalLinguistic: |
    "All things" is constrained by immediate context: contentment in plenty 
    AND hunger, abundance AND need. Paul is talking about endurance across 
    circumstances, not achievement.
  keyTerms: []
  translationIssues: |
    "All things" in English = unlimited capability. Paul means "I can face 
    any circumstance." The next verse is about financial support — it's about 
    endurance, not winning.

misuses:
  types: ["verse-isolation", "prosperity-drift"]
  description: "Achievement/sports proof-text."
  concreteExamples: "On gym walls, sports jerseys, athlete tattoos. Used as divine performance enhancement. Detached from the poverty and prison Paul is writing from."

loveImpact: "Makes Christ look like a performance enhancer. When you lose, Christ failed?"

clarifiedReading:
  reframe: "Christ strengthens believers to endure and remain faithful in any circumstance — not to guarantee wins."
  appResponse: "Paul wrote this in prison, talking about being content whether he had plenty or nothing. 'I can do all things' means 'I can endure any circumstance through Christ.' It's about faithfulness, not trophies."
```

---

### 1 TIMOTHY

#### Dossier: 1 Timothy 6:10

```yaml
id: 1tim-6-10
priority: P1
passage: "1 Timothy 6:10"
commonQuoteForm: "Money is the root of all evil"

context:
  historicalLinguistic: |
    The verse says "love of money" — not money itself. NET clarifies "all 
    kinds of evil," not "all evil." The target is covetousness, not 
    currency.
  keyTerms: []
  translationIssues: |
    The most common misquote in Scripture. "Money is evil" ≠ "the LOVE of 
    money is a root of all KINDS of evil." Every word that's changed shifts 
    the meaning.

misuses:
  types: ["misquotation", "semantic-narrowing"]
  description: "Misquoted to shame wealth or poverty. Or used to excuse greed ('money itself is neutral so I'm fine')."
  concreteExamples: "Misquoted constantly. Used to shame wealthy people, shame poor people for wanting money, or neutralize the actual warning about covetousness."

loveImpact: "Distracts from the heart-level issue of covetousness."

clarifiedReading:
  reframe: "The love of money is spiritually hazardous because it reorders love away from God and neighbor."
  appResponse: "The verse says 'the love of money is a root of all kinds of evil' — not 'money is evil.' It's about what happens when money becomes the thing you love most. That reordering is the danger."
```

---

## MODULE 3: AI CHATBOT PROTOCOL

### Purpose
Rules, guardrails, and generation method for producing responses that are scripturally faithful, pastorally safe, and non-formulaic. Jesus' teaching is the gravitational center, but every answer must feel situational, not scripted.

### Response Generation Flow

```
User message
  → Step 1: Intent + risk classification
  → Step 2: Safety check
      → IF abuse/self-harm/medical crisis: prioritize safety, encourage immediate help, no coercive Scripture
      → IF no safety flags: continue
  → Step 3: Map to passage set + misuse taxonomy
  → Step 4: Assemble context layers (text, genre, audience, key terms)
  → Step 5: Generate response with four components:
      (a) Human reflection — name the emotion/situation FIRST
      (b) Clarified reading — 2-5 sentences, anchored in context
      (c) Jesus-centered bridge — specific, not formulaic
      (d) One gentle follow-up question
```

### Protocol Rules

```typescript
interface ChatbotRule {
  id: string;
  rule: string;
  rationale: string;
}
```

| id | rule | rationale |
|----|------|-----------|
| `truth-first` | Do not deliver an "application" until the verse is re-anchored in audience, genre, and surrounding argument. Use ±10-20 verse context windows by default. | Prevents context collapse. Application without context is misuse. |
| `no-weaponization` | If a user is using Scripture to control someone (submitting, staying in danger, silencing dissent), REFUSE that direction and reframe toward Jesus' ethic of love, truth, and protection of the vulnerable. | Safety is non-negotiable. The app will not assist coercion. |
| `no-bypassing` | If the user is grieving or traumatized, do NOT answer with platitudes. Invite lament and prayer, acknowledge pain BEFORE offering hope. | Spiritual bypassing is harm dressed as help. |
| `non-formulaic-jesus` | Do NOT tack on repetitive closers ("Jesus loves you" every time). Connect the user's situation to a SPECIFIC Jesus-move: mercy, truth-telling, forgiveness, peacemaking, table fellowship, courage, prayer. Use varied rhetorical structures. | Formulaic responses train users to tune out. |
| `cite-language-claims` | When the response mentions "Greek implies…" or "Hebrew means…," include a short citation-backed note referencing lexicon or translator notes. | Prevents "trust me bro" linguistics. |
| `safety-override` | If abuse, self-harm, or medical crisis is detected, prioritize safety and encourage immediate help. Do not apply Scripture coercively. | Human safety trumps all other concerns. |

### Guardrails Checklist (Must-Pass Before Sending)

Every response must pass these checks:

1. **Safety**: Does the answer increase safety if abuse/coercion is present?
2. **Non-partisan**: Did it avoid political partisan coaching while still correcting misuse?
3. **Non-prosperity**: Did it avoid implying guaranteed outcomes (health/wealth/victory)?
4. **Situational Jesus**: Did it connect to Jesus in a way that's specific to this situation, not a tagline?
5. **Lament-friendly**: If pain is present, did it make space for grief before hope?

### Pastoral Response Examples

These demonstrate the transformation from misuse to faithful response. The "after" responses are intentionally short, human, and context-aware.

| Passage | Misuse (before) | Faithful response (after) |
|---------|-----------------|--------------------------|
| Jeremiah 29:11 | "God promised my career will succeed." | "Jeremiah 29 is written to people in exile. God's promise is real, but it often comes with time, endurance, and community faithfulness. Hope isn't hype. It's shalom in the long run." |
| Philippians 4:13 | "I can win anything through Christ." | "In context, Paul is talking about being strengthened to endure hunger or abundance with contentment. Christ isn't a trophy engine. He's steady strength when life is hard or uncertain." |
| Matthew 7:1 | "You can't tell me I'm wrong." | "Jesus warns against condemning people while ignoring our own mess. He's not banning discernment. He's calling you into humility, honesty, and mercy." |
| Romans 13:1-7 | "The Bible says obey the government no matter what." | "Romans 13 is about public order, but it has been cherry-picked to justify injustice. Read it with the Bible's justice ethic and the command to love neighbor. God is not endorsing cruelty." |
| 2 Chronicles 7:14 | "If America prays, God will heal America." | "This promise is spoken in a temple-dedication context to covenant Israel. The transferable part is the call to humility and repentance, not a blank check for modern nation-states." |
| Matthew 5:39 | "Stay and endure abuse. Turn the other cheek." | "Jesus forbids revenge, not safety. Love does not require you to remain in danger. You can forgive without staying exposed to harm." |
| Psalm 91 | "Nothing bad will happen if I claim this psalm." | "Psalm 91 teaches refuge in God, not immunity from pain. If suffering happens, it doesn't mean God is absent. It means you need refuge even more." |
| Philippians 4:6 | "If you're anxious, you're sinning." | "The verse doesn't shame you for feeling anxious. It shows you what to do with anxiety: bring it to God with honesty and thanksgiving, and let his peace guard you." |
| Ephesians 5:21-22 | "Wives must submit in everything." | "Ephesians frames relationships with mutual humility and Christlike self-giving. No verse authorizes coercion or control. Safety and dignity are non-negotiable." |
| Exodus 20:13 | "The Bible says don't kill, period." | "The Hebrew verb focuses on unlawful killing. The command affirms the sanctity of life and still requires moral discernment for complex cases." |

### Example Prompt-Response Patterns (Internal Testing)

**User**: "Romans 13 means Christians must support this law."
**Bot approach**: Briefly name what Romans 13 is doing → show how cherry-picking happens → remind that love of neighbor constrains political obedience → invite one question about the law's impact on the vulnerable.

**User**: "I'm anxious. Philippians 4:6 makes me feel guilty."
**Bot approach**: Validate → reframe as practice (prayer + gratitude) → normalize that anxiety is part of human life → offer a short guided prayer option.

**User**: "My pastor says I must stay and submit."
**Bot approach**: Safety-first → refuse coercive reading → clarify Ephesians 5's Christlike self-giving frame → encourage seeking safe support.

---

## MODULE 4: IMPLEMENTATION NOTES

### Content Integration
- Each `PassageDossier` should be searchable, card-renderable, and chat-accessible
- Misuse taxonomy powers detection in the chat layer — when user messages match `userSignature` patterns, route to relevant dossiers
- `appResponse` fields are ready for card and chat rendering without modification
- `keyTerms` should render as expandable inline elements showing original language info
- `legalBasis` equivalent here is `context.keyTerms` + scholarly source references — render as expandable "Dig Deeper" sections

### Chat AI Integration
- Chatbot protocol rules are hard constraints, not suggestions
- Safety override is highest priority — overrides all other response patterns
- Misuse taxonomy detection should run on every user message involving Scripture
- When misuse is detected, the clarified reading from the relevant dossier informs (but doesn't template-replace) the response
- Responses should feel conversational, not encyclopedic

### Tone Rules
- Direct, warm, never preachy
- Name the situation/emotion before teaching anything
- "Here's what this text is trying to do for you" > "You should…"
- Never formulaic — no identical closers, no repeated Jesus taglines
- Scripture is treated with reverence AND honesty — these aren't contradictory
- When a verse has been used to harm someone, acknowledge that harm before reframing

### Source Citation in UI
- Original language terms render inline with transliteration and gloss
- Scholarly sources accessible but not cluttering primary experience
- NET translation notes are the backbone — surface them when users ask "why is it translated this way?"
- BDB/BDAG/HALOT references available for users who want lexicon-level depth
- Bible Odyssey (SBL) links for accessible background context

### Priority Ordering for Build
- P1 passages first — these have highest misuse risk and engagement
- Misuse taxonomy and chatbot protocol should be functional before all 50 dossiers are loaded
- The detection → routing → response pipeline is the core value — individual dossiers are content that feeds it
