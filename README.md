# Cápsula de Cierre - 12 Días (Para Nayeli)

Aplicación web interactiva **100% Mobile-First**, nostálgica y cinematográfica construida con **React + Vite + TypeScript + Tailwind CSS + Framer Motion + Lucide React**, lista para desplegar en **Vercel**.

---

## Cómo personalizar tu contenido en 1 solo archivo

Todo el texto, credenciales, videos de los 12 días, fotos de la galería Polaroid y la carta final están centralizados en:

```
src/data/memoriesData.ts
```

1. **Canción de fondo (`/cancion.mp3`)**:
   - Coloca tu canción favorita en formato MP3 dentro de la carpeta `public/` con el nombre `cancion.mp3` (`public/cancion.mp3`).
   - Al acertar el login (`bebe` / `25042005`), la canción inicia automáticamente con volumen suave (`0.25`) y en `loop`.
   - Cuando Nayeli toque **"Reproducir Día X"**, la música de fondo se pausa automáticamente para que escuche tu voz con claridad.

2. **Los 12 Videos de Google Drive (`TWELVE_DAYS_VIDEOS`)**:
   - Sube tus 12 videos verticales (`9:16`) a Google Drive.
   - En cada video de Drive, haz clic derecho → **Compartir** → **Cualquier persona con el enlace (Lector)** → **Copiar enlace**.
   - Pega el enlace tal cual en `driveUrl` dentro de `src/data/memoriesData.ts`. La función `getDriveEmbedUrl(url)` de `src/utils/driveHelper.ts` extrae automáticamente el ID y lo convierte en `https://drive.google.com/file/d/XXXX/preview`.
   - También puedes usar archivos `.mp4` directos (por ejemplo `/videos/dia1.mp4`).

3. **Las 6 Fotos Polaroid (`GALLERY_PHOTOS`)**:
   - Reemplaza las imágenes en `public/photos/foto-1.jpg` a `foto-6.jpg` o cambia las rutas en `GALLERY_PHOTOS` dentro de `src/data/memoriesData.ts`.

4. **Descargar el Código QR para el Anillo**:
   - Una vez desplegada tu web en Vercel, entra hasta el final de la página y toca el botón discreto **"Tarjeta QR para el anillo"** para descargar el código QR en PNG de alta resolución apuntando a tu URL de producción.

---

## Comandos para desarrollo y despliegue en Vercel

```bash
npm install
npm run dev
```

Para compilar para producción:

```bash
npm run build
```
