import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const css = `
/* ══════════════════════════════
   NAVBAR — Glassmorphism NIRA
   Sempre glass, fica mais densa
   conforme o scroll
══════════════════════════════ */

.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  /* Glass sempre ativo */
  background: rgba(18, 17, 31, 0.45);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 14px 0;
  transition: background .35s ease, padding .35s ease, border-color .35s ease;
}

/* Ao rolar — glass mais opaco e borda mais visível */
.navbar--scrolled {
  background: rgba(18, 17, 31, 0.78);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  border-bottom: 1px solid rgba(107, 104, 152, 0.22);
  padding: 10px 0;
}

/* Linha de brilho sutil no topo da navbar */
.navbar::before {
  content: '';
  position: absolute;
  top: 0; left: 10%; right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(155, 143, 255, 0.4),
    rgba(107, 104, 152, 0.6),
    rgba(155, 143, 255, 0.4),
    transparent
  );
  pointer-events: none;
}

/* ── INNER ── */
.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

/* ── LOGO ── */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}
.navbar__logo-owl {
  font-size: 1.5rem;
  animation: float 4s ease-in-out infinite;
  display: inline-block;
  filter: drop-shadow(0 0 8px rgba(155,143,255,.5));
}
.navbar__logo-wrap { display: flex; flex-direction: column; gap: 1px; }
.navbar__logo-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  letter-spacing: .18em;
  color: #F4F6F8;
  line-height: 1;
}
.navbar__logo-sub {
  font-family: 'Anonymous Pro', monospace;
  font-size: .5rem;
  letter-spacing: .12em;
  color: rgba(239,238,234,.35);
  text-transform: uppercase;
}

/* ── LINKS NAV ── */
.navbar__links {
  display: flex;
  align-items: center;
  gap: 28px;
}
.navbar__link {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: .78rem;
  color: rgba(239,238,234,.55);
  letter-spacing: .06em;
  text-transform: uppercase;
  transition: color .25s;
  text-decoration: none;
  position: relative;
}
/* Underline animado */
.navbar__link::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 0; height: 1.5px;
  background: linear-gradient(90deg, #9B8FFF, #6B6898);
  border-radius: 2px;
  transition: width .28s cubic-bezier(.4,0,.2,1);
}
.navbar__link:hover { color: #F4F6F8; }
.navbar__link:hover::after { width: 100%; }
.navbar__link--active { color: #C4BCFF; }
.navbar__link--active::after { width: 100%; }

/* ── LADO DIREITO ── */
.navbar__right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

/* ── BOTÃO S.O.S. ── */
.navbar__sos {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  /* Glass vermelho */
  background: rgba(255, 71, 87, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 71, 87, 0.38);
  color: #FF4757;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: .72rem;
  letter-spacing: .1em;
  padding: 7px 14px;
  border-radius: 8px;
  transition: all .25s;
  text-decoration: none;
}
.navbar__sos:hover {
  background: rgba(255, 71, 87, 0.22);
  border-color: #FF4757;
  box-shadow: 0 0 18px rgba(255,71,87,.25);
}
.navbar__sos-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #FF4757;
  flex-shrink: 0;
  box-shadow: 0 0 6px #FF4757;
  animation: sosPulse 1.4s ease-in-out infinite;
}
@keyframes sosPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: .5; transform: scale(.7); }
}

/* ── BOTÃO LOGIN ── */
.navbar__login-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(155, 143, 255, 0.12);
  backdrop-filter: blur(8px);
  border: 1.5px solid rgba(155, 143, 255, 0.32);
  color: #C4BCFF;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: .78rem;
  letter-spacing: .04em;
  padding: 8px 18px;
  border-radius: 10px;
  text-decoration: none;
  transition: all .28s;
}
.navbar__login-btn:hover {
  background: rgba(155, 143, 255, 0.22);
  border-color: #9B8FFF;
  color: #fff;
  box-shadow: 0 0 18px rgba(155,143,255,.25);
}

/* ── BOTÃO DE ROLE (após login) ── */
.navbar__role-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(155, 143, 255, 0.12);
  backdrop-filter: blur(8px);
  border: 1.5px solid rgba(155, 143, 255, 0.32);
  color: #C4BCFF;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: .8rem;
  letter-spacing: .06em;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all .28s;
}
.navbar__role-btn:hover {
  background: rgba(155, 143, 255, 0.22);
  border-color: #9B8FFF;
  color: #fff;
  box-shadow: 0 0 18px rgba(155,143,255,.25);
}
.navbar__role-chevron {
  font-size: .65rem;
  opacity: .65;
  transition: transform .25s;
  display: inline-block;
}
.navbar__role-chevron--open { transform: rotate(180deg); }

/* ── DROPDOWN USUÁRIO ── */
.navbar__user-wrap { position: relative; }
.navbar__user-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  /* Glass no dropdown também */
  background: rgba(20, 18, 38, 0.92);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgba(107, 104, 152, 0.28);
  border-radius: 14px;
  padding: 6px;
  min-width: 200px;
  box-shadow: 0 20px 50px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04) inset;
  animation: dropIn .2s cubic-bezier(.34,1.56,.64,1);
  z-index: 999;
  overflow: hidden;
}
@keyframes dropIn {
  from { opacity: 0; transform: translateY(-8px) scale(.97); }
  to   { opacity: 1; transform: translateY(0)   scale(1); }
}
/* Linha de brilho no topo do dropdown */
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
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: .88rem;
  color: #F4F6F8;
  margin-bottom: 3px;
}
.navbar__user-role {
  font-family: 'Anonymous Pro', monospace;
  font-size: .65rem;
  color: #9B8FFF;
  text-transform: uppercase;
  letter-spacing: .1em;
}
.navbar__menu-item {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  text-align: left;
  padding: 10px 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: .83rem;
  font-weight: 500;
  color: rgba(239,238,234,.62);
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 9px;
  transition: all .2s;
  text-decoration: none;
}
.navbar__menu-item:hover {
  background: rgba(107,104,152,.18);
  color: #F4F6F8;
}
.navbar__menu-item--danger { color: rgba(255,71,87,.75); }
.navbar__menu-item--danger:hover { background: rgba(255,71,87,.1); color: #FF4757; }

/* ── HAMBURGER ── */
.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: rgba(107,104,152,.12);
  border: 1px solid rgba(107,104,152,.2);
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 1001;
}
.navbar__burger span {
  display: block;
  width: 20px; height: 2px;
  background: rgba(239,238,234,.8);
  border-radius: 2px;
  transition: .3s;
}

/* ── MOBILE OVERLAY ── */
.navbar__mobile-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(12, 11, 22, 0.97);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 999;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  animation: fadeIn .25s ease;
}
.navbar__mobile-overlay--open { display: flex; }
.navbar__mobile-link {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: rgba(239,238,234,.65);
  text-transform: uppercase;
  letter-spacing: .1em;
  text-decoration: none;
  transition: color .2s;
}
.navbar__mobile-link:hover { color: #F4F6F8; }

@media (max-width: 820px) {
  .navbar__links { display: none; }
  .navbar__burger { display: flex; }
}
@media (max-width: 480px) {
  .navbar__sos span:not(.navbar__sos-dot) { display: none; }
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
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    if (!userMenuOpen) return;
    const fn = (e) => {
      if (!e.target.closest('.navbar__user-wrap')) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [userMenuOpen]);

  function handleLogout() {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  }

  const links = [
    { label: 'Início',        to: '/' },
    { label: 'Como Funciona', to: '/como-funciona' },
    { label: 'Conteúdos',     to: '/conteudos' },
    { label: 'Triagem',       to: '/triagem' },
  ];

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <style>{css}</style>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">

          {/* ── Logo ── */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-owl">🦉</span>
            <div className="navbar__logo-wrap">
              <span className="navbar__logo-name">NIRA</span>
              <span className="navbar__logo-sub">E.Y.E · Ethical Youth Engineers</span>
            </div>
          </Link>

          {/* ── Links desktop ── */}
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

          {/* ── Lado direito ── */}
          <div className="navbar__right">
            {/* S.O.S. sempre visível */}
            <Link to="/triagem" className="navbar__sos">
              <span className="navbar__sos-dot" />
              S.O.S
            </Link>

            {/* Se logado → botão de role com dropdown */}
            {user ? (
              <div className="navbar__user-wrap">
                <button
                  className="navbar__role-btn"
                  onClick={() => setUserMenuOpen(v => !v)}
                >
                  {navLabel()}
                  <span className={`navbar__role-chevron${userMenuOpen ? ' navbar__role-chevron--open' : ''}`}>▾</span>
                </button>

                {userMenuOpen && (
                  <div className="navbar__user-menu">
                    <div className="navbar__user-info">
                      <p className="navbar__user-name">{user.nome}</p>
                      <p className="navbar__user-role">{user.role}</p>
                    </div>

                    <Link to={navDestino()} className="navbar__menu-item">
                      🗂️ Painel
                    </Link>

                    {user.role === 'adm' && (
                      <>
                        <Link to="/admin/conteudos" className="navbar__menu-item">
                          📚 Conteúdos ADM
                        </Link>
                        <Link to="/admin/usuarios" className="navbar__menu-item">
                          👥 Gerenciar Usuários
                        </Link>
                        <Link to="/mapa" className="navbar__menu-item">
                          🗺️ Mapa de Equipes
                        </Link>
                      </>
                    )}

                    {user.role === 'ong' && (
                      <Link to="/admin/conteudos" className="navbar__menu-item">
                        📚 Meus Conteúdos
                      </Link>
                    )}

                    {user.role === 'funcionario' && (
                      <Link to="/mapa" className="navbar__menu-item">
                        🗺️ Meu Mapa
                      </Link>
                    )}

                    <button
                      className="navbar__menu-item navbar__menu-item--danger"
                      onClick={handleLogout}
                    >
                      ↩ Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="navbar__login-btn">
                Entrar
              </Link>
            )}

            {/* Hamburger mobile */}
            <button
              className="navbar__burger"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Abrir menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <div className={`navbar__mobile-overlay${menuOpen ? ' navbar__mobile-overlay--open' : ''}`}>
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </Link>
        ))}

        <Link to="/triagem" className="navbar__mobile-link" style={{ color:'#FF4757' }} onClick={() => setMenuOpen(false)}>
          🆘 S.O.S.
        </Link>

        {user ? (
          <button
            className="navbar__mobile-link"
            style={{ background:'none', border:'none', color:'rgba(255,71,87,.8)', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif" }}
            onClick={() => { handleLogout(); setMenuOpen(false); }}
          >
            ↩ Sair
          </button>
        ) : (
          <Link to="/login" className="navbar__mobile-link" style={{ color:'#9B8FFF' }} onClick={() => setMenuOpen(false)}>
            Entrar
          </Link>
        )}
      </div>
    </>
  );
}
