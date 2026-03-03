"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { sectionVariants, itemVariants, staggerContainer } from "./section-transitions";

interface SectionDailyPassageProps {
  readonly passage: string;
  readonly commonQuote: string;
  readonly reframe: string;
  readonly passageId: string;
}

export default function SectionDailyPassage({
  passage,
  commonQuote,
  reframe,
  passageId,
}: SectionDailyPassageProps) {
  return (
    <section className="min-h-[100dvh] flex items-center justify-center px-4">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 text-xs text-accent uppercase tracking-widest font-medium">
            <BookOpen className="w-4 h-4" />
            Today&apos;s Passage
          </span>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="font-serif text-2xl sm:text-3xl font-semibold mb-8"
        >
          {passage}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="bg-error/5 border border-error/10 rounded-xl p-5 mb-4 text-left"
        >
          <p className="text-[10px] text-error uppercase tracking-widest font-medium mb-2">
            This verse was used to...
          </p>
          <p className="text-text-secondary italic leading-relaxed">
            &ldquo;{commonQuote}&rdquo;
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-accent/5 border border-accent/10 rounded-xl p-5 mb-8 text-left"
        >
          <p className="text-[10px] text-accent uppercase tracking-widest font-medium mb-2">
            The actual reading
          </p>
          <p className="text-text-primary leading-relaxed">
            {reframe}
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link
            href={`/passages/${passageId}`}
            className="text-accent font-medium hover:text-accent-light transition-colors inline-flex items-center gap-1"
          >
            Read the full dossier
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
