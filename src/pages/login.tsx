import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Link from '@mui/joy/Link';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import CustomButton from '../components/button';
import InputField from '../components/input_field';
import { useAuth } from '../context/AuthContextNew';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }
    const result = await login(email, password);
    if (result.success) {
      setError('');
      navigate('/simulador'); // Te manda directo al simulador financiero
    } else {
      setError(result.message);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#030305',
        position: 'relative',
        px: 2,
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Luces de Fondo Atmosféricas (Neon Glows) */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(127, 0, 255, 0.06) 0%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Brand Header */}
      <Stack
        component={RouterLink}
        to="/"
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          position: 'absolute',
          top: 24,
          left: 30,
          textDecoration: 'none',
          zIndex: 10,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logo-grad-1)" />
          <path d="M2 17L12 22L22 17" stroke="url(#logo-grad-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="url(#logo-grad-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="logo-grad-1" x1="2" y1="7" x2="22" y2="7" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00F2FE" />
              <stop offset="100%" stopColor="#4FACFE" />
            </linearGradient>
            <linearGradient id="logo-grad-2" x1="2" y1="17" x2="22" y2="17" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4FACFE" />
              <stop offset="100%" stopColor="#7F00FF" />
            </linearGradient>
          </defs>
        </svg>
        <Typography
          level="h4"
          sx={{
            fontWeight: 800,
            letterSpacing: '0.5px',
            background: 'linear-gradient(90deg, #00F2FE 0%, #7F00FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Yupay Finance
        </Typography>
      </Stack>

      {/* Glassmorphic Form Card */}
      <Box
        component="form"
        onSubmit={handleLoginSubmit}
        sx={{
          width: '100%',
          maxWidth: 420,
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
          p: 5,
          zIndex: 1,
          '& label': {
            color: 'rgba(255, 255, 255, 0.7) !important',
            fontSize: '0.85rem',
            fontWeight: 600,
            mb: 0.5,
          },
          '& .MuiInput-root': {
            color: '#FFFFFF !important',
            backgroundColor: 'rgba(255, 255, 255, 0.04) !important',
            borderColor: 'rgba(255, 255, 255, 0.08) !important',
            borderRadius: '12px',
            fontSize: '0.95rem',
            '&:focus-within': {
              borderColor: '#00F2FE !important',
              boxShadow: '0 0 0 3px rgba(0, 242, 254, 0.25) !important',
            },
          },
          '& input': {
            color: '#FFFFFF !important',
          },
          '& button': {
            background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
            color: '#000000',
            fontWeight: 700,
            borderRadius: '30px',
            mt: 2,
            py: 1.5,
            fontSize: '1rem',
            boxShadow: '0 4px 14px rgba(0, 242, 254, 0.3)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0, 242, 254, 0.5)',
              background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
            },
            '&:disabled': {
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
        }}
      >
        <Stack direction="column" spacing={3} sx={{ width: '100%' }}>
          <Typography
            level="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
            }}
          >
            Bienvenido
          </Typography>

          <InputField
            labelText="Correo electrónico"
            placeholder="Ingresa tu correo"
            name="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />

          <InputField
            labelText="Contraseña"
            placeholder="Ingresa tu contraseña"
            isPassword
            name="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          {error && (
            <Typography
              level="body-sm"
              sx={{
                color: '#FF4A4A',
                textAlign: 'center',
                fontWeight: 500,
                backgroundColor: 'rgba(255, 74, 74, 0.05)',
                py: 1,
                borderRadius: '8px',
                border: '1px solid rgba(255, 74, 74, 0.15)',
              }}
            >
              {error}
            </Typography>
          )}

          <CustomButton buttonText="Iniciar sesión" type="submit" className="neon-button" />

          <Typography sx={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
            ¿No tienes una cuenta?{' '}
            <Link
              component={RouterLink}
              to="/registro"
              sx={{
                color: '#00F2FE',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { color: '#4FACFE', textDecoration: 'underline' },
              }}
            >
              Regístrate aquí
            </Link>
          </Typography>

          <Link
            sx={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '0.85rem',
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': { color: '#FFFFFF' },
            }}
          >
            Recuperar Contraseña
          </Link>

          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', my: 1 }} />

          <Stack direction="row" spacing={3} sx={{ justifyContent: 'center' }}>
            <Link
              component={RouterLink}
              to="/glosario"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.85rem',
                textDecoration: 'none',
                '&:hover': { color: '#00F2FE' },
              }}
            >
              Glosario
            </Link>
            <Link
              component={RouterLink}
              to="/suscripcion"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.85rem',
                textDecoration: 'none',
                '&:hover': { color: '#00F2FE' },
              }}
            >
              Planes
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;