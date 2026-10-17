(function () {
  function setupShell() {
    var body = document.body;
    var menu = document.querySelector(".mobile-menu");
    var scrim = document.querySelector(".mobile-scrim");
    var toggle = document.querySelector(".sidebar-toggle");
    var backToTop = document.querySelector(".back-to-top");
    if (menu) menu.addEventListener("click", function () {
      var opened = body.classList.toggle("mobile-open");
      menu.setAttribute("aria-expanded", String(opened));
    });
    if (scrim) scrim.addEventListener("click", function () { body.classList.remove("mobile-open"); if (menu) menu.setAttribute("aria-expanded", "false"); });
    document.querySelectorAll(".nav-link").forEach(function (link) { link.addEventListener("click", function () { body.classList.remove("mobile-open"); if (menu) menu.setAttribute("aria-expanded", "false"); }); });
    if (toggle) toggle.addEventListener("click", function () {
      var collapsed = body.classList.toggle("sidebar-collapsed");
      toggle.setAttribute("aria-expanded", String(!collapsed));
      try { localStorage.setItem("portfolio-sidebar-collapsed", String(collapsed)); } catch (error) { /* Preference storage is optional. */ }
    });
    if (backToTop) {
      var updateBackToTop = function () { backToTop.hidden = window.scrollY < 420; };
      window.addEventListener("scroll", updateBackToTop, { passive: true });
      updateBackToTop();
      backToTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    }
    try {
      if (localStorage.getItem("portfolio-sidebar-collapsed") === "true" && window.matchMedia("(min-width: 901px)").matches) body.classList.add("sidebar-collapsed");
    } catch (error) { /* Preference storage is optional. */ }
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") { body.classList.remove("mobile-open"); if (menu) menu.setAttribute("aria-expanded", "false"); }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        var input = document.querySelector("[data-project-search]");
        if (input) { event.preventDefault(); input.focus(); }
      }
    });
    var topSearch = document.querySelector("[data-top-search]");
    if (topSearch) {
      topSearch.addEventListener("keydown", function (event) {
        if (event.key === "Enter") { var query = topSearch.value.trim(); window.location.href = query ? "projects.html?q=" + encodeURIComponent(query) : "projects.html"; }
      });
    }
  }
  function setupProjectExplorer() {
    var list = document.querySelector("[data-project-grid]");
    if (!list) return;
    var search = document.querySelector("[data-project-search]");
    var sort = document.querySelector("[data-project-sort]");
    var currentCategory = "All Projects";
    var records = window.PORTFOLIO_PROJECTS || [];
    function render() {
      var term = search ? search.value.trim().toLowerCase() : "";
      var filtered = records.filter(function (project) {
        var categoryMatch = currentCategory === "All Projects" || project.category === currentCategory || (project.tools || []).indexOf(currentCategory) !== -1;
        var haystack = [project.title, project.description, project.category, project.type, project.status].concat(project.tools || [], project.topics || []).join(" ").toLowerCase();
        return categoryMatch && haystack.indexOf(term) !== -1;
      });
      if (sort && sort.value === "alphabetical") filtered.sort(function (a, b) { return a.title.localeCompare(b.title); });
      else if (sort && sort.value === "recent") filtered.sort(function (a, b) { return (b.updated || "").localeCompare(a.updated || ""); });
      else filtered.sort(function (a, b) { return Number(Boolean(b.featured)) - Number(Boolean(a.featured)); });
      list.innerHTML = filtered.length ? filtered.map(window.projectCardMarkup).join("") : '<div class="empty-state">No portfolio records match those filters. Try another category or search term.</div>';
    }
    document.querySelectorAll("[data-project-filter]").forEach(function (button) {
      button.addEventListener("click", function () {
        currentCategory = button.dataset.projectFilter;
        document.querySelectorAll("[data-project-filter]").forEach(function (item) { item.setAttribute("aria-pressed", String(item === button)); });
        render();
      });
    });
    if (search) {
      var params = new URLSearchParams(window.location.search);
      search.value = params.get("q") || "";
      search.addEventListener("input", render);
    }
    if (sort) sort.addEventListener("change", render);
    render();
  }
  function setupSkills() {
    var search = document.querySelector("[data-skill-search]");
    var filter = document.querySelector("[data-skill-filter]");
    var cards = Array.prototype.slice.call(document.querySelectorAll("[data-skill-card]"));
    if (!search && !filter) return;
    function update() {
      var term = search ? search.value.trim().toLowerCase() : "";
      var category = filter ? filter.value : "All categories";
      cards.forEach(function (card) {
        var matches = (category === "All categories" || card.dataset.category === category) && card.textContent.toLowerCase().indexOf(term) !== -1;
        card.hidden = !matches;
      });
      document.querySelectorAll("[data-skill-section]").forEach(function (section) {
        section.hidden = !section.querySelector("[data-skill-card]:not([hidden])");
      });
    }
    if (search) search.addEventListener("input", update);
    if (filter) filter.addEventListener("change", update);
  }
  window.initializePortfolioInteractions = function () {
    setupShell();
    setupProjectExplorer();
    setupSkills();
  };
})();
