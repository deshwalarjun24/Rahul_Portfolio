// Function to filter projects by category
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-item'); // Select all project items
    
    projects.forEach(project => {
        // Show or hide projects based on the selected category
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block'; // Show project
        } else {
            project.style.display = 'none'; // Hide project
        }
    });
}

// Skills data
const skills = [
    { name: "JavaScript", level: 80 },
    { name: "HTML", level: 90 },
    { name: "CSS", level: 85 },
    { name: "Bootstrap", level: 75 },
    { name: "Unity 3D", level: 70 },
    { name: "GitHub", level: 65 },
    { name: "Java", level: 80 },
    { name: "Figma", level: 75 },
    { name: "Canva", level: 70 },
];

// Update progress bars based on skills data
skills.forEach((skill, index) => {
    const progressBar = document.querySelectorAll('.progress')[index]; // Select corresponding progress bar
    progressBar.style.width = `${skill.level}%`; // Set the width based on skill level
});

// Optional: Add event listeners for filter buttons (example)
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category; // Get category from button
        filterProjects(category); // Call filter function
    });
});

// Add MacBook-specific enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Detect if user is on a Mac
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    
    if (isMac) {
        document.body.classList.add('mac-device');
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Smooth scroll with easing
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Enhance hover effects for better trackpad experience
        const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .skill-item');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
            });
        });
        
        // Optimize image loading for Retina displays
        const images = document.querySelectorAll('img');
        if (window.devicePixelRatio > 1) {
            images.forEach(img => {
                if (!img.src.includes('?dpr=')) {
                    img.style.imageRendering = '-webkit-optimize-contrast';
                }
            });
        }
    }
    
    // Back to top button with smooth scrolling
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide back to top button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
    }
});

// Skills section enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Animate skill progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress');
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Set up Intersection Observer for progress bars
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the width from the style attribute
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Animate from 0 to the target width
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                
                // Unobserve after animation
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each progress bar
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // Set item index for staggered animations
    document.querySelectorAll('.skills-category').forEach(category => {
        const items = category.querySelectorAll('.skill-item');
        items.forEach((item, index) => {
            item.style.setProperty('--item-index', index);
        });
    });
    
    // Set up Intersection Observer for skill items
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add animated class
                entry.target.classList.add('animated');
                
                // Unobserve after animation
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each skill item
    skillItems.forEach(item => {
        // Add initial hidden state class
        item.classList.add('skill-hidden');
        skillObserver.observe(item);
    });
    
    // Add hover sound effect for skill items (subtle)
    if (!isMobileDevice()) {
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // Optional: Add a subtle hover sound
                // Uncomment if you want to add sound effects
                // playHoverSound();
            });
        });
    }
    
    // Helper function to check if user is on mobile
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }
    
    // Optional: Function to play a subtle hover sound
    function playHoverSound() {
        const audio = new Audio();
        audio.volume = 0.1; // Very quiet
        audio.src = 'sounds/hover.mp3'; // You would need to add this file
        audio.play().catch(e => {
            // Suppress errors if sound can't play
            console.log('Sound not available');
        });
    }
});

