// Основной JavaScript файл

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Site loaded!');
  
  // Инициализация компонентов
  initMobileMenu();
  initThemeToggle();
  initSmoothScroll();
});

// Мобильное меню
function initMobileMenu() {
  const menuBtn = document.querySelector('[data-mobile-menu-btn]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Переключатель темы
function initThemeToggle() {
  const themeToggle = document.querySelector('[data-theme-toggle]');
  
  if (themeToggle) {
    // Получаем сохраненную тему из localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

// Плавная прокрутка к якорям
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}