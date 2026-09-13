// ===================================================
// script.js — shared across index.html, about.html,
// projects.html, and contact.html
// ===================================================

// ---------- Mobile menu toggle ----------
const hamburger = document.getElementById('hamburger');
const mobilePanel = document.getElementById('mobilePanel');

if (hamburger && mobilePanel) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobilePanel.classList.toggle('show');
  });

  mobilePanel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobilePanel.classList.remove('show');
    });
  });
}

// ---------- Highlight the current page in the navbar ----------
function getCurrentPage() {
  let path = window.location.pathname.split('/').pop();
  if (path === '' || path === '/') path = 'index.html';
  return path.replace('.html', '');
}

const currentPage = getCurrentPage();

document.querySelectorAll('.nav-links a, .mobile-panel a').forEach(link => {
  const page = link.getAttribute('data-page');
  if (page && page === currentPage) {
    link.classList.add('active');
  }
});

// ---------- FYP video placeholder (Home page only) ----------
const fypVideo = document.getElementById('fypVideo');
const videoPlaceholder = document.getElementById('videoPlaceholder');

if (fypVideo && videoPlaceholder) {
  // 1. Start me banner visible rakho
  videoPlaceholder.style.display = 'flex';

  // 2. Video actually play hone pe banner hide karo
  fypVideo.addEventListener('playing', () => {
    videoPlaceholder.style.display = 'none';
  });

  // 3. loadeddata pe hide karo — LEKIN sirf tab jab video me real
  //    frame ho (videoWidth > 0). Warna 404 wali empty video pe
  //    galti se hide ho jayega.
  fypVideo.addEventListener('loadeddata', () => {
    if (fypVideo.videoWidth > 0 && fypVideo.videoHeight > 0) {
      videoPlaceholder.style.display = 'none';
    }
  });

  // 4. Agar video fail ho, banner wapas dikhao
  fypVideo.addEventListener('error', () => {
    videoPlaceholder.style.display = 'flex';
  });

  // 5. Source tag pe bhi error suno (kuch browsers isi pe fire karte hain)
  const source = fypVideo.querySelector('source');
  if (source) {
    source.addEventListener('error', () => {
      videoPlaceholder.style.display = 'flex';
    });
  }
}

// ---------- Contact form (Contact page only) ----------
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm && formNote) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formNote.textContent = 'Please fill in all fields.';
      return;
    }

    formNote.textContent = `Thanks, ${name}! This form isn't wired to a server yet — connect it to Formspree, EmailJS, or your own backend to receive real messages.`;
    contactForm.reset();
  });
}