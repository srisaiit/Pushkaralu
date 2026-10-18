import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, Play, Radio, X } from 'lucide-react';
import { SCHEDULE_DATA } from '../data/pushkaraluData';

export default function ScheduleSection({ lang = 'te' }) {
  const [isPlayingLive, setIsPlayingLive] = useState(false);

  return (
    <section id="events" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-saffron/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-saffron">
          <Sparkles className="h-3 w-3" />
          Today's Schedule
        </div>
        <h2 className="font-display text-3xl font-bold sm:text-5xl">
          Live events & harathis
        </h2>
      </div>

      {/* Grid: Events Timeline (Left) & Live Stream Card (Right) */}
      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Timeline */}
        <ol className="relative space-y-4 border-l-2 border-dashed border-saffron/40 pl-6 ml-4">
          {SCHEDULE_DATA.map((event, idx) => {
            const title = lang === 'te' ? event.titleTe : lang === 'hi' ? event.titleHi : event.title;
            const place = lang === 'te' ? event.placeTe : lang === 'hi' ? event.placeHi : event.place;

            return (
              <li key={idx} className="relative">
                <span className="absolute -left-[37px] top-1.5 grid h-6 w-6 place-items-center rounded-full gradient-sunrise text-[10px] font-bold text-white shadow-sm">
                  <Calendar className="h-3 w-3" />
                </span>

                <div className="glass rounded-2xl p-4 shadow-sm transition hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="font-display text-lg font-bold">
                      {title}
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {event.time}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-saffron" />
                    <span>{place}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Live Stream Card */}
        <div className="glass overflow-hidden rounded-2xl shadow-elegant flex flex-col justify-between">
          <div className="relative aspect-video">
            <img
              src="/assets/ghat-aVaQmyHF.jpg"
              alt="Live streaming"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Play Button */}
            <button
              onClick={() => setIsPlayingLive(true)}
              aria-label="Play live stream"
              className="absolute inset-0 grid place-items-center text-white group cursor-pointer"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full gradient-sunrise shadow-glow transition group-hover:scale-110">
                <Play className="h-8 w-8 fill-current translate-x-0.5" />
              </span>
            </button>

            {/* Live Badge */}
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground shadow-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"></span>
              LIVE
            </span>
          </div>

          <div className="p-5">
            <div className="font-display text-lg font-bold">
              Sandhya Harathi — Pushkar Ghat
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Official HD live broadcast from the main river pontoon of Pushkar Ghat, Rajahmundry.
            </p>
          </div>
        </div>
      </div>

      {/* Live Stream Modal */}
      {isPlayingLive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-3xl bg-card border border-border p-6 shadow-2xl overflow-hidden">
            <button
              onClick={() => setIsPlayingLive(false)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Live Godavari Harathi Stream</span>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-border/40">
              <img
                src="/assets/hero-godavari-_kRxrQ2z.jpg"
                alt="Live river feed"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <div className="font-display text-lg font-bold">Godavari Maha Harathi (Live)</div>
                  <div className="text-xs text-white/80">Stream Source: AP Tourism Control Room Feed #01</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-destructive px-2.5 py-0.5 text-[11px] font-bold">LIVE 1080p</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
              <span>Viewers online: 14,280 devotees</span>
              <button
                onClick={() => setIsPlayingLive(false)}
                className="px-4 py-2 rounded-full border border-border hover:bg-secondary transition"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
