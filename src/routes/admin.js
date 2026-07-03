import { Hono } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { json } from '../lib/http.js';
import { destroySession, loginAdmin, requireAdminSession } from '../lib/auth.js';
import { readJson, safePageKey } from '../lib/content.js';

export function createAdminRoutes() {
  const app = new Hono();
  const requireAdmin = async (c, next) => {
    const name = c.env.SESSION_COOKIE_NAME || 'vs_session';
    const token = getCookie(c, name);
    const session = await requireAdminSession(c.env, token);
    if (!session) return json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    c.set('adminSession', session);
    await next();
  };

  app.post('/login', async (c) => {
    const { username, password } = await readJson(c.req.raw);
    const result = await loginAdmin(c.env, username, password);
    if (!result) return json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
    const secure = new URL(c.req.url).protocol === 'https:';
    setCookie(c, c.env.SESSION_COOKIE_NAME || 'vs_session', result.token, {
      httpOnly: true,
      secure,
      sameSite: secure ? 'None' : 'Lax',
      path: '/',
      maxAge: Number(c.env.SESSION_TTL_HOURS || 8) * 60 * 60
    });
    return json({ ok: true, admin: result.admin });
  });

  app.post('/logout', async (c) => {
    const name = c.env.SESSION_COOKIE_NAME || 'vs_session';
    const token = getCookie(c, name);
    await destroySession(c.env, token);
    deleteCookie(c, name, { path: '/' });
    return json({ ok: true });
  });

  app.get('/me', async (c) => {
    const name = c.env.SESSION_COOKIE_NAME || 'vs_session';
    const token = getCookie(c, name);
    const session = await requireAdminSession(c.env, token);
    if (!session) return json({ ok: false, authenticated: false }, { status: 401 });
    return json({
      ok: true,
      authenticated: true,
      admin: { id: session.admin_id, username: session.username },
      expiresAt: session.expires_at
    });
  });

  app.use('/content/:pageKey', requireAdmin);
  app.use('/upload', requireAdmin);
  app.use('/news', requireAdmin);
  app.use('/news/*', requireAdmin);
  app.use('/gallery', requireAdmin);
  app.use('/gallery/*', requireAdmin);

  app.get('/content/:pageKey', async (c) => {
    const pageKey = safePageKey(c.req.param('pageKey'));
    const row = await c.env.DB.prepare('SELECT page_key, content_json, updated_at FROM site_content WHERE page_key = ? LIMIT 1')
      .bind(pageKey)
      .first();
    return json({ ok: true, pageKey, content: row ? JSON.parse(row.content_json || '{}') : {}, updatedAt: row?.updated_at || null });
  });

  app.put('/content/:pageKey', async (c) => {
    const pageKey = safePageKey(c.req.param('pageKey'));
    const { content } = await readJson(c.req.raw);
    const contentJson = JSON.stringify(content ?? {});
    await c.env.DB.prepare(
      `INSERT INTO site_content (page_key, content_json, updated_at)
       VALUES (?, ?, unixepoch())
       ON CONFLICT(page_key) DO UPDATE SET content_json = excluded.content_json, updated_at = unixepoch()`
    ).bind(pageKey, contentJson).run();
    return json({ ok: true, pageKey });
  });

  app.post('/upload', async (c) => {
    const form = await c.req.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      return json({ ok: false, error: 'Missing file' }, { status: 400 });
    }
    if (!file.type.startsWith('image/')) {
      return json({ ok: false, error: 'Only image uploads are supported' }, { status: 400 });
    }
    const folder = String(form.get('folder') || 'uploads').replace(/[^a-z0-9/_-]/gi, '');
    const ext = extensionForMime(file.type, file.name);
    const key = `${folder}/${Date.now()}-${crypto.randomUUID()}${ext}`;
    await c.env.ASSETS.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type }
    });
    const url = new URL(`/uploads/${key}`, c.req.url).toString();
    return json({ ok: true, key, url });
  });

  app.get('/news', async (c) => {
    const rows = await c.env.DB.prepare(
      'SELECT id, title, body, image_url, published_at FROM news_articles ORDER BY published_at DESC, id DESC'
    ).all();
    return json({ ok: true, articles: rows.results || [] });
  });

  app.get('/news/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const row = await c.env.DB.prepare(
      'SELECT id, title, body, image_url, published_at FROM news_articles WHERE id = ? LIMIT 1'
    ).bind(id).first();
    if (!row) return json({ ok: false, error: 'Not found' }, { status: 404 });
    return json({ ok: true, article: row });
  });

  app.post('/news', async (c) => {
    const body = await c.req.json();
    const title = String(body.title || '').trim();
    if (!title) return json({ ok: false, error: 'Title is required' }, { status: 400 });
    const articleBody = String(body.body || '').trim();
    const imageUrl = String(body.image_url || '').trim();
    const publishedAt = body.published_at ? Number(body.published_at) : Math.floor(Date.now() / 1000);
    const result = await c.env.DB.prepare(
      'INSERT INTO news_articles (title, body, image_url, published_at) VALUES (?, ?, ?, ?)'
    ).bind(title, articleBody, imageUrl, publishedAt).run();
    return json({ ok: true, id: result.meta.last_row_id });
  });

  app.put('/news/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json();
    const title = String(body.title || '').trim();
    if (!title) return json({ ok: false, error: 'Title is required' }, { status: 400 });
    const articleBody = String(body.body || '').trim();
    const imageUrl = String(body.image_url || '').trim();
    const publishedAt = body.published_at ? Number(body.published_at) : Math.floor(Date.now() / 1000);
    const result = await c.env.DB.prepare(
      'UPDATE news_articles SET title = ?, body = ?, image_url = ?, published_at = ? WHERE id = ?'
    ).bind(title, articleBody, imageUrl, publishedAt, id).run();
    if (!result.meta.changes) return json({ ok: false, error: 'Not found' }, { status: 404 });
    return json({ ok: true, id });
  });

  app.delete('/news/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const result = await c.env.DB.prepare('DELETE FROM news_articles WHERE id = ?').bind(id).run();
    if (!result.meta.changes) return json({ ok: false, error: 'Not found' }, { status: 404 });
    return json({ ok: true });
  });

  app.get('/gallery', async (c) => {
    const rows = await c.env.DB.prepare(
      'SELECT id, title, image_url, uploaded_at FROM gallery_items ORDER BY uploaded_at DESC, id DESC'
    ).all();
    return json({ ok: true, items: rows.results || [] });
  });

  app.post('/gallery', async (c) => {
    const body = await c.req.json();
    const title = String(body.title || '').trim();
    if (!title) return json({ ok: false, error: 'Title is required' }, { status: 400 });
    const imageUrl = String(body.image_url || '').trim();
    const result = await c.env.DB.prepare(
      'INSERT INTO gallery_items (title, image_url, uploaded_at) VALUES (?, ?, unixepoch())'
    ).bind(title, imageUrl).run();
    return json({ ok: true, id: result.meta.last_row_id });
  });

  app.put('/gallery/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json();
    const title = String(body.title || '').trim();
    if (!title) return json({ ok: false, error: 'Title is required' }, { status: 400 });
    const imageUrl = String(body.image_url || '').trim();
    const result = await c.env.DB.prepare(
      'UPDATE gallery_items SET title = ?, image_url = ? WHERE id = ?'
    ).bind(title, imageUrl, id).run();
    if (!result.meta.changes) return json({ ok: false, error: 'Not found' }, { status: 404 });
    return json({ ok: true, id });
  });

  app.delete('/gallery/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const result = await c.env.DB.prepare('DELETE FROM gallery_items WHERE id = ?').bind(id).run();
    if (!result.meta.changes) return json({ ok: false, error: 'Not found' }, { status: 404 });
    return json({ ok: true });
  });

  return app;
}

function extensionForMime(mime, filename = '') {
  if (mime === 'image/png') return '.png';
  if (mime === 'image/jpeg') return '.jpg';
  if (mime === 'image/webp') return '.webp';
  if (mime === 'image/gif') return '.gif';
  const match = String(filename).match(/\.[a-z0-9]+$/i);
  return match ? match[0].toLowerCase() : '';
}
