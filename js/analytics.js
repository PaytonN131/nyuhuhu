'use strict';
(function () {
  const id = window.NYUHUHU?.analyticsId;
  // No medir las vistas locales del editor ni las pruebas por doble clic.
  if (!/^G-[A-Z0-9]+$/.test(id || '') || location.hostname !== 'paytonn131.github.io') return;
  const key = 'nyuhuhu-analytics-consent';
  const panel = document.getElementById('analytics-choice');
  const settings = document.getElementById('analytics-settings');
  let started = false;
  function readChoice() { try { return localStorage.getItem(key); } catch { return null; } }
  function remember(value) { try { localStorage.setItem(key, value); } catch { /* La elección se aplica igualmente a esta visita. */ } }
  function start() {
    if (started) return;
    started = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    const page = new URL(location.href);
    // No enviar búsquedas del catálogo ni parámetros ajenos a la ficha.
    const patchId = page.pathname.endsWith('/game.html') ? page.searchParams.get('id') : null;
    page.search = ''; page.hash = '';
    if (patchId) page.searchParams.set('id', patchId);
    window.gtag('config', id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: page.href,
      cookie_path: '/nyuhuhu/'
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
  }
  function reject() {
    remember('denied');
    window['ga-disable-' + id] = true;
    if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const path of ['/nyuhuhu/', '/']) {
        for (const domain of ['', '; domain=' + location.hostname, '; domain=.' + location.hostname]) {
          document.cookie = name + '=; Max-Age=0; path=' + path + domain + '; SameSite=Lax; Secure';
        }
      }
    }
    panel.hidden = true;
  }
  settings.hidden = false;
  settings.addEventListener('click', () => { panel.hidden = !panel.hidden; });
  document.getElementById('analytics-accept').addEventListener('click', () => {
    remember('granted'); panel.hidden = true;
    if (started) { location.reload(); return; }
    start();
  });
  document.getElementById('analytics-reject').addEventListener('click', reject);
  const choice = readChoice();
  if (choice === 'granted') start();
  else panel.hidden = choice === 'denied';
})();
