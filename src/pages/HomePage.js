import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const css = `
/* ── HERO ── */
.home-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: radial-gradient(ellipse 80% 55% at 50% -5%, rgba(107,104,152,.32) 0%, transparent 65%),
              var(--bg-deep);
}
.home-hero__orb1 {
  position: absolute; top: -80px; right: -80px;
  width: 460px; height: 460px; border-radius: 50%;
  background: rgba(107,104,152,.14); filter: blur(80px); pointer-events: none;
}
.home-hero__orb2 {
  position: absolute; bottom: 30px; left: -60px;
  width: 280px; height: 280px; border-radius: 50%;
  background: rgba(155,143,255,.08); filter: blur(70px); pointer-events: none;
}
.home-hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  padding: 90px 24px 70px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
}
.home-hero__badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(107,104,152,.18);
  border: 1px solid rgba(107,104,152,.35);
  border-radius: 100px; padding: 5px 15px;
  font-size: .7rem; color: #9B8FFF;
  letter-spacing: .1em; text-transform: uppercase;
  margin-bottom: 24px;
  animation: fadeInUp .6s ease both;
}
.home-hero__badge-dot { width:6px; height:6px; border-radius:50%; background:#9B8FFF; animation: glowPulse 2s ease-in-out infinite; }
.home-hero__title {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 700; line-height: 1.06;
  margin-bottom: 20px;
  animation: fadeInUp .65s .08s ease both;
}
.home-hero__title span { color: #9B8FFF; }
.home-hero__quote {
  font-style: italic;
  font-size: .98rem; color: rgba(239,238,234,.65);
  margin-bottom: 18px;
  animation: fadeInUp .65s .14s ease both;
}
.home-hero__desc {
  font-size: 1rem; color: rgba(239,238,234,.6);
  line-height: 1.78; margin-bottom: 36px;
  max-width: 460px;
  animation: fadeInUp .65s .2s ease both;
}
.home-hero__actions {
  display: flex; gap: 12px; flex-wrap: wrap;
  margin-bottom: 48px;
  animation: fadeInUp .65s .28s ease both;
}
.home-hero__stats {
  display: flex; gap: 24px; align-items: center;
  animation: fadeInUp .65s .35s ease both;
  flex-wrap: wrap;
}
.home-hero__stat-num {
  display: block; font-weight: 700;
  font-size: 1.55rem; color: #F4F6F8;
}
.home-hero__stat-lbl {
  font-size: .7rem; color: rgba(239,238,234,.45);
  text-transform: uppercase; letter-spacing: .05em;
}
.home-hero__divider { width:1px; height:34px; background: rgba(107,104,152,.35); }

/* visual lado direito */
.home-hero__visual {
  display: flex; align-items: center; justify-content: center;
  position: relative; animation: fadeIn .9s .3s ease both;
}
.home-hero__owl-circle {
  width: 280px; height: 280px; border-radius: 50%;
  background: radial-gradient(circle, rgba(107,104,152,.22) 0%, transparent 70%);
  border: 1px solid rgba(107,104,152,.28);
  display: flex; align-items: center; justify-content: center;
  position: relative; animation: float 5s ease-in-out infinite;
}
.home-hero__owl { font-size: 8rem; filter: drop-shadow(0 0 28px rgba(155,143,255,.45)); user-select: none; }
.home-hero__ring {
  position: absolute; border-radius: 50%;
  border: 1px solid rgba(107,104,152,.15);
  animation: pulseRing 3s ease-out infinite; pointer-events: none;
}
.home-hero__ring1 { width:340px; height:340px; animation-delay:0s; }
.home-hero__ring2 { width:400px; height:400px; animation-delay:.7s; }
/* floating cards */
.home-hero__fcard {
  position: absolute;
  background: rgba(45,43,78,.88); backdrop-filter: blur(12px);
  border: 1px solid rgba(107,104,152,.28); border-radius: 13px;
  padding: 11px 14px; display: flex; align-items: center; gap: 9px;
  white-space: nowrap; box-shadow: 0 8px 28px rgba(0,0,0,.4);
  animation: fadeInUp .7s ease both;
}
.home-hero__fcard1 { top: 6%;  left: -12%; animation-delay:.5s; }
.home-hero__fcard2 { bottom:15%; left: -10%; animation-delay:.7s; }
.home-hero__fcard3 { top: 10%; right:-10%; animation-delay:.9s; }
.home-hero__fcard-icon { font-size:1.3rem; }
.home-hero__fcard-title { font-weight:700; font-size:.82rem; color:#F4F6F8; }
.home-hero__fcard-sub { font-size:.68rem; color:rgba(239,238,234,.5); }

/* ── DORES ── */
.home-dores { padding: 90px 0; background: var(--bg-dark); }
.home-dores__grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; }
.home-dores__card { background:var(--bg-card); border:1px solid rgba(107,104,152,.18); border-radius:18px; padding:28px 22px; transition:all .32s; backdrop-filter:blur(8px); position:relative; overflow:hidden; }
.home-dores__card::before { content:''; position:absolute; top:0;left:0;right:0; height:2px; background:linear-gradient(90deg,transparent,#9B8FFF,transparent); opacity:0; transition:opacity .32s; }
.home-dores__card:hover { border-color:rgba(155,143,255,.32); transform:translateY(-5px); box-shadow:0 18px 38px rgba(0,0,0,.4); }
.home-dores__card:hover::before { opacity:1; }
.home-dores__icon { font-size:2rem; margin-bottom:14px; display:block; }
.home-dores__ctitle { font-weight:700; font-size:.95rem; text-transform:uppercase; letter-spacing:.05em; margin-bottom:10px; color:#F4F6F8; }
.home-dores__ctext { font-size:.875rem; color:rgba(239,238,234,.58); line-height:1.7; }

/* ── QUOTE ── */
.home-quote { padding:60px 0; background:var(--bg-deep); }
.home-quote__box { max-width:780px; margin:0 auto; text-align:center; background:rgba(107,104,152,.07); border:1px solid rgba(107,104,152,.2); border-radius:18px; padding:40px; }
.home-quote__text { font-style:italic; font-size:1.08rem; color:rgba(239,238,234,.78); line-height:1.82; margin-bottom:14px; }
.home-quote__src { font-size:.75rem; color:rgba(239,238,234,.35); letter-spacing:.06em; }

/* ── SOLUÇÃO ── */
.home-sol { padding:90px 0; background:var(--bg-dark); }
.home-sol__inner { display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center; }
.home-sol__items { display:flex; flex-direction:column; gap:16px; margin-bottom:36px; }
.home-sol__item { display:flex; align-items:flex-start; gap:13px; padding:15px 18px; background:rgba(107,104,152,.09); border:1px solid rgba(107,104,152,.18); border-radius:13px; transition:border-color .28s; }
.home-sol__item:hover { border-color:rgba(155,143,255,.38); }
.home-sol__item-icon { font-size:1.5rem; flex-shrink:0; }
.home-sol__item-title { font-weight:700; font-size:.88rem; margin-bottom:3px; color:#F4F6F8; }
.home-sol__item-text { font-size:.845rem; color:rgba(239,238,234,.58); line-height:1.65; }
.home-sol__nira { background:rgba(45,43,78,.65); border:1px solid rgba(107,104,152,.28); border-radius:22px; padding:44px 36px; text-align:center; backdrop-filter:blur(16px); }
.home-sol__nira-owl { font-size:5.5rem; animation:float 5s ease-in-out infinite; display:block; filter:drop-shadow(0 0 22px rgba(155,143,255,.4)); margin-bottom:14px; }
.home-sol__nira-name { font-weight:700; font-size:2.8rem; letter-spacing:.12em; color:#F4F6F8; margin-bottom:6px; }
.home-sol__nira-full { font-size:.68rem; color:rgba(239,238,234,.4); letter-spacing:.09em; text-transform:uppercase; line-height:1.6; margin-bottom:24px; }
.home-sol__badges { display:flex; justify-content:center; gap:8px; flex-wrap:wrap; }
.home-sol__badge { background:rgba(107,104,152,.18); border:1px solid rgba(107,104,152,.28); border-radius:100px; padding:4px 12px; font-size:.68rem; color:#9B8FFF; letter-spacing:.07em; }

/* ── PUBLICO ── */
.home-pub { padding:90px 0; background:var(--bg-deep); }
.home-pub__grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.home-pub__card { background:var(--bg-card); border:1px solid rgba(107,104,152,.18); border-radius:18px; padding:30px; backdrop-filter:blur(8px); }
.home-pub__ctitle { font-weight:700; font-size:.95rem; text-transform:uppercase; letter-spacing:.08em; margin-bottom:18px; color:rgba(239,238,234,.8); padding-bottom:12px; border-bottom:1px solid rgba(107,104,152,.2); }
.home-pub__list { display:flex; flex-direction:column; gap:10px; }
.home-pub__item { display:flex; align-items:center; gap:9px; font-size:.9rem; color:rgba(239,238,234,.7); }
.home-pub__dot { width:6px; height:6px; border-radius:50%; background:#9B8FFF; flex-shrink:0; }

/* ── EQUIPE ── */
.home-equipe { padding:90px 0; background:var(--bg-dark); }
.home-equipe__grid { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
.home-equipe__card { background:var(--bg-card); border:1px solid rgba(107,104,152,.18); border-radius:17px; padding:24px 18px; text-align:center; transition:all .32s; backdrop-filter:blur(8px); }
.home-equipe__card:hover { border-color:rgba(155,143,255,.32); transform:translateY(-5px); box-shadow:0 14px 36px rgba(0,0,0,.4); }
.home-equipe__avatar { width:66px; height:66px; border-radius:50%; background:linear-gradient(135deg,rgba(107,104,152,.38),rgba(155,143,255,.18)); border:2px solid rgba(107,104,152,.35); display:flex; align-items:center; justify-content:center; margin:0 auto 14px; font-size:1.7rem; }
.home-equipe__name { font-weight:700; font-size:.9rem; color:#F4F6F8; margin-bottom:5px; }
.home-equipe__role { font-size:.7rem; color:#9B8FFF; letter-spacing:.07em; text-transform:uppercase; margin-bottom:8px; }
.home-equipe__school { font-size:.67rem; color:rgba(239,238,234,.38); }

/* responsive */
@media (max-width: 900px) {
  .home-hero__inner { grid-template-columns:1fr; gap:36px; text-align:center; }
  .home-hero__desc { max-width:100%; margin-inline:auto; }
  .home-hero__actions { justify-content:center; }
  .home-hero__stats { justify-content:center; }
  .home-hero__visual { display:none; }
  .home-dores__grid { grid-template-columns:1fr 1fr; }
  .home-sol__inner { grid-template-columns:1fr; gap:40px; }
  .home-sol__nira { display:none; }
  .home-pub__grid { grid-template-columns:1fr; }
  .home-equipe__grid { grid-template-columns:repeat(3,1fr); }
}
@media (max-width: 540px) {
  .home-dores__grid { grid-template-columns:1fr; }
  .home-equipe__grid { grid-template-columns:1fr 1fr; }
}
`;

const dores = [
  { icon:'🔇', titulo:'O Silêncio',            texto:'Medo de represália, vergonha e dependência do agressor tornam o silêncio uma armadilha, não uma escolha.' },
  { icon:'🚪', titulo:'Falta de Acesso',        texto:'Ir a uma delegacia ou psicólogo presencialmente é impossível para quem vive sob vigilância constante.' },
  { icon:'⚡', titulo:'Sem Resposta Rápida',    texto:'Em momentos de agressão, ligar e falar ao telefone não é uma opção. É preciso socorro silencioso.' },
  { icon:'💔', titulo:'Ausência de Acolhimento',texto:'Antes da denúncia, existe a necessidade de ser ouvida. Sem julgamento, sem burocracia, sem se expor.' },
];

const solucoes = [
  { icon:'🦉', titulo:'Celular como ferramenta de defesa',       texto:'O celular já na mão da vítima vira proteção silenciosa — sem que ninguém ao redor perceba.' },
  { icon:'🔒', titulo:'Canal 100% anônimo',                      texto:'Nenhuma identificação necessária. Elimina o medo inicial de julgamento ou exposição.' },
  { icon:'🆘', titulo:'S.O.S. — um toque, GPS em tempo real',    texto:'Um único toque envia localização para a rede de apoio. Sem falar, digitar ou explicar.' },
  { icon:'🤝', titulo:'Acolhimento e encaminhamento integrados', texto:'Suporte emocional, conteúdo informativo e direcionamento para serviços próximos.' },
];

const equipe = [
  { nome:'Giovanna', papel:'UX / Design',       emoji:'🎨' },
  { nome:'Samuel',   papel:'Backend / PHP',     emoji:'⚙️' },
  { nome:'Kauã',     papel:'Frontend / React',  emoji:'💻' },
  { nome:'Pietro',   papel:'Full Stack',         emoji:'🔧' },
  { nome:'Lucas',    papel:'QA / Docs',          emoji:'📋' },
];

export default function HomePage() {
  return (
    <>
      <style>{css}</style>
      <Navbar />

      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="home-hero__orb1" /><div className="home-hero__orb2" />
        <div className="home-hero__inner">
          <div>
            <div className="home-hero__badge"><span className="home-hero__badge-dot" />GovTech · SocialTech · E.Y.E 2026</div>
            <h1 className="home-hero__title">Núcleo de<br /><span>Identificação</span><br />e Resposta ao Abuso</h1>
            <p className="home-hero__quote">"Mais do que um app — um porto seguro digital."</p>
            <p className="home-hero__desc">Tecnologia para ouvir, acolher e proteger quem mais precisa. Canal anônimo, seguro e disponível de qualquer lugar.</p>
            <div className="home-hero__actions">
              <Link to="/triagem" className="btn btn-primary btn-lg">🆘 Iniciar Triagem</Link>
              <Link to="/como-funciona" className="btn btn-outline btn-lg">Como Funciona</Link>
            </div>
            <div className="home-hero__stats">
              <div><span className="home-hero__stat-num">1/4</span><span className="home-hero__stat-lbl">Casos denunciados</span></div>
              <div className="home-hero__divider" />
              <div><span className="home-hero__stat-num">4min</span><span className="home-hero__stat-lbl">1 vítima a cada</span></div>
              <div className="home-hero__divider" />
              <div><span className="home-hero__stat-num">70%</span><span className="home-hero__stat-lbl">Sem registro prévio</span></div>
            </div>
          </div>
          <div className="home-hero__visual">
            <div className="home-hero__ring home-hero__ring1" />
            <div className="home-hero__ring home-hero__ring2" />
            <div className="home-hero__owl-circle">
              {/* Substitua por <img src="/images/owl.png" alt="NIRA" /> quando tiver a imagem */}
              <span className="home-hero__owl">🦉</span>
            </div>
            <div className="home-hero__fcard home-hero__fcard1"><span className="home-hero__fcard-icon">🔒</span><div><p className="home-hero__fcard-title">100% Anônimo</p><p className="home-hero__fcard-sub">Sem identificação</p></div></div>
            <div className="home-hero__fcard home-hero__fcard2"><span className="home-hero__fcard-icon">🆘</span><div><p className="home-hero__fcard-title">Botão S.O.S.</p><p className="home-hero__fcard-sub">Alerta + GPS</p></div></div>
            <div className="home-hero__fcard home-hero__fcard3"><span className="home-hero__fcard-icon">🤝</span><div><p className="home-hero__fcard-title">Rede de Apoio</p><p className="home-hero__fcard-sub">Psicólogos · ONGs</p></div></div>
          </div>
        </div>
      </section>

      {/* ── DORES ── */}
      <section className="home-dores">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'52px' }}>
            <span className="section-label">Problemática</span>
            <h2 className="section-title">Qual a Dor que nos Move?</h2>
            <p className="section-sub" style={{ margin:'0 auto' }}>Muitas pessoas em vulnerabilidade enfrentam barreiras enormes para pedir ajuda.</p>
          </div>
          <div className="home-dores__grid">
            {dores.map(d => (
              <div className="home-dores__card" key={d.titulo}>
                <span className="home-dores__icon">{d.icon}</span>
                <h3 className="home-dores__ctitle">{d.titulo}</h3>
                <p className="home-dores__ctext">{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="home-quote">
        <div className="container">
          <div className="home-quote__box">
            <p className="home-quote__text">"No Brasil, uma mulher é vítima de violência doméstica a cada 4 minutos. Apenas 1 em cada 4 casos é denunciado formalmente. Cerca de 70% das vítimas de feminicídio nunca haviam registrado uma ocorrência."</p>
            <p className="home-quote__src">Fórum Brasileiro de Segurança Pública (2023) · Instituto Avon (2021) · IPEA</p>
          </div>
        </div>
      </section>

      {/* ── SOLUÇÃO ── */}
      <section className="home-sol">
        <div className="container">
          <div className="home-sol__inner">
            <div>
              <span className="section-label">Nossa Solução</span>
              <h2 className="section-title">A Solução que<br />Faz a Diferença</h2>
              <p className="section-sub" style={{ marginBottom:32 }}>Uma plataforma digital que reduz as barreiras para a denúncia, oferecendo ambiente seguro, acessível e anônimo.</p>
              <div className="home-sol__items">
                {solucoes.map(s => (
                  <div className="home-sol__item" key={s.titulo}>
                    <span className="home-sol__item-icon">{s.icon}</span>
                    <div><p className="home-sol__item-title">{s.titulo}</p><p className="home-sol__item-text">{s.texto}</p></div>
                  </div>
                ))}
              </div>
              <Link to="/como-funciona" className="btn btn-primary">Ver Demonstração →</Link>
            </div>
            <div className="home-sol__nira">
              <span className="home-sol__nira-owl">🦉</span>
              <div className="home-sol__nira-name">NIRA</div>
              <div className="home-sol__nira-full">Núcleo de Identificação<br />e Resposta ao Abuso</div>
              <div className="home-sol__badges">
                <span className="home-sol__badge">GovTech</span>
                <span className="home-sol__badge">SocialTech</span>
                <span className="home-sol__badge">E.Y.E 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PÚBLICO ── */}
      <section className="home-pub section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'48px' }}>
            <span className="section-label">A Quem é Destinado?</span>
            <h2 className="section-title">Para quem é a NIRA?</h2>
          </div>
          <div className="home-pub__grid">
            <div className="home-pub__card">
              <p className="home-pub__ctitle">👤 Usuários Finais</p>
              <div className="home-pub__list">
                {['Mulheres em situação de violência ou risco','Pessoas em vulnerabilidade social','Quem precisa de ajuda mas teme se expor'].map(i => (
                  <div className="home-pub__item" key={i}><span className="home-pub__dot" />{i}</div>
                ))}
              </div>
            </div>
            <div className="home-pub__card">
              <p className="home-pub__ctitle">🤝 Gestores e Parceiros</p>
              <div className="home-pub__list">
                {['Psicólogos e assistentes sociais','ONGs e centros de apoio','Autoridades e agentes de segurança'].map(i => (
                  <div className="home-pub__item" key={i}><span className="home-pub__dot" />{i}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EQUIPE ── */}
      <section className="home-equipe section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'48px' }}>
            <span className="section-label">Time</span>
            <h2 className="section-title">Equipe E.Y.E</h2>
            <p className="section-sub" style={{ margin:'0 auto' }}>Ethical Youth Engineers — estudantes do 3º ano do SESI-SENAI apaixonados por tecnologia com propósito.</p>
          </div>
          <div className="home-equipe__grid">
            {equipe.map(m => (
              <div className="home-equipe__card" key={m.nome}>
                <div className="home-equipe__avatar">{m.emoji}</div>
                <p className="home-equipe__name">{m.nome}</p>
                <p className="home-equipe__role">{m.papel}</p>
                <p className="home-equipe__school">SESI-SENAI</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
