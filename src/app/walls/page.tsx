"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Droplets } from "lucide-react";
import { getAllWalls } from "@/lib/seven-walls-data";
import { staggerContainer, itemVariants } from "@/components/discovery/section-transitions";

const walls = getAllWalls();

// Progress tracking via localStorage
function useWallProgress() {
  if (typeof window === "undefined") return { completed: new Set<string>(), allDone: false };
  try {
    const raw = localStorage.getItem("well-walls-progress");
    const completed = raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
    return { completed, allDone: completed.size === 7 };
  } catch {
    return { completed: new Set<string>(), allDone: false };
  }
}

export default function WallsPage() {
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
            Inner Demolition
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl font-serif mb-5 leading-tight"
          >
            The Seven Walls
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6"
          >
            Mary Magdalene had seven demons. Not possessions -- denials.
            Seven walls between her and who she actually was. When the
            walls fell, she became the first person to witness the
            resurrection. Not by accident. The inner demolition came first.
            The seeing came after.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-sm max-w-xl mx-auto leading-relaxed"
          >
            These seven walls are inside you too. Each one is a denial
            of self -- a lie the world taught you that keeps you from
            gnosis, from direct knowing, from becoming what Jesus
            demonstrated a human could become.
          </motion.p>
        </motion.div>

        {/* Seven Walls -- circular visual journey */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {walls.map((wall) => (
            <motion.div key={wall.id} variants={itemVariants}>
              <Link
                href={`/walls/${wall.slug}`}
                className="block group rounded-2xl border border-border hover:border-accent/40 bg-surface hover:bg-surface-warm transition-all duration-300 overflow-hidden"
              >
                {/* Top accent */}
                <div
                  className="h-1 w-full bg-gradient-to-r from-accent/60 to-accent/20 group-hover:from-accent group-hover:to-accent/40 transition-all"
                />

                <div className="p-6">
                  {/* Wall number */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl font-serif text-accent/20 group-hover:text-accent/40 transition-colors leading-none">
                      {wall.number}
                    </span>
                  </div>

                  {/* Name + denial */}
                  <h2 className="text-xl font-serif text-text-primary mb-1 group-hover:text-accent transition-colors">
                    {wall.name}
                  </h2>
                  <p className="text-xs text-accent/70 uppercase tracking-wider font-medium mb-3">
                    {wall.denial}
                  </p>

                  {/* Core question */}
                  <p className="text-sm text-text-secondary leading-relaxed italic mb-4">
                    &ldquo;{wall.coreQuestion}&rdquo;
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-1.5 text-xs text-accent font-medium group-hover:gap-2.5 transition-all">
                    Face this wall
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* The "Risen" card -- the 8th position */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl border border-accent/20 bg-accent/5 flex flex-col items-center justify-center p-6 text-center min-h-[220px]">
              <Droplets className="w-8 h-8 text-accent/40 mb-3" />
              <p className="text-sm font-serif text-accent/80 mb-1">
                Gnosis
              </p>
              <p className="text-xs text-text-muted max-w-[180px]">
                When all seven walls fall, you see what Mary saw first.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer context */}
        <div className="text-center border-t border-border-light pt-10">
          <p className="text-sm text-text-muted max-w-xl mx-auto leading-relaxed mb-6">
            The Jericho Walk is not intellectual. It is embodied. Read each wall
            slowly. Let the questions land. Speak the declarations aloud.
            The walls do not fall because you understand them. They fall because
            you face them.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/path"
              className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent-light transition-colors"
            >
              Walk The Path
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link
              href="/the-deep"
              className="inline-flex items-center gap-2 text-text-secondary text-sm font-medium hover:text-text-primary transition-colors"
            >
              Enter The Deep
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
