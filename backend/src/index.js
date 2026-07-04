import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createAdminUiRoutes } from './routes/admin-ui.js';
import { createAdminRoutes } from './routes/admin.js';
import { createSiteRoutes } from './routes/site.js';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: (origin) => origin || '',
    credentials: true,
    allowHeaders: ['content-type', 'authorization', 'x-requested-with'],
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  })
);

app.get('/', (c) => c.redirect('/Head/admin-login'));
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

app.route('/', createAdminUiRoutes());
app.route('/api/admin', createAdminRoutes());
app.route('/api/site', createSiteRoutes());

export default app;
