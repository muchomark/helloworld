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
        
        // Handle 404 redirect from GitHub Pages
        if (sessionStorage.redirect) {
            const redirect = sessionStorage.redirect;
            sessionStorage.removeItem('redirect');
            this.navigate(redirect);
        }
    }
    
    navigate(path) {
        // Normalize path - remove leading/trailing slashes and handle base path
        let normalizedPath = path.replace(/^\/+|\/+$/g, '');
        if (normalizedPath === '') {
            normalizedPath = '/';
        }
        
        // Get base path for GitHub Pages
        const basePath = this.getBasePath();
        
        // Map path to route (handle both with and without leading slash)
        let routeKey = normalizedPath;
        if (routeKey !== '/' && !routeKey.startsWith('/')) {
            routeKey = '/' + routeKey;
        }
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const pageId = this.routes[routeKey] || this.routes['/'];
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update URL without reload
        let fullPath = routeKey;
        if (basePath && basePath !== '') {
            fullPath = `/${basePath}${routeKey === '/' ? '' : routeKey}`;
        }
        
        if (window.location.pathname !== fullPath) {
            window.history.pushState({}, '', fullPath);
        }
        
        // Reinitialize page-specific scripts
        this.initializePage(pageId);
    }
    
    getBasePath() {
        // For GitHub Pages, extract repo name from path
        const path = window.location.pathname;
        const parts = path.split('/').filter(p => p && p !== 'index.html');
        
        // If we're on GitHub Pages (not at root domain), return the repo name
        // Check if we're on github.io domain
        if (window.location.hostname.includes('github.io') && parts.length > 0) {
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

