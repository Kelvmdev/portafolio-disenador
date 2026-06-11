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

  // 2. Leer el payload del panel (JSON con sitio + servicios + trabajos)
  const form = await request.formData();
  let p: any;
  try {
    p = JSON.parse(form.get("payload")?.toString() ?? "");
  } catch {
    return redirect("/admin?error_guardar=1");
  }
  if (!p || typeof p !== "object") {
    return redirect("/admin?error_guardar=1");
  }

  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "portafolio-cms",
  };
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${ARCHIVO}`;

  try {
    // 3. Traer el data.json actual de GitHub (sha + contenido) — y verificar
    const respGet = await fetch(`${url}?ref=${BRANCH}`, { headers });
    if (!respGet.ok) {
      return redirect("/admin?error_guardar=1");
    }
    const archivo = (await respGet.json()) as { content: string; sha: string };
    const remoto = JSON.parse(Buffer.from(archivo.content, "base64").toString("utf-8"));

    // 4. BLINDAJE: partir del remoto y sobreescribir SOLO lo editado, sin
    //    aplastar los objetos anidados (tagline u otras claves no editadas se
    //    conservan; titular/sobre/contacto/redes se mezclan en profundidad).
    const ps = p.sitio ?? {};
    const data = { ...remoto };
    data.sitio = {
      ...remoto.sitio,
      ...ps,
      titular: { ...remoto.sitio?.titular, ...ps.titular },
      sobre: { ...remoto.sitio?.sobre, ...ps.sobre },
      contacto: { ...remoto.sitio?.contacto, ...ps.contacto },
      redes: { ...remoto.sitio?.redes, ...ps.redes },
    };
    if (Array.isArray(p.servicios)) data.servicios = p.servicios;
    if (Array.isArray(p.trabajos)) data.trabajos = p.trabajos;

    // 5. Commit del nuevo data.json (Contents API: un PUT = un commit) — y verificar
    const nuevo = Buffer.from(JSON.stringify(data, null, 2), "utf-8").toString("base64");
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
