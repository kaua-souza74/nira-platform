import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const css = `
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 16px 0;
  transition: all .3s ease;
}
.navbar--scrolled {
  background: rgba(18,17,31,.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 10px 0;
  border-bottom: 1px solid rgba(107,104,152,.2);
}
.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
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
}
.navbar__logo-wrap { display: flex; flex-direction: column; }
.navbar__logo-name {
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: .16em;
  color: #F4F6F8;
  line-height: 1;
}
.navbar__logo-sub {
  font-size: .52rem;
  letter-spacing: .1em;
  color: rgba(239,238,234,.4);
  text-transform: uppercase;
}
.navbar__links {
  display: flex;
  align-items: center;
  gap: 26px;
}
.navbar__link {
  font-size: .8rem;
  color: rgba(239,238,234,.6);
  letter-spacing: .07em;
  text-transform: uppercase;
  transition: color .28s;
  text-decoration: none;
  position: relative;
}
.navbar__link::after {
  content: '';
  position: absolute;
  bottom: -3px; left: 0;
  width: 0; height: 1px;
  background: #9B8FFF;
  transition: width .28s;
}
.navbar__link:hover { color: #F4F6F8; }
.navbar__link:hover::after { width: 100%; }
.navbar__link--active { color: #9B8FFF; }
.navbar__link--active::after { width: 100%; }

/* Lado direito */
.navbar__right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.navbar__sos {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,71,87,.12);
  border: 1px solid rgba(255,71,87,.35);
  color: #FF4757;
  font-weight: 700;
  font-size: .75rem;
  letter-spacing: .1em;
  padding: 7px 13px;
  border-radius: 8px;
  transition: all .28s;
  text-decoration: none;
}
.navbar__sos:hover {
  background: rgba(255,71,87,.25);
  border-color: #FF4757;
}
.navbar__sos-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #FF4757;
  animation: glowPulse 1.5s ease-in-out infinite;
  flex-shrink: 0;
}
/* Botão de role (após login) */
.navbar__role-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(155,143,255,.12);
  border: 1.5px solid rgba(155,143,255,.35);
  color: #9B8FFF;
  font-weight: 700;
  font-size: .8rem;
  letter-spacing: .1em;
  padding: 7px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all .28s;
  text-decoration: none;
  font-family: 'Anonymous Pro', monospace;
}
.navbar__role-btn:hover {
  background: rgba(155,143,255,.22);
  border-color: #9B8FFF;
}
/* Menu de logout */
.navbar__user-wrap { position: relative; }
.navbar__user-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: rgba(26,24,48,.97);
  border: 1px solid rgba(107,104,152,.28);
  border-radius: 12px;
  padding: 8px;
  min-width: 180px;
  box-shadow: 0 16px 40px rgba(0,0,0,.5);
  animation: fadeInUp .2s ease;
  z-index: 999;
}
.navbar__user-info {
  padding: 10px 12px 12px;
  border-bottom: 1px solid rgba(107,104,152,.2);
  margin-bottom: 6px;
}
.navbar__user-name {
  font-weight: 700;
  font-size: .85rem;
  color: #F4F6F8;
  margin-bottom: 2px;
}
.navbar__user-role {
  font-size: .7rem;
  color: rgba(239,238,234,.4);
  text-transform: uppercase;
  letter-spacing: .08em;
}
.navbar__menu-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 9px 12px;
  font-size: .82rem;
  color: rgba(239,238,234,.65);
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: all .22s;
  font-family: 'Anonymous Pro', monospace;
  text-decoration: none;
}
.navbar__menu-item:hover { background: rgba(107,104,152,.2); color: #F4F6F8; }
.navbar__menu-item--danger { color: #FF4757; }
.navbar__menu-item--danger:hover { background: rgba(255,71,87,.12); color: #FF4757; }

/* Hamburger */
.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  padding: 4px;
  cursor: pointer;
  border: none;
  z-index: 1001;
  position: relative;
}
.navbar__burger span {
  display: block;
  width: 22px; height: 2px;
  background: #F4F6F8;
  border-radius: 2px;
  transition: .3s;
}

/* Mobile */
.navbar__mobile-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(18,17,31,.97);
  z-index: 999;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  animation: fadeIn .2s ease;
}
.navbar__mobile-overlay--open { display: flex; }
.navbar__mobile-link {
  font-size: 1.15rem;
  font-weight: 700;
  color: rgba(239,238,234,.7);
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
`;

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, navLabel, navDestino } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Fechar menu ao trocar de rota
  useEffect(() => { setMenuOpen(false); setUserMenuOpen(false); }, [location]);

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

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <style>{css}</style>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-owl">🦉</span>
            <div className="navbar__logo-wrap">
              <span className="navbar__logo-name">NIRA</span>
              <span className="navbar__logo-sub">E.Y.E · 2026</span>
            </div>
          </Link>

          {/* Links desktop */}
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

          {/* Lado direito */}
          <div className="navbar__right">
            {/* S.O.S sempre visível */}
            <Link to="/triagem" className="navbar__sos">
              <span className="navbar__sos-dot" />
              S.O.S
            </Link>

            {/* Se logado: botão de role com dropdown */}
            {user ? (
              <div className="navbar__user-wrap">
                <button
                  className="navbar__role-btn"
                  onClick={() => setUserMenuOpen(v => !v)}
                >
                  {navLabel()} ▾
                </button>
                {userMenuOpen && (
                  <div className="navbar__user-menu">
                    <div className="navbar__user-info">
                      <p className="navbar__user-name">{user.nome}</p>
                      <p className="navbar__user-role">{user.role.toUpperCase()}</p>
                    </div>
                    <Link to={navDestino()} className="navbar__menu-item">
                      🗂️ Painel
                    </Link>
                    {user.role === 'adm' && (
                      <Link to="/admin/usuarios" className="navbar__menu-item">
                        👥 Gerenciar Usuários
                      </Link>
                    )}
                    {user.role === 'funcionario' && (
                      <Link to="/mapa" className="navbar__menu-item">
                        🗺️ Meu Mapa
                      </Link>
                    )}
                    <button className="navbar__menu-item navbar__menu-item--danger" onClick={handleLogout}>
                      ↩ Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
            )}

            {/* Hamburger mobile */}
            <button
              className="navbar__burger"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`navbar__mobile-overlay${menuOpen ? ' navbar__mobile-overlay--open' : ''}`}>
        {links.map(l => (
          <Link key={l.to} to={l.to} className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
            {l.label}
          </Link>
        ))}
        {user ? (
          <button className="navbar__mobile-link" style={{ background:'none', border:'none', color:'#FF4757', cursor:'pointer', fontFamily:"'Anonymous Pro',monospace" }} onClick={handleLogout}>
            ↩ Sair
          </button>
        ) : (
          <Link to="/login" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        )}
      </div>
    </>
  );
}
