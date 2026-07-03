import { Hono } from 'hono';
import { createAdminRoutes } from './routes/admin.js';
import { createSiteRoutes } from './routes/site.js';
import { corsHeaders, empty, withCors } from './lib/http.js';

const app = new Hono();

app.use('*', async (c, next) => {
  const origin = c.req.header('origin');
  c.set('origin', origin || '');
  if (c.req.method === 'OPTIONS') {
    return empty({ status: 204, headers: corsHeaders(origin || '') });
  }
  await next();
  return withCors(c.res, origin || '');
});

app.get('/health', (c) => c.json({ ok: true }));

app.get('/uploads/*', async (c) => {
  const key = c.req.path.replace(/^\/uploads\//, '');
  const object = await c.env.ASSETS.get(key);
  if (!object) return c.notFound();
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('cache-control', 'public, max-age=31536000, immutable');
  return new Response(object.body, { headers });
});

app.route('/api/admin', createAdminRoutes());
app.route('/api/site', createSiteRoutes());

export default app;
