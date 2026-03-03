export interface RestorationCategory {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly whatWasStolen: string;
  readonly replacedWith: string;
  readonly evidence: {
    readonly conceptSlugs: readonly string[];
    readonly wordIds: readonly string[];
    readonly passageIds: readonly string[];
  };
  readonly whatItOriginallyLookedLike: string;
  readonly howToReclaimIt: string;
}

export const restorationCategories: readonly RestorationCategory[] = [
  {
    id: "r1",
    slug: "direct-experience",
    name: "Direct Experience of God",
    whatWasStolen:
      "Early Christianity assumed that any baptized person could encounter God directly -- in prayer, in community, in silence. The Desert Fathers fled to the wilderness not to escape God but to find a direct, unmediated encounter with the divine. The mystics of every century -- Eckhart, Julian, John of the Cross -- reported that this experience was available to anyone willing to strip away the clutter. The tradition called it contemplation, and it was considered the natural end of Christian life, not a specialist's luxury.",
    replacedWith:
      "The institution as the sole legitimate mediator between the believer and God. You needed a priest, a sacrament, an approved formula, an authorized channel. Direct experience was suspect -- it could lead to heresy, it was hard to control, and it threatened the clergy's role as gatekeepers. The mystics were often tolerated at best and condemned at worst.",
    evidence: {
      conceptSlugs: [
        "centering-prayer",
        "lectio-divina",
        "cloud-of-unknowing-text",
        "meister-eckhart",
        "desert-mothers",
      ],
      wordIds: ["pneuma", "kardia"],
      passageIds: [],
    },
    whatItOriginallyLookedLike:
      "Desert Fathers and Mothers sitting in cells, practicing watchfulness (nepsis). Early house churches meeting for shared meals, prayer, and Spirit-led worship with no fixed liturgy. The Didache (an early 2nd-century manual) describes charismatic prophets who could extend the Eucharistic prayer freely. Paul's letters describe churches where multiple people speak in tongues, prophesy, and interpret -- a participatory, decentralized encounter with the Spirit available to all members, regardless of gender or status (1 Corinthians 14:26).",
    howToReclaimIt:
      "Begin a practice of silent prayer -- even five minutes a day. The Cloud of Unknowing, Centering Prayer (Thomas Keating), and the Jesus Prayer offer concrete entry points. Read the desert tradition (Benedicta Ward's translations of the Sayings). Find a spiritual director. The direct encounter was never taken away -- only obscured. The pathway back is simpler than most people expect: sit down, be quiet, let go of your image of God, and consent to whatever is actually present.",
  },

  {
    id: "r2",
    slug: "feminine-divine",
    name: "The Feminine Divine",
    whatWasStolen:
      "The Hebrew Bible is full of feminine divine imagery. Hokhmah (Wisdom) is a feminine personification of God's creative intelligence, present at creation, calling from the streets (Proverbs 8). Ruach (Spirit/breath) is grammatically feminine in Hebrew. Shekinah -- God's dwelling presence among the people -- is feminine in Rabbinic literature. God is compared to a mother who cannot forget her nursing child (Isaiah 49:15), to a woman who sweeps her house searching for a lost coin (Luke 15:8-10). The entire Sophia/Divine Wisdom tradition is a sustained exploration of the feminine face of God.",
    replacedWith:
      "Exclusively masculine God language, institutionalized as the only theologically correct way to speak of the divine. 'Father' and 'he' and 'Lord' became not metaphors but quasi-literal designations. The rich feminine imagery of scripture was treated as decorative at best and dangerous at worst. Sophia was absorbed into Logos and her gender erased. Mary was elevated as a feminine figure, but in a way that separated her from divinity and located feminine holiness in submission and purity rather than in power and wisdom.",
    evidence: {
      conceptSlugs: ["sophia-divine-wisdom", "wisdom-literature"],
      wordIds: ["pneuma"],
      passageIds: [],
    },
    whatItOriginallyLookedLike:
      "Proverbs 8 presents Wisdom as a co-creator present before the foundation of the world. The Wisdom of Solomon describes her as 'a breath of the power of God, and a pure emanation of the glory of the Almighty.' Early Christian communities preserved Sophia Christologies alongside Logos Christologies -- Jesus as the prophet of Wisdom, sent to call people back to her table. Some early hymns (the Odes of Solomon) used feminine imagery for the Spirit. The tradition was genuinely plural about the gender dimensions of the divine before the consolidation of orthodoxy in the 4th century.",
    howToReclaimIt:
      "Read Proverbs 8, Sirach 24, and the Wisdom of Solomon as primary sources. Read Elizabeth Johnson's 'She Who Is' for a rigorous Catholic feminist theology grounded in the tradition. Recover the prayer practice of addressing God with feminine language -- not to replace masculine language but to restore the fullness that scripture itself contains. The tradition lost something when it chose Logos over Sophia. Recovering Sophia does not require abandoning tradition; it requires reading it more carefully.",
  },

  {
    id: "r3",
    slug: "sacred-body",
    name: "The Body as Sacred",
    whatWasStolen:
      "Hebrew thought has no category for a soul/body split. The Hebrew word nephesh, often translated 'soul,' actually means the whole living being -- you do not have a soul, you are a soul. Genesis 1 declares the physical world, including the human body, 'very good.' The Incarnation -- God taking on flesh -- is the most radical possible affirmation of the body's dignity. The resurrection of the body (not the immortality of the soul) is the New Testament's hope. Paul uses the body as the primary metaphor for the church (1 Corinthians 12). The body is not the prison of the soul. It is the site of sanctification.",
    replacedWith:
      "The Greek body/soul dualism imported from Platonic philosophy: the body as lower, temporary, and potentially corrupting; the soul as higher, eternal, and threatened by bodily desire. Augustine's reading of Paul's 'flesh' (sarx) as literal body rather than the human tendency toward self-centeredness poisoned Western Christianity's relationship to physical existence. The body became the enemy. Sexuality became the primary locus of sin. Celibacy became the highest state. Embodied practices of prayer were suspect. Illness was sometimes framed as divine punishment.",
    evidence: {
      conceptSlugs: [],
      wordIds: ["sarx", "sozo"],
      passageIds: [],
    },
    whatItOriginallyLookedLike:
      "Hebrew wholism: eating, sleeping, working, and grieving are all legitimate dimensions of the spiritual life. The Psalms pray the whole body -- 'My heart throbs, my strength fails me' (Psalm 38:10). The Incarnation insists that God took on a digestive system, a nervous system, and a capacity for physical pain. The early church celebrated the Eucharist as a physical act -- eating and drinking as spiritual encounter. Breath prayer (synchronizing prayer with the breath, as in the Jesus Prayer) treats the body as a partner in contemplation, not an obstacle to it.",
    howToReclaimIt:
      "Read Paul's sarx more carefully: it means the self-centered human orientation, not the physical body. Recover embodied prayer practices: breath prayer, walking meditation, the Jesus Prayer synchronized with breathing. Study the Orthodox tradition's insistence that the whole person -- body, soul, and spirit -- participates in prayer and is transformed by it. Read Bessel van der Kolk's 'The Body Keeps the Score' alongside the Philokalia -- they describe, from different angles, the same reality: healing is not abstract. It happens in the body.",
  },

  {
    id: "r4",
    slug: "universal-access",
    name: "Universal Access to Gnosis",
    whatWasStolen:
      "The earliest Christian communities assumed that every member of the body of Christ had direct access to the Spirit's gifts and teaching. Paul describes a church where prophecy, discernment, and wisdom are distributed across the whole community, not concentrated in a single office. The Gospel of John presents Jesus as the teacher who makes all things known to his disciples: 'I no longer call you servants... I have made known to you everything I have heard from my Father' (15:15). The promise of the Spirit is universal: 'your sons and daughters will prophesy' (Acts 2:17, quoting Joel). Gnosis -- genuine knowing of God -- is not reserved for a spiritual elite.",
    replacedWith:
      "Clergy-only interpretation. Scripture could not be interpreted without priestly mediation. The Latin Vulgate (inaccessible to ordinary people) became the only authoritative Bible. Vernacular translations were suppressed or burned. The Inquisition prosecuted people for reading scripture without authorization. The Reformation challenged this -- every believer could read the Bible -- but Protestant churches quickly developed their own credentialed interpreter class. The assumption that ordinary people cannot access the deep things of God without institutional mediation has been remarkably persistent.",
    evidence: {
      conceptSlugs: ["gospel-of-thomas", "nag-hammadi-library"],
      wordIds: ["pistis", "ekklesia"],
      passageIds: [],
    },
    whatItOriginallyLookedLike:
      "Early Christian communities met in houses where multiple members spoke, prophesied, and contributed to corporate discernment. The Didache instructs communities to test itinerant teachers not by their credentials but by whether their teaching bears fruit. The Letter to the Hebrews speaks of a new covenant in which the law is written on hearts -- direct, internal knowledge rather than external command (Hebrews 8:10-11). Women prophesied in early assemblies (1 Corinthians 11:5). The Spirit blows where it will (John 3:8) -- not only where the institution permits.",
    howToReclaimIt:
      "Read the Nag Hammadi texts alongside the canonical Gospels -- not to replace one with the other, but to see the diversity of early Christian communities and their assumptions about spiritual access. Study the Greek New Testament's use of words like pistis (trusting relationship, not intellectual assent) and pneuma (Spirit, available to all). Practice lectio divina as a way of trusting your own encounter with the text. Find communities that practice shared discernment and distributed authority rather than centralizing spiritual interpretation in a single voice.",
  },

  {
    id: "r5",
    slug: "diversity-of-belief",
    name: "Diversity of Belief",
    whatWasStolen:
      "Early Christianity was astonishingly diverse. Jewish Christians who observed Torah alongside their Gentile siblings. Gnostic communities who read the creation story as the work of a lesser deity. Marcionites who rejected the Hebrew Bible entirely. Montanists who believed the Spirit was still speaking new revelation. Docetists who taught that Christ only appeared to have a body. These were not fringe movements -- they were substantial communities reading the same scriptures and drawing different conclusions. The diversity was not a corruption of an original unity; it was the original condition.",
    replacedWith:
      "One orthodoxy, with all competing theologies classified as heresy. The Nicene Creed (325 CE), the canon formation process (4th-5th century), and the suppression of non-conforming texts created the illusion of an original Christian consensus that never existed. Constantine's interest in imperial unity accelerated the process: theological diversity was not just spiritually dangerous, it was politically destabilizing. The texts that preserved diverse perspectives -- the Nag Hammadi library, the Didache, the Epistle of Barnabas -- were suppressed, destroyed, or classified as non-authoritative.",
    evidence: {
      conceptSlugs: ["canon-formation", "nag-hammadi-library", "council-of-nicaea"],
      wordIds: [],
      passageIds: [],
    },
    whatItOriginallyLookedLike:
      "Paul's letters reveal communities already in conflict about the resurrection (1 Corinthians 15), the law (Galatians), food offered to idols (Romans 14-15), and leadership authority (2 Corinthians 10-13). These are not peripheral disputes -- they are fundamental disagreements about the nature of the gospel. The book of Acts presents an idealized account of early unity, but the letters reveal the reality: multiple, competing, mutually suspicious communities arguing passionately about what it meant to follow Jesus. This diversity was not a problem to be solved. It was, arguably, the tradition's greatest strength.",
    howToReclaimIt:
      "Read the texts that were excluded from the canon -- not to replace scripture but to recover the diversity that was suppressed. The Gospel of Thomas offers a Jesus who sounds more like a Zen master than a sacrifice. The Didache reveals an early church without bishops or fixed sacramental theology. Read Bart Ehrman's 'Lost Christianities' for a scholarly account of the diversity and its suppression. Practice theological humility: the tradition you inherited is one answer to the questions of faith, not the only possible answer.",
  },

  {
    id: "r6",
    slug: "nonviolence",
    name: "Nonviolence",
    whatWasStolen:
      "For the first three centuries of Christian history, the church was pacifist. Christians refused military service. Tertullian, Origen, and Lactantius all argued explicitly that Christians could not kill, even in war. The Sermon on the Mount -- 'love your enemies, pray for those who persecute you, if someone strikes your right cheek, offer the other' -- was read literally and practiced seriously. Jesus's nonviolent entry into Jerusalem, his refusal to call on angelic armies in Gethsemane, and his submission to execution rather than violent resistance were understood as the paradigm for Christian life.",
    replacedWith:
      "Just war theory (Augustine) and eventually the Crusades -- a Christian theology of holy violence. When Constantine ended persecution and made Christianity the empire's religion, the church had to develop a theology for state violence. Augustine's just war framework (a war is just if fought for right reasons, by proper authority, with right intention) gave Christian sanction to killing under the right conditions. By the 11th century, Pope Urban II was promising crusaders that killing Muslims was a path to salvation. The Sermon on the Mount was reinterpreted as an inner disposition, not an outward practice.",
    evidence: {
      conceptSlugs: ["crusades"],
      wordIds: ["dikaiosyne", "agape"],
      passageIds: [],
    },
    whatItOriginallyLookedLike:
      "Early Christian martyrs chose death over violence. Maximilian of Numidia (295 CE) was executed for refusing to join the Roman army, declaring: 'I cannot serve as a soldier. I cannot do evil. I am a Christian.' The Didache instructs Christians to fast for their persecutors. The Epistle of Diognetus (2nd century) describes Christians as people who 'share their table with all, but not their bed; they are in the flesh, but live not according to the flesh; they dwell on earth, but their citizenship is in heaven; they love all men, and are persecuted by all.' Nonviolence was not the idealism of the few. It was the ordinary practice of the many.",
    howToReclaimIt:
      "Read the Sermon on the Mount (Matthew 5-7) as a policy document, not a spiritual mood. Study Walter Wink's 'Engaging the Powers' for the strongest contemporary case that Jesus's 'third way' (neither fight nor flight) is a coherent political practice. Read the early church fathers on war -- Tertullian, Origen, Lactantius -- before Augustine. The Anabaptist tradition (Mennonites, Amish, Church of the Brethren) has preserved the original pacifist practice across 500 years. The Sermon on the Mount was never repealed.",
  },

  {
    id: "r7",
    slug: "community-as-equals",
    name: "Community as Equals",
    whatWasStolen:
      "The earliest Christian communities were characterized by a remarkable, if imperfect, social equality. Paul declares: 'There is neither Jew nor Greek, there is neither slave nor free, there is no male and female, for you are all one in Christ Jesus' (Galatians 3:28). Women led house churches (Lydia, Phoebe, Prisca, Nympha). Slaves and slave owners ate together at the same table. The word ekklesia -- usually translated 'church' -- was a political term for a citizen assembly, where decisions were made collectively. Paul calls himself a doulos (slave, servant), not a lord. The community's leadership was a function of gifts, not office.",
    replacedWith:
      "A hierarchical institution with a professional clergy class entirely separated from a lay class. Bishop, priest, deacon -- the three-tiered hierarchy hardened quickly in the 2nd century (Ignatius of Antioch). Women were progressively excluded from leadership roles, with 1 Timothy 2:12 ('I do not permit a woman to teach') elevated as the governing principle over Galatians 3:28. The Eucharist became a priestly act performed on behalf of a passive congregation rather than a shared communal meal. The clergy/laity distinction, nonexistent in the New Testament, became the fundamental organizing principle of Christian community.",
    evidence: {
      conceptSlugs: ["reformation", "constantine-and-christianity"],
      wordIds: ["ekklesia", "doulos", "diakonia"],
      passageIds: [],
    },
    whatItOriginallyLookedLike:
      "House churches of 15-40 people, meeting weekly for a shared meal that included the Eucharist. No designated clergy -- leadership was distributed according to gifts (teaching, prophecy, service, hospitality). Women prophesied, hosted, led, and funded communities. Phoebe is called both diakonos (deacon/minister -- the same word used for male church leaders) and prostatis (patron, protector -- a term of civic leadership) in Romans 16:1-2. The book of Acts shows communities reaching consensus through communal discernment (Acts 15). The community defined itself against Roman hierarchy, not as a replica of it.",
    howToReclaimIt:
      "Study the house church movement and its historical antecedents. Read Reta Halteman Finger's 'Of Widows and Meals' for a reconstruction of early Christian communal practice. Practice shared discernment in your community -- decisions made by the whole rather than delegated to professional clergy. Read Romans 16 carefully: it is a list of co-workers, not a hierarchy, and it includes more women than most churches acknowledge. Small groups with shared leadership, shared meals, and shared accountability are not a modern invention -- they are the original form.",
  },
];

export function getAllRestorationCategories(): readonly RestorationCategory[] {
  return restorationCategories;
}

export function getRestorationBySlug(slug: string): RestorationCategory | undefined {
  return restorationCategories.find((c) => c.slug === slug);
}
