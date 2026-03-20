import { Droplets } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer-elevated py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <Droplets className="w-4 h-4" />
          The Well
        </div>
        <p className="text-text-muted text-xs">
          No gates. No gatekeepers. Just living water.
        </p>
      </div>
    </footer>
  );
}
