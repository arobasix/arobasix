(function () {
  var translateUrl = new URL('https://translate.google.com/translate');
  translateUrl.searchParams.set('sl', 'auto');
  translateUrl.searchParams.set('tl', 'en');
  translateUrl.searchParams.set('op', 'websites');
  translateUrl.searchParams.set('u', window.location.href);

  var existingLink = document.querySelector('[data-site-translate]');
  if (existingLink) {
    existingLink.href = translateUrl.toString();
    return;
  }

  var style = document.createElement('style');
  style.textContent = '\
    .site-translate-floating {\
      position: fixed;\
      right: 20px;\
      bottom: 20px;\
      z-index: 9999;\
    }\
    .site-translate-floating a {\
      display: inline-block;\
      padding: 9px 14px;\
      border: 1px solid rgba(19, 42, 74, .22);\
      border-radius: 999px;\
      background: rgba(247, 245, 239, .96);\
      color: #132a4a;\
      font: 600 13px/1.2 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
      text-decoration: none;\
      box-shadow: 0 3px 14px rgba(19, 42, 74, .14);\
    }\
    .site-translate-floating a:hover,\
    .site-translate-floating a:focus-visible {\
      background: #132a4a;\
      color: #f7f5ef;\
    }\
    @media (max-width: 600px) {\
      .site-translate-floating { right: 12px; bottom: 12px; }\
    }';
  document.head.appendChild(style);

  var container = document.createElement('div');
  container.className = 'site-translate-floating';
  var link = document.createElement('a');
  link.href = translateUrl.toString();
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = 'Translate';
  link.setAttribute('aria-label', 'Traduire cette page avec Google Traduction');
  container.appendChild(link);
  document.body.appendChild(container);
})();
