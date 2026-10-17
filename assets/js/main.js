(function () {
  var config = window.PORTFOLIO_CONFIG;
  var projects = window.PORTFOLIO_PROJECTS || [];
  var page = document.body.dataset.page || "overview";
  var navigation = [
    ["overview", "Overview", "index.html", "◫", "layout-dashboard"],
    ["about", "About Me", "about.html", "◎", "user-round"],
    ["skills", "Technical Skills", "skills.html", "◇", "chart-no-axes-column"],
    ["projects", "Projects", "projects.html", "▦", "folders"],
    ["ai-solutions", "AI Solutions", "ai-solutions.html", "✳", "sparkles"],
    ["services", "Services", "services.html", "⌘", "briefcase-business"],
    ["experience", "Experience", "experience.html", "◷", "history"],
    ["contact", "Contact", "contact.html", "↗", "mail"]
  ];
  var pageTitles = {
    overview: "Analytics Portfolio Overview", about: "About Amit", skills: "Technical Skills",
    projects: "Project Explorer", "project-detail": "Project Details", "ai-solutions": "AI Solutions",
    services: "Analytics Services", experience: "Professional Experience", contact: "Get in Touch"
  };
  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }
  function safeLink(url) {
    return typeof url === "string" && /^https:\/\/[^\s]+$/i.test(url) ? url : "";
  }
  function experienceDuration() {
    var start = new Date(config.experienceStartDate + "T00:00:00");
    var now = new Date();
    if (Number.isNaN(start.getTime()) || start > now) return "Update start date";
    var months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
    if (now.getDate() < start.getDate()) months -= 1;
    months = Math.max(0, months);
    var years = Math.floor(months / 12);
    var remainingMonths = months % 12;
    if (years && remainingMonths) return years + " " + (years === 1 ? "year" : "years") + ", " + remainingMonths + " " + (remainingMonths === 1 ? "month" : "months");
    if (years) return years + " " + (years === 1 ? "year" : "years");
    if (remainingMonths) return remainingMonths + " " + (remainingMonths === 1 ? "month" : "months");
    return "Less than a month";
  }
  function externalButton(url, label, kind) {
    return url ? '<a class="button ' + (kind || "button-secondary") + '" href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer">' + label + ' ↗</a>' : "";
  }
  function resumeButton() {
    var path = config.resumePath;
    if (!path || /placeholder|your[_ -]?resume/i.test(path)) return "";
    return '<a class="button button-secondary" href="' + escapeHtml(path) + '" download>Download resume ↓</a>';
  }
  function toolsMarkup(tools) {
    return (tools || []).map(function (tool) { return '<span class="tag">' + escapeHtml(tool) + '</span>'; }).join("");
  }
  window.projectCardMarkup = function (project) {
    var repository = safeLink(project.repo);
    var detailUrl = "project-detail.html?id=" + encodeURIComponent(project.id);
    var labels = project.sampleData ? '<div class="project-labels"><span class="tag tag-blue">Featured Project</span><span class="tag tag-amber">Illustrative Demo</span><span class="tag">Sample Data</span></div>' : "";
    var thumbnail = project.sampleData ? '<div class="project-thumb executive-project-thumb"><img src="assets/images/executive-kpi-preview.svg" alt="" loading="lazy"><span class="tag tag-amber">SAMPLE DATA · ILLUSTRATIVE DEMO</span></div>' : '<div class="project-thumb" aria-hidden="true"><span class="tag tag-blue">' + escapeHtml(project.category) + '</span><span class="thumb-chart"><i></i><i></i><i></i><i></i><i></i></span></div>';
    var primaryLink = project.sampleData ? '<a class="button button-quiet" href="' + detailUrl + '">View Case Study →</a>' : '<a class="button button-quiet" href="' + detailUrl + '">View details →</a>';
    var demoLink = project.sampleData ? '<a class="button button-primary" href="' + detailUrl + '#dashboard-demo">View Dashboard Demo ↗</a>' : "";
    return '<article class="panel project-card reveal">' + thumbnail + '<div class="project-body">' + labels + '<h3>' + escapeHtml(project.title) + '</h3>' + (project.subtitle ? '<p class="project-subtitle">' + escapeHtml(project.subtitle) + '</p>' : '') + '<p>' + escapeHtml(project.description) + '</p><div class="project-tools">' + toolsMarkup(project.tools) + '</div><div class="project-actions">' + primaryLink + demoLink + (repository ? '<a class="button button-quiet" href="' + escapeHtml(repository) + '" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository for ' + escapeHtml(project.title) + '">GitHub ↗</a>' : '') + '</div></div></article>';
  };
  function projectGrid(items) {
    return items.map(window.projectCardMarkup).join("");
  }
  function header(title, subtitle, actions) {
    return '<div class="page-heading"><div><span class="eyebrow">DATA &amp; ANALYTICS · PORTFOLIO</span><h1>' + title + '</h1><p>' + subtitle + '</p></div>' + (actions || "") + '</div>';
  }
  function panelHeader(title, description, trailing) {
    return '<div class="panel-header"><div><h2>' + title + '</h2>' + (description ? '<p>' + description + '</p>' : '') + '</div>' + (trailing || '') + '</div>';
  }
  function contactAnchor() {
    return '<a class="button button-primary topbar-contact" href="contact.html">Contact Amit <span aria-hidden="true">↗</span></a>';
  }
  function profileActions() {
    var buttons = externalButton(safeLink(config.github), "GitHub") + externalButton(safeLink(config.linkedin), "LinkedIn") + resumeButton();
    return buttons || '<span class="muted small">Profile and resume links can be added in configuration.</span>';
  }
  function technologyItems() {
    var icons = {
      "Power BI": ["chart-no-axes-column-increasing", "powerbi"],
      "SQL": ["database", "sql"],
      "Python": ["code-xml", "python"],
      "Snowflake": ["snowflake", "snowflake"],
      "Tableau": ["chart-pie", "tableau"],
      "Machine Learning": ["brain-circuit", "ml"],
      "Power Automate": ["workflow", "flow"],
      "AI Analytics": ["sparkles", "ai"]
    };
    return config.technologies.map(function (name, index) {
      var initials = name.split(/\s+/).map(function (part) { return part.charAt(0); }).join("").slice(0, 2);
      var icon = icons[name] || ["shapes", initials || String(index + 1)];
      return '<div class="tech-item"><span class="tech-mark tech-mark-' + escapeHtml(icon[1]) + '" aria-hidden="true"><i data-lucide="' + escapeHtml(icon[0]) + '"></i><span class="icon-fallback">' + escapeHtml(initials || String(index + 1)) + '</span></span><span>' + escapeHtml(name) + '</span></div>';
    }).join("");
  }
  function serviceCards(items) {
    return (items || config.services).map(function (service) {
      return '<article class="panel service-card"><span class="service-icon" aria-hidden="true">' + escapeHtml(service.code) + '</span><h3>' + escapeHtml(service.name) + '</h3><p>' + escapeHtml(service.problem) + '</p><a class="button button-quiet" href="services.html">Explore service →</a></article>';
    }).join("");
  }
  function overview() {
    var featured = projects.filter(function (project) { return project.featured; }).slice(0, 6);
    var kpis = [
      ["Professional experience", experienceDuration(), "Since October 2024 · updates automatically", "◷"],
      ["Certification", "PL-300", "Microsoft Certified · Power BI Data Analyst", "✓"],
      ["Technology areas", String(config.technologies.length), "Configured technology groups", "◇"],
      ["Portfolio records", String(projects.length), "Across configured project categories", "▦"]
    ];
    return header("Analytics Portfolio Overview", "Explore my professional experience, analytics interests, technical capabilities, and portfolio case studies.") +
      '<section class="hero-panel reveal"><div class="hero-copy"><span class="eyebrow">ANALYTICS · BUSINESS INTELLIGENCE · DATA</span><h1>' + escapeHtml(config.headline) + '</h1><p>' + escapeHtml(config.tagline) + '</p><div class="hero-meta"><span class="tag tag-blue">' + escapeHtml(config.role) + '</span><span class="tag tag-green">PL-300 certified</span><span class="tag">Updated ' + escapeHtml(config.lastUpdated) + '</span></div><div class="button-row"><a class="button button-primary" href="projects.html">Explore projects <span aria-hidden="true">→</span></a><a class="button button-secondary" href="contact.html">Contact me</a></div></div><div class="hero-visual" aria-hidden="true"><img class="hero-art" src="assets/images/analytics-workspace.svg" alt=""><div class="hero-float hero-float-top"><i data-lucide="chart-no-axes-combined"></i><span>DATA INSIGHTS</span><b>↗</b></div><div class="hero-float hero-float-bottom"><i data-lucide="database"></i><span>BI WORKSPACE</span><b>●</b></div></div></section>' +
      '<section class="grid grid-4" style="margin-top:16px" aria-label="Portfolio summary">' + kpis.map(function (item) { return '<article class="panel kpi-card"><div class="kpi-top"><span class="kpi-label">' + escapeHtml(item[0]) + '</span><span class="kpi-icon" aria-hidden="true">' + escapeHtml(item[3]) + '</span></div><strong class="kpi-value">' + escapeHtml(item[1]) + '</strong><span class="kpi-note">' + escapeHtml(item[2]) + '</span></article>'; }).join("") + '</section>' +
      '<section class="panel profile-card" style="margin-top:16px"><div class="monogram" aria-hidden="true">AK</div><div class="profile-details"><h2>' + escapeHtml(config.name) + '</h2><p>' + escapeHtml(config.role) + ' · ' + escapeHtml(config.organization) + '</p><p>' + escapeHtml(config.bio) + '</p></div><div class="profile-actions">' + profileActions() + '</div></section>' +
      '<section class="panel" style="margin-top:16px">' + panelHeader("Technology overview", "Configured areas of interest and practice.") + '<div class="tech-list">' + technologyItems() + '</div></section>' +
      '<section style="margin-top:27px">' + panelHeader("Featured portfolio records", "Case studies and experience themes. Details and links are editable in the project data file.", '<a class="button button-quiet" href="projects.html">View all →</a>') + '<div class="grid grid-2">' + projectGrid(featured) + '</div></section>' +
      '<section class="grid grid-2" style="margin-top:25px"><article class="panel">' + panelHeader("Technology distribution", "Tools listed across the configured portfolio records.") + '<div class="chart-wrap"><canvas id="technology-chart" role="img" aria-label="Doughnut chart showing configured technology mentions across portfolio records"></canvas></div><p class="chart-note">Portfolio metadata only — not a measure of proficiency or company performance.</p></article><article class="panel">' + panelHeader("Project categories", "Count of records in each configured category.") + '<div class="chart-wrap"><canvas id="category-chart" role="img" aria-label="Bar chart showing portfolio records by category"></canvas></div><p class="chart-note">Portfolio metadata only; illustrative and experience-theme records are included.</p></article></section>' +
      '<section style="margin-top:27px">' + panelHeader("Analytics services", "Areas for discussion, scoped to project requirements.", '<a class="button button-quiet" href="services.html">All services →</a>') + '<div class="grid grid-3">' + serviceCards(config.services.slice(0, 3)) + '</div></section>';
  }
  function about() {
    return header("About Amit", "A data and analytics professional focused on useful reporting, clear definitions, and thoughtful visualization.") +
      '<section class="grid grid-2"><article class="panel"><div class="profile-card"><div class="monogram" aria-hidden="true">AK</div><div><h2>' + escapeHtml(config.name) + '</h2><p>' + escapeHtml(config.role) + '</p></div></div><div class="divider"></div><p class="muted">' + escapeHtml(config.bio) + '</p><div class="button-row">' + profileActions() + '</div></article><article class="panel">' + panelHeader("Profile snapshot", "A concise overview of current credentials.") + '<div class="profile-list"><div><strong>Current organization</strong><span>' + escapeHtml(config.organization) + '</span></div><div><strong>Professional experience</strong><span>' + escapeHtml(experienceDuration()) + ' since October 2024</span></div><div><strong>Certification</strong><span>' + escapeHtml(config.certification) + '</span></div><div><strong>Education</strong><span>' + escapeHtml(config.education) + ', ' + escapeHtml(config.graduationYear) + '</span></div></div></article></section>' +
      '<section class="grid grid-2" style="margin-top:16px"><article class="panel">' + panelHeader("Career journey", "Professional context and areas of practice.") + '<div class="timeline"><div class="timeline-item"><h3>' + escapeHtml(config.role) + '</h3><p>' + escapeHtml(config.organization) + ' · Current role. Experience themes include Power BI, SQL-based analysis, KPI reporting, semantic data modeling, automation, stakeholder requirements, and migration involving Snowflake.</p></div><div class="timeline-item"><h3>Analytics education</h3><p>' + escapeHtml(config.education) + ' · Graduated ' + escapeHtml(config.graduationYear) + '.</p></div></div></article><article class="panel">' + panelHeader("Core strengths", "Areas represented in the stated profile.") + '<div class="tag-list">' + config.technologies.map(function (item) { return '<span class="tag tag-blue">' + escapeHtml(item) + '</span>'; }).join("") + '</div><div class="divider"></div><p class="small muted">Professional goals: continue building dependable BI experiences, improve the clarity of data products, and explore practical analytics automation. Goals are aspirations, not claims of completed outcomes.</p></article></section>';
  }
  function skills() {
    var categoryOptions = config.skillGroups.map(function (group) { return '<option value="' + escapeHtml(group.name) + '">' + escapeHtml(group.name) + '</option>'; }).join("");
    var sections = config.skillGroups.map(function (group) {
      return '<section class="skill-category" data-skill-section><div class="panel-header"><h3>' + escapeHtml(group.name) + '</h3><span class="tag">' + escapeHtml(group.context) + '</span></div><div class="grid grid-3">' + group.skills.map(function (skill) {
        return '<article class="panel skill-card" data-skill-card data-category="' + escapeHtml(group.name) + '"><strong>' + escapeHtml(skill) + '</strong><p>' + escapeHtml(group.name) + ' · See profile and experience page for stated context.</p></article>';
      }).join("") + '</div></section>';
    }).join("");
    return header("Technical Skills", "Search and browse skills by discipline. No arbitrary proficiency scores are used.") +
      '<section class="panel"><div class="grid grid-2"><label class="field"><span>Search skills</span><input class="search-input" type="search" data-skill-search placeholder="Try DAX, Python, modeling…" aria-label="Search skills"></label><label class="field"><span>Filter category</span><select data-skill-filter><option>All categories</option>' + categoryOptions + '</select></label></div><p class="small muted" style="margin-bottom:0">' + escapeHtml(config.skillExperienceNote) + '</p></section>' + sections;
  }
  function projectsPage() {
    var filters = ["All Projects", "Power BI", "SQL", "Python", "Machine Learning", "Snowflake", "BI Migration", "AI Automation"];
    return header("Project Explorer", "Browse editable portfolio case studies, learning areas, and professional experience themes.") +
      '<section class="panel"><div class="grid grid-2"><label class="field"><span>Search portfolio</span><input class="search-input" type="search" data-project-search placeholder="Search title, description, tools, category, tags…" aria-label="Search projects"></label><label class="field"><span>Sort records</span><select data-project-sort aria-label="Sort projects"><option value="featured">Featured first</option><option value="alphabetical">Alphabetical</option><option value="recent">Recently updated</option></select></label></div><div class="filter-bar" role="group" aria-label="Filter project category">' + filters.map(function (filter, index) { return '<button class="filter-chip" type="button" data-project-filter="' + escapeHtml(filter) + '" aria-pressed="' + String(index === 0) + '">' + escapeHtml(filter) + '</button>'; }).join("") + '</div><p class="small muted" style="margin:0">Portfolio records are examples and experience themes, not a claim that every described deliverable is complete. Repository and demo links appear only when configured.</p></section><section class="grid grid-3" data-project-grid aria-live="polite" style="margin-top:16px"></section>';
  }
  function projectDetail() {
    var id = new URLSearchParams(window.location.search).get("id");
    var project = projects.find(function (item) { return item.id === id; }) || projects.find(function (item) { return item.id !== "executive-kpi-dashboard"; }) || projects[0];
    if (project.id === "executive-kpi-dashboard" && typeof window.executiveKpiDetailMarkup === "function") {
      return window.executiveKpiDetailMarkup();
    }
    var tools = project.tools.length ? toolsMarkup(project.tools) : '<span class="tag">Implementation technologies not verified</span>';
    var repo = safeLink(project.repo);
    var demo = safeLink(project.demo);
    var migration = project.id === "tableau-powerbi-migration";
    return header("Project Details", "A reusable project record with intentionally transparent scope and evidence.") +
      '<section class="hero-panel detail-hero"><span class="eyebrow">' + escapeHtml(project.type) + ' · ' + escapeHtml(project.status) + '</span><h1>' + escapeHtml(project.title) + '</h1><p>' + escapeHtml(project.description) + '</p><div class="tag-list">' + tools + '</div><div class="button-row" style="margin-top:17px"><a class="button button-secondary" href="projects.html">← Back to projects</a>' + (repo ? '<a class="button button-primary" href="' + escapeHtml(repo) + '" target="_blank" rel="noopener noreferrer">Repository ↗</a>' : '') + (demo ? '<a class="button button-secondary" href="' + escapeHtml(demo) + '" target="_blank" rel="noopener noreferrer">Demo ↗</a>' : '') + '</div></section>' +
      '<section class="grid grid-2"><article class="panel detail-section"><h2>Problem and objectives</h2><p>' + escapeHtml(project.problem) + '</p><ul><li>Organize the stated topic areas into a clear analytical structure.</li><li>Make definitions and assumptions reviewable.</li><li>Keep data sources and measures explicit when they are known.</li></ul></article><article class="panel detail-section"><h2>Scope and evidence</h2><div class="profile-list"><div><strong>Data sources</strong><span>Not specified</span></div><div><strong>Implementation/screenshots</strong><span>Not supplied</span></div><div><strong>Findings/results</strong><span>Not provided</span></div><div><strong>Business value</strong><span>Potential value depends on validation and use</span></div></div></article></section>' +
      (migration ? '<section class="panel detail-section"><h2>Migration considerations</h2><div class="grid grid-3"><div><span class="tag tag-blue">Source reporting</span><p>Existing Tableau reports and definitions need inventory.</p></div><div><span class="tag tag-blue">Data foundation</span><p>Snowflake is identified as a source in this experience theme; specific schemas and details are not public here.</p></div><div><span class="tag tag-blue">Target validation</span><p>Recreate reports and check measures, model behavior, and documentation.</p></div></div></section><section class="panel detail-section"><h2>Workflow outline</h2><div class="workflow"><div class="workflow-step"><span>01</span>Inventory</div><div class="workflow-step"><span>02</span>Map KPIs</div><div class="workflow-step"><span>03</span>Model</div><div class="workflow-step"><span>04</span>Recreate</div><div class="workflow-step"><span>05</span>Validate</div><div class="workflow-step"><span>06</span>Document</div></div></section>' : '') +
      '<section class="panel detail-section"><h2>Topics and learning</h2><div class="tag-list">' + (project.topics || []).map(function (topic) { return '<span class="tag">' + escapeHtml(topic) + '</span>'; }).join("") + '</div><p>Challenges, detailed technical decisions, and lessons learned can be added to this record when verified details are available.</p></section><section class="panel detail-section"><h2>Related portfolio records</h2><div class="grid grid-3">' + projectGrid(projects.filter(function (item) { return item.id !== project.id; }).slice(0, 3)) + '</div></section>';
  }
  function aiSolutions() {
    return header("AI-Powered Power BI Review Agent", "An AI-assisted review concept. The implementation and supported capabilities have not been supplied for verification.") +
      '<section class="hero-panel"><span class="eyebrow">AI-ASSISTED ANALYTICS · PROTOTYPE STATUS</span><h1>Smarter Power BI Reviews. Clearer Insights. Actionable Recommendations.</h1><p>A repeatable review workflow could help organize potential report issues and suggestions. No automatic PBIX parsing, direct Power BI Desktop integration, live cloud access, or production deployment is claimed here.</p><span class="tag tag-amber">Capabilities pending implementation verification</span></section>' +
      '<section class="panel" style="margin-top:16px">' + panelHeader("Concept workflow", "This diagram describes a possible process, not verified product behavior.") + '<div class="workflow"><div class="workflow-step"><span>01</span>Input<br><small class="muted">Not configured</small></div><div class="workflow-step"><span>02</span>Analysis<br><small class="muted">Concept</small></div><div class="workflow-step"><span>03</span>Validation<br><small class="muted">Human review</small></div><div class="workflow-step"><span>04</span>Findings<br><small class="muted">Proposed</small></div><div class="workflow-step"><span>05</span>Recommendations<br><small class="muted">Proposed</small></div><div class="workflow-step"><span>06</span>Summary<br><small class="muted">Proposed</small></div></div></section>' +
      '<section class="grid grid-2" style="margin-top:16px"><article class="panel"><h2>Problem space</h2><p class="muted small">Report reviews can involve repeated checks across layout, labels, consistency, and usability. A structured process may support review, but outputs should be validated by an analyst.</p><h2 style="margin-top:18px">Inputs and output</h2><div class="profile-list"><div><strong>Supported inputs</strong><span>Not verified / not configured</span></div><div><strong>Output structure</strong><span>Not verified / not configured</span></div><div><strong>Current limitations</strong><span>No integration or parsing claims</span></div></div></article><article class="panel"><h2>Illustrative Example</h2><p class="small muted">Example format only — not generated by a functioning agent.</p><div class="notice"><strong>Finding · Example</strong><br>Review whether chart titles describe the measure and selected time period.<br><br><strong>Recommendation · Example</strong><br>Consider documenting key KPI definitions and checking their consistent use across pages.</div><p class="chart-note">Illustrative wording only; not a product capability claim.</p></article></section>' +
      '<section class="grid grid-2" style="margin-top:16px"><article class="panel"><h2>Review dimensions to validate</h2><div class="tag-list"><span class="tag">Labels and titles</span><span class="tag">Visual consistency</span><span class="tag">KPI definitions</span><span class="tag">Accessibility</span><span class="tag">Filter behavior</span></div></article><article class="panel"><h2>Possible future roadmap</h2><ul class="small muted"><li>Document and verify input formats.</li><li>Establish reproducible checks and analyst validation.</li><li>Capture limitations and example outputs from real runs.</li></ul></article></section><div class="button-row" style="margin-top:16px"><a class="button button-primary" href="contact.html">Discuss analytics automation →</a></div>';
  }
  function servicesPage() {
    return header("Analytics Services", "Practical collaboration around business intelligence, data analysis, migration, and reporting workflows.") +
      '<div class="notice"><strong>Scope note:</strong> Services are discussion areas. Deliverables and timelines are agreed after requirements, data access, and constraints are understood; no specific ROI is guaranteed.</div><section class="grid grid-2" style="margin-top:16px">' + config.services.map(function (service) {
      return '<article class="panel service-card"><span class="service-icon" aria-hidden="true">' + escapeHtml(service.code) + '</span><h2 style="margin:0 0 12px;font-size:15px">' + escapeHtml(service.name) + '</h2><div class="profile-list"><div><strong>Client need</strong><span>' + escapeHtml(service.problem) + '</span></div><div><strong>Approach</strong><span>' + escapeHtml(service.solution) + '</span></div><div><strong>Technology</strong><span>' + escapeHtml(service.tools) + '</span></div></div><h3 style="margin-top:15px">Potential deliverables</h3><div class="tag-list">' + service.deliverables.map(function (item) { return '<span class="tag">' + escapeHtml(item) + '</span>'; }).join("") + '</div><div class="divider"></div><p><strong>Collaboration:</strong> align on goals → review available data and constraints → agree on scope → iterate and validate → hand over documentation.</p><a class="button button-secondary" href="contact.html?inquiry=' + encodeURIComponent(service.name) + '">Discuss this service ↗</a></article>';
    }).join("") + '</section>';
  }
  function experience() {
    return header("Professional Experience", "A concise view of the stated current role, experience themes, certification, and education.") +
      '<section class="panel"><span class="tag tag-green">Current role</span><h2 style="margin:12px 0 3px;font-size:19px">' + escapeHtml(config.role) + '</h2><p class="muted" style="margin:0">' + escapeHtml(config.organization) + '</p><p class="small muted">' + escapeHtml(config.experienceDates || "Role dates not configured") + ' · ' + escapeHtml(experienceDuration()) + ' of professional experience.</p><div class="divider"></div><h3 style="font-size:13px">Stated experience themes</h3><div class="tag-list">' + ["Power BI dashboard development", "SQL-based data analysis", "KPI reporting", "Semantic data modeling", "Reporting automation", "Stakeholder requirements", "Tableau-to-Power BI migration involving Snowflake"].map(function (item) { return '<span class="tag">' + escapeHtml(item) + '</span>'; }).join("") + '</div><p class="chart-note">No confidential projects, internal URLs, company metrics, or outcomes are included.</p></section>' +
      '<section class="grid grid-2" style="margin-top:16px"><article class="panel"><span class="service-icon" aria-hidden="true">PL</span><span class="eyebrow">CERTIFICATION</span><h2 style="font-size:16px">Microsoft Certified: Power BI Data Analyst Associate</h2><p class="muted small">Certification code: PL-300</p>' + (safeLink(config.certificationUrl) ? '<a class="button button-secondary" href="' + escapeHtml(safeLink(config.certificationUrl)) + '" target="_blank" rel="noopener noreferrer">View credential ↗</a>' : '<span class="tag">Credential link not configured</span>') + '</article><article class="panel"><span class="service-icon" aria-hidden="true">BE</span><span class="eyebrow">EDUCATION</span><h2 style="font-size:16px">' + escapeHtml(config.education) + '</h2><p class="muted small">Graduated ' + escapeHtml(config.graduationYear) + '</p></article></section>';
  }
  function contact() {
    var configuredEmail = config.email && config.email.indexOf("YOUR_") !== 0;
    var inquiryOptions = ["Hiring inquiry", "Freelance project", "Analytics collaboration", "General question"];
    var query = new URLSearchParams(window.location.search).get("inquiry");
    if (query && inquiryOptions.indexOf(query) < 0) inquiryOptions.unshift(query);
    return header("Let's Talk Data", "For hiring conversations, analytics projects, and thoughtful collaboration.") +
      '<section class="grid grid-2"><div class="grid"><article class="panel contact-link"><span class="service-icon" aria-hidden="true">@</span><div><strong>Email</strong><span>' + (configuredEmail ? escapeHtml(config.email) : "Email address not configured") + '</span></div><button class="button button-quiet copy-button" type="button" data-copy-email>Copy</button></article><article class="panel contact-link"><span class="service-icon" aria-hidden="true">GH</span><div><strong>GitHub</strong><span>' + (safeLink(config.github) ? "Open public profile" : "Link not configured") + '</span></div>' + (safeLink(config.github) ? '<a class="button button-quiet copy-button" href="' + escapeHtml(safeLink(config.github)) + '" target="_blank" rel="noopener noreferrer">Visit ↗</a>' : '') + '</article><article class="panel contact-link"><span class="service-icon" aria-hidden="true">in</span><div><strong>LinkedIn</strong><span>' + (safeLink(config.linkedin) ? "Open professional profile" : "Link not configured") + '</span></div>' + (safeLink(config.linkedin) ? '<a class="button button-quiet copy-button" href="' + escapeHtml(safeLink(config.linkedin)) + '" target="_blank" rel="noopener noreferrer">Visit ↗</a>' : '') + '</article><div class="notice">The contact form uses your email application. It does not submit data to a server or report a false send confirmation.</div></div>' +
      '<form class="panel" data-contact-form><h2 style="margin-top:0;font-size:15px">Send an inquiry</h2><div class="form-grid"><div class="field"><label for="contact-name">Name</label><input id="contact-name" name="name" autocomplete="name" required maxlength="100"></div><div class="field"><label for="contact-email">Email</label><input id="contact-email" name="email" type="email" autocomplete="email" required maxlength="160"></div><div class="field field-full"><label for="contact-inquiry">Inquiry type</label><select id="contact-inquiry" name="inquiry" required>' + inquiryOptions.map(function (item) { return '<option' + (query === item ? ' selected' : '') + '>' + escapeHtml(item) + '</option>'; }).join("") + '</select></div><div class="field field-full"><label for="contact-message">Message</label><textarea id="contact-message" name="message" required maxlength="5000"></textarea></div></div><button class="button button-primary" type="submit" style="margin-top:13px">Prepare email ↗</button><p class="form-status" data-form-status role="status" aria-live="polite"></p></form></section>';
  }
  var renderers = { overview: overview, about: about, skills: skills, projects: projectsPage, "project-detail": projectDetail, "ai-solutions": aiSolutions, services: servicesPage, experience: experience, contact: contact };
  function renderShell() {
    var selected = navigation.find(function (item) { return item[0] === page; });
    var activeTitle = pageTitles[page] || pageTitles.overview;
    var links = navigation.map(function (item) {
      return '<a class="nav-link" href="' + item[2] + '"' + (item[0] === page ? ' aria-current="page"' : '') + '><span class="nav-symbol" aria-hidden="true"><i class="nav-icon" data-lucide="' + item[4] + '"></i><span class="icon-fallback">' + item[3] + '</span></span><span class="nav-text">' + item[1] + '</span></a>';
    }).join("");
    var sidebarSocial = externalButton(safeLink(config.github), "GitHub") + externalButton(safeLink(config.linkedin), "LinkedIn");
    var html = '<div class="app-shell"><div class="mobile-scrim" aria-hidden="true"></div><aside class="sidebar" aria-label="Main navigation"><a class="brand" href="index.html"><span class="monogram" aria-hidden="true">AK</span><span class="brand-copy"><strong>' + escapeHtml(config.name) + '</strong><span>Data &amp; Analytics</span></span></a><div class="nav-label">Workspace</div><nav class="nav-list">' + links + '</nav><div class="sidebar-bottom"><div class="cert-mini"><span class="cert-dot" aria-hidden="true">✓</span><div><strong>PL-300 Certified</strong><span>Power BI Data Analyst</span></div></div><div class="side-social">' + (sidebarSocial || '<span class="muted small">Add profile links in config</span>') + '</div></div><button class="sidebar-toggle" type="button" aria-label="Collapse sidebar" aria-expanded="true">‹</button></aside><div class="app-main"><header class="topbar"><div class="topbar-left"><button class="mobile-menu" type="button" aria-label="Open navigation" aria-expanded="false">☰</button><div><div class="topbar-title">' + escapeHtml(activeTitle) + '</div><span class="topbar-kicker">Portfolio workspace <span aria-hidden="true">/</span> ' + escapeHtml(selected ? selected[1] : "Projects") + '</span></div></div><div class="topbar-actions"><label class="top-search"><span aria-hidden="true">⌕</span><input type="search" data-top-search aria-label="Search projects" placeholder="Search projects"><kbd>↵</kbd></label>' + (safeLink(config.github) ? '<a class="top-icon-link" href="' + escapeHtml(safeLink(config.github)) + '" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">GH</a>' : '') + (safeLink(config.linkedin) ? '<a class="top-icon-link" href="' + escapeHtml(safeLink(config.linkedin)) + '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">in</a>' : '') + contactAnchor() + '</div></header><main class="content" id="main-content">' + (renderers[page] || overview)() + '<footer class="content-footer"><span>© ' + new Date().getFullYear() + ' ' + escapeHtml(config.name) + ' · Portfolio information is editable in configuration.</span><nav aria-label="Footer navigation"><a href="projects.html">Projects</a><a href="experience.html">Experience</a><a href="contact.html">Contact</a></nav></footer></main></div><button class="back-to-top" type="button" aria-label="Back to top">↑</button></div>';
    document.getElementById("app").innerHTML = html;
    document.title = (pageTitles[page] || pageTitles.overview) + " | " + config.name;
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
      document.getElementById("app").classList.add("lucide-ready");
    }
    if (window.initializePortfolioInteractions) window.initializePortfolioInteractions();
    if (window.initializePortfolioContact) window.initializePortfolioContact();
    if (window.initializeExecutiveKpiDashboard) window.initializeExecutiveKpiDashboard();
    if (page === "overview" && window.renderPortfolioCharts) window.renderPortfolioCharts();
  }
  document.addEventListener("DOMContentLoaded", renderShell);
})();
