import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Shield, AlertCircle, User, Lock, LogIn,
  ShieldCheck, AlertTriangle, LayoutDashboard, Building2,
  Briefcase, Home, Info, BookOpen, Settings, ArrowRight,
  Eye, EyeOff
} from 'lucide-react';

const css = `
/* ══════════════════════════════════════════
   LOGIN PAGE — navbar + dois painéis
══════════════════════════════════════════ */

/* ─ Navbar de redirecionamento ─ */
.lp-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 12px 16px 0;
  pointer-events: none;
}
.lp-nav__pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 9px 10px 9px 20px;
  background: rgba(28,25,55,0.82);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgba(107,104,152,.28);
  border-radius: 100px;
  box-shadow: 0 8px 32px rgba(0,0,0,.45);
  pointer-events: all;
  position: relative;
}
.lp-nav__pill::before {
  content: '';
  position: absolute;
  top: -1px; left: 18%; right: 18%;
  height: 1px;
  background: linear-gradient(90deg,transparent,rgba(155,143,255,.5),transparent);
  border-radius: 100px;
  pointer-events: none;
}
.lp-nav__logo {
  display: flex; align-items: center; gap: 9px;
  text-decoration: none; flex-shrink: 0;
}
.lp-nav__logo-icon {
  display: flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; border-radius: 8px;
  background: linear-gradient(135deg,rgba(107,104,152,.3),rgba(155,143,255,.2));
  border: 1px solid rgba(155,143,255,.3);
}
.lp-nav__logo-icon svg { width: 16px; height: 16px; stroke: #9B8FFF; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.lp-nav__logo-name { font-family: 'Poppins',sans-serif; font-weight: 800; font-size: 1.18rem; letter-spacing: .12em; color: #F4F6F8; border-bottom: 2px solid rgba(155,143,255,.6); padding-bottom: 1px; }
.lp-nav__links { display: flex; align-items: center; gap: 2px; }
.lp-nav__link { font-family: 'Poppins',sans-serif; font-weight: 500; font-size: .82rem; color: rgba(239,238,234,.6); text-decoration: none; padding: 7px 14px; border-radius: 100px; transition: all .25s; white-space: nowrap; }
.lp-nav__link:hover { color: #F4F6F8; background: rgba(107,104,152,.18); }
.lp-nav__sos {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,71,87,.12); border: 1px solid rgba(255,71,87,.38);
  color: #FF4757; font-family: 'Poppins',sans-serif; font-weight: 700; font-size: .72rem;
  letter-spacing: .08em; padding: 7px 14px; border-radius: 100px;
  transition: all .25s; text-decoration: none;
}
.lp-nav__sos:hover { background: rgba(255,71,87,.22); border-color: #FF4757; box-shadow: 0 0 16px rgba(255,71,87,.25); }
.lp-nav__sos-dot { width: 6px; height: 6px; border-radius: 50%; background: #FF4757; box-shadow: 0 0 5px #FF4757; animation: sosPulse 1.4s ease-in-out infinite; flex-shrink: 0; }
@media(max-width:680px){ .lp-nav__links { display: none; } }

/* ─ Página principal: Layout Full Screen ─ */
.login-page {
  height: 100vh;
  display: flex;
  background: #12111F;
  overflow: hidden;
}

/* ─ Painel esquerdo: formulário ─ */
.login-form-panel {
  width: 45%;
  min-width: 400px;
  padding: 100px 5%; /* espaço superior para a navbar */
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #12111F;
  position: relative;
  z-index: 10;
  box-shadow: 10px 0 30px rgba(0,0,0,.5);
}

.login-logo-row {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 32px;
}
.login-logo-icon {
  display: flex; align-items: center; justify-content: center;
  width: 44px; height: 44px; border-radius: 12px;
  background: linear-gradient(135deg,rgba(107,104,152,.3),rgba(155,143,255,.2));
  border: 1px solid rgba(155,143,255,.32);
}
.login-logo-icon svg { width: 22px; height: 22px; stroke: #9B8FFF; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.login-logo-name { font-weight: 800; font-size: 1.5rem; letter-spacing: .14em; color: #F4F6F8; }
.login-logo-sub { font-size: .58rem; color: rgba(239,238,234,.3); letter-spacing: .1em; text-transform: uppercase; font-family: 'Anonymous Pro',monospace; display: block; margin-top: 2px; }

.login-title { font-weight: 700; font-size: 1.35rem; color: #F4F6F8; margin-bottom: 5px; }
.login-subtitle { font-size: .85rem; color: rgba(239,238,234,.45); margin-bottom: 28px; line-height: 1.6; }

/* Input com ícone */
.login-input-wrap { position: relative; margin-bottom: 16px; }
.login-input-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  pointer-events: none;
  display: flex; align-items: center;
}
.login-input-icon svg { width: 16px; height: 16px; stroke: rgba(239,238,234,.3); fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.login-input-toggle {
  position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer; padding: 0;
  display: flex; align-items: center; opacity: .4; transition: opacity .2s;
}
.login-input-toggle:hover { opacity: .75; }
.login-input-toggle svg { width: 16px; height: 16px; stroke: rgba(239,238,234,.8); fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.login-input {
  width: 100%;
  background: rgba(107,104,152,.1);
  border: 1.5px solid rgba(107,104,152,.22);
  border-radius: 12px;
  padding: 13px 16px 13px 42px;
  font-family: 'Poppins',sans-serif;
  font-size: .9rem; color: #F4F6F8;
  transition: border-color .28s, background .28s;
}
.login-input:focus {
  outline: none;
  border-color: rgba(155,143,255,.5);
  background: rgba(107,104,152,.16);
}
.login-input::placeholder { color: rgba(239,238,234,.25); }
.login-input--with-toggle { padding-right: 42px; }

/* Tipo de conta */
.login-tipo-label {
  font-size: .68rem; color: rgba(239,238,234,.4);
  text-transform: uppercase; letter-spacing: .12em;
  font-family: 'Anonymous Pro',monospace;
  margin-bottom: 12px; display: block;
}
.login-tipo-grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 8px;
  margin-bottom: 24px;
}
.login-tipo-btn {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 7px; padding: 12px 8px;
  background: rgba(107,104,152,.1);
  border: 1.5px solid rgba(107,104,152,.2);
  border-radius: 12px; cursor: pointer; transition: all .22s;
  font-family: 'Poppins',sans-serif;
}
.login-tipo-btn:hover { border-color: rgba(155,143,255,.38); background: rgba(155,143,255,.08); }
.login-tipo-btn--sel { border-color: #9B8FFF; background: rgba(155,143,255,.14); }
.login-tipo-icon { display: flex; align-items: center; justify-content: center; }
.login-tipo-icon svg { width: 20px; height: 20px; stroke: rgba(239,238,234,.5); fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; transition: stroke .22s; }
.login-tipo-btn--sel .login-tipo-icon svg { stroke: #9B8FFF; }
.login-tipo-name { font-size: .72rem; font-weight: 600; color: rgba(239,238,234,.75); }
.login-tipo-btn--sel .login-tipo-name { color: #C4BCFF; }

/* Erro */
.login-erro {
  background: rgba(255,71,87,.1); border: 1px solid rgba(255,71,87,.28);
  border-radius: 10px; padding: 11px 15px; font-size: .83rem; color: #FF4757;
  margin-bottom: 16px; animation: fadeIn .2s ease;
  display: flex; align-items: center; gap: 8px;
}
.login-erro svg { width: 15px; height: 15px; stroke: #FF4757; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }

/* Botão principal */
.login-btn {
  width: 100%; padding: 14px;
  background: linear-gradient(135deg,#7B6FE8,#9B8FFF);
  color: #fff; font-family: 'Poppins',sans-serif; font-weight: 700; font-size: .92rem;
  border: none; border-radius: 14px; cursor: pointer; transition: all .28s;
  box-shadow: 0 6px 20px rgba(155,143,255,.35);
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.login-btn:hover { background: linear-gradient(135deg,#9B8FFF,#B8AEFF); box-shadow: 0 8px 28px rgba(155,143,255,.5); transform: translateY(-1px); }
.login-btn:disabled { opacity: .55; cursor: not-allowed; transform: none; }
.login-btn svg { width: 16px; height: 16px; stroke: #fff; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

.login-forgot {
  display: block; text-align: center; margin-top: 14px;
  font-size: .78rem; color: rgba(239,238,234,.3);
  text-decoration: underline; text-underline-offset: 3px;
  transition: color .2s;
}
.login-forgot:hover { color: rgba(239,238,234,.6); }



/* ─ Painel direito: visual ─ */
.login-visual-panel {
  flex: 1;
  background: linear-gradient(145deg,rgba(55,48,108,.85) 0%,rgba(40,35,85,.9) 40%,rgba(107,88,200,.4) 100%);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 40px 32px;
  position: relative; overflow: hidden;
  border-left: 1px solid rgba(107,104,152,.18);
}
.login-visual-panel::before {
  content: '';
  position: absolute;
  top: -60px; right: -60px;
  width: 300px; height: 300px; border-radius: 50%;
  background: rgba(155,143,255,.12); filter: blur(80px);
  pointer-events: none;
}
.login-visual-panel::after {
  content: '';
  position: absolute;
  bottom: -40px; left: -40px;
  width: 200px; height: 200px; border-radius: 50%;
  background: rgba(107,104,152,.1); filter: blur(60px);
  pointer-events: none;
}

/* Ícone central no painel */
.login-visual-icon {
  position: relative; z-index: 1;
  width: 120px; height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(155,143,255,.2) 0%, transparent 70%);
  border: 1px solid rgba(155,143,255,.2);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 28px;
  animation: float 4s ease-in-out infinite;
}
.login-visual-icon::before {
  content: '';
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  border: 1px solid rgba(155,143,255,.12);
  animation: pulseRing 2.5s ease-out infinite;
}
.login-visual-icon::after {
  content: '';
  position: absolute;
  inset: -24px;
  border-radius: 50%;
  border: 1px solid rgba(155,143,255,.07);
  animation: pulseRing 2.5s ease-out infinite;
  animation-delay: .8s;
}
.login-visual-icon svg {
  width: 52px; height: 52px;
  stroke: #9B8FFF; fill: none;
  stroke-width: 1.4;
  stroke-linecap: round; stroke-linejoin: round;
  filter: drop-shadow(0 0 18px rgba(155,143,255,.6));
}

.login-visual-title {
  font-weight: 800; font-size: 1.8rem; letter-spacing: .14em;
  color: #F4F6F8; margin-bottom: 8px; position: relative; z-index: 1;
}
.login-visual-sub {
  font-size: .72rem; color: rgba(239,238,234,.38);
  text-align: center; line-height: 1.65;
  font-family: 'Anonymous Pro',monospace;
  letter-spacing: .06em; position: relative; z-index: 1;
  max-width: 200px;
}

/* Badges flutuantes */
.login-float-badge {
  position: absolute;
  background: rgba(18,16,38,.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(107,104,152,.22);
  border-radius: 100px; padding: 7px 14px;
  display: flex; align-items: center; gap: 8px;
  font-size: .72rem; font-weight: 600;
  animation: fadeInUp .5s ease both; z-index: 1;
  color: rgba(239,238,234,.75);
}
.login-float-badge svg { width: 13px; height: 13px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.login-float-badge--1 { top: 22%; left: 8%; animation-delay: .3s; color: #9B8FFF; }
.login-float-badge--1 svg { stroke: #9B8FFF; }
.login-float-badge--2 { bottom: 24%; right: 5%; animation-delay: .5s; color: #FF4757; }
.login-float-badge--2 svg { stroke: #FF4757; }

/* Feature list no painel visual */
.login-feature-list {
  display: flex; flex-direction: column; gap: 10px;
  position: relative; z-index: 1;
  margin-top: 24px; width: 100%;
}
.login-feature-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(107,104,152,.18);
  border-radius: 10px;
}
.login-feature-item svg { width: 14px; height: 14px; stroke: #9B8FFF; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
.login-feature-item span { font-size: .74rem; color: rgba(239,238,234,.6); }

/* Responsive */
@media(max-width:900px){
  .login-page { flex-direction: column; overflow: auto; }
  .login-form-panel { width: 100%; min-width: auto; padding: 120px 8% 60px; min-height: 100vh; box-shadow: none; }
  .login-visual-panel { display: none; }
}
`;



const NAV_LINKS = [
  { label: 'Início',        to: '/',              icon: Home },
  { label: 'Como Funciona', to: '/como-funciona', icon: Info },
  { label: 'Conteúdos',    to: '/conteudos',      icon: BookOpen },
  { label: 'Sobre',         to: '/sobre',          icon: Settings },
];

export default function LoginPage() {
  const [usuario,  setUsuario]  = useState('');
  const [senha,    setSenha]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
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

  return (
    <>
      <style>{css}</style>

      {/* ── Navbar de navegação ── */}
      <nav className="lp-nav">
        <div className="lp-nav__pill">
          <Link to="/" className="lp-nav__logo">
            <span className="lp-nav__logo-icon"><Shield /></span>
            <span className="lp-nav__logo-name">Nira</span>
          </Link>
          <div className="lp-nav__links">
            {NAV_LINKS.map(l => (
              <Link key={l.to} to={l.to} className="lp-nav__link">{l.label}</Link>
            ))}
          </div>
          <Link to="/triagem?modo=sos" className="lp-nav__sos">
            <span className="lp-nav__sos-dot" />S.O.S
          </Link>
        </div>
      </nav>

      {/* ── Conteúdo ── */}
      <div className="login-page">
          {/* ── Painel esquerdo: formulário ── */}
          <div className="login-form-panel">
            <div className="login-logo-row">
              <span className="login-logo-icon"><Shield /></span>
              <div>
                <span className="login-logo-name">NIRA</span>
                <span className="login-logo-sub">Área Restrita</span>
              </div>
            </div>

            <h1 className="login-title">Bem-vindo de volta</h1>
            <p className="login-subtitle">
              Acesso exclusivo para equipe interna.<br />
              Somente administradores criam novos acessos.
            </p>

            <form onSubmit={handleSubmit}>
              {erro && (
                <div className="login-erro">
                  <AlertCircle />
                  {erro}
                </div>
              )}

              <div className="login-input-wrap">
                <span className="login-input-icon"><User /></span>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Usuário"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </div>

              <div className="login-input-wrap">
                <span className="login-input-icon"><Lock /></span>
                <input
                  type={showPass ? 'text' : 'password'}
                  className="login-input login-input--with-toggle"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <button type="button" className="login-input-toggle" onClick={() => setShowPass(v => !v)}>
                  {showPass ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <button type="submit" className="login-btn" disabled={!usuario || !senha || loading}>
                {loading ? (
                  <>Autenticando...</>
                ) : (
                  <><LogIn /> Entrar</>
                )}
              </button>

              <a href="#" className="login-forgot">Esqueceu a senha?</a>
            </form>
          </div>

          {/* ── Painel direito: visual ── */}
          <div className="login-visual-panel">
            <div className="login-visual-icon">
              <Shield />
            </div>
            <p className="login-visual-title">NIRA</p>
            <p className="login-visual-sub">
              Núcleo de Identificação<br />e Resposta ao Abuso<br /><br />
              E.Y.E · SESI-SENAI · 2026
            </p>

            <div className="login-feature-list">
              <div className="login-feature-item">
                <ShieldCheck />
                <span>100% Anônimo para usuários</span>
              </div>
              <div className="login-feature-item">
                <AlertTriangle />
                <span>S.O.S. em 1 toque disponível</span>
              </div>
              <div className="login-feature-item">
                <ArrowRight />
                <span>Acesso público sem cadastro</span>
              </div>
            </div>

            {/* Badges flutuantes */}
            <div className="login-float-badge login-float-badge--1">
              <ShieldCheck /> Acesso seguro
            </div>
            <div className="login-float-badge login-float-badge--2">
              <AlertTriangle /> Emergência 24h
            </div>
          </div>
      </div>
    </>
  );
}
