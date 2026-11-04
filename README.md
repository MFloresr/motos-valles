# Vallès Motos: web de ejemplo para un concesionario y taller de motos

Web estática hecha con Astro 7, pensada como punto de partida para un cliente real. Todo el contenido (motos, taller, equipo, opiniones, blog) es de ejemplo y sale de archivos que equivalen a los documentos de un CMS, para pasarla a Sanity sin rehacer las páginas.

## Qué incluye

- **Inicio** con el buscador «¿Qué moto puedo llevar?» por carnet (B, A1, A2, A), tipo y presupuesto.
- **Motos nuevas** y **Ocasión**: catálogo con filtros por carnet, tipo, marca, estado y precio, orden y enlaces compartibles (`/motos/?carnet=A2&tipo=naked`).
- **Ficha de moto**: ficha técnica, equipamiento, carnets con los que se conduce, cuota estimada, datos estructurados (Product) y motos relacionadas.
- **Taller**: servicios con precio «desde», tabla de mantenimiento por kilómetros y cita online.
- **Financiación**: calculadora de cuota (sistema francés) con TIN de ejemplo.
- **Guía de carnets**, **Equipación**, **Prueba de moto**, **Contacto** (con «abierto ahora»), **Quiénes somos**, **Blog** (4 artículos), preguntas frecuentes con datos estructurados.
- Aviso legal, privacidad y cookies (plantillas), créditos de las fotos, 404, sitemap y `robots.txt`.

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview
```

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Motos | `src/content/motos/*.json` |
| Blog | `src/content/blog/*.md` |
| Servicios, equipo, opiniones, preguntas | `src/content/datos/*.json` |
| Datos del negocio (teléfono, horario, dirección, financiación) | `src/lib/sitio.ts` |
| Esquemas del contenido | `src/content.config.ts` |
| Acceso al contenido (aquí entra el CMS) | `src/lib/contenido.ts` |
| Diseño (colores, tipografías, componentes) | `src/styles/global.css` |
| Fotos | `src/assets/fotos/` · créditos en `src/lib/creditos.json` |

## Pasar el contenido a un CMS (Sanity)

Las páginas solo llaman a `src/lib/contenido.ts`. Para conectar Sanity:

1. Crear en el estudio estos tipos de documento, con los mismos campos que `src/content.config.ts`: `moto`, `entrada`, `servicio`, `persona`, `opinion`, `pregunta` y un documento único `ajustes` (lo que hoy está en `sitio.ts`).
2. Reescribir `contenido.ts` para que devuelva la misma forma de datos con consultas GROQ. La imagen pasa de `ImageMetadata` a una URL de `@sanity/image-url`.
3. Añadir un webhook de Sanity que dispare un nuevo despliegue al publicar, así el cliente edita y la web se regenera.

## Formularios

Funcionan en modo demostración: validan en el navegador y muestran la confirmación, pero no envían nada. Para activarlos, definir `PUBLIC_FORM_ENDPOINT` con la dirección de una función que reciba el JSON y envíe el correo (por ejemplo, con Resend). Los campos son `tipo`, `nombre`, `telefono`, `email`, `mensaje`, etc. Llevan una trampa antirrobots (`web`).

## Antes de entregar al cliente

- [ ] Sustituir datos del negocio, motos, precios, fotos propias, equipo y opiniones reales (las actuales son de ejemplo).
- [ ] Rellenar y revisar con su asesor aviso legal y privacidad (hay corchetes `[ ]` por completar).
- [ ] Si se añade analítica, mapa embebido o vídeos: actualizar la página de cookies y añadir un aviso con aceptar y rechazar.
- [ ] Cambiar el dominio en `astro.config.mjs`, `sitio.ts` y `robots.txt`.
- [ ] Revisar el TIN de ejemplo y los textos de financiación con la financiera.
- [ ] Quitar la franja amarilla «Web de demostración» del pie (`Pie.astro`).

## Fotos

Proceden de Wikimedia Commons (CC0, CC BY, CC BY-SA 4.0 y CC BY 2.0), con el autor y la licencia de cada una en `/creditos/`. Son de calidad desigual (muchas son motos aparcadas): para producción conviene cambiarlas por fotos propias del cliente o de un banco como Pexels o Unsplash, descargadas a mano.

## Calidad

Probada con axe-core (WCAG 2.2 A y AA y buenas prácticas): sin violaciones en las 30 páginas, en ordenador y móvil. La web no pone cookies, no guarda nada en el navegador y no contacta con dominios externos. Tipografías alojadas en la propia web.
