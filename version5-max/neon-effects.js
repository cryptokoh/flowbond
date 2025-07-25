// Neon-specific effects for Version 5

// Create particle system
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: ${Math.random() > 0.5 ? '#ff6ec7' : '#b967ff'};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float-particle ${Math.random() * 20 + 20}s linear infinite;
      opacity: ${Math.random() * 0.5 + 0.3};
    `;
    particlesContainer.appendChild(particle);
  }
  
  // Add floating animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-particle {
      0% {
        transform: translateY(100vh) translateX(0);
      }
      100% {
        transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
      }
    }
  `;
  document.head.appendChild(style);
}

// Smooth scroll indicator
function addScrollIndicator() {
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  scrollIndicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(135deg, #ff6ec7 0%, #b967ff 100%);
    transition: width 0.3s ease;
    z-index: 9999;
  `;
  document.body.appendChild(scrollIndicator);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollIndicator.style.width = scrolled + '%';
  });
}

// Magnetic button effect
function addMagneticButtons() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
}

// Glow effect on hover
function addGlowEffects() {
  const glowElements = document.querySelectorAll('.process-card, .utility-card, .faq-card');
  
  glowElements.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
      const glow = document.createElement('div');
      glow.className = 'hover-glow';
      glow.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, rgba(255, 110, 199, 0.2) 0%, transparent 50%);
        pointer-events: none;
        z-index: 0;
      `;
      element.appendChild(glow);
      
      setTimeout(() => {
        glow.style.opacity = '0';
        glow.style.transition = 'opacity 0.5s ease';
        setTimeout(() => glow.remove(), 500);
      }, 300);
    });
  });
}

// Typing effect for hero title
function addTypingEffect() {
  const heroTitle = document.querySelector('.hero-title .gradient-text');
  if (!heroTitle) return;
  
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.style.minHeight = '1.2em';
  
  let index = 0;
  const typeInterval = setInterval(() => {
    if (index < text.length) {
      heroTitle.textContent += text[index];
      index++;
    } else {
      clearInterval(typeInterval);
      // Add cursor blink
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      cursor.style.cssText = `
        display: inline-block;
        width: 3px;
        height: 1em;
        background: linear-gradient(135deg, #ff6ec7 0%, #b967ff 100%);
        margin-left: 5px;
        animation: cursor-blink 1s infinite;
      `;
      heroTitle.appendChild(cursor);
    }
  }, 100);
  
  // Add cursor blink animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes cursor-blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// Number counter animation enhancement
function enhanceCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(counter.dataset.target);
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;
          
          counter.style.fontVariantNumeric = 'tabular-nums';
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
              // Add completion effect
              counter.style.animation = 'counter-complete 0.5s ease';
            }
            counter.textContent = Math.floor(current);
          }, 16);
          
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(counter);
  });
  
  // Add completion animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes counter-complete {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}

// Smooth reveal animations
function addRevealAnimations() {
  const animatedElements = document.querySelectorAll('.animate');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('fade-in');
        }, index * 50);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  addScrollIndicator();
  addMagneticButtons();
  addGlowEffects();
  addTypingEffect();
  enhanceCounters();
  addRevealAnimations();
  
  // Add loading complete effect
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});