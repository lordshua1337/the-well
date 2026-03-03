"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Droplets } from "lucide-react";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/explore", label: "Explore" },
    { href: "/words", label: "Words" },
    { href: "/cards", label: "Cards" },
    { href: "/passages", label: "Passages" },
    { href: "/ask", label: "Ask" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border-light">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Droplets className="w-6 h-6 text-accent group-hover:text-accent-light transition-colors" />
          <span className="font-serif text-xl font-semibold tracking-tight">
            The Well
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors link-animated"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/ask"
            className="text-sm bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-light transition-colors"
          >
            Ask a Question
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-text-primary"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border-light bg-background/95 backdrop-blur-md">
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base text-text-secondary hover:text-text-primary py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/ask"
              onClick={() => setIsOpen(false)}
              className="text-sm bg-accent text-white px-4 py-2.5 rounded-lg text-center hover:bg-accent-light transition-colors mt-2"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
