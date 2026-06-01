import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const datos = await request.formData();
  const clave = datos.get("password");

  

  if (clave === import.meta.env.ADMIN_PASSWORD) {
   cookies.set("sesion", "ok", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 8,
      sameSite: "lax",
      secure: import.meta.env.PROD,
    });
    return redirect("/admin");
  }

  return redirect("/admin?error=1");
};