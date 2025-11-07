// Landing page interactivity
class LandingPage {
    constructor() {
        this.clickedDots = [];
        this.dotOrder = [0, 1, 2]; // Expected order
        this.canvas = document.getElementById('dots-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.landingText = document.getElementById('landing-text');
        this.dots = document.querySelectorAll('.dot');
        
        this.init();
    }
    
    init() {
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Add click and touch listeners to dots for mobile support
        this.dots.forEach((dot, index) => {
            // Store touch start time on the element
            let touchStartTime = 0;
            let touchStartX = 0;
            let touchStartY = 0;
            
            // Handle click events (desktop)
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleDotClick(index);
            });
            
            // Handle touch events (mobile)
            dot.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                touchStartTime = Date.now();
                touchStartX = touch.clientX;
                touchStartY = touch.clientY;
            }, { passive: false });
            
            dot.addEventListener('touchend', (e) => {
                e.preventDefault();
                const touch = e.changedTouches[0];
                const touchDuration = Date.now() - touchStartTime;
                const deltaX = Math.abs(touch.clientX - touchStartX);
                const deltaY = Math.abs(touch.clientY - touchStartY);
                const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                // Only trigger if it was a quick tap (not a drag) and within reasonable distance
                if (touchDuration < 300 && delta < 10) {
                    this.handleDotClick(index);
                }
            }, { passive: false });
        });
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
        this.redrawLines();
    }
    
    handleDotClick(dotIndex) {
        // Check if dot is already clicked
        if (this.clickedDots.includes(dotIndex)) {
            return;
        }
        
        // Add to clicked dots
        this.clickedDots.push(dotIndex);
        this.dots[dotIndex].classList.add('clicked');
        
        // Draw lines
        this.redrawLines();
        
        // Check if all dots are connected
        if (this.clickedDots.length === 3) {
            this.checkCompletion();
        } else if (this.clickedDots.length === 1) {
            this.landingText.textContent = 'connect the dots to enter...';
        }
    }
    
    redrawLines() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw lines between consecutive clicked dots
        if (this.clickedDots.length < 2) return;
        
        this.ctx.strokeStyle = '#CCCCCC';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        
        for (let i = 0; i < this.clickedDots.length - 1; i++) {
            const dot1Index = this.clickedDots[i];
            const dot2Index = this.clickedDots[i + 1];
            
            const dot1 = this.dots[dot1Index];
            const dot2 = this.dots[dot2Index];
            
            const rect1 = dot1.getBoundingClientRect();
            const rect2 = dot2.getBoundingClientRect();
            const containerRect = this.canvas.getBoundingClientRect();
            
            const x1 = rect1.left + rect1.width / 2 - containerRect.left;
            const y1 = rect1.top + rect1.height / 2 - containerRect.top;
            const x2 = rect2.left + rect2.width / 2 - containerRect.left;
            const y2 = rect2.top + rect2.height / 2 - containerRect.top;
            
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
    }
    
    checkCompletion() {
        // Check if dots were clicked in the correct order
        const isCorrectOrder = this.clickedDots.length === 3 &&
            this.clickedDots[0] === this.dotOrder[0] &&
            this.clickedDots[1] === this.dotOrder[1] &&
            this.clickedDots[2] === this.dotOrder[2];
        
        if (isCorrectOrder) {
            this.landingText.textContent = 'dots connected, thank you.';
            
            // Navigate to hello page after a brief delay
            setTimeout(() => {
                if (typeof router !== 'undefined') {
                    router.navigate('/hello');
                } else {
                    window.location.href = '/hello';
                }
            }, 1000);
        } else {
            // Reset if wrong order
            this.landingText.textContent = 'connect the dots to enter';
            setTimeout(() => {
                this.reset();
            }, 1000);
        }
    }
    
    reset() {
        this.clickedDots = [];
        this.dots.forEach(dot => {
            dot.classList.remove('clicked');
        });
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.landingText.textContent = 'connect the dots to enter';
    }
}

// Initialize landing page when it's active
document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.getElementById('landing-page');
    if (landingPage && landingPage.classList.contains('active')) {
        window.landingPageInstance = new LandingPage();
    }
});

// Re-initialize when landing page becomes active
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const landingPage = document.getElementById('landing-page');
            if (landingPage && landingPage.classList.contains('active') && !window.landingPageInstance) {
                window.landingPageInstance = new LandingPage();
            } else if (landingPage && !landingPage.classList.contains('active') && window.landingPageInstance) {
                // Clean up when leaving landing page
                window.landingPageInstance = null;
            }
        }
    });
});

const landingPage = document.getElementById('landing-page');
if (landingPage) {
    observer.observe(landingPage, { attributes: true });
}

