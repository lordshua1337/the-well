"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Check } from "lucide-react";
import { getWallBySlug, getAllWalls } from "@/lib/seven-walls-data";
import { staggerContainer, itemVariants } from "@/components/discovery/section-transitions";

function WallSection({
  label,
  children,
  defaultOpen = false,
}: {
  readonly label: string;
  readonly children: React.ReactNode;
  readonly defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-border-light pt-6">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between w-full text-left group mb-4"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-accent group-hover:text-accent-light transition-colors">
          {label}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-text-muted" />
        ) : (
          <ChevronDown className="w-4 h-4 text-text-muted" />
        )}
      </button>
      {open && <div className="animate-fade-in">{children}</div>}
    </div>
  );
}

function markWallComplete(slug: string) {
  try {
    const raw = localStorage.getItem("well-walls-progress");
    const completed: string[] = raw ? JSON.parse(raw) : [];
    if (!completed.includes(slug)) {
      localStorage.setItem(
        "well-walls-progress",
        JSON.stringify([...completed, slug])
      );
    }
  } catch {
    // Silently fail in SSR or if localStorage is unavailable
  }
}

function isWallComplete(slug: string): boolean {
  try {
    const raw = localStorage.getItem("well-walls-progress");
    const completed: string[] = raw ? JSON.parse(raw) : [];
    return completed.includes(slug);
  } catch {
    return false;
  }
}

export default function WallDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const wall = getWallBySlug(slug);
  const allWalls = getAllWalls();

  const [declared, setDeclared] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (slug) {
      setCompleted(isWallComplete(slug));
    }
  }, [slug]);

  const handleDeclare = useCallback(() => {
    setDeclared(true);
    if (slug) {
      markWallComplete(slug);
      setCompleted(true);
    }
  }, [slug]);

  if (!wall) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 text-center">
        <p className="text-text-muted">Wall not found.</p>
        <Link href="/walls" className="text-accent text-sm mt-4 inline-block">
          Return to The Walls
        </Link>
      </div>
    );
  }

  const prevWall = allWalls.find((w) => w.number === wall.number - 1);
  const nextWall = allWalls.find((w) => w.number === wall.number + 1);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/walls"
          className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          The Seven Walls
        </Link>

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={itemVariants} className="flex items-start gap-4 mb-4">
            <span className="text-5xl font-serif text-accent/20 leading-none">
              {wall.number}
            </span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif mb-1">{wall.name}</h1>
              <p className="text-sm text-accent/70 uppercase tracking-wider font-medium">
                {wall.denial}
              </p>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl font-serif italic text-text-secondary leading-relaxed"
          >
            &ldquo;{wall.coreQuestion}&rdquo;
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-xs text-text-muted mt-3"
          >
            {wall.christFrame}
          </motion.p>
        </motion.div>

        {/* The Lie */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
            The Lie This Wall Whispers
          </h2>
          <div className="bg-surface-warm rounded-xl border border-border-light p-6">
            <p className="text-sm text-text-secondary leading-relaxed italic">
              {wall.theLie}
            </p>
          </div>
        </div>

        {/* The Two Faces */}
        <WallSection label="The Two Faces" defaultOpen>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface rounded-xl border border-border-light p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-2">
                {wall.twoFaces.face1.name}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {wall.twoFaces.face1.description}
              </p>
            </div>
            <div className="bg-surface rounded-xl border border-border-light p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-2">
                {wall.twoFaces.face2.name}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {wall.twoFaces.face2.description}
              </p>
            </div>
          </div>
        </WallSection>

        {/* The Currency */}
        <WallSection label="The Currency -- How The World Weaponizes This">
          <p className="text-sm text-text-secondary leading-relaxed">
            {wall.theCurrency}
          </p>
        </WallSection>

        {/* The Story */}
        <WallSection label="The Story">
          <div className="bg-surface rounded-xl border border-border-light p-6">
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-base font-serif font-semibold text-text-primary">
                {wall.theStory.title}
              </h3>
              <span className="text-xs font-mono text-accent">
                {wall.theStory.scripture}
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {wall.theStory.narrative}
            </p>
          </div>
        </WallSection>

        {/* The Walk */}
        <WallSection label="The Jericho Walk">
          <p className="text-sm text-text-secondary leading-relaxed">
            {wall.theWalk}
          </p>
        </WallSection>

        {/* Gnosis -- what becomes possible */}
        <WallSection label="What Becomes Possible">
          <div className="bg-accent/5 rounded-xl border border-accent/20 p-6">
            <p className="text-sm text-text-secondary leading-relaxed">
              {wall.gnosis}
            </p>
          </div>
        </WallSection>

        {/* The Declaration */}
        <div className="mt-10 mb-10">
          <div className="bg-background rounded-2xl border border-accent/20 p-8 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-accent mb-6">
              The Declaration
            </h2>

            <div className="space-y-4 mb-8">
              {wall.declarations.map((d, i) => (
                <p
                  key={i}
                  className="text-lg font-serif text-text-primary leading-relaxed"
                >
                  {d.text}
                </p>
              ))}
            </div>

            {!declared ? (
              <button
                onClick={handleDeclare}
                className="bg-accent text-white px-8 py-3 rounded-lg font-medium hover:bg-accent-light transition-colors"
              >
                I Declare This Wall Has Fallen
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 text-accent font-medium"
              >
                <Check className="w-5 h-5" />
                This wall has fallen.
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation between walls */}
        <div className="flex items-center justify-between border-t border-border-light pt-6">
          {prevWall ? (
            <Link
              href={`/walls/${prevWall.slug}`}
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {prevWall.name}
            </Link>
          ) : (
            <div />
          )}

          {nextWall ? (
            <Link
              href={`/walls/${nextWall.slug}`}
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              {nextWall.name}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/walls"
              className="inline-flex items-center gap-1.5 text-sm text-accent font-medium"
            >
              All walls walked
              <Check className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
