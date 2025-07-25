// Cyber-specific effects for Version 2

// Matrix rain effect for CTA section
function createMatrixRain() {
  const matrixContainer = document.querySelector('.matrix-rain');
  if (!matrixContainer) return;
  
  const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const columns = Math.floor(window.innerWidth / 20);
  
  for (let i = 0; i < columns; i++) {
    const column = document.createElement('div');
    column.style.position = 'absolute';
    column.style.left = `${i * 20}px`;
    column.style.top = '0';
    column.style.width = '20px';
    column.style.height = '100%';
    column.style.fontSize = '14px';
    column.style.fontFamily = 'monospace';
    column.style.color = '#00ff88';
    column.style.textShadow = '0 0 5px #00ff88';
    column.style.opacity = '0.8';
    
    const text = Array(50).fill(0).map(() => 
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('\n');
    
    column.textContent = text;
    column.style.animation = `matrix-fall ${5 + Math.random() * 10}s linear infinite`;
    column.style.animationDelay = `${Math.random() * 5}s`;
    
    matrixContainer.appendChild(column);
  }
}

// Glitch text effect enhancement
function enhanceGlitchEffect() {
  const glitchElements = document.querySelectorAll('.glitch');
  
  glitchElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.animation = 'none';
      setTimeout(() => {
        element.style.animation = '';
      }, 10);
    });
  });
}

// Neon flicker effect
function addNeonFlicker() {
  const neonElements = document.querySelectorAll('.neon-text, .neon-icon, .neon-number');
  
  neonElements.forEach(element => {
    setInterval(() => {
      if (Math.random() > 0.95) {
        element.style.opacity = '0.7';
        setTimeout(() => {
          element.style.opacity = '1';
        }, 50);
      }
    }, 3000);
  });
}

// Cyberpunk scan line effect
function addScanLines() {
  const scanLine = document.createElement('div');
  scanLine.style.position = 'fixed';
  scanLine.style.top = '0';
  scanLine.style.left = '0';
  scanLine.style.right = '0';
  scanLine.style.height = '2px';
  scanLine.style.background = 'linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.8), transparent)';
  scanLine.style.pointerEvents = 'none';
  scanLine.style.zIndex = '9999';
  scanLine.style.animation = 'scan 8s linear infinite';
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes scan {
      0% { transform: translateY(0); }
      100% { transform: translateY(100vh); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(scanLine);
}

// Terminal typing effect for FAQ items
function addTerminalTyping() {
  const terminalResponses = document.querySelectorAll('.terminal-response');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = entry.target.textContent;
        entry.target.textContent = '';
        entry.target.style.display = 'block';
        
        let index = 0;
        const typeInterval = setInterval(() => {
          if (index < text.length) {
            entry.target.textContent += text[index];
            index++;
          } else {
            clearInterval(typeInterval);
          }
        }, 20);
        
        observer.unobserve(entry.target);
      }
    });
  });
  
  terminalResponses.forEach(response => {
    observer.observe(response);
  });
}

// 3D parallax for cyber elements
function add3DParallax() {
  const parallaxElements = document.querySelectorAll('.cyber-cube, .hologram-token, .cyber-bracelet');
  
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    
    parallaxElements.forEach(element => {
      const depth = element.dataset.depth || 1;
      const moveX = x * 20 * depth;
      const moveY = y * 20 * depth;
      
      element.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    });
  });
}

// Initialize all cyber effects
document.addEventListener('DOMContentLoaded', () => {
  createMatrixRain();
  enhanceGlitchEffect();
  addNeonFlicker();
  addScanLines();
  addTerminalTyping();
  add3DParallax();
  
  // Add hover sound effect (visual feedback instead of actual sound)
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });
  });
});

// Resize handler for matrix rain
window.addEventListener('resize', () => {
  const matrixContainer = document.querySelector('.matrix-rain');
  if (matrixContainer) {
    matrixContainer.innerHTML = '';
    createMatrixRain();
  }
});