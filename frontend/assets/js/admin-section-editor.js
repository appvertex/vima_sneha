(function () {
  const MODE = window.ADMIN_EDITOR_MODE || 'gallery';
  const PLAN_FILES = [
    'term-life-insurance.html',
    'health-plans.html',
    'endowment-plans.html',
    'pension-plans.html',
    'children-plans.html',
    'ulip-plans.html',
    'money-back-plans.html',
    'whole-life-plans.html',
    'micro-insurance.html'
  ];

  const DEFAULTS = {
    gallery: {
      badge: 'Our Journey',
      title: 'Moments of Impact',
      highlight: 'Impact',
      desc: 'A visual chronicle of workshops, community outreach, and lives transformed through our counselling and insurance services.',
      ctaTitle: 'Be part of our story.',
      ctaDesc: 'Every session, every workshop, every life changed - your journey could be next.',
      ctaText: 'Start Your Journey',
      categories: ['workshops', 'events', 'community', 'awards'],
      items: [
        { title: 'Student Workshops', desc: 'Empowering young minds', icon: 'groups', category: 'workshops', size: 'large', image: '' },
        { title: 'Annual Events', desc: '', icon: 'celebration', category: 'events', size: 'small', image: '' },
        { title: 'Outreach', desc: '', icon: 'volunteer_activism', category: 'community', size: 'small', image: '' },
        { title: 'MDRT Recognition', desc: 'Excellence in service and dedication', icon: 'emoji_events', category: 'awards', size: 'wide', image: '' }
      ]
    },
    news: {
      badge: 'News & Updates',
      title: 'Latest News',
      highlight: 'News',
      desc: 'Stay informed with the latest insights, events, and announcements from our mental health and financial security practice.',
      categories: ['all', 'counselling', 'insurance', 'wellness', 'community', 'announcement'],
      featuredBadge: 'Featured Story',
      newsletterBadge: 'Stay Updated',
      newsletterTitle: 'Never Miss an Update',
      newsletterDesc: 'Subscribe to our newsletter for the latest counselling insights, insurance tips, and community events delivered straight to your inbox.',
      newsletterButtonText: 'Subscribe',
      articles: [
        { featured: true, category: 'counselling', image: 'assets/images/hero-counselling.png', title: 'Breaking the Stigma: Why Mental Health Awareness Matters More Than Ever', excerpt: 'As we navigate an increasingly complex world, understanding and prioritising mental health has become essential.', date: 'April 20, 2026', readTime: '5 min read', author: "Maria Mildred D'Souza", avatar: 'MM' },
        { featured: false, category: 'counselling', image: 'assets/images/counselling_session.jpg', title: 'Understanding Exam Stress: A Guide for Students and Parents', excerpt: 'Learn practical strategies to manage exam anxiety and create a supportive environment for academic success.', date: 'April 18, 2026', readTime: '4 min read', author: "Maria D'Souza", avatar: 'MM' },
        { featured: false, category: 'insurance', image: 'assets/images/hero-insurance.png', title: '5 Essential Insurance Plans Every Family Should Consider', excerpt: "Discover the key insurance plans that form the foundation of a robust financial safety net for your family's future security.", date: 'April 15, 2026', readTime: '6 min read', author: 'Sachin Noronha', avatar: 'SN' }
      ]
    },
    contact: {
      badge: 'Reach Out',
      title: "Let's Connect",
      highlight: 'Connect',
      desc: "We'd love to hear from you. Whether it's a counselling query or insurance consultation - we're here to help.",
      serviceLabels: { counselling: 'Counselling', insurance: 'Insurance' },
      formTitle: 'Send us a message',
      formDesc: 'We typically respond within 2 hours during business hours.',
      placeholders: {
        name: 'Full Name',
        phone: 'WhatsApp Number',
        email: 'Email (optional)',
        message: 'How can we help you?'
      },
      submitText: 'Send Message',
      successTitle: 'Message Sent!',
      successDesc: "We'll get back to you shortly. Redirecting to WhatsApp...",
      resetText: 'Send Another Message',
      cards: [
        { type: 'counselling', icon: 'psychology', title: 'Counselling', value: '+91 99728 75970', sub: "Maria Mildred D'Souza", href: 'tel:+919972875970' },
        { type: 'insurance', icon: 'shield', title: 'Insurance', value: '+91 99459 33822', sub: 'Sachin Suraj Noronha', href: 'tel:+919945933822' },
        { type: 'whatsapp', icon: 'chat', title: 'WhatsApp', value: 'Chat Instantly', sub: 'Quick replies guaranteed', href: 'https://wa.me/919972875970' },
        { type: 'location', icon: 'location_on', title: 'Location', value: 'Mangaluru', sub: 'Karnataka, India', href: '' },
        { type: 'hours', icon: 'schedule', title: 'Hours', value: 'Mon - Sat: 9 AM - 7 PM', sub: 'Sunday by appointment', href: '' }
      ]
    },
    insurancePages: {}
  };

  const DEFAULT_INSURANCE_PLAN = {
    badge: 'Insurance Plan',
    title: 'Plan Name',
    highlight: 'Protection',
    desc: 'Describe the plan in a simple, human way.',
    image: 'https://vima-sneha.pages.dev/assets/images/hero-insurance.png',
    metaDesc: 'Insurance plan details from Vima Sneha.',
    ctaText: 'Consult an Expert',
    trustTitle: '100% Secure',
    trustDesc: 'IRDAI Approved Plans',
    products: [
      { name: 'Featured Plan', planNo: 'Plan No:', icon: 'verified_user', button: 'Get Details', points: ['Benefit one', 'Benefit two'] }
    ]
  };

  const PAGE_META = {
    gallery: {
      title: 'Gallery Admin',
      subtitle: 'Edit the gallery page content that shows on the public site.',
      preview: '../gallery.html',
      contentKey: 'gallery'
    },
    news: {
      title: 'News Admin',
      subtitle: 'Edit the news page content that shows on the public site.',
      preview: '../news.html',
      contentKey: 'news'
    },
    contact: {
      title: 'Contact Admin',
      subtitle: 'Edit the contact page content that shows on the public site.',
      preview: '../contact.html',
      contentKey: 'contact'
    },
    insurancePages: {
      title: 'Insurance Pages Admin',
      subtitle: 'Edit the individual insurance detail pages.',
      preview: '../insurance/term-life-insurance.html',
      contentKey: 'pages'
    }
  };

  let STATE = clone(DEFAULTS[MODE] || {});
  let dirty = false;
  let activePlan = PLAN_FILES[0];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function merge(base, override) {
    const out = Array.isArray(base) ? base.slice() : { ...base };
    Object.keys(override || {}).forEach((key) => {
      if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key]) && base[key]) {
        out[key] = merge(base[key], override[key]);
      } else {
        out[key] = override[key];
      }
    });
    return out;
  }

  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function pathToKeys(path) {
    return String(path).replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
  }

  function getPath(root, path) {
    return pathToKeys(path).reduce((acc, key) => acc?.[key], root);
  }

  function setPath(root, path, value) {
    const keys = pathToKeys(path);
    let cursor = root;
    while (keys.length > 1) cursor = cursor[keys.shift()];
    cursor[keys[0]] = value;
    markDirty();
  }

  function ensureStateShape() {
    if (MODE === 'insurancePages') {
      STATE.insurancePages = STATE.insurancePages || {};
      PLAN_FILES.forEach((file) => {
        STATE.insurancePages[file] = merge(clone(DEFAULT_INSURANCE_PLAN), STATE.insurancePages[file] || {});
      });
    }
  }

  function markDirty() {
    dirty = true;
    const pill = document.getElementById('status-text');
    if (pill) pill.textContent = 'Editing...';
    const badge = document.getElementById('status-pill');
    if (badge) badge.classList.add('dirty');
  }

  function clearDirty() {
    dirty = false;
    const pill = document.getElementById('status-text');
    if (pill) pill.textContent = 'Saved';
    const badge = document.getElementById('status-pill');
    if (badge) badge.classList.remove('dirty');
  }

  function topbar() {
    const meta = PAGE_META[MODE];
    return `
      <header class="topbar">
        <div class="brand-block">
          <div class="brand-mark">VS</div>
          <div class="brand-copy">
            <h1>${esc(meta.title)}</h1>
            <p>${esc(meta.subtitle)}</p>
          </div>
        </div>
        <div class="top-actions">
          <span class="status-pill" id="status-pill"><span class="material-symbols-outlined" style="font-size:16px;">check_circle</span><span id="status-text">Saved</span></span>
          <a class="view-btn" id="view-link" href="${esc(meta.preview)}" target="_blank" rel="noreferrer"><span class="material-symbols-outlined" style="font-size:16px;">open_in_new</span>Open Page</a>
          <a class="ghost-btn" href="admin.html"><span class="material-symbols-outlined" style="font-size:16px;">dashboard</span>Main Admin</a>
          <button class="save-btn" onclick="saveAll()"><span class="material-symbols-outlined" style="font-size:16px;">save</span>Save Changes</button>
        </div>
      </header>
    `;
  }

  function shell() {
    return `
      <div class="app-shell" id="app">
        ${topbar()}
        <main class="workspace" id="workspace"></main>
      </div>
      <div class="toast" id="toast"></div>
    `;
  }

  function field(path, label, opts = {}) {
    const value = getPath(STATE, path) ?? '';
    const type = opts.type || 'text';
    if (type === 'textarea') {
      return `
        <div class="field">
          <label>${esc(label)}</label>
          <textarea rows="${opts.rows || 3}" oninput="setValue('${path}', this.value)">${esc(value)}</textarea>
        </div>
      `;
    }
    if (type === 'select') {
      return `
        <div class="field">
          <label>${esc(label)}</label>
          <select onchange="setValue('${path}', this.value)">
            ${opts.options.map((option) => `<option value="${esc(option)}" ${String(option) === String(value) ? 'selected' : ''}>${esc(option)}</option>`).join('')}
          </select>
        </div>
      `;
    }
    if (type === 'checkbox') {
      return `
        <div class="field" style="display:flex;align-items:center;gap:10px;">
          <input type="checkbox" ${value ? 'checked' : ''} onchange="setValue('${path}', this.checked)">
          <label style="margin:0">${esc(label)}</label>
        </div>
      `;
    }
    return `
      <div class="field">
        <label>${esc(label)}</label>
        <input type="text" value="${esc(value)}" oninput="setValue('${path}', this.value)">
      </div>
    `;
  }

  function stringListSection(title, path, defaultValue) {
    const values = getPath(STATE, path) || [];
    return `
      <section class="section">
        <div class="section-head">
          <div>
            <h2>${esc(title)}</h2>
            <p>Edit the simple list items used on the public page.</p>
          </div>
        </div>
        <div class="edit-grid">
          ${values.map((item, index) => `
            <div class="edit-card">
              <div class="edit-card-header">Item ${index + 1} <button class="del-btn" style="float:right" onclick="removeListItem('${path}', ${index})">×</button></div>
              <div class="edit-card-body">
                <div class="field">
                  <label>Value</label>
                  <input type="text" value="${esc(item)}" oninput="setListValue('${path}', ${index}, this.value)">
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="add-btn" onclick="addListItem('${path}', ${JSON.stringify(defaultValue)})">+ Add Item</button>
      </section>
    `;
  }

  function objectListSection(title, path, fields, defaultItem) {
    const values = getPath(STATE, path) || [];
    return `
      <section class="section">
        <div class="section-head">
          <div>
            <h2>${esc(title)}</h2>
            <p>Edit the cards used on the public page.</p>
          </div>
        </div>
        <div class="edit-grid">
          ${values.map((item, index) => `
            <div class="edit-card">
              <div class="edit-card-header">${esc(title.slice(0, -1) || 'Item')} ${index + 1} <button class="del-btn" style="float:right" onclick="removeListItem('${path}', ${index})">×</button></div>
              <div class="edit-card-body">
                ${fields.map((f) => field(`${path}[${index}].${f.key}`, f.label, f)).join('')}
                ${typeof item.points !== 'undefined' ? pointsEditor(path, index) : ''}
              </div>
            </div>
          `).join('')}
        </div>
        <button class="add-btn" onclick="addObjectItem('${path}', ${JSON.stringify(defaultItem)})">+ Add ${esc(title.slice(0, -1) || 'Item')}</button>
      </section>
    `;
  }

  function pointsEditor(path, index) {
    const points = getPath(STATE, `${path}[${index}].points`) || [];
    return `
      <div class="field">
        <label>Benefit Points</label>
        <div class="field-list">
          ${points.map((point, pointIndex) => `
            <div class="list-row">
              <input type="text" value="${esc(point)}" oninput="setListValue('${path}[${index}].points', ${pointIndex}, this.value)">
              <button class="del-btn" type="button" onclick="removeListItem('${path}[${index}].points', ${pointIndex})">×</button>
            </div>
          `).join('')}
        </div>
        <button class="add-btn" type="button" onclick="addListItem('${path}[${index}].points', 'New benefit point')">+ Add Point</button>
      </div>
    `;
  }

  function renderGallery() {
    return `
      <section class="section">
        <div class="section-head"><div><h2>Gallery Hero</h2><p>Main intro content for the gallery page.</p></div></div>
        <div class="edit-grid">
          <div class="edit-card"><div class="edit-card-body">${field('badge','Badge')}${field('title','Title')}${field('highlight','Highlight')}${field('desc','Description',{type:'textarea',rows:4})}</div></div>
          <div class="edit-card"><div class="edit-card-body">${field('ctaTitle','CTA Title')}${field('ctaDesc','CTA Description',{type:'textarea',rows:4})}${field('ctaText','CTA Button Text')}</div></div>
        </div>
      </section>
      ${stringListSection('Categories', 'categories', 'new-category')}
      ${objectListSection('Gallery Items', 'items', [
        { key: 'title', label: 'Title' },
        { key: 'desc', label: 'Description', type: 'textarea', rows: 3 },
        { key: 'icon', label: 'Icon Key' },
        { key: 'category', label: 'Category' },
        { key: 'size', label: 'Size' },
        { key: 'image', label: 'Image Path or URL' }
      ], { title: 'New Gallery Tile', desc: 'Short supporting copy', icon: 'image', category: 'workshops', size: 'small', image: '' })}
    `;
  }

  function renderNews() {
    return `
      <section class="section">
        <div class="section-head"><div><h2>News Hero</h2><p>Top section content plus the newsletter block.</p></div></div>
        <div class="edit-grid">
          <div class="edit-card"><div class="edit-card-body">${field('badge','Badge')}${field('title','Title')}${field('highlight','Highlight')}${field('desc','Description',{type:'textarea',rows:4})}</div></div>
          <div class="edit-card"><div class="edit-card-body">${field('featuredBadge','Featured Badge')}${field('newsletterBadge','Newsletter Badge')}${field('newsletterTitle','Newsletter Title')}${field('newsletterDesc','Newsletter Description',{type:'textarea',rows:4})}${field('newsletterButtonText','Newsletter Button Text')}</div></div>
        </div>
      </section>
      ${stringListSection('Categories', 'categories', 'announcement')}
      ${objectListSection('Articles', 'articles', [
        { key: 'featured', label: 'Featured', type: 'checkbox' },
        { key: 'category', label: 'Category' },
        { key: 'image', label: 'Image Path or URL' },
        { key: 'title', label: 'Title' },
        { key: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 3 },
        { key: 'date', label: 'Date' },
        { key: 'readTime', label: 'Read Time' },
        { key: 'author', label: 'Author' },
        { key: 'avatar', label: 'Avatar' }
      ], { featured: false, category: 'announcement', image: '', title: 'New Article', excerpt: 'Add the summary your visitors should skim first.', date: 'May 19, 2026', readTime: '3 min read', author: 'Vima Sneha Team', avatar: 'VS' })}
    `;
  }

  function renderContact() {
    return `
      <section class="section">
        <div class="section-head"><div><h2>Contact Hero</h2><p>Edit the public contact page copy and support fields.</p></div></div>
        <div class="edit-grid">
          <div class="edit-card"><div class="edit-card-body">${field('badge','Badge')}${field('title','Title')}${field('highlight','Highlight')}${field('desc','Description',{type:'textarea',rows:4})}</div></div>
          <div class="edit-card"><div class="edit-card-body">${field('formTitle','Form Title')}${field('formDesc','Form Description',{type:'textarea',rows:3})}${field('submitText','Submit Button Text')}${field('successTitle','Success Title')}${field('successDesc','Success Description',{type:'textarea',rows:3})}${field('resetText','Reset Button Text')}</div></div>
        </div>
        <div class="edit-grid">
          <div class="edit-card"><div class="edit-card-body">${field('serviceLabels.counselling','Counselling Tab')}${field('serviceLabels.insurance','Insurance Tab')}</div></div>
          <div class="edit-card"><div class="edit-card-body">${field('placeholders.name','Name Placeholder')}${field('placeholders.phone','Phone Placeholder')}${field('placeholders.email','Email Placeholder')}${field('placeholders.message','Message Placeholder')}</div></div>
        </div>
      </section>
      ${objectListSection('Contact Cards', 'cards', [
        { key: 'type', label: 'Type' },
        { key: 'icon', label: 'Icon Key' },
        { key: 'title', label: 'Title' },
        { key: 'value', label: 'Value' },
        { key: 'sub', label: 'Subtext', type: 'textarea', rows: 3 },
        { key: 'href', label: 'Link or Action URL' }
      ], { type: 'custom', icon: 'info', title: 'New Card', value: 'Value', sub: 'Helpful subtext', href: '' })}
    `;
  }

  function renderInsurancePages() {
    return `
      <section class="section">
        <div class="section-head"><div><h2>Choose Detail Page</h2><p>Switch between the individual insurance pages.</p></div></div>
        <div class="pill-row">
          ${PLAN_FILES.map((file) => `<button class="plan-pill ${file === activePlan ? 'active' : ''}" onclick="setPlan('${file}')">${esc(file.replace('.html', '').replace(/[-_]/g, ' '))}</button>`).join('')}
        </div>
      </section>
      <section class="section">
        <div class="section-head"><div><h2>Hero Story</h2><p>Content shown on the selected insurance detail page.</p></div></div>
        <div class="edit-grid">
          <div class="edit-card"><div class="edit-card-body">${field(`insurancePages.${activePlan}.badge`,'Badge')}${field(`insurancePages.${activePlan}.title`,'Title')}${field(`insurancePages.${activePlan}.highlight`,'Highlight')}${field(`insurancePages.${activePlan}.desc`,'Description',{type:'textarea',rows:4})}</div></div>
          <div class="edit-card"><div class="edit-card-body">${field(`insurancePages.${activePlan}.image`,'Image Path or URL')}${field(`insurancePages.${activePlan}.metaDesc`,'Meta Description')}${field(`insurancePages.${activePlan}.ctaText`,'Hero Button Text')}${field(`insurancePages.${activePlan}.trustTitle`,'Trust Title')}${field(`insurancePages.${activePlan}.trustDesc`,'Trust Description',{type:'textarea',rows:3})}</div></div>
        </div>
      </section>
      ${objectListSection('Products', `insurancePages.${activePlan}.products`, [
        { key: 'name', label: 'Name' },
        { key: 'planNo', label: 'Plan No' },
        { key: 'icon', label: 'Icon Key' },
        { key: 'button', label: 'Button Text' }
      ], { name: 'New Plan', planNo: 'Plan No:', icon: 'verified_user', button: 'Get Details', points: ['Benefit one', 'Benefit two'] })}
    `;
  }

  function renderWorkspace() {
    const workspace = document.getElementById('workspace');
    if (!workspace) return;
    if (MODE === 'gallery') workspace.innerHTML = renderGallery();
    else if (MODE === 'news') workspace.innerHTML = renderNews();
    else if (MODE === 'contact') workspace.innerHTML = renderContact();
    else workspace.innerHTML = renderInsurancePages();
  }

  function addListItem(path, value) {
    const list = getPath(STATE, path) || [];
    list.push(value);
    setPath(STATE, path, list);
    renderWorkspace();
  }

  function removeListItem(path, index) {
    const list = getPath(STATE, path) || [];
    list.splice(index, 1);
    setPath(STATE, path, list);
    renderWorkspace();
  }

  function setListValue(path, index, value) {
    const list = getPath(STATE, path) || [];
    list[index] = value;
    setPath(STATE, path, list);
  }

  function setValue(path, value) {
    setPath(STATE, path, value);
  }

  function addObjectItem(path, value) {
    const list = getPath(STATE, path) || [];
    list.push(clone(value));
    setPath(STATE, path, list);
    renderWorkspace();
  }

  function setPlan(file) {
    activePlan = file;
    renderWorkspace();
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  async function saveAll() {
    if (MODE === 'insurancePages') {
      // sync current DOM inputs for the selected plan before saving
      const current = STATE.insurancePages[activePlan] || DEFAULT_INSURANCE_PLAN;
      current.products = current.products || [];
      STATE.insurancePages[activePlan] = current;
    }
    await window.VSBackend.saveAdminContent(PAGE_META[MODE].contentKey, clone(STATE));
    clearDirty();
    showToast('Changes saved.');
  }

  function syncWindowApi() {
    window.setValue = setValue;
    window.addListItem = addListItem;
    window.removeListItem = removeListItem;
    window.setListValue = setListValue;
    window.addObjectItem = addObjectItem;
    window.setPlan = setPlan;
    window.saveAll = saveAll;
  }

  async function loadData() {
    ensureStateShape();
    const key = PAGE_META[MODE].contentKey;
    const response = await window.VSBackend.getAdminContent(key);
    const content = response?.content || {};
    if (MODE === 'insurancePages') {
      STATE = merge(clone(DEFAULTS.insurancePages), content);
      ensureStateShape();
    } else {
      STATE = merge(clone(DEFAULTS[MODE]), content);
    }
  }

  async function boot() {
    if (!window.VSBackend) {
      const script = document.createElement('script');
      script.src = '../assets/js/vs-backend.js';
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    document.body.innerHTML = shell();
    syncWindowApi();
    try {
      await window.VSBackend.request('/api/admin/me');
      await loadData();
      ensureStateShape();
      renderWorkspace();
      clearDirty();
    } catch (error) {
      location.href = `admin-login.html?redirect=${encodeURIComponent(location.pathname.split('/').pop())}`;
    }
  }

  boot();
})();
