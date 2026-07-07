import { Hono } from 'hono';
import { json } from '../lib/http.js';
import { normalizeContentForPageKey, readJson, safePageKey } from '../lib/content.js';

export function createSiteRoutes() {
  const app = new Hono();

  app.get('/:pageKey', async (c) => {
    const pageKey = safePageKey(c.req.param('pageKey'));
    const row = await c.env.DB.prepare('SELECT page_key, content_json, updated_at FROM site_content WHERE page_key = ? LIMIT 1')
      .bind(pageKey)
      .first();
    const content = row ? JSON.parse(row.content_json || '{}') : {};
    return json({ ok: true, pageKey, content: normalizeContentForPageKey(pageKey, content), updatedAt: row?.updated_at || null });
  });

  app.get('/articles/news', async (c) => {
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

  app.get('/gallery', async (c) => {
    const rows = await c.env.DB.prepare(
      'SELECT id, title, image_url, uploaded_at FROM gallery_items ORDER BY uploaded_at DESC, id DESC'
    ).all();
    return json({ ok: true, items: rows.results || [] });
  });

  app.post('/contact', async (c) => {
    const body = await readJson(c.req.raw);
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();
    if (!name || !message) {
      return json({ ok: false, error: 'Name and message are required' }, { status: 400 });
    }
    await c.env.DB.prepare(
      'INSERT INTO contact_messages (name, email, message, submitted_at) VALUES (?, ?, ?, unixepoch())'
    ).bind(name, email, message).run();
    return json({ ok: true });
  });

  return app;
}
