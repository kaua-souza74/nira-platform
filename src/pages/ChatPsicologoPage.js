import React, { useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import {
  User, Brain, AlertTriangle, MessageSquare, CheckCircle,
  ArrowUpRight, Save, Heart, Map, UserCheck, Send
} from 'lucide-react';

const css = `
.psichat-page {
  min-height: 100vh;
  background: var(--bg-deep);
  padding-top: 72px;
  display: flex;
  flex-direction: column;
}
.psichat-wrap {
  display: grid;
  grid-template-columns: 300px 1fr 270px;
  height: calc(100vh - 72px);
  overflow: hidden;
}

/* ════════════════════════════════
   COLUNA ESQUERDA — Fila de casos
════════════════════════════════ */
.psichat-queue {
  background: rgba(20, 18, 42, 0.92);
  border-right: 1px solid rgba(107,104,152,.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.psichat-queue__head {
  padding: 18px 16px 12px;
  border-bottom: 1px solid rgba(107,104,152,.13);
  flex-shrink: 0;
}
.psichat-queue__title {
  font-weight: 700;
  font-size: .82rem;
  color: rgba(239,238,234,.45);
  text-transform: uppercase;
  letter-spacing: .1em;
  font-family: 'Anonymous Pro', monospace;
  margin-bottom: 10px;
}
.psichat-queue__filters {
  display: flex;
  gap: 6px;
}
.psichat-queue__filter {
  background: none;
  border: 1px solid rgba(107,104,152,.22);
  border-radius: 100px;
  padding: 4px 12px;
  font-family: 'Poppins', sans-serif;
  font-size: .7rem;
  font-weight: 600;
  color: rgba(239,238,234,.45);
  cursor: pointer;
  transition: all .22s;
}
.psichat-queue__filter:hover { border-color: rgba(155,143,255,.4); color: rgba(239,238,234,.85); }
.psichat-queue__filter--active { background: rgba(155,143,255,.14); border-color: #9B8FFF; color: #C4BCFF; }

.psichat-queue__list {
  flex: 1;
  overflow-y: auto;
  padding: 10px 10px;
}
.psichat-queue__list::-webkit-scrollbar { width: 3px; }
.psichat-queue__list::-webkit-scrollbar-thumb { background: rgba(107,104,152,.25); border-radius: 3px; }

/* Card de caso na fila */
.case-card {
  padding: 13px 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: all .22s;
  margin-bottom: 6px;
  border: 1px solid transparent;
  position: relative;
}
.case-card:hover { background: rgba(107,104,152,.14); }
.case-card--active {
  background: rgba(107,104,152,.22);
  border-color: rgba(107,104,152,.28);
}
.case-card--sos { border-left: 3px solid #FF4757; }
.case-card__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; }
.case-card__id {
  font-size: .7rem;
  color: rgba(239,238,234,.35);
  font-family: 'Anonymous Pro', monospace;
}
.case-card__pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 100px;
  padding: 2px 8px;
  font-size: .6rem;
  font-weight: 700;
  letter-spacing: .05em;
}
.case-card__pill--sos    { background: rgba(255,71,87,.18);  color: #FF4757; }
.case-card__pill--chat   { background: rgba(155,143,255,.18); color: #9B8FFF; }
.case-card__pill--pend   { background: rgba(255,200,0,.14);  color: #FFC800; }
.case-card__pill--feito  { background: rgba(107,104,152,.2); color: rgba(239,238,234,.4); }
.case-card__preview {
  font-size: .8rem;
  color: rgba(239,238,234,.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
}
.case-card__meta { display: flex; align-items: center; justify-content: space-between; }
.case-card__time { font-size: .65rem; color: rgba(239,238,234,.28); font-family: 'Anonymous Pro', monospace; }
.case-card__unread {
  width: 17px; height: 17px;
  border-radius: 50%;
  background: #9B8FFF;
  color: #fff;
  font-size: .6rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}

/* ════════════════════════════════
   CENTRO — Chat ativo
════════════════════════════════ */
.psichat-main {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background: var(--bg-deep);
}
.psichat-header {
  padding: 14px 22px;
  border-bottom: 1px solid rgba(107,104,152,.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-shrink: 0;
  background: rgba(18,17,31,.6);
  backdrop-filter: blur(10px);
}
.psichat-header__info { display: flex; align-items: center; gap: 11px; }
.psichat-header__avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2D2B4E, #6B6898);
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}
.psichat-header__name { font-weight: 700; font-size: .92rem; color: #F4F6F8; margin-bottom: 2px; }
.psichat-header__status { display: flex; align-items: center; gap: 5px; font-size: .7rem; color: rgba(239,238,234,.45); }
.psichat-header__actions { display: flex; gap: 7px; }
.psichat-hbtn {
  background: rgba(107,104,152,.14);
  border: 1px solid rgba(107,104,152,.22);
  border-radius: 9px;
  padding: 6px 13px;
  font-family: 'Poppins', sans-serif;
  font-size: .72rem;
  font-weight: 600;
  color: rgba(239,238,234,.6);
  cursor: pointer;
  transition: all .22s;
}
.psichat-hbtn:hover { border-color: rgba(155,143,255,.4); color: #F4F6F8; }
.psichat-hbtn--done { color: #2ED573; border-color: rgba(46,213,115,.25); }
.psichat-hbtn--done:hover { background: rgba(46,213,115,.1); border-color: #2ED573; }

/* Mensagens */
.psichat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  scroll-behavior: smooth;
}
.psichat-messages::-webkit-scrollbar { width: 3px; }
.psichat-messages::-webkit-scrollbar-thumb { background: rgba(107,104,152,.22); border-radius: 3px; }

/* Reutilizando estilos de mensagem */
.psichat-msg { display: flex; gap: 10px; max-width: 78%; animation: msgIn .28s ease both; }
.psichat-msg--user { align-self: flex-start; }
.psichat-msg--prof { align-self: flex-end; flex-direction: row-reverse; }
.psichat-msg__avatar {
  width: 30px; height: 30px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: .9rem; flex-shrink: 0; margin-top: 2px;
}
.psichat-msg--user .psichat-msg__avatar { background: linear-gradient(135deg, #1A1830, #4A4870); }
.psichat-msg--prof .psichat-msg__avatar { background: linear-gradient(135deg, #4A4870, #9B8FFF); }
.psichat-msg__bubble { padding: 11px 15px; border-radius: 16px; font-size: .875rem; line-height: 1.65; }
.psichat-msg--user .psichat-msg__bubble {
  background: rgba(45,43,78,.7);
  border: 1px solid rgba(107,104,152,.2);
  color: rgba(239,238,234,.88);
  border-top-left-radius: 4px;
}
.psichat-msg--prof .psichat-msg__bubble {
  background: linear-gradient(135deg, rgba(107,104,152,.45), rgba(155,143,255,.18));
  border: 1px solid rgba(155,143,255,.2);
  color: #F4F6F8;
  border-top-right-radius: 4px;
}
.psichat-msg__meta { font-size: .62rem; color: rgba(239,238,234,.25); margin-top: 4px; font-family: 'Anonymous Pro', monospace; }
.psichat-msg--prof .psichat-msg__meta { text-align: right; }

/* Tag de sistema */
.psichat-systag {
  text-align: center;
  font-size: .68rem;
  color: rgba(239,238,234,.28);
  font-family: 'Anonymous Pro', monospace;
  padding: 3px 12px;
  background: rgba(107,104,152,.1);
  border-radius: 100px;
  width: fit-content;
  margin: 4px auto;
}

/* Respostas rápidas para o profissional */
.psichat-quick {
  padding: 10px 18px;
  border-top: 1px solid rgba(107,104,152,.12);
  display: flex;
  gap: 7px;
  overflow-x: auto;
  flex-shrink: 0;
}
.psichat-quick::-webkit-scrollbar { height: 0; }
.psichat-quick__btn {
  background: rgba(107,104,152,.12);
  border: 1px solid rgba(107,104,152,.2);
  border-radius: 100px;
  padding: 6px 14px;
  font-family: 'Poppins', sans-serif;
  font-size: .75rem;
  font-weight: 500;
  color: rgba(239,238,234,.6);
  cursor: pointer;
  transition: all .22s;
  white-space: nowrap;
}
.psichat-quick__btn:hover { border-color: rgba(155,143,255,.4); color: #F4F6F8; background: rgba(155,143,255,.1); }

/* Input */
.psichat-input-area {
  padding: 14px 18px;
  border-top: 1px solid rgba(107,104,152,.13);
  background: rgba(18,17,31,.7);
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}
.psichat-input-wrap {
  display: flex;
  align-items: flex-end;
  gap: 9px;
  background: rgba(45,43,78,.55);
  border: 1.5px solid rgba(107,104,152,.22);
  border-radius: 16px;
  padding: 9px 9px 9px 16px;
  transition: border-color .28s;
}
.psichat-input-wrap:focus-within { border-color: rgba(155,143,255,.38); }
.psichat-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: 'Poppins', sans-serif;
  font-size: .875rem;
  color: #F4F6F8;
  resize: none;
  min-height: 22px;
  max-height: 100px;
  line-height: 1.5;
}
.psichat-input::placeholder { color: rgba(239,238,234,.22); }
.psichat-send-btn {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6B6898, #9B8FFF);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: .95rem;
  transition: all .22s;
}
.psichat-send-btn:hover { background: linear-gradient(135deg, #9B8FFF, #B8AEFF); transform: scale(1.07); }
.psichat-send-btn:disabled { opacity: .35; cursor: not-allowed; transform: none; }

/* Tela vazia */
.psichat-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px;
}
.psichat-empty__icon { display:flex; align-items:center; justify-content:center; margin-bottom: 16px; }
.psichat-empty__icon svg { width:56px; height:56px; stroke:rgba(239,238,234,.2); fill:none; stroke-width:1.3; stroke-linecap:round; stroke-linejoin:round; }
.psichat-empty__title { font-weight: 700; font-size: 1.1rem; color: rgba(239,238,234,.5); margin-bottom: 7px; }
.psichat-empty__sub { font-size: .85rem; color: rgba(239,238,234,.3); }

/* ════════════════════════════════
   COLUNA DIREITA — Info do caso
════════════════════════════════ */
.psichat-info {
  background: rgba(22, 20, 44, 0.92);
  border-left: 1px solid rgba(107,104,152,.18);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px 16px;
  gap: 18px;
}
.psichat-info::-webkit-scrollbar { width: 3px; }
.psichat-info__section { }
.psichat-info__sect-title {
  font-size: .65rem;
  color: rgba(239,238,234,.3);
  text-transform: uppercase;
  letter-spacing: .12em;
  font-family: 'Anonymous Pro', monospace;
  margin-bottom: 10px;
}
.psichat-info__card {
  background: rgba(107,104,152,.1);
  border: 1px solid rgba(107,104,152,.18);
  border-radius: 12px;
  padding: 14px;
}
.psichat-info__field { margin-bottom: 10px; }
.psichat-info__field:last-child { margin-bottom: 0; }
.psichat-info__label { font-size: .65rem; color: rgba(239,238,234,.3); letter-spacing:.07em; text-transform:uppercase; font-family:'Anonymous Pro',monospace; margin-bottom:4px; }
.psichat-info__val { font-size: .83rem; color: rgba(239,238,234,.75); font-weight: 500; }

/* Ações do caso */
.psichat-actions { display: flex; flex-direction: column; gap: 7px; }
.psichat-action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(107,104,152,.1);
  border: 1px solid rgba(107,104,152,.18);
  border-radius: 10px;
  font-family: 'Poppins', sans-serif;
  font-size: .8rem;
  font-weight: 600;
  color: rgba(239,238,234,.65);
  cursor: pointer;
  transition: all .22s;
  width: 100%;
  text-align: left;
}
.psichat-action-btn:hover { border-color: rgba(155,143,255,.4); color: #F4F6F8; background: rgba(155,143,255,.1); }
.psichat-action-btn--danger { color: rgba(255,71,87,.7); border-color: rgba(255,71,87,.2); }
.psichat-action-btn--danger:hover { background: rgba(255,71,87,.1); border-color: #FF4757; color: #FF4757; }

/* Notas internas */
.psichat-notes-area {
  width: 100%;
  background: rgba(107,104,152,.1);
  border: 1.5px solid rgba(107,104,152,.2);
  border-radius: 10px;
  padding: 10px 12px;
  font-family: 'Poppins', sans-serif;
  font-size: .8rem;
  color: rgba(239,238,234,.75);
  resize: none;
  min-height: 80px;
  transition: border-color .3s;
}
.psichat-notes-area:focus { outline: none; border-color: rgba(155,143,255,.4); }
.psichat-notes-area::placeholder { color: rgba(239,238,234,.22); }

/* Responsive */
@media (max-width: 1100px) {
  .psichat-wrap { grid-template-columns: 260px 1fr; }
  .psichat-info { display: none; }
}
@media (max-width: 700px) {
  .psichat-wrap { grid-template-columns: 1fr; }
  .psichat-queue { display: none; }
}
`;

function formatTime() {
  const n = new Date();
  return `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`;
}

const CASOS_MOCK = [
  {
    id: '#0041',
    tipo: 'sos',
    preview: 'S.O.S. ativado — Localização recebida',
    hora: '10:52',
    unread: 1,
    risco: 'alto',
    area: 'São José dos Campos, SP',
    msgs: [
      { role:'user', text:'[S.O.S. automático] Localização recebida: -23.1788, -45.8852', time:'10:52', sistema: true },
    ],
  },
  {
    id: '#0040',
    tipo: 'chat',
    preview: 'Sofri agressão ontem à noite...',
    hora: '10:41',
    unread: 3,
    risco: 'medio',
    area: 'São Paulo, SP',
    msgs: [
      { role:'user', text:'Oi, preciso de ajuda. Sofri agressão ontem à noite e não sei o que fazer.', time:'10:41' },
      { role:'user', text:'Tenho medo de ligar para a polícia porque ele é conhecido deles', time:'10:42' },
      { role:'user', text:'Tem outra forma de pedir ajuda?', time:'10:43' },
    ],
  },
  {
    id: '#0039',
    tipo: 'chat',
    preview: 'Conversa encerrada',
    hora: '09:18',
    unread: 0,
    risco: 'baixo',
    area: 'Campinas, SP',
    msgs: [
      { role:'user', text:'Quero saber sobre medidas protetivas.', time:'09:18' },
      { role:'prof', text:'Olá! Posso te ajudar. As medidas protetivas de urgência podem ser solicitadas em qualquer delegacia.', time:'09:19' },
      { role:'user', text:'Obrigada, fui lá e consegui!', time:'09:45' },
      { role:'prof', text:'Que ótima notícia! Estamos sempre aqui se precisar. Cuide-se.', time:'09:46' },
    ],
    encerrado: true,
  },
];

const RESPOSTAS_RAPIDAS = [
  'Olá! Estou aqui para te ajudar. Pode me contar mais sobre o que está acontecendo?',
  'Entendo. Você está em local seguro agora?',
  'Obrigada por confiar em nós. Vou te ajudar passo a passo.',
  'Para solicitar medidas protetivas, você pode ir a qualquer delegacia.',
  'Ligue 180 — a Central de Atendimento à Mulher funciona 24h.',
  'Você não está sozinha. Estamos aqui.',
];

export default function ChatPsicologoPage() {
  const { user, getVinculoLabel } = useAuth();
  const [casoAtivo, setCasoAtivo] = useState(null);
  const [casos, setCasos]         = useState(CASOS_MOCK);
  const [filtro, setFiltro]       = useState('todos');
  const [inputVal, setInputVal]   = useState('');
  const [notas, setNotas]         = useState('');
  const messagesEndRef = useRef(null);

  if (!user) return <Navigate to="/login" replace />;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [casoAtivo, casos]);

  const casosFiltrados = casos.filter(c => {
    if (filtro === 'sos')    return c.tipo === 'sos';
    if (filtro === 'ativos') return !c.encerrado;
    if (filtro === 'feitos') return c.encerrado;
    return true;
  });

  function enviarMsg() {
    if (!inputVal.trim() || !casoAtivo) return;
    const msg = { role:'prof', text: inputVal.trim(), time: formatTime() };
    setCasos(cs => cs.map(c =>
      c.id === casoAtivo.id
        ? { ...c, msgs: [...c.msgs, msg], unread: 0 }
        : c
    ));
    setCasoAtivo(prev => ({ ...prev, msgs: [...prev.msgs, msg] }));
    setInputVal('');
  }

  function usarResposta(r) { setInputVal(r); }

  function encerrar() {
    if (!casoAtivo) return;
    const msg = { role:'sistema', text: `[Atendimento encerrado por ${user.nome} às ${formatTime()}]` };
    setCasos(cs => cs.map(c => c.id === casoAtivo.id ? { ...c, encerrado: true, msgs:[...c.msgs, msg] } : c));
    setCasoAtivo(prev => ({ ...prev, encerrado: true, msgs:[...prev.msgs, msg] }));
    alert('Atendimento encerrado e registrado no sistema.');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarMsg(); }
  }

  function abrirCaso(caso) {
    setCasos(cs => cs.map(c => c.id === caso.id ? { ...c, unread: 0 } : c));
    setCasoAtivo({ ...caso, unread: 0 });
    setNotas('');
  }

  const casoInfoView = casoAtivo || {};

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="psichat-page">
        {/* ── Banner de vínculo ── */}
        <div style={{
          background:'rgba(107,104,152,.1)', borderBottom:'1px solid rgba(107,104,152,.15)',
          padding:'8px 20px', display:'flex', alignItems:'center', justifyContent:'space-between',
          gap:12, flexWrap:'wrap',
        }}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{display:'flex',alignItems:'center',justifyContent:'center',width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,rgba(107,104,152,.3),rgba(155,143,255,.2))'}}>
              {user.especialidade === 'psicologo' ? <Brain size={15} style={{stroke:'#C4BCFF'}} /> : user.especialidade === 'assistente_social' ? <UserCheck size={15} style={{stroke:'#C4BCFF'}} /> : <User size={15} style={{stroke:'#C4BCFF'}} />}
            </span>
            <div>
              <span style={{fontWeight:700,fontSize:'.85rem',color:'#F4F6F8'}}>{user.nome}</span>
              <span style={{margin:'0 8px',color:'rgba(107,104,152,.4)'}}>·</span>
              <span style={{fontSize:'.78rem',color:'rgba(239,238,234,.5)'}}>
                {user.especialidade?.replace('_',' ')}
              </span>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:7}}>
            <span style={{fontSize:'.72rem',color:'rgba(239,238,234,.38)'}}>Vínculo:</span>
            <span style={{
              background:'rgba(107,104,152,.15)', border:'1px solid rgba(107,104,152,.25)',
              borderRadius:100, padding:'3px 12px', fontSize:'.75rem', fontWeight:600,
              color:'rgba(239,238,234,.75)',
            }}>
              {getVinculoLabel(user.vinculo, user.ongId)}
            </span>
          </div>
        </div>

        <div className="psichat-wrap">

          {/* ── FILA ── */}
          <aside className="psichat-queue">
            <div className="psichat-queue__head">
              <p className="psichat-queue__title">Atendimentos</p>
              <div className="psichat-queue__filters">
                {[
                  { key:'todos',  label:'Todos'  },
                  { key:'sos',    label:'SOS'    },
                  { key:'ativos', label:'Ativos' },
                  { key:'feitos', label:'Feitos' },
                ].map(f => (
                  <button
                    key={f.key}
                    className={`psichat-queue__filter${filtro===f.key?' psichat-queue__filter--active':''}`}
                    onClick={() => setFiltro(f.key)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="psichat-queue__list">
              {casosFiltrados.map(c => (
                <div
                  key={c.id}
                  className={`case-card${c.tipo==='sos'?' case-card--sos':''}${casoAtivo?.id===c.id?' case-card--active':''}`}
                  onClick={() => abrirCaso(c)}
                >
                  <div className="case-card__top">
                    <span className="case-card__id">{c.id}</span>
                    <span className={`case-card__pill case-card__pill--${c.encerrado?'feito':c.tipo}`}>
                      {c.encerrado ? <><CheckCircle size={9}/> Feito</> : c.tipo === 'sos' ? <><AlertTriangle size={9}/> SOS</> : <><MessageSquare size={9}/> Chat</>}
                    </span>
                  </div>
                  <p className="case-card__preview">{c.preview}</p>
                  <div className="case-card__meta">
                    <span className="case-card__time">{c.hora}</span>
                    {c.unread > 0 && <span className="case-card__unread">{c.unread}</span>}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* ── CHAT ── */}
          <div className="psichat-main">
            {casoAtivo ? (
              <>
                <div className="psichat-header">
                  <div className="psichat-header__info">
                    <div className="psichat-header__avatar" style={{display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#2D2B4E,#4A4870)'}}>
                    <User size={16} style={{stroke:'#C4BCFF'}} />
                  </div>
                    <div>
                      <p className="psichat-header__name">Usuária anônima · {casoAtivo.id}</p>
                      <p className="psichat-header__status">
                        <span className={`adm-pill adm-pill--${casoAtivo.encerrado?'done':casoAtivo.tipo==='sos'?'sos':'chat'}`} style={{fontSize:'.62rem'}}>
                          {casoAtivo.encerrado ? <><CheckCircle size={9}/> Encerrado</> : casoAtivo.tipo==='sos' ? <><AlertTriangle size={9}/> SOS</> : <><MessageSquare size={9}/> Chat ativo</>}
                        </span>
                        <span style={{marginLeft:8,opacity:.5}}>Risco: {casoAtivo.risco}</span>
                      </p>
                    </div>
                  </div>
                  <div className="psichat-header__actions">
                    {!casoAtivo.encerrado && (
                      <>
                        <button className="psichat-hbtn" onClick={() => alert('Encaminhando para serviço...')} style={{display:'flex',alignItems:'center',gap:5}}><ArrowUpRight size={13}/> Encaminhar</button>
                        <button className="psichat-hbtn psichat-hbtn--done" onClick={encerrar} style={{display:'flex',alignItems:'center',gap:5}}><CheckCircle size={13}/> Encerrar</button>
                      </>
                    )}
                  </div>
                </div>

                {/* Respostas rápidas */}
                {!casoAtivo.encerrado && (
                  <div className="psichat-quick">
                    <span style={{ fontSize:'.65rem', color:'rgba(239,238,234,.3)', whiteSpace:'nowrap', alignSelf:'center', fontFamily:"'Anonymous Pro',monospace" }}>Rápidas:</span>
                    {RESPOSTAS_RAPIDAS.map((r, i) => (
                      <button key={i} className="psichat-quick__btn" onClick={() => usarResposta(r)}>
                        {r.length > 36 ? r.slice(0,36)+'…' : r}
                      </button>
                    ))}
                  </div>
                )}

                <div className="psichat-messages">
                  <div className="psichat-systag">Atendimento {casoAtivo.id} · {casoAtivo.area}</div>

                  {casoAtivo.msgs.map((msg, i) => (
                    msg.sistema ? (
                      <div key={i} className="psichat-systag">{msg.text}</div>
                    ) : (
                      <div key={i} className={`psichat-msg psichat-msg--${msg.role}`}>
                        <div className="psichat-msg__avatar">
                        {msg.role==='user'
                          ? <User size={14} style={{stroke:'#C4BCFF'}} />
                          : <Brain size={14} style={{stroke:'#C4BCFF'}} />}
                      </div>
                        <div>
                          <div className="psichat-msg__bubble">{msg.text}</div>
                          <p className="psichat-msg__meta">{msg.role==='user' ? 'Usuária' : user.nome} · {msg.time}</p>
                        </div>
                      </div>
                    )
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {!casoAtivo.encerrado && (
                  <div className="psichat-input-area">
                    <div className="psichat-input-wrap">
                      <textarea
                        className="psichat-input"
                        placeholder="Escreva uma resposta para a usuária..."
                        rows={1}
                        value={inputVal}
                        onChange={e => setInputVal(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                <button className="psichat-send-btn" onClick={enviarMsg} disabled={!inputVal.trim()} style={{display:'flex',alignItems:'center',justifyContent:'center'}}><Send size={15}/></button>
                    </div>
                  </div>
                )}
              </>
            ) : (
                  <div className="psichat-empty">
                <div className="psichat-empty__icon"><MessageSquare /></div>
                <p className="psichat-empty__title">Selecione um atendimento</p>
                <p className="psichat-empty__sub">Escolha um caso na lista à esquerda para começar o atendimento.</p>
              </div>
            )}
          </div>

          {/* ── INFO LATERAL ── */}
          <aside className="psichat-info">
            {casoAtivo ? (
              <>
                <div className="psichat-info__section">
                  <p className="psichat-info__sect-title">Sobre o Caso</p>
                  <div className="psichat-info__card">
                    <div className="psichat-info__field">
                      <p className="psichat-info__label">ID do Caso</p>
                      <p className="psichat-info__val" style={{fontFamily:"'Anonymous Pro',monospace"}}>{casoAtivo.id}</p>
                    </div>
                    <div className="psichat-info__field">
                      <p className="psichat-info__label">Tipo</p>
                      <p className="psichat-info__val">{casoAtivo.tipo === 'sos' ? '🆘 S.O.S. emergência' : '💬 Chat voluntário'}</p>
                    </div>
                    <div className="psichat-info__field">
                      <p className="psichat-info__label">Nível de Risco</p>
                      <p className="psichat-info__val">
                        <span className={`adm-pill adm-pill--${casoAtivo.risco==='alto'?'sos':casoAtivo.risco==='medio'?'pend':'new'}`}>
                          {casoAtivo.risco === 'alto' ? '🔴 Alto' : casoAtivo.risco === 'medio' ? '🟡 Médio' : '🟢 Baixo'}
                        </span>
                      </p>
                    </div>
                    <div className="psichat-info__field">
                      <p className="psichat-info__label">Localização Aprox.</p>
                      <p className="psichat-info__val">{casoAtivo.area}</p>
                    </div>
                    <div className="psichat-info__field">
                      <p className="psichat-info__label">Atendente</p>
                      <p className="psichat-info__val">{user.nome}</p>
                    </div>
                  </div>
                </div>

                <div className="psichat-info__section">
                  <p className="psichat-info__sect-title">Ações Rápidas</p>
                  <div className="psichat-actions">
                    <button className="psichat-action-btn" onClick={() => alert('Encaminhando para delegacia...')} style={{display:'flex',alignItems:'center',gap:8}}>
                      <AlertTriangle size={14}/> Acionar Delegacia
                    </button>
                    <button className="psichat-action-btn" onClick={() => alert('Abrindo mapa de serviços...')} style={{display:'flex',alignItems:'center',gap:8}}>
                      <Map size={14}/> Ver Serviços Próximos
                    </button>
                    <button className="psichat-action-btn" onClick={() => alert('Chamando supervisora...')} style={{display:'flex',alignItems:'center',gap:8}}>
                      <UserCheck size={14}/> Escalar para Supervisora
                    </button>
                    {!casoAtivo.encerrado && (
                      <button className="psichat-action-btn psichat-action-btn--danger" onClick={encerrar}>
                        ✓ Encerrar Atendimento
                      </button>
                    )}
                  </div>
                </div>

                <div className="psichat-info__section">
                  <p className="psichat-info__sect-title">Notas Internas</p>
                  <textarea
                    className="psichat-notes-area"
                    placeholder="Observações sobre o caso (visível apenas para a equipe)..."
                    value={notas}
                    onChange={e => setNotas(e.target.value)}
                  />
                  {notas && (
                    <button className="psichat-action-btn" style={{marginTop:8, display:'flex', alignItems:'center', gap:8}} onClick={() => alert('Notas salvas!')}>
                      <Save size={14}/> Salvar Notas
                    </button>
                  )}
                </div>
              </>
            ) : (
              <p style={{ fontSize:'.8rem', color:'rgba(239,238,234,.25)', textAlign:'center', marginTop:40 }}>
                Selecione um caso para ver informações detalhadas.
              </p>
            )}
          </aside>
        </div>
      </div>
    
    </>
  );
}
