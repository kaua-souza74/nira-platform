import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Páginas públicas
import HomePage        from './pages/HomePage';
import ComoFuncionaPage from './pages/ComoFuncionaPage';
import ConteudosPage   from './pages/ConteudosPage';
import TriagemPage     from './pages/TriagemPage';
import LoginPage       from './pages/LoginPage';

// Páginas protegidas
import AdminPage           from './pages/AdminPage';
import ConteudosAdmPage    from './pages/ConteudosAdmPage';
import GerenciarUsuariosPage from './pages/GerenciarUsuariosPage';
import MapaFuncionarioPage from './pages/MapaFuncionarioPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Públicas */}
          <Route path="/"              element={<HomePage />} />
          <Route path="/como-funciona" element={<ComoFuncionaPage />} />
          <Route path="/conteudos"     element={<ConteudosPage />} />
          <Route path="/triagem"       element={<TriagemPage />} />
          <Route path="/login"         element={<LoginPage />} />

          {/* ADM */}
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={['adm']}>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <PrivateRoute roles={['adm']}>
                <GerenciarUsuariosPage />
              </PrivateRoute>
            }
          />

          {/* ADM + ONG */}
          <Route
            path="/admin/conteudos"
            element={
              <PrivateRoute roles={['adm', 'ong']}>
                <ConteudosAdmPage />
              </PrivateRoute>
            }
          />

          {/* Funcionário */}
          <Route
            path="/mapa"
            element={
              <PrivateRoute roles={['adm', 'funcionario']}>
                <MapaFuncionarioPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
