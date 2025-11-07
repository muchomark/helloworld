// Work page menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button-work');
    const menuOverlay = document.getElementById('menu-overlay-work');
    
    if (menuButton && menuOverlay) {
        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });
        
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                menuButton.classList.remove('active');
                menuOverlay.classList.remove('active');
            }
        });
    }
});

