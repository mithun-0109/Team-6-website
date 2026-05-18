document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle staggered delay if provided via CSS var
                const delay = entry.target.style.getPropertyValue('--delay');
                if (delay) {
                    entry.target.style.transitionDelay = delay;
                }
                
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
                
                // Trigger decode effect if it's the report UI
                if(entry.target.id === 'report-ui') {
                    triggerDecodeEffect();
                }
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.fade-in');
    revealElements.forEach(el => observer.observe(el));


    // 2. Decoder Text Effect
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    
    function triggerDecodeEffect() {
        const targets = document.querySelectorAll('.decode-target');
        
        targets.forEach(target => {
            const finalValue = target.getAttribute('data-value');
            if(!finalValue) return;
            
            let iterations = 0;
            const maxIterations = 15;
            
            const interval = setInterval(() => {
                target.innerText = finalValue.split('').map((char, index) => {
                    if(index < iterations / 2) {
                        return finalValue[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');
                
                if(iterations >= maxIterations * 2) {
                    clearInterval(interval);
                    target.innerText = finalValue;
                }
                
                iterations++;
            }, 30);
        });
    }

    // 3. Simulated Live Feed
    const feedContainer = document.querySelector('.data-feed');
    if(feedContainer) {
        setInterval(() => {
            // Generate minor variations
            const l = (42.1 + (Math.random() * 0.4 - 0.2)).toFixed(1);
            const a = (-12.4 + (Math.random() * 0.4 - 0.2)).toFixed(1);
            const b = (8.9 + (Math.random() * 0.4 - 0.2)).toFixed(1);
            
            feedContainer.innerHTML = `<span>L* ${l}</span><span>a* ${a}</span><span>b* ${b}</span>`;
            
        }, 1500);
    }
    
    // 4. Parallax effect for hero hardware
    const heroHardware = document.getElementById('hero-hardware');
    const heroSection = document.getElementById('hero-section');
    
    if(heroHardware && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            heroHardware.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        heroSection.addEventListener('mouseleave', () => {
            heroHardware.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            heroHardware.style.transition = `transform 0.5s ease-out`;
        });
        
        heroSection.addEventListener('mouseenter', () => {
            heroHardware.style.transition = `transform 0.1s ease-out`;
        });
    }
    
    // 5. Workflow Progress Animation on Scroll
    const workflowContainer = document.querySelector('.workflow-container');
    const workflowProgress = document.querySelector('.workflow-progress');
    
    if(workflowContainer && workflowProgress) {
        const workflowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setTimeout(() => {
                        if(window.innerWidth >= 768) {
                            workflowProgress.style.width = '100%';
                        } else {
                            workflowProgress.style.height = '100%';
                        }
                    }, 500);
                    workflowObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        workflowObserver.observe(workflowContainer);
    }
    
    // 6. Portfolio Modal Logic
    const teamData = {
        archana: {
            name: "Archana R",
            role: "Visionary",
            bio: "Leading the project vision and ensuring alignment with industry needs. Specializes in product strategy and high-level system architecture.",
            skills: ["Strategy", "System Design", "Leadership"],
            links: { github: "#", linkedin: "#" }
        },
        srinithi: {
            name: "Srinithi K",
            role: "Co-Leader",
            bio: "Driving the project execution and managing cross-functional tasks to keep the team on track.",
            skills: ["Management", "Coordination", "Agile"],
            links: { github: "#", linkedin: "#" }
        },
        vipin: {
            name: "Vipin K",
            role: "Hardware",
            bio: "Architecting the ESP32 firmware and sensor integrations. Expert in embedded systems and rapid prototyping.",
            skills: ["ESP32", "C++", "Circuit Design", "I2C/SPI"],
            links: { github: "#", linkedin: "#" }
        },
        mithun: {
            name: "Mithun S",
            role: "Coding",
            bio: "Full-stack developer building the REST API, data pipelines, and the interactive dashboard for shade analysis.",
            skills: ["Django", "React", "Python", "REST API"],
            links: { github: "#", linkedin: "#" }
        },
        bojaraaj: {
            name: "Bojaraaj P",
            role: "Design",
            bio: "Creating the visual language and user experience. Translating complex data into intuitive, cinematic interfaces.",
            skills: ["UI/UX", "Figma", "Frontend", "Interaction"],
            links: { github: "#", linkedin: "#" }
        },
        vishal: {
            name: "Vishal K",
            role: "Industrial Connect",
            bio: "Bridging the gap between the lab and the factory floor. Ensuring the product meets real-world textile manufacturing standards.",
            skills: ["Textile Eng", "Quality Control", "Industry Relations"],
            links: { github: "#", linkedin: "#" }
        }
    };

    const modal = document.getElementById('portfolio-modal');
    const modalCloseBtn = document.getElementById('close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const teamLinks = document.querySelectorAll('.team-member-link');

    if(modal && teamLinks.length > 0) {
        teamLinks.forEach(link => {
            link.addEventListener('click', () => {
                const memberId = link.getAttribute('data-member');
                const data = teamData[memberId];
                
                if(data) {
                    // Populate modal
                    document.getElementById('modal-name').innerText = data.name;
                    document.getElementById('modal-role').innerText = data.role;
                    document.getElementById('modal-bio').innerText = data.bio;
                    
                    // Populate skills
                    const skillsContainer = document.getElementById('modal-skills');
                    skillsContainer.innerHTML = '';
                    data.skills.forEach(skill => {
                        const skillBadge = document.createElement('span');
                        skillBadge.className = 'font-mono text-[10px] text-muted border border-[#2A2A2D] bg-[#1a1a1c] px-2 py-1 rounded-brutal uppercase';
                        skillBadge.innerText = skill;
                        skillsContainer.appendChild(skillBadge);
                    });
                    
                    // Populate links
                    const linksContainer = document.getElementById('modal-links');
                    linksContainer.innerHTML = '';
                    if(data.links.github) {
                        linksContainer.innerHTML += `<a href="${data.links.github}" target="_blank" class="text-muted hover:text-primary transition-colors flex items-center gap-1 font-mono text-xs uppercase"><i data-lucide="github" class="w-4 h-4"></i> GitHub</a>`;
                    }
                    if(data.links.linkedin) {
                        linksContainer.innerHTML += `<a href="${data.links.linkedin}" target="_blank" class="text-muted hover:text-primary transition-colors flex items-center gap-1 font-mono text-xs uppercase"><i data-lucide="linkedin" class="w-4 h-4"></i> LinkedIn</a>`;
                    }
                    
                    // Re-initialize lucide icons for the new dynamic HTML
                    if(window.lucide) {
                        lucide.createIcons();
                    }
                    
                    // Show modal
                    modal.classList.add('modal-active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            });
        });
        
        const closeModal = () => {
            modal.classList.remove('modal-active');
            document.body.style.overflow = '';
        };
        
        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && modal.classList.contains('modal-active')) {
                closeModal();
            }
        });
    }
});
