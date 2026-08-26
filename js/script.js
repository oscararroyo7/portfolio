/* ============ NAVBAR SCROLL ============ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, {passive:true});

/* ============ MOBILE MENU ============ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const scrim = document.getElementById('scrim');

function getFocusable(container){
  return Array.from(container.querySelectorAll('a[href], button:not([disabled])'));
}

function closeMenu(returnFocus = true){
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('open');
  scrim.classList.remove('open');
  hamburger.setAttribute('aria-label', 'Abrir menú');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  if(returnFocus) hamburger.focus();
}
function openMenu(){
  hamburger.classList.add('active');
  mobileMenu.classList.add('open');
  scrim.classList.add('open');
  hamburger.setAttribute('aria-label', 'Cerrar menú');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  const focusable = getFocusable(mobileMenu);
  if(focusable.length) focusable[0].focus();
}
hamburger.addEventListener('click', () => {
  hamburger.classList.contains('active') ? closeMenu() : openMenu();
});
scrim.addEventListener('click', () => closeMenu());
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu(false)));

document.addEventListener('keydown', (e) => {
  if(!mobileMenu.classList.contains('open')) return;
  if(e.key === 'Escape'){
    closeMenu();
    return;
  }
  if(e.key === 'Tab'){
    const focusable = getFocusable(mobileMenu);
    if(!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if(e.shiftKey && document.activeElement === first){
      e.preventDefault();
      last.focus();
    } else if(!e.shiftKey && document.activeElement === last){
      e.preventDefault();
      first.focus();
    }
  }
});

/* ============ TABS ============ */
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tech-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector(`.tech-panel[data-panel="${btn.dataset.tab}"]`).classList.add('active');
  });
});

/* ============ PROJECT IMAGE GALLERY ============ */
document.querySelectorAll('.mock-gallery').forEach(gallery => {
  const slides = gallery.querySelectorAll('.mg-slide');
  const dots = gallery.querySelectorAll('.mg-dot');
  let index = 0;

  function show(i){
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('active', n === index));
    dots.forEach((d, n) => d.classList.toggle('active', n === index));
  }

  gallery.querySelector('.mg-prev')?.addEventListener('click', () => show(index - 1));
  gallery.querySelector('.mg-next')?.addEventListener('click', () => show(index + 1));
  dots.forEach((dot, n) => dot.addEventListener('click', () => show(n)));
});

/* ============ HERO ENTRANCE (orchestrated, on load) ============ */
const heroEls = document.querySelectorAll('.hero-enter');
window.requestAnimationFrame(() => {
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('hero-in'), 90 * i);
  });
});

/* ============ SCROLL REVEAL ============ */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
revealEls.forEach(el => io.observe(el));

/* ============ TERMINAL TYPING ANIMATION ============ */
const termBody = document.getElementById('termBody');
const codeLines = [
  {t:[['tk-kw','const'],['tk-punc',' developer = {']]},
  {t:[['tk-key','  name'],['tk-punc',': '],['tk-str',"'Oscar Arroyo'"],['tk-punc',',']]},
  {t:[['tk-key','  role'],['tk-punc',': '],['tk-str',"'Full Stack Developer'"],['tk-punc',',']]},
  {t:[['tk-key','  stack'],['tk-punc',': ['],['tk-str',"'Node'"],['tk-punc',', '],['tk-str',"'Express'"],['tk-punc',', '],['tk-str',"'MySQL'"],['tk-punc','],']]},
  {t:[['tk-key','  focus'],['tk-punc',': ['],['tk-str',"'APIs'"],['tk-punc',', '],['tk-str',"'CRUD'"],['tk-punc',', '],['tk-str',"'Auth'"],['tk-punc','],']]},
  {t:[['tk-key','  available'],['tk-punc',': '],['tk-kw','true']]},
  {t:[['tk-punc','};']]},
  {t:[]},
  {t:[['tk-com','// listo para el próximo desafío']]},
  {t:[['tk-fn','console'],['tk-punc','.'],['tk-fn','log'],['tk-punc','('],['tk-key','developer'],['tk-punc','.'],['tk-key','status'],['tk-punc',');']]},
];
const output = [
  {t:[['tk-com','> '],['tk-str','"Disponible para trabajar 🚀"']]}
];

function renderTokens(tokens){
  return tokens.map(([cls, txt]) => `<span class="${cls}">${txt}</span>`).join('');
}

async function typeLine(lineEl, tokens, speed=14){
  let full = '';
  for(const [cls, txt] of tokens){
    for(let i=0;i<txt.length;i++){
      full += txt[i];
      lineEl.innerHTML = renderPartial(tokens, full.length);
      await sleep(speed);
    }
  }
}

function renderPartial(tokens, count){
  let remaining = count;
  let html = '';
  for(const [cls, txt] of tokens){
    if(remaining <= 0) break;
    const slice = txt.slice(0, remaining);
    html += `<span class="${cls}">${slice}</span>`;
    remaining -= txt.length;
  }
  return html;
}

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

async function runTerminal(){
  termBody.innerHTML = '';
  for(const line of codeLines){
    const ln = document.createElement('div');
    ln.className = 'ln';
    termBody.appendChild(ln);
    if(line.t.length === 0){ await sleep(80); continue; }
    await typeLine(ln, line.t, 10);
    await sleep(40);
  }
  await sleep(300);
  for(const line of output){
    const ln = document.createElement('div');
    ln.className = 'ln';
    termBody.appendChild(ln);
    await typeLine(ln, line.t, 14);
  }
  const cursorLine = document.createElement('div');
  cursorLine.className = 'ln';
  cursorLine.innerHTML = '<span class="cursor"></span>';
  termBody.appendChild(cursorLine);
}

const termObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      runTerminal();
      termObserver.disconnect();
    }
  });
}, {threshold:0.3});
termObserver.observe(document.querySelector('.terminal'));

/* ============ CONTACT FORM (demo) ============ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = contactForm.querySelector('button[type="submit"]');
const submitLabel = submitBtn.textContent;

function validateField(field){
  const group = field.closest('.form-group');
  const valid = field.checkValidity();
  group.classList.toggle('has-error', !valid);
  field.setAttribute('aria-invalid', String(!valid));
  return valid;
}

contactForm.querySelectorAll('input, textarea').forEach(field => {
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => {
    if(field.closest('.form-group').classList.contains('has-error')) validateField(field);
  });
});

const CONTACT_EMAIL = 'oscararroyo07@gmail.com';

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const fields = [...contactForm.querySelectorAll('input, textarea')];
  const allValid = fields.map(validateField).every(Boolean);
  if(!allValid){
    contactForm.querySelector('.form-group.has-error input, .form-group.has-error textarea')?.focus();
    return;
  }
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`[Portfolio] ${data.get('subject')}`);
  const body = encodeURIComponent(
    `Nombre: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`
  );

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  setTimeout(() => {
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    submitBtn.disabled = false;
    submitBtn.textContent = submitLabel;
    formSuccess.classList.add('show');
    contactForm.reset();
    contactForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));
    fields.forEach(f => f.removeAttribute('aria-invalid'));
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 400);
});
