# Maverik Apps developer site

Free static site for GitHub Pages. Live at **https://maverickapps.github.io/**

## Setup
1. On GitHub create a **public** repo named exactly `maverickapps.github.io` (must match your username).
2. In this folder run:
```
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/maverickapps/maverickapps.github.io.git
git push -u origin main
```
3. Repo -> Settings -> Pages -> Source: "Deploy from a branch", Branch `main`, folder `/ (root)` -> Save.
4. Wait 1-2 minutes, then open https://maverickapps.github.io/ and https://maverickapps.github.io/privacy/connect-dots.html (use a private window to confirm no login is needed).

## Add a new app (e.g. `my-app`)
1. Add an object to `assets/js/apps-data.js` (copy an existing one, set `id: "my-app"`).
2. Put images in `assets/images/apps/my-app/` (`icon.png`, `screenshot-1..3.png`).
3. Copy `apps/connect-dots.html` to `apps/my-app.html`; change `data-app`, `<title>`, description, and `og:` URL.
4. Copy `privacy/_template.html` to `privacy/my-app.html`; replace the title/description/og:url and every `[BRACKETED]` item.
5. Commit and push. Use `https://maverickapps.github.io/privacy/my-app.html` in both store consoles.

## Update an app or policy
Edit `assets/js/apps-data.js` (store links, text) or the app's `privacy/<id>.html`, update the "Last updated" date, commit and push.

## Before submitting to stores
- The example privacy pages still contain `[BRACKETED]` placeholders. Fill each with what the app actually does (data, ads, analytics, third parties, children) and make it match your Play Data Safety and App Store privacy answers.
- This is a template, not legal advice.
