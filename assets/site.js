// Language switch only. Every page is readable without it (English shows by default).
(function () {
  var root = document.documentElement;
  var KEY = "scholium-lang";

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    var buttons = document.querySelectorAll(".lang button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", buttons[i].dataset.set === lang ? "true" : "false");
    }
    try { localStorage.setItem(KEY, lang); } catch (e) { /* private mode */ }
  }

  var wanted = stored();
  if (wanted !== "en" && wanted !== "vi") {
    wanted = /^vi\b/i.test(navigator.language || "") ? "vi" : "en";
  }
  apply(wanted);

  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest(".lang button");
    if (button) apply(button.dataset.set);
  });
})();
