import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const css = `
/* ══════════════════════════════════════
   NAVBAR — Pill glassmorphism (Figma)
   Flutua no topo com border-radius pill
══════════════════════════════════════ */

.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 14px 0;
  /* Sem fundo próprio — o pill que tem glass */
}

/* ── PILL CONTAINER ── */
.navbar__pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  max-width: 1160px;
  margin: 0 auto;
  padding: 10px 10px 10px 20px;

  /* Glass pill — igual ao Figma */
  background: rgba(30, 27, 60, 0.72);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgba(107, 104, 152, 0.28);
  border-radius: 100px;
  box-shadow:
    0 8px 32px rgba(0,0,0,.45),
    0 1px 0 rgba(255,255,255,.06) inset;
  transition: background .35s, box-shadow .35s;
}

/* Ao rolar, pill mais opaco */
.navbar--scrolled .navbar__pill {
  background: rgba(22, 19, 48, 0.88);
  box-shadow:
    0 12px 40px rgba(0,0,0,.6),
    0 1px 0 rgba(255,255,255,.07) inset;
}

/* Linha de brilho no topo */
.navbar__pill::before {
  content: '';
  position: absolute;
  top: -1px; left: 15%; right: 15%;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    rgba(155,143,255,.5),
    rgba(107,104,152,.7),
    rgba(155,143,255,.5),
    transparent
  );
  border-radius: 100px;
  pointer-events: none;
}

/* ── LOGO ── */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  flex-shrink: 0;
}
.navbar__logo-owl {
  font-size: 1.45rem;
  animation: float 4s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(155,143,255,.55));
}
.navbar__logo-name {
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: .12em;
  color: #F4F6F8;
  line-height: 1;
  /* Sublinhado estilo Figma */
  border-bottom: 2px solid rgba(155,143,255,.6);
  padding-bottom: 1px;
}

/* ── LINKS CENTRAIS ── */
.navbar__links {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 1;
  justify-content: center;
}
.navbar__link {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: .82rem;
  color: rgba(239,238,234,.6);
  letter-spacing: .01em;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 100px;
  transition: all .25s;
  position: relative;
  white-space: nowrap;
}
.navbar__link:hover {
  color: #F4F6F8;
  background: rgba(107,104,152,.18);
}
/* Link ativo — destaque pill igual ao Figma */
.navbar__link--active {
  color: #F4F6F8;
  background: rgba(107,104,152,.32);
  font-weight: 600;
}

/* ── LADO DIREITO ── */
.navbar__right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* ── BOTÃO S.O.S. ── */
.navbar__sos {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,71,87,.12);
  border: 1px solid rgba(255,71,87,.38);
  color: #FF4757;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: .72rem;
  letter-spacing: .08em;
  padding: 7px 14px;
  border-radius: 100px;
  transition: all .25s;
  text-decoration: none;
}
.navbar__sos:hover {
  background: rgba(255,71,87,.22);
  border-color: #FF4757;
  box-shadow: 0 0 16px rgba(255,71,87,.25);
}
.navbar__sos-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #FF4757;
  box-shadow: 0 0 5px #FF4757;
  flex-shrink: 0;
  animation: sosPulse 1.4s ease-in-out infinite;
}
@keyframes sosPulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:.45; transform:scale(.65); }
}

/* ── BOTÃO PSITECH (= botão principal direito) ── */
.navbar__psitech {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: linear-gradient(135deg, #7B6FE8, #9B8FFF);
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: .82rem;
  letter-spacing: .02em;
  padding: 9px 20px;
  border-radius: 100px;
  text-decoration: none;
  transition: all .28s;
  box-shadow: 0 4px 16px rgba(155,143,255,.35);
  border: none;
  cursor: pointer;
}
.navbar__psitech:hover {
  background: linear-gradient(135deg, #9B8FFF, #B8AEFF);
  box-shadow: 0 6px 22px rgba(155,143,255,.5);
  transform: translateY(-1px);
}

/* ── BOTÃO LOGIN (sem login) ── */
.navbar__login-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: rgba(239,238,234,.65);
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: .82rem;
  padding: 8px 14px;
  border-radius: 100px;
  text-decoration: none;
  transition: all .25s;
  cursor: pointer;
}
.navbar__login-btn:hover {
  color: #F4F6F8;
  background: rgba(107,104,152,.18);
}

/* ── BOTÃO DE ROLE (após login) ── */
.navbar__role-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(155,143,255,.16);
  border: 1.5px solid rgba(155,143,255,.35);
  color: #C4BCFF;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: .8rem;
  padding: 8px 16px;
  border-radius: 100px;
  cursor: pointer;
  transition: all .25s;
}
.navbar__role-btn:hover {
  background: rgba(155,143,255,.24);
  border-color: #9B8FFF;
  color: #fff;
  box-shadow: 0 0 16px rgba(155,143,255,.22);
}
.navbar__role-chevron {
  font-size: .6rem;
  opacity: .6;
  transition: transform .25s;
  display: inline-block;
}
.navbar__role-chevron--open { transform: rotate(180deg); }

/* ── DROPDOWN ── */
.navbar__user-wrap { position: relative; }
.navbar__user-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: rgba(20,18,40,.94);
  backdrop-filter: blur(28px) saturate(170%);
  -webkit-backdrop-filter: blur(28px) saturate(170%);
  border: 1px solid rgba(107,104,152,.28);
  border-radius: 18px;
  padding: 6px;
  min-width: 210px;
  box-shadow: 0 20px 50px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.04) inset;
  animation: dropIn .22s cubic-bezier(.34,1.56,.64,1);
  z-index: 999;
  overflow: hidden;
}
@keyframes dropIn {
  from { opacity:0; transform:translateY(-8px) scale(.96); }
  to   { opacity:1; transform:translateY(0)    scale(1); }
}
.navbar__user-menu::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(155,143,255,.5), transparent);
}
.navbar__user-info {
  padding: 12px 14px 14px;
  border-bottom: 1px solid rgba(107,104,152,.18);
  margin-bottom: 6px;
}
.navbar__user-name {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: .88rem;
  color: #F4F6F8;
  margin-bottom: 3px;
}
.navbar__user-role {
  font-family: 'Anonymous Pro', monospace;
  font-size: .64rem;
  color: #9B8FFF;
  text-transform: uppercase;
  letter-spacing: .1em;
}
.navbar__menu-item {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 10px 14px;
  font-family: 'Poppins', sans-serif;
  font-size: .83rem;
  font-weight: 500;
  color: rgba(239,238,234,.6);
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  transition: all .2s;
  text-decoration: none;
}
.navbar__menu-item:hover {
  background: rgba(107,104,152,.18);
  color: #F4F6F8;
}
.navbar__menu-item--danger { color: rgba(255,71,87,.7); }
.navbar__menu-item--danger:hover { background: rgba(255,71,87,.1); color: #FF4757; }

/* ── HAMBURGER mobile ── */
.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: rgba(107,104,152,.18);
  border: 1px solid rgba(107,104,152,.24);
  padding: 8px 10px;
  border-radius: 100px;
  cursor: pointer;
}
.navbar__burger span {
  display: block;
  width: 18px; height: 2px;
  background: rgba(239,238,234,.8);
  border-radius: 2px;
  transition: .3s;
}

/* ── MOBILE OVERLAY ── */
.navbar__mobile-overlay {
  display: none;
  position: fixed; inset: 0;
  background: rgba(10,9,22,.97);
  backdrop-filter: blur(20px);
  z-index: 999;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  animation: fadeIn .25s ease;
}
.navbar__mobile-overlay--open { display: flex; }
.navbar__mobile-link {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: rgba(239,238,234,.65);
  text-transform: uppercase;
  letter-spacing: .08em;
  text-decoration: none;
  transition: color .2s;
}
.navbar__mobile-link:hover { color: #F4F6F8; }

@media (max-width: 820px) {
  .navbar__links { display: none; }
  .navbar__burger { display: flex; }
  .navbar__pill { max-width: calc(100% - 32px); }
}
`;

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, navLabel, navDestino } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); setUserMenuOpen(false); }, [location]);

  useEffect(() => {
    if (!userMenuOpen) return;
    const fn = (e) => { if (!e.target.closest('.navbar__user-wrap')) setUserMenuOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [userMenuOpen]);

  function handleLogout() { logout(); setUserMenuOpen(false); navigate('/'); }

  const links = [
    { label: 'Início',        to: '/' },
    { label: 'Como Funciona', to: '/como-funciona' },
    { label: 'Conteúdos',     to: '/conteudos' },
    { label: 'Sobre',         to: '/sobre' },
    { label: 'Login',         to: '/login' },
  ];

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <style>{css}</style>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div style={{ padding: '0 16px' }}>
          <div className="navbar__pill">

            {/* ── Logo ── */}
            <Link to="/" className="navbar__logo">
              <span className="navbar__logo-owl">🦉</span>
              <span className="navbar__logo-name">Nira</span>
            </Link>

            {/* ── Links centrais ── */}
            <nav className="navbar__links">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`navbar__link${isActive(l.to) ? ' navbar__link--active' : ''}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* ── Direita ── */}
            <div className="navbar__right">
              {/* S.O.S. */}
              <Link to="/triagem" className="navbar__sos">
                <span className="navbar__sos-dot" />
                S.O.S
              </Link>

              {/* Logado → role dropdown */}
              {user ? (
                <div className="navbar__user-wrap">
                  <button className="navbar__role-btn" onClick={() => setUserMenuOpen(v => !v)}>
                    {navLabel()}
                    <span className={`navbar__role-chevron${userMenuOpen ? ' navbar__role-chevron--open' : ''}`}>▾</span>
                  </button>
                  {userMenuOpen && (
                    <div className="navbar__user-menu">
                      <div className="navbar__user-info">
                        <p className="navbar__user-name">{user.nome}</p>
                        <p className="navbar__user-role">{user.role}</p>
                      </div>
                      <Link to={navDestino()} className="navbar__menu-item">🗂️ Painel</Link>
                      {user.role === 'adm' && <>
                        <Link to="/admin/conteudos" className="navbar__menu-item">📚 Conteúdos ADM</Link>
                        <Link to="/admin/usuarios"  className="navbar__menu-item">👥 Gerenciar Usuários</Link>
                        <Link to="/mapa"            className="navbar__menu-item">🗺️ Mapa de Equipes</Link>
                      </>}
                      {user.role === 'ong'         && <Link to="/admin/conteudos" className="navbar__menu-item">📚 Meus Conteúdos</Link>}
                      {user.role === 'funcionario' && <Link to="/mapa"            className="navbar__menu-item">🗺️ Meu Mapa</Link>}
                      <Link to="/chat-psicologo"   className="navbar__menu-item">💬 Atendimentos</Link>
                      <button className="navbar__menu-item navbar__menu-item--danger" onClick={handleLogout}>↩ Sair</button>
                    </div>
                  )}
                </div>
              ) : (
                /* PsiTech — botão principal quando não logado */
                <Link to="/triagem" className="navbar__psitech">
                  PsiTech
                </Link>
              )}

              {/* Hamburger mobile */}
              <button className="navbar__burger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`navbar__mobile-overlay${menuOpen ? ' navbar__mobile-overlay--open' : ''}`}>
        {links.map(l => (
          <Link key={l.to} to={l.to} className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}
        <Link to="/triagem" className="navbar__mobile-link" style={{ color:'#FF4757' }} onClick={() => setMenuOpen(false)}>🆘 S.O.S.</Link>
        {user
          ? <button style={{ background:'none', border:'none', color:'rgba(255,71,87,.8)', cursor:'pointer', fontFamily:"'Poppins',sans-serif", fontSize:'1.1rem', fontWeight:700 }} onClick={() => { handleLogout(); setMenuOpen(false); }}>↩ Sair</button>
          : <Link to="/login" className="navbar__mobile-link" style={{ color:'#9B8FFF' }} onClick={() => setMenuOpen(false)}>Entrar</Link>
        }
      </div>
    </>
  );
}
