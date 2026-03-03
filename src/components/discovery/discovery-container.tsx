"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { wordCorrections } from "@/lib/scripture-data";
import { allDossiers } from "@/lib/passages";
import { concepts } from "@/lib/concepts";
import { domains } from "@/lib/domains";
import { practices } from "@/lib/practices-data";
import { humanJesusChapters } from "@/lib/human-jesus-data";
import { getTodaysLivingWord } from "@/lib/living-words-engine";
import { loadPathProgress, getCompletionPercent } from "@/lib/path-progress";
import { getTotalSteps, pathStages, getStageById } from "@/lib/path-data";
import { getDailyContent } from "@/lib/daily-content";

import ScrollIndicators from "./scroll-indicators";
import SectionHook from "./section-hook";
import SectionDailyWord from "./section-daily-word";
import SectionDailyPassage from "./section-daily-passage";
import SectionPath from "./section-path";
import SectionPractice from "./section-practice";
import SectionJesus from "./section-jesus";
import SectionDeepDive from "./section-deep-dive";

const SECTION_COUNT = 7;

// Deterministic daily selectors using date-based index
function getDayIndex(): number {
  const epoch = new Date(2026, 0, 1).getTime();
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.floor((now.getTime() - epoch) / 86400000);
}

function getDailyPractice() {
  const beginnerPractices = practices.filter((p) => p.difficulty === "beginner");
  const pool = beginnerPractices.length > 0 ? beginnerPractices : practices;
  const idx = ((getDayIndex() % pool.length) + pool.length) % pool.length;
  return pool[idx];
}

function getDailyJesusChapter() {
  const chapters = humanJesusChapters;
  const idx = ((getDayIndex() % chapters.length) + chapters.length) % chapters.length;
  const chapter = chapters[idx];
  // Find first pullQuote in sections
  const sectionWithQuote = chapter.sections.find((s) => s.pullQuote);
  const pullQuote = sectionWithQuote?.pullQuote ?? chapter.subtitle;
  return { chapter, pullQuote };
}

function getDailyConcept() {
  const idx = ((getDayIndex() * 7) % concepts.length + concepts.length) % concepts.length;
  return concepts[idx];
}

export default function DiscoveryContainer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasProgress, setHasProgress] = useState(false);
  const [completionPercent, setCompletionPercent] = useState(0);
  const [currentStageName, setCurrentStageName] = useState("");
  const [currentStageSlug, setCurrentStageSlug] = useState("");
  const [currentStepId, setCurrentStepId] = useState("");
  const [livingWordTitle, setLivingWordTitle] = useState("");
  const [livingWordPrompt, setLivingWordPrompt] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setSectionRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  }, []);

  // Load client-side data
  useEffect(() => {
    const progress = loadPathProgress();
    const totalSteps = getTotalSteps();
    const percent = getCompletionPercent(progress, totalSteps);
    const hasAny = progress.completedSteps.length > 0;

    setHasProgress(hasAny);
    setCompletionPercent(percent);

    if (hasAny) {
      const stage = getStageById(progress.currentStageId);
      if (stage) {
        setCurrentStageName(stage.title);
        setCurrentStageSlug(stage.slug);
      }
      setCurrentStepId(progress.currentStepId);
    }

    const todaysWord = getTodaysLivingWord();
    setLivingWordTitle(todaysWord.title);
    setLivingWordPrompt(todaysWord.prompt.split(". ").slice(0, 2).join(". ") + ".");
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { threshold: 0.5 }
    );

    for (const ref of sectionRefs.current) {
      if (ref) observer.observe(ref);
    }

    return () => observer.disconnect();
  }, []);

  const handleDotClick = useCallback((index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Get daily content
  const dailyContent = getDailyContent();
  const dailyWord = dailyContent.type === "word"
    ? dailyContent.word
    : wordCorrections[0];
  const dailyPassage = dailyContent.type === "passage"
    ? dailyContent.passage
    : allDossiers[0];

  const practice = getDailyPractice();
  const { chapter: jesusChapter, pullQuote } = getDailyJesusChapter();
  const concept = getDailyConcept();
  const conceptDomain = domains.find((d) => d.id === concept.domainId);

  return (
    <div
      ref={containerRef}
      className="h-[100dvh] overflow-y-auto"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <ScrollIndicators
        activeIndex={activeIndex}
        onDotClick={handleDotClick}
        sectionCount={SECTION_COUNT}
      />

      <div ref={setSectionRef(0)} style={{ scrollSnapAlign: "start" }}>
        <SectionHook
          hasProgress={hasProgress}
          livingWordTitle={livingWordTitle}
          livingWordPrompt={livingWordPrompt}
          completionPercent={hasProgress ? completionPercent : undefined}
        />
      </div>

      <div ref={setSectionRef(1)} style={{ scrollSnapAlign: "start" }}>
        <SectionDailyWord
          greek={dailyWord.greek}
          transliteration={dailyWord.transliteration}
          commonTranslation={dailyWord.commonTranslation}
          actualMeaning={dailyWord.actualMeaning.split("--")[0].trim()}
          whyItMatters={dailyWord.whyItMatters}
          wordId={dailyWord.id}
        />
      </div>

      <div ref={setSectionRef(2)} style={{ scrollSnapAlign: "start" }}>
        <SectionDailyPassage
          passage={dailyPassage.passage}
          commonQuote={dailyPassage.commonQuoteForm}
          reframe={dailyPassage.clarifiedReading.reframe}
          passageId={dailyPassage.id}
        />
      </div>

      <div ref={setSectionRef(3)} style={{ scrollSnapAlign: "start" }}>
        <SectionPath
          hasProgress={hasProgress}
          currentStageName={hasProgress ? currentStageName : undefined}
          completionPercent={hasProgress ? completionPercent : undefined}
          currentStageSlug={hasProgress ? currentStageSlug : undefined}
          currentStepId={hasProgress ? currentStepId : undefined}
        />
      </div>

      <div ref={setSectionRef(4)} style={{ scrollSnapAlign: "start" }}>
        <SectionPractice
          title={practice.title}
          tradition={practice.tradition}
          subtitle={practice.subtitle}
          estimatedMinutes={practice.estimatedMinutes}
          slug={practice.slug}
          difficulty={practice.difficulty}
        />
      </div>

      <div ref={setSectionRef(5)} style={{ scrollSnapAlign: "start" }}>
        <SectionJesus
          pullQuote={pullQuote}
          chapterTitle={jesusChapter.title}
          chapterSubtitle={jesusChapter.subtitle}
          chapterSlug={jesusChapter.slug}
        />
      </div>

      <div ref={setSectionRef(6)} style={{ scrollSnapAlign: "start" }}>
        <SectionDeepDive
          conceptName={concept.name}
          domainName={conceptDomain?.shortName ?? ""}
          domainColor={conceptDomain?.color ?? "#2D6A4F"}
          summary={concept.summary}
          conceptSlug={concept.slug}
        />
      </div>
    </div>
  );
}
