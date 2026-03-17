"use client";
import { useState, useEffect, useRef } from "react";
const C={base:"#F7F0E5",surface:"#F0E8D8",panel:"#EAE0CE",border:"rgba(28,27,31,0.08)",brown:"#1C1B1F",brownMid:"rgba(28,27,31,0.65)",gold:"#D8BA7C",goldGlow:"rgba(216,186,124,0.3)",lavender:"#CDBCE5",lavGlow:"rgba(205,188,229,0.25)",sage:"#8AA37B",cream:"#FAF7F0",muted:"rgba(28,27,31,0.5)",dim:"rgba(28,27,31,0.3)"};
const F={display:"'Playfair Display',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif",mono:"'DM Mono',monospace"};
// ─── TICKET DATA ─────────────────────────────────────────────────────────────
const HUGLIFE_HUB = "https://huglife.vercel.app/#tickets";
const SB_TICKETS = [
  { date:"May 10, 2026", note:"Spring Brunch", url:"https://www.eventbrite.com/e/sunday-best-tickets-1983529471043" },
  { date:"Jul 1, 2026",  note:"Summer Brunch", url:"https://www.eventbrite.com/e/sundays-best-tickets-1983552321389" },
];

function Tickets(){
  const [sel, setSel] = useState(0);
  return (
    <section id="tickets" style={{background:C.surface,padding:"100px clamp(32px,5vw,80px)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 50%, ${C.goldGlow} 0%, transparent 55%)`}}/>
      <Grain/>
      <div style={{maxWidth:"1100px",margin:"0 auto",position:"relative",zIndex:1}}>
        <Reveal>
          <div style={{fontFamily:F.mono,fontSize:"9px",letterSpacing:"0.5em",textTransform:"uppercase",color:C.gold,marginBottom:"16px"}}>
            Tickets & Access
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"24px",marginBottom:"48px"}}>
            <h2 style={{fontFamily:F.serif,fontSize:"clamp(36px,5.5vw,72px)",fontWeight:400,fontStyle:"italic",lineHeight:0.9,color:C.brown}}>
              Reserve Your<br/>Sunday
            </h2>
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#4ADE80",boxShadow:"0 0 8px #4ADE80",animation:"sbPulse 2s ease-in-out infinite"}}/>
              <span style={{fontFamily:F.mono,fontSize:"9px",letterSpacing:"0.3em",color:"#4ADE80",textTransform:"uppercase"}}>Tickets On Sale</span>
            </div>
          </div>
        </Reveal>

        {/* Date cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"2px",background:`${C.gold}20`,marginBottom:"3px"}}>
          {SB_TICKETS.map((t,i)=>(
            <Reveal key={t.date} d={i*0.1}>
              <div onClick={()=>setSel(i)} style={{
                background:sel===i?`linear-gradient(145deg,${C.surface},${C.panel})`:"rgba(255,255,255,0.03)",
                padding:"40px 36px",cursor:"pointer",
                borderTop:`2px solid ${sel===i?C.gold:"transparent"}`,
                transition:"all 0.3s",
              }}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px"}}>
                  <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#4ADE80",boxShadow:"0 0 6px #4ADE80",animation:"sbPulse 2s ease-in-out infinite"}}/>
                  <span style={{fontFamily:F.mono,fontSize:"8px",letterSpacing:"0.3em",color:"#4ADE80",textTransform:"uppercase"}}>On Sale Now</span>
                </div>
                <div style={{fontFamily:F.serif,fontSize:"clamp(22px,3vw,36px)",fontStyle:"italic",color:C.brown,marginBottom:"8px"}}>{t.date}</div>
                <div style={{fontFamily:F.mono,fontSize:"10px",color:C.gold,marginBottom:"24px"}}>{t.note}</div>
                <a href={t.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{
                  fontFamily:F.mono,fontSize:"10px",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",
                  color:"#fff",background:C.gold,padding:"14px 36px",
                  textDecoration:"none",display:"inline-block",transition:"all 0.3s",
                }}
                  onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.transform="translateY(-2px)"}
                  onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.transform="translateY(0)"}
                >Buy Tickets →</a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Group & VIP strip */}
        <Reveal d={0.2}>
          <div style={{background:C.panel,padding:"28px 32px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"20px"}}>
            <div>
              <div style={{fontFamily:F.mono,fontSize:"9px",letterSpacing:"0.4em",textTransform:"uppercase",color:C.gold,marginBottom:"6px"}}>Groups · VIP · Private Dining</div>
              <div style={{fontFamily:F.serif,fontSize:"18px",fontStyle:"italic",color:C.brown}}>Celebrating with 8 or more?</div>
            </div>
            <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
              <a href="mailto:thekollectiveworldwide@gmail.com?subject=Sunday's Best Group Inquiry" style={{
                fontFamily:F.mono,fontSize:"9px",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",
                color:"#fff",background:C.gold,padding:"12px 28px",textDecoration:"none",display:"inline-block",
              }}>Reserve Your Table</a>
              <a href="mailto:thekollectiveworldwide@gmail.com?subject=Sunday's Best VIP Inquiry" style={{
                fontFamily:F.mono,fontSize:"9px",fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",
                color:C.brown,background:"transparent",border:`1px solid ${C.gold}40`,padding:"12px 24px",
                textDecoration:"none",display:"inline-block",
              }}>VIP Inquiry</a>
            </div>
          </div>
        </Reveal>

        <div style={{marginTop:"24px",display:"flex",gap:"24px",justifyContent:"center",flexWrap:"wrap"}}>
          {["Powered by Eventbrite","Secure Checkout","Instant Confirmation","21+ Event"].map(s=>(
            <div key={s} style={{fontFamily:F.mono,fontSize:"9px",color:"rgba(255,255,255,0.18)",letterSpacing:"0.15em"}}>{s}</div>
          ))}
        </div>
      </div>
      <style>{`@keyframes sbPulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </section>
  );
}
function Footer(){return(<footer style={{background:C.panel,borderTop:`1px solid ${C.border}`,padding:"48px clamp(32px,5vw,80px) 32px"}}><div style={{maxWidth:"1400px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"24px"}}><div><div style={{fontFamily:F.display,fontSize:"22px",fontStyle:"italic",color:C.brown,marginBottom:"4px"}}>Sunday&apos;s Best</div><div style={{fontFamily:F.mono,fontSize:"9px",letterSpacing:"0.3em",color:C.gold}}>A KHG HUGLIFE EVENT</div></div><div style={{fontFamily:F.mono,fontSize:"10px",color:C.brownMid}}>© 2026 Sunday&apos;s Best. A KHG Enterprise.</div></div></footer>);}
export default function SundaysBestSite(){return(<div style={{background:C.base}}><Nav/><Hero/><Tickets/><Footer/></div>);}
