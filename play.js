// Play page menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button-play');
    const menuOverlay = document.getElementById('menu-overlay-play');
    
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

