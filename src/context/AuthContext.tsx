import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, User } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (nombre: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
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

const getStoredUsers = (): User[] => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
      setIsAuthenticated(true);
    }
  }, []);

  const register = async (nombre: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    const users = getStoredUsers();
    
    const existingEmail = users.find(u => u.email === email);
    if (existingEmail) {
      return { success: false, message: 'Este correo electrónico ya está registrado' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      nombre,
      email,
      password,
      plan: 'ESTUDIANTE', // Asignado por defecto para US01
      fechaRegistro: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const authUser: AuthUser = {
      id: newUser.id,
      nombre: newUser.nombre,
      email: newUser.email,
      plan: newUser.plan
    };

    localStorage.setItem('currentUser', JSON.stringify(authUser));
    setUser(authUser);
    setIsAuthenticated(true);

    return { success: true, message: 'Registro exitoso' };
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    const users = getStoredUsers();
    
    // Permitir loguearse usando el email
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      return { success: false, message: 'Credenciales incorrectas' };
    }

    const authUser: AuthUser = {
      id: foundUser.id,
      nombre: foundUser.nombre,
      email: foundUser.email,
      plan: foundUser.plan || 'ESTUDIANTE'
    };

    localStorage.setItem('currentUser', JSON.stringify(authUser));
    setUser(authUser);
    setIsAuthenticated(true);

    return { success: true, message: 'Inicio de sesión exitoso' };
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};