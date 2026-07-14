import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';

// Estructura para los términos del glosario financiero del Sprint 1
const glossaryTerms = [
  {
    term: 'TEA',
    title: 'Tasa Efectiva Anual',
    desc: 'Es el indicador principal que mide el rendimiento real del dinero depositado en un año completo.',
  },
  {
    term: 'FSD',
    title: 'Fondo de Seguro de Depósitos',
    desc: 'Respaldo oficial que protege tus ahorros ante la quiebra de una entidad financiera autorizada.',
  },
  {
    term: 'Mantenimiento',
    title: 'Costo de Administración',
    desc: 'Comisión fija mensual que cobran algunas entidades por mantener activa una cuenta corriente o de ahorros.',
  },
  {
    term: 'Disponibilidad',
    title: 'Operaciones Libres',
    desc: 'Cantidad de transacciones sin costo adicional permitidas en ventanilla o cajeros automáticos del mismo banco.',
  },
  {
    term: 'Ecosistema',
    title: 'Billeteras Digitales',
    desc: 'Nivel de compatibilidad directa con aplicaciones de pago móvil rápido como Yape o Plin en el mercado local.',
  },
];

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#F5F7FF',
        py: 6,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        level="h2"
        sx={{
          mb: 1,
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: { xs: '1.5rem', md: '2rem' },
          color: '#102A43',
        }}
      >
        Glosario Explanatorio
      </Typography>
      
      <Typography
        level="body-md"
        sx={{
          mb: 4,
          textAlign: 'center',
          color: '#627D98',
          maxWidth: 600,
        }}
      >
        Aprende a identificar los indicadores clave de riesgo y rendimiento para tomar mejores decisiones financieras.
      </Typography>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        justifyContent="center"
        alignItems="stretch"
        sx={{ flexWrap: 'wrap', width: '100%', maxWidth: 1200 }}
      >
        {glossaryTerms.map((item) => (
          <Card
            key={item.term}
            variant="outlined"
            className="floating-card"
            sx={{
              width: 220,
              borderRadius: '20px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              bgcolor: 'white',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
              },
            }}
          >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box 
                sx={{ 
                  bgcolor: '#E0F2FE', 
                  color: '#0369A1', 
                  fontWeight: 'bold', 
                  borderRadius: '12px', 
                  py: 1, 
                  px: 2, 
                  mb: 1.5,
                  alignSelf: 'center'
                }}
              >
                {item.term}
              </Box>

              <Typography level="h4" sx={{ fontSize: '1rem', fontWeight: 'bold', mb: 1, textAlign: 'center', color: '#102A43' }}>
                {item.title}
              </Typography>

              <Typography level="body-sm" sx={{ color: '#486581', textAlign: 'center', fontSize: '0.85rem', flexGrow: 1 }}>
                {item.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Box sx={{ mt: 6 }}>
        <Button
          variant="solid"
          color="primary"
          onClick={() => navigate(-1)}
          className="effect-button"
          sx={{ borderRadius: '30px', px: 3 }}
        >
          Regresar
        </Button>
      </Box>
    </Box>
  );
};

export default About;