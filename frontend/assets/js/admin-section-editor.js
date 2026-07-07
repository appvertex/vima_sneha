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

  function buildInsurancePageDefaults({
    navTitle,
    badge,
    title,
    highlight,
    desc,
    metaDesc,
    ctaText = 'Consult an Expert',
    trustTitle = '100% Secure',
    trustDesc = 'IRDAI Approved Plans',
    products
  }) {
    return {
      navTitle,
      badge,
      title,
      highlight,
      desc,
      image: 'https://vima-sneha.pages.dev/assets/images/hero-insurance.png',
      metaDesc,
      ctaText,
      trustTitle,
      trustDesc,
      products
    };
  }

  const DEFAULT_INSURANCE_PAGES = {
    'term-life-insurance.html': buildInsurancePageDefaults({
      navTitle: 'Term Life Insurance',
      badge: 'Term Plans',
      title: 'Pure Protection.',
      highlight: 'Zero Compromise.',
      desc: "Term insurance is the simplest and most affordable form of life insurance. It provides high life cover at a low premium, ensuring your family's lifestyle remains protected even in your absence.",
      metaDesc: 'Explore the best term life insurance plans by LIC, offered by Vima Sneha. Maximum protection for your family at affordable premiums.',
      products: [
        { name: 'New Jeevan Amar', planNo: 'Plan No: 955', icon: 'verified_user', button: 'Get Details', points: ['High life cover at very nominal and affordable cost', 'Flexible premium payment: Single, Regular or Limited', 'Special lower premium rates for women', 'Tax benefits on premiums paid under Sec 80C'] },
        { name: 'Saral Jeevan Bima', planNo: 'Plan No: 859', icon: 'shield', button: 'Get Details', points: ['Standard pure risk life insurance plan', 'Simple and easy to understand features', 'Limited Premium Paying Term available', 'Ideal for first-time insurance buyers'] },
        { name: 'Yuva Term', planNo: 'Plan No: 875', icon: 'rocket_launch', button: 'Get Details', points: ['Specially designed for youngsters & professionals', 'Attractive High Sum Assured Rebates', 'Special lower premium rates for women', 'Available through digital & offline channels'] }
      ]
    }),
    'health-plans.html': buildInsurancePageDefaults({
      navTitle: 'Health Plans',
      badge: 'Family Wellness',
      title: 'Comprehensive Care.',
      highlight: 'Absolute Peace.',
      desc: "Don't let medical expenses drain your savings. LIC's health plans provide robust financial support during health emergencies, ensuring the best treatment for your family.",
      metaDesc: "Comprehensive health insurance from LIC. Protect yourself and your family with Vima Sneha's health plans.",
      products: [
        { name: 'Arogya Rakshak', planNo: 'Plan No: 906', icon: 'medical_services', button: 'Get Details', points: ['Fixed benefit health insurance cover', 'Hospital Cash Benefit (HCB)', 'Major Surgical Benefit (MSB)'] },
        { name: 'Cancer Cover', planNo: 'Plan No: 905', icon: 'shield_moon', button: 'Get Details', points: ['Fixed benefit for Cancer detection', 'Waiver of Premium benefit'] }
      ]
    }),
    'endowment-plans.html': buildInsurancePageDefaults({
      navTitle: 'Endowment Plans',
      badge: 'Savings & Protection',
      title: 'Wealth Creation.',
      highlight: 'Guaranteed Legacy.',
      desc: "Endowment plans offer a unique combination of protection and savings. They help you build a substantial corpus for your life goals while ensuring your family's financial security.",
      metaDesc: 'Secure your future with LIC Endowment Plans. Build a corpus and stay protected with Vima Sneha\'s expert guidance.',
      products: [
        { name: 'New Endowment Assurance', planNo: 'Plan No: 714', icon: 'savings', button: 'Get Details', points: ['Encourage Long Term Savings', 'Guaranteed Addition at Rs. 50', 'Choice of Premium Payment Term'] },
        { name: 'New Jeevan Anand', planNo: 'Plan No: 715', icon: 'celebration', button: 'Get Details', points: ['Risk cover continues even after Maturity', 'Financial Protection throughout your life'] },
        { name: 'Jeevan Lakshya', planNo: 'Plan No: 733', icon: 'target', button: 'Get Details', points: ['Annual Income Benefit for family', 'Limited Premium Payment Term'] }
      ]
    }),
    'pension-plans.html': buildInsurancePageDefaults({
      navTitle: 'Pension & Retirement Plans',
      badge: 'Retire in Style',
      title: 'Golden Years.',
      highlight: 'Guaranteed Income.',
      desc: "Retirement planning is about ensuring you can maintain your lifestyle and financial independence even after you stop working. LIC's pension plans provide a steady stream of income for life.",
      metaDesc: 'Plan a secure retirement with LIC pension plans and annuities from Vima Sneha.',
      products: [
        { name: 'New Jeevan Shanti', planNo: 'Plan No: 858', icon: 'account_balance', button: 'Get Details', points: ['Single premium Deferred Annuity plan'] },
        { name: 'Jeevan Akshay VII', planNo: 'Plan No: 857', icon: 'elderly', button: 'Get Details', points: ['Immediate Annuity plan'] }
      ]
    }),
    'children-plans.html': buildInsurancePageDefaults({
      navTitle: 'Children Plans',
      badge: 'Securing Milestones',
      title: 'Nurture Dreams.',
      highlight: 'Secure Futures.',
      desc: "Secure your child's education and marriage milestones with disciplined, goal-based savings. Ensure their dreams are fulfilled, even in your absence.",
      metaDesc: "Secure your child's future with LIC children plans from Vima Sneha.",
      products: [
        { name: "New Children's Money Back", planNo: 'Plan No: 732', icon: 'child_care', button: 'Get Details', points: ['Ideal for education milestones'] },
        { name: 'Jeevan Tarun', planNo: 'Plan No: 734', icon: 'school', button: 'Get Details', points: ['Guaranteed returns between age 20-24'] }
      ]
    }),
    'ulip-plans.html': buildInsurancePageDefaults({
      navTitle: 'ULIP Plans',
      badge: 'Market Participation',
      title: 'Wealth Growth.',
      highlight: 'Dynamic Returns.',
      desc: "Unit Linked Insurance Plans (ULIPs) offer the best of both worlds: high growth potential through market-linked investments and the safety of life insurance.",
      metaDesc: 'Grow your wealth with LIC ULIP plans and market-linked insurance solutions.',
      products: [
        { name: 'SIIP', planNo: 'Plan No: 752', icon: 'trending_up', button: 'Get Details', points: ['Guaranteed addition after every 5 years'] },
        { name: 'Nivesh Plus', planNo: 'Plan No: 749', icon: 'paid', button: 'Get Details', points: ['Single premium payment unit linked plan'] }
      ]
    }),
    'money-back-plans.html': buildInsurancePageDefaults({
      navTitle: 'Money Back Plans',
      badge: 'Liquidity & Protection',
      title: 'Periodic Returns.',
      highlight: 'Continuous Safety.',
      desc: 'Money back plans provide periodic payouts during the policy term, helping you meet short-term financial needs while keeping your life cover intact.',
      metaDesc: 'Explore LIC money back plans for regular payouts and protection.',
      products: [
        { name: 'New Money Back 20 Years', planNo: 'Plan No: 720', icon: 'payments', button: 'Get Details', points: ['Limited Premium Paying Term'] },
        { name: 'Bima Shree', planNo: 'Plan No: 748', icon: 'workspace_premium', button: 'Get Details', points: ['Designed for High Networth Individuals'] }
      ]
    }),
    'whole-life-plans.html': buildInsurancePageDefaults({
      navTitle: 'Whole Life Plans',
      badge: 'Lifetime Security',
      title: 'Lifelong Cover.',
      highlight: 'Endless Protection.',
      desc: "Whole life insurance provides coverage for your entire lifetime. It's a perfect way to build a legacy for your family while enjoying guaranteed returns during your lifetime.",
      metaDesc: 'Secure lifelong protection with LIC whole life plans from Vima Sneha.',
      products: [
        { name: 'Jeevan Umang', planNo: 'Plan No: 945', icon: 'all_inclusive', button: 'Get Details', points: ['Whole life assurance plan with profits'] },
        { name: 'Jeevan Utsav', planNo: 'Plan No: 771', icon: 'festival', button: 'Get Details', points: ['Guaranteed income benefit for lifetime'] }
      ]
    }),
    'micro-insurance.html': buildInsurancePageDefaults({
      navTitle: 'Micro Insurance',
      badge: 'Inclusion for All',
      title: 'Small Premiums.',
      highlight: 'Big Security.',
      desc: 'Micro insurance plans are specifically designed to provide affordable life cover to low-income groups. They offer essential protection at very nominal costs.',
      metaDesc: 'Affordable LIC micro insurance plans from Vima Sneha for broader financial protection.',
      products: [
        { name: 'Micro Bachat', planNo: 'Plan No: 751', icon: 'groups', button: 'Get Details', points: ['Life micro insurance plan with savings'] }
      ]
    })
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
    const parts = [];
    const input = String(path);
    const re = /\[(?:"([^"]+)"|'([^']+)'|(\d+))\]|[^.[\]]+/g;
    let match;
    while ((match = re.exec(input))) {
      parts.push(match[1] ?? match[2] ?? match[3] ?? match[0]);
    }
    return parts.filter(Boolean);
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
        STATE.insurancePages[file] = merge(
          clone(DEFAULT_INSURANCE_PAGES[file] || DEFAULT_INSURANCE_PLAN),
          STATE.insurancePages[file] || {}
        );
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
    const activeKey = JSON.stringify(activePlan);
    return `
      <section class="section">
        <div class="section-head"><div><h2>Choose Detail Page</h2><p>Switch between the individual insurance pages.</p></div></div>
        <div class="pill-row">
          ${PLAN_FILES.map((file) => {
            const label = STATE.insurancePages?.[file]?.navTitle || file.replace('.html', '').replace(/[-_]/g, ' ');
            return `<button class="plan-pill ${file === activePlan ? 'active' : ''}" onclick="setPlan('${file}')">${esc(label)}</button>`;
          }).join('')}
        </div>
      </section>
      <section class="section">
        <div class="section-head"><div><h2>Hero Story</h2><p>Content shown on the selected insurance detail page.</p></div></div>
        <div class="edit-grid">
          <div class="edit-card"><div class="edit-card-body">${field(`insurancePages[${activeKey}].badge`,'Badge')}${field(`insurancePages[${activeKey}].title`,'Title')}${field(`insurancePages[${activeKey}].highlight`,'Highlight')}${field(`insurancePages[${activeKey}].desc`,'Description',{type:'textarea',rows:4})}</div></div>
          <div class="edit-card"><div class="edit-card-body">${field(`insurancePages[${activeKey}].image`,'Image Path or URL')}${field(`insurancePages[${activeKey}].metaDesc`,'Meta Description')}${field(`insurancePages[${activeKey}].ctaText`,'Hero Button Text')}${field(`insurancePages[${activeKey}].trustTitle`,'Trust Title')}${field(`insurancePages[${activeKey}].trustDesc`,'Trust Description',{type:'textarea',rows:3})}</div></div>
        </div>
      </section>
      ${objectListSection('Products', `insurancePages[${activeKey}].products`, [
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
      STATE = merge(clone(DEFAULT_INSURANCE_PAGES), content);
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
