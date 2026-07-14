import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContextNew';
import './Navigation.css';

const Navigation: React.FC = () => {
  const { isAuthenticated, logout, user, updateUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleTogglePlan = () => {
    if (!user) return;
    const nextPlan = user.plan === 'ESTUDIANTE' ? 'PRO' : 'ESTUDIANTE';
    updateUser({ plan: nextPlan });
  };

  return (
    <nav className="demo-navigation">
      <div className="demo-nav-content">
        
        {/* Nombre de tu proyecto */}
        <h3 className="demo-nav-title">
           Yupay Finance
        </h3>
        
        {/* Enlaces Financieros del Sprint 1 */}
        <div className="demo-nav-links">
          <Link to="/" className="demo-nav-link">
            <span className="demo-link-icon">🏠</span>
            <span className="demo-link-text">Inicio</span>
          </Link>
          <Link to="/simulador" className="demo-nav-link">
            <span className="demo-link-icon">📊</span>
            <span className="demo-link-text">Simulador</span>
          </Link>
          <Link to="/glosario" className="demo-nav-link">
            <span className="demo-link-icon">📖</span>
            <span className="demo-link-text">Glosario</span>
          </Link>
          <Link to="/suscripcion" className="demo-nav-link">
            <span className="demo-link-icon">💎</span>
            <span className="demo-link-text">Planes</span>
          </Link>
          
          {isAuthenticated && user && (
            <button 
              onClick={handleTogglePlan} 
              className="demo-nav-link"
              style={{
                border: '1px solid rgba(139, 92, 246, 0.4)',
                background: 'rgba(139, 92, 246, 0.15)',
              }}
            >
              <span className="demo-link-icon">🛠️</span>
              <span className="demo-link-text" style={{ color: user.plan === 'PRO' ? '#FFDF00' : '#C084FC', fontWeight: 'bold' }}>
                Plan: {user.plan}
              </span>
            </button>
          )}

          {isAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="demo-nav-link"
            >
              <span className="demo-link-icon">🚪</span>
              <span className="demo-link-text">Salir</span>
            </button>
          ) : (
            <>
              <Link to="/login" className="demo-nav-link">
                <span className="demo-link-icon">🔑</span>
                <span className="demo-link-text">Ingresar</span>
              </Link>
              <Link to="/registro" className="demo-nav-link">
                <span className="demo-link-icon">📝</span>
                <span className="demo-link-text">Registro</span>
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navigation;