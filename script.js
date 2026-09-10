// Insira somente números, com 55 + DDD. Exemplo: 5511999999999
const WHATSAPP_NUMBER = '5532991335054';

const stage = document.getElementById('device-stage');
const devices = document.getElementById('device-group');
let dragging = false;
let startX = 0;
let startY = 0;
let rotateX = -14;
let rotateY = -24;

function renderDevices() {
  devices.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(5deg)`;
}

stage.addEventListener('pointerdown', (event) => {
  dragging = true;
  startX = event.clientX;
  startY = event.clientY;
  stage.setPointerCapture(event.pointerId);
});

stage.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  rotateY += (event.clientX - startX) / 2.5;
  rotateX -= (event.clientY - startY) / 3;
  rotateX = Math.max(-70, Math.min(45, rotateX));
  startX = event.clientX;
  startY = event.clientY;
  renderDevices();
});

['pointerup', 'pointercancel', 'pointerleave'].forEach((eventName) => {
  stage.addEventListener(eventName, () => { dragging = false; });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.textContent = isOpen ? 'Fechar' : 'Menu';
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = 'Menu';
}));

document.querySelectorAll('[data-whatsapp]').forEach((button) => {
  const message = encodeURIComponent(button.dataset.whatsapp);

  if (WHATSAPP_NUMBER) {
    button.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
  } else {
    button.href = '#contato';
    button.addEventListener('click', (event) => {
      event.preventDefault();
      alert('Configure seu número de WhatsApp no arquivo script.js antes de publicar.');
    });
  }
});
