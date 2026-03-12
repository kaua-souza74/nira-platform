import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

const css = `
.mapa-page { min-height:100vh; background:var(--bg-deep); padding:80px 0 60px; }
.mapa-topbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; flex-wrap:wrap; gap:14px; }
.mapa-title { font-size:1.55rem; font-weight:700; color:#F4F6F8; }
.mapa-sub { font-size:.82rem; color:rgba(239,238,234,.38); margin-top:2px; }
/* Layout */
.mapa-layout { display:grid; grid-template-columns:1fr 320px; gap:22px; align-items:flex-start; }

/* Mapa visual */
.mapa-visual { background:var(--bg-card); border:1px solid rgba(107,104,152,.2); border-radius:18px; padding:24px; backdrop-filter:blur(8px); }
.mapa-visual__title { font-weight:700; font-size:.9rem; color:#F4F6F8; margin-bottom:18px; }
.mapa-svg-wrap { position:relative; }
.mapa-svg { width:100%; height:360px; }
/* Zonas do mapa */
.mapa-zona { cursor:pointer; transition:all .25s; }
.mapa-zona rect { rx:12; }
.mapa-zona:hover rect { filter:brightness(1.3); }
.mapa-zona--norte  { fill:rgba(155,143,255,.18); stroke:rgba(155,143,255,.4); }
.mapa-zona--sul    { fill:rgba(46,213,115,.14);  stroke:rgba(46,213,255,.35); }
.mapa-zona--leste  { fill:rgba(255,200,0,.12);   stroke:rgba(255,200,0,.35); }
.mapa-zona--oeste  { fill:rgba(255,71,87,.1);    stroke:rgba(255,71,87,.3); }
.mapa-zona--centro { fill:rgba(107,104,152,.22); stroke:rgba(107,104,152,.5); }
.mapa-zona--selecionada rect { stroke-width:2 !important; filter:brightness(1.4); }
.mapa-label { font-size:13px; font-weight:700; fill:#F4F6F8; text-anchor:middle; dominant-baseline:middle; pointer-events:none; }
.mapa-sub-label { font-size:11px; fill:rgba(239,238,234,.5); text-anchor:middle; dominant-baseline:middle; pointer-events:none; }

/* Sidebar info */
.mapa-info { display:flex; flex-direction:column; gap:16px; }
.mapa-zona-card { background:var(--bg-card); border:1px solid rgba(107,104,152,.18); border-radius:14px; padding:20px; backdrop-filter:blur(8px); transition:border-color .28s; }
.mapa-zona-card--selecionada { border-color:rgba(155,143,255,.4); }
.mapa-zona-card__header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
.mapa-zona-card__name { font-weight:700; font-size:.95rem; color:#F4F6F8; }
.mapa-zona-card__count { font-size:.7rem; color:rgba(239,238,234,.4); }
.mapa-agente { display:flex; align-items:center; gap:10px; padding:9px 0; border-top:1px solid rgba(107,104,152,.1); }
.mapa-agente:first-child { border-top:none; padding-top:0; }
.mapa-agente-avatar { width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg,rgba(107,104,152,.35),rgba(155,143,255,.18)); display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0; }
.mapa-agente-name { font-size:.85rem; color:#F4F6F8; font-weight:700; }
.mapa-agente-area { font-size:.72rem; color:rgba(239,238,234,.4); }
.mapa-agente-status { margin-left:auto; }
/* Minha area card (para funcionários) */
.mapa-minha-area { background:rgba(155,143,255,.1); border:1.5px solid rgba(155,143,255,.3); border-radius:16px; padding:24px; text-align:center; }
.mapa-minha-area-icon { font-size:3rem; margin-bottom:12px; display:block; animation:float 4s ease-in-out infinite; }
.mapa-minha-area-title { font-weight:700; font-size:1.1rem; color:#F4F6F8; margin-bottom:6px; }
.mapa-minha-area-sub { font-size:.875rem; color:rgba(239,238,234,.55); margin-bottom:18px; line-height:1.65; }
/* Alocação (só ADM) */
.mapa-aloc { background:var(--bg-card); border:1px solid rgba(107,104,152,.18); border-radius:14px; padding:20px; backdrop-filter:blur(8px); }
.mapa-aloc__title { font-weight:700; font-size:.9rem; color:#F4F6F8; margin-bottom:16px; }
@media (max-width:900px) { .mapa-layout { grid-template-columns:1fr; } }
`;

const ZONAS = [
  { key:'norte',  label:'Norte',  cor:'#9B8FFF', x:220, y:60,  w:200, h:110 },
  { key:'sul',    label:'Sul',    cor:'#2ED573', x:220, y:230, w:200, h:110 },
  { key:'leste',  label:'Leste',  cor:'#FFC800', x:380, y:145, w:160, h:110 },
  { key:'oeste',  label:'Oeste',  cor:'#FF4757', x:60,  y:145, w:160, h:110 },
  { key:'centro', label:'Centro', cor:'#8B88B8', x:220, y:145, w:160, h:85  },
];

const AGENTES_INIT = [
  { id:3, nome:'Carlos Silva',  area:'Sul',   emoji:'👨', ativo:true  },
  { id:4, nome:'Ana Pereira',   area:null,    emoji:'👩', ativo:false },
  { id:5, nome:'Pedro Souza',   area:'Norte', emoji:'👨', ativo:true  },
  { id:6, nome:'Maria Costa',   area:'Centro',emoji:'👩', ativo:true  },
];

export default function MapaFuncionarioPage() {
  const { user } = useAuth();
  const [zonaSel, setZonaSel]     = useState(null);
  const [agentes, setAgentes]     = useState(AGENTES_INIT);
  const [alocSel, setAlocSel]     = useState(null);
  const [alocArea, setAlocArea]   = useState('');

  const isAdm = user?.role === 'adm';
  const isFuncionario = user?.role === 'funcionario';

  function alocar() {
    if (!alocSel || !alocArea) return;
    setAgentes(ags => ags.map(a => a.id===Number(alocSel) ? {...a, area:alocArea, ativo:true} : a));
    alert(`Agente alocado para a área ${alocArea}!`);
    setAlocSel(null);
    setAlocArea('');
  }

  const agentesNaZona = (key) => agentes.filter(a => a.area === (key.charAt(0).toUpperCase()+key.slice(1)));

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="mapa-page">
        <div className="container">
          <div className="mapa-topbar">
            <div>
              <h1 className="mapa-title">🗺️ Mapa de Equipes</h1>
              <p className="mapa-sub">
                {isAdm ? 'Visualize e aloque funcionários nas áreas de cobertura.' : 'Visualize sua área de atuação e casos designados.'}
              </p>
            </div>
            {isFuncionario && user?.area && (
              <div className="badge"><span className="badge-dot" />Sua área: {user.area}</div>
            )}
          </div>

          {/* Se funcionário sem área */}
          {isFuncionario && !user?.area && (
            <div style={{background:'rgba(255,200,0,.08)',border:'1px solid rgba(255,200,0,.28)',borderRadius:13,padding:'16px 20px',marginBottom:24,fontSize:'.9rem',color:'rgba(239,238,234,.7)',lineHeight:1.65}}>
              ⚠️ <strong style={{color:'#FFC800'}}>Área não definida:</strong> Você ainda não foi alocado em nenhuma área. Aguarde o administrador definir sua área de atuação.
            </div>
          )}

          <div className="mapa-layout">
            {/* MAPA SVG */}
            <div className="mapa-visual">
              <p className="mapa-visual__title">📍 Mapa das Áreas de Cobertura</p>
              <div className="mapa-svg-wrap">
                <svg className="mapa-svg" viewBox="0 0 640 370" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Fundo */}
                  <rect width="640" height="370" fill="rgba(18,17,31,.6)" rx="12"/>
                  {/* Grid decorativo */}
                  {[...Array(8)].map((_,i)=><line key={i} x1={i*90} y1="0" x2={i*90} y2="370" stroke="rgba(107,104,152,.08)" strokeWidth="1"/>)}
                  {[...Array(5)].map((_,i)=><line key={i} x1="0" y1={i*80} x2="640" y2={i*80} stroke="rgba(107,104,152,.08)" strokeWidth="1"/>)}

                  {/* Zonas */}
                  {ZONAS.map(z => {
                    const agNaZona = agentesNaZona(z.key);
                    const isSel = zonaSel === z.key;
                    return (
                      <g key={z.key} className={`mapa-zona mapa-zona--${z.key}${isSel?' mapa-zona--selecionada':''}`} onClick={()=>setZonaSel(isSel?null:z.key)}>
                        <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="12" strokeWidth={isSel?2:1} />
                        <text className="mapa-label" x={z.x+z.w/2} y={z.y+z.h/2-8}>{z.label}</text>
                        <text className="mapa-sub-label" x={z.x+z.w/2} y={z.y+z.h/2+10}>{agNaZona.length} agente{agNaZona.length!==1?'s':''}</text>
                        {agNaZona.map((a,i)=>(
                          <circle key={a.id} cx={z.x+z.w/2-10+(i*22)} cy={z.y+z.h-22} r="8" fill={a.ativo?z.cor:'rgba(107,104,152,.4)'} stroke="rgba(18,17,31,.6)" strokeWidth="1.5"/>
                        ))}
                      </g>
                    );
                  })}
                  {/* Legenda */}
                  <text x="20" y="350" fill="rgba(239,238,234,.3)" fontSize="11">● Agente ativo  ○ Inativo  | Clique em uma área para detalhes</text>
                </svg>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="mapa-info">
              {/* Card zona selecionada */}
              {zonaSel && (
                <div className="mapa-zona-card mapa-zona-card--selecionada">
                  <div className="mapa-zona-card__header">
                    <p className="mapa-zona-card__name">📍 Zona {zonaSel.charAt(0).toUpperCase()+zonaSel.slice(1)}</p>
                    <p className="mapa-zona-card__count">{agentesNaZona(zonaSel).length} agente(s)</p>
                  </div>
                  {agentesNaZona(zonaSel).length === 0 ? (
                    <p style={{fontSize:'.82rem',color:'rgba(239,238,234,.35)'}}>Nenhum agente alocado nesta zona.</p>
                  ) : (
                    agentesNaZona(zonaSel).map(a => (
                      <div className="mapa-agente" key={a.id}>
                        <div className="mapa-agente-avatar">{a.emoji}</div>
                        <div><p className="mapa-agente-name">{a.nome}</p><p className="mapa-agente-area">Área: {a.area}</p></div>
                        <span className="mapa-agente-status">
                          <span className={`adm-pill ${a.ativo?'adm-pill--new':'adm-pill--done'}`} style={{fontSize:'.62rem'}}>{a.ativo?'● Ativo':'○ Inativo'}</span>
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Card minha área (funcionário) */}
              {isFuncionario && (
                <div className="mapa-minha-area">
                  <span className="mapa-minha-area-icon">🦉</span>
                  <p className="mapa-minha-area-title">Olá, {user?.nome}!</p>
                  <p className="mapa-minha-area-sub">
                    {user?.area
                      ? `Você está alocado na zona ${user.area}. Atenda os casos designados para sua área pelo chat.`
                      : 'Aguardando alocação pelo administrador.'}
                  </p>
                  {user?.area && <button className="btn btn-primary btn-sm" onClick={()=>alert('Abrindo casos da minha área...')}>Ver Meus Casos</button>}
                </div>
              )}

              {/* Alocação (ADM) */}
              {isAdm && (
                <div className="mapa-aloc">
                  <p className="mapa-aloc__title">⚙️ Alocar Funcionário</p>
                  <div className="form-group">
                    <label className="form-label">Funcionário</label>
                    <select className="form-select" value={alocSel||''} onChange={e=>setAlocSel(e.target.value)}>
                      <option value="">Selecionar...</option>
                      {agentes.map(a=><option key={a.id} value={a.id}>{a.nome}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Área</label>
                    <select className="form-select" value={alocArea} onChange={e=>setAlocArea(e.target.value)}>
                      <option value="">Selecionar zona...</option>
                      {ZONAS.map(z=><option key={z.key} value={z.label}>{z.label}</option>)}
                    </select>
                  </div>
                  <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} disabled={!alocSel||!alocArea} onClick={alocar}>
                    Alocar →
                  </button>
                </div>
              )}

              {/* Lista geral */}
              <div className="mapa-zona-card">
                <p className="mapa-zona-card__name" style={{marginBottom:12}}>Todos os Agentes</p>
                {agentes.map(a=>(
                  <div className="mapa-agente" key={a.id}>
                    <div className="mapa-agente-avatar">{a.emoji}</div>
                    <div><p className="mapa-agente-name">{a.nome}</p><p className="mapa-agente-area">{a.area||'Sem área'}</p></div>
                    <span className="mapa-agente-status">
                      <span className={`adm-pill ${a.ativo?'adm-pill--new':'adm-pill--done'}`} style={{fontSize:'.62rem'}}>{a.ativo?'● Ativo':'○ Inativo'}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
