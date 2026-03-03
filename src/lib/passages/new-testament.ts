import type { PassageDossier } from "../passage-types";

export const ntDossiers: readonly PassageDossier[] = [
  // -------------------------------------------------------
  // MATTHEW
  // -------------------------------------------------------
  {
    id: "matt-5-14",
    priority: "P2",
    passage: "Matthew 5:14",
    commonQuoteForm: "City on a hill",
    context: {
      historicalLinguistic: `Jesus addresses disciples as a visible community. "City on a hill" is \
about the Jesus-community's witness through good works pointing to the Father.`,
      keyTerms: [],
      translationIssues: `The phrase has been politicized far beyond its original scope \u2014 especially \
in American rhetoric since Winthrop (1630) through Reagan and beyond.`,
    },
    misuses: {
      types: ["covenant-transfer", "audience-shift"],
      description:
        "National exceptionalism: 'America is God's city on a hill.'",
      concreteExamples:
        "Used in presidential speeches, political rallies, and Christian nationalist rhetoric. Winthrop's 1630 sermon established the transfer.",
    },
    loveImpact:
      "Replaces kingdom humility with national pride. God's love gets nationalized.",
    clarifiedReading: {
      reframe:
        "The 'city' is the Jesus-community whose good works point to the Father, not a nation-state.",
      appResponse:
        "Jesus is talking to his disciples about being visible through good works that glorify God. He's not describing a nation. The 'city on a hill' is the community of Jesus \u2014 and its light is meant for everybody.",
    },
  },

  {
    id: "matt-5-39",
    priority: "P1",
    passage: "Matthew 5:39",
    commonQuoteForm: "Turn the other cheek",
    context: {
      historicalLinguistic: `In the Sermon on the Mount, Jesus confronts misuse of retaliation logic \
and calls for non-retaliatory, creative love. He forbids revenge \u2014 \
not self-protection.`,
      keyTerms: [],
      translationIssues: `"Turn the other cheek" in English = passive doormat. Scholars note the \
cultural specifics of the backhand slap (left cheek) suggest an act of \
dignified resistance, not passive submission to violence.`,
    },
    misuses: {
      types: ["trauma-misapplication", "weaponization"],
      description:
        "Counseling victims to stay in abuse or never seek safety/justice.",
      concreteExamples:
        "Told to abuse victims by pastors and counselors. Used to shame people who set boundaries or leave dangerous situations.",
    },
    loveImpact:
      "Makes love look like self-erasure, not dignity.",
    clarifiedReading: {
      reframe:
        "Forgo revenge. Do not forgo safety. Love can resist evil without mirroring it.",
      appResponse:
        "Jesus forbids revenge, not safety. Love does not require you to remain in danger. You can forgive without staying exposed to harm. If someone is using this verse to keep you unsafe, that is a misuse of Scripture.",
    },
  },

  {
    id: "matt-5-48",
    priority: "P2",
    passage: "Matthew 5:48",
    commonQuoteForm: "Be perfect",
    context: {
      historicalLinguistic: `Greek teleios often means mature or complete, not flawless performance.`,
      keyTerms: [
        {
          original: "\u03C4\u03AD\u03BB\u03B5\u03B9\u03BF\u03C2",
          transliteration: "teleios",
          language: "greek",
          glossRange: "complete, mature, having reached its end/goal",
          significance:
            "Not 'morally flawless.' Means whole-hearted, mature, reaching the intended goal. Luke's parallel says 'merciful.'",
        },
      ],
      translationIssues: `English "perfect" = flawless. Greek teleios = mature/complete. \
Luke 6:36 parallels with "merciful" \u2014 completely different feel.`,
    },
    misuses: {
      types: ["translation-trap", "command-as-condemnation"],
      description: "Perfectionism and spiritual scrupulosity.",
      concreteExamples:
        "Drives obsessive religious behavior. Used to shame any failure as spiritual inadequacy.",
    },
    loveImpact:
      "People experience God as impossible to please.",
    clarifiedReading: {
      reframe:
        "Jesus calls for whole-hearted maturity in love, not flawless performance.",
      appResponse:
        "The Greek word teleios means complete or mature \u2014 not morally flawless. Luke's version says 'be merciful.' Jesus is calling you toward whole-hearted love, not a standard you can never reach.",
    },
  },

  {
    id: "matt-6-33",
    priority: "P2",
    passage: "Matthew 6:33",
    commonQuoteForm: "Seek first the kingdom",
    context: {
      historicalLinguistic: `Part of Jesus' anxiety/needs discourse \u2014 not a denial of practical needs \
but a reordering of priorities within God's care.`,
      keyTerms: [],
      translationIssues: `"Seek first" sounds like "ignore everything else." In context, Jesus \
has just said the Father knows what you need. It's about priority, \
not denial of material reality.`,
    },
    misuses: {
      types: ["spiritual-bypassing", "verse-isolation"],
      description:
        "Used to spiritualize ignoring practical responsibilities.",
      concreteExamples:
        "'Just seek first and quit your job.' 'Don't worry about money, seek the kingdom.' Used to discourage financial planning.",
    },
    loveImpact:
      "Sets people up for avoidable crisis and guilt when practical needs demand attention.",
    clarifiedReading: {
      reframe:
        "Prioritize God's reign and righteousness while receiving daily provision with wisdom.",
      appResponse:
        "Jesus isn't telling you to ignore your bills. He's saying your Father knows what you need \u2014 so don't let anxiety about provision displace your deepest orientation toward God's kingdom. Priority, not denial.",
    },
  },

  {
    id: "matt-6-34",
    priority: "P1",
    passage: "Matthew 6:34",
    commonQuoteForm: "Do not worry about tomorrow",
    context: {
      historicalLinguistic: `Paired with "today has enough trouble of its own" \u2014 Jesus names trouble \
as real, not illusory. He's teaching where to place tomorrow: in the \
Father's care.`,
      keyTerms: [],
      translationIssues: `"Do not worry" in English = stop feeling anxious (a command to control \
your emotions). Jesus is addressing a posture of trust, not shaming \
a neurological response.`,
    },
    misuses: {
      types: ["command-as-condemnation"],
      description: "Shaming anxious people.",
      concreteExamples:
        "Quoted to people with anxiety disorders as spiritual rebuke. Used to dismiss legitimate concerns about the future.",
    },
    loveImpact:
      "Anxiety becomes spiritual failure rather than human suffering that God meets with care.",
    clarifiedReading: {
      reframe:
        "Jesus names trouble as real. He teaches where to place tomorrow: in the Father's care.",
      appResponse:
        "Jesus doesn't pretend tomorrow is fine \u2014 he says today has enough trouble of its own. He's teaching you where to put your worry: in the Father's hands. That's a practice of trust, not a demand to stop feeling.",
    },
  },

  {
    id: "matt-7-1",
    priority: "P1",
    passage: "Matthew 7:1",
    commonQuoteForm: "Judge not\u2026",
    context: {
      historicalLinguistic: `Greek krin\u014d can include condemn. Jesus critiques hypocritical condemnation \
while in the same passage calling for discernment (planks and specks).`,
      keyTerms: [
        {
          original: "\u03ba\u03c1\u03af\u03bd\u03c9",
          transliteration: "krin\u014d",
          language: "greek",
          glossRange: "judge, decide, evaluate, condemn",
          significance:
            "Has a range. Jesus isn't banning evaluation \u2014 he's targeting hypocritical condemnation.",
        },
      ],
      translationIssues: `English "judge" = any evaluation. Greek krin\u014d here targets hypocritical \
condemnation. Jesus then immediately tells you to deal with your own \
plank FIRST \u2014 implying you do address the speck afterward.`,
    },
    misuses: {
      types: ["verse-isolation", "semantic-narrowing"],
      description:
        "'No one can ever tell me I'm wrong. Judge not.'",
      concreteExamples:
        "Used to shut down accountability, moral discernment, or confrontation of harm. Quoted to silence any criticism.",
    },
    loveImpact:
      "Blocks repentance, repair, and truth-telling in love.",
    clarifiedReading: {
      reframe:
        "Don't condemn. Do practice humble self-examination and honest discernment.",
      appResponse:
        "Jesus warns against condemning people while ignoring your own mess. He's not banning discernment \u2014 he's calling for humility. Deal with your plank first, then you can see clearly to help your neighbor.",
    },
  },

  {
    id: "matt-18-20",
    priority: "P2",
    passage: "Matthew 18:20",
    commonQuoteForm: "Where two or three gather",
    context: {
      historicalLinguistic: `Immediate context is reconciliation, witnesses, binding/loosing, communal \
discernment \u2014 not a generic small-group promise.`,
      keyTerms: [],
      translationIssues: `Detached from its paragraph, it sounds like "God only shows up in groups." \
In context, it's about Jesus' presence in communal truth-seeking and \
reconciliation work.`,
    },
    misuses: {
      types: ["verse-isolation"],
      description:
        "'God is only present if we have enough people,' or generic small-group slogan.",
      concreteExamples:
        "Used as church attendance minimum. Quoted to dismiss solo prayer or individual encounter with God.",
    },
    loveImpact:
      "Turns God's presence into a headcount condition.",
    clarifiedReading: {
      reframe:
        "Jesus assures presence in humble communal seeking, especially in reconciliation and prayerful discernment.",
      appResponse:
        "Jesus says this in a passage about reconciliation and communal discernment \u2014 not as a minimum attendance rule. God's presence isn't conditional on group size. But Jesus does promise something special when people come together to seek truth and repair.",
    },
  },

  // -------------------------------------------------------
  // LUKE
  // -------------------------------------------------------
  {
    id: "luke-6-38",
    priority: "P2",
    passage: "Luke 6:38",
    commonQuoteForm: "Give and it will be given to you",
    context: {
      historicalLinguistic: `Jesus teaches generosity and reciprocity of measure \u2014 the "measure" \
warns against stinginess and harshness, not a prosperity contract.`,
      keyTerms: [],
      translationIssues: `"Give and it will be given" in English sounds like a financial ROI promise. \
In context, it's about the quality of mercy and generosity you extend to others.`,
    },
    misuses: {
      types: ["transactionalism", "prosperity-drift"],
      description: "Fundraising pressure: 'Give to get.'",
      concreteExamples:
        "Used in prosperity gospel giving appeals. Cited to pressure donations with promised returns.",
    },
    loveImpact: "Reduces God to a transaction partner.",
    clarifiedReading: {
      reframe:
        "Give freely and you'll find God's generosity shaping your life. The 'measure' warns against stinginess and harshness.",
      appResponse:
        "Jesus isn't running a spiritual investment scheme. The 'measure' principle is about the quality of mercy you extend \u2014 not a financial multiplier. Give because God is generous, not to trigger a return.",
    },
  },

  {
    id: "luke-15-7",
    priority: "P2",
    passage: "Luke 15:7",
    commonQuoteForm: "More joy over one sinner who repents",
    context: {
      historicalLinguistic: `Spoken against grumbling religious critics \u2014 the "99" comparison is \
rhetorical, not a ranking. The point is God's joy in restoration.`,
      keyTerms: [],
      translationIssues: `English hears "more joy over one" as "the 99 don't matter." The \
rhetorical structure is designed to challenge the critics, not devalue \
the faithful.`,
    },
    misuses: {
      types: ["verse-isolation", "audience-shift"],
      description:
        "Shaming 'faithful' people or implying God doesn't value the steady.",
      concreteExamples:
        "Used to guilt longtime church members. Creates rivalry between 'prodigals' and 'elder brothers.'",
    },
    loveImpact: "Creates rivalry instead of shared joy.",
    clarifiedReading: {
      reframe:
        "Heaven rejoices at repentance. The point is God's joy in restoration, not contempt for the faithful.",
      appResponse:
        "Jesus is responding to religious leaders who grumble about who he eats with. The point isn't that the faithful don't matter \u2014 it's that God's heart explodes with joy when someone comes home. That joy is the story.",
    },
  },

  // -------------------------------------------------------
  // JOHN
  // -------------------------------------------------------
  {
    id: "john-3-16-18",
    priority: "P1",
    passage: "John 3:16-18",
    commonQuoteForm: "God so loved the world",
    context: {
      historicalLinguistic: `Gospel core: love, gift, belief, and non-condemnation. Verse 17 \u2014 \
"God did not send his Son to condemn the world" \u2014 is often completely \
forgotten while 16 is quoted.`,
      keyTerms: [],
      translationIssues: `The word "believe" (pisteuo) carries more weight than mental assent \u2014 \
it includes trust, allegiance, and commitment. "World" (kosmos) means \
the whole creation, not just the elect.`,
    },
    misuses: {
      types: ["verse-isolation", "weaponization"],
      description:
        "Used as a slogan while practicing condemnation and shame. Or truncated to exclude verse 17.",
      concreteExamples:
        "On signs at sporting events as a slogan without context. Quoted alongside condemnation of specific groups \u2014 contradicting verse 17.",
    },
    loveImpact:
      "People associate God with condemnation rather than rescue.",
    clarifiedReading: {
      reframe:
        "God's love gives, and Jesus comes to save, not condemn. Truth is offered as light for healing.",
      appResponse:
        "God so loved the world that he gave. Verse 17 is the part people forget: God sent Jesus not to condemn the world, but to save it. If your version of John 3:16 sounds like condemnation, you've lost the plot.",
    },
  },

  {
    id: "john-10-10",
    priority: "P2",
    passage: "John 10:10",
    commonQuoteForm: "Life abundantly",
    context: {
      historicalLinguistic: `"Abundant life" sits in shepherd-and-thief discourse \u2014 life under \
the good shepherd's protection, not necessarily material wealth.`,
      keyTerms: [],
      translationIssues: `"Abundant" in English = plentiful/wealthy. Greek perisson = \
exceeding, surplus. The abundance is life quality under the \
shepherd, not material accumulation.`,
    },
    misuses: {
      types: ["prosperity-drift", "verse-isolation"],
      description: "Prosperity promise: 'abundant = rich and easy.'",
      concreteExamples:
        "Prosperity gospel staple. Used to frame material comfort as evidence of spiritual health.",
    },
    loveImpact:
      "When 'abundance' doesn't look like comfort, people despair.",
    clarifiedReading: {
      reframe:
        "Jesus offers deep life and protection under his shepherding, even amid conflict and loss.",
      appResponse:
        "The 'abundant life' is set in a passage about sheep, thieves, and a shepherd who lays down his life. Abundance here is the depth and safety of life under Jesus' care \u2014 not a prosperity promise.",
    },
  },

  {
    id: "john-14-6",
    priority: "P1",
    passage: "John 14:6",
    commonQuoteForm: "I am the way, the truth, and the life",
    context: {
      historicalLinguistic: `Spoken as comfort to disciples before Jesus' death. Thomas asks "how \
can we know the way?" and Jesus answers relationally \u2014 he IS the way \
to the Father. It's a relational claim about access.`,
      keyTerms: [],
      translationIssues: `English emphasis falls on "no one" (exclusion). The sentence's gravity \
is on "I am" (invitation) \u2014 Jesus is answering a fearful disciple's \
question about how to follow.`,
    },
    misuses: {
      types: ["weaponization", "verse-isolation"],
      description:
        "Weaponized as contempt or hostility toward outsiders.",
      concreteExamples:
        "Used on protest signs against other religions. Deployed as a conversation-ender rather than a conversation-starter.",
    },
    loveImpact: "Signals exclusion rather than invitation.",
    clarifiedReading: {
      reframe:
        "Jesus is the way because he reveals the Father and carries us into God's life. Speak it as invitation and witness.",
      appResponse:
        "A frightened disciple asks 'how do we follow you?' and Jesus says: I am the way. It's comfort, not a weapon. The claim is about Jesus opening access to the Father \u2014 speak it as invitation, not as a door slammed shut.",
    },
  },

  // -------------------------------------------------------
  // ACTS
  // -------------------------------------------------------
  {
    id: "acts-2-38-40",
    priority: "P2",
    passage: "Acts 2:38-40",
    commonQuoteForm: "Repent and be baptized",
    context: {
      historicalLinguistic: `Covenant-entry responses to the gospel announcement at Pentecost. \
"Repent" = turn/reorient toward Jesus. Baptism = public identification \
and entry into Spirit-gifted community.`,
      keyTerms: [],
      translationIssues: `"Repent" in English sounds like groveling guilt. Greek metanoeo = \
change of mind/direction. It's reorientation, not self-flagellation.`,
    },
    misuses: {
      types: ["transactionalism"],
      description:
        "Checklist spirituality: 'Do these steps to earn forgiveness.'",
      concreteExamples:
        "Used to make salvation feel like a multi-step process you can fail at. Baptism treated as magic rather than covenant sign.",
    },
    loveImpact: "Grace feels earned instead of received.",
    clarifiedReading: {
      reframe:
        "Repentance is turning toward Jesus. Baptism names allegiance and entry into a Spirit-gifted community.",
      appResponse:
        "Repentance isn't groveling \u2014 it's turning around. Baptism isn't earning anything \u2014 it's identifying publicly with Jesus and his people. These are responses to grace, not requirements to earn it.",
    },
  },

  {
    id: "acts-4-12",
    priority: "P2",
    passage: "Acts 4:12",
    commonQuoteForm: "No other name under heaven",
    context: {
      historicalLinguistic: `Peter speaks under pressure before authorities. The exclusive claim \
functions as public witness and courage under threat \u2014 not triumphalism.`,
      keyTerms: [],
      translationIssues: `"No other name" in English lands as superiority/exclusion. In context, \
it's a bold, costly confession before hostile powers.`,
    },
    misuses: {
      types: ["weaponization", "audience-shift"],
      description:
        "Triumphalism and contempt rather than humble testimony.",
      concreteExamples:
        "Used aggressively in interfaith contexts. Deployed as arrogance rather than the costly witness it was in Acts.",
    },
    loveImpact: "Pushes people away from love.",
    clarifiedReading: {
      reframe:
        "Speak with courage and humility. The claim is about rescue in Jesus, not superiority.",
      appResponse:
        "Peter says this while being interrogated by authorities. It costs him something. When we say 'no other name,' it should carry that same weight \u2014 courage and humility, not arrogance.",
    },
  },

  // -------------------------------------------------------
  // ROMANS
  // -------------------------------------------------------
  {
    id: "rom-8-28",
    priority: "P1",
    passage: "Romans 8:28",
    commonQuoteForm: "All things work together for good",
    context: {
      historicalLinguistic: `Paul describes God's active work alongside believers \u2014 "with those who \
love him, who are called according to his purpose." The "good" is \
conformity to Christ (v.29), not material comfort.`,
      keyTerms: [],
      translationIssues: `"All things work together for good" in English sounds like automatic \
happy endings. The Greek construction emphasizes God as the active agent \
weaving purpose in partnership with believers.`,
    },
    misuses: {
      types: ["spiritual-bypassing"],
      description:
        "Platitude used to silence grief: 'Don't cry, it's all good.'",
      concreteExamples:
        "Said to grieving people at funerals. Used to shut down lament, anger, or honest prayer.",
    },
    loveImpact:
      "Blocks lament and honest prayer. People feel they can't bring real pain to God.",
    clarifiedReading: {
      reframe:
        "God weaves good in partnership with those who love him. This supports hope and calling, not denial.",
      appResponse:
        "Romans 8:28 isn't a platitude. It's Paul's declaration that God is actively at work \u2014 even in suffering \u2014 shaping something redemptive. But the very next verses talk about suffering, groaning, and endurance. Don't skip the grief to get to the good.",
    },
  },

  {
    id: "rom-13-1-7",
    priority: "P1",
    passage: "Romans 13:1-7",
    commonQuoteForm: "Submit to governing authorities",
    context: {
      historicalLinguistic: `Paul addresses civic order with moral constraints across the whole letter. \
Romans 12 and 13:8-10 frame this passage \u2014 love of neighbor constrains \
political obedience. Historically cited to sanctify unjust systems.`,
      keyTerms: [],
      translationIssues: `"Submit" in English = obey without question. Greek hypotasso carries \
a range that includes voluntary ordering/positioning, not blank obedience.`,
    },
    misuses: {
      types: ["weaponization", "verse-isolation"],
      description:
        "'God ordains whatever the state does.' Used to silence protest or justify cruelty.",
      concreteExamples:
        "Cited by U.S. officials to justify immigration enforcement. Used historically to defend slavery, apartheid, and authoritarian compliance.",
    },
    loveImpact: "Makes God appear allied with oppression.",
    clarifiedReading: {
      reframe:
        "Submit to legitimate public order, but read within the Bible's justice ethic and the call to love neighbor. Refuse cherry-picking.",
      appResponse:
        "Romans 13 sits between Romans 12 ('overcome evil with good') and Romans 13:8 ('love your neighbor'). Read the whole thing. Paul is talking about public order, not blind obedience to unjust power. The Bible's justice ethic doesn't pause for this passage.",
    },
  },

  // -------------------------------------------------------
  // 1 CORINTHIANS
  // -------------------------------------------------------
  {
    id: "1cor-10-13",
    priority: "P1",
    passage: "1 Corinthians 10:13",
    commonQuoteForm: "God won't give you more than you can handle",
    context: {
      historicalLinguistic: `"Temptation" can also mean "testing." The verse promises God's \
faithfulness and a way to endure \u2014 not manageable life circumstances.`,
      keyTerms: [],
      translationIssues: `The popular misquote ("God won't give you more than you can handle") \
is NOT what the verse says. The actual promise is about temptation/testing \
and God providing a way to endure it.`,
    },
    misuses: {
      types: ["misquotation"],
      description:
        "Misquoted as 'God won't give you more than you can handle.'",
      concreteExamples:
        "Said to people in crisis, implying they should be able to handle anything. Used to dismiss the need for help.",
    },
    loveImpact:
      "When people can't handle it, they assume God failed them or they failed God.",
    clarifiedReading: {
      reframe:
        "God is faithful in testing and temptation. The promise is presence and a path to endure, not painless hardship.",
      appResponse:
        "This verse doesn't say 'God won't give you more than you can handle.' That's a misquote. What Paul actually says is that God is faithful and won't let you be tested beyond what you can bear \u2014 and he'll provide a way through. The promise is God's faithfulness, not your capacity.",
    },
  },

  {
    id: "1cor-13-4-8",
    priority: "P2",
    passage: "1 Corinthians 13:4-8",
    commonQuoteForm: "Love is patient, love is kind",
    context: {
      historicalLinguistic: `Paul describes love as cruciform virtue in a letter addressing a deeply \
divided church. It's about spiritual maturity and community character, \
not romantic mood.`,
      keyTerms: [],
      translationIssues: `Familiarity from weddings strips the passage of its church-community \
context. Paul is addressing people who are tearing each other apart.`,
    },
    misuses: {
      types: ["verse-isolation", "genre-confusion"],
      description:
        "Wedding aesthetic disconnected from everyday patience, truth, and endurance.",
      concreteExamples:
        "Read at weddings, printed on decor. Rarely applied to actual conflict, church division, or daily self-giving.",
    },
    loveImpact:
      "Love becomes performance or sentiment, not transformation.",
    clarifiedReading: {
      reframe:
        "Love is practiced character that mirrors God. Use as a daily exam of self-giving, not an Instagram caption.",
      appResponse:
        "Paul wrote this to a church that was fighting over everything. Love is patient and kind isn't a wedding decoration \u2014 it's a challenge to a community in conflict. Read it Monday morning, not just at the altar.",
    },
  },

  // -------------------------------------------------------
  // 2 CORINTHIANS
  // -------------------------------------------------------
  {
    id: "2cor-12-9-10",
    priority: "P2",
    passage: "2 Corinthians 12:9-10",
    commonQuoteForm: "My grace is sufficient / power in weakness",
    context: {
      historicalLinguistic: `Paul's personal experience of asking God to remove suffering ("thorn \
in the flesh") and receiving grace instead. Not an endorsement of harm.`,
      keyTerms: [],
      translationIssues: `"Power in weakness" in English can sound like "suffering is good." \
Paul's point is that God's grace meets him in weakness \u2014 not that \
weakness or harm should be sought or maintained.`,
    },
    misuses: {
      types: ["trauma-misapplication", "spiritual-bypassing"],
      description:
        "Romanticizing trauma ('God wants me broken') or discouraging treatment and help.",
      concreteExamples:
        "Used to discourage therapy, medication, or leaving harmful situations. 'God's grace is sufficient' used to shut down requests for help.",
    },
    loveImpact: "People confuse suffering with holiness.",
    clarifiedReading: {
      reframe:
        "God meets weakness with grace. Seek healing and safety while learning dependence.",
      appResponse:
        "Paul asked God to remove his suffering. God didn't. But he said: my grace is enough. That's not 'suffering is good.' It's 'I'm with you in it.' Seek healing. Accept help. And let God's grace meet you where you are.",
    },
  },

  // -------------------------------------------------------
  // EPHESIANS
  // -------------------------------------------------------
  {
    id: "eph-2-8-9",
    priority: "P1",
    passage: "Ephesians 2:8-9",
    commonQuoteForm: "Saved by grace through faith, not by works",
    context: {
      historicalLinguistic: `Salvation is gift, not wages. "Faith" (pistis) includes trust and \
allegiance \u2014 not just mental assent. Verse 10 (often dropped) adds \
"created for good works."`,
      keyTerms: [
        {
          original: "\u03c0\u03af\u03c3\u03c4\u03b9\u03c2",
          transliteration: "pistis",
          language: "greek",
          glossRange: "faith, trust, faithfulness, allegiance, fidelity",
          significance:
            "Broader than 'belief.' Includes trust, loyalty, and lived allegiance. Not just agreeing to a proposition.",
        },
      ],
      translationIssues: `"Faith" in English often = mental belief. Greek pistis includes trust \
and allegiance. "Works" gets weaponized in both directions \u2014 either \
to eliminate all discipleship or to smuggle in earning.`,
    },
    misuses: {
      types: ["verse-isolation", "semantic-narrowing"],
      description:
        "Either 'works don't matter ever' (antinomianism) or 'you must earn grace' (legalism).",
      concreteExamples:
        "Used to dismiss ethical living: 'I'm saved by grace, behavior doesn't matter.' Or used to add requirements: 'grace + these works = saved.'",
    },
    loveImpact:
      "Either empties discipleship or crushes with effort.",
    clarifiedReading: {
      reframe:
        "Grace saves. Faith receives. Works follow as fruit, not payment.",
      appResponse:
        "Grace saves. Faith receives. And verse 10 \u2014 the one people skip \u2014 says we're created for good works. It's not either/or. Grace frees you to live differently, not to stop caring.",
    },
  },

  {
    id: "eph-5-21-22",
    priority: "P1",
    passage: "Ephesians 5:21-22",
    commonQuoteForm: "Wives, submit to your husbands",
    context: {
      historicalLinguistic: `Verse 21 \u2014 "submitting to one another out of reverence for Christ" \u2014 \
frames the entire household code. Text-critical notes show verse 22's \
verb may rely on verse 21 in early manuscripts (no independent verb).`,
      keyTerms: [
        {
          original: "\u1f51\u03c0\u03bf\u03c4\u03ac\u03c3\u03c3\u03c9",
          transliteration: "hypotasso",
          language: "greek",
          glossRange: "arrange under, submit, subordinate, defer",
          significance:
            "The mutual version in v.21 governs the household code. The husband's charge is to love as Christ loved the church \u2014 self-sacrificial death.",
        },
      ],
      translationIssues: `Starting at verse 22 instead of 21 changes everything. The mutual \
submission frame in 21 governs the entire section. Skipping it creates \
a one-directional hierarchy the text doesn't support.`,
    },
    misuses: {
      types: ["weaponization", "verse-isolation"],
      description:
        "Used to demand unilateral control or tolerate abuse.",
      concreteExamples:
        "Cited by abusers to demand compliance. Used in counseling to tell victims to submit to harm. The verse is weaponized when 5:21 and the Christlike self-giving charge are ignored.",
    },
    loveImpact:
      "Converts covenant love into coercion. People experience marriage and God as unsafe.",
    clarifiedReading: {
      reframe:
        "Any 'submission' reading MUST be governed by Christlike love and self-giving. Never use it to keep someone unsafe.",
      appResponse:
        "Start at verse 21: 'submit to one another out of reverence for Christ.' That's the frame. Husbands are told to love like Christ loved \u2014 by laying down his life. Any reading that produces coercion or danger has left the text behind. Safety and dignity are non-negotiable.",
    },
  },

  // -------------------------------------------------------
  // PHILIPPIANS
  // -------------------------------------------------------
  {
    id: "phil-4-6-7",
    priority: "P1",
    passage: "Philippians 4:6-7",
    commonQuoteForm: "Do not be anxious about anything",
    context: {
      historicalLinguistic: `"Do not be anxious" is paired with a practice: prayer, petition, \
thanksgiving. The result is God's peace guarding heart and mind. \
It's a practice, not a performance standard.`,
      keyTerms: [],
      translationIssues: `"Do not be anxious" in English sounds like "stop having anxiety." \
Paul prescribes a practice (prayer + thanksgiving) and promises a \
result (peace) \u2014 it's not a rebuke for feeling anxious.`,
    },
    misuses: {
      types: ["command-as-condemnation"],
      description:
        "Anxiety-shaming: 'Just stop it. The Bible says don't be anxious.'",
      concreteExamples:
        "Used in pastoral counseling to shame people with anxiety disorders. Quoted to dismiss medication, therapy, or honest expression of worry.",
    },
    loveImpact:
      "People feel condemned for symptoms they can't control.",
    clarifiedReading: {
      reframe:
        "Bring anxiety to God with honesty. The text guides a practice of prayerful trust, not punishment.",
      appResponse:
        "Paul doesn't say 'stop feeling anxious and you're a bad Christian if you do.' He says: here's what to do with your anxiety \u2014 bring it to God with prayer and thanksgiving. The verse is a practice, not a punishment.",
    },
  },

  {
    id: "phil-4-13",
    priority: "P1",
    passage: "Philippians 4:13",
    commonQuoteForm: "I can do all things through Christ who strengthens me",
    context: {
      historicalLinguistic: `"All things" is constrained by immediate context: contentment in plenty \
AND hunger, abundance AND need. Paul is talking about endurance across \
circumstances, not achievement.`,
      keyTerms: [],
      translationIssues: `"All things" in English = unlimited capability. Paul means "I can face \
any circumstance." The next verse is about financial support \u2014 it's about \
endurance, not winning.`,
    },
    misuses: {
      types: ["verse-isolation", "prosperity-drift"],
      description: "Achievement/sports proof-text.",
      concreteExamples:
        "On gym walls, sports jerseys, athlete tattoos. Used as divine performance enhancement. Detached from the poverty and prison Paul is writing from.",
    },
    loveImpact:
      "Makes Christ look like a performance enhancer. When you lose, Christ failed?",
    clarifiedReading: {
      reframe:
        "Christ strengthens believers to endure and remain faithful in any circumstance \u2014 not to guarantee wins.",
      appResponse:
        "Paul wrote this in prison, talking about being content whether he had plenty or nothing. 'I can do all things' means 'I can endure any circumstance through Christ.' It's about faithfulness, not trophies.",
    },
  },

  // -------------------------------------------------------
  // 1 TIMOTHY
  // -------------------------------------------------------
  {
    id: "1tim-6-10",
    priority: "P1",
    passage: "1 Timothy 6:10",
    commonQuoteForm: "Money is the root of all evil",
    context: {
      historicalLinguistic: `The verse says "love of money" \u2014 not money itself. NET clarifies "all \
kinds of evil," not "all evil." The target is covetousness, not \
currency.`,
      keyTerms: [],
      translationIssues: `The most common misquote in Scripture. "Money is evil" \u2260 "the LOVE of \
money is a root of all KINDS of evil." Every word that's changed shifts \
the meaning.`,
    },
    misuses: {
      types: ["misquotation", "semantic-narrowing"],
      description:
        "Misquoted to shame wealth or poverty. Or used to excuse greed ('money itself is neutral so I'm fine').",
      concreteExamples:
        "Misquoted constantly. Used to shame wealthy people, shame poor people for wanting money, or neutralize the actual warning about covetousness.",
    },
    loveImpact:
      "Distracts from the heart-level issue of covetousness.",
    clarifiedReading: {
      reframe:
        "The love of money is spiritually hazardous because it reorders love away from God and neighbor.",
      appResponse:
        "The verse says 'the love of money is a root of all kinds of evil' \u2014 not 'money is evil.' It's about what happens when money becomes the thing you love most. That reordering is the danger.",
    },
  },
] as const;
