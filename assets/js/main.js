(function () {
  var S = window.SITE, root = document.body.dataset.root || "", page = document.body.dataset.page;
  function esc(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : s; return d.innerHTML; }
  function buttons(a) {
    var g = a.googlePlay ? '<a class="btn" href="' + esc(a.googlePlay) + '" rel="noopener">Get it on Google Play</a>' : '<span class="btn off">Google Play: Coming soon</span>';
    var i = a.appStore ? '<a class="btn" href="' + esc(a.appStore) + '" rel="noopener">Download on the App Store</a>' : '<span class="btn off">App Store: Coming soon</span>';
    return g + i;
  }
  function icon(a) { return root + "assets/images/apps/" + a.id + "/icon.png"; }
  document.getElementById("site-header").innerHTML =
    '<nav class="nav" aria-label="Main"><a class="brand" href="' + root + 'index.html"><img src="' + root + 'assets/images/logo.png" alt="" width="36" height="36">' + esc(S.name) + '</a>' +
    '<ul><li><a href="' + root + 'index.html#apps">Apps</a></li><li><a href="' + root + 'privacy.html">Privacy</a></li><li><a href="' + root + 'contact.html">Contact</a></li></ul></nav>';
  document.getElementById("site-footer").innerHTML =
    '<p>&copy; ' + new Date().getFullYear() + ' ' + esc(S.name) + '. <a href="' + root + 'privacy.html">Privacy Policy</a> &middot; <a href="' + root + 'contact.html">Contact</a></p>';
  if (page === "home") {
    document.getElementById("tagline").textContent = S.tagline;
    document.getElementById("apps-grid").innerHTML = S.apps.map(function (a) {
      return '<article class="card"><img class="icon" src="' + icon(a) + '" alt="' + esc(a.name) + ' app icon" width="72" height="72">' +
        '<h3><a href="apps/' + a.id + '.html">' + esc(a.name) + '</a></h3><p>' + esc(a.short) + '</p>' +
        a.platforms.map(function (p) { return '<span class="badge">' + esc(p) + '</span>'; }).join("") + '<div>' + buttons(a) + '</div>' +
        '<p class="links"><a href="privacy/' + a.id + '.html">Privacy Policy</a> &middot; <a href="contact.html">Contact</a></p></article>';
    }).join("");
  }
  if (page === "privacy-index") {
    document.getElementById("privacy-list").innerHTML = S.apps.map(function (a) { return '<li><a href="privacy/' + a.id + '.html">' + esc(a.name) + ' Privacy Policy</a></li>'; }).join("");
  }
  if (page === "app") {
    var a = S.apps.filter(function (x) { return x.id === document.body.dataset.app; })[0];
    if (!a) return;
    document.getElementById("main").innerHTML =
      '<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"><img class="icon" src="' + icon(a) + '" alt="' + esc(a.name) + ' app icon" width="72" height="72"><h1>' + esc(a.name) + '</h1></div>' +
      '<p class="lead">' + esc(a.short) + '</p><div>' + buttons(a) + '</div>' +
      '<h2>About</h2><p>' + esc(a.description) + '</p>' +
      '<h2>Features</h2><ul>' + a.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join("") + '</ul>' +
      '<h2>Supported platforms</h2><p>' + a.platforms.map(function (p) { return '<span class="badge">' + esc(p) + '</span>'; }).join("") + '</p>' +
      '<h2>Screenshots</h2><div class="shots">' + [1, 2, 3].map(function (n) { return '<img src="' + root + 'assets/images/apps/' + a.id + '/screenshot-' + n + '.png" alt="' + esc(a.name) + ' screenshot ' + n + '" loading="lazy">'; }).join("") + '</div>' +
      '<h2>Privacy &amp; support</h2><p><a href="' + root + 'privacy/' + a.id + '.html">Privacy Policy</a> &middot; <a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a></p>';
  }
})();
