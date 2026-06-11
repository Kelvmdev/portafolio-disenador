import data from './data.json';

export interface Metrica {
  numero: number;
  prefijo?: string;
  sufijo?: string;
  decimales?: number;
  etiqueta: string;
}

export const sitio = data.sitio;

// Métricas del hero (cuentan solas al entrar en viewport).
export const metricas = (data.sitio.metricas ?? []) as Metrica[];

// Cada trabajo siempre tendrá "imagenes" (lista).
// Si un trabajo viejo solo tiene "imagen", la convierte en lista de uno.
export const trabajos = data.trabajos.map((t: any) => ({
  ...t,
  imagenes: t.imagenes ?? (t.imagen ? [t.imagen] : []),
}));
