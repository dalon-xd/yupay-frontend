import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContextNew';

test('renders yupay finance landing page', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  
  // Buscar el título oficial "Yupay Finance" en la pantalla de inicio
  const titleElements = screen.getAllByText(/Yupay Finance/i);
  expect(titleElements.length).toBeGreaterThan(0);
});
