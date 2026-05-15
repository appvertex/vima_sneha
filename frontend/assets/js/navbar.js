(() => {
  const basePath = window.location.pathname.includes('/insurance/') ? '../' : '';
  const storageKey = "vs_admin_data";
  const defaultBrandName = "Vima Sneha";
  const defaultTagline = "Guiding Minds, Assuring Lives";
  const navItems = [
    { page: "index", href: basePath + "index.html", label: "Home", icon: "home" },
    { page: "counselling", href: basePath + "counselling.html", label: "Counselling", icon: "spa" },
    { page: "insurance", href: basePath + "insurance.html", label: "Insurance", icon: "shield" },
    { page: "news", href: basePath + "news.html", label: "News", icon: "newspaper" },
    { page: "gallery", href: basePath + "gallery.html", label: "Gallery", icon: "photo_library" },
    { page: "contact", href: basePath + "contact.html", label: "Contact", icon: "mail" },
  ];
  const mobileBottomNavItems = navItems.filter((item) => item.page !== "gallery" && item.page !== "news");

  const styles = `
.vs-menu-open {
  overflow: hidden;
}

:root {
  --vs-mobile-bottom-nav-offset: calc(3.5rem + env(safe-area-inset-bottom));
}

/* Mobile header */
.mobile-top-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  background: rgba(250, 245, 249, 0.88);
  backdrop-filter: blur(18px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(150%);
  border-bottom: 1px solid rgba(180, 127, 166, 0.14);
  box-shadow: 0 12px 28px rgba(122, 79, 114, 0.08);
  padding: 0.9rem 1rem;
}

.mobile-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.mobile-header-left {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-width: 0;
}

.mobile-menu-btn {
  width: 46px;
  height: 46px;
  border: 0;
  border-radius: 16px;
  background: rgba(123, 76, 112, 0.1);
  color: #7A4F72;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 10px 24px rgba(123, 76, 112, 0.08);
}

.mobile-menu-btn:hover,
.mobile-menu-btn:focus-visible {
  background: rgba(123, 76, 112, 0.16);
  transform: translateY(-1px);
}

.mobile-menu-btn:active {
  transform: scale(0.96);
}

.mobile-branding {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.mobile-branding h1 {
  margin: 0;
  color: #7A4F72;
  font-size: 1.15rem;
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.03em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-branding p {
  margin: 0.18rem 0 0;
  color: rgba(122, 79, 114, 0.62);
  font-size: 0.67rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.mobile-profile-img {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  border: 1px solid rgba(180, 127, 166, 0.28);
  object-fit: contain;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 10px 26px rgba(123, 76, 112, 0.1);
  flex-shrink: 0;
}

/* Mobile overlay menu */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 1200;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.35s ease, visibility 0.35s ease;
}

.mobile-menu-overlay.is-open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.mobile-menu-backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 0% 0%, rgba(255, 215, 241, 0.95) 0%, transparent 48%),
    radial-gradient(circle at 100% 0%, rgba(255, 222, 166, 0.9) 0%, transparent 46%),
    radial-gradient(circle at 100% 100%, rgba(239, 181, 223, 0.78) 0%, transparent 50%),
    radial-gradient(circle at 0% 100%, rgba(151, 101, 138, 0.5) 0%, transparent 52%),
    rgba(252, 249, 248, 0.97);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
}

.mobile-menu-panel {
  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.25rem calc(1.5rem + env(safe-area-inset-bottom));
  transform: translateY(22px);
  transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
}

.mobile-menu-overlay.is-open .mobile-menu-panel {
  transform: translateY(0);
}

.mobile-menu-close-row {
  display: flex;
  justify-content: flex-end;
}

.mobile-menu-close {
  width: 52px;
  height: 52px;
  border: 0;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.34);
  color: #7A4F72;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 18px 34px rgba(123, 76, 112, 0.12);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.mobile-menu-close:hover,
.mobile-menu-close:focus-visible {
  background: rgba(255, 255, 255, 0.48);
  transform: translateY(-1px);
}

.mobile-menu-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  text-align: center;
}

.mobile-menu-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  align-self: center;
  padding: 0.9rem 1.15rem;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.38);
  border: 1px solid rgba(255, 255, 255, 0.38);
  box-shadow: 0 22px 40px rgba(123, 76, 112, 0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.mobile-menu-brand-block {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.mobile-menu-brand-name {
  color: #7A4F72;
  font-size: 1.18rem;
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.mobile-menu-brand-tagline {
  color: rgba(123, 76, 112, 0.64);
  font-size: 0.62rem;
  line-height: 1.2;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-top: 0.24rem;
}

.mobile-menu-badge-icon {
  width: 56px;
  height: 56px;
  border-radius: 1.2rem;
  background: rgba(255, 255, 255, 0.4);
  color: #7A4F72;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.mobile-menu-nav {
  width: 100%;
  max-width: 24rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.mobile-menu-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.05rem 1rem;
  border-radius: 1.45rem;
  color: #7A4F72;
  text-decoration: none;
  font-size: 1.65rem;
  font-weight: 300;
  letter-spacing: -0.03em;
  background: transparent;
  transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease, color 0.25s ease;
}

.mobile-menu-link:hover,
.mobile-menu-link:focus-visible {
  background: rgba(255, 255, 255, 0.38);
  box-shadow: 0 0 34px rgba(255, 255, 255, 0.55);
  transform: translateY(-1px);
}

.mobile-menu-link.is-active {
  background: rgba(123, 76, 112, 0.12);
  color: #61395B;
  box-shadow: inset 0 0 0 1px rgba(123, 76, 112, 0.12);
}

.mobile-menu-link-glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  background: linear-gradient(90deg, rgba(123, 76, 112, 0.08), transparent);
  filter: blur(18px);
  transition: opacity 0.25s ease;
}

.mobile-menu-link:hover .mobile-menu-link-glow,
.mobile-menu-link:focus-visible .mobile-menu-link-glow,
.mobile-menu-link.is-active .mobile-menu-link-glow {
  opacity: 1;
}

.mobile-menu-link-label {
  position: relative;
  z-index: 1;
}

.mobile-menu-meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
  width: 100%;
  max-width: 20rem;
  margin: 0 auto;
}

.mobile-menu-meta-card {
  padding: 1rem 0.8rem;
  border-radius: 1.35rem;
  background: rgba(255, 255, 255, 0.24);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 18px 34px rgba(123, 76, 112, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
}

.mobile-menu-meta-card span:first-child {
  color: #7B5804;
  font-size: 1.7rem;
}

.mobile-menu-meta-card span:last-child {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(27, 28, 28, 0.72);
}

.mobile-menu-footer {
  margin-top: auto;
  padding-top: 1.25rem;
}

.mobile-menu-cta {
  width: 100%;
  border: 0;
  border-radius: 1.5rem;
  background: linear-gradient(135deg, #7B4C70 0%, #97658A 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 800;
  box-shadow: 0 18px 36px rgba(123, 76, 112, 0.24);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.mobile-menu-cta:hover,
.mobile-menu-cta:focus-visible {
  transform: translateY(-1px);
  box-shadow: 0 22px 40px rgba(123, 76, 112, 0.28);
}

.mobile-menu-cta-icon {
  width: 42px;
  height: 42px;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.16);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Mobile bottom nav */
.mobile-bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateZ(0);
  z-index: 70;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.3rem;
  padding: 0.55rem 0.7rem calc(0.85rem + env(safe-area-inset-bottom));
  background: rgba(250, 245, 249, 0.88);
  border-top: 1px solid rgba(180, 127, 166, 0.14);
  box-shadow: 0 -10px 30px rgba(123, 76, 112, 0.06);
  backdrop-filter: blur(18px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(150%);
}

.vs-menu-open .mobile-bottom-nav {
  opacity: 0;
  pointer-events: none;
}

.nav-item {
  border-radius: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.24rem;
  padding: 0.5rem 0.15rem;
  color: #7A6878;
  text-decoration: none;
  transition: transform 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.nav-item:hover,
.nav-item:focus-visible {
  color: #7A4F72;
  background: rgba(180, 127, 166, 0.08);
}

.nav-item .icon {
  font-size: 1.25rem;
}

.nav-item .label {
  font-size: 0.54rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.15;
}

.nav-item.active {
  color: #7A4F72;
  background: rgba(123, 76, 112, 0.12);
  transform: translateY(-2px);
}

.nav-item.active .icon {
  font-variation-settings: 'FILL' 1, 'wght' 600;
}

/* Desktop island */
.nav-island-container {
  display: none;
  position: fixed;
  top: 1.5rem;
  left: 0;
  right: 0;
  z-index: 1100;
  justify-content: center;
  pointer-events: none;
}

.nav-island {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 1.8rem;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 9999px;
  box-shadow:
    0 15px 45px -10px rgba(122, 79, 114, 0.15),
    0 10px 20px -8px rgba(122, 79, 114, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  position: relative;
  transition: transform 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
}

.nav-island.island-scrolled {
  transform: translateY(-0.55rem) scale(0.97);
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 24px 40px -15px rgba(122, 79, 114, 0.22);
}

.nav-island-logo {
  display: flex;
  align-items: center;
  padding: 0 1.6rem 0 0.2rem;
  border-right: 2px solid rgba(180, 127, 166, 0.14);
  margin-right: 0.25rem;
  text-decoration: none;
  flex-shrink: 0;
  transition: transform 0.25s ease;
}

.nav-island-logo:hover,
.nav-island-logo:focus-visible {
  transform: scale(1.02);
}

.nav-brand-name {
  margin-left: 0.75rem;
  color: #7A4F72;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1;
  white-space: nowrap;
}

.nav-island-group {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  position: relative;
}

.nav-magnetic-highlight {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(135deg, #B47FA6 0%, #7A4F72 100%);
  border-radius: 9999px;
  z-index: 0;
  opacity: 0;
  pointer-events: none;
  transition: left 0.35s cubic-bezier(0.23, 1, 0.32, 1), width 0.35s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.25s ease;
}

.nav-island-link {
  position: relative;
  z-index: 1;
  padding: 0.82rem 1.35rem;
  border-radius: 9999px;
  color: #475569;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  white-space: nowrap;
  transition: color 0.25s ease;
}

.nav-island-link:hover,
.nav-island-link.active {
  color: #fff;
}

.nav-island-cta {
  margin-left: 1rem;
  padding: 0.82rem 1.9rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #1E1B4B 0%, #7A4F72 100%);
  color: #fff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: 0.97rem;
  font-weight: 800;
  box-shadow: 0 14px 30px -12px rgba(30, 27, 75, 0.45);
  transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
}

.nav-island-cta:hover,
.nav-island-cta:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 16px 34px -12px rgba(122, 79, 114, 0.44);
  filter: brightness(1.03);
}

@media (min-width: 1024px) {
  .mobile-top-header,
  .mobile-menu-overlay,
  .mobile-bottom-nav {
    display: none !important;
  }

  .nav-island-container {
    display: flex !important;
  }
}

@media (max-width: 1023px) {
  body:not(.safe-bottom) {
    padding-bottom: var(--vs-mobile-bottom-nav-offset);
  }

  .nav-island-container {
    display: none !important;
  }
}
`;

  const getBranding = () => {
    try {
      const storedData = JSON.parse(localStorage.getItem(storageKey) || "{}");
      return {
        name: typeof storedData.brandName === "string" && storedData.brandName.trim()
          ? storedData.brandName.trim()
          : defaultBrandName,
        tagline: typeof storedData.brandTagline === "string" && storedData.brandTagline.trim()
          ? storedData.brandTagline.trim()
          : defaultTagline,
      };
    } catch (error) {
      return { name: defaultBrandName, tagline: defaultTagline };
    }
  };

  const buildNavLinks = (className) =>
    navItems.map((item) => `<a href="${item.href}" data-page="${item.page}" class="${className}">${item.label}</a>`).join("");

  const buildMenuLinks = () =>
    navItems.map((item) => `
      <a href="${item.href}" data-page="${item.page}" class="mobile-menu-link">
        <span class="mobile-menu-link-label">${item.label}</span>
        <span class="mobile-menu-link-glow"></span>
      </a>`).join("");

  const buildBottomNav = () =>
    mobileBottomNavItems.map((item) => `
      <a href="${item.href}" class="nav-item" data-page="${item.page}">
        <span class="material-symbols-outlined icon">${item.icon}</span>
        <span class="label">${item.label}</span>
      </a>`).join("");

  if (!document.getElementById("vs-navbar-styles")) {
    const styleTag = document.createElement("style");
    styleTag.id = "vs-navbar-styles";
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);
  }

  const navbarMarkup = `
    <header class="mobile-top-header">
      <div class="mobile-header-content">
        <div class="mobile-header-left">
          <button class="mobile-menu-btn" id="vs-mobile-menu-open" type="button" aria-label="Open menu" aria-controls="vs-mobile-menu-overlay" aria-expanded="false">
            <span class="material-symbols-outlined">menu</span>
          </button>
          <div class="mobile-branding">
            <h1>${defaultBrandName}</h1>
            <p>${defaultTagline}</p>
          </div>
        </div>
        <img class="mobile-profile-img" alt="Vima Sneha logo" src="${basePath}assets/images/logo.png"/>
      </div>
    </header>

    <div class="mobile-menu-overlay" id="vs-mobile-menu-overlay" aria-hidden="true">
      <div class="mobile-menu-backdrop" data-menu-dismiss="true"></div>
      <div class="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div class="mobile-menu-close-row">
          <button class="mobile-menu-close" id="vs-mobile-menu-close" type="button" aria-label="Close menu">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div class="mobile-menu-content">
          <div class="mobile-menu-badge">
            <div class="mobile-menu-badge-icon">
              <img alt="Vima Sneha logo" src="${basePath}assets/images/logo.png" style="width: 32px; height: 32px; object-fit: contain;"/>
            </div>
            <div class="mobile-menu-brand-block">
              <span class="mobile-menu-brand-name">${defaultBrandName}</span>
              <span class="mobile-menu-brand-tagline">${defaultTagline}</span>
            </div>
          </div>

          <nav class="mobile-menu-nav" id="vs-mobile-menu-nav">
            ${buildMenuLinks()}
          </nav>

          <div class="mobile-menu-meta">
            <div class="mobile-menu-meta-card">
              <span class="material-symbols-outlined">verified_user</span>
              <span>Trusted Care</span>
            </div>
            <div class="mobile-menu-meta-card">
              <span class="material-symbols-outlined">support_agent</span>
              <span>Quick Support</span>
            </div>
          </div>
        </div>

        <div class="mobile-menu-footer">
          <a href="${basePath}contact.html" class="mobile-menu-cta">
            <span>Book Consultation</span>
            <span class="mobile-menu-cta-icon">
              <span class="material-symbols-outlined">arrow_forward</span>
            </span>
          </a>
        </div>
      </div>
    </div>

    <div class="nav-island-container">
      <div class="nav-island" id="island-header">
        <a href="${basePath}index.html" class="nav-island-logo">
          <img src="${basePath}assets/images/logo.png" alt="Vima Sneha logo" style="display: block; width: 42px; height: 42px; border-radius: 12px; object-fit: contain;"/>
          <span class="nav-brand-name">${defaultBrandName}</span>
        </a>

        <nav class="nav-island-group" id="island-nav-links">
          <div class="nav-magnetic-highlight"></div>
          ${buildNavLinks("nav-island-link")}
        </nav>

        <a href="${basePath}contact.html" class="nav-island-cta">Book Now</a>
      </div>
    </div>

    <nav class="mobile-bottom-nav" id="mobile-nav" aria-label="Mobile navigation">
      ${buildBottomNav()}
    </nav>
  `;

  const mount = document.getElementById("site-navbar-root");
  if (!document.querySelector(".nav-island-container, .mobile-top-header, .mobile-bottom-nav")) {
    if (mount) {
      mount.outerHTML = navbarMarkup;
    } else {
      document.body.insertAdjacentHTML("afterbegin", navbarMarkup);
    }
  }

  const applyNavbarBranding = () => {
    const branding = getBranding();
    document.querySelectorAll(".nav-brand-name").forEach((element) => {
      element.textContent = branding.name;
    });
    document.querySelectorAll(".mobile-branding h1, .mobile-menu-brand-name").forEach((element) => {
      element.textContent = branding.name;
    });
    document.querySelectorAll(".mobile-branding p, .mobile-menu-brand-tagline").forEach((element) => {
      element.textContent = branding.tagline;
    });
  };

  const path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const insuranceSubpages = [
    "insurance",
    "children-plans",
    "endowment-plans",
    "health-plans",
    "micro-insurance",
    "money-back-plans",
    "pension-plans",
    "term-life-insurance",
    "ulip-plans",
    "whole-life-plans",
  ];
  const page =
    path === "index.html" || path === "" ? "index" :
    path.includes("counselling") ? "counselling" :
    insuranceSubpages.some((slug) => path.includes(slug)) ? "insurance" :
    path.includes("news") ? "news" :
    path.includes("gallery") ? "gallery" :
    path.includes("contact") ? "contact" :
    "index";

  const syncActiveState = () => {
    document.querySelectorAll("#mobile-nav .nav-item, #island-nav-links [data-page], #vs-mobile-menu-nav [data-page]").forEach((item) => {
      const isActive = item.dataset.page === page;
      item.classList.toggle("active", isActive);
      item.classList.toggle("is-active", isActive);
      if (item.matches("#mobile-nav .nav-item")) {
        item.setAttribute("aria-current", isActive ? "page" : "false");
      }
    });
  };

  const overlay = document.getElementById("vs-mobile-menu-overlay");
  const openButton = document.getElementById("vs-mobile-menu-open");
  const closeButton = document.getElementById("vs-mobile-menu-close");

  const closeMobileMenu = () => {
    if (!overlay) return;
    document.body.classList.remove("vs-menu-open");
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    if (openButton) openButton.setAttribute("aria-expanded", "false");
  };

  const openMobileMenu = () => {
    if (!overlay) return;
    document.body.classList.add("vs-menu-open");
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    if (openButton) openButton.setAttribute("aria-expanded", "true");
  };

  if (openButton) {
    openButton.addEventListener("click", openMobileMenu);
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeMobileMenu);
  }

  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target instanceof HTMLElement && event.target.dataset.menuDismiss === "true") {
        closeMobileMenu();
      }
    });
  }

  document.querySelectorAll("#vs-mobile-menu-nav a, .mobile-menu-cta").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  window.addEventListener("scroll", () => {
    const island = document.getElementById("island-header");
    if (island) {
      island.classList.toggle("island-scrolled", window.scrollY > 20);
    }
  }, { passive: true });

  const initMagneticNav = () => {
    const group = document.querySelector(".nav-island-group");
    const highlight = document.querySelector(".nav-magnetic-highlight");
    const links = document.querySelectorAll(".nav-island-link");
    if (!group || !highlight || links.length === 0) return;

    const moveHighlight = (link) => {
      highlight.style.left = `${link.offsetLeft}px`;
      highlight.style.width = `${link.offsetWidth}px`;
      highlight.style.opacity = "1";
    };

    const resetHighlight = () => {
      const active = document.querySelector(".nav-island-link.active");
      if (active) {
        moveHighlight(active);
      } else {
        highlight.style.opacity = "0";
      }
    };

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => moveHighlight(link));
      link.addEventListener("focus", () => moveHighlight(link));
    });

    group.addEventListener("mouseleave", resetHighlight);
    window.addEventListener("resize", resetHighlight);
    requestAnimationFrame(resetHighlight);
  };

  applyNavbarBranding();
  syncActiveState();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(initMagneticNav), { once: true });
  } else {
    requestAnimationFrame(initMagneticNav);
  }
})();
