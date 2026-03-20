"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Droplets } from "lucide-react";
import { sectionVariants, itemVariants, staggerContainer } from "./section-transitions";

interface SectionHookProps {
  readonly hasProgress: boolean;
  readonly livingWordTitle?: string;
  readonly livingWordPrompt?: string;
  readonly completionPercent?: number;
}

export default function SectionHook({
  hasProgress,
  livingWordTitle,
  livingWordPrompt,
  completionPercent,
}: SectionHookProps) {
  return (
    <section className="min-h-[100dvh] flex flex-col items-center justify-center px-4 relative">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-2xl mx-auto text-center"
      >
        {hasProgress && livingWordTitle ? (
          <>
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium">
                <Droplets className="w-4 h-4" />
                Welcome back
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="mb-4">
              {livingWordTitle}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-lg leading-relaxed mb-6 max-w-xl mx-auto"
            >
              {livingWordPrompt}
            </motion.p>

            {typeof completionPercent === "number" && (
              <motion.div variants={itemVariants} className="mb-8 max-w-xs mx-auto">
                <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
                  <span>Your Path progress</span>
                  <span className="font-mono text-accent">{completionPercent}%</span>
                </div>
                <div className="h-1.5 bg-border-light rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/living-words"
                className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-light transition-colors inline-flex items-center justify-center gap-2"
              >
                Today&apos;s Living Word
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/path"
                className="bg-surface border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:border-accent/30 transition-colors inline-flex items-center justify-center gap-2"
              >
                Continue The Path
              </Link>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium">
                <Droplets className="w-4 h-4" />
                The Well
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="mb-6">
              Restore your soul{" "}
              <span className="text-accent italic">with living water.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Get to know who Jesus really was, what he offered, and how
              you can become like him.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/cards"
                className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-light transition-colors inline-flex items-center justify-center gap-2"
              >
                See What They Changed
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ask"
                className="bg-surface border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:border-accent/30 transition-colors inline-flex items-center justify-center gap-2"
              >
                Ask About Any Verse
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>

      <a
        href="#daily-word"
        className="absolute bottom-8 text-text-muted hover:text-text-secondary transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}
