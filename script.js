// 1. 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// 2. 모바일 메뉴
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// 3. 스크롤 시 active 변경 (가벼운 버전)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function onScroll() {
  const scrollY = window.pageYOffset;
  let currentId = '';

  sections.forEach(sec => {
    const top = sec.offsetTop - 120; // navbar 높이 보정
    if (scrollY >= top) {
      currentId = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

// 4. 아주 가벼운 IntersectionObserver (섹션만)
const fadeSections = document.querySelectorAll('.fade-once');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target); // 한 번만
    }
  });
}, { threshold: 0.15 });

fadeSections.forEach(sec => {
  sec.style.opacity = '0';
  sec.style.transform = 'translateY(20px)';
  sec.style.transition = 'opacity .6s ease, transform .6s ease';
  io.observe(sec);
});

console.log('%cPortfolio loaded faster ✅', 'background: #4ECDC4; color: #fff; padding: 4px 8px;');
