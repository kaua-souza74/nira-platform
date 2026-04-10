import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  AlertTriangle, ShieldCheck, Users, VolumeX, DoorClosed,
  Zap, HeartCrack, Shield, BookOpen, Phone,
  Palette, Settings, Code2, Layers, ClipboardCheck, User
} from 'lucide-react';

const css = `
/* ════════ HERO ════════ */
.home-hero {
  min-height: 100vh;
  display: flex; align-items: center;
  position: relative; overflow: hidden;
  background: radial-gradient(ellipse 80% 55% at 50% -5%, rgba(107,104,152,.32) 0%, transparent 65%), var(--bg-deep);
}
.home-hero__orb1 { position:absolute; top:-80px; right:-80px; width:460px; height:460px; border-radius:50%; background:rgba(107,104,152,.14); filter:blur(80px); pointer-events:none; }
.home-hero__orb2 { position:absolute; bottom:30px; left:-60px; width:280px; height:280px; border-radius:50%; background:rgba(155,143,255,.08); filter:blur(70px); pointer-events:none; }
.home-hero__inner { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; padding:90px 24px 70px; max-width:1200px; margin:0 auto; width:100%; position:relative; z-index:1; }
.home-hero__badge { display:inline-flex; align-items:center; gap:8px; background:rgba(107,104,152,.18); border:1px solid rgba(107,104,152,.35); border-radius:100px; padding:5px 15px; font-size:.7rem; color:#9B8FFF; letter-spacing:.1em; text-transform:uppercase; margin-bottom:24px; animation:fadeInUp .6s ease both; font-weight:600; }
.home-hero__badge-dot { width:6px; height:6px; border-radius:50%; background:#9B8FFF; animation:glowPulse 2s ease-in-out infinite; }
.home-hero__title { font-size:clamp(2.2rem,5vw,3.6rem); font-weight:800; line-height:1.06; margin-bottom:20px; animation:fadeInUp .65s .08s ease both; letter-spacing:-.02em; }
.home-hero__title span { color:#9B8FFF; }
.home-hero__quote { font-style:italic; font-size:.98rem; color:rgba(239,238,234,.65); margin-bottom:18px; animation:fadeInUp .65s .14s ease both; }
.home-hero__desc { font-size:1rem; color:rgba(239,238,234,.6); line-height:1.78; margin-bottom:36px; max-width:460px; animation:fadeInUp .65s .2s ease both; font-weight:400; }
.home-hero__actions { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:48px; animation:fadeInUp .65s .28s ease both; }
.home-hero__stats { display:flex; gap:0; align-items:stretch; animation:fadeInUp .65s .35s ease both; background:rgba(45,43,78,.45); border:1px solid rgba(107,104,152,.2); border-radius:16px; overflow:hidden; }
.home-hero__stat { flex:1; padding:16px 20px; border-right:1px solid rgba(107,104,152,.18); text-align:center; }
.home-hero__stat:last-child { border-right:none; }
.home-hero__stat-num { display:block; font-weight:800; font-size:1.7rem; color:#F4F6F8; line-height:1; margin-bottom:4px; }
.home-hero__stat-lbl { font-size:.65rem; color:rgba(239,238,234,.42); text-transform:uppercase; letter-spacing:.06em; }
.home-hero__visual { display:flex; align-items:center; justify-content:center; position:relative; animation:fadeIn .9s .3s ease both; }
.home-hero__icon-circle { width:280px; height:280px; border-radius:50%; background:radial-gradient(circle,rgba(107,104,152,.22) 0%,transparent 70%); border:1px solid rgba(107,104,152,.28); display:flex; align-items:center; justify-content:center; position:relative; animation:float 5s ease-in-out infinite; }
.home-hero__icon-circle svg { width:120px; height:120px; stroke:#9B8FFF; fill:none; stroke-width:1.2; stroke-linecap:round; stroke-linejoin:round; filter:drop-shadow(0 0 28px rgba(155,143,255,.45)); }
.home-hero__ring { position:absolute; border-radius:50%; border:1px solid rgba(107,104,152,.15); animation:pulseRing 3s ease-out infinite; pointer-events:none; }
.home-hero__ring1 { width:340px; height:340px; animation-delay:0s; }
.home-hero__ring2 { width:400px; height:400px; animation-delay:.7s; }
.home-hero__fcard { position:absolute; background:rgba(45,43,78,.88); border:1px solid rgba(107,104,152,.28); border-radius:13px; padding:11px 14px; display:flex; align-items:center; gap:9px; white-space:nowrap; box-shadow:0 8px 28px rgba(0,0,0,.4); animation:fadeInUp .7s ease both; }
.home-hero__fcard1 { top:6%; left:-12%; animation-delay:.5s; }
.home-hero__fcard2 { bottom:15%; left:-10%; animation-delay:.7s; }
.home-hero__fcard3 { top:10%; right:-10%; animation-delay:.9s; }
.home-hero__fcard-icon { display:flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:8px; background:rgba(107,104,152,.18); flex-shrink:0; }
.home-hero__fcard-icon svg { width:16px; height:16px; stroke:#9B8FFF; fill:none; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
.home-hero__fcard-icon--sos svg { stroke:#FF4757; }
.home-hero__fcard-title { font-weight:700; font-size:.82rem; color:#F4F6F8; }
.home-hero__fcard-sub { font-size:.68rem; color:rgba(239,238,234,.5); }

/* ════════ CARDS DE DORES ════════ */
.home-dores { padding:90px 0; background:var(--bg-dark); }
.home-dores__grid { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
.dore-card {
  position: relative;
  background: rgb(26, 24, 50);
  border: 1px solid rgba(107,104,152,.18);
  border-radius: 20px;
  padding: 36px 24px 28px;
  overflow: hidden;
  cursor: default;
  transition: border-color .35s, box-shadow .35s, transform .35s;
  min-height: 200px;
  display: flex; flex-direction: column; align-items: center;
}
.dore-card:hover {
  border-color: rgba(155,143,255,.38);
  box-shadow: 0 20px 48px rgba(0,0,0,.5);
  transform: translateY(-6px);
}
.dore-card__orb {
  position: absolute;
  width: 120px; height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--orb-color, rgba(155,143,255,.2)) 0%, transparent 70%);
  top: 50%; left: 50%;
  transform: translate(-50%,-50%) scale(0.5);
  transition: transform .5s cubic-bezier(.34,1.4,.64,1), opacity .4s;
  opacity: 0; pointer-events: none;
}
.dore-card:hover .dore-card__orb {
  transform: translate(-50%,-50%) scale(2.5);
  opacity: 1;
}
.dore-card__icon-wrap {
  width: 68px; height: 68px;
  border-radius: 50%;
  border: 2px solid rgba(107,104,152,.3);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 18px;
  position: relative; z-index: 1;
  transition: border-color .35s, transform .35s, box-shadow .35s;
  background: rgba(107,104,152,.1);
  flex-shrink: 0;
}
.dore-card:hover .dore-card__icon-wrap {
  border-color: rgba(155,143,255,.6);
  transform: translateY(-4px) scale(1.08);
  box-shadow: 0 0 24px rgba(155,143,255,.25);
  background: rgba(155,143,255,.12);
}
.dore-card__icon { display:flex; align-items:center; justify-content:center; position:relative; z-index:1; }
.dore-card__icon svg { width:28px; height:28px; stroke:rgba(155,143,255,.65); fill:none; stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round; transition:stroke .35s; }
.dore-card:hover .dore-card__icon svg { stroke:#9B8FFF; }
.dore-card__title {
  font-weight: 700; font-size: .9rem;
  color: rgba(239,238,234,.75);
  text-transform: uppercase; letter-spacing: .06em;
  text-align: center; margin-bottom: 0;
  position: relative; z-index: 1;
  transition: color .3s, transform .35s;
}
.dore-card:hover .dore-card__title { color: #F4F6F8; transform: translateY(-2px); }
.dore-card__text {
  font-size: .83rem; color: rgba(239,238,234,.65);
  line-height: 1.7; text-align: center;
  position: relative; z-index: 1;
  max-height: 0; overflow: hidden;
  opacity: 0; margin-top: 0;
  transition: max-height .4s cubic-bezier(0,1,.3,1), opacity .35s .05s, margin-top .35s;
}
.dore-card:hover .dore-card__text { max-height: 120px; opacity: 1; margin-top: 12px; }
.dore-card::after {
  content: '';
  position: absolute; top: 0; left: 15%; right: 15%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--orb-color, rgba(155,143,255,.5)), transparent);
  border-radius: 100px;
  opacity: 0; transition: opacity .35s;
}
.dore-card:hover::after { opacity: 1; }

/* ════════ QUOTE ════════ */
.home-quote { padding:60px 0; background:var(--bg-deep); }
.home-quote__box { max-width:780px; margin:0 auto; text-align:center; background:rgba(107,104,152,.07); border:1px solid rgba(107,104,152,.2); border-radius:18px; padding:40px; position:relative; }
.home-quote__box::before { content:'"'; position:absolute; top:-20px; left:36px; font-size:7rem; color:rgba(155,143,255,.12); font-family:Georgia,serif; line-height:1; pointer-events:none; }
.home-quote__text { font-style:italic; font-size:1.05rem; color:rgba(239,238,234,.78); line-height:1.82; margin-bottom:14px; }
.home-quote__src { font-size:.72rem; color:rgba(239,238,234,.32); letter-spacing:.08em; font-family:'Anonymous Pro',monospace; }

/* ════════ SOLUÇÃO ════════ */
.home-sol { padding:90px 0; background:var(--bg-dark); }
.home-sol__inner { display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center; }
.home-sol__items { display:flex; flex-direction:column; gap:14px; margin-bottom:36px; }
.home-sol__item { display:flex; align-items:flex-start; gap:14px; padding:16px 18px; background:rgba(107,104,152,.08); border:1px solid rgba(107,104,152,.15); border-radius:14px; transition:all .28s; }
.home-sol__item:hover { border-color:rgba(155,143,255,.35); background:rgba(155,143,255,.07); }
.home-sol__item-icon { display:flex; align-items:center; justify-content:center; width:38px; height:38px; border-radius:10px; background:rgba(107,104,152,.15); border:1px solid rgba(107,104,152,.2); flex-shrink:0; margin-top:2px; }
.home-sol__item-icon svg { width:18px; height:18px; stroke:#9B8FFF; fill:none; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
.home-sol__item-title { font-weight:700; font-size:.88rem; margin-bottom:4px; color:#F4F6F8; }
.home-sol__item-text { font-size:.845rem; color:rgba(239,238,234,.55); line-height:1.65; }
.home-sol__nira { background:rgba(45,43,78,.65); border:1px solid rgba(107,104,152,.28); border-radius:22px; padding:44px 36px; text-align:center; position:relative; overflow:hidden; }
.home-sol__nira::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 50% 0%,rgba(155,143,255,.12) 0%,transparent 65%); pointer-events:none; }
.home-sol__nira-icon { display:flex; align-items:center; justify-content:center; width:80px; height:80px; border-radius:50%; background:rgba(107,104,152,.18); border:1px solid rgba(155,143,255,.25); margin:0 auto 20px; animation:float 5s ease-in-out infinite; }
.home-sol__nira-icon svg { width:40px; height:40px; stroke:#9B8FFF; fill:none; stroke-width:1.4; stroke-linecap:round; stroke-linejoin:round; filter:drop-shadow(0 0 12px rgba(155,143,255,.4)); }
.home-sol__nira-name { font-weight:800; font-size:2.8rem; letter-spacing:.12em; color:#F4F6F8; margin-bottom:6px; }
.home-sol__nira-full { font-size:.68rem; color:rgba(239,238,234,.4); letter-spacing:.09em; text-transform:uppercase; line-height:1.6; margin-bottom:24px; font-family:'Anonymous Pro',monospace; }
.home-sol__badges { display:flex; justify-content:center; gap:8px; flex-wrap:wrap; }
.home-sol__badge { background:rgba(107,104,152,.18); border:1px solid rgba(107,104,152,.28); border-radius:100px; padding:5px 14px; font-size:.68rem; color:#9B8FFF; letter-spacing:.07em; font-weight:600; }

/* ════════ PÚBLICO ════════ */
.home-pub { padding:90px 0; background:var(--bg-deep); }
.home-pub__grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.home-pub__card { background:var(--bg-card); border:1px solid rgba(107,104,152,.15); border-radius:20px; padding:32px; }
.home-pub__ctitle { font-weight:700; font-size:.9rem; text-transform:uppercase; letter-spacing:.08em; margin-bottom:20px; color:rgba(239,238,234,.8); padding-bottom:14px; border-bottom:1px solid rgba(107,104,152,.18); display:flex; align-items:center; gap:8px; }
.home-pub__ctitle svg { width:16px; height:16px; stroke:#9B8FFF; fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
.home-pub__list { display:flex; flex-direction:column; gap:11px; }
.home-pub__item { display:flex; align-items:center; gap:10px; font-size:.9rem; color:rgba(239,238,234,.7); }
.home-pub__dot { width:6px; height:6px; border-radius:50%; background:#9B8FFF; flex-shrink:0; }

/* ════════ FAQ ════════ */
.home-faq { padding:96px 0; background:var(--bg-dark); }
.home-faq__layout { display:grid; grid-template-columns:340px 1fr; gap:72px; align-items:flex-start; }
.home-faq__side-label { font-size:.68rem; color:#9B8FFF; letter-spacing:.16em; text-transform:uppercase; font-family:'Anonymous Pro',monospace; margin-bottom:14px; display:block; }
.home-faq__side-title { font-size:clamp(1.8rem,3.5vw,2.4rem); font-weight:800; line-height:1.1; margin-bottom:16px; letter-spacing:-.02em; }
.home-faq__side-sub { font-size:.93rem; color:rgba(239,238,234,.55); line-height:1.78; margin-bottom:32px; font-weight:400; }
.home-faq__side-cta { display:flex; flex-direction:column; gap:10px; }
.home-faq__contact {
  display:flex; align-items:center; gap:12px;
  background:rgba(107,104,152,.1); border:1px solid rgba(107,104,152,.18);
  border-radius:14px; padding:14px 16px; transition:border-color .25s; text-decoration:none;
}
.home-faq__contact:hover { border-color:rgba(155,143,255,.38); background:rgba(155,143,255,.07); }
.home-faq__contact-icon { display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:9px; background:rgba(107,104,152,.18); flex-shrink:0; }
.home-faq__contact-icon svg { width:18px; height:18px; stroke:#9B8FFF; fill:none; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
.home-faq__contact-icon--sos svg { stroke:#FF4757; }
.home-faq__contact-title { font-weight:700; font-size:.85rem; color:#F4F6F8; margin-bottom:2px; }
.home-faq__contact-sub { font-size:.72rem; color:rgba(239,238,234,.4); }
.home-faq__list { display:flex; flex-direction:column; gap:8px; }
.faq-item {
  background:rgba(30,28,56,.8);
  border:1px solid rgba(107,104,152,.16);
  border-radius:16px; overflow:hidden;
  transition:border-color .28s, box-shadow .28s;
}
.faq-item--open { border-color:rgba(155,143,255,.3); box-shadow:0 6px 28px rgba(0,0,0,.25); }
.faq-item__btn { width:100%; display:flex; align-items:center; justify-content:space-between; gap:14px; padding:18px 20px; background:none; border:none; cursor:pointer; text-align:left; transition:background .22s; }
.faq-item__btn:hover { background:rgba(107,104,152,.1); }
.faq-item--open .faq-item__btn { background:rgba(107,104,152,.1); }
.faq-item__q { font-family:'Poppins',sans-serif; font-weight:600; font-size:.9rem; color:#F4F6F8; line-height:1.4; flex:1; }
.faq-item__icon { width:26px; height:26px; border-radius:50%; background:rgba(107,104,152,.2); border:1px solid rgba(107,104,152,.3); display:flex; align-items:center; justify-content:center; font-size:.8rem; color:rgba(239,238,234,.55); flex-shrink:0; transition:all .28s; }
.faq-item--open .faq-item__icon { background:rgba(155,143,255,.18); border-color:rgba(155,143,255,.4); color:#9B8FFF; transform:rotate(45deg); }
.faq-item__body { max-height:0; overflow:hidden; transition:max-height .4s cubic-bezier(0,1,.2,1),padding .3s; padding:0 20px; }
.faq-item--open .faq-item__body { max-height:320px; padding-bottom:18px; }
.faq-item__a { font-size:.875rem; color:rgba(239,238,234,.65); line-height:1.78; border-top:1px solid rgba(107,104,152,.14); padding-top:14px; font-weight:400; }
.faq-item__tag { display:inline-block; background:rgba(155,143,255,.1); border-radius:100px; padding:2px 10px; font-size:.6rem; color:#9B8FFF; letter-spacing:.08em; text-transform:uppercase; margin-bottom:10px; font-weight:600; }

/* ════════ EQUIPE ════════ */
.home-equipe { padding:90px 0; background:var(--bg-deep); }
.home-equipe__grid { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
.equipe-card {
  background: rgb(26,24,50);
  border: 1px solid rgba(107,104,152,.15);
  border-radius: 18px; padding: 28px 18px;
  text-align: center; cursor: default;
  transition: all .35s;
  position: relative; overflow: hidden;
}
.equipe-card::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 120%, rgba(155,143,255,.14) 0%, transparent 65%);
  opacity: 0; transition: opacity .35s;
}
.equipe-card:hover { border-color: rgba(155,143,255,.32); transform: translateY(-6px); box-shadow: 0 18px 40px rgba(0,0,0,.45); }
.equipe-card:hover::before { opacity: 1; }
.equipe-card__avatar {
  width: 70px; height: 70px; border-radius: 50%;
  background: linear-gradient(135deg, rgba(107,104,152,.3), rgba(155,143,255,.15));
  border: 2px solid rgba(107,104,152,.28);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
  transition: all .35s; position: relative; z-index: 1;
}
.equipe-card__avatar svg { width:28px; height:28px; stroke:rgba(155,143,255,.65); fill:none; stroke-width:1.7; stroke-linecap:round; stroke-linejoin:round; transition:stroke .35s; }
.equipe-card:hover .equipe-card__avatar { border-color: rgba(155,143,255,.55); box-shadow: 0 0 20px rgba(155,143,255,.22); transform: scale(1.07); }
.equipe-card:hover .equipe-card__avatar svg { stroke:#9B8FFF; }
.equipe-card__name { font-weight:700; font-size:.9rem; color:#F4F6F8; margin-bottom:5px; position:relative; z-index:1; }
.equipe-card__role { font-size:.66rem; color:#9B8FFF; letter-spacing:.09em; text-transform:uppercase; font-weight:600; margin-bottom:8px; position:relative; z-index:1; }
.equipe-card__school { font-size:.63rem; color:rgba(239,238,234,.3); font-family:'Anonymous Pro',monospace; position:relative; z-index:1; }

/* Responsive */
@media (max-width:960px) {
  .home-hero__inner { grid-template-columns:1fr; gap:36px; text-align:center; }
  .home-hero__desc { max-width:100%; margin-inline:auto; }
  .home-hero__actions { justify-content:center; }
  .home-hero__visual { display:none; }
  .home-dores__grid { grid-template-columns:1fr 1fr; }
  .home-sol__inner { grid-template-columns:1fr; gap:44px; }
  .home-sol__nira { display:none; }
  .home-pub__grid { grid-template-columns:1fr; }
  .home-faq__layout { grid-template-columns:1fr; gap:40px; }
  .home-equipe__grid { grid-template-columns:repeat(3,1fr); }
}
@media (max-width:560px) {
  .home-dores__grid { grid-template-columns:1fr 1fr; }
  .home-equipe__grid { grid-template-columns:1fr 1fr; }
}
`;

const dores = [
  { Icon: VolumeX,    titulo:'O Silêncio',             texto:'Medo de represália, vergonha e dependência tornam o silêncio uma armadilha, não uma escolha.', orb:'rgba(155,143,255,.22)' },
  { Icon: DoorClosed, titulo:'Falta de Acesso',         texto:'Ir a uma delegacia presencialmente é impossível para quem vive sob vigilância constante.', orb:'rgba(255,200,0,.18)' },
  { Icon: Zap,        titulo:'Sem Resposta Rápida',     texto:'Em momentos de crise, ligar ao telefone não é uma opção. É preciso socorro silencioso.', orb:'rgba(255,71,87,.18)' },
  { Icon: HeartCrack, titulo:'Ausência de Acolhimento', texto:'Antes da denúncia, existe a necessidade de ser ouvida — sem julgamento, sem burocracia.', orb:'rgba(46,213,115,.16)' },
];

const solucoes = [
  { Icon: Shield,      titulo:'Celular como ferramenta de defesa',       texto:'Interface discreta que vira proteção silenciosa sem chamar atenção.' },
  { Icon: ShieldCheck, titulo:'Canal 100% anônimo',                      texto:'Nenhuma identificação necessária. Elimina o medo inicial de julgamento.' },
  { Icon: AlertTriangle, titulo:'S.O.S. — um toque, GPS em tempo real',  texto:'Um único toque envia localização para a rede de apoio. Sem falar nada.' },
  { Icon: Users,       titulo:'Acolhimento e encaminhamento integrados',  texto:'Suporte emocional e direcionamento para serviços próximos.' },
];

const FAQ_ITEMS = [
  { tag:'Privacidade', q:'A NIRA é realmente anônima? Meus dados ficam salvos?', a:'Sim. A NIRA foi desenhada com anonimato desde o início. Nenhum dado pessoal como nome, CPF ou telefone é solicitado. As conversas são temporárias e não associadas a qualquer identidade.' },
  { tag:'Segurança',   q:'E se o meu agressor pegar meu celular e ver o site?',  a:'A NIRA possui um botão de saída rápida que fecha o aplicativo instantaneamente. Recomendamos acessar pelo modo de navegação privada (aba anônima) para não deixar histórico.' },
  { tag:'S.O.S.',      q:'Como funciona o botão S.O.S.?',                        a:'Com um único toque, o S.O.S. envia sua localização em tempo real para a equipe NIRA e rede de apoio cadastrada. Não é necessário digitar nada ou falar. Em produção, integra diretamente com agentes da região.' },
  { tag:'Atendimento', q:'Posso conversar com uma pessoa real, ou é só a IA?',   a:'A PsiTech (nossa IA) faz a triagem inicial, mas você pode solicitar conexão com uma atendente humana — psicóloga ou assistente social — que responde no mesmo chat, de forma segura e confidencial.' },
  { tag:'Acesso',      q:'Preciso criar uma conta para usar a plataforma?',      a:'Não! Qualquer pessoa usa a triagem, o chat com a IA e os conteúdos sem criar conta. Cadastros existem apenas para profissionais da equipe interna.' },
  { tag:'Emergência',  q:'O que fazer se estiver em perigo imediato agora?',     a:'Ative o botão S.O.S. dentro da plataforma ou ligue 190 (Polícia) ou 180 (Central da Mulher, 24h). O SAMU pode ser acionado pelo 192.' },
  { tag:'Suporte',     q:'A NIRA atende apenas mulheres?',                       a:'A plataforma tem foco em violência doméstica e de gênero, mas qualquer pessoa em situação de vulnerabilidade pode buscar apoio. Conteúdos e triagem são inclusivos.' },
  { tag:'Projeto',     q:'A NIRA é um projeto escolar ou está em produção?',     a:'É um projeto acadêmico da equipe E.Y.E (Ethical Youth Engineers) do SESI-SENAI — 2026 — com objetivo de evoluir para uma plataforma real de impacto social.' },
];

const equipe = [
  { nome:'Giovanna', papel:'UX / Design',      Icon: Palette },
  { nome:'Samuel',   papel:'Backend / PHP',    Icon: Settings },
  { nome:'Kauã',     papel:'Frontend / React', Icon: Code2 },
  { nome:'Pietro',   papel:'Full Stack',        Icon: Layers },
  { nome:'Lucas',    papel:'QA / Docs',         Icon: ClipboardCheck },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button className="faq-item__btn" onClick={() => setOpen(v => !v)}>
        <span className="faq-item__q">{item.q}</span>
        <span className="faq-item__icon">+</span>
      </button>
      <div className="faq-item__body">
        <div className="faq-item__a">
          <span className="faq-item__tag">{item.tag}</span><br />{item.a}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <style>{css}</style>
      <Navbar />

      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="home-hero__orb1" /><div className="home-hero__orb2" />
        <div className="home-hero__inner">
          <div>
            <div className="home-hero__badge"><span className="home-hero__badge-dot" />GovTech · SocialTech · E.Y.E 2026</div>
            <h1 className="home-hero__title">Núcleo de<br /><span>Identificação</span><br />e Resposta ao Abuso</h1>
            <p className="home-hero__quote">"Mais do que um app — um porto seguro digital."</p>
            <p className="home-hero__desc">Tecnologia para ouvir, acolher e proteger quem mais precisa. Canal anônimo, seguro e disponível de qualquer lugar.</p>
            <div className="home-hero__actions">
              <Link to="/triagem" className="btn btn-primary btn-lg">Iniciar Triagem</Link>
              <Link to="/como-funciona" className="btn btn-outline btn-lg">Como Funciona</Link>
            </div>
            <div className="home-hero__stats">
              <div className="home-hero__stat"><span className="home-hero__stat-num">1/4</span><span className="home-hero__stat-lbl">Casos denunciados</span></div>
              <div className="home-hero__stat"><span className="home-hero__stat-num">4min</span><span className="home-hero__stat-lbl">1 vítima a cada</span></div>
              <div className="home-hero__stat"><span className="home-hero__stat-num">70%</span><span className="home-hero__stat-lbl">Sem registro prévio</span></div>
            </div>
          </div>
          <div className="home-hero__visual">
            <div className="home-hero__ring home-hero__ring1" /><div className="home-hero__ring home-hero__ring2" />
            <div className="home-hero__icon-circle"><Shield /></div>
            <div className="home-hero__fcard home-hero__fcard1">
              <span className="home-hero__fcard-icon"><ShieldCheck /></span>
              <div><p className="home-hero__fcard-title">100% Anônimo</p><p className="home-hero__fcard-sub">Sem identificação</p></div>
            </div>
            <div className="home-hero__fcard home-hero__fcard2">
              <span className="home-hero__fcard-icon home-hero__fcard-icon--sos"><AlertTriangle /></span>
              <div><p className="home-hero__fcard-title">Botão S.O.S.</p><p className="home-hero__fcard-sub">Alerta + GPS</p></div>
            </div>
            <div className="home-hero__fcard home-hero__fcard3">
              <span className="home-hero__fcard-icon"><Users /></span>
              <div><p className="home-hero__fcard-title">Rede de Apoio</p><p className="home-hero__fcard-sub">Psicólogos · ONGs</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DORES ── */}
      <section className="home-dores">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'52px' }}>
            <span className="section-label">Problemática</span>
            <h2 className="section-title">Qual a Dor que nos Move?</h2>
            <p className="section-sub" style={{ margin:'0 auto' }}>Passe o mouse para entender cada barreira que enfrentamos.</p>
          </div>
          <div className="home-dores__grid">
            {dores.map(d => (
              <div className="dore-card" key={d.titulo} style={{ '--orb-color': d.orb }}>
                <div className="dore-card__orb" />
                <div className="dore-card__icon-wrap">
                  <span className="dore-card__icon"><d.Icon /></span>
                </div>
                <p className="dore-card__title">{d.titulo}</p>
                <p className="dore-card__text">{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="home-quote">
        <div className="container">
          <div className="home-quote__box">
            <p className="home-quote__text">"No Brasil, uma mulher é vítima de violência doméstica a cada 4 minutos. Apenas 1 em cada 4 casos é denunciado formalmente. Cerca de 70% das vítimas de feminicídio nunca haviam registrado uma ocorrência."</p>
            <p className="home-quote__src">Fórum Brasileiro de Segurança Pública (2023) · Instituto Avon (2021) · IPEA</p>
          </div>
        </div>
      </section>

      {/* ── SOLUÇÃO ── */}
      <section className="home-sol">
        <div className="container">
          <div className="home-sol__inner">
            <div>
              <span className="section-label">Nossa Solução</span>
              <h2 className="section-title">A Solução que<br />Faz a Diferença</h2>
              <p className="section-sub" style={{ marginBottom:32 }}>Uma plataforma digital que reduz as barreiras para a denúncia, acessível e anônima.</p>
              <div className="home-sol__items">
                {solucoes.map(s => (
                  <div className="home-sol__item" key={s.titulo}>
                    <span className="home-sol__item-icon"><s.Icon /></span>
                    <div><p className="home-sol__item-title">{s.titulo}</p><p className="home-sol__item-text">{s.texto}</p></div>
                  </div>
                ))}
              </div>
              <Link to="/como-funciona" className="btn btn-primary">Ver Demonstração →</Link>
            </div>
            <div className="home-sol__nira">
              <div className="home-sol__nira-icon"><Shield /></div>
              <div className="home-sol__nira-name">NIRA</div>
              <div className="home-sol__nira-full">Núcleo de Identificação<br />e Resposta ao Abuso</div>
              <div className="home-sol__badges"><span className="home-sol__badge">GovTech</span><span className="home-sol__badge">SocialTech</span><span className="home-sol__badge">E.Y.E 2026</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PÚBLICO ── */}
      <section className="home-pub section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'48px' }}>
            <span className="section-label">A Quem é Destinado?</span>
            <h2 className="section-title">Para quem é a NIRA?</h2>
          </div>
          <div className="home-pub__grid">
            <div className="home-pub__card">
              <p className="home-pub__ctitle"><User />Usuários Finais</p>
              <div className="home-pub__list">
                {['Mulheres em situação de violência ou risco','Pessoas em vulnerabilidade social','Quem precisa de ajuda mas teme se expor','Dependentes emocionais ou financeiros'].map(i => (
                  <div className="home-pub__item" key={i}><span className="home-pub__dot" />{i}</div>
                ))}
              </div>
            </div>
            <div className="home-pub__card">
              <p className="home-pub__ctitle"><Users />Gestores e Parceiros</p>
              <div className="home-pub__list">
                {['Psicólogos e assistentes sociais','ONGs e centros de apoio','Autoridades e agentes de segurança','Secretarias municipais de assistência'].map(i => (
                  <div className="home-pub__item" key={i}><span className="home-pub__dot" />{i}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="home-faq">
        <div className="container">
          <div className="home-faq__layout">
            <div>
              <span className="home-faq__side-label">{`// FAQ`}</span>
              <h2 className="home-faq__side-title">Perguntas<br />Frequentes</h2>
              <p className="home-faq__side-sub">Tire suas dúvidas sobre segurança, privacidade e como a NIRA funciona na prática.</p>
              <div className="home-faq__side-cta">
                <Link to="/triagem" className="home-faq__contact">
                  <span className="home-faq__contact-icon home-faq__contact-icon--sos"><AlertTriangle /></span>
                  <div><p className="home-faq__contact-title">Precisa de ajuda agora?</p><p className="home-faq__contact-sub">Acesse a triagem anônima</p></div>
                </Link>
                <Link to="/conteudos" className="home-faq__contact">
                  <span className="home-faq__contact-icon"><BookOpen /></span>
                  <div><p className="home-faq__contact-title">Ver conteúdos informativos</p><p className="home-faq__contact-sub">Artigos e guias das ONGs parceiras</p></div>
                </Link>
                <a href="tel:180" className="home-faq__contact">
                  <span className="home-faq__contact-icon"><Phone /></span>
                  <div><p className="home-faq__contact-title">Ligue 180</p><p className="home-faq__contact-sub">Central da Mulher — 24 horas</p></div>
                </a>
              </div>
            </div>
            <div className="home-faq__list">
              {FAQ_ITEMS.map((item, i) => <FaqItem key={i} item={item} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── EQUIPE ── */}
      <section className="home-equipe section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'48px' }}>
            <span className="section-label">Time</span>
            <h2 className="section-title">Equipe E.Y.E</h2>
            <p className="section-sub" style={{ margin:'0 auto' }}>Ethical Youth Engineers — estudantes do 3º ano do SESI-SENAI.</p>
          </div>
          <div className="home-equipe__grid">
            {equipe.map(m => (
              <div className="equipe-card" key={m.nome}>
                <div className="equipe-card__avatar"><m.Icon /></div>
                <p className="equipe-card__name">{m.nome}</p>
                <p className="equipe-card__role">{m.papel}</p>
                <p className="equipe-card__school">SESI-SENAI · 2026</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
