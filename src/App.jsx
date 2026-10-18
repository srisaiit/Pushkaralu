import React, { useState, useEffect } from 'react';
import { Sun, Moon, Volume2 } from 'lucide-react';
import AiVoiceSection from './components/AiVoiceSection';

export default function App() {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState('te'); // Default to Telugu (highest priority)
  const [isListening, setIsListening] = useState(false);

  // Sync theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-[#faf8f4] dark:bg-slate-950 text-[#111827] dark:text-slate-100 flex flex-col justify-between selection:bg-teal-700 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="w-full border-b-2 border-slate-300 dark:border-slate-800 bg-[#fefdf9]/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
          {/* Official Seal / Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#e0f2fe] dark:bg-slate-800 border-2 border-[#172554] grid place-items-center text-[#172554] dark:text-teal-300 shadow-xs font-black text-xl select-none">
              గో
            </div>
            <div>
              <div className="font-display font-black text-sm sm:text-base leading-tight tracking-tight text-[#172554] dark:text-white">
                Godavari Maha Pushkaralu 2027
              </div>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 font-bold">
                Official AI Voice Assistant · అధికారిక ఏఐ సమాచార కేంద్రం
              </div>
            </div>
          </div>

          {/* Right Controls: High-Contrast Language Switcher & Dark Mode Toggle */}
          <div className="flex items-center gap-3">
            {/* Top Language Switcher */}
            <div className="hidden sm:inline-flex items-center gap-1.5 p-1 rounded-full bg-[#f1f5f9] dark:bg-slate-800 border-2 border-[#172554] text-xs font-bold">
              {[
                { id: 'te', label: 'తెలుగు' },
                { id: 'en', label: 'English' },
                { id: 'hi', label: 'हिन्दी' }
              ].map((item) => {
                const isSelected = lang === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setLang(item.id)}
                    className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-black text-xs ${
                      isSelected
                        ? 'bg-[#dbeafe] dark:bg-teal-950 text-[#172554] dark:text-teal-200 border-2 border-[#1d4ed8] dark:border-teal-400 shadow-xs scale-102'
                        : 'bg-white dark:bg-slate-900 text-[#172554] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle Dark Mode"
              className="grid h-10 w-10 place-items-center rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-[#172554] dark:text-white transition border-2 border-[#172554]/40 cursor-pointer shadow-xs"
            >
              {dark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-[#172554]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main View: ONLY Talk with AI Voice Assistant */}
      <main className="flex-1 flex flex-col items-center justify-center py-4 sm:py-8">
        <AiVoiceSection
          lang={lang}
          setLang={setLang}
          isListening={isListening}
          setIsListening={setIsListening}
        />
      </main>

      {/* Clean High-Contrast Footer */}
      <footer className="w-full border-t-2 border-slate-300 dark:border-slate-800 py-4 bg-[#fefdf9]/90 dark:bg-slate-900/90 text-center text-xs text-slate-700 dark:text-slate-400 font-semibold">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2027 Godavari Maha Pushkaralu · Rajahmundry, Andhra Pradesh
          </span>
          <span className="flex items-center gap-1.5 font-bold text-[#172554] dark:text-teal-400">
            <Volume2 className="h-4 w-4" />
            Verified Single-Speaker Neural Audio · Telugu · Hindi · English
          </span>
        </div>
      </footer>
    </div>
  );
}
