import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const css = `
.cf-hero {
  padding: 100px 0 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: var(--bg-deep);
}
.cf-hero::before {
  content: '';
  position: absolute;
  top: -60px; left: 50%; transform: translateX(-50%);
  width: 900px; height: 500px;
  background: radial-gradient(ellipse at center, rgba(107,104,152,.32) 0%, rgba(107,104,152,.1) 40%, transparent 70%);
  pointer-events: none;
}
.cf-hero::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(107,104,152,.28), transparent);
}
.cf-hero__inner { position: relative; z-index: 1; }
.cf-hero h1 span { color: #9B8FFF; }

.cf-steps { padding: 88px 0; background: var(--bg-dark); }
.cf-steps__header { text-align:center; margin-bottom:60px; }
.cf-steps__grid { display: flex; flex-direction: column; gap: 0; max-width: 740px; margin: 0 auto; }
.cf-step {
  display: grid; grid-template-columns: 88px 1fr;
  gap: 28px; align-items: flex-start;
  padding: 36px 0;
  border-bottom: 1px solid rgba(107,104,152,.12);
  transition: all .3s;
}
.cf-step:last-child { border-bottom: none; }
.cf-step__left { display: flex; flex-direction: column; align-items: center; gap: 10px; flex-shrink: 0; }
.cf-step__num {
  width: 40px; height: 40px; border-radius: 50%;
  border: 1.5px solid rgba(107,104,152,.28);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: .72rem; color: rgba(239,238,234,.3);
  font-family: 'Anonymous Pro', monospace; letter-spacing: .05em;
  transition: all .3s;
}
.cf-step:hover .cf-step__num { border-color: rgba(155,143,255,.45); color: #9B8FFF; }
.cf-step__icon-wrap {
  width: 40px; height: 40px; border-radius: 11px;
  background: rgba(107,104,152,.09);
  border: 1px solid rgba(107,104,152,.18);
  display: flex; align-items: center; justify-content: center;
  transition: all .3s;
}
.cf-step:hover .cf-step__icon-wrap { background: rgba(155,143,255,.1); border-color: rgba(155,143,255,.22); }
.cf-step__icon-wrap svg { width: 18px; height: 18px; stroke: rgba(155,143,255,.65); fill: none; stroke-width: 1.65; stroke-linecap: round; stroke-linejoin: round; transition: stroke .3s; }
.cf-step:hover .cf-step__icon-wrap svg { stroke: #9B8FFF; }
.cf-step__title { font-weight: 700; font-size: 1rem; margin-bottom: 9px; color: #F4F6F8; }
.cf-step__text { font-size: .88rem; color: rgba(239,238,234,.56); line-height: 1.78; }

.cf-demo { padding: 88px 0; background: var(--bg-deep); }
.cf-demo__header { text-align:center; margin-bottom:44px; }
.cf-demo__tabs {
  display: flex; gap: 0;
  background: rgba(26,24,48,.85);
  border: 1px solid rgba(107,104,152,.18);
  border-radius: 13px; padding: 4px;
  width: fit-content; margin-bottom: 32px;
}
.cf-demo__tab {
  background: none; border: none;
  padding: 9px 22px;
  font-weight: 600; font-size: .78rem;
  color: rgba(239,238,234,.42);
  cursor: pointer; border-radius: 10px;
  transition: all .25s;
  font-family: 'Anonymous Pro', monospace;
  letter-spacing: .04em;
  display: flex; align-items: center; gap: 7px;
}
.cf-demo__tab svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
.cf-demo__tab--active { background: rgba(155,143,255,.14); color: #9B8FFF; }
.cf-demo__panel {
  background: var(--bg-card);
  border: 1px solid rgba(107,104,152,.18);
  border-radius: 20px; padding: 38px;
  backdrop-filter: blur(8px);
  min-height: 320px;
  animation: fadeIn .3s ease;
}
.cf-demo__screen-title { font-weight: 700; font-size: 1.1rem; margin-bottom: 8px; color: #F4F6F8; }
.cf-demo__screen-sub { font-size: .87rem; color: rgba(239,238,234,.48); margin-bottom: 30px; line-height: 1.75; max-width: 540px; }
.cf-demo__features { display: grid; grid-template-columns: repeat(3,1fr); gap: 13px; }
.cf-demo__feat {
  background: rgba(107,104,152,.07);
  border: 1px solid rgba(107,104,152,.14);
  border-radius: 13px; padding: 18px 16px;
  transition: border-color .25s;
}
.cf-demo__feat:hover { border-color: rgba(155,143,255,.22); }
.cf-demo__feat--sos { border-color: rgba(255,71,87,.2); background: rgba(255,71,87,.04); }
.cf-demo__feat-icon {
  width: 34px; height: 34px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 11px;
  background: rgba(107,104,152,.1); border: 1px solid rgba(107,104,152,.16);
}
.cf-demo__feat-icon svg { width: 16px; height: 16px; stroke: rgba(155,143,255,.7); fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.cf-demo__feat--sos .cf-demo__feat-icon { background: rgba(255,71,87,.08); border-color: rgba(255,71,87,.2); }
.cf-demo__feat--sos .cf-demo__feat-icon svg { stroke: #FF4757; }
.cf-demo__feat-title { font-weight: 700; font-size: .8rem; margin-bottom: 5px; color: #F4F6F8; }
.cf-demo__feat-text { font-size: .76rem; color: rgba(239,238,234,.48); line-height: 1.67; }

.cf-roles { padding: 88px 0; background: var(--bg-dark); }
.cf-roles__header { text-align:center; margin-bottom:50px; }
.cf-roles__grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
.cf-roles__card {
  background: var(--bg-card);
  border: 1px solid rgba(107,104,152,.17);
  border-radius: 20px; padding: 28px 24px;
  backdrop-filter: blur(8px);
  transition: border-color .28s, transform .28s;
}
.cf-roles__card:hover { border-color: rgba(155,143,255,.28); transform: translateY(-3px); }
.cf-roles__badge {
  display: inline-flex; align-items: center; gap: 6px;
  border-radius: 100px; padding: 5px 12px;
  font-size: .64rem; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase;
  margin-bottom: 16px;
}
.cf-roles__badge svg { width: 11px; height: 11px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.cf-roles__badge--adm  { background: rgba(155,143,255,.13); border: 1px solid rgba(155,143,255,.26); color: #9B8FFF; }
.cf-roles__badge--ong  { background: rgba(46,213,115,.09);  border: 1px solid rgba(46,213,115,.22); color: #2ED573; }
.cf-roles__badge--func { background: rgba(255,200,0,.09);   border: 1px solid rgba(255,200,0,.22);  color: #FFC800; }
.cf-roles__title { font-weight: 700; font-size: .98rem; margin-bottom: 9px; color: #F4F6F8; }
.cf-roles__text { font-size: .865rem; color: rgba(239,238,234,.56); line-height: 1.75; margin-bottom: 18px; }
.cf-roles__perms { display: flex; flex-direction: column; gap: 8px; }
.cf-roles__perm { display: flex; align-items: center; gap: 9px; font-size: .8rem; color: rgba(239,238,234,.6); }
.cf-roles__perm-check {
  width: 17px; height: 17px; border-radius: 50%;
  background: rgba(46,213,115,.09);
  border: 1px solid rgba(46,213,115,.2);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.cf-roles__perm-check svg { width: 8px; height: 8px; stroke: #2ED573; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }

.cf-cta { padding: 88px 0; text-align: center; background: var(--bg-deep); }
.cf-cta__box { max-width: 540px; margin: 0 auto; }
.cf-cta__actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 34px; }
.cf-cta-btn-sos {
  display: inline-flex; align-items: center; gap: 9px;
  background: var(--danger); color: #fff;
  padding: 14px 30px; font-size: .95rem; font-weight: 700;
  border-radius: var(--radius-lg);
  border: none; cursor: pointer; text-decoration: none;
  animation: glowPulse 2s ease-in-out infinite;
  transition: background .25s, transform .25s;
  font-family: var(--font-body);
}
.cf-cta-btn-sos:hover { background: #FF6B7A; transform: scale(1.03); }
.cf-cta-btn-sos svg { width: 17px; height: 17px; stroke: #fff; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

@media (max-width: 860px) {
  .cf-demo__features { grid-template-columns: 1fr 1fr; }
  .cf-roles__grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .cf-step { grid-template-columns: 1fr; }
  .cf-step__left { flex-direction: row; }
  .cf-demo__features { grid-template-columns: 1fr; }
  .cf-demo__tabs { flex-wrap: wrap; }
}
`;

const passos = [
  {
    icon: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    titulo: 'Acesso anônimo e seguro',
    texto: 'A vítima abre o aplicativo ou o site sem precisar se cadastrar ou revelar qualquer dado pessoal. O anonimato é garantido por padrão em toda a plataforma.',
  },
  {
    icon: <><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></>,
    titulo: 'Triagem inteligente',
    texto: 'Um fluxo guiado faz perguntas estruturadas para entender a situação, classificar o nível de risco e indicar o melhor encaminhamento disponível na rede.',
  },
  {
    icon: <><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    titulo: 'Alerta de emergência',
    texto: 'Em caso de perigo imediato, um único toque no botão de pânico envia a localização em tempo real para a rede de apoio, sem precisar falar ou digitar nada.',
  },
  {
    icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    titulo: 'Atendimento pelo chat',
    texto: 'Psicólogos e assistentes sociais recebem o caso no painel e respondem de forma privada e segura, com histórico registrado e protegido.',
  },
  {
    icon: <><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></>,
    titulo: 'Encaminhamento para serviços',
    texto: 'O sistema mapeia delegacias, organizações e clínicas parceiras próximas ao usuário e facilita o agendamento de consultas presenciais ou à distância.',
  },
  {
    icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    titulo: 'Acompanhamento e dados',
    texto: 'Gestores acessam relatórios, mapa de calor e indicadores que apoiam políticas públicas e direcionamento de equipes para as áreas de maior necessidade.',
  },
];

const demoTabs = [
  { key: 'mobile', label: 'Aplicativo',     icon: <><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></> },
  { key: 'web',    label: 'Painel web',     icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></> },
  { key: 'admin',  label: 'Administração',  icon: <><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></> },
];

const demoContent = {
  mobile: {
    titulo: 'Aplicativo — para quem precisa de ajuda',
    sub: 'Interface projetada para ser usada de forma rápida, discreta e segura, mesmo em situações de alto estresse.',
    features: [
      { icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>, titulo: 'Acesso discreto',        texto: 'Entrada por biometria ou senha simples, protegendo a privacidade.', sos: false },
      { icon: <><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>, titulo: 'Botão de emergência',    texto: 'Um toque envia a localização. Nenhuma palavra precisa ser dita.', sos: true },
      { icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>, titulo: 'Conversa anônima',       texto: 'Atendimento sem revelar identidade.', sos: false },
      { icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>, titulo: 'Conteúdos de apoio',   texto: 'Artigos e orientações sobre direitos e saúde mental.', sos: false },
      { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, titulo: 'Locais de apoio',       texto: 'Mapa de delegacias, organizações e clínicas próximas.', sos: false },
      { icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>, titulo: 'Agendamentos',           texto: 'Consultas presenciais ou à distância com parceiros.', sos: false },
    ],
  },
  web: {
    titulo: 'Painel web — para profissionais e organizações',
    sub: 'Ambiente completo para psicólogos, assistentes sociais, organizações e agentes gerenciarem os atendimentos.',
    features: [
      { icon: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>, titulo: 'Visão em tempo real',    texto: 'Alertas, localização e status dos atendimentos em andamento.', sos: true },
      { icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>, titulo: 'Gestão de conversas',    texto: 'Interface para responder usuários com histórico seguro.', sos: false },
      { icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>, titulo: 'Relatórios',              texto: 'Dados sobre atendimentos e mapa de calor por região.', sos: false },
      { icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>, titulo: 'Profissionais',           texto: 'Cadastro e gestão de psicólogos e agentes autorizados.', sos: false },
      { icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>, titulo: 'Agendamento',             texto: 'Central de consultas presenciais e à distância.', sos: false },
      { icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>, titulo: 'Publicação de conteúdo', texto: 'Gestão de artigos e materiais informativos.', sos: false },
    ],
  },
  admin: {
    titulo: 'Administração — controle total da operação',
    sub: 'O administrador tem acesso exclusivo a todas as funções, incluindo criação de acessos, alocação de equipes e monitoramento geral.',
    features: [
      { icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>, titulo: 'Criação de acessos',     texto: 'Apenas administradores criam contas para organizações e equipes.', sos: false },
      { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, titulo: 'Alocação de equipes',   texto: 'Mapa interativo para distribuir agentes por área de cobertura.', sos: true },
      { icon: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>, titulo: 'Visão geral',            texto: 'Acesso irrestrito a todos os dados, alertas e relatórios.', sos: false },
      { icon: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>, titulo: 'Configurações',         texto: 'Gerenciar organizações parceiras e permissões de área.', sos: false },
      { icon: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>, titulo: 'Alertas prioritários',  texto: 'Notificações imediatas de emergências e situações críticas.', sos: false },
      { icon: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>, titulo: 'Registros e auditoria', texto: 'Histórico completo de ações para conformidade e segurança.', sos: false },
    ],
  },
};

const roles = [
  {
    badge: 'adm', label: 'Administrador',
    icon: <><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
    titulo: 'Administrador',
    texto: 'Acesso total ao sistema. Responsável por criar e gerenciar todos os acessos, alocar funcionários nas áreas e monitorar toda a operação da plataforma.',
    perms: ['Criar e remover qualquer usuário', 'Acessar todos os painéis', 'Alocar funcionários no mapa', 'Relatórios completos', 'Configurações do sistema'],
  },
  {
    badge: 'ong', label: 'Organização parceira',
    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    titulo: 'Organização parceira',
    texto: 'Acesso focado em gestão de conteúdo e atendimento. As organizações publicam materiais, respondem conversas e encaminham casos para as áreas adequadas.',
    perms: ['Publicar e editar conteúdos', 'Responder conversas dos usuários', 'Encaminhar casos para equipes', 'Ver relatórios de conteúdo'],
  },
  {
    badge: 'func', label: 'Agente de campo',
    icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    titulo: 'Funcionário ou agente',
    texto: 'Ao entrar no sistema, o agente acessa o mapa onde o administrador define sua área de atuação. Atende casos encaminhados dentro de sua região designada.',
    perms: ['Ver mapa de alocação', 'Atender casos na sua área', 'Conversar com usuários designados', 'Registrar atendimentos'],
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

        <section className="cf-hero">
          <div className="container cf-hero__inner">
            <span className="section-label">Demonstração</span>
            <h1 className="section-title">Como o <span>NIRA</span> funciona?</h1>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Uma plataforma completa — do pedido de socorro ao acompanhamento integrado.
            </p>
          </div>
        </section>

        <section className="cf-steps">
          <div className="container">
            <div className="cf-steps__header">
              <span className="section-label">Fluxo</span>
              <h2 className="section-title">Passo a passo</h2>
              <p className="section-sub" style={{ margin: '0 auto' }}>
                Entenda como a jornada funciona, desde o primeiro contato até o acompanhamento contínuo.
              </p>
            </div>
            <div className="cf-steps__grid">
              {passos.map((p, i) => (
                <div className="cf-step" key={p.titulo}>
                  <div className="cf-step__left">
                    <div className="cf-step__num">{String(i + 1).padStart(2, '0')}</div>
                    <div className="cf-step__icon-wrap">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">{p.icon}</svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="cf-step__title">{p.titulo}</h3>
                    <p className="cf-step__text">{p.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cf-demo">
          <div className="container">
            <div className="cf-demo__header">
              <span className="section-label">Interfaces</span>
              <h2 className="section-title">Explore as telas</h2>
              <p className="section-sub" style={{ margin: '0 auto' }}>
                Cada perfil tem uma experiência projetada para suas necessidades específicas.
              </p>
            </div>
            <div className="cf-demo__tabs">
              {demoTabs.map(t => (
                <button key={t.key} className={`cf-demo__tab${tab === t.key ? ' cf-demo__tab--active' : ''}`} onClick={() => setTab(t.key)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{t.icon}</svg>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="cf-demo__panel">
              <h3 className="cf-demo__screen-title">{demo.titulo}</h3>
              <p className="cf-demo__screen-sub">{demo.sub}</p>
              <div className="cf-demo__features">
                {demo.features.map(f => (
                  <div key={f.titulo} className={`cf-demo__feat${f.sos ? ' cf-demo__feat--sos' : ''}`}>
                    <div className="cf-demo__feat-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                    </div>
                    <p className="cf-demo__feat-title">{f.titulo}</p>
                    <p className="cf-demo__feat-text">{f.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="cf-roles">
          <div className="container">
            <div className="cf-roles__header">
              <span className="section-label">Perfis de acesso</span>
              <h2 className="section-title">Quem pode fazer o quê?</h2>
              <p className="section-sub" style={{ margin: '0 auto' }}>
                Cada perfil tem permissões específicas. Apenas administradores criam novos acessos.
              </p>
            </div>
            <div className="cf-roles__grid">
              {roles.map(r => (
                <div className="cf-roles__card" key={r.label}>
                  <span className={`cf-roles__badge cf-roles__badge--${r.badge}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{r.icon}</svg>
                    {r.label}
                  </span>
                  <h3 className="cf-roles__title">{r.titulo}</h3>
                  <p className="cf-roles__text">{r.texto}</p>
                  <div className="cf-roles__perms">
                    {r.perms.map(p => (
                      <div className="cf-roles__perm" key={p}>
                        <span className="cf-roles__perm-check">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#2ED573" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cf-cta">
          <div className="container">
            <div className="cf-cta__box">
              <span className="section-label">Pronta para começar?</span>
              <h2 className="section-title">Você não está sozinha.</h2>
              <p className="section-sub" style={{ margin: '0 auto' }}>
                A triagem é anônima e leva menos de dois minutos. Nenhum dado pessoal é necessário.
              </p>
              <div className="cf-cta__actions">
                <Link to="/triagem" className="cf-cta-btn-sos">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  Iniciar triagem agora
                </Link>
                <Link to="/conteudos" className="btn btn-outline btn-lg">Ver conteúdos</Link>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
