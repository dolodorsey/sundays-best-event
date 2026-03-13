"use client";
import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

// Icon stubs
const ArrowLeft = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>;
const ArrowRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const Crown = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m2 4 3 12h14l3-12-6 5-4-5-4 5-6-5z"/></svg>;
const MapPin = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const Calendar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const Users = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const Camera = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>;
const Music4 = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
const Sparkles = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/></svg>;
const Star = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ChevronRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const Wine = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 22h8M7 10h10M12 15v7M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/></svg>;
const Zap = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const Building2 = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 0-2 2h-2"/></svg>;

// import { useState } from "react";
// import { ArrowRight, Crown, MapPin, Calendar, Users, Camera, Music4, Sparkles, Star, ChevronRight, Wine, Zap, Building2, ArrowLeft } from "lucide-react";

// ─── SHARED TOKENS ────────────────────────────────────────────────────────────
const GOLD = {
  light: "#f2d39b",
  mid:   "#d8b26e",
  deep:  "#8b6b3d",
};

function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD.mid}40, transparent)` }} />
      <div className="w-1 h-1 rounded-full" style={{ background: GOLD.mid }} />
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD.mid}40, transparent)` }} />
    </div>
  );
}

function Pill({ label, accent }) {
  const color = accent || GOLD.mid;
  return (
    <span className="inline-flex items-center rounded-full px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ background: `${color}18`, color, border: `1px solid ${color}28` }}>
      {label}
    </span>
  );
}

function EventPageShell({ event, accentColor, glowColor, children }) {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#07070a", minHeight: "100vh" }}>
      {/* Nav */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12" style={{ background: "rgba(7,7,10,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.4)" }}>
            <ArrowLeft size={12} /> HUGLIFE
          </button>
          <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.12)" }} />
          <div>
            <div className="text-[9px] uppercase tracking-[0.35em]" style={{ color: accentColor }}>{event.tag}</div>
            <div className="text-base font-black text-white">{event.name}</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-7 text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
          {["Experience", "Cities", "VIP", "Partners", "Talent"].map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-white transition-colors">{n}</a>
          ))}
        </nav>

        <button className="rounded-full px-6 py-2.5 text-sm font-semibold" style={{ background: `linear-gradient(135deg, ${accentColor}, ${event.accentDeep})`, color: "#0a0a0c" }}>
          {event.primaryCTA}
        </button>
      </header>

      {children}

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-12 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="text-sm font-black mb-1" style={{ color: accentColor }}>{event.name}</div>
        <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>A HUGLIFE Experience · KHG Enterprise · {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NOIR
// ═══════════════════════════════════════════════════════════════════════════════
function NoirPage() {
  const event = { name: "NOIR", tag: "Selective Nightlife", primaryCTA: "Request Access", accentDeep: "#8b6b3d" };
  const accent = GOLD.mid;
  const drops = [
    { city: "Las Vegas", date: "May 25", status: "VIP Tables Open" },
    { city: "Miami", date: "June 8", status: "RSVP Live" },
    { city: "New York", date: "June 22", status: "Access Pending" },
    { city: "Atlanta", date: "April 26", status: "Early Access Active" },
  ];
  const tiers = [
    { name: "Sessions", sub: "3-Tier Service", price: "$1,500", perks: ["2–3 Guests", "1 Premium Spirit", "1 Champagne", "Dedicated Service"] },
    { name: "Prestige", sub: "3-Tier Service", price: "$2,500", perks: ["3–5 Guests", "2 Premium Spirits", "1 Champagne Magnum", "Dedicated Service"], featured: true },
    { name: "Grand", sub: "3-Tier Service", price: "$5,000", perks: ["5–8 Guests", "2 Premium Spirits", "2 Champagne Magnums", "Exclusive Benefits"] },
  ];
  const pillars = [
    { icon: Crown, title: "Curated Entry", body: "NOIR is built around controlled access, elevated crowd quality, and an arrival experience that carries weight." },
    { icon: Wine, title: "VIP Experience", body: "Bottle service, sections, concierge routing, and premium arrival treatment are central to the property." },
    { icon: MapPin, title: "City Prestige", body: "Each market feels like a selective cultural drop — not a recycled nightlife listing." },
    { icon: Building2, title: "Brand Partnerships", body: "NOIR supports premium sponsors, luxury activations, and nightlife-aligned placement opportunities." },
  ];

  return (
    <EventPageShell event={event} accentColor={accent} glowColor="rgba(216,178,110,0.15)">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden px-6 py-24 lg:px-12" style={{ background: "linear-gradient(180deg, #06060a 0%, #0e0c12 60%, #07070a 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[10%] w-[600px] h-[600px] rounded-full opacity-15" style={{ background: `radial-gradient(circle, ${GOLD.mid}25, transparent 70%)` }} />
          <div className="absolute bottom-10 left-[5%] w-[400px] h-[400px] rounded-full opacity-8" style={{ background: `radial-gradient(circle, ${GOLD.deep}20, transparent 70%)` }} />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "120px 120px" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_1fr] gap-16 items-end">
          <div>
            <Pill label="Access · VIP · Tables · City Drops · Sponsors" accent={GOLD.mid} />
            <h1 className="mt-8 text-6xl font-black tracking-[-0.055em] leading-[0.88] md:text-7xl xl:text-[6rem]" style={{ color: "#f0ece4" }}>
              The Art of
              <span className="block" style={{ color: "rgba(255,255,255,0.22)" }}>Being</span>
              <span className="block" style={{ backgroundImage: `linear-gradient(135deg, ${GOLD.light}, ${GOLD.mid}, ${GOLD.deep})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Selective.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 max-w-lg" style={{ color: "rgba(255,255,255,0.52)" }}>
              NOIR is a luxury nightlife property built around access, atmosphere, curation, and social prestige. The room is intentional. The energy is controlled. The memory is premium.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button className="rounded-full px-8 py-3.5 text-sm font-semibold" style={{ background: `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})`, color: "#0a0a0c" }}>Request Access</button>
              <button className="rounded-full px-8 py-3.5 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.82)", border: "1px solid rgba(255,255,255,0.1)" }}>Reserve VIP Table</button>
              <button className="rounded-full px-6 py-3.5 text-sm font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>Upcoming Cities →</button>
            </div>
          </div>

          {/* Visual panel */}
          <div className="hidden lg:block rounded-[2.5rem] overflow-hidden relative" style={{ background: "linear-gradient(145deg, #101012, #181216, #2a2118)", border: `1px solid rgba(255,255,255,0.08)`, minHeight: "560px" }}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 70% 30%, ${GOLD.mid}18, transparent 55%)` }} />
            <div className="relative z-10 p-8 flex flex-col justify-between h-full" style={{ minHeight: "560px" }}>
              <div className="text-[10px] uppercase tracking-[0.4em]" style={{ color: GOLD.mid }}>Upcoming Locations & RSVP</div>
              <div className="mt-4 text-2xl font-black" style={{ color: "#f0ece4" }}>Are You On the List?</div>
              <div className="mt-6 grid gap-3">
                {drops.slice(0,3).map((d) => (
                  <div key={d.city} className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="absolute inset-0 rounded-2xl" style={{ background: `linear-gradient(135deg, ${GOLD.mid}08, transparent)` }} />
                    <div className="relative z-10">
                      <div className="font-black text-base" style={{ color: "#f0ece4" }}>{d.city}</div>
                      <div className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{d.date}</div>
                      <button className="mt-3 rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ background: `linear-gradient(135deg, ${GOLD.mid}30, ${GOLD.deep}20)`, color: GOLD.light, border: `1px solid ${GOLD.mid}30` }}>
                        RSVP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
                View All Events & Cities →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="experience" className="py-24 px-6 lg:px-12" style={{ background: "#07070a" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: GOLD.mid }}>The NOIR Experience</div>
          <h2 className="text-4xl font-black tracking-[-0.04em]" style={{ color: "#f0ece4" }}>What Sets NOIR Apart</h2>
          <GoldDivider />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${GOLD.mid}18`, border: `1px solid ${GOLD.mid}25` }}>
                    <Icon size={18} style={{ color: GOLD.mid }} />
                  </div>
                  <h4 className="font-black text-sm mb-2" style={{ color: "#f0ece4" }}>{p.title}</h4>
                  <p className="text-xs leading-6" style={{ color: "rgba(255,255,255,0.45)" }}>{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VIP Tiers */}
      <section id="vip" className="py-24 px-6 lg:px-12" style={{ background: "linear-gradient(180deg, #07070a 0%, #0a0810 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: GOLD.mid }}>VIP Tables & Bottle Service</div>
            <h2 className="text-4xl font-black tracking-[-0.04em]" style={{ color: "#f0ece4" }}>Elevate Your Brand Within NOIR</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-7 relative overflow-hidden"
                style={{
                  background: t.featured ? `linear-gradient(145deg, ${GOLD.mid}20, ${GOLD.deep}12)` : "rgba(255,255,255,0.03)",
                  border: t.featured ? `1px solid ${GOLD.mid}40` : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {t.featured && (
                  <div className="absolute top-0 right-0 rounded-bl-2xl rounded-tr-2xl px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em]" style={{ background: `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})`, color: "#0a0a0c" }}>
                    Most Popular
                  </div>
                )}
                <div className="text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: t.featured ? GOLD.light : "rgba(255,255,255,0.4)" }}>{t.sub}</div>
                <div className="text-2xl font-black" style={{ color: t.featured ? GOLD.light : "#f0ece4" }}>{t.name}</div>
                <div className="text-4xl font-black mt-3" style={{ color: t.featured ? GOLD.mid : "#f0ece4" }}>{t.price}</div>
                <ul className="mt-5 space-y-2">
                  {t.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: t.featured ? GOLD.mid : "rgba(255,255,255,0.3)" }} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full rounded-full py-3 text-sm font-semibold" style={{ background: t.featured ? `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})` : "rgba(255,255,255,0.06)", color: t.featured ? "#0a0a0c" : "rgba(255,255,255,0.7)", border: t.featured ? "none" : "1px solid rgba(255,255,255,0.1)" }}>
                  Reserve VIP Table
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Drops */}
      <section id="cities" className="py-24 px-6 lg:px-12" style={{ background: "#07070a" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: GOLD.mid }}>City Drops</div>
          <h2 className="text-4xl font-black tracking-[-0.04em] mb-12" style={{ color: "#f0ece4" }}>Upcoming Locations & RSVP</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {drops.map((d) => (
              <div key={d.city} className="rounded-2xl p-6 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div>
                  <div className="font-black text-lg" style={{ color: "#f0ece4" }}>{d.city}</div>
                  <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{d.date}</div>
                  <Pill label={d.status} accent={GOLD.mid} />
                </div>
                <button className="rounded-full px-6 py-2.5 text-sm font-semibold" style={{ background: `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})`, color: "#0a0a0c" }}>
                  RSVP
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </EventPageShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GENERIC EVENT PAGE BUILDER (used for all non-NOIR events)
// ═══════════════════════════════════════════════════════════════════════════════
function GenericEventPage({ config }) {
  const { name, tag, tagline, body, primaryCTA, secondaryCTA, accent, accentDeep, glow, mood, moodItems, features, cities, status } = config;
  const event = { name, tag, primaryCTA, accentDeep };

  return (
    <EventPageShell event={event} accentColor={accent} glowColor={glow}>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden px-6 py-24 lg:px-12" style={{ background: "linear-gradient(180deg, #06060a 0%, #0d0b10 60%, #07070a 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 right-[8%] w-[500px] h-[500px] rounded-full opacity-12" style={{ background: `radial-gradient(circle, ${accent}30, transparent 70%)` }} />
          <div className="absolute bottom-0 left-[5%] w-[350px] h-[350px] rounded-full opacity-8" style={{ background: `radial-gradient(circle, ${accentDeep}20, transparent 70%)` }} />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "120px 120px" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <Pill label={tag} accent={accent} />
            <h1 className="mt-8 text-6xl font-black tracking-[-0.05em] leading-[0.9] md:text-7xl xl:text-[5.5rem]" style={{ color: "#f0ece4" }}>
              {name}
            </h1>
            <div className="mt-3 text-2xl font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>{tagline}</div>
            <p className="mt-6 text-lg leading-8 max-w-xl" style={{ color: "rgba(255,255,255,0.52)" }}>{body}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <button className="rounded-full px-8 py-3.5 text-sm font-semibold" style={{ background: `linear-gradient(135deg, ${accent}, ${accentDeep})`, color: "#0a0a0c" }}>
                {primaryCTA}
              </button>
              <button className="rounded-full px-8 py-3.5 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.82)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {secondaryCTA}
              </button>
            </div>

            {/* Mood */}
            <div className="mt-12">
              <div className="text-[10px] uppercase tracking-[0.35em] mb-3" style={{ color: "rgba(255,255,255,0.28)" }}>Atmosphere</div>
              <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{mood}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Status banner */}
      <div className="px-6 py-4 lg:px-12" style={{ background: `${accent}12`, borderTop: `1px solid ${accent}20`, borderBottom: `1px solid ${accent}20` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
            <span className="text-[11px] uppercase tracking-[0.3em] font-semibold" style={{ color: accent }}>{status}</span>
          </div>
          <button className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
            View Upcoming Cities →
          </button>
        </div>
      </div>

      {/* Features */}
      <section className="py-24 px-6 lg:px-12" style={{ background: "#07070a" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: accent }}>The Experience</div>
          <h2 className="text-4xl font-black tracking-[-0.04em] mb-3" style={{ color: "#f0ece4" }}>What Makes {name} Different</h2>
          <GoldDivider />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded-2xl p-6 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-8" style={{ background: `radial-gradient(circle, ${accent}, transparent)`, transform: "translate(50%, -50%)" }} />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${accent}18`, border: `1px solid ${accent}25` }}>
                      <Icon size={18} style={{ color: accent }} />
                    </div>
                    <h4 className="font-black text-sm mb-2" style={{ color: "#f0ece4" }}>{f.title}</h4>
                    <p className="text-xs leading-6" style={{ color: "rgba(255,255,255,0.45)" }}>{f.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mood items */}
      <section className="py-24 px-6 lg:px-12" style={{ background: "linear-gradient(180deg, #07070a 0%, #0a0810 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: accent }}>Signature Moments</div>
          <h2 className="text-4xl font-black tracking-[-0.04em] mb-12" style={{ color: "#f0ece4" }}>The Moments People Come For</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {moodItems.map((item, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-3xl font-black mb-3" style={{ color: `${accent}30` }}>0{i + 1}</div>
                <div className="font-black text-sm" style={{ color: "#f0ece4" }}>{item.title}</div>
                <p className="text-xs leading-6 mt-2" style={{ color: "rgba(255,255,255,0.42)" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section id="cities" className="py-24 px-6 lg:px-12" style={{ background: "#07070a" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: accent }}>Active Markets</div>
          <h2 className="text-4xl font-black tracking-[-0.04em] mb-12" style={{ color: "#f0ece4" }}>Where {name} Lives</h2>
          <div className="flex flex-wrap gap-3">
            {cities.map((c) => (
              <button
                key={c}
                className="rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-10 flex gap-4">
            <button className="rounded-full px-8 py-3.5 text-sm font-semibold" style={{ background: `linear-gradient(135deg, ${accent}, ${accentDeep})`, color: "#0a0a0c" }}>
              {primaryCTA}
            </button>
            <button className="rounded-full px-6 py-3.5 text-sm font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
              Bring {name} to Your City →
            </button>
          </div>
        </div>
      </section>
    </EventPageShell>
  );
}

// ─── EVENT CONFIGS ────────────────────────────────────────────────────────────
const TASTE_OF_ART = {
  name: "Taste of Art",
  tag: "Canvas, Cuisine & Culture",
  tagline: "Where the Canvas Becomes the Table.",
  body: "An immersive social experience where food, creativity, culture, and conversation live in the same frame. Art is the atmosphere. Cuisine is the medium. Your presence is the statement.",
  primaryCTA: "Enter Taste of Art",
  secondaryCTA: "Reserve VIP Table",
  accent: "#c9a87a",
  accentDeep: "#7d5a3c",
  glow: "rgba(201,168,122,0.15)",
  mood: "Cream · Wine · Brushstroke · Gold · Candlelight · Intimate",
  status: "April 12 — Atlanta · Tickets Open",
  cities: ["Atlanta", "Los Angeles", "Washington DC", "Houston", "Charlotte"],
  features: [
    { icon: Sparkles, title: "Live Art Installation", body: "Artists create in real time as guests dine, move, and gather. The canvas is never finished before you arrive." },
    { icon: Crown, title: "Curated Cuisine", body: "Elevated food concepts aligned with the artistic theme. Every dish is part of the exhibit." },
    { icon: Camera, title: "Cultural Conversation", body: "Taste of Art creates the conditions for meaningful social exchange between creatives, collectors, and culture-forward guests." },
    { icon: Building2, title: "Brand Activation Space", body: "Sponsors gain access to a culturally sensitive, aesthetically intentional audience in an intimate setting." },
    { icon: Users, title: "Private Access Tiers", body: "Select guests gain early access, artist meet-and-greet, and private dining within the installation." },
    { icon: Wine, title: "Premium Beverage Program", body: "Curated wine, spirits, and craft cocktail programming aligned with each city&apos;s cultural identity." },
  ],
  moodItems: [
    { title: "The First Glance", body: "Guests enter and the room stops them. The art does the work before a word is spoken." },
    { title: "The Tasting Moment", body: "A dish arrives that matches the wall behind it. Conversation ignites naturally." },
    { title: "The Artist Exchange", body: "A guest approaches the live installation. A connection forms in real time." },
    { title: "The Repost Frame", body: "Every angle of the room is designed to be photographed and shared without prompting." },
  ],
};

const REMIX = {
  name: "REMIX",
  tag: "The Mashup Music Experience",
  tagline: "Where Sounds Collide and the Room Shifts.",
  body: "A high-energy sound-driven experience where genres collide and the crowd has range. No rules. No predictable playlist. Pure room momentum built around musical tension and release.",
  primaryCTA: "Get Tickets",
  secondaryCTA: "Book as DJ / Talent",
  accent: "#c8c8d8",
  accentDeep: "#5a5a7a",
  glow: "rgba(200,200,216,0.12)",
  mood: "Obsidian · Electric Silver · Sound Bars · Motion Energy",
  status: "Upcoming — Multi-City",
  cities: ["Atlanta", "Houston", "Charlotte", "Miami"],
  features: [
    { icon: Music4, title: "Genre Collision", body: "REMIX deliberately layers incompatible genres until the room decides what fits. The crowd becomes the curators." },
    { icon: Zap, title: "Energy Engineering", body: "Sound design, lighting, and crowd flow are choreographed as a single system." },
    { icon: Users, title: "Audience as Artist", body: "REMIX builds interactive request moments, live voting, and crowd energy into the show structure." },
    { icon: Camera, title: "Content-Ready Moments", body: "Peak moments are designed to create the exact clip that travels after the room clears." },
    { icon: Building2, title: "Sponsor Sound Integration", body: "Brand activations woven into the sonic experience — not placed beside it." },
    { icon: Crown, title: "DJ Talent Network", body: "REMIX draws from HUGLIFE's curated talent network — city-matched, genre-flexible, crowd-aware." },
  ],
  moodItems: [
    { title: "The First Drop", body: "The room expects one genre. Another arrives. The floor shifts." },
    { title: "The Crowd Read", body: "The DJ reads the room mid-set and pivots. Everyone feels it." },
    { title: "The Mash Peak", body: "Two sounds collide in real time and the room erupts without warning." },
    { title: "The Clip Moment", body: "The moment everyone captures on their phones and sends before they leave." },
  ],
};

const SUNDAYS_BEST = {
  name: "Sunday's Best",
  tag: "Where Style Meets Sun",
  tagline: "Fashion, Brunch, and Rooftop Energy.",
  body: "A daytime social experience where fashion, brunch, music, and rooftop energy come together with polish. Sun-soaked luxury at its most curated — for the people who do Sunday right.",
  primaryCTA: "Get Tickets",
  secondaryCTA: "Reserve Brunch Table",
  accent: "#e8c97a",
  accentDeep: "#9a7b42",
  glow: "rgba(232,201,122,0.15)",
  mood: "Champagne · Ivory · Warm Gold · Rooftop · Daylight Glow",
  status: "Upcoming — Summer Rollout",
  cities: ["Atlanta", "Miami", "Los Angeles", "Houston", "Charlotte"],
  features: [
    { icon: Star, title: "Fashion Showcase", body: "Sunday's Best is built around the visual — guests arrive dressed and the event celebrates that intentionally." },
    { icon: Wine, title: "Elevated Brunch Programming", body: "Curated food and cocktail programming that shifts from brunch energy into afternoon luxury." },
    { icon: Music4, title: "Live Sound Curation", body: "Soft R&B, Afrobeats, House, and soul programming timed to the movement of the sun." },
    { icon: Camera, title: "Photo Activation Zones", body: "Rooftop frames, branded backdrops, and editorial moments built into the layout." },
    { icon: Crown, title: "VIP Table Service", body: "Premium table reservations with bottle service and dedicated host routing." },
    { icon: Users, title: "Social Network Effect", body: "Sunday's Best is where city social circles overlap. The crowd is the product." },
  ],
  moodItems: [
    { title: "The Arrival Fit", body: "Guests arrive looking like editorial. The crowd notices immediately." },
    { title: "The First Pour", body: "Champagne at noon. The energy lifts. Sunday begins." },
    { title: "The Rooftop Peak", body: "The sun drops slightly. The music rises. The room reaches its peak." },
    { title: "The Late Afternoon Vibe", body: "Energy transitions from brunch to late-day luxury without missing a beat." },
  ],
};

const GANGSTA_GOSPEL = {
  name: "Gangsta Gospel",
  tag: "Not Your Average Sunday Service",
  tagline: "Soulful. Rebellious. Unforgettable.",
  body: "A bold cultural gathering blending spiritual undertones, cultural expression, and unforgettable room energy. Church clothes optional. Presence is mandatory. The room remembers everyone who showed up.",
  primaryCTA: "Get Access",
  secondaryCTA: "Join the Choir",
  accent: "#b87a5a",
  accentDeep: "#6b3a28",
  glow: "rgba(184,122,90,0.15)",
  mood: "Burgundy · Cream · Stained-Light · Black · Soul · Fire",
  status: "Upcoming — Select Cities",
  cities: ["Atlanta", "Houston", "DC", "Charlotte"],
  features: [
    { icon: Sparkles, title: "Spiritual Energy", body: "Gangsta Gospel builds a room that feels sacred without being traditional. The spiritual undertone is intentional." },
    { icon: Music4, title: "Gospel x Culture Music", body: "Choir arrangements meeting hip-hop production. Sacred melodies colliding with cultural sound." },
    { icon: Users, title: "Community Gathering Energy", body: "Gangsta Gospel draws the community together across generations and backgrounds." },
    { icon: Camera, title: "Visual Spectacle", body: "Stained-light aesthetics, dramatic staging, and robes-and-streetwear contrast built for documentation." },
    { icon: Crown, title: "Curated Access", body: "Entry to Gangsta Gospel is earned through early access lists and community-first allocation." },
    { icon: Star, title: "Cultural Statement", body: "This event is a statement about where Black culture, faith, and creative expression intersect." },
  ],
  moodItems: [
    { title: "The Processional", body: "Guests enter to something that sounds like church but feels like a party about to start." },
    { title: "The First Verse", body: "The music shifts and the room recognizes something familiar in an unexpected form." },
    { title: "The Crowd Testimony", body: "A moment emerges where the room collectively raises its energy to something transcendent." },
    { title: "The Send-Off", body: "The closing feels like a benediction. Everyone leaves moved." },
  ],
};

const WRST_BHVR = {
  name: "WRST BHVR",
  tag: "Napkin Wars Edition",
  tagline: "Where the Napkins Fly and the Room Goes Up.",
  body: "A high-impact celebration built for spectacle, participation, chaos, and the kind of moment people do not forget. The room becomes the content. The chaos is the product. Everyone goes home with a story.",
  primaryCTA: "Get Tickets",
  secondaryCTA: "Reserve a Section",
  accent: "#c8c8c8",
  accentDeep: "#6a6a6a",
  glow: "rgba(200,200,200,0.10)",
  mood: "Black · Chrome · Silver Motion Bursts · High-Energy White",
  status: "Upcoming — Major City Drops",
  cities: ["Atlanta", "Houston", "Charlotte", "Miami", "Las Vegas"],
  features: [
    { icon: Zap, title: "The Napkin Wars Spectacle", body: "Napkins fly. Rooms erupt. WRST BHVR creates the specific kind of chaos that becomes a city legend." },
    { icon: Camera, title: "Built for Documentation", body: "Every moment is designed to be captured. The spectacle is the content." },
    { icon: Music4, title: "High-Impact Sound", body: "The sound programming is engineered to trigger the moments — not accompany them." },
    { icon: Crown, title: "Section & VIP Commanding", body: "Premium sections have the best sightlines for the war. Tables come with participation packs." },
    { icon: Users, title: "Full Crowd Participation", body: "WRST BHVR is the rare experience where the entire room is the show." },
    { icon: Building2, title: "Sponsor Activation", body: "Brands own specific spectacle moments. Premium product placement during the chaos peak." },
  ],
  moodItems: [
    { title: "The Warning Drop", body: "The DJ signals. The room knows what's coming. Energy builds." },
    { title: "The First Launch", body: "One section starts. Then the whole room follows. Chaos is coordinated." },
    { title: "The Peak Moment", body: "Everything flying. Cameras everywhere. The room hits its peak simultaneously." },
    { title: "The Aftermath", body: "The room settles. Everyone is laughing. The clips are already uploading." },
  ],
};

const PAPARAZZI = {
  name: "Paparazzi",
  tag: "The Ultimate Pop-Up Photo Moment Experience",
  tagline: "Built for the Moment Everyone Posts.",
  body: "A visibility-driven event concept built around flash moments, camera-ready arrivals, and social proof in real time. Every angle is an entrance. Every moment is a post. The audience and the subject are the same person.",
  primaryCTA: "Get Tickets",
  secondaryCTA: "Request Press Access",
  accent: "#e8e8e8",
  accentDeep: "#8a8a8a",
  glow: "rgba(232,232,232,0.08)",
  mood: "Flash-White · Chrome · Camera Red · Obsidian · Status Theatre",
  status: "Upcoming — Select Markets",
  cities: ["Atlanta", "Miami", "Los Angeles", "New York"],
  features: [
    { icon: Camera, title: "The Arrival Moment", body: "The entrance is designed to feel like a red carpet. Guests arrive into cameras and attention." },
    { icon: Star, title: "Flash Activation Zones", body: "Strategically positioned lighting and photo activation stations throughout the venue." },
    { icon: Sparkles, title: "Status Staging", body: "The event builds a hierarchy of visibility. VIP moments are elevated and documented differently." },
    { icon: Users, title: "Creator & Influencer Access", body: "Paparazzi has dedicated access paths for documented creators and social personalities." },
    { icon: Crown, title: "Brand Placement", body: "Sponsor logos and products appear in every organic capture — not forced, just positioned." },
    { icon: Building2, title: "Press & Media Access", body: "Paparazzi supports legitimate press access, recap reels, and content-first documentation partnerships." },
  ],
  moodItems: [
    { title: "The Red Carpet Arrival", body: "Guests enter to cameras, flashes, and audience energy. The arrival is the event." },
    { title: "The Recognition Moment", body: "Someone spots someone. The cameras pivot. The room gets electric." },
    { title: "The Perfect Frame", body: "A guest finds the ideal light, the ideal angle, and creates the clip of the night." },
    { title: "The Viral Second", body: "A moment emerges that nobody planned. Everyone captures it simultaneously." },
  ],
};

const PAWCHELLA = {
  name: "Pawchella",
  tag: "Dog Lover's Festival",
  tagline: "A Festival World for Dog Lovers and Their People.",
  body: "A premium lifestyle festival for the dog-obsessed — community moments, brand activations, and playful cultural energy. Canines welcome. Energy required. Come ready to be part of the pack.",
  primaryCTA: "Get Festival Tickets",
  secondaryCTA: "Partner / Sponsor",
  accent: "#c8b87a",
  accentDeep: "#7a6842",
  glow: "rgba(200,184,122,0.15)",
  mood: "Warm Ivory · Sage · Gold Pop · Premium Playful · Community Joy",
  status: "Planned — 2026 Festival Season",
  cities: ["Atlanta", "Austin", "Charlotte", "Tampa"],
  features: [
    { icon: Sparkles, title: "Festival Grounds", body: "Multi-zone layout with dog play spaces, vendor rows, food courts, and entertainment stages." },
    { icon: Star, title: "Premium Dog Culture", body: "This is not a regular dog park event. Pawchella is a luxury lifestyle festival that happens to include dogs." },
    { icon: Camera, title: "Content Activation", body: "Photo zones, branded moments, and dog-and-owner portrait stations throughout the grounds." },
    { icon: Building2, title: "Sponsor Village", body: "Brand partners get dedicated activation space within the festival ecosystem." },
    { icon: Users, title: "Community-First Design", body: "Pawchella builds real community between dog owners, creators, and lifestyle brands." },
    { icon: Crown, title: "VIP Paw Lounge", body: "Premium access area with elevated food, private dog play space, and dedicated service." },
  ],
  moodItems: [
    { title: "The Pack Arrival", body: "Hundreds of dogs and their humans enter simultaneously. The energy is immediate." },
    { title: "The Vendor Discovery", body: "A guest finds a dog brand they've never heard of that becomes a favorite." },
    { title: "The Portrait Moment", body: "The perfect owner-and-dog photo happens naturally. Everyone nearby captures it." },
    { title: "The Community Connection", body: "Two strangers bond over their dogs. A community forms organically." },
  ],
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function HUGLIFEEventInternalPagesV3() {
  const pages = [
    { id: "noir", label: "NOIR", accent: GOLD.mid },
    { id: "taste", label: "Taste of Art", accent: "#c9a87a" },
    { id: "remix", label: "REMIX", accent: "#c8c8d8" },
    { id: "sundays", label: "Sunday's Best", accent: "#e8c97a" },
    { id: "gangsta", label: "Gangsta Gospel", accent: "#b87a5a" },
    { id: "wrst", label: "WRST BHVR", accent: "#c8c8c8" },
    { id: "paparazzi", label: "Paparazzi", accent: "#e8e8e8" },
    { id: "pawchella", label: "Pawchella", accent: "#c8b87a" },
  ];

  const [current, setCurrent] = useState("noir");

  return (
    <div style={{ background: "#07070a" }}>
      {/* Event Switcher */}
      <div className="sticky top-0 z-[100]" style={{ background: "rgba(6,6,10,0.96)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex overflow-x-auto gap-1 px-4 py-3 scrollbar-none">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setCurrent(p.id)}
              className="flex-shrink-0 rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 whitespace-nowrap"
              style={{
                background: current === p.id ? `${p.accent}20` : "transparent",
                color: current === p.id ? p.accent : "rgba(255,255,255,0.35)",
                border: `1px solid ${current === p.id ? p.accent + "35" : "transparent"}`,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Page */}
      {current === "noir" && <NoirPage />}
      {current === "taste" && <GenericEventPage config={TASTE_OF_ART} />}
      {current === "remix" && <GenericEventPage config={REMIX} />}
      {current === "sundays" && <GenericEventPage config={SUNDAYS_BEST} />}
      {current === "gangsta" && <GenericEventPage config={GANGSTA_GOSPEL} />}
      {current === "wrst" && <GenericEventPage config={WRST_BHVR} />}
      {current === "paparazzi" && <GenericEventPage config={PAPARAZZI} />}
      {current === "pawchella" && <GenericEventPage config={PAWCHELLA} />}
    </div>
  );
}


// ─── STANDALONE EXPORT ────────────────────────────────────────────────────────
export default function SundaysBestPage() {
  return <GenericEventPage config={SUNDAYS_BEST} />;
}
