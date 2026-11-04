// Esquemas del contenido. Cada colección equivale a un tipo de documento del futuro CMS (Sanity):
// motos, entradas del blog y datos sueltos (servicios, equipo, opiniones, preguntas).
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

export const TIPOS = ['naked', 'trail', 'sport-touring', 'custom', 'scooter', 'electrica', 'clasica'] as const;
export const ESTADOS = ['nueva', 'ocasion', 'km0'] as const;

const motos = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/motos' }),
  schema: ({ image }) =>
    z.object({
      marca: z.string(),
      modelo: z.string(),
      anio: z.number().int(),
      tipo: z.enum(TIPOS),
      estado: z.enum(ESTADOS),
      cc: z.number().nullable(), // null en las eléctricas
      kw: z.number(),
      peso: z.number(),
      asiento: z.number(),
      precio: z.number(),
      precioAnterior: z.number().optional(),
      km: z.number().optional(),
      a2: z.boolean().default(false), // existe versión limitada a 35 kW
      foto: image(),
      fotoAlt: z.string(),
      destacada: z.boolean().default(false),
      resumen: z.string(),
      descripcion: z.string(),
      extras: z.array(z.string()).default([]),
      garantiaMeses: z.number().default(24),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumen: z.string(),
      fecha: z.coerce.date(),
      categoria: z.string(),
      foto: image(),
      fotoAlt: z.string(),
      minutos: z.number(),
    }),
});

const servicios = defineCollection({
  loader: file('src/content/datos/servicios.json'),
  schema: z.object({ nombre: z.string(), descripcion: z.string(), desde: z.number(), duracion: z.string(), incluye: z.array(z.string()) }),
});

const equipo = defineCollection({
  loader: file('src/content/datos/equipo.json'),
  schema: z.object({ nombre: z.string(), cargo: z.string(), texto: z.string() }),
});

const opiniones = defineCollection({
  loader: file('src/content/datos/opiniones.json'),
  schema: z.object({ nombre: z.string(), moto: z.string(), texto: z.string() }),
});

const preguntas = defineCollection({
  loader: file('src/content/datos/preguntas.json'),
  schema: z.object({ tema: z.enum(['compra', 'ocasion', 'taller', 'financiacion', 'carnet']), pregunta: z.string(), respuesta: z.string() }),
});

export const collections = { motos, blog, servicios, equipo, opiniones, preguntas };
