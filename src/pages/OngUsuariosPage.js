import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth, ESPECIALIDADES, ESPEC_CHAT, ESPEC_MAPA, VINCULOS } from '../contexts/AuthContext';

const css = `
.ong-page { min-height:100vh; background:var(--bg-deep); padding:80px 0 60px; }

/* Header */
.ong-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:28px; flex-wrap:wrap; gap:16px; }
.ong-header__left {}
.ong-header__title { font-size:1.55rem; font-weight:800; color:#F4F6F8; letter-spacing:-.02em; margin-bottom:4px; }
.ong-header__sub { font-size:.85rem; color:rgba(239,238,234,.45); }
.ong-header__badge {
  display:inline-flex; align-items:center; gap:7px;
  background:rgba(46,213,115,.1); border:1px solid rgba(46,213,115,.25);
  border-radius:100px; padding:7px 16px;
  font-size:.78rem; font-weight:700; color:#2ED573;
}

/* Stats */
.ong-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:28px; }
.ong-stat {
  background:rgb(26,24,50);
  border:1px solid rgba(107,104,152,.16);
  border-radius:14px; padding:18px 20px;
  display:flex; align-items:center; gap:14px;
}
.ong-stat__icon { font-size:1.6rem; flex-shrink:0; }
.ong-stat__num { font-weight:800; font-size:1.6rem; color:#F4F6F8; line-height:1; }
.ong-stat__lbl { font-size:.7rem; color:rgba(239,238,234,.4); text-transform:uppercase; letter-spacing:.07em; margin-top:3px; }

/* Aviso */
.ong-aviso {
  background:rgba(155,143,255,.07); border:1px solid rgba(155,143,255,.2);
  border-radius:12px; padding:13px 18px; margin-bottom:22px;
  font-size:.85rem; color:rgba(239,238,234,.65); line-height:1.65;
}
.ong-aviso strong { color:#9B8FFF; }

/* Form */
.ong-form-wrap {
  background:var(--bg-card); border:1px solid rgba(107,104,152,.2);
  border-radius:18px; padding:28px; backdrop-filter:blur(8px); margin-bottom:24px;
  animation:fadeInUp .3s ease;
}
.ong-form-title { font-weight:700; font-size:1rem; color:#F4F6F8; margin-bottom:20px; display:flex; align-items:center; gap:10px; }
.ong-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.ong-form-full { grid-column:1/-1; }

/* Grid de especialidades */
.ong-espec-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.ong-espec-card {
  display:flex; align-items:center; gap:10px;
  padding:10px 14px;
  background:rgba(107,104,152,.1); border:1.5px solid rgba(107,104,152,.2);
  border-radius:11px; cursor:pointer; transition:all .22s;
}
.ong-espec-card:hover { border-color:rgba(155,143,255,.38); }
.ong-espec-card--sel { border-color:#9B8FFF; background:rgba(155,143,255,.14); }
.ong-espec-card--chat { border-color:rgba(46,213,115,.3) !important; background:rgba(46,213,115,.08) !important; }
.ong-espec-card--mapa { border-color:rgba(255,200,0,.28) !important; background:rgba(255,200,0,.07) !important; }
.ong-espec-icon { font-size:1.2rem; flex-shrink:0; }
.ong-espec-label { font-weight:700; font-size:.8rem; color:#F4F6F8; margin-bottom:1px; }
.ong-espec-acesso { font-size:.65rem; font-family:'Anonymous Pro',monospace; letter-spacing:.06em; }
.ong-espec-acesso--chat { color:#2ED573; }
.ong-espec-acesso--mapa { color:#FFC800; }

/* Info de vínculo automático */
.ong-vinculo-info {
  display:flex; align-items:center; gap:10px;
  background:rgba(46,213,115,.08); border:1px solid rgba(46,213,115,.22);
  border-radius:10px; padding:12px 16px;
  font-size:.83rem; color:rgba(239,238,234,.7);
}
.ong-vinculo-info strong { color:#2ED573; }

/* Tabela */
.ong-table-wrap { background:var(--bg-card); border:1px solid rgba(107,104,152,.16); border-radius:14px; overflow:hidden; backdrop-filter:blur(8px); }
.ong-table { width:100%; border-collapse:collapse; }
.ong-table th { background:rgba(107,104,152,.1); padding:11px 14px; font-size:.63rem; color:rgba(239,238,234,.38); letter-spacing:.1em; text-transform:uppercase; text-align:left; font-weight:700; }
.ong-table td { padding:13px 14px; font-size:.845rem; color:rgba(239,238,234,.72); border-top:1px solid rgba(107,104,152,.08); }
.ong-table tr:hover td { background:rgba(107,104,152,.05); }

/* Badges */
.ong-role-badge { display:inline-flex; align-items:center; gap:5px; border-radius:100px; padding:3px 10px; font-size:.63rem; font-weight:700; }
.ong-role-badge--chat { background:rgba(46,213,115,.12); border:1px solid rgba(46,213,115,.25); color:#2ED573; }
.ong-role-badge--mapa { background:rgba(255,200,0,.12); border:1px solid rgba(255,200,0,.25); color:#FFC800; }
.ong-act-btn { background:rgba(107,104,152,.12); border:1px solid rgba(107,104,152,.2); border-radius:7px; padding:4px 10px; font-size:.7rem; color:rgba(239,238,234,.6); cursor:pointer; transition:all .22s; font-family:'Poppins',sans-serif; }
.ong-act-btn:hover { border-color:#9B8FFF; color:#9B8FFF; }
.ong-act-btn--del { color:rgba(255,71,87,.7); border-color:rgba(255,71,87,.2); }
.ong-act-btn--del:hover { background:rgba(255,71,87,.1); border-color:#FF4757; color:#FF4757; }

/* Vazio */
.ong-empty { text-align:center; padding:52px 0; color:rgba(239,238,234,.3); }
.ong-empty__icon { font-size:2.5rem; margin-bottom:12px; display:block; opacity:.4; }

@media (max-width:760px) { .ong-form-grid { grid-template-columns:1fr; } .ong-espec-grid { grid-template-columns:1fr; } .ong-stats { grid-template-columns:1fr; } }
`;

export default function OngUsuariosPage() {
  const { user, getMeusFuncionarios, adicionarUsuario, toggleAtivo, removerUsuario, usuarios } = useAuth();
  const [mostrarForm, setForm]   = useState(false);
  const [erroForm,    setErro]   = useState('');
  const [form, setF]             = useState({ usuario:'', senha:'', nome:'', especialidade:'' });
  const [sucesso,     setSucesso]= useState('');

  const meusFunc = getMeusFuncionarios();
  const ativos   = meusFunc.filter(u => u.ativo).length;

  function handleCriar(e) {
    e.preventDefault();
    setErro(''); setSucesso('');
    if (!form.usuario.trim() || !form.senha.trim() || !form.nome.trim()) { setErro('Preencha todos os campos.'); return; }
    if (!form.especialidade) { setErro('Selecione a especialidade.'); return; }
    if (form.senha.length < 6) { setErro('Senha deve ter pelo menos 6 caracteres.'); return; }
    if (usuarios.find(u => u.usuario === form.usuario)) { setErro('Nome de usuário já existe.'); return; }

    adicionarUsuario({
      usuario:      form.usuario.toLowerCase().trim(),
      senha:        form.senha,
      nome:         form.nome.trim(),
      role:         'funcionario',
      especialidade: form.especialidade,
      vinculo:      `ong:${user.id}`,
      ongId:        user.id,
      area:         null,
      ativo:        true,
    });

    setSucesso(`✅ ${form.nome} adicionado(a) com sucesso à ${user.nome}!`);
    setF({ usuario:'', senha:'', nome:'', especialidade:'' });
    setForm(false);
    setTimeout(() => setSucesso(''), 4000);
  }

  function confirmarRemover(id, nome) {
    if (window.confirm(`Remover "${nome}" da sua equipe? Esta ação não pode ser desfeita.`)) {
      removerUsuario(id);
    }
  }

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="ong-page">
        <div className="container">

          {/* Header */}
          <div className="ong-header">
            <div className="ong-header__left">
              <h1 className="ong-header__title">👥 Equipe da {user?.nome}</h1>
              <p className="ong-header__sub">Cadastre e gerencie os profissionais vinculados à sua organização.</p>
            </div>
            <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
              <span className="ong-header__badge">🤝 {user?.nome}</span>
              <button className="btn btn-primary btn-sm" onClick={() => { setForm(v=>!v); setErro(''); setSucesso(''); }}>
                {mostrarForm ? '✕ Cancelar' : '+ Novo Profissional'}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="ong-stats">
            <div className="ong-stat"><span className="ong-stat__icon">👥</span><div><p className="ong-stat__num">{meusFunc.length}</p><p className="ong-stat__lbl">Total</p></div></div>
            <div className="ong-stat"><span className="ong-stat__icon">🟢</span><div><p className="ong-stat__num">{ativos}</p><p className="ong-stat__lbl">Ativos</p></div></div>
            <div className="ong-stat"><span className="ong-stat__icon">🧠</span><div><p className="ong-stat__num">{meusFunc.filter(u=>ESPEC_CHAT.includes(u.especialidade)).length}</p><p className="ong-stat__lbl">Atendimento</p></div></div>
          </div>

          {/* Aviso */}
          <div className="ong-aviso">
            <strong>🔒 Acesso restrito à sua organização:</strong> Os profissionais criados aqui ficam vinculados à <strong>{user?.nome}</strong> e só aparecem nos seus relatórios. Apenas o administrador da NIRA pode ver todos os usuários do sistema.
          </div>

          {/* Sucesso */}
          {sucesso && (
            <div style={{ background:'rgba(46,213,115,.1)', border:'1px solid rgba(46,213,115,.28)', borderRadius:10, padding:'11px 16px', fontSize:'.85rem', color:'#2ED573', marginBottom:16, animation:'fadeIn .3s ease' }}>
              {sucesso}
            </div>
          )}

          {/* Formulário */}
          {mostrarForm && (
            <div className="ong-form-wrap">
              <p className="ong-form-title">➕ Novo Profissional</p>

              {erroForm && (
                <div style={{ background:'rgba(255,71,87,.1)', border:'1px solid rgba(255,71,87,.28)', borderRadius:8, padding:'10px 14px', fontSize:'.83rem', color:'#FF4757', marginBottom:14 }}>
                  {erroForm}
                </div>
              )}

              {/* Vínculo automático */}
              <div className="ong-vinculo-info" style={{ marginBottom:20 }}>
                🤝 Este profissional será automaticamente vinculado a <strong>{user?.nome}</strong>. Aparecerá como <strong>"🤝 {user?.nome}"</strong> no perfil dele.
              </div>

              <form onSubmit={handleCriar}>
                <div className="ong-form-grid">
                  <div className="form-group">
                    <label className="form-label">Nome completo *</label>
                    <input className="form-input" type="text" placeholder="Ex: Dra. Maria Silva" value={form.nome} onChange={e=>setF(f=>({...f,nome:e.target.value}))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Login (usuário) *</label>
                    <input className="form-input" type="text" placeholder="usuario.login" value={form.usuario} onChange={e=>setF(f=>({...f,usuario:e.target.value.toLowerCase().replace(/\s/g,'')}))} required />
                  </div>
                  <div className="form-group ong-form-full">
                    <label className="form-label">Senha *</label>
                    <input className="form-input" type="password" placeholder="Mínimo 6 caracteres" value={form.senha} onChange={e=>setF(f=>({...f,senha:e.target.value}))} required minLength={6} />
                  </div>
                  <div className="form-group ong-form-full">
                    <label className="form-label">
                      Especialidade * &nbsp;
                      <span style={{color:'rgba(239,238,234,.3)',fontSize:'.65rem',textTransform:'none',fontFamily:"'Anonymous Pro',monospace"}}>
                        (define o que o profissional pode acessar)
                      </span>
                    </label>
                    <div className="ong-espec-grid">
                      {ESPECIALIDADES.map(e => (
                        <div
                          key={e.value}
                          className={`ong-espec-card${form.especialidade===e.value?' ong-espec-card--sel':''} ong-espec-card--${e.acesso}`}
                          onClick={() => setF(f => ({...f, especialidade: e.value}))}
                        >
                          <span className="ong-espec-icon">{e.icon}</span>
                          <div>
                            <p className="ong-espec-label">{e.label}</p>
                            <p className={`ong-espec-acesso ong-espec-acesso--${e.acesso}`}>
                              {e.acesso === 'chat' ? '💬 Acessa atendimentos' : '🗺️ Acessa mapa de campo'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display:'flex', gap:10, marginTop:18 }}>
                  <button type="submit" className="btn btn-primary">✅ Cadastrar Profissional</button>
                  <button type="button" className="btn btn-ghost" onClick={() => { setForm(false); setErro(''); }}>Cancelar</button>
                </div>
              </form>
            </div>
          )}

          {/* Tabela */}
          {meusFunc.length === 0 ? (
            <div className="ong-empty">
              <span className="ong-empty__icon">👥</span>
              <p>Nenhum profissional cadastrado ainda.</p>
              <p style={{fontSize:'.8rem',marginTop:6}}>Clique em "+ Novo Profissional" para começar.</p>
            </div>
          ) : (
            <div className="ong-table-wrap">
              <table className="ong-table">
                <thead>
                  <tr><th>Nome</th><th>Login</th><th>Especialidade</th><th>Acessa</th><th>Área</th><th>Status</th><th>Ações</th></tr>
                </thead>
                <tbody>
                  {meusFunc.map(u => {
                    const esp = ESPECIALIDADES.find(e => e.value === u.especialidade);
                    return (
                      <tr key={u.id}>
                        <td style={{fontWeight:600}}>{u.nome}</td>
                        <td style={{fontFamily:"'Anonymous Pro',monospace",fontSize:'.78rem',color:'rgba(239,238,234,.45)'}}>{u.usuario}</td>
                        <td>{esp ? <span>{esp.icon} {esp.label}</span> : '—'}</td>
                        <td>
                          {esp && (
                            <span className={`ong-role-badge ong-role-badge--${esp.acesso}`}>
                              {esp.acesso === 'chat' ? '💬 Chat' : '🗺️ Mapa'}
                            </span>
                          )}
                        </td>
                        <td style={{color:'rgba(239,238,234,.45)',fontSize:'.82rem'}}>{u.area || '—'}</td>
                        <td>
                          <span className={`adm-pill adm-pill--${u.ativo?'new':'done'}`}>
                            {u.ativo ? '● Ativo' : '○ Inativo'}
                          </span>
                        </td>
                        <td>
                          <div style={{display:'flex',gap:6}}>
                            <button className="ong-act-btn" onClick={() => toggleAtivo(u.id)}>
                              {u.ativo ? 'Desativar' : 'Ativar'}
                            </button>
                            <button className="ong-act-btn ong-act-btn--del" onClick={() => confirmarRemover(u.id, u.nome)}>
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
          )}
        </div>
      </div>
    </>
  );
}
