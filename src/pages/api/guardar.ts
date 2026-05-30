import type { APIRoute } from "astro";

export const prerender = false;

const OWNER = import.meta.env.GITHUB_OWNER;
const REPO = import.meta.env.GITHUB_REPO;
const BRANCH = import.meta.env.GITHUB_BRANCH;
const TOKEN = import.meta.env.GITHUB_TOKEN;
const ARCHIVO = "src/data.json";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  // 1. Proteger con la cookie
  const sesion = cookies.get("sesion")?.value;
  if (sesion !== import.meta.env.ADMIN_PASSWORD) {
    return redirect("/admin");
  }

  // 2. Datos del formulario
  const datos = await request.formData();

  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "portafolio-cms",
  };
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${ARCHIVO}`;

  // 3. Traer el data.json actual de GitHub
  const respGet = await fetch(`${url}?ref=${BRANCH}`, { headers });
  const archivo = await respGet.json();
  const contenido = JSON.parse(Buffer.from(archivo.content, "base64").toString("utf-8"));

  // 4. Actualizar el sitio
  contenido.sitio.nombre = datos.get("nombre")?.toString() ?? "";
  contenido.sitio.tagline = datos.get("tagline")?.toString() ?? "";

  // 5. Reconstruir los trabajos (campos indexados: nombre_0, titulo_0, imagen_0, ...)
  contenido.trabajos = contenido.trabajos.map((t, i) => ({
    nombre: datos.get(`nombre_${i}`)?.toString() ?? t.nombre,
    titulo: datos.get(`titulo_${i}`)?.toString() ?? t.titulo,
    imagen: datos.get(`imagen_${i}`)?.toString() ?? t.imagen,
  }));

  // 6. Hacer commit del nuevo data.json
  const nuevo = Buffer.from(JSON.stringify(contenido, null, 2), "utf-8").toString("base64");
  await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: "Actualizar contenido desde el panel",
      content: nuevo,
      sha: archivo.sha,
      branch: BRANCH,
    }),
  });

  return redirect("/admin?guardado=1");
};