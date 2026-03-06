// Scripture data for The Well
// Word corrections are now in src/lib/words/ -- re-exported here for backward compatibility
export { wordCorrections } from "./words";
export type { WordCorrection } from "./words";

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
  {
    id: "sc-31",
    greek: "ekklesia",
    transliteration: "ekklesia",
    commonTranslation: "Church",
    actualMeaning: "Assembly / Gathering of citizens",
    verse:
      "On this rock I will build my ekklesia, and the gates of Hades will not overcome it.",
    verseRef: "Matthew 16:18",
    context:
      "Ekklesia was a political term, not a religious one. In Greek city-states, the ekklesia was the assembly of citizens who gathered to make decisions. It had no connection to buildings, clergy, or institutions. When Jesus said he would build his ekklesia, his listeners heard: 'I'm building an alternative assembly -- a new political community.' Translating this as 'church' imports 2,000 years of institutional baggage into a word that originally meant 'people gathered for a purpose.' The gates of Hades (death) 'not prevailing' against it isn't about a building surviving -- it's about a community that death itself cannot disband.",
    category: "word",
  },
  {
    id: "sc-32",
    greek: "doulos",
    transliteration: "doulos",
    commonTranslation: "Servant",
    actualMeaning: "Slave",
    verse:
      "Paul, a doulos of Christ Jesus, called to be an apostle.",
    verseRef: "Romans 1:1",
    context:
      "English Bibles almost universally soften doulos to 'servant' or 'bondservant.' The word means slave. Paul calls himself a slave of Christ -- total ownership, no autonomy, no exit. This was not metaphorical prettiness. In the Roman Empire, roughly 1 in 3 people were enslaved. Paul's readers knew exactly what the word meant. By calling himself Christ's slave, Paul was making a radical identity claim: his primary allegiance belonged to Jesus, not to Rome, not to the synagogue, not to himself. The softening of 'slave' to 'servant' obscures both the radical nature of the claim and the uncomfortable reality that the New Testament world was built on slavery.",
    category: "word",
  },
  {
    id: "sc-33",
    greek: "skandalon",
    transliteration: "skandalon",
    commonTranslation: "Stumbling block / Offense",
    actualMeaning: "Trigger of a trap / Bait-stick",
    verse:
      "We preach Christ crucified, a skandalon to Jews and foolishness to Gentiles.",
    verseRef: "1 Corinthians 1:23",
    context:
      "A skandalon was the bait-stick of a trap -- the trigger that, when touched, springs the mechanism. Paul says the cross is a skandalon: it triggers people. For Jews expecting a conquering messiah, a crucified one was not just disappointing but offensive -- cursed by God (Deuteronomy 21:23). For Greeks who valued wisdom and power, execution by the state was the ultimate failure. The cross is designed to offend every human system of value. It is not a stumbling block you accidentally trip over. It is a trap-trigger that forces you to decide: either this changes everything about how you understand power, or you reject it entirely. There is no neutral response.",
    category: "word",
  },
  {
    id: "sc-34",
    greek: "paraclete",
    transliteration: "parakletos",
    commonTranslation: "Comforter / Helper",
    actualMeaning: "Advocate / One called alongside (legal counsel)",
    verse:
      "I will ask the Father, and he will give you another parakletos to be with you forever.",
    verseRef: "John 14:16",
    context:
      "Parakletos is a legal term: someone called to stand beside you in court. A defense attorney. An advocate. 'Comforter' (from the King James Version) makes the Holy Spirit sound like a warm blanket. The original word makes the Spirit sound like a lawyer. The Spirit's role, in John's theology, is to defend, guide, remind, convict, and testify -- active legal work, not passive emotional support. The Spirit 'will guide you into all truth' (16:13) and 'will testify about me' (15:26). This is advocacy language. The Spirit is your counsel in the cosmic trial between truth and deception.",
    category: "word",
  },
  {
    id: "sc-35",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "The eye is the lamp of the body. If your eye is single, your whole body will be full of light.",
    verseRef: "Matthew 6:22",
    context:
      "Most translations say 'if your eye is healthy' or 'good.' The Greek word is haplous -- meaning single, simple, undivided. The opposite is diplous (double). Jesus is not giving an ophthalmology lesson. He's talking about focus -- single-mindedness versus divided attention. This saying sits between the teaching on treasure ('where your treasure is, your heart will be') and the teaching on serving two masters ('you cannot serve God and Money'). The 'single eye' is unified intention. A person whose eye is 'single' sees everything from one perspective: reality as it is. A 'double' eye tries to see two ways at once -- and ends up in darkness. The context is money, but the principle is about all divided loyalties.",
    category: "teaching",
  },
  {
    id: "sc-36",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "Truly I tell you, unless you change and become like little children, you will never enter the kingdom of heaven.",
    verseRef: "Matthew 18:3",
    context:
      "This is not about innocence or naivety. In the ancient world, children had no social status, no legal rights, no power. They were the lowest members of the household. When the disciples asked 'who is greatest in the kingdom?' -- a status question -- Jesus put a child in front of them and said: become like this. The answer to 'who is greatest?' is: the one with no status at all. The kingdom reversal is total. It isn't about childlike wonder (a modern romantic notion). It's about surrendering the entire status game. You enter the kingdom by giving up your claim to greatness, not by achieving it.",
    category: "teaching",
  },
  {
    id: "sc-37",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "Jesus said: If your leaders say to you, 'Look, the kingdom is in the sky,' then the birds of the sky will precede you. Rather, the kingdom is inside of you, and it is outside of you.",
    verseRef: "Gospel of Thomas, Saying 3",
    context:
      "This saying directly challenges externalized religion. If someone points you to the sky (heaven after death) or to any external location, they are misdirecting you. The kingdom is simultaneously within and without -- not located in a place but present as a mode of perception. 'When you come to know yourselves, then you will become known.' Self-knowledge and kingdom-knowledge are the same thing. The Gnostic framework sees ignorance (of one's divine nature) as the fundamental problem -- not sin, not disobedience, but forgetting who you are. Waking up IS salvation.",
    category: "gnostic",
  },
  {
    id: "sc-38",
    greek: "dunamis",
    transliteration: "dynamis",
    commonTranslation: "Power / Miracle",
    actualMeaning: "Inherent capacity / Explosive potential",
    verse:
      "You will receive dynamis when the Holy Spirit comes upon you.",
    verseRef: "Acts 1:8",
    context:
      "Dynamis is the root of 'dynamite.' But it doesn't mean destructive force -- it means inherent capacity, the power that something has by its nature. A seed has dynamis to become a tree. The word is used for Jesus' healings ('dynameis' -- acts of power) not because they are supernatural spectacles but because they reveal the inherent capacity of reality when aligned with God. The promise in Acts 1:8 is not that the disciples will get supernatural abilities bolted on. It is that they will discover the capacity that was already latent within them, activated by the Spirit. This is closer to 'you will discover what you are capable of' than 'you will receive magic powers.'",
    category: "word",
  },
  {
    id: "sc-39",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "For where two or three gather in my name, there am I with them.",
    verseRef: "Matthew 18:20",
    context:
      "This verse is usually quoted to validate small gatherings ('even if only a few people show up, God is here'). The original context is different. Matthew 18 is about conflict resolution within the community. The preceding verses describe a process: if someone wrongs you, go to them directly, then bring witnesses, then bring it to the assembly. The 'two or three gathered' are not a worship service -- they are a reconciliation process. Christ is present specifically in the work of honest confrontation and resolution. The promise is not 'I'm present in small churches.' It's 'I'm present when you do the hard work of making things right with each other.'",
    category: "teaching",
  },
  {
    id: "sc-40",
    greek: "logos",
    transliteration: "logos",
    commonTranslation: "Word",
    actualMeaning: "Reason / Pattern / Organizing principle of reality",
    verse:
      "In the beginning was the Logos, and the Logos was with God, and the Logos was God.",
    verseRef: "John 1:1",
    context:
      "Logos is one of the most loaded words in the ancient world. In Greek philosophy (Heraclitus, the Stoics), Logos was the rational principle underlying all reality -- the pattern that holds the universe together. In Judaism, it connected to the Wisdom tradition (Proverbs 8) where Wisdom was present at creation, and to the idea that God creates through speech ('God said, let there be light'). John's opening deliberately echoes Genesis 1:1 ('In the beginning...') while importing the entire Greek philosophical tradition. The claim is staggering: the rational structure of the universe, the principle by which everything coheres, became a human person. Translating Logos as simply 'Word' loses the cosmic scope. This is not about a vocabulary item. It's about the organizing intelligence of reality taking on flesh.",
    category: "word",
  },
  {
    id: "sc-41",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "Jesus said: If those who lead you say to you, 'See, the Kingdom is in the sky,' then the birds of the sky will precede you. If they say to you, 'It is in the sea,' then the fish will precede you. Rather, the Kingdom is inside of you, and it is outside of you.",
    verseRef: "Gospel of Thomas, Saying 3",
    context:
      "The Gospel of Thomas, discovered at Nag Hammadi in 1945, preserves 114 sayings attributed to Jesus with no narrative framework. This saying directly challenges any religion that locates the divine exclusively in an afterlife or external location. The Kingdom is not a place you go to after you die. It is a mode of awareness available now, both within human consciousness and in the world around you. This parallels Luke 17:21 ('the kingdom of God is within/among you') but goes further: 'When you come to know yourselves, then you will become known.' Self-knowledge is the path to divine encounter. Whether or not Thomas preserves Jesus's actual words, this saying represents an early strand of Christian thought where inner transformation, not institutional belonging, was the point.",
    category: "gnostic",
  },
  {
    id: "sc-42",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "Jesus said: I am the light that is over all things. I am all. From me all came forth, and to me all attained. Split a piece of wood; I am there. Lift up the stone, and you will find me there.",
    verseRef: "Gospel of Thomas, Saying 77",
    context:
      "This is one of the most striking sayings in Thomas and one of the most theologically radical. The divine is not confined to temples, churches, or sacred spaces. It pervades all matter -- wood, stone, everything. This is not pantheism ('everything is God') but panentheism ('God is in everything'). The claim echoes Colossians 1:17 ('in him all things hold together') and Acts 17:28 ('in him we live and move and have our being') but makes it viscerally physical. You do not need to go somewhere special to encounter the sacred. The ordinary material world is already saturated with it. Every piece of wood you split, every stone you lift. The implication is that the sacred/secular divide -- the idea that some spaces are holy and others are not -- is a human invention, not a divine one.",
    category: "gnostic",
  },
  {
    id: "sc-43",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "His disciples said to him: When will the rest for the dead take place, and when will the new world come? He said to them: What you look for has already come, but you do not recognize it.",
    verseRef: "Gospel of Thomas, Saying 51",
    context:
      "The disciples ask the standard apocalyptic question: when does the future Kingdom arrive? When do the dead rise? Jesus redirects entirely: it is already here. You are already in it. You just cannot see it. This parallels the canonical 'the kingdom of God has come near' (Mark 1:15) but is more direct. There is no future event to wait for. The transformation the disciples are looking for is already available -- the problem is perception, not timing. This saying undermines any Christianity built primarily around waiting for a future event (Second Coming, Rapture, afterlife). If what you are looking for has already come, then the spiritual task is not patience or belief in future events -- it is learning to see what is already present.",
    category: "gnostic",
  },
  {
    id: "sc-44",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "You have heard that it was said, 'Eye for eye, and tooth for tooth.' But I tell you, do not resist an evil person. If anyone slaps you on the right cheek, turn to them the other cheek also.",
    verseRef: "Matthew 5:38-39",
    context:
      "This is almost universally read as a command to be passive: let people hurt you, do not fight back, be a doormat. The historical context reveals something entirely different. In the ancient Near East, a slap to the right cheek (delivered with the back of the right hand) was not an act of violence -- it was a gesture of dominance used by a superior toward an inferior (master to slave, Roman to Jew). Turning the other cheek forces the aggressor to use the open palm or fist, which are strikes between equals. The act is not passive submission -- it is a refusal to accept the inferior position. It says: 'You will not treat me as less than human. Hit me as an equal or do not hit me at all.' This is nonviolent resistance, not nonresistance. Jesus is teaching people without power how to reclaim their dignity within an oppressive system -- not telling them to accept abuse.",
    category: "teaching",
  },
  {
    id: "sc-45",
    greek: "",
    transliteration: "",
    commonTranslation: "",
    actualMeaning: "",
    verse:
      "Again I tell you, it is easier for a camel to go through the eye of a needle than for someone who is rich to enter the kingdom of God.",
    verseRef: "Matthew 19:24",
    context:
      "For centuries, preachers have tried to soften this saying. The most famous attempt: 'The Eye of the Needle was a small gate in Jerusalem's wall that a camel could squeeze through if it knelt down and removed its baggage.' This gate never existed. There is zero archaeological or historical evidence for it. The explanation was invented in the 9th century to make wealthy Christians feel better. Jesus's original audience would have heard exactly what it sounds like: an impossibility. Camels do not fit through needle eyes. That is the point. The saying is hyperbolic, yes -- but the hyperbole points in a clear direction. Wealth creates attachment. Attachment prevents the radical letting-go that entering the Kingdom requires. The reaction of the disciples confirms this reading -- they are 'greatly astonished' and ask 'Who then can be saved?' They understood the claim as extreme. Later theology domesticated it. Jesus did not.",
    category: "teaching",
  },
  {
    id: "sc-46",
    greek: "χάρις",
    transliteration: "charis",
    commonTranslation: "Grace (unmerited favor)",
    actualMeaning: "Gift-giving generosity -- the natural overflow of abundance",
    verse:
      "For by charis you have been made whole through trust -- and this not from yourselves, it is the gift of God.",
    verseRef: "Ephesians 2:8-9",
    context:
      "The emphasis in 'unmerited favor' falls on your unworthiness: you do not deserve this. The emphasis in the original charis falls on the giver's abundance: this is what generosity looks like. One makes you feel small. The other makes the source look magnificent. Charis operated in a gift economy -- a patron gives generously, the recipient responds with gratitude. Not debt and payment. Overflow.",
    category: "word",
  },
  {
    id: "sc-47",
    greek: "κόλασις",
    transliteration: "kolasis",
    commonTranslation: "Punishment",
    actualMeaning: "Corrective pruning -- a gardening term for cutting back what is dead so the plant can flourish",
    verse:
      "And these will go away into age-long correction, but the righteous into age-long life.",
    verseRef: "Matthew 25:46",
    context:
      "Aristotle drew a clear distinction: timoria is retribution (punishment for the punisher's satisfaction). Kolasis is correction (applied for the sake of the one receiving it, aimed at restoration). The New Testament chose the corrective word. A God who punishes is settling scores. A God who prunes is tending a garden. The goal is flourishing, not suffering.",
    category: "word",
  },
  {
    id: "sc-48",
    greek: "ἀπόλλυμι",
    transliteration: "apollymi",
    commonTranslation: "Perish (be destroyed)",
    actualMeaning: "To be lost, to wander away -- not annihilated, but separated from where you belong",
    verse:
      "For the Son of Man came to seek and to save the lost.",
    verseRef: "Luke 19:10",
    context:
      "Jesus uses this same word for the lost sheep, the lost coin, the lost son. In every parable, what is apollymi is found and restored. The word does not mean obliteration. It means being in the wrong place, unable to find your way back. The shepherd goes after what is lost precisely because lost is not the same as gone forever.",
    category: "word",
  },
];
