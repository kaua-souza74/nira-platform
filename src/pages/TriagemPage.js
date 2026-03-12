import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const css = `
.triagem-page { background:var(--bg-deep); padding:90px 0 60px; min-height:100vh; }
.triagem-wrap { max-width:660px; margin:0 auto; padding:0 24px; }
.triagem-header { text-align:center; margin-bottom:40px; }
.triagem-title { font-size:2rem; font-weight:700; margin-bottom:10px; }
.triagem-sub { font-size:.93rem; color:rgba(239,238,234,.58); line-height:1.7; }
.triagem-sos-bar {
  background:rgba(255,71,87,.08); border:1.5px solid rgba(255,71,87,.3);
  border-radius:14px; padding:18px 22px;
  display:flex; align-items:center; justify-content:space-between;
  gap:14px; margin-bottom:36px; flex-wrap:wrap;
}
.triagem-sos-label { font-weight:700; font-size:.85rem; color:#FF4757; text-transform:uppercase; letter-spacing:.09em; margin-bottom:3px; }
.triagem-sos-desc { font-size:.8rem; color:rgba(239,238,234,.5); }
.triagem-prog { margin-bottom:32px; }
.triagem-prog-bar { height:3px; background:rgba(107,104,152,.18); border-radius:3px; overflow:hidden; margin-bottom:7px; }
.triagem-prog-fill { height:100%; background:linear-gradient(90deg,#9B8FFF,#6B6898); border-radius:3px; transition:width .5s ease; }
.triagem-prog-info { display:flex; justify-content:space-between; font-size:.7rem; color:rgba(239,238,234,.35); }
.triagem-card { background:var(--bg-card); border:1px solid rgba(107,104,152,.2); border-radius:18px; padding:32px 28px; backdrop-filter:blur(12px); animation:fadeInUp .35s ease; }
.triagem-step-tag { font-size:.68rem; color:#9B8FFF; letter-spacing:.12em; text-transform:uppercase; margin-bottom:8px; }
.triagem-question { font-size:1.15rem; font-weight:700; color:#F4F6F8; margin-bottom:7px; line-height:1.38; }
.triagem-qdesc { font-size:.875rem; color:rgba(239,238,234,.52); margin-bottom:24px; line-height:1.65; }
.triagem-opts { display:flex; flex-direction:column; gap:10px; }
.triagem-opt {
  background:rgba(107,104,152,.08); border:1.5px solid rgba(107,104,152,.2);
  border-radius:11px; padding:13px 16px;
  font-family:'Anonymous Pro',monospace; font-size:.88rem; color:rgba(239,238,234,.8);
  text-align:left; cursor:pointer; transition:all .22s;
  display:flex; align-items:center; gap:11px;
}
.triagem-opt:hover { border-color:rgba(155,143,255,.45); background:rgba(155,143,255,.09); color:#F4F6F8; transform:translateX(3px); }
.triagem-opt--sel { border-color:#9B8FFF; background:rgba(155,143,255,.14); color:#F4F6F8; }
.triagem-opt-icon { font-size:1.15rem; flex-shrink:0; }
.triagem-actions { display:flex; justify-content:space-between; align-items:center; margin-top:22px; gap:10px; }
.triagem-back { background:none; border:none; color:rgba(239,238,234,.38); font-family:'Anonymous Pro',monospace; font-size:.85rem; cursor:pointer; transition:color .25s; padding:6px; }
.triagem-back:hover { color:#F4F6F8; }
.triagem-result { background:var(--bg-card); border:1px solid rgba(107,104,152,.2); border-radius:18px; padding:38px 28px; text-align:center; backdrop-filter:blur(12px); animation:fadeInUp .35s ease; }
.triagem-result-icon { font-size:3.2rem; margin-bottom:18px; display:block; }
.triagem-result-pill { display:inline-block; border-radius:100px; padding:5px 15px; font-size:.72rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; margin-bottom:18px; }
.triagem-result-pill--alto  { background:rgba(255,71,87,.18);  color:#FF4757; border:1px solid rgba(255,71,87,.35); }
.triagem-result-pill--medio { background:rgba(255,200,0,.14);  color:#FFC800; border:1px solid rgba(255,200,0,.3); }
.triagem-result-pill--baixo { background:rgba(46,213,115,.1);  color:#2ED573; border:1px solid rgba(46,213,115,.28); }
.triagem-result-title { font-size:1.4rem; font-weight:700; margin-bottom:10px; color:#F4F6F8; }
.triagem-result-text { font-size:.91rem; color:rgba(239,238,234,.62); line-height:1.78; margin-bottom:28px; max-width:480px; margin-inline:auto; margin-bottom:28px; }
.triagem-result-btns { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
.triagem-anon { display:flex; align-items:center; justify-content:center; gap:7px; margin-top:22px; font-size:.72rem; color:rgba(239,238,234,.3); }
`;

const PERGUNTAS = [
  { pergunta:'Você está em segurança agora?', desc:'Sua resposta é completamente anônima. Nenhum dado de identidade é coletado.',
    opcoes:[{i:'✅',t:'Sim, estou em local seguro'},{i:'⚠️',t:'Não tenho certeza — posso estar em risco'},{i:'🆘',t:'Não, estou em perigo imediato'}] },
  { pergunta:'Que tipo de situação você está vivendo?', desc:'Selecione a opção que melhor descreve sua situação.',
    opcoes:[{i:'👊',t:'Violência física'},{i:'🗣️',t:'Violência verbal ou psicológica'},{i:'💰',t:'Violência financeira'},{i:'📱',t:'Assédio ou perseguição'},{i:'❓',t:'Não sei classificar'}] },
  { pergunta:'Com que frequência isso acontece?', desc:'Isso nos ajuda a entender melhor sua situação.',
    opcoes:[{i:'1️⃣',t:'Foi apenas uma vez'},{i:'🔄',t:'Acontece às vezes'},{i:'📅',t:'Acontece frequentemente'},{i:'🔁',t:'Acontece todos os dias'}] },
  { pergunta:'Você já tentou pedir ajuda antes?', desc:'Qualquer tentativa conta — conversar com alguém, ligar para uma delegacia, etc.',
    opcoes:[{i:'✅',t:'Sim, mas não consegui a ajuda que precisava'},{i:'🤐',t:'Não, tive medo de me expor'},{i:'❌',t:'Não sabia a quem recorrer'},{i:'🆕',t:'Esta é minha primeira vez buscando ajuda'}] },
  { pergunta:'O que você precisa agora?', desc:'Podemos ajudar de diferentes formas.',
    opcoes:[{i:'💬',t:'Conversar — preciso ser ouvida'},{i:'📋',t:'Entender meus direitos'},{i:'🏥',t:'Serviços de apoio próximos'},{i:'🆘',t:'Ajuda de emergência imediata'}] },
];

const RESULTADOS = {
  alto:  { icon:'🆘', pill:'alto',  titulo:'Você precisa de apoio imediato', texto:'Você está em situação de risco. Não está sozinha. Nossa equipe está sendo acionada. Em perigo imediato: ligue 190 (Polícia) ou 180 (Central da Mulher). Se puder, ative o S.O.S. para enviar sua localização.' },
  medio: { icon:'⚠️', pill:'medio', titulo:'Você precisa de apoio — mas não está sozinha', texto:'Identificamos situação de risco moderado. Nossa equipe pode te ajudar agora pelo chat anônimo ou podemos conectar com serviços de apoio próximos.' },
  baixo: { icon:'💙', pill:'baixo', titulo:'Estamos aqui para apoiar você', texto:'Você deu um passo muito importante. A NIRA oferece suporte emocional, conteúdo sobre direitos e encaminhamento para profissionais. Você não precisa enfrentar isso sozinha.' },
};

function calcNivel(respostas) {
  if (respostas[0] === 2) return 'alto';
  if (respostas[0] === 1) return 'medio';
  return 'baixo';
}

export default function TriagemPage() {
  const [step, setStep]     = useState(0);
  const [resps, setResps]   = useState([]);
  const [sel, setSel]       = useState(null);

  const total = PERGUNTAS.length;
  const pct   = step >= 0 ? Math.round((step / total) * 100) : 100;
  const resultado = step === -1 ? RESULTADOS[calcNivel(resps)] : null;

  function avancar() {
    if (sel === null) return;
    const novas = [...resps, sel];
    setResps(novas);
    setSel(null);
    if (step + 1 >= total) setStep(-1);
    else setStep(s => s + 1);
  }

  function voltar() {
    if (step <= 0) return;
    setStep(s => s - 1);
    setResps(r => r.slice(0, -1));
    setSel(null);
  }

  function reiniciar() { setStep(0); setResps([]); setSel(null); }

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="triagem-page">
        <div className="triagem-wrap">
          <div className="triagem-header">
            <div className="badge" style={{ marginBottom:18, marginInline:'auto', width:'fit-content' }}>
              <span className="badge-dot" />Triagem Segura e Anônima
            </div>
            <h1 className="triagem-title">{step === -1 ? 'Resultado da Triagem' : 'Triagem NIRA'}</h1>
            <p className="triagem-sub">{step === -1 ? 'Encaminhamento personalizado com base nas suas respostas.' : 'Nenhuma informação de identidade é coletada.'}</p>
          </div>

          {/* Barra S.O.S. */}
          <div className="triagem-sos-bar">
            <div>
              <p className="triagem-sos-label">🆘 Perigo Imediato?</p>
              <p className="triagem-sos-desc">Envie sua localização em um toque — sem precisar digitar nada.</p>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => alert('S.O.S. ativado!\nEm produção: enviaria geolocalização para a rede de apoio.')}>
              Ativar S.O.S.
            </button>
          </div>

          {/* Progresso */}
          {step >= 0 && (
            <div className="triagem-prog">
              <div className="triagem-prog-bar"><div className="triagem-prog-fill" style={{ width:`${pct}%` }} /></div>
              <div className="triagem-prog-info"><span>Pergunta {step+1} de {total}</span><span>{pct}%</span></div>
            </div>
          )}

          {/* Pergunta */}
          {step >= 0 && (
            <div className="triagem-card">
              <p className="triagem-step-tag">Passo {step+1}</p>
              <h2 className="triagem-question">{PERGUNTAS[step].pergunta}</h2>
              <p className="triagem-qdesc">{PERGUNTAS[step].desc}</p>
              <div className="triagem-opts">
                {PERGUNTAS[step].opcoes.map((op, i) => (
                  <button key={i} className={`triagem-opt${sel===i?' triagem-opt--sel':''}`} onClick={() => setSel(i)}>
                    <span className="triagem-opt-icon">{op.i}</span>{op.t}
                  </button>
                ))}
              </div>
              <div className="triagem-actions">
                <button className="triagem-back" onClick={voltar} disabled={step===0}>← Voltar</button>
                <button className="btn btn-primary" onClick={avancar} disabled={sel===null} style={{ opacity:sel===null?.5:1 }}>
                  {step+1===total ? 'Ver Resultado →' : 'Próximo →'}
                </button>
              </div>
            </div>
          )}

          {/* Resultado */}
          {step === -1 && resultado && (
            <div className="triagem-result">
              <span className="triagem-result-icon">{resultado.icon}</span>
              <span className={`triagem-result-pill triagem-result-pill--${resultado.pill}`}>
                Nível {resultado.pill === 'alto' ? 'Alto' : resultado.pill === 'medio' ? 'Médio' : 'Monitoramento'}
              </span>
              <h2 className="triagem-result-title">{resultado.titulo}</h2>
              <p className="triagem-result-text">{resultado.texto}</p>
              <div className="triagem-result-btns">
                <button className="btn btn-danger" onClick={() => alert('S.O.S. — Em produção: acionaria ajuda com GPS.')}>🆘 Ativar S.O.S.</button>
                <button className="btn btn-outline" onClick={() => alert('Chat anônimo — conectando com atendente...')}>💬 Falar com Atendente</button>
                <button className="btn-ghost btn" onClick={reiniciar}>↩ Refazer</button>
              </div>
              <div className="triagem-anon">🔒 Nenhum dado de identidade foi coletado</div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
