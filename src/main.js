document.addEventListener('DOMContentLoaded', () => {
  // 1. ИКОНКИ
  if (window.lucide) lucide.createIcons();

  // 2. ХЕДЕР ПРИ СКРОЛЛЕ
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 50);
  });

  // 3. МОБИЛЬНОЕ МЕНЮ
  const burger = document.querySelector('.burger');
  const overlay = document.querySelector('.mobile-overlay');
  const toggleMenu = () => {
      overlay.classList.toggle('mobile-overlay--active');
      document.body.style.overflow = overlay.classList.contains('mobile-overlay--active') ? 'hidden' : '';
  };
  burger?.addEventListener('click', toggleMenu);
  document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', toggleMenu));

  // 4. HERO ТЕКСТ (TypeIt)
  if (document.querySelector('#changing-text')) {
      new TypeIt("#changing-text", {
          speed: 80, loop: true, cursorChar: "|",
      })
      .type("стратегия.")
      .pause(2000).delete()
      .type("инновации.")
      .pause(2000).delete()
      .type("Hyper Bridge.")
      .pause(3000).go();
  }

  // 5. ПОЯВЛЕНИЕ СЕКЦИЙ ПРИ СКРОЛЛЕ (Native Intersection Observer)
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('section-visible');
          }
      });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => observer.observe(section));

  // 6. ИННОВАЦИИ: SPOTLIGHT
  const grid = document.querySelector(".innovations__grid");
  if (grid) {
      grid.addEventListener("mousemove", (e) => {
          document.querySelectorAll(".innov-card").forEach((card) => {
              const rect = card.getBoundingClientRect();
              card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
              card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          });
      });
  }

  // 7. ФОРМА И КАПЧА
  const form = document.getElementById('main-form');
  let n1 = Math.floor(Math.random() * 10), n2 = Math.floor(Math.random() * 5);
  const captchaLabel = document.getElementById('captcha-label');
  if (captchaLabel) captchaLabel.textContent = `Защита: ${n1} + ${n2} = ?`;

  form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (parseInt(document.getElementById('captcha-input').value) !== (n1 + n2)) {
          alert('Ошибка капчи!'); return;
      }
      const btn = form.querySelector('button');
      btn.disabled = true; btn.textContent = 'Отправка...';
      setTimeout(() => {
          form.reset();
          document.getElementById('form-message').style.display = 'block';
          document.getElementById('form-message').textContent = 'Успешно отправлено!';
          btn.textContent = 'Готово';
      }, 1500);
  });

  // 8. COOKIE
  const cookiePopup = document.getElementById('cookie-popup');
  if (!localStorage.getItem('cookies_ok')) {
      setTimeout(() => cookiePopup?.classList.add('cookie-popup--active'), 3000);
  }
  document.getElementById('cookie-accept')?.addEventListener('click', () => {
      localStorage.setItem('cookies_ok', 'true');
      cookiePopup.classList.remove('cookie-popup--active');
  });
});