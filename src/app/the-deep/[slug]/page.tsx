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
// Router
// ---------------------------------------------------------------------------
export default function DeepSlugPage() {
  const params = useParams();
  const slug = params?.slug as string;

  if (slug === "stolen-legacy") return <StolenLegacyPage />;
  if (slug === "timeline") return <TimelineDeepPage />;
  if (slug === "hidden-texts") return <HiddenTextsPage />;

  return <CurrentDetailPage slug={slug} />;
}
