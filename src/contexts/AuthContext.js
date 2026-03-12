import React, { createContext, useContext, useState } from 'react';

// Usuários mock (em produção virão do backend PHP)
const USUARIOS_MOCK = [
  { id: 1, usuario: 'admin',      senha: 'nira2026', role: 'adm',         nome: 'Administrador',   area: null },
  { id: 2, usuario: 'ong_vida',   senha: 'ong123',   role: 'ong',         nome: 'ONG Vida Nova',   area: null },
  { id: 3, usuario: 'agente01',   senha: 'chat123',  role: 'funcionario', nome: 'Carlos Silva',    area: 'Sul' },
  { id: 4, usuario: 'agente02',   senha: 'chat456',  role: 'funcionario', nome: 'Ana Pereira',     area: null },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [erro, setErro] = useState('');

  function login(usuario, senha) {
    const encontrado = USUARIOS_MOCK.find(
      u => u.usuario === usuario && u.senha === senha
    );
    if (encontrado) {
      setUser(encontrado);
      setErro('');
      return { ok: true, role: encontrado.role };
    } else {
      setErro('Usuário ou senha incorretos.');
      return { ok: false };
    }
  }

  function logout() {
    setUser(null);
  }

  // Label que aparece na Navbar depois do login
  function navLabel() {
    if (!user) return null;
    if (user.role === 'adm')         return 'ADM';
    if (user.role === 'ong')         return 'ONG';
    if (user.role === 'funcionario') return 'Chat';
    return null;
  }

  // Destino do botão de role na Navbar
  function navDestino() {
    if (!user) return '/login';
    if (user.role === 'adm')         return '/admin';
    if (user.role === 'ong')         return '/admin/conteudos';
    if (user.role === 'funcionario') return '/mapa';
    return '/';
  }

  return (
    <AuthContext.Provider value={{ user, erro, login, logout, navLabel, navDestino }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
