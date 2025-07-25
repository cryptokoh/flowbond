// Retro-specific effects for Version 4

// CRT TV effect
function addCRTEffect() {
  const body = document.body;
  const crtOverlay = document.createElement('div');
  crtOverlay.className = 'crt-overlay';
  crtOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 9998;
    background: radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
  `;
  body.appendChild(crtOverlay);
}

// Retro cursor trail
function addCursorTrail() {
  const colors = ['#ff1493', '#00ffff', '#ffff00', '#00ff00', '#ff6600'];
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed;
      left: ${mouseX}px;
      top: ${mouseY}px;
      width: 10px;
      height: 10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      pointer-events: none;
      z-index: 9997;
      box-shadow: 0 0 10px currentColor;
      animation: trail-fade 1s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
      trail.remove();
    }, 1000);
  });
  
  // Add trail fade animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes trail-fade {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0);
      }
    }
  `;
  document.head.appendChild(style);
}

// Glitch effect on hover
function addGlitchHover() {
  const glitchElements = document.querySelectorAll('.retro-chrome, .retro-gradient');
  
  glitchElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.animation = 'glitch-effect 0.3s infinite';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.animation = '';
    });
  });
  
  // Add glitch animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes glitch-effect {
      0%, 100% {
        transform: translate(0);
        filter: hue-rotate(0deg);
      }
      20% {
        transform: translate(-2px, 2px);
        filter: hue-rotate(90deg);
      }
      40% {
        transform: translate(-2px, -2px);
        filter: hue-rotate(180deg);
      }
      60% {
        transform: translate(2px, 2px);
        filter: hue-rotate(270deg);
      }
      80% {
        transform: translate(2px, -2px);
        filter: hue-rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);
}

// Arcade sound effects (visual feedback)
function addArcadeEffects() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Create visual "beep" effect
      const beep = document.createElement('div');
      beep.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 50px;
        height: 50px;
        border: 3px solid #00ffff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: beep-expand 0.5s ease-out forwards;
      `;
      
      document.body.appendChild(beep);
      
      setTimeout(() => {
        beep.remove();
      }, 500);
    });
  });
  
  // Add beep animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes beep-expand {
      0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(3);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Retro loading animation
function addRetroLoading() {
  const animatedElements = document.querySelectorAll('.animate');
  
  animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.style.transition = 'all 0.5s ease-out';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      
      // Add pixel perfect entrance
      const pixelEffect = document.createElement('div');
      pixelEffect.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(255, 20, 147, 0.1) 2px,
          rgba(255, 20, 147, 0.1) 4px
        );
        pointer-events: none;
        animation: pixel-fade 0.5s ease-out forwards;
      `;
      
      element.style.position = 'relative';
      element.appendChild(pixelEffect);
      
      setTimeout(() => {
        pixelEffect.remove();
      }, 500);
    }, index * 100);
  });
  
  // Add pixel fade animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pixel-fade {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// VHS tracking effect
function addVHSEffect() {
  setInterval(() => {
    if (Math.random() > 0.98) {
      document.body.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
      setTimeout(() => {
        document.body.style.transform = 'translateX(0)';
      }, 50);
    }
  }, 100);
}

// Initialize all retro effects
document.addEventListener('DOMContentLoaded', () => {
  addCRTEffect();
  addCursorTrail();
  addGlitchHover();
  addArcadeEffects();
  addRetroLoading();
  addVHSEffect();
  
  // Add retro startup sequence
  const startup = document.createElement('div');
  startup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    color: #00ff00;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Space Mono', monospace;
    font-size: 20px;
    z-index: 10000;
  `;
  startup.innerHTML = '<div>LOADING FLOWBOND.EXE...</div>';
  
  document.body.appendChild(startup);
  
  setTimeout(() => {
    startup.style.opacity = '0';
    startup.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
      startup.remove();
    }, 500);
  }, 1500);
});