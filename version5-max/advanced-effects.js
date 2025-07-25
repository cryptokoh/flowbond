// Advanced effects for Version 5 MAX

// Advanced Particle System with Mouse Interaction
class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0, radius: 150 };
    this.init();
  }

  init() {
    this.canvas.className = 'particle-canvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `;
    document.body.appendChild(this.canvas);
    
    this.resize();
    this.createParticles();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#ff6ec7' : '#b967ff',
        originalRadius: Math.random() * 2 + 1
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.mouse.radius) {
        const force = (this.mouse.radius - distance) / this.mouse.radius;
        const angle = Math.atan2(dy, dx);
        particle.vx -= Math.cos(angle) * force * 0.5;
        particle.vy -= Math.sin(angle) * force * 0.5;
        particle.radius = particle.originalRadius * (1 + force);
      } else {
        particle.radius += (particle.originalRadius - particle.radius) * 0.1;
      }
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Friction
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      
      // Boundaries
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = particle.color;
      this.ctx.fill();
    });
    
    // Draw connections
    this.particles.forEach((p1, i) => {
      this.particles.slice(i + 1).forEach(p2 => {
        const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(185, 103, 255, ${(100 - distance) / 400})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// 3D Tilt Effect
function add3DTiltEffect() {
  const cards = document.querySelectorAll('.process-card, .utility-card, .faq-card, .token-display');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      card.style.transition = 'transform 0.1s ease';
      
      // Add dynamic lighting
      const lightX = (x / rect.width) * 100;
      const lightY = (y / rect.height) * 100;
      card.style.background = `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255, 110, 199, 0.1), transparent), var(--bg-card)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.background = '';
    });
  });
}

// Liquid Morphing Background
function createLiquidBackground() {
  const liquidBg = document.createElement('div');
  liquidBg.className = 'liquid-background';
  liquidBg.innerHTML = `
    <svg width="100%" height="100%">
      <defs>
        <filter id="liquid">
          <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="2" result="turbulence"/>
          <feColorMatrix in="turbulence" type="matrix" values="0 0 0 0 0.9 0 0 0 0 0.1 0 0 0 0 0.9 0 0 0 1 0"/>
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" filter="url(#liquid)" opacity="0.05"/>
    </svg>
  `;
  
  liquidBg.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  `;
  
  document.body.appendChild(liquidBg);
  
  // Animate the liquid
  let time = 0;
  setInterval(() => {
    time += 0.005;
    const turbulence = liquidBg.querySelector('feTurbulence');
    turbulence.setAttribute('baseFrequency', `${0.005 + Math.sin(time) * 0.002} ${0.005 + Math.cos(time) * 0.002}`);
  }, 50);
}

// Advanced Hover States
function enhanceHoverStates() {
  // Magnetic cursor
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #ff6ec7;
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.1s ease, opacity 0.3s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);
  
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  cursorDot.style.cssText = `
    position: fixed;
    width: 4px;
    height: 4px;
    background: #ff6ec7;
    border-radius: 50%;
    pointer-events: none;
    z-index: 10001;
  `;
  document.body.appendChild(cursorDot);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursorDot.style.left = e.clientX - 2 + 'px';
    cursorDot.style.top = e.clientY - 2 + 'px';
  });
  
  // Enhance interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.borderColor = '#b967ff';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.borderColor = '#ff6ec7';
    });
  });
}

// Smooth Scroll with Parallax
function enhanceScrollEffects() {
  const sections = document.querySelectorAll('.section');
  const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-cta');
  
  // Smooth section transitions
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '-10% 0px'
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
    sectionObserver.observe(section);
  });
  
  // Parallax scrolling
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    heroElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.1);
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Update orbs position
    document.querySelectorAll('.orb').forEach((orb, index) => {
      const speed = 0.2 + (index * 0.1);
      orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Text Scramble Effect
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="scramble">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Apply text scramble to headings
function addTextScramble() {
  const headings = document.querySelectorAll('.hero-title, .section-title');
  
  headings.forEach(heading => {
    const scrambler = new TextScramble(heading);
    const originalText = heading.innerText;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrambler.setText(originalText);
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(heading);
  });
}

// Audio Visualizer (Visual Only)
function createAudioVisualizer() {
  const visualizer = document.createElement('div');
  visualizer.className = 'audio-visualizer';
  visualizer.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 200px;
    height: 100px;
    z-index: 100;
    display: flex;
    align-items: flex-end;
    gap: 3px;
  `;
  
  // Create bars
  for (let i = 0; i < 20; i++) {
    const bar = document.createElement('div');
    bar.style.cssText = `
      width: 100%;
      background: linear-gradient(to top, #ff6ec7, #b967ff);
      border-radius: 2px;
      transition: height 0.1s ease;
    `;
    visualizer.appendChild(bar);
  }
  
  document.body.appendChild(visualizer);
  
  // Animate bars
  setInterval(() => {
    visualizer.querySelectorAll('div').forEach(bar => {
      const height = Math.random() * 80 + 20;
      bar.style.height = height + '%';
    });
  }, 100);
}

// Ripple Effect on Click
function addRippleEffect() {
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.cssText = `
      position: fixed;
      border-radius: 50%;
      border: 2px solid #ff6ec7;
      pointer-events: none;
      z-index: 9999;
      animation: ripple-expand 1s ease-out forwards;
    `;
    
    const size = 0;
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - size/2 + 'px';
    ripple.style.top = e.clientY - size/2 + 'px';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
  });
  
  // Add ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-expand {
      0% {
        width: 0;
        height: 0;
        opacity: 1;
      }
      100% {
        width: 500px;
        height: 500px;
        opacity: 0;
        margin-left: -250px;
        margin-top: -250px;
      }
    }
    
    .scramble {
      color: #ff6ec7;
      text-shadow: 0 0 10px currentColor;
    }
  `;
  document.head.appendChild(style);
}

// Initialize all advanced effects
document.addEventListener('DOMContentLoaded', () => {
  // Core effects
  new ParticleSystem();
  createLiquidBackground();
  add3DTiltEffect();
  enhanceHoverStates();
  enhanceScrollEffects();
  addTextScramble();
  createAudioVisualizer();
  addRippleEffect();
  
  // Add loading animation
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0a0a0f;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s ease;
  `;
  
  loader.innerHTML = `
    <div style="text-align: center;">
      <div class="loader-animation" style="
        width: 100px;
        height: 100px;
        border: 3px solid rgba(255, 110, 199, 0.1);
        border-top-color: #ff6ec7;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
      "></div>
      <div style="
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.5rem;
        background: linear-gradient(135deg, #ff6ec7 0%, #b967ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      ">Loading Experience</div>
    </div>
  `;
  
  const spinStyle = document.createElement('style');
  spinStyle.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinStyle);
  
  document.body.appendChild(loader);
  
  // Remove loader after content loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }, 1000);
  });
});