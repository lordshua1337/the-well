# The Well -- Transformation Plan

## What Josh Said It Must Be

A blended spiritual and gnostic Jesus app. Not a Bible study platform. Not an encyclopedia. A way to connect with the teachings of Jesus Christ through:

1. An AI companion chat (like Thomas who knew Jesus -- not hokey, not pretending to be Jesus)
2. A passage prompt ("type in your favorite passage and learn what it really means")
3. Swipeable word correction cards (Sin, Forgive, Repent, Love -- about letting go, releasing, letting God in, change is good)
4. A history timeline section (how history changed Jesus' words -- encyclopedia makes sense HERE, self-directed, not forced)
5. The positive experiential features (Living Words, Practices, The Path, Reclaimed)

At the core it must do those things really well. Everything else is secondary.


## What Already Exists (verified by walking the live app + reading every file)

### Content inventory
- 43 word corrections across 6 categories (theological, salvation, power, relational, prayer, kingdom) -- in src/lib/words/
- 45 scripture cards across 3 categories (22 word, 13 teaching, 10 gnostic) -- in src/lib/scripture-data.ts
- 49 passage dossiers (25 OT, 24 NT) with clarified readings -- in src/lib/passages/
- 85 concepts across 13 domains -- in src/lib/concepts/
- 60 Living Words daily prompts across 10 experiential categories -- in src/lib/living-words-data.ts
- 12 contemplative practices with step-by-step instructions -- in src/lib/practices-data.ts
- 7 Path stages with guided steps -- in src/lib/path-data.ts
- 8 Human Jesus chapters -- in src/lib/human-jesus-data.ts
- 5 Restoration/Reclaimed categories -- in src/lib/restoration.ts

### Systems that already work
- **Swipeable card system EXISTS** at /cards (src/app/cards/page.tsx) -- 45 cards, touch swipe gestures (left/right currently), keyboard arrows, category filters (Word Corrections / Teachings / Gnostic Texts), shuffle button, progress dots, slide animation. Just needs redesign and elevation from secondary nav.
- **Thomas AI voice EXISTS** in src/lib/ai/tutor-context.ts (getTutorSystemPromptAddition) -- already says "speak like someone who walked with Jesus personally," "Not AS Jesus -- never pretend to be him. But like Thomas," "Like two people sitting at a well." Just needs to become the default/only voice instead of hiding behind a mode toggle.
- **Director AI voice EXISTS** in src/lib/ai/system-prompt-director.ts -- asks questions, holds space for pain, points toward practices, embodies "direct access, no institution required." Best elements should merge into the unified Thomas voice.
- **RAG retrieval system EXISTS** in src/lib/ai/ -- keyword extraction, cross-reference triggers (e.g., "sin" triggers word+passage+card chunks), relevance scoring, knowledge index. Passage detection for the prompt system can build on this.
- **Homepage scroll-snap system EXISTS** with 7 full-screen sections: Hook, Daily Word, Daily Passage, Path Progress, Practice, Jesus Chapter, Deep Dive. Daily content rotates.
- **Supabase integration EXISTS** -- auth (Google + magic link), journal/reflections sync, practice progress, analytics.

### What doesn't work
- **Deployment is broken** -- the-well-app.vercel.app shows an ancient "Article URL" prototype, not the current app. Every route except / returns 404. The local code builds and runs perfectly. The Vercel deployment URLs redirect to Vercel login (team auth). THIS MUST BE FIXED FIRST or nothing we build is visible.
- Homepage opens with "What if the most important book in Western history was mistranslated?" -- intellectual thesis about a book
- Cards page is buried in secondary nav, swipes left/right (Josh wants up/down), card design is too small (not full-screen)
- Thomas voice is hidden behind a 3-way mode toggle (Scholar/Director/Tutor), defaults to Scholar (academic)
- Ask page says "What do you want to know?" with generic starter questions, no passage-first prompt
- Explore page has 13 domains including Hebrew Bible, Archaeology, Hermeneutics, Denominations, Liturgy
- 25 OT passages displayed with equal prominence to NT
- No history timeline
- Practices describe but don't immerse -- instructions page with a timer, not a guided experience
- Reclaimed is in secondary nav behind hamburger menu

### Current navigation
- Primary: The Path, Practices, The Human Jesus, Living Words, Explore, Ask
- Secondary: Study Plans, Journal, Knowledge Graph, Words, Cards, Passages, Reclaimed, Saved, Search
- Mobile bottom tabs: Path, Practices, Words, Explore, Ask


## The 5 Core Features

### 1. AI Companion -- Thomas Voice (ELEVATE EXISTING)

What exists: The Thomas system prompt is already written (tutor-context.ts lines 140-166). It already captures exactly what Josh described. The Director prompt (system-prompt-director.ts) has complementary qualities (asking questions, holding space, pointing to practices). The RAG system retrieves relevant word corrections, passages, and concepts based on the user's question.

What needs to change:

**System prompt** (src/lib/ai/system-prompt-base.ts):
- Replace the "scholarly companion" base prompt with a unified voice that blends Thomas (intimate knowing, conversational warmth, natural Greek references) + Director (asks questions, holds space, points to practices, "direct access no institution required")
- The new base prompt IS the Thomas voice. No mode switching.
- Keep all the PROTOCOL RULES (truth-first, no-weaponization, no-bypassing, safety-override) -- these are good safeguards
- Keep the SCRIPTURE MISUSE DETECTION section -- it serves the mission (protecting people from weaponized scripture)
- Add: when a user shares a passage reference, ALWAYS surface relevant word corrections naturally. If they share Romans 3:23, weave in hamartia. If they share Matthew 4:17, weave in metanoia. Don't list them -- let them emerge in conversation.
- Add: the response arc for passages should be: what you were told -> what the Greek actually says -> what it meant to the people who heard it -> what this opens up for you now

**Ask page** (src/app/ask/page.tsx):
- Remove ModeToggle component entirely (lines 103-147)
- Remove the `mode` state and all mode-dependent logic
- Remove the `AskMode` type
- Update empty state:
  - Heading: "What passage is on your heart?" (not "What do you want to know?")
  - Subtext: "Type in your favorite verse and learn what it really means. Or ask anything about what Jesus actually taught."
  - Loading message: "Sitting with that..." (blend of current director "Sitting with your question..." and tutor "Thinking back to what he said...")
- Update STARTER_QUESTIONS to passage-focused:
  - "John 3:16" / "Philippians 4:13" / "Romans 8:28" / "Matthew 7:1 -- Judge not" / "1 Corinthians 13 -- Love is patient" / "Romans 3:23 -- All have sinned" / "Matthew 5:44 -- Love your enemies" / "Jeremiah 29:11 -- Plans to prosper" / "Ephesians 2:8-9 -- Saved by grace" / "Psalm 23 -- The Lord is my shepherd"
  - These are the passages people actually grew up hearing, carry with them, got weaponized against them
- Update placeholder text: "Type a verse, a question, or whatever's on your mind..."

**Context builder** (src/lib/ai/context-builder.ts):
- buildEnhancedSystemPrompt: remove mode parameter, always use the unified Thomas+Director base prompt
- The retrieval system already handles cross-references. No changes needed to retrieval.ts.

**API route** (src/app/api/chat/route.ts):
- Remove mode handling from the API. Always use the unified prompt.
- Keep tutorContext injection (renamed to learnerContext) -- it's useful for personalization regardless of mode

Files to modify: system-prompt-base.ts (rewrite), ask/page.tsx (redesign), context-builder.ts (simplify), api/chat route (simplify)
Files to delete: system-prompt-director.ts (absorbed into base), tutor-context.ts getTutorSystemPromptAddition (absorbed into base; keep buildTutorContext and getTutorSuggestions but rename)


### 2. Passage Prompt System (ENHANCE EXISTING RAG)

What exists: The Ask page already accepts any text input. The RAG system already retrieves relevant chunks based on keywords. Cross-reference triggers already map terms like "sin" -> word+passage+card chunks.

What needs to change:

**Passage reference detection** -- add to retrieval.ts or a new passage-detector.ts:
- Regex pattern to detect Bible verse references: /\b(Genesis|Exodus|Leviticus|...|Revelation)\s+\d+[:\d-]*/i
- Also detect shorthand: "John 3:16", "Rom 3:23", "Phil 4:13", "Matt 7:1"
- When a passage reference is detected, look up the matching dossier from allDossiers by passage field
- If found: inject the FULL dossier data (not truncated) into the context -- clarifiedReading, jesusConnection, commonQuoteForm, the works
- If not found: let the AI respond from its training data (it knows the Bible) but flag to the user that this passage isn't in the curated collection yet
- The RAG should ALSO pull related word corrections for that passage. The cross-links system (src/lib/cross-links.ts) already maps words to passages. Use it.

**Passage autocomplete** (nice-to-have, Phase 4):
- As user types "John" or "Phil", show matching passages from the 49 dossiers
- Tap to fill. Not blocking -- they can always type freely.

**Response quality**:
- The AI should structure passage responses naturally but hit these beats:
  1. "Here's what most people hear when they read this..." (the common reading)
  2. "But here's what the Greek actually says..." (word corrections woven in)
  3. "The people who first heard this were..." (historical context from dossier)
  4. "So what this opens up is..." (personal application, not prescriptive)
  5. A follow-up question: "What does that change for you?" or "Is there another verse connected to this one for you?"

Files to create: src/lib/ai/passage-detector.ts
Files to modify: retrieval.ts (add passage-reference boost), context-builder.ts (inject full dossier when detected), ask/page.tsx (starter questions already being updated in Feature 1)


### 3. Swipeable Word Correction Cards (REDESIGN EXISTING)

What exists: /cards page (src/app/cards/page.tsx) already has:
- 45 scripture cards (22 word, 13 teaching, 10 gnostic)
- Touch swipe gestures (touchStart/touchMove/touchEnd with 50px threshold)
- Keyboard arrow navigation
- Category filters with counts
- Shuffle/random button
- Progress dots with click-to-jump
- Slide-in animation
- ScriptureCard data model with: greek, transliteration, commonTranslation, actualMeaning, verse, verseRef, context, category

What needs to change:

**Swipe direction**: Change from left/right to up/down
- handleTouchStart/Move/End: compare Y coordinates instead of X
- Keyboard: ArrowUp/ArrowDown instead of ArrowLeft/ArrowRight (keep Left/Right as aliases)
- CSS animations: slide from bottom instead of side

**Card design**: Full-viewport-height cards, not small centered boxes
- Each card fills the screen (min-h-[100dvh] with scroll-snap like the homepage)
- Layout per card:
  - Top: faded/crossed-out English word in large display font (e.g., "SIN" at 72px, text-text-muted, line-through)
  - Middle: Greek word in serif italic (transliteration), then actual meaning as the reveal headline
  - Key verse in a blockquote
  - Bottom: 2-3 sentence "why this changes everything" (the context field or whyItMatters)
  - "Go deeper" link to the full word correction detail page
- The vibe should be: each card is a revelation. A weight being lifted. Not a flashcard.

**Card ordering -- the story arc** (for the default/curated view):
The 10 core cards should flow in a narrative:
1. hamartia (Sin -> Missing the mark) -- "You're not broken. Your aim is off."
2. metanoia (Repent -> Transform your perception) -- "Change isn't punishment. It's waking up."
3. aphiemi (Forgive -> Release, let go) -- "Forgiveness isn't about them. It's putting down the rock you've been carrying."
4. charis (Grace -> Generous overflow) -- "Grace isn't 'you don't deserve this.' It's 'this is what abundance does.'"
5. pistis (Faith -> Trust) -- "Faith isn't believing without evidence. It's trusting a relationship."
6. agape (Love -> Deliberate choice) -- "Love isn't a feeling. It's something you do on purpose."
7. gehenna (Hell -> Garbage dump) -- "Jesus wasn't threatening cosmic torture. He was pointing at the dump outside the city walls."
8. kolasis (Punishment -> Corrective pruning) -- "God isn't settling scores. God is tending a garden."
9. apollymi (Perish -> Lost) -- "Lost doesn't mean destroyed. Lost things get found."
10. sozo (Saved -> Made whole) -- "Salvation isn't escape from hell. It's becoming complete."

That arc: you're not broken -> change is growth -> let go -> you're loved -> trust -> love back -> there's no threat -> correction is care -> you're not gone -> you're being made whole.

**End-of-deck state**: After the last card:
- "That's the story they changed. The original message was about wholeness, not condemnation."
- CTA: "Ask the companion about any of these" (link to Ask) or "Explore all 43 word corrections" (link to full list)
- Option to shuffle for another round or switch to Teaching/Gnostic card categories

**Category handling**:
- Default view: the 10-card curated story arc above
- Filter buttons at top (same as current): All (45), Words (22), Teachings (13), Gnostic (10), Curated (10)
- When viewing "All" or a category, show in data order. Only "Curated" uses the story arc order.
- Keep shuffle button

Files to modify: src/app/cards/page.tsx (major redesign), possibly new component for the full-screen card layout
Files to create: src/lib/curated-card-order.ts (the 10-card story arc ordering)


### 4. History Timeline -- How Jesus' Words Got Changed (NEW BUILD)

What exists: Content is scattered across:
- 8 Human Jesus chapters (src/lib/human-jesus-data.ts) -- sourcing, synoptic problem, criteria of authenticity, etc.
- 7 Church History concepts (in concepts/) -- house churches to Vatican
- 7 Theology concepts -- atonement theories, christology, eschatology
- 5 Hermeneutics concepts -- interpretation methods
- Various other concepts that are chronologically relevant

What to build:

**Data model** (src/lib/timeline-data.ts):
```
TimelineEra {
  id: string
  slug: string
  title: string           // e.g., "The Living Voice"
  yearRange: string       // e.g., "~30-50 AD"
  startYear: number       // for sorting
  summary: string         // 2-3 sentences
  whatChanged: string     // what happened to the teachings in this era
  keyEvents: TimelineEvent[]
  affectedWords: string[] // word correction IDs affected in this era
  relatedConcepts: string[] // concept slugs for deep dive
  relatedChapters: string[] // Human Jesus chapter IDs
  relatedPassages: string[] // passage IDs commonly misused due to this era
}

TimelineEvent {
  year: string
  title: string
  description: string
  significance: string  // one-line "why this matters"
}
```

**Timeline eras** (8 eras, each with events and links):
1. **The Living Voice** (~30-50 AD) -- Jesus teaches in Aramaic. Oral tradition. No written texts yet. Words carry direct experiential meaning.
2. **The Greek Translation** (~50-100 AD) -- Paul's letters, Gospels written in Koine Greek. First layer of translation. Some Aramaic nuance already shifting. (Affected words: all -- this is when hamartia, metanoia, etc. get their Greek form)
3. **The Suppression** (~100-325 AD) -- Competing communities. Gnostic texts. Gospel of Thomas. Nag Hammadi writings. Institutional consolidation begins. Texts that emphasize direct experience are marginalized. (Related: Lost Texts concepts, gnostic scripture cards)
4. **The Imperial Church** (325-400 AD) -- Council of Nicaea. Canon formation. Constantine. Christianity becomes state religion. Jerome's Latin Vulgate -- Greek nuance lost in Latin translation. (Affected words: metanoia -> poenitere/repent, hamartia -> peccatum/sin, aionios -> aeternus/eternal)
5. **The Medieval Lock** (~500-1500 AD) -- Latin-only Bible. Clergy monopoly on interpretation. Direct experience suppressed. Mystical tradition goes underground (Desert Fathers, Meister Eckhart, Julian of Norwich). (Related: Reclaimed categories, contemplative practice concepts)
6. **The Reformation Crack** (~1500-1600 AD) -- Luther, vernacular translations. Bible accessible again but through Protestant institutional lens. New gatekeepers replace old ones. (Affected words: pistis interpreted as "belief" rather than "trust")
7. **The King's Bible** (1611-1900 AD) -- King James Version authorized under a monarch. English becomes the dominant Bible language. KJV shapes English-speaking Christianity for centuries. Translation choices become doctrine.
8. **The Modern Drift** (1900-present) -- Denominational translations, prosperity gospel, political weaponization. "Philippians 4:13" on coffee mugs. "Jeremiah 29:11" stripped of context. The teachings become bumper stickers.

**Page design** (/timeline route):
- Vertical scrolling timeline with a visible line/spine on the left
- Each era is a section: year range badge, title, summary, expandable "What changed" detail
- Each era shows: "Words affected in this era" (clickable chips linking to word cards)
- Each era shows: "Go deeper" links to related concepts, chapters, and passages
- This is the self-directed encyclopedia. You can spend 5 minutes or 5 hours here. Nothing is forced.
- Mobile: single-column, eras stack vertically with the timeline spine

**Content assembly**:
- Era 1-2: draw from Human Jesus chapters 1-3 (The Sources, The Synoptic Problem, Criteria of Authenticity)
- Era 3: draw from Lost Texts concepts (Gospel of Thomas, Nag Hammadi, etc.)
- Era 4-5: draw from Church History concepts + Theology concepts
- Era 6-7: draw from Hermeneutics concepts + Traditions/Denominations concepts
- Era 8: new content (short) -- how modern culture weaponizes scripture
- Each era's events can be seeded from existing content and expanded over time

Files to create: src/lib/timeline-data.ts, src/app/timeline/page.tsx, src/components/timeline/ (Timeline, TimelineEra components)


### 5. Experiential Features -- Elevate and Immerse (MODIFY EXISTING)

**A. Living Words -- ELEVATE**

What works: Everything. The 60 prompts across 10 categories (perception, release, presence, correction, encounter, justice, body, shadow, community, silence) are beautifully written. The daily rotation works. The reflection box works. The micro-practices are actionable.

Changes:
- Move to primary nav (handled in nav restructure)
- Homepage returning user already shows today's Living Word title -- keep this
- The mobile bottom tab currently says "Words" (pointing to /words). Change to "Living Words" (pointing to /living-words)
- No content changes needed. This feature is doing its job.

**B. Practices -- MAKE IMMERSIVE**

What works: 12 practices with step-by-step instructions, difficulty ratings, time estimates, tradition labels, "Start guided practice" button, timer component.

What doesn't work: Clicking "Start guided practice" doesn't actually guide you. It shows the instructions and a timer. You read and time yourself.

Build -- Immersive Practice Mode (new component):
- When user taps "Start guided practice" on any practice detail page:
  - Full-screen overlay (z-50, bg-background, no nav, no distractions)
  - Practice title and "X" close button at top
  - Steps advance on a timer (using the existing duration fields from PracticeStep data)
  - Each step: display the instruction text with large, readable type
  - Between steps: a brief "..." transition with a soft pulse animation
  - For Lectio Divina specifically: auto-load a NT passage (random from curated list or today's daily passage) for the reading step
  - End state: "How was that?" with optional reflection textarea (saves to journal if logged in)
  - Bell sound: use Web Audio API to generate a simple bell tone (no audio file dependency) -- or a CSS animation pulse if audio feels heavy

Scope this carefully:
- Start with Lectio Divina (most popular, most structured, 4 clear movements)
- Then Centering Prayer (simplest -- it's basically timed silence with a sacred word)
- Then Jesus Prayer (breathing synchronized prompt)
- Other 9 practices get the immersive mode in later iterations

Files to create: src/components/practices/immersive-mode.tsx
Files to modify: src/app/practices/[slug]/page.tsx (hook up the "Start guided practice" button to immersive mode)

**C. The Path -- MAKE PRIMARY**

What works: 7 stages, each with introduction + concept/word/practice/milestone steps, reflection prompts, progress tracking via localStorage.

Changes:
- Already the first primary nav item -- keep it there
- Homepage CTA already says "Start The Path" for new users -- keep it
- No structural changes needed. The Path works. It just needs the nav restructure to make it more prominent.

**D. Reclaimed -- ELEVATE TO PRIMARY NAV**

What works: 5 categories (Direct Experience of God, The Feminine Divine, The Body as Sacred, Universal Access to Gnosis, and a 5th). Each has: whatWasStolen, replacedWith, evidence, whatItOriginallyLookedLike, howToReclaimIt.

Changes:
- Move from secondary nav to primary nav (nav restructure handles this)
- Keep the label "Reclaimed" -- the page itself explains the concept ("What Was Stolen, What Can Be Recovered"). The word works once you read the page.
- No content changes needed. This content is the thesis of the app.


## Navigation Restructure

### New Primary Nav (desktop top bar)
The Path | Living Words | Practices | Reclaimed | Ask

### New Secondary Nav (hamburger/drawer)
Words (cards) | Passages | Timeline | Study Plans | Journal | Search | Saved

### Mobile Bottom Tabs (5 tabs)
Path | Living Words | Practices | Ask | More (hamburger)

### What Gets Absorbed or Hidden
- **Explore page**: does NOT disappear entirely. Reduce from 13 to 6 domains: Practice, Life, Lost Texts, New Testament, Theology (renamed "Big Questions"), Interfaith. Hide: Hebrew Bible, Archaeology, Hermeneutics, Traditions/Denominations, Liturgy, Church History. The hidden domains' content feeds into the Timeline. Explore is accessible from Search and from secondary nav as "Explore" but not primary.
- **Knowledge Graph**: accessible from Search page or Explore, not in any nav
- **The Human Jesus**: content absorbed into Timeline. The /jesus route can redirect to /timeline or remain as an alternate entry point.
- **Cards page**: /cards becomes the new primary word experience. /words (accordion list) becomes the "all words" deep reference linked from card "Go deeper" actions.

### Files to modify
- src/components/nav.tsx: primaryLinks, secondaryLinks, mobileTabLinks arrays


## Deployment Fix (MUST DO FIRST)

The Vercel deployment at the-well-app.vercel.app shows a completely different (ancient) app. The local codebase builds perfectly. Recent deployments exist but redirect to Vercel login.

Before ANY feature work:
1. Check Vercel project settings -- is the domain correctly assigned?
2. Check if there's a Deployment Protection setting blocking public access
3. Verify the GitHub repo (lordshua1337/the-well) is connected to the correct Vercel project
4. Do a fresh deploy: `npx vercel --prod` from the project directory
5. Confirm ALL routes work on the production URL
6. If the-well-app.vercel.app is a different project, find the correct URL or set up the domain correctly

This is non-negotiable. If the deployment doesn't work, nothing we build matters.


## Execution Order

### Phase 0: Deployment Fix
- Fix Vercel deployment so the current app is live and accessible
- Verify all routes work on production URL
- Estimated scope: debugging Vercel config, possibly a fresh deploy

### Phase 1: The Three Core Experiences (do these right)

**1a. Word Cards Redesign** (modify existing /cards)
- Change swipe direction to up/down
- Full-viewport-height card design
- Create 10-card curated story arc ordering
- End-of-deck completion state
- Move to more prominent position (mobile tab or primary nav access)
- Files: cards/page.tsx, new curated-card-order.ts

**1b. AI Companion Unification** (modify existing Ask + AI system)
- Rewrite system-prompt-base.ts with unified Thomas+Director voice
- Remove mode toggle from ask/page.tsx
- Passage-focused starter questions and placeholder text
- Remove mode handling from API route and context-builder
- Files: system-prompt-base.ts, ask/page.tsx, context-builder.ts, api/chat route

**1c. Passage Prompt Detection** (enhance existing RAG)
- Build passage reference regex detector
- Inject full dossier data when passage detected
- Pull related word corrections via cross-links
- Files: new passage-detector.ts, modify retrieval.ts, modify context-builder.ts

### Phase 2: Structure

**2a. Navigation Restructure**
- Update primary nav: Path, Living Words, Practices, Reclaimed, Ask
- Update secondary nav: Words, Passages, Timeline, Study Plans, Journal, Search, Saved
- Update mobile tabs: Path, Living Words, Practices, Ask, More
- File: nav.tsx

**2b. Homepage Rewrite**
- Section 1 (Hook): speak to the seeker, not about a book
- Keep sections 2-5 (Daily Word, Daily Passage, Path, Practice) -- they work
- Section 6 (Jesus): point to Timeline instead of Human Jesus chapter
- Section 7 (Deep Dive): replace random academic concept with a Reclaimed category preview or a word card preview
- Files: section-hook.tsx, section-jesus.tsx, section-deep-dive.tsx

**2c. Explore Reduction**
- Hide 7 academic domains from primary Explore view
- Keep 6 experiential/relevant domains
- Academic domains still accessible from Search
- File: domains data + explore page

### Phase 3: Depth and Immersion

**3a. History Timeline** (new build)
- Create timeline-data.ts with 8 eras
- Build /timeline page and components
- Assemble content from existing Human Jesus chapters, Church History, Theology, Hermeneutics concepts
- Link each era to affected word corrections and passages
- Files: timeline-data.ts, timeline/page.tsx, timeline components

**3b. Immersive Practice Mode** (new component)
- Build for Lectio Divina first (auto-load passage, timed movements, bell)
- Then Centering Prayer (timed silence)
- Then Jesus Prayer (breathing prompts)
- Files: immersive-mode.tsx, practices/[slug]/page.tsx modification

**3c. Passage Page Restructure**
- Default filter shows NT passages first
- OT passages in a "Hebrew Bible" tab (not removed, just not default)
- File: passages/page.tsx

### Phase 4: Polish

**4a. Passage Autocomplete** -- as-you-type suggestions for known passages in Ask input
**4b. Living Words Expansion** -- grow from 60 to 90+ entries
**4c. Gospel of Thomas Integration** -- weave Thomas sayings into Living Words rotation and Lectio Divina passage pool
**4d. Mobile Gesture Polish** -- ensure card swipes, immersive practices, and timeline feel native
**4e. Share Feature** -- share individual word cards or passage revelations (social graph / image export)


## What NOT to Do

- Do not delete existing content. Reorganize and re-deliver.
- Do not build the card system from scratch -- redesign the existing one.
- Do not write a new Thomas AI prompt from scratch -- elevate and unify the existing one.
- Do not make the AI pretend to be Jesus or say "as someone who walked with Jesus."
- Do not force academic content on anyone. It lives in the Timeline for people who want it.
- Do not rush. Each core feature must work perfectly before moving to the next.
- Do not change the data models unless absolutely necessary. The data is good. The delivery needs to change.
- Do not break what already works (Living Words, Path, Practices instructions, journal, auth).
- Do not add Framer Motion animations beyond what's already there unless the feature specifically requires it (card transitions may benefit, but keep it minimal).
- Do not remove the Explore page entirely -- reduce it, hide the academic domains, keep the experiential ones accessible.


## Acceptance Tests

When this is done, a person should be able to:

1. **Open the app and feel seen** -- the homepage speaks to them, not about a book
2. **Type "Philippians 4:13" into Ask** and have the companion explain what it really means in a way that moves them -- weaving in the Greek, the context, and what it means for them now
3. **Swipe through word cards** and feel the story: you're not broken -> change is growth -> release -> grace -> trust -> love -> no threat -> care -> found -> whole
4. **Choose to explore the timeline** of how it all got changed -- or not. Self-directed. Never forced.
5. **Tap "Start guided practice" on Lectio Divina** and actually be guided through silence, reading, reflection, and encounter -- with a passage loaded, prompts appearing on a timer, and a bell at the end
6. **Come back tomorrow** and find a new Living Word waiting
7. **Find "Reclaimed" in the main nav** without hunting through a hamburger menu
8. **Ask the companion anything** -- about a verse, about what Jesus taught, about their pain -- and get a warm, knowing response that references the Greek naturally and asks them a question back
9. **NOT feel like they're in a seminary course** -- no Hermeneutics, no Documentary Hypothesis, no denomination comparison on the front page
10. **FEEL like this is a place to experience Christ** -- through words that liberate, practices that still the mind, a companion who knows, and a daily prompt that asks the question they've been avoiding

That's the app. A way to know. A way to experience Christ. Not a textbook. A well.
