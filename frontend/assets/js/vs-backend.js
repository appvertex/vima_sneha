(() => {
  const API_BASE = window.VS_API_BASE || 'https://vima-sneha-api.vimasneha.workers.dev';

  async function request(path, options = {}) {
    const headers = new Headers(options.headers || {});
    const isJsonBody = options.body && !(options.body instanceof FormData);
    if (isJsonBody && !headers.has('content-type')) headers.set('content-type', 'application/json');
    const response = await fetch(`${API_BASE}${path}`, {
      credentials: 'include',
      ...options,
      headers
    });
    if (!response.ok) {
      let details = {};
      try {
        details = await response.json();
      } catch {}
      const error = new Error(details.error || `Request failed with ${response.status}`);
      error.status = response.status;
      error.details = details;
      throw error;
    }
    if (response.status === 204) return null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) return response.json();
    return response.text();
  }

  window.VSBackend = {
    request,
    login(username, password) {
      return request('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
    },
    logout() {
      return request('/api/admin/logout', { method: 'POST' }).catch(() => ({ ok: true }));
    },
    getAdminContent(pageKey) {
      return request(`/api/admin/content/${encodeURIComponent(pageKey)}`);
    },
    saveAdminContent(pageKey, content) {
      return request(`/api/admin/content/${encodeURIComponent(pageKey)}`, {
        method: 'PUT',
        body: JSON.stringify({ content })
      });
    },
    uploadImage(file, folder = 'uploads') {
      const form = new FormData();
      form.append('file', file);
      form.append('folder', folder);
      return request('/api/admin/upload', {
        method: 'POST',
        body: form
      });
    },
    getSiteContent(pageKey) {
      return request(`/api/site/${encodeURIComponent(pageKey)}`);
    },
    submitContact(payload) {
      return request('/api/site/contact', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    },
    async requireAdmin(pageKey = 'admin.html') {
      try {
        await request('/api/admin/content/home');
        return true;
      } catch (error) {
        if (error.status === 401) {
          const loginTarget = `admin-login.html?redirect=${encodeURIComponent(pageKey)}`;
          location.href = loginTarget;
          return false;
        }
        throw error;
      }
    }
  };
})();
