# dev-deee.github.io

Source for [Oladayo Ajomole's developer portfolio](https://dev-deee.github.io). It's a static
[Astro](https://astro.build) site, deployed to GitHub Pages by GitHub Actions on every push to `main`.

## Add a new project

1. Create one Markdown file in `src/content/projects/`. The file name becomes the URL, so
   `payments-api.md` is served at `/projects/payments-api`.
2. Start it with this front matter, then write the page in Markdown:

   ```markdown
   ---
   title: Payments API
   summary: One sentence (max 160 characters) shown on the project card.
   year: 2026
   language: Java            # Java | Go | Python | JavaScript | TypeScript
   tags: [Spring Boot, PostgreSQL]
   stack:                    # shown in the sidebar of the project page
     - Java 25, Spring Boot 4
     - PostgreSQL
   featured: true            # featured projects appear first on the home page
   order: 7                  # lower numbers come first
   repo: https://github.com/Dev-Deee/payments-api
   # Optional:
   # demo: https://…
   # docs: https://…/swagger-ui/index.html
   # links:
   #   - { label: Docker Hub, url: https://hub.docker.com/r/… }
   # repos:                  # extra repositories, e.g. one per microservice
   #   - { label: payments-ledger, url: https://github.com/Dev-Deee/payments-ledger }
   ---

   ## The problem
   ## What I built
   ## Architecture
   ## Key engineering decisions
   ```

3. For an architecture diagram, add a fenced code block with the language `mermaid`. At build
   time it's rendered to a static SVG, with light and dark versions. Add an
   `accDescr: <one sentence>` line inside the block; it becomes the image's alt text for screen
   readers. Rendering uses the installed Google Chrome, which GitHub's runners already have.
4. Commit and push to `main`. The site rebuilds and deploys in about a minute.

If the front matter is missing a required field or has a wrong type, the build fails with a
message saying which field. The schema is in `src/content.config.ts`.

## Other common edits

| What | Where |
|---|---|
| Email, social links, site description | `src/site.config.ts` |
| Resume | replace `public/resume.pdf` |
| Social preview image (1200×630) | replace `public/og-image.png` |
| About / Experience text | `src/pages/about.astro`, `src/pages/experience.astro` |
| Colours (light and dark) | CSS variables at the top of `src/styles/global.css` |

## Run locally

Requires Node 20.3+ (CI uses Node 22).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serve the built site
```

## Deployment (one-time setup)

1. The repository must be named `Dev-Deee.github.io` so the site is served at the root domain.
2. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and deploys the site.

`sitemap-index.xml` and `robots.txt` are generated at build time.
