(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("mavericks-theme");

  if (savedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
  }

  function updateIcon() {
    if (!toggle) return;
    const dark = root.getAttribute("data-theme") === "dark";
    toggle.textContent = dark ? "☀" : "☾";
    toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }

  toggle?.addEventListener("click", () => {
    const dark = root.getAttribute("data-theme") === "dark";
    if (dark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("mavericks-theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("mavericks-theme", "dark");
    }
    updateIcon();
  });

  updateIcon();

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
