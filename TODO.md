# TODO

## Infrastructure

- [ ] **Switch GitHub Pages to GitHub Actions source**
  - Currently deploying from committed `docs/` folder on main branch
  - Should switch to deploying from GitHub Actions artifact for cleaner workflow
  - Steps:
    1. Go to repo Settings → Pages
    2. Change "Source" from "Deploy from a branch" to "GitHub Actions"
    3. Add `docs/` to `.gitignore`
    4. Remove tracked docs: `git rm -r --cached docs/`
    5. Commit and push
  - Benefits: No need to commit build output, cleaner git history, fresh builds on every push

## Performance

- [ ] **Code-split large JavaScript bundle**
  - Current bundle is ~1.1MB (381KB gzipped)
  - Consider using dynamic `import()` for route-based code splitting
  - See: https://rollupjs.org/configuration-options/#output-manualchunks
