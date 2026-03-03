"use client";

import { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";

interface ScholarsNoteProps {
  content: string;
}

export function ScholarsNote({ content }: ScholarsNoteProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden my-6">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-surface-warm hover:bg-surface transition-colors text-left"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 text-sm font-medium text-text-secondary">
          <BookOpen className="w-4 h-4 text-gold shrink-0" />
          Scholarly Note
        </span>
        <ChevronDown
          className={`w-4 h-4 text-text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-4 py-4 bg-surface border-t border-border">
          <p className="text-sm text-text-secondary leading-relaxed font-serif">
            {content}
          </p>
        </div>
      )}
    </div>
  );
}
