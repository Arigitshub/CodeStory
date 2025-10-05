// CodeStory - Interactive Code Story Platform
// Main JavaScript functionality

// Run code function for the demo editor
function runCode() {
    const codeInput = document.getElementById('codeInput');
    const output = document.getElementById('output');
    
    if (!codeInput || !output) return;
    
    const code = codeInput.value;
    output.innerHTML = '';
    
    // Create a safe sandbox for code execution
    const consoleLog = [];
    const customConsole = {
        log: (...args) => {
            consoleLog.push(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
        },
        error: (...args) => {
            consoleLog.push('ERROR: ' + args.join(' '));
        },
        warn: (...args) => {
            consoleLog.push('WARNING: ' + args.join(' '));
        }
    };
    
    try {
        // Create a function with custom console
        const runFunction = new Function('console', code);
        runFunction(customConsole);
        
        if (consoleLog.length > 0) {
            output.textContent = consoleLog.join('\n');
            output.style.color = '#48bb78';
        } else {
            output.textContent = '✓ Code executed successfully (no output)';
            output.style.color = '#4299e1';
        }
    } catch (error) {
        output.textContent = `❌ Error: ${error.message}`;
        output.style.color = '#f56565';
    }
}

// Add keyboard shortcut for running code (Ctrl/Cmd + Enter)
document.addEventListener('DOMContentLoaded', () => {
    const codeInput = document.getElementById('codeInput');
    
    if (codeInput) {
        codeInput.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                runCode();
            }
        });
    }
    
    // Add smooth scroll behavior for anchor links
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
    
    // Add animation on scroll for feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Theme switcher (future enhancement)
function switchTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('codeStoryTheme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('codeStoryTheme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
}

// Console welcome message
console.log('%c🎨 Welcome to CodeStory!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cWrite your coding stories and share them with the world!', 'color: #764ba2; font-size: 14px;');
console.log('%cVisit: https://github.com/Arigitshub/CodeStory', 'color: #48bb78; font-size: 12px;');
