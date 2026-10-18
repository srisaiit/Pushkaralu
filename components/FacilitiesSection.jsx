import React, { useState } from 'react';
import { HeartPulse, ShieldAlert, UserSearch, Navigation, Droplets, Bus, Sparkles, ArrowRight, X, PhoneCall } from 'lucide-react';
import { FACILITIES_DATA } from '../data/pushkaraluData';

export default function FacilitiesSection({
  lang = 'te',
  onOpenEmergency,
  onOpenMap,
  onScrollToLostFound
}) {
  const [selectedFacility, setSelectedFacility] = useState(null);

  const iconMap = {
    medical: <HeartPulse className="h-6 w-6" />,
    emergency: <ShieldAlert className="h-6 w-6" />,
    'lost-found': <UserSearch className="h-6 w-6" />,
    'gis-navigation': <Navigation className="h-6 w-6" />,
    'drinking-water': <Droplets className="h-6 w-6" />,
    transport: <Bus className="h-6 w-6" />
  };

  const handleFacilityAction = (facility) => {
    if (facility.id === 'emergency') {
      onOpenEmergency();
    } else if (facility.id === 'lost-found') {
      onScrollToLostFound();
    } else if (facility.id === 'gis-navigation') {
      onOpenMap();
    } else {
      setSelectedFacility(facility);
    }
  };

  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-saffron/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-saffron">
          <Sparkles className="h-3 w-3" />
          Public Services
        </div>
        <h2 className="font-display text-3xl font-bold sm:text-5xl">
          Everything a pilgrim needs
        </h2>
      </div>

      {/* Facilities Grid */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FACILITIES_DATA.map((item) => {
          const title = lang === 'te' ? item.tTe : lang === 'hi' ? item.tHi : item.t;
          const desc = lang === 'te' ? item.dTe : lang === 'hi' ? item.dHi : item.d;

          return (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-elegant transition hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full gradient-sunrise opacity-0 blur-2xl transition group-hover:opacity-30"></div>

              <div>
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl gradient-sunrise text-white shadow-glow">
                  {iconMap[item.id] || <Sparkles className="h-6 w-6" />}
                </div>

                <h3 className="relative mt-4 font-display text-xl font-bold">
                  {title}
                </h3>

                <p className="relative mt-1 text-sm text-muted-foreground">
                  {desc}
                </p>
              </div>

              <button
                onClick={() => handleFacilityAction(item)}
                className="relative mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-saffron transition cursor-pointer"
              >
                <span>Learn more</span>
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Facility Details Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border p-6 shadow-2xl">
            <button
              onClick={() => setSelectedFacility(null)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-sunrise text-white shadow-glow">
                {iconMap[selectedFacility.id]}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">
                  {lang === 'te' ? selectedFacility.tTe : selectedFacility.t}
                </h3>
                <p className="text-xs text-muted-foreground">{selectedFacility.d}</p>
              </div>
            </div>

            <div className="bg-secondary/40 p-4 rounded-2xl text-sm leading-relaxed text-foreground/90 mb-6">
              {selectedFacility.details}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedFacility(null);
                  onOpenMap();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full gradient-sunrise py-2.5 text-sm font-semibold text-white shadow-glow"
              >
                <Navigation className="h-4 w-4" /> View On Map
              </button>
              <button
                onClick={() => {
                  setSelectedFacility(null);
                  onOpenEmergency();
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-destructive/40 bg-destructive/10 px-4 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive hover:text-white transition"
              >
                <PhoneCall className="h-4 w-4" /> Emergency
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
