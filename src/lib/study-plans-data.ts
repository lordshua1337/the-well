// Study Plans -- structured multi-day reading plans built from The Well's content
// These guide users through the recovery of what institutional Christianity
// mistranslated, suppressed, or weaponized. Each plan connects to existing
// content modules: word corrections, passage dossiers, concepts, practices, chapters.

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StudyPlanStep {
  readonly day: number;
  readonly title: string;
  readonly description: string;
  readonly contentLinks: readonly ContentLink[];
  readonly reflectionPrompt: string;
  readonly connectiveText: string; // original narrative tying content together
}

export interface ContentLink {
  readonly type: "concept" | "passage" | "word" | "practice" | "chapter";
  readonly id: string; // content ID or slug depending on type
  readonly label: string;
}

export interface StudyPlan {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly totalDays: number;
  readonly icon: string;
  readonly color: string;
  readonly steps: readonly StudyPlanStep[];
}

// ---------------------------------------------------------------------------
// Plans
// ---------------------------------------------------------------------------

export const studyPlans: readonly StudyPlan[] = [
  // ── Plan 1: Words They Changed ──────────────────────────────────────────
  {
    id: "sp1",
    slug: "words-they-changed",
    title: "Words They Changed",
    subtitle: "5-day word recovery",
    description:
      "The five most damaging mistranslations in the Bible. What the Greek actually said, what English made you think, and why the difference matters for your life right now.",
    totalDays: 5,
    icon: "Languages",
    color: "#6366f1",
    steps: [
      {
        day: 1,
        title: "Missing the Mark, Not Being Filthy",
        description: "Hamartia: the archery term that got turned into a shame weapon.",
        contentLinks: [
          { type: "word", id: "sc-1", label: "Hamartia -- 'sin' or 'missing the mark'" },
          { type: "passage", id: "rom-3-23", label: "Romans 3:23 Dossier" },
        ],
        reflectionPrompt:
          "If sin is missing a target rather than being fundamentally broken, how does your relationship with yourself change?",
        connectiveText:
          "We start with the word that has caused more shame than any other in Christianity. The Greek word hamartia was an archery term -- it meant missing the target. Not moral filth. Not being born evil. Paul used it to level the playing field: everyone misses, so nobody gets to judge. The Latin church translated it as 'sin' and turned an invitation to adjust your aim into a verdict of condemnation. Everything The Well does starts here -- going back to what the words actually said.",
      },
      {
        day: 2,
        title: "Transform Your Perception, Don't Grovel",
        description: "Metanoia: the first public word of Jesus, catastrophically mistranslated.",
        contentLinks: [
          { type: "word", id: "sc-2", label: "Metanoia -- 'repent' or 'transform your mind'" },
        ],
        reflectionPrompt:
          "Jesus's first word was an invitation to see everything differently. What belief do you hold that might need a 'meta-noia'?",
        connectiveText:
          "The very first public word out of Jesus's mouth was 'metanoeite' -- transform your perception. Meta (beyond) + nous (mind). It was an awakening call, not a guilt trip. But the Latin Vulgate translated it as 'poenitentiam agite' -- do penance. An invitation to expanded consciousness became a command to grovel. This single mistranslation shaped 1,500 years of Western Christianity.",
      },
      {
        day: 3,
        title: "The Garbage Dump, Not the Torture Chamber",
        description: "Gehenna: a real place Jesus's audience would have recognized instantly.",
        contentLinks: [
          { type: "word", id: "sc-5", label: "Gehenna -- 'hell' or 'the burning garbage dump'" },
          { type: "concept", id: "afterlife-and-judgment", label: "Afterlife & Judgment" },
        ],
        reflectionPrompt:
          "If Gehenna was a garbage dump and not an eternal torture chamber, how does that change how you read Jesus's warnings?",
        connectiveText:
          "The word 'hell' appears in English Bibles. The word Jesus actually used was Gehenna -- the Valley of Hinnom, a literal burning garbage dump outside Jerusalem's walls where refuse was incinerated. His audience would have pictured a place, not an afterlife. Jesus was saying 'your life is headed for the trash heap,' not 'God will torture you forever.' The doctrine of eternal conscious torment was built on a geographical metaphor.",
      },
      {
        day: 4,
        title: "Healing, Not Afterlife Insurance",
        description: "Sozo: salvation meant wholeness in this life, not a ticket out of hell.",
        contentLinks: [
          { type: "word", id: "sc-4", label: "Sozo -- 'saved' or 'healed/made whole'" },
        ],
        reflectionPrompt:
          "Where in your life do you need 'sozo' -- not rescue from punishment, but genuine wholeness and healing?",
        connectiveText:
          "When Jesus told the woman at Simon's house 'your faith has saved you,' the Greek word was sozo -- to heal, to make whole, to restore. He used the same word for physical healing and spiritual liberation interchangeably. There was no separation. Salvation wasn't fire insurance for after death. It was restoration to wholeness right now.",
      },
      {
        day: 5,
        title: "A Present Reality, Not a Future Place",
        description: "Basileia tou Theou: the kingdom is here, among you, now.",
        contentLinks: [
          { type: "word", id: "sc-3", label: "Basileia -- 'kingdom' or 'God's way of doing things'" },
          { type: "chapter", id: "what-he-said", label: "What Jesus Actually Said" },
        ],
        reflectionPrompt:
          "If the kingdom of God is a present reality you can participate in today, what does that participation look like in your actual life this week?",
        connectiveText:
          "We close with the phrase Jesus used more than any other: basileia tou theou. Not a place you go when you die. Not a future destination. A present reality -- God's way of doing things, available right now. When Jesus said 'the kingdom of God is among you,' he wasn't pointing to the sky. He was pointing to the people standing in front of him.",
      },
    ],
  },

  // ── Plan 2: Verses They Weaponized ──────────────────────────────────────
  {
    id: "sp2",
    slug: "verses-they-weaponized",
    title: "Verses They Weaponized",
    subtitle: "7-day passage recovery",
    description:
      "Seven passages ripped from context and turned into tools of control. What they actually said, who they were actually written to, and how to read them honestly.",
    totalDays: 7,
    icon: "BookOpen",
    color: "#f59e0b",
    steps: [
      {
        day: 1,
        title: "Jeremiah 29:11 -- Not About Your Career",
        description: "Written to exiles in Babylon, not individuals planning their future.",
        contentLinks: [
          { type: "passage", id: "jer-29-11", label: "Jeremiah 29:11 Dossier" },
        ],
        reflectionPrompt:
          "How does knowing this was written to a displaced community -- not to you personally -- change how you hear it?",
        connectiveText:
          "This is probably the most tattooed verse in Christianity. 'For I know the plans I have for you.' Except it wasn't written to you. It was written to Jewish exiles sitting in Babylon after their temple was destroyed and their nation conquered. Understanding this doesn't diminish the verse -- it deepens it. It's about a community holding hope in the middle of catastrophe, not an individual's career plan.",
      },
      {
        day: 2,
        title: "Philippians 4:13 -- Not a Sports Verse",
        description: "Paul was chained up, talking about being content whether hungry or fed.",
        contentLinks: [
          { type: "passage", id: "phil-4-13", label: "Philippians 4:13 Dossier" },
        ],
        reflectionPrompt:
          "What would it look like to find strength in weakness, the way Paul actually meant this?",
        connectiveText:
          "Paul wrote 'I can do all things through Christ who strengthens me' while chained to a Roman guard, talking about the ability to be content whether starving or well-fed, whether free or in prison. It's a verse about endurance in suffering, not about winning games or closing business deals.",
      },
      {
        day: 3,
        title: "Romans 8:28 -- Not 'Everything Happens for a Reason'",
        description: "Paul wasn't saying God causes suffering. He was saying God repurposes it.",
        contentLinks: [
          { type: "passage", id: "rom-8-28", label: "Romans 8:28 Dossier" },
        ],
        reflectionPrompt:
          "Can you name something painful that wasn't 'for a reason' but that something good eventually came through?",
        connectiveText:
          "This verse has been used to dismiss suffering more than almost any other. Told to grieving parents. Told to abuse survivors. 'All things work together for good.' But Paul -- who was beaten, shipwrecked, and imprisoned -- wasn't saying God plans your suffering. He was saying God can take the wreckage and build something from it. That's a completely different claim.",
      },
      {
        day: 4,
        title: "Matthew 18:20 -- Not About Worship Attendance",
        description: "Jesus was teaching conflict resolution, not setting a minimum headcount.",
        contentLinks: [
          { type: "passage", id: "matt-18-20", label: "Matthew 18:20 Dossier" },
        ],
        reflectionPrompt:
          "The context is reconciliation. How does that change what 'God's presence' means in this passage?",
        connectiveText:
          "Where two or three are gathered in my name, there I am among them. This isn't about small group Bible studies. Read the verses before it -- Jesus is laying out a step-by-step process for resolving conflict within the community. The 'gathering' is for reconciliation, not worship.",
      },
      {
        day: 5,
        title: "Proverbs 31 -- Not a Checklist for Women",
        description: "An acrostic poem. A literary device, not a to-do list.",
        contentLinks: [
          { type: "passage", id: "prov-31-10-31", label: "Proverbs 31 Dossier" },
        ],
        reflectionPrompt:
          "How would women's relationship with this text change if it were read as poetry rather than prescription?",
        connectiveText:
          "The Proverbs 31 'woman' has been used to set impossible standards for wives and mothers for centuries. But the passage is a Hebrew acrostic poem -- each line starts with a successive letter of the alphabet. It's a literary device celebrating wisdom personified as a woman, not a job description for actual women.",
      },
      {
        day: 6,
        title: "Wives Submit -- What Ephesians 5 Actually Says",
        description: "The verse before it says 'submit to one another.' That changes everything.",
        contentLinks: [
          { type: "passage", id: "eph-5-22-33", label: "Ephesians 5:22-33 Dossier" },
        ],
        reflectionPrompt:
          "What happens when you read 'wives submit' after 'submit to one another'? How does the meaning shift?",
        connectiveText:
          "Ephesians 5:22 -- 'Wives, submit to your husbands' -- has been used to enforce patriarchy for millennia. But verse 21 says 'submit to one another out of reverence for Christ.' The mutual submission frame changes the entire passage. And the Greek word for 'submit' (hypotasso) meant 'voluntarily arrange yourself under' -- not 'obey a superior.'",
      },
      {
        day: 7,
        title: "Judge Not -- What Jesus Actually Demanded",
        description: "He didn't say 'never evaluate.' He said 'fix yourself first.'",
        contentLinks: [
          { type: "passage", id: "matt-7-1-5", label: "Matthew 7:1-5 Dossier" },
        ],
        reflectionPrompt:
          "Where have you used 'don't judge' to avoid accountability -- your own or someone else's?",
        connectiveText:
          "We close with the passage everyone quotes but nobody finishes. 'Judge not lest you be judged' is verse 1. Verse 5 says 'first take the log out of your own eye, then you will see clearly to take the speck out of your brother's.' Jesus wasn't banning discernment. He was demanding self-examination first. It's a higher standard, not a lower one.",
      },
    ],
  },

  // ── Plan 3: What Jesus Actually Did ─────────────────────────────────────
  {
    id: "sp3",
    slug: "what-jesus-did",
    title: "What Jesus Actually Did",
    subtitle: "7-day historical recovery",
    description:
      "Strip away 2,000 years of institutional overlay. What did the historical Jesus actually say, do, and teach? A week with the human who started everything.",
    totalDays: 7,
    icon: "User",
    color: "#10b981",
    steps: [
      {
        day: 1,
        title: "The Sources We Have",
        description: "What's reliable, what's not, and how scholars decide.",
        contentLinks: [
          { type: "chapter", id: "the-sources", label: "Chapter: The Sources" },
          { type: "concept", id: "historical-jesus", label: "The Historical Jesus" },
        ],
        reflectionPrompt:
          "How does it feel to learn that scholars can determine what Jesus likely said vs. what was attributed to him later?",
        connectiveText:
          "Before we can hear what Jesus said, we need to know which sources are reliable. The Well's Human Jesus module starts here -- with the tools scholars use to distinguish early traditions from later additions. This isn't about undermining the text. It's about being honest with it.",
      },
      {
        day: 2,
        title: "His World",
        description: "Roman occupation, peasant economics, and messianic expectation.",
        contentLinks: [
          { type: "chapter", id: "his-world", label: "Chapter: His World" },
        ],
        reflectionPrompt:
          "How does understanding Jesus as a colonized peasant change what you hear when he says 'blessed are the poor'?",
        connectiveText:
          "Jesus was not a middle-class American. He was a colonized peasant under Roman military occupation, in a society where 90% of people were subsistence farmers, taxed by both Rome and the Temple. When he said 'blessed are the poor,' his audience was poor. Everything he taught was heard against this backdrop.",
      },
      {
        day: 3,
        title: "What He Actually Said",
        description: "Parables as subversion. Beatitudes as manifesto. Kingdom as revolution.",
        contentLinks: [
          { type: "chapter", id: "what-he-said", label: "Chapter: What He Said" },
          { type: "word", id: "sc-3", label: "Basileia -- Kingdom/Reign of God" },
        ],
        reflectionPrompt:
          "Which teaching of Jesus is most uncomfortable for your current life? Why?",
        connectiveText:
          "The parables weren't sweet stories. The Good Samaritan made the enemy the hero. The Prodigal Son gave the inheritance to the failure. The Rich Man and Lazarus put a wealthy man in torment. These were verbal grenades thrown at the powerful. Jesus taught in a way designed to subvert every assumption his audience held.",
      },
      {
        day: 4,
        title: "What He Actually Did",
        description: "Healings as social restoration. Table fellowship as political protest.",
        contentLinks: [
          { type: "chapter", id: "what-he-did", label: "Chapter: What He Did" },
        ],
        reflectionPrompt:
          "If healing meant social restoration -- being brought back into community -- where do you need that kind of healing?",
        connectiveText:
          "In first-century Palestine, illness meant social death. Lepers, the bleeding woman, the demoniac -- they were excluded from community, temple, and economy. When Jesus healed them, he wasn't just curing disease. He was restoring people to belonging. And when he ate with tax collectors and sinners, he was committing a political act -- table fellowship was the most powerful social statement available.",
      },
      {
        day: 5,
        title: "Who He Included",
        description: "Women, Samaritans, tax collectors, and everyone the institution excluded.",
        contentLinks: [
          { type: "chapter", id: "who-he-included", label: "Chapter: Who He Included" },
        ],
        reflectionPrompt:
          "Who would Jesus include today that your tradition currently excludes?",
        connectiveText:
          "Jesus spoke with women in public, had women disciples, appeared first to women after the resurrection. He made a Samaritan -- the most hated ethnic group in Jewish society -- the hero of his most famous parable. He touched lepers, ate with tax collectors, and defended sex workers. The pattern is unmistakable: Jesus consistently crossed every boundary the religious institution enforced.",
      },
      {
        day: 6,
        title: "How He Died",
        description: "Crucifixion was Rome's punishment for political threats, not theological disputes.",
        contentLinks: [
          { type: "chapter", id: "how-he-died", label: "Chapter: How He Died" },
        ],
        reflectionPrompt:
          "The cross was Rome's tool of terror. How does that change how you see it compared to the sanitized version?",
        connectiveText:
          "Crucifixion was reserved for enemies of the state -- slaves, rebels, and political threats. Rome didn't execute people for blasphemy. The sign above Jesus's head read 'King of the Jews' -- that's a political charge, not a theological one. Jesus was killed because he threatened the power structure. Understanding this changes everything about what the cross means.",
      },
      {
        day: 7,
        title: "What Happened After",
        description: "The earliest claims weren't 'Jesus went to heaven.' They were 'everything has changed.'",
        contentLinks: [
          { type: "chapter", id: "what-happened-after", label: "Chapter: What Happened After" },
          { type: "practice", id: "centering-prayer", label: "Practice: Centering Prayer" },
        ],
        reflectionPrompt:
          "Whether you take the resurrection literally, metaphorically, or are still deciding -- what does 'new life from death' mean for you right now?",
        connectiveText:
          "The earliest Christian claim wasn't 'Jesus went to heaven and you can too.' It was 'Jesus is alive and God's new creation has already begun.' The resurrection in Jewish thought meant the renewal of the entire world -- not souls floating to clouds. The first Christians believed the future had broken into the present. That's a radically different claim from the one most churches make today.",
      },
    ],
  },

  // ── Plan 4: Practices They Lost ─────────────────────────────────────────
  {
    id: "sp4",
    slug: "practices-they-lost",
    title: "Practices They Lost",
    subtitle: "7-day contemplative recovery",
    description:
      "The church threw out its own deepest practices. Centering prayer, lectio divina, the examen -- ancient wisdom that neuroscience is now validating. One practice per day for a week.",
    totalDays: 7,
    icon: "Flame",
    color: "#ef4444",
    steps: [
      {
        day: 1,
        title: "Centering Prayer",
        description: "Consent to God's presence through 20 minutes of silence.",
        contentLinks: [
          { type: "practice", id: "centering-prayer", label: "Centering Prayer Guide" },
          { type: "concept", id: "contemplative-tradition", label: "The Contemplative Tradition" },
        ],
        reflectionPrompt: "What came up during the silence? What was hard about simply being still?",
        connectiveText:
          "The Protestant Reformation threw out contemplative practice along with Catholic corruption. For 500 years, most Christians were taught that prayer means talking AT God. But the oldest Christian tradition says prayer is silence WITH God. Centering Prayer, rooted in the 14th-century Cloud of Unknowing, isn't about emptying your mind. It's about consenting to presence.",
      },
      {
        day: 2,
        title: "Lectio Divina",
        description: "Sacred reading -- not studying scripture, but letting scripture read you.",
        contentLinks: [
          { type: "practice", id: "lectio-divina", label: "Lectio Divina Guide" },
        ],
        reflectionPrompt: "Which word or phrase 'shimmered' for you? What might it be saying?",
        connectiveText:
          "Benedict of Nursia in the 6th century gave the church Lectio Divina -- a four-movement practice of reading, reflecting, responding, and resting. It's not Bible study. It's not analysis. It's receptive reading where you listen for the word that catches you. The one that won't let go. That's where the living water is.",
      },
      {
        day: 3,
        title: "The Examen",
        description: "Ignatius's daily review. Where was the living water? Where wasn't it?",
        contentLinks: [
          { type: "practice", id: "the-examen", label: "The Examen Guide" },
        ],
        reflectionPrompt: "Where did you experience consolation today? Where desolation?",
        connectiveText:
          "Ignatius of Loyola considered the Examen more important than any other prayer. It's a simple evening review: where did you feel alive today? Where did you feel drained? Over time, patterns emerge that reveal where the living water is flowing in your life -- and where it's been blocked.",
      },
      {
        day: 4,
        title: "Havruta",
        description: "The Jewish practice of paired study. Wrestling with text together.",
        contentLinks: [
          { type: "practice", id: "havruta", label: "Havruta Guide" },
        ],
        reflectionPrompt: "What emerged from disagreement that wouldn't have emerged from agreement?",
        connectiveText:
          "Jesus was a Jew. His method of teaching came from Jewish tradition. Havruta is the ancient practice of paired study -- two people wrestling with a text, disagreeing productively, and arriving at understanding neither could have reached alone. This is how Jesus's earliest followers actually engaged with his teachings.",
      },
      {
        day: 5,
        title: "Walking Prayer",
        description: "Prayer with your feet. Embodied presence instead of mental striving.",
        contentLinks: [
          { type: "practice", id: "walking-prayer", label: "Walking Prayer Guide" },
        ],
        reflectionPrompt: "What did you notice when you slowed down? What does your body know that your mind doesn't?",
        connectiveText:
          "Christianity became a religion of the head. But Jesus walked everywhere. His ministry happened on roads, in fields, by the sea. Walking prayer recovers the embodied dimension of spiritual life -- the recognition that you are not a brain with legs but a whole person. Slow down. Walk. Notice.",
      },
      {
        day: 6,
        title: "Breath Prayer",
        description: "A single sentence synchronized with breathing. 1,500 years old. Still works.",
        contentLinks: [
          { type: "practice", id: "breath-prayer", label: "Breath Prayer Guide" },
        ],
        reflectionPrompt: "What prayer naturally arose from your breathing? What does that tell you about what you need right now?",
        connectiveText:
          "The Jesus Prayer -- 'Lord Jesus Christ, have mercy on me' -- has been prayed on the breath by Eastern Christians for 15 centuries. Inhale the first half, exhale the second. Or find your own: inhale a name for God, exhale your deepest need. Simple enough for any moment. Ancient enough to be trusted.",
      },
      {
        day: 7,
        title: "Designing Your Own Rhythm",
        description: "Which practices fit you? Build your personal rule of life.",
        contentLinks: [
          { type: "practice", id: "rule-of-life", label: "Rule of Life" },
        ],
        reflectionPrompt: "Of the six practices this week, which 1-2 felt most natural? What would it look like to do them regularly?",
        connectiveText:
          "A 'Rule of Life' isn't about rules. It's a personal rhythm of practices that keep you rooted in the living water. Not all six practices will fit you -- and that's the point. Today, reflect on what worked, what didn't, and what rhythm you want to carry forward. The goal isn't to do more. It's to go deeper.",
      },
    ],
  },

  // ── Plan 5: Honest Deconstruction ──────────────────────────────────────
  {
    id: "sp5",
    slug: "honest-deconstruction",
    title: "Honest Deconstruction",
    subtitle: "10-day faith examination",
    description:
      "A guided companion for people who are questioning -- not to tear down, but to find out what's real. Honest questions deserve honest engagement with the source material.",
    totalDays: 10,
    icon: "Puzzle",
    color: "#8b5cf6",
    steps: [
      { day: 1, title: "Permission to Question", description: "Doubt is not the enemy of faith. Certainty is.", contentLinks: [{ type: "concept", id: "faith-and-doubt", label: "Faith & Doubt" }], reflectionPrompt: "What question have you been afraid to ask? Write it down.", connectiveText: "Deconstruction starts with permission. The Bible is full of people who questioned -- Abraham argued with God, Job demanded answers, the Psalms are 40% lament. If they could do it, so can you. This plan isn't about destroying your faith. It's about finding out what's real underneath the institutional overlay." },
      { day: 2, title: "Where Did the Bible Come From?", description: "Councils, committees, and the politics of canon formation.", contentLinks: [{ type: "concept", id: "canon-formation", label: "Canon Formation" }], reflectionPrompt: "Does knowing the Bible was assembled by committees over centuries change how you hold it?", connectiveText: "The Bible didn't fall from the sky. It was debated, selected, and assembled over hundreds of years. Some books barely made it in. Others were popular but excluded. The Gospel of Thomas, the Gospel of Mary -- these were read widely by early Christians before institutional decisions removed them. Understanding this process doesn't undermine the text. It humanizes it." },
      { day: 3, title: "Translation Is Interpretation", description: "Every English Bible is someone's theological choice.", contentLinks: [{ type: "concept", id: "translation-politics", label: "Translation Politics" }], reflectionPrompt: "Have you ever compared the same verse across 3+ translations? Try it today.", connectiveText: "There is no such thing as a 'literal' translation. Every translation requires thousands of interpretive decisions. The KJV was produced under a king who needed scripture to support monarchy. The NIV was funded by a publisher. These aren't conspiracy theories -- they're publishing history. And they matter." },
      { day: 4, title: "What the Greek Actually Says", description: "The five words that changed everything when they were mistranslated.", contentLinks: [{ type: "word", id: "sc-1", label: "Hamartia" }, { type: "word", id: "sc-2", label: "Metanoia" }, { type: "word", id: "sc-5", label: "Gehenna" }], reflectionPrompt: "Which mistranslation makes you angriest? Which brings the most relief?", connectiveText: "Now you know the Bible was assembled and translated by humans. So what did those humans change? Today we look at the specific words that were catastrophically mistranslated -- sin, repent, hell -- and what the Greek originals actually said. This is the core of what The Well exists to recover." },
      { day: 5, title: "What Jesus Actually Taught", description: "Strip away the institutional overlay. What did the man actually say?", contentLinks: [{ type: "chapter", id: "what-he-said", label: "What He Said" }, { type: "chapter", id: "what-he-did", label: "What He Did" }], reflectionPrompt: "What surprised you most about the historical Jesus vs. the institutional Jesus?", connectiveText: "Most of what people believe about Jesus comes from the institution, not from the man. The historical Jesus was a Jewish peasant under military occupation who taught in parables, ate with outcasts, challenged the powerful, and was executed as a political threat. This is who The Well invites you to meet." },
      { day: 6, title: "What the Church Suppressed", description: "Gnostic texts, women leaders, and the contemplative tradition.", contentLinks: [{ type: "concept", id: "gnostic-texts", label: "Gnostic Texts" }, { type: "concept", id: "women-in-early-church", label: "Women in the Early Church" }], reflectionPrompt: "What was lost when institutional Christianity decided what was 'in' and what was 'out'?", connectiveText: "The early church was wildly diverse. Women led congregations. Gnostic Christians read the Gospel of Thomas alongside Matthew. Contemplatives practiced silence as the deepest prayer. Then the institution consolidated power, and anything that didn't fit was suppressed. Some of the most beautiful traditions in Christianity were casualties." },
      { day: 7, title: "The Violence Problem", description: "Genocide commands, the flood, and what to do with texts that portray a violent God.", contentLinks: [{ type: "concept", id: "divine-violence", label: "Divine Violence in Scripture" }], reflectionPrompt: "How do you hold texts that portray God commanding violence? What framework helps?", connectiveText: "This is where honest faith gets uncomfortable. The conquest narratives. The flood. The plagues. These texts trouble honest readers. Some see them as literal history. Others as theological narrative. Others as an evolving understanding of God. All three positions are held by serious scholars. The honest move is to sit with the discomfort rather than explain it away." },
      { day: 8, title: "Paul vs. 'Paul'", description: "He only wrote 7 of the 13 letters attributed to him. The ones he didn't write are the problematic ones.", contentLinks: [{ type: "concept", id: "pauline-authorship", label: "Pauline Authorship" }], reflectionPrompt: "If the 'Paul' who silenced women wasn't actually Paul, how does that change how you read those passages?", connectiveText: "Scholars are nearly unanimous: Paul wrote Romans, 1-2 Corinthians, Galatians, Philippians, 1 Thessalonians, and Philemon. The rest were likely written by followers in his name -- a common ancient practice. This matters because the 'Paul' who said women should be silent (1 Timothy) is almost certainly not the same Paul who named women as leaders and co-workers throughout his authentic letters." },
      { day: 9, title: "What's Worth Keeping", description: "Deconstruction without reconstruction is demolition. What do you genuinely want to carry forward?", contentLinks: [{ type: "practice", id: "the-examen", label: "Practice: The Examen" }], reflectionPrompt: "What from your faith tradition do you genuinely want to keep? Not from obligation, but from love?", connectiveText: "The Well exists not to tear down but to recover. After examining what was changed, suppressed, and weaponized, the question becomes: what's real? What's genuinely from the living water? Use the Examen tonight to sift -- what brings life, and what drains it?" },
      { day: 10, title: "Back to the Well", description: "A faith that is yours -- not inherited, not imposed, chosen.", contentLinks: [{ type: "practice", id: "centering-prayer", label: "Practice: Centering Prayer" }, { type: "practice", id: "lectio-divina", label: "Practice: Lectio Divina" }], reflectionPrompt: "Write a paragraph describing where you are right now. Not where you were. Not where others want you to be. Where you actually are.", connectiveText: "You've spent 10 days doing the hardest work in faith: being honest with the source material. Whatever you've arrived at -- deeper faith, different faith, uncertain faith -- it's real. The woman at the well asked Jesus where the right place to worship was. He said the location doesn't matter. What matters is spirit and truth. That's what The Well is about." },
    ],
  },

  // ── Plan 6: The Teacher Within ─────────────────────────────────────────
  {
    id: "sp6",
    slug: "the-teacher-within",
    title: "The Teacher Within",
    subtitle: "5-day integration",
    description:
      "Connect the head knowledge to lived practice. Each day pairs a key teaching of Jesus with a contemplative practice that makes it embodied, not just intellectual.",
    totalDays: 5,
    icon: "Heart",
    color: "#ec4899",
    steps: [
      {
        day: 1,
        title: "Seeing Differently + Centering Prayer",
        description: "Metanoia in action: transform your perception through practiced silence.",
        contentLinks: [
          { type: "word", id: "sc-2", label: "Metanoia" },
          { type: "practice", id: "centering-prayer", label: "Centering Prayer" },
        ],
        reflectionPrompt: "After sitting in silence, what shifted in how you see your day?",
        connectiveText:
          "Metanoia -- expanded awareness -- isn't just an idea. It's a practice. Centering Prayer is how you actually do it. 20 minutes of consenting to presence changes the way you perceive everything after. Today, pair the teaching with the practice. Read about metanoia, then sit in silence.",
      },
      {
        day: 2,
        title: "Healing Presence + The Examen",
        description: "Sozo as wholeness: notice where you are being made whole and where you are fragmented.",
        contentLinks: [
          { type: "word", id: "sc-4", label: "Sozo" },
          { type: "practice", id: "the-examen", label: "The Examen" },
        ],
        reflectionPrompt: "Where did you experience wholeness today? Where fragmentation?",
        connectiveText:
          "Salvation -- sozo -- is about being made whole. The Examen helps you notice where wholeness is happening in your actual life and where you're fragmented. Tonight, review your day through the lens of sozo: where were you restored? Where were you scattered?",
      },
      {
        day: 3,
        title: "The Kingdom Now + Havruta",
        description: "Basileia as present reality: discover it in conversation with another person.",
        contentLinks: [
          { type: "word", id: "sc-3", label: "Basileia" },
          { type: "practice", id: "havruta", label: "Havruta" },
        ],
        reflectionPrompt: "What emerged in conversation that wouldn't have emerged alone?",
        connectiveText:
          "Jesus said the kingdom is 'among you' -- in the space between people. Havruta, the Jewish practice of paired study, creates that space. Find someone. Read a short passage together. Disagree. Push back. Listen. The kingdom shows up in the friction as much as the harmony.",
      },
      {
        day: 4,
        title: "Embodied Compassion + Walking Prayer",
        description: "Jesus walked everywhere. His teachings happened on the road. Get moving.",
        contentLinks: [
          { type: "chapter", id: "what-he-did", label: "What Jesus Did" },
          { type: "practice", id: "walking-prayer", label: "Walking Prayer" },
        ],
        reflectionPrompt: "What did you notice when you walked slowly and attentively?",
        connectiveText:
          "Jesus's ministry happened on roads, not in buildings. His most important conversations happened while walking. Today, take what you've been learning about the historical Jesus and walk with it. Literally. Slow walking prayer -- not thinking about Jesus, but walking the way he walked. Present. Attentive. Available.",
      },
      {
        day: 5,
        title: "Your Rule of Life",
        description: "Bring it all together. What's your rhythm going forward?",
        contentLinks: [
          { type: "practice", id: "rule-of-life", label: "Rule of Life" },
          { type: "chapter", id: "the-teacher", label: "The Teacher" },
        ],
        reflectionPrompt: "What rhythm of practice and study will keep you connected to the living water?",
        connectiveText:
          "The point was never to accumulate knowledge. It was to drink from the well. A Rule of Life is your personal rhythm for staying connected -- which practices, how often, with whom. Design yours today. Not as obligation but as desire. The living water is available. Your job is to keep showing up.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getStudyPlanBySlug(slug: string): StudyPlan | undefined {
  return studyPlans.find((p) => p.slug === slug);
}
