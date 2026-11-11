# Royal Cut — barbershop website

```bash
npm install
npm start        # dev server at http://localhost:63342
npm run build    # production build into dist/
npm run typecheck
```

## Structure

```
config/
  site.js        pages (URL, menu label, title, description) + business info for Google
  layout.js      shared <head>, header with menu, footer — injected into every page
src/
  common/layout.ts   burger menu + scroll progress bar (imported by every page)
  styles/            _variables.scss (colours, breakpoints) + layout.scss (base, header, footer)
  components/        gallery, product list, product filter
  pages/<name>/      <name>.html + .ts + .scss for each page
  public/            copied as-is to dist/: favicons, robots.txt, sitemap.xml, _redirects, products.json
  product-images/    images and video
```

**Add a page:** create `src/pages/<name>/` with `<name>.html`, `<name>.ts`, `<name>.scss`
(copy an existing one), add it to `pages` in `config/site.js`, to `src/public/_redirects` and `src/public/sitemap.xml`.
The menu updates automatically.
