export interface ScriptureCard {
  id: string;
  greek: string;
  transliteration: string;
  commonTranslation: string;
  actualMeaning: string;
  verse: string;
  verseRef: string;
  context: string;
  category: "word" | "teaching" | "gnostic";
}

export interface WordCorrection {
  id: string;
  greek: string;
  transliteration: string;
  commonTranslation: string;
  actualMeaning: string;
  explanation: string;
  keyVerses: Array<{ ref: string; text: string }>;
  whyItMatters: string;
}

export const wordCorrections: WordCorrection[] = [
  {
    id: "hamartia",
    greek: "hamartia",
    transliteration: "hamartia",
    commonTranslation: "Sin",
    actualMeaning: "Missing the mark",
    explanation:
      "An archery term. It literally means to miss the target -- not evil or moral depravity. The original meaning suggests a course correction, not a permanent stain on your soul. You aimed, you missed, so adjust and try again.",
    keyVerses: [
      {
        ref: "Romans 3:23",
        text: "For all have missed the mark and fall short of the glory of God.",
      },
      {
        ref: "Romans 6:23",
        text: "For the wages of missing the mark is death, but the gift of God is eternal life.",
      },
    ],
    whyItMatters:
      "When 'sin' becomes 'missing the mark,' the entire tone shifts from condemnation to coaching. You're not fundamentally broken. You're an archer who needs to adjust their aim.",
  },
  {
    id: "metanoia",
    greek: "metanoia",
    transliteration: "metanoia",
    commonTranslation: "Repent",
    actualMeaning: "A fundamental shift in perception and understanding",
    explanation:
      "Meta (beyond/after) + nous (mind). This isn't about feeling guilty or confessing sins. It means to go beyond your current way of thinking -- to see the world differently. It's a transformation of consciousness, not a guilt trip.",
    keyVerses: [
      {
        ref: "Matthew 4:17",
        text: "From that time Jesus began to say, 'Transform your perception, for the kingdom of heaven is at hand.'",
      },
      {
        ref: "Mark 1:15",
        text: "The time is fulfilled. The kingdom of God is at hand. Transform your understanding and trust in this good news.",
      },
    ],
    whyItMatters:
      "Jesus wasn't telling people to feel bad about themselves. He was telling them to change how they see everything. That's a fundamentally different invitation.",
  },
  {
    id: "gehenna",
    greek: "gehenna",
    transliteration: "Gehenna",
    commonTranslation: "Hell (eternal punishment)",
    actualMeaning: "Valley of Hinnom -- a literal garbage dump outside Jerusalem",
    explanation:
      "Ge-Hinnom was a real valley south of Jerusalem. In Jesus' time it was the city dump where trash burned constantly. Jesus used it as a metaphor for the consequences of destructive living -- not as a description of eternal torture after death. It was a place his audience could literally see from the city walls.",
    keyVerses: [
      {
        ref: "Matthew 5:22",
        text: "But I say to you that everyone who is angry with his brother will be liable to judgment... and whoever says 'You fool!' will be liable to the fires of the garbage dump.",
      },
      {
        ref: "Mark 9:47-48",
        text: "It is better for you to enter the kingdom of God with one eye than to be thrown into the garbage dump.",
      },
    ],
    whyItMatters:
      "Jesus wasn't threatening people with cosmic torture. He was saying: keep living like this and you'll end up in the dump. It's a practical warning, not a supernatural threat.",
  },
  {
    id: "aionios",
    greek: "aionios",
    transliteration: "aionios",
    commonTranslation: "Eternal / Everlasting",
    actualMeaning: "Of the age / age-long / pertaining to an age",
    explanation:
      "From 'aion' (an age, an era). Greek had a perfectly good word for 'eternal' (aidios) but the New Testament almost never uses it. Aionios describes something that belongs to or characterizes a particular age -- it has a quality focus, not necessarily a duration focus.",
    keyVerses: [
      {
        ref: "John 17:3",
        text: "And this is life of the age: that they know you, the only true God, and Jesus Christ whom you have sent.",
      },
      {
        ref: "Matthew 25:46",
        text: "And these will go away into age-long correction, but the righteous into age-long life.",
      },
    ],
    whyItMatters:
      "If 'eternal punishment' is actually 'age-long correction,' the entire theology of hell changes. The emphasis shifts from infinite punishment to purposeful restoration.",
  },
  {
    id: "aphiemi",
    greek: "aphiemi",
    transliteration: "aphiemi",
    commonTranslation: "Forgive",
    actualMeaning: "To release, let go, send away, leave behind",
    explanation:
      "The word literally means to release or let go -- like releasing a debt, dropping a weight, or setting a prisoner free. Forgiveness in the original Greek isn't a moral judgment about whether someone deserves pardoning. It's the practical act of putting something down.",
    keyVerses: [
      {
        ref: "Matthew 6:12",
        text: "Release us from our debts, as we also have released our debtors.",
      },
      {
        ref: "Luke 6:37",
        text: "Release and you will be released.",
      },
    ],
    whyItMatters:
      "Forgiveness becomes self-liberation. You're not doing the other person a favor -- you're setting yourself free by putting the weight down.",
  },
  {
    id: "teleios",
    greek: "teleios",
    transliteration: "teleios",
    commonTranslation: "Perfect / Be perfect",
    actualMeaning: "Complete, mature, having reached its intended purpose",
    explanation:
      "From 'telos' (goal, end, purpose). Not moral perfection or flawlessness. It means reaching the fullness of what you were meant to become -- like a seed that has become a full tree. It's about completion, not about never making mistakes.",
    keyVerses: [
      {
        ref: "Matthew 5:48",
        text: "Be complete, therefore, as your heavenly Father is complete.",
      },
    ],
    whyItMatters:
      "Jesus wasn't setting an impossible standard of moral perfection. He was inviting people toward wholeness and maturity. That's achievable. Perfection isn't.",
  },
  {
    id: "ekklesia",
    greek: "ekklesia",
    transliteration: "ekklesia",
    commonTranslation: "Church",
    actualMeaning: "A called-out assembly / a gathering of citizens",
    explanation:
      "In Greek civic life, ekklesia was the assembly of citizens called together to make decisions about community matters. It had zero religious connotation. No building, no institution, no hierarchy. Just people gathering to figure things out together.",
    keyVerses: [
      {
        ref: "Matthew 16:18",
        text: "On this rock I will build my assembly.",
      },
      {
        ref: "Matthew 18:17",
        text: "If they refuse to listen, tell it to the assembly.",
      },
    ],
    whyItMatters:
      "Jesus never said he was building an institution. He was building a movement of people who gather. The difference between 'church' and 'assembly' is the difference between an organization and a community.",
  },
  {
    id: "dikaiosyne",
    greek: "dikaiosyne",
    transliteration: "dikaiosyne",
    commonTranslation: "Righteousness",
    actualMeaning: "Justice, equity, right relationship, alignment",
    explanation:
      "Less about personal moral purity and more about right relationships -- with others, with yourself, with the divine. The Greek concept emphasizes proper alignment and just dealings, not individual holiness.",
    keyVerses: [
      {
        ref: "Matthew 5:6",
        text: "Blessed are those who hunger and thirst for justice, for they will be satisfied.",
      },
      {
        ref: "Matthew 6:33",
        text: "Seek first the kingdom of God and his justice.",
      },
    ],
    whyItMatters:
      "When 'righteousness' becomes 'justice,' the Sermon on the Mount stops being about personal piety and starts being about how we treat each other.",
  },
  {
    id: "kardia",
    greek: "kardia",
    transliteration: "kardia",
    commonTranslation: "Heart (emotions)",
    actualMeaning: "The seat of thought, will, and understanding -- the whole inner person",
    explanation:
      "In ancient Greek thought, kardia wasn't just about feelings. It was the center of your entire inner life: thinking, willing, understanding, feeling. When Jesus says to love God with all your heart, he means your entire inner being -- not just your emotions.",
    keyVerses: [
      {
        ref: "Matthew 5:8",
        text: "Blessed are the pure in inner being, for they shall see God.",
      },
      {
        ref: "Mark 12:30",
        text: "Love the Lord your God with all your inner being.",
      },
    ],
    whyItMatters:
      "Faith becomes more than feelings. It engages your entire self -- intellect, will, understanding, and emotion together.",
  },
];

export const scriptureCards: ScriptureCard[] = [
  {
    id: "sc-1",
    greek: "hamartia",
    transliteration: "hamartia",
    commonTranslation: "Sin",
    actualMeaning: "Missing the mark",
    verse:
      "For all have missed the mark and fall short of the glory of God.",
    verseRef: "Romans 3:23",
    context:
      "Paul was writing about the universal human condition. Not condemning anyone -- leveling the playing field.",
    category: "word",
  },
  {
    id: "sc-2",
    greek: "metanoia",
    transliteration: "metanoia",
    commonTranslation: "Repent",
    actualMeaning: "Transform your perception",
    verse:
      "Transform your perception, for the kingdom of heaven is at hand.",
    verseRef: "Matthew 4:17",
    context:
      "The very first public words of Jesus' ministry. Not 'feel guilty' -- 'see differently.'",
    category: "word",
  },
  {
    id: "sc-3",
    greek: "basileia tou theou",
    transliteration: "basileia tou theou",
    commonTranslation: "Kingdom of God",
    actualMeaning: "The reign/realm of God",
    verse:
      "The kingdom of God is not coming with signs to be observed. For behold, the kingdom of God is within you.",
    verseRef: "Luke 17:20-21",
    context:
      "When asked when God's kingdom would arrive, Jesus said it's already here -- inside you. Not a future place. A present reality.",
    category: "teaching",
  },
  {
    id: "sc-4",
    greek: "aphiemi",
    transliteration: "aphiemi",
    commonTranslation: "Forgive",
    actualMeaning: "Release / Let go",
    verse: "Release and you will be released.",
    verseRef: "Luke 6:37",
    context:
      "Forgiveness as self-liberation. Drop the weight. Stop carrying what isn't yours.",
    category: "word",
  },
  {
    id: "sc-5",
    greek: "aionios",
    transliteration: "aionios",
    commonTranslation: "Eternal",
    actualMeaning: "Of the age / Age-long",
    verse:
      "And this is life of the age: that they know you, the only true God.",
    verseRef: "John 17:3",
    context:
      "Eternal life isn't about duration. It's about a quality of knowing -- a depth of connection available right now.",
    category: "word",
  },
  {
    id: "sc-6",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "If you bring forth what is within you, what you bring forth will save you. If you do not bring forth what is within you, what you do not bring forth will destroy you.",
    verseRef: "Gospel of Thomas, Saying 70",
    context:
      "From the Nag Hammadi library, discovered in 1945. Not included in the Bible. Attributed to Jesus.",
    category: "gnostic",
  },
  {
    id: "sc-7",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "The kingdom is inside of you, and it is outside of you. When you come to know yourselves, then you will become known.",
    verseRef: "Gospel of Thomas, Saying 3",
    context:
      "Self-knowledge as the path. Not blind faith -- direct experience.",
    category: "gnostic",
  },
  {
    id: "sc-8",
    greek: "teleios",
    transliteration: "teleios",
    commonTranslation: "Perfect",
    actualMeaning: "Complete / Mature",
    verse:
      "Be complete, therefore, as your heavenly Father is complete.",
    verseRef: "Matthew 5:48",
    context:
      "The capstone of the Sermon on the Mount. Not demanding flawlessness -- inviting wholeness.",
    category: "word",
  },
  {
    id: "sc-9",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "You have heard that it was said, 'An eye for an eye and a tooth for a tooth.' But I say to you, do not resist the evildoer.",
    verseRef: "Matthew 5:38-39",
    context:
      "Not passivity -- a radical refusal to participate in the cycle of violence. Breaking the pattern.",
    category: "teaching",
  },
  {
    id: "sc-10",
    greek: "gehenna",
    transliteration: "Gehenna",
    commonTranslation: "Hell",
    actualMeaning: "The garbage dump outside Jerusalem",
    verse:
      "It is better for you to enter life maimed than to be thrown into the garbage dump.",
    verseRef: "Mark 9:43",
    context:
      "A real place his audience could see. Not a supernatural threat -- a practical metaphor for wasted potential.",
    category: "word",
  },
  {
    id: "sc-11",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "Split a piece of wood, and I am there. Lift up the stone, and you will find me there.",
    verseRef: "Gospel of Thomas, Saying 77",
    context:
      "The divine isn't in a building. It's in everything. In the ordinary work of your hands.",
    category: "gnostic",
  },
  {
    id: "sc-12",
    greek: "ekklesia",
    transliteration: "ekklesia",
    commonTranslation: "Church",
    actualMeaning: "Assembly / Gathering",
    verse: "On this rock I will build my assembly.",
    verseRef: "Matthew 16:18",
    context:
      "He wasn't founding an institution. He was building a movement of people who show up for each other.",
    category: "word",
  },
  {
    id: "sc-13",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "Judge not, that you be not judged. For with the judgment you pronounce you will be judged, and with the measure you use it will be measured to you.",
    verseRef: "Matthew 7:1-2",
    context:
      "Not about avoiding discernment. It's about understanding that the lens you use on others will be turned on you.",
    category: "teaching",
  },
  {
    id: "sc-14",
    greek: "dikaiosyne",
    transliteration: "dikaiosyne",
    commonTranslation: "Righteousness",
    actualMeaning: "Justice / Right relationship",
    verse:
      "Blessed are those who hunger and thirst for justice, for they will be satisfied.",
    verseRef: "Matthew 5:6",
    context:
      "The Beatitudes aren't about being nice. They're about a burning desire for things to be made right.",
    category: "word",
  },
  {
    id: "sc-15",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "Whoever drinks of the water that I will give him will never be thirsty again. The water that I will give him will become in him a spring of water welling up to life of the age.",
    verseRef: "John 4:14",
    context:
      "Living water. Not something you have to keep coming back for. A source that opens inside you and doesn't stop.",
    category: "teaching",
  },
];
