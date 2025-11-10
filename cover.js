// Cover page menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button-cover');
    const menuOverlay = document.getElementById('menu-overlay-cover');
    const menuCloseButton = document.getElementById('menu-close-button-cover');
    
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
        
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                menuButton.classList.remove('active');
                menuOverlay.classList.remove('active');
            }
        });
    }
});

