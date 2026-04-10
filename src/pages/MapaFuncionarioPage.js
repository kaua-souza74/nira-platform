import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { useAuth, ESPECIALIDADES, ESPEC_MAPA } from '../contexts/AuthContext';

const css = `
.mapa-page { min-height:100vh; background:var(--bg-deep); padding-top:72px; }
.mapa-layout {
  display: grid;
  grid-template-columns: 1fr 330px;
  height: calc(100vh - 72px);
  overflow: hidden;
}

/* ── MAPA ── */
.mapa-container { position: relative; }
#nira-map { width:100%; height:100%; min-height:500px; background:#1a1830; }

.leaflet-container { background:#12111F !important; font-family:'Poppins',sans-serif !important; }
.leaflet-control-zoom a { background:rgba(20,18,40,.92) !important; backdrop-filter:blur(12px) !important; border-color:rgba(107,104,152,.35) !important; color:rgba(239,238,234,.7) !important; }
.leaflet-control-zoom a:hover { background:rgba(107,104,152,.3) !important; color:#F4F6F8 !important; }
.leaflet-control-attribution { background:rgba(18,17,31,.85) !important; color:rgba(239,238,234,.25) !important; font-size:10px !important; }
.leaflet-control-attribution a { color:rgba(155,143,255,.6) !important; }
.leaflet-popup-content-wrapper { background:rgba(20,18,40,.97) !important; border:1px solid rgba(107,104,152,.3) !important; border-radius:14px !important; box-shadow:0 8px 32px rgba(0,0,0,.6) !important; color:#F4F6F8 !important; padding:0 !important; }
.leaflet-popup-tip { background:rgba(20,18,40,.97) !important; }
.leaflet-popup-close-button { color:rgba(239,238,234,.5) !important; top:10px !important; right:10px !important; }
.nira-popup { padding:14px 16px; min-width:190px; font-family:'Poppins',sans-serif; }
.nira-popup__icon { font-size:1.3rem; margin-bottom:7px; display:block; }
.nira-popup__title { font-weight:700; font-size:.88rem; color:#F4F6F8; margin-bottom:3px; }
.nira-popup__type  { font-size:.68rem; text-transform:uppercase; letter-spacing:.08em; margin-bottom:5px; }
.nira-popup__desc  { font-size:.77rem; color:rgba(239,238,234,.55); line-height:1.55; }
.nira-popup--sos .nira-popup__title { color:#FF4757; }
.nira-popup--sos .nira-popup__type  { color:#FF4757; }

/* FABs */
.mapa-fab-group { position:absolute; bottom:24px; left:24px; display:flex; gap:8px; z-index:999; flex-wrap:wrap; }
.mapa-fab {
  background:rgba(18,17,31,.9); backdrop-filter:blur(12px);
  border:1px solid rgba(107,104,152,.28); border-radius:100px;
  padding:9px 16px; font-family:'Poppins',sans-serif;
  font-size:.76rem; font-weight:600; color:rgba(239,238,234,.72);
  cursor:pointer; transition:all .22s; display:flex; align-items:center; gap:6px;
}
.mapa-fab:hover { border-color:rgba(155,143,255,.45); color:#F4F6F8; }
.mapa-fab--active { background:rgba(155,143,255,.18); border-color:#9B8FFF; color:#C4BCFF; }

/* Legenda */
.mapa-legend {
  position:absolute; top:16px; left:16px; z-index:999;
  background:rgba(18,17,31,.9); backdrop-filter:blur(12px);
  border:1px solid rgba(107,104,152,.22); border-radius:14px; padding:14px 16px; min-width:165px;
}
.mapa-legend__title { font-size:.6rem; color:rgba(239,238,234,.28); text-transform:uppercase; letter-spacing:.12em; font-family:'Anonymous Pro',monospace; margin-bottom:9px; }
.mapa-legend__item { display:flex; align-items:center; gap:8px; font-size:.75rem; color:rgba(239,238,234,.6); margin-bottom:6px; }
.mapa-legend__item:last-child { margin-bottom:0; }
.mapa-legend__dot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }

/* ── SIDEBAR TABS ── */
.mapa-sidebar {
  background:rgba(20,18,42,.97);
  border-left:1px solid rgba(107,104,152,.18);
  display:flex; flex-direction:column; overflow:hidden;
}

/* Tabs */
.mapa-tabs { display:flex; border-bottom:1px solid rgba(107,104,152,.14); flex-shrink:0; }
.mapa-tab {
  flex:1; padding:13px 8px;
  font-family:'Poppins',sans-serif; font-size:.72rem; font-weight:600;
  color:rgba(239,238,234,.45); background:none; border:none; cursor:pointer;
  border-bottom:2px solid transparent; transition:all .22s; white-space:nowrap;
  display:flex; align-items:center; justify-content:center; gap:5px;
}
.mapa-tab:hover { color:rgba(239,238,234,.75); }
.mapa-tab--active { color:#9B8FFF; border-bottom-color:#9B8FFF; background:rgba(155,143,255,.05); }
.mapa-tab__badge {
  background:rgba(155,143,255,.2); border-radius:100px;
  padding:1px 6px; font-size:.6rem; color:#9B8FFF;
}
.mapa-tab__badge--red { background:rgba(255,71,87,.2); color:#FF4757; }

.mapa-sidebar__body { flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:12px; }
.mapa-sidebar__body::-webkit-scrollbar { width:3px; }
.mapa-sidebar__body::-webkit-scrollbar-thumb { background:rgba(107,104,152,.22); border-radius:3px; }

.mapa-sect-lbl { font-size:.6rem; color:rgba(239,238,234,.28); text-transform:uppercase; letter-spacing:.12em; font-family:'Anonymous Pro',monospace; display:block; margin-bottom:7px; }

/* SOS */
.mapa-sos-alert { background:rgba(255,71,87,.1); border:1.5px solid rgba(255,71,87,.32); border-radius:12px; padding:13px 14px; animation:glowPulse 2.5s ease-in-out infinite; }
.mapa-sos-alert__title { font-weight:700; font-size:.82rem; color:#FF4757; margin-bottom:3px; }
.mapa-sos-alert__sub { font-size:.72rem; color:rgba(239,238,234,.5); line-height:1.5; margin-bottom:9px; }

/* Zona pills */
.mapa-zona-pill { display:flex; align-items:center; gap:9px; padding:9px 12px; background:rgba(107,104,152,.1); border:1px solid rgba(107,104,152,.15); border-radius:11px; cursor:pointer; transition:all .22s; margin-bottom:5px; }
.mapa-zona-pill:hover { border-color:rgba(155,143,255,.35); }
.mapa-zona-pill--sel { border-color:#9B8FFF; background:rgba(155,143,255,.12); }
.mapa-zona-pill__dot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }
.mapa-zona-pill__name { font-size:.83rem; font-weight:600; color:#F4F6F8; flex:1; }
.mapa-zona-pill__cnt { font-size:.67rem; color:rgba(239,238,234,.35); font-family:'Anonymous Pro',monospace; }

/* ── CARD DE FUNCIONÁRIO na tab ── */
.func-card {
  background:rgba(107,104,152,.08); border:1px solid rgba(107,104,152,.14);
  border-radius:12px; padding:13px 14px; transition:border-color .22s;
  position:relative;
}
.func-card:hover { border-color:rgba(155,143,255,.28); }
.func-card__top { display:flex; align-items:center; gap:9px; margin-bottom:9px; }
.func-card__av {
  width:34px; height:34px; border-radius:50%;
  background:linear-gradient(135deg,rgba(107,104,152,.3),rgba(155,143,255,.15));
  display:flex; align-items:center; justify-content:center; font-size:.95rem; flex-shrink:0;
}
.func-card__name { font-weight:700; font-size:.85rem; color:#F4F6F8; margin-bottom:2px; }
.func-card__espec { font-size:.65rem; color:rgba(239,238,234,.4); }
.func-card__right { margin-left:auto; display:flex; flex-direction:column; align-items:flex-end; gap:4px; }

/* Info de vínculo */
.func-card__vinculo { font-size:.65rem; color:rgba(239,238,234,.38); margin-bottom:6px; display:flex; align-items:center; gap:5px; }

/* Alocação inline */
.func-card__aloc { display:flex; gap:7px; align-items:center; flex-wrap:wrap; }
.func-card__zone-select { flex:1; min-width:100px; background:rgba(107,104,152,.12); border:1px solid rgba(107,104,152,.22); border-radius:8px; padding:5px 10px; font-family:'Poppins',sans-serif; font-size:.75rem; color:#F4F6F8; cursor:pointer; }
.func-card__zone-select:focus { outline:none; border-color:rgba(155,143,255,.4); }
.func-card__zone-select option { background:rgb(26,24,48); }
.func-card__aloc-btn { background:rgba(155,143,255,.18); border:1.5px solid rgba(155,143,255,.35); border-radius:8px; padding:5px 12px; font-family:'Poppins',sans-serif; font-size:.75rem; font-weight:700; color:#C4BCFF; cursor:pointer; transition:all .22s; white-space:nowrap; }
.func-card__aloc-btn:hover { background:rgba(155,143,255,.28); border-color:#9B8FFF; color:#fff; }
.func-card__aloc-btn:disabled { opacity:.38; cursor:not-allowed; }

/* Ir no mapa */
.mapa-ir-btn { width:100%; background:rgba(107,104,152,.12); border:1px solid rgba(107,104,152,.2); border-radius:8px; padding:6px; font-family:'Poppins',sans-serif; font-size:.72rem; font-weight:600; color:rgba(239,238,234,.6); cursor:pointer; transition:all .22s; display:flex; align-items:center; justify-content:center; gap:5px; }
.mapa-ir-btn:hover { border-color:rgba(155,143,255,.4); color:#C4BCFF; }

/* ── NOTIFICAÇÕES ── */
.notif-empty { text-align:center; padding:36px 12px; color:rgba(239,238,234,.28); font-size:.82rem; }
.notif-item {
  background:rgba(107,104,152,.08); border:1px solid rgba(107,104,152,.14);
  border-radius:12px; padding:13px 14px; cursor:pointer; transition:all .22s;
}
.notif-item--nova { border-color:rgba(155,143,255,.3); background:rgba(155,143,255,.07); }
.notif-item:hover { border-color:rgba(155,143,255,.35); background:rgba(155,143,255,.1); }
.notif-item__top { display:flex; align-items:flex-start; justify-content:space-between; gap:8px; margin-bottom:5px; }
.notif-item__title { font-weight:700; font-size:.82rem; color:#F4F6F8; }
.notif-item__hora { font-size:.65rem; color:rgba(239,238,234,.28); font-family:'Anonymous Pro',monospace; flex-shrink:0; }
.notif-item__text { font-size:.8rem; color:rgba(239,238,234,.6); line-height:1.6; }
.notif-item__nova-badge { display:inline-block; width:7px; height:7px; border-radius:50%; background:#9B8FFF; box-shadow:0 0 6px rgba(155,143,255,.5); flex-shrink:0; margin-top:3px; }

/* Feedback de alocação */
.aloc-toast {
  position:fixed; bottom:28px; left:50%; transform:translateX(-50%);
  background:rgba(46,213,115,.15); border:1.5px solid rgba(46,213,115,.38);
  border-radius:100px; padding:11px 24px;
  font-family:'Poppins',sans-serif; font-size:.85rem; font-weight:600; color:#2ED573;
  box-shadow:0 8px 28px rgba(0,0,0,.45); z-index:9999;
  animation:fadeInUp .35s ease, fadeOut .4s 2.6s ease forwards;
  white-space:nowrap;
}
@keyframes fadeOut { to { opacity:0; transform:translateX(-50%) translateY(10px); } }

@media (max-width:900px) { .mapa-layout { grid-template-columns:1fr; } .mapa-sidebar { max-height:360px; } }
`;

/* ── Dados ── */
const ZONAS = [
  { key:'norte',  label:'Norte',  color:'#9B8FFF', lat:-23.1100, lng:-45.8950 },
  { key:'sul',    label:'Sul',    color:'#2ED573', lat:-23.2100, lng:-45.8750 },
  { key:'leste',  label:'Leste',  color:'#FFC800', lat:-23.1700, lng:-45.8100 },
  { key:'oeste',  label:'Oeste',  color:'#FF8C42', lat:-23.1700, lng:-45.9600 },
  { key:'centro', label:'Centro', color:'#8B88B8', lat:-23.1788, lng:-45.8852 },
];

const SERVICOS = [
  { id:'s1', tipo:'delegacia', nome:'DEAM — Delegacia da Mulher',      lat:-23.1800, lng:-45.8780, icon:'👮', cor:'#FFC800', desc:'Atende 24h.' },
  { id:'s2', tipo:'cram',      nome:'CRAM — Centro de Ref. da Mulher', lat:-23.1650, lng:-45.8920, icon:'🏢', cor:'#9B8FFF', desc:'Orientação jurídica e psicológica.' },
  { id:'s3', tipo:'ong',       nome:'ONG Vida Nova',                    lat:-23.1750, lng:-45.9050, icon:'🤝', cor:'#2ED573', desc:'Apoio emocional e encaminhamento.' },
  { id:'s4', tipo:'abrigo',    nome:'Casa-Abrigo Municipal',            lat:-23.1550, lng:-45.8800, icon:'🏠', cor:'#9B8FFF', desc:'Abrigo seguro e sigiloso.' },
  { id:'s5', tipo:'sos',       nome:'⚠️ Alerta S.O.S. #0041',          lat:-23.1900, lng:-45.8650, icon:'🆘', cor:'#FF4757', desc:'Localização recebida — atender.', urgente:true },
];

function pinSVG(emoji, cor, urgente=false) {
  const borda = urgente ? '#FF4757' : cor;
  const pulso = urgente ? `<circle cx="20" cy="20" r="18" fill="none" stroke="#FF4757" stroke-width="2" opacity=".5"><animate attributeName="r" from="14" to="22" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" from=".6" to="0" dur="1.5s" repeatCount="indefinite"/></circle>` : '';
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="52" viewBox="0 0 40 52">${pulso}<circle cx="20" cy="20" r="18" fill="${cor}28" stroke="${borda}" stroke-width="2"/><circle cx="20" cy="20" r="13" fill="${cor}" opacity=".92"/><text x="20" y="26" text-anchor="middle" font-size="13" font-family="Segoe UI Emoji,Apple Color Emoji,sans-serif">${emoji}</text><polygon points="20,48 14,30 26,30" fill="${borda}" opacity=".9"/></svg>`)}`;
}

export default function MapaFuncionarioPage() {
  const { user, getFuncionarios, alocarFuncionario, marcarNotifLida, getVinculoLabel, getNotifsNaoLidas } = useAuth();
  const mapRef     = useRef(null);
  const leafletMap = useRef(null);
  const markersRef = useRef([]);

  const [camada,     setCamada]     = useState('servicos');
  const [zonasSel,   setZonasSel]   = useState([]);
  const [tabAtiva,   setTabAtiva]   = useState('zonas');
  const [alocZonas,  setAlocZonas]  = useState({});   // { funcId: zonaLabel }
  const [leafletOk,  setLeafletOk]  = useState(false);
  const [toast,      setToast]      = useState(null);

  const isAdm      = user?.role === 'adm';
  const isFuncMapa = ESPEC_MAPA.includes(user?.especialidade);
  const funcionarios = getFuncionarios().filter(u => ESPEC_MAPA.includes(u.especialidade));
  const notifsNL = getNotifsNaoLidas();

  /* ── Carregar Leaflet ── */
  useEffect(() => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css'; link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    if (window.L) { setLeafletOk(true); return; }
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => setLeafletOk(true);
    document.head.appendChild(script);
  }, []);

  /* ── Iniciar mapa ── */
  useEffect(() => {
    if (!leafletOk || leafletMap.current) return;
    const L = window.L;
    const map = L.map('nira-map', { center:[-23.1788,-45.8852], zoom:13 });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution:'© OpenStreetMap © CARTO', subdomains:'abcd', maxZoom:19,
    }).addTo(map);
    leafletMap.current = map;
    renderMarkers(L, map, 'servicos');
  // eslint-disable-next-line
  }, [leafletOk]);

  /* ── Atualizar markers ao mudar funcionários ── */
  useEffect(() => {
    if (leafletMap.current && window.L) {
      renderMarkers(window.L, leafletMap.current, camada);
    }
  // eslint-disable-next-line
  }, [funcionarios.map(f=>`${f.id}:${f.lat}:${f.lng}`).join(','), camada]);

  function renderMarkers(L, map, tipoCamada) {
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    function addM(lat, lng, svgUrl, html) {
      const icon = L.icon({ iconUrl:svgUrl, iconSize:[40,52], iconAnchor:[20,52], popupAnchor:[0,-54] });
      const m = L.marker([lat,lng],{icon}).addTo(map).bindPopup(html, { maxWidth:240 });
      markersRef.current.push(m);
    }

    if (tipoCamada === 'servicos' || tipoCamada === 'todos') {
      SERVICOS.forEach(s => {
        addM(s.lat, s.lng, pinSVG(s.icon, s.cor, s.urgente),
          `<div class="nira-popup${s.urgente?' nira-popup--sos':''}"><span class="nira-popup__icon">${s.icon}</span><p class="nira-popup__title">${s.nome}</p><p class="nira-popup__type" style="color:${s.cor}">${s.tipo.toUpperCase()}</p><p class="nira-popup__desc">${s.desc}</p></div>`
        );
      });
    }

    if (tipoCamada === 'agentes' || tipoCamada === 'todos') {
      funcionarios.filter(f => f.lat).forEach(f => {
        const z = ZONAS.find(z => z.label === f.area);
        const cor = z?.color || '#6B6898';
        const esp = ESPECIALIDADES.find(e => e.value === f.especialidade);
        addM(f.lat, f.lng, pinSVG(esp?.icon||'👤', cor),
          `<div class="nira-popup"><span class="nira-popup__icon">${esp?.icon||'👤'}</span><p class="nira-popup__title">${f.nome}</p><p class="nira-popup__type" style="color:${cor}">${esp?.label || 'Agente'} · Zona ${f.area||'N/A'}</p><p class="nira-popup__desc">${f.ativo?'● Online':'○ Offline'}</p></div>`
        );
      });
    }
  }

  function trocarCamada(c) {
    setCamada(c);
    if (leafletMap.current && window.L) renderMarkers(window.L, leafletMap.current, c);
  }

  function irParaZona(zona) {
    if (leafletMap.current) leafletMap.current.flyTo([zona.lat, zona.lng], 14, { duration:.8 });
    setZonasSel(prev => prev.includes(zona.key) ? prev.filter(z=>z!==zona.key) : [...prev, zona.key]);
  }

  function irParaFunc(f) {
    if (leafletMap.current && f.lat) leafletMap.current.flyTo([f.lat, f.lng], 15, { duration:.8 });
  }

  function handleAlocar(f) {
    const zona = ZONAS.find(z => z.label === alocZonas[f.id]);
    if (!zona) return;
    const lat = zona.lat + (Math.random()-.5)*.025;
    const lng = zona.lng + (Math.random()-.5)*.025;
    alocarFuncionario(f.id, zona.label, lat, lng);
    setAlocZonas(prev => ({ ...prev, [f.id]: '' }));
    showToast(`📍 ${f.nome} alocado(a) na zona ${zona.label}!`);
    if (leafletMap.current && window.L) {
      setTimeout(() => {
        renderMarkers(window.L, leafletMap.current, camada);
        leafletMap.current.flyTo([lat, lng], 14, { duration:.8 });
      }, 100);
    }
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3100);
  }

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="mapa-page">
        <div className="mapa-layout">

          {/* ══ MAPA ══ */}
          <div className="mapa-container">
            <div id="nira-map" ref={mapRef} />

            {/* Legenda */}
            <div className="mapa-legend">
              <p className="mapa-legend__title">Legenda</p>
              {[
                {cor:'#9B8FFF', txt:'Serviços de Apoio'},
                {cor:'#2ED573', txt:'Agente Ativo'},
                {cor:'#FFC800', txt:'Delegacia / CRAM'},
                {cor:'#FF4757', txt:'Alerta S.O.S.', glow:true},
              ].map(l=>(
                <div className="mapa-legend__item" key={l.txt}>
                  <span className="mapa-legend__dot" style={{background:l.cor,boxShadow:l.glow?`0 0 6px ${l.cor}`:undefined}}/>
                  {l.txt}
                </div>
              ))}
            </div>

            {/* FABs */}
            <div className="mapa-fab-group">
              {[{key:'servicos',label:'🏥 Serviços'},{key:'agentes',label:'👥 Agentes'},{key:'todos',label:'🔍 Tudo'}].map(f=>(
                <button key={f.key} className={`mapa-fab${camada===f.key?' mapa-fab--active':''}`} onClick={()=>trocarCamada(f.key)}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* ══ SIDEBAR ══ */}
          <aside className="mapa-sidebar">
            {/* Tabs */}
            <div className="mapa-tabs">
              <button className={`mapa-tab${tabAtiva==='zonas'?' mapa-tab--active':''}`} onClick={()=>setTabAtiva('zonas')}>
                🗺️ Zonas
              </button>
              {isAdm && (
                <button className={`mapa-tab${tabAtiva==='funcionarios'?' mapa-tab--active':''}`} onClick={()=>setTabAtiva('funcionarios')}>
                  👥 Equipe <span className="mapa-tab__badge">{funcionarios.length}</span>
                </button>
              )}
              <button className={`mapa-tab${tabAtiva==='notifs'?' mapa-tab--active':''}`} onClick={()=>setTabAtiva('notifs')}>
                🔔 {notifsNL.length > 0 && <span className="mapa-tab__badge mapa-tab__badge--red">{notifsNL.length}</span>}
              </button>
            </div>

            <div className="mapa-sidebar__body">

              {/* ── Tab: Zonas ── */}
              {tabAtiva === 'zonas' && (
                <>
                  {/* SOS */}
                  <div>
                    <span className="mapa-sect-lbl">⚠️ Alertas ativos</span>
                    <div className="mapa-sos-alert">
                      <p className="mapa-sos-alert__title">🆘 S.O.S. #0041</p>
                      <p className="mapa-sos-alert__sub">São José dos Campos · há 3 min</p>
                      <button className="mapa-ir-btn" onClick={()=>{if(leafletMap.current)leafletMap.current.flyTo([-23.19,-45.865],15,{duration:.8})}}>
                        📍 Ver no mapa
                      </button>
                    </div>
                  </div>

                  {/* Zonas */}
                  <div>
                    <span className="mapa-sect-lbl">Zonas de Cobertura</span>
                    {ZONAS.map(z => {
                      const n = funcionarios.filter(f=>f.area===z.label&&f.lat).length;
                      return (
                        <div key={z.key} className={`mapa-zona-pill${zonasSel.includes(z.key)?' mapa-zona-pill--sel':''}`} onClick={()=>irParaZona(z)}>
                          <span className="mapa-zona-pill__dot" style={{background:z.color}}/>
                          <span className="mapa-zona-pill__name">{z.label}</span>
                          <span className="mapa-zona-pill__cnt">{n} agente{n!==1?'s':''}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Info do funcionário logado */}
                  {isFuncMapa && (
                    <div style={{background:'rgba(155,143,255,.1)',border:'1.5px solid rgba(155,143,255,.28)',borderRadius:13,padding:16,textAlign:'center'}}>
                      <p style={{fontSize:'2rem',marginBottom:8}}>🦉</p>
                      <p style={{fontWeight:700,fontSize:'.88rem',color:'#F4F6F8',marginBottom:5}}>Olá, {user?.nome}!</p>
                      {user?.area
                        ? <><p style={{fontSize:'.82rem',color:'rgba(239,238,234,.6)',marginBottom:10}}>Você está alocado(a) na zona <strong style={{color:'#9B8FFF'}}>{user.area}</strong>.</p>
                            <button className="mapa-ir-btn" onClick={()=>{if(leafletMap.current&&user.lat)leafletMap.current.flyTo([user.lat,user.lng],15,{duration:.8})}}>📍 Ver minha posição</button></>
                        : <p style={{fontSize:'.82rem',color:'rgba(239,238,234,.5)'}}>Aguardando alocação pelo administrador.</p>
                      }
                    </div>
                  )}
                </>
              )}

              {/* ── Tab: Funcionários (ADM) ── */}
              {tabAtiva === 'funcionarios' && isAdm && (
                <>
                  <span className="mapa-sect-lbl">Policiais e Agentes ({funcionarios.length})</span>
                  {funcionarios.map(f => {
                    const z = ZONAS.find(z => z.label === f.area);
                    const esp = ESPECIALIDADES.find(e => e.value === f.especialidade);
                    const vinculoLabel = getVinculoLabel(f.vinculo, f.ongId);
                    return (
                      <div key={f.id} className="func-card">
                        <div className="func-card__top">
                          <div className="func-card__av">{esp?.icon || '👤'}</div>
                          <div style={{flex:1,minWidth:0}}>
                            <p className="func-card__name">{f.nome}</p>
                            <p className="func-card__espec">{esp?.label}</p>
                          </div>
                          <div className="func-card__right">
                            <span className={`adm-pill adm-pill--${f.ativo?'new':'done'}`} style={{fontSize:'.6rem'}}>{f.ativo?'● Ativo':'○ Inativo'}</span>
                            {f.area && <span style={{fontSize:'.62rem',color:z?.color||'rgba(239,238,234,.35)'}}>{f.area}</span>}
                          </div>
                        </div>

                        {/* Vínculo */}
                        <div className="func-card__vinculo">
                          {vinculoLabel}
                        </div>

                        {/* Alocação */}
                        <div className="func-card__aloc">
                          <select
                            className="func-card__zone-select"
                            value={alocZonas[f.id] || ''}
                            onChange={e => setAlocZonas(prev => ({...prev, [f.id]: e.target.value}))}
                          >
                            <option value="">Alocar em...</option>
                            {ZONAS.map(z => (
                              <option key={z.key} value={z.label}>{z.label}</option>
                            ))}
                          </select>
                          <button
                            className="func-card__aloc-btn"
                            disabled={!alocZonas[f.id]}
                            onClick={() => handleAlocar(f)}
                          >
                            Alocar →
                          </button>
                        </div>

                        {f.lat && (
                          <button className="mapa-ir-btn" style={{marginTop:7}} onClick={() => irParaFunc(f)}>
                            📍 Ver no mapa
                          </button>
                        )}
                      </div>
                    );
                  })}
                </>
              )}

              {/* ── Tab: Notificações ── */}
              {tabAtiva === 'notifs' && (
                <>
                  <span className="mapa-sect-lbl">
                    Notificações {notifsNL.length > 0 && `(${notifsNL.length} novas)`}
                  </span>
                  {(!user?.notificacoes || user.notificacoes.length === 0) ? (
                    <div className="notif-empty">
                      <p style={{fontSize:'2rem',marginBottom:10}}>🔔</p>
                      <p>Nenhuma notificação.</p>
                      {isFuncMapa && <p style={{marginTop:8,fontSize:'.75rem'}}>Você receberá um aviso aqui quando for alocado(a) em uma zona.</p>}
                    </div>
                  ) : (
                    user.notificacoes.map(n => (
                      <div key={n.id} className={`notif-item${!n.lida?' notif-item--nova':''}`} onClick={() => marcarNotifLida(n.id)}>
                        <div className="notif-item__top">
                          <p className="notif-item__title">{n.titulo}</p>
                          <div style={{display:'flex',alignItems:'center',gap:5,flexShrink:0}}>
                            <span className="notif-item__hora">{n.data}</span>
                            {!n.lida && <span className="notif-item__nova-badge"/>}
                          </div>
                        </div>
                        <p className="notif-item__text">{n.texto}</p>
                        {!n.lida && <p style={{fontSize:'.65rem',color:'rgba(155,143,255,.5)',marginTop:6,fontFamily:"'Anonymous Pro',monospace"}}>Clique para marcar como lida</p>}
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Toast de alocação */}
      {toast && <div className="aloc-toast">{toast}</div>}
    </>
  );
}
