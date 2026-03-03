// Practices data for The Well
// 12 contemplative practices in 4 categories, each with step-by-step instructions
// Editorial voice: direct, scholarly but accessible, like a smart friend who has actually done these

export interface PracticeStep {
  readonly order: number;
  readonly title: string;
  readonly instruction: string;
  readonly duration?: string;
  readonly note?: string;
}

export interface PracticeVariation {
  readonly name: string;
  readonly description: string;
}

export interface Practice {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly tradition: string;
  readonly subtitle: string;
  readonly origin: string;
  readonly purpose: string;
  readonly icon: string;
  readonly color: string;
  readonly category: "scripture" | "silence" | "embodied" | "relational";
  readonly difficulty: "beginner" | "intermediate" | "advanced";
  readonly estimatedMinutes: number;
  readonly frequency: "daily" | "weekly" | "as-needed" | "seasonal";
  readonly tags: readonly string[];
  readonly relatedConceptSlugs: readonly string[];
  readonly relatedWordIds: readonly string[];
  readonly steps: readonly PracticeStep[];
  readonly variations: readonly PracticeVariation[];
  readonly commonMistakes: readonly string[];
  readonly goDeeper: string;
}

// ---------------------------------------------------------------------------
// Scripture practices
// ---------------------------------------------------------------------------

const lectioDivina: Practice = {
  id: "lectio-divina",
  slug: "lectio-divina",
  title: "Lectio Divina",
  tradition: "Benedictine",
  subtitle: "Sacred reading through four movements",
  origin: "6th century, formalized by Benedict of Nursia and later Guigo II",
  purpose: "To encounter a text not as information to extract but as presence to receive. The goal is not to finish the passage but to let one phrase find you.",
  icon: "BookOpen",
  color: "#2D6A4F",
  category: "scripture",
  difficulty: "beginner",
  estimatedMinutes: 20,
  frequency: "daily",
  tags: ["reading", "scripture", "contemplation", "benedictine", "prayer"],
  relatedConceptSlugs: ["lectio-divina"],
  relatedWordIds: [],
  steps: [
    {
      order: 1,
      title: "Settle (Silencio)",
      instruction: "Sit comfortably. Take three slow breaths. Let your body release whatever you were doing before. You are not here to accomplish anything. You are here to listen.",
      duration: "2 minutes",
    },
    {
      order: 2,
      title: "Read (Lectio)",
      instruction: "Read a short passage slowly -- ten to twenty verses at most, often less. Read aloud if you can. As you read, notice if any word or phrase catches your attention, however slightly. Do not chase it. Just notice.",
      duration: "3 minutes",
      note: "Do not try to understand the whole passage. One phrase finding you is enough.",
    },
    {
      order: 3,
      title: "Reflect (Meditatio)",
      instruction: "Read the passage again. This time, rest on the word or phrase that caught your attention. Repeat it quietly to yourself. Let it roll around in your mind without forcing analysis. What images, memories, or feelings arise? You are not interpreting the text -- you are sitting with it.",
      duration: "5 minutes",
    },
    {
      order: 4,
      title: "Respond (Oratio)",
      instruction: "Speak naturally from whatever arose in you. This is not a formal prayer. It is a direct, honest response to what you heard. If you felt nothing, say that. If you felt something you cannot name, stay with the wordlessness. No performance needed.",
      duration: "5 minutes",
    },
    {
      order: 5,
      title: "Rest (Contemplatio)",
      instruction: "Release even the phrase you have been holding. Let go of thinking about the text. Simply be present. If thoughts come, do not fight them -- return your attention gently to stillness. This is not about achieving a blank mind. It is about consenting to rest.",
      duration: "5 minutes",
    },
    {
      order: 6,
      title: "Close",
      instruction: "When ready, open your eyes slowly. Before you move, name one thing -- an image, a feeling, a question -- that stayed with you. Write it in a journal if you keep one. Then go.",
      duration: "1 minute",
    },
  ],
  variations: [
    {
      name: "Group Lectio",
      description: "Three people read the same passage aloud in sequence, pausing between readings. After the third reading, each person shares the word that caught them -- no interpretation, no commentary. The differences in what each person heard become the discussion.",
    },
    {
      name: "Visual Lectio",
      description: "Use a painting, photograph, or piece of art instead of a text. Move through the same four stages: look, sit with what catches you, respond, rest. Particularly useful for people who find words too analytical a starting point.",
    },
    {
      name: "Abbreviated Practice",
      description: "When you have only five minutes, read a single verse three times with a breath between each reading. Notice one word. Sit with it for two minutes. That is enough.",
    },
  ],
  commonMistakes: [
    "Trying to extract a lesson or application. Lectio is not Bible study. You are not looking for something to do with the text. The point is what the text does with you.",
    "Reading too much. Beginners often select long chapters. Start with three to six verses. Length works against you here.",
    "Forcing the contemplatio stage. Some sessions will feel dry or distracted. That is not failure. Showing up with dry wood is still showing up.",
  ],
  goDeeper: "The classic text is Guigo II's 'Ladder of Monks' (12th century), a short letter that describes the four stages with unusual clarity. Thomas Merton's 'Opening the Bible' provides a modern framework. If you want to understand why this practice differs structurally from Bible study, read Eugene Peterson's 'Eat This Book' -- he argues compellingly that the modern evangelical approach to scripture is shaped more by Enlightenment reading habits than by anything ancient.",
};

const ignatianContemplation: Practice = {
  id: "ignatian-contemplation",
  slug: "ignatian-contemplation",
  title: "Ignatian Gospel Contemplation",
  tradition: "Jesuit / Ignatian",
  subtitle: "Enter a Gospel scene with all five senses",
  origin: "Developed by Ignatius of Loyola in 'Spiritual Exercises' (1548)",
  purpose: "To encounter the Gospel not as doctrine about Jesus but as a scene you are actually present in. The imagination becomes a vehicle for encounter rather than a distraction from it.",
  icon: "Eye",
  color: "#40916C",
  category: "scripture",
  difficulty: "intermediate",
  estimatedMinutes: 30,
  frequency: "daily",
  tags: ["ignatian", "imagination", "gospel", "jesus", "contemplation"],
  relatedConceptSlugs: ["the-examen"],
  relatedWordIds: [],
  steps: [
    {
      order: 1,
      title: "Choose your scene",
      instruction: "Select a specific Gospel narrative -- not a teaching but an event. The feeding of the five thousand. Jesus healing the man by the pool. The road to Emmaus. The scene should have people, a setting, dialogue. Keep the text in front of you.",
      duration: "1 minute",
    },
    {
      order: 2,
      title: "Read and prepare",
      instruction: "Read the passage twice, slowly. Do not analyze it. You are getting oriented to the landscape. Note who is there, where they are, what time of day it might be.",
      duration: "3 minutes",
    },
    {
      order: 3,
      title: "Construct the scene",
      instruction: "Close your eyes. Place yourself in the scene physically. Where are you standing? What does the ground feel like under your feet? What do you smell -- dust, water, fish, sweat, bread? What is the quality of the light? Build it slowly. Do not rush to the action.",
      duration: "5 minutes",
      note: "If your imagination resists, start with just one sense -- sound. What do you hear?",
    },
    {
      order: 4,
      title: "Watch the scene unfold",
      instruction: "Let the scene happen. Watch Jesus move, speak, respond. Observe the other people -- their faces, their postures, how they react. You do not need to direct what happens. You are a witness first. Notice what surprises you.",
      duration: "10 minutes",
    },
    {
      order: 5,
      title: "Enter the scene",
      instruction: "If it feels right, step closer. You can interact. You can speak to Jesus or to the people around him. Notice how he responds to you specifically. What do you need from him in this moment? What do you want to ask?",
      duration: "7 minutes",
    },
    {
      order: 6,
      title: "Colloquy and close",
      instruction: "Ignatius called the closing a 'colloquy' -- an informal conversation. Speak honestly to Jesus about what you experienced. What moved you? What confused you? What do you want? Then sit in silence for a moment before returning.",
      duration: "4 minutes",
    },
  ],
  variations: [
    {
      name: "From a character's perspective",
      description: "Instead of being a neutral observer, choose one character in the scene and inhabit them. Become the woman who lost the coin. Become the prodigal's older brother. What do you see from inside their experience?",
    },
    {
      name: "Return visits",
      description: "Spend multiple sessions in the same scene. Ignatius encouraged this. Each visit, your attention may land somewhere different. What you ignored on day one may become the whole scene on day five.",
    },
    {
      name: "Contemporary transposition",
      description: "After completing the historical scene, ask where this scene is happening today, right now, in your city. Who are the characters? Where would Jesus be standing? This is the bridge from contemplation to engagement.",
    },
  ],
  commonMistakes: [
    "Treating it like a visualization exercise. You are not constructing a mental movie for entertainment. You are creating conditions for encounter. The distinction is in your posture: curiosity and openness, not performance.",
    "Abandoning the practice when the imagination goes dry. Dryness in contemplative prayer is normal and often meaningful. Stay in the scene even if it feels flat. Describe out loud what you see, however ordinary.",
    "Skipping scenes that make you uncomfortable. The Last Supper the night of the betrayal. The disciples scattering at the arrest. These scenes carry material you may need.",
  ],
  goDeeper: "The Spiritual Exercises of Ignatius is a structured 30-day retreat, not a book to read in an armchair -- but the annotations and instructions contain Ignatius's full theory of imaginative prayer. David Fleming's 'Draw Me Into Your Friendship' is a readable contemporary translation. For the psychological dynamics at work, see William Barry's 'God and You: Prayer as a Personal Relationship.'",
};

const havruta: Practice = {
  id: "havruta",
  slug: "havruta",
  title: "Havruta",
  tradition: "Rabbinic Judaism",
  subtitle: "Two people arguing over a text together",
  origin: "Ancient rabbinic tradition, institutionalized in the yeshiva system",
  purpose: "To discover that a text is not a container of pre-packaged meaning but a partner in an ongoing argument. The argument is not a sign that something is wrong. The argument is the point.",
  icon: "Users",
  color: "#B68D40",
  category: "scripture",
  difficulty: "intermediate",
  estimatedMinutes: 45,
  frequency: "weekly",
  tags: ["jewish", "study", "dialogue", "torah", "community"],
  relatedConceptSlugs: ["rabbinic-judaism"],
  relatedWordIds: [],
  steps: [
    {
      order: 1,
      title: "Choose your partner",
      instruction: "Havruta works with exactly two people. Not three -- two. The partner should be someone who will push back. The goal is not agreement. Avoid someone who simply affirms everything you say.",
      duration: "Before the session",
    },
    {
      order: 2,
      title: "Select a short text",
      instruction: "Choose a passage short enough to hold in your heads -- ten to twenty verses, a psalm, a short parable, a rabbinic story. Both read the text silently before beginning.",
      duration: "3 minutes",
    },
    {
      order: 3,
      title: "Read aloud together",
      instruction: "One person reads the text aloud while the other listens without looking at their copy. Then reverse. Reading aloud forces you to hear the text differently than silent reading does.",
      duration: "5 minutes",
    },
    {
      order: 4,
      title: "Surface questions, not answers",
      instruction: "Each person identifies two to three genuine questions the text raises. Not rhetorical questions -- actual puzzlements. Why did the author say it this way? What is strange here? What is missing? What contradicts something else you know? Do not answer the questions yet. Just list them.",
      duration: "5 minutes",
    },
    {
      order: 5,
      title: "Argue",
      instruction: "Take one question and begin working it. The rule is simple: you must engage with what your partner said before you add your own thought. No talking past each other. If you disagree, say specifically why. 'I see it differently because...' is better than 'I think...'. The disagreement deepens both readings.",
      duration: "25 minutes",
    },
    {
      order: 6,
      title: "Close with what you cannot resolve",
      instruction: "In the last five minutes, name what you could not resolve. The unresolved question is not a failure. In rabbinic tradition, teku (the Aramaic word for 'it stands unanswered') marks some of the most important questions. The Talmud preserves disagreements precisely because the arguing is the point.",
      duration: "7 minutes",
    },
  ],
  variations: [
    {
      name: "Text against text",
      description: "Bring two texts that seem to contradict each other. Make them argue with each other, then argue about which one is right, or whether they are asking different questions entirely.",
    },
    {
      name: "Cross-tradition Havruta",
      description: "Use the structure with texts from different traditions -- a psalm and a Sufi poem, a parable and a Stoic maxim. The method works because the arguing is the method, not the content.",
    },
    {
      name: "Written Havruta",
      description: "Pass a journal back and forth over a week, each person responding to what the other wrote. Slower, but useful when you cannot be in the same room and want to avoid the speed of conversation.",
    },
  ],
  commonMistakes: [
    "Treating it as polite discussion. Havruta is supposed to have friction. If both people are nodding throughout, something is wrong. Find the place where you actually disagree and stay there.",
    "Choosing an affirmation partner. The method requires someone who will challenge you. A study partner who only agrees with your readings will not produce new thinking.",
    "Moving on too quickly. The pressure to cover ground is the enemy of depth. One question worked through thoroughly is worth more than ten questions skimmed.",
  ],
  goDeeper: "Elie Wiesel's 'The Gates of the Forest' shows havruta in narrative form. For the pedagogical theory, see Elie Holzer and Orit Kent's 'A Philosophy of Havruta.' The Talmud itself is structured havruta -- two rabbis disagreeing, with no final referee. Read even a single page of the Talmud in translation (Koren or Steinsaltz editions include the original layout) to see what preserved argument looks like.",
};

// ---------------------------------------------------------------------------
// Silence & Awareness practices
// ---------------------------------------------------------------------------

const centeringPrayer: Practice = {
  id: "centering-prayer",
  slug: "centering-prayer",
  title: "Centering Prayer",
  tradition: "Christian Contemplative",
  subtitle: "Return to a sacred word whenever thoughts arise",
  origin: "Rooted in 'The Cloud of Unknowing' (14th century), systematized by Thomas Keating and Basil Pennington in the 1970s",
  purpose: "To consent to the presence and action of God beyond words and concepts. The sacred word is not a mantra or a focusing tool -- it is an expression of intent to release everything that is not God.",
  icon: "Compass",
  color: "#2D6A4F",
  category: "silence",
  difficulty: "beginner",
  estimatedMinutes: 20,
  frequency: "daily",
  tags: ["contemplative", "silence", "prayer", "christian", "thomas-keating"],
  relatedConceptSlugs: ["centering-prayer", "cloud-of-unknowing"],
  relatedWordIds: [],
  steps: [
    {
      order: 1,
      title: "Choose a sacred word",
      instruction: "Before your first session, choose a short word that symbolizes your intention to consent to God's presence and action. Traditional choices: God, Jesus, Abba, Love, Peace, Mercy, Amen. Choose it once and do not change it during a session. Changing words mid-session is a form of thinking, not resting.",
      duration: "Before starting",
      note: "The word is not meant to produce a feeling. It is an expression of willingness.",
    },
    {
      order: 2,
      title: "Settle into silence",
      instruction: "Sit comfortably with your back relatively straight -- not rigid, not slumped. Close your eyes. Take a slow breath. Introduce your sacred word gently, as if laying it down rather than speaking it.",
      duration: "1 minute",
    },
    {
      order: 3,
      title: "Sit",
      instruction: "Rest in the silence. When you notice you have engaged with a thought -- any thought, including spiritual thoughts, insights, plans, memories -- return gently to your sacred word. Do not evaluate the thought. Do not chase it. Do not reject it harshly. Simply return.",
      duration: "20 minutes",
      note: "Thoughts are not the enemy of this practice. Engaging with them is. There is a difference.",
    },
    {
      order: 4,
      title: "Remain in silence after the timer",
      instruction: "When your timer sounds, do not open your eyes immediately. Remain in silence for two to three minutes. This transition period allows you to integrate the prayer before re-entering ordinary consciousness. Thomas Keating recommends the Lord's Prayer as a closing, but anything that gently returns you works.",
      duration: "2 to 3 minutes",
    },
  ],
  variations: [
    {
      name: "Shorter sitting",
      description: "Keating recommended two 20-minute sessions per day, but 10 minutes once daily is enough to begin. The method is more important than the duration.",
    },
    {
      name: "Lectio bridge",
      description: "Use 10 minutes of Lectio Divina before Centering Prayer, moving from the word that caught you into silence. The phrase from lectio can serve as your sacred word for that session.",
    },
    {
      name: "Group centering",
      description: "Sit together in silence for the full period. One person starts and ends the timer. The group format provides a kind of accountability that solo sitting lacks, and many people find the shared silence easier to sustain.",
    },
  ],
  commonMistakes: [
    "Evaluating the quality of the session. 'That was a good sit' and 'that was terrible' are both thoughts. The practice is below the level of evaluation.",
    "Fighting thoughts. You will have hundreds of thoughts. The instruction to 'return gently' means without self-criticism. If you notice you have been planning dinner for the last ten minutes, just return. That is the whole instruction.",
    "Expecting to feel something. Keating consistently said that consolation is not the goal and its absence does not mean the prayer is not working. The transformation happens at a level below feeling.",
  ],
  goDeeper: "Thomas Keating's 'Open Mind, Open Heart' is the foundational text and is readable in an afternoon. Cynthia Bourgeault's 'Centering Prayer and Inner Awakening' goes deeper into the psychological dynamics. For the original source, read 'The Cloud of Unknowing' in Clifton Wolters's Penguin Classics translation -- it is shorter and stranger than you expect.",
};

const theExamen: Practice = {
  id: "the-examen",
  slug: "the-examen",
  title: "The Examen",
  tradition: "Ignatian",
  subtitle: "Review your day for consolation and desolation",
  origin: "Ignatius of Loyola, 'Spiritual Exercises' (1548). Originally called 'Examination of Conscience' but Ignatius's actual practice focused on feelings, not transgressions.",
  purpose: "To develop awareness of where you felt most alive and most drained during the day, treating your inner movements as data about what matters to you and what the Spirit may be doing in your life.",
  icon: "Heart",
  color: "#40916C",
  category: "silence",
  difficulty: "beginner",
  estimatedMinutes: 15,
  frequency: "daily",
  tags: ["ignatian", "review", "consolation", "desolation", "awareness", "daily"],
  relatedConceptSlugs: ["the-examen"],
  relatedWordIds: [],
  steps: [
    {
      order: 1,
      title: "Become aware of gratitude",
      instruction: "Recall one specific thing from today that you are genuinely grateful for. Not a general blessing -- something actual that happened. A conversation, a moment of quiet, food that was good, a task completed. Sit with it briefly.",
      duration: "2 minutes",
    },
    {
      order: 2,
      title: "Review the day",
      instruction: "Play back the day slowly, hour by hour. You are not judging yourself. You are observing. Where did you feel most alive -- energized, engaged, connected, yourself? Where did you feel most drained -- depleted, numb, irritable, far from yourself? These are the two movements Ignatius called consolation and desolation.",
      duration: "6 minutes",
      note: "Consolation does not always mean pleasant. It can be a hard conversation that left you feeling right. Desolation does not always mean bad events -- it can be comfortable circumstances that left you feeling hollow.",
    },
    {
      order: 3,
      title: "Linger on one moment",
      instruction: "Choose one moment of consolation and one of desolation. Sit with each for thirty seconds to a minute. Do not analyze. Just notice. What was different about those moments compared to the hours on either side of them?",
      duration: "3 minutes",
    },
    {
      order: 4,
      title: "Look forward",
      instruction: "What do you need for tomorrow? Not what you must accomplish -- what do you need? Name it honestly: rest, courage, patience, connection, solitude, clarity. Then ask for it, in whatever form prayer takes for you.",
      duration: "3 minutes",
    },
    {
      order: 5,
      title: "Close",
      instruction: "End with a simple act of release. Let the day go. It is done.",
      duration: "1 minute",
    },
  ],
  variations: [
    {
      name: "Written Examen",
      description: "Keep a journal. Write three to five sentences each night: what gave you life today, what drained it, what you want to carry into tomorrow. Over weeks, you will begin to see patterns that surprise you.",
    },
    {
      name: "Midday Examen",
      description: "A five-minute version done at lunch: one moment of consolation from the morning, one of desolation, one intention for the afternoon. Shorter and less thorough, but easier to sustain.",
    },
    {
      name: "Weekly review",
      description: "Once a week, look at your daily notes and ask what patterns have emerged across seven days. Where does consolation cluster? Around certain people, times, activities? Same for desolation. This is where the real self-knowledge accumulates.",
    },
  ],
  commonMistakes: [
    "Treating it as confession or self-criticism. The Examen is not about what you did wrong. Ignatius was emphatic that it is about noticing inner movements, not cataloguing moral failures.",
    "Being too general. 'I felt good' tells you nothing. 'I felt most alive during the twenty minutes I spent drawing' tells you something important.",
    "Skipping it when the day was bad. Those are the most important nights. The days you least want to review are the days most worth examining.",
  ],
  goDeeper: "Timothy Gallagher's 'The Examen Prayer' is the best modern guide and explains Ignatius's own practice in detail, which was different from later versions that emphasized sin. For the broader framework of consolation and desolation, read Ignatius's 'Spiritual Exercises,' Annotations 313-336. Jim Manney's 'A Simple Life-Changing Prayer' is shorter and more practical.",
};

const hesychasm: Practice = {
  id: "hesychasm",
  slug: "hesychasm",
  title: "Hesychasm",
  tradition: "Eastern Orthodox",
  subtitle: "Inner stillness through breath and the Jesus Prayer",
  origin: "4th century Desert Fathers in Egypt, codified in the Philokalia (18th century compilation of texts from 4th-15th centuries)",
  purpose: "Hesychia means stillness or silence. The practice aims at a state of interior quiet that allows for unceasing prayer -- not endless speaking to God, but a quality of continuous attentiveness beneath ordinary consciousness.",
  icon: "Flame",
  color: "#B68D40",
  category: "silence",
  difficulty: "advanced",
  estimatedMinutes: 20,
  frequency: "daily",
  tags: ["orthodox", "hesychasm", "jesus-prayer", "breath", "stillness", "desert-fathers"],
  relatedConceptSlugs: ["jesus-prayer"],
  relatedWordIds: [],
  steps: [
    {
      order: 1,
      title: "Prepare the body",
      instruction: "The hesychast tradition paid unusual attention to posture. Sit with your chin slightly lowered, gaze directed toward your heart (not literally -- a gesture of directing inner attention downward). Breathe slowly. The physical posture is not incidental; it is meant to locate your attention in the body rather than in the head.",
      duration: "2 minutes",
    },
    {
      order: 2,
      title: "Learn the Jesus Prayer",
      instruction: "The prayer is: 'Lord Jesus Christ, Son of God, have mercy on me, a sinner.' In Greek: 'Kyrie Iesou Christe, Huie tou Theou, eleison me, ton hamartolon.' You do not have to use all of it. Many practitioners use only 'Lord Jesus Christ, have mercy on me.' Find the form that feels honest to you.",
      duration: "Learn before practicing",
      note: "The word 'sinner' (hamartolon) carries the original Greek sense of one who misses the mark -- not a moral criminal but someone who is not yet what they could be. This matters for how you hold the phrase.",
    },
    {
      order: 3,
      title: "Coordinate with breath",
      instruction: "Inhale as you pray 'Lord Jesus Christ, Son of God.' Exhale as you pray 'have mercy on me, a sinner.' Do this with awareness but without forcing rhythm. Over time, if you practice consistently, the prayer begins to synchronize with the breath without deliberate effort.",
      duration: "15 minutes",
    },
    {
      order: 4,
      title: "When thoughts come",
      instruction: "The hesychast teachers described thoughts as 'logismoi' -- small movements of the mind toward distraction, pride, desire, fear. The instruction is not to engage with them but to acknowledge and return. Some teachers recommended naming the thought ('this is anger') before returning. Others simply said: return.",
      duration: "Throughout",
    },
    {
      order: 5,
      title: "Close",
      instruction: "End with three slow breaths. Return to ordinary awareness gradually. The tradition holds that the transition back to activity is as important as the sitting.",
      duration: "2 minutes",
    },
  ],
  variations: [
    {
      name: "Walking hesychasm",
      description: "Coordinate the prayer with footsteps rather than breath. Inhale on two steps, exhale on two steps, prayer coordinated throughout. Useful for people who find sitting still difficult.",
    },
    {
      name: "Abbreviated Jesus Prayer",
      description: "Many beginners start with only 'Lord have mercy' (Kyrie eleison), which is the oldest form. Three words, simple, honest. Work with this until it begins to settle before adding more.",
    },
    {
      name: "Night prayer",
      description: "The hesychast tradition was practiced partly at night. If you wake at 2 or 3 a.m. and cannot sleep, this practice was specifically designed for that in-between state of consciousness.",
    },
  ],
  commonMistakes: [
    "Forcing the breath coordination. The synchronization should emerge gradually. Trying to control the breath too tightly creates physical tension that undermines the stillness you are after.",
    "Treating 'sinner' as self-flagellation. The prayer is not an expression of shame but of accurate self-knowledge and genuine desire for grace. Hold it as honest, not punishing.",
    "Expecting the prayer to feel like meditation. Hesychasm is not secular mindfulness. The content of the prayer matters to the tradition -- it is addressed to a specific person, not to empty space.",
  ],
  goDeeper: "The Philokalia (4 volumes, Palmer/Sherrard/Ware translation) is the primary source and is available in full, though dense. Start with the texts by Evagrius Ponticus and John Climacus. 'The Way of a Pilgrim' (anonymous, 19th century Russian) is a readable narrative of a layperson learning the Jesus Prayer. Kallistos Ware's introduction to the Philokalia is the best modern overview of the tradition.",
};

// ---------------------------------------------------------------------------
// Embodied practices
// ---------------------------------------------------------------------------

const walkingPrayer: Practice = {
  id: "walking-prayer",
  slug: "walking-prayer",
  title: "Walking Prayer",
  tradition: "Cross-tradition",
  subtitle: "Slow, intentional movement as prayer",
  origin: "Found across traditions: Christian pilgrimage, Buddhist kinhin, Jewish walking meditation, labyrinth traditions in medieval Christendom",
  purpose: "To discover that prayer is not a cognitive activity that happens in spite of the body but something the body can perform. Walking slows the mind naturally. Used in every major contemplative tradition.",
  icon: "MapPin",
  color: "#2D6A4F",
  category: "embodied",
  difficulty: "beginner",
  estimatedMinutes: 15,
  frequency: "as-needed",
  tags: ["walking", "body", "movement", "labyrinth", "kinhin", "pilgrimage"],
  relatedConceptSlugs: [],
  relatedWordIds: [],
  steps: [
    {
      order: 1,
      title: "Choose your path",
      instruction: "A labyrinth if you have access to one. A quiet hallway, a backyard, a park path, a short loop around the block. The path should be simple enough that you do not have to think about navigation. This is not a hike. The distance is irrelevant.",
      duration: "Before starting",
    },
    {
      order: 2,
      title: "Set your pace",
      instruction: "Walk at one-quarter of your normal pace. This feels absurdly slow at first. That is correct. The slowness is the practice. If you are walking normally, you are not doing walking prayer -- you are just walking.",
      duration: "First few minutes",
    },
    {
      order: 3,
      title: "Ground in sensation",
      instruction: "Bring your full attention to the physical experience of walking. Feel the heel contact the ground, then the arch, then the ball of the foot. Feel the shift of weight. Notice the movement of your arms, the air on your skin, the sound of each step. Do not add commentary. Just feel.",
      duration: "5 minutes",
    },
    {
      order: 4,
      title: "Add a phrase (optional)",
      instruction: "If you want to include a verbal element, coordinate a simple phrase with your breath: one word on the in-breath, one on the out-breath. 'Open/receive.' 'Here/now.' 'Lord/mercy.' Or use no words at all. Both are valid.",
      duration: "Throughout",
      note: "If words become mechanical, drop them. Sensation is the primary anchor.",
    },
    {
      order: 5,
      title: "Return to sensation when thoughts arise",
      instruction: "When you realize you have drifted into planning or problem-solving, return to the physical sensation of the next step. Not with frustration -- with the same gentle return you would use in sitting meditation.",
      duration: "Throughout",
    },
    {
      order: 6,
      title: "Close",
      instruction: "Stop. Stand still for thirty seconds. Notice what is different in your body and your mind compared to when you began. Then walk at normal pace back to where you started.",
      duration: "1 minute",
    },
  ],
  variations: [
    {
      name: "Labyrinth walking",
      description: "A labyrinth has a single path in and the same path back out. It is not a maze -- there is no wrong turn. Walk slowly in. At the center, stop and remain for a few minutes. Then walk out. The structure does something to the experience that open walking does not.",
    },
    {
      name: "Outdoor nature walking",
      description: "Walk outdoors with the specific instruction to notice one thing you have never noticed before in a familiar place. A roofline, a tree, a crack in the sidewalk. The instruction to see differently restructures your attention.",
    },
    {
      name: "Kinhin (Buddhist walking)",
      description: "Walk in a circle with hands in shashu (right hand in a fist, left hand wrapped around it, held at chest height). Steps are exactly one breath long. Used between periods of sitting meditation. The formality of the hands changes the quality of attention.",
    },
  ],
  commonMistakes: [
    "Walking at normal pace. The pace is the whole practice. If you are moving at your ordinary stride, you are not practicing walking prayer -- you are taking a walk.",
    "Treating it as productive. Walking prayer that solves your problem at work has failed. You are not supposed to emerge with answers. You emerge with a quieter mind.",
    "Requiring a special location. This works in a hospital hallway, a small apartment, a parking lot. The location is almost irrelevant.",
  ],
  goDeeper: "Thich Nhat Hanh's 'The Long Road Turns to Joy' is the best short guide to walking meditation. For the Christian tradition, Lauren Artress's 'Walking a Sacred Path' covers labyrinth practice. Philip Sheldrake's 'Living Between Worlds' covers pilgrimage theology more broadly.",
};

const breathPrayer: Practice = {
  id: "breath-prayer",
  slug: "breath-prayer",
  title: "Breath Prayer",
  tradition: "Desert / Christian Contemplative",
  subtitle: "A six-to-eight word prayer anchored to your breathing",
  origin: "Desert tradition, 4th century. Related to the Jesus Prayer tradition. Popularized in evangelical contexts by Ron DelBene in the 1970s.",
  purpose: "To create an anchor prayer short enough to pray in a single breath, so that prayer becomes less an activity you do and more a rhythm you return to throughout the day.",
  icon: "Flame",
  color: "#40916C",
  category: "embodied",
  difficulty: "beginner",
  estimatedMinutes: 5,
  frequency: "daily",
  tags: ["breath", "prayer", "short", "desert", "daily", "rhythm"],
  relatedConceptSlugs: [],
  relatedWordIds: [],
  steps: [
    {
      order: 1,
      title: "Find your prayer",
      instruction: "Sit quietly. Ask yourself two questions: What name or image of God feels most true to you right now? What do you most need? From the answers, construct a short phrase. Classic form: an address to God on the inhale, a request on the exhale. 'Lord Jesus Christ / have mercy on me.' 'Gracious God / give me courage.' 'Spirit / let me rest.' Your phrase should be honest, not aspirational.",
      duration: "5 minutes the first time",
      note: "You can use the same prayer for weeks or months. When it no longer feels honest, find a new one.",
    },
    {
      order: 2,
      title: "Breathe in",
      instruction: "Inhale slowly through your nose, saying the first half of your prayer inwardly: 'Lord Jesus Christ.' Three to four counts.",
      duration: "4 counts",
    },
    {
      order: 3,
      title: "Breathe out",
      instruction: "Exhale through your mouth, saying the second half: 'have mercy on me.' Let the breath carry the words without forcing either the prayer or the air.",
      duration: "4 to 6 counts",
    },
    {
      order: 4,
      title: "Repeat",
      instruction: "Continue for five minutes. When thoughts arise -- and they will -- acknowledge them and return to the next breath. The breath is the anchor. The prayer follows the breath, not the other way around.",
      duration: "5 minutes",
    },
    {
      order: 5,
      title: "Carry it into the day",
      instruction: "The real practice happens outside the five-minute session. Set a reminder to pause at regular intervals -- at traffic lights, between meetings, before meals -- and breathe your prayer once. Over time, it begins to arise on its own.",
      duration: "Throughout the day",
    },
  ],
  variations: [
    {
      name: "Single-word breath prayer",
      description: "Some traditions use a single word: 'Maranatha' (Aramaic: Come, Lord), 'Abba,' 'Peace,' 'Jesus.' Inhale silence, exhale the word. Simpler and often more direct.",
    },
    {
      name: "Scripture-anchored",
      description: "Use a half-verse as your prayer. 'Be still' on the inhale, 'and know that I am God' on the exhale (Psalm 46:10). 'My grace' on the inhale, 'is sufficient for you' on the exhale (2 Corinthians 12:9).",
    },
    {
      name: "Extended session",
      description: "For a longer prayer period, do twenty minutes of breath prayer as a foundation, then move into fifteen minutes of silence. The prayer becomes the transition into wordlessness.",
    },
  ],
  commonMistakes: [
    "Constructing a prayer that expresses who you want to be rather than who you are. 'Let me be generous' when you are feeling angry and resentful is not honest. Find the prayer that names what is actually true: 'I am angry. Be near.'",
    "Controlling the breath. The breath should deepen naturally as you settle. If you are working to breathe, back off and let the rhythm find itself.",
    "Treating the five-minute session as the whole practice. The practice is meant to distribute prayer throughout the day. The formal sitting is just where you learn the pattern.",
  ],
  goDeeper: "Ron DelBene and Mary Montgomery's 'The Breath of Life' (out of print but findable) is the guide that introduced many Western Christians to this practice. For the deeper tradition, see the Desert Fathers section of Benedicta Ward's 'The Sayings of the Desert Fathers.' Thomas Keating's explanation of the Jesus Prayer in 'Invitation to Love' is worth reading alongside.",
};

const fastingAsAwareness: Practice = {
  id: "fasting-as-awareness",
  slug: "fasting-as-awareness",
  title: "Fasting as Awareness",
  tradition: "Cross-tradition",
  subtitle: "Not punishment but attention",
  origin: "Found in Jewish, Christian, Islamic, and Buddhist traditions. The specific framing as attention practice rather than penance draws from Walter Brueggemann and Richard Foster.",
  purpose: "Fasting strips away the noise of constant consumption. When you stop filling every empty moment with food (or media, or stimulation), you discover what you were using it to avoid. That discovery is the practice.",
  icon: "Eye",
  color: "#B68D40",
  category: "embodied",
  difficulty: "intermediate",
  estimatedMinutes: 0,
  frequency: "seasonal",
  tags: ["fasting", "body", "awareness", "self-knowledge", "abstinence"],
  relatedConceptSlugs: [],
  relatedWordIds: [],
  steps: [
    {
      order: 1,
      title: "Clarify your intention",
      instruction: "Before you begin, name what you are fasting for -- not as a magic formula but as a grounding. 'I am fasting to pay attention to my dependence on comfort.' 'I am fasting in solidarity with people who do not have food by choice.' 'I am fasting to create silence.' Vague fasting tends to collapse into willpower or guilt.",
      duration: "Before starting",
      note: "Medical conditions, history of disordered eating, certain medications -- any of these warrant talking to a doctor before a food fast. The awareness practice also works with fasting from media, alcohol, or other habitual consumptions.",
    },
    {
      order: 2,
      title: "Choose your fast",
      instruction: "Options: a single meal skipped, a full day from sunrise to sunset (Jewish/Islamic model), a partial fast (water and juice only), a media fast, an alcohol fast, a social media fast. Start smaller than you think you should. A one-meal fast done with awareness is more useful than a three-day fast done with pride.",
      duration: "Before starting",
    },
    {
      order: 3,
      title: "Notice the moments of craving",
      instruction: "When hunger or the urge to reach for what you are abstaining from arises, pause before you respond. Sit with the discomfort for thirty seconds. What is underneath it? Boredom? Anxiety? Loneliness? Habit? Name what you find. Write it down if you can.",
      duration: "Throughout the fast",
    },
    {
      order: 4,
      title: "Direct the energy",
      instruction: "Fasting traditions consistently link fasting with prayer and with generosity. The energy and attention you would have given to eating (or scrolling, or drinking) gets redirected. Pray during the moments you would have eaten. Give money equivalent to what you would have spent. The redirection is not optional -- without it, fasting is just dieting.",
      duration: "Throughout the fast",
    },
    {
      order: 5,
      title: "Break the fast intentionally",
      instruction: "Do not end the fast absently, at a drive-through between meetings. Prepare a simple meal. Eat slowly. Notice your relationship to the first bite. The ending of the fast is as much part of the practice as the fast itself.",
      duration: "When closing",
    },
    {
      order: 6,
      title: "Write what you learned",
      instruction: "After the fast, write three to five sentences: what you noticed, what surprised you, what you want to remember. Without reflection, fasting is just discomfort.",
      duration: "After the fast",
    },
  ],
  variations: [
    {
      name: "Media fast",
      description: "A 24-hour fast from all screens and media. No social media, no news, no streaming, no podcasts. Cook, walk, read print, talk to people. What you reach for in the silence tells you something.",
    },
    {
      name: "Lenten practice",
      description: "40 days of fasting from one habitual comfort, following the Christian liturgical calendar. The length matters -- patterns you cannot see in a single day become visible over weeks.",
    },
    {
      name: "Daniel Fast",
      description: "From Daniel 1 and 10: fruits, vegetables, and water only, for 10 or 21 days. A partial fast rather than full abstinence. Lower physical stress, longer duration.",
    },
  ],
  commonMistakes: [
    "Using fasting to feel spiritually accomplished. The moment you are proud of your fast, the practice is working against you. Fasting is about decreasing, not achieving.",
    "Skipping the reflection. A fast without attention to what arises is just hunger. The practice is in noticing what comes up when the usual numbing is removed.",
    "Starting too extreme. A three-day water fast on your first attempt is likely to be more about proving something than learning something. Begin with what is uncomfortable but sustainable.",
  ],
  goDeeper: "Richard Foster's 'Celebration of Discipline' has a full chapter on fasting that is honest about both the practice and its abuses. Walter Brueggemann's 'Journey to the Common Good' frames fasting in terms of prophetic consciousness -- a disruption of consumerist assumptions. For the Islamic tradition, Hamza Yusuf's discussions of Ramadan available online place fasting in a different but rich theological framework.",
};

// ---------------------------------------------------------------------------
// Relational & Justice practices
// ---------------------------------------------------------------------------

const ruleOfLife: Practice = {
  id: "rule-of-life",
  slug: "rule-of-life",
  title: "Rule of Life",
  tradition: "Benedictine",
  subtitle: "A personal framework for how you want to live",
  origin: "Benedict of Nursia's 'Rule' (6th century). The original Rule was written for monastic community, but the structure has been adapted for individual lay practice.",
  purpose: "To create a framework for your rhythms of prayer, work, rest, community, and study -- not as a set of rules you follow but as a description of who you are trying to be and how you are trying to live. The Rule is descriptive of intention, not prescriptive law.",
  icon: "Landmark",
  color: "#2D6A4F",
  category: "relational",
  difficulty: "intermediate",
  estimatedMinutes: 60,
  frequency: "as-needed",
  tags: ["benedictine", "rhythm", "rule", "community", "structure", "intention"],
  relatedConceptSlugs: [],
  relatedWordIds: [],
  steps: [
    {
      order: 1,
      title: "Reflect before writing",
      instruction: "Before you write anything, spend thirty minutes answering these questions in a journal: When do you feel most alive? When do you feel most depleted? What does a good week look like? What patterns in your life are working against who you want to be? You are collecting data, not building a plan.",
      duration: "30 minutes",
    },
    {
      order: 2,
      title: "Identify your domains",
      instruction: "Most rules of life address five to seven domains: Prayer (how and when you pray), Work (what you are building and why), Rest (sleep, sabbath, play), Community (who you are in relationship with and how), Study (what you are reading and learning), Body (how you care for your physical self), Service (how you give of yourself outside your immediate relationships). You do not need all of these. Choose what is alive for you.",
      duration: "10 minutes",
    },
    {
      order: 3,
      title: "Write a statement for each domain",
      instruction: "For each domain you chose, write two to four sentences that describe your intentions. Not what you will do perfectly -- what you are aiming at. Write in present tense: 'I am someone who...' or 'In my prayer life, I...' The statements should feel like the true version of yourself, not the idealized version.",
      duration: "30 minutes",
    },
    {
      order: 4,
      title: "Build in rhythms, not to-do lists",
      instruction: "A Rule of Life is built around rhythms (daily, weekly, monthly, seasonal, annually) rather than tasks. 'I pray each morning before my phone' is a rhythm. 'I will pray 30 minutes every day' is a task. Rhythms are more durable.",
      duration: "10 minutes",
    },
    {
      order: 5,
      title: "Review quarterly",
      instruction: "A Rule of Life is not a contract. It is a living document. Review it every three months: What is working? What was never realistic? What has changed in your life that your Rule has not yet caught up to? Revise it without guilt.",
      duration: "Ongoing",
    },
  ],
  variations: [
    {
      name: "Shared Rule",
      description: "Write a Rule of Life with a partner, a household, or a small community. The negotiation process reveals your different assumptions about what matters. The shared Rule creates accountability that individual Rules often lack.",
    },
    {
      name: "Seasonal Rule",
      description: "Rather than one Rule for all of life, write a Rule for this season only -- the next three months. This is less intimidating and more accurate, since seasons of life have genuinely different demands.",
    },
    {
      name: "Minimal Rule",
      description: "Three commitments only: one practice, one relationship, one act of service. Short enough to hold in your head, specific enough to be real. Add more only when these three are stable.",
    },
  ],
  commonMistakes: [
    "Writing what you think a spiritual person should do instead of what you are actually drawn to. A Rule built around obligations you resent will not survive the first difficult month.",
    "Making it too detailed. A Rule with 40 bullet points is a burden, not a guide. The best Rules are short enough to remember without looking at them.",
    "Treating violations as evidence of failure. When you miss a practice, review the Rule, not yourself. Does the Rule need to change? Or do you need support?",
  ],
  goDeeper: "Columba Stewart's 'Prayer and Community: The Benedictine Tradition' gives context for the original Rule. Marjorie Thompson's 'Soul Feast' is the most accessible modern guide to writing a Rule of Life for laypeople. Trevor Hudson and Stephen Pickard's 'Discovering Our Spiritual Identity' walks through the process in community. Benedict's original Rule is available free online in translation and is far more readable than its reputation suggests.",
};

const confessionWithoutClergy: Practice = {
  id: "confession-without-clergy",
  slug: "confession-without-clergy",
  title: "Confession Without Clergy",
  tradition: "Cross-tradition",
  subtitle: "Honest self-examination spoken to a trusted person",
  origin: "James 5:16 ('Confess your sins to one another'). The practice predates the formal sacramental system and continues in Protestant, Quaker, and 12-step traditions.",
  purpose: "To break the isolation of guilt and self-deception by speaking truth to another person. Something changes when it is said aloud to a human witness. Secrecy protects shame. Speech begins to dissolve it.",
  icon: "Users",
  color: "#40916C",
  category: "relational",
  difficulty: "beginner",
  estimatedMinutes: 15,
  frequency: "as-needed",
  tags: ["confession", "accountability", "community", "shame", "truth-telling", "james"],
  relatedConceptSlugs: [],
  relatedWordIds: [],
  steps: [
    {
      order: 1,
      title: "Find the right person",
      instruction: "This is not a therapist (though therapy is useful). This is a peer -- someone who knows you, who has their own practice of honest self-examination, who can hold what you say without gossip, without flinching, and without excessive consolation. The wrong choice is someone who will rush to tell you it is fine. The right choice is someone who can sit with the truth without fixing it.",
      duration: "Before starting",
    },
    {
      order: 2,
      title: "Write before you speak",
      instruction: "Spend fifteen to thirty minutes writing what you want to confess. Be specific. Not 'I have been selfish' but what specific thing you did, what it cost the other person, what it cost you, and what you have been telling yourself about it. The writing is not the confession -- it is preparation. It prevents the avoidance that happens in spoken confession when you soften things in the moment.",
      duration: "20 minutes",
    },
    {
      order: 3,
      title: "Speak without editing",
      instruction: "Read what you wrote aloud to your person, or speak from the notes. Resist the urge to hedge, qualify, or explain. Say what you did. Say what you know about why. Say what you regret. When you have said it, stop. Do not preemptively minimize the effect of what you confessed.",
      duration: "5 to 10 minutes",
    },
    {
      order: 4,
      title: "Receive what your person says",
      instruction: "This is harder than speaking. Your person may say something that lands differently than you expected. They may ask a question you did not anticipate. Do not defend. Listen. The other person is not there to absolve you -- that is between you and God (or you and your conscience, if that framing serves you better). They are a witness.",
      duration: "5 to 10 minutes",
    },
    {
      order: 5,
      title: "Name what you will do differently",
      instruction: "Confession without intention to change is theater. Name one specific thing you will do differently. Not a general aspiration -- a specific action. If an apology is owed to someone else, name when you will make it.",
      duration: "2 to 3 minutes",
    },
  ],
  variations: [
    {
      name: "12-step fifth step",
      description: "The fifth step of Alcoholics Anonymous: 'Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.' The 12-step tradition has developed the most robust lay framework for this practice outside of formal religion. Their literature is worth reading even if you are not in recovery.",
    },
    {
      name: "Examen-linked confession",
      description: "Use the Examen daily and set aside one session per month with a trusted friend to speak aloud what has accumulated. Regular small confessions prevent the build-up of hidden material that requires much larger processing later.",
    },
    {
      name: "Written exchange",
      description: "If speaking aloud is not accessible, some traditions have used letters. Write honestly; the other person reads it and responds with written truth. Slower, but it works and avoids the pressure of real-time conversation.",
    },
  ],
  commonMistakes: [
    "Choosing someone who will rush to absolve you. A person who says 'Oh, that is nothing, do not worry about it' after every confession is not a useful witness. Choose someone who can sit with the truth.",
    "Confessing abstractly. 'I have been unkind' tells you nothing. 'I deliberately said the thing I knew would hurt her because I was angry and I wanted her to feel it' tells you something you can work with.",
    "Stopping at confession without repair. If you have wronged someone, confession to a third party does not substitute for apology to the person you harmed. The practice is not complete until repair is at least attempted.",
  ],
  goDeeper: "The twelve-step Big Book chapter 'Into Action' describes the fifth step in detail. Dietrich Bonhoeffer's 'Life Together' has a chapter on confession that is theologically serious without being sacramental. The Quaker concept of 'clearness committees' -- small groups that help individuals discern truth through honest questioning -- is a related practice described in Parker Palmer's 'A Hidden Wholeness.'",
};

const propheticImagination: Practice = {
  id: "prophetic-imagination",
  slug: "prophetic-imagination",
  title: "Prophetic Imagination",
  tradition: "Hebrew Prophetic / Liberation Theology",
  subtitle: "Grieve what is wrong, then imagine what could be",
  origin: "Walter Brueggemann's 'The Prophetic Imagination' (1978), drawing on the Hebrew prophets and the liberation theology movement",
  purpose: "Justice begins with honest naming. Before you can build something new, you have to fully grieve what is wrong. Most people skip grief and go straight to solution, which is why most solutions do not work. Brueggemann argues the prophets' primary work was to make grief possible and then to energize alternative vision.",
  icon: "Globe",
  color: "#B68D40",
  category: "relational",
  difficulty: "advanced",
  estimatedMinutes: 30,
  frequency: "weekly",
  tags: ["prophetic", "justice", "brueggemann", "grief", "imagination", "community"],
  relatedConceptSlugs: [],
  relatedWordIds: [],
  steps: [
    {
      order: 1,
      title: "Choose your subject",
      instruction: "Select one specific thing that is wrong in the world or in your community. Not a vague category ('injustice') but something specific: a policy, a pattern, a relationship, a system, a silence. Brueggemann insists on the concrete. Prophets did not speak in abstractions.",
      duration: "3 minutes",
    },
    {
      order: 2,
      title: "Name it without softening",
      instruction: "Write or speak what is wrong with brutal accuracy. Not 'there are disparities in the system' but what specifically is happening to specific people. Name who benefits. Name who pays. Name what is being protected by the silence around it. The language of the prophets is not diplomatic -- it is declarative.",
      duration: "8 minutes",
      note: "Brueggemann calls this the 'prophetic critique' -- the work of naming what the dominant culture insists does not exist or does not matter.",
    },
    {
      order: 3,
      title: "Grieve",
      instruction: "Before you go to solution, stop. Sit with the grief of what is wrong. Lament is not weakness -- in the prophetic tradition, it is the honest response to honest seeing. If you cannot grieve what is wrong, you will not have the energy to build what is right. Write a lament: what you mourn, what should not be this way, what has been lost.",
      duration: "7 minutes",
    },
    {
      order: 4,
      title: "Imagine the alternative",
      instruction: "Now -- and only now -- imagine what could be different. Brueggemann calls this the 'prophetic energizing.' Do not start with what is realistic or politically achievable. Start with what you believe is right. What does the world look like if this particular wrong is healed? Be specific. Name actual changes in actual people's lives.",
      duration: "8 minutes",
    },
    {
      order: 5,
      title: "Name your one action",
      instruction: "From the alternative you imagined, identify one concrete thing you can do this week. Not 'raise awareness' -- something specific. A conversation. A letter. A dollar amount. Showing up somewhere. The practice connects prophetic imagination to prophetic action.",
      duration: "4 minutes",
    },
  ],
  variations: [
    {
      name: "Community lament",
      description: "A group gathers to name together what is wrong in their neighborhood or city. No solutions allowed in the first hour. Only grieving. Then, in the second hour, imaginative vision. Then action planning. The sequence is non-negotiable.",
    },
    {
      name: "Prophetic reading",
      description: "Read a passage from Amos, Isaiah, Jeremiah, or Micah. Then do the same exercise with the specific situation the prophet was addressing. What was wrong? What was the alternative vision? Where is an analogous situation today?",
    },
    {
      name: "Personal prophetic imagination",
      description: "Apply the same structure to your own life: name what is wrong in your household, your workplace, your closest relationships. The prophetic impulse operates at every scale.",
    },
  ],
  commonMistakes: [
    "Skipping grief and going straight to solutions. Brueggemann is explicit: this is the primary pathology of activist culture. Solutions built on unprocessed grief tend to reproduce the patterns they are trying to fix.",
    "Imagining only what seems achievable. The prophets imagined things that had never existed. The point of prophetic imagination is to hold a vision large enough to orient your action, not to generate a political platform.",
    "Doing this alone. The prophets spoke in public. The practice has a communal dimension. At minimum, share your lament and your vision with one other person.",
  ],
  goDeeper: "Walter Brueggemann's 'The Prophetic Imagination' (second edition, 2001) is the essential text and is not long. His 'Finally Comes the Poet' extends the argument. For liberation theology's take on the same question, Gustavo Gutierrez's 'A Theology of Liberation' is the founding document. James Cone's 'The Cross and the Lynching Tree' applies prophetic imagination to American racial violence with unusual power.",
};

// ---------------------------------------------------------------------------
// Complete data array
// ---------------------------------------------------------------------------

export const practices: readonly Practice[] = [
  lectioDivina,
  ignatianContemplation,
  havruta,
  centeringPrayer,
  theExamen,
  hesychasm,
  walkingPrayer,
  breathPrayer,
  fastingAsAwareness,
  ruleOfLife,
  confessionWithoutClergy,
  propheticImagination,
];

// ---------------------------------------------------------------------------
// Lookup functions
// ---------------------------------------------------------------------------

export function getPracticeBySlug(slug: string): Practice | undefined {
  return practices.find((p) => p.slug === slug);
}

export function getPracticesByCategory(
  category: Practice["category"]
): readonly Practice[] {
  return practices.filter((p) => p.category === category);
}

export function getAllPractices(): readonly Practice[] {
  return practices;
}

export function getPracticesByDifficulty(
  difficulty: Practice["difficulty"]
): readonly Practice[] {
  return practices.filter((p) => p.difficulty === difficulty);
}

export function getPracticesByFrequency(
  frequency: Practice["frequency"]
): readonly Practice[] {
  return practices.filter((p) => p.frequency === frequency);
}
