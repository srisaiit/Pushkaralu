import React, { useState } from 'react';
import { UserSearch, Search, QrCode, Upload, Check, X, ShieldAlert } from 'lucide-react';
import { INITIAL_LOST_PERSONS } from '../data/pushkaraluData';

export default function LostFoundSection({ lang = 'te' }) {
  const [cases, setCases] = useState(INITIAL_LOST_PERSONS);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [registeredSuccess, setRegisteredSuccess] = useState(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formAge, setFormAge] = useState('');
  const [formLocation, setFormLocation] = useState('Pushkar Ghat');
  const [formDescription, setFormDescription] = useState('');
  const [formPhone, setFormPhone] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newId = `GMP2027-00${cases.length + 1}`;
    const newCase = {
      id: newId,
      name: `${formName} (Age ${formAge})`,
      details: `${formDescription}, last seen at ${formLocation}`,
      status: 'Active Search'
    };

    setCases([newCase, ...cases]);
    setRegisteredSuccess({
      id: newId,
      name: formName
    });

    // Reset form
    setFormName('');
    setFormAge('');
    setFormDescription('');
    setFormPhone('');
  };

  const filteredCases = cases.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="lost-found" className="bg-gradient-to-br from-primary via-primary to-river py-20 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        {/* Left Column: Heading, Description & Action Buttons */}
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
            <UserSearch className="h-3 w-3" />
            Lost & Found
          </div>

          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Reuniting families, safely.
          </h2>

          <p className="mt-4 max-w-lg text-white/80 leading-relaxed">
            Register a missing person with a photo, receive a QR token, and get announced across all Pushkar Ghats and control rooms instantly.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setRegisteredSuccess(null);
                setShowRegisterModal(true);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-saffron-foreground shadow-glow hover:scale-105 transition cursor-pointer"
            >
              <UserSearch className="h-4 w-4" />
              Register Missing
            </button>

            <button
              onClick={() => setShowSearchModal(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-white/20 transition cursor-pointer"
            >
              <Search className="h-4 w-4" />
              Search Person
            </button>
          </div>
        </div>

        {/* Right Column: Active Cases Preview */}
        <div className="glass rounded-3xl p-6 text-foreground">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Recent Registered Cases ({cases.length})
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Live PA Synced
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {cases.slice(0, 4).map((item) => (
              <div key={item.id} className="rounded-xl bg-background/70 p-3 shadow-sm border border-border/50">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-saffron/30 to-primary/20 flex items-center justify-center relative overflow-hidden">
                  <UserSearch className="h-10 w-10 text-primary/40" />
                  <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1 py-0.5 text-[9px] text-white font-mono">
                    QR Sync
                  </span>
                </div>
                <div className="mt-2 text-xs font-semibold truncate text-foreground">
                  Case #{item.id}
                </div>
                <div className="text-[11px] text-foreground/80 truncate">
                  {item.name}
                </div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Register Missing Person Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in text-foreground">
          <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition"
            >
              <X className="h-4 w-4" />
            </button>

            {registeredSuccess ? (
              <div className="text-center py-6">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 mb-4 animate-bounce">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold">Case Successfully Registered!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Case <strong>#{registeredSuccess.id}</strong> has been created for <strong>{registeredSuccess.name}</strong>.
                </p>

                <div className="mt-6 mx-auto w-44 p-4 rounded-2xl bg-white border border-gray-200 shadow-md">
                  <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center text-white">
                    <QrCode className="h-28 w-28 text-white" />
                  </div>
                  <div className="mt-2 text-[10px] text-gray-700 font-mono font-bold text-center">
                    TOKEN #{registeredSuccess.id}
                  </div>
                </div>

                <div className="mt-6 text-xs text-muted-foreground bg-secondary/50 p-3 rounded-xl text-left">
                  <p className="font-semibold text-primary mb-1">Broadcast Status:</p>
                  <p>✓ Public Address announcement dispatched to Pushkar & Saraswati Ghats.</p>
                  <p>✓ Information routed to Central Police Control Room (0883-2471234).</p>
                  <p>✓ Keep your mobile phone accessible for immediate contact.</p>
                </div>

                <button
                  onClick={() => setShowRegisterModal(false)}
                  className="mt-6 w-full rounded-full gradient-sunrise py-2.5 text-sm font-semibold text-white shadow-glow"
                >
                  Close & View Active Cases
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-saffron font-bold text-xs uppercase tracking-wider mb-1">
                  <ShieldAlert className="h-4 w-4" />
                  <span>Immediate Public Safety Action</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">Register Missing Person</h3>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Full Name of Missing Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Rama Rao"
                      className="w-full rounded-xl border border-border bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Age *
                      </label>
                      <input
                        type="number"
                        required
                        value={formAge}
                        onChange={(e) => setFormAge(e.target.value)}
                        placeholder="e.g. 65"
                        className="w-full rounded-xl border border-border bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Last Seen Location *
                      </label>
                      <select
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        className="w-full rounded-xl border border-border bg-secondary/40 px-3 py-2 text-sm outline-none focus:border-primary"
                      >
                        <option value="Pushkar Ghat">Pushkar Ghat</option>
                        <option value="Kotilingala Ghat">Kotilingala Ghat</option>
                        <option value="Saraswati Ghat">Saraswati Ghat</option>
                        <option value="Gowtami Ghat">Gowtami Ghat</option>
                        <option value="RTC Bus Stand">RTC Bus Stand</option>
                        <option value="Railway Station">Railway Station</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Clothing / Physical Identifiers *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="e.g. Wearing white shirt and grey dhoti, carries a black bag, speaks Telugu..."
                      className="w-full rounded-xl border border-border bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Guardian / Reporter Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full rounded-xl border border-border bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div className="border border-dashed border-border rounded-xl p-3 text-center bg-secondary/20">
                    <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Upload Photo (Optional for AI Facial Matching)</div>
                    <input type="file" accept="image/*" className="text-xs text-muted-foreground mt-1" />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-saffron text-saffron-foreground font-bold py-3 text-sm shadow-glow hover:opacity-95 transition"
                  >
                    Broadcast Announcement & Get QR Token
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search Person Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in text-foreground">
          <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="font-display text-2xl font-bold mb-3">Search Registered Cases</h3>

            <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-2 mb-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, Case ID (e.g. GMP2027), or ghat..."
                className="w-full bg-transparent text-sm outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-xs text-muted-foreground">
                  Clear
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {filteredCases.map((c) => (
                <div key={c.id} className="p-3 rounded-2xl border border-border bg-secondary/20 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary">#{c.id}</span>
                      <span className="font-semibold text-sm">{c.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.details}</p>
                  </div>
                  <span className="rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 px-2.5 py-1 text-[10px] font-bold shrink-0">
                    {c.status}
                  </span>
                </div>
              ))}

              {filteredCases.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No cases matched "{searchQuery}".
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
