/* Ventanas CSS sobre las láminas originales: cada detalle conserva su imagen. */
document.addEventListener('DOMContentLoaded', () => {
  const sheets = {
    serie: ['imagenes/stickers-serie.jpeg', 736, 1308],
    moda: ['imagenes/stickers-moda.jpeg', 675, 1200]
  };
  const stickers = [
    ['serie', 15, 48, 122, 90], // beso
    ['serie', 151, 186, 106, 151], // cosmopolitan
    ['serie', 139, 340, 120, 123], // disco
    ['serie', 29, 650, 133, 144], // cartera
    ['serie', 360, 650, 174, 170], // estrella
    ['serie', 462, 550, 154, 140], // zapato
    ['serie', 285, 12, 140, 249], // libertad
    ['serie', 280, 282, 168, 119], // amigas
    ['serie', 152, 704, 141, 125], // lazo
    ['moda', 295, 583, 184, 238], // lazo rosa
    ['moda', 464, 865, 199, 161], // beso rosa
    ['moda', 9, 172, 225, 213], // estrella rosa
    ['moda', 462, 669, 182, 169], // flor
    ['moda', 8, 735, 264, 87], // Vogue
    ['moda', 244, 1, 207, 215] // bola de espejos
  ];
  const main = document.querySelector('main');
  if (!main) return;
  const sections = [...main.children].filter(el => el.tagName === 'SECTION' && !el.classList.contains('final') && !el.classList.contains('detalle-personaje'));
  const page = ['index.html','personajes.html','columnas.html','closet.html','galeria.html','episodios.html','contacto.html'].indexOf(location.pathname.split('/').pop() || 'index.html');
  function ribbon(index) {
    const row = document.createElement('div');
    row.className = 'recortes-decorativos';
    row.setAttribute('aria-hidden', 'true');
    for (let n = 0; n < 3; n++) {
      const [sheet, x, y, w, h] = stickers[((Math.max(page, 0) * 4 + index * 3 + n) % stickers.length)];
      const [url, sw, sh] = sheets[sheet];
      const sticker = document.createElement('span');
      sticker.className = 'recorte-decorativo';
      const scale = Math.min(102 / w, 95 / h);
      sticker.style.cssText = `width:${w * scale}px;height:${h * scale}px;background-image:url("${url}");background-size:${sw * scale}px ${sh * scale}px;background-position:${-x * scale}px ${-y * scale}px;--giro:${[-12, 8, -5, 13][(index + n) % 4]}deg`;
      row.append(sticker);
    }
    return row;
  }
  sections.forEach((section, index) => section.after(ribbon(index)));
  if (!sections.length) main.append(ribbon(0));
});
