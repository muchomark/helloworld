// Router for handling navigation
class Router {
    constructor() {
        this.routes = {
            '/': 'landing-page',
            '/hello': 'hello-page',
            '/work': 'work-page',
            '/play': 'play-page'
        };
        
        this.init();
    }
    
    init() {
        // Handle initial load
        window.addEventListener('load', () => {
            this.navigate(window.location.pathname);
        });
        
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.navigate(window.location.pathname);
        });
        
        // Handle link clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.menu-link')) {
                e.preventDefault();
                const path = e.target.getAttribute('href');
                this.navigate(path);
                // Close menu if open
                this.closeAllMenus();
            }
        });
    }
    
    navigate(path) {
        // Normalize path
        if (path === '' || path === '/') {
            path = '/';
        }
        
        // Handle GitHub Pages base path if needed
        const basePath = this.getBasePath();
        if (basePath && path.startsWith('/')) {
            path = path.substring(1);
        }
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const pageId = this.routes[path] || this.routes['/'];
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update URL without reload
        const fullPath = basePath ? `/${basePath}${path === '/' ? '' : '/' + path}` : path;
        if (window.location.pathname !== fullPath) {
            window.history.pushState({}, '', fullPath);
        }
        
        // Reinitialize page-specific scripts
        this.initializePage(pageId);
    }
    
    getBasePath() {
        // For GitHub Pages, extract repo name from path
        const path = window.location.pathname;
        const parts = path.split('/').filter(p => p);
        // If we're on GitHub Pages and not at root, return the repo name
        if (parts.length > 0 && !path.includes('index.html')) {
            return parts[0];
        }
        return '';
    }
    
    initializePage(pageId) {
        // Reinitialize landing page if needed
        if (pageId === 'landing-page' && !window.landingPageInstance) {
            window.landingPageInstance = new LandingPage();
        } else if (pageId === 'landing-page' && window.landingPageInstance) {
            // Reset landing page if revisiting
            window.landingPageInstance.reset();
        }
    }
    
    closeAllMenus() {
        document.querySelectorAll('.menu-overlay').forEach(menu => {
            menu.classList.remove('active');
        });
        document.querySelectorAll('.menu-button').forEach(button => {
            button.classList.remove('active');
        });
    }
}

// Initialize router
const router = new Router();

