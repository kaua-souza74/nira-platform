import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

const css = `
.adm-layout { display:flex; min-height:100vh; background:var(--bg-deep); }
.adm-sidebar { width:230px; flex-shrink:0; background:rgba(26,24,48,.92); border-right:1px solid rgba(107,104,152,.18); padding:80px 0 28px; display:flex; flex-direction:column; position:sticky; top:0; height:100vh; overflow-y:auto; }
.adm-sidebar__brand { padding:0 18px 22px; border-bottom:1px solid rgba(107,104,152,.14); margin-bottom:16px; }
.adm-sidebar__title { font-weight:700; font-size:.92rem; color:#F4F6F8; letter-spacing:.06em; margin-bottom:2px; }
.adm-sidebar__sub { font-size:.65rem; color:rgba(239,238,234,.3); letter-spacing:.06em; text-transform:uppercase; }
.adm-nav-sect { padding:14px 18px 5px; font-size:.62rem; color:rgba(239,238,234,.22); letter-spacing:.12em; text-transform:uppercase; }
.adm-nav-item { display:flex; align-items:center; gap:11px; padding:10px 18px; font-size:.845rem; color:rgba(239,238,234,.52); cursor:pointer; transition:all .22s; border-left:2px solid transparent; background:none; border-top:none; border-right:none; border-bottom:none; width:100%; text-align:left; font-family:'Anonymous Pro',monospace; text-decoration:none; }
.adm-nav-item:hover { color:#F4F6F8; background:rgba(107,104,152,.1); }
.adm-nav-item--active { color:#9B8FFF; border-left-color:#9B8FFF; background:rgba(155,143,255,.07); }
.adm-content { flex:1; padding:80px 28px 36px; overflow-y:auto; min-width:0; }
.adm-topbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:30px; flex-wrap:wrap; gap:14px; }
.adm-page-title { font-size:1.5rem; font-weight:700; color:#F4F6F8; }
.adm-page-sub { font-size:.82rem; color:rgba(239,238,234,.38); margin-top:2px; }
.adm-live { display:flex; align-items:center; gap:6px; font-size:.75rem; color:#2ED573; background:rgba(46,213,115,.1); border:1px solid rgba(46,213,115,.22); border-radius:100px; padding:5px 13px; }
.adm-live-dot { width:6px; height:6px; border-radius:50%; background:#2ED573; animation:glowPulse 2s ease-in-out infinite; }
.adm-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px; }
.adm-stat { background:var(--bg-card); border:1px solid rgba(107,104,152,.16); border-radius:13px; padding:18px; backdrop-filter:blur(8px); }
.adm-stat__lbl { font-size:.68rem; color:rgba(239,238,234,.4); text-transform:uppercase; letter-spacing:.08em; margin-bottom:7px; }
.adm-stat__num { font-weight:700; font-size:1.9rem; color:#F4F6F8; line-height:1; margin-bottom:3px; }
.adm-stat__delta { font-size:.7rem; color:#2ED573; }
.adm-stat--danger .adm-stat__num { color:#FF4757; }
.adm-sect-title { font-weight:700; font-size:.95rem; color:#F4F6F8; margin-bottom:14px; display:flex; align-items:center; gap:9px; }
.adm-tbadge { background:rgba(255,71,87,.18); color:#FF4757; border-radius:100px; padding:2px 8px; font-size:.67rem; }
.adm-table-wrap { background:var(--bg-card); border:1px solid rgba(107,104,152,.16); border-radius:13px; overflow:hidden; margin-bottom:22px; backdrop-filter:blur(8px); }
.adm-table { width:100%; border-collapse:collapse; }
.adm-table th { background:rgba(107,104,152,.1); padding:11px 15px; font-size:.66rem; color:rgba(239,238,234,.38); letter-spacing:.1em; text-transform:uppercase; text-align:left; font-weight:700; white-space:nowrap; }
.adm-table td { padding:13px 15px; font-size:.855rem; color:rgba(239,238,234,.72); border-top:1px solid rgba(107,104,152,.09); }
.adm-table tr:hover td { background:rgba(107,104,152,.06); }
.adm-pill { display:inline-block; border-radius:100px; padding:3px 9px; font-size:.65rem; font-weight:700; letter-spacing:.05em; white-space:nowrap; }
.adm-pill--sos   { background:rgba(255,71,87,.18);  color:#FF4757; }
.adm-pill--chat  { background:rgba(155,143,255,.18); color:#9B8FFF; }
.adm-pill--new   { background:rgba(46,213,115,.14); color:#2ED573; }
.adm-pill--pend  { background:rgba(255,200,0,.14);  color:#FFC800; }
.adm-pill--done  { background:rgba(107,104,152,.18); color:rgba(239,238,234,.45); }
.adm-act-btn { background:rgba(107,104,152,.14); border:1px solid rgba(107,104,152,.22); border-radius:7px; padding:5px 11px; font-size:.72rem; color:rgba(239,238,234,.65); cursor:pointer; transition:all .22s; font-family:'Anonymous Pro',monospace; }
.adm-act-btn:hover { border-color:#9B8FFF; color:#9B8FFF; }
.adm-empty { text-align:center; padding:60px 0; color:rgba(239,238,234,.3); }
.adm-empty-icon { font-size:3rem; margin-bottom:12px; display:block; }
@media (max-width:860px) { .adm-layout { flex-direction:column; } .adm-sidebar { width:100%; height:auto; position:relative; padding:74px 0 12px; flex-direction:row; flex-wrap:wrap; } .adm-stats { grid-template-columns:1fr 1fr; } }
`;

const ALERTAS = [
  { id:'#0041', tipo:'sos',  local:'São José dos Campos, SP', hora:'há 3 min',  status:'new',  anon:'Usuária #4412' },
  { id:'#0040', tipo:'chat', local:'São Paulo, SP',           hora:'há 11 min', status:'pend', anon:'Usuária #4401' },
  { id:'#0039', tipo:'chat', local:'Campinas, SP',            hora:'há 28 min', status:'done', anon:'Usuária #4399' },
  { id:'#0038', tipo:'sos',  local:'Santos, SP',              hora:'há 45 min', status:'done', anon:'Usuária #4388' },
];
const PROFS = [
  { nome:'Dra. Ana Lima',      papel:'Psicóloga',         status:'online', n:3 },
  { nome:'Ass. Social Marcos', papel:'Assist. Social',    status:'online', n:2 },
  { nome:'Dra. Paula Reis',    papel:'Psicóloga',         status:'busy',   n:4 },
  { nome:'Agente Roberto',     papel:'Ag. Segurança',     status:'offline', n:0 },
];
const NAV = [
  { icon:'📊', label:'Dashboard',      key:'dashboard' },
  { icon:'🆘', label:'Alertas S.O.S.', key:'alertas'   },
  { icon:'💬', label:'Chat / Direct',  key:'chat'       },
  { icon:'📈', label:'Relatórios',     key:'rel'        },
  { icon:'👥', label:'Profissionais',  key:'profs'      },
  { icon:'📅', label:'Agendamentos',   key:'agenda'     },
];

export default function AdminPage() {
  const [aba, setAba] = useState('dashboard');
  const { user } = useAuth();

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="adm-layout">
        <aside className="adm-sidebar">
          <div className="adm-sidebar__brand">
            <p className="adm-sidebar__title">🦉 NIRA Admin</p>
            <p className="adm-sidebar__sub">Painel Administrativo</p>
          </div>
          <p className="adm-nav-sect">Principal</p>
          {NAV.map(n => (
            <button key={n.key} className={`adm-nav-item${aba===n.key?' adm-nav-item--active':''}`} onClick={() => setAba(n.key)}>
              {n.icon} {n.label}
            </button>
          ))}
          <p className="adm-nav-sect">Gestão</p>
          <Link to="/admin/conteudos" className="adm-nav-item">📚 Conteúdos</Link>
          <Link to="/admin/usuarios"  className="adm-nav-item">👤 Usuários</Link>
          <Link to="/mapa"            className="adm-nav-item">🗺️ Mapa / Equipes</Link>
        </aside>

        <main className="adm-content">
          <div className="adm-topbar">
            <div>
              <h1 className="adm-page-title">{NAV.find(n=>n.key===aba)?.icon || '📊'} {NAV.find(n=>n.key===aba)?.label || 'Dashboard'}</h1>
              <p className="adm-page-sub">Bem-vindo, {user?.nome} · NIRA Admin · E.Y.E 2026</p>
            </div>
            <div className="adm-live"><span className="adm-live-dot" />Sistema online</div>
          </div>

          {aba === 'dashboard' && (
            <>
              <div className="adm-stats">
                {[
                  { lbl:'Alertas Ativos',       num:'3', delta:'+2 hoje', danger:true  },
                  { lbl:'Atendimentos Hoje',     num:'18', delta:'+18 hoje', danger:false },
                  { lbl:'Usuários no Chat',      num:'7',  delta:'ao vivo',  danger:false },
                  { lbl:'Profissionais Online',  num:'3',  delta:'disponíveis', danger:false },
                ].map(s => (
                  <div key={s.lbl} className={`adm-stat${s.danger?' adm-stat--danger':''}`}>
                    <p className="adm-stat__lbl">{s.lbl}</p>
                    <p className="adm-stat__num">{s.num}</p>
                    <p className="adm-stat__delta">{s.delta}</p>
                  </div>
                ))}
              </div>
              <p className="adm-sect-title">Últimos Alertas <span className="adm-tbadge">3 ativos</span></p>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead><tr><th>ID</th><th>Tipo</th><th>Usuária</th><th>Local</th><th>Hora</th><th>Status</th><th>Ação</th></tr></thead>
                  <tbody>
                    {ALERTAS.map(a => (
                      <tr key={a.id}>
                        <td style={{ fontFamily:"'Anonymous Pro',monospace",fontSize:'.77rem' }}>{a.id}</td>
                        <td><span className={`adm-pill adm-pill--${a.tipo}`}>{a.tipo==='sos'?'🆘 S.O.S.':'💬 Chat'}</span></td>
                        <td style={{ color:'rgba(239,238,234,.45)',fontSize:'.78rem' }}>{a.anon}</td>
                        <td>{a.local}</td>
                        <td style={{ color:'rgba(239,238,234,.38)',fontSize:'.78rem' }}>{a.hora}</td>
                        <td><span className={`adm-pill adm-pill--${a.status}`}>{a.status==='new'?'Novo':a.status==='pend'?'Pendente':'Concluído'}</span></td>
                        <td><button className="adm-act-btn" onClick={()=>alert(`Abrindo caso ${a.id}...`)}>Atender →</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="adm-sect-title">Profissionais de Plantão</p>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead><tr><th>Nome</th><th>Função</th><th>Status</th><th>Atend. Hoje</th></tr></thead>
                  <tbody>
                    {PROFS.map(p => (
                      <tr key={p.nome}>
                        <td style={{ fontFamily:"'Anonymous Pro',monospace" }}>{p.nome}</td>
                        <td style={{ color:'rgba(239,238,234,.48)' }}>{p.papel}</td>
                        <td><span className={`adm-pill ${p.status==='online'?'adm-pill--new':p.status==='busy'?'adm-pill--pend':'adm-pill--done'}`}>{p.status==='online'?'● Online':p.status==='busy'?'● Ocupado':'○ Offline'}</span></td>
                        <td>{p.n} atend.</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {aba === 'alertas' && (
            <>
              <div className="adm-stats" style={{ gridTemplateColumns:'1fr 1fr 1fr' }}>
                <div className="adm-stat adm-stat--danger"><p className="adm-stat__lbl">S.O.S. Ativos</p><p className="adm-stat__num">2</p><p className="adm-stat__delta">Atenção imediata</p></div>
                <div className="adm-stat"><p className="adm-stat__lbl">S.O.S. Hoje</p><p className="adm-stat__num">5</p><p className="adm-stat__delta">+2 vs ontem</p></div>
                <div className="adm-stat"><p className="adm-stat__lbl">Tempo Médio Resp.</p><p className="adm-stat__num">1.8<span style={{fontSize:'.9rem'}}>min</span></p><p className="adm-stat__delta">Meta &lt;3min ✓</p></div>
              </div>
              <p className="adm-sect-title">🆘 Todos os Alertas S.O.S.</p>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead><tr><th>ID</th><th>Usuária</th><th>Local</th><th>Hora</th><th>Status</th><th>Ação</th></tr></thead>
                  <tbody>
                    {ALERTAS.filter(a=>a.tipo==='sos').map(a=>(
                      <tr key={a.id}>
                        <td style={{fontFamily:"'Anonymous Pro',monospace",fontSize:'.77rem'}}>{a.id}</td>
                        <td style={{color:'rgba(239,238,234,.45)',fontSize:'.78rem'}}>{a.anon}</td>
                        <td>{a.local}</td>
                        <td style={{color:'rgba(239,238,234,.38)',fontSize:'.78rem'}}>{a.hora}</td>
                        <td><span className={`adm-pill adm-pill--${a.status}`}>{a.status==='new'?'Novo':a.status==='pend'?'Pendente':'Concluído'}</span></td>
                        <td><button className="adm-act-btn" onClick={()=>alert(`Ver mapa: ${a.local}`)}>Ver Mapa →</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {aba === 'profs' && (
            <>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18,flexWrap:'wrap',gap:12}}>
                <p className="adm-sect-title" style={{margin:0}}>👥 Profissionais Cadastrados</p>
                <button className="btn btn-primary btn-sm" onClick={()=>alert('Formulário de cadastro — em desenvolvimento')}>+ Novo</button>
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead><tr><th>Nome</th><th>Função</th><th>Status</th><th>Atend. Hoje</th><th>Ação</th></tr></thead>
                  <tbody>
                    {PROFS.map(p=>(
                      <tr key={p.nome}>
                        <td style={{fontFamily:"'Anonymous Pro',monospace"}}>{p.nome}</td>
                        <td style={{color:'rgba(239,238,234,.48)'}}>{p.papel}</td>
                        <td><span className={`adm-pill ${p.status==='online'?'adm-pill--new':p.status==='busy'?'adm-pill--pend':'adm-pill--done'}`}>{p.status==='online'?'● Online':p.status==='busy'?'● Ocupado':'○ Offline'}</span></td>
                        <td>{p.n}</td>
                        <td><button className="adm-act-btn" onClick={()=>alert(`Editar: ${p.nome}`)}>Editar</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {['chat','rel','agenda'].includes(aba) && (
            <div className="adm-empty">
              <span className="adm-empty-icon">{NAV.find(n=>n.key===aba)?.icon}</span>
              <p style={{color:'rgba(239,238,234,.45)',fontWeight:700,marginBottom:6}}>Módulo em desenvolvimento</p>
              <p style={{fontSize:'.85rem'}}>Implementado na Sprint 2 e 3 do projeto.</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
