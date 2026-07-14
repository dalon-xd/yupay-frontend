import React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import { Link as RouterLink } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Box
      className="animated-bg"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        color: 'white',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography level="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 'bold', mb: 1 }}>
        Yupay Finance
      </Typography>
      <Typography level="h4" sx={{ fontSize: { xs: '1rem', md: '1.5rem' }, mb: 4 }}>
        Simplifica tus tasas financieras y conoce tu nivel de riesgo
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          component={RouterLink}
          to="/login"
          variant="solid"
          color="primary"
          size="lg"
          className="effect-button neon-button"
          sx={{
            borderRadius: '30px',
            px: 4,
            fontWeight: 'bold',
          }}
        >
          Iniciar sesión
        </Button>
        <Button
          component={RouterLink}
          to="/registro"
          variant="solid"
          color="primary"
          size="lg"
          className="effect-button neon-button"
          sx={{
            borderRadius: '30px',
            px: 4,
            fontWeight: 'bold',
          }}
        >
          Regístrate
        </Button>
      </Stack>
      
      <Stack
        direction="row"
        spacing={3}
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          justifyContent: 'center',
          fontWeight: 'bold',
        }}
      >
        <Link component={RouterLink} to="/glosario" sx={{ color: 'white' }}>
          Glosario Explanatorio
        </Link>
        <Link component={RouterLink} to="/suscripcion" sx={{ color: 'white' }}>
          Planes y Suscripciones
        </Link>
      </Stack>
    </Box>
  );
};

export default Home;