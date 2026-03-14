import React, { createContext, useContext, useState, useCallback } from 'react';

/* ══════════════════════════════════════════════════════════════
   ESPECIALIDADES
   psicologo / assistente_social → acessa chat
   policial / agente             → acessa mapa
══════════════════════════════════════════════════════════════ */
export const ESPECIALIDADES = [
  { value: 'psicologo',          label: 'Psicólogo(a)',         icon: '🧠', acesso: 'chat' },
  { value: 'assistente_social',  label: 'Assistente Social',    icon: '🤝', acesso: 'chat' },
  { value: 'policial',           label: 'Policial / Segurança', icon: '👮', acesso: 'mapa' },
  { value: 'agente',             label: 'Agente de Campo',      icon: '🚗', acesso: 'mapa' },
];

export const ESPEC_CHAT = ['psicologo', 'assistente_social'];
export const ESPEC_MAPA = ['policial', 'agente'];

/* ══════════════════════════════════════════════════════════════
   VÍNCULOS INSTITUCIONAIS — onde cada profissional trabalha
   'nira'       → profissional da equipe NIRA
   'autonomo'   → trabalha por conta própria
   'ong:ID'     → vinculado a uma ONG específica (ex: 'ong:2')
══════════════════════════════════════════════════════════════ */
export const VINCULOS = [
  { value: 'nira',     label: 'Equipe NIRA',            icon: '🦉' },
  { value: 'autonomo', label: 'Profissional Autônomo(a)', icon: '🏷️' },
];

/* ══════════════════════════════════════════════════════════════
   USUÁRIOS MOCK
   Em produção esses dados virão do backend PHP.
   Campos novos:
     vinculo      → 'nira' | 'autonomo' | 'ong:ID'
     ongId        → ID da ONG que criou este usuário (se aplicável)
     notificacoes → array de notificações não lidas
     lat/lng      → posição no mapa (preenchida ao alocar)
══════════════════════════════════════════════════════════════ */
const USUARIOS_INIT = [
  {
    id: 1, usuario: 'admin', senha: 'nira2026',
    role: 'adm', nome: 'Administrador',
    area: null, especialidade: null, vinculo: 'nira', ongId: null,
    ativo: true, lat: null, lng: null, notificacoes: [],
  },
  {
    id: 2, usuario: 'ong_vida', senha: 'ong123',
    role: 'ong', nome: 'ONG Vida Nova',
    area: null, especialidade: null, vinculo: null, ongId: null,
    ativo: true, lat: null, lng: null, notificacoes: [],
  },
  {
    id: 7, usuario: 'ong_renascer', senha: 'ren123',
    role: 'ong', nome: 'Centro Renascer',
    area: null, especialidade: null, vinculo: null, ongId: null,
    ativo: true, lat: null, lng: null, notificacoes: [],
  },
  {
    id: 3, usuario: 'psicologa01', senha: 'chat123',
    role: 'funcionario', nome: 'Dra. Ana Lima',
    area: 'Sul', especialidade: 'psicologo', vinculo: 'ong:2', ongId: 2,
    ativo: true, lat: -23.205, lng: -45.875, notificacoes: [],
  },
  {
    id: 8, usuario: 'psicologa02', senha: 'psi456',
    role: 'funcionario', nome: 'Dra. Carla Matos',
    area: null, especialidade: 'psicologo', vinculo: 'autonomo', ongId: null,
    ativo: true, lat: null, lng: null, notificacoes: [],
  },
  {
    id: 9, usuario: 'social02', senha: 'soc789',
    role: 'funcionario', nome: 'Rafael Souza',
    area: null, especialidade: 'assistente_social', vinculo: 'nira', ongId: null,
    ativo: true, lat: null, lng: null, notificacoes: [],
  },
  {
    id: 4, usuario: 'policial01', senha: 'mapa123',
    role: 'funcionario', nome: 'Carlos Silva',
    area: null, especialidade: 'policial', vinculo: 'nira', ongId: null,
    ativo: false, lat: null, lng: null, notificacoes: [],
  },
  {
    id: 5, usuario: 'agente01', senha: 'agente123',
    role: 'funcionario', nome: 'Pedro Souza',
    area: 'Norte', especialidade: 'agente', vinculo: 'nira', ongId: null,
    ativo: true, lat: -23.105, lng: -45.895, notificacoes: [],
  },
  {
    id: 6, usuario: 'social01', senha: 'social123',
    role: 'funcionario', nome: 'Maria Costa',
    area: null, especialidade: 'assistente_social', vinculo: 'ong:7', ongId: 7,
    ativo: true, lat: null, lng: null, notificacoes: [],
  },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,      setUser]      = useState(null);
  const [erro,      setErro]      = useState('');
  /* Estado global de usuários — compartilhado entre páginas */
  const [usuarios,  setUsuarios]  = useState(USUARIOS_INIT);

  /* ── Login ── */
  function login(usuario, senha) {
    const encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha && u.ativo !== false);
    if (encontrado) {
      setUser(encontrado);
      setErro('');
      return { ok: true, role: encontrado.role };
    }
    setErro('Usuário ou senha incorretos.');
    return { ok: false };
  }

  function logout() { setUser(null); }

  /* ── Adicionar novo usuário (ADM ou ONG) ── */
  const adicionarUsuario = useCallback((novoUser) => {
    const id = Date.now();
    const completo = { ...novoUser, id, notificacoes: [], lat: null, lng: null };
    setUsuarios(prev => [...prev, completo]);
    return completo;
  }, []);

  /* ── Alocar funcionário no mapa ── */
  const alocarFuncionario = useCallback((funcId, zona, lat, lng) => {
    const notif = {
      id: Date.now(),
      tipo: 'alocacao',
      titulo: '📍 Nova alocação recebida',
      texto: `Você foi alocado(a) na zona ${zona}. Acesse o mapa para ver detalhes da área.`,
      data: new Date().toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' }),
      lida: false,
    };
    setUsuarios(prev => prev.map(u =>
      u.id === funcId
        ? { ...u, area: zona, ativo: true, lat, lng, notificacoes: [notif, ...u.notificacoes] }
        : u
    ));
    // Atualiza o user logado se for ele mesmo sendo alocado
    setUser(prev => prev?.id === funcId
      ? { ...prev, area: zona, ativo: true, lat, lng, notificacoes: [notif, ...prev.notificacoes] }
      : prev
    );
  }, []);

  /* ── Marcar notificação como lida ── */
  const marcarNotifLida = useCallback((notifId) => {
    setUsuarios(prev => prev.map(u =>
      u.id === user?.id
        ? { ...u, notificacoes: u.notificacoes.map(n => n.id === notifId ? { ...n, lida: true } : n) }
        : u
    ));
    setUser(prev => prev
      ? { ...prev, notificacoes: prev.notificacoes.map(n => n.id === notifId ? { ...n, lida: true } : n) }
      : prev
    );
  }, [user?.id]);

  /* ── Toggle ativo/inativo ── */
  const toggleAtivo = useCallback((id) => {
    setUsuarios(prev => prev.map(u => u.id === id ? { ...u, ativo: !u.ativo } : u));
  }, []);

  /* ── Remover usuário ── */
  const removerUsuario = useCallback((id) => {
    setUsuarios(prev => prev.filter(u => u.id !== id));
  }, []);

  /* ── Getters úteis ── */
  function getONGs() { return usuarios.filter(u => u.role === 'ong'); }
  function getFuncionarios() { return usuarios.filter(u => u.role === 'funcionario'); }
  function getMeusFuncionarios() {
    if (!user) return [];
    if (user.role === 'adm') return getFuncionarios();
    if (user.role === 'ong') return usuarios.filter(u => u.ongId === user.id);
    return [];
  }

  /* ── Label de vínculo ── */
  function getVinculoLabel(vinculo, ongId) {
    if (!vinculo) return '—';
    if (vinculo === 'nira')     return '🦉 Equipe NIRA';
    if (vinculo === 'autonomo') return '🏷️ Autônomo(a)';
    if (vinculo?.startsWith('ong:')) {
      const ong = usuarios.find(u => u.id === ongId);
      return `🤝 ${ong?.nome || 'ONG'}`;
    }
    return vinculo;
  }

  /* ── Notificações não lidas do user logado ── */
  function getNotifsNaoLidas() {
    return user?.notificacoes?.filter(n => !n.lida) || [];
  }

  /* ── navLabel / navDestino ── */
  function navLabel() {
    if (!user) return null;
    if (user.role === 'adm') return 'ADM';
    if (user.role === 'ong') return 'ONG';
    if (user.role === 'funcionario') {
      const esp = ESPECIALIDADES.find(e => e.value === user.especialidade);
      return esp ? `${esp.icon} ${esp.label.split(' ')[0]}` : 'Chat';
    }
    return null;
  }

  function navDestino() {
    if (!user) return '/login';
    if (user.role === 'adm') return '/admin';
    if (user.role === 'ong') return '/ong/usuarios';
    if (user.role === 'funcionario') {
      if (ESPEC_CHAT.includes(user.especialidade)) return '/chat-psicologo';
      if (ESPEC_MAPA.includes(user.especialidade)) return '/mapa';
    }
    return '/';
  }

  function temAcesso(tipo) {
    if (!user) return false;
    if (user.role === 'adm') return true;
    if (tipo === 'chat') return user.role === 'ong' || ESPEC_CHAT.includes(user.especialidade);
    if (tipo === 'mapa') return ESPEC_MAPA.includes(user.especialidade);
    return false;
  }

  return (
    <AuthContext.Provider value={{
      user, erro, usuarios,
      login, logout,
      adicionarUsuario, toggleAtivo, removerUsuario,
      alocarFuncionario, marcarNotifLida,
      getONGs, getFuncionarios, getMeusFuncionarios, getVinculoLabel, getNotifsNaoLidas,
      navLabel, navDestino, temAcesso,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
