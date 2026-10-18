import React from 'react';
import { X, TriangleAlert, PhoneCall, ShieldAlert, HeartPulse, Shield, LifeBuoy } from 'lucide-react';
import { VERIFIED_HELPLINES } from '../data/pushkaraluData';

export default function EmergencyModal({ isOpen, onClose, lang = 'te' }) {
  if (!isOpen) return null;

  const helplines = [
    {
      title: "All-India Emergency Response",
      titleTe: "జాతీయ అత్యవసర కాల్ (పోలీస్, ఫైర్, అంబులెన్స్)",
      number: "112",
      icon: <ShieldAlert className="h-5 w-5 text-rose-500" />,
      color: "border-rose-500/40 bg-rose-500/10",
      btnColor: "bg-rose-600 text-white",
      primary: true
    },
    {
      title: "Medical Emergency Ambulance",
      titleTe: "వైద్య అత్యవసర అంబులెన్స్ సేవ",
      number: "108",
      icon: <HeartPulse className="h-5 w-5 text-rose-500" />,
      color: "border-border bg-card",
      btnColor: "bg-primary text-primary-foreground"
    },
    {
      title: "Police Emergency Assistance",
      titleTe: "పోలీస్ అత్యవసర సహాయం",
      number: "100",
      icon: <Shield className="h-5 w-5 text-primary" />,
      color: "border-border bg-card",
      btnColor: "bg-primary text-primary-foreground"
    },
    {
      title: "Pushkaralu Central Control Room",
      titleTe: "పుష్కరాల కేంద్ర కంట్రోల్ రూమ్ (రాజమండ్రి)",
      number: "0883-2471234",
      icon: <LifeBuoy className="h-5 w-5 text-amber-500" />,
      color: "border-border bg-card",
      btnColor: "gradient-sunrise text-white"
    },
    {
      title: "Women Safety & Helpline",
      titleTe: "మహిళా భద్రతా హెల్ప్‌లైన్",
      number: "181",
      icon: <Shield className="h-5 w-5 text-purple-500" />,
      color: "border-border bg-card",
      btnColor: "bg-secondary text-foreground"
    },
    {
      title: "Rajahmundry Municipal Corporation",
      titleTe: "మున్సిపల్ కార్పొరేషన్ హెల్ప్‌డెస్క్",
      number: "0883-2471888",
      icon: <PhoneCall className="h-5 w-5 text-primary" />,
      color: "border-border bg-card",
      btnColor: "bg-secondary text-foreground"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-fade-in text-foreground">
      <div className="relative w-full max-w-xl rounded-3xl bg-card border border-destructive/40 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-destructive text-destructive-foreground shadow-lg">
            <TriangleAlert className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold">
              Pushkaralu Emergency Helpdesk
            </h3>
            <p className="text-xs text-muted-foreground">
              Official Verified 24×7 Helplines & First-Response Units
            </p>
          </div>
        </div>

        {/* Warning Callout */}
        <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-3.5 mb-6 text-xs text-destructive flex items-start gap-2.5">
          <TriangleAlert className="h-4 w-4 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>River Safety Alert:</strong> Never cross the barricaded river safety perimeter. Do not allow children near deep water currents. In case of drowning or medical distress, notify the nearest lifeguard tower immediately.
          </div>
        </div>

        {/* Helplines List */}
        <div className="space-y-3">
          {helplines.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-3.5 rounded-2xl border ${item.color} shadow-sm`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-background border border-border">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">
                    {lang === 'te' ? item.titleTe : item.title}
                  </div>
                  <div className="font-mono text-xs font-bold text-primary">
                    {item.number}
                  </div>
                </div>
              </div>

              <a
                href={`tel:${item.number.replace(/-/g, '')}`}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition shadow-sm hover:scale-105 shrink-0 ${item.btnColor}`}
              >
                <PhoneCall className="h-3.5 w-3.5" /> Call Now
              </a>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground border-t border-border/50 pt-4">
          Operated jointly by Andhra Pradesh Police, NDRF, SDRF & Endowments Dept.
        </div>
      </div>
    </div>
  );
}
