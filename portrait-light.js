/* One light state synchronizes the pendant, light beam and original photograph. */
(() => {
  'use strict';
  const control = document.getElementById('portrait-light-control');
  if (!control) return;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  let hovered = false, pinned = false, lastPointer = '';

  function render() {
    const on = hovered || pinned;
    control.classList.toggle('is-lit', on);
    control.setAttribute('aria-pressed', String(on));
    control.setAttribute('aria-label', on ? 'إطفاء إضاءة الصورة' : 'إضاءة الصورة');
  }
  function reset() { hovered = false; pinned = false; render(); }

  control.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch' || !fine.matches) return;
    hovered = true; render();
  });
  control.addEventListener('pointerleave', () => { hovered = false; render(); });
  control.addEventListener('pointercancel', reset);
  control.addEventListener('pointerdown', event => { lastPointer = event.pointerType; });
  control.addEventListener('click', event => {
    if (event.detail > 0 && fine.matches && lastPointer !== 'touch') return;
    pinned = !pinned; render();
  });
  control.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); reset(); }
  });
  control.addEventListener('blur', reset);
  window.addEventListener('blur', reset);
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  fine.addEventListener('change', () => { hovered = false; render(); });
  control.disabled = false;
  control.classList.add('portrait-lamp-ready');
  render();
})();
