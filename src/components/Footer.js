import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle } from 'lucide-react';

const css = `
.footer {
  background: var(--bg-deep);
  border-top: 1px solid rgba(107,104,152,.18);
  padding: 52px 0 28px;
}
.footer__inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}
.footer__brand-row { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.footer__brand-icon {
  display:flex;align-items:center;justify-content:center;
  width:28px;height:28px;border-radius:7px;
  background:linear-gradient(135deg,rgba(107,104,152,.3),rgba(155,143,255,.2));
  border:1px solid rgba(155,143,255,.25);flex-shrink:0;
}
.footer__brand-icon svg{width:14px;height:14px;stroke:#9B8FFF;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
.footer__brand-name { font-weight: 700; font-size: 1.2rem; letter-spacing: .14em; color: #F4F6F8; }
.footer__brand-desc { font-size: .85rem; color: rgba(239,238,234,.45); line-height: 1.7; max-width: 270px; margin-bottom: 14px; }
.footer__eye-tag { font-size: .68rem; color: rgba(239,238,234,.28); letter-spacing: .06em; }
.footer__col-title { font-weight: 700; font-size: .75rem; color: #F4F6F8; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 14px; }
.footer__links { display: flex; flex-direction: column; gap: 9px; }
.footer__link { font-size: .85rem; color: rgba(239,238,234,.48); transition: color .25s; text-decoration: none; }
.footer__link:hover { color: #9B8FFF; }
.footer__link--sos {
  display:inline-flex;align-items:center;gap:6px;
  color:#FF4757 !important;
  transition:color .25s;
}
.footer__link--sos svg{width:13px;height:13px;stroke:#FF4757;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
.footer__bottom {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 24px;
  border-top: 1px solid rgba(107,104,152,.13);
  gap: 16px; flex-wrap: wrap;
}
.footer__copy { font-size: .75rem; color: rgba(239,238,234,.28); }
.footer__copy span { color: #9B8FFF; }
.footer__disclaimer { font-size: .7rem; color: rgba(239,238,234,.22); max-width: 420px; line-height: 1.6; text-align: right; }
@media (max-width: 860px) { .footer__inner { grid-template-columns: 1fr 1fr; } }
@media (max-width: 520px) { .footer__inner { grid-template-columns: 1fr; } .footer__bottom { flex-direction: column; text-align: center; } .footer__disclaimer { text-align: center; } }
`;

export default function Footer() {
  return (
    <>
      <style>{css}</style>
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div>
              <div className="footer__brand-row">
                <span className="footer__brand-icon"><Shield /></span>
                <span className="footer__brand-name">NIRA</span>
              </div>
              <p className="footer__brand-desc">
                Núcleo de Identificação e Resposta ao Abuso. Um porto seguro digital para ouvir, acolher e proteger quem mais precisa.
              </p>
              <p className="footer__eye-tag">E.Y.E — Ethical Youth Engineers · SESI-SENAI · 2026</p>
            </div>
            <div>
              <p className="footer__col-title">Plataforma</p>
              <div className="footer__links">
                <Link to="/" className="footer__link">Início</Link>
                <Link to="/como-funciona" className="footer__link">Como Funciona</Link>
                <Link to="/conteudos" className="footer__link">Conteúdos</Link>
                <Link to="/triagem" className="footer__link">Triagem S.O.S.</Link>
              </div>
            </div>
            <div>
              <p className="footer__col-title">Projeto</p>
              <div className="footer__links">
                <Link to="/como-funciona" className="footer__link">Demonstração</Link>
                <Link to="/login" className="footer__link">Área Restrita</Link>
              </div>
            </div>
            <div>
              <p className="footer__col-title">Emergência</p>
              <div className="footer__links">
                <a href="tel:190" className="footer__link">190 — Polícia</a>
                <a href="tel:180" className="footer__link">180 — Central da Mulher</a>
                <a href="tel:192" className="footer__link">192 — SAMU</a>
                <a href="tel:100" className="footer__link">100 — Direitos Humanos</a>
                <Link to="/triagem" className="footer__link footer__link--sos">
                  <AlertTriangle /> S.O.S. NIRA
                </Link>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copy">© 2026 <span>NIRA</span> · Desenvolvido pela equipe <span>E.Y.E</span></p>
            <p className="footer__disclaimer">A NIRA é uma ferramenta de apoio e não substitui serviços de emergência. Em situação de perigo imediato, ligue 190 ou 180.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
