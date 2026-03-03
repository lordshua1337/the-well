"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Route } from "lucide-react";
import { itemVariants, staggerContainer } from "./section-transitions";

interface SectionPathProps {
  readonly hasProgress: boolean;
  readonly currentStageName?: string;
  readonly completionPercent?: number;
  readonly currentStageSlug?: string;
  readonly currentStepId?: string;
}

export default function SectionPath({
  hasProgress,
  currentStageName,
  completionPercent,
  currentStageSlug,
  currentStepId,
}: SectionPathProps) {
  return (
    <section className="min-h-[100dvh] flex items-center justify-center px-4 bg-surface-warm">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 text-xs text-accent uppercase tracking-widest font-medium">
            <Route className="w-4 h-4" />
            The Path
          </span>
        </motion.div>

        {hasProgress ? (
          <>
            <motion.h2 variants={itemVariants} className="mb-3">
              Continue Your Journey
            </motion.h2>

            <motion.p variants={itemVariants} className="text-text-secondary mb-6">
              You&apos;re currently on{" "}
              <span className="text-accent font-medium">{currentStageName}</span>
            </motion.p>

            <motion.div variants={itemVariants} className="max-w-sm mx-auto mb-8">
              <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
                <span>Overall progress</span>
                <span className="font-mono text-accent">{completionPercent}%</span>
              </div>
              <div className="h-2 bg-border-light rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href={
                  currentStageSlug && currentStepId
                    ? `/path/${currentStageSlug}/${currentStepId}`
                    : "/path"
                }
                className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-light transition-colors inline-flex items-center justify-center gap-2"
              >
                Continue The Path
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </>
        ) : (
          <>
            <motion.h2 variants={itemVariants} className="mb-4">
              Seven Stages to the Source
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary leading-relaxed max-w-lg mx-auto mb-8"
            >
              A guided journey from translation bias to daily practice.
              Start where you are. Go at your own pace. Each stage builds
              on the last.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-7 gap-2 max-w-sm mx-auto mb-8"
            >
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href="/path"
                className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-light transition-colors inline-flex items-center justify-center gap-2"
              >
                Begin The Path
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>
    </section>
  );
}
