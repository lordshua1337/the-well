"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock } from "lucide-react";
import { itemVariants, staggerContainer } from "./section-transitions";

interface SectionPracticeProps {
  readonly title: string;
  readonly tradition: string;
  readonly subtitle: string;
  readonly estimatedMinutes: number;
  readonly slug: string;
  readonly difficulty: string;
}

export default function SectionPractice({
  title,
  tradition,
  subtitle,
  estimatedMinutes,
  slug,
  difficulty,
}: SectionPracticeProps) {
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
            <Sparkles className="w-4 h-4" />
            Try a Practice
          </span>
        </motion.div>

        <motion.h2 variants={itemVariants} className="mb-2">
          {title}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-sm text-text-muted mb-4"
        >
          {tradition} tradition
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-text-secondary leading-relaxed max-w-lg mx-auto mb-6"
        >
          {subtitle}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="inline-flex items-center gap-1 text-xs text-text-muted">
            <Clock className="w-3.5 h-3.5" />
            {estimatedMinutes} min
          </span>
          <span className="text-xs text-text-muted capitalize">
            {difficulty}
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/practices/${slug}`}
            className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-light transition-colors inline-flex items-center justify-center gap-2"
          >
            Try This Practice
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/practices"
            className="text-accent font-medium hover:text-accent-light transition-colors inline-flex items-center justify-center gap-1"
          >
            See all 12 practices
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
