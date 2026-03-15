"use client";
import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const accent = "#e8c97a";
const accentDeep = "#9a7b42";
const glow = "rgba(232,201,122,0.15)";
const serif = "'Cormorant Garamond','Playfair Display',Georgia,serif";
const sans = "'DM Sans','Inter',system-ui,sans-serif";
const bg = "#07070a";
const surface = "#0a0900";
const cream = "#f0ece4";
const muted = "rgba(255,255,255,0.48)";
const dim = "rgba(255,255,255,0.22)";
const border = "rgba(255,255,255,0.08)";

// ─── GRAIN ────────────────────────────────────────────────────────────────────
const Grain = () => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
    opacity: 0.04,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  }} />
);

// ─── REVEAL ───────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{
      transform: v ? "translateY(0)" : "translateY(60px)",
      opacity: v ? 1 : 0,
      transition: `all 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "14px clamp(24px,4vw,72px)" : "24px clamp(24px,4vw,72px)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: scrolled ? "rgba(7,7,10,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(28px)" : "none",
      borderBottom: scrolled ? `1px solid ${border}` : "none",
      transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div>
        <div style={{ fontFamily: sans, fontSize: 8, letterSpacing: "0.5em", textTransform: "uppercase", color: accent, marginBottom: 2 }}>A HUGLIFE Experience</div>
        <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 600, color: cream, letterSpacing: "0.04em" }}>Sunday's Best</div>
      </div>
      <div style={{ display: "flex", gap: "clamp(16px,2.5vw,36px)", alignItems: "center" }}>
        {["Experience","Cities","VIP","Access"].map(n => (
          <a key={n} href="#" style={{ fontFamily: sans, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: muted, textDecoration: "none" }}>{n}</a>
        ))}
        <a href="https://huglife.vercel.app/#tickets" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}><button>Get Tickets</button></a>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  return (
    <section style={{
      minHeight: "100vh", position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
      padding: "0 clamp(32px,6vw,96px) 96px",
      background: `radial-gradient(ellipse at 65% 15%, ${glow} 0%, transparent 55%), radial-gradient(ellipse at 20% 85%, rgba(0,0,0,0.5) 0%, transparent 55%), ${bg}`,
    }}>
      <Grain />
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "120px 120px",
      }} />
      <div style={{ position: "absolute", top: "8%", right: "6%", width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle, ${glow}, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <div style={{
          fontFamily: sans, fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase",
          color: accent, marginBottom: 28,
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(12px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}>
          {"Where Style Meets Sun"} &nbsp;·&nbsp; {"Summer 2026 · Multi-City"}
        </div>
        <h1 style={{
          fontFamily: serif, fontSize: "clamp(64px,11vw,160px)", fontWeight: 600,
          lineHeight: 0.86, letterSpacing: "-0.03em", color: cream,
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(44px)",
          transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.4s",
          maxWidth: "80vw",
        }}>
          Fashion, Brunch, and Rooftop Energy
        </h1>
        <div style={{
          marginTop: 36, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(24px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s",
        }}>
          <a href="https://huglife.vercel.app/#tickets" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}><button>Get Tickets</button></a>
          <button style={{
            fontFamily: sans, fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase",
            color: muted, background: "rgba(255,255,255,0.05)", border: `1px solid ${border}`,
            padding: "16px 36px", cursor: "pointer",
          }}>Reserve Brunch Table</button>
        </div>
        <div style={{
          marginTop: 72, paddingTop: 32, borderTop: `1px solid ${border}`,
          display: "flex", gap: "clamp(24px,4vw,56px)", alignItems: "center",
          opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease 1.1s",
        }}>
          {[["5+", "Cities"], ["2026", "Season"], ["KHG", "Enterprise"]].map(([val, lbl]) => (
            <div key={lbl}>
              <div style={{ fontFamily: serif, fontSize: "clamp(28px,3vw,44px)", fontWeight: 600, color: cream, lineHeight: 1 }}>{val}</div>
              <div style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: muted, marginTop: 6 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BODY COPY ────────────────────────────────────────────────────────────────
function About() {
  return (
    <section style={{ padding: "clamp(80px,12vw,160px) clamp(32px,6vw,96px)", maxWidth: 1400, margin: "0 auto" }}>
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "clamp(40px,6vw,96px)", alignItems: "start" }}>
          <div>
            <div style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: accent, marginBottom: 16 }}>The Experience</div>
            <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
          </div>
          <div>
            <p style={{ fontFamily: serif, fontSize: "clamp(22px,2.5vw,34px)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.02em", color: cream, fontStyle: "italic" }}>
              A daytime social experience where fashion, brunch, music, and rooftop energy come together with polish. Sun-soaked luxury at its most curated — for the people who do Sunday right.
            </p>
            <p style={{ marginTop: 24, fontFamily: sans, fontSize: 14, lineHeight: 1.9, color: muted }}>
              Sunday's Best is a production of The Kollective Hospitality Group — built to operate across major cities with consistency, identity, and cultural authority. Each city drop is intentional.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────
function Features() {
  return (
    <section style={{ padding: "0 clamp(32px,6vw,96px) clamp(80px,10vw,140px)", maxWidth: 1400, margin: "0 auto" }}>
      <Reveal>
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: accent, marginBottom: 16 }}>What&apos;s Inside</div>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(40px,5vw,72px)", fontWeight: 600, color: cream, lineHeight: 0.9, letterSpacing: "-0.03em" }}>
            Built For<br /><em>The Room</em>
          </h2>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 1, background: border }}>
        
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "32px",
          transition: "border-color 0.3s"
        }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${accent}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <span style={{ color: accent, fontSize: 18 }}>☀</span>
          </div>
          <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: cream, letterSpacing: "-0.02em", marginBottom: 10 }}>Rooftop Setting</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: muted }}>Sunday's Best lives at elevation. Rooftop venues, open air, and views that match the energy of the crowd.</div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "32px",
          transition: "border-color 0.3s"
        }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${accent}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <span style={{ color: accent, fontSize: 18 }}>◆</span>
          </div>
          <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: cream, letterSpacing: "-0.02em", marginBottom: 10 }}>Fashion Forward</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: muted }}>Dress codes matter. Sunday's Best rewards the dressed — fashion is part of the atmosphere, not the afterthought.</div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "32px",
          transition: "border-color 0.3s"
        }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${accent}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <span style={{ color: accent, fontSize: 18 }}>♦</span>
          </div>
          <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: cream, letterSpacing: "-0.02em", marginBottom: 10 }}>Brunch Program</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: muted }}>Elevated brunch menus anchored in each city's food culture. Not bottomless mimosas — curated dining moments.</div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "32px",
          transition: "border-color 0.3s"
        }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${accent}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <span style={{ color: accent, fontSize: 18 }}>◎</span>
          </div>
          <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: cream, letterSpacing: "-0.02em", marginBottom: 10 }}>Daylist Music</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: muted }}>Curated daytime sounds across R&B, afrobeats, soul, and house. Energy that builds without rushing.</div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "32px",
          transition: "border-color 0.3s"
        }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${accent}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <span style={{ color: accent, fontSize: 18 }}>▲</span>
          </div>
          <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: cream, letterSpacing: "-0.02em", marginBottom: 10 }}>Influencer & Creator Access</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: muted }}>Sunday's Best is built to be seen. Content creation pathways, photo-ready environments, and creator zones.</div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "32px",
          transition: "border-color 0.3s"
        }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${accent}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <span style={{ color: accent, fontSize: 18 }}>●</span>
          </div>
          <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: cream, letterSpacing: "-0.02em", marginBottom: 10 }}>Brand Partnerships</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: muted }}>Premium fashion, lifestyle, and beverage brands find a natural home in Sunday's Best activations.</div>
        </div>
      </div>
    </section>
  );
}

// ─── MOMENTS ─────────────────────────────────────────────────────────────────
function Moments() {
  return (
    <section style={{ padding: "clamp(80px,10vw,140px) clamp(32px,6vw,96px)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,80px)", alignItems: "start" }}>
        <Reveal>
          <div style={{ position: "sticky", top: 120 }}>
            <div style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: accent, marginBottom: 16 }}>The Moments</div>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(40px,5vw,72px)", fontWeight: 600, color: cream, lineHeight: 0.9, letterSpacing: "-0.03em", marginBottom: 32 }}>
              What You&apos;ll<br /><em>Remember</em>
            </h2>
            <div style={{ width: 80, height: 1, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
          </div>
        </Reveal>
        <div>
          
        <div style={{
          position: "relative",
          padding: "40px 32px",
          borderTop: i === 0 ? "none" : `1px solid ${border}`,
        }}>
          <div style={{ fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: accent, marginBottom: 12 }}>01</div>
          <div style={{ fontFamily: serif, fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 600, color: cream, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 16 }}>The Entrance</div>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: muted }}>Sunday's Best is a fashion show before the music starts. The arrival is its own moment.</div>
        </div>
        <div style={{
          position: "relative",
          padding: "40px 32px",
          borderTop: i === 0 ? "none" : `1px solid ${border}`,
        }}>
          <div style={{ fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: accent, marginBottom: 12 }}>02</div>
          <div style={{ fontFamily: serif, fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 600, color: cream, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 16 }}>The Midday Peak</div>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: muted }}>Around 2PM, the energy crests. The brunch plates clear, the music lifts, and the crowd finds its rhythm.</div>
        </div>
        <div style={{
          position: "relative",
          padding: "40px 32px",
          borderTop: i === 0 ? "none" : `1px solid ${border}`,
        }}>
          <div style={{ fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: accent, marginBottom: 12 }}>03</div>
          <div style={{ fontFamily: serif, fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 600, color: cream, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 16 }}>The Golden Hour</div>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: muted }}>Late afternoon light + rooftop + the right record. Sunday's Best was built for this specific moment.</div>
        </div>
        <div style={{
          position: "relative",
          padding: "40px 32px",
          borderTop: i === 0 ? "none" : `1px solid ${border}`,
        }}>
          <div style={{ fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: accent, marginBottom: 12 }}>04</div>
          <div style={{ fontFamily: serif, fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 600, color: cream, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 16 }}>The Content Wave</div>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: muted }}>By 4PM, the feeds are full. Sunday's Best becomes the city's afternoon aesthetic.</div>
        </div>
        </div>
      </div>
    </section>
  );
}

// ─── CITIES ──────────────────────────────────────────────────────────────────
function Cities() {
  return (
    <section style={{ padding: "clamp(80px,10vw,140px) clamp(32px,6vw,96px)", background: surface, position: "relative", overflow: "hidden" }}>
      <Grain />
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: accent, marginBottom: 16 }}>Where We Land</div>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(40px,5vw,72px)", fontWeight: 600, color: cream, lineHeight: 0.9, letterSpacing: "-0.03em" }}>
              The Cities
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 0, marginBottom: 48 }}>
            <span key="Atlanta" style={{ display:"inline-block", padding:"8px 20px", border:`1px solid ${accent}28`, color: accent, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", marginRight: 8, marginBottom: 8 }}>Atlanta</span> <span key="Miami" style={{ display:"inline-block", padding:"8px 20px", border:`1px solid ${accent}28`, color: accent, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", marginRight: 8, marginBottom: 8 }}>Miami</span> <span key="Los Angeles" style={{ display:"inline-block", padding:"8px 20px", border:`1px solid ${accent}28`, color: accent, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", marginRight: 8, marginBottom: 8 }}>Los Angeles</span> <span key="Houston" style={{ display:"inline-block", padding:"8px 20px", border:`1px solid ${accent}28`, color: accent, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", marginRight: 8, marginBottom: 8 }}>Houston</span> <span key="Charlotte" style={{ display:"inline-block", padding:"8px 20px", border:`1px solid ${accent}28`, color: accent, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", marginRight: 8, marginBottom: 8 }}>Charlotte</span>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <p style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.8, color: muted, maxWidth: 560 }}>
            Each city activation is a standalone cultural moment — produced locally, powered by KHG infrastructure, and designed to match the identity of the market.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function ClosingCTA() {
  return (
    <section style={{ padding: "clamp(100px,14vw,180px) clamp(32px,6vw,96px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <Grain />
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 50%, ${glow}, transparent 60%)`,
      }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: accent, marginBottom: 32 }}>Reserve Your Place</div>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(48px,7vw,100px)", fontWeight: 600, lineHeight: 0.9, letterSpacing: "-0.03em", color: cream, marginBottom: 40 }}>
            The Room<br />Is <em>Waiting</em>
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="https://huglife.vercel.app/#tickets" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}><button>Get Tickets</button></a>
            <button style={{
              fontFamily: sans, fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase",
              color: muted, background: "transparent", border: `1px solid ${border}`,
              padding: "18px 40px", cursor: "pointer",
            }}>Learn More</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    
      <EventbriteTickets />

      <footer style={{ padding: "40px clamp(32px,6vw,96px)", borderTop: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <div>
        <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 600, color: accent, letterSpacing: "0.06em" }}>Sunday's Best</div>
        <div style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: dim, marginTop: 4 }}>A HUGLIFE Experience · KHG Enterprise</div>
      </div>
      <div style={{ fontFamily: sans, fontSize: 10, color: dim }}>© {new Date().getFullYear()} The Kollective Hospitality Group</div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

// ─── TICKETS — REDIRECTS TO HUGLIFE ──────────────────────────────
function EventbriteTickets() {
  return (
    <section id="tickets" style={{
      padding: "80px 24px", maxWidth: "720px", margin: "0 auto", textAlign: "center"
    }}>
      <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "#D947A8", marginBottom: "14px", textTransform: "uppercase" }}>
        TICKETS
      </div>
      <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(28px,5vw,42px)", fontWeight: 600, color: "#fff", lineHeight: 1.15, marginBottom: "16px" }}>
        Get Your Tickets
      </h2>
      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", maxWidth: "420px", margin: "0 auto 28px", lineHeight: 1.7 }}>
        All event tickets are available on the official HugLife events hub. Browse dates, choose your event, and secure your spot.
      </p>
      <a href="https://huglife.vercel.app/#tickets" target="_blank" rel="noopener noreferrer" style={{
        display: "inline-block", padding: "16px 40px", borderRadius: "14px",
        background: "linear-gradient(135deg, #D947A8, #FF6B35)",
        color: "#fff", fontSize: "13px", fontWeight: 800, letterSpacing: "0.06em",
        textDecoration: "none", boxShadow: "0 8px 24px rgba(217,71,168,0.3)",
        transition: "all 0.3s ease",
      }}>
        VIEW ALL EVENTS & TICKETS →
      </a>
      <div style={{ marginTop: "20px" }}>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>Powered by Eventbrite · Secure checkout</p>
      </div>
    </section>
  );
}


export default function Page() {
  return (
    <main style={{ background: bg, color: cream, fontFamily: sans, overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <About />
      <Features />
      <Moments />
      <Cities />
      <ClosingCTA />
      <Footer />
    </main>
  );
}
