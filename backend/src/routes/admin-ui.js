import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { ADMIN_UI } from '../admin-ui.generated.js';
import { requireAdminSession } from '../lib/auth.js';

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
    app.get(path, async (c) => {
      const target = adminTargetFromPath(path);
      const session = await getAdminSession(c);

      if (isLoginPath(path)) {
        if (session) return c.redirect(`/Head/${target}`);
        return htmlResponse(html);
      }

      if (!session) {
        return c.redirect(`/Head/admin-login?redirect=${encodeURIComponent(target)}`);
      }

      return htmlResponse(html);
    });
  }

  return app;
}

function isLoginPath(path) {
  return path.includes('admin-login');
}

function adminTargetFromPath(path) {
  const file = path.split('/').pop() || 'admin.html';
  if (file === 'admin-login' || file === 'admin-login.html') return 'admin.html';
  return file.endsWith('.html') ? file : `${file}.html`;
}

async function getAdminSession(c) {
  const cookieName = c.env.SESSION_COOKIE_NAME || 'vs_session';
  const token = getCookie(c, cookieName);
  return requireAdminSession(c.env, token);
}

function htmlResponse(html) {
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}
