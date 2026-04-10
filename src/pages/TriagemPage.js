import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Shield, User, AlertTriangle, MessageSquare, BookOpen, MapPin,
  Lock, Send, RefreshCcw
} from 'lucide-react';

/* ─── CSS ─── */
const css = `
/* Layout geral */
.chat-page {
  min-height: 100vh;
  background: var(--bg-deep);
  display: flex;
  flex-direction: column;
  padding-top: 72px;
}

/* ── WRAPPER SPLIT ── */
.chat-wrap {
  display: grid;
  grid-template-columns: 280px 1fr;
  flex: 1;
  height: calc(100vh - 72px);
  overflow: hidden;
}

/* ════════════════════════════
   SIDEBAR — Histórico
════════════════════════════ */
.chat-sidebar {
  background: rgba(22, 20, 44, 0.92);
  border-right: 1px solid rgba(107,104,152,.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.chat-sidebar__head {
  padding: 20px 18px 14px;
  border-bottom: 1px solid rgba(107,104,152,.13);
  flex-shrink: 0;
}
.chat-sidebar__title {
  font-weight: 700;
  font-size: .82rem;
  color: rgba(239,238,234,.45);
  text-transform: uppercase;
  letter-spacing: .1em;
  font-family: 'Anonymous Pro', monospace;
  margin-bottom: 12px;
}
.chat-sidebar__new {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  background: rgba(155,143,255,.12);
  border: 1.5px dashed rgba(155,143,255,.3);
  border-radius: 12px;
  padding: 10px 14px;
  font-family: 'Poppins', sans-serif;
  font-size: .82rem;
  font-weight: 600;
  color: rgba(155,143,255,.85);
  cursor: pointer;
  transition: all .25s;
  text-align: left;
}
.chat-sidebar__new:hover {
  background: rgba(155,143,255,.2);
  border-color: #9B8FFF;
  color: #C4BCFF;
}

/* Lista de conversas */
.chat-sidebar__list {
  flex: 1;
  overflow-y: auto;
  padding: 10px 10px;
}
.chat-sidebar__list::-webkit-scrollbar { width: 3px; }
.chat-sidebar__list::-webkit-scrollbar-thumb { background: rgba(107,104,152,.3); border-radius: 3px; }

.chat-hist-item {
  padding: 11px 12px;
  border-radius: 11px;
  cursor: pointer;
  transition: all .22s;
  margin-bottom: 3px;
  border: 1px solid transparent;
}
.chat-hist-item:hover { background: rgba(107,104,152,.14); }
.chat-hist-item--active {
  background: rgba(107,104,152,.22);
  border-color: rgba(107,104,152,.28);
}
.chat-hist-item__title {
  font-size: .82rem;
  font-weight: 600;
  color: rgba(239,238,234,.78);
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.chat-hist-item__sub {
  font-size: .7rem;
  color: rgba(239,238,234,.35);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.chat-hist-item__date {
  font-size: .62rem;
  color: rgba(239,238,234,.25);
  margin-top: 4px;
  font-family: 'Anonymous Pro', monospace;
}

/* Aviso anonimato */
.chat-sidebar__anon {
  padding: 14px 16px;
  border-top: 1px solid rgba(107,104,152,.12);
  display: flex;
  align-items: flex-start;
  gap: 9px;
  flex-shrink: 0;
}
.chat-sidebar__anon-icon { display:flex; align-items:center; flex-shrink: 0; margin-top: 1px; }
.chat-sidebar__anon-icon svg { width:14px; height:14px; stroke:rgba(155,143,255,.5); fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
.chat-sidebar__anon-text { font-size: .72rem; color: rgba(239,238,234,.35); line-height: 1.55; }

/* ════════════════════════════
   CHAT PRINCIPAL
════════════════════════════ */
.chat-main {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

/* Header do chat */
.chat-header {
  padding: 16px 24px;
  border-bottom: 1px solid rgba(107,104,152,.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-shrink: 0;
  background: rgba(18,17,31,.6);
  backdrop-filter: blur(10px);
}
.chat-header__info { display: flex; align-items: center; gap: 12px; }
.chat-header__avatar {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6B6898, #9B8FFF);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 14px rgba(155,143,255,.35);
}
.chat-header__avatar svg { width:20px; height:20px; stroke:#fff; fill:none; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
.chat-header__name {
  font-weight: 700;
  font-size: .95rem;
  color: #F4F6F8;
  margin-bottom: 2px;
}
.chat-header__status {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: .7rem;
  color: #2ED573;
  font-family: 'Anonymous Pro', monospace;
}
.chat-header__status-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #2ED573;
  animation: sosPulse 2s ease-in-out infinite;
}
.chat-header__actions { display: flex; gap: 8px; }
.chat-header__btn {
  background: rgba(107,104,152,.14);
  border: 1px solid rgba(107,104,152,.22);
  border-radius: 10px;
  padding: 7px 14px;
  font-family: 'Poppins', sans-serif;
  font-size: .75rem;
  font-weight: 600;
  color: rgba(239,238,234,.6);
  cursor: pointer;
  transition: all .22s;
  display: flex; align-items: center; gap: 6px;
  text-decoration: none;
}
.chat-header__btn:hover { border-color: rgba(155,143,255,.4); color: #F4F6F8; background: rgba(107,104,152,.22); }
.chat-header__btn--danger { color: rgba(255,71,87,.7); border-color: rgba(255,71,87,.22); }
.chat-header__btn--danger:hover { background: rgba(255,71,87,.1); border-color: #FF4757; color: #FF4757; }

/* ── ÁREA DE MENSAGENS ── */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  scroll-behavior: smooth;
}
.chat-messages::-webkit-scrollbar { width: 3px; }
.chat-messages::-webkit-scrollbar-thumb { background: rgba(107,104,152,.25); border-radius: 3px; }

/* Data separadora */
.chat-date-sep {
  text-align: center;
  font-size: .68rem;
  color: rgba(239,238,234,.28);
  font-family: 'Anonymous Pro', monospace;
  letter-spacing: .08em;
  padding: 6px 0;
  position: relative;
}
.chat-date-sep::before, .chat-date-sep::after {
  content: '';
  position: absolute;
  top: 50%; width: calc(50% - 60px);
  height: 1px;
  background: rgba(107,104,152,.15);
}
.chat-date-sep::before { left: 0; }
.chat-date-sep::after  { right: 0; }

/* MENSAGEM */
.chat-msg {
  display: flex;
  gap: 10px;
  max-width: 78%;
  animation: msgIn .28s cubic-bezier(.34,1.2,.64,1) both;
}
.chat-msg--ia   { align-self: flex-start; }
.chat-msg--user { align-self: flex-end; flex-direction: row-reverse; }

/* Avatar da IA */
.chat-msg__avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4A4870, #9B8FFF);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}
.chat-msg__avatar svg { width:16px; height:16px; stroke:#fff; fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
.chat-msg--user .chat-msg__avatar {
  background: linear-gradient(135deg, #2D2B4E, #6B6898);
}

/* Balão */
.chat-msg__bubble {
  padding: 12px 16px;
  border-radius: 18px;
  font-size: .9rem;
  line-height: 1.65;
  font-weight: 400;
}
/* Balão da IA */
.chat-msg--ia .chat-msg__bubble {
  background: rgba(45, 43, 78, 0.75);
  border: 1px solid rgba(107,104,152,.22);
  color: rgba(239,238,234,.9);
  border-top-left-radius: 5px;
  backdrop-filter: blur(8px);
}
/* Balão do usuário */
.chat-msg--user .chat-msg__bubble {
  background: linear-gradient(135deg, rgba(107,104,152,.5), rgba(155,143,255,.2));
  border: 1px solid rgba(155,143,255,.22);
  color: #F4F6F8;
  border-top-right-radius: 5px;
}
.chat-msg__time {
  font-size: .62rem;
  color: rgba(239,238,234,.28);
  margin-top: 5px;
  font-family: 'Anonymous Pro', monospace;
}
.chat-msg--user .chat-msg__time { text-align: right; }

/* Indicador de digitação */
.chat-typing {
  display: flex;
  gap: 10px;
  align-items: center;
  align-self: flex-start;
}
.chat-typing__avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4A4870, #9B8FFF);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.chat-typing__avatar svg { width:16px; height:16px; stroke:#fff; fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
.chat-typing__dots {
  display: flex;
  gap: 5px;
  background: rgba(45,43,78,.75);
  border: 1px solid rgba(107,104,152,.22);
  border-radius: 18px;
  border-top-left-radius: 5px;
  padding: 14px 18px;
  backdrop-filter: blur(8px);
}
.chat-typing__dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: rgba(155,143,255,.7);
  animation: typing 1.2s ease-in-out infinite;
}
.chat-typing__dot:nth-child(2) { animation-delay: .2s; }
.chat-typing__dot:nth-child(3) { animation-delay: .4s; }
@keyframes typing {
  0%,60%,100% { transform:translateY(0);  opacity:.3; }
  30%          { transform:translateY(-6px); opacity:1; }
}

/* Opções de resposta rápida */
.chat-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
  max-width: 500px;
}
.chat-option-btn {
  background: rgba(107,104,152,.12);
  border: 1.5px solid rgba(107,104,152,.28);
  border-radius: 100px;
  padding: 8px 16px;
  font-family: 'Poppins', sans-serif;
  font-size: .8rem;
  font-weight: 500;
  color: rgba(239,238,234,.75);
  cursor: pointer;
  transition: all .22s;
  white-space: nowrap;
}
.chat-option-btn:hover {
  border-color: rgba(155,143,255,.5);
  background: rgba(155,143,255,.12);
  color: #F4F6F8;
  transform: translateY(-1px);
}
.chat-option-btn--selected {
  border-color: #9B8FFF;
  background: rgba(155,143,255,.18);
  color: #C4BCFF;
}

/* Cartão de nível de risco */
.chat-risk-card {
  background: rgba(45,43,78,.7);
  border: 1px solid rgba(107,104,152,.25);
  border-radius: 16px;
  padding: 18px 20px;
  margin-top: 8px;
  backdrop-filter: blur(8px);
  max-width: 400px;
}
.chat-risk-card__label {
  font-size: .68rem;
  color: rgba(239,238,234,.4);
  text-transform: uppercase;
  letter-spacing: .1em;
  font-family: 'Anonymous Pro', monospace;
  margin-bottom: 8px;
}
.chat-risk-card__level {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border-radius: 100px;
  padding: 5px 14px;
  font-size: .75rem;
  font-weight: 700;
  margin-bottom: 12px;
}
.chat-risk-card__level--alto  { background: rgba(255,71,87,.18);  border: 1px solid rgba(255,71,87,.35);  color: #FF4757; }
.chat-risk-card__level--medio { background: rgba(255,200,0,.14);  border: 1px solid rgba(255,200,0,.3);   color: #FFC800; }
.chat-risk-card__level--baixo { background: rgba(46,213,115,.12); border: 1px solid rgba(46,213,115,.28); color: #2ED573; }
.chat-risk-card__actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }

/* SOS FLUTUANTE */
.chat-sos-float {
  position: absolute;
  bottom: 90px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,71,87,.14);
  border: 1.5px solid rgba(255,71,87,.4);
  border-radius: 100px;
  padding: 9px 18px;
  cursor: pointer;
  transition: all .25s;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: .78rem;
  color: #FF4757;
  box-shadow: 0 4px 20px rgba(255,71,87,.2);
  z-index: 10;
  animation: glowPulse 2.5s ease-in-out infinite;
}
.chat-sos-float:hover {
  background: rgba(255,71,87,.25);
  border-color: #FF4757;
  transform: scale(1.04);
}
.chat-sos-float-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #FF4757;
  box-shadow: 0 0 6px #FF4757;
  animation: sosPulse 1.3s ease-in-out infinite;
}

/* ── INPUT AREA ── */
.chat-input-area {
  padding: 16px 20px;
  border-top: 1px solid rgba(107,104,152,.14);
  background: rgba(18,17,31,.7);
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}
.chat-input-wrap {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  background: rgba(45,43,78,.6);
  border: 1.5px solid rgba(107,104,152,.24);
  border-radius: 18px;
  padding: 10px 10px 10px 18px;
  transition: border-color .28s;
}
.chat-input-wrap:focus-within {
  border-color: rgba(155,143,255,.4);
  background: rgba(45,43,78,.75);
}
.chat-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: 'Poppins', sans-serif;
  font-size: .9rem;
  color: #F4F6F8;
  resize: none;
  min-height: 22px;
  max-height: 120px;
  line-height: 1.5;
}
.chat-input::placeholder { color: rgba(239,238,234,.25); }
.chat-send-btn {
  width: 38px; height: 38px;
  border-radius: 12px;
  background: linear-gradient(135deg, #7B6FE8, #9B8FFF);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
  transition: all .22s;
  box-shadow: 0 4px 12px rgba(155,143,255,.3);
}
.chat-send-btn:hover { background: linear-gradient(135deg, #9B8FFF, #B8AEFF); transform: scale(1.06); }
.chat-send-btn:disabled { opacity: .4; cursor: not-allowed; transform: none; }
.chat-input-hint {
  text-align: center;
  font-size: .68rem;
  color: rgba(239,238,234,.22);
  margin-top: 8px;
  font-family: 'Anonymous Pro', monospace;
}

/* ── TELA DE BOAS VINDAS (chat vazio) ── */
.chat-welcome {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  text-align: center;
}
.chat-welcome__owl {
  font-size: 4rem;
  margin-bottom: 18px;
  filter: drop-shadow(0 0 24px rgba(155,143,255,.45));
  animation: float 4s ease-in-out infinite;
  display: block;
}
.chat-welcome__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #F4F6F8;
  margin-bottom: 10px;
}
.chat-welcome__sub {
  font-size: .9rem;
  color: rgba(239,238,234,.5);
  line-height: 1.75;
  max-width: 420px;
  margin-bottom: 28px;
}
.chat-welcome__starts {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.chat-welcome__start {
  background: rgba(107,104,152,.14);
  border: 1.5px solid rgba(107,104,152,.26);
  border-radius: 14px;
  padding: 14px 18px;
  cursor: pointer;
  transition: all .25s;
  text-align: left;
  max-width: 200px;
}
.chat-welcome__start:hover {
  border-color: rgba(155,143,255,.4);
  background: rgba(155,143,255,.1);
  transform: translateY(-2px);
}
.chat-welcome__start-icon { display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:10px; background:rgba(107,104,152,.18); margin-bottom: 8px; }
.chat-welcome__start-icon svg { width:18px; height:18px; stroke:rgba(155,143,255,.7); fill:none; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
.chat-welcome__start-title { font-size: .85rem; font-weight: 600; color: #F4F6F8; margin-bottom: 4px; }
.chat-welcome__start-desc  { font-size: .75rem; color: rgba(239,238,234,.45); line-height: 1.55; }

/* Responsive */
@media (max-width: 700px) {
  .chat-wrap { grid-template-columns: 1fr; }
  .chat-sidebar { display: none; }
  .chat-sos-float { bottom: 80px; right: 14px; }
}
`;

/* ─── Fluxo de perguntas da IA ─── */
const FLOW = [
  {
    id: 'start',
    msg: 'Olá! Sou a **PsiTech**, a IA de triagem da NIRA.\n\nEste espaço é **100% anônimo e seguro**. Nenhum dado pessoal é coletado.\n\nComo posso te ajudar hoje?',
    options: [
      { text: 'Estou em perigo agora',        next: 'perigo'   },
      { text: 'Preciso conversar',             next: 'conversar' },
      { text: 'Quero entender meus direitos', next: 'direitos' },
      { text: 'Preciso de ajuda próxima',     next: 'servicos' },
    ],
  },
  {
    id: 'perigo',
    msg: '🆘 Entendi. Sua segurança é a prioridade agora.\n\nVocê consegue acionar o botão **S.O.S.** vermelho? Ele envia sua localização silenciosamente para a nossa equipe.\n\nSe puder falar: ligue **190** (Polícia) ou **180** (Central da Mulher).',
    options: [
      { text: '📍 Ativar S.O.S. agora',         next: 'sos_ativo'  },
      { text: '😮‍💨 Estou em local seguro agora', next: 'seguro'     },
    ],
    risco: 'alto',
  },
  {
    id: 'sos_ativo',
    msg: '📍 **S.O.S. ativado.** Nossa equipe foi notificada com sua localização.\n\nFique em local seguro, se possível trancada em um cômodo. Estou aqui com você.\n\nUma atendente humana vai entrar em contato em instantes.',
    options: [
      { text: '✅ Estou aguardando', next: 'aguardando' },
    ],
    risco: 'alto',
  },
  {
    id: 'aguardando',
    msg: '💙 Você está sendo muito corajosa. Não se preocupe — você não está sozinha.\n\nEnquanto aguarda, respira fundo. Nossa equipe está a caminho.',
    options: [],
    final: true,
    risco: 'alto',
  },
  {
    id: 'seguro',
    msg: '😮‍💨 Fico aliviada que você está em local seguro agora.\n\nMe conta um pouco mais sobre a situação. O que está acontecendo?',
    options: [
      { text: '👊 Sofri violência física',       next: 'tipo_fisica'  },
      { text: '🗣️ Violência verbal/psicológica', next: 'tipo_psico'   },
      { text: '😨 Recebi ameaças',               next: 'tipo_ameaca'  },
      { text: '💰 Estou sendo controlada financeiramente', next: 'tipo_fin' },
    ],
    risco: 'medio',
  },
  {
    id: 'conversar',
    msg: '💙 Estou aqui para te ouvir, sem julgamentos.\n\nAntes de continuar, me conta: essa situação está acontecendo com você agora ou foi no passado?',
    options: [
      { text: '🔴 Está acontecendo agora',   next: 'seguro'    },
      { text: '🟡 Aconteceu recentemente',   next: 'recente'   },
      { text: '🟢 Foi no passado, mas ainda me afeta', next: 'passado' },
    ],
  },
  {
    id: 'recente',
    msg: '💙 Obrigada por confiar na NIRA com isso.\n\nO que você está sentindo agora? (pode ser mais de um)',
    options: [
      { text: '😰 Medo e ansiedade',     next: 'emocoes_resp' },
      { text: '😔 Tristeza e solidão',   next: 'emocoes_resp' },
      { text: '😤 Raiva',               next: 'emocoes_resp' },
      { text: '😶 Entorpecimento',       next: 'emocoes_resp' },
    ],
    risco: 'medio',
  },
  {
    id: 'passado',
    msg: '💙 O trauma do passado é tão real quanto o presente. Você foi muito forte em chegar até aqui.\n\nVocê já busca algum tipo de acompanhamento psicológico?',
    options: [
      { text: '✅ Sim, estou em acompanhamento',     next: 'ja_ajuda'  },
      { text: '❌ Não, ainda não',                   next: 'sem_ajuda' },
      { text: '🤔 Tentei, mas não consegui acesso',  next: 'sem_ajuda' },
    ],
    risco: 'baixo',
  },
  {
    id: 'direitos',
    msg: '⚖️ Ótimo! Conhecer seus direitos é o primeiro passo.\n\nSobre qual situação você quer entender melhor?',
    options: [
      { text: '📋 Lei Maria da Penha',       next: 'lei_mp'    },
      { text: '🏠 Medidas protetivas',       next: 'medidas'   },
      { text: '👮 Como fazer um BO',         next: 'bo'        },
      { text: '💼 Guarda dos filhos',        next: 'guarda'    },
    ],
    risco: 'baixo',
  },
  {
    id: 'lei_mp',
    msg: '⚖️ A **Lei Maria da Penha** (Lei 11.340/2006) é uma das mais importantes proteções para mulheres em situação de violência.\n\nEla protege contra violência física, psicológica, sexual, patrimonial e moral — e o agressor pode ser qualquer pessoa com quem você tenha vínculo afetivo ou familiar.\n\nQuer saber mais sobre as medidas protetivas que ela garante?',
    options: [
      { text: '✅ Sim, quero saber mais', next: 'medidas'  },
      { text: '🏥 Quero serviços próximos', next: 'servicos' },
    ],
    risco: 'baixo',
  },
  {
    id: 'medidas',
    msg: '🛡️ As **medidas protetivas de urgência** podem ser solicitadas em qualquer delegacia. O juiz pode concedê-las em até 48 horas.\n\nElas incluem:\n• Afastamento do agressor do lar\n• Proibição de aproximação (distância mínima)\n• Proibição de contato por qualquer meio\n• Suspensão do porte de armas\n\nPara solicitar, você precisa apenas ir a uma delegacia — não precisa de advogado.',
    options: [
      { text: '📍 Ver delegacias próximas', next: 'servicos' },
      { text: '💬 Continuar conversando',   next: 'conversar' },
    ],
    risco: 'baixo',
  },
  {
    id: 'bo',
    msg: '📋 Para fazer um **Boletim de Ocorrência**, você pode:\n\n• Ir a qualquer delegacia (presencialmente)\n• Acessar o site da Polícia Civil do seu estado\n• Ligar 180 para orientação antes de ir\n\nNão precisa ter marcas físicas — ameaças e violência psicológica também são crime. Leve documentos e, se tiver, prints de mensagens.',
    options: [
      { text: '📍 Ver delegacias próximas', next: 'servicos' },
      { text: '⬅️ Voltar',                 next: 'direitos'  },
    ],
    risco: 'baixo',
  },
  {
    id: 'servicos',
    msg: '📍 Posso te ajudar a encontrar serviços de apoio próximos.\n\nQual tipo de serviço você precisa agora?',
    options: [
      { text: '👮 Delegacia da Mulher (DEAM)', next: 'final_servicos' },
      { text: '🏠 Casa-Abrigo',               next: 'final_servicos' },
      { text: '🧠 Psicóloga/Assistente Social', next: 'final_servicos' },
      { text: '🤝 CRAM / Centro de Apoio',    next: 'final_servicos' },
    ],
  },
  {
    id: 'final_servicos',
    msg: '🗺️ Em produção, mostrarei um mapa com os serviços mais próximos de você com base na sua localização.\n\nPor enquanto, alguns contatos nacionais:\n\n• **180** — Central de Atendimento à Mulher (24h)\n• **190** — Polícia\n• **100** — Direitos Humanos\n\nQuer que eu conecte você com uma atendente humana agora?',
    options: [
      { text: '✅ Sim, quero falar com alguém', next: 'conectar_humano' },
      { text: '📋 Quero entender meus direitos', next: 'direitos' },
    ],
    risco: 'medio',
  },
  {
    id: 'conectar_humano',
    msg: '💬 **Conectando você com uma atendente...**\n\nEm breve uma psicóloga ou assistente social da nossa equipe entrará neste chat. O atendimento continua anônimo e seguro.\n\nFique à vontade para continuar me contando o que precisar enquanto aguarda.',
    options: [],
    final: true,
    risco: 'medio',
  },
  {
    id: 'tipo_fisica',
    msg: '💙 Lamento muito que você passou por isso. Você não merecia.\n\nPrimeiro: você está fisicamente segura agora? Precisa de atendimento médico?',
    options: [
      { text: '🏥 Preciso de atendimento médico',    next: 'medico'         },
      { text: '✅ Estou bem fisicamente agora',       next: 'emocoes_resp'   },
    ],
    risco: 'alto',
  },
  {
    id: 'medico',
    msg: '🏥 Por favor, vá ao **SAMU (192)** ou ao pronto-socorro mais próximo.\n\nNo hospital, você pode e deve registrar o que aconteceu — eles têm protocolo para isso e podem acionar o CRAM ou delegacia por você.\n\nVocê quer que eu ative o S.O.S. para a nossa equipe acompanhar você?',
    options: [
      { text: '📍 Ativar S.O.S.', next: 'sos_ativo' },
      { text: '✅ Consigo ir sozinha', next: 'emocoes_resp' },
    ],
    risco: 'alto',
  },
  {
    id: 'tipo_psico',
    msg: '💙 Violência psicológica é tão séria quanto qualquer outra forma de violência — e também é crime.\n\nIsolamento, humilhações, ameaças, controle... tudo isso deixa marcas profundas.\n\nFaz quanto tempo isso está acontecendo?',
    options: [
      { text: '⏰ Aconteceu hoje/esta semana', next: 'recente'      },
      { text: '📅 Há meses ou anos',           next: 'passado'      },
      { text: '🤔 Não tenho certeza',          next: 'emocoes_resp' },
    ],
    risco: 'medio',
  },
  {
    id: 'tipo_ameaca',
    msg: '⚠️ Ameaças são crime — mesmo que o agressor diga que "só estava falando".\n\nGuarde evidências: prints de mensagens, áudios, testemunhas. Isso vai te ajudar se precisar de medida protetiva.\n\nVocê se sente em risco imediato?',
    options: [
      { text: '🔴 Sim, sinto que estou em risco',  next: 'perigo'      },
      { text: '🟡 Não agora, mas me preocupo',     next: 'final_servicos' },
    ],
    risco: 'medio',
  },
  {
    id: 'tipo_fin',
    msg: '💰 Violência financeira e patrimonial também é protegida pela Lei Maria da Penha.\n\nImpedir de trabalhar, tomar dinheiro, controlar gastos por medo — tudo isso é abuso.\n\nVocê tem acesso a alguma renda ou documentos próprios?',
    options: [
      { text: '✅ Tenho acesso',           next: 'final_servicos' },
      { text: '❌ Não tenho / fui impedida', next: 'final_servicos' },
    ],
    risco: 'medio',
  },
  {
    id: 'emocoes_resp',
    msg: '💙 Obrigada por compartilhar isso comigo. O que você sente faz todo sentido.\n\nGostaria de conectar você com uma de nossas psicólogas para um atendimento personalizado?',
    options: [
      { text: '✅ Sim, quero atendimento',         next: 'conectar_humano' },
      { text: '📋 Primeiro quero entender direitos', next: 'direitos'       },
      { text: '🏥 Ver serviços próximos',           next: 'servicos'        },
    ],
    risco: 'medio',
  },
  {
    id: 'ja_ajuda',
    msg: '💙 Fico feliz que você já tem esse suporte. Continuar em acompanhamento é muito importante.\n\nPosso te ajudar com informações sobre direitos, serviços próximos ou simplesmente ser um espaço para você falar. O que prefere?',
    options: [
      { text: '📋 Quero entender meus direitos', next: 'direitos'  },
      { text: '🏥 Ver serviços próximos',        next: 'servicos'  },
      { text: '💬 Só quero conversar',           next: 'emocoes_resp' },
    ],
    risco: 'baixo',
  },
  {
    id: 'sem_ajuda',
    msg: '💙 Você não está sozinha nessa. A NIRA pode conectar você com psicólogas e assistentes sociais de forma gratuita e anônima.\n\nQuer que eu faça essa conexão agora?',
    options: [
      { text: '✅ Sim, quero ajuda profissional', next: 'conectar_humano' },
      { text: '🏥 Ver serviços públicos próximos', next: 'servicos'       },
    ],
    risco: 'medio',
  },
  {
    id: 'guarda',
    msg: 'Em situações de violência doméstica, é possível solicitar **guarda provisória de urgência** na delegacia ou no CRAM.\n\nO juiz pode conceder a guarda e impedir que o agressor leve os filhos em até 48 horas.\n\nVocê quer encontrar um serviço jurídico de apoio próximo?',
    options: [
      { text: 'Ver serviços próximos', next: 'final_servicos' },
      { text: 'Voltar aos direitos',   next: 'direitos'       },
    ],
    risco: 'baixo',
  },
];

const HIST_MOCK = [
  { id: 1, titulo: 'Conversa sobre direitos', preview: 'Perguntei sobre a Lei Maria da Penha...', data: 'Hoje, 10:42' },
  { id: 2, titulo: 'Triagem — busca de apoio', preview: 'Falei sobre a minha situação em casa...', data: 'Ontem' },
  { id: 3, titulo: 'Serviços próximos',        preview: 'Precisava encontrar um CRAM...', data: '08/03' },
];

function formatTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
}

function parseMsg(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');
}

export default function TriagemPage() {
  const [histAtivo, setHistAtivo] = useState(null);
  const [chatAtivo, setChatAtivo] = useState(false);
  const [messages,  setMessages]  = useState([]);
  const [stepAtual, setStepAtual] = useState('start');
  const [digitando, setDigitando] = useState(false);
  const [inputVal,  setInputVal]  = useState('');
  const [fimFluxo,  setFimFluxo]  = useState(false);
  const [riscoAtual,setRiscoAtual]= useState(null);

  const messagesEndRef = useRef(null);

  function scrollBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
  useEffect(() => { scrollBottom(); }, [messages, digitando]);

  function iniciarChat(startMsg) {
    setChatAtivo(true);
    setMessages([]);
    setStepAtual('start');
    setFimFluxo(false);
    setRiscoAtual(null);
    const step = FLOW.find(f => f.id === 'start');
    setTimeout(() => {
      setDigitando(true);
      setTimeout(() => {
        setDigitando(false);
        setMessages([{ role:'ia', text: step.msg, options: step.options, time: formatTime() }]);
      }, 1200);
    }, 300);
  }

  function escolherOpcao(opcao, optText) {
    // Adiciona mensagem do usuário
    const userMsg = { role:'user', text: optText, time: formatTime() };
    setMessages(prev => [...prev, userMsg]);

    const proxStep = FLOW.find(f => f.id === opcao.next);
    if (!proxStep) return;

    if (proxStep.risco) setRiscoAtual(proxStep.risco);
    if (proxStep.final) setFimFluxo(true);

    setDigitando(true);
    setTimeout(() => {
      setDigitando(false);
      const iaMsg = {
        role: 'ia',
        text: proxStep.msg,
        options: proxStep.final ? [] : proxStep.options,
        time: formatTime(),
        risco: proxStep.risco,
        final: proxStep.final,
      };
      setMessages(prev => [...prev, iaMsg]);
      setStepAtual(proxStep.id);
    }, 1000 + Math.random() * 600);
  }

  function enviarTexto() {
    if (!inputVal.trim()) return;
    const userMsg = { role:'user', text: inputVal.trim(), time: formatTime() };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setDigitando(true);
    setTimeout(() => {
      setDigitando(false);
      const resp = {
        role: 'ia',
        text: 'Obrigada por compartilhar isso comigo. Estou aqui para te ouvir. Para que eu possa te ajudar melhor, escolha uma das opções abaixo ou continue me contando:',
        options: [
          { text: '🆘 Estou em perigo',              next: 'perigo'    },
          { text: '💬 Quero falar com alguém agora', next: 'conectar_humano' },
          { text: '📋 Quero entender meus direitos', next: 'direitos'  },
        ],
        time: formatTime(),
      };
      setMessages(prev => [...prev, resp]);
    }, 1200 + Math.random() * 600);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarTexto(); }
  }

  function novoChat() { iniciarChat(); setHistAtivo(null); }
  function abrirHist(id) { setHistAtivo(id); }

  function ativarSOS() {
    alert('🆘 S.O.S. ativado!\n\nEm produção: sua localização seria enviada silenciosamente para a equipe NIRA.\n\nEmergências: 190 (Polícia) · 192 (SAMU) · 180 (Central da Mulher)');
  }

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="chat-page">
        <div className="chat-wrap">

          {/* ── SIDEBAR ── */}
          <aside className="chat-sidebar">
            <div className="chat-sidebar__head">
              <p className="chat-sidebar__title">Conversas</p>
              <button className="chat-sidebar__new" onClick={novoChat}>
                ✦ Nova conversa
              </button>
            </div>

            <div className="chat-sidebar__list">
              {/* Conversa ativa no topo */}
              {chatAtivo && (
                <div className="chat-hist-item chat-hist-item--active">
                  <p className="chat-hist-item__title">Conversa atual</p>
                  <p className="chat-hist-item__sub">{messages.length > 0 ? messages[messages.length-1].text.replace(/<[^>]+>/g,'').slice(0,38)+'...' : 'Iniciando...'}</p>
                  <p className="chat-hist-item__date">Agora</p>
                </div>
              )}
              {/* Histórico mock */}
              {HIST_MOCK.map(h => (
                <div
                  key={h.id}
                  className={`chat-hist-item${histAtivo===h.id?' chat-hist-item--active':''}`}
                  onClick={() => abrirHist(h.id)}
                >
                  <p className="chat-hist-item__title">{h.titulo}</p>
                  <p className="chat-hist-item__sub">{h.preview}</p>
                  <p className="chat-hist-item__date">{h.data}</p>
                </div>
              ))}
            </div>

            <div className="chat-sidebar__anon">
              <span className="chat-sidebar__anon-icon"><Lock /></span>
              <p className="chat-sidebar__anon-text">Todas as conversas são 100% anônimas. Nenhum dado pessoal é armazenado.</p>
            </div>
          </aside>

          {/* ── CHAT PRINCIPAL ── */}
          <div className="chat-main">

            {/* Header */}
            {chatAtivo ? (
              <div className="chat-header">
                <div className="chat-header__info">
                  <div className="chat-header__avatar"><Shield /></div>
                  <div>
                    <p className="chat-header__name">PsiTech — IA NIRA</p>
                    <p className="chat-header__status">
                      <span className="chat-header__status-dot" />
                      Online · Triagem ativa
                      {riscoAtual && <span style={{marginLeft:8, opacity:.7}}>· Risco <strong>{riscoAtual}</strong></span>}
                    </p>
                  </div>
                </div>
                <div className="chat-header__actions">
                  <button className="chat-header__btn chat-header__btn--danger" onClick={ativarSOS}>
                    <AlertTriangle size={13}/> S.O.S.
                  </button>
                  <button className="chat-header__btn" onClick={() => alert('Conectando com atendente humano...')}>
                    <MessageSquare size={13}/> Atendente humana
                  </button>
                  <button className="chat-header__btn" onClick={novoChat}><RefreshCcw size={13}/> Nova conversa</button>
                </div>
              </div>
            ) : (
              <div className="chat-header">
                <div className="chat-header__info">
                  <div className="chat-header__avatar"><Shield /></div>
                  <div>
                    <p className="chat-header__name">PsiTech — IA NIRA</p>
                    <p className="chat-header__status"><span className="chat-header__status-dot" />Disponível</p>
                  </div>
                </div>
                <div className="chat-header__actions">
                  <button className="chat-header__btn chat-header__btn--danger" onClick={ativarSOS}><AlertTriangle size={13}/> S.O.S.</button>
                </div>
              </div>
            )}

            {/* Tela de boas vindas ou mensagens */}
            {!chatAtivo ? (
              <div className="chat-welcome">
                <div className="chat-header__avatar" style={{width:72,height:72,marginBottom:18,alignSelf:'center'}}><Shield /></div>
                <h2 className="chat-welcome__title">Olá. Estou aqui por você.</h2>
                <p className="chat-welcome__sub">
                  Este é um espaço seguro, anônimo e sem julgamentos. Sou a PsiTech, a IA de triagem da NIRA. Escolha como prefere começar:
                </p>
                <div className="chat-welcome__starts">
                  {[
                    { Icon:AlertTriangle, title:'Estou em perigo', desc:'Preciso de ajuda agora' },
                    { Icon:MessageSquare, title:'Quero conversar',  desc:'Preciso ser ouvida'     },
                    { Icon:BookOpen,      title:'Meus direitos',    desc:'Quero me informar'      },
                    { Icon:MapPin,        title:'Buscar apoio',     desc:'Serviços próximos'      },
                  ].map(s => (
                    <div key={s.title} className="chat-welcome__start" onClick={() => {
                      setChatAtivo(true);
                      setMessages([]);
                      setDigitando(true);
                      const step = FLOW.find(f => f.id === 'start');
                      setTimeout(() => {
                        setDigitando(false);
                        setMessages([{ role:'ia', text: step.msg, options: step.options, time: formatTime() }]);
                      }, 900);
                    }}>
                      <div className="chat-welcome__start-icon"><s.Icon /></div>
                      <p className="chat-welcome__start-title">{s.title}</p>
                      <p className="chat-welcome__start-desc">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="chat-messages">
                <div className="chat-date-sep">Hoje</div>

                {messages.map((msg, i) => (
                  <div key={i}>
                    <div className={`chat-msg chat-msg--${msg.role}`}>
                      <div className="chat-msg__avatar">{msg.role === 'ia' ? <Shield /> : <User />}</div>
                      <div>
                        <div
                          className="chat-msg__bubble"
                          dangerouslySetInnerHTML={{ __html: parseMsg(msg.text) }}
                        />
                        <p className="chat-msg__time">{msg.time}</p>

                        {/* Opções de resposta rápida */}
                        {msg.role === 'ia' && msg.options && msg.options.length > 0 && i === messages.length - 1 && !digitando && (
                          <div className="chat-options">
                            {msg.options.map((op, oi) => (
                              <button
                                key={oi}
                                className="chat-option-btn"
                                onClick={() => escolherOpcao(op, op.text)}
                              >
                                {op.text}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Card de resultado final */}
                        {msg.final && msg.risco && (
                          <div className="chat-risk-card" style={{ marginTop: 12 }}>
                            <p className="chat-risk-card__label">Triagem concluída</p>
                            <div className={`chat-risk-card__level chat-risk-card__level--${msg.risco}`}>
                              {msg.risco === 'alto' ? 'Risco Alto' : msg.risco === 'medio' ? 'Risco Médio' : 'Monitoramento'}
                            </div>
                            <p style={{ fontSize:'.82rem', color:'rgba(239,238,234,.6)', lineHeight:1.65 }}>
                              Nossa equipe foi notificada. Uma atendente humana entrará em contato em breve.
                            </p>
                            <div className="chat-risk-card__actions">
                              <button className="btn btn-danger btn-sm" onClick={ativarSOS} style={{display:'flex',alignItems:'center',gap:5}}><AlertTriangle size={13}/> S.O.S.</button>
                              <button className="btn btn-ghost btn-sm" onClick={novoChat} style={{display:'flex',alignItems:'center',gap:5}}><RefreshCcw size={13}/> Nova triagem</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Digitando... */}
                {digitando && (
                  <div className="chat-typing">
                    <div className="chat-typing__avatar"><Shield /></div>
                    <div className="chat-typing__dots">
                      <div className="chat-typing__dot" />
                      <div className="chat-typing__dot" />
                      <div className="chat-typing__dot" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Botão SOS flutuante */}
            {chatAtivo && (
              <button className="chat-sos-float" onClick={ativarSOS}>
                <span className="chat-sos-float-dot" />
                Ativar S.O.S.
              </button>
            )}

            {/* Input */}
            {chatAtivo && (
              <div className="chat-input-area">
                <div className="chat-input-wrap">
                  <textarea
                    className="chat-input"
                    placeholder="Digite uma mensagem ou escolha uma opção acima..."
                    rows={1}
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    className="chat-send-btn"
                    onClick={enviarTexto}
                    disabled={!inputVal.trim() || digitando}
                    title="Enviar"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <p className="chat-input-hint" style={{display:'flex',alignItems:'center',gap:6,justifyContent:'center'}}><Lock size={11}/> Conversa anônima · Enter para enviar · Shift+Enter para nova linha</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
