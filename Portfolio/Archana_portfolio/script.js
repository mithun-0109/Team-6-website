document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Reveal Animations ---
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .section-container');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // --- Smooth Scrolling for Navbar Links ---
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form submission prevention (just for demo)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-primary');
            const originalText = btn.textContent;
            btn.textContent = "Sent successfully!";
            btn.style.backgroundColor = "#2f855a"; // Green
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = ""; // Reset
                form.reset();
            }, 3000);
        });
    }
});
