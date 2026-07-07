(function () {
  function ensureBackend() {
    if (window.VSBackend) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const basePath = window.location.pathname.includes('/insurance/') ? '../' : '';
      script.src = `${basePath}assets/js/vs-backend.js`;
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  const defaults = {
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
        { title: 'MDRT Recognition', desc: 'Excellence in service and dedication', icon: 'emoji_events', category: 'awards', size: 'wide', image: '' },
        { title: 'Therapy Sessions', desc: '', icon: 'psychology', category: 'workshops', size: 'small', image: '' },
        { title: 'Community', desc: '', icon: 'diversity_3', category: 'community', size: 'small', image: '' },
        { title: 'Certifications', desc: 'Professional milestones', icon: 'workspace_premium', category: 'events', size: 'large', image: '' },
        { title: 'School Programs', desc: '', icon: 'school', category: 'workshops', size: 'small', image: '' },
        { title: 'Awards', desc: '', icon: 'military_tech', category: 'awards', size: 'small', image: '' }
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
        { category: 'counselling', image: 'assets/images/counselling_session.jpg', title: 'Understanding Exam Stress: A Guide for Students and Parents', excerpt: 'Learn practical strategies to manage exam anxiety and create a supportive environment for academic success.', date: 'April 18, 2026', readTime: '4 min read', author: "Maria D'Souza", avatar: 'MM' },
        { category: 'insurance', image: 'assets/images/hero-insurance.png', title: '5 Essential Insurance Plans Every Family Should Consider', excerpt: "Discover the key insurance plans that form the foundation of a robust financial safety net for your family's future security.", date: 'April 15, 2026', readTime: '6 min read', author: 'Sachin Noronha', avatar: 'SN' },
        { category: 'wellness', image: 'assets/images/hero-counselling-premium.png', title: 'The Power of Hypnotherapy: Transforming Lives Through Inner Healing', excerpt: "Explore the science behind hypnotherapy and how it's helping individuals overcome deep-seated challenges.", date: 'April 12, 2026', readTime: '7 min read', author: "Maria D'Souza", avatar: 'MM' }
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
    insurancePages: {
      'term-life-insurance.html': {
        navTitle: 'Term Life Insurance',
        badge: 'Term Plans',
        title: 'Pure Protection.',
        highlight: 'Zero Compromise.',
        desc: "Term insurance is the simplest and most affordable form of life insurance. It provides high life cover at a low premium, ensuring your family's lifestyle remains protected even in your absence.",
        image: 'assets/images/hero-insurance.png',
        metaDesc: 'Explore the best term life insurance plans by LIC, offered by Vima Sneha. Maximum protection for your family at affordable premiums.',
        ctaText: 'Consult an Expert',
        trustTitle: '100% Secure',
        trustDesc: 'IRDAI Approved Plans',
        products: [
          { name: 'New Jeevan Amar', planNo: 'Plan No: 955', icon: 'verified_user', button: 'Get Details', pdf: '', points: ['High life cover at very nominal and affordable cost', 'Flexible premium payment: Single, Regular or Limited', 'Special lower premium rates for women', 'Tax benefits on premiums paid under Sec 80C'] },
          { name: 'Saral Jeevan Bima', planNo: 'Plan No: 859', icon: 'shield', button: 'Get Details', pdf: '', points: ['Standard pure risk life insurance plan', 'Simple and easy to understand features', 'Limited Premium Paying Term available', 'Ideal for first-time insurance buyers'] },
          { name: 'Yuva Term', planNo: 'Plan No: 875', icon: 'rocket_launch', button: 'Get Details', pdf: '', points: ['Specially designed for youngsters & professionals', 'Attractive High Sum Assured Rebates', 'Special lower premium rates for women', 'Available through digital & offline channels'] }
        ]
      },
      'health-plans.html': {
        navTitle: 'Health Plans',
        badge: 'Family Wellness',
        title: 'Comprehensive Care.',
        highlight: 'Absolute Peace.',
        desc: "Don't let medical expenses drain your savings. LIC's health plans provide robust financial support during health emergencies, ensuring the best treatment for your family.",
        image: 'assets/images/hero-wellness.png',
        metaDesc: "Comprehensive health insurance from LIC. Protect yourself and your family with Vima Sneha's health plans.",
        ctaText: 'Consult an Expert',
        trustTitle: '100% Secure',
        trustDesc: 'IRDAI Approved Plans',
        products: [
          { name: 'Arogya Rakshak', planNo: 'Plan No: 906', icon: 'medical_services', button: 'Get Details', pdf: '', points: ['Fixed benefit health insurance cover', 'Hospital Cash Benefit (HCB)', 'Major Surgical Benefit (MSB)'] },
          { name: 'Cancer Cover', planNo: 'Plan No: 905', icon: 'shield_moon', button: 'Get Details', pdf: '', points: ['Fixed benefit for Cancer detection', 'Waiver of Premium benefit'] }
        ]
      },
      'endowment-plans.html': {
        navTitle: 'Endowment Plans',
        badge: 'Savings & Protection',
        title: 'Wealth Creation.',
        highlight: 'Guaranteed Legacy.',
        desc: "Endowment plans offer a unique combination of protection and savings. They help you build a substantial corpus for your life goals while ensuring your family's financial security.",
        image: 'assets/images/hero-insurance.png',
        metaDesc: 'Secure your future with LIC Endowment Plans. Build a corpus and stay protected with Vima Sneha\'s expert guidance.',
        ctaText: 'Consult an Expert',
        trustTitle: '100% Secure',
        trustDesc: 'IRDAI Approved Plans',
        products: [
          { name: 'New Endowment Assurance', planNo: 'Plan No: 714', icon: 'savings', button: 'Get Details', pdf: '', points: ['Encourage Long Term Savings', 'Guaranteed Addition at Rs. 50', 'Choice of Premium Payment Term'] },
          { name: 'New Jeevan Anand', planNo: 'Plan No: 715', icon: 'celebration', button: 'Get Details', pdf: '', points: ['Risk cover continues even after Maturity', 'Financial Protection throughout your life'] },
          { name: 'Jeevan Lakshya', planNo: 'Plan No: 733', icon: 'target', button: 'Get Details', pdf: '', points: ['Annual Income Benefit for family', 'Limited Premium Payment Term'] }
        ]
      },
      'pension-plans.html': {
        navTitle: 'Pension & Retirement Plans',
        badge: 'Retire in Style',
        title: 'Golden Years.',
        highlight: 'Guaranteed Income.',
        desc: "Retirement planning is about ensuring you can maintain your lifestyle and financial independence even after you stop working. LIC's pension plans provide a steady stream of income for life.",
        image: 'assets/images/hero-family.png',
        metaDesc: 'Plan a secure retirement with LIC pension plans and annuities from Vima Sneha.',
        ctaText: 'Consult an Expert',
        trustTitle: '100% Secure',
        trustDesc: 'IRDAI Approved Plans',
        products: [
          { name: 'New Jeevan Shanti', planNo: 'Plan No: 858', icon: 'account_balance', button: 'Get Details', pdf: '', points: ['Single premium Deferred Annuity plan'] },
          { name: 'Jeevan Akshay VII', planNo: 'Plan No: 857', icon: 'elderly', button: 'Get Details', pdf: '', points: ['Immediate Annuity plan'] }
        ]
      },
      'children-plans.html': {
        navTitle: 'Children Plans',
        badge: 'Securing Milestones',
        title: 'Nurture Dreams.',
        highlight: 'Secure Futures.',
        desc: "Secure your child's education and marriage milestones with disciplined, goal-based savings. Ensure their dreams are fulfilled, even in your absence.",
        image: 'assets/images/hero-family.png',
        metaDesc: "Secure your child's future with LIC children plans from Vima Sneha.",
        ctaText: 'Consult an Expert',
        trustTitle: '100% Secure',
        trustDesc: 'IRDAI Approved Plans',
        products: [
          { name: "New Children's Money Back", planNo: 'Plan No: 732', icon: 'child_care', button: 'Get Details', pdf: '', points: ['Ideal for education milestones'] },
          { name: 'Jeevan Tarun', planNo: 'Plan No: 734', icon: 'school', button: 'Get Details', pdf: '', points: ['Guaranteed returns between age 20-24'] }
        ]
      },
      'ulip-plans.html': {
        navTitle: 'ULIP Plans',
        badge: 'Market Participation',
        title: 'Wealth Growth.',
        highlight: 'Dynamic Returns.',
        desc: 'Unit Linked Insurance Plans (ULIPs) offer the best of both worlds: high growth potential through market-linked investments and the safety of life insurance.',
        image: 'assets/images/hero-insurance.png',
        metaDesc: 'Grow your wealth with LIC ULIP plans and market-linked insurance solutions.',
        ctaText: 'Consult an Expert',
        trustTitle: '100% Secure',
        trustDesc: 'IRDAI Approved Plans',
        products: [
          { name: 'SIIP', planNo: 'Plan No: 752', icon: 'trending_up', button: 'Get Details', pdf: '', points: ['Guaranteed addition after every 5 years'] },
          { name: 'Nivesh Plus', planNo: 'Plan No: 749', icon: 'paid', button: 'Get Details', pdf: '', points: ['Single premium payment unit linked plan'] }
        ]
      },
      'money-back-plans.html': {
        navTitle: 'Money Back Plans',
        badge: 'Liquidity & Protection',
        title: 'Periodic Returns.',
        highlight: 'Continuous Safety.',
        desc: 'Money back plans provide periodic payouts during the policy term, helping you meet short-term financial needs while keeping your life cover intact.',
        image: 'assets/images/hero-insurance.png',
        metaDesc: 'Explore LIC money back plans for regular payouts and protection.',
        ctaText: 'Consult an Expert',
        trustTitle: '100% Secure',
        trustDesc: 'IRDAI Approved Plans',
        products: [
          { name: 'New Money Back 20 Years', planNo: 'Plan No: 720', icon: 'payments', button: 'Get Details', pdf: '', points: ['Limited Premium Paying Term'] },
          { name: 'Bima Shree', planNo: 'Plan No: 748', icon: 'workspace_premium', button: 'Get Details', pdf: '', points: ['Designed for High Networth Individuals'] }
        ]
      },
      'whole-life-plans.html': {
        navTitle: 'Whole Life Plans',
        badge: 'Lifetime Security',
        title: 'Lifelong Cover.',
        highlight: 'Endless Protection.',
        desc: "Whole life insurance provides coverage for your entire lifetime. It's a perfect way to build a legacy for your family while enjoying guaranteed returns during your lifetime.",
        image: 'assets/images/hero-family.png',
        metaDesc: 'Secure lifelong protection with LIC whole life plans from Vima Sneha.',
        ctaText: 'Consult an Expert',
        trustTitle: '100% Secure',
        trustDesc: 'IRDAI Approved Plans',
        products: [
          { name: 'Jeevan Umang', planNo: 'Plan No: 945', icon: 'all_inclusive', button: 'Get Details', pdf: '', points: ['Whole life assurance plan with profits'] },
          { name: 'Jeevan Utsav', planNo: 'Plan No: 771', icon: 'festival', button: 'Get Details', pdf: '', points: ['Guaranteed income benefit for lifetime'] }
        ]
      },
      'micro-insurance.html': {
        navTitle: 'Micro Insurance',
        badge: 'Inclusion for All',
        title: 'Small Premiums.',
        highlight: 'Big Security.',
        desc: 'Micro insurance plans are specifically designed to provide affordable life cover to low-income groups. They offer essential protection at very nominal costs.',
        image: 'assets/images/hero-insurance.png',
        metaDesc: 'Affordable LIC micro insurance plans from Vima Sneha for broader financial protection.',
        ctaText: 'Consult an Expert',
        trustTitle: '100% Secure',
        trustDesc: 'IRDAI Approved Plans',
        products: [
          { name: 'Micro Bachat', planNo: 'Plan No: 751', icon: 'groups', button: 'Get Details', pdf: '', points: ['Life micro insurance plan with savings'] }
        ]
      }
    }
  };

  function read() {
    return JSON.parse(JSON.stringify(defaults));
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
    const div = document.createElement('div');
    div.textContent = value || '';
    return div.innerHTML;
  }

  function setText(selector, value) {
    const el = document.querySelector(selector);
    if (el && value !== undefined) el.textContent = value;
  }

  function renderGallery(data) {
    setText('main section:first-of-type .inline-flex', data.badge);
    const h1 = document.querySelector('main section:first-of-type h1');
    if (h1) h1.innerHTML = `${esc(data.title || '').replace(esc(data.highlight || ''), `<span class="text-primary italic underline decoration-primary/20 decoration-8">${esc(data.highlight || '')}</span>`)}`;
    setText('main section:first-of-type p', data.desc);

    const filterWrap = document.querySelector('.gallery-filter-btn')?.parentElement;
    if (filterWrap && Array.isArray(data.categories)) {
      filterWrap.innerHTML = `<button onclick="filterGallery('all', this)" class="gallery-filter-btn px-6 py-3 rounded-2xl font-extrabold text-sm transition-all bg-primary text-white shadow-lg shadow-primary/20">All</button>` +
        data.categories.map(cat => `<button onclick="filterGallery('${esc(cat)}', this)" class="gallery-filter-btn px-6 py-3 rounded-2xl font-extrabold text-sm transition-all glass text-slate-500 hover:text-primary">${esc(label(cat))}</button>`).join('');
    }

    const grid = document.getElementById('gallery-grid');
    if (grid && Array.isArray(data.items)) {
      const gradients = ['from-primary/80 to-primary-dark/90', 'from-secondary/80 to-secondary-dark/90', 'from-slate-800 to-slate-900', 'from-secondary to-primary', 'from-primary-light to-primary'];
      grid.innerHTML = data.items.map((item, index) => {
        const size = item.size === 'large' ? 'row-span-2 col-span-2 md:col-span-1' : item.size === 'wide' ? 'col-span-2' : '';
        const bg = item.image ? `<img src="${esc(item.image)}" alt="${esc(item.title)}" class="absolute inset-0 w-full h-full object-cover"><div class="absolute inset-0 bg-slate-900/45"></div>` : `<div class="absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}"></div>`;
        return `<div class="gallery-item rounded-3xl overflow-hidden relative group cursor-pointer ${size}" data-category="${esc(item.category || 'workshops')}">
          ${bg}
          <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center z-10">
            <span class="material-symbols-outlined !text-5xl mb-4 group-hover:scale-125 transition-transform">${esc(item.icon || 'image')}</span>
            <h3 class="text-xl font-extrabold">${esc(item.title)}</h3>
            ${item.desc ? `<p class="text-white/80 text-sm font-medium mt-2">${esc(item.desc)}</p>` : ''}
          </div>
        </div>`;
      }).join('');
    }

    const cta = document.querySelector('main > section:last-of-type .max-w-3xl');
    if (cta) {
      const h2 = cta.querySelector('h2');
      const p = cta.querySelector('p');
      const a = cta.querySelector('a');
      if (h2) h2.textContent = data.ctaTitle || h2.textContent;
      if (p) p.textContent = data.ctaDesc || p.textContent;
      if (a && data.ctaText) a.childNodes[0].textContent = data.ctaText + ' ';
    }
  }

  function categoryIcon(category) {
    return {
      all: 'newspaper',
      counselling: 'spa',
      insurance: 'shield',
      wellness: 'favorite',
      community: 'groups',
      announcement: 'campaign'
    }[category] || 'article';
  }

  function renderNews(data) {
    const hero = document.querySelector('.hero-content');
    if (hero) {
      const badge = hero.querySelector('.inline-flex');
      const h1 = hero.querySelector('h1');
      const p = hero.querySelector('p');
      if (badge) badge.lastChild.textContent = ' ' + (data.badge || '');
      if (h1) h1.innerHTML = `${esc((data.title || '').replace(data.highlight || '', ''))}<span class="italic" style="background: linear-gradient(135deg, #F0D08A, #D4A853); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${esc(data.highlight || '')}</span>`;
      if (p) p.textContent = data.desc || '';
    }
    const filterWrap = document.getElementById('category-filter');
    if (filterWrap && Array.isArray(data.categories) && data.categories.length) {
      filterWrap.innerHTML = data.categories.map((category, index) => {
        const isAll = category === 'all';
        return `<button class="category-pill ${index === 0 ? 'active' : ''}" data-category="${esc(category)}">${isAll ? esc(label(category) === 'All' ? 'All News' : label(category)) : `<span class="material-symbols-outlined text-sm mr-1" style="font-size: 14px;">${categoryIcon(category)}</span>${esc(label(category))}`}</button>`;
      }).join('');
    }
    const articles = Array.isArray(data.articles) ? data.articles : [];
    const featured = articles.find(a => a.featured) || articles[0];
    const normal = articles.filter(a => a !== featured);
    const f = document.getElementById('featured-article');
    if (f && featured) {
      f.dataset.category = featured.category || 'counselling';
      f.querySelector('img').src = featured.image || 'assets/images/hero-counselling.png';
      f.querySelector('img').alt = featured.title || 'Featured article';
      const badgeLabel = f.querySelector('.featured-badge');
      if (badgeLabel) badgeLabel.lastChild.textContent = ' ' + (data.featuredBadge || 'Featured Story');
      f.querySelector('h2').textContent = featured.title || '';
      f.querySelector('p').textContent = featured.excerpt || '';
      const meta = f.querySelectorAll('.featured-meta span');
      if (meta[0]) meta[0].lastChild.textContent = ' ' + (featured.date || '');
      if (meta[1]) meta[1].lastChild.textContent = ' ' + (featured.readTime || '');
      if (meta[2]) meta[2].lastChild.textContent = ' ' + (featured.author || '');
    }
    const grid = document.getElementById('news-grid');
    if (grid) grid.innerHTML = normal.map(article => articleCard(article)).join('');
    setText('.newsletter-section h2', data.newsletterTitle);
    setText('.newsletter-section p', data.newsletterDesc);
    setText('#newsletter-subscribe', data.newsletterButtonText);
  }

  function normalizeNewsArticle(article, index) {
    return {
      featured: Boolean(article?.featured),
      category: article?.category || 'announcement',
      image: article?.image || article?.image_url || '',
      title: article?.title || '',
      excerpt: article?.excerpt || article?.body || '',
      date: article?.date || formatDate(article?.published_at) || '',
      readTime: article?.readTime || '3 min read',
      author: article?.author || 'Vima Sneha',
      avatar: article?.avatar || 'VS'
    };
  }

  function articleCard(article) {
    const category = article.category || 'counselling';
    return `<article class="news-card scroll-reveal" data-category="${esc(category)}">
      <div class="news-card-img-wrap">
        <img src="${esc(article.image || 'assets/images/hero-counselling.png')}" alt="${esc(article.title)}" />
        <div class="news-card-img-overlay"></div>
        <span class="news-card-category cat-${esc(category)}"><span class="material-symbols-outlined" style="font-size: 12px;">${categoryIcon(category)}</span>${esc(label(category))}</span>
      </div>
      <div class="news-card-body">
        <div class="news-card-date"><span class="material-symbols-outlined" style="font-size: 14px;">calendar_today</span>${esc(article.date || '')}</div>
        <h3 class="news-card-title">${esc(article.title)}</h3>
        <p class="news-card-excerpt">${esc(article.excerpt)}</p>
        <div class="news-card-footer">
          <div class="news-card-author"><div class="news-card-author-avatar">${esc(article.avatar || 'VS')}</div><div class="news-card-author-info"><span class="news-card-author-name">${esc(article.author || 'Vima Sneha')}</span><span class="news-card-read-time">${esc(article.readTime || '3 min read')}</span></div></div>
          <div class="news-card-arrow"><span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span></div>
        </div>
      </div>
    </article>`;
  }

  function renderContact(data) {
    setText('main section:first-of-type .inline-flex', data.badge);
    const h1 = document.querySelector('main section:first-of-type h1');
    if (h1) h1.innerHTML = `${esc((data.title || '').replace(data.highlight || '', ''))}<span class="text-primary italic underline decoration-primary/20 decoration-8">${esc(data.highlight || '')}</span>`;
    setText('main section:first-of-type p', data.desc);
    const left = document.querySelector('.lg\\:col-span-2.space-y-6');
    if (left && Array.isArray(data.cards)) {
      left.innerHTML = data.cards.map(card => contactCard(card)).join('');
    }
    const serviceButtons = document.querySelectorAll('.svc-btn');
    if (serviceButtons[0]) serviceButtons[0].textContent = data.serviceLabels?.counselling || 'Counselling';
    if (serviceButtons[1]) serviceButtons[1].textContent = data.serviceLabels?.insurance || 'Insurance';
    const placeholders = data.placeholders || {};
    const nameInput = document.getElementById('contact-name');
    const phoneInput = document.getElementById('contact-phone');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    if (nameInput) nameInput.placeholder = placeholders.name || nameInput.placeholder;
    if (phoneInput) phoneInput.placeholder = placeholders.phone || phoneInput.placeholder;
    if (emailInput) emailInput.placeholder = placeholders.email || emailInput.placeholder;
    if (messageInput) messageInput.placeholder = placeholders.message || messageInput.placeholder;
    setText('#contact-form h2', data.formTitle);
    setText('#contact-form .space-y-2 p', data.formDesc);
    const btn = document.querySelector('#contact-form button[type="submit"]');
    if (btn && data.submitText) btn.childNodes[0].textContent = data.submitText + ' ';
    setText('#contact-success h3', data.successTitle);
    setText('#contact-success p', data.successDesc);
    setText('#contact-success button', data.resetText);
  }

  function contactCard(card) {
    const color = card.type === 'insurance' ? 'secondary' : card.type === 'whatsapp' ? 'green-600' : card.type === 'location' ? 'slate-400' : 'primary';
    const inner = `<span class="w-16 h-16 rounded-3xl bg-white/50 text-${color} flex items-center justify-center shrink-0 shadow-lg"><span class="material-symbols-outlined !text-3xl">${esc(card.icon || 'info')}</span></span>
      <div><h3 class="font-extrabold text-slate-900 text-lg">${esc(card.title)}</h3><p class="text-${color} font-bold text-sm">${esc(card.value)}</p><p class="text-slate-400 text-xs font-medium mt-1">${esc(card.sub)}</p></div>`;
    return card.href ? `<a href="${esc(card.href)}" class="glass p-8 rounded-4xl flex items-center gap-6 hover:-translate-y-1 transition-all group block">${inner}</a>` : `<div class="glass p-8 rounded-4xl flex items-center gap-6">${inner}</div>`;
  }

  function renderInsurancePage(allData) {
    const slugBase = location.pathname.split('/').pop();
    const slug = slugBase.endsWith('.html') ? slugBase : `${slugBase}.html`;
    const page = allData.insurancePages && allData.insurancePages[slug];
    if (!page) return;
    document.title = `${page.title || 'Insurance Plans'} - Vima Sneha`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && page.metaDesc) meta.content = page.metaDesc;
    const crumb = document.querySelector('nav .text-secondary');
    if (crumb) crumb.textContent = page.navTitle || page.badge || page.title || crumb.textContent;
    const hero = document.querySelector('main section h1')?.closest('section');
    if (hero) {
      const badge = hero.querySelector('.inline-flex span:last-child');
      const h1 = hero.querySelector('h1');
      const p = hero.querySelector('p');
      const img = hero.querySelector('img');
      const cta = hero.querySelector('.btn-gold');
      const trustTitle = hero.querySelector('.glass-dark .text-white.font-bold');
      const trustDesc = hero.querySelector('.glass-dark .text-white\\/80');
      if (badge) badge.textContent = page.badge || badge.textContent;
      if (h1) h1.innerHTML = `${esc(page.title || '')}<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-dark italic">${esc(page.highlight || '')}</span>`;
      if (p) p.textContent = page.desc || '';
      if (img && page.image) img.src = page.image;
      if (cta && page.ctaText) cta.childNodes[0].textContent = page.ctaText + ' ';
      if (trustTitle && page.trustTitle) trustTitle.textContent = page.trustTitle;
      if (trustDesc && page.trustDesc) trustDesc.textContent = page.trustDesc;
    }
    const productSection = document.querySelector('main section:nth-of-type(2) .grid');
    if (productSection && Array.isArray(page.products)) {
      productSection.innerHTML = page.products.map((product, index) => planCard(product, index)).join('');
    }
  }

  function planCard(product, index) {
    const color = index % 2 ? 'primary' : 'secondary';
    const points = Array.isArray(product.points) ? product.points : [];
    const pdfUrl = String(product.pdf || '').trim();
    const href = pdfUrl || '../contact.html';
    const target = pdfUrl ? '_blank' : '_self';
    const rel = pdfUrl ? 'noopener noreferrer' : '';
    return `<a href="${esc(href)}" target="${target}" ${rel ? `rel="${rel}"` : ''} class="glass p-8 md:p-12 rounded-4xl flex flex-col md:flex-row gap-10 items-center group hover:bg-white/80 transition-all duration-500 no-underline block cursor-pointer">
      <div class="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left gap-4">
        <div class="w-20 h-20 rounded-3xl bg-${color}/10 text-${color} flex items-center justify-center group-hover:bg-${color} group-hover:text-white transition-all duration-500">
          <span class="material-symbols-outlined !text-4xl">${esc(product.icon || 'verified_user')}</span>
        </div>
        <div><h2 class="text-3xl font-extrabold text-slate-900 mb-1">${esc(product.name)}</h2><span class="text-sm font-bold text-slate-400 tracking-widest uppercase">${esc(product.planNo || '')}</span></div>
      </div>
      <div class="w-full md:w-2/3 space-y-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">${points.map(point => `<div class="flex items-start gap-3"><span class="material-symbols-outlined text-${color} mt-1">check_circle</span><p class="font-medium text-slate-600">${esc(point)}</p></div>`).join('')}</div>
        <div class="flex flex-wrap gap-4"><span class="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary transition-all active:scale-95 shadow-lg shadow-slate-900/10 inline-flex items-center">${esc(product.button || 'Get Details')}</span></div>
      </div>
    </a>`;
  }

  function label(value) {
    return String(value || '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  function pageKeyForPath() {
    const path = location.pathname;
    if (path.endsWith('/gallery.html') || path.endsWith('gallery.html')) return 'gallery';
    if (path.endsWith('/news.html') || path.endsWith('news.html')) return 'news';
    if (path.endsWith('/contact.html') || path.endsWith('contact.html')) return 'contact';
    if (path.includes('/insurance/')) return 'pages';
    return '';
  }

  async function loadRemotePageData() {
    await ensureBackend();
    const pageKey = pageKeyForPath();
    if (!pageKey || !window.VSBackend) return read();
    try {
      if (pageKey === 'news') {
        const [siteResponse, newsResponse] = await Promise.all([
          VSBackend.getSiteContent('news'),
          VSBackend.request('/api/site/news')
        ]);
        const siteContent = siteResponse?.content || {};
        const siteNews = siteContent.news || {};
        const siteArticles = Array.isArray(siteNews.articles) ? siteNews.articles : [];
        const dbArticles = Array.isArray(newsResponse?.articles) ? newsResponse.articles : [];
        const articles = siteArticles.length ? siteArticles : dbArticles;

        return merge(read(), {
          ...siteContent,
          news: {
            ...defaults.news,
            ...siteNews,
            articles: articles.map((article, index) => normalizeNewsArticle(article, index))
          }
        });
      }
      if (pageKey === 'gallery') {
        const response = await VSBackend.request('/api/site/gallery');
        const items = Array.isArray(response?.items) ? response.items : [];
        return merge(read(), {
          gallery: {
            ...defaults.gallery,
            items: items.map((item) => ({
              title: item.title || '',
              desc: '',
              icon: 'image',
              category: 'community',
              size: 'small',
              image: item.image_url || ''
            }))
          }
        });
      }
      const response = await VSBackend.getSiteContent(pageKey);
      const content = response?.content || {};
      return merge(read(), content);
    } catch (error) {
      console.warn('Could not load site content:', error);
      return read();
    }
  }

  function formatDate(value) {
    if (!value) return '';
    const date = new Date(Number(value) * 1000);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadRemotePageData();
    const path = location.pathname;
    if (path.endsWith('/gallery.html') || path.endsWith('gallery.html')) renderGallery(data.gallery);
    if (path.endsWith('/news.html') || path.endsWith('news.html')) renderNews(data.news);
    if (path.endsWith('/contact.html') || path.endsWith('contact.html')) renderContact(data.contact);
    if (path.includes('/insurance/')) renderInsurancePage(data);
  });
})();
