// The Human Jesus -- 8-chapter narrative exploration of the historical Jesus
// Documentary-style narration grounded in critical scholarship
// All data is immutable (readonly) -- returns new copies on all updates

export interface GreekTerm {
  readonly greek: string;
  readonly transliteration: string;
  readonly meaning: string;
}

export interface HumanJesusSection {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly scholarlyNote?: string;
  readonly greekTerms?: readonly GreekTerm[];
  readonly pullQuote?: string;
}

export interface HumanJesusChapter {
  readonly id: string;
  readonly slug: string;
  readonly order: number;
  readonly title: string;
  readonly subtitle: string;
  readonly icon: string;
  readonly color: string;
  readonly estimatedMinutes: number;
  readonly sections: readonly HumanJesusSection[];
  readonly linkedConcepts: readonly string[];
  readonly linkedWords: readonly string[];
  readonly linkedDossiers: readonly string[];
}

// ---------------------------------------------------------------------------
// Chapter data
// ---------------------------------------------------------------------------

export const humanJesusChapters: readonly HumanJesusChapter[] = [
  // ── Chapter 1: The Sources ──────────────────────────────────────────────
  {
    id: "ch-1",
    slug: "the-sources",
    order: 1,
    title: "The Sources",
    subtitle: "What documents exist, how reliable are they, and what can we actually know",
    icon: "ScrollText",
    color: "#1B4332",
    estimatedMinutes: 12,
    linkedConcepts: ["historical-jesus", "gospel-authorship"],
    linkedWords: ["logos", "kerygma"],
    linkedDossiers: [],
    sections: [
      {
        id: "ch1-s1",
        title: "The Paper Trail",
        content: `The earliest documents we have about Jesus were not written by eyewitnesses. They were not written during his lifetime. The first surviving Christian texts -- Paul's letters -- date to roughly 50 CE, about twenty years after the crucifixion. The earliest gospel, Mark, was probably written around 70 CE, forty years after the events it describes. By the time John was composed, we're likely at 90 to 100 CE, two full generations removed from the man himself.\n\nThis does not make them useless. It makes them complicated. A document written forty years after an event by someone embedded in a community shaped by that event is not worthless history -- it's history filtered through faith, community memory, oral tradition, and theological agenda. All four canonical gospels are exactly this.\n\nOutside Christian sources, we have almost nothing. The Roman historian Tacitus mentions Christians and their founder being executed under Pontius Pilate -- written around 116 CE. Josephus, the Jewish historian, has two passages about Jesus, one of which is almost certainly a later Christian interpolation, the other probably authentic in its core. That's it. Rome's administrative records don't mention him at all. He was a provincial peasant executed for sedition -- not the kind of person Roman bureaucrats documented.`,
        scholarlyNote: `Bart Ehrman's "Jesus: Apocalyptic Prophet of the New Millennium" provides the clearest breakdown of source dating. The Tacitus passage (Annals 15.44) is generally accepted as authentic. The Josephus passage called the Testimonium Flavianum (Antiquities 18.3.3) is likely a Christian-altered version of an originally less enthusiastic reference. E.P. Sanders' "The Historical Figure of Jesus" gives a careful accounting of what these sources can and cannot tell us.`,
        pullQuote: "The earliest gospel was written forty years after the crucifixion. That's not a problem to explain away -- it's the actual situation we're working with.",
      },
      {
        id: "ch1-s2",
        title: "The Synoptic Problem",
        content: `Matthew, Mark, and Luke share so much material -- sometimes word for word -- that they cannot be independent accounts. Scholars call this the Synoptic Problem, which is less a problem than a puzzle with a fairly clear solution: Mark came first. Matthew and Luke both used Mark as a source, often copying him almost verbatim. They also shared another source -- now lost -- that scholars call Q, from the German Quelle, meaning "source." This hypothetical Q document contained mostly sayings of Jesus.\n\nThe practical implication: when Matthew and Mark tell the same story, you're not getting two independent witnesses. You're getting Matthew rewriting Mark. The "two witnesses" argument for historical reliability collapses when you realize one witness was copying the other.\n\nJohn's gospel is a completely different animal. It has almost nothing in common with the synoptics in structure, vocabulary, or theological framing. The Jesus of John delivers long philosophical discourses about himself. The Jesus of Mark barely explains himself and talks almost exclusively about the kingdom of God. These are not stylistic differences. They reflect different theological communities, different agendas, different constructions of who Jesus was.`,
        greekTerms: [
          {
            greek: "Q (Quelle)",
            transliteration: "Quelle",
            meaning: "Source -- the hypothetical lost sayings document used by Matthew and Luke",
          },
        ],
        scholarlyNote: `The two-source hypothesis (Mark + Q) is the dominant solution to the synoptic problem, though the Farrer hypothesis (no Q, Matthew used Mark, Luke used both) has scholarly support. John P. Meier's multi-volume "A Marginal Jew" is the most rigorous systematic treatment of the sources for the historical Jesus.`,
        pullQuote: "When Matthew and Mark tell the same story, you're not getting two witnesses. You're getting one witness and a rewrite.",
      },
      {
        id: "ch1-s3",
        title: "The Criteria of Authenticity",
        content: `Scholars use specific tools to assess which sayings and deeds in the gospels likely go back to the historical Jesus. None of these tools are perfect, but together they provide a working method.\n\nThe criterion of multiple attestation: if a saying or deed appears in more than one independent source -- Mark, Q, Paul, John independently -- it's more likely authentic. The criterion of dissimilarity: if a saying contradicts what we'd expect either early Judaism to emphasize or the early church to invent, it's more likely to come from Jesus himself. The early church, for instance, had strong reasons to claim Jesus taught his followers to be baptized. It's less clear why they would invent his own baptism by John -- since it implies Jesus needed purification, which is theologically awkward. That awkwardness suggests it happened.\n\nThe criterion of embarrassment is one of the most useful: if the early church preserved a tradition that was uncomfortable for them, they probably kept it because it was too well-known to suppress. The cry of dereliction from the cross -- "My God, my God, why have you forsaken me?" -- was clearly difficult for early Christians who believed Jesus was divine. Its presence in the text suggests it was remembered.`,
        greekTerms: [
          {
            greek: "ipsissima vox",
            transliteration: "ipsissima vox",
            meaning: "Latin: the very voice -- the authentic core of what Jesus taught, distinguished from the exact words",
          },
        ],
        scholarlyNote: `These criteria were developed and refined over the 20th century. N.T. Wright critiques their over-application in "Jesus and the Victory of God," arguing they atomize Jesus sayings from their narrative context. John Dominic Crossan uses them most systematically in "The Historical Jesus: The Life of a Mediterranean Jewish Peasant." The criteria don't prove authenticity -- they establish relative probability.`,
        pullQuote: "The cry of dereliction from the cross was embarrassing to the early church. That's probably why it survived.",
      },
      {
        id: "ch1-s4",
        title: "What We Can Know",
        content: `After all the source criticism, the criterion analysis, and the scholarly debate, what can we say with genuine confidence?\n\nJesus of Nazareth existed. He was a Galilean Jew who lived in the early first century CE. He was associated with John the Baptist. He gathered disciples. He taught using parables. He performed acts understood by his contemporaries as healings and exorcisms. He attracted controversy. He went to Jerusalem. He was executed by crucifixion under Pontius Pilate, probably between 30 and 33 CE. His followers believed he had been raised from the dead and continued gathering in communities after his death.\n\nThis is actually quite a bit. We know the shape of a life -- its beginning in Galilee, its association with a prophetic movement, its confrontational end in Jerusalem. What we cannot recover with confidence is the exact wording of most sayings, the precise chronology, or the interior experience of the man himself. What we have is the outline of a remarkable person filtered through the memories, hopes, and theological convictions of communities that considered him the most important human being who had ever lived. Working carefully within those constraints, a portrait does emerge.`,
        pullQuote: "We cannot recover the exact words. We can recover the shape of a life and the distinctive quality of a mind.",
      },
    ],
  },

  // ── Chapter 2: The World He Lived In ────────────────────────────────────
  {
    id: "ch-2",
    slug: "his-world",
    order: 2,
    title: "The World He Lived In",
    subtitle: "1st century Galilee -- occupation, poverty, and the texture of peasant life",
    icon: "Globe",
    color: "#1D4ED8",
    estimatedMinutes: 14,
    linkedConcepts: ["second-temple-judaism", "roman-empire"],
    linkedWords: ["shalom", "torah"],
    linkedDossiers: [],
    sections: [
      {
        id: "ch2-s1",
        title: "Occupied Territory",
        content: `Galilee in the first century CE was not a peaceful backwater. It was a province under military occupation, squeezed between the demands of Roman taxation and the local aristocracy who collaborated with Rome to maintain their own position. The average Galilean peasant paid taxes to Rome, tithes to the Temple in Jerusalem, rents to landowners, and tolls on goods. Some scholars estimate the total tax burden ran between 35 and 40 percent of income -- for people who were already farming at subsistence level.\n\nRome's presence was not abstract. There were Roman garrisons. Roman roads built by forced labor. Roman soldiers who could compel a civilian to carry their pack for a mile -- the context for Jesus's saying about going "the extra mile." Roman crucifixions were performed publicly, deliberately, as state theater: this is what happens to people who challenge our order. Jesus grew up in a world where crucifixions were not rare. He would have seen them. He would have known what they meant before his own.\n\nUnderstanding this context changes everything. A 21st century American reading Jesus without it is like reading Martin Luther King Jr. without knowing about segregation, redlining, and police violence. The words are there on the page, but the urgency, the stakes, and the courage they represent become invisible.`,
        greekTerms: [
          {
            greek: "angareuein",
            transliteration: "angareuein",
            meaning: "To conscript for labor -- the Roman legal right to compel civilian service, as in 'go the extra mile'",
          },
        ],
        scholarlyNote: `Richard Horsley's "Galilee: History, Politics, People" and "Jesus and the Spiral of Violence" provide the most detailed picture of the socioeconomic conditions. John Dominic Crossan and Jonathan Reed's "Excavating Jesus" uses archaeological evidence to reconstruct daily life. The tax burden estimate comes from K.C. Hanson and Douglas Oakman's "Palestine in the Time of Jesus."`,
        pullQuote: "Jesus grew up in a world where crucifixions were not rare. He would have seen them. He would have known what they meant.",
      },
      {
        id: "ch2-s2",
        title: "Second Temple Judaism",
        content: `Jesus was not a Christian. He was a Jew -- a first-century Galilean Jew embedded in the rich, contentious, diverse world of Second Temple Judaism. The Temple in Jerusalem was not merely a religious site. It was the economic, political, and symbolic center of Jewish life -- a massive institution with its own economy, bureaucracy, and power structure. The high priesthood was a political appointment, often filled by families collaborating with Rome.\n\nWithin Judaism, there were factions with sharply different visions of how Jews should live under occupation. The Pharisees emphasized strict Torah observance as the path to Jewish survival and dignity. The Sadducees, the Temple elite, were accommodationists. The Essenes withdrew from both Rome and the corrupt Temple establishment into their own communities. The Zealots advocated armed resistance. Into this world of factions and arguments about how to be faithfully Jewish under empire, Jesus stepped with his own answer.\n\nHis answer drew on the Prophets more than the law codes, on figures like Amos, Hosea, and Isaiah who confronted the comfortable with demands for justice. This prophetic tradition -- which saw authentic religion as inseparable from the treatment of the poor -- was Jesus's inheritance and his departure point.`,
        scholarlyNote: `E.P. Sanders' "Judaism: Practice and Belief, 63 BCE - 66 CE" is the standard scholarly treatment of the Second Temple period. Amy-Jill Levine's "The Misunderstood Jew" is essential for understanding how Jesus's Jewishness has been systematically erased or distorted in Christian interpretation. The description of the Temple's economic role is drawn from Crossan's "The Birth of Christianity."`,
        pullQuote: "Jesus was not a Christian. He was a first-century Galilean Jew with a specific argument inside a specific debate about how to live faithfully under empire.",
      },
      {
        id: "ch2-s3",
        title: "Peasant Culture and the Honor-Shame World",
        content: `The Mediterranean world of the first century operated on fundamentally different social logic than modern Western society. The primary currency of social life was not money but honor -- public reputation, social standing, the esteem of one's community. Shame was not a private feeling but a public verdict. This honor-shame dynamic shaped every social interaction, from how you greeted a superior to how you ate a meal to who sat where at a dinner table.\n\nJesus's parables are shot through with honor-shame dynamics that his original audience would have felt viscerally and that modern readers usually miss entirely. The father in the parable of the prodigal son runs to meet his returning child -- a thing no self-respecting Mediterranean patriarch would do, because running was undignified, shameful for a man of his station. The father shames himself publicly to spare his son further humiliation. That's the theological point. But you can only feel it if you know the social world.\n\nPeasant communities also operated on what anthropologists call the "limited good" model: the assumption that there is only so much of everything -- honor, land, health, wealth -- and that one person's gain necessarily comes at another's loss. This is why generosity was so countercultural: it implied either that you had so much you could afford to give, or that you had rejected the whole competitive logic of scarcity. Jesus repeatedly models and advocates the second option.`,
        greekTerms: [
          {
            greek: "time",
            transliteration: "time",
            meaning: "Honor -- the primary social currency of the ancient Mediterranean world",
          },
        ],
        scholarlyNote: `Bruce Malina and Richard Rohrbaugh's "Social-Science Commentary on the Synoptic Gospels" applies cultural anthropology systematically to gospel texts. The "limited good" concept comes from George Foster's anthropological work and its application to New Testament studies by Malina. These social-science readings have been criticized for over-generalizing Mediterranean culture, but they illuminate dimensions of the text that conventional commentary ignores.`,
        pullQuote: "The father in the parable runs to meet his son -- a thing no self-respecting Mediterranean patriarch would do. That's the point. He shames himself to restore his child.",
      },
    ],
  },

  // ── Chapter 3: What He Actually Said ────────────────────────────────────
  {
    id: "ch-3",
    slug: "what-he-said",
    order: 3,
    title: "What He Actually Said",
    subtitle: "Parables as subversive speech, the Beatitudes as manifesto, and the Greek behind the English",
    icon: "MessageCircle",
    color: "#7C3AED",
    estimatedMinutes: 16,
    linkedConcepts: ["sermon-on-the-mount", "parables"],
    linkedWords: ["basileia", "makarios"],
    linkedDossiers: [],
    sections: [
      {
        id: "ch3-s1",
        title: "Parables as Subversion",
        content: `A parable is not an illustration. It is not a nice story with a moral lesson attached. In Jesus's usage, a parable is a device for disrupting the listener's settled assumptions -- for making you see the world differently by coming at it sideways. The Greek word is parabole, from para (beside) and ballo (to throw): something thrown alongside, not at, the target.\n\nThe parable of the Good Samaritan is a perfect example. A lawyer asks Jesus who counts as "neighbor" under the commandment to love your neighbor. Jesus responds with a story in which the hero is a Samaritan -- the ethnic and religious group that Jews most despised, and vice versa. He does not say, "Everyone is your neighbor." He tells a story that forces you to say the despised outsider was the one who actually did the right thing. The conclusion is logically the same, but the emotional experience is entirely different. You are made to speak it from your own mouth.\n\nParables also have an element of intentional ambiguity. The parable of the Prodigal Son can be read as a story about forgiveness, or as a critique of the elder son's resentment, or as a challenge to the crowd of Pharisees Jesus is addressing. The best parables hold multiple readings simultaneously. This is not theological carelessness -- it is sophisticated speech design.`,
        greekTerms: [
          {
            greek: "parabole",
            transliteration: "parabole",
            meaning: "Parable -- from para (beside) and ballo (to throw): thrown alongside, not directly at",
          },
        ],
        scholarlyNote: `C.H. Dodd's "The Parables of the Kingdom" established the landmark argument that parables are not allegories. Bernard Brandon Scott's "Hear Then the Parable" provides a comprehensive literary analysis of each synoptic parable. Amy-Jill Levine's "Short Stories by Jesus" argues that Christian interpretation has systematically domesticated the parables' original sharpness by making them confirm what readers already believe.`,
        pullQuote: "A parable is not a nice story with a lesson. It is a device for making you see the world differently by coming at it sideways.",
      },
      {
        id: "ch3-s2",
        title: "Basileia: Kingdom or Reign?",
        content: `The phrase that appears more than any other in Jesus's teaching -- "the kingdom of God" -- is routinely misread because of the word "kingdom." The Greek is basileia tou theou. Basileia does not primarily mean a territory, a place, a future destination. It means a reign, a rule, an active exercise of sovereignty. The question "the kingdom is coming" does not mean "a realm is approaching" -- it means "God's active reign is breaking in."\n\nThis distinction matters enormously for how you understand Jesus's urgency. When he says "the kingdom of God is at hand," he is not describing a distant heaven. He is announcing that the way God rules -- justice, mercy, restoration, the last becoming first -- is actively invading the present moment. The poor are blessed because God's reign, which inverts worldly hierarchies, is not coming eventually: it is here now.\n\nThe "kingdom" translation also obscures the political charge of the original. In a world where Caesar's imperial reign was the dominant fact of political life, announcing an alternative reign -- God's basileia over against Caesar's -- was not a spiritual retreat from politics. It was a direct counter-claim. Jesus's proclamation took place in a world saturated with kingdom language, and his audience would have heard the tension immediately.`,
        greekTerms: [
          {
            greek: "basileia tou theou",
            transliteration: "basileia tou theou",
            meaning: "Kingdom / reign of God -- an active divine sovereignty breaking into the present, not merely a future place",
          },
        ],
        scholarlyNote: `N.T. Wright's reconstruction of "kingdom of God" language in its Second Temple context is definitive: see "Jesus and the Victory of God," chapters 6-10. John Dominic Crossan and Wright famously disagree on whether Jesus's kingdom announcement is primarily social-political (Crossan) or cosmological-apocalyptic (Wright). Both readings are more historically grounded than the "heaven after you die" interpretation that dominates popular Christianity.`,
        pullQuote: "Basileia means reign, not realm. Jesus was not announcing a destination. He was announcing an invasion of the present order.",
      },
      {
        id: "ch3-s3",
        title: "The Beatitudes: A Manifesto for the Powerless",
        content: `The Beatitudes -- the opening of the Sermon on the Mount -- are perhaps the most misread passage in the entire New Testament. "Blessed are the meek, for they shall inherit the earth." In most modern ears this sounds like consolation: be patient, endure suffering, and eventually things will get better in the next life. This is almost exactly backwards from what the text says and means.\n\nThe Greek word makarios, translated "blessed," does not mean "will be rewarded after death." It is a congratulatory exclamation, closer to "How fortunate!" or even "Congratulations!" -- the same word used to congratulate someone who has just received good news. It describes a present reality, not a future promise. And the statements themselves are performative reversals: Jesus is declaring, in the present tense, that the ones the world calls losers -- the poor, the grieving, the persecuted -- are actually the ones the divine order is oriented toward.\n\nThe word "meek" is a disastrous translation of praus, which in Greek carried connotations of power under control, the disciplined strength of a warhorse that responds to its rider. A better translation might be "the non-violent" or "the restrained powerful." The Beatitudes are not celebrating victimhood. They are announcing a comprehensive inversion of worldly value -- who matters, who is seen, whose suffering registers in the divine economy.`,
        greekTerms: [
          {
            greek: "makarios",
            transliteration: "makarios",
            meaning: "Blessed / fortunate -- a present-tense congratulation, not a future promise of reward",
          },
          {
            greek: "praus",
            transliteration: "praus",
            meaning: "Meek -- not weakness but disciplined, non-violent strength; power under restraint",
          },
        ],
        scholarlyNote: `The Sermon on the Mount in Matthew (chapters 5-7) and Luke's Sermon on the Plain (chapter 6) likely both draw on Q. Hans Dieter Betz's "The Sermon on the Mount" is the most comprehensive commentary. Warren Carter's "Matthew and the Margins" reads the Beatitudes explicitly as political speech countering imperial values. The translation of praus as "non-violent" draws on Walter Wink's analysis in "Engaging the Powers."`,
        pullQuote: "Makarios is not 'will be rewarded.' It is a congratulatory shout in the present tense. 'How fortunate are you -- right now -- who have nothing the world counts as fortune.'",
      },
    ],
  },

  // ── Chapter 4: What He Actually Did ─────────────────────────────────────
  {
    id: "ch-4",
    slug: "what-he-did",
    order: 4,
    title: "What He Actually Did",
    subtitle: "Healings as social restoration, table fellowship as politics, and the temple confrontation",
    icon: "Zap",
    color: "#B45309",
    estimatedMinutes: 14,
    linkedConcepts: ["healing-miracles", "purity-codes"],
    linkedWords: ["therapeia", "aphiemi"],
    linkedDossiers: [],
    sections: [
      {
        id: "ch4-s1",
        title: "Healings as Social Restoration",
        content: `In the first century, illness was not merely a medical condition. It was a social verdict. Skin disease (often translated "leprosy" but covering a range of conditions) rendered a person ritually impure -- excluded from worship, from community commerce, from physical touch. Blindness, deafness, paralysis all carried stigma: popular theology interpreted disability as divine punishment for sin. The sick person was doubly afflicted: by the condition itself and by the social exclusion it produced.\n\nWhen Jesus healed someone, he was not performing a magic trick. He was restoring them to community. The instruction to healed lepers to "show yourselves to the priests" -- the procedure for readmission to communal life -- appears in the synoptic accounts precisely because that was the point. The healing mattered; the social reinstatement mattered equally.\n\nThe connection between healing and forgiveness of sin in the gospels makes complete sense in this framework. To say "your sins are forgiven" was not primarily a transaction with God. It was a social declaration that the person was no longer outside the community. Jesus's accusers understood this correctly -- they objected that forgiveness of sins was God's prerogative, not a human being's. The argument was about social authority, not doctrinal mechanics.`,
        greekTerms: [
          {
            greek: "therapeia",
            transliteration: "therapeia",
            meaning: "Healing / therapeutic care -- in the gospels, it encompasses physical, social, and spiritual restoration together",
          },
        ],
        scholarlyNote: `John Pilch's "Healing in the New Testament" applies medical anthropology to the healing traditions. The social-restoration reading of miracles is developed throughout Crossan's work and in Marcus Borg's "Jesus: A New Vision." The relationship between purity codes and social exclusion is documented carefully in Jerome Neyrey's "The Social World of Luke-Acts."`,
        pullQuote: "When Jesus touched a leper, the healing mattered. But the touch itself -- the deliberate violation of the no-contact rule -- that was the announcement.",
      },
      {
        id: "ch4-s2",
        title: "Table Fellowship as Political Act",
        content: `In the ancient Mediterranean world, sharing a meal was not casual. Who you ate with defined your social identity -- your purity status, your political alliances, your standing in the community. Eating with someone was a statement about who you considered an equal, who you were willing to be seen with, whose world you were endorsing.\n\nJesus ate with tax collectors, which in first-century Galilee were not merely unpopular bureaucrats. They were Jews who collected taxes on behalf of Rome and kept a portion for themselves -- collaborators with the occupation, economic predators on their own people, ritual outcasts from the synagogue. Eating with them was not tolerance. It was a deliberate public act that said: these people belong at the table of God's reign.\n\nHe ate with "sinners" -- a category that included anyone who violated purity codes, which often meant people who were poor, ill, or in despised occupations. He ate with Pharisees too, and used those occasions to challenge them. The consistent pattern across all sources is that Jesus used shared meals as an enactment of his message: the kingdom of God is an open table, and who gets excluded from it is precisely who gets included here.`,
        scholarlyNote: `The social significance of table fellowship is analyzed in Crossan's "The Historical Jesus" and in Scott Bartchy's work on ancient dining practices. Norman Perrin established the centrality of open table fellowship in "Rediscovering the Teaching of Jesus." Luke's gospel preserves the greatest number of meal scenes, perhaps reflecting a particular community's memory of this aspect of Jesus's practice.`,
        pullQuote: "The kingdom of God is an open table. And who gets excluded from it is precisely who gets included here.",
      },
      {
        id: "ch4-s3",
        title: "The Temple: Confrontation, Not Cleansing",
        content: `Every Christian who went to Sunday school was taught that Jesus "cleansed" the Temple -- that he drove out the money-changers because they had turned a house of prayer into a den of thieves, and that he was restoring the Temple to its proper sacred function. This reading fundamentally misrepresents what almost certainly happened and why.\n\nThe money-changers and dove-sellers were not corrupt. They were providing a necessary service: Roman coins with the Emperor's image could not be used for Temple offerings (idolatry), so pilgrims exchanged them for Tyrian shekels. Sacrificial animals had to be certified ritually pure; purchasing them on-site spared travelers from bringing animals across long distances. This was the Temple economy functioning exactly as designed.\n\nWhat Jesus did -- overturning the tables, blocking the movement of goods through the Temple courts -- was not reform. It was disruption. A symbolic act of prophetic confrontation, in the tradition of the Hebrew prophets who staged dramatic actions to make their point. And the message was not "do business more honestly." It was closer to what the prophets had said: you cannot buy your way to God. Your offering means nothing if your neighbor is starving. Mark brackets the Temple action with the cursing of a fig tree, linking the Temple symbolically to a fruitless institution headed for destruction. Within days, Jesus was arrested. The Temple action is the most likely immediate cause.`,
        greekTerms: [
          {
            greek: "oikos proseuches",
            transliteration: "oikos proseuches",
            meaning: "House of prayer -- what Jesus calls the Temple in the confrontation; drawn from Isaiah 56",
          },
        ],
        scholarlyNote: `E.P. Sanders argues in "Jesus and Judaism" that the Temple action was not about commercial corruption but a symbolic prophetic act against the Temple establishment itself. N.T. Wright largely agrees that it was an act of prophetic symbolism. The "cleansing" interpretation goes back to early Christian tradition attempting to distinguish Jesus's action from sedition. The political consequences (arrest within days) strongly suggest Rome and the Temple authorities understood it as a direct challenge to institutional authority.`,
        pullQuote: "The money-changers were not corrupt. They were doing their jobs. What Jesus disrupted was not the corruption of the Temple. It was the Temple.",
      },
    ],
  },

  // ── Chapter 5: Who He Included ───────────────────────────────────────────
  {
    id: "ch-5",
    slug: "who-he-included",
    order: 5,
    title: "Who He Included",
    subtitle: "Women, Samaritans, collaborators, and the deliberately excluded -- inclusion as radical act",
    icon: "Users",
    color: "#065F46",
    estimatedMinutes: 13,
    linkedConcepts: ["women-in-ministry", "samaritan-woman"],
    linkedWords: ["agape", "xenos"],
    linkedDossiers: [],
    sections: [
      {
        id: "ch5-s1",
        title: "Women in a Patriarchal World",
        content: `In the world Jesus inhabited, women were legal minors. They could not testify in court. They could not study Torah with a rabbi. Public conversation between unrelated men and women was itself suspect -- a woman who spoke freely in public was making a claim her society did not permit. When Jesus speaks directly to the Samaritan woman at the well (John 4), the disciples "were astonished that he was talking with a woman" -- the text notes their astonishment without defending it, because the reaction was completely expected.\n\nThe gospel accounts preserve, despite the pressures of the later church, an extraordinary picture of women as central to Jesus's movement. Mary Magdalene, Joanna, Susanna are named as funding the movement from their own resources. Women are present at the crucifixion when the male disciples have fled. In all four gospels, women are the first witnesses to the resurrection -- a detail the early church would almost certainly have suppressed if they were inventing the story, since women's testimony had no legal standing.\n\nThis is not to project modern feminism onto first-century Galilee. Jesus did not articulate a theory of gender equality. But his consistent practice of including women as students, supporters, conversation partners, and witnesses represents a persistent friction with the gender arrangements of his world that the traditions preserve in spite of themselves.`,
        greekTerms: [
          {
            greek: "mathetes",
            transliteration: "mathetes",
            meaning: "Disciple / student -- applied to women in Luke 10:39 when Mary of Bethany takes the student position at Jesus's feet",
          },
        ],
        scholarlyNote: `Elisabeth Schussler Fiorenza's "In Memory of Her" reconstructed the role of women in early Christianity from fragments the tradition tried to erase. Ben Witherington III's "Women in the Ministry of Jesus" examines the gospel evidence more conservatively. The legal status of women in first-century Jewish Palestine is documented in Tal Ilan's "Jewish Women in Greco-Roman Palestine."`,
        pullQuote: "Women are the first witnesses to the resurrection in all four gospels. The early church would not have invented this -- women's testimony had no legal standing. They kept it because it was true.",
      },
      {
        id: "ch5-s2",
        title: "Samaritans: The Hated Neighbor",
        content: `The hostility between Jews and Samaritans in the first century was not a minor cultural tension. It was a centuries-old ethnic and religious rift, involving competing claims to the authentic Israelite heritage, a separate Temple on Mount Gerizim that Jews considered apostate, and mutual contempt reinforced across generations. A first-century Jew calling someone a Samaritan was roughly equivalent to calling them a traitor, a heretic, and a foreigner simultaneously.\n\nThe parable of the Good Samaritan is structured so that its first-century Jewish audience would have been waiting for the priest, the Levite, and the Israelite -- the expected three-part pattern. The hero was supposed to be the ordinary Jewish person, after the religious leaders failed. Jesus substitutes a Samaritan. He makes the audience say it: the one who acted mercifully was the Samaritan. He forces his listeners to speak their own condemnation of ethnic tribalism from their own mouths.\n\nThe Samaritan woman at the well (John 4) is a similarly loaded encounter. Jesus not only speaks to a woman alone, he asks for water from her vessel -- a ritually impure act. He knows her life story and does not condemn it. He engages her in one of the longest theological conversations in the gospels, and she becomes his first missionary. The two people society had defined as maximally "other" -- woman, Samaritan -- are the recipients of Jesus's most extended encounters.`,
        scholarlyNote: `Amy-Jill Levine's analysis of the Good Samaritan in "Short Stories by Jesus" recovers the full shock of the original by insisting we feel the Samaritan as the audience would have -- with hostility, not as a neutral "foreigner." The Samaritan woman passage (John 4) is analyzed in Sandra Schneiders' "The Revelatory Text." The history of Jewish-Samaritan relations is documented in Reinhard Pummer's "The Samaritans: A Profile."`,
        pullQuote: "Jesus makes his listeners say it from their own mouths: the one who acted mercifully was the Samaritan. That was the whole design.",
      },
      {
        id: "ch5-s3",
        title: "The Logic of Radical Inclusion",
        content: `The consistent pattern across all the source traditions is inclusion that does not ask for prior transformation. Jesus does not tell Zacchaeus, the chief tax collector in Jericho, that he will dine with him once he repents. He announces he will stay at his house. The repentance follows the inclusion, not the other way around. This is a completely different logic from the standard religious arrangement, in which belonging is the reward for prior conformity.\n\nThis pattern -- inclusion precedes transformation -- appears throughout the authentic Jesus traditions. Lepers are touched before they are healed. The prodigal son is embraced while still at a distance, before he delivers his prepared speech of contrition. The woman caught in adultery is not condemned before she is told to go and live differently. The belonging comes first. The change becomes possible inside the belonging.\n\nThe theological implication is radical: grace is not a reward for behavior. It is the atmosphere in which behavior becomes possible. This is why the Pharisees in the gospels are consistently portrayed as Jesus's sharpest opponents -- not because they were hypocrites, but because their entire system of religious logic required purity before participation. Jesus reversed the sequence, and they correctly understood this as a threat to the entire structure of merit-based religious life.`,
        greekTerms: [
          {
            greek: "charis",
            transliteration: "charis",
            meaning: "Grace / gift -- unearned favor; the logic of the divine economy Jesus consistently models",
          },
        ],
        pullQuote: "Zacchaeus repents after Jesus invites himself to dinner -- not before. Inclusion precedes transformation. That is the whole system.",
      },
    ],
  },

  // ── Chapter 6: How He Died ───────────────────────────────────────────────
  {
    id: "ch-6",
    slug: "how-he-died",
    order: 6,
    title: "How He Died",
    subtitle: "Crucifixion as state terror -- the political charges, the cry from the cross, and why Rome killed him",
    icon: "Landmark",
    color: "#7F1D1D",
    estimatedMinutes: 15,
    linkedConcepts: ["crucifixion", "passion-narrative"],
    linkedWords: ["lema sabachthani"],
    linkedDossiers: [],
    sections: [
      {
        id: "ch6-s1",
        title: "Crucifixion Was State Terror",
        content: `Crucifixion was not a neutral method of execution. Rome used it specifically and deliberately for slaves, rebels, and people who threatened Roman order -- never for Roman citizens, regardless of their crimes. It was designed to be as prolonged, humiliating, and public as possible. The condemned person was stripped naked and displayed at a crossroads or main road, where passersby could witness and internalize the message: this is what happens to people who challenge us.\n\nThe bodies were left on display for days. Burial was often denied -- another element of the punishment, since proper burial was a deep cultural and religious obligation. The family's inability to provide burial was part of the humiliation. Crucifixion was not just killing. It was a comprehensive destruction of the person's dignity, identity, and social memory. The point was deterrence through spectacle.\n\nJesus was crucified between two other men described in the Greek as lestai -- usually translated "thieves" but more accurately rendered "brigands" or "insurrectionists," the same word Josephus uses for anti-Roman rebels. He died in the company of people Rome classified as political enemies. This was not incidental. The charge posted on his cross -- "King of the Jews" -- was the specific political accusation that got him killed. Not blasphemy. Sedition.`,
        greekTerms: [
          {
            greek: "lestai",
            transliteration: "lestai",
            meaning: "Bandits / insurrectionists -- the word used for Jesus's companions at the crucifixion; not ordinary thieves but anti-Roman rebels",
          },
        ],
        scholarlyNote: `Martin Hengel's "Crucifixion" is the definitive historical study. The charge posted on the cross (titulus) is found in all four gospels in slightly different forms -- the variation itself suggests they are drawing on authentic memory rather than constructing the scene. N.T. Wright's "Jesus and the Victory of God" and John Dominic Crossan's "Who Killed Jesus?" both argue that Rome executed Jesus on a political charge, whatever the internal Jewish legal proceedings may have looked like.`,
        pullQuote: "The charge on the cross was 'King of the Jews.' That is a political charge. Rome did not crucify people for theology.",
      },
      {
        id: "ch6-s2",
        title: "The Cry from the Cross",
        content: `"My God, my God, why have you forsaken me?" This is the only saying from the cross preserved in both Mark and Matthew, and it is the most theologically uncomfortable line in the entire New Testament. The early church wanted a dying Jesus who was serene, forgiving, triumphant -- and all three of those are available in Luke and John. Mark and Matthew preserve something else: a dying man in total desolation, crying out in Aramaic (Eloi, Eloi, lema sabachthani) with a question that has no answer in the text.\n\nThese are the opening words of Psalm 22, which many scholars suggest Jesus is reciting in full -- the psalm that begins in abandonment and ends in vindication. On this reading, the cry is an act of hope disguised as despair. But we should be careful not to let that interpretation make the desolation disappear too quickly. The cry is preserved. The desolation is in the text. What we see is a man at the extreme limit of human suffering asking the most human question there is.\n\nThe embarrassment criterion applies here with force: early Christians had every reason to soften or remove this line. They kept it. Luke's version ("Father, into your hands I commit my spirit") and John's version ("It is finished") are more theologically tidy. Mark's version, which most scholars consider the earliest, is raw and unresolved. That rawness is probably why it survived.`,
        greekTerms: [
          {
            greek: "Eloi, Eloi, lema sabachthani",
            transliteration: "Eloi lema sabachthani",
            meaning: "My God, my God, why have you forsaken me -- Aramaic, quoting Psalm 22:1; preserved untranslated in Mark and Matthew",
          },
        ],
        scholarlyNote: `Raymond Brown's two-volume "The Death of the Messiah" is the most thorough treatment of the passion narratives. The interpretation of the cry as recitation of Psalm 22 is argued by many scholars, including N.T. Wright. Jürgen Moltmann's "The Crucified God" is a systematic theological meditation on the desolation as theologically central rather than an embarrassment to explain away.`,
        pullQuote: "Mark's dying Jesus asks a question the text never answers. That rawness is probably why it survived -- too well-known to change.",
      },
      {
        id: "ch6-s3",
        title: "Why Rome Killed Him -- And Why the Church Reframed It",
        content: `The historical explanation for why Jesus was crucified is not complicated. He went to Jerusalem at Passover -- the most politically charged moment of the year, when the city was swollen with pilgrims and tensions were highest. He staged a dramatic disruption of the Temple, the symbolic and economic center of both Jewish religious life and Roman-backed power. The Temple authorities, who maintained their position through collaboration with Rome, saw him as a threat to their arrangement. Pilate, whose job was to keep order, executed him on the standard charge for political troublemakers: claiming to be king.\n\nThis is what the historical evidence supports. It is not the only layer of meaning, but it is the foundational one.\n\nThe early church, writing after the resurrection and developing theology across a Roman Empire they needed to survive in, had strong reasons to shift the narrative. Blaming Rome for killing Jesus was politically dangerous. Blaming the Jewish leadership was safer and increasingly attractive as Judaism and Christianity separated. The theological reframe -- Jesus died not as a victim of political execution but as a willing sacrifice for sin -- emerged gradually across the first and second centuries. Paul's letters begin it. The creeds cement it. By the fourth century, the state execution of a Galilean peasant had been transformed into a cosmic transaction. Both stories exist in the tradition. Only one of them is historical.`,
        scholarlyNote: `Gerard Sloyan's "The Crucifixion of Jesus: History, Myth, Faith" traces the development from historical event to theological interpretation. The political responsibility for the crucifixion is carefully analyzed in Raymond Brown's "The Death of the Messiah" -- Brown concludes that both Jewish and Roman authorities bear responsibility, with the Roman execution itself being historically certain. The gradual development of atonement theology is traced in Elaine Pagels' "The Origin of Satan" and in Stephen Finlan's "Problems with Atonement."`,
        pullQuote: "The historical explanation for the crucifixion is not complicated. He disrupted the Temple at Passover. The authorities removed him. Rome called it sedition.",
      },
    ],
  },

  // ── Chapter 7: What Happened After ──────────────────────────────────────
  {
    id: "ch-7",
    slug: "what-happened-after",
    order: 7,
    title: "What Happened After",
    subtitle: "Resurrection traditions, the gradual divinization of Jesus, and how a teacher became the second person of the Trinity",
    icon: "Sunrise",
    color: "#92400E",
    estimatedMinutes: 16,
    linkedConcepts: ["resurrection", "council-of-nicaea"],
    linkedWords: ["anastasis", "kyrios"],
    linkedDossiers: [],
    sections: [
      {
        id: "ch7-s1",
        title: "The Resurrection Traditions",
        content: `The earliest account of the resurrection is not in any of the four gospels. It is in Paul's first letter to the Corinthians, written roughly 50 CE, in which Paul lists appearances of the risen Jesus: to Peter, to the twelve, to more than five hundred people at once, to James, to all the apostles, and last of all to Paul himself. This list -- the oldest we have -- does not describe an empty tomb. It describes a series of visionary encounters.\n\nMark's gospel, the earliest, originally ended at chapter 16, verse 8: the women flee from the empty tomb and say nothing to anyone "because they were afraid." That is the end. No resurrection appearances. Just the empty tomb and terrified silence. The longer endings of Mark are later additions, almost universally recognized as such by scholars. The first gospel to be written concluded with fear and absence, not triumph.\n\nMatthew, Luke, and John each add resurrection appearances -- and they contradict each other on almost every detail. Where do the appearances happen? Galilee (Matthew) or Jerusalem (Luke)? Who is present? What does Jesus say and do? How long does he stay? The traditions do not harmonize. This is not necessarily evidence against the resurrection, but it is evidence that what happened was not a single, clearly witnessed public event that everyone agreed on. Something happened. What it was produced radically different accounts across different communities.`,
        greekTerms: [
          {
            greek: "anastasis",
            transliteration: "anastasis",
            meaning: "Resurrection -- literally a standing up again; in the New Testament, the bodily rising of Jesus from death",
          },
        ],
        scholarlyNote: `The Corinthians creed (1 Cor 15:3-7) is widely accepted as pre-Pauline, possibly dating to within five years of the crucifixion -- making it the earliest resurrection text we have. N.T. Wright's "The Resurrection of the Son of God" is the most comprehensive defense of a bodily resurrection. Gerd Ludemann's "The Resurrection of Jesus: History, Experience, Theology" argues for a visionary, non-bodily experience. John Dominic Crossan argues for a symbolic proclamation rather than a physical event.`,
        pullQuote: "Mark's gospel originally ended with fear and silence. The women said nothing to anyone. That was the first ending.",
      },
      {
        id: "ch7-s2",
        title: "From Teacher to Lord: The Gradual Divinization",
        content: `The Jesus of the earliest sources is not the second person of the Trinity. He is a Jewish teacher who speaks with extraordinary authority, performs remarkable acts, is identified by his followers as Messiah, and is raised from the dead. This is an exalted figure -- but in the first century, exalted figures were not automatically considered divine in the Greek philosophical sense.\n\nThe elevation of Jesus to full divine status happened gradually, over approximately three centuries. Paul, writing in the 50s, already uses language that implies cosmic significance: Jesus was "in the form of God" before his incarnation (Philippians 2). Mark, written around 70, has a lower Christology -- Jesus is the Son of God but there are elements of limitation, learning, and genuine suffering. John, written around 90-100, opens with "In the beginning was the Word, and the Word was God" -- a direct claim to divine status from the very start of existence.\n\nThe trajectory is clear: as time passes, Jesus becomes more explicitly divine in the texts. What was implicit in Paul becomes explicit in John. What was narrative in John becomes philosophical definition in the councils of the fourth century. The Council of Nicaea in 325 CE did not invent the divinity of Jesus -- but it did crystallize and enforce a specific metaphysical definition that the church then treated as always having been the case.`,
        greekTerms: [
          {
            greek: "kyrios",
            transliteration: "kyrios",
            meaning: "Lord -- used in the Greek Old Testament for God (YHWH) and applied to Jesus in the earliest Christian texts; a loaded claim",
          },
        ],
        scholarlyNote: `Bart Ehrman's "How Jesus Became God" traces the development of Christology from a "low" to a "high" view across the New Testament period and beyond. Larry Hurtado's "Lord Jesus Christ" offers a more conservative reading that places a high view of Jesus surprisingly early. The Council of Nicaea and subsequent councils are analyzed in Rowan Williams' "Arius: Heresy and Tradition."`,
        pullQuote: "Nicaea did not invent the divinity of Jesus. But it crystallized a specific metaphysical definition and then treated it as always having been true.",
      },
      {
        id: "ch7-s3",
        title: "The Communities That Carried the Story",
        content: `Between the crucifixion and the writing of the gospels, Jesus's story lived in communities -- small groups of people in Palestine and across the Mediterranean who gathered, shared meals, told stories about him, and argued about what those stories meant. These communities shaped the tradition even as they were shaped by it.\n\nDifferent communities preserved different emphases. The Q community, if it existed, seems to have preserved a Jesus focused on wisdom sayings and ethical instruction, with less emphasis on crucifixion and resurrection. The Markan community preserved a Jesus who suffers, struggles, and provokes. The Johannine community preserved a Jesus who is preexistent divine Logos from the beginning. The Gospel of Thomas, probably early, preserves a Jesus who speaks in riddles designed to produce interior awakening rather than external events.\n\nWhat we call "Christianity" is not the pure transmission of one original message. It is the product of multiple communities' efforts to make meaning from a remarkable person's life and death. Some of those efforts are in the New Testament. Many are not. What we have is the version that won -- that survived the political and theological battles of the first four centuries. Understanding this does not diminish the tradition. It makes it more honest, and it opens the door to asking what was said before the winners decided what the canon would say.`,
        scholarlyNote: `The community-formation thesis is central to form criticism (Bultmann) and redaction criticism. Helmut Koester's "Ancient Christian Gospels" catalogues the diversity of early Christian textual traditions. Elaine Pagels' "The Gnostic Gospels" brings the non-canonical traditions to a general audience. The Gospel of Thomas is analyzed most carefully in Stephen Patterson's "The Gospel of Thomas and Jesus."`,
        pullQuote: "What we call Christianity is not the pure transmission of one original message. It is multiple communities' efforts to make meaning from a remarkable life. What we have is the version that won.",
      },
    ],
  },

  // ── Chapter 8: The Teacher Behind the Christ ─────────────────────────────
  {
    id: "ch-8",
    slug: "the-teacher",
    order: 8,
    title: "The Teacher Behind the Christ",
    subtitle: "Stripping away the layers -- what emerges when you remove the theology",
    icon: "Eye",
    color: "#2D6A4F",
    estimatedMinutes: 12,
    linkedConcepts: ["historical-jesus", "ethics-of-jesus"],
    linkedWords: ["agape", "dikaiosyne"],
    linkedDossiers: [],
    sections: [
      {
        id: "ch8-s1",
        title: "What the Layers Cover",
        content: `By the time you reach the Jesus most people encounter -- in Sunday school lessons, in Christmas pageants, in pastoral sermons -- you are not encountering a first-century Galilean. You are encountering centuries of accumulated interpretation: Greek philosophical categories imposed on Jewish thought, Roman imperial theology, medieval cosmic hierarchies, Reformation arguments about grace and works, Victorian sentimentality, American individualism. Each layer was added for reasons, and each layer changed the shape of what it covered.\n\nThe historical-critical enterprise of the last two centuries has not been an attack on faith. It has been an attempt to see through the layers to something underneath. The results are contested, incomplete, and sometimes contradictory. No scholar can tell you with certainty what Jesus ate for breakfast or what he privately believed about his own identity. But the cumulative picture that emerges from careful scholarship is not a blank. It is a portrait -- incomplete, argued over, but recognizable.\n\nA Jewish Galilean. A prophet in the tradition of Amos and Isaiah. A healer who restored people to community. A teacher who used story as a weapon of the imagination. A man who ate with the wrong people and touched the wrong people and said the wrong things in the wrong places to the wrong audiences -- and did it consistently, deliberately, until the wrong audiences had him killed.`,
        greekTerms: [
          {
            greek: "dikaiosyne",
            transliteration: "dikaiosyne",
            meaning: "Justice / righteousness -- often translated 'righteousness' with a personal moral meaning, but in Greek it carries the full weight of social justice",
          },
        ],
        pullQuote: "No scholar can tell you what Jesus privately believed about his own identity. But the portrait that emerges is not a blank.",
      },
      {
        id: "ch8-s2",
        title: "The Consistent Ethical Core",
        content: `When you apply the criteria of authenticity across the full body of sayings traditions -- the synoptics, Q, Thomas, Paul -- certain themes appear with enough consistency and enough independence that they almost certainly reflect the historical person.\n\nFirst: the priority of the poor and excluded. Across every source, Jesus consistently oriented his attention and his theology toward people at the bottom of social hierarchies. This is not incidental. It is structural.\n\nSecond: the directness of access to the divine. Jesus consistently depicted God as directly accessible -- as Abba, the Aramaic intimate term for Father, not as a remote sovereign requiring elaborate mediation. The Temple system, the purity codes, the entire apparatus of religious gatekeeping -- Jesus consistently bypassed it by treating the divine as present and available to everyone, regardless of ritual status.\n\nThird: an ethic of non-retaliatory love. Turn the other cheek. Love your enemies. Pray for those who persecute you. These sayings appear across multiple independent sources. They are deeply countercultural, which makes them unlikely inventions. They are difficult to practice, which makes them genuine teaching rather than inspirational sentiment. Whatever else was said about him, the man who said these things was offering a coherent alternative to the logic of power, revenge, and domination.`,
        greekTerms: [
          {
            greek: "abba",
            transliteration: "abba",
            meaning: "Father -- the Aramaic intimate term Jesus used for God, preserved untranslated in Mark 14:36; unusual in Jewish prayer of the period",
          },
        ],
        scholarlyNote: `The consistency of these themes across independent sources is argued by John Meier (A Marginal Jew), E.P. Sanders (Jesus and Judaism), and Marcus Borg (Jesus: A New Vision) despite their significant disagreements on other issues. The abba tradition is analyzed by Joachim Jeremias in "The Prayers of Jesus" -- his argument that the term was uniquely distinctive to Jesus has been modified but not overturned by subsequent scholarship.`,
        pullQuote: "Whatever else was said about him, the man who said 'love your enemies' was offering something coherent: an alternative to the logic of power, revenge, and domination.",
      },
      {
        id: "ch8-s3",
        title: "Why This Still Matters",
        content: `There is a Jesus who exists behind the Christ of the creeds. Not as a replacement for faith or a demolition of tradition, but as the human being from whom the tradition grew -- the specific person in the specific time and place whose particular life generated the immense river of response that has flowed for two thousand years.\n\nKnowing something about that person matters because it tells you what the tradition was originally responding to. The intensity and radicalism of the early movement makes more sense when you encounter the radical figure who ignited it. The persistent tension in the tradition -- between grace and moralism, between inclusion and gatekeeping, between prophetic challenge and institutional accommodation -- is not an accident. It reflects the tension between the historical Jesus and every subsequent attempt to domesticate him.\n\nHe was not a comforting figure. He was not a chaplain to the comfortable. He ate with people his society despised, touched people his religion called unclean, spoke truth to people who had the power to kill him, and was eventually killed by exactly that power. If the tradition derived from him has often been used to sanctify comfort, exclusion, and power, that is not because Jesus endorsed those things. It is because the tradition, like every human tradition, kept reaching for the safest version of a figure who was never safe.`,
        pullQuote: "He was not a chaplain to the comfortable. He was the thing the comfortable needed to be confronted by.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export function getAllChapters(): readonly HumanJesusChapter[] {
  return humanJesusChapters;
}

export function getChapterBySlug(slug: string): HumanJesusChapter | undefined {
  return humanJesusChapters.find((c) => c.slug === slug);
}

export function getChapterById(id: string): HumanJesusChapter | undefined {
  return humanJesusChapters.find((c) => c.id === id);
}

export function getNextChapter(currentSlug: string): HumanJesusChapter | undefined {
  const current = getChapterBySlug(currentSlug);
  if (!current) return undefined;
  return humanJesusChapters.find((c) => c.order === current.order + 1);
}

export function getPreviousChapter(currentSlug: string): HumanJesusChapter | undefined {
  const current = getChapterBySlug(currentSlug);
  if (!current) return undefined;
  return humanJesusChapters.find((c) => c.order === current.order - 1);
}
