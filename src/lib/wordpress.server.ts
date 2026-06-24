const GATEWAY = "https://connector-gateway.lovable.dev/wordpress_com";

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
  return process.env.WORDPRESS_SITE || "linenriga.wordpress.com";
}

export async function wpGet(path: string, query: Record<string, string | number> = {}) {
  const qs = new URLSearchParams(
    Object.entries(query).map(([k, v]) => [k, String(v)]),
  ).toString();
  const url = `${GATEWAY}/rest/v1.1/sites/${encodeURIComponent(site())}${path}${qs ? `?${qs}` : ""}`;
  const r = await fetch(url, { headers: headers() });
  const text = await r.text();
  if (!r.ok) throw new Error(`WP ${r.status}: ${text}`);
  return JSON.parse(text);
}

export async function wpPost(path: string, body: unknown) {
  const url = `${GATEWAY}/rest/v1.1/sites/${encodeURIComponent(site())}${path}`;
  const r = await fetch(url, { method: "POST", headers: headers(), body: JSON.stringify(body) });
  const text = await r.text();
  if (!r.ok) throw new Error(`WP ${r.status}: ${text}`);
  return JSON.parse(text);
}
