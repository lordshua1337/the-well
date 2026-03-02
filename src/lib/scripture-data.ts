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
    actualMeaning: "Missing the mark -- an archery term for falling short of the target",
    explanation:
      "Hamartia was a word any Greek speaker would have recognized from athletics, not theology. It was the term used when an archer's arrow missed the target, or when a spear-thrower fell short. The root carries no inherent moral judgment -- it simply means the aim was off. In classical Greek tragedy (Aristotle's Poetics), hamartia is the protagonist's 'fatal flaw' or 'error in judgment' -- a mistake, not an evil nature. When Paul and the Gospel writers chose this word, their audience heard 'you missed' -- not 'you are wicked.' The entire framing was corrective: you have a target, you're aiming at something real, and right now your aim is off. Adjust and shoot again. The Latin church later translated hamartia as 'peccatum,' which drifted toward moral transgression and then into the English 'sin' -- a word that now carries connotations of guilt, shame, and inherent corruption that the original Greek simply did not contain.",
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
      "When 'sin' becomes 'missing the mark,' the entire tone shifts from condemnation to coaching. You are not fundamentally broken or born defective. You are an archer whose aim needs correcting. The invitation is to try again with better aim -- not to grovel for forgiveness for being human. This reframe changes the relationship between a person and the divine from criminal-to-judge into student-to-teacher.",
  },
  {
    id: "metanoia",
    greek: "metanoia",
    transliteration: "metanoia",
    commonTranslation: "Repent",
    actualMeaning: "A complete shift in perception -- to think beyond your current mind",
    explanation:
      "Meta (beyond, after, above) + nous (mind, perception, understanding). Metanoia literally means to go beyond your current way of thinking -- to undergo a fundamental shift in how you perceive reality. In Greek philosophical tradition, this was a powerful concept: the moment your entire worldview reorganizes. It has nothing to do with guilt, confession booths, or feeling sorry. The word 'repent' comes from the Latin 'poenitere' (to feel regret, to punish oneself), which is a catastrophic mistranslation. The Latin translators took a Greek word about expanded consciousness and turned it into a word about self-punishment. When John the Baptist and Jesus opened their public ministries with 'Metanoeite!' they were not saying 'Feel bad about what you've done.' They were saying 'Your entire way of seeing the world is about to change. Get ready. Open your mind.' It is closer to 'wake up' than 'repent.'",
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
      "The very first word of Jesus' public ministry was not a guilt trip. It was an invitation to see everything differently. That is a fundamentally different starting point for a spiritual tradition. If the foundation is 'feel guilty,' you build a religion of shame. If the foundation is 'expand your mind,' you build a tradition of awakening.",
  },
  {
    id: "gehenna",
    greek: "gehenna",
    transliteration: "Gehenna",
    commonTranslation: "Hell (eternal punishment)",
    actualMeaning: "Gei Hinnom -- the Valley of Hinnom, a literal burning garbage dump outside the walls of Jerusalem",
    explanation:
      "Gehenna -- Gei Hinnom in Hebrew, 'Valley of Hinnom' -- was a literal burning garbage dump outside the walls of Jerusalem. It smoldered constantly, full of waste and reportedly the corpses of criminals and animals. In the Old Testament, it was the site where some kings of Judah practiced child sacrifice to the god Molech (2 Kings 23:10, Jeremiah 7:31), which is why it became associated with shame and destruction. By Jesus' time, it was the city dump -- a real, physical place that smoked and burned day and night. When Jesus used the word in the Gospels, he was pointing at a real place his audience could see or had seen from the city walls. The translation to 'Hell' -- a metaphysical eternal torture realm -- is a significant interpretive leap from what the word actually meant to a first-century Jewish audience. To them, being thrown in Gehenna meant being discarded, unburied, outside the city, with no honor. The emphasis was on being cast out and forgotten, not on eternal conscious torment. Mainstream Judaism at the time had no developed concept of eternal hell. The idea of an underground torture realm comes from Greek mythology (Tartarus, Hades) and later medieval Christian imagination (heavily influenced by Dante's Inferno in the 14th century), not from anything Jesus actually said.",
    keyVerses: [
      {
        ref: "Matthew 5:22",
        text: "But I say to you that everyone who is angry with his brother will be liable to judgment... and whoever says 'You fool!' will be liable to the fires of the garbage dump.",
      },
      {
        ref: "Mark 9:47-48",
        text: "It is better for you to enter the kingdom of God with one eye than to be thrown into the garbage dump, where their worm does not die and the fire is not quenched.",
      },
      {
        ref: "Matthew 10:28",
        text: "Do not fear those who kill the body but cannot kill the soul. Rather fear the one who can destroy both soul and body in the garbage dump.",
      },
    ],
    whyItMatters:
      "Jesus was not threatening people with cosmic torture. He was using the most vivid, visceral image available to a Jerusalem audience -- the burning dump outside their own city walls -- to say: keep living destructively and this is where you end up. Discarded. Wasted. The warning was about the consequences of a wasted life in the here and now, not about what happens to your soul in a supernatural underground prison after you die. The entire doctrine of eternal hell rests on translating 'Gehenna' as something it never meant to the people who first heard it.",
  },
  {
    id: "aionios",
    greek: "aionios",
    transliteration: "aionios",
    commonTranslation: "Eternal / Everlasting",
    actualMeaning: "Of the age -- pertaining to an era, age-long, or belonging to a particular epoch",
    explanation:
      "Aionios comes from 'aion' (an age, an era, a period of time). Greek had a perfectly good word for 'eternal' in the absolute sense -- 'aidios' -- which appears only twice in the New Testament (Romans 1:20, Jude 1:6). If the authors meant 'never-ending,' they had the word for it and chose not to use it. Aionios describes something that belongs to, characterizes, or lasts for a particular age. The early church father Origen (185-253 AD), who was a native Greek speaker and one of the most brilliant scholars of early Christianity, explicitly taught that aionios did not mean 'eternal' and that the 'aionios punishment' described in Matthew 25:46 was corrective and temporary. He was not alone -- this was a mainstream position in the Greek-speaking eastern church for centuries. It was only when the Bible was translated into Latin ('aeternus') and then into English ('eternal') that the word hardened into meaning 'never-ending.' The people who actually spoke the language knew better.",
    keyVerses: [
      {
        ref: "John 17:3",
        text: "And this is life of the age: that they know you, the only true God, and Jesus Christ whom you have sent.",
      },
      {
        ref: "Matthew 25:46",
        text: "And these will go away into age-long correction, but the righteous into age-long life.",
      },
      {
        ref: "Habakkuk 3:6 (Septuagint)",
        text: "He stood and measured the earth... the aionios mountains were scattered. -- Here 'aionios' describes ancient mountains, which are clearly not literally eternal.",
      },
    ],
    whyItMatters:
      "If 'eternal punishment' is actually 'age-long correction,' the entire theology of hell changes from infinite retribution to purposeful restoration with an end point. The Greek-speaking early church understood this. It was lost in translation -- literally -- when the Bible moved into Latin and then English. This single mistranslation has shaped (and arguably distorted) Western Christianity for over a thousand years.",
  },
  {
    id: "aphiemi",
    greek: "aphiemi",
    transliteration: "aphiemi",
    commonTranslation: "Forgive",
    actualMeaning: "To release, let go, send away, leave behind -- like dropping a weight or canceling a debt",
    explanation:
      "Aphiemi is a compound word: apo (away from) + hiemi (to send, to throw). It means to send something away from you, to release your grip on it, to let it go. In everyday Greek, it was used for canceling a debt, releasing a prisoner, leaving a place, or dropping something you were holding. There is no moral evaluation in the word -- no 'you deserve pardon' or 'I am gracious enough to forgive you.' It is a physical action metaphor: you are holding something, and you let go of it. When Jesus teaches the Lord's Prayer and says 'aphes hemin ta opheilemata hemon' (release us from our debts), he is using financial and legal language, not religious language. Debts. Release. The word 'forgive' in English carries connotations of moral superiority -- the forgiver condescends to pardon the offender. Aphiemi has none of that. It is about what happens inside the person doing the releasing. You are carrying a rock. Put it down.",
    keyVerses: [
      {
        ref: "Matthew 6:12",
        text: "Release us from our debts, as we also have released our debtors.",
      },
      {
        ref: "Luke 6:37",
        text: "Release and you will be released.",
      },
      {
        ref: "Mark 11:25",
        text: "And whenever you stand praying, release whatever you have against anyone, so that your Father in heaven may also release your failings.",
      },
    ],
    whyItMatters:
      "Forgiveness stops being about whether someone else deserves your grace and becomes about whether you want to keep carrying the weight. It is self-liberation disguised as generosity. The person you release first is yourself.",
  },
  {
    id: "teleios",
    greek: "teleios",
    transliteration: "teleios",
    commonTranslation: "Perfect / Be perfect",
    actualMeaning: "Complete, mature, having reached its intended purpose -- like a fruit that has fully ripened",
    explanation:
      "Teleios comes from 'telos' (goal, end, purpose, completion). In Greek philosophy, every living thing has a telos -- the full expression of what it was meant to become. An acorn's telos is an oak tree. A caterpillar's telos is a butterfly. Teleios describes the state of having arrived at that fullness. It has nothing to do with moral flawlessness or never making mistakes. Aristotle used teleios extensively in his ethics to describe the mature, complete human being -- someone who has developed their capacities fully, not someone who has never erred. When Jesus says 'Be teleios as your heavenly Father is teleios' (Matthew 5:48), he is not setting an impossible standard of perfection that guarantees failure and guilt. He is saying: grow into the fullness of what you are. Become complete. Reach your intended form. The Latin translation 'perfectus' (thoroughly made, finished) was close, but English 'perfect' has drifted into meaning 'without flaw,' which is a devastating distortion of the invitation.",
    keyVerses: [
      {
        ref: "Matthew 5:48",
        text: "Be complete, therefore, as your heavenly Father is complete.",
      },
      {
        ref: "James 1:4",
        text: "Let endurance have its full effect, so that you may be mature and complete, lacking in nothing.",
      },
    ],
    whyItMatters:
      "Jesus was not setting an impossible standard designed to make everyone feel like a failure. He was inviting people toward wholeness, maturity, and the full expression of their purpose. 'Be complete' is an invitation. 'Be perfect' is a trap. The difference between those two translations has caused incalculable psychological damage across centuries of Christianity.",
  },
  {
    id: "ekklesia",
    greek: "ekklesia",
    transliteration: "ekklesia",
    commonTranslation: "Church",
    actualMeaning: "A called-out assembly -- the gathering of citizens called together for civic decision-making",
    explanation:
      "In the Greek-speaking world, ekklesia was a thoroughly political word. It was the assembly of free citizens called together (ek = out, kaleo = to call) to vote on laws, debate policy, and make community decisions. Athens had an ekklesia. Corinth had one. Every Greek city did. It had zero religious connotation. No building, no steeple, no hierarchy, no clergy, no tithing, no denomination. Just citizens showing up to participate in communal life. When Jesus said 'I will build my ekklesia' (Matthew 16:18), his Greek-speaking audience did not hear 'I will build my church' with all its modern associations of stained glass and organ music. They heard 'I will build my citizens' assembly' -- a flat, democratic gathering where people come together as equals to figure out how to live. The English word 'church' actually comes from the Greek 'kyriakon' (belonging to the Lord), which is a completely different word that appears nowhere in the original text. The translators swapped one word for another, and an egalitarian assembly became a hierarchical institution.",
    keyVerses: [
      {
        ref: "Matthew 16:18",
        text: "On this rock I will build my assembly.",
      },
      {
        ref: "Matthew 18:17",
        text: "If they refuse to listen, tell it to the assembly.",
      },
      {
        ref: "Acts 19:39",
        text: "If you seek anything further, it shall be settled in the regular assembly. -- Here Luke uses ekklesia to describe a secular civic meeting, showing the word had no inherent religious meaning.",
      },
    ],
    whyItMatters:
      "Jesus never said he was building a religious institution with hierarchy, buildings, and clergy. He said he was building an assembly -- a gathering of people who show up for each other as equals. The difference between 'church' and 'assembly' is the difference between an organization you attend and a community you belong to. Everything institutional Christianity became -- the power structures, the Vatican, the denominations -- was built on a word Jesus never used.",
  },
  {
    id: "dikaiosyne",
    greek: "dikaiosyne",
    transliteration: "dikaiosyne",
    commonTranslation: "Righteousness",
    actualMeaning: "Justice, equity, right relationship -- being in proper alignment with others and the divine",
    explanation:
      "Dikaiosyne comes from 'dike' (justice, right) and in Greek civic life it was the primary word for justice -- the quality of a just person, a fair judge, or an equitable society. It was about right relationships and right dealings, not about personal moral purity or religious piety. When the Hebrew scriptures were translated into Greek (the Septuagint), dikaiosyne was chosen to translate 'tsedaqah,' which in Hebrew means righteousness-as-justice -- fair dealing, caring for the poor, setting things right in the community. It is deeply social and relational, not privately spiritual. But when dikaiosyne became 'righteousness' in English, the word shifted from a social concept (justice, equity, right relationships) to an individual moral concept (personal holiness, being 'right with God'). The Beatitude 'Blessed are those who hunger and thirst for dikaiosyne' was not about wanting to be personally holy. It was about wanting the world to be just. The people who heard this were living under Roman occupation. They were hungry for justice -- real, political, social justice -- not individual moral improvement.",
    keyVerses: [
      {
        ref: "Matthew 5:6",
        text: "Blessed are those who hunger and thirst for justice, for they will be satisfied.",
      },
      {
        ref: "Matthew 6:33",
        text: "Seek first the kingdom of God and his justice.",
      },
      {
        ref: "Matthew 5:10",
        text: "Blessed are those who are persecuted for the sake of justice, for theirs is the kingdom of heaven.",
      },
    ],
    whyItMatters:
      "When 'righteousness' becomes 'justice,' the Sermon on the Mount transforms from a guide for personal piety into a manifesto for social change. Jesus was not telling people to be more religious. He was telling occupied, oppressed people that their hunger for justice was blessed -- and that it would be satisfied. That is a revolutionary political statement, not a church bulletin.",
  },
  {
    id: "kardia",
    greek: "kardia",
    transliteration: "kardia",
    commonTranslation: "Heart (emotions / feelings)",
    actualMeaning: "The seat of thought, will, and understanding -- the entire inner person, not just emotions",
    explanation:
      "In modern English, 'heart' is almost exclusively associated with emotions and feelings -- love, passion, sentimentality. But in ancient Greek (and in Hebrew, where 'lev' carries the same breadth), kardia was the center of your entire inner life: thinking, reasoning, willing, deciding, understanding, and feeling. The Greeks considered the heart the organ of thought before they understood the brain's role. When Jesus says 'love the Lord your God with all your kardia' (Mark 12:30), he was not saying 'feel strong emotions about God.' He was saying engage your entire inner being -- your intellect, your will, your understanding, your perception, and your emotions together. When he says 'blessed are the pure in kardia' (Matthew 5:8), he does not mean people with nice feelings. He means people whose entire inner life -- their thoughts, intentions, motivations, and understanding -- is clean, unified, and undivided. The Hebrew concept of 'lev' that underlies the Greek usage is even more explicitly intellectual. In the Old Testament, the heart 'thinks,' 'plans,' 'understands,' and 'decides' far more often than it 'feels.'",
    keyVerses: [
      {
        ref: "Matthew 5:8",
        text: "Blessed are the pure in inner being, for they shall see God.",
      },
      {
        ref: "Mark 12:30",
        text: "Love the Lord your God with all your inner being, and with all your soul, and with all your mind, and with all your strength.",
      },
      {
        ref: "Matthew 15:19",
        text: "For out of the inner being come evil thoughts, murder, adultery, sexual immorality, theft, false witness, slander.",
      },
    ],
    whyItMatters:
      "Faith becomes more than a feeling. Loving God 'with all your heart' is not an emotional experience you try to manufacture on Sunday morning. It is the full engagement of everything you are -- your intellect, your will, your choices, your understanding, and yes, your emotions too. The whole person, not just the sentimental part. Christianity reduced to feelings is Christianity stripped of its teeth.",
  },
  {
    id: "doulos",
    greek: "doulos",
    transliteration: "doulos",
    commonTranslation: "Servant",
    actualMeaning: "Slave -- a person owned by another, with no legal rights or autonomy",
    explanation:
      "English translations consistently soften 'doulos' to 'servant,' but the word means slave. A servant chooses to work and can leave. A doulos cannot. Paul calls himself 'doulos Christou' (slave of Christ) -- not a polite assistant but someone who has surrendered all autonomy. The early church was full of actual slaves (some estimates suggest 30-40% of the Roman Empire's population). When Paul wrote to the Philippians that Jesus 'took the form of a doulos' (Philippians 2:7), they understood: the divine took the lowest possible social position. The sanitizing of 'slave' to 'servant' in English removes the shock and the social radicalism. Paul was not saying 'I work for Jesus.' He was saying 'I belong to Jesus completely, the way a Roman slave belongs to a master.' That is a fundamentally different statement about devotion and surrender.",
    keyVerses: [
      {
        ref: "Philippians 2:7",
        text: "He emptied himself, taking the form of a slave, being born in human likeness.",
      },
      {
        ref: "Romans 1:1",
        text: "Paul, a slave of Christ Jesus, called to be an apostle.",
      },
      {
        ref: "Galatians 3:28",
        text: "There is neither Jew nor Gentile, neither slave nor free... for you are all one in Christ Jesus.",
      },
    ],
    whyItMatters:
      "If Paul was a 'servant,' he had a nice job. If Paul was a 'slave,' he had given up everything. The word choice reveals the intensity of early Christian commitment -- and the radicalism of a movement that said slave and free were equal in Christ, in a society built on slavery. Softening the word softens the revolution.",
  },
  {
    id: "agape",
    greek: "agape",
    transliteration: "agape",
    commonTranslation: "Love (generic)",
    actualMeaning: "Unconditional, deliberate, self-giving love -- a choice, not a feeling",
    explanation:
      "Greek had four distinct words for love: eros (romantic desire), philia (deep friendship), storge (family affection), and agape (unconditional, self-giving commitment). English collapses all four into one word: 'love.' When Jesus says 'love your enemies' (Matthew 5:44), he uses agape -- not asking you to feel warm about people who harm you, but to choose to act in their genuine interest regardless of how you feel. Agape is a verb before it is a noun. It is something you do, not something you fall into. In 1 Corinthians 13 -- the famous 'love chapter' read at weddings -- Paul defines agape entirely through actions: it is patient, kind, does not envy, does not boast. Not one definition involves feelings. The entire chapter is a behavioral description. The reduction of agape to a warm emotion is one of the most consequential misunderstandings in Christian history.",
    keyVerses: [
      {
        ref: "1 Corinthians 13:4-7",
        text: "Agape is patient and kind. Agape does not envy or boast. It is not arrogant or rude. It does not insist on its own way.",
      },
      {
        ref: "Matthew 5:44",
        text: "But I say to you, agape your enemies and pray for those who persecute you.",
      },
      {
        ref: "John 15:13",
        text: "Greater agape has no one than this: to lay down one's life for one's friends.",
      },
    ],
    whyItMatters:
      "Love-as-feeling is passive -- it happens to you. Agape-as-choice is active -- you do it on purpose, especially when you do not feel like it. The command to 'love your enemies' is impossible if love is a feeling. It is entirely possible if love is a choice to act in someone's interest. Agape makes the impossible commandment practical.",
  },
  {
    id: "pistis",
    greek: "pistis",
    transliteration: "pistis",
    commonTranslation: "Faith (belief without evidence)",
    actualMeaning: "Trust, loyalty, fidelity, faithfulness -- relational confidence based on character",
    explanation:
      "In modern English, 'faith' has become almost synonymous with 'believing things without evidence.' This would have been incomprehensible to a Greek speaker. Pistis was a relational word -- it meant the trust between people, the reliability of a business partner, the faithfulness of a friend, the loyalty of a soldier. It was the word used in contracts and oaths. When Paul says 'we are justified by pistis' (Romans 3:28), he does not mean 'we are justified by believing certain doctrines.' He means 'we are made right through trust' -- through a relationship of loyalty and reliance. Pistis has an active, relational quality. You have pistis in someone because you know their character, because they have proven trustworthy. The Greek-speaking world would not have separated pistis from evidence -- pistis was precisely the confidence that comes from evidence of character. The blind faith concept is a modern invention that contradicts the original word.",
    keyVerses: [
      {
        ref: "Romans 3:28",
        text: "For we hold that a person is justified by trust apart from works of the law.",
      },
      {
        ref: "Hebrews 11:1",
        text: "Now trust is the substance of things hoped for, the evidence of things not seen.",
      },
      {
        ref: "Galatians 5:22",
        text: "The fruit of the Spirit is agape, joy, peace, patience, kindness, goodness, faithfulness.",
      },
    ],
    whyItMatters:
      "Faith-as-blind-belief creates a religion of intellectual submission. Pistis-as-trust creates a religion of relationship. The question shifts from 'Do you believe the right doctrines?' to 'Do you trust the character of the divine?' One requires turning off your brain. The other requires engaging it fully to assess trustworthiness.",
  },
  {
    id: "sarx",
    greek: "sarx",
    transliteration: "sarx",
    commonTranslation: "Flesh (the body, physical desires)",
    actualMeaning: "The whole self oriented toward self-preservation -- ego-driven existence, not the physical body",
    explanation:
      "When Paul contrasts 'sarx' (flesh) with 'pneuma' (spirit), translators and theologians have historically read this as body versus soul -- physical versus spiritual. This created centuries of body-hatred in Christianity: the body is sinful, desires are evil, the physical world is fallen. But Paul was not a Greek dualist who despised the body. He was a Jewish thinker, and in Hebrew thought, the physical world is good ('And God saw that it was good,' Genesis 1). Sarx in Paul's usage means the entire self -- body, mind, and emotions -- oriented around ego, self-preservation, and fear. 'Walking according to the sarx' is not about having a body. It is about living as if your survival instinct is all there is. The opposite, 'walking according to the pneuma,' is living from a deeper center -- connected, generous, trusting. It is about orientation, not substance. You do not escape the flesh by denying the body. You transform the flesh by reorienting the self.",
    keyVerses: [
      {
        ref: "Galatians 5:19-21",
        text: "The works of the sarx are evident: hatred, discord, jealousy, fits of rage, selfish ambition, dissensions, factions, envy. -- Note: most of these are mental and social, not physical.",
      },
      {
        ref: "Romans 8:6",
        text: "The mind set on sarx is death, but the mind set on the Spirit is life and peace.",
      },
      {
        ref: "Galatians 5:16",
        text: "Walk by the Spirit, and you will not gratify the desires of the sarx.",
      },
    ],
    whyItMatters:
      "Christianity's war on the body -- its suspicion of pleasure, sexuality, and the physical world -- is built on reading 'sarx' as 'body.' But Paul's list of the 'works of the flesh' is mostly social and psychological: jealousy, rage, faction, envy. The problem is not having a body. The problem is living from ego. Fix the translation, and centuries of body-shame start to unravel.",
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
      "An archery term. Paul was leveling the playing field -- everyone misses, so no one gets to judge. The word carries no moral condemnation, just a call to adjust your aim.",
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
      "The very first public words of Jesus' ministry. Meta (beyond) + nous (mind). Not 'feel guilty' -- 'see everything differently.' The Latin mistranslation to 'repent' turned an awakening into a guilt trip.",
    category: "word",
  },
  {
    id: "sc-3",
    greek: "basileia tou theou",
    transliteration: "basileia tou theou",
    commonTranslation: "Kingdom of God",
    actualMeaning: "The reign/realm of God -- a present reality, not a future destination",
    verse:
      "The kingdom of God is not coming with signs to be observed. For behold, the kingdom of God is within you.",
    verseRef: "Luke 17:20-21",
    context:
      "When the Pharisees asked when the kingdom would arrive, Jesus said it already had -- inside them. Not a place you go when you die. Not a future event to wait for. A reality available right now, already present, already here. 'Entos hymon' -- within you or among you.",
    category: "teaching",
  },
  {
    id: "sc-4",
    greek: "aphiemi",
    transliteration: "aphiemi",
    commonTranslation: "Forgive",
    actualMeaning: "Release / Let go / Send away",
    verse: "Release and you will be released.",
    verseRef: "Luke 6:37",
    context:
      "Apo (away from) + hiemi (to send). A physical action verb: drop the rock, cancel the debt, open the cage. No moral superiority required. The person you release first is always yourself.",
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
      "Greek had a word for truly eternal (aidios) -- the NT almost never uses it. Aionios means 'of the age' or 'age-long.' Eternal life is not about living forever. It is about a quality of knowing and connection available right now, in this age.",
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
      "From the Nag Hammadi library, buried in a sealed jar in Egypt around 400 AD and rediscovered in 1945. Excluded from the Bible by church councils. Attributed to Jesus. The message: what you suppress destroys you; what you express saves you. Inner authenticity as the path.",
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
      "Self-knowledge as the spiritual path. Not blind faith, not obedience to authority -- direct experience and self-understanding. 'When you come to know yourselves' -- the divine encounter starts with seeing yourself clearly, not with believing the right doctrines.",
    category: "gnostic",
  },
  {
    id: "sc-8",
    greek: "teleios",
    transliteration: "teleios",
    commonTranslation: "Perfect",
    actualMeaning: "Complete / Mature / Fully ripened",
    verse:
      "Be complete, therefore, as your heavenly Father is complete.",
    verseRef: "Matthew 5:48",
    context:
      "From 'telos' (goal, purpose). An acorn becoming an oak. Not demanding flawlessness -- inviting you to become the full expression of what you were meant to be. 'Be perfect' is a trap. 'Be complete' is an invitation.",
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
      "Not passivity or weakness. A radical refusal to participate in the cycle of retaliation. 'Eye for an eye' (lex talionis) was already a limit on revenge -- you could not take more than was taken from you. Jesus went further: break the cycle entirely. Stop the chain reaction of harm. The Greek 'me antistenai' means 'do not set yourself against' -- do not mirror the evil.",
    category: "teaching",
  },
  {
    id: "sc-10",
    greek: "gehenna",
    transliteration: "Gehenna",
    commonTranslation: "Hell",
    actualMeaning: "The Valley of Hinnom -- a burning garbage dump outside Jerusalem's walls",
    verse:
      "It is better for you to enter life maimed than to be thrown into the garbage dump.",
    verseRef: "Mark 9:43",
    context:
      "Gei Hinnom -- a literal smoldering dump his audience could see from the city walls. Once a site of child sacrifice to Molech, later the city's burning refuse pit. To be 'thrown in Gehenna' meant to be discarded with no honor. A vivid metaphor for a wasted life, not a supernatural torture realm.",
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
      "The divine is not locked in a building or a book. It is in the grain of the wood, under the rock, in the ordinary labor of your hands. This is panentheism -- God is in all things -- spoken in a first-century Jewish context. The sacred is not separate from the mundane. They are the same thing.",
    category: "gnostic",
  },
  {
    id: "sc-12",
    greek: "ekklesia",
    transliteration: "ekklesia",
    commonTranslation: "Church",
    actualMeaning: "Assembly -- a civic gathering of citizens, not a religious institution",
    verse: "On this rock I will build my assembly.",
    verseRef: "Matthew 16:18",
    context:
      "Ekklesia was a political word for the citizens' assembly in Greek cities -- no religious connotation, no building, no hierarchy. The word 'church' comes from 'kyriakon,' a completely different Greek word that never appears in the original text. Jesus said he was building a community, not an institution.",
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
      "Not about avoiding discernment -- you still need to think clearly. It is about understanding that the lens you use on others will be turned on you. The 'measure' (metron) you apply becomes the standard applied back. Judge harshly, be judged harshly. Show mercy, receive mercy. It is a mirror, not a prohibition.",
    category: "teaching",
  },
  {
    id: "sc-14",
    greek: "dikaiosyne",
    transliteration: "dikaiosyne",
    commonTranslation: "Righteousness",
    actualMeaning: "Justice / Equity / Right relationship",
    verse:
      "Blessed are those who hunger and thirst for justice, for they will be satisfied.",
    verseRef: "Matthew 5:6",
    context:
      "Dikaiosyne meant justice in Greek civic life -- fair courts, equitable society, right dealings. The people hearing this lived under Roman military occupation. They were not hungry for personal holiness. They were hungry for things to be made right. This is a revolutionary political statement, not a devotional suggestion.",
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
      "Jesus said this to a Samaritan woman -- someone his culture told him to avoid (Jews did not associate with Samaritans, and rabbis did not speak publicly with women). He broke two social codes to offer living water to an outsider. The water is not something you come back for weekly. It becomes a spring inside you -- self-sustaining, continuous, yours.",
    category: "teaching",
  },
  {
    id: "sc-16",
    greek: "agape",
    transliteration: "agape",
    commonTranslation: "Love",
    actualMeaning: "Unconditional, deliberate, self-giving love",
    verse:
      "Agape is patient and kind. Agape does not envy or boast. It is not arrogant or rude. It does not insist on its own way.",
    verseRef: "1 Corinthians 13:4-5",
    context:
      "Paul defines agape entirely through actions -- not one definition involves a feeling. Greek had four words for love: eros (desire), philia (friendship), storge (family), agape (unconditional commitment). English collapses all four into one word. Agape is a verb before it is a noun. Something you do, not something you fall into.",
    category: "word",
  },
  {
    id: "sc-17",
    greek: "pistis",
    transliteration: "pistis",
    commonTranslation: "Faith",
    actualMeaning: "Trust / Loyalty / Relational confidence",
    verse:
      "Now trust is the substance of things hoped for, the evidence of things not seen.",
    verseRef: "Hebrews 11:1",
    context:
      "Pistis was a relational word -- the trust between business partners, the loyalty of a soldier, the reliability of a friend. Not blind belief without evidence, but confidence based on proven character. The entire concept of 'faith versus reason' would not have made sense to a Greek speaker. Pistis was reasonable trust.",
    category: "word",
  },
  {
    id: "sc-18",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "His disciples said to him, 'When will the kingdom come?' Jesus said, 'It will not come by waiting for it. It will not be a matter of saying Here it is or There it is. Rather, the kingdom of the Father is spread out upon the earth, and people do not see it.'",
    verseRef: "Gospel of Thomas, Saying 113",
    context:
      "The kingdom is not coming. It is already here. The problem is perception, not timing. You do not need to wait for a future event or travel to a special place. You need new eyes. This matches Luke 17:21 but pushes further -- it is literally spread out on the earth, right under your feet, and you are missing it.",
    category: "gnostic",
  },
  {
    id: "sc-19",
    greek: "doulos",
    transliteration: "doulos",
    commonTranslation: "Servant",
    actualMeaning: "Slave -- a person with no legal autonomy",
    verse:
      "He emptied himself, taking the form of a slave, being born in human likeness.",
    verseRef: "Philippians 2:7",
    context:
      "Doulos means slave, not servant. A servant can quit; a slave cannot. Paul says God took the lowest social position in the Roman world. English translations soften this to 'servant' and lose the scandal: the divine becoming the owned, the powerless, the legally nonexistent. In an empire where 30-40% of the population were slaves, this was a radical claim about where God shows up.",
    category: "word",
  },
  {
    id: "sc-20",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.",
    verseRef: "Matthew 25:40",
    context:
      "The sheep and goats parable. The criteria for judgment? Not doctrine. Not worship attendance. Not which creed you affirmed. Did you feed the hungry? Visit the prisoner? Clothe the naked? The 'goats' are shocked because they never recognized the divine in the desperate. Jesus locates himself in the marginalized, not in the temple.",
    category: "teaching",
  },
  {
    id: "sc-21",
    greek: "teleios",
    transliteration: "teleios",
    commonTranslation: "Perfect",
    actualMeaning: "Complete, mature, having reached the intended end -- like a ripe fruit",
    verse:
      "Be teleios, therefore, as your heavenly Father is teleios.",
    verseRef: "Matthew 5:48",
    context:
      "The most misquoted verse in the Sermon on the Mount. 'Be perfect' has paralyzed millions of people with impossible standards. But teleios means having reached your telos -- your intended purpose or full maturity. A ripe apple is teleios. A grown tree is teleios. It's about becoming fully what you were designed to be, not about making zero mistakes. God's 'perfection' here isn't flawlessness -- it's wholeness, completeness, being fully expressed. Jesus isn't demanding the impossible. He's inviting growth.",
    category: "word",
  },
  {
    id: "sc-22",
    greek: "sozo",
    transliteration: "sozo",
    commonTranslation: "Save (as in salvation)",
    actualMeaning: "To make whole, to heal, to restore to full function",
    verse:
      "Your faith has made you whole.",
    verseRef: "Mark 5:34",
    context:
      "When Jesus heals the woman with the hemorrhage, the Greek says 'he sozo'd her' -- the same word used for 'salvation.' But sozo doesn't mean rescue from damnation. It means to make whole, to heal, to restore. The same word is used for physical healing and spiritual restoration because the ancients didn't separate them. 'Salvation' in the original language isn't about escaping hell. It's about being restored to wholeness -- body, mind, community, and relationship with the divine. English translations split sozo into 'heal' (for physical contexts) and 'save' (for spiritual contexts), creating a false division the Greek never intended.",
    category: "word",
  },
  {
    id: "sc-23",
    greek: "pistis",
    transliteration: "pistis",
    commonTranslation: "Faith (belief, mental assent)",
    actualMeaning: "Trust, loyalty, faithfulness -- a relational commitment, not intellectual agreement",
    verse:
      "The righteous shall live by faithfulness.",
    verseRef: "Habakkuk 2:4 / Romans 1:17",
    context:
      "Modern Christianity often defines faith as believing certain propositions are true ('I believe Jesus rose from the dead'). But pistis in Koine Greek -- and its Hebrew equivalent emunah -- meant something closer to trust, loyalty, and steadfastness. A soldier had pistis toward their commander. A wife had pistis toward her husband. It was relational fidelity, not intellectual agreement. 'Faith' as 'correct beliefs' is a post-Enlightenment reframe. The biblical concept is closer to: 'Do you trust this enough to act on it?' rather than 'Do you believe this is factually true?'",
    category: "word",
  },
  {
    id: "sc-24",
    greek: "kosmos",
    transliteration: "kosmos",
    commonTranslation: "World (as in sinful human society)",
    actualMeaning: "The ordered system, the arranged whole -- originally meant beauty and adornment",
    verse:
      "For God so loved the kosmos that he gave his only Son.",
    verseRef: "John 3:16",
    context:
      "Kosmos originally meant adornment, arrangement, and beauty (it's where we get 'cosmetics'). When Greek thinkers used it for the universe, they meant 'the beautiful arrangement.' John's Gospel uses kosmos in a complex, layered way: sometimes it means the created order (which God loves), sometimes it means the systems of power opposed to God. In John 3:16, the most famous verse in Christianity, kosmos means the entire created order -- all of it, not just believers, not just humans. God loves the whole beautiful arrangement. The popular reading that God loves 'the sinful world despite itself' misses the original nuance: God loves the cosmos because it is beautiful, not despite it being fallen.",
    category: "word",
  },
  {
    id: "sc-25",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "The kingdom of God is not coming with signs to be observed; nor will they say, 'Look, here it is!' or 'There!' For behold, the kingdom of God is within you.",
    verseRef: "Luke 17:20-21",
    context:
      "The Pharisees ask Jesus WHEN the kingdom comes. He refuses the question. It's not a future event to watch for. It's not a place you go. It's already here, 'within you' or 'among you' (the Greek entos hymon supports both readings). Either way, the kingdom is present and interior/relational, not future and political. This verse has been a problem for apocalyptic Christianity ever since -- it's hard to sell End Times urgency when Jesus himself said the kingdom isn't about observable future signs.",
    category: "teaching",
  },
  {
    id: "sc-26",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "When you make the two into one, and when you make the inner like the outer and the outer like the inner, and the upper like the lower... then you will enter the kingdom.",
    verseRef: "Gospel of Thomas, Saying 22",
    context:
      "The Gospel of Thomas -- found at Nag Hammadi in 1945 -- presents a radically different Jesus. No crucifixion narrative, no resurrection, no apocalypse. Just 114 sayings. This one describes the kingdom as a state of integrated consciousness: inner and outer unified, above and below reconciled, male and female transcended. It reads more like Buddhist or Vedantic teaching than Pauline Christianity. Some scholars date Thomas's core sayings to the 50s-60s CE -- potentially earlier than the canonical Gospels. Whether or not it's 'authentic Jesus,' it shows an early strand of Christian thought that was contemplative, non-dualistic, and deeply mystical.",
    category: "gnostic",
  },
  {
    id: "sc-27",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "If those who lead you say to you, 'See, the kingdom is in the sky,' then the birds will get there before you. If they say, 'It is in the sea,' then the fish will get there before you. Rather, the kingdom is inside you and outside you.",
    verseRef: "Gospel of Thomas, Saying 3",
    context:
      "Thomas's Jesus uses humor and irony. If the kingdom is up in the sky, birds are closer. If it's in the sea, fish beat you there. The point: stop looking for the divine in some other location. It's here, now, inside and outside simultaneously. This is strikingly similar to the canonical Luke 17:21 but goes further: the kingdom isn't just 'within you' -- it's both interior and exterior, collapsing the boundary between self and world. This nondual vision was threatening to institutional religion, which needs the kingdom to be somewhere else -- somewhere that requires their mediation to access.",
    category: "gnostic",
  },
  {
    id: "sc-28",
    greek: "paradosis",
    transliteration: "paradosis",
    commonTranslation: "Tradition",
    actualMeaning: "What is handed over -- the same word used for Judas 'betraying' Jesus",
    verse:
      "You have a fine way of setting aside the commands of God in order to observe your own traditions.",
    verseRef: "Mark 7:9",
    context:
      "The Greek paradosis (handing over, tradition) is the same root word used for Judas 'handing over' (paradidomi) Jesus to the authorities. Mark's irony is devastating: religious tradition -- the very thing meant to preserve faith -- becomes the mechanism of betrayal. The Pharisees 'hand over' God's intent by elevating human tradition above it. Jesus consistently attacks not the Torah itself but the interpretive traditions layered on top that benefit the powerful at the expense of the vulnerable. The target is always institutional religion replacing direct encounter with divine intention.",
    category: "word",
  },
  {
    id: "sc-29",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "The Sabbath was made for man, not man for the Sabbath.",
    verseRef: "Mark 2:27",
    context:
      "One of the most revolutionary principles Jesus stated. Religious structures exist to serve human flourishing -- not the other way around. When a rule causes harm instead of helping, the rule is wrong, not the human. This inverts the entire framework of religious legalism. The institution serves the person, never the person the institution. Jesus stated this in response to criticism about his disciples picking grain on the Sabbath. The defenders of the system couldn't see that their system had become the very thing it was designed to prevent: a burden on the people it was meant to liberate.",
    category: "teaching",
  },
  {
    id: "sc-30",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "Woe to you, teachers of the law and Pharisees, you hypocrites! You shut the door of the kingdom of heaven in people's faces. You yourselves do not enter, nor will you let those enter who are trying to.",
    verseRef: "Matthew 23:13",
    context:
      "Jesus's most sustained critique in the Gospels -- the 'Seven Woes' -- targets religious gatekeepers. The charge: they've taken the keys to the kingdom and locked the door. They don't go in themselves (they've replaced direct experience with performance), and they prevent others from entering (through guilt, rules, and institutional control). The word 'hypocrites' in Greek is hypokrites -- literally 'stage actors,' people wearing masks. The accusation isn't moral hypocrisy (saying one thing, doing another). It's theatrical religiosity: performing devotion for an audience instead of actually living it.",
    category: "teaching",
  },
];
