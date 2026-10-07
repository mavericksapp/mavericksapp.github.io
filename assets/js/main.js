(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const KEY = "mavericks-theme";
  const store = {
    get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  };
  // Dark is the default; "light" is the sand theme
  if (store.get() === "light") root.setAttribute("data-theme", "light");

  function updateIcon() {
    if (!toggle) return;
    const light = root.getAttribute("data-theme") === "light";
    toggle.textContent = light ? "\u263E\uFE0E" : "\u2600\uFE0E";
    toggle.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
  }
  toggle?.addEventListener("click", () => {
    root.classList.add("theme-anim");
    setTimeout(() => root.classList.remove("theme-anim"), 450);
    if (root.getAttribute("data-theme") === "light") { root.removeAttribute("data-theme"); store.set("dark"); }
    else { root.setAttribute("data-theme", "light"); store.set("light"); }
    updateIcon();
  });
  updateIcon();

  // Header shadow once the page scrolls
  const header = document.querySelector(".site-header");
  const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Gentle scroll reveal (skipped for reduced motion and elements already on screen)
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".section-heading,.app-card,.feature,.contact-strip-inner,.contact-info-grid>div,.email-card").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      el.style.setProperty("--d", [...el.parentElement.children].indexOf(el) * 0.08 + "s");
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  // Subtle tilt/parallax for the dotted background (pointer on desktop, device tilt on phones)
  const hero = document.querySelector(".hero");
  if (hero && !reduce) {
    const MAX = 14; // max shift in px
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const clamp = (v) => Math.max(-1, Math.min(1, v));
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      hero.style.setProperty("--tx", cx.toFixed(2) + "px");
      hero.style.setProperty("--ty", cy.toFixed(2) + "px");
      raf = (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) ? requestAnimationFrame(tick) : 0;
    };
    const aim = (nx, ny) => { tx = -nx * MAX; ty = -ny * MAX; if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      aim(clamp(e.clientX / window.innerWidth * 2 - 1), clamp(e.clientY / window.innerHeight * 2 - 1));
    }, { passive: true });
    document.addEventListener("pointerleave", () => aim(0, 0));
    // Phones/tablets: Android and others deliver orientation freely; iOS needs a permission prompt, so it is skipped there
    if ("DeviceOrientationEvent" in window && typeof DeviceOrientationEvent.requestPermission !== "function") {
      window.addEventListener("deviceorientation", (e) => {
        if (e.gamma == null || e.beta == null) return;
        aim(clamp(e.gamma / 30), clamp((e.beta - 45) / 30));
      }, { passive: true });
    }
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
