import { json } from './http.js';
import { hashPassword, randomToken, verifyPassword } from './password.js';

export async function ensureAdminSeeded(env) {
  const existing = await env.DB.prepare('SELECT id FROM admins LIMIT 1').first();
  if (existing) return;
  const username = env.DEFAULT_ADMIN_USERNAME || 'admin';
  const password = env.DEFAULT_ADMIN_PASSWORD || 'vimasneha2025';
  const passwordHash = await hashPassword(password);
  await env.DB.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)')
    .bind(username, passwordHash)
    .run();
}

export async function loginAdmin(env, username, password) {
  await ensureAdminSeeded(env);
  const admin = await env.DB.prepare('SELECT id, username, password_hash FROM admins WHERE username = ? LIMIT 1')
    .bind(username)
    .first();
  if (!admin) return null;
  const ok = await verifyPassword(password, admin.password_hash);
  if (!ok) return null;
  const token = randomToken(32);
  const ttlHours = Number(env.SESSION_TTL_HOURS || 8);
  const expiresAt = Math.floor(Date.now() / 1000) + ttlHours * 60 * 60;
  await env.DB.prepare('INSERT INTO sessions (admin_id, token, expires_at) VALUES (?, ?, ?)')
    .bind(admin.id, token, expiresAt)
    .run();
  return { admin: { id: admin.id, username: admin.username }, token, expiresAt };
}

export async function requireAdminSession(env, cookieToken) {
  if (!cookieToken) return null;
  const session = await env.DB.prepare(
    `SELECT sessions.id AS session_id, sessions.admin_id, sessions.token, sessions.expires_at, admins.username
     FROM sessions
     JOIN admins ON admins.id = sessions.admin_id
     WHERE sessions.token = ? LIMIT 1`
  ).bind(cookieToken).first();
  if (!session) return null;
  if (Number(session.expires_at) * 1000 <= Date.now()) {
    await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(cookieToken).run();
    return null;
  }
  return session;
}

export async function destroySession(env, token) {
  if (!token) return;
  await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
}

export function buildSessionCookie(name, token, expiresAt, secure = true) {
  const parts = [
    `${name}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=None',
    secure ? 'Secure' : ''
  ].filter(Boolean);
  if (expiresAt) parts.push(`Max-Age=${Math.max(0, Math.floor(expiresAt - Date.now() / 1000))}`);
  return parts.join('; ');
}

