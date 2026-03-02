import Link from "next/link";
import {
  BookOpen,
  Languages,
  MessageCircle,
  ArrowRight,
  Droplets,
  ChevronDown,
  ScrollText,
  Archive,
  Landmark,
  Compass,
  Flame,
  Globe,
  MapPin,
  Eye,
  Users,
  Heart,
  Church,
  Layers,
} from "lucide-react";
import { domains } from "@/lib/domains";
import { concepts } from "@/lib/concepts";

const domainIconMap: Record<string, React.ReactNode> = {
  ScrollText: <ScrollText className="w-4 h-4" />,
  BookOpen: <BookOpen className="w-4 h-4" />,
  Archive: <Archive className="w-4 h-4" />,
  Languages: <Languages className="w-4 h-4" />,
  Landmark: <Landmark className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
  Church: <Church className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  MapPin: <MapPin className="w-4 h-4" />,
  Eye: <Eye className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
};

function DomainIcon({ name }: { name: string }) {
  return <>{domainIconMap[name] || null}</>;
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-surface rounded-xl border border-border p-6 card-hover block"
    >
      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-serif font-semibold mb-2">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">
        {description}
      </p>
      <div className="flex items-center gap-1 text-accent text-sm font-medium mt-4 group-hover:gap-2 transition-all">
        Explore <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

function WordPreview({
  greek,
  common,
  actual,
}: {
  greek: string;
  common: string;
  actual: string;
}) {
  return (
    <div className="bg-surface rounded-xl border border-border p-5 card-hover">
      <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
        Translated as
      </p>
      <p className="text-base font-medium text-text-primary line-through decoration-error/40 mb-1">
        {common}
      </p>
      <p className="text-xs text-text-muted uppercase tracking-widest mb-1 mt-3">
        Actually means
      </p>
      <p className="text-base font-medium text-accent">{actual}</p>
      <p className="text-sm text-text-muted mt-3 font-serif italic">{greek}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, var(--color-accent) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <Droplets className="w-4 h-4" />
            Original Greek. No filters.
          </div>

          <h1 className="mb-6">
            What Was{" "}
            <span className="text-accent italic">Actually</span> Said
          </h1>

          <p className="text-text-secondary text-lg max-w-xl mx-auto mb-4 leading-relaxed">
            2,000 years of translation, interpretation, and institutional
            agenda sit between you and the original words. We strip it all
            away.
          </p>

          <p className="text-text-muted text-base max-w-lg mx-auto mb-10">
            &ldquo;Sin&rdquo; doesn&apos;t mean what you think it means.
            Neither does &ldquo;repent,&rdquo; &ldquo;hell,&rdquo; or
            &ldquo;eternal.&rdquo; Want to know what they actually said?
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/explore"
              className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-light transition-colors inline-flex items-center justify-center gap-2"
            >
              Start Exploring
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/words"
              className="bg-surface border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:border-accent/30 transition-colors inline-flex items-center justify-center gap-2"
            >
              See the Words
              <Languages className="w-4 h-4" />
            </Link>
          </div>

          <a
            href="#word-previews"
            className="mt-16 block text-text-muted hover:text-text-secondary transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-6 h-6 mx-auto" />
          </a>
        </div>
      </section>

      {/* Word previews */}
      <section id="word-previews" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-accent uppercase tracking-widest font-medium mb-2">
              Corrections
            </p>
            <h2>Words You&apos;ve Heard Wrong Your Whole Life</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <WordPreview
              greek="hamartia"
              common="Sin"
              actual="Missing the mark"
            />
            <WordPreview
              greek="metanoia"
              common="Repent"
              actual="Transform your perception"
            />
            <WordPreview
              greek="Gehenna"
              common="Hell"
              actual="The garbage dump outside Jerusalem"
            />
            <WordPreview
              greek="aionios"
              common="Eternal"
              actual="Of the age / Age-long"
            />
            <WordPreview
              greek="aphiemi"
              common="Forgive"
              actual="Release / Let go"
            />
            <WordPreview
              greek="teleios"
              common="Be perfect"
              actual="Become complete"
            />
          </div>

          <div className="text-center mt-8">
            <Link
              href="/words"
              className="text-accent font-medium text-sm hover:text-accent-light transition-colors inline-flex items-center gap-1"
            >
              See all word corrections
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quote section */}
      <section className="py-16 px-4 bg-surface-warm">
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="font-serif text-2xl sm:text-3xl leading-snug text-text-primary mb-6">
            &ldquo;If you bring forth what is within you, what you bring
            forth will save you. If you do not bring forth what is within
            you, what you do not bring forth will destroy you.&rdquo;
          </blockquote>
          <p className="text-text-muted text-sm">
            Gospel of Thomas, Saying 70 -- attributed to Jesus, excluded
            from the Bible
          </p>
        </div>
      </section>

      {/* Knowledge Universe */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-accent uppercase tracking-widest font-medium mb-2">
              The Knowledge Universe
            </p>
            <h2>13 Domains. {concepts.length} Entries. Three Depths.</h2>
            <p className="text-text-secondary text-sm mt-3 max-w-lg mx-auto">
              Scripture, theology, history, languages, practice, and pastoral
              application. Each entry written at three levels -- from accessible
              overview to full academic treatment.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {domains.slice(0, 8).map((domain) => (
              <Link
                key={domain.id}
                href={`/explore/${domain.slug}`}
                className="group bg-surface rounded-lg border border-border p-3 card-hover block"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                  style={{
                    backgroundColor: `${domain.color}15`,
                    color: domain.color,
                  }}
                >
                  <DomainIcon name={domain.icon} />
                </div>
                <p className="text-xs font-semibold group-hover:text-accent transition-colors">
                  {domain.shortName}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/explore"
              className="text-accent font-medium text-sm hover:text-accent-light transition-colors inline-flex items-center gap-1"
            >
              See all 13 domains
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-accent uppercase tracking-widest font-medium mb-2">
              Ways In
            </p>
            <h2>Four Paths to the Source</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              icon={<Layers className="w-5 h-5 text-accent" />}
              title="Explore Domains"
              description="13 knowledge domains spanning scripture, theology, history, languages, and practice. Each concept at three depth levels."
              href="/explore"
            />
            <FeatureCard
              icon={<BookOpen className="w-5 h-5 text-accent" />}
              title="Scripture Cards"
              description="Swipe through teachings with their original Greek meanings. Canonical and Gnostic. No commentary, no spin."
              href="/cards"
            />
            <FeatureCard
              icon={<Languages className="w-5 h-5 text-accent" />}
              title="Word Corrections"
              description="Deep dives into the words that got mistranslated. What they said, what it actually means, and why it matters."
              href="/words"
            />
            <FeatureCard
              icon={<MessageCircle className="w-5 h-5 text-accent" />}
              title="Ask a Question"
              description="Ask anything about scripture and get an answer grounded in what was actually said -- in Greek, with sources."
              href="/ask"
            />
          </div>
        </div>
      </section>

      {/* About / Philosophy */}
      <section className="py-16 px-4 bg-surface-warm">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs text-accent uppercase tracking-widest font-medium mb-2">
              Why This Exists
            </p>
            <h2>The Source, Not the Telephone Game</h2>
          </div>

          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Every translation is an interpretation. Every interpretation
              carries the translator&apos;s assumptions, theology, and
              institutional pressures. By the time a Greek word travels
              through Latin, through Old English, through King James&apos;
              political needs, through modern denominational agendas -- it
              might mean something completely different from what was
              originally written.
            </p>
            <p>
              The Well goes back to the source. Not to prove anyone wrong
              or start arguments. Just to let you see what the original
              words actually said, so you can decide for yourself what they
              mean.
            </p>
            <p className="text-text-primary font-medium">
              No denomination. No agenda. Just the words.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <Droplets className="w-8 h-8 text-accent mx-auto mb-6" />
          <h2 className="mb-4">Come to the Source</h2>
          <p className="text-text-secondary mb-8">
            The water&apos;s been here for two thousand years. Most people
            just drink from the pipes downstream.
          </p>
          <Link
            href="/explore"
            className="bg-accent text-white px-8 py-3.5 rounded-lg font-medium hover:bg-accent-light transition-colors inline-flex items-center gap-2"
          >
            Start Exploring
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <Droplets className="w-4 h-4" />
            The Well
          </div>
          <p className="text-text-muted text-xs">
            Not a church. Not a denomination. Just the original words.
          </p>
        </div>
      </footer>
    </div>
  );
}
