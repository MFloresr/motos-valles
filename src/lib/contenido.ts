// Capa de acceso al contenido. Las páginas solo llaman a estas funciones.
// Hoy leen los archivos de src/content; para pasar al CMS (Sanity) basta con reescribir este archivo
// y devolver la misma forma de datos con consultas GROQ, sin tocar las páginas ni los componentes.
import { getCollection, getEntry } from 'astro:content';
import type { Moto } from './util';

export async function getMotos(): Promise<Moto[]> {
  const motos = await getCollection('motos');
  return motos.sort((a, b) => Number(b.data.destacada) - Number(a.data.destacada) || b.data.precio - a.data.precio);
}

export const getMotosNuevas = async () => (await getMotos()).filter((m) => m.data.estado !== 'ocasion');
export const getMotosOcasion = async () => (await getMotos()).filter((m) => m.data.estado === 'ocasion');
export const getMoto = (id: string) => getEntry('motos', id);

export async function getRelacionadas(moto: Moto, n = 3): Promise<Moto[]> {
  const todas = (await getMotos()).filter((m) => m.id !== moto.id);
  const puntos = (m: Moto) => (m.data.tipo === moto.data.tipo ? 2 : 0) + (m.data.estado === moto.data.estado ? 1 : 0);
  return todas.sort((a, b) => puntos(b) - puntos(a)).slice(0, n);
}

export async function getEntradas() {
  return (await getCollection('blog')).sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

export const getServicios = () => getCollection('servicios');
export const getEquipo = () => getCollection('equipo');
export const getOpiniones = () => getCollection('opiniones');
export const getPreguntas = async (tema?: string) => {
  const todas = await getCollection('preguntas');
  return tema ? todas.filter((p) => p.data.tema === tema) : todas;
};
