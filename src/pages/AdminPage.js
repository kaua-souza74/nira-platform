import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth, ESPECIALIDADES, ESPEC_CHAT, ESPEC_MAPA } from '../contexts/AuthContext';
import {
  LayoutDashboard, AlertTriangle, BookOpen, Users, Map, MessageSquare,
  Shield, CheckCircle, FileText, Search, Pencil, Trash2, ArrowDownToLine,
  Link2, Save, PlusCircle, MessageCircle
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════
   ADMIN PAGE — Painel Unificado
   Sidebar SEMPRE visível.
   Todas as sub-seções (conteúdos, usuários, profissionais,
   relatórios) ficam DENTRO desta página como abas.
   Não redireciona para páginas separadas.
══════════════════════════════════════════════════════════ */

const css = `
/* Layout raiz */
.adm-root{
  display:flex;
  min-height:100vh;
  background:var(--bg-deep);
  /* padding-top para a navbar pill */
  padding-top:var(--nav-h,72px);
}

/* ── SIDEBAR ── */
.adm-sidebar{
  width:240px;
  flex-shrink:0;
  background:rgba(16,14,34,.95);
  border-right:1px solid rgba(107,104,152,.16);
  display:flex;
  flex-direction:column;
  position:sticky;
  top:var(--nav-h,72px);
  height:calc(100vh - var(--nav-h,72px));
  overflow-y:auto;
}
.adm-sidebar::-webkit-scrollbar{width:3px;}
.adm-sidebar::-webkit-scrollbar-thumb{background:rgba(107,104,152,.22);border-radius:3px;}

.adm-sidebar__brand{
  padding:20px 18px 18px;
  border-bottom:1px solid rgba(107,104,152,.12);
  flex-shrink:0;
}
.adm-sidebar__brand-row{display:flex;align-items:center;gap:9px;margin-bottom:4px;}
.adm-sidebar__brand-icon{display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:7px;background:linear-gradient(135deg,rgba(107,104,152,.3),rgba(155,143,255,.2));border:1px solid rgba(155,143,255,.25);flex-shrink:0;}
.adm-sidebar__brand-icon svg{width:13px;height:13px;stroke:#9B8FFF;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
.adm-sidebar__brand-name{font-weight:700;font-size:.9rem;color:#F4F6F8;letter-spacing:.06em;}
.adm-nav-item svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;}
.adm-sidebar__brand-role{
  display:inline-flex;align-items:center;gap:5px;
  background:rgba(155,143,255,.14);border:1px solid rgba(155,143,255,.25);
  border-radius:100px;padding:3px 10px;
  font-size:.62rem;color:#9B8FFF;letter-spacing:.08em;font-weight:700;
  font-family:'Anonymous Pro',monospace;
}

.adm-nav-sect{
  padding:16px 16px 6px;
  font-size:.58rem;color:rgba(239,238,234,.22);
  letter-spacing:.14em;text-transform:uppercase;
  font-family:'Anonymous Pro',monospace;
  flex-shrink:0;
}
.adm-nav-item{
  display:flex;align-items:center;gap:10px;
  padding:10px 16px;
  font-family:'Poppins',sans-serif;font-size:.83rem;
  color:rgba(239,238,234,.5);cursor:pointer;
  transition:all .22s;
  border-left:2.5px solid transparent;
  background:none;border-right:none;border-top:none;border-bottom:none;
  width:100%;text-align:left;
  border-left-color:transparent;
}
.adm-nav-item:hover{color:#F4F6F8;background:rgba(107,104,152,.1);}
.adm-nav-item--active{
  color:#C4BCFF;
  border-left-color:#9B8FFF;
  background:rgba(155,143,255,.07);
  font-weight:600;
}
.adm-nav-badge{
  margin-left:auto;
  background:rgba(255,71,87,.2);color:#FF4757;
  border-radius:100px;padding:1px 7px;font-size:.6rem;font-weight:700;
}

/* ── CONTEÚDO PRINCIPAL ── */
.adm-main{
  flex:1;
  min-width:0;
  overflow-y:auto;
}

/* Header de cada tab */
.adm-tab-header{
  display:flex;align-items:center;justify-content:space-between;
  gap:16px;flex-wrap:wrap;
  padding:28px 32px 24px;
  border-bottom:1px solid rgba(107,104,152,.1);
  background:rgba(16,14,34,.5);
  backdrop-filter:blur(8px);
  position:sticky;top:0;z-index:10;
}
.adm-tab-title{font-weight:800;font-size:1.3rem;color:#F4F6F8;letter-spacing:-.02em;}
.adm-tab-sub{font-size:.78rem;color:rgba(239,238,234,.38);margin-top:3px;}
.adm-tab-actions{display:flex;gap:9px;align-items:center;}

/* Body da tab */
.adm-tab-body{padding:28px 32px;}

/* ── STATS ── */
.adm-stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px;}
.adm-stat-card{
  background:rgb(22,20,44);
  border:1px solid rgba(107,104,152,.16);
  border-radius:14px;padding:18px 20px;
  transition:border-color .28s;
}
.adm-stat-card:hover{border-color:rgba(155,143,255,.25);}
.adm-stat-lbl{font-size:.65rem;color:rgba(239,238,234,.38);text-transform:uppercase;letter-spacing:.08em;margin-bottom:7px;font-family:'Anonymous Pro',monospace;}
.adm-stat-num{font-weight:800;font-size:1.9rem;color:#F4F6F8;line-height:1;margin-bottom:3px;letter-spacing:-.02em;}
.adm-stat-delta{font-size:.68rem;color:var(--success);}
.adm-stat-card--danger .adm-stat-num{color:#FF4757;}

/* ── TABELAS ── */
.adm-table-wrap{background:rgb(20,18,40);border:1px solid rgba(107,104,152,.15);border-radius:14px;overflow:hidden;margin-bottom:20px;}
.adm-table{width:100%;border-collapse:collapse;}
.adm-table th{background:rgba(107,104,152,.1);padding:11px 16px;font-size:.62rem;color:rgba(239,238,234,.38);letter-spacing:.1em;text-transform:uppercase;text-align:left;font-weight:700;white-space:nowrap;}
.adm-table td{padding:13px 16px;font-size:.845rem;color:rgba(239,238,234,.72);border-top:1px solid rgba(107,104,152,.08);}
.adm-table tr:hover td{background:rgba(107,104,152,.05);}
.adm-act-btn{background:rgba(107,104,152,.14);border:1px solid rgba(107,104,152,.22);border-radius:8px;padding:5px 11px;font-size:.72rem;color:rgba(239,238,234,.65);cursor:pointer;transition:all .22s;font-family:'Poppins',sans-serif;}
.adm-act-btn:hover{border-color:rgba(155,143,255,.4);color:#F4F6F8;}
.adm-act-btn--del{color:rgba(255,71,87,.7);border-color:rgba(255,71,87,.2);}
.adm-act-btn--del:hover{background:rgba(255,71,87,.1);border-color:#FF4757;color:#FF4757;}

/* ── CONTEÚDO CARDS ── */
.adm-cont-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.adm-cont-card{
  background:rgb(22,20,44);
  border:1px solid rgba(107,104,152,.16);
  border-radius:16px;padding:20px;
  transition:all .28s;
  display:flex;flex-direction:column;gap:10px;
}
.adm-cont-card:hover{border-color:rgba(155,143,255,.28);transform:translateY(-2px);}
.adm-cont-card__head{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;}
.adm-cont-card__title{font-weight:700;font-size:.92rem;color:#F4F6F8;line-height:1.4;flex:1;}
.adm-cont-cat{background:rgba(107,104,152,.18);border-radius:100px;padding:3px 10px;font-size:.62rem;color:rgba(239,238,234,.55);white-space:nowrap;}
.adm-cont-by{font-size:.75rem;color:rgba(239,238,234,.45);}
.adm-cont-by strong{color:rgba(239,238,234,.65);}
.adm-cont-footer{display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:1px solid rgba(107,104,152,.1);}
.adm-cont-date{font-size:.68rem;color:rgba(239,238,234,.28);font-family:'Anonymous Pro',monospace;}
.adm-cont-actions{display:flex;gap:6px;}

/* Status badges de conteúdo */
.adm-cont-status{display:inline-flex;align-items:center;gap:5px;border-radius:100px;padding:3px 10px;font-size:.63rem;font-weight:700;}
.adm-cont-status--pub{background:rgba(46,213,115,.14);color:#2ED573;}
.adm-cont-status--draft{background:rgba(255,200,0,.12);color:#FFC800;}
.adm-cont-status--rev{background:rgba(155,143,255,.14);color:#9B8FFF;}

/* Filtros */
.adm-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px;}
.adm-filter{background:none;border:1.5px solid rgba(107,104,152,.2);border-radius:100px;padding:6px 16px;font-family:'Poppins',sans-serif;font-size:.78rem;font-weight:600;color:rgba(239,238,234,.5);cursor:pointer;transition:all .22s;}
.adm-filter:hover{border-color:rgba(155,143,255,.38);color:rgba(239,238,234,.85);}
.adm-filter--active{background:rgba(155,143,255,.14);border-color:#9B8FFF;color:#C4BCFF;}

/* Formulário de novo usuário */
.adm-form-box{
  background:rgb(22,20,44);border:1px solid rgba(107,104,152,.18);
  border-radius:16px;padding:24px;margin-bottom:22px;
  animation:fadeInUp .3s ease;
}
.adm-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.adm-form-full{grid-column:1/-1;}
.adm-espec-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.adm-espec-card{display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(107,104,152,.1);border:1.5px solid rgba(107,104,152,.2);border-radius:11px;cursor:pointer;transition:all .22s;}
.adm-espec-card:hover{border-color:rgba(155,143,255,.38);}
.adm-espec-card--sel{border-color:#9B8FFF;background:rgba(155,143,255,.14);}
.adm-espec-card--chat{border-color:rgba(46,213,115,.28) !important;background:rgba(46,213,115,.07) !important;}
.adm-espec-card--mapa{border-color:rgba(255,200,0,.25) !important;background:rgba(255,200,0,.06) !important;}

/* Role badges */
.adm-role{display:inline-block;border-radius:100px;padding:3px 10px;font-size:.63rem;font-weight:700;}
.adm-role--adm{background:rgba(155,143,255,.16);color:#9B8FFF;}
.adm-role--ong{background:rgba(46,213,115,.12);color:#2ED573;}
.adm-role--func{background:rgba(255,200,0,.12);color:#FFC800;}
.adm-espec-badge{display:inline-flex;align-items:center;gap:4px;border-radius:100px;padding:3px 9px;font-size:.62rem;font-weight:700;}
.adm-espec-badge--chat{background:rgba(46,213,115,.12);border:1px solid rgba(46,213,115,.22);color:#2ED573;}
.adm-espec-badge--mapa{background:rgba(255,200,0,.12);border:1px solid rgba(255,200,0,.22);color:#FFC800;}
.adm-espec-badge--none{background:rgba(107,104,152,.14);border:1px solid rgba(107,104,152,.22);color:rgba(239,238,234,.4);}

/* Alerta SOS */
.adm-sos-card{
  background:rgba(255,71,87,.08);border:1.5px solid rgba(255,71,87,.28);
  border-radius:14px;padding:16px 18px;margin-bottom:16px;
  animation:glowPulse 2.5s ease-in-out infinite;
  display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;
}
.adm-sos-label{font-weight:700;font-size:.85rem;color:#FF4757;margin-bottom:3px;}
.adm-sos-sub{font-size:.75rem;color:rgba(239,238,234,.5);}

/* Vazio */
.adm-empty{text-align:center;padding:60px 0;color:rgba(239,238,234,.3);}
.adm-empty__icon{font-size:2.5rem;margin-bottom:12px;display:block;opacity:.4;}

/* Encaminhamentos */
.adm-enc-item{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;background:rgba(107,104,152,.08);border:1px solid rgba(107,104,152,.14);border-radius:12px;margin-bottom:9px;flex-wrap:wrap;}
.adm-enc-name{font-weight:700;font-size:.85rem;color:#F4F6F8;margin-bottom:3px;}
.adm-enc-sub{font-size:.75rem;color:rgba(239,238,234,.42);}

@media(max-width:900px){
  .adm-root{flex-direction:column;}
  .adm-sidebar{width:100%;height:auto;position:relative;flex-direction:row;flex-wrap:wrap;}
  .adm-stats-row{grid-template-columns:1fr 1fr;}
  .adm-cont-grid{grid-template-columns:1fr 1fr;}
  .adm-form-grid{grid-template-columns:1fr;}
  .adm-espec-grid{grid-template-columns:1fr;}
  .adm-table-wrap{overflow-x:auto;}
}
@media(max-width:580px){
  .adm-cont-grid{grid-template-columns:1fr;}
  .adm-stats-row{grid-template-columns:1fr 1fr;}
  .adm-tab-body{padding:20px 16px;}
  .adm-tab-header{padding:20px 16px 16px;}
}
`;

/* ── DADOS MOCK ── */
const ALERTAS_MOCK = [
  { id:'#0041', tipo:'sos',  anon:'Usuária #4412', local:'São José dos Campos, SP', hora:'há 3 min',  status:'new'  },
  { id:'#0040', tipo:'chat', anon:'Usuária #4401', local:'São Paulo, SP',           hora:'há 11 min', status:'pend' },
  { id:'#0039', tipo:'chat', anon:'Usuária #4399', local:'Campinas, SP',            hora:'há 28 min', status:'done' },
];

const CONTEUDOS_MOCK = [
  { id:1, titulo:'Seus Direitos: Lei Maria da Penha',      cat:'Direitos',    ong:'ONG Vida Nova',          data:'05/03/2026', status:'pub'   },
  { id:2, titulo:'Saúde Mental: Como Lidar com o Trauma', cat:'Saúde Mental',ong:'Centro Renascer',         data:'28/02/2026', status:'pub'   },
  { id:3, titulo:'Segurança Digital: Proteja seu Celular', cat:'Segurança',   ong:'Instituto Digital Seguro',data:'22/02/2026', status:'draft' },
  { id:4, titulo:'Como Sair de Casa com Segurança',       cat:'Segurança',   ong:'ONG Vida Nova',           data:'18/02/2026', status:'pub'   },
  { id:5, titulo:'Como Fazer um Boletim de Ocorrência',   cat:'Direitos',    ong:'Centro Renascer',         data:'12/02/2026', status:'rev'   },
];

const ENC_MOCK = [
  { nome:'Caso #0039 — Campinas, SP', sub:'Encaminhar para CRAM + Psicóloga', area:'Campinas' },
  { nome:'Caso #0038 — Santos, SP',   sub:'Encaminhar para Casa-Abrigo',      area:'Santos'   },
];

function getEspecInfo(espec) { return ESPECIALIDADES.find(e => e.value === espec); }

/* ═══════════════════════════════════
   TABS INTERNAS
═══════════════════════════════════ */

/* Tab: Dashboard */
function TabDashboard() {
  return (
    <>
      <div className="adm-stats-row">
        {[
          { lbl:'Alertas Ativos',       num:'3',  delta:'+2 hoje',    danger:true  },
          { lbl:'Atendimentos Hoje',     num:'18', delta:'+18 hoje',   danger:false },
          { lbl:'Usuárias no Chat',      num:'7',  delta:'ao vivo',    danger:false },
          { lbl:'Profissionais Online',  num:'3',  delta:'disponíveis',danger:false },
        ].map(s => (
          <div key={s.lbl} className={`adm-stat-card${s.danger?' adm-stat-card--danger':''}`}>
            <p className="adm-stat-lbl">{s.lbl}</p>
            <p className="adm-stat-num">{s.num}</p>
            <p className="adm-stat-delta">{s.delta}</p>
          </div>
        ))}
      </div>

      {/* SOS ativos */}
      {ALERTAS_MOCK.filter(a=>a.tipo==='sos'&&a.status==='new').map(a => (
        <div key={a.id} className="adm-sos-card">
          <div>
            <p className="adm-sos-label" style={{display:'flex',alignItems:'center',gap:7}}><AlertTriangle size={14}/> S.O.S. {a.id}</p>
            <p className="adm-sos-sub">{a.anon} · {a.local} · {a.hora}</p>
          </div>
          <button className="btn btn-danger btn-sm" onClick={()=>alert(`Abrindo caso ${a.id}...`)}>
            Atender agora →
          </button>
        </div>
      ))}

      <p className="adm-nav-sect" style={{padding:'0 0 12px',fontSize:'.68rem',color:'rgba(239,238,234,.38)',letterSpacing:'.1em',textTransform:'uppercase',fontFamily:"'Anonymous Pro',monospace"}}>
        Últimos atendimentos
      </p>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>ID</th><th>Tipo</th><th>Usuária</th><th>Local</th><th>Hora</th><th>Status</th><th>Ação</th></tr></thead>
          <tbody>
            {ALERTAS_MOCK.map(a => (
              <tr key={a.id}>
                <td style={{fontFamily:"'Anonymous Pro',monospace",fontSize:'.77rem'}}>{a.id}</td>
                <td><span className={`adm-pill adm-pill--${a.tipo}`}>{a.tipo==='sos'?'SOS':'Chat'}</span></td>
                <td style={{color:'rgba(239,238,234,.45)',fontSize:'.78rem'}}>{a.anon}</td>
                <td>{a.local}</td>
                <td style={{color:'rgba(239,238,234,.35)',fontSize:'.75rem'}}>{a.hora}</td>
                <td><span className={`adm-pill adm-pill--${a.status}`}>{a.status==='new'?'Novo':a.status==='pend'?'Pendente':'Concluído'}</span></td>
                <td><button className="adm-act-btn" onClick={()=>alert(`Abrindo ${a.id}`)}>Ver →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* Tab: Conteúdos */
function TabConteudos({ user }) {
  const [filtro, setFiltro]     = useState('todos');
  const [conteudos, setConteudos] = useState(CONTEUDOS_MOCK);
  const [mostrarForm, setForm]  = useState(false);
  const [form, setF]            = useState({ titulo:'', cat:'Direitos', resumo:'' });

  const filtrados = filtro==='todos' ? conteudos : conteudos.filter(c=>c.status===filtro);

  function toggleStatus(id, novoStatus) {
    setConteudos(cs => cs.map(c => c.id===id ? {...c,status:novoStatus} : c));
  }
  function deletar(id) {
    if(window.confirm('Excluir este conteúdo?')) setConteudos(cs=>cs.filter(c=>c.id!==id));
  }
  function handleCriar(e) {
    e.preventDefault();
    if(!form.titulo.trim()) return;
    setConteudos(cs => [{id:Date.now(),titulo:form.titulo,cat:form.cat,ong:user?.nome||'ADM',data:new Date().toLocaleDateString('pt-BR'),status:'draft'},...cs]);
    setF({titulo:'',cat:'Direitos',resumo:''});
    setForm(false);
  }

  const statusLabel = { pub:'Publicado', draft:'Rascunho', rev:'Em Revisão' };
  const statusClass = { pub:'pub', draft:'draft', rev:'rev' };

  return (
    <>
      {mostrarForm && (
        <div className="adm-form-box">
          <p style={{fontWeight:700,fontSize:'1rem',color:'#F4F6F8',marginBottom:18,display:'flex',alignItems:'center',gap:8}}><Pencil size={15}/> Novo Conteúdo</p>
          <form onSubmit={handleCriar}>
            <div className="adm-form-grid">
              <div className="form-group">
                <label className="form-label">Título</label>
                <input className="form-input" type="text" placeholder="Título do artigo" value={form.titulo} onChange={e=>setF(f=>({...f,titulo:e.target.value}))} required/>
              </div>
              <div className="form-group">
                <label className="form-label">Categoria</label>
                <select className="form-select" value={form.cat} onChange={e=>setF(f=>({...f,cat:e.target.value}))}>
                  {['Direitos','Saúde Mental','Segurança','Família'].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{display:'flex',gap:10}}>
              <button type="submit" className="btn btn-primary btn-sm" style={{display:'flex',alignItems:'center',gap:6}}><Save size={13}/> Salvar Rascunho</button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={()=>setForm(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="adm-filters">
        {[['todos','Todos'],['pub','Publicados'],['draft','Rascunhos'],['rev','Em Revisão']].map(([k,l])=>(
          <button key={k} className={`adm-filter${filtro===k?' adm-filter--active':''}`} onClick={()=>setFiltro(k)}>{l}</button>
        ))}
        <span style={{marginLeft:'auto',fontSize:'.72rem',color:'rgba(239,238,234,.28)',fontFamily:"'Anonymous Pro',monospace",alignSelf:'center'}}>
          {filtrados.length} artigos
        </span>
      </div>

      <div className="adm-cont-grid">
        {filtrados.map(c => (
          <div className="adm-cont-card" key={c.id}>
            <div className="adm-cont-card__head">
              <h3 className="adm-cont-card__title">{c.titulo}</h3>
              <span className="adm-cont-cat">{c.cat}</span>
            </div>
            <p className="adm-cont-by">por <strong>{c.ong}</strong></p>
            <div className="adm-cont-footer">
              <span className="adm-cont-date">{c.data}</span>
              <span className={`adm-cont-status adm-cont-status--${statusClass[c.status]}`}>
                {statusLabel[c.status]}
              </span>
            </div>
            <div className="adm-cont-actions" style={{display:'flex',gap:7}}>
              <button className="adm-act-btn" style={{display:'flex',alignItems:'center',gap:5}}><Pencil size={12}/> Editar</button>
              {c.status==='draft'||c.status==='rev'
                ? <button className="adm-act-btn" onClick={()=>toggleStatus(c.id,'pub')} style={{display:'flex',alignItems:'center',gap:5}}><CheckCircle size={12}/> Publicar</button>
                : <button className="adm-act-btn" onClick={()=>toggleStatus(c.id,'draft')} style={{display:'flex',alignItems:'center',gap:5}}><ArrowDownToLine size={12}/> Rascunho</button>
              }
              <button className="adm-act-btn adm-act-btn--del" onClick={()=>deletar(c.id)} style={{display:'flex',alignItems:'center',gap:5}}><Trash2 size={12}/></button>
            </div>
          </div>
        ))}
      </div>

      {filtrados.length === 0 && (
        <div className="adm-empty"><BookOpen size={36} style={{marginBottom:12,opacity:.3}}/><p>Nenhum conteúdo aqui.</p></div>
      )}

      {/* Encaminhamentos */}
      <p style={{fontWeight:700,fontSize:'.88rem',color:'#F4F6F8',margin:'28px 0 12px',display:'flex',alignItems:'center',gap:8}}>
        <Link2 size={14}/> Encaminhar Casos para ONGs
      </p>
      {ENC_MOCK.map(e => (
        <div key={e.nome} className="adm-enc-item">
          <div><p className="adm-enc-name">{e.nome}</p><p className="adm-enc-sub">{e.sub}</p></div>
          <div style={{display:'flex',gap:8}}>
            <button className="adm-act-btn" onClick={()=>alert(`Encaminhando para ${e.area}`)}>Encaminhar →</button>
            <button className="adm-act-btn">Ver Caso</button>
          </div>
        </div>
      ))}
    </>
  );
}

/* Tab: Usuários + Profissionais (fundidos) */
function TabUsuarios({ user, usuarios, adicionarUsuario, toggleAtivo, removerUsuario, getVinculoLabel, getONGs }) {
  const [mostrarForm, setForm]  = useState(false);
  const [filtroRole, setFiltroRole] = useState('todos');
  const [erroForm, setErroForm] = useState('');
  const [form, setF] = useState({ usuario:'', senha:'', nome:'', role:'funcionario', area:'', especialidade:'', vinculo:'nira' });
  const ongs = getONGs();

  const filtrados = filtroRole === 'todos' ? usuarios : usuarios.filter(u => {
    if (filtroRole === 'funcionario') return u.role === 'funcionario';
    if (filtroRole === 'ong')         return u.role === 'ong';
    if (filtroRole === 'adm')         return u.role === 'adm';
    if (filtroRole === 'chat')        return u.role === 'funcionario' && ESPEC_CHAT.includes(u.especialidade);
    if (filtroRole === 'mapa')        return u.role === 'funcionario' && ESPEC_MAPA.includes(u.especialidade);
    return true;
  });

  function handleCriar(e) {
    e.preventDefault();
    if (!form.usuario.trim()||!form.senha.trim()||!form.nome.trim()) { setErroForm('Preencha todos os campos.'); return; }
    if (form.role==='funcionario'&&!form.especialidade) { setErroForm('Selecione a especialidade.'); return; }
    if (usuarios.find(u=>u.usuario===form.usuario)) { setErroForm('Usuário já existe.'); return; }
    let ongId=null, vinculo=form.role==='funcionario'?(form.vinculo||'nira'):null;
    if(vinculo?.startsWith('ong:')) ongId=parseInt(vinculo.split(':')[1]);
    adicionarUsuario({ usuario:form.usuario.toLowerCase().trim(), senha:form.senha, nome:form.nome.trim(), role:form.role, area:form.area||null, especialidade:form.role==='funcionario'?form.especialidade:null, vinculo, ongId, ativo:true });
    setF({usuario:'',senha:'',nome:'',role:'funcionario',area:'',especialidade:'',vinculo:'nira'});
    setErroForm(''); setForm(false);
    alert(`${form.nome.trim()} criado com sucesso!`);
  }

  return (
    <>
      {mostrarForm && (
        <div className="adm-form-box">
          <p style={{fontWeight:700,fontSize:'1rem',color:'#F4F6F8',marginBottom:18,display:'flex',alignItems:'center',gap:8}}><PlusCircle size={15}/> Novo Usuário / Profissional</p>
          {erroForm && <div style={{background:'rgba(255,71,87,.1)',border:'1px solid rgba(255,71,87,.28)',borderRadius:8,padding:'9px 14px',fontSize:'.82rem',color:'#FF4757',marginBottom:14}}>{erroForm}</div>}
          <form onSubmit={handleCriar}>
            <div className="adm-form-grid">
              <div className="form-group"><label className="form-label">Nome *</label><input className="form-input" type="text" placeholder="Nome completo" value={form.nome} onChange={e=>setF(f=>({...f,nome:e.target.value}))} required/></div>
              <div className="form-group"><label className="form-label">Login *</label><input className="form-input" type="text" placeholder="usuario.login" value={form.usuario} onChange={e=>setF(f=>({...f,usuario:e.target.value.toLowerCase().replace(/\s/g,'')}))} required/></div>
              <div className="form-group"><label className="form-label">Senha *</label><input className="form-input" type="password" placeholder="Mín. 6 caracteres" value={form.senha} onChange={e=>setF(f=>({...f,senha:e.target.value}))} required minLength={6}/></div>
              <div className="form-group"><label className="form-label">Perfil *</label>
                <select className="form-select" value={form.role} onChange={e=>setF(f=>({...f,role:e.target.value,especialidade:''}))}>
                  <option value="funcionario">Profissional / Funcionário</option>
                  <option value="ong">ONG / Parceira</option>
                  <option value="adm">Administrador</option>
                </select>
              </div>
              {form.role==='funcionario' && (
                <div className="form-group adm-form-full">
                  <label className="form-label">Especialidade *</label>
                  <div className="adm-espec-grid">
                    {ESPECIALIDADES.map(e=>(
                      <div key={e.value} className={`adm-espec-card${form.especialidade===e.value?' adm-espec-card--sel':''} adm-espec-card--${e.acesso}`} onClick={()=>setF(f=>({...f,especialidade:e.value}))}>
                        <span style={{fontSize:'1.2rem'}}>{e.icon}</span>
                        <div>
                          <p style={{fontWeight:700,fontSize:'.8rem',color:'#F4F6F8',marginBottom:1}}>{e.label}</p>
                          <p style={{fontSize:'.63rem',fontFamily:"'Anonymous Pro',monospace",color:e.acesso==='chat'?'#2ED573':'#FFC800'}}>
                            {e.acesso==='chat'?'Chat':'Mapa'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {form.role==='funcionario' && (
                <div className="form-group adm-form-full">
                  <label className="form-label">Vínculo Institucional</label>
                  <select className="form-select" value={form.vinculo} onChange={e=>setF(f=>({...f,vinculo:e.target.value}))}>
                    <option value="nira">Equipe NIRA</option>
                    <option value="autonomo">Autônomo(a)</option>
                    {ongs.map(o=><option key={o.id} value={`ong:${o.id}`}>{o.nome}</option>)}
                  </select>
                </div>
              )}
            </div>
            <div style={{display:'flex',gap:10}}>
              <button type="submit" className="btn btn-primary btn-sm" style={{display:'flex',alignItems:'center',gap:6}}><CheckCircle size={13}/> Criar</button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={()=>{setForm(false);setErroForm('');}}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {/* Filtros */}
      <div className="adm-filters">
        {[['todos','Todos'],['adm','ADM'],['ong','ONGs'],['chat','Psicólogos'],['mapa','Agentes']].map(([k,l])=>(
          <button key={k} className={`adm-filter${filtroRole===k?' adm-filter--active':''}`} onClick={()=>setFiltroRole(k)}>{l}</button>
        ))}
        <span style={{marginLeft:'auto',fontSize:'.72rem',color:'rgba(239,238,234,.28)',fontFamily:"'Anonymous Pro',monospace",alignSelf:'center'}}>
          {filtrados.length} usuários
        </span>
      </div>

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>Nome</th><th>Login</th><th>Perfil</th><th>Especialidade</th><th>Vínculo</th><th>Acessa</th><th>Status</th><th>Ações</th></tr></thead>
          <tbody>
            {filtrados.map(u => {
              const esp = getEspecInfo(u.especialidade);
              return (
                <tr key={u.id}>
                  <td style={{fontWeight:600}}>{u.nome}</td>
                  <td style={{fontFamily:"'Anonymous Pro',monospace",fontSize:'.76rem',color:'rgba(239,238,234,.45)'}}>{u.usuario}</td>
                  <td><span className={`adm-role adm-role--${u.role==='funcionario'?'func':u.role}`}>{u.role==='adm'?'ADM':u.role==='ong'?'ONG':'Prof.'}</span></td>
                  <td style={{fontSize:'.82rem'}}>{esp?`${esp.label}`:'—'}</td>
                  <td style={{fontSize:'.75rem',color:'rgba(239,238,234,.55)'}}>{getVinculoLabel(u.vinculo,u.ongId)}</td>
                  <td>
                    {u.role==='adm' ? <span className="adm-espec-badge adm-espec-badge--none">Tudo</span>
                    : u.role==='ong' ? <span className="adm-espec-badge adm-espec-badge--chat">Chat</span>
                    : esp ? <span className={`adm-espec-badge adm-espec-badge--${esp.acesso}`}>{esp.acesso==='chat'?'Chat':'Mapa'}</span>
                    : '—'}
                  </td>
                  <td><span className={`adm-pill adm-pill--${u.ativo?'new':'done'}`}>{u.ativo?'● Ativo':'○ Inativo'}</span></td>
                  <td>
                    <div style={{display:'flex',gap:6}}>
                      <button className="adm-act-btn" onClick={()=>toggleAtivo(u.id)}>{u.ativo?'Desativar':'Ativar'}</button>
                      <button className="adm-act-btn adm-act-btn--del" onClick={()=>{ if(u.id===user?.id){alert('Não pode remover sua conta.');return;} if(window.confirm('Remover?')) removerUsuario(u.id); }} style={{display:'flex',alignItems:'center',gap:4}}><Trash2 size={12}/></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ═══════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════ */
const NAV = [
  { key:'dashboard', Icon:LayoutDashboard, label:'Dashboard',             section:'Principal' },
  { key:'alertas',   Icon:AlertTriangle,   label:'Alertas S.O.S.',        section:'Principal', badge:2 },
  { key:'conteudos', Icon:BookOpen,        label:'Conteúdos',             section:'Gestão'    },
  { key:'usuarios',  Icon:Users,           label:'Usuários & Profissionais', section:'Gestão' },
  { key:'mapa',      Icon:Map,             label:'Mapa / Equipes',        section:'Gestão'    },
  { key:'chat',      Icon:MessageSquare,   label:'Atendimentos',          section:'Gestão'    },
];

export default function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Lê tab da URL: /admin?tab=conteudos
  const searchParams = new URLSearchParams(location.search);
  const tabFromUrl   = searchParams.get('tab');

  const [tabAtiva, setTabAtiva] = useState(tabFromUrl || 'dashboard');
  const { user, usuarios, adicionarUsuario, toggleAtivo, removerUsuario, getVinculoLabel, getONGs } = useAuth();

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== tabAtiva) setTabAtiva(tabFromUrl);
  }, [tabFromUrl, tabAtiva]);

  function irParaTab(key) {
    setTabAtiva(key);
    navigate(`/admin?tab=${key}`, { replace:true });
  }

  // Seções da sidebar agrupadas
  const sections = [...new Set(NAV.map(n => n.section))];

  const tabInfo = NAV.find(n => n.key === tabAtiva) || NAV[0];

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="adm-root">

        {/* ── SIDEBAR PERMANENTE ── */}
        <aside className="adm-sidebar">
          <div className="adm-sidebar__brand">
            <div className="adm-sidebar__brand-row">
              <span className="adm-sidebar__brand-icon"><Shield /></span>
              <span className="adm-sidebar__brand-name">NIRA Admin</span>
            </div>
            <span className="adm-sidebar__brand-role">{user?.role?.toUpperCase()} — {user?.nome}</span>
          </div>

          {sections.map(sec => (
            <div key={sec}>
              <div className="adm-nav-sect">{sec}</div>
              {NAV.filter(n => n.section === sec).map(n => (
                <button
                  key={n.key}
                  className={`adm-nav-item${tabAtiva===n.key?' adm-nav-item--active':''}`}
                  onClick={() => irParaTab(n.key)}
                >
                  <n.Icon /> {n.label}
                  {n.badge ? <span className="adm-nav-badge">{n.badge}</span> : null}
                </button>
              ))}
            </div>
          ))}
        </aside>

        {/* ── CONTEÚDO PRINCIPAL ── */}
        <main className="adm-main">
          <div className="adm-tab-header">
            <div>
              <h1 className="adm-tab-title" style={{display:'flex',alignItems:'center',gap:10}}>{tabInfo.Icon && <tabInfo.Icon size={20}/>} {tabInfo.label}</h1>
              <p className="adm-tab-sub">NIRA Admin · E.Y.E 2026</p>
            </div>
            <div className="adm-tab-actions">
              <div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(46,213,115,.1)',border:'1px solid rgba(46,213,115,.22)',borderRadius:100,padding:'5px 13px',fontSize:'.72rem',color:'#2ED573'}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:'#2ED573',boxShadow:'0 0 6px #2ED573',flexShrink:0,animation:'sosPulse 2s ease-in-out infinite'}}/>
                Sistema online
              </div>
              {tabAtiva==='conteudos' && (
                <button className="btn btn-primary btn-sm" onClick={()=>{}}>+ Novo Conteúdo</button>
              )}
              {tabAtiva==='usuarios' && (
                <button className="btn btn-primary btn-sm" onClick={()=>{}}>+ Novo Usuário</button>
              )}
            </div>
          </div>

          <div className="adm-tab-body">
            {tabAtiva === 'dashboard' && <TabDashboard />}
            {tabAtiva === 'alertas'   && (
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead><tr><th>ID</th><th>Tipo</th><th>Usuária</th><th>Local</th><th>Hora</th><th>Status</th><th>Ação</th></tr></thead>
                  <tbody>
                    {ALERTAS_MOCK.map(a=>(
                      <tr key={a.id}>
                        <td style={{fontFamily:"'Anonymous Pro',monospace",fontSize:'.77rem'}}>{a.id}</td>
                        <td><span className={`adm-pill adm-pill--${a.tipo}`}>{a.tipo==='sos'?'SOS':'Chat'}</span></td>
                        <td style={{color:'rgba(239,238,234,.45)',fontSize:'.78rem'}}>{a.anon}</td>
                        <td>{a.local}</td>
                        <td style={{color:'rgba(239,238,234,.35)',fontSize:'.75rem'}}>{a.hora}</td>
                        <td><span className={`adm-pill adm-pill--${a.status}`}>{a.status==='new'?'Novo':a.status==='pend'?'Pendente':'Concluído'}</span></td>
                        <td><button className="adm-act-btn" onClick={()=>alert(`Abrindo ${a.id}`)}>Atender →</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {tabAtiva === 'conteudos' && <TabConteudos user={user} />}
            {tabAtiva === 'usuarios'  && (
              <TabUsuarios
                user={user}
                usuarios={usuarios}
                adicionarUsuario={adicionarUsuario}
                toggleAtivo={toggleAtivo}
                removerUsuario={removerUsuario}
                getVinculoLabel={getVinculoLabel}
                getONGs={getONGs}
              />
            )}
            {tabAtiva === 'mapa' && (
              <div style={{textAlign:'center',padding:'60px 0'}}>
                <Map size={48} style={{marginBottom:14,opacity:.3,color:'#9B8FFF'}}/>
                <p style={{fontWeight:700,fontSize:'1.1rem',color:'#F4F6F8',marginBottom:8}}>Mapa de Equipes</p>
                <p style={{fontSize:'.88rem',color:'rgba(239,238,234,.45)',marginBottom:24}}>O mapa interativo está disponível em tela cheia.</p>
                <Link to="/mapa" className="btn btn-primary">Abrir Mapa Completo →</Link>
              </div>
            )}
            {tabAtiva === 'chat' && (
              <div style={{textAlign:'center',padding:'60px 0'}}>
                <MessageSquare size={48} style={{marginBottom:14,opacity:.3,color:'#9B8FFF'}}/>
                <p style={{fontWeight:700,fontSize:'1.1rem',color:'#F4F6F8',marginBottom:8}}>Atendimentos</p>
                <p style={{fontSize:'.88rem',color:'rgba(239,238,234,.45)',marginBottom:24}}>Acesse o painel de atendimento completo.</p>
                <Link to="/chat-psicologo" className="btn btn-primary">Abrir Atendimentos →</Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
