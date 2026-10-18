import React from 'react';
import { Users, Sun, Waves, Wind, Car, Droplets, Sparkles } from 'lucide-react';
import { LIVE_DASHBOARD_DATA } from '../data/pushkaraluData';

export default function LiveDashboard({ lang = 'te', customMetrics }) {
  const metrics = customMetrics || LIVE_DASHBOARD_DATA;

  const iconMap = {
    crowd: <Users className="h-5 w-5" />,
    weather: <Sun className="h-5 w-5" />,
    water: <Waves className="h-5 w-5" />,
    aqi: <Wind className="h-5 w-5" />,
    traffic: <Car className="h-5 w-5" />,
    'water-points': <Droplets className="h-5 w-5" />
  };

  return (
    <section className="bg-gradient-to-b from-background via-secondary/40 to-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-saffron/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-saffron">
            <Sparkles className="h-3 w-3" />
            Live Dashboard
          </div>
          <h2 className="font-display text-3xl font-bold sm:text-5xl">
            Real-time information from the Control Room
          </h2>
        </div>

        {/* 6 Metrics Grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((item) => {
            const label = lang === 'te' ? item.labelTe || item.label : lang === 'hi' ? item.labelHi || item.label : item.label;
            const value = lang === 'te' ? item.valueTe || item.value : lang === 'hi' ? item.valueHi || item.value : item.value;
            const note = lang === 'te' ? item.noteTe || item.note : lang === 'hi' ? item.noteHi || item.note : item.note;

            return (
              <div
                key={item.key}
                className="group glass rounded-2xl p-5 shadow-elegant transition hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl gradient-sunrise text-white">
                    {iconMap[item.key] || <Sparkles className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </div>
                    <div className="truncate font-display text-2xl font-bold">
                      {value}
                    </div>
                  </div>
                  <span
                    className="ml-auto h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: item.dot,
                      boxShadow: `0 0 12px ${item.dot}`
                    }}
                  ></span>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  {note}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
