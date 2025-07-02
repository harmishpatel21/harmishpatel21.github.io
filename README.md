# Portfolio Terminal - Deploy to GitHub Pages

This guide will help you deploy your Vite + React portfolio terminal to GitHub Pages.

---

## 1. Prerequisites

-   Node.js and npm installed
-   GitHub repository created and linked to your local project

---

## 2. Install Dependencies

```
npm install
```

---

## 3. Set the Correct `base` in `vite.config.ts`

-   **If your repo is named `harmishpatel21.github.io` (user/organization page):**
    ```ts
    // vite.config.ts
    export default defineConfig({
        plugins: [react()],
        base: "/",
    });
    ```
-   **If your repo is a project page (e.g., `my-portfolio`):**
    ```ts
    export default defineConfig({
        plugins: [react()],
        base: "/my-portfolio/",
    });
    ```

---

## 4. Add Deploy Scripts

Install the `gh-pages` package:

```
npm install --save-dev gh-pages
```

Add these scripts to your `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

---

## 5. Build and Deploy

```
npm run deploy
```

This will build your project and push the `dist` folder to the `gh-pages` branch.

---

## 6. Configure GitHub Pages

-   Go to your repository on GitHub
-   Go to **Settings** → **Pages**
-   Set the source to `gh-pages` branch and `/ (root)`

---

## 7. Access Your Site

-   If user/organization page: `https://harmishpatel21.github.io/`
-   If project page: `https://harmishpatel21.github.io/<repo-name>/`

---

## 8. Troubleshooting

-   If you see MIME type errors, double-check your `base` in `vite.config.ts` and redeploy.
-   Clear your browser cache with `Ctrl+Shift+R` or `Cmd+Shift+R`.
-   Make sure GitHub Pages is set to the correct branch and folder.

---

## 9. Remove Remote Origin (if needed)

```
git remote remove origin
```

---

## 10. Add a New Remote (if needed)

```
git remote add origin <new-repo-url>
```

---

## 11. Clean Old gh-pages Branch (if needed)

```
npx gh-pages-clean
npm run deploy
```

---

**Enjoy your deployed portfolio!**
