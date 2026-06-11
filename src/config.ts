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

export interface Servicio {
  titulo: string;
  descripcion: string;
}

export const sitio = data.sitio;

// Métricas del hero (cuentan solas al entrar en viewport).
export const metricas = (data.sitio.metricas ?? []) as Metrica[];

// Servicios (sección de tarjetas).
export const servicios = (data.servicios ?? []) as Servicio[];

// Piezas del bento, ordenadas.
export const piezas: Pieza[] = (data.trabajos as Pieza[])
  .slice()
  .sort((a, b) => a.orden - b.orden);
