# The Well v2 Build Plan

## Current State (v1)
- 4 pages: home, explore (swipe cards), words (expandable corrections), ask (AI chat)
- 9 word corrections with deep explanations (hamartia, metanoia, gehenna, aionios, aphiemi, teleios, ekklesia, dikaiosyne, kardia)
- 15 scripture cards (word corrections + teachings + gnostic texts)
- AI guide using Claude API with rich system prompt
- Design: Inter + Playfair Display, dark green accent (#2D6A4F), clean card-based UI

## DESIGN DIRECTION (from Josh)
Keep the existing design but make it COOLER:
- More organic, leafy, living feel
- Water/well imagery (living water theme)
- NOT lame or cheesy
- Think: subtle organic textures, flowing water-inspired transitions, botanical accents
- Keep the scholarly/serious tone -- not a yoga app

## V2 Vision
A comprehensive spiritual intelligence universe. Not a scripture card app. An encyclopedic, AI-navigated platform covering the full depth of Abrahamic textual and theological traditions.

## Build Spec Location
Full spec (510 lines): `/tmp/thewell_spec.txt` (converted from `/Users/joshhohenstein/Downloads/files-2/TheWell_Build_Spec_v2.docx`)

---

## Phase 1: Knowledge Domain System (Data Layer)

### New file: `src/lib/domains.ts`
Define 13 knowledge domains as TypeScript data:
1. Canonical Scripture: Hebrew Bible/OT/Tanakh
2. Canonical Scripture: New Testament
3. Non-Canonical, Disputed, and Extracanonical Texts
4. Original Languages (Hebrew, Aramaic, Greek)
5. Church History and Historical Theology
6. Theology -- Systematic and Historical
7. Contemplative Tradition and Spiritual Practice
8. Liturgy, Worship, and Sacramental Life
9. Comparative Religion and Interfaith Context
10. Biblical Archaeology and Historical Context
11. Hermeneutics -- How to Read Scripture
12. Denominations, Traditions, and Their Distinctive Theologies
13. Personal and Pastoral Application

Each domain: `{ id, slug, name, description, icon, conceptCount }`

### New file: `src/lib/concepts.ts`
Concept entries with 3 depth layers each:
```typescript
interface Concept {
  id: string;
  slug: string;
  domainId: string;
  name: string;
  summary: string;
  lensTags: string[];
  relatedConceptSlugs: string[];
  relatedTextRefs: string[];
  layers: {
    accessible: string;    // 150-200 words
    intermediate: string;  // 400-600 words
    advanced: string;      // 800-2000 words
  };
  honestAnalysis?: string;
}
```

Priority concepts to build (at least 5-10 per domain, 65+ total):
- Domain 1: Torah/Pentateuch, Documentary Hypothesis, Dead Sea Scrolls, Septuagint, Wisdom Literature
- Domain 2: Synoptic Problem, Q Source, Pauline Corpus, Revelation genre, Canon Formation
- Domain 3: Gospel of Thomas, Gospel of Mary, Nag Hammadi overview, Apostolic Fathers, Gnostic Cosmology
- Domain 4: Biblical Hebrew overview, Koine Greek, Textual Criticism, Translation Theory
- Domain 5: Nicaea, Augustine, Reformation, Eastern Orthodoxy, Liberation Theology
- Domain 6: Atonement theories, Soteriology, Eschatology, Christology
- Domain 7: Desert Fathers, Lectio Divina, Centering Prayer, Ignatian Spirituality, Mystical Theology
- Domain 8: Liturgical Calendar, Eucharistic Traditions, Baptismal Theology
- Domain 9: Second Temple Judaism, Rabbinic Judaism, Islam and Abrahamic Texts, Kabbalah
- Domain 10: ANE Context, Crucifixion archaeology, Josephus, Dead Sea Scrolls archaeology
- Domain 11: Hermeneutical Frameworks, Genre Recognition, Sola Scriptura problems
- Domain 12: Catholic, Orthodox, Lutheran, Reformed, Baptist, Methodist, Pentecostal, Anabaptist
- Domain 13: Grief/Lament, Decision-Making, Suffering/Theodicy, Mental Health, Justice

### New file: `src/lib/text-data.ts`
Scripture text entries for the Text View:
```typescript
interface TextEntry {
  corpus: 'web' | 'kjv' | 'thomas' | 'philip' | 'mary' | 'truth';
  book: string;
  chapter: number;
  verse?: number;
  text: string;
  greekWords?: GreekWord[];
}
```
Start with: Gospel of Thomas (all 114 sayings), key NT passages with Greek word data, select Psalms, key OT passages.

---

## Phase 2: New Pages

### `/explore` page rewrite -> Domain Explorer
- Grid of 13 domains with icons, concept counts, descriptions
- Click domain -> filtered concept list
- Semantic-style search bar at top (client-side fuzzy search)
- Each concept shows: name, summary, domain, depth indicator

### New: `/concepts/[slug]` page -> Concept Detail
- Three-tab depth system: Accessible / Intermediate / Advanced
- Related concepts grid (linked)
- Related text references (linked)
- "What tradition X believes" section for theological topics
- "Ask the guide about this" button
- Honest Analysis notes section

### New: `/texts/[corpus]/[book]/[chapter]` page -> Text View
- Full chapter text display
- Translation selector (WEB, KJV where available)
- Greek word tap (for NT): morphology, lemma, gloss
- Parallel text view toggle
- "Show Receipts" for textual variants

### New: `/lectio` page -> Lectio Divina Mode
- Single verse fills screen
- Guided progression through 4 movements (Lectio, Meditatio, Oratio, Contemplatio)
- Timer option
- Minimalist UI, no concept chips or scholar notes
- Ambient background

### `/ask` page upgrade -> AI Guide
- Keep existing chat UI
- Upgrade system prompt with full domain knowledge context
- Add concept chips in responses (tappable links to concept pages)
- Add text chips (tappable links to text view)
- Depth-calibrated responses based on user's interaction history
- "Show My Work" expandable on responses

### New: `/onboarding` flow
- Step 1: Tradition lens selection (multi-select): Traditional, Catholic, Protestant, Anglican, Academic, Jewish context, Gnostic/Esoteric, Interfaith
- Step 2: Purpose: Daily rhythm / Deep study / Exploring / Decision support / Academic
- Step 3: Depth: New / Some background / Seminary level
- Store in localStorage, use to calibrate AI responses

---

## Phase 3: Navigation and Layout Updates

### Update `src/components/nav.tsx`
- Add: Explore (domains), Texts, Lectio, Ask
- Mobile bottom nav bar
- Search in nav

### Update `src/app/layout.tsx`
- Add liturgical calendar awareness (compute current season)
- Dynamic page titles per route

### Update `src/app/page.tsx` (Home)
- Keep word previews
- Add: Today's suggested starting point (liturgical calendar)
- Add: Domain preview cards
- Add: "Continue exploring" section
- Add: Seasonal/timely content

---

## Phase 4: Enhanced AI Guide

### Update `src/lib/system-prompt.ts`
- Inject full concept list as retrievable context
- Add lens-aware framing instructions
- Add citation requirement (every claim cites a text or concept)
- Add depth calibration based on user profile
- Add safety router for pastoral/crisis situations (crisis resources)

### Update `src/app/api/chat/route.ts`
- Add concept chip rendering in responses
- Add text chip rendering
- Add "Show My Work" data
- Validate citations against concept/text data

---

## Phase 5: Content Expansion

### Expand `src/lib/scripture-data.ts`
- Add 20+ more word corrections
- Add 30+ more scripture cards across all categories
- Add Gnostic text cards (Gospel of Philip, Gospel of Mary)
- Add Dead Sea Scrolls content
- Add patristic quotes

### Build concept content
- Write all 65+ concept entries with 3 depth layers each
- Cross-link related concepts
- Add honest analysis notes for contested topics

---

## Phase 6: Polish and Deploy

- Mobile-first responsive pass on all new pages
- Keyboard navigation for explore/text view
- PWA manifest update
- Open Graph meta for sharing
- Deploy to Vercel
- Push to GitHub

---

## Phase 7: Scripture Misuse Expansion Pack

**Spec:** `the_well_scripture_misuse_expansion_pack_spec.md` (in project root)

Three new modules that add depth to the AI guide and content layer. This is an EXPANSION -- no existing code is replaced.

### 7a: Misuse Taxonomy + Detection
- New data: `MisuseType` classification system (3 categories: text-level, context-level, ethics-pastoral)
- 10 misuse types: misquotation, translation trap, semantic narrowing, verse isolation, genre confusion, covenant transfer, audience shift, proof-texting, weaponization, spiritual bypassing
- AI layer uses taxonomy to detect error patterns in user messages and route to corrective pathways

### 7b: 50 Passage Dossiers
- 50 high-frequency, high-impact biblical passages commonly misquoted, weaponized, or decontextualized
- Each dossier: original language key terms (Hebrew/Greek), 5-10 verse context window, common misuse patterns (tagged to taxonomy), scholarly correction, pastoral framing, tradition-specific notes
- Organized into 6 content bands: Clobber Passages (8), Prosperity/Blessing (8), Obedience/Authority (7), Suffering/Theodicy (7), End Times/Judgment (6), Identity/Calling (6), plus 8 supplemental
- Feeds into existing card, chat, search, and AI response systems as a new content layer

### 7c: Chatbot Protocol
- Generation rules and guardrails for producing responses that are scripturally faithful, pastorally safe, and non-formulaic
- Tone calibration: scholarly but warm, never preachy, never dismissive
- Safety router for crisis/pastoral situations
- Citation requirements: every claim cites a text, dossier, or scholarly source
- "I don't know" protocol for genuine unknowns

### New Files
| File | Action |
|------|--------|
| `src/lib/misuse-taxonomy.ts` | NEW - 10 misuse type definitions |
| `src/lib/passage-dossiers.ts` | NEW - 50 passage dossier entries |
| `src/lib/chatbot-protocol.ts` | NEW - AI response generation rules |
| `src/lib/scholarly-sources.ts` | NEW - 10 scholarly source constants (BHS, NA28, BDAG, etc.) |
| `src/lib/system-prompt.ts` | UPDATE - Integrate misuse detection + dossier context |
| `src/app/passages/page.tsx` | NEW - Passage dossier browse/search page |
| `src/app/passages/[id]/page.tsx` | NEW - Individual dossier detail view |
| `src/components/misuse-tag.tsx` | NEW - Misuse type badge component |

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/lib/domains.ts` | NEW - 13 domain definitions |
| `src/lib/concepts.ts` | NEW - 65+ concepts with 3 depth layers |
| `src/lib/text-data.ts` | NEW - Scripture text entries |
| `src/lib/liturgical.ts` | NEW - Liturgical calendar computation |
| `src/lib/search.ts` | NEW - Client-side fuzzy search |
| `src/app/page.tsx` | UPDATE - Enhanced home with domains |
| `src/app/explore/page.tsx` | REWRITE - Domain explorer grid |
| `src/app/words/page.tsx` | Keep as-is (it's good) |
| `src/app/ask/page.tsx` | UPDATE - Concept/text chips, Show My Work |
| `src/app/concepts/[slug]/page.tsx` | NEW - Concept detail with depth tabs |
| `src/app/texts/[corpus]/[book]/[chapter]/page.tsx` | NEW - Text view |
| `src/app/lectio/page.tsx` | NEW - Lectio Divina mode |
| `src/app/onboarding/page.tsx` | NEW - Calibration flow |
| `src/components/nav.tsx` | UPDATE - New routes |
| `src/components/concept-chip.tsx` | NEW - Tappable concept reference |
| `src/components/text-chip.tsx` | NEW - Tappable text reference |
| `src/lib/system-prompt.ts` | UPDATE - Full knowledge context |
| `src/lib/scripture-data.ts` | UPDATE - Expand content |
| `src/app/layout.tsx` | UPDATE - Dynamic metadata |
| `src/app/globals.css` | UPDATE - New component styles |
