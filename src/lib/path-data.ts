// The Path -- a 7-stage guided journey through The Well's transformation layer
// Each stage has steps that link to existing content (concepts, words, dossiers)
// plus Path-original introductions, micro-practices, and reflections.

export interface PathStage {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly icon: string;
  readonly color: string;
  readonly steps: readonly PathStep[];
  readonly unlockAfter: string | null;
}

export interface PathStep {
  readonly id: string;
  readonly stageId: string;
  readonly order: number;
  readonly title: string;
  readonly type: "introduction" | "concept" | "word" | "dossier" | "practice" | "milestone";
  readonly estimatedMinutes: number;
  readonly content: PathStepContent;
  readonly linkedContent?: {
    readonly type: "concept" | "word" | "dossier";
    readonly id: string;
    readonly customIntro?: string;
  };
  readonly practice?: {
    readonly prompt: string;
    readonly duration: string;
    readonly type: string;
  };
  readonly reflection?: string;
}

export interface PathStepContent {
  readonly title: string;
  readonly body: string;
  readonly pullQuote?: string;
  readonly keyInsight?: string;
}

// ---------------------------------------------------------------------------
// 7 Stages
// ---------------------------------------------------------------------------

export const pathStages: readonly PathStage[] = [
  // ── Stage 1: The Lens You're Wearing ──────────────────────────────────
  {
    id: "stage-1",
    slug: "the-lens",
    title: "The Lens You're Wearing",
    subtitle: "Before you read the text, the text has been read for you",
    description:
      "Every translation is an interpretation. Every interpretation carries the translator's assumptions. Before you can see what was actually written, you need to see what you've been conditioned to expect.",
    icon: "Eye",
    color: "#1D4ED8",
    unlockAfter: null,
    steps: [
      {
        id: "s1-1",
        stageId: "stage-1",
        order: 1,
        title: "Why Translation Matters More Than You Think",
        type: "introduction",
        estimatedMinutes: 5,
        content: {
          title: "Why Translation Matters More Than You Think",
          body: "You have never read the Bible. You have read a translation of the Bible. This is not a small distinction. Every English Bible you have ever held is the product of choices -- thousands of them -- made by translators who brought their own theology, politics, and institutional pressures to every word.\n\nThe King James Version was produced under the authority of a king who needed the text to support monarchy. Modern translations are produced by committees funded by publishing houses that need to sell copies. None of this means they are worthless. It means they are not neutral.\n\nThe original texts were written in Hebrew, Aramaic, and Koine Greek -- languages with different structures, different assumptions about reality, and words that have no direct English equivalent. When you read 'sin' in English, the Greek said 'hamartia' -- an archery term meaning 'missing the mark.' When you read 'repent,' the Greek said 'metanoia' -- a philosophical term meaning 'transform your perception.' These are not minor differences. They change the entire tone of the message.\n\nThis stage is about becoming aware of the lens between you and the source. Not to make you distrust everything, but to help you read more honestly.",
          pullQuote: "You have never read the Bible. You have read a translation of the Bible.",
          keyInsight: "Every translation is an interpretation. The question is not whether the translator had biases -- they all did. The question is whether you know what those biases are.",
        },
        reflection: "What translation(s) of the Bible were you raised with? What assumptions might that translation carry?",
      },
      {
        id: "s1-2",
        stageId: "stage-1",
        order: 2,
        title: "Hermeneutics: How You Read Changes What You Find",
        type: "concept",
        estimatedMinutes: 8,
        content: {
          title: "The Art of Interpretation",
          body: "Hermeneutics is the study of how we interpret texts. It sounds academic, but it is profoundly practical: the method you use to read scripture determines what you find there. A literalist reads Genesis 1 as a science textbook. A literary critic reads it as poetry. A liberation theologian reads it as a story about power. Same text, completely different messages -- and the difference is not in the text. It is in the reader.",
          keyInsight: "You do not read the Bible. You read the Bible through a framework. This stage helps you see the framework.",
        },
        linkedContent: {
          type: "concept",
          id: "hermeneutical-frameworks",
          customIntro: "Dive deeper into the major frameworks scholars use to read scripture -- and notice which one you were taught without being told.",
        },
      },
      {
        id: "s1-3",
        stageId: "stage-1",
        order: 3,
        title: "Translation Politics",
        type: "concept",
        estimatedMinutes: 8,
        content: {
          title: "Who Decides What the Words Mean?",
          body: "Translation is never neutral. The people who translate the text decide what it says, and those people have always been connected to power structures -- kings, churches, publishing houses. Understanding who translated your Bible and why is the first step toward reading it honestly.",
        },
        linkedContent: {
          type: "concept",
          id: "translation-politics",
          customIntro: "Explore how political and institutional pressures have shaped every major Bible translation from the Septuagint to the NIV.",
        },
      },
      {
        id: "s1-4",
        stageId: "stage-1",
        order: 4,
        title: "Pause and Notice",
        type: "practice",
        estimatedMinutes: 5,
        content: {
          title: "Your First Micro-Practice",
          body: "Before moving on, take a moment to sit with what you have learned. This is not about memorizing information. It is about noticing how it lands in your body and mind.",
        },
        practice: {
          prompt: "Think of a Bible verse you were taught as a child or that you hear often. Now ask: what if the original words meant something different from what I was told? Sit with that question for two minutes without trying to answer it. Just notice what comes up -- resistance, curiosity, relief, fear. Whatever arises is data about your relationship with the text.",
          duration: "2 minutes",
          type: "contemplative",
        },
        reflection: "What verse came to mind? What did you feel when you imagined it might mean something different?",
      },
      {
        id: "s1-5",
        stageId: "stage-1",
        order: 5,
        title: "The Lens Recognized",
        type: "milestone",
        estimatedMinutes: 2,
        content: {
          title: "You Have Seen the Lens",
          body: "You now know something most people never consider: that every time you read the Bible in English, you are reading through layers of translation choices, institutional pressures, and cultural assumptions. This is not a reason for despair. It is the beginning of a more honest relationship with the text. You have not lost anything. You have gained the ability to ask: what was actually written?",
          keyInsight: "Awareness of the lens is not cynicism. It is the prerequisite for seeing clearly.",
        },
      },
    ],
  },

  // ── Stage 2: The Words Behind the Words ──────────────────────────────
  {
    id: "stage-2",
    slug: "the-words",
    title: "The Words Behind the Words",
    subtitle: "The Greek they chose. The English that replaced it.",
    description:
      "The most important words in the Bible -- sin, repent, hell, eternal, forgive, perfect -- all mean something different in the original Greek than what you were taught. This stage takes you through the key word corrections one by one.",
    icon: "Languages",
    color: "#0891B2",
    unlockAfter: "stage-1",
    steps: [
      {
        id: "s2-1",
        stageId: "stage-2",
        order: 1,
        title: "Hamartia: Sin Was an Archery Term",
        type: "word",
        estimatedMinutes: 5,
        content: {
          title: "Missing the Mark",
          body: "The word translated as 'sin' throughout the New Testament is hamartia -- and it was not a religious word. It was an athletic term. When an archer's arrow missed the target, that was hamartia. The entire framing shifts: from 'you are wicked' to 'you aimed and missed -- adjust and try again.'",
        },
        linkedContent: {
          type: "word",
          id: "hamartia",
          customIntro: "Read the full word correction to see how this single translation choice changed the entire tone of Christianity.",
        },
      },
      {
        id: "s2-2",
        stageId: "stage-2",
        order: 2,
        title: "Metanoia: Repent Was an Invitation",
        type: "word",
        estimatedMinutes: 5,
        content: {
          title: "Transform Your Perception",
          body: "The very first word of Jesus' public ministry -- 'Metanoeite!' -- was not a guilt trip. Meta (beyond) + nous (mind). 'Go beyond your current way of thinking.' The Latin translators turned an invitation to expanded consciousness into a command to feel sorry. That single translation choice may have done more damage than any other.",
        },
        linkedContent: {
          type: "word",
          id: "metanoia",
          customIntro: "Explore how the word 'repent' was created by Latin translators who turned awakening into self-punishment.",
        },
      },
      {
        id: "s2-3",
        stageId: "stage-2",
        order: 3,
        title: "Gehenna and Aionios: What Hell Actually Was",
        type: "word",
        estimatedMinutes: 7,
        content: {
          title: "The Garbage Dump and the Age",
          body: "Jesus never said the word 'hell.' He said 'Gehenna' -- a literal burning garbage dump outside the walls of Jerusalem. And the word translated 'eternal' (aionios) actually means 'of the age.' Put these two corrections together and 'eternal hell' becomes 'the garbage dump of this age' -- a vivid metaphor about wasted living, not a cosmic torture chamber.",
        },
        linkedContent: {
          type: "word",
          id: "gehenna",
          customIntro: "The full story of how a Jerusalem garbage dump became an underground torture realm through centuries of mistranslation.",
        },
      },
      {
        id: "s2-4",
        stageId: "stage-2",
        order: 4,
        title: "Pistis, Charis, Sozo: Faith, Grace, Salvation",
        type: "word",
        estimatedMinutes: 7,
        content: {
          title: "Trust, Generosity, Wholeness",
          body: "Three words form the backbone of Christian theology -- and all three mean something different from what you were taught. Pistis (faith) is not blind belief; it is relational trust. Charis (grace) is not 'letting you off the hook'; it is the natural overflow of abundance. Sozo (salvation) is not escape from hell; it is being made whole, right now, in this life.",
          keyInsight: "When faith is trust, grace is generosity, and salvation is wholeness -- the entire religion transforms from a guilt management system into a path toward full human flourishing.",
        },
        linkedContent: {
          type: "word",
          id: "pistis",
          customIntro: "Start with pistis (trust), then explore charis (generosity) and sozo (wholeness) from the word corrections page.",
        },
      },
      {
        id: "s2-5",
        stageId: "stage-2",
        order: 5,
        title: "Sit With One Word",
        type: "practice",
        estimatedMinutes: 5,
        content: {
          title: "A Word to Carry",
          body: "Choose one word correction from this stage that surprised you the most. For the rest of today, whenever you encounter this word in conversation, in your thoughts, or in reading, notice the gap between what you were taught and what it originally meant.",
        },
        practice: {
          prompt: "Choose one: hamartia (missing the mark), metanoia (transform your perception), gehenna (the garbage dump), aionios (of the age), pistis (trust), charis (generosity), sozo (wholeness). Carry this word with you today. When it surfaces, let the original meaning sit alongside the one you were taught. Do not force a conclusion. Just notice.",
          duration: "All day",
          type: "awareness",
        },
        reflection: "Which word did you choose? What happened when you held both meanings at once?",
      },
      {
        id: "s2-6",
        stageId: "stage-2",
        order: 6,
        title: "The Words Recovered",
        type: "milestone",
        estimatedMinutes: 2,
        content: {
          title: "You Have Heard the Original Words",
          body: "You now carry something rare: the actual Greek words behind the English translations that shaped Western civilization. Sin is an aim that needs adjusting. Repentance is an invitation to see differently. Hell was a garbage dump. Eternal was age-long. Faith is trust. Grace is abundance. Salvation is wholeness. These are not minor footnotes. They are the foundation of everything that comes next.",
        },
      },
    ],
  },

  // ── Stage 3: What They Did to the Text ──────────────────────────────
  {
    id: "stage-3",
    slug: "the-text",
    title: "What They Did to the Text",
    subtitle: "How scripture gets weaponized -- and how to reclaim it",
    description:
      "The most commonly quoted Bible verses are often the most commonly misused. This stage examines how passages get ripped from context, mistranslated, and weaponized -- and what they actually said in their original setting.",
    icon: "Shield",
    color: "#DC2626",
    unlockAfter: "stage-2",
    steps: [
      {
        id: "s3-1",
        stageId: "stage-3",
        order: 1,
        title: "How Misuse Works",
        type: "introduction",
        estimatedMinutes: 5,
        content: {
          title: "The Anatomy of a Misused Verse",
          body: "A verse gets misused when it is extracted from its context and applied in ways that contradict its original meaning. This happens at three levels: text-level (the words themselves are wrong), context-level (the verse is ripped from its literary or historical setting), and ethics-pastoral (the interpretation contradicts Jesus' consistent ethic of love and protection of the vulnerable).\n\nThe Well tracks 9 specific misuse patterns and has full dossiers on 49 commonly weaponized passages. This stage walks you through the most important ones -- not to make you suspicious of all scripture, but to equip you to read with your eyes open.",
          keyInsight: "A verse torn from its context is not a verse. It is a weapon disguised as scripture.",
        },
      },
      {
        id: "s3-2",
        stageId: "stage-3",
        order: 2,
        title: "Romans 3:23 -- The Universal Condemnation",
        type: "dossier",
        estimatedMinutes: 7,
        content: {
          title: "'All Have Sinned' -- Or Have They?",
          body: "This is one of the most quoted verses in evangelical Christianity. But Paul was not making a universal guilt statement to prove everyone needs to be 'saved.' He was making an equality argument: Jews and Gentiles are on the same footing. No one has a special claim to God's favor. The word 'sinned' is hamartia -- 'missed the mark.' Paul is leveling the playing field, not condemning the species.",
        },
        linkedContent: {
          type: "dossier",
          id: "P-NT-01",
          customIntro: "Read the full passage dossier to see how Paul's equality argument got turned into universal condemnation.",
        },
      },
      {
        id: "s3-3",
        stageId: "stage-3",
        order: 3,
        title: "Matthew 5:48 -- The Impossible Standard",
        type: "dossier",
        estimatedMinutes: 7,
        content: {
          title: "'Be Perfect' -- The Most Damaging Mistranslation",
          body: "Millions of Christians have been paralyzed by this verse. 'Be perfect, as your heavenly Father is perfect.' But the Greek word is teleios -- complete, mature, having reached your intended purpose. Like a ripe fruit, not a flawless diamond. Jesus was not demanding the impossible. He was inviting growth.",
        },
        linkedContent: {
          type: "word",
          id: "teleios",
          customIntro: "See how the translation from teleios to 'perfect' turned an invitation into a trap.",
        },
      },
      {
        id: "s3-4",
        stageId: "stage-3",
        order: 4,
        title: "Practice: Read a Verse in Context",
        type: "practice",
        estimatedMinutes: 10,
        content: {
          title: "Context Changes Everything",
          body: "Choose a verse you have heard used to justify harmful behavior (judging others, condemning groups, demanding submission). Read the five verses before and after it. Ask: who was speaking? To whom? About what situation? What changes when you read the verse in its setting?",
        },
        practice: {
          prompt: "Pick a verse that has been used to hurt you or someone you know. Read the full chapter it comes from -- not just the verse. Notice what you find when the verse is returned to its home. Write one sentence about what changed when you read it in context.",
          duration: "10 minutes",
          type: "study",
        },
        reflection: "What verse did you choose? What did the context reveal that the isolated verse hid?",
      },
      {
        id: "s3-5",
        stageId: "stage-3",
        order: 5,
        title: "The Text Reclaimed",
        type: "milestone",
        estimatedMinutes: 2,
        content: {
          title: "You Can Read Differently Now",
          body: "You have learned the three levels of misuse. You have seen how context changes everything. You have practiced returning a verse to its home. From now on, when someone quotes a verse at you, you have the tools to ask: what did the original say? Who was the audience? Does this interpretation serve love or weaponize it? You are no longer a passive recipient of someone else's reading. You are becoming your own reader.",
        },
      },
    ],
  },

  // ── Stage 4: The Human Jesus ──────────────────────────────────────────
  {
    id: "stage-4",
    slug: "the-human-jesus",
    title: "The Human Jesus",
    subtitle: "Before the councils, before the creeds -- a teacher from Galilee",
    description:
      "Strip away 2,000 years of theology and you find a first-century Jewish teacher who said radical things about power, inclusion, and the divine. This stage introduces the historical Jesus -- not the Christ of the creeds, but the human behind the icon.",
    icon: "User",
    color: "#7C3AED",
    unlockAfter: "stage-3",
    steps: [
      {
        id: "s4-1",
        stageId: "stage-4",
        order: 1,
        title: "The Historical Jesus",
        type: "concept",
        estimatedMinutes: 8,
        content: {
          title: "Who Was Jesus Before Christianity?",
          body: "There was a real person behind the theology. Scholars have spent two centuries trying to separate the historical teacher from the later theological claims. What emerges is a first-century Jewish reformer who challenged the religious establishment, included the excluded, and taught that the divine was accessible to everyone -- without institutional mediation.",
        },
        linkedContent: {
          type: "concept",
          id: "historical-jesus",
          customIntro: "Explore the full scholarly picture of what we can and cannot know about the historical figure behind the creeds.",
        },
      },
      {
        id: "s4-2",
        stageId: "stage-4",
        order: 2,
        title: "What He Actually Said",
        type: "introduction",
        estimatedMinutes: 7,
        content: {
          title: "Subversive Speech in Occupied Territory",
          body: "The parables of Jesus are not children's stories. They are subversive political speech delivered under Roman occupation. The Good Samaritan was not a lesson about being nice -- it was a deliberate provocation that cast a hated outsider as the moral hero. The Prodigal Son was not about individual salvation -- it was about God's extravagant welcome of those the religious establishment had rejected.\n\nThe Sermon on the Mount, read in the original Greek, is a manifesto for the powerless. 'Blessed are the poor' is not spiritual advice. It is a revolutionary political statement in a world where wealth was considered proof of divine favor. Every Beatitude overturns the social order: the mourners will be comforted, the meek will inherit, those who hunger for justice will be satisfied.\n\nJesus spoke in Aramaic, his words were later written down in Greek, and we read them in English. Each transition changed the message. But the core is recoverable: a radical vision of a world where power is inverted, outsiders are welcomed, and the divine is available to everyone.",
          pullQuote: "Every Beatitude overturns the social order.",
          keyInsight: "Jesus was not a gentle sage offering self-help advice. He was a revolutionary figure delivering subversive speech in occupied territory.",
        },
      },
      {
        id: "s4-3",
        stageId: "stage-4",
        order: 3,
        title: "Who He Included",
        type: "introduction",
        estimatedMinutes: 6,
        content: {
          title: "The Deliberately Excluded",
          body: "The consistent pattern of Jesus' ministry was this: he went to the people his culture told him to avoid. Women in a patriarchal society. Samaritans in a world where Jews and Samaritans did not associate. Tax collectors who were collaborating with the occupying empire. Lepers who were ritually unclean. Prostitutes. The poor.\n\nThis was not accidental kindness. It was a deliberate theological statement: the divine is not restricted to the pure, the powerful, or the religiously correct. It is available to everyone -- especially those the institution has rejected.\n\nWhen the religious leaders criticized Jesus for eating with 'sinners,' he responded: 'It is not the healthy who need a doctor, but the sick. I have not come to call the righteous, but the lost.' The Greek word translated 'sinners' here is hamartoloi -- those who have missed the mark. He was dining with people whose aim was off. The institution saw them as contaminated. Jesus saw them as people who needed recalibration.",
        },
      },
      {
        id: "s4-4",
        stageId: "stage-4",
        order: 4,
        title: "The Teacher Encountered",
        type: "milestone",
        estimatedMinutes: 2,
        content: {
          title: "You Have Met the Historical Jesus",
          body: "Before the councils defined him. Before the creeds codified him. Before 2,000 years of institutional Christianity claimed him. There was a teacher from Galilee who ate with outcasts, spoke in subversive parables, and taught that the divine was not locked in a temple but available to anyone willing to see differently. That teacher is still worth listening to -- not because a church says so, but because of what he actually said.",
        },
        reflection: "What surprised you most about the historical Jesus? What was different from what you expected?",
      },
    ],
  },

  // ── Stage 5: The Lost Voices ──────────────────────────────────────────
  {
    id: "stage-5",
    slug: "the-lost-voices",
    title: "The Lost Voices",
    subtitle: "The texts that were buried, the traditions that were silenced",
    description:
      "In 1945, a sealed jar was opened in Nag Hammadi, Egypt, and the world got back texts that had been buried for 1,600 years. This stage explores the non-canonical texts and the process that decided which voices were heard.",
    icon: "Archive",
    color: "#7C3AED",
    unlockAfter: "stage-4",
    steps: [
      {
        id: "s5-1",
        stageId: "stage-5",
        order: 1,
        title: "How We Got the Bible",
        type: "concept",
        estimatedMinutes: 8,
        content: {
          title: "Canon Formation: Who Decided?",
          body: "The Bible did not fall from the sky as a finished book. It was assembled over centuries through a political process. Texts were included, excluded, debated, and suppressed. Understanding who made these decisions -- and why -- changes how you relate to the book itself.",
        },
        linkedContent: {
          type: "concept",
          id: "canon-formation",
          customIntro: "The full story of how dozens of competing texts were winnowed down to the canon you know -- and what got left out.",
        },
      },
      {
        id: "s5-2",
        stageId: "stage-5",
        order: 2,
        title: "The Gospel of Thomas",
        type: "concept",
        estimatedMinutes: 8,
        content: {
          title: "114 Sayings, No Narrative",
          body: "Buried in the Egyptian desert around 400 CE and rediscovered in 1945, the Gospel of Thomas presents a Jesus who teaches through riddles and paradoxes rather than through miracles and resurrection. There is no crucifixion story. No birth narrative. Just 114 sayings -- some matching the canonical Gospels, others wildly different. Scholars debate whether some of these sayings are older than the canonical versions.",
        },
        linkedContent: {
          type: "concept",
          id: "gospel-of-thomas",
          customIntro: "Explore the text that gives us a mystical, contemplative Jesus who sounds more like a Zen master than a church founder.",
        },
      },
      {
        id: "s5-3",
        stageId: "stage-5",
        order: 3,
        title: "The Nag Hammadi Library",
        type: "concept",
        estimatedMinutes: 8,
        content: {
          title: "What Was Buried",
          body: "52 texts in 13 leather-bound codices, sealed in a jar and buried in the 4th century -- probably to hide them from orthodox Christians who were destroying 'heretical' books. These texts reveal that early Christianity was far more diverse than the church later claimed. Multiple Gospels, multiple cosmologies, multiple visions of who Jesus was and what he taught.",
        },
        linkedContent: {
          type: "concept",
          id: "nag-hammadi-library",
          customIntro: "The full story of the discovery that changed everything we knew about early Christianity.",
        },
      },
      {
        id: "s5-4",
        stageId: "stage-5",
        order: 4,
        title: "Read a Lost Voice",
        type: "practice",
        estimatedMinutes: 10,
        content: {
          title: "Hearing What Was Silenced",
          body: "Read one saying from the Gospel of Thomas (available in the scripture cards). Let it sit with you without immediately comparing it to what you know from the canonical Gospels. Notice your reaction: does it feel familiar? Strange? Threatening? Liberating?",
        },
        practice: {
          prompt: "Read this saying attributed to Jesus from the Gospel of Thomas: 'If you bring forth what is within you, what you bring forth will save you. If you do not bring forth what is within you, what you do not bring forth will destroy you.' Sit with this for five minutes. What does it stir in you?",
          duration: "5 minutes",
          type: "contemplative",
        },
        reflection: "What did you feel when reading a text that was deliberately excluded from the Bible? What does exclusion tell you about the excluders?",
      },
      {
        id: "s5-5",
        stageId: "stage-5",
        order: 5,
        title: "The Voices Restored",
        type: "milestone",
        estimatedMinutes: 2,
        content: {
          title: "You Have Heard the Silenced Voices",
          body: "You now know that the Bible was assembled, not delivered. You have encountered texts that were buried for 1,600 years. You have sat with a saying from a Gospel that was excluded. The question is no longer 'which texts are in the Bible?' but 'who decided, and what did we lose?' The lost voices are no longer lost to you.",
        },
      },
    ],
  },

  // ── Stage 6: The Practices ──────────────────────────────────────────
  {
    id: "stage-6",
    slug: "the-practices",
    title: "The Practices",
    subtitle: "Knowledge that stays in your head changes nothing",
    description:
      "The contemplative tradition is Christianity's best-kept secret. For two thousand years, practitioners have developed methods for direct experience of the divine that bypass intellectual belief entirely. This stage introduces you to practices you can do today.",
    icon: "Flame",
    color: "#DC2626",
    unlockAfter: "stage-5",
    steps: [
      {
        id: "s6-1",
        stageId: "stage-6",
        order: 1,
        title: "The Contemplative Tradition",
        type: "introduction",
        estimatedMinutes: 5,
        content: {
          title: "Christianity's Hidden Depth",
          body: "Most people think Christianity is about believing the right things. But for two thousand years, a parallel tradition has existed alongside the institutional church -- one focused not on correct belief but on direct experience. The Desert Fathers and Mothers fled to the wilderness to practice silence. The mystics described union with God in language that made the church nervous. Meister Eckhart, Julian of Norwich, John of the Cross, Thomas Merton -- all practiced forms of prayer that look more like meditation than petition.\n\nThis tradition says: knowing about God is not the same as knowing God. Reading about water is not the same as drinking it. The practices in this stage are drinks of water.",
          pullQuote: "Knowing about God is not the same as knowing God.",
        },
      },
      {
        id: "s6-2",
        stageId: "stage-6",
        order: 2,
        title: "Lectio Divina",
        type: "concept",
        estimatedMinutes: 7,
        content: {
          title: "Sacred Reading",
          body: "Lectio Divina (divine reading) is one of the oldest Christian practices. It is not Bible study. You are not analyzing the text for information. You are listening for a word or phrase that speaks to you, sitting with it, letting it work on you. Four movements: read, reflect, respond, rest. The text reads you as much as you read it.",
        },
        linkedContent: {
          type: "concept",
          id: "lectio-divina",
          customIntro: "The full method and history of Lectio Divina -- the practice that turns reading into encounter.",
        },
      },
      {
        id: "s6-3",
        stageId: "stage-6",
        order: 3,
        title: "Centering Prayer",
        type: "concept",
        estimatedMinutes: 7,
        content: {
          title: "Twenty Minutes of Letting Go",
          body: "Choose a sacred word. Close your eyes. When thoughts come, gently return to your word. That is the entire method. Centering Prayer is the Christian equivalent of mantra meditation, rooted in the 14th-century classic 'The Cloud of Unknowing.' The practice is about consent -- consenting to the presence of the divine by releasing your grip on thoughts, plans, and distractions.",
        },
        linkedContent: {
          type: "concept",
          id: "centering-prayer",
          customIntro: "The full guide to Centering Prayer -- the practice that strips prayer down to its simplest form.",
        },
      },
      {
        id: "s6-4",
        stageId: "stage-6",
        order: 4,
        title: "Try It: Two Minutes of Silence",
        type: "practice",
        estimatedMinutes: 5,
        content: {
          title: "Your First Practice",
          body: "You do not need to believe anything to do this. You do not need to call it prayer. Just sit quietly for two minutes with a single word -- 'peace,' 'open,' 'here,' or any word that feels right. When your mind wanders (it will), gently return to the word. That is the entire practice.",
        },
        practice: {
          prompt: "Choose a word: peace, open, here, or any word that resonates. Set a timer for two minutes. Close your eyes. Breathe normally. When thoughts arise, do not fight them -- just gently return to your word. When the timer sounds, sit for another 30 seconds in silence before opening your eyes.",
          duration: "2 minutes",
          type: "centering",
        },
        reflection: "What word did you choose? What happened in those two minutes? Do not judge the experience -- just notice.",
      },
      {
        id: "s6-5",
        stageId: "stage-6",
        order: 5,
        title: "The Practice Begun",
        type: "milestone",
        estimatedMinutes: 2,
        content: {
          title: "You Have Practiced",
          body: "You have done something most churchgoers never do: you sat in silence and let go. You did not recite. You did not petition. You practiced presence. This is the contemplative tradition in its simplest form -- and it has been transforming people for two thousand years. The Practices section of The Well has twelve full guided practices if you want to go deeper. But the seed has been planted: you know that this tradition exists, and you have experienced it, even briefly.\n\nWhen you are ready to see the larger picture -- how these teachings were suppressed and what systems replaced them -- The Deep (/the-deep) is waiting. It is not gentle. But it is true.",
        },
      },
    ],
  },

  // ── Stage 7: Living It ──────────────────────────────────────────────
  {
    id: "stage-7",
    slug: "living-it",
    title: "Living It",
    subtitle: "From knowing to becoming",
    description:
      "You have seen the lens. You have heard the original words. You have met the historical Jesus. You have encountered the lost voices. You have practiced silence. Now the question is: what do you do with all of this? This final stage is about integration -- making this knowledge a daily practice.",
    icon: "Sun",
    color: "#D97706",
    unlockAfter: "stage-6",
    steps: [
      {
        id: "s7-1",
        stageId: "stage-7",
        order: 1,
        title: "From Information to Formation",
        type: "introduction",
        estimatedMinutes: 5,
        content: {
          title: "Knowledge That Changes You",
          body: "You now know things that most people in the pews do not know. You know what the Greek actually said. You know how the text was assembled. You know about the traditions that were suppressed. You have practiced silence.\n\nBut information alone changes nothing. The question is not 'what do you know?' but 'how does what you know change how you live?' This is the difference between scholarship and formation -- between studying the menu and eating the meal.\n\nThe Well was built for this transition. The daily Living Words give you something to sit with every morning. The Practices section gives you methods for direct experience. The Ask feature gives you a companion when questions arise. Use them. Come back tomorrow. The transformation is not an event. It is a daily practice.",
          pullQuote: "The question is not what do you know, but how does what you know change how you live.",
        },
      },
      {
        id: "s7-2",
        stageId: "stage-7",
        order: 2,
        title: "Your Daily Practice",
        type: "practice",
        estimatedMinutes: 5,
        content: {
          title: "A Commitment to Return",
          body: "Choose one practice to do daily for one week. It can be as simple as two minutes of centering prayer, or reading one Living Word each morning, or choosing one Greek word to carry through your day. The practice matters less than the consistency.",
        },
        practice: {
          prompt: "Choose your daily practice for this week:\n\n1. Two minutes of centering prayer each morning\n2. Read today's Living Word and sit with the question for five minutes\n3. Choose one Greek word correction and notice its English equivalent throughout your day\n4. Read one passage dossier and journal one sentence about what you learned\n\nPick one. Commit to it for seven days. Set a reminder on your phone.",
          duration: "5 minutes to decide, then daily",
          type: "commitment",
        },
        reflection: "Which practice did you choose? Why that one? What time of day will you do it?",
      },
      {
        id: "s7-3",
        stageId: "stage-7",
        order: 3,
        title: "The Path Completed",
        type: "milestone",
        estimatedMinutes: 3,
        content: {
          title: "You Have Walked the Path",
          body: "Seven stages. From the lens to the words to the text to the teacher to the lost voices to the practices to daily commitment. You have done something significant: you have looked past 2,000 years of institutional interpretation and encountered the source material on its own terms.\n\nThis is not the end. It is the beginning of a different kind of relationship with these texts -- one based on honesty, original languages, and direct experience rather than institutional authority. The Well is always here. The scholarship continues to grow. New practices and Living Words are added regularly.\n\nTwo paths open from here:\n\n- The Seven Walls (/walls) -- the inner demolition work. Seven denials of self, each with a Jericho Walk practice and declarations of freedom. This is the personal transformation layer.\n\n- The Deep (/the-deep) -- the system of control. How religion, war, economics, and death were weaponized. This is the structural awareness layer.\n\nThe water has been here for two thousand years. Most people drink from the pipes downstream. You came to the source.\n\nKeep drinking.",
          pullQuote: "This is not the end. It is the beginning.",
          keyInsight: "The Path is complete. The practice continues. Come back tomorrow.",
        },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export function getStageBySlug(slug: string): PathStage | undefined {
  return pathStages.find((s) => s.slug === slug);
}

export function getStageById(id: string): PathStage | undefined {
  return pathStages.find((s) => s.id === id);
}

export function getStepById(stepId: string): { stage: PathStage; step: PathStep } | undefined {
  for (const stage of pathStages) {
    const step = stage.steps.find((s) => s.id === stepId);
    if (step) return { stage, step };
  }
  return undefined;
}

export function getNextStep(
  currentStageSlug: string,
  currentStepId: string
): { stage: PathStage; step: PathStep } | null {
  const stageIndex = pathStages.findIndex((s) => s.slug === currentStageSlug);
  if (stageIndex === -1) return null;

  const stage = pathStages[stageIndex];
  const stepIndex = stage.steps.findIndex((s) => s.id === currentStepId);

  // Next step in same stage
  if (stepIndex < stage.steps.length - 1) {
    return { stage, step: stage.steps[stepIndex + 1] };
  }

  // First step of next stage
  if (stageIndex < pathStages.length - 1) {
    const nextStage = pathStages[stageIndex + 1];
    return { stage: nextStage, step: nextStage.steps[0] };
  }

  return null;
}

export function getPreviousStep(
  currentStageSlug: string,
  currentStepId: string
): { stage: PathStage; step: PathStep } | null {
  const stageIndex = pathStages.findIndex((s) => s.slug === currentStageSlug);
  if (stageIndex === -1) return null;

  const stage = pathStages[stageIndex];
  const stepIndex = stage.steps.findIndex((s) => s.id === currentStepId);

  // Previous step in same stage
  if (stepIndex > 0) {
    return { stage, step: stage.steps[stepIndex - 1] };
  }

  // Last step of previous stage
  if (stageIndex > 0) {
    const prevStage = pathStages[stageIndex - 1];
    return { stage: prevStage, step: prevStage.steps[prevStage.steps.length - 1] };
  }

  return null;
}

export function getTotalSteps(): number {
  return pathStages.reduce((sum, stage) => sum + stage.steps.length, 0);
}
