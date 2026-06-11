import data from './data.json';

export interface Metrica {
  numero: number;
  prefijo?: string;
  sufijo?: string;
  decimales?: number;
  etiqueta: string;
}

export interface Pieza {
  titulo: string;
  categoria: string;
  engagement: string;
  imagen: string; // portada (URL real o "" → placeholder de marca)
  galeria: string[]; // imágenes extra para el lightbox
  orden: number;
  destacado: boolean;
}

export const sitio = data.sitio;

// Métricas del hero (cuentan solas al entrar en viewport).
export const metricas = (data.sitio.metricas ?? []) as Metrica[];

// Piezas del bento, ordenadas.
export const piezas: Pieza[] = (data.trabajos as Pieza[])
  .slice()
  .sort((a, b) => a.orden - b.orden);

// Compat TEMPORAL con el panel /admin viejo (lee nombre/titulo/imagenes).
// Se elimina en la Tanda 5, cuando el panel se reconstruye al shape nuevo.
export const trabajos = piezas.map((p) => ({
  nombre: p.titulo,
  titulo: p.categoria,
  imagenes: [p.imagen, ...p.galeria].filter((u) => Boolean(u) && u.startsWith('http')),
}));
