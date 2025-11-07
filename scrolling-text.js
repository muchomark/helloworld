// Dynamic spacing calculation for seamless scrolling text
function setupScrollingText() {
    const wrappers = document.querySelectorAll('.site-title-wrapper');
    
    wrappers.forEach(wrapper => {
        const title = wrapper.querySelector('.site-title');
        const firstText = wrapper.querySelector('.site-title-text:first-child');
        
        if (!title || !firstText) return;
        
        function updateSpacing() {
            // Get the actual width of the visible container
            const containerWidth = wrapper.offsetWidth;
            
            if (containerWidth === 0) {
                // Container not yet rendered, try again
                setTimeout(updateSpacing, 50);
                return;
            }
            
            // Temporarily remove padding to measure actual text width
            const originalPadding = firstText.style.paddingRight;
            firstText.style.paddingRight = '0px';
            const textWidth = firstText.offsetWidth;
            
            // Set spacing to match container width exactly
            firstText.style.paddingRight = containerWidth + 'px';
            
            // Calculate animation distance: move by exactly one text instance width
            // This ensures when first instance leaves, second instance is in the same position
            const scrollDistance = -(textWidth + containerWidth);
            
            // Set CSS custom property for animation
            title.style.setProperty('--scroll-distance', scrollDistance + 'px');
        }
        
        // Update on load and resize
        const resizeObserver = new ResizeObserver(() => {
            updateSpacing();
        });
        resizeObserver.observe(wrapper);
        
        // Initial update
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', updateSpacing);
        } else {
            updateSpacing();
        }
        
        // Also update after a short delay to ensure layout is complete
        setTimeout(updateSpacing, 100);
    });
}

// Initialize
setupScrollingText();

