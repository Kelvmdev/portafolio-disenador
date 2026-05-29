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
  const nombre = datos.get("nombre")?.toString() ?? "";
  const tagline = datos.get("tagline")?.toString() ?? "";

  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "portafolio-cms",
  };
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${ARCHIVO}`;

  // 3. Traer el data.json actual de GitHub (necesitamos su "sha")
  const respGet = await fetch(`${url}?ref=${BRANCH}`, { headers });
  const archivo = await respGet.json();
  const contenido = JSON.parse(Buffer.from(archivo.content, "base64").toString("utf-8"));

  // 4. Cambiar los campos
  contenido.sitio.nombre = nombre;
  contenido.sitio.tagline = tagline;

  // 5. Hacer commit del nuevo data.json
  const nuevo = Buffer.from(JSON.stringify(contenido, null, 2), "utf-8").toString("base64");
  const respPut = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: "Actualizar contenido desde el panel",
      content: nuevo,
      sha: archivo.sha,
      branch: BRANCH,
    }),
  });

  console.log("GitHub → GET:", respGet.status, "| PUT:", respPut.status);

  return redirect("/admin?guardado=1");
};