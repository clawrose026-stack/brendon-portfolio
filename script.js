// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Mobile Menu Toggle =====
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// ===== Skill Bars Animation =====
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
};

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate skill bars when skills section is visible
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ===== Navbar Background on Scroll =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Add/remove scrolled class for background
    if (currentScroll > 50) {
        nav.style.background = isDark ? 'rgba(18, 18, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = isDark ? '0 2px 20px rgba(0, 0, 0, 0.3)' : '0 2px 20px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.background = isDark ? 'rgba(18, 18, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navHeight = document.querySelector('.nav').offsetHeight;
        
        if (pageYOffset >= sectionTop - navHeight - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Typing Effect for Code Window =====
const codeContent = document.querySelector('.code-content code');
if (codeContent) {
    const originalHTML = codeContent.innerHTML;
    
    // Simple reveal animation on load
    setTimeout(() => {
        codeContent.style.opacity = '0';
        codeContent.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            codeContent.innerHTML = originalHTML;
            codeContent.style.opacity = '1';
        }, 100);
    }, 500);
}

// Note: Contact form uses FormSubmit.co for email delivery

// ===== Theme Toggle Function =====
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update nav background
    const nav = document.querySelector('.nav');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.style.background = newTheme === 'dark' ? 'rgba(18, 18, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)';
    } else {
        nav.style.background = newTheme === 'dark' ? 'rgba(18, 18, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)';
    }
}

// ===== Initialize Theme on Load =====
(function() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
})();

// ===== Preload Fonts =====
const preloadFonts = () => {
    const fonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap'
    ];
    
    fonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = font;
        document.head.appendChild(link);
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    preloadFonts();
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
});

// ===== Theme Toggle =====
const initTheme = () => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Create theme toggle button
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = `
        <button class="theme-toggle-btn" aria-label="Toggle theme">
            <span class="theme-icon sun">☀️</span>
            <span class="theme-icon moon">🌙</span>
        </button>
    `;
    document.body.appendChild(themeToggle);
    
    // Add click handler
    themeToggle.querySelector('.theme-toggle-btn').addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update nav background for dark mode
        updateNavBackground();
    });
};

// Update nav background based on theme and scroll
const updateNavBackground = () => {
    const nav = document.querySelector('.nav');
    const currentScroll = window.pageYOffset;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (currentScroll > 50) {
        nav.style.background = isDark ? 'rgba(18, 18, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)';
    } else {
        nav.style.background = isDark ? 'rgba(18, 18, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)';
    }
};

// ===== Performance: Debounce Scroll Events =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
    updateNavBackground();
}, 16);

window.addEventListener('scroll', debouncedScroll);

// Initialize theme on load
initTheme();
