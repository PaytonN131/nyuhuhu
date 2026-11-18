'use strict';
// Las rutas del fondo parten de la carpeta del sitio, también en GitHub Pages.
const background = String(window.NYUHUHU?.background || 'img/fondo.svg');
if (!background.startsWith('/') && !background.includes('..') && !/[:\\]/.test(background)) {
  const url = new URL(background, document.baseURI).href;
  document.documentElement.style.setProperty('--site-background', `url(${JSON.stringify(url)})`);
}
