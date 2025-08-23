// Initialize carousel functionality when page loads
function setup() {
    // Initialize carousel functionality with delay
    setTimeout(() => {
        initializeCarousel();
        initializeProductCarousel();
        initializeScrollingLogo();
    }, 100);
}

function initializeCarousel() {
    const carousel = document.querySelector('.product-carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    // Get the width of one product item plus gap
    const productItem = carousel.querySelector('.product-item');
    if (!productItem) return;
    
    const itemWidth = productItem.offsetWidth;
    const gap = 32; // 2rem gap in pixels
    const scrollAmount = itemWidth + gap;
    
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

function initializeProductCarousel() {
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        const images = item.querySelectorAll('.product-img');
        if (images.length <= 1) return; // Skip if only one image
        
        let currentIndex = 0;
        
        item.addEventListener('mouseenter', () => {
            // Switch to second image (back view)
            if (currentIndex === 0) {
                images[currentIndex].classList.remove('active');
                currentIndex = 1;
                images[currentIndex].classList.add('active');
            }
        });
        
        item.addEventListener('mouseleave', () => {
            // Switch back to first image (front view)
            if (currentIndex === 1) {
                images[currentIndex].classList.remove('active');
                currentIndex = 0;
                images[currentIndex].classList.add('active');
            }
        });
    });
}

// Initialize scrolling logo functionality
function initializeScrollingLogo() {
    const logo = document.getElementById('scrolling-logo');
    if (!logo) return;
    
    let ticking = false;
    
    function updatePositions() {
        const scrollY = window.pageYOffset;
        
        // Logo stays in place until scroll point, then moves up with content
        const startMovingPoint = 400; // Logo starts moving up after 400px of scroll
        
        if (scrollY < startMovingPoint) {
            // Logo stays fixed in place
            logo.style.transform = `translate(-50%, -50%)`;
        } else {
            // Logo starts moving up with the content
            const moveUpAmount = scrollY - startMovingPoint;
            logo.style.transform = `translate(-50%, calc(-50% - ${moveUpAmount}px))`;
        } 
        
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updatePositions);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Initial position
    updatePositions();
}

// Ensure product carousel is initialized when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeProductCarousel();
        initializeScrollingLogo();
    }, 200);
});

// Backup initialization for when window loads
window.addEventListener('load', function() {
    setTimeout(() => {
        initializeProductCarousel();
        initializeScrollingLogo();
    }, 300);
}); 