import React from 'react';
import { Landmark, Globe, Accessibility, Moon, Sun, TriangleAlert, Sparkles } from 'lucide-react';

export default function Header({
  dark,
  setDark,
  lang,
  setLang,
  onOpenAccessibility,
  onOpenEmergency
}) {
  // Support exclusively English, Telugu, and Hindi
  const languages = [
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 sm:px-6 sm:py-4">
          {/* AP Government Emblem & Text */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full gradient-sunrise text-white shadow-elegant">
              <Landmark className="h-5 w-5" />
            </div>
            <div className="hidden min-w-0 sm:block">
              <div className="truncate text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Government of Andhra Pradesh
              </div>
              <div className="truncate text-sm font-semibold">
                {lang === 'te' ? 'ఆంధ్రప్రదేశ్ ప్రభుత్వం' : lang === 'hi' ? 'आन्ध्र प्रदेश सरकार' : 'Govt of Andhra Pradesh'}
              </div>
            </div>
          </div>

          {/* Center Titles */}
          <div className="min-w-0 text-center">
            <div className="font-telugu truncate text-lg font-bold text-primary sm:text-2xl">
              గోదావరి మహా పుష్కరాలు 2027
            </div>
            <div className="truncate font-display text-xs font-semibold sm:text-base">
              Godavari Maha Pushkaralu 2027
            </div>
            <div className="truncate text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:text-xs">
              AI Smart Information Portal
            </div>
          </div>

          {/* Controls: Language, Accessibility, Theme, Emergency */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Language Selector: English, Telugu, Hindi */}
            <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/60 px-2.5 py-1 md:flex">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <select
                aria-label="Select Language (English, Telugu, Hindi)"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-sm font-medium outline-none cursor-pointer"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-card text-foreground">
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Accessibility Button */}
            <button
              onClick={onOpenAccessibility}
              aria-label="Accessibility settings"
              className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/60 text-foreground/80 transition hover:bg-card hover:text-foreground"
            >
              <Accessibility className="h-5 w-5" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
              className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/60 text-foreground/80 transition hover:bg-card hover:text-foreground"
            >
              {dark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Emergency Button */}
            <button
              onClick={onOpenEmergency}
              className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-destructive px-3 py-2 text-xs font-semibold text-destructive-foreground shadow-sm hover:opacity-90 transition sm:text-sm"
            >
              <TriangleAlert className="h-4 w-4 animate-pulse" />
              <span className="hidden sm:inline">Emergency</span>
            </button>

            {/* AP Tourism Sparkles */}
            <div
              className="hidden h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary md:grid"
              aria-label="AP Tourism"
              title="Andhra Pradesh Tourism"
            >
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Leadership Banner: CM Sri N. Chandrababu Naidu & Minister Sri Nara Lokesh */}
      <div className="border-b border-border/60 bg-gradient-to-r from-saffron/10 via-background to-primary/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* CBN */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full gradient-sunrise font-display text-lg font-bold text-white shadow-elegant ring-2 ring-white">
              CBN
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">Sri N. Chandrababu Naidu</div>
              <div className="truncate text-xs text-muted-foreground">Hon'ble Chief Minister, Andhra Pradesh</div>
            </div>
          </div>

          {/* Welcoming quote */}
          <div className="hidden font-display text-sm italic text-muted-foreground md:block text-center">
            "Welcoming devotees from across the world to the sacred Godavari"
          </div>

          {/* Nara Lokesh */}
          <div className="flex min-w-0 items-center gap-3 flex-row-reverse text-right">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full gradient-sunrise font-display text-lg font-bold text-white shadow-elegant ring-2 ring-white">
              NL
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">Sri Nara Lokesh</div>
              <div className="truncate text-xs text-muted-foreground">Hon'ble Minister, Government of Andhra Pradesh</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
