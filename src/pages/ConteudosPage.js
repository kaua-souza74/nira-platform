import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Search, BookOpen, Shield, Heart, Home, Lock, FileText,
  AlertTriangle, Pencil, Users, Baby, X
} from 'lucide-react';

const css = `
/* ══════════════ BLOG HERO ══════════════ */
.blog-hero {
  padding: 96px 0 64px;
  background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(107,104,152,.22) 0%, transparent 60%),
              var(--bg-deep);
}
.blog-hero__inner {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: flex-end;
  gap: 24px;
}
.blog-hero__search-wrap { position: relative; width: 320px; }
.blog-hero__search-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  display: flex; align-items: center;
  pointer-events: none;
}
.blog-hero__search-icon svg { width:16px; height:16px; stroke:rgba(239,238,234,.3); fill:none; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
.blog-hero__search {
  width: 100%;
  background: rgba(107,104,152,.1);
  border: 1.5px solid rgba(107,104,152,.22);
  border-radius: 100px;
  padding: 11px 18px 11px 40px;
  font-family: 'Poppins', sans-serif;
  font-size: .85rem;
  color: #F4F6F8;
  transition: border-color .3s;
}
.blog-hero__search:focus { outline: none; border-color: rgba(155,143,255,.4); }
.blog-hero__search::placeholder { color: rgba(239,238,234,.25); }

/* ══════════════ DESTAQUE (featured) ══════════════ */
.blog-featured { padding: 0 0 64px; background: var(--bg-deep); }
.blog-featured__card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  background: var(--bg-card);
  border: 1px solid rgba(107,104,152,.18);
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all .35s;
  backdrop-filter: blur(8px);
}
.blog-featured__card:hover {
  border-color: rgba(155,143,255,.32);
  box-shadow: 0 24px 60px rgba(0,0,0,.45);
  transform: translateY(-4px);
}
.blog-featured__img {
  width: 100%; height: 360px;
  background: linear-gradient(135deg, rgba(45,43,78,.9), rgba(107,104,152,.5));
  display: flex; align-items: center; justify-content: center;
  position: relative;
  overflow: hidden;
}
.blog-featured__img-icon { position:relative; z-index:1; }
.blog-featured__img-icon svg { width:80px; height:80px; fill:none; stroke-width:1.2; stroke-linecap:round; stroke-linejoin:round; opacity:.7; filter:drop-shadow(0 4px 24px rgba(0,0,0,.5)); }
.blog-featured__img::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent 60%, rgba(26,24,48,.6));
}
.blog-featured__body {
  padding: 48px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.blog-featured__eyebrow {
  display: flex; gap: 8px; align-items: center;
  margin-bottom: 18px;
}
.blog-tag {
  display: inline-block;
  border-radius: 100px;
  padding: 4px 12px;
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  white-space: nowrap;
}
.blog-tag--destaque { background: rgba(155,143,255,.18); border: 1px solid rgba(155,143,255,.35); color: #9B8FFF; }
.blog-tag--direitos  { background: rgba(46,213,115,.12);  border: 1px solid rgba(46,213,115,.28); color: #2ED573; }
.blog-tag--saude     { background: rgba(255,200,0,.12);   border: 1px solid rgba(255,200,0,.28);  color: #FFC800; }
.blog-tag--seguranca { background: rgba(255,71,87,.12);   border: 1px solid rgba(255,71,87,.25);  color: #FF4757; }
.blog-tag--familia   { background: rgba(107,104,152,.18); border: 1px solid rgba(107,104,152,.3); color: #8B88B8; }
.blog-featured__title {
  font-size: 1.75rem; font-weight: 800; color: #F4F6F8;
  line-height: 1.22; margin-bottom: 14px; letter-spacing: -.02em;
}
.blog-featured__desc {
  font-size: .95rem; color: rgba(239,238,234,.58);
  line-height: 1.75; margin-bottom: 28px; font-weight: 400;
}
.blog-featured__meta {
  display: flex; align-items: center; gap: 14px;
  font-size: .75rem; color: rgba(239,238,234,.35);
  margin-bottom: 28px;
}
.blog-featured__meta-sep { color: rgba(239,238,234,.15); }
.blog-featured__read {
  display: inline-flex; align-items: center; gap: 7px;
  font-weight: 700; font-size: .85rem; color: #9B8FFF;
  transition: gap .22s;
}
.blog-featured__read:hover { gap: 11px; }
.blog-featured__read span { font-size: 1rem; }

/* ══════════════ FILTROS ══════════════ */
.blog-filters { padding: 0 0 40px; background: var(--bg-deep); }
.blog-filters__wrap { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.blog-filter {
  background: none;
  border: 1.5px solid rgba(107,104,152,.2);
  border-radius: 100px;
  padding: 7px 18px;
  font-family: 'Poppins', sans-serif;
  font-size: .78rem; font-weight: 600;
  color: rgba(239,238,234,.5);
  cursor: pointer; transition: all .22s;
}
.blog-filter:hover { border-color: rgba(155,143,255,.4); color: rgba(239,238,234,.85); }
.blog-filter--active { background: rgba(155,143,255,.14); border-color: #9B8FFF; color: #C4BCFF; }
.blog-filter--count {
  margin-left: auto;
  background: none; border: none;
  font-size: .75rem;
  color: rgba(239,238,234,.28);
  font-family: 'Anonymous Pro', monospace;
  cursor: default;
}

/* ══════════════ GRID BLOG ══════════════ */
.blog-grid-section { padding: 0 0 100px; background: var(--bg-dark); }
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

/* Card blog */
.blog-card {
  background: rgba(30,28,56,.7);
  border: 1px solid rgba(107,104,152,.16);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all .32s;
  backdrop-filter: blur(8px);
  display: flex; flex-direction: column;
}
.blog-card:hover {
  border-color: rgba(155,143,255,.28);
  transform: translateY(-5px);
  box-shadow: 0 20px 44px rgba(0,0,0,.45);
}
.blog-card:hover .blog-card__arrow { transform: translateX(4px); }
.blog-card__thumb {
  width: 100%; height: 170px;
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
  flex-shrink: 0;
}
.blog-card__thumb-icon { position: relative; z-index: 1; display:flex; align-items:center; justify-content:center; }
.blog-card__thumb-icon svg { width:52px; height:52px; fill:none; stroke-width:1.3; stroke-linecap:round; stroke-linejoin:round; opacity:.75; filter:drop-shadow(0 4px 12px rgba(0,0,0,.4)); }
/* Gradiente colorido por categoria */
.blog-card__thumb--direitos  { background: linear-gradient(135deg, rgba(15,40,30,.95), rgba(46,213,115,.18)); }
.blog-card__thumb--saude     { background: linear-gradient(135deg, rgba(40,35,10,.95), rgba(255,200,0,.15)); }
.blog-card__thumb--seguranca { background: linear-gradient(135deg, rgba(40,10,12,.95), rgba(255,71,87,.15)); }
.blog-card__thumb--familia   { background: linear-gradient(135deg, rgba(25,23,50,.95), rgba(107,104,152,.3)); }

.blog-card__body {
  padding: 22px 20px 20px;
  flex: 1; display: flex; flex-direction: column;
}
.blog-card__tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
.blog-card__title {
  font-weight: 700; font-size: .97rem; color: #F4F6F8;
  line-height: 1.42; margin-bottom: 10px;
  flex: 1;
}
.blog-card__desc {
  font-size: .855rem; color: rgba(239,238,234,.52);
  line-height: 1.68; margin-bottom: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blog-card__footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid rgba(107,104,152,.12);
}
.blog-card__by { font-size: .7rem; color: rgba(239,238,234,.35); }
.blog-card__by strong { color: rgba(239,238,234,.6); }
.blog-card__right { display: flex; align-items: center; gap: 10px; }
.blog-card__time { font-size: .65rem; color: rgba(239,238,234,.28); font-family: 'Anonymous Pro', monospace; }
.blog-card__arrow { font-size: .75rem; color: rgba(239,238,234,.3); transition: transform .22s; }

/* ══════════════ ARTIGO (leitura) ══════════════ */
.blog-article-bg {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.8);
  z-index: 2000;
  display: flex; align-items: flex-start; justify-content: center;
  padding: 20px;
  backdrop-filter: blur(8px);
  overflow-y: auto;
  animation: fadeIn .22s ease;
}
.blog-article {
  background: var(--bg-dark);
  border: 1px solid rgba(107,104,152,.22);
  border-radius: 24px;
  max-width: 760px;
  width: 100%;
  margin: 20px auto;
  overflow: hidden;
  animation: fadeInUp .28s ease;
}
.blog-article__hero {
  width: 100%; height: 220px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, rgba(45,43,78,.95), rgba(107,104,152,.4));
  position: relative;
}
.blog-article__hero-icon { display:flex; align-items:center; justify-content:center; }
.blog-article__hero-icon svg { width:80px; height:80px; fill:none; stroke-width:1.2; stroke-linecap:round; stroke-linejoin:round; opacity:.8; filter:drop-shadow(0 4px 20px rgba(0,0,0,.5)); }
.blog-article__close {
  position: absolute; top: 16px; right: 16px;
  width: 38px; height: 38px;
  background: rgba(18,17,31,.8); backdrop-filter: blur(8px);
  border: 1px solid rgba(107,104,152,.28);
  border-radius: 50%;
  cursor: pointer;
  color: rgba(239,238,234,.7);
  display: flex; align-items: center; justify-content: center;
  transition: all .22s;
  z-index: 1;
}
.blog-article__close svg { width:16px; height:16px; stroke:currentColor; fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
.blog-article__close:hover { background: rgba(107,104,152,.3); color: #F4F6F8; }
.blog-article__body { padding: 36px 40px 44px; }
.blog-article__eyebrow { display: flex; gap: 8px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
.blog-article__title { font-size: 1.65rem; font-weight: 800; color: #F4F6F8; line-height: 1.22; margin-bottom: 10px; letter-spacing: -.02em; }
.blog-article__meta {
  display: flex; align-items: center; gap: 14px;
  font-size: .75rem; color: rgba(239,238,234,.35);
  margin-bottom: 28px; padding-bottom: 24px;
  border-bottom: 1px solid rgba(107,104,152,.14);
  font-family: 'Anonymous Pro', monospace;
  flex-wrap: wrap;
}
.blog-article__content {
  font-size: .93rem;
  color: rgba(239,238,234,.72);
  line-height: 1.85;
  font-weight: 400;
}
.blog-article__content p { margin-bottom: 16px; }
.blog-article__content strong { color: #F4F6F8; font-weight: 700; }
.blog-article__content ul { margin: 0 0 16px 20px; list-style: disc; }
.blog-article__content ul li { margin-bottom: 7px; color: rgba(239,238,234,.68); }
.blog-article__footer {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(107,104,152,.14);
  display: flex; gap: 10px; flex-wrap: wrap;
}

/* Vazio */
.blog-empty { text-align: center; padding: 80px 0; color: rgba(239,238,234,.3); }
.blog-empty-icon { display:flex; align-items:center; justify-content:center; margin:0 auto 14px; }
.blog-empty-icon svg { width:48px; height:48px; stroke:rgba(239,238,234,.15); fill:none; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; }

@media (max-width: 960px) {
  .blog-featured__card { grid-template-columns: 1fr; }
  .blog-featured__img { height: 200px; }
  .blog-featured__body { padding: 28px; }
  .blog-grid { grid-template-columns: 1fr 1fr; }
  .blog-hero__inner { grid-template-columns: 1fr; }
  .blog-hero__search-wrap { width: 100%; }
}
@media (max-width: 600px) {
  .blog-grid { grid-template-columns: 1fr; }
  .blog-article__body { padding: 24px 20px 32px; }
}
`;

const CAT_ICONS = {
  direitos:  { Icon: Shield,   stroke: '#2ED573' },
  saude:     { Icon: Heart,    stroke: '#FFC800' },
  seguranca: { Icon: Lock,     stroke: '#FF4757' },
  familia:   { Icon: Users,    stroke: '#8B88B8' },
};

const POSTS = [
  {
    id: 1, cat:'direitos', catLabel:'Direitos', destaque:true,
    titulo:'Seus Direitos: Guia Completo da Lei Maria da Penha',
    desc:'Entenda como a Lei 11.340/2006 protege mulheres em situação de violência doméstica, quais medidas protetivas existem e como acioná-las.',
    ong:'ONG Vida Nova', data:'05 mar. 2026', leitura:'8 min',
    conteudo:`
      <p>A <strong>Lei Maria da Penha (Lei nº 11.340/2006)</strong> é um dos principais instrumentos legais para proteção de mulheres em situação de violência doméstica e familiar no Brasil.</p>
      <p><strong>O que ela abrange?</strong></p>
      <ul>
        <li>Violência física (lesões corporais)</li>
        <li>Violência psicológica (humilhação, controle, ameaças)</li>
        <li>Violência sexual (forçar relações ou atos sem consentimento)</li>
        <li>Violência patrimonial (destruir bens, impedir acesso a dinheiro)</li>
        <li>Violência moral (difamação, calúnia, injúria)</li>
      </ul>
      <p><strong>Quem está protegido?</strong> Qualquer mulher em relação íntima de afeto, independente de orientação sexual, convivência no mesmo lar ou vínculo familiar formal.</p>
      <p><strong>Medidas protetivas de urgência:</strong> Após o registro do BO, o juiz pode conceder em até 48 horas o afastamento do agressor do lar, proibição de aproximação (com distância mínima definida) e proibição de contato por qualquer meio.</p>
      <p><strong>Como solicitar:</strong> Vá a qualquer delegacia — de preferência a DEAM (Delegacia de Atendimento à Mulher). Você não precisa de advogado para solicitar medidas protetivas. O CRAM também pode orientar você.</p>
      <p>Lembre-se: você não precisa estar machucada fisicamente. Ameaças e violência psicológica também são previstas na lei.</p>
    `,
  },
  {
    id: 2, cat:'saude', catLabel:'Saúde Mental',
    titulo:'Saúde Mental Após o Trauma: Como Iniciar a Recuperação',
    desc:'Entender os sinais de trauma pós-violência é o primeiro passo para buscar ajuda. Você não está sozinha nessa jornada.',
    ong:'Centro Renascer', data:'28 fev. 2026', leitura:'6 min',
    conteudo:`
      <p>Viver uma situação de violência deixa marcas emocionais profundas. Pesadelos, ansiedade constante, dificuldade de confiar em pessoas — esses sinais são respostas naturais do seu sistema nervoso.</p>
      <p><strong>Você não está sozinha e não está com defeito.</strong> O que você sente é uma resposta legítima a experiências traumáticas.</p>
      <p><strong>Sinais comuns de trauma:</strong></p>
      <ul>
        <li>Flashbacks ou memórias intrusivas do que aconteceu</li>
        <li>Evitar lugares ou situações associadas ao trauma</li>
        <li>Dificuldade para dormir ou se concentrar</li>
        <li>Sensação constante de estar em alerta ou perigo</li>
        <li>Entorpecimento emocional ou distanciamento</li>
      </ul>
      <p><strong>O que ajuda no processo:</strong> Acompanhamento profissional com psicóloga ou terapeuta especializada em trauma, grupos de apoio com mulheres em situação semelhante, rotina simples e previsível, e aceitar ajuda de pessoas de confiança.</p>
      <p>O NIRA conecta você gratuitamente a profissionais de saúde mental de forma anônima. Dê esse primeiro passo.</p>
    `,
  },
  {
    id: 3, cat:'seguranca', catLabel:'Segurança',
    titulo:'Segurança Digital: Como Proteger seu Celular do Agressor',
    desc:'Como proteger suas conversas, apagar histórico rapidamente e usar o celular com segurança quando há monitoramento.',
    ong:'Instituto Digital Seguro', data:'22 fev. 2026', leitura:'5 min',
    conteudo:`
      <p>Em muitas situações de violência doméstica, o agressor monitora o celular da vítima. Segurança digital é tão importante quanto a física.</p>
      <p><strong>Dicas essenciais:</strong></p>
      <ul>
        <li>Use uma senha diferente no celular e nunca compartilhe</li>
        <li>Ative o apagamento automático do histórico de navegação</li>
        <li>Crie uma conta de e-mail que só você conhece</li>
        <li>Desative notificações que mostram conteúdo na tela bloqueada</li>
        <li>Use sempre o modo de navegação privada para acessar o NIRA</li>
      </ul>
      <p><strong>Botão de saída rápida:</strong> O NIRA possui um modo que fecha o aplicativo instantaneamente sem deixar rastros.</p>
      <p><strong>Aplicativos de disfarce:</strong> Existem aplicativos que parecem calculadoras ou jogos por fora mas permitem armazenar conversas e contatos de emergência com segurança.</p>
    `,
  },
  {
    id: 4, cat:'seguranca', catLabel:'Segurança', destaque_grid: true,
    titulo:'Como Sair de Casa com Segurança: Guia Prático',
    desc:'Planejamento é essencial. Saiba o que levar, quando sair e para onde ir em situação de risco.',
    ong:'ONG Vida Nova', data:'18 fev. 2026', leitura:'7 min',
    conteudo:`
      <p>Sair de uma situação de violência doméstica requer planejamento cuidadoso. A segurança é sempre a prioridade absoluta.</p>
      <p><strong>Monte um "kit emergência" em local seguro:</strong></p>
      <ul>
        <li>Documentos pessoais (RG, CPF, certidão de nascimento dos filhos)</li>
        <li>Dinheiro em espécie ou cartão bancário</li>
        <li>Roupas essenciais para você e seus filhos</li>
        <li>Medicamentos de uso contínuo</li>
        <li>Contatos importantes anotados em papel</li>
      </ul>
      <p><strong>Para onde ir:</strong> Centros de Atendimento à Mulher (CRAM), Casas-Abrigo, Delegacia da Mulher ou casa de familiar de confiança. O NIRA pode mapear os locais mais próximos de você.</p>
      <p><strong>Escolha o momento certo:</strong> Prefira sair quando o agressor não está em casa. Avise uma pessoa de confiança sobre seus planos.</p>
      <p>Ligue 180 — a Central de Atendimento à Mulher funciona 24 horas e pode orientar cada passo.</p>
    `,
  },
  {
    id: 5, cat:'direitos', catLabel:'Direitos',
    titulo:'Como Fazer um Boletim de Ocorrência: Passo a Passo',
    desc:'Registrar uma ocorrência é mais simples do que parece. Veja como fazer mesmo sem marcas físicas visíveis.',
    ong:'Centro Renascer', data:'12 fev. 2026', leitura:'4 min',
    conteudo:`
      <p>O <strong>Boletim de Ocorrência (BO)</strong> é o primeiro passo para documentar a violência e ter acesso a medidas de proteção legal.</p>
      <p><strong>Onde registrar:</strong></p>
      <ul>
        <li>Qualquer delegacia de polícia</li>
        <li>Delegacia de Atendimento à Mulher (DEAM) — mais recomendado</li>
        <li>Online no site da Polícia Civil do seu estado</li>
      </ul>
      <p><strong>O que informar:</strong> Relate os fatos em detalhes — data, hora, local, o que aconteceu, quem estava presente. Você não precisa ter marcas físicas visíveis.</p>
      <p><strong>Violência psicológica também é crime:</strong> Ameaças, humilhações, xingamentos e controle excessivo devem ser relatados.</p>
      <p><strong>Leve consigo:</strong> RG e CPF. Se tiver fotos, prints de mensagens ou qualquer evidência, leve também.</p>
      <p>Após o BO, solicite medidas protetivas de urgência — o juiz pode concedê-las em até 48 horas.</p>
    `,
  },
  {
    id: 6, cat:'familia', catLabel:'Família',
    titulo:'Protegendo os Filhos em Situações de Violência Doméstica',
    desc:'Como proteger seus filhos, entender os efeitos do trauma e garantir os direitos deles durante o processo.',
    ong:'Instituto Família Segura', data:'08 fev. 2026', leitura:'6 min',
    conteudo:`
      <p>Quando há filhos envolvidos, a situação é mais complexa — mas é possível protegê-los.</p>
      <p><strong>Guarda de emergência:</strong> Em situações de violência, é possível solicitar guarda provisória de urgência na delegacia ou no CRAM, impedindo que o agressor leve as crianças.</p>
      <p><strong>Sinais de que os filhos foram afetados:</strong></p>
      <ul>
        <li>Mudanças bruscas de comportamento</li>
        <li>Regressão a comportamentos de fase anterior</li>
        <li>Medos intensos ou pesadelos frequentes</li>
        <li>Queda no rendimento escolar</li>
      </ul>
      <p><strong>Violência assistida é crime:</strong> Crianças que presenciam violência doméstica são consideradas vítimas pela lei e têm direito a proteção e acompanhamento psicológico.</p>
      <p><strong>Como ajudar seus filhos:</strong> Mantenha uma rotina estável, não fale mal do outro genitor na frente deles, e busque acompanhamento para as crianças.</p>
    `,
  },
];

const CATS = ['Todos','Direitos','Saúde Mental','Segurança','Família'];

const tagClass = { Direitos:'direitos', 'Saúde Mental':'saude', Segurança:'seguranca', Família:'familia' };

export default function ConteudosPage() {
  const [catAtiva, setCatAtiva] = useState('Todos');
  const [busca, setBusca]       = useState('');
  const [artigo, setArtigo]     = useState(null);

  const destaque = POSTS.find(p => p.destaque);

  const filtrados = POSTS.filter(p => {
    const matchCat = catAtiva === 'Todos' || p.catLabel === catAtiva;
    const q = busca.toLowerCase();
    const matchBusca = !busca || p.titulo.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return matchCat && matchBusca;
  }).filter(p => !p.destaque || catAtiva !== 'Todos' || busca);

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page-wrapper">

        {/* ══ HERO ══ */}
        <section className="blog-hero">
          <div className="container">
            <div className="blog-hero__inner">
              <div>
                <span className="section-label">Conteúdos</span>
                <h1 className="section-title">
                  Informação que<br /><span style={{ color:'#9B8FFF' }}>Protege e Empodera</span>
                </h1>
                <p className="section-sub">Artigos, guias e orientações publicados por ONGs parceiras.</p>
              </div>
              <div className="blog-hero__search-wrap">
                <span className="blog-hero__search-icon"><Search /></span>
                <input
                  className="blog-hero__search"
                  type="text"
                  placeholder="Buscar artigos..."
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══ DESTAQUE ══ */}
        {destaque && catAtiva === 'Todos' && !busca && (
          <section className="blog-featured">
            <div className="container">
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:22 }}>
                <span className="section-label">Em Destaque</span>
                <span style={{ fontSize:'.72rem', color:'rgba(239,238,234,.3)', fontFamily:"'Anonymous Pro',monospace" }}>{POSTS.length} artigos</span>
              </div>
              <div className="blog-featured__card" onClick={() => setArtigo(destaque)}>
                <div className={`blog-card__thumb blog-card__thumb--${destaque.cat}`} style={{ height:'100%', minHeight:280 }}>
                  <div className="blog-card__thumb-bg" />
                  {(() => { const ci = CAT_ICONS[destaque.cat]; return ci ? <div className="blog-featured__img-icon"><ci.Icon style={{stroke:ci.stroke}} /></div> : null; })()}
                </div>
                <div className="blog-featured__body">
                  <div className="blog-featured__eyebrow">
                    <span className={`blog-tag blog-tag--destaque`}>✦ Destaque</span>
                    <span className={`blog-tag blog-tag--${tagClass[destaque.catLabel]||'familia'}`}>{destaque.catLabel}</span>
                  </div>
                  <h2 className="blog-featured__title">{destaque.titulo}</h2>
                  <p className="blog-featured__desc">{destaque.desc}</p>
                  <div className="blog-featured__meta">
                    <span>por {destaque.ong}</span>
                    <span className="blog-featured__meta-sep">·</span>
                    <span>{destaque.data}</span>
                    <span className="blog-featured__meta-sep">·</span>
                    <span>{destaque.leitura} de leitura</span>
                  </div>
                  <span className="blog-featured__read">
                    Ler artigo completo <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══ FILTROS ══ */}
        <section className="blog-filters" style={{ paddingTop: destaque && catAtiva==='Todos' && !busca ? 0 : 0, background:'var(--bg-deep)' }}>
          <div className="container">
            <div className="blog-filters__wrap">
              {CATS.map(c => (
                <button key={c} className={`blog-filter${catAtiva===c?' blog-filter--active':''}`} onClick={() => setCatAtiva(c)}>
                  {c}
                </button>
              ))}
              <span className="blog-filter--count">{filtrados.length + (catAtiva==='Todos'&&!busca&&destaque?1:0)} artigos</span>
            </div>
          </div>
        </section>

        {/* ══ GRID ══ */}
        <section className="blog-grid-section">
          <div className="container">
            {filtrados.length === 0 && !(destaque && catAtiva==='Todos' && !busca) ? (
              <div className="blog-empty">
                <div className="blog-empty-icon"><Search /></div>
                <p>Nenhum artigo encontrado.</p>
              </div>
            ) : (
              <div className="blog-grid">
                {/* Se filtrou/buscou, mostrar destaque também */}
                {(catAtiva!=='Todos' || busca) && destaque &&
                  POSTS.filter(p => p.destaque).filter(p => {
                    const matchCat = catAtiva==='Todos' || p.catLabel===catAtiva;
                    const q = busca.toLowerCase();
                    return matchCat && (!busca || p.titulo.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
                  }).map(p => <BlogCard key={p.id} post={p} onOpen={setArtigo} />)
                }
                {filtrados.map(p => <BlogCard key={p.id} post={p} onOpen={setArtigo} />)}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ══ ARTIGO MODAL ══ */}
      {artigo && (
        <div className="blog-article-bg" onClick={() => setArtigo(null)}>
          <div className="blog-article" onClick={e => e.stopPropagation()}>
            <div className={`blog-article__hero blog-card__thumb--${artigo.cat}`}>
              {(() => { const ci = CAT_ICONS[artigo.cat]; return ci ? <div className="blog-article__hero-icon"><ci.Icon style={{stroke:ci.stroke}} /></div> : null; })()}
              <button className="blog-article__close" onClick={() => setArtigo(null)}><X /></button>
            </div>
            <div className="blog-article__body">
              <div className="blog-article__eyebrow">
                {artigo.destaque && <span className="blog-tag blog-tag--destaque">✦ Destaque</span>}
                <span className={`blog-tag blog-tag--${tagClass[artigo.catLabel]||'familia'}`}>{artigo.catLabel}</span>
              </div>
              <h1 className="blog-article__title">{artigo.titulo}</h1>
              <div className="blog-article__meta">
                <span>por {artigo.ong}</span>
                <span>·</span>
                <span>{artigo.data}</span>
                <span>·</span>
                <span>{artigo.leitura} de leitura</span>
              </div>
              <div
                className="blog-article__content"
                dangerouslySetInnerHTML={{ __html: artigo.conteudo }}
              />
              <div className="blog-article__footer">
                <Link to="/triagem" className="btn btn-primary" onClick={() => setArtigo(null)} style={{display:'flex',alignItems:'center',gap:7}}>
                  <AlertTriangle size={14}/> Preciso de Ajuda →
                </Link>
                <button className="btn btn-ghost" onClick={() => setArtigo(null)}>
                  ← Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

function BlogCard({ post, onOpen }) {
  const ci = CAT_ICONS[post.cat];
  return (
    <article className="blog-card" onClick={() => onOpen(post)}>
      <div className={`blog-card__thumb blog-card__thumb--${post.cat}`}>
        <div className="blog-card__thumb-bg" />
        {ci && <div className="blog-card__thumb-icon"><ci.Icon style={{stroke:ci.stroke}} /></div>}
      </div>
      <div className="blog-card__body">
        <div className="blog-card__tags">
          <span className={`blog-tag blog-tag--${tagClass[post.catLabel]||'familia'}`}>{post.catLabel}</span>
          {post.destaque && <span className="blog-tag blog-tag--destaque">Destaque</span>}
        </div>
        <h2 className="blog-card__title">{post.titulo}</h2>
        <p className="blog-card__desc">{post.desc}</p>
        <div className="blog-card__footer">
          <p className="blog-card__by">por <strong>{post.ong}</strong></p>
          <div className="blog-card__right">
            <span className="blog-card__time">{post.leitura}</span>
            <span className="blog-card__arrow">→</span>
          </div>
        </div>
      </div>
    </article>
  );
}
