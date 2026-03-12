import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

const css = `
.cadm-page { min-height:100vh; background:var(--bg-deep); padding:80px 0 60px; }
.cadm-topbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:32px; flex-wrap:wrap; gap:16px; }
.cadm-title { font-size:1.6rem; font-weight:700; color:#F4F6F8; }
.cadm-sub { font-size:.82rem; color:rgba(239,238,234,.38); margin-top:2px; }
.cadm-role-tag { display:inline-flex; align-items:center; gap:6px; font-size:.72rem; font-weight:700; padding:5px 13px; border-radius:100px; }
.cadm-role-tag--adm { background:rgba(155,143,255,.14); border:1px solid rgba(155,143,255,.3); color:#9B8FFF; }
.cadm-role-tag--ong { background:rgba(46,213,115,.12);  border:1px solid rgba(46,213,115,.28); color:#2ED573; }
/* Filtros */
.cadm-filters { display:flex; gap:10px; margin-bottom:24px; flex-wrap:wrap; align-items:center; }
.cadm-filter { background:rgba(107,104,152,.1); border:1.5px solid rgba(107,104,152,.2); border-radius:100px; padding:6px 16px; font-size:.76rem; color:rgba(239,238,234,.55); cursor:pointer; transition:all .25s; font-family:'Anonymous Pro',monospace; font-weight:700; }
.cadm-filter:hover { border-color:rgba(155,143,255,.4); color:rgba(239,238,234,.85); }
.cadm-filter--active { background:rgba(155,143,255,.14); border-color:#9B8FFF; color:#9B8FFF; }
/* Grid de cards */
.cadm-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-bottom:32px; }
.cadm-card { background:var(--bg-card); border:1px solid rgba(107,104,152,.18); border-radius:16px; padding:22px 20px; backdrop-filter:blur(8px); transition:all .28s; }
.cadm-card:hover { border-color:rgba(155,143,255,.28); transform:translateY(-3px); }
.cadm-card__head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; gap:8px; }
.cadm-card__title { font-weight:700; font-size:.95rem; color:#F4F6F8; line-height:1.38; }
.cadm-card__tag { background:rgba(107,104,152,.18); border-radius:100px; padding:3px 10px; font-size:.62rem; color:rgba(239,238,234,.5); letter-spacing:.07em; white-space:nowrap; }
.cadm-card__desc { font-size:.855rem; color:rgba(239,238,234,.55); line-height:1.65; margin-bottom:14px; }
.cadm-card__meta { display:flex; justify-content:space-between; align-items:center; padding-top:12px; border-top:1px solid rgba(107,104,152,.12); font-size:.7rem; color:rgba(239,238,234,.32); }
.cadm-card__actions { display:flex; gap:7px; margin-top:14px; }
/* Formulário de novo conteúdo */
.cadm-form-wrap { background:var(--bg-card); border:1px solid rgba(107,104,152,.2); border-radius:18px; padding:30px 28px; backdrop-filter:blur(8px); margin-bottom:32px; animation:fadeInUp .3s ease; }
.cadm-form-title { font-weight:700; font-size:1.05rem; color:#F4F6F8; margin-bottom:22px; }
.cadm-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.cadm-form-full { grid-column:1/-1; }
.cadm-textarea { width:100%; background:rgba(107,104,152,.1); border:1.5px solid rgba(107,104,152,.25); border-radius:var(--radius-md); padding:12px 16px; font-family:'Anonymous Pro',monospace; font-size:.88rem; color:var(--white); resize:vertical; min-height:120px; transition:border-color .3s; }
.cadm-textarea:focus { outline:none; border-color:rgba(155,143,255,.45); }
.cadm-textarea::placeholder { color:rgba(239,238,234,.25); }
.cadm-form-actions { display:flex; gap:10px; margin-top:20px; }
/* Encaminhamentos (só ADM) */
.cadm-enc-card { background:rgba(107,104,152,.09); border:1px solid rgba(107,104,152,.18); border-radius:13px; padding:18px 20px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between; gap:14px; flex-wrap:wrap; }
.cadm-enc-info-name { font-weight:700; font-size:.9rem; color:#F4F6F8; margin-bottom:3px; }
.cadm-enc-info-sub { font-size:.78rem; color:rgba(239,238,234,.45); }
@media (max-width:860px) { .cadm-grid { grid-template-columns:1fr 1fr; } .cadm-form-grid { grid-template-columns:1fr; } }
@media (max-width:560px) { .cadm-grid { grid-template-columns:1fr; } }
`;

const CONTEUDOS_ADM = [
  { id:1, titulo:'Seus Direitos: Lei Maria da Penha', tag:'Direitos',     ong:'ONG Vida Nova',             data:'05/03/2026', status:'publicado' },
  { id:2, titulo:'Saúde Mental: Como Lidar com o Trauma', tag:'Saúde Mental', ong:'Centro Renascer',       data:'28/02/2026', status:'publicado' },
  { id:3, titulo:'Segurança Digital: Proteja seu Celular', tag:'Segurança',   ong:'Instituto Digital Seguro', data:'22/02/2026', status:'rascunho'   },
  { id:4, titulo:'Como Sair de Casa com Segurança',   tag:'Segurança',    ong:'ONG Vida Nova',             data:'18/02/2026', status:'publicado' },
  { id:5, titulo:'Como Fazer um Boletim de Ocorrência', tag:'Direitos',   ong:'Centro Renascer',           data:'12/02/2026', status:'revisao'   },
];

const ENCAMINHAMENTOS = [
  { nome:'Caso #0039 — Campinas, SP', sub:'Encaminhar para: Delegacia + Psicóloga', area:'Campinas' },
  { nome:'Caso #0038 — Santos, SP',   sub:'Encaminhar para: CRAM Santos',           area:'Santos'   },
];

export default function ConteudosAdmPage() {
  const { user } = useAuth();
  const [filtro, setFiltro]       = useState('Todos');
  const [mostrarForm, setForm]    = useState(false);
  const [conteudos, setConteudos] = useState(CONTEUDOS_ADM);
  const [form, setFormData]       = useState({ titulo:'', tag:'Direitos', resumo:'', corpo:'' });

  const isAdm = user?.role === 'adm';

  const filtrados = filtro === 'Todos' ? conteudos : conteudos.filter(c => c.status === filtro);

  function handlePublicar(e) {
    e.preventDefault();
    if (!form.titulo.trim()) return;
    const novo = { id: Date.now(), titulo:form.titulo, tag:form.tag, ong:user?.nome || 'ONG', data:new Date().toLocaleDateString('pt-BR'), status:'rascunho' };
    setConteudos(c => [novo, ...c]);
    setFormData({ titulo:'', tag:'Direitos', resumo:'', corpo:'' });
    setForm(false);
    alert('Conteúdo salvo como rascunho!');
  }

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="cadm-page">
        <div className="container">
          <div className="cadm-topbar">
            <div>
              <h1 className="cadm-title">📚 Gestão de Conteúdos</h1>
              <p className="cadm-sub">Gerencie artigos e materiais publicados para usuários da plataforma.</p>
            </div>
            <div style={{display:'flex',gap:10,alignItems:'center'}}>
              <span className={`cadm-role-tag cadm-role-tag--${user?.role==='adm'?'adm':'ong'}`}>
                {user?.role?.toUpperCase()} — {user?.nome}
              </span>
              <button className="btn btn-primary btn-sm" onClick={() => setForm(v => !v)}>
                {mostrarForm ? '✕ Cancelar' : '+ Novo Conteúdo'}
              </button>
            </div>
          </div>

          {/* Formulário novo conteúdo */}
          {mostrarForm && (
            <div className="cadm-form-wrap">
              <p className="cadm-form-title">✏️ Novo Conteúdo</p>
              <form onSubmit={handlePublicar}>
                <div className="cadm-form-grid">
                  <div className="form-group">
                    <label className="form-label">Título</label>
                    <input className="form-input" type="text" placeholder="Título do artigo" value={form.titulo} onChange={e=>setFormData(f=>({...f,titulo:e.target.value}))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Categoria</label>
                    <select className="form-select" value={form.tag} onChange={e=>setFormData(f=>({...f,tag:e.target.value}))}>
                      {['Direitos','Saúde Mental','Segurança','Família','Outros'].map(c=><option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group cadm-form-full">
                    <label className="form-label">Resumo</label>
                    <input className="form-input" type="text" placeholder="Breve descrição do conteúdo" value={form.resumo} onChange={e=>setFormData(f=>({...f,resumo:e.target.value}))} />
                  </div>
                  <div className="form-group cadm-form-full">
                    <label className="form-label">Conteúdo</label>
                    <textarea className="cadm-textarea" placeholder="Escreva o conteúdo completo do artigo..." value={form.corpo} onChange={e=>setFormData(f=>({...f,corpo:e.target.value}))} />
                  </div>
                </div>
                <div className="cadm-form-actions">
                  <button type="submit" className="btn btn-primary">💾 Salvar Rascunho</button>
                  <button type="button" className="btn btn-ghost" onClick={()=>setForm(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          )}

          {/* Filtros */}
          <div className="cadm-filters">
            {['Todos','publicado','rascunho','revisao'].map(f=>(
              <button key={f} className={`cadm-filter${filtro===f?' cadm-filter--active':''}`} onClick={()=>setFiltro(f)}>
                {f === 'Todos' ? 'Todos' : f === 'publicado' ? '✅ Publicado' : f === 'rascunho' ? '📝 Rascunho' : '🔍 Em Revisão'}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="cadm-grid">
            {filtrados.map(c => (
              <div className="cadm-card" key={c.id}>
                <div className="cadm-card__head">
                  <h3 className="cadm-card__title">{c.titulo}</h3>
                  <span className="cadm-card__tag">{c.tag}</span>
                </div>
                <p className="cadm-card__desc">Publicado por {c.ong}</p>
                <div className="cadm-card__meta">
                  <span>{c.data}</span>
                  <span className={`adm-pill ${c.status==='publicado'?'adm-pill--new':c.status==='rascunho'?'adm-pill--pend':'adm-pill--chat'}`} style={{fontSize:'.62rem'}}>
                    {c.status==='publicado'?'✅ Publicado':c.status==='rascunho'?'📝 Rascunho':'🔍 Revisão'}
                  </span>
                </div>
                <div className="cadm-card__actions">
                  <button className="adm-act-btn">✏️ Editar</button>
                  {isAdm && <button className="adm-act-btn" onClick={()=>alert(`Publicar: ${c.titulo}`)}>
                    {c.status==='publicado'?'⬇️ Despublicar':'✅ Publicar'}
                  </button>}
                  {isAdm && <button className="adm-act-btn" style={{color:'#FF4757'}} onClick={()=>setConteudos(cs=>cs.filter(x=>x.id!==c.id))}>🗑️</button>}
                </div>
              </div>
            ))}
          </div>

          {/* Encaminhamentos para ONGs — só ADM */}
          {isAdm && (
            <>
              <div style={{marginBottom:18,marginTop:12}}>
                <p className="adm-sect-title">🔗 Encaminhar Casos para ONGs</p>
                <p style={{fontSize:'.85rem',color:'rgba(239,238,234,.45)',marginBottom:16}}>
                  Como ADM, você pode encaminhar casos abertos para ONGs e funcionários das áreas.
                </p>
              </div>
              {ENCAMINHAMENTOS.map(e => (
                <div className="cadm-enc-card" key={e.nome}>
                  <div>
                    <p className="cadm-enc-info-name">{e.nome}</p>
                    <p className="cadm-enc-info-sub">{e.sub}</p>
                  </div>
                  <div style={{display:'flex',gap:8}}>
                    <button className="adm-act-btn" onClick={()=>alert(`Encaminhando ${e.nome} para a área de ${e.area}...`)}>Encaminhar →</button>
                    <button className="adm-act-btn">Ver Caso</button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
