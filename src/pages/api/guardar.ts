import type { APIRoute } from "astro";

export const prerender = false;

const OWNER = import.meta.env.GITHUB_OWNER;
const REPO = import.meta.env.GITHUB_REPO;
const BRANCH = import.meta.env.GITHUB_BRANCH;
const TOKEN = import.meta.env.GITHUB_TOKEN;
const ARCHIVO = "src/data.json";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  // 1. Proteger con la cookie
  if (cookies.get("sesion")?.value !== "ok") {
    return redirect("/admin");
  }

  const datos = await request.formData();

  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "portafolio-cms",
  };
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${ARCHIVO}`;

  try {
    // 2. Traer el data.json actual — y VERIFICAR que respondió bien
    const respGet = await fetch(`${url}?ref=${BRANCH}`, { headers });
    if (!respGet.ok) {
      return redirect("/admin?error_guardar=1");
    }
    const archivo = await respGet.json() as { content: string; sha: string };
    const contenido = JSON.parse(Buffer.from(archivo.content, "base64").toString("utf-8"));

    // 3. Actualizar el sitio
    contenido.sitio.nombre = datos.get("nombre")?.toString() ?? "";
    contenido.sitio.tagline = datos.get("tagline")?.toString() ?? "";

    // 4. Reconstruir los trabajos
    const total = Number(datos.get("total") ?? 0);
    const nuevosTrabajos = [];
    for (let i = 0; i < total; i++) {
      let imagenes: string[] = [];
      try {
        imagenes = JSON.parse(datos.get(`imagenes_${i}`)?.toString() ?? "[]");
      } catch {
        imagenes = [];
      }
      nuevosTrabajos.push({
        nombre: datos.get(`nombre_${i}`)?.toString() ?? "",
        titulo: datos.get(`titulo_${i}`)?.toString() ?? "",
        imagenes,
      });
    }
    contenido.trabajos = nuevosTrabajos;

    // 5. Commit del nuevo data.json — y VERIFICAR que se guardó
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
    if (!respPut.ok) {
      return redirect("/admin?error_guardar=1");
    }

    return redirect("/admin?guardado=1");
  } catch {
    return redirect("/admin?error_guardar=1");
  }
};