import React, { useState } from 'react';
import { Search, Sparkles, Clock, MapPin, Ticket, Crown, Check, X } from 'lucide-react';
import { TEMPLES_DATA } from '../data/pushkaraluData';

export default function TemplesSection({ lang = 'te', onNavigateLocation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingTemple, setBookingTemple] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedSeva, setSelectedSeva] = useState(null);

  const filteredTemples = TEMPLES_DATA.filter((temple) => {
    const q = searchQuery.toLowerCase();
    return (
      temple.name.toLowerCase().includes(q) ||
      temple.nameTe.toLowerCase().includes(q) ||
      temple.nameHi.toLowerCase().includes(q)
    );
  });

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingTemple(null);
      setSelectedSeva(null);
    }, 2500);
  };

  return (
    <section id="temples" className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-saffron/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-saffron">
            <Sparkles className="h-3 w-3" />
            Temples
          </div>
          <h2 className="font-display text-3xl font-bold sm:text-5xl">
            Darshan timings & tickets
          </h2>
          <p className="mt-3 text-muted-foreground">
            Browse temples near you, check timings and book VIP darshan.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2.5 shadow-elegant">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'te'
                ? "ఆలయం పేరుతో శోధించండి..."
                : lang === 'hi'
                ? "मंदिर के नाम से खोजें..."
                : "Search temple by name…"
            }
            className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-xs text-muted-foreground hover:text-foreground">
              Clear
            </button>
          )}
        </div>

        {/* Temples Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemples.map((temple) => {
            const name = lang === 'te' ? temple.nameTe : lang === 'hi' ? temple.nameHi : temple.name;

            return (
              <article
                key={temple.id}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-elegant transition hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Temple Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src="/assets/temple-CUD5i3oH.jpg"
                      alt={temple.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10"></div>
                    <h3 className="absolute bottom-3 left-4 right-4 font-display text-xl font-bold text-white drop-shadow">
                      {name}
                    </h3>
                  </div>

                  {/* Timings and Details Grid */}
                  <div className="grid grid-cols-2 gap-3 p-5 text-sm">
                    {/* Opens */}
                    <div className="flex items-center gap-2">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Opens</div>
                        <div className="truncate font-semibold">{temple.open}</div>
                      </div>
                    </div>

                    {/* Closes */}
                    <div className="flex items-center gap-2">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Closes</div>
                        <div className="truncate font-semibold">{temple.close}</div>
                      </div>
                    </div>

                    {/* Distance */}
                    <div className="flex items-center gap-2">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Distance</div>
                        <div className="truncate font-semibold">{temple.dist}</div>
                      </div>
                    </div>

                    {/* Ticket */}
                    <div className="flex items-center gap-2">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                        <Ticket className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Darshan</div>
                        <div className="truncate font-semibold">{temple.ticket}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* VIP Darshan & Action Buttons */}
                <div className="border-t border-border/60 p-4 bg-secondary/20 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Crown className="h-4 w-4 text-amber-500" />
                    <span className="font-semibold text-foreground">VIP Darshan:</span>
                    <span className="font-bold text-primary">{temple.vip}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onNavigateLocation(temple)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-full border border-border/70 hover:bg-card text-foreground transition"
                    >
                      Route
                    </button>
                    <button
                      onClick={() => setBookingTemple(temple)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-full gradient-sunrise text-white shadow-sm hover:scale-105 transition"
                    >
                      Book Darshan
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredTemples.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No temples matched your search term "{searchQuery}".
          </div>
        )}
      </div>

      {/* Book Darshan Modal */}
      {bookingTemple && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-card border border-border p-6 shadow-2xl">
            <button
              onClick={() => {
                setBookingTemple(null);
                setBookingConfirmed(false);
              }}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition"
            >
              <X className="h-4 w-4" />
            </button>

            {bookingConfirmed ? (
              <div className="text-center py-8">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 mb-4 animate-bounce">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold">Darshan Pass Confirmed!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your electronic e-Darshan pass for {bookingTemple.name} has been issued. Show SMS token at the Endowments VIP entry gate.
                </p>
                <div className="mt-4 inline-block font-mono text-xs bg-secondary px-3 py-1.5 rounded-lg font-bold text-primary">
                  TOKEN #GMP-DARSHAN-{Math.floor(100000 + Math.random() * 900000)}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
                  <Crown className="h-4 w-4 text-amber-500" />
                  <span>VIP / Special Darshan Booking</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{bookingTemple.name}</h3>

                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Devotee Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter primary devotee name"
                      className="w-full rounded-xl border border-border bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        className="w-full rounded-xl border border-border bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        No. of Devotees
                      </label>
                      <select className="w-full rounded-xl border border-border bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary">
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="4">4 Persons (Family)</option>
                        <option value="6">6 Persons</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Select Seva / Darshan Type
                    </label>
                    <div className="space-y-1.5">
                      <label className="flex items-center justify-between rounded-xl border border-border p-2.5 text-xs cursor-pointer hover:bg-secondary/40">
                        <span className="flex items-center gap-2">
                          <input type="radio" name="seva" defaultChecked />
                          <span>General Free Darshan (Sarva Darshanam)</span>
                        </span>
                        <span className="font-bold text-emerald-600">Free</span>
                      </label>
                      <label className="flex items-center justify-between rounded-xl border border-primary/40 bg-primary/5 p-2.5 text-xs cursor-pointer">
                        <span className="flex items-center gap-2">
                          <input type="radio" name="seva" />
                          <span className="font-semibold">VIP Quick Darshan (Sheegra Darshanam)</span>
                        </span>
                        <span className="font-bold text-primary">{bookingTemple.vip}</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full gradient-sunrise py-3 text-sm font-semibold text-white shadow-glow hover:opacity-95 transition"
                  >
                    Confirm & Generate e-Darshan Pass
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
