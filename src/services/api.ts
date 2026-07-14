const API_BASE_URL = 'http://localhost:3001/api';

export const apiClient = {
  // Autenticación de Usuarios Financieros
  auth: {
    register: async (nombre: string, email: string, password: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password })
      });
      return response.json();
    },

    login: async (email: string, password: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return response.json();
    },

    getProfile: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.json();
    }
  },

  // Simulador de Tasas y Productos Financieros
  simulador: {
    // Obtener tasas comparativas (TREA, TEA) de bancos regulados por la SBS
    getRates: async (tipoProducto: 'ahorro' | 'deposito_plazo', monto: number, plazoDias?: number) => {
      const response = await fetch(`${API_BASE_URL}/rates?type=${tipoProducto}&amount=${monto}${plazoDias ? `&days=${plazoDias}` : ''}`, {
        method: 'GET',
      });
      return response.json();
    },

    // Guardar el resultado de una simulación en el historial del usuario
    saveSimulation: async (data: { producto: string; banco: string; trea: number; gananciaEstimada: number; riesgo: string }, token: string) => {
      const response = await fetch(`${API_BASE_URL}/simulations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },

    // Obtener el historial de consultas del usuario
    getHistory: async (userId: string, token: string) => {
      const response = await fetch(`${API_BASE_URL}/simulations/history/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.json();
    },
  },
};

export default apiClient;