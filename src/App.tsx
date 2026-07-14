import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Login from './pages/login'; 
import Registro from './pages/registro';
import Simulator from './pages/simulador';
import Glossary from './pages/glosario';
import Subscriptions from './pages/suscripcion';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/simulador" element={<ProtectedRoute><Simulator /></ProtectedRoute>} />
        <Route path="/glosario" element={<Glossary />} />
        <Route path="/suscripcion" element={<Subscriptions />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;