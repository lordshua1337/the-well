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
  MessageCircle,
  MoreHorizontal,
  BookOpen,
  ScrollText,
  Search,
  Bookmark,
  PenTool,
  GraduationCap,
  Layers,
  Anchor,
  Waves,
} from "lucide-react";

// Desktop primary nav
const primaryLinks = [
  { href: "/path", label: "The Path" },
  { href: "/walls", label: "The Walls" },
  { href: "/living-words", label: "Living Words" },
  { href: "/practices", label: "Practices" },
  { href: "/the-deep", label: "The Deep", accent: true },
];

// Secondary nav (hamburger menu)
const secondaryLinks = [
  { href: "/cards", label: "Word Cards", icon: Layers },
  { href: "/words", label: "All 43 Words", icon: ScrollText },
  { href: "/passages", label: "Passages", icon: BookOpen },
  { href: "/plans", label: "Study Plans", icon: GraduationCap },
  { href: "/journal", label: "Journal", icon: PenTool },
  { href: "/explore", label: "Explore", icon: Search },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/search", label: "Search", icon: Search },
];

// Mobile bottom tabs
const mobileTabLinks = [
  { href: "/path", label: "Path", icon: Route },
  { href: "/living-words", label: "Words", icon: Sun },
  { href: "/practices", label: "Practices", icon: Sparkles },
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
                    : "accent" in link && link.accent
                      ? "text-text-muted hover:text-accent/80"
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
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
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

        {/* Slide-down menu (secondary links) */}
        {isOpen && (
          <div className="border-t border-border-light bg-background/95 backdrop-blur-md">
            <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-1">
              {/* On mobile, show primary links too */}
              <div className="md:hidden mb-2">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2.5 text-base ${
                      pathname.startsWith(link.href)
                        ? "text-accent font-medium"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="h-px bg-border-light my-2" />
              </div>
              {secondaryLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 py-2.5 text-sm ${
                      pathname.startsWith(link.href)
                        ? "text-accent font-medium"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
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
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors ${
              isOpen
                ? "text-accent"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </div>
    </>
  );
}
