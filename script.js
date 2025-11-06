/* Professional JavaScript for Paradise Island Website
    Author: Vividhan (with enhancements by Gemini)
*/

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {

    /**
     * -----------------------------------------------------------------
     * 1. Mobile Navigation Toggle (Hamburger Menu)
     * -----------------------------------------------------------------
     * This controls the opening and closing of the mobile menu.
     */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.navbar ul');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            // Toggle the 'active' class on the nav links list
            navLinks.classList.toggle('active');

            // Update ARIA attribute for accessibility
            const isExpanded = navLinks.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);

            // Toggle the icon (bars to times and back)
            const icon = navToggle.querySelector('i');
            if (isExpanded) {
                icon.className = 'fas fa-times'; // Change to 'X' icon
            } else {
                icon.className = 'fas fa-bars'; // Change back to 'bars' icon
            }
        });
    }

    /**
     * -----------------------------------------------------------------
     * 2. Animate-on-Scroll using Intersection Observer
     * -----------------------------------------------------------------
     * This makes elements fade/slide/zoom in only when they
     * become visible in the viewport.
     */
    
    // Select all elements that should be animated on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        // Create a new observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If the element is intersecting (visible)
                if (entry.isIntersecting) {
                    // Get the animation classes from the data-animation attribute
                    const animationClasses = entry.target.dataset.animation;
                    
                    // Add the required Animate.css classes
                    entry.target.classList.add('animate__animated', ...animationClasses.split(' '));

                    // Stop observing the element so the animation doesn't re-run
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        // Observe each animated element
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * -----------------------------------------------------------------
     * 3. Booking Form Date Validation
     * -----------------------------------------------------------------
     * Ensures the departure date cannot be before the arrival date.
     */
    const arrivalInput = document.getElementById('arrival');
    const departureInput = document.getElementById('departure');

    if (arrivalInput && departureInput) {
        // When the arrival date changes...
        arrivalInput.addEventListener('change', () => {
            if (arrivalInput.value) {
                // Set the minimum allowed departure date to the arrival date
                departureInput.min = arrivalInput.value;
                
                // If departure is already set and is now invalid, clear it
                if (departureInput.value < arrivalInput.value) {
                    departureInput.value = '';
                }
            }
        });
    }

});
