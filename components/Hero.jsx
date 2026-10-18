import React from 'react';
import { Mic, MapPin, Navigation, Calendar, TriangleAlert } from 'lucide-react';

export default function Hero({
  onTalkToAI,
  onFindGhat,
  onNavigate,
  onViewEvents,
  onEmergency
}) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Hero background image */}
      <img
        src="/assets/hero-godavari-_kRxrQ2z.jpg"
        alt="Godavari river at sunrise with temples, ghats and floating diyas"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Soft gradient backdrops */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,var(--background)_80%)]"></div>

      {/* Floating Diyas */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="animate-float-diya absolute h-3 w-3 rounded-full bg-saffron shadow-[0_0_20px_theme(colors.orange.400)]"
          style={{ left: '10%', top: '60%', animationDelay: '0s' }}
        ></div>
        <div
          className="animate-float-diya absolute h-3 w-3 rounded-full bg-saffron shadow-[0_0_20px_theme(colors.orange.400)]"
          style={{ left: '24%', top: '68%', animationDelay: '0.7s' }}
        ></div>
        <div
          className="animate-float-diya absolute h-3 w-3 rounded-full bg-saffron shadow-[0_0_20px_theme(colors.orange.400)]"
          style={{ left: '38%', top: '76%', animationDelay: '1.4s' }}
        ></div>
        <div
          className="animate-float-diya absolute h-3 w-3 rounded-full bg-saffron shadow-[0_0_20px_theme(colors.orange.400)]"
          style={{ left: '52%', top: '60%', animationDelay: '2.1s' }}
        ></div>
        <div
          className="animate-float-diya absolute h-3 w-3 rounded-full bg-saffron shadow-[0_0_20px_theme(colors.orange.400)]"
          style={{ left: '66%', top: '68%', animationDelay: '2.8s' }}
        ></div>
        <div
          className="animate-float-diya absolute h-3 w-3 rounded-full bg-saffron shadow-[0_0_20px_theme(colors.orange.400)]"
          style={{ left: '80%', top: '76%', animationDelay: '3.5s' }}
        ></div>
      </div>

      {/* Hero content */}
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
            <span className="h-2 w-2 animate-pulse rounded-full bg-saffron"></span>
            Live · July 2027 · Rajahmundry
          </div>

          <h1 className="font-telugu text-4xl font-bold leading-tight text-foreground drop-shadow-sm sm:text-6xl">
            గోదావరి <span className="text-gradient-sunrise">మహా పుష్కరాలు</span>
          </h1>

          <h2 className="mt-2 font-display text-2xl font-semibold sm:text-4xl">
            The Sacred Godavari welcomes you.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            An AI-powered smart companion for pilgrims — talk in your language, find the nearest ghat, navigate temples, and stay updated with real-time crowd, weather and emergency information.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onTalkToAI}
              className="group inline-flex items-center gap-2 rounded-full gradient-sunrise px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
            >
              <Mic className="h-5 w-5" />
              🎤 Talk to AI
            </button>

            <button
              onClick={onFindGhat}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-5 py-3 text-sm font-semibold backdrop-blur-lg transition hover:bg-card text-foreground"
            >
              <MapPin className="h-4 w-4" />
              Find Nearest Ghat
            </button>

            <button
              onClick={onNavigate}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-5 py-3 text-sm font-semibold backdrop-blur-lg transition hover:bg-card text-foreground"
            >
              <Navigation className="h-4 w-4" />
              Navigate
            </button>

            <button
              onClick={onViewEvents}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-5 py-3 text-sm font-semibold backdrop-blur-lg transition hover:bg-card text-foreground"
            >
              <Calendar className="h-4 w-4" />
              Today's Events
            </button>

            <button
              onClick={onEmergency}
              className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-5 py-3 text-sm font-semibold text-destructive backdrop-blur-lg transition hover:bg-destructive hover:text-destructive-foreground"
            >
              <TriangleAlert className="h-4 w-4" />
              Emergency Help
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
