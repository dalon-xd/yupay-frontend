import React, { useState, useCallback, useMemo } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Checkbox from '@mui/joy/Checkbox';
import Table from '@mui/joy/Table';
import Chip from '@mui/joy/Chip';
import CircularProgress from '@mui/joy/CircularProgress';
import Tooltip from '@mui/joy/Tooltip';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Navigation from '../components/Navigation/Navigation';
import { TasaFinanciera, ResultadoSimulacion } from '../types';
import { useAuth } from '../context/AuthContextNew';

interface MockEntidad {
  nombre: string;
  tasa: number;
  fsd: boolean;
  billetera: string;
  minimo: number;
  bancaInternet: string;
  riesgo: 'Verde' | 'Amarillo' | 'Rojo';
  departamento: string;
}

const entidadesMock: { ahorros: MockEntidad[]; plazoFijo: MockEntidad[] } = {
  ahorros: [
    { nombre: 'Banco Pichincha', tasa: 6.25, fsd: true, billetera: 'Ambos', minimo: 0, bancaInternet: 'Si', riesgo: 'Verde', departamento: 'Lima' },
    { nombre: 'BanBif', tasa: 5.50, fsd: true, billetera: 'Plin', minimo: 0, bancaInternet: 'Si', riesgo: 'Verde', departamento: 'Lima' },
    { nombre: 'BCP', tasa: 1.00, fsd: true, billetera: 'Yape', minimo: 0, bancaInternet: 'Si', riesgo: 'Verde', departamento: 'Todos' },
    { nombre: 'Interbank', tasa: 1.25, fsd: true, billetera: 'Plin', minimo: 0, bancaInternet: 'Si', riesgo: 'Verde', departamento: 'Todos' }
  ],
  plazoFijo: [
    { nombre: 'CUENTA A FUTURO - Banco Patito', tasa: 6.0, fsd: true, billetera: 'Yape/Plin', minimo: 5000, bancaInternet: 'Si', riesgo: 'Verde', departamento: 'Lima' },
    { nombre: 'CUENTA VAMONOS - Caja Muy muy pequeña', tasa: 9.0, fsd: true, billetera: 'No', minimo: 20000, bancaInternet: 'Si', riesgo: 'Amarillo', departamento: 'Lima' }
  ]
};

// Detalles extendidos que no vienen originalmente en la base de datos real pero que la UI demanda
const extraDetails: Record<string, { fsd: boolean; billetera: string; minimo: number; bancaInternet: string; riesgo: 'Verde' | 'Amarillo' | 'Rojo' }> = {
  'Banco Pichincha': { fsd: true, billetera: 'Ambos', minimo: 0, bancaInternet: 'Si', riesgo: 'Verde' },
  'Caja Arequipa': { fsd: true, billetera: 'Yape/Plin', minimo: 0, bancaInternet: 'Si', riesgo: 'Verde' },
  'Caja Huancayo': { fsd: true, billetera: 'Yape/Plin', minimo: 0, bancaInternet: 'Si', riesgo: 'Verde' },
  'Financiera Oh!': { fsd: true, billetera: 'No', minimo: 0, bancaInternet: 'Si', riesgo: 'Amarillo' },
  'Banco Falabella': { fsd: true, billetera: 'Ambos', minimo: 0, bancaInternet: 'Si', riesgo: 'Verde' },
  'Caja Piura': { fsd: true, billetera: 'Yape/Plin', minimo: 0, bancaInternet: 'Si', riesgo: 'Verde' },
};

const Simulador: React.FC = () => {
  const { token, user, updateUser } = useAuth();
  const [modalAbierto, setModalAbierto] = useState<boolean>(false);
  const [tipoCuenta, setTipoCuenta] = useState<'ahorros' | 'plazoFijo'>('ahorros');
  const [monto, setMonto] = useState<number>(10000);
  const [plazo, setPlazo] = useState<number>(360);
  const [departamento, setDepartamento] = useState<string>('Lima');
  const [modalidad, setModalidad] = useState<string>('Ventanilla');
  const [soloFSD, setSoloFSD] = useState<boolean>(false);
  const [billeteraFiltro, setBilleteraFiltro] = useState<string>('Todos');
  
  const [rates, setRates] = useState<TasaFinanciera[]>([]);
  const [errorValidacion, setErrorValidacion] = useState<string>('');
  const [haSimulado, setHaSimulado] = useState<boolean>(false);
  const [cargando, setCargando] = useState<boolean>(false);
  const [guardadoIds, setGuardadoIds] = useState<Record<string, boolean>>({});

  // Generador de tasas mock local en caso de desconexión del servidor
  const getMockRates = useCallback((productType: 'AHORRO' | 'PLAZO_FIJO', region: string): TasaFinanciera[] => {
    const items = productType === 'AHORRO' ? entidadesMock.ahorros : entidadesMock.plazoFijo;
    return items.map((ent, idx) => {
      let riskTrafficLight: 'VERDE' | 'AMARILLO' | 'ROJO' = 'VERDE';
      if (ent.riesgo === 'Amarillo') riskTrafficLight = 'AMARILLO';
      else if (ent.riesgo === 'Rojo') riskTrafficLight = 'ROJO';

      return {
        id: `mock-rate-${productType}-${idx}`,
        entityId: `mock-entity-${ent.nombre}`,
        rateValue: ent.tasa / 100,
        productType,
        currency: 'PEN',
        minTerm: ent.minimo > 0 ? 360 : 1,
        region: ent.departamento,
        entity: {
          id: `mock-entity-${ent.nombre}`,
          name: ent.nombre,
          logoUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=150&auto=format&fit=crop&q=60',
          type: ent.nombre.toLowerCase().includes('caja') ? 'CAJA_MUNICIPAL' : ent.nombre.toLowerCase().includes('financiera') ? 'FINANCIERA' : 'BANCO'
        },
        riskTrafficLight,
        fsdIsActive: ent.fsd,
        sbsClassification: 'Normal'
      };
    });
  }, []);

  // Consultar tasas reales del backend con fallback local en caso de desconexión
  const handleSimular = useCallback(async () => {
    setErrorValidacion('');
    setHaSimulado(false);
    setGuardadoIds({});

    if (tipoCuenta === 'plazoFijo' && monto < 500) {
      setErrorValidacion('El monto mínimo para abrir una cuenta a plazo fijo debe ser igual o mayor a 500 soles.');
      setRates([]);
      return;
    }

    setCargando(true);

    try {
      const productType = tipoCuenta === 'ahorros' ? 'AHORRO' : 'PLAZO_FIJO';
      const queryParams = new URLSearchParams({
        amount: monto.toString(),
        termDays: plazo.toString(),
        region: departamento,
        productType: productType,
        currency: 'PEN'
      });
      const url = `http://localhost:3001/api/rates?${queryParams.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Servidor retornó error al buscar tasas');
      }
      const data: TasaFinanciera[] = await response.json();
      setRates(data);
      setHaSimulado(true);
    } catch (err) {
      console.warn('Error al conectar con el backend, usando fallback local:', err);
      // Fallback local a base de datos simulada
      const mockData = getMockRates(tipoCuenta === 'ahorros' ? 'AHORRO' : 'PLAZO_FIJO', departamento);
      setRates(mockData);
      setHaSimulado(true);
    } finally {
      setCargando(false);
    }
  }, [tipoCuenta, monto, plazo, departamento, getMockRates]);

  // Memorizar la lógica de cálculo de intereses y filtrado de las tasas financieras
  const resultados = useMemo<ResultadoSimulacion[]>(() => {
    if (!haSimulado) return [];

    let filteredRates = rates;

    // Filtrado por tipo de producto financiero (Ahorros o Plazo Fijo)
    const backendProductType = tipoCuenta === 'ahorros' ? 'AHORRO' : 'PLAZO_FIJO';
    filteredRates = filteredRates.filter(r => r.productType === backendProductType);

    // Filtrado por región de residencia del usuario
    if (departamento) {
      filteredRates = filteredRates.filter(r => 
        r.region.toLowerCase() === departamento.toLowerCase() || 
        r.region.toLowerCase() === 'todo el perú'
      );
    }

    // Mapear y calcular intereses ganados
    const mapped: ResultadoSimulacion[] = filteredRates.map(rate => {
      const entityName = rate.entity?.name || 'Entidad Desconocida';
      
      // Obtener detalles estéticos u operacionales adicionales (FSD, banca internet, etc.)
      const extra = extraDetails[entityName] || {
        fsd: true,
        billetera: 'No',
        minimo: rate.productType === 'PLAZO_FIJO' ? 500 : 0,
        bancaInternet: 'Si',
        riesgo: 'Verde' as const
      };

      const tasaEfectiva = rate.rateValue;
      const tiempoAnos = plazo / 360;
      
      // Fórmula del interés compuesto
      const interesesTotales = monto * (Math.pow(1 + tasaEfectiva, tiempoAnos) - 1);
      
      // En depósitos a plazo fijo, los intereses suelen cobrarse al final (aproximación mensual 0 en la vista)
      const interesesMensuales = rate.productType === 'PLAZO_FIJO' ? 0 : (interesesTotales / (plazo / 30));

      const fsdIsActive = rate.fsdIsActive ?? extra.fsd;
      const riskTrafficLight = rate.riskTrafficLight ?? (extra.riesgo === 'Verde' ? 'VERDE' : extra.riesgo === 'Amarillo' ? 'AMARILLO' : 'ROJO');
      const sbsClassification = rate.sbsClassification ?? 'Normal';

      let riesgo: 'Verde' | 'Amarillo' | 'Rojo' = 'Verde';
      if (riskTrafficLight === 'AMARILLO') riesgo = 'Amarillo';
      else if (riskTrafficLight === 'ROJO') riesgo = 'Rojo';

      return {
        id: rate.id,
        nombre: entityName,
        tasa: rate.rateValue * 100, // Tasa en porcentaje legible
        fsd: fsdIsActive,
        billetera: extra.billetera,
        minimo: extra.minimo,
        bancaInternet: extra.bancaInternet,
        riesgo: riesgo,
        departamento: rate.region,
        interesesTotales: interesesTotales.toFixed(2),
        interesesMensuales: interesesMensuales.toFixed(2),
        tasaId: rate.id,
        entidadId: rate.entityId,
        logoUrl: rate.entity?.logoUrl || '',
        riskTrafficLight,
        fsdIsActive,
        sbsClassification
      };
    });

    // Filtros locales adicionales
    let finalResults = mapped;
    if (soloFSD) {
      finalResults = finalResults.filter(r => r.fsd);
    }
    if (billeteraFiltro !== 'Todos') {
      finalResults = finalResults.filter(r => r.billetera.includes(billeteraFiltro) || r.billetera === 'Ambos');
    }

    // Ordenar por intereses totales ganados de forma descendente (el más rentable primero)
    return [...finalResults].sort((a, b) => parseFloat(b.interesesTotales) - parseFloat(a.interesesTotales));
  }, [rates, haSimulado, tipoCuenta, departamento, plazo, monto, soloFSD, billeteraFiltro]);

  // Guardar la simulación seleccionada en el backend
  const handleGuardarSimulacion = useCallback(async (item: ResultadoSimulacion) => {
    try {
      const response = await fetch('http://localhost:3001/api/simulations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({
          monto: Number(monto),
          plazo: Number(plazo),
          tasa: Number(item.tasa) / 100, // Mandamos la tasa en decimal (ej: 0.0525)
          interesGanado: parseFloat(item.interesesTotales),
          entidadId: item.entidadId
        })
      });
      if (response.ok) {
        setGuardadoIds(prev => ({ ...prev, [item.id]: true }));
      } else {
        const errorData = await response.json();
        alert(`Error al guardar: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (err) {
      console.warn('Error al guardar en el backend, guardando en local:', err);
      // Fallback a localStorage local
      const localSims = JSON.parse(localStorage.getItem('simulations') || '[]');
      localSims.push({
        id: Date.now().toString(),
        monto: Number(monto),
        plazo: Number(plazo),
        tasa: Number(item.tasa) / 100,
        interesGanado: parseFloat(item.interesesTotales),
        entidadId: item.entidadId,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('simulations', JSON.stringify(localSims));
      setGuardadoIds(prev => ({ ...prev, [item.id]: true }));
    }
  }, [monto, plazo, token]);

  const getRiesgoColor = (riesgo: ResultadoSimulacion['riesgo']) => {
    if (riesgo === 'Verde') return 'success';
    if (riesgo === 'Amarillo') return 'warning';
    return 'danger';
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#030305',
        color: '#FFFFFF',
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
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(127, 0, 255, 0.06) 0%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <Navigation />
      
      <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Typography
          level="h2"
          sx={{
            mb: 1,
            fontWeight: 800,
            color: '#FFFFFF',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          Simulador Financiero
        </Typography>
        <Typography level="body-md" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.65)' }}>
          Descubre cuánto rinde tu dinero según el tipo de producto financiero.
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button 
            onClick={() => { setTipoCuenta('ahorros'); setPlazo(360); setRates([]); setHaSimulado(false); setErrorValidacion(''); }}
            sx={{
              borderRadius: '20px',
              px: 3,
              ...(tipoCuenta === 'ahorros' ? {
                background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
                color: '#000000',
                fontWeight: 700,
                boxShadow: '0 4px 14px rgba(0, 242, 254, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
                }
              } : {
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                variant: 'outlined',
                '&:hover': {
                  borderColor: '#FFFFFF',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }
              })
            }}
          >
            Cuenta de Ahorros
          </Button>
          <Button 
            onClick={() => { setTipoCuenta('plazoFijo'); setPlazo(180); setRates([]); setHaSimulado(false); setErrorValidacion(''); }}
            sx={{
              borderRadius: '20px',
              px: 3,
              ...(tipoCuenta === 'plazoFijo' ? {
                background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
                color: '#000000',
                fontWeight: 700,
                boxShadow: '0 4px 14px rgba(0, 242, 254, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
                }
              } : {
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                variant: 'outlined',
                '&:hover': {
                  borderColor: '#FFFFFF',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }
              })
            }}
          >
            Depósito a Plazo Fijo
          </Button>
        </Stack>

        <Card
          sx={{
            p: 3,
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '24px',
            mb: 4,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            '& label, & p, & span': {
              color: 'rgba(255, 255, 255, 0.8) !important',
            },
            '& .MuiInput-root, & .MuiSelect-root, & button.MuiSelect-button': {
              color: '#FFFFFF !important',
              backgroundColor: 'rgba(255, 255, 255, 0.04) !important',
              borderColor: 'rgba(255, 255, 255, 0.08) !important',
              borderRadius: '12px',
              fontSize: '0.95rem',
              '&:focus-within': {
                borderColor: '#00F2FE !important',
                boxShadow: '0 0 0 3px rgba(0, 242, 254, 0.25) !important',
              }
            },
            '& input': {
              color: '#FFFFFF !important',
            },
            '& button[disabled]': {
              background: 'rgba(255, 255, 255, 0.05) !important',
              color: 'rgba(255, 255, 255, 0.3) !important',
            }
          }}
        >
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="end" sx={{ mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm" sx={{ mb: 1 }}>Monto a Depositar (S/)</Typography>
              <Input
                type="number"
                value={monto}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonto(Number(e.target.value))}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm" sx={{ mb: 1 }}>Departamento de Residencia</Typography>
              <Select value={departamento} onChange={(_e: React.SyntheticEvent | null, val: string | null) => setDepartamento(val || '')}>
                <Option value="Lima">Lima</Option>
                <Option value="Arequipa">Arequipa</Option>
                <Option value="La Libertad">La Libertad</Option>
              </Select>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm" sx={{ mb: 1 }}>Modalidad de Apertura</Typography>
              <Select value={modalidad} onChange={(_e: React.SyntheticEvent | null, val: string | null) => setModalidad(val || '')}>
                <Option value="Ventanilla">Ventanilla (Presencial)</Option>
                <Option value="Digital">Banca Digital (Web/App)</Option>
              </Select>
            </Box>
          </Stack>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="end">
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm" sx={{ mb: 1 }}>Plazo del Depósito</Typography>
              {tipoCuenta === 'ahorros' ? (
                <Select value={plazo} onChange={(_e: React.SyntheticEvent | null, val: number | null) => setPlazo(Number(val))}>
                  <Option value={90}>90 días (3 meses)</Option>
                  <Option value={180}>180 días (6 meses)</Option>
                  <Option value={360}>360 días (1 año)</Option>
                </Select>
              ) : (
                <Select value={plazo} onChange={(_e: React.SyntheticEvent | null, val: number | null) => setPlazo(Number(val))}>
                  <Option value={180}>180 días</Option>
                  <Option value={360}>360 días</Option>
                  <Option value={540}>540 días</Option>
                  <Option value={720}>720 días</Option>
                  <Option value={900}>900 días</Option>
                  <Option value={1080}>1080 días</Option>
                </Select>
              )}
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm" sx={{ mb: 1 }}>Soporte de Billetera Digital</Typography>
              <Select value={billeteraFiltro} onChange={(_e: React.SyntheticEvent | null, val: string | null) => setBilleteraFiltro(val || '')}>
                <Option value="Todos">Todos</Option>
                <Option value="Yape">Yape</Option>
                <Option value="Plin">Plin</Option>
              </Select>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="solid" 
                onClick={handleSimular} 
                disabled={cargando}
                sx={{
                  px: 5,
                  borderRadius: '12px',
                  height: '40px',
                  width: '100%',
                  background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
                  color: '#000000',
                  fontWeight: 700,
                  boxShadow: '0 4px 14px rgba(0, 242, 254, 0.3)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 20px rgba(0, 242, 254, 0.5)',
                    background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
                  },
                  '&:disabled': {
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.3)',
                  }
                }}
              >
                {cargando ? <CircularProgress size="sm" color="neutral" /> : 'Buscar'}
              </Button>
            </Box>
          </Stack>

          <Stack direction="row" sx={{ mt: 3 }}>
            <Checkbox
              label="Ver solo entidades con Fondo de Seguro de Depósitos (FSD)"
              checked={soloFSD}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSoloFSD(e.target.checked)}
              sx={{
                '& .MuiCheckbox-label': {
                  color: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          </Stack>
        </Card>

        {errorValidacion && (
          <Card variant="soft" color="danger" sx={{ p: 2, borderRadius: '10px', mb: 4, textAlign: 'center' }}>
            <Typography level="body-md" sx={{ fontWeight: 'bold' }}>{errorValidacion}</Typography>
          </Card>
        )}

        {haSimulado && !cargando && resultados.length === 0 && (
          <Card variant="soft" color="warning" sx={{ p: 4, borderRadius: '15px', textAlign: 'center' }}>
            <Typography level="h4" sx={{ mb: 1, fontWeight: 'bold' }}>No se encontraron entidades disponibles</Typography>
            <Typography level="body-md" sx={{ color: 'text.secondary' }}>
              Actualmente ninguna opción coincide con la configuración elegida en este departamento. Te invitamos a escoger diferentes parámetros.
            </Typography>
          </Card>
        )}

        {resultados.length > 0 && !cargando && (
          <Card
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              overflowX: 'auto',
              color: '#FFFFFF'
            }}
          >
            <Typography level="h4" sx={{ mb: 2, fontWeight: 800, color: '#FFFFFF' }}>
              {tipoCuenta === 'ahorros' ? 'TABLA PARA UNA CUENTA DE AHORROS' : 'TABLA PARA UNA CUENTA DE DEPOSITOS A PLAZO FIJO'}
            </Typography>
            <Table
              aria-label="tabla financiera"
              sx={{
                '& th': {
                  color: 'rgba(255, 255, 255, 0.6) !important',
                  backgroundColor: 'rgba(255, 255, 255, 0.02) !important',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06) !important',
                },
                '& td': {
                  color: '#FFFFFF !important',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.04) !important',
                  fontSize: '0.9rem',
                },
                '& tr:nth-of-type(odd)': {
                  backgroundColor: 'rgba(255, 255, 255, 0.01) !important',
                },
                '& tr:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.03) !important',
                }
              }}
            >
              <thead>
                <tr>
                  <th>Entidad</th>
                  <th>{tipoCuenta === 'ahorros' ? 'Tasa Anual (TREA)' : 'Tasa Anual (TEA)'}</th>
                  <th>Intereses totales (Al Plazo)</th>
                  <th>Intereses Mensuales (Aproximado)</th>
                  <th>Monto mínimo de cuenta</th>
                  <th>Banca por internet</th>
                  <th>Billetera digital</th>
                  <th>Tiene Fondo de Seguro</th>
                  <th>Semáforo de Riesgo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '500' }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {item.logoUrl && (
                          <img 
                            src={item.logoUrl} 
                            alt={item.nombre} 
                            style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }} 
                          />
                        )}
                        <span>{item.nombre}</span>
                        {!item.fsdIsActive && (
                          <Tooltip 
                            title="¡Alerta Crítica! Esta entidad no se encuentra respaldada por el Fondo de Seguro de Depósitos (FSD) de la SBS" 
                            variant="solid" 
                            color="danger"
                            arrow
                          >
                            <Box 
                              component="span" 
                              sx={{ 
                                cursor: 'help', 
                                display: 'inline-flex', 
                                animation: 'pulse 2s infinite',
                                '@keyframes pulse': {
                                  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                                  '50%': { opacity: 0.6, transform: 'scale(1.15)' }
                                }
                              }}
                            >
                              ⚠️
                            </Box>
                          </Tooltip>
                        )}
                      </Stack>
                    </td>
                    <td><Typography sx={{ fontWeight: 'bold', color: '#00F2FE' }}>{item.tasa.toFixed(2)}%</Typography></td>                    <td><Typography sx={{ fontWeight: 'bold', color: '#10B981' }}>S/ {item.interesesTotales}</Typography></td>
                    <td>S/ {item.interesesMensuales}</td>
                    <td>S/ {item.minimo.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td>{item.bancaInternet}</td>
                    <td>{item.billetera}</td>
                    <td>
                      <Chip color={item.fsd ? 'success' : 'danger'} variant="soft" size="sm">
                        {item.fsd ? 'Si' : 'No'}
                      </Chip>
                    </td>
                    <td>
                      {(() => {
                        let bgColor = 'rgba(16, 185, 129, 0.15)';
                        let textColor = '#10B981';
                        let label = 'VERDE';
                        
                        if (item.riskTrafficLight === 'AMARILLO') {
                          bgColor = 'rgba(245, 158, 11, 0.15)';
                          textColor = '#F59E0B';
                          label = 'AMARILLO';
                        } else if (item.riskTrafficLight === 'ROJO') {
                          bgColor = 'rgba(239, 68, 68, 0.15)';
                          textColor = '#EF4444';
                          label = 'ROJO';
                        }

                        return (
                          <Box
                            sx={{
                              display: 'inline-flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              px: 1.5,
                              py: 0.75,
                              borderRadius: '12px',
                              background: bgColor,
                              border: `1px solid ${textColor}33`,
                              backdropFilter: 'blur(4px)',
                              textAlign: 'center',
                              width: '120px'
                            }}
                          >
                            <Typography sx={{ fontWeight: 'bold', fontSize: '11px', color: textColor, letterSpacing: '0.5px' }}>
                              {label}
                            </Typography>
                            <Typography sx={{ fontSize: '9px', color: textColor, opacity: 0.8 }}>
                              {item.sbsClassification}
                            </Typography>
                          </Box>
                        );
                      })()}
                    </td>
                    <td>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant={guardadoIds[item.id] ? "soft" : "solid"}
                          onClick={() => {
                            if (user?.plan === 'PRO') {
                              handleGuardarSimulacion(item);
                            } else {
                              setModalAbierto(true);
                            }
                          }}
                          size="sm"
                          sx={{
                            borderRadius: '8px',
                            fontWeight: 600,
                            ...(guardadoIds[item.id] ? {
                              bgcolor: 'rgba(16, 185, 129, 0.15)',
                              color: '#10B981',
                              '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.25)' }
                            } : {
                              background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
                              color: '#000000',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
                                transform: 'translateY(-1px)',
                              }
                            })
                          }}
                          startDecorator={user?.plan !== 'PRO' ? <span>🔒</span> : undefined}
                        >
                          {guardadoIds[item.id] ? 'Guardado' : 'Guardar'}
                        </Button>
                        <Button
                          variant="outlined"
                          size="sm"
                          onClick={() => {
                            if (user?.plan === 'PRO') {
                              alert(`Descargando el Informe Detallado del Economista para ${item.nombre}...`);
                            } else {
                              setModalAbierto(true);
                            }
                          }}
                          sx={{
                            borderRadius: '8px',
                            color: '#FFFFFF',
                            borderColor: 'rgba(255, 255, 255, 0.15)',
                            '&:hover': {
                              borderColor: '#FFFFFF',
                              bgcolor: 'rgba(255, 255, 255, 0.05)'
                            },
                            ...(user?.plan !== 'PRO' && {
                              filter: 'blur(0.5px)',
                              opacity: 0.7
                            })
                          }}
                          startDecorator={user?.plan !== 'PRO' ? <span>🔒</span> : undefined}
                        >
                          Informe
                        </Button>
                      </Stack>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
      </Box>

      <Modal open={modalAbierto} onClose={() => setModalAbierto(false)}>
        <ModalDialog
          aria-labelledby="lock-modal-title"
          aria-describedby="lock-modal-description"
          sx={{
            maxWidth: 500,
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(26, 26, 46, 0.95)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            color: 'white',
            p: 4
          }}
        >
          <ModalClose sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }} />
          <Typography
            id="lock-modal-title"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span><span>✨</span></span> Plan Premium PRO Requerido
          </Typography>
          <Typography id="lock-modal-description" textColor="inherit" sx={{ opacity: 0.8, mb: 3 }}>
            Función Exclusiva de Yupay PRO. Mejora tu cuenta para guardar tu historial de simulaciones en la nube y recibir alertas del mercado en tiempo real.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="plain"
              sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
              onClick={() => setModalAbierto(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="solid"
              color="primary"
              onClick={() => {
                setModalAbierto(false);
                if (user) {
                  updateUser({ plan: 'PRO' });
                }
              }}
              sx={{
                background: 'linear-gradient(135deg, #00F2FE 0%, #7F00FF 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #00F2FE 0%, #7F00FF 100%)',
                }
              }}
            >
              ¡Mejorar a PRO ahora!
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default Simulador;