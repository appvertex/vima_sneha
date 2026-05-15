(() => {
  const config = {
    counsellingPhone: "+919972875970",
    insurancePhone: "+919945933822",
    whatsappPhone: "919972875970",
  };

  const storageKey = "vs_admin_data";
  const defaultBrandName = "Vima Sneha";
  const defaultTagline = "Guiding Minds, Assuring Lives";

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
      return {
        name: defaultBrandName,
        tagline: defaultTagline,
      };
    }
  };

  const branding = getBranding();

  const footerMarkup = `
<footer class="mt-0 md:mt-10 relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-20px_50px_-20px_rgba(122,79,114,0.15)]" style="background-color: #FAF5F9;">
  <div class="flex flex-col md:flex-row min-h-0 md:min-h-[300px]">
    <div class="md:w-7/12 text-white p-7 md:p-10 relative z-10 organic-split shadow-2xl" style="background: linear-gradient(145deg, #7A4F72 0%, #4E2E4A 100%);">
      <div class="max-w-xl space-y-6 md:space-y-6">
        <div>
          <div class="text-3xl md:text-4xl font-black tracking-tighter mb-2">${branding.name}</div>
          <p class="text-amber-100/80 text-base md:text-lg leading-relaxed font-medium">${branding.tagline}. Your sanctuary for holistic well-being and security.</p>
        </div>

        <div class="space-y-3 md:space-y-4">
          <div class="flex items-center gap-5 group cursor-pointer">
            <span class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-amber-300 group-hover:text-amber-900 transition-all duration-300">
              <span class="material-symbols-outlined text-xl" data-icon="location_on">location_on</span>
            </span>
            <span class="text-base md:text-lg font-medium">Bantwal & Mangaluru, Karnataka</span>
          </div>

          <div class="flex items-center gap-5 group">
            <span class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-amber-300 group-hover:text-amber-900 transition-all duration-300">
              <span class="material-symbols-outlined text-xl" data-icon="call">call</span>
            </span>
            <div class="flex flex-col">
              <span class="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-0.5">Counselling</span>
              <a href="tel:${config.counsellingPhone}" class="text-base md:text-lg font-bold hover:text-amber-300 transition-colors">${config.counsellingPhone}</a>
            </div>
          </div>

          <div class="flex items-center gap-5 group">
            <span class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-amber-300 group-hover:text-amber-900 transition-all duration-300">
              <span class="material-symbols-outlined text-xl" data-icon="call">call</span>
            </span>
            <div class="flex flex-col">
              <span class="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-0.5">Insurance</span>
              <a href="tel:${config.insurancePhone}" class="text-base md:text-lg font-bold hover:text-amber-300 transition-colors">${config.insurancePhone}</a>
            </div>
          </div>
        </div>

        <div class="pt-2">
          <h4 class="text-[11px] font-black tracking-[0.28em] uppercase text-amber-300/80 mb-3">Stay Connected</h4>
          <div class="flex gap-3 max-w-md">
            <input class="bg-white/10 border border-white/10 rounded-2xl px-4 md:px-5 py-2.5 md:py-3 w-full text-sm focus:ring-2 focus:ring-amber-300 focus:bg-white/20 outline-none transition-all placeholder:text-white/40 text-white" placeholder="Enter your email" type="email"/>
            <button class="bg-amber-300 text-amber-900 font-black px-5 md:px-6 py-2.5 md:py-3 rounded-2xl text-sm hover:bg-white hover:scale-105 transition-all active:scale-95 shadow-xl shadow-black/20 gold-glow">
              JOIN
            </button>
          </div>
        </div>
      </div>

      <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
    </div>

    <div class="md:w-5/12 p-6 pb-8 md:p-10 md:pb-8 md:pl-16 flex flex-col bg-[#FAF5F9]">
      <div class="hidden md:grid grid-cols-2 gap-x-6 gap-y-6 md:gap-x-8 md:gap-y-6">
        <div class="space-y-6">
          <h4 class="text-[11px] font-black tracking-[0.3em] uppercase text-purple-900/40">Quick Links</h4>
          <ul class="space-y-3">
            <li><a class="text-[15px] md:text-base text-purple-900/70 hover:text-purple-900 font-bold transition-all footer-link-animated" href="index.html">Home</a></li>
            <li><a class="text-[15px] md:text-base text-purple-900/70 hover:text-purple-900 font-bold transition-all footer-link-animated" href="counselling.html">Counselling</a></li>
            <li><a class="text-[15px] md:text-base text-purple-900/70 hover:text-purple-900 font-bold transition-all footer-link-animated" href="insurance.html">Insurance</a></li>
            <li><a class="text-[15px] md:text-base text-purple-900/70 hover:text-purple-900 font-bold transition-all footer-link-animated" href="news.html">News</a></li>
            <li><a class="text-[15px] md:text-base text-purple-900/70 hover:text-purple-900 font-bold transition-all footer-link-animated" href="gallery.html">Gallery</a></li>
          </ul>
        </div>

        <div class="space-y-6">
          <h4 class="text-[11px] font-black tracking-[0.3em] uppercase text-purple-900/40">Support</h4>
          <ul class="space-y-3">
            <li><a class="text-[15px] md:text-base text-purple-900/70 hover:text-purple-900 font-bold transition-all footer-link-animated" href="contact.html">Contact</a></li>
            <li><a class="text-[15px] md:text-base text-purple-900/70 hover:text-purple-900 font-bold transition-all footer-link-animated" href="#">Privacy Policy</a></li>
            <li><a class="text-[15px] md:text-base text-purple-900/70 hover:text-purple-900 font-bold transition-all footer-link-animated" href="#">Terms of Use</a></li>
            <li><a class="text-[15px] md:text-base text-purple-900/70 hover:text-purple-900 font-bold transition-all footer-link-animated" href="#">FAQs</a></li>
          </ul>
        </div>
      </div>

      <div class="bottom-bar-thick mt-0 md:mt-8 pt-4 md:pt-6 flex flex-col gap-4 md:gap-5">
        <div class="flex flex-col lg:flex-row justify-between items-center lg:items-center gap-5 md:gap-6 text-center lg:text-left">
          <p class="text-purple-900/50 text-xs md:text-sm font-bold leading-relaxed">
            &copy; <span id="year"></span> ${branding.name}. <br class="hidden lg:block"/>${branding.tagline}.
          </p>
          <div class="flex flex-col items-center lg:items-end gap-2">
            <p class="text-[10px] font-black tracking-widest text-purple-900/30 uppercase">Developed by</p>
            <a href="https://appvertex.in" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center lg:items-end group">
              <span class="text-[13px] md:text-sm font-black text-purple-900 group-hover:text-primary transition-colors">APPVERTEX</span>
              <span class="text-[10px] md:text-[11px] font-medium text-purple-900/50 italic group-hover:text-purple-900 transition-colors underline decoration-purple-900/10 underline-offset-4">Built by Leston & Lenstar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-20" style="background-color: #7A4F72;"></div>
  <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-10" style="background-color: #D4A853;"></div>
</footer>`;

  const mountPoint = document.getElementById("site-footer-root");
  if (mountPoint) {
    mountPoint.outerHTML = footerMarkup;
  } else if (!document.querySelector("footer")) {
    document.body.insertAdjacentHTML("beforeend", footerMarkup);
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const backToTopBtn = document.createElement("button");
  backToTopBtn.className = "floating-back-to-top fixed w-14 h-14 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl flex items-center justify-center text-purple-900 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:bg-white hover:scale-110 active:scale-95 opacity-0 invisible translate-y-8 duration-500 overflow-hidden group";
  backToTopBtn.innerHTML = `
    <div class="absolute inset-0 bg-gradient-to-br from-amber-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <span class="material-symbols-outlined relative z-10 !text-3xl transition-transform group-hover:-translate-y-1">arrow_upward</span>
  `;
  backToTopBtn.setAttribute("aria-label", "Back to top");
  document.body.appendChild(backToTopBtn);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove("opacity-0", "invisible", "translate-y-8");
    } else {
      backToTopBtn.classList.add("opacity-0", "invisible", "translate-y-8");
    }
  };

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // Initialize SVG icons if icons.js is loaded
  if (typeof vsBindDataIcons === "function") {
    vsBindDataIcons();
  }
})();
