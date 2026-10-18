import React from 'react';
import { Radio, Bell } from 'lucide-react';
import { TICKER_ANNOUNCEMENTS, TICKER_ANNOUNCEMENTS_TE, TICKER_ANNOUNCEMENTS_HI } from '../data/pushkaraluData';

export default function Ticker({ lang = 'te', customAnnouncements }) {
  let list = TICKER_ANNOUNCEMENTS;
  if (customAnnouncements && customAnnouncements.length > 0) {
    list = customAnnouncements;
  } else if (lang === 'te') {
    list = TICKER_ANNOUNCEMENTS_TE;
  } else if (lang === 'hi') {
    list = TICKER_ANNOUNCEMENTS_HI;
  }

  // Duplicate items for continuous smooth ticker loop
  const tickerItems = [...list, ...list];

  return (
    <div className="border-y border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-hidden px-4 py-2.5 sm:px-6">
        <div className="flex shrink-0 items-center gap-2 rounded-full bg-saffron/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-saffron-foreground">
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          Live
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div className="animate-ticker flex gap-12 whitespace-nowrap text-sm">
            {tickerItems.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                <Bell className="h-3.5 w-3.5 opacity-70" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
