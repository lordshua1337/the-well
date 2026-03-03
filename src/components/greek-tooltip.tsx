"use client";

import { useState } from "react";
import type { GreekTerm } from "@/lib/human-jesus-data";

interface GreekTooltipProps {
  term: GreekTerm;
}

export function GreekTooltip({ term }: GreekTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        className="italic text-accent font-medium underline decoration-dotted underline-offset-2 cursor-help"
        aria-label={`Greek term: ${term.transliteration} -- ${term.meaning}`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        onClick={() => setIsVisible((v) => !v)}
      >
        {term.transliteration}
      </button>

      {isVisible && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 pointer-events-none"
        >
          <span className="block bg-accent-dark text-white text-sm rounded-lg px-3 py-2.5 shadow-lg">
            <span className="block font-serif italic text-gold-light text-base mb-1">
              {term.greek}
            </span>
            <span className="block font-medium text-white/90 text-xs mb-1">
              {term.transliteration}
            </span>
            <span className="block text-white/75 text-xs leading-relaxed">
              {term.meaning}
            </span>
          </span>
          {/* Tooltip arrow */}
          <span
            className="block w-0 h-0 mx-auto"
            style={{
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid var(--color-accent-dark)",
            }}
          />
        </span>
      )}
    </span>
  );
}
