import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import { useNavigate } from 'react-router-dom';

const subscriptionPlans = [
  {
    name: 'Plan Básico (Estudiante)',
    originalPrice: 'S/ 9.90',
    price: 'S/ 0.00',
    period: 'Fase Beta',
    features: [
      'Acceso al simulador de cuentas de ahorro',
      'Comparativa de indicadores en tiempo real',
      'Filtros por uso de billeteras (Yape/Plin)',
      'Validación de Fondo de Seguro de Depósitos (FSD)',
      'Acceso habilitado para pruebas del Sprint 1'
    ],
    buttonText: 'Acceso Beta Activo',
    color: 'success',
    variant: 'solid' as const,
    isBeta: true
  },
  {
    name: 'Plan Premium Pro',
    price: 'S/ 18.90',
    period: 'Próximamente',
    features: [
      'Comparativa expandida con más de 15 entidades',
      'Alertas automáticas ante variación de la TEA',
      'Exportación de reportes avanzados a PDF',
      'Historial de simulaciones guardadas',
      'Módulo planificado para siguientes Sprints'
    ],
    buttonText: 'Bloqueado (Sprints Futuros)',
    color: 'neutral',
    variant: 'outlined' as const,
    isBeta: false
  }
];

const Terms: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#F5F7FF',
        py: 6,
        px: 3,
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
          color: '#102A43'
        }}
      >
        Planes y Suscripciones
      </Typography>

      <Typography
        level="body-md"
        sx={{
          mb: 5,
          textAlign: 'center',
          color: '#627D98',
          maxWidth: 600,
        }}
      >
        Estado actual de los módulos de suscripción y accesos del sistema para la evaluación del Sprint 1.
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
        sx={{ flexWrap: 'wrap', width: '100%', maxWidth: 800, mb: 6 }}
      >
        {subscriptionPlans.map((plan) => (
          <Card
            key={plan.name}
            variant={plan.variant}
            color={plan.color === 'success' ? 'success' : undefined}
            sx={{
              width: 320,
              borderRadius: '20px',
              bgcolor: 'white',
              boxShadow: plan.isBeta ? '0 8px 24px rgba(46, 125, 50, 0.15)' : 'none',
              transition: 'transform 0.3s',
              opacity: plan.isBeta ? 1 : 0.7,
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography level="h4" sx={{ fontWeight: 'bold' }}>
                  {plan.name}
                </Typography>
                {plan.isBeta && (
                  <Chip color="success" variant="soft" size="sm">
                    Sprint 1
                  </Chip>
                )}
              </Stack>
              
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
                
                {/* PRECIO ORIGINAL TACHADO (Solo se muestra si el plan lo tiene) */}
                {plan.originalPrice && (
                  <Typography 
                    level="h4" 
                    sx={{ 
                      textDecoration: 'line-through', 
                      color: 'neutral.400', 
                      mr: 1,
                      fontWeight: 'normal'
                    }}
                  >
                    {plan.originalPrice}
                  </Typography>
                )}
                
                {/* PRECIO ACTUAL (Gratis) */}
                <Typography level="h2" sx={{ fontWeight: 'xl', display: 'inline' }}>
                  {plan.price}
                </Typography>
                <Typography level="body-xs" sx={{ color: 'neutral.500', ml: 0.5 }}>
                  {plan.period}
                </Typography>
                
              </Box>

              <Stack spacing={1.5} sx={{ mb: 4, flexGrow: 1 }}>
                {plan.features.map((feat, index) => (
                  <Typography 
                    key={index} 
                    level="body-sm" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 1,
                      color: '#486581'
                    }}
                  >
                    • {feat}
                  </Typography>
                ))}
              </Stack>

              <Button
                variant={plan.variant}
                color={plan.color as any}
                disabled={!plan.isBeta}
                fullWidth
                sx={{ borderRadius: '15px', mt: 'auto' }}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Button
        variant="solid"
        color="neutral"
        onClick={() => navigate(-1)}
        sx={{ borderRadius: '30px', px: 4, bgcolor: '#486581', '&:hover': { bgcolor: '#334E68' } }}
      >
        Regresar
      </Button>
    </Box>
  );
};

export default Terms;