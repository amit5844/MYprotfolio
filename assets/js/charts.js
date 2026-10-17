(function () {
  function renderCharts() {
    var palette = ["#3b82f6", "#22d3ee", "#818cf8", "#34d399", "#fbbf24", "#fb7185"];
    var projects = window.PORTFOLIO_PROJECTS || [];
    var techCanvas = document.getElementById("technology-chart");
    var categoryCanvas = document.getElementById("category-chart");
    if (!techCanvas || !categoryCanvas) return;
    if (!window.Chart) {
      [techCanvas, categoryCanvas].forEach(function (canvas) {
        var fallback = document.createElement("div");
        fallback.className = "empty-state";
        fallback.textContent = "Charts need Chart.js, which could not be loaded. Portfolio data remains available in the project list.";
        canvas.replaceWith(fallback);
      });
      return;
    }
    var techCounts = {};
    var categoryCounts = {};
    projects.forEach(function (project) {
      (project.tools || []).forEach(function (tool) { techCounts[tool] = (techCounts[tool] || 0) + 1; });
      categoryCounts[project.category] = (categoryCounts[project.category] || 0) + 1;
    });
    var common = { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "#a8b5c8", boxWidth: 9, usePointStyle: true, font: { family: "Inter", size: 10 } } }, tooltip: { backgroundColor: "#111d30", borderColor: "rgba(148,163,184,.2)", borderWidth: 1, titleColor: "#f1f5f9", bodyColor: "#cbd5e1" } } };
    new Chart(techCanvas, { type: "doughnut", data: { labels: Object.keys(techCounts), datasets: [{ data: Object.values(techCounts), backgroundColor: palette, borderColor: "#111d30", borderWidth: 3, hoverOffset: 4 }] }, options: Object.assign({}, common, { cutout: "68%" }) });
    new Chart(categoryCanvas, { type: "bar", data: { labels: Object.keys(categoryCounts), datasets: [{ label: "Portfolio records", data: Object.values(categoryCounts), backgroundColor: palette.slice(0, Object.keys(categoryCounts).length), borderRadius: 5, maxBarThickness: 27 }] }, options: Object.assign({}, common, { indexAxis: "y", scales: { x: { beginAtZero: true, ticks: { stepSize: 1, color: "#74859c", precision: 0 }, grid: { color: "rgba(148,163,184,.08)" } }, y: { ticks: { color: "#a8b5c8", font: { size: 9 } }, grid: { display: false } } } }) });
  }
  window.renderPortfolioCharts = renderCharts;
})();
