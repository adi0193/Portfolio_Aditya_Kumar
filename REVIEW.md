# Content to review

The redesign uses only information from your résumé (`src/assets/cv.pdf`), your
GitHub profile and repositories, the previous version of this site, and the
brief you wrote. Nothing has been invented. The items below are missing or
could not be verified. All content lives in `src/data/profile.js`.

When you run `npm run dev`, every item marked with `review:` in that file shows
up on the page as a dashed burgundy **REVIEW** marker. These markers never appear in
production builds.

## Needs your input

- **Problems encountered:** the Experience section has a "Problems
  encountered" slot for each role. It stays hidden until you fill in the
  `problems` field in `src/data/profile.js`, since I don't know what problems
  you actually faced and haven't guessed.
- **Think Future Technologies:** add your start date and location. The
  responsibilities listed (application and API testing, healthcare workflows,
  AI chatbot evaluation, client coordination) come from your brief, so confirm
  they all belong to this role.
- **Résumé PDF:** `src/assets/cv.pdf` predates your current role and still
  lists the InternPe internship as the latest experience. Upload an updated
  version with the same filename.
- **LinkedIn URL:** your résumé uses `linkedin.com/in/adi0193`, but the old
  site and your GitHub profile use `linkedin.com/in/aditya-kumar-929902217`.
  The site uses the second one. Confirm which is current.
- **Case file problem statements:** for Resume Maker, Personality Test and
  Splitwise, these describe what each app does, based on its code. If you
  remember why you actually built them, replace the `problem` text with
  that.
- **Screenshots:** Personality Test and Splitwise have no screenshots, so they
  show architecture sketches drawn from their code. To use real screenshots
  instead, add them to `src/assets/projects/` and set `image` on the case in `cases`.

## Projects not shown

You listed these projects in your brief, but I could not find a public
repository for any of them:

- ScreenVerse (only mentioned in the InternPe internship entry, based on your
  résumé)
- Empathy AI
- Chess Game (Java)
- Financial Dashboard
- AI WhatsApp Health Alert System

If they exist in private repositories or under other names, add them to
`projects` in `src/data/profile.js` with real details and links. These would
also back up the "AI integration" and "Java" skills, which are currently
marked as *learning*.

## Removed from the old site

- **Skill icons for Redis, Firebase and PostgreSQL:** no project or résumé
  entry shows them being used. Add them back with an honest status if you
  have used them.
- **Fabricated project descriptions:** the old descriptions mentioned things
  like "competitive AI opponents" and "real-time physics" for the car game,
  which the code doesn't support. They were replaced with factual summaries.
- **Broken link:** `github.com/adi0193/ResumeMaker` doesn't exist. It now
  points to `Resume_Maker`, which also has a live demo.
- **Illustrations:** the stock illustrations (`home-main.svg`, `avatar.svg`,
  `about.png`) were removed. Per the brief, no stock imagery is used as a
  profile image. A real photo of you could go in the About section if you
  want one.
- **Social preview tags:** these pointed to another developer's site
  (`soumyajit.vercel.app`). They now use your Vercel URL and a new
  `public/og.png`.

## Optional

- **Availability:** no availability status is shown, since I don't know it.
  If you are open to roles, the hero is a natural place to say so.
- **Coding profiles:** your résumé mentions LeetCode, GeeksforGeeks and
  CodeChef profiles, but the URLs on your GitHub README are inconsistent.
  Send the correct links if you want them on the site.
