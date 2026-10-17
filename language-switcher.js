(function () {
  'use strict';

  var root = document.documentElement;
  var isEnglish = root.lang.toLowerCase().indexOf('en') === 0;
  var path = window.location.pathname;
  var script = document.currentScript;
  var base = script ? new URL('.', script.src).pathname : '/';
  var relativePath = path.indexOf(base) === 0 ? path.slice(base.length) : '';
  var frenchPath = isEnglish
    ? relativePath.replace(/^en\//, '')
    : relativePath;
  var englishPath = 'en/' + frenchPath;
  var frenchHref = base + frenchPath;
  var englishHref = base + englishPath;

  if (!frenchPath) {
    frenchPath = 'index.html';
    frenchHref = base + frenchPath;
    englishHref = base + 'en/index.html';
  }

  var wrapper = document.createElement('div');
  wrapper.className = 'language-switcher';
  wrapper.innerHTML =
    '<details>' +
      '<summary aria-label="Choisir la langue">' + (isEnglish ? 'EN' : 'FR') + '</summary>' +
      '<div class="language-switcher__menu" role="menu" aria-label="Choisir la langue">' +
        '<a href="' + frenchHref + '"' + (!isEnglish ? ' aria-current="page"' : '') + '>Français</a>' +
        '<a href="' + englishHref + '"' + (isEnglish ? ' aria-current="page"' : '') + '>English</a>' +
      '</div>' +
    '</details>';

  document.body.appendChild(wrapper);
}());
