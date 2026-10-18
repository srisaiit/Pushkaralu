import React, { useState } from 'react';
import { X, Lock, ShieldCheck, RefreshCw, PlusCircle, Check, AlertTriangle } from 'lucide-react';

export default function AdminModal({
  isOpen,
  onClose,
  onUpdateMetrics,
  onAddAnnouncement,
  onUpdateParking,
  currentMetrics
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Form states
  const [crowdLevel, setCrowdLevel] = useState('Moderate');
  const [waterLevel, setWaterLevel] = useState('12.4');
  const [weatherNote, setWeatherNote] = useState('32°C · Clear');
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [carSlots, setCarSlots] = useState('812');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Default authorized festival pin
    if (pinInput === 'pushkar2027' || pinInput === 'admin2027') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleSaveControlRoom = (e) => {
    e.preventDefault();

    if (onUpdateMetrics) {
      const updated = (currentMetrics || []).map(m => {
        if (m.key === 'crowd') return { ...m, value: crowdLevel, dot: crowdLevel === 'High' ? '#ef4444' : crowdLevel === 'Moderate' ? '#f59e0b' : '#10b981' };
        if (m.key === 'water') return { ...m, value: `${waterLevel} m` };
        if (m.key === 'weather') return { ...m, value: weatherNote };
        return m;
      });
      onUpdateMetrics(updated);
    }

    if (newAnnouncement.trim() && onAddAnnouncement) {
      onAddAnnouncement(newAnnouncement.trim());
      setNewAnnouncement('');
    }

    if (onUpdateParking && carSlots) {
      onUpdateParking(parseInt(carSlots, 10));
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-fade-in text-foreground">
      <div className="relative w-full max-w-xl rounded-3xl bg-card border border-border p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition"
        >
          <X className="h-4 w-4" />
        </button>

        {!isAuthenticated ? (
          <div className="py-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-sunrise text-white mb-4 shadow-glow">
              <Lock className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl font-bold">Authorized Control Room Login</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Official Administration for Pushkaralu 2027 Information Feeds
            </p>

            <form onSubmit={handleLogin} className="mt-6 max-w-sm mx-auto space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Officer Passcode (pushkar2027)"
                  className="w-full text-center tracking-widest text-base font-mono rounded-xl border border-border bg-secondary/40 py-2.5 outline-none focus:border-primary"
                />
                {loginError && (
                  <p className="mt-2 text-xs text-destructive flex items-center justify-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Incorrect passkey. Use 'pushkar2027'.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-full gradient-sunrise py-2.5 text-sm font-semibold text-white shadow-glow hover:scale-105 transition"
              >
                Unlock Administrator Console
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span className="font-display text-lg font-bold">Control Room Admin Panel</span>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Sign Out
              </button>
            </div>

            {savedSuccess && (
              <div className="mb-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-xl text-xs flex items-center gap-2">
                <Check className="h-4 w-4" /> Changes verified and live synced across all portal feeds!
              </div>
            )}

            <form onSubmit={handleSaveControlRoom} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">
                    Current Crowd Status
                  </label>
                  <select
                    value={crowdLevel}
                    onChange={(e) => setCrowdLevel(e.target.value)}
                    className="w-full rounded-xl border border-border bg-secondary/40 p-2 text-xs outline-none"
                  >
                    <option value="Low">Low (Safe)</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High (Advisory)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">
                    River Water Level (Meters)
                  </label>
                  <input
                    type="text"
                    value={waterLevel}
                    onChange={(e) => setWaterLevel(e.target.value)}
                    className="w-full rounded-xl border border-border bg-secondary/40 p-2 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">
                    Weather Condition Note
                  </label>
                  <input
                    type="text"
                    value={weatherNote}
                    onChange={(e) => setWeatherNote(e.target.value)}
                    className="w-full rounded-xl border border-border bg-secondary/40 p-2 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">
                    Car Parking Slots Available
                  </label>
                  <input
                    type="number"
                    value={carSlots}
                    onChange={(e) => setCarSlots(e.target.value)}
                    className="w-full rounded-xl border border-border bg-secondary/40 p-2 text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-muted-foreground mb-1">
                  Add Emergency / Ticker Announcement
                </label>
                <input
                  type="text"
                  value={newAnnouncement}
                  onChange={(e) => setNewAnnouncement(e.target.value)}
                  placeholder="e.g. 📢 Traffic diversion on Bund road until 2 PM..."
                  className="w-full rounded-xl border border-border bg-secondary/40 p-2 text-xs outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-full gradient-sunrise py-2.5 font-bold text-white shadow-glow hover:opacity-95 transition"
                >
                  Publish Verified Updates
                </button>
              </div>

              <div className="text-[11px] text-center text-muted-foreground pt-1">
                Last Verified: {new Date().toLocaleTimeString()} by Central Command Desk
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
