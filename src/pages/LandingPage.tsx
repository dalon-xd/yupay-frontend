import React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Grid from '@mui/joy/Grid';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Container from '@mui/joy/Container';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import { Link as RouterLink } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#030305',
        color: '#FFFFFF',
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Luces de Fondo Atmosféricas (Neon Glows) */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: { xs: '200px', md: '500px' },
          height: { xs: '200px', md: '500px' },
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '5%',
          width: { xs: '200px', md: '500px' },
          height: { xs: '200px', md: '500px' },
          background: 'radial-gradient(circle, rgba(127, 0, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '20%',
          width: { xs: '200px', md: '500px' },
          height: { xs: '200px', md: '500px' },
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* 1. BARRA DE NAVEGACIÓN (Navbar Premium) */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(3, 3, 5, 0.75)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          transition: 'all 0.3s ease',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Logotipo */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Icono Logo SVG */}
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

          {/* Enlaces de navegación internos */}
          <Stack
            direction="row"
            spacing={4}
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Link
              href="#inicio"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                transition: 'color 0.2s',
                '&:hover': { color: '#00F2FE' },
              }}
            >
              Inicio
            </Link>
            <Link
              href="#caracteristicas"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                transition: 'color 0.2s',
                '&:hover': { color: '#00F2FE' },
              }}
            >
              Características
            </Link>
            <Link
              href="#planes"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                transition: 'color 0.2s',
                '&:hover': { color: '#00F2FE' },
              }}
            >
              Planes
            </Link>
          </Stack>

          {/* Botones de acción */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              component={RouterLink}
              to="/login"
              variant="plain"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'color 0.2s',
                '&:hover': {
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              Iniciar Sesión
            </Button>
            <Button
              component={RouterLink}
              to="/registro"
              sx={{
                background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
                color: '#000000',
                fontWeight: 700,
                borderRadius: '30px',
                px: 3,
                fontSize: '0.95rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 14px rgba(0, 242, 254, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0, 242, 254, 0.5)',
                  background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
                },
              }}
            >
              Registrarse
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* 2. SECCIÓN HERO (Presentación de Impacto) */}
      <Container
        id="inicio"
        maxWidth="lg"
        sx={{
          pt: { xs: 8, md: 14 },
          pb: { xs: 8, md: 12 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Stack spacing={4} alignItems="center" sx={{ textAlign: 'center', maxWidth: '850px', mx: 'auto' }}>
          <Chip
            variant="outlined"
            size="md"
            sx={{
              color: '#00F2FE',
              borderColor: 'rgba(0, 242, 254, 0.3)',
              backgroundColor: 'rgba(0, 242, 254, 0.04)',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              backdropFilter: 'blur(5px)',
            }}
          >
            💻 Soluciones de Kallpa Tech
          </Chip>
          
          <Typography
            level="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.8rem' },
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              color: '#FFFFFF',
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
            }}
          >
            Toma el control de tus ahorros con{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #00F2FE 0%, #7F00FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              transparencia
            </span>
          </Typography>

          <Typography
            level="body-lg"
            sx={{
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: { xs: '1.05rem', md: '1.25rem' },
              lineHeight: 1.6,
              fontWeight: 400,
              px: { xs: 0, md: 4 },
            }}
          >
            Desarrollamos soluciones tecnológicas e intuitivas para promover la inclusión y la educación financiera en el Perú. Te ayudamos a tomar decisiones económicas estratégicas mediante un análisis simplificado y transparente del mercado financiero regulado por la SBS.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: '100%', justifyContent: 'center', pt: 2 }}>
            <Button
              component={RouterLink}
              to="/registro"
              size="lg"
              sx={{
                background: 'linear-gradient(135deg, #00F2FE 0%, #7F00FF 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                borderRadius: '30px',
                px: 4,
                py: 1.5,
                fontSize: '1.05rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 8px 25px rgba(127, 0, 255, 0.25)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 30px rgba(127, 0, 255, 0.45)',
                  background: 'linear-gradient(135deg, #00F2FE 0%, #7F00FF 100%)',
                },
              }}
            >
              Comenzar Ahora
            </Button>
            <Button
              component={RouterLink}
              to="/registro"
              variant="outlined"
              size="lg"
              sx={{
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '30px',
                px: 4,
                py: 1.5,
                fontSize: '1.05rem',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              Simulador Gratuito
            </Button>
          </Stack>
        </Stack>
      </Container>

      {/* 3. SECCIÓN "LO QUE HACEMOS" (Características Clave) */}
      <Box
        id="caracteristicas"
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
          borderTop: '1px solid rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2} sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              level="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.8rem' },
                fontWeight: 800,
                letterSpacing: '-0.5px',
                color: '#FFFFFF',
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
              }}
            >
              Lo que hacemos
            </Typography>
            <Typography
              level="body-md"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '1.1rem',
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Nuestra propuesta de valor para ayudarte a ganar control sobre tus finanzas frente al mercado tradicional.
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {/* Card 1 */}
            <Grid xs={12} md={4}>
              <Card
                className="floating-card"
                sx={{
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '24px',
                  p: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: 'rgba(0, 242, 254, 0.3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: '0 12px 30px rgba(0, 242, 254, 0.1)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(0, 114, 255, 0.15) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      border: '1px solid rgba(0, 242, 254, 0.25)',
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00F2FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  </Box>
                  <Typography level="h3" sx={{ color: '#FFFFFF', fontSize: '1.4rem', fontWeight: 700, mb: 1.5 }}>
                    Simulador Transaccional Real
                  </Typography>
                  <Typography level="body-sm" sx={{ color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    Conexión en tiempo real con bases de datos dinámicas en la nube (Supabase) superando las maquetas estáticas tradicionales del mercado.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Card 2 */}
            <Grid xs={12} md={4}>
              <Card
                className="floating-card"
                sx={{
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '24px',
                  p: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: 'rgba(127, 0, 255, 0.3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: '0 12px 30px rgba(127, 0, 255, 0.1)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(127, 0, 255, 0.15) 0%, rgba(255, 0, 127, 0.15) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      border: '1px solid rgba(127, 0, 255, 0.25)',
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7F00FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </Box>
                  <Typography level="h3" sx={{ color: '#FFFFFF', fontSize: '1.4rem', fontWeight: 700, mb: 1.5 }}>
                    Auditoría de Riesgo SBS
                  </Typography>
                  <Typography level="body-sm" sx={{ color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    Sistema de semáforos visuales automatizados que clasifican de forma clara la solvencia y solidez de las entidades financieras reguladas por la SBS.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Card 3 */}
            <Grid xs={12} md={4}>
              <Card
                className="floating-card"
                sx={{
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '24px',
                  p: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: 'rgba(0, 242, 254, 0.3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: '0 12px 30px rgba(0, 242, 254, 0.1)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(127, 0, 255, 0.15) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      border: '1px solid rgba(0, 242, 254, 0.25)',
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00F2FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </Box>
                  <Typography level="h3" sx={{ color: '#FFFFFF', fontSize: '1.4rem', fontWeight: 700, mb: 1.5 }}>
                    Alertas de Seguridad FSD
                  </Typography>
                  <Typography level="body-sm" sx={{ color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    Monitoreo y detección de riesgos que te avisa de manera instantánea si tus ahorros están protegidos o no por el Fondo de Seguro de Depósitos.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 4. SECCIÓN DE PLANES DE SUSCRIPCIÓN */}
      <Container
        id="planes"
        maxWidth="lg"
        sx={{
          py: { xs: 8, md: 12 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Stack spacing={2} sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            level="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.8rem' },
              fontWeight: 800,
              letterSpacing: '-0.5px',
              color: '#FFFFFF',
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
            }}
          >
            Planes de Suscripción
          </Typography>
          <Typography
            level="body-md"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '1.1rem',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Elige el plan ideal para tu estrategia de inversión y empieza a optimizar tus ahorros.
          </Typography>
        </Stack>

        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {/* PLAN ESTUDIANTE */}
          <Grid xs={12} md={5}>
            <Card
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '24px',
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <Box>
                <Typography level="body-xs" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', mb: 1 }}>
                  PLAN BÁSICO
                </Typography>
                <Typography level="h3" sx={{ color: '#FFFFFF', fontSize: '1.8rem', fontWeight: 800, mb: 1 }}>
                  Plan Estudiante
                </Typography>
                <Typography level="body-sm" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 3 }}>
                  Suscripción de precio introductorio o reducido. Incluye acceso al buscador y comparador de tasas, simulador de ganancias simple y el sistema de alertas visuales de riesgo.
                </Typography>
                
                <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb: 4, flexWrap: 'wrap' }}>
                  
                  <Typography 
                    level="h4" 
                    sx={{ 
                      textDecoration: 'line-through', 
                      color: 'rgba(255, 255, 255, 0.4)', 
                      fontWeight: 'normal',
                      fontSize: '1.2rem'
                    }}
                  >
                    S/ 9.90
                  </Typography>

                  <Typography level="h2" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 800 }}>
                    S/ 0.00
                  </Typography>

                  <Typography level="body-sm" sx={{ color: '#00F2FE', fontWeight: 600 }}>
                    / Gratis por la beta
                  </Typography>

                </Stack>

                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', mb: 4 }} />

                <Stack spacing={2} sx={{ mb: 4 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <Typography level="body-sm" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                      Buscador y comparador de tasas
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <Typography level="body-sm" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                      Simulador de ganancias simple
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <Typography level="body-sm" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                      Sistema de alertas visuales de riesgo
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              <Button
                component={RouterLink}
                to="/registro"
                variant="outlined"
                size="lg"
                sx={{
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '30px',
                  width: '100%',
                  mt: 'auto',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#FFFFFF',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                Empezar Gratis
              </Button>
            </Card>
          </Grid>

          {/* PLAN PROFESIONAL (PRO) */}
          <Grid xs={12} md={5}>
            <Card
              sx={{
                backgroundColor: 'rgba(10, 10, 15, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '2px solid #00F2FE',
                borderRadius: '24px',
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: '0 8px 30px rgba(0, 242, 254, 0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 12px 40px rgba(0, 242, 254, 0.25)',
                },
              }}
            >
              {/* Badge Recomendado */}
              <Chip
                size="sm"
                sx={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'linear-gradient(90deg, #00F2FE 0%, #7F00FF 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  border: 'none',
                  px: 2,
                }}
              >
                Recomendado
              </Chip>

              <Box>
                <Typography level="body-xs" sx={{ color: '#00F2FE', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', mb: 1 }}>
                  PLAN AVANZADO
                </Typography>
                <Typography level="h3" sx={{ color: '#FFFFFF', fontSize: '1.8rem', fontWeight: 800, mb: 1 }}>
                  Plan Profesional (PRO)
                </Typography>
                <Typography level="body-sm" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 3 }}>
                  Suscripción de precio estándar. Incluye todo lo del Plan Estudiante, sumando acceso a análisis profundos, reportes de solvencia de entidades específicas de la SBS y alertas de mercado en tiempo real.
                </Typography>

                <Stack direction="row" alignItems="baseline" spacing={0.5} sx={{ mb: 4 }}>
                  <Typography level="h2" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 800 }}>
                    S/ 18.90
                  </Typography>
                  <Typography level="body-sm" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    / mes
                  </Typography>
                </Stack>

                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', mb: 4 }} />

                <Stack spacing={2} sx={{ mb: 4 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <Typography level="body-sm" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                      Todo lo del Plan Básico
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <Typography level="body-sm" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                      Acceso a análisis profundos
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <Typography level="body-sm" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                      Reportes de solvencia de entidades de la SBS
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <Typography level="body-sm" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                      Alertas de mercado en tiempo real
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              <Button
                component={RouterLink}
                to="/suscripcion"
                size="lg"
                sx={{
                  background: 'linear-gradient(135deg, #00F2FE 0%, #7F00FF 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  borderRadius: '30px',
                  width: '100%',
                  mt: 'auto',
                  boxShadow: '0 4px 15px rgba(0, 242, 254, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0, 242, 254, 0.5)',
                    background: 'linear-gradient(135deg, #00F2FE 0%, #7F00FF 100%)',
                  },
                }}
              >
                Obtener Plan PRO
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          py: 6,
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          mt: 8,
          backgroundColor: '#020203',
        }}
      >
        <Container maxWidth="lg">
          <Typography level="body-xs" sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            © {new Date().getFullYear()} Yupay Finance. Desarrollado por Kallpa Tech. Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
