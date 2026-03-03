"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Languages } from "lucide-react";
import { sectionVariants, itemVariants, staggerContainer } from "./section-transitions";

interface SectionDailyWordProps {
  readonly greek: string;
  readonly transliteration: string;
  readonly commonTranslation: string;
  readonly actualMeaning: string;
  readonly whyItMatters: string;
  readonly wordId: string;
}

export default function SectionDailyWord({
  greek,
  transliteration,
  commonTranslation,
  actualMeaning,
  whyItMatters,
  wordId,
}: SectionDailyWordProps) {
  return (
    <section
      id="daily-word"
      className="min-h-[100dvh] flex items-center justify-center px-4 bg-surface-warm"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 text-xs text-accent uppercase tracking-widest font-medium">
            <Languages className="w-4 h-4" />
            Today&apos;s Word
          </span>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="font-serif text-5xl sm:text-6xl text-accent italic mb-2"
        >
          {greek}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="font-mono text-sm text-text-muted mb-10"
        >
          {transliteration}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6 sm:gap-10 mb-8"
        >
          <div className="text-right">
            <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">
              Translated as
            </p>
            <p className="text-xl font-medium text-text-primary line-through decoration-error/40">
              {commonTranslation}
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-text-muted shrink-0" />
          <div className="text-left">
            <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">
              Actually means
            </p>
            <p className="text-xl font-medium text-accent">
              {actualMeaning}
            </p>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-text-secondary leading-relaxed max-w-lg mx-auto mb-8"
        >
          {whyItMatters}
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            href={`/words#${wordId}`}
            className="text-accent font-medium hover:text-accent-light transition-colors inline-flex items-center gap-1"
          >
            See all word corrections
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
