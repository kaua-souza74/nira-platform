import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const css = `
.cont-hero { padding:88px 0 52px; background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(107,104,152,.25) 0%, transparent 60%), var(--bg-deep); }
.cont-hero__inner { display:grid; grid-template-columns:1fr auto; gap:24px; align-items:flex-end; }
.cont-hero__search { position:relative; width:360px; }
.cont-hero__search-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:rgba(239,238,234,.35); font-style:normal; font-size:1rem; }
.cont-hero__search-input { width:100%; background:rgba(107,104,152,.12); border:1.5px solid rgba(107,104,152,.25); border-radius:12px; padding:12px 16px 12px 42px; font-family:'Anonymous Pro',monospace; font-size:.88rem; color:#F4F6F8; transition:border-color .3s; }
.cont-hero__search-input:focus { outline:none; border-color:rgba(155,143,255,.45); }
.cont-hero__search-input::placeholder { color:rgba(239,238,234,.28); }

/* Filtros */
.cont-filters { padding:0 0 44px; background:var(--bg-deep); }
.cont-filters__tags { display:flex; gap:10px; flex-wrap:wrap; }
.cont-filter-tag { background:rgba(107,104,152,.1); border:1.5px solid rgba(107,104,152,.2); border-radius:100px; padding:7px 18px; font-size:.78rem; color:rgba(239,238,234,.55); cursor:pointer; transition:all .25s; font-family:'Anonymous Pro',monospace; font-weight:700; letter-spacing:.05em; }
.cont-filter-tag:hover { border-color:rgba(155,143,255,.4); color:rgba(239,238,234,.85); }
.cont-filter-tag--active { background:rgba(155,143,255,.14); border-color:#9B8FFF; color:#9B8FFF; }

/* Grid */
.cont-grid-wrap { background:var(--bg-dark); padding:0 0 90px; }
.cont-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
.cont-card { background:var(--bg-card); border:1px solid rgba(107,104,152,.18); border-radius:18px; overflow:hidden; transition:all .32s; backdrop-filter:blur(8px); cursor:pointer; display:flex; flex-direction:column; }
.cont-card:hover { border-color:rgba(155,143,255,.3); transform:translateY(-5px); box-shadow:0 18px 40px rgba(0,0,0,.45); }
.cont-card__img { width:100%; height:160px; background:linear-gradient(135deg, rgba(107,104,152,.3), rgba(45,43,78,.8)); display:flex; align-items:center; justify-content:center; font-size:3.5rem; flex-shrink:0; }
.cont-card__body { padding:22px 20px; flex:1; display:flex; flex-direction:column; }
.cont-card__tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px; }
.cont-card__tag { background:rgba(107,104,152,.18); border-radius:100px; padding:3px 10px; font-size:.64rem; color:rgba(239,238,234,.55); letter-spacing:.07em; text-transform:uppercase; }
.cont-card__tag--destaque { background:rgba(155,143,255,.16); color:#9B8FFF; }
.cont-card__title { font-weight:700; font-size:1rem; color:#F4F6F8; margin-bottom:10px; line-height:1.4; }
.cont-card__desc { font-size:.875rem; color:rgba(239,238,234,.58); line-height:1.7; flex:1; margin-bottom:16px; }
.cont-card__footer { display:flex; align-items:center; justify-content:space-between; padding-top:14px; border-top:1px solid rgba(107,104,152,.14); }
.cont-card__ong { font-size:.72rem; color:rgba(239,238,234,.38); }
.cont-card__ong span { color:#9B8FFF; }
.cont-card__data { font-size:.68rem; color:rgba(239,238,234,.28); }

/* Modal */
.cont-modal-bg { position:fixed; inset:0; background:rgba(0,0,0,.75); z-index:2000; display:flex; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(6px); animation:fadeIn .2s ease; }
.cont-modal { background:var(--bg-dark); border:1px solid rgba(107,104,152,.25); border-radius:22px; max-width:720px; width:100%; max-height:85vh; overflow-y:auto; animation:fadeInUp .25s ease; }
.cont-modal__header { padding:28px 28px 0; display:flex; justify-content:space-between; align-items:flex-start; gap:16px; }
.cont-modal__close { background:rgba(107,104,152,.15); border:none; width:36px; height:36px; border-radius:50%; cursor:pointer; color:rgba(239,238,234,.6); font-size:1.1rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all .25s; }
.cont-modal__close:hover { background:rgba(107,104,152,.3); color:#F4F6F8; }
.cont-modal__body { padding:20px 28px 28px; }
.cont-modal__content { font-size:.93rem; color:rgba(239,238,234,.7); line-height:1.82; margin-bottom:20px; }
.cont-modal__content p { margin-bottom:14px; }

/* Vazio */
.cont-empty { text-align:center; padding:80px 0; color:rgba(239,238,234,.35); }
.cont-empty-icon { font-size:3rem; margin-bottom:14px; display:block; }

@media (max-width:900px) { .cont-grid { grid-template-columns:1fr 1fr; } .cont-hero__inner { grid-template-columns:1fr; } .cont-hero__search { width:100%; } }
@media (max-width:580px) { .cont-grid { grid-template-columns:1fr; } }
`;

const CONTEUDOS = [
  {
    id:1, emoji:'⚖️', titulo:'Seus Direitos: Lei Maria da Penha', tag:'Direitos', destaque:true,
    desc:'Entenda como a Lei Maria da Penha protege mulheres em situação de violência doméstica e quais medidas protetivas você pode solicitar.',
    ong:'ONG Vida Nova', data:'05/03/2026',
    conteudo:`<p>A Lei Maria da Penha (Lei nº 11.340/2006) é um dos principais mecanismos de proteção às mulheres vítimas de violência doméstica e familiar no Brasil.</p>
<p><strong>O que ela protege?</strong> A lei cobre violência física, psicológica, sexual, patrimonial e moral praticada por cônjuge, companheiro, familiar ou qualquer pessoa que viva com a vítima.</p>
<p><strong>Medidas protetivas de urgência:</strong> Você pode solicitar que o agressor seja afastado do lar, proibido de se aproximar e impedido de contatar a vítima ou seus familiares.</p>
<p><strong>Como solicitar?</strong> Dirija-se a qualquer Delegacia de Polícia (de preferência uma Delegacia da Mulher) ou acesse o NIRA para ser encaminhada ao serviço mais próximo.</p>
<p>Lembre-se: você não precisa estar machucada fisicamente para solicitar proteção. Ameaças e violência psicológica também são previstas na lei.</p>`,
  },
  {
    id:2, emoji:'💙', titulo:'Saúde Mental: Como Lidar com o Trauma', tag:'Saúde Mental', destaque:false,
    desc:'Entender os sinais de trauma pós-violência é o primeiro passo para buscar ajuda. Você não está sozinha nessa jornada.',
    ong:'Centro de Apoio Renascer', data:'28/02/2026',
    conteudo:`<p>Viver uma situação de violência deixa marcas emocionais que podem se manifestar de diversas formas: pesadelos, ansiedade, dificuldade de confiar em pessoas, sensação de entorpecimento emocional.</p>
<p><strong>Esses sentimentos são normais.</strong> Eles são uma resposta natural do seu sistema nervoso a experiências traumáticas. Não significa que você é fraca — significa que você sobreviveu.</p>
<p><strong>Alguns sinais comuns de trauma:</strong></p>
<p>• Memórias intrusivas ou flashbacks da situação<br/>• Evitar lugares ou situações que lembram o ocorrido<br/>• Dificuldade de dormir ou concentrar<br/>• Sensação de estar sempre em alerta</p>
<p><strong>O que ajuda:</strong> Conversar com um profissional de saúde mental, participar de grupos de apoio, manter rotinas simples e aceitar ajuda de pessoas de confiança.</p>
<p>O NIRA conecta você a psicólogos e assistentes sociais de forma gratuita e anônima. Dê esse primeiro passo.</p>`,
  },
  {
    id:3, emoji:'📱', titulo:'Segurança Digital: Proteja seu Celular', tag:'Segurança', destaque:false,
    desc:'Como proteger suas conversas, apagar histórico rapidamente e usar o celular com segurança quando há monitoramento.',
    ong:'Instituto Digital Seguro', data:'22/02/2026',
    conteudo:`<p>Em muitas situações de violência doméstica, o agressor monitora o celular da vítima. Saber como se proteger digitalmente é tão importante quanto a segurança física.</p>
<p><strong>Dicas de segurança digital:</strong></p>
<p>• Use uma senha diferente no celular e não compartilhe com o agressor<br/>• Ative a opção de apagar o histórico de navegação automaticamente<br/>• Considere criar uma conta de e-mail que só você conhece<br/>• Desative notificações de aplicativos que mostram conteúdo na tela bloqueada</p>
<p><strong>Se precisar sair rapidamente:</strong> O NIRA tem um modo de saída de emergência que fecha o app instantaneamente e limpa o histórico de navegação.</p>
<p><strong>Use o modo anônimo (aba privada):</strong> Acesse o NIRA e outros sites de apoio sempre pelo modo de navegação privada para não deixar rastros no histórico.</p>`,
  },
  {
    id:4, emoji:'🏠', titulo:'Como Sair de Casa com Segurança', tag:'Segurança', destaque:true,
    desc:'Um guia prático para planejar saída segura em situações de risco, incluindo o que levar e para onde ir.',
    ong:'ONG Vida Nova', data:'18/02/2026',
    conteudo:`<p>Sair de uma situação de violência doméstica requer planejamento cuidadoso. Segurança é a prioridade absoluta.</p>
<p><strong>Monte um "kit emergência" e deixe em local seguro:</strong></p>
<p>• Documentos pessoais (RG, CPF, certidão de nascimento dos filhos)<br/>• Dinheiro ou cartão bancário<br/>• Roupas essenciais para você e seus filhos<br/>• Medicamentos necessários<br/>• Contatos importantes anotados em papel</p>
<p><strong>Onde ir:</strong> Centros de Atendimento à Mulher (CRAM), Casas-Abrigo, Delegacia da Mulher ou casa de familiar de confiança. O NIRA pode mapear os locais mais próximos de você.</p>
<p><strong>Planeje o momento:</strong> Prefira sair quando o agressor não está em casa. Avise uma pessoa de confiança que você vai sair.</p>
<p><strong>Liga 180:</strong> A Central de Atendimento à Mulher funciona 24 horas e pode orientar você sobre os próximos passos.</p>`,
  },
  {
    id:5, emoji:'📋', titulo:'Como Fazer um Boletim de Ocorrência', tag:'Direitos', destaque:false,
    desc:'Passo a passo para registrar uma ocorrência policial, mesmo sem marcas físicas visíveis.',
    ong:'Centro de Apoio Renascer', data:'12/02/2026',
    conteudo:`<p>Registrar um Boletim de Ocorrência (BO) é um passo importante para documentar a violência e ter acesso a medidas de proteção.</p>
<p><strong>Onde registrar:</strong> Qualquer delegacia de polícia, de preferência a Delegacia de Atendimento à Mulher (DEAM) da sua cidade. Também é possível registrar online pelo site da Polícia Civil do seu estado.</p>
<p><strong>O que informar:</strong> Relate os fatos da forma mais detalhada possível — data, hora, local, o que aconteceu, quem estava presente. Não precisa ter marcas físicas para registrar.</p>
<p><strong>Violência psicológica também é crime:</strong> Ameaças, xingamentos, humilhações e controle excessivo também devem ser reportados.</p>
<p><strong>Leve consigo:</strong> RG e CPF. Se tiver fotos, prints de mensagens ou qualquer outra evidência, leve também.</p>
<p>Após o BO, você pode solicitar medidas protetivas de urgência pelo juiz, que podem ser concedidas em até 48 horas.</p>`,
  },
  {
    id:6, emoji:'👶', titulo:'Protegendo os Filhos em Situações de Violência', tag:'Família', destaque:false,
    desc:'Como proteger seus filhos durante e após situações de violência doméstica, seus direitos e os deles.',
    ong:'Instituto Família Segura', data:'08/02/2026',
    conteudo:`<p>Quando há filhos envolvidos, a situação torna-se ainda mais complexa. Mas é importante saber: você pode protegê-los.</p>
<p><strong>Guarda de emergência:</strong> Em situações de violência, é possível solicitar na delegacia ou no CRAM a guarda provisória dos filhos, impedindo que o agressor leve as crianças.</p>
<p><strong>Sinais de que os filhos foram afetados:</strong> Mudanças de comportamento, regressão (voltar a comportamentos de fase anterior), medos intensos, queda no rendimento escolar.</p>
<p><strong>Como ajudar seus filhos:</strong> Mantenha uma rotina estável, não fale mal do outro genitor na frente deles, e busque acompanhamento psicológico para as crianças.</p>
<p><strong>Violência assistida é crime:</strong> Crianças que presenciam violência doméstica são consideradas vítimas pela lei e têm direito a proteção e acompanhamento.</p>`,
  },
];

const CATEGORIAS = ['Todos','Direitos','Saúde Mental','Segurança','Família'];

export default function ConteudosPage() {
  const [catAtiva, setCatAtiva] = useState('Todos');
  const [busca, setBusca]       = useState('');
  const [modal, setModal]       = useState(null);

  const filtrados = CONTEUDOS.filter(c => {
    const matchCat = catAtiva === 'Todos' || c.tag === catAtiva;
    const matchBusca = busca === '' || c.titulo.toLowerCase().includes(busca.toLowerCase()) || c.desc.toLowerCase().includes(busca.toLowerCase());
    return matchCat && matchBusca;
  });

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page-wrapper">

        {/* HERO */}
        <section className="cont-hero">
          <div className="container">
            <div className="cont-hero__inner">
              <div>
                <span className="section-label">Conteúdos</span>
                <h1 className="section-title">Informação que<br /><span style={{ color:'#9B8FFF' }}>Protege e Empodera</span></h1>
                <p className="section-sub">Artigos, guias e orientações publicados por ONGs parceiras para apoiar você.</p>
              </div>
              <div className="cont-hero__search">
                <i className="cont-hero__search-icon">🔍</i>
                <input
                  className="cont-hero__search-input"
                  type="text"
                  placeholder="Buscar conteúdo..."
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FILTROS */}
        <section className="cont-filters">
          <div className="container">
            <div className="cont-filters__tags">
              {CATEGORIAS.map(c => (
                <button key={c} className={`cont-filter-tag${catAtiva===c?' cont-filter-tag--active':''}`} onClick={() => setCatAtiva(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="cont-grid-wrap">
          <div className="container">
            {filtrados.length === 0 ? (
              <div className="cont-empty">
                <span className="cont-empty-icon">🔍</span>
                <p>Nenhum conteúdo encontrado para "{busca || catAtiva}".</p>
              </div>
            ) : (
              <div className="cont-grid">
                {filtrados.map(c => (
                  <article className="cont-card" key={c.id} onClick={() => setModal(c)}>
                    <div className="cont-card__img">{c.emoji}</div>
                    <div className="cont-card__body">
                      <div className="cont-card__tags">
                        <span className="cont-card__tag">{c.tag}</span>
                        {c.destaque && <span className="cont-card__tag cont-card__tag--destaque">Destaque</span>}
                      </div>
                      <h2 className="cont-card__title">{c.titulo}</h2>
                      <p className="cont-card__desc">{c.desc}</p>
                      <div className="cont-card__footer">
                        <p className="cont-card__ong">por <span>{c.ong}</span></p>
                        <p className="cont-card__data">{c.data}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>

      {/* MODAL */}
      {modal && (
        <div className="cont-modal-bg" onClick={() => setModal(null)}>
          <div className="cont-modal" onClick={e => e.stopPropagation()}>
            <div className="cont-modal__header">
              <div>
                <div className="cont-card__tags" style={{ marginBottom:10 }}>
                  <span className="cont-card__tag">{modal.tag}</span>
                  {modal.destaque && <span className="cont-card__tag cont-card__tag--destaque">Destaque</span>}
                </div>
                <h2 style={{ fontWeight:700, fontSize:'1.3rem', color:'#F4F6F8', lineHeight:1.3 }}>{modal.titulo}</h2>
                <p style={{ fontSize:'.78rem', color:'rgba(239,238,234,.38)', marginTop:6 }}>por {modal.ong} · {modal.data}</p>
              </div>
              <button className="cont-modal__close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="cont-modal__body">
              <div className="cont-modal__content" dangerouslySetInnerHTML={{ __html: modal.conteudo }} />
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <Link to="/triagem" className="btn btn-primary" onClick={() => setModal(null)}>Preciso de Ajuda →</Link>
                <button className="btn btn-ghost" onClick={() => setModal(null)}>← Voltar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
