'use strict';
(function () {
  const root = document.getElementById('game');
  const id = new URLSearchParams(location.search).get('id') || '';
  const section = (title, inner) => `<section class="sec"><h2>${esc(title)}</h2>${inner}</section>`;
  const prose = text => `<div class="prose">${esc(text)}</div>`;
  function carouselHtml(key, label) {
    return `<div class="carousel" data-carousel="${key}" tabindex="0" aria-roledescription="carrusel" aria-label="${esc(label)}">
      <div class="stage">
        <button type="button" class="nav prev" aria-label="Imagen anterior">‹</button>
        <button type="button" class="zoom" aria-label="Ampliar imagen"><img alt=""></button>
        <button type="button" class="nav next" aria-label="Imagen siguiente">›</button>
      </div>
      <p class="car-meta"><span class="car-count"></span><span class="car-cap"></span></p>
    </div>`;
  }

  function initCarousel(key, items, title) {
    const box = root.querySelector(`[data-carousel="${key}"]`);
    if (!box || !items.length) return;
    let i = 0;
    const img = box.querySelector('.zoom img');
    const count = box.querySelector('.car-count');
    const cap = box.querySelector('.car-cap');
    function show() {
      const it = items[i];
      img.src = imgUrl(it.filename);
      img.alt = it.caption || `Imagen ${i + 1} de ${title}`;
      count.textContent = `${i + 1} / ${items.length}`;
      cap.textContent = it.caption || '';
    }
    function go(step) { i = (i + step + items.length) % items.length; show(); }
    box.querySelector('.prev').addEventListener('click', () => go(-1));
    box.querySelector('.next').addEventListener('click', () => go(1));
    box.querySelector('.zoom').addEventListener('click', () => openLightbox(img.src, img.alt));
    box.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    });
    show();
  }


  const g = window.PARCHES.find(p => p.id === id && p.published !== false);
  if (!g) {
    document.title = 'Parche no encontrado – Nyuhuhu!!';
    root.innerHTML = '<div class="empty"><img src="./img/empty.svg" alt=""><h1 class="sticker">Parche no encontrado</h1><p>La ficha no existe o todavía no está publicada.</p><a class="btn" href="./index.html">Volver a los parches</a></div>';
    return;
  }
  const title = g.title || 'Parche pendiente de completar';
  const download = safeUrl(g.download);
  document.title = `${title} – Nyuhuhu!!`;
  const background = imgUrl(g.background);
  if (background) document.documentElement.style.setProperty('--site-background', `url(${JSON.stringify(new URL(background, document.baseURI).href)})`);
  const errorForm = safeUrl(g.errorForm);
  root.innerHTML = `<p><a href="./index.html">← Volver a los parches</a></p>
    <h1 class="page-title sticker">${esc(title)}</h1>
    <p class="muted">Parche de traducción elaborado con inteligencia artificial.</p>` +
    section('Capturas de pantalla', g.gallery.length ? carouselHtml('gallery', 'Capturas de pantalla') : '<p class="muted">Capturas pendientes.</p>') +
    section('Instrucciones de instalación', (g.installation.length ? `<ol>${g.installation.map(step => `<li class="prose">${esc(step)}</li>`).join('')}</ol>` : '<p class="muted">Las instrucciones específicas de este parche todavía no están disponibles.</p>') +
    `<div class="download-area">${download ? `<a class="btn download-btn" href="${esc(download)}" target="_blank" rel="noopener noreferrer">↓ Descargar parche</a><p class="hint">Se abre el servicio de descarga en otra pestaña. Solo el parche; requiere el juego original.</p>` : '<button class="btn download-btn" type="button" disabled>Descarga pendiente</button>'}</div>`) +
    section('Informar de un error', `<p>¿Encontraste un error de traducción o instalación? Cuéntanos dónde ocurre y cómo reproducirlo. Si el formulario lo permite, añade una captura sin datos personales.</p>${errorForm ? `<a class="btn btn-ghost" href="${esc(errorForm)}" target="_blank" rel="noopener noreferrer">Informar de un error ↗</a>` : '<p class="muted">El formulario de reportes estará disponible próximamente.</p>'}`);
  initCarousel('gallery', g.gallery, title);
})();
