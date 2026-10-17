# Amit Kumar — Data & Analytics Portfolio

A responsive static portfolio built with HTML, CSS, and vanilla JavaScript. It has no build step or required backend and is designed to work from a GitHub Pages repository subpath.

## Run locally

Open `index.html` in a browser. For a local HTTP server, use any static file server from this directory; keep the relative file structure intact.

## Configure before publishing

Edit `assets/js/config.js`:

- Replace `YOUR_EMAIL_ADDRESS` with a public contact email.
- Set `github`, `linkedin`, `resumePath`, and credential link only when real public URLs/files are available.
- Set `experienceStartDate` to the verified start month (`2024-10-01` by default); the experience duration is calculated on page load.
- Update `lastUpdated` and profile details.

Edit `assets/js/projects.js` to add or update portfolio records. Each record has `id`, `title`, `category`, `type`, `status`, `description`, `problem`, `solution`, `tools`, `topics`, and optional `updated`, `repo`, and `demo` fields. Leave external URLs empty until a real public destination is available. Case study content currently uses illustrative labels where implementation evidence was not supplied; update the status and detail text only when verified.

The Executive KPI Dashboard case study is a professional experience theme with a separate interactive fictional-data demo. Its public sample values and disclaimer live in `assets/js/executive-kpi-data.js`. Update the fictional periods and values there as one dataset; the KPI cards and charts derive from those records. Do not replace the disclaimer with employer data or present sample values as company performance. Editable responsibility prompts are in `assets/js/executive-kpi-dashboard.js`; confirm each item before describing it as work personally performed.

## GitHub Pages deployment

1. Push these files to the root of a GitHub repository.
2. In **Settings → Pages**, choose **Deploy from a branch**, select the branch, and select `/(root)`.
3. Save and wait for the Pages deployment. GitHub Pages serves `index.html` at the project URL and uses `404.html` for missing paths.

All internal pages and assets use relative paths, so repository URLs such as `https://username.github.io/repository/` work without a custom domain.

## Pages

`index.html`, `about.html`, `skills.html`, `projects.html`, `project-detail.html`, `ai-solutions.html`, `services.html`, `experience.html`, `contact.html`, and `404.html`.

## Notes

- The overview charts use Chart.js from its public CDN and gracefully omit charts when that library is unavailable.
- The Executive KPI project detail has an independent, locally configured fictional dataset and period selector; when Chart.js is unavailable it keeps the sample KPIs visible and presents chart fallbacks.
- Navigation icons use Lucide from its public CDN and fall back to text glyphs if unavailable.
- The overview hero illustration is a local SVG in `assets/images/`; the professional-experience duration is calculated from the configured October 2024 start date.
- The contact form validates in the browser and prepares an email using `mailto:`; it does not send data to a server.
- Project repository, demo, social, credential, and resume links remain hidden until configured.
- No company metrics, testimonials, confidential details, or unsupported AI capabilities are claimed.
