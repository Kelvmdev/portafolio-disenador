import data from './data.json';

export const sitio = data.sitio;

// Cada trabajo siempre tendrá "imagenes" (lista).
// Si un trabajo viejo solo tiene "imagen", la convierte en lista de uno.
export const trabajos = data.trabajos.map((t: any) => ({
  ...t,
  imagenes: t.imagenes ?? (t.imagen ? [t.imagen] : []),
}));