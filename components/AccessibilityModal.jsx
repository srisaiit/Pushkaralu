import React from 'react';
import { X, Accessibility, ZoomIn, ZoomOut, Contrast, Volume2 } from 'lucide-react';

export default function AccessibilityModal({
  isOpen,
  onClose,
  fontSizeMultiplier,
  setFontSizeMultiplier,
  highContrast,
  setHighContrast
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-fade-in text-foreground">
      <div className="relative w-full max-w-md rounded-3xl bg-card border border-border p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="grid h-11 w-11 place-items-center rounded-2xl gradient-sunrise text-white">
            <Accessibility className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold">Accessibility Options</h3>
            <p className="text-xs text-muted-foreground">Pilgrim comfort and readability controls</p>
          </div>
        </div>

        <div className="space-y-4 my-6 text-sm">
          {/* Text Size Scaling */}
          <div className="bg-secondary/40 p-3.5 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-xs text-muted-foreground">Text Size Scaling</span>
              <span className="font-mono text-xs font-bold text-primary">
                {Math.round(fontSizeMultiplier * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSizeMultiplier(Math.max(0.85, fontSizeMultiplier - 0.1))}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-card border border-border text-xs font-semibold hover:bg-secondary transition"
              >
                <ZoomOut className="h-3.5 w-3.5" /> Smaller
              </button>
              <button
                onClick={() => setFontSizeMultiplier(1.0)}
                className="px-3 py-2 rounded-xl bg-card border border-border text-xs font-semibold hover:bg-secondary transition"
              >
                Default
              </button>
              <button
                onClick={() => setFontSizeMultiplier(Math.min(1.4, fontSizeMultiplier + 0.1))}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-card border border-border text-xs font-semibold hover:bg-secondary transition"
              >
                <ZoomIn className="h-3.5 w-3.5" /> Larger
              </button>
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="bg-secondary/40 p-3.5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Contrast className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold text-xs">High Contrast Mode</div>
                <div className="text-[11px] text-muted-foreground">Enhanced outline visibility for sunlight</div>
              </div>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                highContrast ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-foreground'
              }`}
            >
              {highContrast ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Voice Prompt Guidance */}
          <div className="bg-secondary/40 p-3.5 rounded-2xl flex items-center gap-2.5 text-xs text-muted-foreground">
            <Volume2 className="h-5 w-5 text-saffron shrink-0" />
            <span>
              Tip: Click the central microphone anytime to receive spoken answers in Telugu, English or Hindi without needing to read the screen.
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-full gradient-sunrise py-2.5 text-sm font-semibold text-white shadow-glow"
        >
          Apply & Close
        </button>
      </div>
    </div>
  );
}
