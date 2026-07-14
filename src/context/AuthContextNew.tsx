import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, User } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (nombre: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateUser: (partial: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Inicialización síncrona desde localStorage para evitar redirecciones o parpadeos visuales
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        localStorage.removeItem('currentUser');
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });

  const register = async (nombre: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      // El backend recibe: { nombre, email, password }
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || data.error || 'Error en el registro' };
      }

      // Como el registro no retorna token, hacemos login automático inmediatamente para iniciar sesión
      const loginRes = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const loginData = await loginRes.json();

      if (loginRes.ok) {
        const authUser: AuthUser = {
          id: loginData.user.id,
          nombre: loginData.user.username || loginData.user.nombre,
          email: loginData.user.email,
          plan: loginData.user.plan || 'ESTUDIANTE',
        };
        
        setUser(authUser);
        setToken(loginData.token);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(authUser));
        localStorage.setItem('token', loginData.token);
        return { success: true, message: 'Registro e inicio de sesión exitosos' };
      } else {
        return { success: true, message: 'Usuario registrado. Por favor inicia sesión manualmente.' };
      }
    } catch {
      // Fallback a localStorage para mock local cuando el backend no está disponible
      console.warn("Backend no disponible. Usando fallback de localStorage.");

      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const exists = users.some(u => u.email === email);
      if (exists) {
        return { success: false, message: 'El usuario o correo ya existe.' };
      }

      const newUser: User = {
        id: Date.now().toString(),
        nombre,
        email,
        password,
        plan: 'ESTUDIANTE',
        fechaRegistro: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      const authUser: AuthUser = {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
        plan: newUser.plan,
      };

      setUser(authUser);
      setToken('mock-jwt-token');
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(authUser));
      localStorage.setItem('token', 'mock-jwt-token');

      return { success: true, message: 'Registro exitoso (Mock Local)' };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || data.error || 'Credenciales incorrectas' };
      }

      const authUser: AuthUser = {
        id: data.user.id,
        nombre: data.user.username || data.user.nombre,
        email: data.user.email,
        plan: data.user.plan || 'ESTUDIANTE',
      };
      
      setUser(authUser);
      setToken(data.token);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(authUser));
      localStorage.setItem('token', data.token);
      return { success: true, message: 'Inicio de sesión exitoso' };
    } catch {
      // Fallback a localStorage para mock local cuando el backend no está disponible
      console.warn("Backend no disponible. Usando fallback de localStorage.");

      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        return { success: false, message: 'Credenciales incorrectas. Verifica tu correo y contraseña.' };
      }

      const authUser: AuthUser = {
        id: foundUser.id,
        nombre: foundUser.nombre,
        email: foundUser.email,
        plan: foundUser.plan || 'ESTUDIANTE',
      };

      setUser(authUser);
      setToken('mock-jwt-token');
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(authUser));
      localStorage.setItem('token', 'mock-jwt-token');

      return { success: true, message: 'Inicio de sesión exitoso (Mock Local)' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  };

  const refreshUser = async () => {
    if (!user || !token) return;
    try {
      const res = await fetch('http://localhost:3001/api/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.ok) {
        const updated: AuthUser = {
          id: user.id,
          nombre: data.username || data.nombre || user.nombre,
          email: data.email || user.email,
          plan: data.plan || user.plan,
        };
        setUser(updated);
        localStorage.setItem('currentUser', JSON.stringify(updated));
      }
    } catch {
      // Ignorar errores de recarga silenciosamente
    }
  };

  const updateUser = (partial: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...partial };
      localStorage.setItem('currentUser', JSON.stringify(updated));
      return updated;
    });
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};