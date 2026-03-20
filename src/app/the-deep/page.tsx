"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Clock, BookOpen, Layers } from "lucide-react";
import { getAllCurrents } from "@/lib/the-deep-data";
import { staggerContainer, itemVariants } from "@/components/discovery/section-transitions";

const currents = getAllCurrents();

const DEEP_GATE_KEY = "well-deep-entered";

function GatePage({ onEnter }: { readonly onEnter: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-xl mx-auto text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl font-serif mb-8"
        >
          The Deep
        </motion.h1>

        <motion.div variants={itemVariants} className="space-y-5 mb-10">
          <p className="text-text-secondary leading-relaxed">
            Below the surface of the Well lies something older. Heavier. True.
          </p>
          <p className="text-text-secondary leading-relaxed">
            What you learn here is meant to set you free. But once you see it,
            you cannot unsee it. Once you drink from these waters, the world you
            knew will never look the same.
          </p>
          <p className="text-text-secondary leading-relaxed">
            This is not comfortable. It is not gentle. It is the truth beneath
            the truth.
          </p>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg font-serif text-text-primary mb-8"
        >
          Are you ready to go deeper?
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={onEnter}
            className="bg-accent text-white px-8 py-3 rounded-lg font-medium hover:bg-accent-light transition-colors"
          >
            Enter The Deep
          </button>
          <Link
            href="/"
            className="bg-surface border border-border text-text-primary px-8 py-3 rounded-lg font-medium hover:border-accent/30 transition-colors inline-flex items-center justify-center"
          >
            Not yet -- return to the Well
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

function DeepContent() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.p
            variants={itemVariants}
            className="text-xs text-accent uppercase tracking-widest font-semibold mb-3"
          >
            The Truth Beneath the Truth
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl font-serif mb-5 leading-tight"
          >
            The Deep
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Four invisible currents run beneath the surface of the world you
            see. They control your mind, your body, your sustenance, and your
            life. They are not new. They are as old as empire. And the teachings
            of Jesus were, in part, a manual for swimming against them.
          </motion.p>
        </motion.div>

        {/* The Four Currents */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4 mb-16"
        >
          {currents.map((current) => (
            <motion.div key={current.id} variants={itemVariants}>
              <Link
                href={`/the-deep/${current.slug}`}
                className="block group rounded-2xl border border-border hover:border-accent/40 bg-surface hover:bg-surface-warm transition-all duration-300 overflow-hidden"
              >
                <div className="h-0.5 w-full bg-gradient-to-r from-accent/40 to-transparent group-hover:from-accent group-hover:to-accent/20 transition-all" />
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif text-text-primary group-hover:text-accent transition-colors mb-1">
                        {current.name}
                      </h2>
                      <p className="text-xs text-text-muted uppercase tracking-wider">
                        {current.whatItControls}
                      </p>
                    </div>
                    <span className="text-3xl font-serif text-accent/15 leading-none">
                      {current.number}
                    </span>
                  </div>

                  <blockquote className="text-sm text-accent/80 italic mb-4 border-l-2 border-accent/30 pl-4">
                    &ldquo;{current.christCounter.text}&rdquo;
                    <span className="text-xs text-text-muted not-italic ml-2">
                      -- {current.christCounter.reference}
                    </span>
                  </blockquote>

                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-4">
                    {current.architecture}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-xs text-accent font-medium group-hover:gap-2.5 transition-all">
                    Explore this current
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Sub-sections: Stolen Legacy, Timeline, Hidden Texts */}
        <div className="mb-16">
          <h2 className="text-xs text-accent uppercase tracking-widest font-semibold mb-6 text-center">
            Also in The Deep
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/the-deep/stolen-legacy"
              className="group rounded-xl border border-border hover:border-accent/40 bg-surface p-5 transition-all"
            >
              <Layers className="w-5 h-5 text-accent/50 mb-3" />
              <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors mb-1">
                The Stolen Legacy
              </h3>
              <p className="text-xs text-text-muted">
                What institutional Christianity suppressed -- and what can be
                recovered.
              </p>
            </Link>

            <Link
              href="/the-deep/timeline"
              className="group rounded-xl border border-border hover:border-accent/40 bg-surface p-5 transition-all"
            >
              <Clock className="w-5 h-5 text-accent/50 mb-3" />
              <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors mb-1">
                The Timeline
              </h3>
              <p className="text-xs text-text-muted">
                2,000 years of how the words were changed -- era by era.
              </p>
            </Link>

            <Link
              href="/the-deep/hidden-texts"
              className="group rounded-xl border border-border hover:border-accent/40 bg-surface p-5 transition-all"
            >
              <BookOpen className="w-5 h-5 text-accent/50 mb-3" />
              <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors mb-1">
                The Hidden Texts
              </h3>
              <p className="text-xs text-text-muted">
                Gospel of Mary, Gospel of Thomas, Nag Hammadi -- what was
                suppressed and why.
              </p>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t border-border-light pt-10">
          <p className="text-sm text-text-muted max-w-xl mx-auto leading-relaxed mb-6">
            The Deep is not about conspiracy. It is about seeing clearly. These
            systems are documented, historical, and ongoing. The first step to
            freedom is awareness. The second is the refusal to participate
            unconsciously.
          </p>
          <Link
            href="/walls"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent-light transition-colors"
          >
            Do the inner work first -- The Seven Walls
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function TheDeepPage() {
  const [hasEntered, setHasEntered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const entered = localStorage.getItem(DEEP_GATE_KEY) === "true";
      setHasEntered(entered);
    } catch {
      // Default to gate
    }
    setLoaded(true);
  }, []);

  const handleEnter = () => {
    try {
      localStorage.setItem(DEEP_GATE_KEY, "true");
    } catch {
      // Continue even if localStorage fails
    }
    setHasEntered(true);
  };

  if (!loaded) {
    return <div className="min-h-screen" />;
  }

  if (!hasEntered) {
    return <GatePage onEnter={handleEnter} />;
  }

  return <DeepContent />;
}
