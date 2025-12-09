const works = [
  {
    id: "mondrian",
    title: "Mondrian (css)",
    author: "Galería CSS",
    tags: ["geom"],
    desc: "Composición geométrica inspirada en Mondrian, hecha solo con grid y colores.",
    code: `<div class="p-mondrian">
  <div style="grid-column:1/3"></div>
  <div class="m-blue" style="grid-column:3/4;grid-row:1/3"></div>
  <div style="grid-column:1/2;grid-row:2/3"></div>
  <div class="m-yellow" style="grid-column:2/3;grid-row:2/3"></div>
  <div class="m-red" style="grid-column:2/3;grid-row:3/4"></div>
</div>`
  },
  {
    id: "pixel-face",
    title: "Retrato píxel",
    author: "Galería CSS",
    tags: ["portrait"],
    desc: "Pequeño retrato pixelado usando divs en un grid.",
    code: (function(){
      // generamos una cuadrícula con colores (string)
      const colors = [
        "transparent","transparent","#f1c27d","#f1c27d","#f1c27d","transparent","transparent","transparent",
        "transparent","#f1c27d","#f1c27d","#f1c27d","#f1c27d","#f1c27d","transparent","transparent",
        "#000","#f1c27d","#f1c27d","#f1c27d","#f1c27d","#f1c27d","#f1c27d","#000",
        "#000","#000","#f1c27d","#f1c27d","#f1c27d","#f1c27d","#000","#000",
        "transparent","#000","#000","#000","#000","#000","#000","transparent",
        "transparent","transparent","#000","#000","#000","#000","transparent","transparent"
      ];
      return `<div class="p-pixel">` + colors.map(c=>`<div class="pixel" style="background:${c}"></div>`).join("") + `</div>`;
    })()
  },
  {
    id: "abstract",
    title: "Abstracto cónico",
    author: "Galería CSS",
    tags: ["experimental"],
    desc: "Exploración de color y forma con gradientes cónicos y clip-path.",
    code: `<div class="p-abstract"></div>`
  }
];

const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalAuthor = document.getElementById('modal-author');
const modalArt = document.getElementById('modal-art');
const modalDesc = document.getElementById('modal-desc');
const modalCode = document.getElementById('modal-code').querySelector('code');

function renderGallery(list){
  gallery.innerHTML = '';
  list.forEach(w=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;
    card.setAttribute('data-id', w.id);
    card.setAttribute('data-tags', w.tags.join(' '));

    const preview = document.createElement('div');
    preview.className = 'preview';

    // insert the CSS art HTML into preview
    const artContainer = document.createElement('div');
    artContainer.innerHTML = w.code;
    // constrain size
    artContainer.style.maxWidth = '100%';
    artContainer.style.maxHeight = '100%';
    preview.appendChild(artContainer);

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = `<div><div class="title">${w.title}</div><div class="author muted">${w.author}</div></div>`;

    card.appendChild(preview);
    card.appendChild(meta);

    // open modal on click or enter
    function open(){
      modal.setAttribute('aria-hidden','false');
      modalTitle.textContent = w.title;
      modalAuthor.textContent = w.author;
      modalArt.innerHTML = w.code;
      modalDesc.textContent = w.desc || '';
      modalCode.textContent = w.code.replace(/</g,'&lt;').replace(/>/g,'&gt;');
      document.body.style.overflow = 'hidden';
      // focus to close button for keyboard users
      const closeBtn = modal.querySelector('.modal-close');
      if(closeBtn) closeBtn.focus();
    }
    card.addEventListener('click', open);
    card.addEventListener('keydown', e=>{ if(e.key === 'Enter') open() });

    gallery.appendChild(card);
  });
}

renderGallery(works);

// filters
document.querySelectorAll('.filters button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    if(filter === 'all') renderGallery(works);
    else renderGallery(works.filter(w=>w.tags.includes(filter)));
  });
});

// modal close handlers
document.querySelectorAll('[data-close]').forEach(el=>{
  el.addEventListener('click', closeModal);
});
function closeModal(){
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

// close with ESC
document.addEventListener('keydown', e=>{
  if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
});
