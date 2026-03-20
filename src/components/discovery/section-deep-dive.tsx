"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Droplets } from "lucide-react";
import { itemVariants, staggerContainer } from "./section-transitions";

interface SectionDeepDiveProps {
  readonly conceptName: string;
  readonly domainName: string;
  readonly domainColor: string;
  readonly summary: string;
  readonly conceptSlug: string;
}

export default function SectionDeepDive({
  conceptName,
  domainName,
  domainColor,
  summary,
  conceptSlug,
}: SectionDeepDiveProps) {
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
            <Compass className="w-4 h-4" />
            Deep Dive
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-3">
          <span
            className="text-[10px] font-medium uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block"
            style={{ backgroundColor: `${domainColor}15`, color: domainColor }}
          >
            {domainName}
          </span>
        </motion.div>

        <motion.h2 variants={itemVariants} className="mb-4">
          {conceptName}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-text-secondary leading-relaxed max-w-lg mx-auto mb-4"
        >
          {summary}
        </motion.p>

        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-8">
          {["Accessible", "Intermediate", "Advanced"].map((level) => (
            <span
              key={level}
              className="text-[10px] text-text-muted px-2 py-0.5 rounded-full bg-surface-warm border border-border-light"
            >
              {level}
            </span>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16">
          <Link
            href={`/concepts/${conceptSlug}`}
            className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-light transition-colors inline-flex items-center justify-center gap-2"
          >
            Go Deeper
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Bottom tagline */}
        <motion.div variants={itemVariants} className="pt-8 border-t border-border-light">
          <Droplets className="w-6 h-6 text-accent mx-auto mb-3 opacity-60" />
          <p className="text-text-muted text-sm">
            No denomination. No agenda. Just the original words.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
