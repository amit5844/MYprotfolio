(function () {
  var charts = [];

  function formatRevenue(value) {
    return "₹" + value.toFixed(1) + " Cr";
  }

  function formatPercent(value) {
    return value.toFixed(1) + "%";
  }

  function renderDetailMarkup() {
    var data = window.EXECUTIVE_KPI_DEMO;
    var disclaimer = data.disclaimer;
    return '<div class="page-heading"><div><span class="eyebrow">POWER BI · EXECUTIVE REPORTING · KPI ANALYTICS</span><h1>Executive KPI Dashboard</h1><p>CEO &amp; Higher Management Analytics</p></div><a class="button button-primary" href="#dashboard-demo">View Dashboard Demo ↓</a></div>' +
      '<section class="hero-panel case-study-hero"><div class="hero-copy"><span class="eyebrow">PROFESSIONAL EXPERIENCE · PORTFOLIO DEMONSTRATION</span><h2>CEO &amp; Higher Management Analytics</h2><p>An executive-focused business intelligence dashboard concept demonstrating how key performance indicators can be presented in a consolidated, easy-to-interpret view for senior leadership.</p><div class="hero-meta"><span class="tag tag-blue">Power BI</span><span class="tag">DAX</span><span class="tag">KPI Reporting</span><span class="tag">Executive Analytics</span></div><div class="hero-meta"><span class="tag tag-blue">Professional Experience</span><span class="tag tag-amber">Illustrative Demo</span><span class="tag tag-amber">SAMPLE DATA · ILLUSTRATIVE DEMO</span></div><a class="button button-primary" href="#dashboard-demo">Explore interactive dashboard ↓</a></div><div class="hero-visual case-study-visual" aria-hidden="true"><img class="hero-art" src="assets/images/executive-kpi-preview.svg" alt=""></div></section>' +
      '<p class="data-disclaimer" role="note">' + disclaimer + '</p>' +
      '<section class="panel detail-section"><h2>Business context</h2><p>Senior leaders need concise visibility into important business indicators. An executive dashboard can bring selected KPIs together, provide meaningful comparisons, and help management review business performance. This is the context and intended purpose of the showcased dashboard; it does not claim a specific company problem or outcome.</p></section>' +
      '<section class="grid grid-2 case-study-grid"><article class="panel detail-section"><h2>Project objectives</h2><span class="tag">Design objectives · not measured achievements</span><ul><li>Present important KPIs in one consolidated view.</li><li>Make performance indicators easy to interpret.</li><li>Demonstrate clear executive-level data visualization.</li><li>Support high-level comparisons.</li><li>Reduce visual clutter.</li><li>Present information in a format suitable for leadership reviews.</li></ul></article><article class="panel detail-section"><h2>Dashboard features</h2><span class="tag">Illustrative design elements</span><ul><li>Executive KPI cards.</li><li>Performance trend visualization.</li><li>Category-level comparison.</li><li>Period-over-period comparison.</li><li>Conditional status indicators.</li><li>Compact management summary.</li></ul><p>These describe this public demonstration only; they are not claims about features in the original internal dashboard.</p></article></section>' +
      '<section class="panel detail-section"><h2>Technical approach</h2><p>The demonstration focuses on KPI definition and reporting, visual hierarchy, dashboard usability, and interactive comparisons. The original project’s implementation details should be confirmed before stating specific use of DAX calculations, Power Query transformations, data modeling, or KPI validation.</p><div class="tag-list"><span class="tag">KPI definition · verify specifics</span><span class="tag">DAX calculations · confirm applicability</span><span class="tag">Power Query · confirm applicability</span><span class="tag">Data modeling · confirm applicability</span><span class="tag">Visual hierarchy</span><span class="tag">Usability</span><span class="tag">KPI validation · confirm applicability</span></div></section>' +
      '<section class="grid grid-2 case-study-grid"><article class="panel detail-section"><h2>My contribution</h2><p>Update this editable list to match your verified responsibilities before publishing. Items below are prompts, not claims that each activity was performed.</p><ul class="contribution-checklist"><li><span>Dashboard development</span><b>Confirm before publishing</b></li><li><span>KPI calculation and validation</span><b>Confirm before publishing</b></li><li><span>Data transformation</span><b>Confirm before publishing</b></li><li><span>Data modeling</span><b>Confirm before publishing</b></li><li><span>Visual design</span><b>Confirm before publishing</b></li><li><span>Stakeholder requirement gathering</span><b>Confirm before publishing</b></li></ul></article><article class="panel detail-section"><h2>Intended business value</h2><p>Executive dashboards can be designed to provide faster access to consolidated information, make selected KPIs easier to review, communicate indicators clearly, and present high-level business measures in a leadership-friendly format.</p><p>These are intended benefits, not measured results. No time savings, revenue change, percentage improvement, or ROI is claimed.</p></article></section>' +
      '<section class="panel detail-section confidentiality-panel"><h2>Confidentiality</h2><p>The original dashboard was intended for a restricted management audience. This public portfolio page uses a separate fictional demonstration dataset. No confidential internal company data or original company dashboard screenshots are presented.</p></section>' +
      '<section id="dashboard-demo" class="executive-dashboard panel" aria-labelledby="demo-title"><div class="dashboard-heading"><div><span class="eyebrow">ILLUSTRATIVE BUSINESS INTELLIGENCE DASHBOARD</span><h2 id="demo-title">Executive Performance Overview</h2><p>Fictional dashboard preview · management reporting layout demonstration</p></div><span class="sample-badge"><span aria-hidden="true">●</span> SAMPLE DATA · NOT ACTUAL COMPANY DATA</span></div><p class="data-disclaimer dashboard-disclaimer" role="note">' + disclaimer + '</p><div class="dashboard-toolbar"><label class="period-control" for="demo-period">Illustrative period<select id="demo-period" aria-describedby="period-note">' + data.periods.map(function (period, index) { return '<option value="' + index + '"' + (index === 2 ? ' selected' : '') + '>' + period.label + '</option>'; }).join("") + '</select></label><span class="period-note" id="period-note">Periods are fictional demonstration labels and not company reporting periods.</span></div><div class="demo-kpis" aria-live="polite"><article class="demo-kpi"><div class="demo-kpi-label"><span>Total Revenue</span><i data-lucide="wallet"></i></div><strong data-demo-kpi="revenue">—</strong><small>Fictional sample value · illustrative only</small></article><article class="demo-kpi"><div class="demo-kpi-label"><span>Operating Margin</span><i data-lucide="percent"></i></div><strong data-demo-kpi="margin">—</strong><small>Fictional sample value · illustrative only</small></article><article class="demo-kpi"><div class="demo-kpi-label"><span>Customer Satisfaction</span><i data-lucide="smile"></i></div><strong data-demo-kpi="satisfaction">—</strong><small>Fictional sample value · illustrative only</small></article><article class="demo-kpi"><div class="demo-kpi-label"><span>Operational Efficiency</span><i data-lucide="gauge"></i></div><strong data-demo-kpi="efficiency">—</strong><small>Fictional sample value · illustrative only</small></article></div><div class="demo-chart-grid"><article class="demo-chart-panel"><div class="demo-chart-heading"><div><h3>Business Performance Trend</h3><p>Illustrative revenue values by fictional period</p></div><span class="tag">Revenue · ₹ Cr</span></div><div class="demo-chart-wrap"><canvas id="demo-revenue-chart" role="img" aria-label="Illustrative revenue trend chart for fictional quarters"></canvas></div></article><article class="demo-chart-panel"><div class="demo-chart-heading"><div><h3>Category Performance</h3><p>Illustrative index · selected period</p></div><span class="tag">Sample index</span></div><div class="demo-chart-wrap"><canvas id="demo-category-chart" role="img" aria-label="Fictional category performance chart"></canvas></div></article><article class="demo-chart-panel"><div class="demo-chart-heading"><div><h3>Performance Distribution</h3><p>Illustrative category shares · selected period</p></div><span class="tag">Sample share</span></div><div class="demo-chart-wrap demo-donut-wrap"><canvas id="demo-distribution-chart" role="img" aria-label="Illustrative fictional category distribution chart"></canvas></div></article><article class="demo-chart-panel"><div class="demo-chart-heading"><div><h3>Period Comparison</h3><p>Index derived from sample data · Q1 = 100</p></div><span class="tag">Illustrative index</span></div><div class="demo-chart-wrap"><canvas id="demo-comparison-chart" role="img" aria-label="Indexed illustrative revenue and operating margin comparison by fictional quarter"></canvas></div></article></div><div class="executive-summary"><span class="summary-icon"><i data-lucide="scan-eye"></i></span><div><strong>Illustrative executive summary</strong><p>The fictional dataset shows variation across the selected KPIs. This panel demonstrates how an executive summary can highlight trends, comparisons, and potential areas for further investigation.</p></div></div><p class="dashboard-footer-disclaimer">Demonstration dashboard only. All displayed values are fictional and are not actual company data.</p></section>' +
      '<section class="panel detail-section related-project-note"><h2>Demonstration scope</h2><p>The interactive preview uses a local, fictional dataset defined in <code>assets/js/executive-kpi-data.js</code>. It has no connection to Volkswagen Group systems, production APIs, Snowflake accounts, private files, or internal databases.</p><a class="button button-secondary" href="projects.html">← Back to projects</a></section>';
  }

  function chartOptions(extra) {
    var common = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { labels: { color: "#aebed1", usePointStyle: true, pointStyle: "circle", boxWidth: 8, padding: 14, font: { family: "Inter", size: 10 } } },
        tooltip: { backgroundColor: "#0d1727", borderColor: "rgba(148,163,184,.24)", borderWidth: 1, titleColor: "#f1f5f9", bodyColor: "#cbd5e1", padding: 11 }
      },
      scales: {
        x: { ticks: { color: "#91a2b8", font: { family: "Inter", size: 9 } }, grid: { color: "rgba(148,163,184,.07)" }, border: { display: false } },
        y: { beginAtZero: true, ticks: { color: "#91a2b8", font: { family: "Inter", size: 9 } }, grid: { color: "rgba(148,163,184,.09)" }, border: { display: false } }
      }
    };
    Object.keys(extra || {}).forEach(function (key) { common[key] = extra[key]; });
    return common;
  }

  function buildCharts(data) {
    if (!window.Chart) {
      document.querySelectorAll(".demo-chart-wrap canvas").forEach(function (canvas) {
        var fallback = document.createElement("div");
        fallback.className = "demo-chart-fallback";
        fallback.textContent = "Charts could not load. The fictional sample KPIs and period selector remain available.";
        canvas.replaceWith(fallback);
      });
      return [];
    }

    var periods = data.periods;
    var labels = periods.map(function (period) { return period.label; });
    var colors = ["#3b82f6", "#22d3ee", "#818cf8", "#34d399"];
    var revenueChart = new Chart(document.getElementById("demo-revenue-chart"), {
      type: "line",
      data: { labels: labels, datasets: [{ label: "Illustrative revenue (₹ Cr)", data: periods.map(function (period) { return period.revenue; }), borderColor: "#3b82f6", backgroundColor: "rgba(59,130,246,.12)", fill: true, tension: .35, borderWidth: 2.5, pointRadius: periods.map(function (_, index) { return index === 2 ? 5 : 3; }), pointHoverRadius: 6, pointBackgroundColor: "#22d3ee", pointBorderColor: "#0d1525", pointBorderWidth: 2 }] },
      options: chartOptions({ scales: { x: { ticks: { color: "#91a2b8", font: { family: "Inter", size: 9 } }, grid: { color: "rgba(148,163,184,.07)" }, border: { display: false } }, y: { beginAtZero: false, ticks: { color: "#91a2b8", font: { family: "Inter", size: 9 }, callback: function (value) { return "₹" + value + " Cr"; } }, grid: { color: "rgba(148,163,184,.09)" }, border: { display: false } } } })
    });
    var categoryChart = new Chart(document.getElementById("demo-category-chart"), {
      type: "bar",
      data: { labels: data.categoryLabels, datasets: [{ label: "Illustrative index", data: periods[2].categories, backgroundColor: colors, borderRadius: 5, maxBarThickness: 32 }] },
      options: chartOptions({ indexAxis: "y", plugins: { legend: { display: false }, tooltip: chartOptions().plugins.tooltip }, scales: { x: { beginAtZero: true, max: 100, ticks: { color: "#91a2b8", font: { family: "Inter", size: 9 } }, grid: { color: "rgba(148,163,184,.08)" }, border: { display: false } }, y: { ticks: { color: "#aebed1", font: { family: "Inter", size: 9 } }, grid: { display: false }, border: { display: false } } } })
    });
    var distributionChart = new Chart(document.getElementById("demo-distribution-chart"), {
      type: "doughnut",
      data: { labels: data.categoryLabels, datasets: [{ label: "Illustrative share", data: periods[2].distribution, backgroundColor: colors, borderColor: "#111d30", borderWidth: 3, hoverOffset: 5 }] },
      options: chartOptions({ cutout: "68%", plugins: { legend: { position: "bottom", labels: { color: "#aebed1", usePointStyle: true, pointStyle: "circle", boxWidth: 8, padding: 12, font: { family: "Inter", size: 9 } } }, tooltip: chartOptions().plugins.tooltip } })
    });
    var comparisonChart = new Chart(document.getElementById("demo-comparison-chart"), {
      type: "line",
      data: { labels: labels, datasets: [
        { label: "Revenue index (Q1 = 100)", data: [], borderColor: "#22d3ee", backgroundColor: "#22d3ee", tension: .3, borderWidth: 2, pointRadius: 3 },
        { label: "Margin index (Q1 = 100)", data: [], borderColor: "#818cf8", backgroundColor: "#818cf8", tension: .3, borderWidth: 2, pointRadius: 3 }
      ] },
      options: chartOptions({ scales: { x: { ticks: { color: "#91a2b8", font: { family: "Inter", size: 9 } }, grid: { color: "rgba(148,163,184,.07)" }, border: { display: false } }, y: { beginAtZero: false, ticks: { color: "#91a2b8", font: { family: "Inter", size: 9 } }, grid: { color: "rgba(148,163,184,.09)" }, border: { display: false } } } })
    });
    return [revenueChart, categoryChart, distributionChart, comparisonChart];
  }

  function updateCharts(charts, data, selectedIndex) {
    if (!charts.length) return;
    var periods = data.periods;
    charts[0].data.datasets[0].pointRadius = periods.map(function (_, index) { return index === selectedIndex ? 5 : 3; });
    charts[0].data.datasets[0].pointBackgroundColor = periods.map(function (_, index) { return index === selectedIndex ? "#22d3ee" : "#3b82f6"; });
    charts[0].update();
    charts[1].data.datasets[0].data = periods[selectedIndex].categories;
    charts[1].update();
    charts[2].data.datasets[0].data = periods[selectedIndex].distribution;
    charts[2].update();
    var baseRevenue = periods[0].revenue;
    var baseMargin = periods[0].margin;
    charts[3].data.datasets[0].data = periods.map(function (period) { return Number((period.revenue / baseRevenue * 100).toFixed(1)); });
    charts[3].data.datasets[1].data = periods.map(function (period) { return Number((period.margin / baseMargin * 100).toFixed(1)); });
    charts[3].data.datasets.forEach(function (dataset) {
      dataset.pointRadius = periods.map(function (_, index) { return index === selectedIndex ? 5 : 3; });
    });
    charts[3].update();
  }

  function initialize() {
    var dashboard = document.getElementById("dashboard-demo");
    var data = window.EXECUTIVE_KPI_DEMO;
    if (!dashboard || !data) return;

    var selector = dashboard.querySelector("#demo-period");
    var chartsList = buildCharts(data);

    function updateDashboard() {
      var index = Number(selector.value);
      var period = data.periods[index];
      dashboard.querySelector('[data-demo-kpi="revenue"]').textContent = formatRevenue(period.revenue);
      dashboard.querySelector('[data-demo-kpi="margin"]').textContent = formatPercent(period.margin);
      dashboard.querySelector('[data-demo-kpi="satisfaction"]').textContent = formatPercent(period.satisfaction);
      dashboard.querySelector('[data-demo-kpi="efficiency"]').textContent = formatPercent(period.efficiency);
      updateCharts(chartsList, data, index);
    }

    selector.addEventListener("change", updateDashboard);
    updateDashboard();
  }

  window.executiveKpiDetailMarkup = renderDetailMarkup;
  window.initializeExecutiveKpiDashboard = initialize;
})();
