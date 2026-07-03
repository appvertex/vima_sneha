export function json(data, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set('content-type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), { ...init, headers });
}

export function empty(init = {}) {
  return new Response(null, init);
}

export function corsHeaders(origin) {
  const headers = new Headers();
  if (origin) {
    headers.set('access-control-allow-origin', origin);
    headers.set('vary', 'Origin');
  }
  headers.set('access-control-allow-credentials', 'true');
  headers.set('access-control-allow-headers', 'content-type, authorization, x-requested-with');
  headers.set('access-control-allow-methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  return headers;
}

export function withCors(response, origin) {
  const headers = corsHeaders(origin);
  const out = new Headers(response.headers);
  headers.forEach((value, key) => out.set(key, value));
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers: out });
}

