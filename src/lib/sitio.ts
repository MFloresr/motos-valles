// Datos del negocio. En producción vendrían del CMS (un documento "Ajustes del sitio").
// Todo lo marcado como ejemplo se sustituye por los datos reales del cliente.

export type Tramo = { abre: string; cierra: string };
export type Horario = { dia: number; etiqueta: string; tramos: Tramo[] }; // dia: 0 = domingo

export const sitio = {
  nombre: 'Vallès Motos',
  eslogan: 'Concesionario multimarca, motos de ocasión y taller',
  descripcion:
    'Motos nuevas y de ocasión, taller propio y equipación en un mismo sitio. Te ayudamos a elegir según tu carnet y tu presupuesto.',
  url: 'https://www.vallesmotos.example',
  // Datos de ejemplo
  telefono: '+34937000000',
  telefonoVisible: '937 00 00 00',
  whatsapp: '34600000000',
  email: 'info@vallesmotos.example',
  direccion: { calle: 'Carrer de Mostra, 12', cp: '08200', ciudad: 'Sabadell', provincia: 'Barcelona' },
  mapa: 'https://www.openstreetmap.org/search?query=Sabadell',
  redes: { instagram: '#', facebook: '#', youtube: '#' },
  // Los formularios se envían aquí si hay endpoint; sin él funcionan en modo demostración
  endpointFormularios: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '',
  financiacion: { tin: 7.9, plazoMin: 12, plazoMax: 84, entradaMinPct: 0 },
  horarios: [
    { dia: 1, etiqueta: 'Lunes a viernes', tramos: [{ abre: '09:00', cierra: '13:30' }, { abre: '15:00', cierra: '19:30' }] },
    { dia: 6, etiqueta: 'Sábados', tramos: [{ abre: '10:00', cierra: '14:00' }] },
    { dia: 0, etiqueta: 'Domingos', tramos: [] },
  ] as Horario[],
  // Horario por día de la semana (0 = domingo) para calcular si está abierto
  semana: {
    0: [],
    1: [['09:00', '13:30'], ['15:00', '19:30']],
    2: [['09:00', '13:30'], ['15:00', '19:30']],
    3: [['09:00', '13:30'], ['15:00', '19:30']],
    4: [['09:00', '13:30'], ['15:00', '19:30']],
    5: [['09:00', '13:30'], ['15:00', '19:30']],
    6: [['10:00', '14:00']],
  } as Record<number, string[][]>,
  responsableLegal: {
    razonSocial: '[Razón social del cliente]',
    nif: '[NIF]',
    registro: '[Datos del Registro Mercantil]',
    domicilio: 'Carrer de Mostra, 12, 08200 Sabadell (Barcelona)',
  },
};

export const menu = [
  { href: '/motos/', texto: 'Motos nuevas', filtro: 'nuevas' },
  { href: '/ocasion/', texto: 'Ocasión' },
  { href: '/taller/', texto: 'Taller' },
  { href: '/equipacion/', texto: 'Equipación' },
  { href: '/financiacion/', texto: 'Financiación' },
  { href: '/carnet/', texto: 'Guía de carnets' },
  { href: '/blog/', texto: 'Blog' },
];
