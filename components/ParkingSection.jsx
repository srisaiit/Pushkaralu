import React from 'react';
import { Car, Bus, Bike, Zap, Navigation, Sparkles } from 'lucide-react';
import { PARKING_DATA } from '../data/pushkaraluData';

export default function ParkingSection({ lang = 'te', customParking, onNavigateParking }) {
  const parkingList = customParking || PARKING_DATA;

  const iconMap = {
    car: <Car className="h-5 w-5" />,
    bus: <Bus className="h-5 w-5" />,
    'two-wheeler': <Bike className="h-5 w-5" />,
    ev: <Zap className="h-5 w-5" />
  };

  return (
    <section id="parking" className="bg-gradient-to-b from-secondary/40 to-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-saffron/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-saffron">
            <Sparkles className="h-3 w-3" />
            Parking
          </div>
          <h2 className="font-display text-3xl font-bold sm:text-5xl">
            Live parking availability
          </h2>
        </div>

        {/* Parking Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {parkingList.map((item) => {
            const pct = Math.round((item.avail / item.cap) * 100);
            const title = lang === 'te' ? item.tTe || item.t : lang === 'hi' ? item.tHi || item.t : item.t;

            return (
              <div
                key={item.id}
                className="glass rounded-2xl p-6 shadow-elegant transition hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl gradient-river text-white">
                      {iconMap[item.id] || <Car className="h-5 w-5" />}
                    </div>
                    <div className="min-w-0">
                      <div className="font-display text-lg font-bold">
                        {title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.avail} / {item.cap} available
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full gradient-sunrise transition-all"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>

                  <div className="mt-2 text-[11px] text-muted-foreground">
                    Location: <span className="font-medium text-foreground/80">{item.location}</span>
                  </div>
                </div>

                {/* Navigate Button */}
                <button
                  onClick={() => onNavigateParking && onNavigateParking(item)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border/70 py-2 text-sm font-semibold hover:border-saffron hover:text-saffron transition cursor-pointer"
                >
                  <Navigation className="h-4 w-4" />
                  Navigate
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
