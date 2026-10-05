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

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
