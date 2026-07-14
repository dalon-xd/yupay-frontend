// Lo mínimo necesario para que el usuario funcione en Yupay Finance (localStorage / mocks)
export interface User {
  id: string;
  nombre: string;
  email: string;
  password?: string;
  plan: 'ESTUDIANTE' | 'PRO'; // Tipado estricto para el plan del usuario
  fechaRegistro?: string;
}

// Lo mínimo necesario para mantener la sesión activa
export interface AuthUser {
  id: string;
  nombre: string;
  email: string;
  plan: 'ESTUDIANTE' | 'PRO'; // Tipado estricto para el plan del usuario
}

// Interfaz para la entidad de usuario alineada con el backend
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  plan: 'ESTUDIANTE' | 'PRO'; // Tipado estricto para el plan del usuario
  fechaRegistro?: string;
}

// Representa a una entidad financiera en el backend
export interface EntidadFinanciera {
  id: string;
  name: string;
  logoUrl: string;
  type: 'BANCO' | 'CAJA_MUNICIPAL' | 'FINANCIERA';
}

// Representa a una tasa financiera devuelta por el backend
export interface TasaFinanciera {
  id: string;
  entityId: string;
  rateValue: number; // TEA/TREA en decimal (ej: 0.0525 para 5.25%)
  productType: 'AHORRO' | 'PLAZO_FIJO';
  currency: 'PEN' | 'USD';
  minTerm: number;
  region: string;
  entity: EntidadFinanciera | null;
  
  // Nuevos campos expuestos por el motor de riesgo del backend
  riskTrafficLight: 'VERDE' | 'AMARILLO' | 'ROJO';
  fsdIsActive: boolean;
  sbsClassification: string;
}

// Modelo final para los resultados del simulador financiero expuestos en la tabla de la interfaz de usuario
export interface ResultadoSimulacion {
  id: string;
  nombre: string;
  tasa: number; // Tasa en porcentaje (ej: 5.25)
  fsd: boolean; // Mantener por compatibilidad con UI actual
  billetera: string;
  minimo: number;
  bancaInternet: string;
  riesgo: 'Verde' | 'Amarillo' | 'Rojo'; // Mantener por compatibilidad con UI actual
  departamento: string;
  interesesTotales: string;
  interesesMensuales: string;
  tasaId: string;
  entidadId: string;
  logoUrl: string;

  // Nuevas propiedades disponibles del motor de riesgo y suscripciones
  riskTrafficLight: 'VERDE' | 'AMARILLO' | 'ROJO';
  fsdIsActive: boolean;
  sbsClassification: string;
}
