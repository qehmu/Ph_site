const images = [...document.querySelectorAll('img[data-index]')];
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

let currentIndex = 0;

function openLightbox(index) {
  if (!lightbox || !lightboxImg) return;
  currentIndex = index;
  lightboxImg.src = images[currentIndex].src;
  lightbox.style.display = 'flex';
}

if (lightbox && lightboxImg) {
  images.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  const closeBtn = document.querySelector('.close');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  if (closeBtn) {
    closeBtn.onclick = () => {
      lightbox.style.display = 'none';
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex].src;
    };
  }

  if (prevBtn) {
    prevBtn.onclick = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex].src;
    };
  }

  let startX = 0;

  lightbox.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50 && nextBtn) nextBtn.click();
    if (endX - startX > 50 && prevBtn) prevBtn.click();
  });

  document.addEventListener('keydown', e => {
    if (lightbox.style.display !== 'flex') return;
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
  });
}

// Contact modal functionality
const contactBtns = document.querySelectorAll('.contact-btn, .contact-btn-site');
const contactOverlay = document.getElementById('contactOverlay');
const contactClose = document.querySelector('.contact-modal-close');
const contactForm = document.getElementById('contactForm');

function openContact() {
  contactOverlay.classList.add('open');
  contactOverlay.setAttribute('aria-hidden', 'false');
  // focus first field
  const first = document.getElementById('contactName');
  if (first) first.focus();
}

function closeContact() {
  contactOverlay.classList.remove('open');
  contactOverlay.setAttribute('aria-hidden', 'true');
}

contactBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openContact();
  });
});

contactClose && contactClose.addEventListener('click', closeContact);

contactOverlay && contactOverlay.addEventListener('click', (e) => {
  if (e.target === contactOverlay) closeContact();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && contactOverlay.classList.contains('open')) closeContact();
});