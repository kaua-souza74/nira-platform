import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, ESPECIALIDADES } from '../contexts/AuthContext';

const css = `
/* ══════════════════════════════════════
   LOGIN PAGE — dois painéis, coruja, tipo
══════════════════════════════════════ */
.login-page{
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background: radial-gradient(ellipse 90% 80% at 50% 0%, rgba(107,104,152,.22) 0%, transparent 55%),
              radial-gradient(ellipse 60% 60% at 80% 80%, rgba(155,143,255,.1) 0%, transparent 50%),
              #12111F;
  padding:20px;
}

/* Container dos dois painéis */
.login-container{
  display:grid;
  grid-template-columns:1fr 1fr;
  max-width:860px;
  width:100%;
  background:rgba(24,22,46,.92);
  border:1px solid rgba(107,104,152,.22);
  border-radius:28px;
  overflow:hidden;
  box-shadow:0 32px 80px rgba(0,0,0,.6);
  animation:fadeInUp .4s ease;
  backdrop-filter:blur(16px);
}

/* ── Painel esquerdo: formulário ── */
.login-form-panel{
  padding:44px 40px;
  display:flex;
  flex-direction:column;
  justify-content:center;
}
.login-form-panel::before{
  /* linha de brilho no topo */
  content:'';
  position:absolute;
  top:0;left:0;right:0;
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(155,143,255,.35),transparent);
  pointer-events:none;
}
.login-logo-row{
  display:flex;align-items:center;gap:10px;
  margin-bottom:32px;
}
.login-logo-owl{font-size:1.8rem;filter:drop-shadow(0 0 8px rgba(155,143,255,.5));}
.login-logo-name{font-weight:800;font-size:1.5rem;letter-spacing:.14em;color:#F4F6F8;}
.login-logo-sub{font-size:.58rem;color:rgba(239,238,234,.3);letter-spacing:.1em;text-transform:uppercase;font-family:'Anonymous Pro',monospace;margin-left:2px;}

.login-title{font-weight:700;font-size:1.35rem;color:#F4F6F8;margin-bottom:5px;}
.login-subtitle{font-size:.85rem;color:rgba(239,238,234,.45);margin-bottom:28px;line-height:1.6;}

/* Input com ícone */
.login-input-wrap{position:relative;margin-bottom:16px;}
.login-input-icon{
  position:absolute;left:14px;top:50%;transform:translateY(-50%);
  font-size:.9rem;pointer-events:none;
  color:rgba(239,238,234,.3);
}
.login-input{
  width:100%;
  background:rgba(107,104,152,.1);
  border:1.5px solid rgba(107,104,152,.22);
  border-radius:12px;
  padding:13px 16px 13px 40px;
  font-family:'Poppins',sans-serif;
  font-size:.9rem;color:#F4F6F8;
  transition:border-color .28s,background .28s;
}
.login-input:focus{
  outline:none;
  border-color:rgba(155,143,255,.5);
  background:rgba(107,104,152,.16);
}
.login-input::placeholder{color:rgba(239,238,234,.25);}

/* Tipo de conta */
.login-tipo-label{
  font-size:.68rem;color:rgba(239,238,234,.4);
  text-transform:uppercase;letter-spacing:.12em;
  font-family:'Anonymous Pro',monospace;
  margin-bottom:12px;display:block;
}
.login-tipo-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:8px;
  margin-bottom:24px;
}
.login-tipo-btn{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:5px;padding:11px 8px;
  background:rgba(107,104,152,.1);
  border:1.5px solid rgba(107,104,152,.2);
  border-radius:12px;cursor:pointer;transition:all .22s;
  font-family:'Poppins',sans-serif;
}
.login-tipo-btn:hover{border-color:rgba(155,143,255,.38);background:rgba(155,143,255,.08);}
.login-tipo-btn--sel{border-color:#9B8FFF;background:rgba(155,143,255,.14);}
.login-tipo-icon{font-size:1.3rem;}
.login-tipo-name{font-size:.72rem;font-weight:600;color:rgba(239,238,234,.75);}
.login-tipo-btn--sel .login-tipo-name{color:#C4BCFF;}

/* Erro */
.login-erro{
  background:rgba(255,71,87,.1);border:1px solid rgba(255,71,87,.28);
  border-radius:10px;padding:11px 15px;font-size:.83rem;color:#FF4757;
  margin-bottom:16px;animation:fadeIn .2s ease;
}

/* Botão principal */
.login-btn{
  width:100%;padding:14px;
  background:linear-gradient(135deg,#7B6FE8,#9B8FFF);
  color:#fff;font-family:'Poppins',sans-serif;font-weight:700;font-size:.92rem;
  border:none;border-radius:14px;cursor:pointer;transition:all .28s;
  box-shadow:0 6px 20px rgba(155,143,255,.35);
  display:flex;align-items:center;justify-content:center;gap:8px;
}
.login-btn:hover{background:linear-gradient(135deg,#9B8FFF,#B8AEFF);box-shadow:0 8px 28px rgba(155,143,255,.5);transform:translateY(-1px);}
.login-btn:disabled{opacity:.55;cursor:not-allowed;transform:none;}

.login-forgot{
  display:block;text-align:center;margin-top:14px;
  font-size:.78rem;color:rgba(239,238,234,.3);
  text-decoration:underline;text-underline-offset:3px;
  transition:color .2s;
}
.login-forgot:hover{color:rgba(239,238,234,.6);}

/* Credenciais de demo */
.login-demo{margin-top:22px;padding-top:18px;border-top:1px solid rgba(107,104,152,.14);}
.login-demo-label{font-size:.65rem;color:rgba(239,238,234,.25);text-transform:uppercase;letter-spacing:.1em;font-family:'Anonymous Pro',monospace;margin-bottom:9px;display:block;}
.login-demo-list{display:flex;flex-direction:column;gap:5px;}
.login-demo-item{
  display:flex;align-items:center;gap:9px;
  padding:7px 11px;
  background:rgba(107,104,152,.08);border:1px solid rgba(107,104,152,.14);
  border-radius:9px;cursor:pointer;transition:all .2s;
}
.login-demo-item:hover{border-color:rgba(155,143,255,.3);background:rgba(155,143,255,.07);}
.login-demo-badge{font-size:.6rem;font-weight:700;letter-spacing:.08em;padding:2px 8px;border-radius:100px;flex-shrink:0;}
.login-demo-badge--adm{background:rgba(155,143,255,.18);color:#9B8FFF;}
.login-demo-badge--ong{background:rgba(46,213,115,.14);color:#2ED573;}
.login-demo-badge--func{background:rgba(255,200,0,.14);color:#FFC800;}
.login-demo-cred{font-size:.72rem;color:rgba(239,238,234,.42);font-family:'Anonymous Pro',monospace;}

/* ── Painel direito: coruja + visual ── */
.login-owl-panel{
  background:linear-gradient(
    145deg,
    rgba(55,48,108,.85) 0%,
    rgba(40,35,85,.9) 40%,
    rgba(107,88,200,.4) 100%
  );
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:40px 32px;
  position:relative;overflow:hidden;
  border-left:1px solid rgba(107,104,152,.18);
}
/* Orb de fundo */
.login-owl-panel::before{
  content:'';
  position:absolute;
  top:-60px;right:-60px;
  width:300px;height:300px;border-radius:50%;
  background:rgba(155,143,255,.12);filter:blur(80px);
  pointer-events:none;
}
.login-owl-panel::after{
  content:'';
  position:absolute;
  bottom:-40px;left:-40px;
  width:200px;height:200px;border-radius:50%;
  background:rgba(107,104,152,.1);filter:blur(60px);
  pointer-events:none;
}

/* Coruja */
.login-owl-big{
  font-size:7rem;
  animation:float 4s ease-in-out infinite;
  filter:drop-shadow(0 0 32px rgba(155,143,255,.55));
  position:relative;z-index:1;
  margin-bottom:24px;
}

/* Anel pulsante ao redor da coruja */
.login-owl-ring{
  position:absolute;
  width:160px;height:160px;
  border-radius:50%;
  border:1.5px solid rgba(155,143,255,.2);
  animation:pulseRing 2.5s ease-out infinite;
}
.login-owl-ring2{
  width:210px;height:210px;
  animation-delay:.8s;
}

.login-owl-title{
  font-weight:800;font-size:1.8rem;letter-spacing:.14em;
  color:#F4F6F8;margin-bottom:8px;position:relative;z-index:1;
}
.login-owl-sub{
  font-size:.72rem;color:rgba(239,238,234,.38);
  text-align:center;line-height:1.65;
  font-family:'Anonymous Pro',monospace;
  letter-spacing:.06em;position:relative;z-index:1;
  max-width:200px;
}

/* Badges flutuantes */
.login-float-badge{
  position:absolute;
  background:rgba(18,16,38,.85);
  backdrop-filter:blur(8px);
  border:1px solid rgba(107,104,152,.22);
  border-radius:100px;padding:7px 14px;
  display:flex;align-items:center;gap:7px;
  font-size:.72rem;font-weight:600;
  animation:fadeInUp .5s ease both;z-index:1;
}
.login-float-badge--1{top:22%;left:8%;animation-delay:.3s;color:rgba(239,238,234,.75);}
.login-float-badge--2{bottom:24%;right:5%;animation-delay:.5s;color:rgba(239,238,234,.75);}

/* Responsive */
@media(max-width:720px){
  .login-container{grid-template-columns:1fr;}
  .login-owl-panel{display:none;}
}
@media(max-width:480px){
  .login-form-panel{padding:32px 24px;}
  .login-tipo-grid{grid-template-columns:1fr 1fr;}
}
`;

const TIPOS = [
  { key:'adm',         label:'ADM',         icon:'⚙️' },
  { key:'ong',         label:'ONG',          icon:'🤝' },
  { key:'funcionario', label:'Funcionário',  icon:'👤' },
];

const DEMO_USERS = [
  { badge:'adm',  label:'ADM',              usuario:'admin',        senha:'nira2026' },
  { badge:'ong',  label:'ONG Vida Nova',    usuario:'ong_vida',     senha:'ong123'   },
  { badge:'ong',  label:'ONG Renascer',     usuario:'ong_renascer', senha:'ren123'   },
  { badge:'func', label:'Psicóloga',        usuario:'psicologa01',  senha:'chat123'  },
  { badge:'func', label:'Policial',         usuario:'policial01',   senha:'mapa123'  },
  { badge:'func', label:'Agente',           usuario:'agente01',     senha:'agente123'},
];

export default function LoginPage() {
  const [usuario,  setUsuario]  = useState('');
  const [senha,    setSenha]    = useState('');
  const [tipo,     setTipo]     = useState('');
  const [loading,  setLoading]  = useState(false);
  const { login, erro } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const result = login(usuario.trim(), senha);
      setLoading(false);
      if (result.ok) navigate('/');
    }, 600);
  }

  function preencherDemo(u, s) { setUsuario(u); setSenha(s); }

  return (
    <>
      <style>{css}</style>
      <div className="login-page">
        <div className="login-container">

          {/* ── Painel esquerdo: formulário ── */}
          <div className="login-form-panel">
            <div className="login-logo-row">
              <span className="login-logo-owl">🦉</span>
              <div>
                <span className="login-logo-name">NIRA</span>
                <br />
                <span className="login-logo-sub">Área Restrita</span>
              </div>
            </div>

            <h1 className="login-title">Bem-vindo de volta</h1>
            <p className="login-subtitle">
              Acesso exclusivo para equipe interna.<br />
              Somente administradores criam novos acessos.
            </p>

            {/* Tipo de conta */}
            <span className="login-tipo-label">Tipo de conta</span>
            <div className="login-tipo-grid">
              {TIPOS.map(t => (
                <button
                  key={t.key}
                  className={`login-tipo-btn${tipo === t.key ? ' login-tipo-btn--sel' : ''}`}
                  onClick={() => setTipo(t.key)}
                  type="button"
                >
                  <span className="login-tipo-icon">{t.icon}</span>
                  <span className="login-tipo-name">{t.label}</span>
                </button>
              ))}
            </div>

            {erro && <div className="login-erro">⚠️ {erro}</div>}

            <form onSubmit={handleSubmit}>
              <div className="login-input-wrap">
                <span className="login-input-icon">👤</span>
                <input
                  className="login-input"
                  type="text"
                  placeholder="Usuário"
                  value={usuario}
                  onChange={e => setUsuario(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
              <div className="login-input-wrap">
                <span className="login-input-icon">🔒</span>
                <input
                  className="login-input"
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? '⏳ Verificando...' : 'ENTRAR →'}
              </button>
            </form>

            <Link to="/" className="login-forgot">← Voltar ao início</Link>

            {/* Demo */}
            <div className="login-demo">
              <span className="login-demo-label">🧪 Credenciais de demo — clique para preencher</span>
              <div className="login-demo-list">
                {DEMO_USERS.map(u => (
                  <div key={u.usuario} className="login-demo-item" onClick={() => preencherDemo(u.usuario, u.senha)}>
                    <span className={`login-demo-badge login-demo-badge--${u.badge}`}>{u.label}</span>
                    <span className="login-demo-cred">{u.usuario} / {u.senha}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Painel direito: coruja ── */}
          <div className="login-owl-panel">
            <div className="login-owl-ring" />
            <div className="login-owl-ring login-owl-ring2" />
            <span className="login-owl-big">🦉</span>
            <p className="login-owl-title">NIRA</p>
            <p className="login-owl-sub">
              Núcleo de Identificação<br />e Resposta ao Abuso<br /><br />
              E.Y.E · SESI-SENAI · 2026
            </p>

            {/* Badges flutuantes */}
            <div className="login-float-badge login-float-badge--1">
              <span>🔒</span> 100% Anônimo
            </div>
            <div className="login-float-badge login-float-badge--2">
              <span>🆘</span> S.O.S. em 1 toque
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
