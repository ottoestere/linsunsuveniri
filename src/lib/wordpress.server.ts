const GATEWAY = "https://connector-gateway.lovable.dev/wordpress_com";
const DEFAULT_SITE_ID = "255764913";

function headers() {
  const lov = process.env.LOVABLE_API_KEY;
  const wp = process.env.WORDPRESS_COM_API_KEY;
  if (!lov) throw new Error("LOVABLE_API_KEY is not configured");
  if (!wp) throw new Error("WORDPRESS_COM_API_KEY is not configured");
  return {
    Authorization: `Bearer ${lov}`,
    "X-Connection-Api-Key": wp,
    "Content-Type": "application/json",
  };
}

function site() {
  return process.env.WORDPRESS_SITE_ID || DEFAULT_SITE_ID;
}

function wordpressError(status: number, body: string) {
  try {
    const parsed = JSON.parse(body) as { error?: string; message?: string };
    if (parsed.error === "unknown_blog") {
      return new Error(
        "The connected WordPress.com account cannot access the configured Linen Riga blog. Reconnect WordPress.com with the site owner's account.",
      );
    }
    if (parsed.error === "authorization_required" || parsed.error === "unauthorized") {
      return new Error(
        "WordPress.com needs to be reconnected with permission to read and manage posts for this site.",
      );
    }
    if (parsed.message) return new Error(parsed.message);
  } catch {
    // Fall through to the generic message below.
  }
  return new Error(`WordPress.com request failed (${status}). Please try again.`);
}

export async function wpGet(path: string, query: Record<string, string | number> = {}) {
  const qs = new URLSearchParams(
    Object.entries(query).map(([k, v]) => [k, String(v)]),
  ).toString();
  const url = `${GATEWAY}/rest/v1.1/sites/${encodeURIComponent(site())}${path}${qs ? `?${qs}` : ""}`;
  const r = await fetch(url, { headers: headers() });
  const text = await r.text();
  if (!r.ok) throw wordpressError(r.status, text);
  return JSON.parse(text);
}

export async function wpPost(path: string, body: unknown) {
  const url = `${GATEWAY}/rest/v1.1/sites/${encodeURIComponent(site())}${path}`;
  const r = await fetch(url, { method: "POST", headers: headers(), body: JSON.stringify(body) });
  const text = await r.text();
  if (!r.ok) throw wordpressError(r.status, text);
  return JSON.parse(text);
}
