document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (!main) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const sections = [...main.querySelectorAll(':scope > section')].filter(section => !section.classList.contains('final'));
  const top = document.createElement('button');
  top.type = 'button'; top.className = 'volver-arriba';
  top.textContent = '↑'; top.setAttribute('aria-label', 'Volver al inicio de la página');
  top.hidden = true;
  top.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:reduced.matches ? 'instant' : 'smooth'});
    document.querySelector('.site-header .logo')?.focus({preventScroll:true});
  });
  document.body.append(top);
  const updateTop = () => { top.hidden = scrollY < 500; };
  window.addEventListener('scroll', updateTop, {passive:true}); updateTop();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!reduced.matches) entry.target.animate([
        {opacity:.5, transform:'translateY(16px)'},
        {opacity:1, transform:'translateY(0)'}
      ], {duration:500, easing:'ease-out'});
      observer.unobserve(entry.target);
    }), {threshold:.08});
    sections.forEach(section => observer.observe(section));
  }
  document.querySelectorAll('details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (detail.open && !reduced.matches) {
        [...detail.children].filter(child => child.tagName !== 'SUMMARY').forEach(child => child.animate([{opacity:0},{opacity:1}], {duration:240}));
      }
    });
  });
});
