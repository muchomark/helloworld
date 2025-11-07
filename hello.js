// Hello page menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuCloseButton = document.getElementById('menu-close-button');
    
    if (menuButton && menuOverlay) {
        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });
        
        // Close menu when clicking close button
        if (menuCloseButton) {
            menuCloseButton.addEventListener('click', () => {
                menuButton.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
        }
        
        // Close menu when clicking outside
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                menuButton.classList.remove('active');
                menuOverlay.classList.remove('active');
            }
        });
    }
});

