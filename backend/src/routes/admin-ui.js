import { Hono } from 'hono';
import { ADMIN_UI } from '../admin-ui.generated.js';

export function createAdminUiRoutes() {
  const app = new Hono();

  const pages = [
    ['/Head/admin-login', ADMIN_UI.login],
    ['/Head/admin-login.html', ADMIN_UI.login],
    ['/Head/admin', ADMIN_UI.main],
    ['/Head/admin.html', ADMIN_UI.main],
    ['/Head/admin-counselling', ADMIN_UI.counselling],
    ['/Head/admin-counselling.html', ADMIN_UI.counselling],
    ['/Head/admin-insurance', ADMIN_UI.insurance],
    ['/Head/admin-insurance.html', ADMIN_UI.insurance],
    ['/Head/admin-pages', ADMIN_UI.pages],
    ['/Head/admin-pages.html', ADMIN_UI.pages]
  ];

  for (const [path, html] of pages) {
    app.get(path, () => htmlResponse(html));
  }

  return app;
}

function htmlResponse(html) {
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}
