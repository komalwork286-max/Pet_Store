# PawNest Pet Store – Demo Website (by MiPetzy)

A one-page demo website for a pet store, built with plain HTML, CSS and JavaScript.
"PawNest" is a sample store, used to show clients what their own website can look like.

## Files

```
pawnest-demo-website/
├── index.html      → page content
├── css/style.css   → colours, layout, animations
├── js/main.js      → animations, product list + STORE settings (top of file)
├── assets/         → MiPetzy app screenshots
└── README.md
```

## Run it on your computer

- **Easiest:** double-click `index.html`. It opens in your browser.
- **With VS Code:** install the "Live Server" extension, right-click `index.html` → "Open with Live Server".

## Customise for a real client

1. Open `js/main.js` and edit the `STORE` block (name, map location, opening hours) and the `PRODUCTS` list (add `photo` paths for real product photos).
2. In `index.html`, replace "PawNest", the address, products, reviews and gallery with the client's real details.
3. Remove the "Demo website" bar at the top of `index.html` (the `demo-bar` div).

## Publish online with GitHub Pages (free link)

1. Create a free account at https://github.com and sign in.
2. Click **New repository** → name it `pawnest-demo` → choose **Public** → **Create repository**.
3. On the new repo page click **uploading an existing file**, drag in everything inside this folder
   (`index.html`, the `css` folder, the `js` folder, `README.md`) → **Commit changes**.
4. Go to **Settings → Pages** → under "Branch" pick `main` and `/ (root)` → **Save**.
5. Wait 1–2 minutes and refresh. Your link appears at the top:
   `https://YOUR-USERNAME.github.io/pawnest-demo/`

### Or with Git commands (inside this folder)

```
git init
git add .
git commit -m "PawNest demo website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/pawnest-demo.git
git push -u origin main
```
Then do step 4 above (Settings → Pages).

To update the live site later: edit the files, then `git add .`, `git commit -m "update"`, `git push`.
