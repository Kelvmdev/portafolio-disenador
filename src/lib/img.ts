// Optimización de imágenes Cloudinary "al vuelo" (MANUAL §5.8 — palanca #1 del LCP).
// Inserta f_auto (WebP/AVIF), q_auto (compresión) y w_<ancho> (resize) tras /upload/.
// Si la URL no es de Cloudinary, la devuelve sin tocar.
export function imagenOptimizada(url: string, ancho: number): string {
  if (!url) return url;
  if (url.includes('res.cloudinary.com/') && url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${ancho}/`);
  }
  return url;
}
