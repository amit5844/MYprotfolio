# GitHub Pages deployment

This project is a static site and has no build or install step.
Chart.js and Lucide are optional browser-CDN dependencies; the rest of the site remains static. The overview and illustrative executive dashboard artwork are stored locally in `assets/images/`.

1. Place all files, including `index.html` and `404.html`, at the repository root.
2. Configure public profile details and links in `assets/js/config.js`.
3. Review portfolio records in `assets/js/projects.js`; remove or update illustrative content before presenting it as completed work.
4. Push the repository to GitHub.
5. Open **Settings → Pages**, choose **Deploy from a branch**, choose the publishing branch and `/(root)`, then save.
6. Visit the Pages URL after deployment. The site's internal links and assets are relative and support repository subpaths.

The Executive KPI demonstration uses a separate fictional dataset in `assets/js/executive-kpi-data.js`. Preserve its visible full data disclaimer when editing or replacing demo values. Verify the editable responsibility prompts in `assets/js/executive-kpi-dashboard.js` before publishing any as personal contributions.

For a custom domain, follow GitHub Pages' domain and DNS instructions. Do not commit credentials, private datasets, internal URLs, or restricted company materials.
