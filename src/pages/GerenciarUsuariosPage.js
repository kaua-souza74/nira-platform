import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

const css = `
.gu-page { min-height:100vh; background:var(--bg-deep); padding:80px 0 60px; }
.gu-topbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:30px; flex-wrap:wrap; gap:14px; }
.gu-title { font-size:1.55rem; font-weight:700; color:#F4F6F8; }
.gu-sub { font-size:.82rem; color:rgba(239,238,234,.38); margin-top:2px; }
.gu-aviso { background:rgba(255,71,87,.07); border:1px solid rgba(255,71,87,.22); border-radius:12px; padding:14px 18px; margin-bottom:24px; font-size:.86rem; color:rgba(239,238,234,.65); line-height:1.65; }
.gu-aviso strong { color:#FF4757; }
/* Form */
.gu-form-wrap { background:var(--bg-card); border:1px solid rgba(107,104,152,.2); border-radius:18px; padding:28px; backdrop-filter:blur(8px); margin-bottom:28px; }
.gu-form-title { font-weight:700; font-size:1rem; color:#F4F6F8; margin-bottom:20px; }
.gu-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.gu-form-actions { display:flex; gap:10px; margin-top:18px; }
/* Tabela */
.gu-table-wrap { background:var(--bg-card); border:1px solid rgba(107,104,152,.16); border-radius:14px; overflow:hidden; backdrop-filter:blur(8px); }
.gu-table { width:100%; border-collapse:collapse; }
.gu-table th { background:rgba(107,104,152,.1); padding:11px 15px; font-size:.65rem; color:rgba(239,238,234,.38); letter-spacing:.1em; text-transform:uppercase; text-align:left; font-weight:700; }
.gu-table td { padding:13px 15px; font-size:.855rem; color:rgba(239,238,234,.72); border-top:1px solid rgba(107,104,152,.08); }
.gu-table tr:hover td { background:rgba(107,104,152,.05); }
.gu-role { display:inline-block; border-radius:100px; padding:3px 10px; font-size:.64rem; font-weight:700; letter-spacing:.07em; }
.gu-role--adm  { background:rgba(155,143,255,.16); color:#9B8FFF; }
.gu-role--ong  { background:rgba(46,213,115,.12);  color:#2ED573; }
.gu-role--func { background:rgba(255,200,0,.12);   color:#FFC800; }
.gu-act-btn { background:rgba(107,104,152,.12); border:1px solid rgba(107,104,152,.2); border-radius:7px; padding:4px 10px; font-size:.7rem; color:rgba(239,238,234,.6); cursor:pointer; transition:all .22s; font-family:'Anonymous Pro',monospace; }
.gu-act-btn:hover { border-color:#9B8FFF; color:#9B8FFF; }
.gu-act-btn--del { color:#FF4757; border-color:rgba(255,71,87,.2); }
.gu-act-btn--del:hover { background:rgba(255,71,87,.1); border-color:#FF4757; }
@media (max-width:780px) { .gu-form-grid { grid-template-columns:1fr; } }
`;

const USUARIOS_INIT = [
  { id:1, usuario:'admin',    role:'adm',         nome:'Administrador',      area:'—',    ativo:true  },
  { id:2, usuario:'ong_vida', role:'ong',          nome:'ONG Vida Nova',      area:'—',    ativo:true  },
  { id:3, usuario:'agente01', role:'funcionario',  nome:'Carlos Silva',       area:'Sul',  ativo:true  },
  { id:4, usuario:'agente02', role:'funcionario',  nome:'Ana Pereira',        area:'—',    ativo:false },
];

export default function GerenciarUsuariosPage() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState(USUARIOS_INIT);
  const [mostrarForm, setForm]  = useState(false);
  const [form, setFormData]     = useState({ usuario:'', senha:'', nome:'', role:'funcionario', area:'' });
  const [erroForm, setErroForm] = useState('');

  function handleCriar(e) {
    e.preventDefault();
    if (!form.usuario.trim() || !form.senha.trim() || !form.nome.trim()) {
      setErroForm('Preencha todos os campos obrigatórios.');
      return;
    }
    if (usuarios.find(u => u.usuario === form.usuario)) {
      setErroForm('Esse nome de usuário já existe.');
      return;
    }
    const novo = { id:Date.now(), usuario:form.usuario, role:form.role, nome:form.nome, area:form.area||'—', ativo:true };
    setUsuarios(u => [...u, novo]);
    setFormData({ usuario:'', senha:'', nome:'', role:'funcionario', area:'' });
    setErroForm('');
    setForm(false);
    alert(`Usuário "${novo.nome}" criado com sucesso!`);
  }

  function toggleAtivo(id) {
    setUsuarios(us => us.map(u => u.id===id ? {...u, ativo:!u.ativo} : u));
  }

  function remover(id) {
    if (id === user?.id) { alert('Você não pode remover sua própria conta.'); return; }
    if (window.confirm('Remover este usuário? Esta ação não pode ser desfeita.')) {
      setUsuarios(us => us.filter(u => u.id !== id));
    }
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
              <p className="gu-sub">Crie e gerencie acessos para ONGs e funcionários. Apenas ADMs têm acesso a esta página.</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setForm(v=>!v)}>
              {mostrarForm ? '✕ Cancelar' : '+ Criar Usuário'}
            </button>
          </div>

          <div className="gu-aviso">
            <strong>🔒 Área restrita — Administrador:</strong> Somente administradores do sistema podem criar, editar ou desativar acessos. Não existe cadastro público na plataforma NIRA.
          </div>

          {/* Formulário */}
          {mostrarForm && (
            <div className="gu-form-wrap">
              <p className="gu-form-title">➕ Novo Usuário</p>
              {erroForm && <div style={{background:'rgba(255,71,87,.1)',border:'1px solid rgba(255,71,87,.28)',borderRadius:8,padding:'10px 14px',fontSize:'.83rem',color:'#FF4757',marginBottom:14}}>{erroForm}</div>}
              <form onSubmit={handleCriar}>
                <div className="gu-form-grid">
                  <div className="form-group">
                    <label className="form-label">Nome completo *</label>
                    <input className="form-input" type="text" placeholder="Nome do usuário ou organização" value={form.nome} onChange={e=>setFormData(f=>({...f,nome:e.target.value}))} required />
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
                    <select className="form-select" value={form.role} onChange={e=>setFormData(f=>({...f,role:e.target.value}))}>
                      <option value="funcionario">Funcionário / Agente</option>
                      <option value="ong">ONG / Parceira</option>
                      <option value="adm">Administrador</option>
                    </select>
                  </div>
                  {form.role === 'funcionario' && (
                    <div className="form-group">
                      <label className="form-label">Área de Atuação</label>
                      <select className="form-select" value={form.area} onChange={e=>setFormData(f=>({...f,area:e.target.value}))}>
                        <option value="">Não definida</option>
                        {['Norte','Sul','Leste','Oeste','Centro'].map(a=><option key={a} value={a}>{a}</option>)}
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
                <tr><th>Nome</th><th>Usuário</th><th>Perfil</th><th>Área</th><th>Status</th><th>Ações</th></tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.id}>
                    <td style={{fontFamily:"'Anonymous Pro',monospace"}}>{u.nome}</td>
                    <td style={{color:'rgba(239,238,234,.45)',fontSize:'.8rem'}}>{u.usuario}</td>
                    <td>
                      <span className={`gu-role gu-role--${u.role==='funcionario'?'func':u.role}`}>
                        {u.role==='adm'?'ADM':u.role==='ong'?'ONG':'Funcionário'}
                      </span>
                    </td>
                    <td style={{color:'rgba(239,238,234,.45)'}}>{u.area}</td>
                    <td>
                      <span className={`adm-pill ${u.ativo?'adm-pill--new':'adm-pill--done'}`}>
                        {u.ativo?'● Ativo':'○ Inativo'}
                      </span>
                    </td>
                    <td>
                      <div style={{display:'flex',gap:6}}>
                        <button className="gu-act-btn" onClick={()=>toggleAtivo(u.id)}>
                          {u.ativo?'Desativar':'Ativar'}
                        </button>
                        <button className="gu-act-btn gu-act-btn--del" onClick={()=>remover(u.id)} disabled={u.id===user?.id}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
