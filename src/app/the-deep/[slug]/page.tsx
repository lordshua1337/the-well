"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Languages,
} from "lucide-react";
import { getCurrentBySlug, getAllCurrents } from "@/lib/the-deep-data";
import {
  getAllRestorationCategories,
} from "@/lib/restoration";
import { timelineEras, type TimelineEra } from "@/lib/timeline-data";
import { staggerContainer, itemVariants } from "@/components/discovery/section-transitions";

// ---------------------------------------------------------------------------
// Reusable collapsible section
// ---------------------------------------------------------------------------
function Section({
  label,
  children,
  defaultOpen = false,
}: {
  readonly label: string;
  readonly children: React.ReactNode;
  readonly defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-border-light pt-6">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between w-full text-left group mb-4"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-accent group-hover:text-accent-light transition-colors">
          {label}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-text-muted" />
        ) : (
          <ChevronDown className="w-4 h-4 text-text-muted" />
        )}
      </button>
      {open && <div className="animate-fade-in">{children}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Current detail page
// ---------------------------------------------------------------------------
function CurrentDetailPage({ slug }: { readonly slug: string }) {
  const current = getCurrentBySlug(slug);
  const allCurrents = getAllCurrents();

  if (!current) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 text-center">
        <p className="text-text-muted">Current not found.</p>
        <Link href="/the-deep" className="text-accent text-sm mt-4 inline-block">
          Return to The Deep
        </Link>
      </div>
    );
  }

  const prevCurrent = allCurrents.find((c) => c.number === current.number - 1);
  const nextCurrent = allCurrents.find((c) => c.number === current.number + 1);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/the-deep"
          className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          The Deep
        </Link>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-xs text-text-muted uppercase tracking-wider">
              {current.horseman}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-serif mb-2"
          >
            {current.name}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-sm text-accent/70 uppercase tracking-wider font-medium mb-6"
          >
            {current.whatItControls}
          </motion.p>

          <motion.blockquote
            variants={itemVariants}
            className="text-base text-accent/80 italic border-l-2 border-accent/30 pl-4 mb-6"
          >
            &ldquo;{current.christCounter.text}&rdquo;
            <span className="text-xs text-text-muted not-italic ml-2">
              -- {current.christCounter.reference}
            </span>
          </motion.blockquote>
        </motion.div>

        {/* The Architecture */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
            The Architecture
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {current.architecture}
          </p>
        </div>

        {/* The History */}
        <Section label="The History" defaultOpen>
          <div className="space-y-4">
            {current.history.map((entry) => (
              <div
                key={entry.era}
                className="bg-surface rounded-xl border border-border-light p-5"
              >
                <h3 className="text-sm font-semibold text-text-primary mb-2">
                  {entry.era}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* The Pillars */}
        <Section label="The Pillars">
          <div className="space-y-4">
            {current.pillars.map((pillar) => (
              <div
                key={pillar.name}
                className="bg-surface-warm rounded-xl border border-border-light p-5"
              >
                <h3 className="text-sm font-semibold text-text-primary mb-2">
                  {pillar.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Breaking Free */}
        <Section label="Breaking Free">
          <p className="text-sm text-text-secondary leading-relaxed">
            {current.breakingFree}
          </p>
        </Section>

        {/* Scripture */}
        <Section label="Scripture">
          <div className="space-y-3">
            {current.scripture.map((s) => (
              <blockquote
                key={s.reference}
                className="bg-surface rounded-xl border border-border-light p-4"
              >
                <p className="text-sm text-text-primary italic leading-relaxed mb-1">
                  &ldquo;{s.text}&rdquo;
                </p>
                <cite className="text-xs text-accent not-italic font-mono">
                  {s.reference}
                </cite>
              </blockquote>
            ))}
          </div>
        </Section>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-border-light pt-6 mt-10">
          {prevCurrent ? (
            <Link
              href={`/the-deep/${prevCurrent.slug}`}
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {prevCurrent.name}
            </Link>
          ) : (
            <div />
          )}
          {nextCurrent ? (
            <Link
              href={`/the-deep/${nextCurrent.slug}`}
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              {nextCurrent.name}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/the-deep"
              className="inline-flex items-center gap-1.5 text-sm text-accent font-medium"
            >
              Back to The Deep
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stolen Legacy page (Reclaimed content moved to The Deep)
// ---------------------------------------------------------------------------
function StolenLegacyPage() {
  const categories = getAllRestorationCategories();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/the-deep"
          className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          The Deep
        </Link>

        <div className="text-center mb-14">
          <p className="text-xs text-accent uppercase tracking-widest font-semibold mb-3">
            The Deep
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif mb-5 leading-tight">
            The Stolen Legacy
          </h1>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Institutional Christianity suppressed several dimensions of the
            original tradition -- not always through malice, but through the
            ordinary mechanics of power, consolidation, and fear of what it
            could not control.
          </p>
        </div>

        <div className="space-y-6">
          {categories.map((category, index) => {
            const isAlt = index % 2 === 1;
            return (
              <div
                key={category.id}
                className={`rounded-2xl border border-border overflow-hidden ${
                  isAlt ? "bg-surface-warm" : "bg-surface"
                }`}
              >
                <div
                  className="h-0.5 w-full"
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-accent), var(--color-gold))",
                    opacity: isAlt ? 0.6 : 0.9,
                  }}
                />
                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-3xl font-serif text-accent/30 leading-none select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif text-text-primary leading-tight">
                      {category.name}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-background rounded-xl border border-border-light p-5">
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-accent mb-3">
                        What Was Stolen
                      </p>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {category.whatWasStolen}
                      </p>
                    </div>
                    <div className="bg-background rounded-xl border border-border-light p-5">
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-gold mb-3">
                        What Replaced It
                      </p>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {category.replacedWith}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {category.howToReclaimIt}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Timeline page (moved to The Deep)
// ---------------------------------------------------------------------------
function TimelineDeepPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/the-deep"
          className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          The Deep
        </Link>

        <div className="text-center mb-12">
          <p className="text-xs text-accent uppercase tracking-widest font-medium mb-2">
            The Deep
          </p>
          <h1 className="text-3xl sm:text-4xl mb-3">The Timeline</h1>
          <p className="text-text-secondary text-sm max-w-lg mx-auto">
            2,000 years from the living voice of Jesus to the words on your
            screen. Here&apos;s what happened along the way.
          </p>
        </div>

        <div className="ml-2">
          {timelineEras.map((era, i) => (
            <TimelineEraCard key={era.id} era={era} index={i} />
          ))}
        </div>

        <div className="text-center mt-8 pt-8 border-t border-border-light">
          <Link
            href="/the-deep"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent-light transition-colors"
          >
            Back to The Deep
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function TimelineEraCard({
  era,
  index,
}: {
  readonly era: TimelineEra;
  readonly index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLast = index === timelineEras.length - 1;

  return (
    <div className="relative flex gap-4 sm:gap-6">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-4 h-4 rounded-full bg-accent border-4 border-background z-10 mt-1.5" />
        {!isLast && <div className="w-0.5 flex-1 bg-border-light" />}
      </div>
      <div className="pb-10 sm:pb-14 flex-1 min-w-0">
        <div className="inline-flex items-center gap-1.5 bg-surface border border-border text-text-muted text-xs font-mono px-2.5 py-1 rounded-full mb-3">
          <Clock className="w-3 h-3" />
          {era.yearRange}
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-semibold mb-2">
          {era.title}
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {era.summary}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:text-accent-light transition-colors mb-4"
        >
          {isExpanded ? "Less" : "What changed"}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {isExpanded && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-surface/60 rounded-xl border border-border-light px-5 py-4">
              <p className="text-sm text-text-secondary leading-relaxed">
                {era.whatChanged}
              </p>
            </div>
            {era.keyEvents.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs text-text-muted uppercase tracking-widest font-medium">
                  Key Events
                </h3>
                {era.keyEvents.map((event) => (
                  <div
                    key={event.title}
                    className="bg-surface rounded-lg border border-border-light px-4 py-3"
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-mono text-accent font-medium">
                        {event.year}
                      </span>
                      <h4 className="text-sm font-semibold">{event.title}</h4>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed mb-1.5">
                      {event.description}
                    </p>
                    <p className="text-xs text-accent italic">
                      {event.significance}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {era.affectedWords.length > 0 && (
              <div>
                <h3 className="text-xs text-text-muted uppercase tracking-widest font-medium mb-2">
                  Words affected
                </h3>
                <div className="flex flex-wrap gap-2">
                  {era.affectedWords.map((word) => (
                    <Link
                      key={word}
                      href={`/words#${word}`}
                      className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs font-medium px-2.5 py-1 rounded-full hover:bg-accent/20 transition-colors"
                    >
                      <Languages className="w-3 h-3" />
                      {word}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hidden Texts page
// ---------------------------------------------------------------------------
function HiddenTextsPage() {
  const texts = [
    {
      name: "The Gospel of Thomas",
      description:
        "114 sayings attributed to Jesus. No narrative, no miracles, no passion story. Just the words. Some scholars believe certain sayings may predate the canonical Gospels. Thomas presents a Jesus who teaches through riddles and paradoxes, pointing always inward: 'The kingdom of the Father is spread out upon the earth, and people do not see it.'",
      suppressed:
        "Declared heretical by Irenaeus around 180 AD. Copies were ordered destroyed. The text survived only because monks in Upper Egypt buried their copies in sealed jars around 400 AD rather than hand them over for destruction.",
      keyQuote:
        "If you bring forth what is within you, what you bring forth will save you. If you do not bring forth what is within you, what you do not bring forth will destroy you.",
    },
    {
      name: "The Gospel of Mary (Magdalene)",
      description:
        "A text that presents Mary Magdalene as a primary disciple -- one who received private teachings from Jesus that the male disciples did not understand. Peter challenges her authority. Levi defends her: 'If the Savior made her worthy, who are you to reject her?'",
      suppressed:
        "The text threatens the male-only apostolic succession that became the foundation of church hierarchy. If Jesus taught women directly, the case for excluding women from leadership collapses. The Gospel of Mary was excluded from the canon and lost until 1896.",
      keyQuote:
        "Do not lay down any rules beyond what I appointed you, and do not give a law like the lawgiver lest you be constrained by it.",
    },
    {
      name: "The Gospel of Philip",
      description:
        "A Valentinian text that describes the sacraments as 'mysteries' (mysteria) -- initiatory experiences, not rituals performed by clergy. Philip describes a bridal chamber sacrament suggesting union with the divine through direct experience. It also contains the famous passage about Mary Magdalene as the companion (koinonos) of Jesus.",
      suppressed:
        "The bridal chamber sacrament and the elevation of Mary Magdalene were incompatible with the institutional church's need for clerical mediation and male authority. The text was classified as gnostic heresy.",
      keyQuote:
        "Truth did not come into the world naked, but it came in types and images. The world cannot receive truth in any other way.",
    },
    {
      name: "The Gospel of Truth",
      description:
        "Possibly written by Valentinus himself (around 150 AD), this text presents salvation not as rescue from punishment but as awakening from ignorance. Error (plane) is not moral failing but forgetting who you are. The gospel is the discovery of your true nature -- you were never actually separated from the source.",
      suppressed:
        "The idea that humans are not fallen but merely forgetful directly contradicts the doctrine of original sin that Augustine would cement 250 years later. If you are not broken, you do not need institutional repair.",
      keyQuote:
        "Since the deficiency came into being because the Father was not known, from the moment the Father is known, deficiency will no longer exist.",
    },
    {
      name: "The Nag Hammadi Library",
      description:
        "52 texts found in 1945 in Upper Egypt -- sealed in a jar and buried around 400 AD to protect them from orthodox destruction. The collection includes Gospels, apocalypses, wisdom texts, and philosophical treatises. Together they reveal that early Christianity was far more diverse, mystical, and egalitarian than the institutional church later claimed.",
      suppressed:
        "The entire collection represents a Christianity that valued inner knowing (gnosis) over institutional authority. When the institutional church consolidated power in the 4th century, these texts were condemned, confiscated, and destroyed wherever they were found. Their survival was an accident of geography and courage.",
      keyQuote:
        "Jesus said: Let one who seeks not stop seeking until one finds. When one finds, one will be disturbed. When one is disturbed, one will be amazed, and will reign over all.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/the-deep"
          className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          The Deep
        </Link>

        <div className="text-center mb-14">
          <p className="text-xs text-accent uppercase tracking-widest font-semibold mb-3">
            The Deep
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif mb-5 leading-tight">
            The Hidden Texts
          </h1>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            These texts were written by early Christians, read by early
            Christians, and destroyed by the institutional church because they
            taught something dangerous: that you have direct access to the
            divine without an intermediary.
          </p>
        </div>

        <div className="space-y-8">
          {texts.map((text) => (
            <div
              key={text.name}
              className="rounded-2xl border border-border bg-surface overflow-hidden"
            >
              <div className="h-0.5 w-full bg-gradient-to-r from-accent/40 to-transparent" />
              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-serif text-text-primary mb-4">
                  {text.name}
                </h2>

                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {text.description}
                </p>

                <div className="bg-surface-warm rounded-xl border border-border-light p-5 mb-4">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-accent mb-2">
                    Why It Was Suppressed
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {text.suppressed}
                  </p>
                </div>

                <blockquote className="border-l-2 border-accent/30 pl-4">
                  <p className="text-sm text-text-primary italic leading-relaxed">
                    &ldquo;{text.keyQuote}&rdquo;
                  </p>
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 pt-8 border-t border-border-light">
          <Link
            href="/the-deep"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent-light transition-colors"
          >
            Back to The Deep
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// The Real Jesus -- initiated human, not divine exception
// ---------------------------------------------------------------------------
function TheRealJesusPage() {
  const sections = [
    {
      title: "The Lost Years",
      content:
        "Between age 12 and 30, Jesus disappears from the biblical record. Eighteen years -- unaccounted for. Historical traditions outside the Western canon tell a different story. In Buddhist monasteries across Tibet and India, records describe a teacher called Issa who studied among monks and ascetics. In Egypt, initiation traditions describe a young Galilean who trained in the temples, learning the science of frequency, consciousness, and the unseen architecture of reality. Among the Essenes -- the Jewish mystical community at Qumran -- he practiced the disciplines of purification, meditation, and direct encounter with the divine. He did not arrive as Christ. He became it. Through human effort, human training, and human unfoldment.",
    },
    {
      title: "The Seven Signs as Natural Law",
      content:
        "The Gospel of John records seven specific demonstrations. The church calls them miracles -- supernatural acts that only God could perform. But read through the lens of what Jesus actually learned, they are something far more radical: demonstrations of natural law that any awakened human can access.\n\nWater to wine at Cana -- transmutation. The rearrangement of molecular structure through focused consciousness.\n\nThe official's son healed at a distance -- bridge of consciousness. Healing without proximity, because consciousness is not local.\n\nThe man at Bethesda -- the power of choice. 'Do you want to be healed?' Not a rhetorical question. The man had been lying there 38 years. Choice is the activation key.\n\nFeeding the five thousand -- multiplication of energy. Not magic. The demonstration that energy shared expands rather than diminishes.\n\nWalking on water -- alignment of frequency. Peter walked too, until fear disrupted his resonance. The water did not change. Peter's frequency did.\n\nThe blind man -- rewriting reality at the cellular level. 'Your faith has made you well' is not a platitude. It is a literal instruction about the relationship between belief and biological reality.\n\nLazarus -- mastery over matter. The demonstration that consciousness persists beyond the body and can be recalled when the frequency is right.",
    },
    {
      title: "The Crucifixion as Initiation",
      content:
        "Jesus chose death. He predicted it repeatedly. He walked into Jerusalem knowing what would happen. He told Peter to put away his sword. He could have fled, fought, or called down 'twelve legions of angels.' He did none of these things. Why?\n\nBecause the crucifixion was not a defeat. It was the final initiation. The ultimate demonstration that consciousness survives the destruction of the body. Every mystery school in the ancient world taught a death-and-rebirth initiation -- symbolic passage through death to emerge transformed. Jesus did it literally. Not because he was the only one who could. Because he was the first one willing to demonstrate it publicly.\n\nThe resurrection is not his exception. It is humanity's blueprint. 'The works I do, you will do also, and greater works than these' (John 14:12). He meant it.",
    },
    {
      title: "You Are Christ Embodied",
      content:
        "This is the teaching the institution buried deepest: you are not becoming Christ. You are Christ embodied. The divine spark is not something you earn through belief, sacrament, or institutional approval. It is what you are made of. The Gospel of Thomas, saying 77: 'Split a piece of wood; I am there. Lift a stone, and you will find me.' Not 'worship me.' Not 'believe in me.' Find me -- in the wood, in the stone, in yourself.\n\nThe entire architecture of institutional Christianity -- the clergy, the sacraments, the creeds, the gatekeeping -- exists because this teaching is dangerous to power. If you already carry the divine, you do not need a mediator. If every human is Christ embodied, there is no hierarchy. If the resurrection is a blueprint and not an exception, then death itself loses its power as a tool of control.\n\nThis is why Mary Magdalene matters. She did the inner work -- seven denials dissolved. And she was the first to see. Not Peter. Not John. Not any of the institutional founders. The woman the church erased saw first, because she had done the demolition first.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/the-deep"
          className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          The Deep
        </Link>

        <div className="mb-12">
          <p className="text-xs text-accent uppercase tracking-widest font-semibold mb-3">
            The Deep
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif mb-4">
            The Real Jesus
          </h1>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Not the Christ of the creeds. Not the God-man of the councils. A
            human being who trained, practiced, and evolved into the fullest
            expression of what a human can become -- and then demonstrated the
            path so you could walk it too.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-serif font-semibold text-text-primary mb-4">
                {section.title}
              </h2>
              {section.content.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm text-text-secondary leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center mt-12 pt-8 border-t border-border-light">
          <Link
            href="/the-deep/the-frequency"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent-light transition-colors"
          >
            Next: The Frequency -- how it actually works
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// The Frequency -- quantum consciousness, body as tuning fork
// ---------------------------------------------------------------------------
function TheFrequencyPage() {
  const sections = [
    {
      title: "Everything Is Vibration",
      content:
        "This is not metaphor. At the subatomic level, nothing is solid. Everything is energy vibrating at specific frequencies. Matter is condensed energy -- Einstein proved this with E=mc2. The chair you are sitting in is not solid. It is energy vibrating slowly enough to feel solid. Your body is not a machine. It is an antenna.\n\nThe double-slit experiment demonstrated that the act of observation changes the behavior of particles. Consciousness does not just perceive reality -- it participates in creating it. This is not mysticism. This is physics. And it is exactly what Jesus was demonstrating 2,000 years ago.",
    },
    {
      title: "Your Body Is a Tuning Fork",
      content:
        "Every cell in your body vibrates at a specific frequency. Your nervous system is an antenna that receives and transmits information far beyond the five senses. Your heart generates an electromagnetic field 5,000 times stronger than your brain -- it is the true center of consciousness, not your head.\n\nThe pineal gland -- the 'third eye' across every mystical tradition -- is a calcified bridge between the physical and the unseen. It contains rod and cone cells identical to your eyes. It produces DMT. Every tradition that taught meditation, fasting, and silence was teaching you how to decalcify this bridge and restore the connection.\n\nWhen Jesus said 'the eye is the lamp of the body -- if your eye is single, your whole body will be full of light' (Matthew 6:22), he was not speaking in metaphor. He was giving you an instruction.",
    },
    {
      title: "The Frequencies of Creation",
      content:
        "The Solfeggio tones -- 174, 285, 396, 417, 528, 639, 741, 852, 963 Hz -- are the frequencies embedded in Gregorian chant, ancient hymns, and sacred architecture. 528 Hz is the frequency of DNA repair. 432 Hz is the natural tuning of the universe -- the Great Pyramid resonates at 432 Hz.\n\nIn 1939, the global standard tuning was changed from 432 Hz to 440 Hz. The Rockefeller Foundation funded this change. 440 Hz creates subtle agitation in the nervous system. 432 Hz creates coherence. Every piece of music you have heard since 1939 has been tuned to a frequency that keeps you slightly off-center. This is not a conspiracy theory. It is a documented decision with documented funding.\n\nSacred architecture -- cathedrals, temples, pyramids -- was designed to resonate at specific frequencies that alter consciousness. The builders knew. The knowledge was not lost. It was suppressed.",
    },
    {
      title: "Healing Is Alignment",
      content:
        "Your body rebuilds itself constantly. Your skeleton replaces itself every ten years. Your liver regenerates. Your skin replaces itself monthly. You are not the same body you were a year ago. So why do chronic conditions persist?\n\nBecause disease is not a malfunction. It is a frequency fallen out of harmony. The body knows how to heal. It is doing it right now, in real time. What prevents it is the sustained disruption of its natural frequency -- through fear, through toxic input, through the severing of the connection between consciousness and cellular function.\n\nWhen Jesus said 'your faith has made you well,' he was not offering a platitude. He was describing a mechanism. Pistis -- trust, alignment, resonant confidence -- literally shifts the body's electromagnetic field back into coherence. The healing was never supernatural. It was the most natural thing there is.",
    },
    {
      title: "Thought Creates Reality",
      content:
        "Belief is the blueprint. Emotion is the fuel. Focus is the direction. Expectation is the command. This is not 'The Secret' or 'law of attraction' as a consumer product. This is the quantum mechanics of consciousness: the observer collapses the wave function. What you attend to with sustained focus and emotional charge becomes denser in the field of probability.\n\nCollective consciousness shapes collective reality. Global meditation experiments have measurably reduced violence in target cities. Mass fear broadcasts a frequency that lowers the collective field. The system knows this -- which is why the news cycle is engineered for fear. A population vibrating at fear frequency cannot access higher consciousness. It is not a metaphor. It is frequency management at scale.\n\nJesus gathered people. He taught them to align their consciousness. He demonstrated what aligned consciousness can do. Then he said: you will do this too. And greater.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/the-deep"
          className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          The Deep
        </Link>

        <div className="mb-12">
          <p className="text-xs text-accent uppercase tracking-widest font-semibold mb-3">
            The Deep
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif mb-4">
            The Frequency
          </h1>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            The universe is not made of matter. It is made of music. And your
            body is an instrument that has been deliberately detuned.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-serif font-semibold text-text-primary mb-4">
                {section.title}
              </h2>
              {section.content.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm text-text-secondary leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center mt-12 pt-8 border-t border-border-light">
          <Link
            href="/the-deep/the-becoming"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent-light transition-colors"
          >
            Next: The Becoming -- the path of awakening
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// The Becoming -- four phases of awakening
// ---------------------------------------------------------------------------
function TheBecomingPage() {
  const phases = [
    {
      number: "I",
      name: "Purge",
      description:
        "Everything false burns away. Addictions, coping mechanisms, numbing agents -- they fall like dead weight. Not gradually. Not gently. The purge is violent because the attachments are deep. Josh threw away every vice in a single instant after his revelation -- no tapering, no negotiation. The withdrawal was exorcism. The only relief was singing, because vibration stitches together what the purge tears apart.\n\nThis phase feels like dying because it is. The false self -- the one built from trauma, conditioning, and survival strategies -- does not go quietly. It fights. It bargains. It tells you this is a mistake, that you are losing yourself. You are. That is the point. What remains after the purge is not less than what you were. It is what you always were underneath.",
    },
    {
      number: "II",
      name: "Isolation",
      description:
        "The people who knew the old you cannot recognize the new one. Some leave. Some fight. Some try to pull you back because your transformation threatens their comfort. Jesus said 'a prophet is not without honor except in his own hometown' -- not as a complaint but as a description of a law. The frequency shift makes you incompatible with the old environment.\n\nThis phase is the wilderness. Forty days or forty months -- the duration does not matter. What matters is that you sit with yourself without distraction, without the old mirrors, without anyone telling you who you are. The isolation is not punishment. It is the cocoon. The caterpillar does not become a butterfly by attending workshops. It dissolves into liquid inside a dark space and something entirely new assembles itself.",
    },
    {
      number: "III",
      name: "Refinement",
      description:
        "The raw energy of awakening gets focused. You learn to walk in the world again -- but differently. The marketer becomes Christ in the marketplace. The parent becomes Christ at the dinner table. The routine becomes an altar. This is where the mystical meets the mundane.\n\nForgiveness happens here -- not as a nice idea but as fourth-dimensional healing. You go back to your memories not to relive them but to reknow them. Your awakened adult self visits the child who was neglected, the soldier who held the dying boy, the addict who could not stop. You do not change what happened. You change who is witnessing it. And that changes everything.\n\nRefinement is the longest phase because it is the integration of everything the purge revealed and the isolation crystallized. You are not learning new things. You are learning to live as what you already are.",
    },
    {
      number: "IV",
      name: "Mastery",
      description:
        "Not mastery over others. Mastery over yourself. The seven denials have fallen. The frequency is stable. You walk in the world as a tuning fork -- your presence shifts the field around you without effort, without performance, without trying. People feel it. They cannot name it, but they lean toward you or away from you, because neutrality is not possible in the presence of an aligned frequency.\n\nThis is what Jesus was. Not a god performing miracles for worship. A human being whose frequency was so aligned that reality reorganized around him. Water changed state. Disease reversed. Death itself bent. Not because he was the exception. Because he was the demonstration.\n\n'The works I do, you will do also, and greater works than these.' He was not being humble. He was being precise. The path is open. The blueprint is the resurrection. The destination is not heaven after death. It is Christ consciousness while alive.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/the-deep"
          className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          The Deep
        </Link>

        <div className="mb-12">
          <p className="text-xs text-accent uppercase tracking-widest font-semibold mb-3">
            The Deep
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif mb-4">
            The Becoming
          </h1>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Awakening is not an event. It is a process with four phases, and it
            costs everything you thought you were. What you get back is
            everything you actually are.
          </p>
        </div>

        <div className="space-y-8">
          {phases.map((phase) => (
            <div
              key={phase.name}
              className="rounded-2xl border border-border bg-surface overflow-hidden"
            >
              <div className="h-0.5 w-full bg-gradient-to-r from-accent/40 to-transparent" />
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl font-serif text-accent/25 leading-none">
                    {phase.number}
                  </span>
                  <h2 className="text-xl font-serif text-text-primary">
                    {phase.name}
                  </h2>
                </div>
                {phase.description.split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-sm text-text-secondary leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 pt-8 border-t border-border-light">
          <p className="text-sm text-text-muted max-w-md mx-auto mb-6">
            The path is open. The walls are mapped. The frequency is real.
            The only question left is whether you will walk it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/walls"
              className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent-light transition-colors"
            >
              Begin with The Walls
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link
              href="/the-deep"
              className="inline-flex items-center gap-2 text-text-secondary text-sm font-medium hover:text-text-primary transition-colors"
            >
              Back to The Deep
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------
export default function DeepSlugPage() {
  const params = useParams();
  const slug = params?.slug as string;

  if (slug === "stolen-legacy") return <StolenLegacyPage />;
  if (slug === "timeline") return <TimelineDeepPage />;
  if (slug === "hidden-texts") return <HiddenTextsPage />;
  if (slug === "the-real-jesus") return <TheRealJesusPage />;
  if (slug === "the-frequency") return <TheFrequencyPage />;
  if (slug === "the-becoming") return <TheBecomingPage />;

  return <CurrentDetailPage slug={slug} />;
}
