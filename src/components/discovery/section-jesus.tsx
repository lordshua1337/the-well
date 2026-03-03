"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Quote, User } from "lucide-react";
import { itemVariants, staggerContainer } from "./section-transitions";

interface SectionJesusProps {
  readonly pullQuote: string;
  readonly chapterTitle: string;
  readonly chapterSubtitle: string;
  readonly chapterSlug: string;
}

export default function SectionJesus({
  pullQuote,
  chapterTitle,
  chapterSubtitle,
  chapterSlug,
}: SectionJesusProps) {
  return (
    <section className="min-h-[100dvh] flex items-center justify-center px-4 bg-surface-warm">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 text-xs text-accent uppercase tracking-widest font-medium">
            <User className="w-4 h-4" />
            The Human Jesus
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <Quote className="w-5 h-5 text-accent mx-auto mb-4 opacity-60" />
          <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed text-text-primary italic max-w-lg mx-auto">
            &ldquo;{pullQuote}&rdquo;
          </blockquote>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-surface rounded-xl border border-border p-5 max-w-md mx-auto mb-8 text-left"
        >
          <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
            Chapter
          </p>
          <p className="font-serif font-semibold text-lg mb-1">{chapterTitle}</p>
          <p className="text-sm text-text-secondary">{chapterSubtitle}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/jesus/${chapterSlug}`}
            className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-light transition-colors inline-flex items-center justify-center gap-2"
          >
            Read This Chapter
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/jesus"
            className="text-accent font-medium hover:text-accent-light transition-colors inline-flex items-center justify-center gap-1"
          >
            Explore all 8 chapters
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
