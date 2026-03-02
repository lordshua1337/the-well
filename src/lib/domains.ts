export interface Domain {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  conceptCount: number;
  color: string;
}

export const domains: Domain[] = [
  {
    id: "d1",
    slug: "hebrew-bible",
    name: "Hebrew Bible / Old Testament / Tanakh",
    shortName: "Hebrew Bible",
    description:
      "Torah, Prophets, Writings -- the foundational texts in their original context. Documentary Hypothesis, Dead Sea Scrolls variants, Ancient Near Eastern parallels.",
    icon: "ScrollText",
    conceptCount: 8,
    color: "#8B6914",
  },
  {
    id: "d2",
    slug: "new-testament",
    name: "New Testament",
    shortName: "New Testament",
    description:
      "Gospels, Paul, Acts, Revelation -- who wrote what, when, and what the Greek actually says. Synoptic Problem, Q source, canon formation.",
    icon: "BookOpen",
    conceptCount: 8,
    color: "#2D6A4F",
  },
  {
    id: "d3",
    slug: "non-canonical",
    name: "Non-Canonical and Extracanonical Texts",
    shortName: "Lost Texts",
    description:
      "Nag Hammadi library, Dead Sea Scrolls, Apostolic Fathers, Gnostic cosmology. The texts that didn't make the cut -- and why.",
    icon: "Archive",
    conceptCount: 7,
    color: "#7C3AED",
  },
  {
    id: "d4",
    slug: "original-languages",
    name: "Original Languages",
    shortName: "Languages",
    description:
      "Biblical Hebrew, Aramaic, Koine Greek. Root systems, verbal forms, what translation loses. The words behind the words.",
    icon: "Languages",
    conceptCount: 6,
    color: "#0891B2",
  },
  {
    id: "d5",
    slug: "church-history",
    name: "Church History and Historical Theology",
    shortName: "Church History",
    description:
      "From house churches to the Vatican. Councils, creeds, schisms, reformations. How we got from there to here.",
    icon: "Landmark",
    conceptCount: 7,
    color: "#B45309",
  },
  {
    id: "d6",
    slug: "theology",
    name: "Systematic and Historical Theology",
    shortName: "Theology",
    description:
      "Atonement theories, Christology, eschatology, soteriology. What each tradition believes and why -- mapped, not advocated.",
    icon: "Compass",
    conceptCount: 7,
    color: "#4F46E5",
  },
  {
    id: "d7",
    slug: "contemplative",
    name: "Contemplative Tradition and Spiritual Practice",
    shortName: "Practice",
    description:
      "Desert Fathers, Lectio Divina, Centering Prayer, Ignatian Spirituality, mystical theology. The practices, not just the ideas.",
    icon: "Flame",
    conceptCount: 6,
    color: "#DC2626",
  },
  {
    id: "d8",
    slug: "liturgy",
    name: "Liturgy, Worship, and Sacramental Life",
    shortName: "Liturgy",
    description:
      "Liturgical calendar, Eucharistic traditions, baptismal theology, sacred music. How Christians have worshiped across 2,000 years.",
    icon: "Church",
    conceptCount: 3,
    color: "#9333EA",
  },
  {
    id: "d9",
    slug: "comparative",
    name: "Comparative Religion and Interfaith Context",
    shortName: "Interfaith",
    description:
      "Second Temple Judaism, Rabbinic tradition, Islam, Kabbalah. Understanding the neighbors illuminates the tradition.",
    icon: "Globe",
    conceptCount: 3,
    color: "#059669",
  },
  {
    id: "d10",
    slug: "archaeology",
    name: "Biblical Archaeology and Historical Context",
    shortName: "Archaeology",
    description:
      "Ancient Near Eastern parallels, Dead Sea Scrolls sites, crucifixion evidence, Josephus. What the ground tells us.",
    icon: "MapPin",
    conceptCount: 3,
    color: "#92400E",
  },
  {
    id: "d11",
    slug: "hermeneutics",
    name: "Hermeneutics -- How to Read Scripture",
    shortName: "Hermeneutics",
    description:
      "Allegorical, historical-critical, narrative, feminist, liberation. How you read changes what you find.",
    icon: "Eye",
    conceptCount: 3,
    color: "#1D4ED8",
  },
  {
    id: "d12",
    slug: "denominations",
    name: "Denominations and Their Distinctive Theologies",
    shortName: "Traditions",
    description:
      "Catholic, Orthodox, Lutheran, Reformed, Baptist, Methodist, Pentecostal, Anabaptist. What makes each one tick.",
    icon: "Users",
    conceptCount: 3,
    color: "#7C2D12",
  },
  {
    id: "d13",
    slug: "pastoral",
    name: "Personal and Pastoral Application",
    shortName: "Life",
    description:
      "Grief, decision-making, suffering, mental health, justice, money. Where the texts meet actual human life.",
    icon: "Heart",
    conceptCount: 3,
    color: "#BE185D",
  },
];

export function getDomainBySlug(slug: string): Domain | undefined {
  return domains.find((d) => d.slug === slug);
}

export function getDomainById(id: string): Domain | undefined {
  return domains.find((d) => d.id === id);
}
