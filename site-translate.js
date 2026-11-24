(function () {
  var isTranslatedPage = window.location.hostname.endsWith('.translate.goog');
  var sourceUrl = window.location.href;
  if (window.location.hostname === 'arobasix.github.io' || isTranslatedPage) {
    var originalQuery = new URLSearchParams(window.location.search);
    var cleanQuery = new URLSearchParams();
    originalQuery.forEach(function (value, key) {
      if (!key.startsWith('_x_tr_')) cleanQuery.append(key, value);
    });
    var queryString = cleanQuery.toString();
    sourceUrl = 'https://arobasix.github.io' + window.location.pathname +
      (queryString ? '?' + queryString : '') + window.location.hash;
  }

  function restoreDirectLinks() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-direct-href]'), function (link) {
      link.setAttribute('href', link.getAttribute('data-direct-href'));
    });
  }

  restoreDirectLinks();
  window.setTimeout(restoreDirectLinks, 0);
  window.setTimeout(restoreDirectLinks, 250);

  var style = document.createElement('style');
  style.textContent = '\
    .site-translate-control {\
      display: inline-flex;\
      align-items: center;\
      gap: 7px;\
      font: 500 13px/1.2 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
    }\
    .site-translate-control select {\
      min-width: 142px;\
      padding: 7px 28px 7px 9px;\
      border: 1px solid rgba(19, 42, 74, .28);\
      border-radius: 4px;\
      background: #f7f5ef;\
      color: #132a4a;\
      font: inherit;\
      cursor: pointer;\
    }\
    .site-translate-floating {\
      position: fixed;\
      right: 20px;\
      bottom: 20px;\
      z-index: 9999;\
    }\
    .site-translate-floating .site-translate-control {\
      padding: 7px 10px;\
      border: 1px solid rgba(19, 42, 74, .22);\
      border-radius: 999px;\
      background: rgba(247, 245, 239, .96);\
      box-shadow: 0 3px 14px rgba(19, 42, 74, .14);\
    }\
    @media (max-width: 600px) {\
      .site-translate-floating { right: 12px; bottom: 12px; }\
      .site-translate-control select { min-width: 126px; }\
    }';
  document.head.appendChild(style);

  var controls = document.querySelectorAll('[data-site-translate-control]');
  if (!controls.length) {
    var floating = document.createElement('div');
    floating.className = 'site-translate-floating';
    var floatingControl = document.createElement('div');
    floatingControl.setAttribute('data-site-translate-control', '');
    floating.appendChild(floatingControl);
    document.body.appendChild(floating);
    controls = document.querySelectorAll('[data-site-translate-control]');
  }

  Array.prototype.forEach.call(controls, function (control) {
    var wrapper = document.createElement('div');
    wrapper.className = 'site-translate-control';

    var label = document.createElement('span');
    label.textContent = 'Translate';

    var select = document.createElement('select');
    select.setAttribute('aria-label', 'Sélectionner une langue de traduction');
    select.innerHTML = '<option value="">Sélectionner une langue</option>' +
      '<option value="fr">Français</option>' +
      '<option value="en">English</option>';
    select.addEventListener('change', function () {
      if (!select.value) return;
      if (select.value === 'fr') {
        window.location.assign(sourceUrl);
        return;
      }
      var translateUrl = new URL('https://translate.google.com/translate');
      translateUrl.searchParams.set('sl', 'auto');
      translateUrl.searchParams.set('tl', select.value);
      translateUrl.searchParams.set('op', 'websites');
      translateUrl.searchParams.set('u', sourceUrl);
      window.location.assign(translateUrl.toString());
      select.value = '';
    });

    wrapper.appendChild(label);
    wrapper.appendChild(select);
    control.replaceWith(wrapper);
  });
})();
