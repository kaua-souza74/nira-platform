import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth, ESPECIALIDADES, ESPEC_CHAT, ESPEC_MAPA, VINCULOS } from '../contexts/AuthContext';

const css = `
.gu-page { min-height:100vh; background:var(--bg-deep); padding:80px 0 60px; }
.gu-topbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; flex-wrap:wrap; gap:14px; }
.gu-title { font-size:1.55rem; font-weight:700; color:#F4F6F8; }
.gu-sub   { font-size:.82rem; color:rgba(239,238,234,.38); margin-top:2px; }

/* Aviso */
.gu-aviso {
  background:rgba(255,71,87,.07); border:1px solid rgba(255,71,87,.22);
  border-radius:12px; padding:14px 18px; margin-bottom:24px;
  font-size:.86rem; color:rgba(239,238,234,.65); line-height:1.65;
}
.gu-aviso strong { color:#FF4757; }

/* Cards de especialidade */
.gu-espec-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:4px; }
.gu-espec-card {
  display:flex; align-items:center; gap:10px;
  padding:10px 13px;
  background:rgba(107,104,152,.1);
  border:1.5px solid rgba(107,104,152,.2);
  border-radius:11px; cursor:pointer; transition:all .22s;
}
.gu-espec-card:hover { border-color:rgba(155,143,255,.38); background:rgba(155,143,255,.08); }
.gu-espec-card--sel  { border-color:#9B8FFF; background:rgba(155,143,255,.14); }
.gu-espec-card--chat { border-color:rgba(46,213,115,.3)  !important; background:rgba(46,213,115,.08)  !important; }
.gu-espec-card--mapa { border-color:rgba(255,200,0,.28)  !important; background:rgba(255,200,0,.07)   !important; }
.gu-espec-icon  { font-size:1.2rem; flex-shrink:0; }
.gu-espec-label { font-weight:700; font-size:.8rem; color:#F4F6F8; margin-bottom:1px; }
.gu-espec-acesso{ font-size:.66rem; font-family:'Anonymous Pro',monospace; letter-spacing:.06em; }
.gu-espec-acesso--chat { color:#2ED573; }
.gu-espec-acesso--mapa { color:#FFC800; }

/* Form */
.gu-form-wrap {
  background:var(--bg-card); border:1px solid rgba(107,104,152,.2);
  border-radius:18px; padding:28px; backdrop-filter:blur(8px); margin-bottom:28px;
}
.gu-form-title { font-weight:700; font-size:1rem; color:#F4F6F8; margin-bottom:20px; }
.gu-form-grid  { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.gu-form-full  { grid-column:1/-1; }
.gu-form-actions { display:flex; gap:10px; margin-top:18px; }

/* Tabela */
.gu-table-wrap { background:var(--bg-card); border:1px solid rgba(107,104,152,.16); border-radius:14px; overflow:hidden; backdrop-filter:blur(8px); }
.gu-table { width:100%; border-collapse:collapse; }
.gu-table th { background:rgba(107,104,152,.1); padding:11px 15px; font-size:.63rem; color:rgba(239,238,234,.38); letter-spacing:.1em; text-transform:uppercase; text-align:left; font-weight:700; }
.gu-table td { padding:12px 15px; font-size:.845rem; color:rgba(239,238,234,.72); border-top:1px solid rgba(107,104,152,.08); }
.gu-table tr:hover td { background:rgba(107,104,152,.05); }

/* Badges */
.gu-role { display:inline-block; border-radius:100px; padding:3px 10px; font-size:.64rem; font-weight:700; letter-spacing:.07em; }
.gu-role--adm  { background:rgba(155,143,255,.16); color:#9B8FFF; }
.gu-role--ong  { background:rgba(46,213,115,.12);  color:#2ED573; }
.gu-role--func { background:rgba(255,200,0,.12);   color:#FFC800; }
.gu-espec-badge {
  display:inline-flex; align-items:center; gap:5px;
  border-radius:100px; padding:3px 9px;
  font-size:.62rem; font-weight:700;
}
.gu-espec-badge--chat { background:rgba(46,213,115,.12);  border:1px solid rgba(46,213,115,.25);  color:#2ED573; }
.gu-espec-badge--mapa { background:rgba(255,200,0,.12);   border:1px solid rgba(255,200,0,.25);   color:#FFC800; }
.gu-espec-badge--none { background:rgba(107,104,152,.14); border:1px solid rgba(107,104,152,.22); color:rgba(239,238,234,.4); }

.gu-act-btn { background:rgba(107,104,152,.12); border:1px solid rgba(107,104,152,.2); border-radius:7px; padding:4px 10px; font-size:.7rem; color:rgba(239,238,234,.6); cursor:pointer; transition:all .22s; font-family:'Poppins',sans-serif; }
.gu-act-btn:hover { border-color:#9B8FFF; color:#9B8FFF; }
.gu-act-btn--del { color:#FF4757; border-color:rgba(255,71,87,.2); }
.gu-act-btn--del:hover { background:rgba(255,71,87,.1); border-color:#FF4757; }

/* Legenda de acesso */
.gu-acesso-legend {
  display:flex; gap:10px; flex-wrap:wrap;
  background:rgba(107,104,152,.08); border:1px solid rgba(107,104,152,.15);
  border-radius:12px; padding:14px 16px; margin-bottom:22px;
}
.gu-acesso-legend__item { display:flex; align-items:center; gap:8px; font-size:.78rem; color:rgba(239,238,234,.6); }

@media (max-width:780px) { .gu-form-grid { grid-template-columns:1fr; } .gu-espec-grid { grid-template-columns:1fr; } }
`;


function getEspecInfo(espec) {
  return ESPECIALIDADES.find(e => e.value === espec);
}

export default function GerenciarUsuariosPage() {
  const { user, usuarios, adicionarUsuario, toggleAtivo, removerUsuario, getVinculoLabel, getONGs } = useAuth();
  const [mostrarForm, setForm]  = useState(false);
  const [form, setFormData]     = useState({ usuario:'', senha:'', nome:'', role:'funcionario', area:'', especialidade:'', vinculo:'nira' });
  const [erroForm, setErroForm] = useState('');
  const ongs = getONGs();

  function handleCriar(e) {
    e.preventDefault();
    if (!form.usuario.trim() || !form.senha.trim() || !form.nome.trim()) {
      setErroForm('Preencha todos os campos obrigatórios.'); return;
    }
    if (form.role === 'funcionario' && !form.especialidade) {
      setErroForm('Selecione a especialidade do funcionário.'); return;
    }
    if (usuarios.find(u => u.usuario === form.usuario)) {
      setErroForm('Esse nome de usuário já existe.'); return;
    }
    let ongId = null;
    let vinculo = form.role === 'funcionario' ? (form.vinculo || 'nira') : null;
    if (vinculo?.startsWith('ong:')) ongId = parseInt(vinculo.split(':')[1]);
    adicionarUsuario({
      usuario:       form.usuario.toLowerCase().trim(),
      senha:         form.senha,
      nome:          form.nome.trim(),
      role:          form.role,
      area:          form.area || null,
      especialidade: form.role === 'funcionario' ? form.especialidade : null,
      vinculo, ongId, ativo: true,
    });
    setFormData({ usuario:'', senha:'', nome:'', role:'funcionario', area:'', especialidade:'', vinculo:'nira' });
    setErroForm('');
    setForm(false);
    alert(`✅ Usuário "${form.nome.trim()}" criado!`);
  }

  function handleToggle(id) { toggleAtivo(id); }
  function remover(id) {
    if (id === user?.id) { alert('Você não pode remover sua própria conta.'); return; }
    if (window.confirm('Remover este usuário?')) removerUsuario(id);
  }

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="gu-page">
        <div className="container">

          <div className="gu-topbar">
            <div>
              <h1 className="gu-title">👤 Gerenciar Usuários</h1>
              <p className="gu-sub">Crie e gerencie acessos. Apenas ADMs têm acesso a esta página.</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setForm(v=>!v)}>
              {mostrarForm ? '✕ Cancelar' : '+ Criar Usuário'}
            </button>
          </div>

          <div className="gu-aviso">
            <strong>🔒 Área restrita — Administrador:</strong> Somente administradores criam ou desativam acessos. Não existe cadastro público na NIRA.
          </div>

          {/* Legenda de acesso */}
          <div className="gu-acesso-legend">
            <span style={{fontSize:'.7rem',color:'rgba(239,238,234,.3)',fontFamily:"'Anonymous Pro',monospace",alignSelf:'center'}}>ACESSOS:</span>
            {ESPECIALIDADES.map(e => (
              <div key={e.value} className="gu-acesso-legend__item">
                <span className={`gu-espec-badge gu-espec-badge--${e.acesso}`}>{e.icon} {e.label}</span>
                <span style={{fontSize:'.7rem',color:'rgba(239,238,234,.35)'}}>→ {e.acesso === 'chat' ? 'Chat de atendimento' : 'Mapa de campo'}</span>
              </div>
            ))}
          </div>

          {/* Formulário */}
          {mostrarForm && (
            <div className="gu-form-wrap">
              <p className="gu-form-title">➕ Novo Usuário</p>
              {erroForm && (
                <div style={{background:'rgba(255,71,87,.1)',border:'1px solid rgba(255,71,87,.28)',borderRadius:8,padding:'10px 14px',fontSize:'.83rem',color:'#FF4757',marginBottom:14}}>
                  {erroForm}
                </div>
              )}
              <form onSubmit={handleCriar}>
                <div className="gu-form-grid">
                  <div className="form-group">
                    <label className="form-label">Nome completo *</label>
                    <input className="form-input" type="text" placeholder="Nome" value={form.nome} onChange={e=>setFormData(f=>({...f,nome:e.target.value}))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Usuário (login) *</label>
                    <input className="form-input" type="text" placeholder="usuario.login" value={form.usuario} onChange={e=>setFormData(f=>({...f,usuario:e.target.value.toLowerCase().replace(/\s/g,'')}))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Senha *</label>
                    <input className="form-input" type="password" placeholder="Mínimo 6 caracteres" value={form.senha} onChange={e=>setFormData(f=>({...f,senha:e.target.value}))} required minLength={6} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Perfil *</label>
                    <select className="form-select" value={form.role} onChange={e=>setFormData(f=>({...f,role:e.target.value,especialidade:''}))}>
                      <option value="funcionario">Funcionário</option>
                      <option value="ong">ONG / Parceira</option>
                      <option value="adm">Administrador</option>
                    </select>
                  </div>

                  {/* Especialidade — só para funcionários */}
                  {form.role === 'funcionario' && (
                    <div className="form-group gu-form-full">
                      <label className="form-label">Especialidade * <span style={{color:'rgba(239,238,234,.35)',fontSize:'.65rem',letterSpacing:'.05em',textTransform:'none',fontFamily:"'Anonymous Pro',monospace"}}>(define o que o funcionário pode acessar)</span></label>
                      <div className="gu-espec-grid">
                        {ESPECIALIDADES.map(e => (
                          <div
                            key={e.value}
                            className={`gu-espec-card${form.especialidade===e.value?' gu-espec-card--sel':''} gu-espec-card--${e.acesso}`}
                            onClick={() => setFormData(f=>({...f,especialidade:e.value}))}
                          >
                            <span className="gu-espec-icon">{e.icon}</span>
                            <div>
                              <p className="gu-espec-label">{e.label}</p>
                              <p className={`gu-espec-acesso gu-espec-acesso--${e.acesso}`}>
                                {e.acesso === 'chat' ? '💬 Acessa chat de atendimento' : '🗺️ Acessa mapa de campo'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {form.role === 'funcionario' && ESPEC_MAPA.includes(form.especialidade) && (
                    <div className="form-group">
                      <label className="form-label">Área de Atuação</label>
                      <select className="form-select" value={form.area} onChange={e=>setFormData(f=>({...f,area:e.target.value}))}>
                        <option value="">Não definida</option>
                        {['Norte','Sul','Leste','Oeste','Centro'].map(a=><option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                  )}
                  {form.role === 'funcionario' && (
                    <div className="form-group gu-form-full">
                      <label className="form-label">Vínculo Institucional</label>
                      <select className="form-select" value={form.vinculo} onChange={e=>setFormData(f=>({...f,vinculo:e.target.value}))}>
                        <option value="nira">🦉 Equipe NIRA</option>
                        <option value="autonomo">🏷️ Profissional Autônomo(a)</option>
                        {ongs.map(o => (
                          <option key={o.id} value={`ong:${o.id}`}>🤝 {o.nome}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="gu-form-actions">
                  <button type="submit" className="btn btn-primary">✅ Criar Usuário</button>
                  <button type="button" className="btn btn-ghost" onClick={()=>{setForm(false);setErroForm('');}}>Cancelar</button>
                </div>
              </form>
            </div>
          )}

          {/* Tabela */}
          <div className="gu-table-wrap">
            <table className="gu-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Usuário</th>
                  <th>Perfil</th>
                  <th>Especialidade</th>
                  <th>Vínculo</th><th>Acessa</th>
                  <th>Área</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => {
                  const esp = getEspecInfo(u.especialidade);
                  return (
                    <tr key={u.id}>
                      <td style={{fontFamily:"'Poppins',sans-serif",fontWeight:600}}>{u.nome}</td>
                      <td style={{fontFamily:"'Anonymous Pro',monospace",fontSize:'.78rem',color:'rgba(239,238,234,.45)'}}>{u.usuario}</td>
                      <td>
                        <span className={`gu-role gu-role--${u.role==='funcionario'?'func':u.role}`}>
                          {u.role==='adm'?'ADM':u.role==='ong'?'ONG':'Funcionário'}
                        </span>
                      </td>
                      <td>
                        {esp
                          ? <span style={{fontSize:'.83rem'}}>{esp.icon} {esp.label}</span>
                          : <span style={{color:'rgba(239,238,234,.28)',fontSize:'.78rem'}}>—</span>
                        }
                      </td>
                      <td style={{fontSize:'.78rem',color:'rgba(239,238,234,.58)'}}>
                        {getVinculoLabel(u.vinculo, u.ongId)}
                      </td>
                      <td>
                        {u.role === 'adm'
                          ? <span className="gu-espec-badge gu-espec-badge--none">Tudo</span>
                          : u.role === 'ong'
                          ? <span className="gu-espec-badge gu-espec-badge--chat">💬 Chat + Conteúdos</span>
                          : esp
                          ? <span className={`gu-espec-badge gu-espec-badge--${esp.acesso}`}>
                              {esp.acesso === 'chat' ? '💬 Chat' : '🗺️ Mapa'}
                            </span>
                          : <span className="gu-espec-badge gu-espec-badge--none">—</span>
                        }
                      </td>
                      <td style={{color:'rgba(239,238,234,.45)',fontSize:'.82rem'}}>{u.area || '—'}</td>
                      <td>
                        <span className={`adm-pill adm-pill--${u.ativo?'new':'done'}`}>
                          {u.ativo?'● Ativo':'○ Inativo'}
                        </span>
                      </td>
                      <td>
                        <div style={{display:'flex',gap:6}}>
                          <button className="gu-act-btn" onClick={()=>handleToggle(u.id)}>
                            {u.ativo?'Desativar':'Ativar'}
                          </button>
                          <button className="gu-act-btn gu-act-btn--del" onClick={()=>remover(u.id)} disabled={u.id===user?.id}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}
