'use strict';

// Escapa texto para insertarlo de forma segura en HTML.
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function safeUrl(u) { return /^https?:\/\//i.test(u || '') ? u : ''; }
function imgUrl(f) {
  const value = String(f || '');
  if (!value || value.startsWith('/') || value.includes('..') || /[:\\]/.test(value)) return '';
  return './' + value.split('/').map(encodeURIComponent).join('/');
}
// Ampliación de imágenes a pantalla completa.
function openLightbox(src, alt) {
  let box = document.getElementById('lightbox');
  if (!box) {
    box = document.createElement('div');
    box.id = 'lightbox';
    box.className = 'lightbox';
    box.innerHTML =
      '<button type="button" class="lb-close" aria-label="Cerrar">×</button>' +
      '<img alt="">' +
      '<a class="lb-open" target="_blank" rel="noopener">Abrir en una pestaña nueva</a>';
    document.body.appendChild(box);
    box.addEventListener('click', (e) => { if (e.target.tagName !== 'A') box.classList.remove('open'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') box.classList.remove('open'); });
  }
  const img = box.querySelector('img');
  img.src = src;
  img.alt = alt || '';
  box.querySelector('.lb-open').href = src;
  box.classList.add('open');
}
