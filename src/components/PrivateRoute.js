import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, ESPEC_CHAT, ESPEC_MAPA } from '../contexts/AuthContext';

/**
 * Props:
 *  roles        → array de roles permitidos (ex: ['adm', 'funcionario'])
 *  acesso       → 'chat' | 'mapa' — filtra por especialidade dentro do role funcionario
 *                 'chat' → só psicologo / assistente_social / ong / adm
 *                 'mapa' → só policial / agente / adm
 */
export default function PrivateRoute({ children, roles, acesso }) {
  const { user } = useAuth();

  // Não logado → redireciona para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Verifica role básico
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Verifica acesso por especialidade (para funcionários)
  if (acesso && user.role === 'funcionario') {
    if (acesso === 'chat' && !ESPEC_CHAT.includes(user.especialidade)) {
      // Policial/agente tentando acessar o chat → redireciona para o mapa
      return <Navigate to="/mapa" replace />;
    }
    if (acesso === 'mapa' && !ESPEC_MAPA.includes(user.especialidade)) {
      // Psicólogo tentando acessar o mapa de campo → redireciona para o chat
      return <Navigate to="/chat-psicologo" replace />;
    }
  }

  return children;
}
