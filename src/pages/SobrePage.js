import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ShieldCheck, Users, Zap, Shield,
  AlertTriangle, User,
  Palette, Settings, Code2, Layers, ClipboardCheck,
  Atom, Globe, Map, Bot, Smartphone, Database, Lock
} from 'lucide-react';

const css = `
/* ══ HERO ══ */
.sb-hero {
  min-height: 92vh;
  display: flex; align-items: center;
  position: relative; overflow: hidden;
  padding-top: 80px;
  background: var(--bg-deep);
}
.sb-hero::before {
  content: '';
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(107,104,152,.18) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
  pointer-events: none;
}
.sb-hero__orb1 { position:absolute; top:-100px; right:-100px; width:500px; height:500px; border-radius:50%; background:rgba(107,104,152,.1); filter:blur(100px); pointer-events:none; }
.sb-hero__orb2 { position:absolute; bottom:-50px; left:-80px; width:350px; height:350px; border-radius:50%; background:rgba(155,143,255,.07); filter:blur(90px); pointer-events:none; }

.sb-hero__inner {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 80px; align-items: center;
  position: relative; z-index: 1;
}
.sb-hero__kicker {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid rgba(107,104,152,.3);
  border-radius: 100px; padding: 5px 16px;
  font-size: .68rem; color: rgba(239,238,234,.55);
  letter-spacing: .12em; text-transform: uppercase;
  margin-bottom: 24px; font-family: 'Anonymous Pro', monospace;
}
.sb-hero__kicker-dot { width: 5px; height: 5px; border-radius: 50%; background: #9B8FFF; animation: glowPulse 2s ease-in-out infinite; }
.sb-hero__title {
  font-size: clamp(2.6rem, 5.5vw, 4rem);
  font-weight: 800; line-height: 1.04;
  margin-bottom: 22px; letter-spacing: -.03em;
}
.sb-hero__title-grad {
  background: linear-gradient(135deg, #C4BCFF 0%, #9B8FFF 50%, #7B6FE8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.sb-hero__desc {
  font-size: 1.05rem; color: rgba(239,238,234,.58);
  line-height: 1.82; margin-bottom: 36px; font-weight: 400;
  max-width: 480px;
}
.sb-hero__actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 52px; }
.sb-hero__metrics { display: flex; gap: 36px; flex-wrap: wrap; }
.sb-hero__metric-num { display: block; font-weight: 800; font-size: 1.8rem; color: #F4F6F8; line-height: 1; letter-spacing: -.02em; }
.sb-hero__metric-lbl { font-size: .68rem; color: rgba(239,238,234,.38); text-transform: uppercase; letter-spacing: .08em; margin-top: 3px; }
.sb-hero__metric-sep { width: 1px; background: rgba(107,104,152,.25); align-self: stretch; }

/* Visual hero */
.sb-hero__visual { position: relative; }
.sb-hero__window {
  background: rgba(22,20,42,.92);
  border: 1px solid rgba(107,104,152,.25);
  border-radius: 20px; overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,.55);
}
.sb-hero__window-bar {
  background: rgba(107,104,152,.12);
  border-bottom: 1px solid rgba(107,104,152,.18);
  padding: 12px 16px;
  display: flex; align-items: center; gap: 7px;
}
.sb-hero__window-dot { width: 10px; height: 10px; border-radius: 50%; }
.sb-hero__window-body { padding: 28px 24px; }
.sb-preview { display: flex; flex-direction: column; gap: 12px; }
.sb-preview__msg {
  display: flex; align-items: flex-start; gap: 10px;
  animation: fadeInUp .5s ease both;
}
.sb-preview__msg--right { flex-direction: row-reverse; }
.sb-preview__av {
  width: 30px; height: 30px; border-radius: 50%;
  flex-shrink: 0; display: flex; align-items: center; justify-content: center;
}
.sb-preview__av--ia   { background: linear-gradient(135deg, #4A4870, #9B8FFF); }
.sb-preview__av--user { background: linear-gradient(135deg, #2D2B4E, #6B6898); }
.sb-preview__av svg { width: 14px; height: 14px; stroke: rgba(255,255,255,.85); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.sb-preview__bubble {
  padding: 10px 14px; border-radius: 14px; font-size: .82rem; line-height: 1.6; max-width: 260px;
}
.sb-preview__bubble--ia   { background: rgba(45,43,78,.75); border: 1px solid rgba(107,104,152,.22); color: rgba(239,238,234,.88); border-top-left-radius: 4px; }
.sb-preview__bubble--user { background: rgba(107,104,152,.35); border: 1px solid rgba(155,143,255,.18); color: #F4F6F8; border-top-right-radius: 4px; }
.sb-preview__typing { display: flex; gap: 4px; padding: 12px 16px; background: rgba(45,43,78,.75); border: 1px solid rgba(107,104,152,.2); border-radius: 14px; border-top-left-radius: 4px; align-items: center; }
.sb-preview__dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(155,143,255,.7); animation: typing 1.2s ease-in-out infinite; }
.sb-preview__dot:nth-child(2) { animation-delay: .2s; }
.sb-preview__dot:nth-child(3) { animation-delay: .4s; }
@keyframes typing { 0%,60%,100%{transform:translateY(0);opacity:.3} 30%{transform:translateY(-5px);opacity:1} }

/* Badges flutuantes */
.sb-badge-float {
  position: absolute;
  background: rgba(20,18,40,.92);
  border: 1px solid rgba(107,104,152,.28);
  border-radius: 14px; padding: 10px 14px;
  display: flex; align-items: center; gap: 9px;
  box-shadow: 0 8px 28px rgba(0,0,0,.4);
  white-space: nowrap; animation: fadeInUp .6s ease both;
}
.sb-badge-float--1 { top: -20px; right: -24px; animation-delay: .4s; }
.sb-badge-float--2 { bottom: -18px; left: -20px; animation-delay: .6s; }
.sb-badge-float__icon { display:flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:8px; background:rgba(107,104,152,.18); }
.sb-badge-float__icon svg { width: 14px; height: 14px; stroke: #9B8FFF; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.sb-badge-float--2 .sb-badge-float__icon svg { stroke: #FF4757; }
.sb-badge-float__title { font-weight: 700; font-size: .78rem; color: #F4F6F8; }
.sb-badge-float__sub { font-size: .65rem; color: rgba(239,238,234,.4); }

/* ══ MANIFESTO ══ */
.sb-manifesto { padding: 90px 0; background: var(--bg-dark); }
.sb-manifesto__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.sb-manifesto__quote {
  font-size: clamp(1.3rem, 2.5vw, 1.75rem);
  font-weight: 700; line-height: 1.45;
  color: #F4F6F8; letter-spacing: -.01em;
  position: relative; padding-left: 28px;
}
.sb-manifesto__quote::before {
  content: '';
  position: absolute; left: 0; top: 4px; bottom: 4px;
  width: 3px; background: linear-gradient(180deg, #9B8FFF, rgba(155,143,255,.2));
  border-radius: 4px;
}
.sb-manifesto__quote em { font-style: normal; color: #9B8FFF; }
.sb-manifesto__src { margin-top: 16px; font-size: .78rem; color: rgba(239,238,234,.32); font-family: 'Anonymous Pro', monospace; padding-left: 28px; }
.sb-manifesto__list { display: flex; flex-direction: column; gap: 16px; }
.sb-manifesto__item {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 18px 20px;
  background: rgb(26, 24, 50);
  border: 1px solid rgba(107,104,152,.15);
  border-radius: 16px; transition: all .28s;
}
.sb-manifesto__item:hover { border-color: rgba(155,143,255,.3); transform: translateX(4px); }
.sb-manifesto__item-icon { display:flex; align-items:center; justify-content:center; width:38px; height:38px; border-radius:10px; background:rgba(107,104,152,.14); border:1px solid rgba(107,104,152,.2); flex-shrink:0; }
.sb-manifesto__item-icon svg { width:18px; height:18px; stroke:#9B8FFF; fill:none; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
.sb-manifesto__item-title { font-weight: 700; font-size: .9rem; color: #F4F6F8; margin-bottom: 4px; }
.sb-manifesto__item-text  { font-size: .83rem; color: rgba(239,238,234,.55); line-height: 1.68; }

/* ══ PROBLEMA ══ */
.sb-problema { padding: 90px 0; background: var(--bg-deep); }
.sb-problema__grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
.sb-stat-card {
  background: rgb(22, 20, 42);
  border: 1px solid rgba(107,104,152,.16);
  border-radius: 18px; padding: 28px 20px;
  position: relative; overflow: hidden; transition: all .32s;
}
.sb-stat-card::before {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
  background: var(--stat-cor, linear-gradient(90deg, transparent, #9B8FFF, transparent));
  opacity: 0; transition: opacity .32s;
}
.sb-stat-card:hover { border-color: rgba(155,143,255,.28); transform: translateY(-4px); box-shadow: 0 16px 36px rgba(0,0,0,.4); }
.sb-stat-card:hover::before { opacity: 1; }
.sb-stat-card__num { font-weight: 800; font-size: 2.2rem; margin-bottom: 6px; letter-spacing: -.02em; line-height: 1; }
.sb-stat-card__label { font-size: .8rem; color: rgba(239,238,234,.6); line-height: 1.6; margin-bottom: 12px; }
.sb-stat-card__src { font-size: .62rem; color: rgba(239,238,234,.25); font-family: 'Anonymous Pro', monospace; letter-spacing: .05em; }

/* ══ EQUIPE ══ */
.sb-equipe { padding: 90px 0; background: var(--bg-dark); }
.sb-equipe__grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 16px; }
.sb-membro {
  background: rgb(26, 24, 50);
  border: 1px solid rgba(107,104,152,.14);
  border-radius: 18px; padding: 28px 18px;
  text-align: center; transition: all .32s;
  position: relative; overflow: hidden;
}
.sb-membro::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, #9B8FFF, transparent);
  opacity: 0; transition: opacity .32s;
}
.sb-membro:hover { border-color: rgba(155,143,255,.28); transform: translateY(-6px); box-shadow: 0 18px 40px rgba(0,0,0,.4); }
.sb-membro:hover::after { opacity: 1; }
.sb-membro__icon {
  width: 60px; height: 60px; border-radius: 50%;
  background: linear-gradient(135deg, rgba(107,104,152,.3), rgba(155,143,255,.15));
  border: 2px solid rgba(107,104,152,.28);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 14px;
  transition: all .32s;
}
.sb-membro__icon svg { width: 24px; height: 24px; stroke: rgba(155,143,255,.65); fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; transition: stroke .32s; }
.sb-membro:hover .sb-membro__icon { border-color: rgba(155,143,255,.5); box-shadow: 0 0 16px rgba(155,143,255,.2); }
.sb-membro:hover .sb-membro__icon svg { stroke: #9B8FFF; }
.sb-membro__nome   { font-weight: 700; font-size: .9rem; color: #F4F6F8; margin-bottom: 5px; }
.sb-membro__papel  { font-size: .66rem; color: #9B8FFF; letter-spacing: .1em; text-transform: uppercase; font-weight: 600; margin-bottom: 8px; }
.sb-membro__school { font-size: .63rem; color: rgba(239,238,234,.28); font-family: 'Anonymous Pro', monospace; }

/* ══ TECH STACK ══ */
.sb-tech { padding: 72px 0; background: var(--bg-deep); }
.sb-tech__row {
  display: flex; gap: 10px; flex-wrap: wrap;
  justify-content: center;
}
.sb-tech__pill {
  display: flex; align-items: center; gap: 8px;
  background: rgb(24, 22, 44);
  border: 1px solid rgba(107,104,152,.2);
  border-radius: 100px; padding: 9px 18px;
  font-size: .82rem; color: rgba(239,238,234,.65);
  font-weight: 600; transition: all .25s;
}
.sb-tech__pill:hover { border-color: rgba(155,143,255,.38); color: #F4F6F8; transform: translateY(-2px); }
.sb-tech__pill svg { width: 15px; height: 15px; stroke: rgba(155,143,255,.6); fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }

/* ══ CTA FINAL ══ */
.sb-cta { padding: 100px 0; background: var(--bg-dark); position: relative; overflow: hidden; }
.sb-cta::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 60% 70% at 50% 50%, rgba(107,104,152,.15) 0%, transparent 65%);
  pointer-events: none;
}
.sb-cta__inner { position: relative; z-index: 1; text-align: center; max-width: 640px; margin: 0 auto; }
.sb-cta__icon { display:flex; align-items:center; justify-content:center; width:80px; height:80px; border-radius:50%; background:rgba(107,104,152,.18); border:1px solid rgba(155,143,255,.25); margin:0 auto 24px; animation:float 4s ease-in-out infinite; }
.sb-cta__icon svg { width:40px; height:40px; stroke:#9B8FFF; fill:none; stroke-width:1.4; stroke-linecap:round; stroke-linejoin:round; filter:drop-shadow(0 0 14px rgba(155,143,255,.5)); }
.sb-cta__title { font-size: clamp(1.8rem, 3.5vw, 2.5rem); font-weight: 800; margin-bottom: 14px; letter-spacing: -.02em; }
.sb-cta__desc  { font-size: .98rem; color: rgba(239,238,234,.55); line-height: 1.8; margin-bottom: 36px; font-weight: 400; }
.sb-cta__btns  { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 28px; }
.sb-cta__numbers { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
.sb-cta__num-item { display: flex; align-items: center; gap: 7px; font-size: .78rem; color: rgba(239,238,234,.38); }
.sb-cta__num-item a { color: rgba(155,143,255,.6); text-decoration: none; transition: color .2s; }
.sb-cta__num-item a:hover { color: #9B8FFF; }

/* Responsive */
@media (max-width: 960px) {
  .sb-hero__inner { grid-template-columns: 1fr; gap: 44px; }
  .sb-hero__desc { max-width: 100%; }
  .sb-manifesto__inner { grid-template-columns: 1fr; gap: 44px; }
  .sb-problema__grid { grid-template-columns: 1fr 1fr; }
  .sb-equipe__grid { grid-template-columns: repeat(3,1fr); }
}
@media (max-width: 560px) {
  .sb-problema__grid { grid-template-columns: 1fr; }
  .sb-equipe__grid { grid-template-columns: 1fr 1fr; }
}
`;

const STATS = [
  { num:'1 em 4', label:'casos de violência doméstica é formalmente denunciado no Brasil', src:'FBSP 2023', cor:'#FF4757' },
  { num:'4 min',  label:'é o intervalo médio entre casos de violência doméstica registrados', src:'FBSP 2023', cor:'#FFC800' },
  { num:'70%',    label:'das vítimas de feminicídio nunca haviam feito um registro policial', src:'IPEA 2023', cor:'#9B8FFF' },
  { num:'16M',    label:'de mulheres no Brasil já sofreram violência doméstica, segundo IBGE', src:'IBGE 2024', cor:'#2ED573' },
];

const VALORES = [
  { Icon: ShieldCheck, titulo:'Anonimato por padrão',     texto:'O anonimato não é uma feature — é o princípio central. Nenhuma decisão de produto pode comprometer a segurança de quem usa.' },
  { Icon: Users,       titulo:'Acolhimento antes de tudo', texto:'Antes da triagem, antes da denúncia — existe a necessidade de ser ouvida sem julgamento. Tecnologia que abraça.' },
  { Icon: Zap,         titulo:'Código que salva vidas',    texto:'Cada linha existe para reduzir uma barreira real. Não construímos tecnologia por tecnologia — construímos impacto mensurável.' },
];

const EQUIPE = [
  { nome:'Giovanna', papel:'UX / Design',      Icon: Palette },
  { nome:'Samuel',   papel:'Backend / PHP',    Icon: Settings },
  { nome:'Kauã',     papel:'Frontend / React', Icon: Code2 },
  { nome:'Pietro',   papel:'Full Stack',        Icon: Layers },
  { nome:'Lucas',    papel:'QA / Docs',         Icon: ClipboardCheck },
];

const TECH = [
  { Icon: Atom,       name:'React' },
  { Icon: Database,   name:'PHP / MySQL' },
  { Icon: Map,        name:'Leaflet.js' },
  { Icon: Bot,        name:'PsiTech IA' },
  { Icon: Smartphone, name:'Mobile First' },
  { Icon: Lock,       name:'Zero Data' },
  { Icon: Globe,      name:'Open Source Maps' },
];

const CHAT_PREVIEW = [
  { role:'ia',   text:'Olá. Estou aqui por você. Este espaço é 100% anônimo.', delay:'.1s' },
  { role:'user', text:'Preciso de ajuda, mas tenho medo de me identificar.', delay:'.3s' },
  { role:'ia',   text:'Aqui você nunca precisa se identificar. Como posso te ajudar?', delay:'.5s' },
];

export default function SobrePage() {
  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page-wrapper">

        {/* ══ HERO ══ */}
        <section className="sb-hero">
          <div className="sb-hero__orb1" /><div className="sb-hero__orb2" />
          <div className="container">
            <div className="sb-hero__inner">
              <div>
                <div className="sb-hero__kicker"><span className="sb-hero__kicker-dot" />E.Y.E — Ethical Youth Engineers · SESI-SENAI 2026</div>
                <h1 className="sb-hero__title">
                  Construindo o<br />
                  <span className="sb-hero__title-grad">porto seguro</span><br />
                  que o Brasil precisa.
                </h1>
                <p className="sb-hero__desc">
                  Somos cinco estudantes que transformaram indignação em código. A NIRA nasceu da crença de que tecnologia pode ser o primeiro passo para pedir socorro — anônimo, silencioso e imediato.
                </p>
                <div className="sb-hero__actions">
                  <Link to="/triagem" className="btn btn-primary btn-lg">Experimentar a NIRA</Link>
                  <Link to="/conteudos" className="btn btn-outline btn-lg">Ver Conteúdos</Link>
                </div>
                <div className="sb-hero__metrics">
                  <div><span className="sb-hero__metric-num">5</span><span className="sb-hero__metric-lbl">Devs no time</span></div>
                  <div className="sb-hero__metric-sep" />
                  <div><span className="sb-hero__metric-num">9</span><span className="sb-hero__metric-lbl">Páginas</span></div>
                  <div className="sb-hero__metric-sep" />
                  <div><span className="sb-hero__metric-num">0</span><span className="sb-hero__metric-lbl">Dados coletados</span></div>
                  <div className="sb-hero__metric-sep" />
                  <div><span className="sb-hero__metric-num">100%</span><span className="sb-hero__metric-lbl">Anônimo</span></div>
                </div>
              </div>

              {/* Preview do chat */}
              <div className="sb-hero__visual">
                <div className="sb-hero__window">
                  <div className="sb-hero__window-bar">
                    <div className="sb-hero__window-dot" style={{ background:'#FF5F57' }} />
                    <div className="sb-hero__window-dot" style={{ background:'#FEBC2E' }} />
                    <div className="sb-hero__window-dot" style={{ background:'#28C840' }} />
                    <span style={{ marginLeft:8, fontSize:'.72rem', color:'rgba(239,238,234,.3)', fontFamily:"'Anonymous Pro',monospace" }}>PsiTech — Chat Seguro</span>
                  </div>
                  <div className="sb-hero__window-body">
                    <div className="sb-preview">
                      {CHAT_PREVIEW.map((m, i) => (
                        <div key={i} className={`sb-preview__msg${m.role==='user'?' sb-preview__msg--right':''}`} style={{ animationDelay: m.delay }}>
                          <div className={`sb-preview__av sb-preview__av--${m.role}`}>
                            {m.role==='ia' ? <Shield /> : <User />}
                          </div>
                          <div className={`sb-preview__bubble sb-preview__bubble--${m.role}`}>{m.text}</div>
                        </div>
                      ))}
                      <div className="sb-preview__msg" style={{ animationDelay:'.7s' }}>
                        <div className="sb-preview__av sb-preview__av--ia"><Shield /></div>
                        <div className="sb-preview__typing">
                          <div className="sb-preview__dot" />
                          <div className="sb-preview__dot" />
                          <div className="sb-preview__dot" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sb-badge-float sb-badge-float--1">
                  <span className="sb-badge-float__icon"><ShieldCheck /></span>
                  <div><p className="sb-badge-float__title">Zero dados pessoais</p><p className="sb-badge-float__sub">Anonimato total</p></div>
                </div>
                <div className="sb-badge-float sb-badge-float--2">
                  <span className="sb-badge-float__icon"><AlertTriangle /></span>
                  <div><p className="sb-badge-float__title">S.O.S. em 1 toque</p><p className="sb-badge-float__sub">GPS silencioso</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ MANIFESTO ══ */}
        <section className="sb-manifesto section">
          <div className="container">
            <div className="sb-manifesto__inner">
              <div>
                <span className="section-label">Nosso Manifesto</span>
                <p className="sb-manifesto__quote">
                  "Violência não começa com um soco. Começa com o silêncio forçado, o medo de pedir ajuda, a barreira invisível entre a vítima e o socorro.<br /><br />
                  A <em>NIRA</em> existe para destruir essa barreira."
                </p>
                <p className="sb-manifesto__src">— Equipe E.Y.E, SESI-SENAI 2026</p>
              </div>
              <div className="sb-manifesto__list">
                {VALORES.map(v => (
                  <div key={v.titulo} className="sb-manifesto__item">
                    <span className="sb-manifesto__item-icon"><v.Icon /></span>
                    <div>
                      <p className="sb-manifesto__item-title">{v.titulo}</p>
                      <p className="sb-manifesto__item-text">{v.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ O PROBLEMA ══ */}
        <section className="sb-problema section">
          <div className="container">
            <div style={{ textAlign:'center', marginBottom:'52px' }}>
              <span className="section-label">O Problema</span>
              <h2 className="section-title">Números que nos movem</h2>
              <p className="section-sub" style={{ margin:'0 auto' }}>A realidade que motivou cada linha de código da NIRA.</p>
            </div>
            <div className="sb-problema__grid">
              {STATS.map(s => (
                <div key={s.num} className="sb-stat-card" style={{ '--stat-cor': `linear-gradient(90deg, transparent, ${s.cor}60, transparent)` }}>
                  <p className="sb-stat-card__num" style={{ color: s.cor }}>{s.num}</p>
                  <p className="sb-stat-card__label">{s.label}</p>
                  <p className="sb-stat-card__src">Fonte: {s.src}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ EQUIPE ══ */}
        <section className="sb-equipe section">
          <div className="container">
            <div style={{ textAlign:'center', marginBottom:'52px' }}>
              <span className="section-label">Time</span>
              <h2 className="section-title">Quem constrói a NIRA</h2>
              <p className="section-sub" style={{ margin:'0 auto' }}>
                Cinco estudantes do SESI-SENAI que decidiram que tecnologia pode ser uma ferramenta de proteção.
              </p>
            </div>
            <div className="sb-equipe__grid">
              {EQUIPE.map(m => (
                <div key={m.nome} className="sb-membro">
                  <div className="sb-membro__icon"><m.Icon /></div>
                  <p className="sb-membro__nome">{m.nome}</p>
                  <p className="sb-membro__papel">{m.papel}</p>
                  <p className="sb-membro__school">SESI-SENAI · 2026</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TECH STACK ══ */}
        <section className="sb-tech">
          <div className="container">
            <div style={{ textAlign:'center', marginBottom:'36px' }}>
              <span className="section-label">Tecnologias</span>
              <h2 className="section-title" style={{ fontSize:'clamp(1.4rem,3vw,2rem)' }}>Construído com</h2>
            </div>
            <div className="sb-tech__row">
              {TECH.map(t => (
                <div key={t.name} className="sb-tech__pill">
                  <t.Icon />
                  {t.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="sb-cta">
          <div className="container">
            <div className="sb-cta__inner">
              <div className="sb-cta__icon"><Shield /></div>
              <h2 className="sb-cta__title">Você não está sozinha.</h2>
              <p className="sb-cta__desc">
                A NIRA é um espaço seguro, anônimo e gratuito. Se você ou alguém que você conhece precisa de apoio, estamos aqui — silenciosos quando precisar, presentes quando necessário.
              </p>
              <div className="sb-cta__btns">
                <Link to="/triagem" className="btn btn-danger btn-lg">Iniciar Triagem Agora</Link>
                <Link to="/conteudos" className="btn btn-outline btn-lg">Ver Conteúdos</Link>
              </div>
              <div className="sb-cta__numbers">
                {[['190','Polícia'],['180','Central da Mulher · 24h'],['192','SAMU'],['100','Direitos Humanos']].map(([n,l]) => (
                  <div key={n} className="sb-cta__num-item">
                    <a href={`tel:${n}`}>{n}</a>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
