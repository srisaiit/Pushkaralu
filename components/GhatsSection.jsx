import React, { useState } from 'react';
import { Navigation, Sparkles, CheckCircle2, X, Clock, ShieldCheck, Waves } from 'lucide-react';
import { GHATS_DATA } from '../data/pushkaraluData';

export default function GhatsSection({ lang = 'te', onNavigateGhat }) {
  const [selectedGhat, setSelectedGhat] = useState(null);

  const crowdColors = {
    emerald: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    amber: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    rose: 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
  };

  return (
    <section id="ghats" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-saffron/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-saffron">
          <Sparkles className="h-3 w-3" />
          Pushkar Ghats
        </div>
        <h2 className="font-display text-3xl font-bold sm:text-5xl">
          Sacred bathing ghats along the Godavari
        </h2>
        <p className="mt-3 text-muted-foreground">
          Live crowd status, distance and facilities at each ghat.
        </p>
      </div>

      {/* Ghat Cards Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {GHATS_DATA.map((ghat) => {
          const name = lang === 'te' ? ghat.nameTe || ghat.name : lang === 'hi' ? ghat.nameHi || ghat.name : ghat.name;
          const crowd = lang === 'te' ? ghat.crowdTe || ghat.crowd : lang === 'hi' ? ghat.crowdHi || ghat.crowd : ghat.crowd;

          return (
            <article
              key={ghat.id}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-elegant transition hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Image with overlay badges */}
                <div
                  onClick={() => setSelectedGhat(ghat)}
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                >
                  <img
                    src="/assets/ghat-aVaQmyHF.jpg"
                    alt={ghat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent"></div>

                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold ${crowdColors[ghat.crowdTone]}`}
                  >
                    ● {crowd}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <h3 className="font-display text-lg font-bold drop-shadow">
                      {name}
                    </h3>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs backdrop-blur">
                      {ghat.distance}
                    </span>
                  </div>
                </div>

                {/* Facility Tags */}
                <div className="flex flex-wrap gap-2 p-4 text-[11px] font-medium">
                  {ghat.vip && (
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground font-semibold">
                      VIP
                    </span>
                  )}
                  {ghat.women && (
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">
                      Women Friendly
                    </span>
                  )}
                  {ghat.wheel && (
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">
                      Wheelchair
                    </span>
                  )}
                </div>
              </div>

              {/* Navigate Button */}
              <button
                onClick={() => onNavigateGhat(ghat)}
                className="flex w-full items-center justify-center gap-2 border-t border-border/60 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground cursor-pointer"
              >
                <Navigation className="h-4 w-4" />
                Navigate
              </button>
            </article>
          );
        })}
      </div>

      {/* Ghat Details Modal */}
      {selectedGhat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border p-6 shadow-2xl">
            <button
              onClick={() => setSelectedGhat(null)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-sunrise text-white">
                <Waves className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">
                  {lang === 'te' ? selectedGhat.nameTe : selectedGhat.name}
                </h3>
                <span className="text-xs text-muted-foreground">{selectedGhat.distance} from City Center</span>
              </div>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              {lang === 'te' ? selectedGhat.descriptionTe : selectedGhat.description}
            </p>

            <div className="space-y-2 mb-4 bg-secondary/50 p-3 rounded-xl text-xs">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>Operating Timings: {selectedGhat.timings}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Life-jackets, safety perimeter mesh & rescue divers active.</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Available Facilities:
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {selectedGhat.facilities.map((fac, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-foreground/90">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const target = selectedGhat;
                  setSelectedGhat(null);
                  onNavigateGhat(target);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full gradient-sunrise py-2.5 text-sm font-semibold text-white shadow-glow"
              >
                <Navigation className="h-4 w-4" /> Start Directions
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
