export const ALLOWED_PAGE_KEYS = new Set(['home', 'counselling', 'insurance', 'pages', 'news', 'gallery', 'contact']);

export function safePageKey(value) {
  const key = String(value || '').trim();
  if (!ALLOWED_PAGE_KEYS.has(key)) {
    throw new Error(`Unsupported page key: ${key}`);
  }
  return key;
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

export function normalizeContentForPageKey(pageKey, content) {
  if (pageKey !== 'pages') return content || {};
  const data = content || {};
  if (data.insurancePages && typeof data.insurancePages === 'object' && !Array.isArray(data.insurancePages)) {
    return data;
  }
  return { insurancePages: data };
}
