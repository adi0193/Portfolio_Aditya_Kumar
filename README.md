# Aditya Kumar — Portfolio

Personal site: https://portfolio-aditya-kumar.vercel.app

Built with React 19, Vite and React Router. There is no UI framework: the
styling is a small hand-written design system using CSS custom properties.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173 (shows REVIEW markers for unverified content)
npm run build     # production build in build/
npm run preview   # serve the production build
```

Requires Node 20.19+ (see `.nvmrc`).

## Editing content

All copy lives in **`src/data/profile.js`**: bio, experience, projects, skills
and achievements. Edit that file, not the components.

- **Skills** have a `status` of `work`, `projects` or `learning`. Mark them
  honestly.
- **Projects** with `featured: true` get the large editorial layout. Others
  appear under "Earlier work". A project shows either a screenshot (`image`)
  or an architecture sketch (`diagram`).
- **`review`:** any field with this text is shown as a marker in dev mode
  only.
- **Résumé:** replace `src/assets/cv.pdf` to update it.

See `REVIEW.md` for the content that still needs your input.

## Structure

```
src/
  data/profile.js        content
  styles/global.css      design tokens, base styles, reveal + reduced-motion rules
  hooks/                 useReveal, useScrollSpy, usePointerGlow
  components/ui/         Button, SectionHeader, Reveal, Diagram, ReviewNote
  components/layout/     Nav, Footer, Background
  sections/              Hero, About, Experience, Projects, Skills, Activity, Contact
  pages/                 Home, Resume (lazy-loaded, renders the PDF)
```

## Deployment

`vercel.json` sets the Vite build and an SPA rewrite so `/resume` works on
refresh. `public/_redirects` does the same on Netlify.
