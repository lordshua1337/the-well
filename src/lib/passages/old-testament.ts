import type { PassageDossier } from "../passage-types";

export const otDossiers: readonly PassageDossier[] = [
  // -------------------------------------------------------
  // GENESIS
  // -------------------------------------------------------
  {
    id: "gen-1-26-28",
    priority: "P1",
    passage: "Genesis 1:26-28",
    commonQuoteForm: "Have dominion\u2026subdue",
    context: {
      historicalLinguistic: `"Dominion" is tied to humanity as God's image, implying representative \
stewardship not exploitation. Humanity is God's image-bearer \u2014 the authority \
is delegated and accountable.`,
      keyTerms: [
        {
          original: "\u05E8\u05B8\u05D3\u05B8\u05D4",
          transliteration: "radah",
          language: "hebrew",
          glossRange: "rule, have dominion, tread down",
          significance:
            "Has a range \u2014 can mean careful governance or harsh treading. Context of image-bearing points to stewardship.",
        },
      ],
      translationIssues: `"Dominion" in English sounds like domination. The Hebrew carries a range \
that includes shepherding-style rule, not just conquest.`,
    },
    misuses: {
      types: ["semantic-narrowing", "weaponization"],
      description:
        "Used to justify ecological exploitation, domination politics, or 'strong rule' as inherently godly.",
      concreteExamples:
        "Cited to dismiss environmental stewardship. Used in political rhetoric to frame aggressive leadership as biblical mandate.",
    },
    loveImpact:
      "Makes God's image look like conquest, not care. People who've been dominated see God as endorsing their oppression.",
    clarifiedReading: {
      reframe:
        "God gives authority as accountable service. Image-bearing means stewardship that protects life.",
      appResponse:
        "Being made in God's image means carrying his care into the world \u2014 not exploiting it. Authority in Scripture looks like a shepherd, not a conqueror.",
    },
  },

  {
    id: "gen-2-18",
    priority: "P1",
    passage: "Genesis 2:18",
    commonQuoteForm: "Helper",
    context: {
      historicalLinguistic: `The word translated "helper" is used elsewhere in the OT to describe God \
himself as helper. It does not imply inferiority or subordination.`,
      keyTerms: [
        {
          original: "\u05E2\u05B5\u05D6\u05B6\u05E8",
          transliteration: "ezer",
          language: "hebrew",
          glossRange: "help, succor, one who helps",
          significance:
            "Used of God in Psalms (e.g., Ps 33:20, 70:5). Describes strength brought to a situation, not servitude.",
        },
      ],
      translationIssues: `English "helper" sounds like assistant or subordinate. Hebrew ezer describes \
a corresponding partner who brings strength \u2014 not a junior role.`,
    },
    misuses: {
      types: ["translation-trap", "weaponization"],
      description:
        "Reducing women to assistants or spiritual minors based on one English word.",
      concreteExamples:
        "Used in complementarian arguments to establish fixed hierarchy. Cited in counseling to tell women their role is support-only.",
    },
    loveImpact:
      "Turns partnership into hierarchy and blocks mutual love. Women internalize lesser-than identity as 'biblical.'",
    clarifiedReading: {
      reframe:
        "'A partner corresponding to him' \u2014 not a subordinate. God addresses loneliness with mutuality.",
      appResponse:
        "The word ezer is used of God himself as Israel's helper. It means strength brought alongside \u2014 a partner, not a servant. God's design is mutuality, not hierarchy.",
    },
  },

  {
    id: "gen-3-16",
    priority: "P1",
    passage: "Genesis 3:16",
    commonQuoteForm: "Your desire\u2026he will rule",
    context: {
      historicalLinguistic: `Describes fractured relational dynamics after the fall \u2014 not a divine ideal \
or command for how relationships should work.`,
      keyTerms: [
        {
          original: "\u05EA\u05B0\u05E9\u05C1\u05D5\u05BC\u05E7\u05B8\u05D4",
          transliteration: "teshuqah",
          language: "hebrew",
          glossRange: "longing, desire, urge",
          significance:
            "Debated \u2014 could be desire toward or desire to control. Either way, it describes brokenness, not prescription.",
        },
        {
          original: "\u05DE\u05B8\u05E9\u05C1\u05B7\u05DC",
          transliteration: "mashal",
          language: "hebrew",
          glossRange: "rule, have dominion, govern",
          significance:
            "Describes what WILL happen in fallen reality, not what SHOULD happen.",
        },
      ],
      translationIssues: `English makes it sound like a command ("he will rule over you"). Hebrew \
describes a consequence of the fall \u2014 diagnosis, not prescription.`,
    },
    misuses: {
      types: ["weaponization", "genre-confusion"],
      description:
        "'God ordained male domination' or 'women's desire = manipulative control.'",
      concreteExamples:
        "Used in marriage counseling to normalize unilateral authority. Cited to frame women's agency as sinful desire for control.",
    },
    loveImpact:
      "Sanctifies imbalance and normalizes harm. Makes God appear to endorse domination as design.",
    clarifiedReading: {
      reframe:
        "This is diagnosis of brokenness, not a command. Redemption moves relationships toward mutual honor and love.",
      appResponse:
        "Genesis 3:16 describes what went wrong, not what God wants. The fall fractured relationships. Redemption restores them toward mutual honor \u2014 not domination.",
    },
  },

  {
    id: "gen-9-25-27",
    priority: "P1",
    passage: "Genesis 9:25-27",
    commonQuoteForm: "Curse of Ham",
    context: {
      historicalLinguistic: `The curse targets Canaan specifically, not a blanket racial group. NET notes \
highlight the historical-link logic within the narrative \u2014 not racial destiny.`,
      keyTerms: [],
      translationIssues: `The text curses Canaan (a specific descendant), not Ham broadly. Mapping \
this onto modern ethnic groups requires eisegesis that the text does not support.`,
    },
    misuses: {
      types: ["weaponization", "audience-shift"],
      description:
        "Used historically to justify slavery and racism by mapping descendants onto modern ethnic groups.",
      concreteExamples:
        "Cited extensively in pro-slavery theology. Still surfaces in white supremacist and Christian nationalist rhetoric.",
    },
    loveImpact:
      "Makes Scripture a tool of oppression, severing trust in God's goodness for anyone targeted by this reading.",
    clarifiedReading: {
      reframe:
        "The text is not a racial hierarchy charter. Racialized readings are a misuse of the passage.",
      appResponse:
        "The curse in Genesis 9 targets Canaan specifically within a narrative context. It has been catastrophically misused to justify racism and slavery. That reading is not in the text \u2014 it was imposed on it.",
    },
  },

  {
    id: "gen-12-3",
    priority: "P1",
    passage: "Genesis 12:3",
    commonQuoteForm: "Bless those who bless you",
    context: {
      historicalLinguistic: `Spoken to Abram within covenant promise, before "Israel" as a nation exists. \
The blessing theme aims at "all families of the earth" \u2014 universal scope.`,
      keyTerms: [],
      translationIssues: `"Bless/curse" language in covenant context functions differently than modern \
transactional blessing. The trajectory is toward universal blessing, not \
partisan loyalty tests.`,
    },
    misuses: {
      types: ["covenant-transfer", "verse-isolation"],
      description:
        "Used to mandate modern foreign policy or nationalist agendas.",
      concreteExamples:
        "Cited in U.S. political debate to frame specific foreign policy positions as biblically mandatory.",
    },
    loveImpact:
      "Makes God's love feel partisan and transactional \u2014 contingent on geopolitical alignment.",
    clarifiedReading: {
      reframe:
        "God's covenant purposes move toward blessing all nations. Apply as hospitality, anti-antisemitism, and peacemaking \u2014 not policy slogans.",
      appResponse:
        "God's promise to Abraham bends toward blessing all nations. Using it as a foreign policy proof-text flattens a covenant that's meant to expand love, not restrict it.",
    },
  },

  // -------------------------------------------------------
  // EXODUS
  // -------------------------------------------------------
  {
    id: "exod-20-13",
    priority: "P1",
    passage: "Exodus 20:13",
    commonQuoteForm: "Thou shalt not kill",
    context: {
      historicalLinguistic: `The Hebrew verb specifically targets unauthorized taking of human life \u2014 not \
every possible category of killing.`,
      keyTerms: [
        {
          original: "\u05E8\u05B8\u05E6\u05B7\u05D7",
          transliteration: "ratsakh",
          language: "hebrew",
          glossRange: "murder, slay (unlawfully)",
          significance:
            "Narrower than English 'kill.' Refers to criminal/unauthorized killing. Other Hebrew verbs cover warfare, execution, etc.",
        },
      ],
      translationIssues: `"Kill" in English is absolute. Hebrew ratsakh is a specific category \u2014 \
unlawful/criminal killing. The command affirms sanctity of life while \
leaving moral reasoning space for complex cases.`,
    },
    misuses: {
      types: ["translation-trap", "semantic-narrowing"],
      description:
        "Polarized ethics debates that treat the verse as one-word absolutism without categories.",
      concreteExamples:
        "Used as a blanket argument in capital punishment, warfare, and self-defense debates without engaging the Hebrew distinction.",
    },
    loveImpact:
      "Turns moral complexity into shame or ideology warfare. People feel condemned for any position.",
    clarifiedReading: {
      reframe:
        "The command teaches the sanctity of life and forbids criminal violence. Moral reasoning remains necessary.",
      appResponse:
        "The Hebrew word here is ratsakh \u2014 unlawful killing, not every form of taking life. The command protects the sanctity of human life. It doesn't eliminate the need for moral discernment in complex situations.",
    },
  },

  {
    id: "exod-21-24-25",
    priority: "P1",
    passage: "Exodus 21:24-25",
    commonQuoteForm: "Eye for eye",
    context: {
      historicalLinguistic: `Lex talionis functions as measured justice in a legal setting \u2014 it LIMITS \
retaliation to proportional response. It's a ceiling, not a floor.`,
      keyTerms: [],
      translationIssues: `English "eye for an eye" sounds like a revenge mandate. In ANE legal \
context, it was revolutionary restraint \u2014 you can't escalate beyond the harm done.`,
    },
    misuses: {
      types: ["genre-confusion", "verse-isolation"],
      description:
        "'Bible commands revenge' or using it to reject Jesus' teaching in Matthew 5.",
      concreteExamples:
        "Cited as evidence the OT God is cruel. Used to justify personal retaliation. Also used to create OT vs NT conflict.",
    },
    loveImpact:
      "Paints God as endorsing cruelty rather than restraint.",
    clarifiedReading: {
      reframe:
        "This is legal proportionality, not personal vengeance. Jesus presses disciples beyond retaliation into love-shaped responses.",
      appResponse:
        "Eye for eye was a legal limit \u2014 you can't escalate beyond the harm done. It's a ceiling on revenge, not an endorsement of it. Jesus takes it further: move past retaliation entirely into creative love.",
    },
  },

  // -------------------------------------------------------
  // LEVITICUS
  // -------------------------------------------------------
  {
    id: "lev-18-22",
    priority: "P1",
    passage: "Leviticus 18:22",
    commonQuoteForm: "Abomination",
    context: {
      historicalLinguistic: `Part of Israel's holiness code, framed by identity, worship, and boundary-\
setting in an ancient Near Eastern context. NET renders "detestable act."`,
      keyTerms: [],
      translationIssues: `"Abomination" in English carries absolute moral horror. The Hebrew \
toevah has a range that includes ritual/cultural boundary violations. \
Genre and context must govern interpretation.`,
    },
    misuses: {
      types: ["verse-isolation", "weaponization"],
      description:
        "Either used as a blunt weapon against LGBTQ+ people, or dismissed entirely without genre/context work.",
      concreteExamples:
        "Cited on protest signs. Used to justify rejection of individuals. Conversely, dismissed with 'that's just the OT' without serious engagement.",
    },
    loveImpact:
      "Weaponization yields shame and fear, not love-driven holiness. People experience God as hostile.",
    clarifiedReading: {
      reframe:
        "Treat as law-text with careful context, canonical reading, and pastoral restraint. Do not use as a cudgel or slogan.",
      appResponse:
        "This verse sits inside Israel's holiness code in an ancient Near Eastern context. It requires careful, honest engagement \u2014 not sloganeering in either direction. The Well doesn't weaponize Scripture against people.",
    },
  },

  {
    id: "lev-19-18",
    priority: "P1",
    passage: "Leviticus 19:18",
    commonQuoteForm: "Love your neighbor",
    context: {
      historicalLinguistic: `Sits inside justice commands (Lev 19:15-18) \u2014 not a standalone sentiment \
but embedded in concrete ethical instructions about fairness, dignity, \
and non-vengeance.`,
      keyTerms: [],
      translationIssues: `"Love" in English sounds like a feeling. In this context, love is enacted \
fairness, dignity, and refusal of vengeance \u2014 it's behavioral.`,
    },
    misuses: {
      types: ["verse-isolation", "semantic-narrowing"],
      description:
        "Reduced to a sentiment while ignoring the justice, fairness, and non-vengeance context it lives in.",
      concreteExamples:
        "Used as a vague niceness command while ignoring systemic injustice. Cited to avoid confrontation: 'just love people' = don't challenge anything.",
    },
    loveImpact:
      "Love becomes vague and toothless \u2014 not tangible enough to change anything.",
    clarifiedReading: {
      reframe:
        "Biblical 'love' is enacted fairness, dignity, and refusal of vengeance. Jesus elevates it as a core command.",
      appResponse:
        "Love your neighbor isn't a greeting card. In Leviticus 19, it's surrounded by commands about justice, fair wages, and not taking revenge. Biblical love has teeth \u2014 it acts.",
    },
  },

  // -------------------------------------------------------
  // DEUTERONOMY
  // -------------------------------------------------------
  {
    id: "deut-6-5",
    priority: "P1",
    passage: "Deuteronomy 6:5",
    commonQuoteForm: "Love God with all your heart",
    context: {
      historicalLinguistic: `"Heart" in biblical Hebrew includes intellect and volition, not only emotion. \
NET footnote makes this explicit.`,
      keyTerms: [
        {
          original: "\u05DC\u05B5\u05D1 / \u05DC\u05B5\u05D1\u05B8\u05D1",
          transliteration: "lev / levav",
          language: "hebrew",
          glossRange: "heart, mind, inner person, will, understanding",
          significance:
            "Biblical 'heart' is the seat of thought and decision, not just feeling. Loving God involves the whole self.",
        },
      ],
      translationIssues: `English "heart" = emotions. Hebrew lev = mind + will + emotions. This \
creates a false faith/feeling equation.`,
    },
    misuses: {
      types: ["translation-trap", "concept-drift"],
      description:
        "'God only wants feelings' or guilt when emotions fluctuate.",
      concreteExamples:
        "People in dry spiritual seasons assume they've failed God because they don't feel strong emotion. Used to shame intellectual questioning.",
    },
    loveImpact:
      "People confuse dry feelings with spiritual failure.",
    clarifiedReading: {
      reframe:
        "Loving God involves the whole self \u2014 including mind and choices. Love is covenant loyalty expressed in life.",
      appResponse:
        "In Hebrew, 'heart' includes your mind, your will, and your choices \u2014 not just your feelings. Loving God with all your heart means orienting your whole life, not maintaining an emotional high.",
    },
  },

  {
    id: "deut-28",
    priority: "P2",
    passage: "Deuteronomy 28",
    commonQuoteForm: "Blessed\u2026cursed",
    context: {
      historicalLinguistic: `Covenant blessings and curses tied to Israel's obedience within a specific \
covenant frame \u2014 Sinai covenant terms, not universal spiritual laws.`,
      keyTerms: [],
      translationIssues: `"Blessed/cursed" in English sounds like universal karma. In context, these \
are specific covenant terms for a specific people at a specific moment.`,
    },
    misuses: {
      types: ["covenant-transfer", "transactionalism"],
      description:
        "Prosperity moralism: 'If you obey, you'll be rich and healthy.'",
      concreteExamples:
        "Prosperity gospel preaching. National destiny claims. Used to shame people in poverty or illness as disobedient.",
    },
    loveImpact:
      "Creates fear-based faith and shame in suffering. Sick or poor people feel cursed.",
    clarifiedReading: {
      reframe:
        "These are covenant terms for Israel. Christ-shaped discipleship treats suffering with honesty and hope.",
      appResponse:
        "Deuteronomy 28 is covenant language for Israel at Sinai \u2014 not a universal formula. Suffering doesn't mean you're cursed. Jesus walked straight into suffering and called it faithful.",
    },
  },

  // -------------------------------------------------------
  // HISTORICAL BOOKS
  // -------------------------------------------------------
  {
    id: "josh-1-9",
    priority: "P1",
    passage: "Joshua 1:9",
    commonQuoteForm: "Be strong and courageous",
    context: {
      historicalLinguistic: `Spoken to Joshua as a specific commissioning for leadership. The courage \
is grounded in "I am with you" \u2014 God's presence, not personal grit.`,
      keyTerms: [],
      translationIssues: `English hears "be strong and courageous" as self-help motivation. \
The Hebrew framing grounds it entirely in divine presence.`,
    },
    misuses: {
      types: ["verse-isolation", "audience-shift"],
      description:
        "Generic hype slogan for exams, sports, and motivational content \u2014 detached from dependence on God's presence.",
      concreteExamples:
        "On merchandise, sports gear, graduation cards. Used without any reference to the 'I am with you' foundation.",
    },
    loveImpact:
      "Encouragement becomes self-reliance. When courage fails, God feels absent.",
    clarifiedReading: {
      reframe:
        "Courage is grounded in 'I am with you,' not in personal grit.",
      appResponse:
        "Joshua's courage isn't bootstrapping. It's grounded in one thing: 'I will be with you wherever you go.' The strength comes from presence, not performance.",
    },
  },

  {
    id: "2chr-7-14",
    priority: "P1",
    passage: "2 Chronicles 7:14",
    commonQuoteForm: "Heal their land",
    context: {
      historicalLinguistic: `Temple dedication context \u2014 God's promise tied to "this place" (the temple) \
and covenant people (Israel). The "land" is specific, not any modern nation.`,
      keyTerms: [],
      translationIssues: `"My people" and "their land" have specific referents in the original \
context that get silently transferred to modern nations.`,
    },
    misuses: {
      types: ["covenant-transfer", "audience-shift"],
      description:
        "National revival proof-text, especially in U.S. civil religion.",
      concreteExamples:
        "Recited at political rallies, National Day of Prayer events, legislative sessions. 'If America prays, God will heal America.'",
    },
    loveImpact:
      "Makes God's love feel like a national deal \u2014 transactional and partisan.",
    clarifiedReading: {
      reframe:
        "God calls his people to humility and repentance. The text is not a blank check for modern nation-states.",
      appResponse:
        "This promise was spoken at Solomon's temple dedication to covenant Israel. The transferable principle is humility and repentance. The non-transferable part is 'this land = my country.'",
    },
  },

  // -------------------------------------------------------
  // PSALMS
  // -------------------------------------------------------
  {
    id: "ps-23",
    priority: "P2",
    passage: "Psalm 23",
    commonQuoteForm: "The Lord is my shepherd",
    context: {
      historicalLinguistic: `Pastoral metaphor for God's presence THROUGH danger \u2014 "valley of the shadow \
of death" is central, not incidental. The psalm doesn't promise avoidance \
of hardship.`,
      keyTerms: [],
      translationIssues: `Familiarity breeds flattening. People know the words so well they stop \
hearing "through the darkest valley."`,
    },
    misuses: {
      types: ["spiritual-bypassing", "prosperity-drift"],
      description:
        "'If God is my shepherd, I won't face hardship.'",
      concreteExamples:
        "Used as comfort verse while implying suffering means God isn't shepherding. Quoted at funerals in ways that shut down grief.",
    },
    loveImpact:
      "When hardship comes, people feel abandoned by the shepherd they were promised.",
    clarifiedReading: {
      reframe:
        "The psalm promises presence and guidance THROUGH the darkest valley, not a pain-free path.",
      appResponse:
        "Psalm 23 doesn't promise you'll avoid the valley. It promises you won't walk through it alone. The shepherd's presence is the point \u2014 not the absence of danger.",
    },
  },

  {
    id: "ps-37-4",
    priority: "P1",
    passage: "Psalm 37:4",
    commonQuoteForm: "Desires of your heart",
    context: {
      historicalLinguistic: `Wisdom psalm about trust under injustice. "Give desires" is framed by \
delight in God and righteous living \u2014 not a wish-fulfillment promise.`,
      keyTerms: [],
      translationIssues: `"Desires of your heart" in English sounds like "whatever you want." \
The psalm's logic is that delighting in God reshapes what you desire.`,
    },
    misuses: {
      types: ["prosperity-drift", "verse-isolation"],
      description:
        "Prosperity claim: 'If I worship, God funds my wish list.'",
      concreteExamples:
        "Prosperity gospel preaching. Vision board theology. 'Name it and claim it' culture.",
    },
    loveImpact:
      "Turns God into a dispenser, not a Father. When desires aren't met, faith breaks.",
    clarifiedReading: {
      reframe:
        "God reshapes desires as we delight in him. Prayer becomes alignment, not leverage.",
      appResponse:
        "The psalm isn't saying God will give you whatever you want. It's saying that when you delight in God, your desires begin to align with his. Prayer becomes partnership, not a wish list.",
    },
  },

  {
    id: "ps-46-10",
    priority: "P1",
    passage: "Psalm 46:10",
    commonQuoteForm: "Be still\u2026",
    context: {
      historicalLinguistic: `In context of conflict and upheaval \u2014 closer to "stop striving" and \
recognize God's sovereignty. It's a call to trust under pressure, \
not a meditation technique.`,
      keyTerms: [],
      translationIssues: `"Be still" in English = quiet/passive. Hebrew sense is closer to \
"cease striving" or "let go" \u2014 active trust, not passivity.`,
    },
    misuses: {
      types: ["translation-trap", "verse-isolation"],
      description:
        "Quietism: 'Do nothing.' Or shaming people who take action during crisis.",
      concreteExamples:
        "Used to discourage advocacy, protest, or practical problem-solving. Quoted to people in crisis as 'just be still.'",
    },
    loveImpact:
      "People feel spiritually wrong for acting responsibly.",
    clarifiedReading: {
      reframe:
        "Stillness is trust under pressure, not irresponsibility.",
      appResponse:
        "This psalm is set in the middle of chaos \u2014 nations raging, kingdoms falling. 'Be still' isn't 'do nothing.' It's 'stop white-knuckling control and recognize who God is.' Trust and action aren't opposites.",
    },
  },

  {
    id: "ps-91",
    priority: "P1",
    passage: "Psalm 91",
    commonQuoteForm: "No plague\u2026no harm",
    context: {
      historicalLinguistic: `A liturgical assurance of divine protection \u2014 trains the heart to seek \
refuge in God. Not a guarantee of immunity from all harm.`,
      keyTerms: [],
      translationIssues: `Poetic/liturgical language read as contractual guarantee. The genre \
(worship/prayer) is different from legal promise.`,
    },
    misuses: {
      types: ["genre-confusion", "prosperity-drift"],
      description:
        "Treated as an immunity charm against disease or tragedy, especially during crises.",
      concreteExamples:
        "Claimed during COVID as reason to refuse precautions. Used as 'faith shield' against medical treatment.",
    },
    loveImpact:
      "When harm occurs, faith can collapse into betrayal \u2014 'God promised and didn't deliver.'",
    clarifiedReading: {
      reframe:
        "The psalm trains the heart to refuge in God. It is not a contract eliminating suffering.",
      appResponse:
        "Psalm 91 teaches refuge in God \u2014 not immunity from pain. If suffering comes, it doesn't mean God broke a promise. It means you need refuge even more. The psalm is a prayer, not an insurance policy.",
    },
  },

  // -------------------------------------------------------
  // PROVERBS
  // -------------------------------------------------------
  {
    id: "prov-3-5-6",
    priority: "P2",
    passage: "Proverbs 3:5-6",
    commonQuoteForm: "Lean not on your own understanding",
    context: {
      historicalLinguistic: `Wisdom literature teaching that trust and "acknowledging" God shape wise \
paths. Written in a tradition that CELEBRATES learning and wisdom.`,
      keyTerms: [],
      translationIssues: `"Lean not on your own understanding" in English sounds anti-intellectual. \
In Proverbs \u2014 a book that exists to build wisdom \u2014 it means don't be \
arrogantly self-sufficient.`,
    },
    misuses: {
      types: ["verse-isolation", "semantic-narrowing"],
      description:
        "Anti-intellectualism: 'Don't question, don't learn, don't think critically.'",
      concreteExamples:
        "Used to discourage education, scientific inquiry, therapy, or asking hard theological questions.",
    },
    loveImpact:
      "Makes faith fragile and fearful of truth.",
    clarifiedReading: {
      reframe:
        "Trust God WITH your mind, and let humility govern your reasoning.",
      appResponse:
        "Proverbs is a book that exists to build wisdom \u2014 it's pro-thinking. 'Lean not on your own understanding' means don't be arrogantly self-sufficient. It's a call to humility, not anti-intellectualism.",
    },
  },

  {
    id: "prov-13-24",
    priority: "P1",
    passage: "Proverbs 13:24",
    commonQuoteForm: "Spare the rod\u2026",
    context: {
      historicalLinguistic: `Proverb about disciplined love \u2014 wisdom literature using metaphorical \
language about formation. Not a license for violence.`,
      keyTerms: [],
      translationIssues: `"Rod" in English = instrument of hitting. In shepherd/wisdom imagery, \
the rod guides and protects. The proverb is about engaged parenting, \
not hitting.`,
    },
    misuses: {
      types: ["weaponization", "genre-confusion"],
      description:
        "Justifying harsh punishment, corporal punishment, or abusive parenting.",
      concreteExamples:
        "Cited to defend physical abuse of children. Used to override child protection guidance.",
    },
    loveImpact:
      "Associates God with harm, not protection. Children learn God hurts.",
    clarifiedReading: {
      reframe:
        "Discipline is loving formation. If 'discipline' harms, it has crossed into misuse.",
      appResponse:
        "The proverb is about engaged, loving formation \u2014 not violence. A shepherd's rod guides and protects. If 'discipline' causes harm, it's no longer discipline. It's abuse wearing a Bible verse.",
    },
  },

  {
    id: "prov-29-18",
    priority: "P2",
    passage: "Proverbs 29:18",
    commonQuoteForm: "Without vision the people perish",
    context: {
      historicalLinguistic: `"Vision" is prophetic revelation \u2014 God's word/guidance. NET explicitly \
renders "prophetic vision." Not corporate strategy.`,
      keyTerms: [],
      translationIssues: `English "vision" = goals/ambition. Hebrew refers to prophetic revelation \
from God \u2014 a completely different category.`,
    },
    misuses: {
      types: ["translation-trap", "audience-shift"],
      description:
        "Business 'vision casting' proof-text.",
      concreteExamples:
        "Cited in corporate leadership talks, church growth conferences, and entrepreneurship content as justification for leader-driven vision.",
    },
    loveImpact:
      "Replaces God's word with human ambition.",
    clarifiedReading: {
      reframe:
        "Without God's revealed guidance, communities unravel. The blessing is tied to keeping God's instruction.",
      appResponse:
        "The 'vision' here is prophetic revelation \u2014 God's word to his people. It's not a business strategy verse. The proverb says: without God's guidance, things fall apart. With it, people flourish.",
    },
  },

  // -------------------------------------------------------
  // ECCLESIASTES
  // -------------------------------------------------------
  {
    id: "eccl-3-1-8",
    priority: "P2",
    passage: "Ecclesiastes 3:1-8",
    commonQuoteForm: "A time for everything",
    context: {
      historicalLinguistic: `Poetic reflection on seasons in a world that feels cyclical and contested. \
The Teacher observes \u2014 he's not endorsing every action listed.`,
      keyTerms: [],
      translationIssues: `English reads "a time to kill, a time to heal" as God endorsing both \
equally. The genre is observational poetry, not moral prescription.`,
    },
    misuses: {
      types: ["genre-confusion", "spiritual-bypassing"],
      description:
        "Fatalism: 'Everything is God's will, so don't resist evil.'",
      concreteExamples:
        "Used to justify passivity in the face of injustice. Quoted to normalize harmful situations as 'God's timing.'",
    },
    loveImpact:
      "Can numb moral responsibility and compassion.",
    clarifiedReading: {
      reframe:
        "Naming seasons is not endorsing every action. Wisdom discerns what time it is and what love requires.",
      appResponse:
        "Ecclesiastes observes that life has seasons \u2014 it's not saying God endorses everything that happens. Wisdom doesn't shrug at evil and say 'it's just a season.' Wisdom asks: what does love require right now?",
    },
  },

  // -------------------------------------------------------
  // PROPHETS
  // -------------------------------------------------------
  {
    id: "isa-41-10",
    priority: "P1",
    passage: "Isaiah 41:10",
    commonQuoteForm: "Fear not\u2026 I will help you",
    context: {
      historicalLinguistic: `Addressed to God's servant people in fear \u2014 emphasizing presence, help, \
and upheld strength. God's first move is toward the fearful, not against them.`,
      keyTerms: [],
      translationIssues: `"Fear not" in English sounds like a command to stop feeling afraid. \
In context, it's assurance \u2014 "don't be afraid, BECAUSE I am with you."`,
    },
    misuses: {
      types: ["command-as-condemnation"],
      description:
        "Used to shame anxiety: 'If you fear, you lack faith.'",
      concreteExamples:
        "Quoted to anxious people as a rebuke. Used in counseling to dismiss anxiety disorders as spiritual failure.",
    },
    loveImpact:
      "Converts comfort into condemnation. The verse designed to help becomes a weapon.",
    clarifiedReading: {
      reframe:
        "God's first move is presence. Fear can be met with help, not shame.",
      appResponse:
        "God doesn't say 'fear not' as a scolding. He says it as a promise: you don't have to be afraid because I'm here. Fear is met with presence, not punishment.",
    },
  },

  {
    id: "jer-17-9",
    priority: "P2",
    passage: "Jeremiah 17:9",
    commonQuoteForm: "The heart is deceitful above all things",
    context: {
      historicalLinguistic: `"Heart" can mean mind/inner self. NET renders "human mind," highlighting \
cognitive-moral depth. The verse diagnoses self-deception, not total \
depravity of all human feeling.`,
      keyTerms: [],
      translationIssues: `English "heart is deceitful" = don't trust any feelings ever. Hebrew \
lev includes mind/will, and the diagnosis is about self-deception \
capacity, not wholesale rejection of inner life.`,
    },
    misuses: {
      types: ["command-as-condemnation", "semantic-narrowing"],
      description:
        "Used to invalidate feelings, distrust everyone, or encourage self-loathing.",
      concreteExamples:
        "Quoted in counseling to dismiss someone's emotional experience. Used to override victims' instincts about danger.",
    },
    loveImpact:
      "Drives secrecy and despair instead of healing. People learn to distrust themselves completely.",
    clarifiedReading: {
      reframe:
        "The verse diagnoses human self-deception and invites God's searching mercy \u2014 not self-hatred.",
      appResponse:
        "Jeremiah isn't telling you to hate yourself or distrust every feeling. He's naming a real thing: we can deceive ourselves. The next verse is the key \u2014 God searches the heart. That's mercy, not condemnation.",
    },
  },

  {
    id: "jer-29-11",
    priority: "P1",
    passage: "Jeremiah 29:11",
    commonQuoteForm: "Plans to prosper you",
    context: {
      historicalLinguistic: `Part of Jeremiah's letter to exiles in Babylon. The promise comes with \
instructions to settle in, build houses, and seek the welfare (shalom) \
of the city they're exiled to. Fulfillment is 70 years out.`,
      keyTerms: [],
      translationIssues: `"Prosper" in English = financial/career success. Hebrew shalom = \
wholeness, peace, wellbeing. The timeline is generational, not next quarter.`,
    },
    misuses: {
      types: ["verse-isolation", "prosperity-drift"],
      description:
        "Personal success guarantee for near-term outcomes.",
      concreteExamples:
        "On coffee mugs, graduation cards, vision boards. Used as personal promise of career success with zero exile context.",
    },
    loveImpact:
      "When life hurts, people assume God lied or forgot them.",
    clarifiedReading: {
      reframe:
        "God's plans include hope in exile \u2014 often through patient endurance and communal goodness, not instant success.",
      appResponse:
        "Jeremiah 29:11 was written to people in exile who'd be waiting 70 years. The promise is real \u2014 but it came with 'build houses, plant gardens, seek the shalom of the city.' Hope isn't a shortcut. It's faithful endurance.",
    },
  },

  {
    id: "hab-2-4",
    priority: "P2",
    passage: "Habakkuk 2:4",
    commonQuoteForm: "The righteous shall live by faith",
    context: {
      historicalLinguistic: `Hebrew emunah includes steadfastness and faithfulness \u2014 not just mental \
belief. Habakkuk is wrestling with injustice and God's seeming inaction.`,
      keyTerms: [
        {
          original: "\u05D0\u05B1\u05DE\u05D5\u05BC\u05E0\u05B8\u05D4",
          transliteration: "emunah",
          language: "hebrew",
          glossRange: "firmness, faithfulness, fidelity, steadfastness",
          significance:
            "Broader than English 'faith' (mental belief). Includes lived fidelity and steady trust over time.",
        },
      ],
      translationIssues: `"Faith" in English often = belief/assent. Hebrew emunah = steadfast \
faithfulness. This shapes the entire faith-vs-works debate.`,
    },
    misuses: {
      types: ["semantic-narrowing", "transactionalism"],
      description:
        "Moralism ('prove faith by effort') or passive belief divorced from fidelity.",
      concreteExamples:
        "Used in faith-vs-works arguments where both sides miss the Hebrew sense of steady, lived faithfulness.",
    },
    loveImpact:
      "Produces either pride (I'm faithful enough) or despair (I'll never believe hard enough).",
    clarifiedReading: {
      reframe:
        "Faith is trusting God's promise and living steady fidelity amid injustice.",
      appResponse:
        "Emunah isn't just 'believing.' It's steady faithfulness \u2014 trusting God's promise and living like it's true even when the world looks unjust. That's what Habakkuk is doing: arguing with God and staying anyway.",
    },
  },
] as const;
