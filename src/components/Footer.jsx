import React, { useState } from 'react';
import { Landmark, Shield, X } from 'lucide-react';

export default function Footer({
  onScrollTo,
  onOpenEmergency,
  onOpenAccessibility,
  onOpenAdmin
}) {
  const [legalModalContent, setLegalModalContent] = useState(null);

  const handleLegalClick = (title, text) => {
    setLegalModalContent({ title, text });
  };

  return (
    <>
      <footer className="bg-background pb-10 pt-20 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-4">
            {/* Col 1: Brand & AP Govt */}
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full gradient-sunrise text-white shadow-elegant">
                  <Landmark className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-lg font-bold">
                    Godavari Maha Pushkaralu
                  </div>
                  <div className="text-xs text-muted-foreground">
                    2027 · Official Portal
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Government of Andhra Pradesh · Andhra Pradesh Tourism · Endowments Department.
              </p>
            </div>

            {/* Col 2: Portal Navigation */}
            <div>
              <div className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Portal
              </div>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary transition cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => onScrollTo('ghats')} className="hover:text-primary transition cursor-pointer">
                    Ghats
                  </button>
                </li>
                <li>
                  <button onClick={() => onScrollTo('temples')} className="hover:text-primary transition cursor-pointer">
                    Temples
                  </button>
                </li>
                <li>
                  <button onClick={() => onScrollTo('events')} className="hover:text-primary transition cursor-pointer">
                    Live Events
                  </button>
                </li>
                <li>
                  <button onClick={() => onScrollTo('ai')} className="hover:text-primary transition cursor-pointer">
                    AI Assistant
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Support */}
            <div>
              <div className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Support
              </div>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>
                  <button onClick={onOpenEmergency} className="hover:text-destructive transition cursor-pointer">
                    Emergency: 112
                  </button>
                </li>
                <li>
                  <a href="tel:108" className="hover:text-destructive transition">
                    Medical: 108
                  </a>
                </li>
                <li>
                  <a href="tel:100" className="hover:text-primary transition">
                    Police: 100
                  </a>
                </li>
                <li>
                  <a href="tel:08832471234" className="hover:text-primary transition">
                    Control Room: 0883-2471234
                  </a>
                </li>
                <li>
                  <button onClick={onOpenEmergency} className="hover:text-primary transition cursor-pointer">
                    All Contacts Directory
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Legal */}
            <div>
              <div className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Legal & Governance
              </div>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>
                  <button
                    onClick={() =>
                      handleLegalClick(
                        "Privacy Policy",
                        "The Government of Andhra Pradesh is dedicated to respecting pilgrim privacy. No biometric or voice data is retained without authorization. Facial tokens for lost-and-found cases are cryptographically secured and deleted after reunion."
                      )
                    }
                    className="hover:text-primary transition cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleLegalClick(
                        "Terms of Use",
                        "This portal provides verified pilgrim convenience information for Godavari Maha Pushkaralu 2027. Timings and river advisories are synchronized with official district administration releases."
                      )
                    }
                    className="hover:text-primary transition cursor-pointer"
                  >
                    Terms of Use
                  </button>
                </li>
                <li>
                  <button onClick={onOpenAccessibility} className="hover:text-primary transition cursor-pointer">
                    Accessibility Statement
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleLegalClick(
                        "Right to Information (RTI)",
                        "Right to Information (RTI) contact: Public Information Officer, Godavari Pushkaralu Nodal Directorate, Collectorate Compound, Rajahmundry, Andhra Pradesh."
                      )
                    }
                    className="hover:text-primary transition cursor-pointer"
                  >
                    RTI
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleLegalClick(
                        "Sitemap",
                        "Main Sections: Home, Leadership Banner, Live Marquee, AI Voice Assistant (#ai), Control Room Live Dashboard, Pushkar Bathing Ghats, Temples & VIP Darshan, Pilgrim Facilities, Live Parking Status, Harathi Schedule & Live Video, Lost & Found Family Reunion, Rajahmundry GIS Interactive Map."
                      )
                    }
                    className="hover:text-primary transition cursor-pointer"
                  >
                    Sitemap
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Attribution & Developer Credits */}
          <div className="mt-14 flex flex-col items-center gap-4 border-t border-border/60 pt-8 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold">
              Developed by
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {/* Sri Sai IT Solutions */}
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground font-bold shadow-sm">
                  S
                </div>
                <div className="text-left">
                  <div className="font-display text-sm font-bold">Sri Sai IT Solutions</div>
                  <div className="text-xs text-muted-foreground">Hyderabad</div>
                </div>
              </div>

              <div className="hidden h-8 w-px bg-border sm:block"></div>

              {/* CircuitGrid Robotics */}
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-sunrise text-white font-bold shadow-sm">
                  C
                </div>
                <div className="text-left">
                  <div className="font-display text-sm font-bold">CircuitGrid Robotics</div>
                  <div className="text-xs text-muted-foreground">Hyderabad</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>© 2027 Government of Andhra Pradesh. All rights reserved.</span>
              <span>·</span>
              <button
                onClick={onOpenAdmin}
                className="text-primary hover:underline font-semibold cursor-pointer"
              >
                Officer Portal (Admin)
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Info Modal */}
      {legalModalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in text-foreground">
          <div className="relative w-full max-w-md rounded-3xl bg-card border border-border p-6 shadow-2xl">
            <button
              onClick={() => setLegalModalContent(null)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="font-display text-xl font-bold mb-3">{legalModalContent.title}</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-6">
              {legalModalContent.text}
            </p>
            <button
              onClick={() => setLegalModalContent(null)}
              className="w-full rounded-full gradient-sunrise py-2.5 text-xs font-semibold text-white shadow-glow"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
