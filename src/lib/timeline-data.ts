// How history changed the words of Jesus -- 8 eras from the living voice to modern drift.
// Each era shows what happened, which words were affected, and where to go deeper.

export interface TimelineEvent {
  readonly year: string;
  readonly title: string;
  readonly description: string;
  readonly significance: string;
}

export interface TimelineEra {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly yearRange: string;
  readonly startYear: number;
  readonly summary: string;
  readonly whatChanged: string;
  readonly keyEvents: readonly TimelineEvent[];
  readonly affectedWords: readonly string[];
  readonly relatedConceptSlugs: readonly string[];
}

export const timelineEras: readonly TimelineEra[] = [
  {
    id: "era-1",
    slug: "living-voice",
    title: "The Living Voice",
    yearRange: "~30-50 AD",
    startYear: 30,
    summary:
      "Jesus teaches in Aramaic to fishermen, tax collectors, and outcasts. His words are alive -- spoken, experienced, debated around fires and on hillsides. Nothing is written down yet.",
    whatChanged:
      "Nothing -- yet. This is the baseline. Jesus speaks in Aramaic, a language rich with layered meaning. When he says 'turn around' (teshuvah), everyone in earshot knows he means a change of direction, not groveling for forgiveness. When he says 'missing the mark' (chata), they hear an archery term, not a permanent moral stain. The words carry the weight of lived experience, not institutional doctrine. His followers remember what he said the way you remember advice from someone you love -- imperfectly, but with the emotional truth intact.",
    keyEvents: [
      {
        year: "~30 AD",
        title: "Jesus begins teaching",
        description:
          "An itinerant teacher from Nazareth starts gathering followers in Galilee. He teaches in parables, eats with outcasts, and challenges religious authorities.",
        significance: "The original words are Aramaic, spoken, and experiential.",
      },
      {
        year: "~33 AD",
        title: "Crucifixion and resurrection claims",
        description:
          "Jesus is executed by Rome. His followers claim he appeared to them after death. The movement could have ended here but instead accelerated.",
        significance: "The community of oral tradition begins to form.",
      },
      {
        year: "~35-50 AD",
        title: "Oral tradition period",
        description:
          "Stories, sayings, and teachings pass from person to person. Different communities emphasize different aspects of the message.",
        significance:
          "Multiple versions of the same teachings already exist -- this is normal and healthy.",
      },
    ],
    affectedWords: [],
    relatedConceptSlugs: [],
  },
  {
    id: "era-2",
    slug: "greek-translation",
    title: "The Greek Translation",
    yearRange: "~50-100 AD",
    startYear: 50,
    summary:
      "Paul writes letters in Greek. The Gospels are composed in Greek. The first and most consequential layer of translation happens here -- Aramaic concepts forced into Greek words.",
    whatChanged:
      "Everything shifts. Aramaic 'chata' (missing the mark in archery) becomes Greek 'hamartia' -- which still means 'missing the mark' but now lives in a language with different philosophical baggage. Aramaic 'teshuvah' (turning around) becomes Greek 'metanoia' (changing your mind). The feel changes even when the meaning is close. Paul, writing to Greek-speaking cities, adapts Jesus' rural Aramaic metaphors for urban Greek audiences. Some nuance is gained, some is lost. The Gospels are written by people who weren't there, drawing on oral traditions 30-60 years after the events.",
    keyEvents: [
      {
        year: "~49-58 AD",
        title: "Paul's letters",
        description:
          "Paul writes to churches across the Roman Empire in Greek. These are the earliest Christian documents we have -- earlier than any Gospel.",
        significance:
          "Paul interprets Jesus through his own lens. His Greek word choices become foundational.",
      },
      {
        year: "~65-70 AD",
        title: "Gospel of Mark written",
        description:
          "The earliest Gospel. Short, urgent, focused on action. No birth story, no lengthy sermons. Written during or just after the Jewish-Roman War.",
        significance: "The first attempt to write down what Jesus said and did.",
      },
      {
        year: "~80-90 AD",
        title: "Matthew and Luke written",
        description:
          "Both use Mark as a source plus a shared sayings collection (Q source). Each shapes the story for their own community.",
        significance:
          "The same events are now told in different ways for different audiences.",
      },
      {
        year: "~90-100 AD",
        title: "Gospel of John written",
        description:
          "A dramatically different account. Theological, mystical, focused on identity claims. 'In the beginning was the Logos.'",
        significance:
          "John introduces language and concepts not found in the earlier Gospels.",
      },
    ],
    affectedWords: [
      "hamartia",
      "metanoia",
      "pistis",
      "agape",
      "pneuma",
      "logos",
      "sozo",
      "aphiemi",
      "gehenna",
      "aionios",
    ],
    relatedConceptSlugs: [],
  },
  {
    id: "era-3",
    slug: "suppression",
    title: "The Suppression",
    yearRange: "~100-325 AD",
    startYear: 100,
    summary:
      "Competing Christian communities produce dozens of texts -- Gospels of Thomas, Philip, Mary, and Truth among them. The institutional church begins deciding which voices count and which get buried.",
    whatChanged:
      "The texts that emphasized direct mystical experience -- the idea that YOU have access to the divine without an intermediary -- are systematically marginalized. The Gospel of Thomas, a collection of 114 sayings of Jesus with no narrative, no crucifixion, no resurrection story (just the raw teachings) is labeled 'heretical.' The communities that valued inner knowing (gnosis) over institutional authority are pushed out. The message narrows: you need the church to reach God. Direct access is dangerous.",
    keyEvents: [
      {
        year: "~100-150 AD",
        title: "Gospel of Thomas composed",
        description:
          "A collection of 114 sayings attributed to Jesus. No narrative framework, no miracles, no passion story. Just the words.",
        significance:
          "Contains sayings that emphasize inner knowledge and direct experience of the divine.",
      },
      {
        year: "~150-200 AD",
        title: "Nag Hammadi texts flourish",
        description:
          "Gospels of Philip, Mary, Truth, and many others circulate among gnostic communities. These texts present a Jesus who teaches self-knowledge.",
        significance:
          "An entire tradition of Christianity that valued direct experience is thriving -- for now.",
      },
      {
        year: "~180 AD",
        title: "Irenaeus attacks 'heresies'",
        description:
          "Bishop Irenaeus writes 'Against Heresies,' specifically targeting gnostic texts and communities. He argues for only four Gospels.",
        significance:
          "The institutional church begins formally deciding which texts are 'in' and which are 'out.'",
      },
      {
        year: "~200-300 AD",
        title: "Canon debates intensify",
        description:
          "Different regions use different collections of texts. There is no single 'Bible.' What counts as scripture is actively contested.",
        significance:
          "The Bible as we know it does not yet exist. Many options are still on the table.",
      },
    ],
    affectedWords: ["ekklesia", "pistis", "exousia"],
    relatedConceptSlugs: [],
  },
  {
    id: "era-4",
    slug: "imperial-church",
    title: "The Imperial Church",
    yearRange: "325-400 AD",
    startYear: 325,
    summary:
      "Christianity becomes the religion of the Roman Empire. Emperor Constantine calls the Council of Nicaea. The canon is formalized. Jerome translates the Bible into Latin -- and critical Greek nuances are lost forever.",
    whatChanged:
      "This is the era where the most damage happens. Jerome translates the Greek New Testament into Latin (the Vulgate), and his word choices become doctrine for a thousand years. Greek 'metanoia' (shift your perception) becomes Latin 'poenitere' (do penance) -- from inner transformation to outward punishment. Greek 'hamartia' (missing the mark) becomes Latin 'peccatum' (sin as moral failing). Greek 'aionios' (age-long, of the age) becomes Latin 'aeternus' (eternal, forever). Each translation choice tilts the message toward guilt, punishment, and institutional control. Meanwhile, the Council of Nicaea and later councils formalize which books are in, which are out. The gnostic texts are ordered destroyed.",
    keyEvents: [
      {
        year: "313 AD",
        title: "Edict of Milan",
        description:
          "Emperor Constantine legalizes Christianity. A persecuted movement becomes a state-approved religion.",
        significance:
          "Christianity gains political power. The incentives for the message change permanently.",
      },
      {
        year: "325 AD",
        title: "Council of Nicaea",
        description:
          "Constantine convenes 300 bishops to settle doctrinal disputes. The Nicene Creed is formulated.",
        significance:
          "Theology becomes a political act. Dissent becomes heresy.",
      },
      {
        year: "367 AD",
        title: "Athanasius lists the 27-book canon",
        description:
          "Bishop Athanasius of Alexandria writes a letter listing exactly 27 books as the New Testament canon -- the list we have today.",
        significance:
          "Dozens of texts used by Christian communities for centuries are now officially excluded.",
      },
      {
        year: "382-405 AD",
        title: "Jerome's Latin Vulgate",
        description:
          "Jerome translates the Bible into Latin. His word choices will dominate Western Christianity for over a millennium.",
        significance:
          "Metanoia becomes poenitere. Hamartia becomes peccatum. Aionios becomes aeternus. The meaning shifts.",
      },
    ],
    affectedWords: [
      "metanoia",
      "hamartia",
      "aionios",
      "kolasis",
      "apollymi",
      "gehenna",
    ],
    relatedConceptSlugs: [],
  },
  {
    id: "era-5",
    slug: "medieval-lock",
    title: "The Medieval Lock",
    yearRange: "~500-1500 AD",
    startYear: 500,
    summary:
      "For a thousand years, the Bible exists only in Latin -- a language the people cannot read. The clergy control interpretation absolutely. Direct spiritual experience goes underground.",
    whatChanged:
      "Ordinary people cannot read the text for themselves. They depend entirely on priests to tell them what it says. The message becomes: you are sinful, you need the church to be saved, obey or face eternal damnation. Meanwhile, the mystical tradition -- people who actually practice the kind of direct experience Jesus taught -- survives in monasteries and on the margins. Desert Fathers and Mothers, Meister Eckhart, Julian of Norwich, the anonymous author of 'The Cloud of Unknowing' -- these voices preserve the experiential teaching while the institution preaches obedience. Eckhart is eventually tried for heresy. The message is clear: direct access to God is a threat to institutional power.",
    keyEvents: [
      {
        year: "~500-1000 AD",
        title: "The Dark Ages of interpretation",
        description:
          "Illiteracy is widespread. The Bible is a Latin book controlled by a Latin-reading clergy. Common people know only what they're told.",
        significance:
          "A thousand years where no one can check the original words.",
      },
      {
        year: "~300-600 AD",
        title: "Desert Fathers and Mothers",
        description:
          "Monastics in the Egyptian and Syrian deserts practice silence, contemplation, and direct encounter with God.",
        significance:
          "The experiential tradition of Jesus' teaching survives in the desert.",
      },
      {
        year: "~1260-1328",
        title: "Meister Eckhart teaches",
        description:
          "A Dominican mystic teaches that the soul has a direct spark of connection to God, needing no intermediary. He is tried for heresy.",
        significance:
          "Direct experience of the divine is officially dangerous.",
      },
      {
        year: "~1373",
        title: "Julian of Norwich's visions",
        description:
          "An English anchorite receives visions and writes 'Revelations of Divine Love.' She says 'All shall be well, and all manner of thing shall be well.'",
        significance:
          "A woman's direct experience produces one of the most enduring expressions of hope in Christian history.",
      },
    ],
    affectedWords: ["doulos", "hupotasso", "kephale", "ekklesia"],
    relatedConceptSlugs: [],
  },
  {
    id: "era-6",
    slug: "reformation-crack",
    title: "The Reformation Crack",
    yearRange: "~1500-1600 AD",
    startYear: 1500,
    summary:
      "Martin Luther nails his theses to a door. The Bible is translated into German, English, and other languages. People can finally read it themselves. But new gatekeepers replace old ones.",
    whatChanged:
      "The Reformation breaks the Catholic monopoly on interpretation, but it doesn't go back to the Greek. Luther translates from Latin, not from the original Greek (though he knew Greek and consulted it). Tyndale translates into English and is executed for it. The key Protestant innovation -- 'sola fide' (faith alone) -- is built on translating 'pistis' as 'belief/faith' rather than its fuller meaning of 'trust, loyalty, relational confidence.' This shifts Christianity from a relational practice to a belief system. You're saved by what you believe, not by how you trust. The Reformation opens the Bible but through a new institutional lens.",
    keyEvents: [
      {
        year: "1517",
        title: "Luther's 95 Theses",
        description:
          "Martin Luther challenges the sale of indulgences and clerical corruption. The Reformation begins.",
        significance:
          "The Catholic monopoly on interpretation cracks. But new orthodoxies form.",
      },
      {
        year: "1525-1536",
        title: "Tyndale's English Bible",
        description:
          "William Tyndale translates the New Testament into English. He is strangled and burned at the stake for it.",
        significance:
          "People die for the right to read scripture in their own language.",
      },
      {
        year: "~1530s",
        title: "'Sola fide' becomes doctrine",
        description:
          "Luther declares that salvation comes through 'faith alone' -- interpreting pistis as intellectual belief in doctrine.",
        significance:
          "Pistis (trust, loyalty, relational confidence) is reduced to 'believing the right things.'",
      },
    ],
    affectedWords: ["pistis", "charis", "dikaiosyne"],
    relatedConceptSlugs: [],
  },
  {
    id: "era-7",
    slug: "kings-bible",
    title: "The King's Bible",
    yearRange: "1611-1900 AD",
    startYear: 1611,
    summary:
      "King James I authorizes an English translation. The KJV becomes the definitive Bible for English-speaking Christianity. Translation choices become unquestionable doctrine.",
    whatChanged:
      "The King James Version is authorized by a monarch to serve political purposes -- unifying English Protestantism under the crown. Its language is beautiful, literary, and enormously influential. But it locks in translation choices from Jerome's Latin and the Reformation interpretations. 'Repent' for metanoia. 'Sin' for hamartia. 'Hell' for gehenna, hades, and tartarus (three different words, all flattened into one). 'Eternal punishment' for kolasis aionios. These translations become so familiar that questioning them feels like questioning the Bible itself. The map becomes the territory.",
    keyEvents: [
      {
        year: "1611",
        title: "King James Version published",
        description:
          "Authorized by King James I of England. 47 scholars produce a translation that will shape English for four centuries.",
        significance:
          "Translation choices become 'what the Bible says' in the minds of millions.",
      },
      {
        year: "1800s",
        title: "Revival movements",
        description:
          "Great Awakenings in America. Hellfire preaching. Camp meetings. Emotional conversion experiences. 'Are you saved?' becomes the central question.",
        significance:
          "The message narrows further: believe or burn. Fear becomes the primary motivator.",
      },
      {
        year: "1881",
        title: "Revised Version published",
        description:
          "First major English revision of the KJV. Uses better Greek manuscripts. Some translation improvements, but by now the old translations are deeply embedded in culture.",
        significance:
          "Even better translations struggle against 270 years of KJV language in the culture.",
      },
    ],
    affectedWords: [
      "metanoia",
      "hamartia",
      "gehenna",
      "aionios",
      "kolasis",
      "apollymi",
      "sozo",
    ],
    relatedConceptSlugs: [],
  },
  {
    id: "era-8",
    slug: "modern-drift",
    title: "The Modern Drift",
    yearRange: "1900-Present",
    startYear: 1900,
    summary:
      "Denominational translations multiply. The prosperity gospel emerges. Scripture becomes bumper stickers and coffee mugs. The words of Jesus are weaponized for political power.",
    whatChanged:
      "The 20th and 21st centuries bring two opposing forces. On one hand, better scholarship -- the Dead Sea Scrolls, the Nag Hammadi library, modern Greek lexicons -- gives us tools to recover what was actually said. On the other hand, scripture becomes a cultural weapon. 'Philippians 4:13' is stripped from a letter about contentment in poverty to become a motivational poster. 'Jeremiah 29:11' is ripped from a letter to exiles to become a bumper sticker about your personal career plan. Verses are proof-texted to justify political positions, exclude groups, and accumulate wealth. The prosperity gospel teaches that God wants you rich. The teachings of a homeless teacher who said 'sell what you have and give to the poor' are used to sell private jets.",
    keyEvents: [
      {
        year: "1947",
        title: "Dead Sea Scrolls discovered",
        description:
          "Ancient manuscripts found in caves near the Dead Sea. They predate our oldest Bible manuscripts by a thousand years.",
        significance:
          "We can now see how texts were transmitted -- and what was changed.",
      },
      {
        year: "1945",
        title: "Nag Hammadi library discovered",
        description:
          "A farmer in Egypt finds sealed jars containing 52 ancient texts, including the Gospel of Thomas, suppressed for 1,600 years.",
        significance:
          "An entire tradition of Christianity, silenced since the 4th century, speaks again.",
      },
      {
        year: "~1970s-present",
        title: "Prosperity gospel emerges",
        description:
          "Televangelists teach that faith equals financial blessing. Give money, receive wealth. God wants you rich.",
        significance:
          "The teachings of a homeless itinerant teacher are used to justify private jets.",
      },
      {
        year: "~2000s-present",
        title: "Scripture as political weapon",
        description:
          "Bible verses are deployed to justify policies, exclude groups, and silence dissent. Context is irrelevant; the proof-text is everything.",
        significance:
          "The words of Jesus -- about love, release, wholeness -- are weaponized for power.",
      },
    ],
    affectedWords: ["pistis", "agape", "sozo", "basileia"],
    relatedConceptSlugs: [],
  },
];
