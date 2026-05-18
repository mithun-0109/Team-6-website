const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

const scrollAnimation = () => {
    const observers = [];
    const elements = document.querySelectorAll('.fade-in, .slide-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Buttery Smooth Scroll function
// This replaces the default CSS smooth scroll with a custom JS implementation
// to allow for custom easing (cubic-bezier-like feel)
const smoothScroll = (target, duration) => {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Easing function: easeInOutCubic
    // t = current time, b = start value, c = change in value, d = duration
    const easeInOutCubic = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    };

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
};



// Load Projects from Admin Panel (LocalStorage)
// Load Projects from projects.js
const loadProjects = () => {
    const grid = document.getElementById('works-grid');
    if (!grid) return;

    // Use global variable from projects.js
    let projects = [];
    if (typeof portfolioProjects !== 'undefined') {
        projects = portfolioProjects;
    } else {
        console.error("Projects data not loaded");
        // Fallback
        projects = [
            { title: 'Project One', description: 'A web application built with modern technologies.', image: '' },
            { title: 'Project Two', description: 'Creative design project focusing on user experience.', image: '' },
            { title: 'Project Three', description: 'Mobile-first responsive website.', image: '' }
        ];
    }

    grid.innerHTML = '';

    projects.forEach((p, index) => {
        const card = document.createElement('div');
        // Use blog card style
        card.className = 'blog-card fade-in';

        // Check if image path is valid/local or needs placeholder
        const imgUrl = p.image || 'https://via.placeholder.com/600x400?text=No+Image';

        card.innerHTML = `
            <img src="${imgUrl}" alt="${p.title}" class="blog-image">
            <div class="blog-content">
                <h3 class="blog-title">${p.title}</h3>
                <p class="blog-desc">${p.description}</p>
                <a href="project-details.html?id=${index}" class="read-more">View Details <i class="ri-arrow-right-line"></i></a>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Load Contacts from Admin Panel (LocalStorage)
// Load Contacts from projects.js
const loadContactsFromStorage = () => {
    // Check if portfolioContacts is defined (loaded from projects.js)
    if (typeof portfolioContacts !== 'undefined') {
        const contacts = portfolioContacts;

        const gh = document.getElementById('link-github');
        const li = document.getElementById('link-linkedin');
        const insta = document.getElementById('link-instagram');
        const email = document.getElementById('link-email');

        if (gh && contacts.github) gh.href = contacts.github;
        if (li && contacts.linkedin) li.href = contacts.linkedin;
        if (insta && contacts.instagram) insta.href = contacts.instagram;
        if (email && contacts.email) email.href = `mailto:${contacts.email}`;
    } else {
        console.error("Contacts data not loaded");
    }
}


// Typing Animation
const typeWriter = () => {
    const texts = ["a Textile Technologist", "a Developer", "a Tech Enthusiast", "a Designer"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    let isDeleting = false;

    // Speed settings
    const typeSpeed = 50;
    const deleteSpeed = 25;
    const delayNext = 1200;

    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }

        const typeTarget = document.querySelector('.typing-text');
        if (typeTarget) typeTarget.textContent = letter;

        let timeout = typeSpeed;

        if (isDeleting) {
            timeout = deleteSpeed;
        }

        if (!isDeleting && letter.length === currentText.length) {
            timeout = delayNext;
            isDeleting = true;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            timeout = 500;
        }

        setTimeout(type, timeout);
    })();
}

// Initialize App
const app = () => {
    navSlide();
    loadProjects(); // Load data before animations
    loadContactsFromStorage();
    scrollAnimation();
    typeWriter();

    // Updated link handling to support multi-page navigation + smooth scroll
    const links = document.querySelectorAll('a[href^="#"], a[href^="index.html"], a[href^="works.html"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Allow normal navigation if going to a different page
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            const targetPath = href.split('#')[0] || 'index.html';

            if (targetPath !== currentPath && targetPath !== '') {
                // Let browser handle navigation
                return;
            }

            // If it's a hash link on the same page
            if (href.includes('#')) {
                e.preventDefault();
                const hash = '#' + href.split('#')[1];
                const targetElement = document.querySelector(hash);

                // Close nav if mobile
                const nav = document.querySelector('.nav-links');
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    document.querySelector('.burger').classList.remove('toggle');
                }

                if (targetElement) {
                    smoothScroll(hash, 1200);
                }
            }
        });
    });
}

app();
