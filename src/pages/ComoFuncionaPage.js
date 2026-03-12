import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const css = `
.cf-hero { padding: 90px 0 60px; text-align:center; background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(107,104,152,.28) 0%, transparent 60%), var(--bg-deep); }
.cf-hero h1 span { color: #9B8FFF; }

/* Passos */
.cf-steps { padding: 80px 0; background: var(--bg-dark); }
.cf-steps__grid { display: flex; flex-direction: column; gap: 0; }
.cf-step {
  display: grid; grid-template-columns: 80px 1fr;
  gap: 28px; align-items: flex-start;
  padding: 36px 0;
  border-bottom: 1px solid rgba(107,104,152,.14);
  transition: all .3s;
}
.cf-step:last-child { border-bottom: none; }
.cf-step:hover .cf-step__num { border-color: #9B8FFF; color: #9B8FFF; }
.cf-step__num {
  width: 56px; height: 56px; border-radius: 50%;
  border: 2px solid rgba(107,104,152,.35);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 1.2rem; color: rgba(239,238,234,.5);
  transition: all .3s; flex-shrink:0;
}
.cf-step__icon { font-size: 1.5rem; margin-bottom: 10px; display:block; }
.cf-step__title { font-weight: 700; font-size: 1.1rem; margin-bottom: 8px; color: #F4F6F8; }
.cf-step__text { font-size: .92rem; color: rgba(239,238,234,.6); line-height: 1.75; max-width: 640px; }

/* Demo interativo */
.cf-demo { padding: 80px 0; background: var(--bg-deep); }
.cf-demo__tabs { display: flex; gap: 6px; margin-bottom: 36px; background: rgba(107,104,152,.1); border-radius: 12px; padding: 5px; width: fit-content; }
.cf-demo__tab { background:none; border:none; padding:10px 22px; font-weight:700; font-size:.82rem; color:rgba(239,238,234,.5); cursor:pointer; border-radius:9px; transition:all .25s; font-family:'Anonymous Pro',monospace; letter-spacing:.05em; }
.cf-demo__tab--active { background:rgba(155,143,255,.16); color:#9B8FFF; }
.cf-demo__panel { background:var(--bg-card); border:1px solid rgba(107,104,152,.2); border-radius:18px; padding:36px; backdrop-filter:blur(8px); min-height:320px; animation:fadeIn .3s ease; }
.cf-demo__screen-title { font-weight:700; font-size:1.2rem; margin-bottom:8px; color:#F4F6F8; }
.cf-demo__screen-sub { font-size:.9rem; color:rgba(239,238,234,.55); margin-bottom:28px; line-height:1.7; }
.cf-demo__features { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
.cf-demo__feat { background:rgba(107,104,152,.1); border:1px solid rgba(107,104,152,.18); border-radius:12px; padding:18px 16px; }
.cf-demo__feat-icon { font-size:1.5rem; margin-bottom:10px; display:block; }
.cf-demo__feat-title { font-weight:700; font-size:.85rem; margin-bottom:6px; color:#F4F6F8; }
.cf-demo__feat-text { font-size:.8rem; color:rgba(239,238,234,.55); line-height:1.65; }
.cf-demo__feat--sos { border-color:rgba(255,71,87,.25); background:rgba(255,71,87,.06); }

/* Papéis */
.cf-roles { padding:80px 0; background: var(--bg-dark); }
.cf-roles__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.cf-roles__card { background:var(--bg-card); border:1px solid rgba(107,104,152,.18); border-radius:18px; padding:28px 24px; backdrop-filter:blur(8px); }
.cf-roles__badge { display:inline-flex; align-items:center; gap:6px; border-radius:100px; padding:4px 12px; font-size:.68rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; margin-bottom:16px; }
.cf-roles__badge--adm  { background:rgba(155,143,255,.16); border:1px solid rgba(155,143,255,.3); color:#9B8FFF; }
.cf-roles__badge--ong  { background:rgba(46,213,115,.12);  border:1px solid rgba(46,213,115,.28); color:#2ED573; }
.cf-roles__badge--func { background:rgba(255,200,0,.12);   border:1px solid rgba(255,200,0,.28);  color:#FFC800; }
.cf-roles__title { font-weight:700; font-size:1rem; margin-bottom:10px; color:#F4F6F8; }
.cf-roles__text { font-size:.875rem; color:rgba(239,238,234,.6); line-height:1.72; margin-bottom:18px; }
.cf-roles__perms { display:flex; flex-direction:column; gap:8px; }
.cf-roles__perm { display:flex; align-items:center; gap:8px; font-size:.82rem; color:rgba(239,238,234,.65); }
.cf-roles__check { font-size:.8rem; }

/* CTA */
.cf-cta { padding:80px 0; text-align:center; background:var(--bg-deep); }
.cf-cta__box { max-width:600px; margin:0 auto; }
.cf-cta__actions { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:32px; }

@media (max-width:860px) {
  .cf-demo__features { grid-template-columns:1fr 1fr; }
  .cf-roles__grid { grid-template-columns:1fr; }
}
@media (max-width:560px) {
  .cf-step { grid-template-columns:1fr; }
  .cf-demo__features { grid-template-columns:1fr; }
}
`;

const passos = [
  { icon:'🔒', titulo:'Acesso Anônimo e Seguro',     texto:'A vítima abre o app ou site sem precisar se cadastrar ou revelar qualquer dado pessoal. O anonimato é garantido por padrão em toda a plataforma.' },
  { icon:'🤖', titulo:'Triagem Inteligente (PsiTech)', texto:'Um chatbot guiado faz perguntas estruturadas para entender a situação, classificar o nível de risco e indicar o melhor encaminhamento.' },
  { icon:'🆘', titulo:'S.O.S. com Geolocalização',    texto:'Em caso de perigo imediato, um único toque no botão de pânico envia a localização em tempo real para a rede de apoio, sem precisar falar ou digitar.' },
  { icon:'💬', titulo:'Atendimento pelo Chat',         texto:'Psicólogos e assistentes sociais recebem o caso no painel web e respondem diretamente, de forma privada e segura, com histórico registrado.' },
  { icon:'🗺️', titulo:'Encaminhamento para Serviços', texto:'O sistema mapeia delegacias, ONGs e clínicas parceiras próximas ao usuário e facilita o agendamento de consultas presenciais ou online.' },
  { icon:'📊', titulo:'Acompanhamento e Dados',        texto:'Gestores acessam relatórios, mapa de calor e indicadores que apoiam políticas públicas e direcionamento de equipes para as áreas de maior necessidade.' },
];

const demoTabs = [
  { key:'mobile', label:'📱 App Mobile' },
  { key:'web',    label:'🖥️ Painel Web' },
  { key:'admin',  label:'⚙️ Painel ADM' },
];

const demoContent = {
  mobile: {
    titulo: 'App Mobile — Para a Vítima',
    sub: 'Interface projetada para ser usada de forma rápida, discreta e segura, mesmo em situações de alto estresse.',
    features: [
      { icon:'🔐', titulo:'Login Discreto',        texto:'Acesso por biometria ou senha simples, protegendo qualquer pessoa que pegar o celular.', sos:false },
      { icon:'🆘', titulo:'Botão S.O.S.',           texto:'Um toque envia GPS em tempo real. Nenhuma palavra precisa ser dita.', sos:true  },
      { icon:'💬', titulo:'Chat Anônimo',           texto:'Conversa com atendentes sem revelar identidade.', sos:false },
      { icon:'📰', titulo:'Feed de Conteúdo',       texto:'Artigos, vídeos e orientações sobre direitos e saúde mental.', sos:false },
      { icon:'🗺️', titulo:'Locais de Apoio',       texto:'Mapa de delegacias, ONGs e clínicas próximas.', sos:false },
      { icon:'📅', titulo:'Agendamento',            texto:'Consultas presenciais ou online com profissionais parceiros.', sos:false },
    ],
  },
  web: {
    titulo: 'Painel Web — Para Gestores e Profissionais',
    sub: 'Dashboard completo para psicólogos, assistentes sociais, ONGs e agentes gerenciarem os atendimentos.',
    features: [
      { icon:'📊', titulo:'Dashboard em Tempo Real', texto:'Alertas ativos, mapa de localização e status dos atendimentos.', sos:true  },
      { icon:'💬', titulo:'Gestão de Chat',          texto:'Interface para responder usuários com histórico seguro e privado.', sos:false },
      { icon:'📈', titulo:'Relatórios',              texto:'Dados sobre atendimentos, tipos de ocorrência e mapa de calor por região.', sos:false },
      { icon:'👥', titulo:'Profissionais',           texto:'Cadastro e gestão de psicólogos e agentes autorizados.', sos:false },
      { icon:'📅', titulo:'Agendamento',             texto:'Central de consultas presenciais e online.', sos:false },
      { icon:'📚', titulo:'Publicação de Conteúdo', texto:'Gestão de artigos e materiais informativos para usuários.', sos:false },
    ],
  },
  admin: {
    titulo: 'Painel ADM — Controle Total',
    sub: 'O administrador tem acesso exclusivo a todas as funções, incluindo criação de logins, alocação de equipes e monitoramento geral.',
    features: [
      { icon:'👤', titulo:'Criar Logins',           texto:'Apenas ADMs podem criar contas para ONGs e funcionários. Sem cadastro público.', sos:false },
      { icon:'🗺️', titulo:'Alocar Funcionários',   texto:'Mapa interativo para distribuir agentes pelas áreas de cobertura.', sos:true  },
      { icon:'📊', titulo:'Visão Geral',            texto:'Acesso irrestrito a todos os dados, alertas e relatórios.', sos:false },
      { icon:'⚙️', titulo:'Configurações',          texto:'Gerenciar ONGs parceiras, áreas de cobertura e permissões.', sos:false },
      { icon:'🔔', titulo:'Alertas Prioritários',  texto:'Notificações imediatas de casos S.O.S. e situações críticas.', sos:false },
      { icon:'📋', titulo:'Logs e Auditoria',       texto:'Histórico completo de ações no sistema para conformidade e segurança.', sos:false },
    ],
  },
};

const roles = [
  {
    badge: 'adm', label: 'ADM', titulo: 'Administrador',
    texto: 'Acesso total ao sistema. Responsável por criar e gerenciar todos os logins, alocar funcionários nas áreas e monitorar toda a operação.',
    perms: ['Criar/remover qualquer usuário','Acessar todos os painéis','Alocar funcionários no mapa','Relatórios completos','Configurações do sistema'],
  },
  {
    badge: 'ong', label: 'ONG', titulo: 'ONG / Parceira',
    texto: 'Acesso focado em gestão de conteúdo e atendimento. ONGs publicam materiais, respondem chats e encaminham casos para as áreas adequadas.',
    perms: ['Publicar e editar conteúdos','Responder chat de usuários','Encaminhar casos para equipes','Ver relatórios de conteúdo'],
  },
  {
    badge: 'func', label: 'Chat', titulo: 'Funcionário / Agente',
    texto: 'Ao fazer login, o funcionário acessa o mapa onde o ADM define sua área de atuação. Atende casos encaminhados dentro de sua região.',
    perms: ['Ver mapa de alocação','Atender casos na sua área','Chat com usuários designados','Registrar atendimentos'],
  },
];

export default function ComoFuncionaPage() {
  const [tab, setTab] = useState('mobile');
  const demo = demoContent[tab];

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page-wrapper">

        {/* HERO */}
        <section className="cf-hero">
          <div className="container">
            <span className="section-label">Demonstração</span>
            <h1 className="section-title">Como o <span>NIRA</span> Funciona?</h1>
            <p className="section-sub" style={{ margin:'0 auto 32px' }}>Uma plataforma completa — do pedido de socorro ao acompanhamento integrado.</p>
          </div>
        </section>

        {/* PASSOS */}
        <section className="cf-steps">
          <div className="container">
            <div style={{ textAlign:'center', marginBottom:'52px' }}>
              <span className="section-label">Fluxo</span>
              <h2 className="section-title">Passo a Passo</h2>
            </div>
            <div className="cf-steps__grid">
              {passos.map((p, i) => (
                <div className="cf-step" key={p.titulo}>
                  <div className="cf-step__num">{String(i+1).padStart(2,'0')}</div>
                  <div>
                    <span className="cf-step__icon">{p.icon}</span>
                    <h3 className="cf-step__title">{p.titulo}</h3>
                    <p className="cf-step__text">{p.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEMO INTERATIVO */}
        <section className="cf-demo">
          <div className="container">
            <div style={{ textAlign:'center', marginBottom:'40px' }}>
              <span className="section-label">Interfaces</span>
              <h2 className="section-title">Explore as Telas</h2>
            </div>
            <div className="cf-demo__tabs">
              {demoTabs.map(t => (
                <button key={t.key} className={`cf-demo__tab${tab===t.key?' cf-demo__tab--active':''}`} onClick={() => setTab(t.key)}>{t.label}</button>
              ))}
            </div>
            <div className="cf-demo__panel">
              <h3 className="cf-demo__screen-title">{demo.titulo}</h3>
              <p className="cf-demo__screen-sub">{demo.sub}</p>
              <div className="cf-demo__features">
                {demo.features.map(f => (
                  <div key={f.titulo} className={`cf-demo__feat${f.sos?' cf-demo__feat--sos':''}`}>
                    <span className="cf-demo__feat-icon">{f.icon}</span>
                    <p className="cf-demo__feat-title">{f.titulo}</p>
                    <p className="cf-demo__feat-text">{f.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PAPÉIS */}
        <section className="cf-roles">
          <div className="container">
            <div style={{ textAlign:'center', marginBottom:'48px' }}>
              <span className="section-label">Perfis de Acesso</span>
              <h2 className="section-title">Quem Pode Fazer o Quê?</h2>
              <p className="section-sub" style={{ margin:'0 auto' }}>Cada perfil tem permissões específicas. Apenas ADMs criam novos acessos.</p>
            </div>
            <div className="cf-roles__grid">
              {roles.map(r => (
                <div className="cf-roles__card" key={r.label}>
                  <span className={`cf-roles__badge cf-roles__badge--${r.badge}`}>{r.label} — {r.titulo}</span>
                  <h3 className="cf-roles__title">{r.titulo}</h3>
                  <p className="cf-roles__text">{r.texto}</p>
                  <div className="cf-roles__perms">
                    {r.perms.map(p => (
                      <div className="cf-roles__perm" key={p}>
                        <span className="cf-roles__check">✓</span>{p}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cf-cta">
          <div className="container">
            <div className="cf-cta__box">
              <span className="section-label">Pronto para começar?</span>
              <h2 className="section-title">Você não está sozinha.</h2>
              <p className="section-sub" style={{ margin:'0 auto' }}>A NIRA está disponível agora. A triagem é anônima e leva menos de 2 minutos.</p>
              <div className="cf-cta__actions">
                <Link to="/triagem" className="btn btn-danger btn-lg">🆘 Iniciar Triagem Agora</Link>
                <Link to="/conteudos" className="btn btn-outline btn-lg">Ver Conteúdos</Link>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
