document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop();
  
  const navHtml = `
  <style>
    .global-admin-selector {
      display: flex;
      justify-content: center;
      background: rgba(255, 255, 255, 0.7);
      padding: 4px;
      border-radius: 16px;
      border: 1px solid rgba(180, 127, 166, 0.2);
      gap: 5px;
    }
    .global-selector-item {
      padding: 8px 16px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 700;
      color: var(--dm, #7A4F72);
      text-decoration: none;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Poppins', sans-serif;
    }
    .global-selector-item:hover {
      background: rgba(180, 127, 166, 0.08);
    }
    .global-selector-item.active {
      background: linear-gradient(135deg, var(--pm, #B47FA6), var(--dm, #7A4F72));
      color: #fff;
      box-shadow: 0 4px 15px rgba(122, 79, 114, 0.25);
    }
    .global-selector-item span {
      font-size: 15px;
    }
    @media(max-width: 900px) {
      .global-selector-item span { display: none; }
      .global-selector-item { padding: 6px 10px; font-size: 12px; }
    }
  </style>
  <nav class="global-admin-selector">
    <a href="admin.html" class="global-selector-item ${currentPath === 'admin.html' ? 'active' : ''}"><span>🏠</span> Main</a>
    <a href="admin-counselling.html" class="global-selector-item ${currentPath === 'admin-counselling.html' ? 'active' : ''}"><span>🧠</span> Counselling</a>
    <a href="admin-insurance.html" class="global-selector-item ${currentPath === 'admin-insurance.html' ? 'active' : ''}"><span>🛡️</span> Insurance</a>
  </nav>
  `;

  const topbar = document.querySelector('.topbar');
  if (topbar) {
    const navContainer = document.createElement('div');
    navContainer.innerHTML = navHtml;
    // Insert in the middle of topbar
    if (topbar.children.length > 1) {
        topbar.insertBefore(navContainer, topbar.children[1]);
    } else {
        topbar.appendChild(navContainer);
    }
  }
});
