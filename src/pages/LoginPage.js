import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const css = `
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(107,104,152,.28) 0%, transparent 60%),
              var(--bg-deep);
  padding: 90px 20px 40px;
}
.login-box {
  width: 100%;
  max-width: 420px;
  background: var(--bg-card);
  border: 1px solid rgba(107,104,152,.22);
  border-radius: 22px;
  padding: 40px 36px;
  backdrop-filter: blur(16px);
  animation: fadeInUp .45s ease;
}
.login-header { text-align:center; margin-bottom:32px; }
.login-owl { font-size:3.2rem; margin-bottom:12px; display:block; animation: float 4s ease-in-out infinite; }
.login-title { font-size:1.6rem; font-weight:700; color:#F4F6F8; margin-bottom:6px; }
.login-sub { font-size:.875rem; color:rgba(239,238,234,.5); line-height:1.6; }
.login-error {
  background: rgba(255,71,87,.1);
  border: 1px solid rgba(255,71,87,.28);
  border-radius:10px;
  padding:12px 15px;
  font-size:.85rem;
  color:#FF4757;
  margin-bottom:20px;
  animation: fadeIn .2s ease;
}
.login-footer {
  margin-top:24px;
  padding-top:20px;
  border-top:1px solid rgba(107,104,152,.18);
  text-align:center;
  font-size:.78rem;
  color:rgba(239,238,234,.38);
  line-height:1.7;
}
.login-footer a { color:rgba(155,143,255,.8); }
.login-footer a:hover { color:#9B8FFF; }
.login-notice {
  background: rgba(107,104,152,.1);
  border:1px solid rgba(107,104,152,.2);
  border-radius:10px;
  padding:14px;
  margin-top:22px;
  font-size:.78rem;
  color:rgba(239,238,234,.45);
  line-height:1.65;
}
.login-notice strong { color:rgba(239,238,234,.7); }

/* Demo credentials */
.login-demo { margin-top:20px; }
.login-demo-title { font-size:.7rem; color:rgba(239,238,234,.3); text-transform:uppercase; letter-spacing:.1em; margin-bottom:10px; }
.login-demo-items { display:flex; flex-direction:column; gap:7px; }
.login-demo-item {
  background:rgba(107,104,152,.1);
  border:1px solid rgba(107,104,152,.15);
  border-radius:8px;
  padding:8px 12px;
  display:flex; gap:10px; align-items:center;
  cursor:pointer;
  transition:border-color .25s;
}
.login-demo-item:hover { border-color:rgba(155,143,255,.35); }
.login-demo-badge { font-size:.65rem; font-weight:700; letter-spacing:.1em; padding:2px 8px; border-radius:100px; }
.login-demo-badge--adm  { background:rgba(155,143,255,.18); color:#9B8FFF; }
.login-demo-badge--ong  { background:rgba(46,213,115,.14);  color:#2ED573; }
.login-demo-badge--func { background:rgba(255,200,0,.14);   color:#FFC800; }
.login-demo-cred { font-size:.75rem; color:rgba(239,238,234,.45); font-family:'Anonymous Pro',monospace; }
`;

const DEMO_USERS = [
  { badge:'adm',  label:'ADM',              usuario:'admin',        senha:'nira2026'  },
  { badge:'ong',  label:'ONG Vida Nova',    usuario:'ong_vida',     senha:'ong123'    },
  { badge:'ong',  label:'ONG Renascer',     usuario:'ong_renascer', senha:'ren123'    },
  { badge:'func', label:'Psicóloga',        usuario:'psicologa01',  senha:'chat123'   },
  { badge:'func', label:'Policial / Campo', usuario:'policial01',   senha:'mapa123'   },
  { badge:'func', label:'Agente de Campo',  usuario:'agente01',    senha:'agente123' },
];

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha]     = useState('');
  const [loading, setLoading] = useState(false);
  const { login, erro }       = useAuth();
  const navigate              = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const result = login(usuario.trim(), senha);
      setLoading(false);
      if (result.ok) {
        // Redireciona para home — o botão na navbar já muda para o role
        navigate('/');
      }
    }, 600);
  }

  function preencherDemo(u, s) {
    setUsuario(u);
    setSenha(s);
  }

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="login-page">
        <div className="login-box">
          <div className="login-header">
            <span className="login-owl">🦉</span>
            <h1 className="login-title">Área Restrita</h1>
            <p className="login-sub">Acesso exclusivo para equipe interna.<br />Somente administradores criam novos logins.</p>
          </div>

          {erro && <div className="login-error">⚠️ {erro}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Usuário</label>
              <input
                className="form-input"
                type="text"
                placeholder="seu.usuario"
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Senha</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
              style={{ width:'100%', justifyContent:'center', padding:'13px', marginTop:8, opacity: loading ? .7 : 1 }}
            >
              {loading ? '⏳ Verificando...' : 'Entrar →'}
            </button>
          </form>

          <div className="login-notice">
            <strong>Não tem conta?</strong> Apenas administradores do sistema podem criar novos acessos. Entre em contato com seu administrador responsável.
          </div>

          

          <div className="login-footer">
            <Link to="/">← Voltar para o início</Link>
            <br />
            Em caso de emergência: <a href="tel:180">180</a> · <a href="tel:190">190</a>
          </div>
        </div>
      </div>
    </>
  );
}
