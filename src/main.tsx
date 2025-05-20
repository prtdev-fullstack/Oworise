import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CalculationProvider } from './contexts/CalculationContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CalculationProvider>
          <App />
        </CalculationProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);