# Aditya Kumar — Portfolio

Personal site: https://portfolio-aditya-kumar.vercel.app

Built with React 19, Vite and React Router, with no UI framework. The styling
is a small hand-written design system using CSS custom properties: aged ivory
and warm stone for paper, forest charcoal and smoky olive for the dark
sections, muted oxblood as the single accent, and antique bronze for hairlines.
Type is set in Instrument Serif (display), Manrope (body) and IBM Plex Mono
(metadata).

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

- **`cases`** are the main case files. Each has a case number, a problem,
  approach steps, tools, evidence (a screenshot as `image`, or an
  architecture sketch as `diagram`) and a one-line `observation` that appears
  on hover. **`minorCases`** are the smaller early projects.
- **`toolkit`** items have a `status` of `work`, `projects` or `learning`.
  Mark them honestly.
- **Experience** entries show "Problems encountered" automatically once you
  fill in the `problems` field.
- **`review`:** any field with this text is shown as a marker in dev mode
  only.
- **Résumé:** replace `src/assets/cv.pdf` to update it.

See `REVIEW.md` for the content that still needs your input.

## Structure

```
src/
  data/profile.js        content
  styles/global.css      design tokens, paper texture, reveal, observation-mode and reduced-motion rules
  context/               ObservationMode (the annotation toggle, remembered per visitor)
  hooks/                 useReveal, useScrollSpy
  components/ui/         Button, SectionHead, Reveal, Note, Diagram, ReviewNote
  components/layout/     Nav, ObserveToggle, RedThread, Cursor, Footer
  sections/              Hero, PatternFigure, About, CaseFiles, CaseDialog, Experience, Toolkit, Contact
  pages/                 Home, Resume (lazy-loaded, renders the PDF)
```

## Details worth finding

- **Observation mode:** the switch in the nav reveals annotations (`.obs`
  elements, written with `<Note>`) about design and engineering decisions.
- **The red thread:** an oxblood line down the left edge on wide screens
  tracks reading progress, with a knot for each section.
- **Observation cards:** the hero card cycles through short observations,
  and the small italic line in the footer changes when clicked.
- **Case files:** hover a case file to see an observation slip. Click it to
  open the full write-up in a dialog.

## Deployment

`vercel.json` sets the Vite build and an SPA rewrite so `/resume` works on
refresh. `public/_redirects` does the same on Netlify.
