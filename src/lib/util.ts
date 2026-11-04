import type { CollectionEntry } from 'astro:content';

export type Moto = CollectionEntry<'motos'>;
export type Carnet = 'B' | 'A1' | 'A2' | 'A';

export const ETIQUETA_TIPO: Record<string, string> = {
  naked: 'Naked',
  trail: 'Trail y aventura',
  'sport-touring': 'Sport-turismo',
  custom: 'Custom',
  scooter: 'Scooter',
  electrica: 'Eléctrica',
  clasica: 'Clásica',
};

export const ETIQUETA_ESTADO: Record<string, string> = { nueva: 'Nueva', ocasion: 'Ocasión', km0: 'Km 0' };

export const CARNETS: { id: Carnet; nombre: string; ayuda: string }[] = [
  { id: 'B', nombre: 'B', ayuda: 'Carnet de coche con 3 años de antigüedad: hasta 125 cc' },
  { id: 'A1', nombre: 'A1', ayuda: 'Hasta 125 cc y 11 kW' },
  { id: 'A2', nombre: 'A2', ayuda: 'Hasta 35 kW' },
  { id: 'A', nombre: 'A', ayuda: 'Sin límite de potencia' },
];

const nf = new Intl.NumberFormat('es-ES', { useGrouping: 'always' });
export const NBSP = ' ';
export const euros = (n: number) => `${nf.format(Math.round(n))}${NBSP}€`;
export const km = (n: number) => `${nf.format(n)}${NBSP}km`;
export const unidad = (n: number, u: string) => `${nf.format(n)}${NBSP}${u}`;
export const numero = (n: number) => nf.format(n);

/** Carnets con los que se puede conducir la moto, según los límites de potencia y peso. */
export function carnetsPara(m: Moto['data']): Carnet[] {
  const ratio = m.kw / m.peso;
  const out: Carnet[] = ['A'];
  if ((m.kw <= 35 && ratio <= 0.2) || m.a2) out.unshift('A2');
  if (m.kw <= 11 && ratio <= 0.1 && (m.cc === null || m.cc <= 125)) out.unshift('A2', 'A1', 'B');
  return [...new Set(out)].sort((a, b) => ['B', 'A1', 'A2', 'A'].indexOf(a) - ['B', 'A1', 'A2', 'A'].indexOf(b));
}

/** El carnet más bajo que permite llevarla; se muestra en la placa de la tarjeta. */
export const carnetMinimo = (m: Moto['data']): Carnet => carnetsPara(m)[0];

export const cv = (kw: number) => Math.round(kw * 1.36);

/** Cuota mensual con sistema francés. tin en %, meses de plazo. */
export function cuota(importe: number, meses: number, tin: number): number {
  if (importe <= 0) return 0;
  const i = tin / 100 / 12;
  if (i === 0) return importe / meses;
  return (importe * i) / (1 - Math.pow(1 + i, -meses));
}

export const nombreMoto = (m: Moto['data']) => `${m.marca} ${m.modelo}`;
