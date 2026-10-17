(function () {
  function setupContact() {
    var form = document.querySelector("[data-contact-form]");
    var copy = document.querySelector("[data-copy-email]");
    var status = document.querySelector("[data-form-status]");
    var config = window.PORTFOLIO_CONFIG;
    if (copy && config && config.email && config.email.indexOf("YOUR_") !== 0) {
      copy.addEventListener("click", function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(config.email).then(function () {
            copy.textContent = "Copied"; window.setTimeout(function () { copy.textContent = "Copy"; }, 1500);
          }).catch(function () {
            if (status) status.textContent = "Copy wasn't available in this browser. Select the email address to copy it.";
          });
        } else if (status) {
          status.textContent = "Copy isn't supported in this browser. Select the email address to copy it.";
        }
      });
    } else if (copy) {
      copy.disabled = true;
      copy.title = "Set your email in assets/js/config.js to enable copying.";
    }
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      if (!config || !config.email || config.email.indexOf("YOUR_") === 0) {
        if (status) status.textContent = "Email is not configured yet. Set PORTFOLIO_CONFIG.email before using this form.";
        return;
      }
      var data = new FormData(form);
      var subject = encodeURIComponent(data.get("inquiry") + " — portfolio inquiry from " + data.get("name"));
      var body = encodeURIComponent("Name: " + data.get("name") + "\nEmail: " + data.get("email") + "\nInquiry: " + data.get("inquiry") + "\n\n" + data.get("message"));
      if (status) status.textContent = "Your email app should open with this message. Review and send it there.";
      window.location.href = "mailto:" + encodeURIComponent(config.email) + "?subject=" + subject + "&body=" + body;
    });
  }
  window.initializePortfolioContact = setupContact;
})();
