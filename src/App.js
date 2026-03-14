import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';

import HomePage              from './pages/HomePage';
import ComoFuncionaPage      from './pages/ComoFuncionaPage';
import ConteudosPage         from './pages/ConteudosPage';
import TriagemPage           from './pages/TriagemPage';
import LoginPage             from './pages/LoginPage';
import SobrePage             from './pages/SobrePage';
import AdminPage             from './pages/AdminPage';
import ConteudosAdmPage      from './pages/ConteudosAdmPage';
import GerenciarUsuariosPage from './pages/GerenciarUsuariosPage';
import MapaFuncionarioPage   from './pages/MapaFuncionarioPage';
import ChatPsicologoPage     from './pages/ChatPsicologoPage';
import OngUsuariosPage       from './pages/OngUsuariosPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Públicas */}
          <Route path="/"              element={<HomePage />} />
          <Route path="/como-funciona" element={<ComoFuncionaPage />} />
          <Route path="/conteudos"     element={<ConteudosPage />} />
          <Route path="/triagem"       element={<TriagemPage />} />
          <Route path="/login"         element={<LoginPage />} />
          <Route path="/sobre"         element={<SobrePage />} />

          {/* ADM */}
          <Route path="/admin"
            element={<PrivateRoute roles={['adm']}><AdminPage /></PrivateRoute>}
          />
          <Route path="/admin/usuarios"
            element={<PrivateRoute roles={['adm']}><GerenciarUsuariosPage /></PrivateRoute>}
          />

          {/* ADM + ONG */}
          <Route path="/admin/conteudos"
            element={<PrivateRoute roles={['adm','ong']}><ConteudosAdmPage /></PrivateRoute>}
          />

          {/* ONG — gerenciar próprios usuários */}
          <Route path="/ong/usuarios"
            element={<PrivateRoute roles={['adm','ong']}><OngUsuariosPage /></PrivateRoute>}
          />

          {/* Mapa — ADM + policial + agente */}
          <Route path="/mapa"
            element={<PrivateRoute roles={['adm','funcionario']} acesso="mapa"><MapaFuncionarioPage /></PrivateRoute>}
          />

          {/* Chat — ADM + ONG + psicólogo + assist. social */}
          <Route path="/chat-psicologo"
            element={<PrivateRoute roles={['adm','ong','funcionario']} acesso="chat"><ChatPsicologoPage /></PrivateRoute>}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
