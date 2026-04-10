import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

const css = `
.cadm-page {
  min-height: 100vh;
  background: var(--bg-deep);
  padding: 40px 0 60px;
}
.cadm-topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 36px;
  flex-wrap: wrap;
  gap: 16px;
}
.cadm-title-row { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
.cadm-title-icon {
  width: 38px; height: 38px; border-radius: 11px;
  background: rgba(107,104,152,.12);
  border: 1px solid rgba(107,104,152,.2);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.cadm-title-icon svg { width: 18px; height: 18px; stroke: #9B8FFF; fill: none; stroke-width: 1.65; stroke-linecap: round; stroke-linejoin: round; }
.cadm-title { font-size: 1.45rem; font-weight: 700; color: #F4F6F8; }
.cadm-sub { font-size: .82rem; color: rgba(239,238,234,.38); margin-top: 2px; padding-left: 50px; }
.cadm-topbar-right { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.cadm-role-tag {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: .7rem; font-weight: 700; padding: 5px 13px;
  border-radius: 100px;
}
.cadm-role-tag svg { width: 11px; height: 11px; stroke: currentColor; fill: none; stroke-width: 2; }
.cadm-role-tag--adm { background: rgba(155,143,255,.12); border: 1px solid rgba(155,143,255,.26); color: #9B8FFF; }
.cadm-role-tag--ong { background: rgba(46,213,115,.1);   border: 1px solid rgba(46,213,115,.22); color: #2ED573; }

.cadm-filters { display: flex; gap: 8px; margin-bottom: 28px; flex-wrap: wrap; align-items: center; }
.cadm-filter {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(107,104,152,.09);
  border: 1.5px solid rgba(107,104,152,.18);
  border-radius: 100px; padding: 6px 15px;
  font-size: .74rem; color: rgba(239,238,234,.5);
  cursor: pointer; transition: all .22s;
  font-family: 'Anonymous Pro', monospace;
  font-weight: 700;
}
.cadm-filter svg { width: 11px; height: 11px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.cadm-filter:hover { border-color: rgba(155,143,255,.35); color: rgba(239,238,234,.8); }
.cadm-filter--active { background: rgba(155,143,255,.12); border-color: rgba(155,143,255,.4); color: #9B8FFF; }

.cadm-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 40px; }
.cadm-card {
  background: var(--bg-card);
  border: 1px solid rgba(107,104,152,.16);
  border-radius: 16px; padding: 22px 20px;
  backdrop-filter: blur(8px);
  transition: border-color .25s, transform .25s;
  display: flex; flex-direction: column;
}
.cadm-card:hover { border-color: rgba(155,143,255,.26); transform: translateY(-2px); }
.cadm-card__head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; gap: 10px; }
.cadm-card__title { font-weight: 700; font-size: .92rem; color: #F4F6F8; line-height: 1.4; flex: 1; }
.cadm-card__tag {
  background: rgba(107,104,152,.14);
  border: 1px solid rgba(107,104,152,.2);
  border-radius: 100px; padding: 3px 9px;
  font-size: .6rem; color: rgba(239,238,234,.48);
  letter-spacing: .06em; white-space: nowrap;
  font-family: 'Anonymous Pro', monospace;
}
.cadm-card__publisher { font-size: .78rem; color: rgba(239,238,234,.4); margin-bottom: 14px; }
.cadm-card__meta {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 12px; border-top: 1px solid rgba(107,104,152,.1);
  font-size: .68rem; color: rgba(239,238,234,.3);
  margin-top: auto;
}
.cadm-status {
  display: inline-flex; align-items: center; gap: 5px;
  border-radius: 100px; padding: 3px 9px;
  font-size: .62rem; font-weight: 700;
  letter-spacing: .06em;
}
.cadm-status svg { width: 9px; height: 9px; stroke: currentColor; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.cadm-status--pub  { background: rgba(46,213,115,.12);  border: 1px solid rgba(46,213,115,.22);  color: #2ED573; }
.cadm-status--ras  { background: rgba(255,200,0,.1);    border: 1px solid rgba(255,200,0,.2);    color: #FFC800; }
.cadm-status--rev  { background: rgba(155,143,255,.12); border: 1px solid rgba(155,143,255,.22); color: #9B8FFF; }

.cadm-card__actions { display: flex; gap: 6px; margin-top: 13px; }
.cadm-act {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(107,104,152,.1);
  border: 1px solid rgba(107,104,152,.18);
  border-radius: 8px; padding: 5px 11px;
  font-size: .72rem; color: rgba(239,238,234,.6);
  cursor: pointer; transition: all .2s;
  font-family: 'Anonymous Pro', monospace;
}
.cadm-act svg { width: 11px; height: 11px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.cadm-act:hover { border-color: rgba(155,143,255,.35); color: #9B8FFF; }
.cadm-act--danger:hover { border-color: rgba(255,71,87,.35); color: #FF4757; }
.cadm-act--pub { border-color: rgba(46,213,115,.2); color: #2ED573; }
.cadm-act--pub:hover { background: rgba(46,213,115,.08); }

.cadm-form-wrap {
  background: var(--bg-card);
  border: 1px solid rgba(107,104,152,.18);
  border-radius: 18px; padding: 28px 26px;
  backdrop-filter: blur(8px);
  margin-bottom: 28px;
  animation: fadeInUp .28s ease;
}
.cadm-form-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
.cadm-form-title { font-weight: 700; font-size: .98rem; color: #F4F6F8; display: flex; align-items: center; gap: 8px; }
.cadm-form-title svg { width: 16px; height: 16px; stroke: #9B8FFF; fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.cadm-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.cadm-form-full { grid-column: 1/-1; }
.cadm-textarea {
  width: 100%; background: rgba(107,104,152,.08);
  border: 1.5px solid rgba(107,104,152,.22);
  border-radius: 12px; padding: 12px 15px;
  font-family: 'Anonymous Pro', monospace;
  font-size: .86rem; color: var(--white);
  resize: vertical; min-height: 110px;
  transition: border-color .25s;
}
.cadm-textarea:focus { outline: none; border-color: rgba(155,143,255,.42); }
.cadm-textarea::placeholder { color: rgba(239,238,234,.22); }
.cadm-form-actions { display: flex; gap: 9px; margin-top: 18px; }

.cadm-enc-section { margin-top: 8px; }
.cadm-enc-header { display: flex; align-items: center; gap: 9px; margin-bottom: 6px; }
.cadm-enc-header svg { width: 16px; height: 16px; stroke: #9B8FFF; fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.cadm-enc-title { font-weight: 700; font-size: 1rem; color: #F4F6F8; }
.cadm-enc-sub { font-size: .82rem; color: rgba(239,238,234,.4); margin-bottom: 16px; }
.cadm-enc-card {
  background: rgba(107,104,152,.07);
  border: 1px solid rgba(107,104,152,.16);
  border-radius: 13px; padding: 16px 18px;
  margin-bottom: 12px;
  display: flex; align-items: center; justify-content: space-between;
  gap: 14px; flex-wrap: wrap;
  transition: border-color .22s;
}
.cadm-enc-card:hover { border-color: rgba(155,143,255,.22); }
.cadm-enc-info-name { font-weight: 700; font-size: .88rem; color: #F4F6F8; margin-bottom: 3px; }
.cadm-enc-info-sub { font-size: .76rem; color: rgba(239,238,234,.42); }
.cadm-enc-actions { display: flex; gap: 7px; flex-shrink: 0; }

@media (max-width: 860px) {
  .cadm-grid { grid-template-columns: 1fr 1fr; }
  .cadm-form-grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .cadm-grid { grid-template-columns: 1fr; }
  .cadm-topbar { flex-direction: column; }
}
`;

const CONTEUDOS_ADM = [
  { id:1, titulo:'Seus direitos: lei Maria da Penha',       tag:'Direitos',     ong:'ONG Vida Nova',              data:'05/03/2026', status:'publicado' },
  { id:2, titulo:'Saúde mental: como lidar com o trauma',   tag:'Saúde Mental', ong:'Centro Renascer',            data:'28/02/2026', status:'publicado' },
  { id:3, titulo:'Segurança digital: proteja seu celular',  tag:'Segurança',    ong:'Instituto Digital Seguro',   data:'22/02/2026', status:'rascunho'   },
  { id:4, titulo:'Como sair de casa com segurança',         tag:'Segurança',    ong:'ONG Vida Nova',              data:'18/02/2026', status:'publicado' },
  { id:5, titulo:'Como fazer um boletim de ocorrência',     tag:'Direitos',     ong:'Centro Renascer',            data:'12/02/2026', status:'revisao'   },
];

const ENCAMINHAMENTOS = [
  { nome:'Caso #0039 — Campinas, SP', sub:'Encaminhar para: Delegacia + psicóloga', area:'Campinas' },
  { nome:'Caso #0038 — Santos, SP',   sub:'Encaminhar para: CRAM Santos',           area:'Santos'   },
];

const StatusBadge = ({ status }) => {
  if (status === 'publicado') return (
    <span className="cadm-status cadm-status--pub">
      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
      Publicado
    </span>
  );
  if (status === 'rascunho') return (
    <span className="cadm-status cadm-status--ras">
      <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      Rascunho
    </span>
  );
  return (
    <span className="cadm-status cadm-status--rev">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      Em revisão
    </span>
  );
};

const filterMeta = [
  { key: 'Todos',     label: 'Todos', icon: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></> },
  { key: 'publicado', label: 'Publicado', icon: <><polyline points="20 6 9 17 4 12"/></> },
  { key: 'rascunho',  label: 'Rascunho',  icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></> },
  { key: 'revisao',   label: 'Em revisão', icon: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></> },
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
    const novo = { id: Date.now(), titulo: form.titulo, tag: form.tag, ong: user?.nome || 'ONG', data: new Date().toLocaleDateString('pt-BR'), status: 'rascunho' };
    setConteudos(c => [novo, ...c]);
    setFormData({ titulo:'', tag:'Direitos', resumo:'', corpo:'' });
    setForm(false);
  }

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="cadm-page">
        <div className="container">

          <div className="cadm-topbar">
            <div>
              <div className="cadm-title-row">
                <div className="cadm-title-icon">
                  <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <h1 className="cadm-title">Gestão de conteúdos</h1>
              </div>
              <p className="cadm-sub">Gerencie artigos e materiais publicados para os usuários da plataforma.</p>
            </div>
            <div className="cadm-topbar-right">
              <span className={`cadm-role-tag cadm-role-tag--${user?.role === 'adm' ? 'adm' : 'ong'}`}>
                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                {user?.role?.toUpperCase()} — {user?.nome}
              </span>
              <button className="btn btn-primary btn-sm" onClick={() => setForm(v => !v)}
                style={{ display:'flex', alignItems:'center', gap:6 }}>
                {mostrarForm ? (
                  <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancelar</>
                ) : (
                  <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Novo conteúdo</>
                )}
              </button>
            </div>
          </div>

          {mostrarForm && (
            <div className="cadm-form-wrap">
              <div className="cadm-form-header">
                <p className="cadm-form-title">
                  <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  Novo conteúdo
                </p>
              </div>
              <form onSubmit={handlePublicar}>
                <div className="cadm-form-grid">
                  <div className="form-group">
                    <label className="form-label">Título</label>
                    <input className="form-input" type="text" placeholder="Título do artigo" value={form.titulo} onChange={e => setFormData(f => ({ ...f, titulo: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Categoria</label>
                    <select className="form-select" value={form.tag} onChange={e => setFormData(f => ({ ...f, tag: e.target.value }))}>
                      {['Direitos', 'Saúde Mental', 'Segurança', 'Família', 'Outros'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group cadm-form-full">
                    <label className="form-label">Resumo</label>
                    <input className="form-input" type="text" placeholder="Breve descrição do conteúdo" value={form.resumo} onChange={e => setFormData(f => ({ ...f, resumo: e.target.value }))} />
                  </div>
                  <div className="form-group cadm-form-full">
                    <label className="form-label">Conteúdo</label>
                    <textarea className="cadm-textarea" placeholder="Escreva o conteúdo completo do artigo..." value={form.corpo} onChange={e => setFormData(f => ({ ...f, corpo: e.target.value }))} />
                  </div>
                </div>
                <div className="cadm-form-actions">
                  <button type="submit" className="btn btn-primary" style={{display:'flex',alignItems:'center',gap:6}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                    Salvar rascunho
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => setForm(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          )}

          <div className="cadm-filters">
            {filterMeta.map(f => (
              <button key={f.key} className={`cadm-filter${filtro === f.key ? ' cadm-filter--active' : ''}`} onClick={() => setFiltro(f.key)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                {f.label}
              </button>
            ))}
          </div>

          <div className="cadm-grid">
            {filtrados.map(c => (
              <div className="cadm-card" key={c.id}>
                <div className="cadm-card__head">
                  <h3 className="cadm-card__title">{c.titulo}</h3>
                  <span className="cadm-card__tag">{c.tag}</span>
                </div>
                <p className="cadm-card__publisher">Publicado por {c.ong}</p>
                <div className="cadm-card__meta">
                  <span>{c.data}</span>
                  <StatusBadge status={c.status} />
                </div>
                <div className="cadm-card__actions">
                  <button className="cadm-act">
                    <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    Editar
                  </button>
                  {isAdm && (
                    <button className={`cadm-act${c.status === 'publicado' ? '' : ' cadm-act--pub'}`}
                      onClick={() => alert(`${c.status === 'publicado' ? 'Despublicar' : 'Publicar'}: ${c.titulo}`)}>
                      {c.status === 'publicado' ? (
                        <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:11,height:11}}><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>Despublicar</>
                      ) : (
                        <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:11,height:11}}><polyline points="20 6 9 17 4 12"/></svg>Publicar</>
                      )}
                    </button>
                  )}
                  {isAdm && (
                    <button className="cadm-act cadm-act--danger" onClick={() => setConteudos(cs => cs.filter(x => x.id !== c.id))}>
                      <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {isAdm && (
            <div className="cadm-enc-section">
              <div className="cadm-enc-header">
                <svg viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                <p className="cadm-enc-title">Encaminhar casos para organizações</p>
              </div>
              <p className="cadm-enc-sub">Como administrador, você pode encaminhar casos abertos para organizações e funcionários das áreas.</p>
              {ENCAMINHAMENTOS.map(e => (
                <div className="cadm-enc-card" key={e.nome}>
                  <div>
                    <p className="cadm-enc-info-name">{e.nome}</p>
                    <p className="cadm-enc-info-sub">{e.sub}</p>
                  </div>
                  <div className="cadm-enc-actions">
                    <button className="cadm-act" onClick={() => alert(`Encaminhando ${e.nome} para a área de ${e.area}...`)}>
                      <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      Encaminhar
                    </button>
                    <button className="cadm-act">
                      <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      Ver caso
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
