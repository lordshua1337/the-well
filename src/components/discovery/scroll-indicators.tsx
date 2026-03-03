"use client";

interface ScrollIndicatorsProps {
  readonly activeIndex: number;
  readonly onDotClick: (index: number) => void;
  readonly sectionCount: number;
}

const SECTION_LABELS = [
  "Welcome",
  "Today's Word",
  "Today's Passage",
  "The Path",
  "Practice",
  "The Human Jesus",
  "Deep Dive",
];

export default function ScrollIndicators({
  activeIndex,
  onDotClick,
  sectionCount,
}: ScrollIndicatorsProps) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
      {Array.from({ length: sectionCount }, (_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Go to ${SECTION_LABELS[i] ?? `section ${i + 1}`}`}
          aria-current={i === activeIndex ? "true" : undefined}
          className="group relative flex items-center justify-center"
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-2.5 h-2.5 bg-accent"
                : "w-1.5 h-1.5 bg-text-muted/30 group-hover:bg-text-muted/60"
            }`}
          />
          <span className="absolute right-6 whitespace-nowrap text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {SECTION_LABELS[i] ?? `Section ${i + 1}`}
          </span>
        </button>
      ))}
    </div>
  );
}
