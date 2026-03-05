"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Droplets,
  Route,
  Sparkles,
  Sun,
  Compass,
  MessageCircle,
} from "lucide-react";

// Desktop nav: primary links visible, secondary in hamburger
const primaryLinks = [
  { href: "/path", label: "The Path" },
  { href: "/practices", label: "Practices" },
  { href: "/jesus", label: "The Human Jesus" },
  { href: "/living-words", label: "Living Words" },
  { href: "/explore", label: "Explore" },
];

const secondaryLinks = [
  { href: "/plans", label: "Study Plans" },
  { href: "/journal", label: "Journal" },
  { href: "/words", label: "Words" },
  { href: "/cards", label: "Cards" },
  { href: "/passages", label: "Passages" },
  { href: "/reclaimed", label: "Reclaimed" },
  { href: "/saved", label: "Saved" },
  { href: "/search", label: "Search" },
];

// Mobile bottom tabs: the 5 most important routes
const mobileTabLinks = [
  { href: "/path", label: "Path", icon: Route },
  { href: "/practices", label: "Practices", icon: Sparkles },
  { href: "/living-words", label: "Words", icon: Sun },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/ask", label: "Ask", icon: MessageCircle },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top nav bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border-light">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Droplets className="w-6 h-6 text-accent group-hover:text-accent-light transition-colors" />
            <span className="font-serif text-xl font-semibold tracking-tight">
              The Well
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors link-animated ${
                  pathname.startsWith(link.href)
                    ? "text-accent font-medium"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/ask"
              className="text-sm bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-light transition-colors"
            >
              Ask
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile slide-down menu (full link list) */}
        {isOpen && (
          <div className="md:hidden border-t border-border-light bg-background/95 backdrop-blur-md">
            <div className="px-4 py-4 flex flex-col gap-3">
              {[...primaryLinks, ...secondaryLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base py-2 ${
                    pathname.startsWith(link.href)
                      ? "text-accent font-medium"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
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

      {/* Mobile bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border-light">
        <div className="flex items-center justify-around h-14 px-2">
          {mobileTabLinks.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
