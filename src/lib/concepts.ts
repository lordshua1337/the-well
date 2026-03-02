export interface Concept {
  id: string;
  slug: string;
  domainId: string;
  name: string;
  summary: string;
  lensTags: string[];
  relatedConceptSlugs: string[];
  relatedTextRefs: string[];
  layers: {
    accessible: string;
    intermediate: string;
    advanced: string;
  };
  honestAnalysis?: string;
}

export const concepts: Concept[] = [
  // ─── Domain 1: Hebrew Bible ───────────────────────────────────────────

  {
    id: "c1-01",
    slug: "documentary-hypothesis",
    domainId: "d1",
    name: "Documentary Hypothesis (JEDP)",
    summary:
      "The theory that the Torah was composed from four distinct sources, not written by Moses alone.",
    lensTags: ["academic", "protestant", "catholic"],
    relatedConceptSlugs: ["torah-overview", "textual-criticism"],
    relatedTextRefs: ["Genesis 1", "Genesis 2"],
    layers: {
      accessible:
        "The first five books of the Bible (Genesis through Deuteronomy) are traditionally attributed to Moses. But scholars have noticed that these books contain duplicate stories, contradictions, different names for God, and distinct writing styles. The Documentary Hypothesis proposes that the Torah was actually assembled from four separate sources, written at different times: J (Yahwist, uses YHWH for God's name), E (Elohist, uses Elohim), D (Deuteronomist, concentrated in Deuteronomy), and P (Priestly, focused on rituals and genealogies). These were later woven together by editors into the text we have today.",
      intermediate:
        "The Documentary Hypothesis was developed primarily by Julius Wellhausen in the 19th century, building on earlier observations by Jean Astruc and others. The key evidence includes: (1) Duplicate narratives -- there are two creation accounts (Genesis 1 and Genesis 2), two flood narratives interleaved, two versions of Abraham lying about Sarah. (2) Different divine names -- some passages consistently use YHWH, others use Elohim. (3) Distinct vocabularies and theological concerns -- P is obsessed with genealogies, dates, and ritual purity; J tells vivid stories with an anthropomorphic God who walks in gardens. (4) Anachronisms -- references to kings and places that didn't exist in Moses' time.\n\nThe four sources and their approximate dates: J (Yahwist) -- 10th-9th century BCE, southern Judah; E (Elohist) -- 9th-8th century BCE, northern Israel; D (Deuteronomist) -- 7th century BCE, likely connected to Josiah's reform (2 Kings 22-23); P (Priestly) -- 6th-5th century BCE, exilic or post-exilic. A later redactor (R) combined them.\n\nModern scholarship has moved beyond simple four-source division. Some scholars (like John Van Seters) see fewer sources; others (like Erhard Blum) prefer a supplementary model where later sources expanded earlier ones rather than being independent parallel documents. The European tradition tends toward fragmentary models. American scholarship generally retains a modified form of the hypothesis. What virtually all critical scholars agree on: the Torah was not written by a single author in a single sitting.",
      advanced:
        "The Documentary Hypothesis remains the dominant paradigm in critical Torah scholarship, though it has undergone significant revision since Wellhausen. Key developments include:\n\nRendtorff's tradition-historical approach challenges the existence of continuous source documents, proposing instead that independent tradition blocks (ancestral narratives, exodus, Sinai) were compiled gradually. Erhard Blum's composition model identifies a D-composition and a P-composition as the two main literary layers, arguing that J and E cannot be reliably separated as independent documents.\n\nThe neo-Documentarian school (Joel Baden, Jeffrey Stackert) has mounted a vigorous defense of the classic four-source model, arguing that the sources can be reconstructed as coherent, continuous narratives.\n\nThe 'Persian Imperial Authorization' hypothesis (Peter Frei) suggests that the Torah was compiled in its final form under Persian sponsorship as the legal document governing the province of Yehud -- which would explain why contradictory legal traditions were preserved rather than harmonized.\n\nArchaeological evidence complicates dating: Finkelstein and Silberman's work on the historical David and Solomon suggests the J source may be later than traditionally dated, while the discovery of inscriptions like the Kuntillet Ajrud texts show that early Israelite religion was far more diverse than the biblical text presents.\n\nFor the reader: understanding that the Torah is a composite document does not diminish it. It reveals a tradition that was alive enough to be continually reinterpreted, and editors honest enough to preserve voices that disagreed with each other. The final text is a conversation, not a monologue."
    },
  },

  {
    id: "c1-02",
    slug: "septuagint",
    domainId: "d1",
    name: "The Septuagint (LXX)",
    summary:
      "The ancient Greek translation of the Hebrew Bible -- the version most NT authors actually quoted.",
    lensTags: ["academic", "orthodox", "catholic"],
    relatedConceptSlugs: ["textual-criticism", "masoretic-text", "nt-use-of-ot"],
    relatedTextRefs: ["Isaiah 7:14"],
    layers: {
      accessible:
        "The Septuagint (abbreviated LXX, meaning 'seventy') is the ancient Greek translation of the Hebrew Bible, produced in Alexandria, Egypt, starting around the 3rd century BCE. This is important because most New Testament authors quoted from the Septuagint, not the Hebrew text. Sometimes the Greek translation says something different from the Hebrew original -- and those differences shaped Christian theology. The most famous example: Isaiah 7:14, where the Hebrew word 'almah' (young woman) was translated into Greek as 'parthenos' (virgin). That single translation choice is the textual basis for the doctrine of the virgin birth.",
      intermediate:
        "The Septuagint's origin story (the Letter of Aristeas) claims that 72 Jewish scholars independently produced identical translations in 72 days. This is legendary -- the actual translation was produced over roughly 200 years by different translators with varying skills and approaches. The Torah was translated first and most carefully; later books show more variation in translation quality and method.\n\nKey differences between the LXX and the Hebrew Masoretic Text (MT): Jeremiah is about one-seventh shorter in the LXX and arranged in a different order. The Psalms are numbered differently (LXX Psalms 9-10 = MT Psalm 9; the numbering is off by one through most of the Psalter). The LXX includes additional books not in the Hebrew canon: Tobit, Judith, Wisdom of Solomon, Sirach, Baruch, 1-2 Maccabees, and additions to Esther and Daniel.\n\nThe Dead Sea Scrolls revealed something scholars had debated for centuries: some LXX readings that differ from the MT actually reflect an older Hebrew text. The LXX translators were not always making mistakes or 'improving' the text -- sometimes their Hebrew source was genuinely different from what became the standard Masoretic tradition.\n\nFor Christianity: the LXX was the church's Bible for the first several centuries. When Jerome produced the Latin Vulgate (4th-5th century CE), he controversially went back to the Hebrew ('Hebraica veritas'), which Protestants later followed. Catholics and Orthodox retained the LXX-based books in their canons.",
      advanced:
        "The Septuagint is not a single translation but a library of translations produced over centuries. Modern critical editions (Rahlfs-Hanhart, Gottingen Septuagint) attempt to reconstruct the 'Old Greek' -- the earliest recoverable form of the translation -- from a complex manuscript tradition that includes: Codex Vaticanus (4th century), Codex Sinaiticus (4th century), Codex Alexandrinus (5th century), papyri, and patristic quotations.\n\nOrigin and recension history: Origen's Hexapla (3rd century CE) presented six columns -- Hebrew, Hebrew in Greek letters, Aquila, Symmachus, the LXX, and Theodotion. His corrections to the LXX (marked with asterisks and obeli) became mixed with the unrevised text, creating the 'Hexaplaric' recension. Lucian of Antioch and Hesychius of Egypt also produced recensions. Untangling these layers is the central task of LXX textual criticism.\n\nTheological load of translation choices beyond Isaiah 7:14: the LXX translators consistently replace the divine name YHWH with Kyrios (Lord) -- this directly shapes NT Christology when early Christians apply 'Kyrios' passages to Jesus. The LXX rendering of Exodus 3:14 as 'ego eimi ho on' (I am the one who is) influenced the Greek philosophical reading of God as Being Itself, which shaped patristic and medieval theology.\n\nThe relationship between the LXX and the NT is deeper than quotation. The theological vocabulary of the NT -- dikaiosyne, charis, agape, ekklesia, hamartia -- was shaped by how the LXX translators rendered Hebrew concepts into Greek. Understanding the LXX's translation choices is essential for understanding what NT authors meant when they used these words."
    },
  },

  {
    id: "c1-03",
    slug: "wisdom-literature",
    domainId: "d1",
    name: "Wisdom Literature",
    summary:
      "Job, Psalms, Proverbs, Ecclesiastes, Song of Songs -- Israel's philosophical tradition questioning everything.",
    lensTags: ["academic", "protestant", "catholic", "jewish"],
    relatedConceptSlugs: ["theodicy", "psalms-of-lament"],
    relatedTextRefs: ["Job 38", "Ecclesiastes 1:2", "Psalm 22"],
    layers: {
      accessible:
        "The wisdom books of the Bible -- Job, Proverbs, Ecclesiastes, Song of Songs, and the Psalms -- represent a tradition of questioning, doubt, and hard-won insight that many people don't expect to find in scripture. Proverbs offers practical guidance. Job demands to know why innocent people suffer and never gets a satisfying answer. Ecclesiastes declares that everything is 'hevel' (vapor, breath, fleeting) and questions whether any human effort matters. Song of Songs is unapologetically erotic love poetry. The Psalms contain worship, rage, grief, and protests against God. This is Israel's philosophical tradition -- and it's far more honest about the difficulty of life than most churches admit.",
      intermediate:
        "The wisdom tradition (hokhmah) was not uniquely Israelite. Egyptian Instruction literature (Instruction of Amenemope has striking parallels with Proverbs 22-24), Mesopotamian wisdom texts (Ludlul Bel Nemeqi, the 'Babylonian Job'), and Sumerian proverb collections all share the same genre. Israel participated in an international wisdom movement.\n\nKey features of each book: Job is a masterpiece of theodicy (the problem of suffering). The prose frame (chapters 1-2, 42) tells a simple story; the poetic core (3-41) is a profound philosophical argument. Job's friends offer orthodox theology ('you must have sinned'), Job refuses to accept it, and God's answer from the whirlwind (chapters 38-41) is not an explanation but an overwhelming display of creation's complexity. The question 'why do the innocent suffer?' is never directly answered.\n\nEcclesiastes (Qohelet, 'the Teacher') is the Bible's most radical voice. 'Hevel havalim, hevel havalim, hakol hevel' -- variously translated as 'vanity of vanities,' 'meaninglessness,' 'absurdity,' or 'vapor.' The Hebrew word hevel literally means breath or vapor -- something that exists but cannot be grasped. Qohelet's conclusion is not nihilism but a recommendation to enjoy the present: eat, drink, find satisfaction in your work, because this fleeting moment is all you can hold.\n\nThe Psalms contain genres most worshippers never encounter: lament psalms (over 60 of them), imprecatory psalms (asking God to destroy enemies), and psalms of disorientation (Brueggemann's category) where the worshipper accuses God of abandonment (Psalm 88 ends in darkness with no resolution).",
      advanced:
        "The personification of Wisdom (Hokhmah) in Proverbs 8 is one of the most theologically significant passages in the Hebrew Bible. Wisdom speaks as a co-creator present with God 'before the beginning of the earth' (8:23), 'rejoicing in the inhabited world' (8:31). This figure -- feminine in Hebrew -- directly influenced the development of Logos theology in Hellenistic Judaism (Philo's Logos as divine mediator) and from there, the Prologue of John's Gospel ('In the beginning was the Logos'). The Wisdom tradition is a direct ancestor of Christology.\n\nThe book of Job raises interpretive problems that scholarship has never fully resolved. The Elihu speeches (chapters 32-37) appear to be a later insertion -- they break the literary structure, Elihu is never mentioned before or after, and the Hebrew style differs. The prose epilogue (42:7-17) where Job gets everything back sits uneasily with the poetic core's refusal of easy answers. Some scholars see the epilogue as the editor's way of domesticating a profoundly unsettling text.\n\nSong of Songs has been read allegorically for most of its interpretive history -- as a picture of God's love for Israel (Jewish midrash) or Christ's love for the Church (Christian tradition from Origen onward). But the text itself is unambiguously erotic poetry with no explicit theological content. Rabbi Akiva's famous declaration that 'all of Scripture is holy, but the Song of Songs is the Holy of Holies' (Mishnah Yadayim 3:5) suggests it was controversial even in antiquity. The literal, erotic reading has become mainstream in modern scholarship, though the question of why it's in the canon remains a genuinely open discussion."
    },
  },

  // ─── Domain 2: New Testament ──────────────────────────────────────────

  {
    id: "c2-01",
    slug: "synoptic-problem",
    domainId: "d2",
    name: "The Synoptic Problem",
    summary:
      "Why do Matthew, Mark, and Luke tell the same stories in the same order with the same words -- and sometimes don't?",
    lensTags: ["academic"],
    relatedConceptSlugs: ["q-source", "markan-priority", "gospel-of-thomas"],
    relatedTextRefs: ["Mark 1:1", "Matthew 1:1", "Luke 1:1"],
    layers: {
      accessible:
        "Matthew, Mark, and Luke are called the 'Synoptic' Gospels because they can be 'seen together' -- they share many of the same stories, often in the same order, sometimes with identical wording. But they also differ in significant ways. The 'Synoptic Problem' is the scholarly question of how to explain these agreements and disagreements. The most widely accepted solution is that Mark wrote first, and Matthew and Luke each independently used Mark as a source, plus a shared source of Jesus' sayings that scholars call 'Q' (from the German 'Quelle,' meaning 'source'). Each Gospel also has unique material found nowhere else.",
      intermediate:
        "The Two-Source Hypothesis (Markan Priority + Q) is the dominant academic model. The evidence for Mark writing first: (1) Mark is shortest -- almost all of Mark appears in Matthew and/or Luke, but much of Matthew and Luke is not in Mark. It's easier to explain additions than deletions. (2) Matthew and Luke improve Mark's rougher Greek. (3) Where Matthew and Luke diverge from each other, at least one usually follows Mark. (4) The 'Markan order' -- when Matthew departs from Mark's sequence, Luke follows Mark, and vice versa. They never agree against Mark in sequence.\n\nQ is a hypothetical document -- no copy has ever been found. It's reconstructed from the ~235 verses that Matthew and Luke share but that are absent from Mark. Q contains mostly sayings (Beatitudes, Lord's Prayer, parables) with minimal narrative. Some scholars (notably Mark Goodacre) argue Q never existed and Luke used Matthew directly (the Farrer Hypothesis). The International Q Project published a critical edition of Q in 2000.\n\nThe Gospel of Thomas, discovered at Nag Hammadi in 1945, revived Q interest because it too is a sayings collection with no narrative frame -- demonstrating that such a genre existed in early Christianity.\n\nEach Gospel's distinctive theology: Mark -- urgency, suffering, the Messianic Secret (Jesus tells people not to reveal his identity). Matthew -- Jesus as the new Moses, fulfillment of prophecy, five major discourses, Jewish-Christian audience. Luke -- concern for the poor, women, Samaritans, and outsiders; narrative artistry; paired with Acts as a two-volume work.",
      advanced:
        "The Synoptic Problem has no consensus solution, only a dominant hypothesis with acknowledged weaknesses. Key challenges to the Two-Source Hypothesis: the 'Minor Agreements' -- roughly 700 instances where Matthew and Luke agree against Mark in small details (word changes, omissions, additions). Under the Two-Source Hypothesis, these should not exist because Matthew and Luke independently used Mark. Various explanations have been proposed: coincidental editing, textual corruption of Mark, or a 'Deutero-Mark' that both used.\n\nThe Farrer Hypothesis (Austin Farrer, 1955; revived by Mark Goodacre) eliminates Q entirely by proposing that Luke used both Mark and Matthew. This is more parsimonious (no hypothetical document) but requires explaining why Luke would have dismantled Matthew's Sermon on the Mount and scattered its material across his Gospel. Proponents argue this is exactly what a skilled author would do to integrate sources into his own narrative structure.\n\nThe Griesbach Hypothesis (Two-Gospel Hypothesis, revived by William Farmer) proposes Matthew first, Luke used Matthew, Mark conflated both. This was the dominant view before the 19th century but is now a minority position. Its main appeal: it eliminates Q and makes Mark a skilful epitomizer.\n\nRecent developments: Watson's 'The Fourfold Gospel' (2016) argues that the Gospel genre itself was a Markan invention -- Mark created the narrative Gospel form, and Matthew and Luke both worked within and against that form. The question is not just 'who copied whom' but 'what kind of literature is a Gospel and how did that genre develop?'"
    },
  },

  {
    id: "c2-02",
    slug: "q-source",
    domainId: "d2",
    name: "Q Source",
    summary:
      "The lost sayings document that Matthew and Luke both used -- if it existed.",
    lensTags: ["academic"],
    relatedConceptSlugs: ["synoptic-problem", "gospel-of-thomas"],
    relatedTextRefs: ["Matthew 5:3", "Luke 6:20"],
    layers: {
      accessible:
        "Q (from the German 'Quelle' meaning 'source') is a hypothetical document of Jesus' sayings that scholars believe Matthew and Luke both used when writing their Gospels. No copy of Q has ever been found -- it's reconstructed from roughly 235 verses that appear in both Matthew and Luke but not in Mark. Q would have been primarily a collection of Jesus' teachings: the Beatitudes, the Lord's Prayer, parables, and wisdom sayings. The discovery of the Gospel of Thomas -- another sayings collection with no narrative -- showed that this kind of document actually existed in early Christianity.",
      intermediate:
        "The International Q Project (IQP), based primarily at Claremont, published 'The Critical Edition of Q' in 2000. This reconstruction attempts to determine the original wording of Q where Matthew and Luke differ. For example, the Beatitudes -- Matthew has 'Blessed are the poor in spirit' (5:3) while Luke has 'Blessed are you poor' (6:20). Most Q scholars think Luke preserves the more original wording (shorter, more direct, second person) and Matthew spiritualized it.\n\nQ scholarship has proposed layers within Q: Q1 (wisdom sayings, optimistic), Q2 (prophetic announcements of judgment, more apocalyptic), and Q3 (narrative framing, temptation story). The Q community is hypothesized to have been a group of Jesus followers who preserved his teachings without developing a passion narrative -- suggesting that not all early Christians centered their faith on the cross.\n\nThe main argument against Q: Occam's Razor. If Luke used Matthew directly (Farrer Hypothesis), no Q is needed. The main argument for Q: Luke's treatment of the material. If Luke had Matthew in front of him, why would he systematically dismantle the Sermon on the Mount, scatter material across his Gospel, and sometimes preserve what appears to be a more original version?",
      advanced:
        "The Q debate has implications beyond source criticism. If Q existed, it represents a form of Christianity that preserved Jesus' teachings without a passion narrative -- a 'Jesus movement' focused on ethical teaching and wisdom rather than death and resurrection. This aligns with the Gospel of Thomas and challenges the assumption that kerygmatic Christianity (focused on cross and resurrection, as in Paul) was universal from the start.\n\nJohn Kloppenborg's stratigraphic analysis of Q identifies three compositional layers: (1) a sapiential collection emphasizing radical ethics and trust in God (Q1), (2) a chriae collection with prophetic announcements of judgment against 'this generation' (Q2), and (3) a narrative opening including the temptation story (Q3). This developmental model suggests Q evolved from a wisdom document into a more apocalyptic one -- possibly reflecting the Q community's experience of rejection.\n\nCritics (especially Goodacre, 'The Case Against Q,' 2002) argue that Q scholarship has become unfalsifiable -- any difficulty is explained by adding another layer to Q, and the absence of any physical evidence is explained by the document's absorption into Matthew and Luke. The debate remains genuinely open in scholarship, with significant scholars on both sides."
    },
  },

  {
    id: "c2-03",
    slug: "pauline-authorship",
    domainId: "d2",
    name: "Pauline Authorship Debates",
    summary:
      "Seven letters are definitely Paul's. Six more claim to be but probably aren't. Why it matters.",
    lensTags: ["academic", "protestant"],
    relatedConceptSlugs: ["canon-formation", "pseudepigraphy"],
    relatedTextRefs: ["Romans 1:1", "1 Timothy 1:1"],
    layers: {
      accessible:
        "Paul wrote letters to early Christian communities, and 13 letters in the New Testament bear his name. But scholars have determined that only 7 were definitely written by Paul himself: Romans, 1 Corinthians, 2 Corinthians, Galatians, Philippians, 1 Thessalonians, and Philemon. The other 6 (Ephesians, Colossians, 2 Thessalonians, 1 Timothy, 2 Timothy, Titus) are disputed -- they may have been written by followers of Paul after his death, a common practice in the ancient world called pseudepigraphy. This matters because the undisputed and disputed letters say different things about women in leadership, church structure, and the nature of salvation.",
      intermediate:
        "The evidence for pseudepigraphy in the Pastoral Epistles (1-2 Timothy, Titus) is particularly strong. Vocabulary: over 300 words in the Pastorals appear nowhere else in Paul's undisputed letters, including many that are common in 2nd-century Greek. Theology: the Pastorals assume a hierarchical church structure (bishops, elders, deacons) that doesn't match the charismatic, Spirit-driven communities in Paul's genuine letters. They also prohibit women from teaching (1 Timothy 2:12), whereas the undisputed Paul names women as co-workers, deacons, and apostles (Junia in Romans 16:7, Phoebe the deacon in Romans 16:1, Prisca as co-worker).\n\nEphesians and Colossians are more debated. Ephesians reads like a theological essay rather than a letter to a specific community (some early manuscripts omit 'in Ephesus' from 1:1). Its Christology is more 'cosmic' than Paul's undisputed letters. Colossians is closer to Paul's style but contains the hymn in 1:15-20 that many scholars think pre-dates the letter.\n\nPseudepigraphy was not considered dishonest in antiquity. Writing in the name of your teacher was a way of extending their authority and legacy. The question is not 'who forged these?' but 'what theological developments do they represent in the generations after Paul?'",
      advanced:
        "The authorship debates have profound implications for how we read Paul. The 'radical Paul' of the undisputed letters -- egalitarian, charismatic, apocalyptic, expecting Christ's imminent return -- is substantially different from the 'domesticated Paul' of the Pastorals -- hierarchical, concerned with respectability, accommodating to Roman social norms.\n\nThis difference is evident on women's roles. Undisputed Paul: 'There is no longer male and female; for all of you are one in Christ Jesus' (Galatians 3:28). Disputed Paul: 'I permit no woman to teach or to have authority over a man; she is to keep silent' (1 Timothy 2:12). If both are equally 'Paul,' the contradiction is insoluble. If the Pastorals represent a later generation using Paul's name to legitimate a more conservative church order, the development is historically explicable.\n\nThe New Perspective on Paul (E.P. Sanders, James Dunn, N.T. Wright) has further complicated matters by arguing that even the undisputed Paul has been misread through a Reformation lens. 'Works of the law' in Paul may refer not to human merit-earning but to Jewish ethnic identity markers (circumcision, food laws, sabbath). This reframes the Protestant-Catholic debate and suggests that Paul's primary concern was Gentile inclusion, not individual salvation mechanics.\n\nFor the reader: the question is not whether the Pastorals are 'in the Bible' (they are) but what happens when we recognize that 'Paul' in the NT is actually multiple voices spanning perhaps 50 years of development. The canon preserved a debate within the Pauline tradition, not a single authoritative voice."
    },
  },

  // ─── Domain 3: Non-Canonical Texts ────────────────────────────────────

  {
    id: "c3-01",
    slug: "gospel-of-thomas",
    domainId: "d3",
    name: "Gospel of Thomas",
    summary:
      "114 sayings attributed to Jesus with no narrative, no miracles, no cross, no resurrection. Just words.",
    lensTags: ["academic", "gnostic"],
    relatedConceptSlugs: ["nag-hammadi", "q-source", "synoptic-problem"],
    relatedTextRefs: ["Thomas Saying 3", "Thomas Saying 70", "Thomas Saying 77"],
    layers: {
      accessible:
        "The Gospel of Thomas is a collection of 114 sayings attributed to Jesus, discovered in 1945 at Nag Hammadi, Egypt, in a sealed clay jar alongside other early Christian texts. It has no narrative -- no birth story, no miracles, no crucifixion, no resurrection. Just words: 'These are the secret sayings that the living Jesus spoke and Didymos Judas Thomas wrote down.' About half the sayings have parallels in Matthew, Mark, and Luke. The other half are unique, and some are extraordinary: 'If you bring forth what is within you, what you bring forth will save you' (Saying 70). The Gospel of Thomas presents a Jesus focused on inner knowledge (gnosis) rather than faith, and self-discovery rather than institutional religion.",
      intermediate:
        "The Nag Hammadi copy is in Coptic (an Egyptian language), translated from a Greek original. Three Greek fragments of Thomas were found at Oxyrhynchus, Egypt in the 1890s -- before anyone knew what they were. The manuscript dates to around 340 CE, but the composition date of the original Greek is hotly debated. Early dating (Crossan, Koester, DeConick): as early as 50-70 CE, making it contemporary with or earlier than the canonical Gospels. Some sayings may preserve more original forms of Jesus' words than the Synoptics. Late dating (Gathercole, Perrin): 2nd century, dependent on the canonical Gospels.\n\nKey theological features: (1) The Kingdom is present, not future -- 'The kingdom of the Father is spread out upon the earth, and people do not see it' (Saying 113). (2) Self-knowledge is the path -- 'When you come to know yourselves, then you will become known' (Saying 3). (3) The divine is in the material world -- 'Split a piece of wood, and I am there. Lift up the stone, and you will find me' (Saying 77). (4) No atonement theology -- no cross, no substitution, no 'dying for sins.' (5) Minimal eschatology -- the kingdom is here now, not coming later.\n\nThomas was excluded from the canon not because it was 'heretical' in the later sense, but because it didn't fit the developing theological framework that centered on Christ's death and resurrection. A sayings collection without a passion narrative was simply a different kind of Christianity.",
      advanced:
        "The scholarly debate about Thomas's relationship to the Synoptics is one of the most consequential in NT studies. If Thomas preserves independent early tradition, it demonstrates that non-narrative, wisdom-focused Christianity existed alongside (or even before) the kerygmatic tradition of Paul and the passion-narrative Gospels. This would require a fundamental revision of how we understand Christian origins.\n\nApril DeConick's 'rolling corpus' model proposes that Thomas was not composed at a single point but grew over time, with an early kernel of sayings (comparable to Q) gradually expanded with more esoteric material. This would explain why some sayings sound very 'Synoptic' while others are distinctly Gnostic.\n\nSaying 114 ('Simon Peter said to them, Let Mary leave us, for women are not worthy of life. Jesus said, I myself shall lead her in order to make her male... For every woman who will make herself male will enter the kingdom of heaven') has generated extensive scholarly discussion. Some read it as misogynistic; others (King, DeConick) argue it uses 'male' and 'female' as metaphors for spiritual states (transcending gender categories rather than privileging one). The saying may also reflect an early community's negotiation about women's roles.\n\nFor the reader: Thomas challenges the assumption that there was one 'original Christianity' from which everything else deviated. The earliest period was messy, diverse, and theologically creative. Thomas is evidence that some communities remembered a Jesus whose primary gift was transformative wisdom, not sacrificial death."
    },
  },

  {
    id: "c3-02",
    slug: "nag-hammadi",
    domainId: "d3",
    name: "Nag Hammadi Library",
    summary:
      "52 ancient texts buried in a jar in Egypt for 1,600 years. The biggest discovery in early Christian studies since the Dead Sea Scrolls.",
    lensTags: ["academic", "gnostic"],
    relatedConceptSlugs: ["gospel-of-thomas", "gnostic-cosmology", "gospel-of-mary"],
    relatedTextRefs: [],
    layers: {
      accessible:
        "In December 1945, near the town of Nag Hammadi in Upper Egypt, a farmer named Muhammad Ali al-Samman was digging for fertilizer when he found a sealed red clay jar containing 13 leather-bound codices -- books -- written in Coptic. They contained 52 texts, most of which had been completely lost for over 1,500 years. The texts include gospels, apocalypses, philosophical treatises, and wisdom texts that reveal an extraordinary diversity in early Christianity. Before Nag Hammadi, we knew about 'Gnostic' Christians mostly from their enemies (Irenaeus, Tertullian). Now we could read their own words.",
      intermediate:
        "The Nag Hammadi texts are mostly 4th-century Coptic translations of earlier Greek originals, probably dating from the 2nd-3rd centuries CE. They were likely hidden by monks from the nearby Pachomian monastery around 367 CE -- the same year Bishop Athanasius of Alexandria sent his 39th Festal Letter defining which books were canonical and ordering the destruction of all others.\n\nKey texts in the library: Gospel of Thomas (114 sayings of Jesus), Gospel of Philip (sacramental theology, Sophia myth, Jesus-Mary Magdalene relationship), Gospel of Truth (Valentinian meditation on redemption), Apocryphon of John (Gnostic cosmogony -- the origin of the universe as a divine mistake), Thunder, Perfect Mind (a goddess-like figure speaking paradoxes), On the Origin of the World, The Exegesis of the Soul.\n\nThe library is not uniformly 'Gnostic' -- it includes a passage from Plato's Republic, a Hermetic text, and The Sentences of Sextus (ethical maxims). This suggests the collection served a reading community interested in diverse wisdom traditions, not a narrow sect.\n\nJames Robinson's English edition, 'The Nag Hammadi Library in English' (1977, revised 1988), made these texts publicly accessible for the first time. The discovery transformed early Christian studies by revealing that Christianity's first centuries were far more theologically diverse than any single tradition acknowledged.",
      advanced:
        "The Nag Hammadi discovery's impact on scholarship has been compared to the Dead Sea Scrolls' impact on Second Temple Judaism studies. Before 1945, our knowledge of Gnostic Christianity came almost entirely from hostile reports by heresiologists (Irenaeus, 'Against Heresies,' c. 180 CE; Hippolytus, 'Refutation of All Heresies'; Epiphanius, 'Panarion'). These sources, while informative, systematically distorted Gnostic thought by presenting it as bizarre deviation from 'orthodox' norms that were themselves still developing.\n\nThe Nag Hammadi texts revealed that 'Gnosticism' was not a single movement but a family of related worldviews: Sethian texts (focused on Seth, Adam's third son, as a revelatory figure), Valentinian texts (the most philosophically sophisticated, associated with the teacher Valentinus in Rome, c. 140 CE), Hermetic texts (Egyptian philosophical religion), and texts that resist easy classification.\n\nMichael Williams' 'Rethinking Gnosticism' (1996) and Karen King's 'What Is Gnosticism?' (2003) argued that 'Gnosticism' as a category is a modern scholarly invention that lumps together genuinely different movements. King argues that calling something 'Gnostic' functions as a way of labeling it as heretical and dismissing it -- a modern continuation of the ancient heresiological project.\n\nFor scholarship: Nag Hammadi destroyed the myth of a single, unified 'early church' from which heretics deviated. What we see instead is a period of extraordinary theological creativity, diversity, and competition. 'Orthodoxy' and 'heresy' were not given categories but outcomes of a long, messy, political process of canon formation and creed-making."
    },
  },

  // ─── Domain 6: Theology ───────────────────────────────────────────────

  {
    id: "c6-01",
    slug: "atonement-theories",
    domainId: "d6",
    name: "Atonement Theories",
    summary:
      "Why did Jesus die? The church has never agreed on a single answer. Here are the major proposals.",
    lensTags: ["academic", "protestant", "catholic", "orthodox"],
    relatedConceptSlugs: ["soteriology", "christology", "penal-substitution"],
    relatedTextRefs: ["Romans 3:25", "1 John 2:2", "Colossians 2:15"],
    layers: {
      accessible:
        "If you ask 'why did Jesus die?', different Christian traditions give genuinely different answers. This is one of the biggest open questions in Christian theology, and no single theory has ever been declared the official answer. The major proposals: (1) Christus Victor -- Jesus' death defeated the powers of evil, sin, and death (dominant in the early church). (2) Satisfaction -- Jesus' death satisfied God's honor (Anselm, 11th century). (3) Penal Substitution -- Jesus took the punishment we deserved (Reformation, dominant in evangelicalism). (4) Moral Influence -- Jesus' death demonstrates God's love and inspires us to change (Abelard). (5) Scapegoat -- Jesus' death exposes and ends the cycle of sacrificial violence (Girard). These are not minor disagreements -- they produce fundamentally different understandings of God, justice, and what salvation means.",
      intermediate:
        "The historical development matters: Christus Victor (Gustaf Aulen, 1931, actually recovering ancient theology) was dominant for the first millennium. Christ's death is a cosmic battle -- God in Christ defeats the powers that enslave humanity (sin, death, the devil). This is the reading of Colossians 2:15 ('He disarmed the rulers and authorities and put them to open shame, triumphing over them'). Eastern Orthodoxy still holds this as primary.\n\nAnselm's Satisfaction Theory (Cur Deus Homo, 1098) reframed the question in feudal terms: sin offends God's honor, and only a being who is both human (to represent humanity) and divine (to offer infinite compensation) can make adequate satisfaction. This was NOT penal substitution -- Anselm was not talking about punishment but about honor and debt.\n\nPenal Substitution emerged with the Reformation (Calvin more than Luther). God's justice demands punishment for sin; Christ voluntarily absorbs that punishment in our place. This became the dominant evangelical view but has faced severe criticism: it seems to require God to punish an innocent person, it separates the Father (wrathful) from the Son (merciful), and it turns the cross into divine child abuse (the critique of feminist theologians like Joanne Carlson Brown).\n\nAbelard's Moral Influence/Moral Exemplar theory (12th century) sees Christ's death as the supreme demonstration of God's love, which moves us to love in return. Critics say this makes the cross merely inspirational rather than transformative.\n\nGirard's Scapegoat theory (20th century) uses social anthropology: human societies maintain order by projecting violence onto a scapegoat. Jesus accepts the role of scapegoat but, by being innocent and the death being witnessed, exposes and breaks the mechanism forever.",
      advanced:
        "Contemporary atonement theology increasingly moves toward multi-model approaches (Joel Green, Mark Baker, 'Recovering the Scandal of the Cross'). The argument: the NT itself uses multiple metaphors (victory, sacrifice, ransom, reconciliation, justification, redemption) without privileging one. Forcing a single theory onto these metaphors distorts the text.\n\nThe participatory model (gaining traction across traditions): atonement is not primarily about a transaction between God and Jesus on our behalf, but about humanity being incorporated into Christ's death and resurrection. Romans 6:3-4 ('baptized into his death') and Galatians 2:20 ('I have been crucified with Christ') point to participation, not spectation. Eastern Orthodox theosis (deification) is a version of this.\n\nThe Girardian reading has been particularly influential in recent decades (James Alison, 'The Joy of Being Wrong'). If the cross exposes the scapegoat mechanism, then Christianity is not a religion of sacrifice but the end of sacrifice -- the unveiling of the violence hidden in all human social order. This reading has powerful implications for social justice, nonviolence, and the critique of systems that sacrifice the vulnerable for the benefit of the powerful.\n\nFor the reader: the fact that Christianity has never agreed on a single atonement theory is not a failure -- it reflects the genuine mystery at the center of the faith. Each theory illuminates something. Each theory, when absolutized, distorts something. The question 'why did Jesus die?' may be less important than the question 'what does Jesus' death and resurrection make possible?'"
    },
    honestAnalysis:
      "No single atonement theory has been declared dogma by any ecumenical council. Penal Substitution, while dominant in evangelicalism, was not the view of the first millennium of Christianity and is rejected by most Orthodox and many Catholic theologians. The diversity of theories is a genuine feature of the tradition, not a problem to be solved.",
  },

  // ─── Domain 7: Contemplative Tradition ────────────────────────────────

  {
    id: "c7-01",
    slug: "lectio-divina",
    domainId: "d7",
    name: "Lectio Divina",
    summary:
      "An ancient practice of slow, contemplative reading that treats scripture as a living encounter, not a textbook.",
    lensTags: ["catholic", "orthodox", "anglican", "contemplative"],
    relatedConceptSlugs: ["centering-prayer", "desert-fathers", "rule-of-life"],
    relatedTextRefs: [],
    layers: {
      accessible:
        "Lectio Divina (Latin for 'divine reading') is an ancient monastic practice of reading scripture slowly and contemplatively, not for information but for encounter. It has four movements: (1) Lectio -- read a short passage slowly, out loud if possible. (2) Meditatio -- sit with a word or phrase that catches your attention. Repeat it. Let it work on you. (3) Oratio -- let prayer arise naturally from what you've read. This isn't a script -- it's whatever response comes. (4) Contemplatio -- rest in silence. Stop trying to do anything. Just be present. This is not Bible study. It's a different mode of engagement entirely -- closer to listening than analyzing.",
      intermediate:
        "Lectio Divina has roots in the 3rd century (Origen) but was systematized by the Benedictine monastic tradition. The Rule of Benedict (c. 530 CE) assigns substantial daily time to lectio. Guigo II, a 12th-century Carthusian monk, formalized the four steps in 'The Ladder of Monks' (Scala Claustralium).\n\nThe four movements form a progression from activity to receptivity: Lectio (active reading) -> Meditatio (active reflection) -> Oratio (responsive prayer) -> Contemplatio (passive receptivity). Some traditions add a fifth: Actio (embodied response -- living what you've received).\n\nPractical guidance: Choose a short passage (4-8 verses). Read it at least three times. In the first reading, listen for a word or phrase that 'shimmers' or catches you. In the second, ask what the text is saying to your life right now. In the third, let prayer arise. Then sit in silence for as long as feels right. 20 minutes is a common total time.\n\nCommon mistakes: treating it as Bible study (analyzing the text intellectually), rushing through the steps, and expecting dramatic experiences. Lectio is more like tending a garden than like having a revelation. Most sessions feel ordinary. The practice works cumulatively over months and years.",
      advanced:
        "Lectio Divina sits within the broader apophatic tradition (knowing God through unknowing, through what God is not rather than what God is). The movement from Lectio to Contemplatio parallels the classical mystic's path from purgation through illumination to union. Pseudo-Dionysius, the Cloud of Unknowing author, Meister Eckhart, and John of the Cross all describe versions of this trajectory.\n\nThe neurological dimension has been studied by researchers including Andrew Newberg. Repetitive, slow reading combined with silence activates the prefrontal cortex and deactivates the parietal lobe (associated with self-other boundaries), producing experiences of self-transcendence. This does not 'explain away' the practice -- it suggests that contemplative traditions discovered, through centuries of practice, techniques that engage specific neural pathways.\n\nFor the modern practitioner: Lectio Divina can be practiced with any text -- canonical, non-canonical, or even poetry and nature. The key is the mode of engagement: slow, receptive, non-analytical, oriented toward encounter rather than extraction. In a culture of speed-reading and information consumption, it is a radical act of attention."
    },
  },

  // ─── Domain 13: Personal/Pastoral ─────────────────────────────────────

  {
    id: "c13-01",
    slug: "theodicy",
    domainId: "d13",
    name: "Theodicy -- Why Does God Allow Suffering?",
    summary:
      "The hardest question in theology. The tradition has answers. None of them are completely satisfying. That's honest.",
    lensTags: ["academic", "protestant", "catholic", "orthodox", "pastoral"],
    relatedConceptSlugs: ["wisdom-literature", "psalms-of-lament", "atonement-theories"],
    relatedTextRefs: ["Job 38", "Psalm 22", "Romans 8:28"],
    layers: {
      accessible:
        "If God is all-good and all-powerful, why do innocent people suffer? This is the problem of theodicy (from the Greek 'theos' + 'dike' -- the justice of God), and it is the hardest question in theology. The honest answer: no one has ever fully solved it. But the tradition has generated several serious responses. The Free Will Defense says God gave humans freedom, and suffering is the cost of that freedom. The Soul-Making Theodicy says suffering develops character and growth. The Cruciform Theodicy says God does not stand apart from suffering but enters into it on the cross. And the Protest Theodicy (Elie Wiesel) says the right response is not to explain suffering but to accuse God and continue the relationship anyway.",
      intermediate:
        "The classical formulation (Epicurus, later refined by David Hume): 'Is God willing to prevent evil, but not able? Then he is not omnipotent. Is he able, but not willing? Then he is malevolent. Is he both able and willing? Then whence evil?' This trilemma has generated the major theodicy traditions.\n\nAugustine's Privation Theory: evil is not a thing in itself but the absence of good, like darkness is the absence of light. Evil exists because creatures with free will can turn away from God. This preserves God's goodness but raises the question of why God would create beings he knew would cause suffering.\n\nIrenaeus/Hick's Soul-Making Theodicy: the world is not a finished paradise but a 'vale of soul-making' where suffering enables growth, compassion, and moral development. The criticism: this fails before the suffering of children and animals, who cannot be meaningfully 'developed' by their pain.\n\nMoltmann's Cruciform Theodicy (The Crucified God, 1972): God does not observe suffering from the outside but enters fully into it in the cross. On the cross, God suffers. The Trinity is broken open by suffering -- the Father experiences the death of the Son. This does not explain why suffering exists but transforms the question from 'where is God in suffering?' to 'God is in the suffering.'\n\nWiesel's Protest Theodicy: in 'Night,' Wiesel describes watching a child being hanged in Auschwitz and hearing someone ask 'Where is God now?' The answer: 'There He is -- hanging on that gallows.' Wiesel does not leave the relationship with God. He accuses God. The biblical precedent is Job, who never gets an answer but never stops demanding one.",
      advanced:
        "Contemporary theology has largely moved beyond attempting to 'solve' theodicy and toward a pastoral and existential engagement with it.\n\nD.Z. Phillips ('The Problem of Evil and the Problem of God') argues that theodicy itself is the problem -- the attempt to justify suffering is morally obscene because it implies that suffering serves a purpose, which devalues the person who suffers. Phillips draws on Simone Weil: 'The love of God is not consolation, it is light.'\n\nWilliam Rowe's 'evidential argument from evil' distinguishes between logical and evidential problems. The logical problem (is evil logically incompatible with God's existence?) was arguably solved by Plantinga's Free Will Defense. The evidential problem (does the sheer amount and intensity of suffering make God's existence unlikely?) remains powerful.\n\nFor pastoral engagement: Romans 8:28 ('all things work together for good') is the most misused verse in grief situations. In context, Paul is not saying 'your suffering has a purpose' but making a cosmic eschatological claim about God's ultimate redemption of creation. Telling a grieving person that their loss 'happened for a reason' is pastoral malpractice. The ministry of presence -- being with someone in their pain without trying to explain it -- is consistently what pastoral care research identifies as most helpful.\n\nJob remains the most honest theological text on suffering. God's answer from the whirlwind (chapters 38-41) is not an explanation but a tour of creation's wildness and mystery. The implicit message: the universe is vastly more complex than your categories of justice and reward. This is not an answer. It may be the only honest response."
    },
    honestAnalysis:
      "No theodicy is fully satisfying. The intellectual problem has not been solved, and attempts to explain particular instances of suffering to the people experiencing them consistently cause more harm than good. The most honest Christian response combines intellectual honesty about the mystery with pastoral presence in the suffering.",
  },
];

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find((c) => c.slug === slug);
}

export function getConceptsByDomain(domainId: string): Concept[] {
  return concepts.filter((c) => c.domainId === domainId);
}

export function searchConcepts(query: string): Concept[] {
  const q = query.toLowerCase();
  return concepts.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q) ||
      c.layers.accessible.toLowerCase().includes(q)
  );
}
