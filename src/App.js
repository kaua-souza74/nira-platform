import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Páginas públicas
import HomePage             from './pages/HomePage';
import ComoFuncionaPage     from './pages/ComoFuncionaPage';
import ConteudosPage        from './pages/ConteudosPage';
import TriagemPage          from './pages/TriagemPage';
import LoginPage            from './pages/LoginPage';

// Páginas protegidas
import AdminPage            from './pages/AdminPage';
import ConteudosAdmPage     from './pages/ConteudosAdmPage';
import GerenciarUsuariosPage from './pages/GerenciarUsuariosPage';
import MapaFuncionarioPage  from './pages/MapaFuncionarioPage';
import ChatPsicologoPage    from './pages/ChatPsicologoPage';

// Placeholder simples para /sobre
function SobrePage() {
  return (
    <div style={{ minHeight:'100vh', background:'#12111F', display:'flex', alignItems:'center', justifyContent:'center', paddingTop:80 }}>
      <div style={{ textAlign:'center', color:'rgba(239,238,234,.5)' }}>
        <div style={{ fontSize:'3rem', marginBottom:16 }}>🦉</div>
        <h2 style={{ fontSize:'1.4rem', color:'#F4F6F8', marginBottom:10, fontFamily:"'Poppins',sans-serif" }}>Sobre a NIRA</h2>
        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:'.9rem' }}>Página em construção — Sprint 2</p>
      </div>
    </div>
  );
}

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
          <Route path="/sobre"         element={<SobrePage />} />

          {/* ADM */}
          <Route path="/admin" element={<PrivateRoute roles={['adm']}><AdminPage /></PrivateRoute>} />
          <Route path="/admin/usuarios" element={<PrivateRoute roles={['adm']}><GerenciarUsuariosPage /></PrivateRoute>} />

          {/* ADM + ONG */}
          <Route path="/admin/conteudos" element={<PrivateRoute roles={['adm','ong']}><ConteudosAdmPage /></PrivateRoute>} />

          {/* ADM + Funcionário */}
          <Route path="/mapa" element={<PrivateRoute roles={['adm','funcionario']}><MapaFuncionarioPage /></PrivateRoute>} />

          {/* Chat de atendimento — ADM + Funcionário + ONG */}
          <Route path="/chat-psicologo" element={<PrivateRoute roles={['adm','funcionario','ong']}><ChatPsicologoPage /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
