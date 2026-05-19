import sys

file_path = "srinithi_portfolio.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace .hero-grid CSS
content = content.replace(
    """.hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
            align-items: center;
            text-align: center;
            max-width: 900px;
            margin: 0 auto;
        }""",
    """.hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
            text-align: left;
            max-width: 1100px;
            margin: 0 auto;
        }"""
)

# Replace .hero-content p CSS
content = content.replace(
    """.hero-content p {
            font-size: 1.25rem;
            color: var(--text-main);
            margin: 0 auto 2.5rem;
            max-width: 650px;
        }""",
    """.hero-content p {
            font-size: 1.25rem;
            color: var(--text-main);
            margin: 0 0 2.5rem 0;
            max-width: 650px;
        }"""
)

# Replace .hero-cta CSS and add minimal image styles
content = content.replace(
    """.hero-cta {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }""",
    """.hero-cta {
            display: flex;
            gap: 1rem;
            justify-content: flex-start;
        }

        .minimal-image-wrapper {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .minimal-profile-pic {
            width: 100%;
            max-width: 380px;
            aspect-ratio: 4/5;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
            border: 1px solid var(--border-color);
            transition: transform 0.5s ease, box-shadow 0.5s ease;
        }

        .minimal-profile-pic:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(37, 99, 235, 0.12);
        }"""
)

# Replace media queries layout
content = content.replace(
    """.hero-grid,
            .about-grid,
            .contact-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }""",
    """.hero-grid,
            .about-grid,
            .contact-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
                text-align: center;
            }

            .hero-content p {
                margin: 0 auto 2.5rem !important;
            }

            .hero-cta {
                justify-content: center;
            }

            .minimal-profile-pic {
                max-width: 300px;
                aspect-ratio: 1;
                border-radius: 50%;
            }"""
)

# Replace HTML for hero
content = content.replace(
    """    <header id="home" class="hero">
        <div class="container hero-grid">
            <div class="hero-content">
                <span class="hero-tagline"
                    style="font-size: 0.95rem; margin-bottom: 2rem; padding: 0.6rem 1.5rem; letter-spacing: 0.1em; text-transform: uppercase;">Welcome
                    to my portfolio</span>
                <h1 style="font-size: 5rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -0.04em;">
                    SRINITHI<span style="color: var(--primary-color);">.K</span></h1>
                <h2
                    style="font-size: 2.2rem; font-weight: 700; color: var(--text-main); margin-bottom: 2rem; letter-spacing: -0.02em;">
                    Pre-Final Year Textile Technology Student</h2>
                <p style="font-size: 1.25rem; max-width: 750px; margin: 0 auto 3rem;">Driving theoretical knowledge into
                    practical excellence. A comprehensive overview of my academic achievements, core competencies, and
                    major assignments demonstrating my capabilities.</p>
                <div class="hero-cta">
                    <a href="#assignments" class="btn primary-btn">View My Work <i class="fas fa-arrow-right"></i></a>
                    <a href="#about" class="btn secondary-btn">Learn More</a>
                </div>
            </div>
        </div>
    </header>""",
    """    <header id="home" class="hero">
        <div class="container hero-grid">
            <div class="hero-content">
                <span class="hero-tagline"
                    style="font-size: 0.95rem; margin-bottom: 2rem; padding: 0.6rem 1.5rem; letter-spacing: 0.1em; text-transform: uppercase;">Welcome
                    to my portfolio</span>
                <h1 style="font-size: 5rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -0.04em;">
                    SRINITHI<span style="color: var(--primary-color);">.K</span></h1>
                <h2
                    style="font-size: 2.2rem; font-weight: 700; color: var(--text-main); margin-bottom: 2rem; letter-spacing: -0.02em;">
                    Pre-Final Year Textile Technology Student</h2>
                <p class="hero-desc" style="font-size: 1.25rem; max-width: 750px; margin: 0 0 3rem 0;">Driving theoretical knowledge into
                    practical excellence. A comprehensive overview of my academic achievements, core competencies, and
                    major assignments demonstrating my capabilities.</p>
                <div class="hero-cta">
                    <a href="#assignments" class="btn primary-btn">View My Work <i class="fas fa-arrow-right"></i></a>
                    <a href="#about" class="btn secondary-btn">Learn More</a>
                </div>
            </div>
            <div class="hero-image-container">
                <div class="minimal-image-wrapper">
                    <img src="Srinithi.jpeg" alt="Srinithi K" class="minimal-profile-pic">
                </div>
            </div>
        </div>
    </header>"""
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated successfully")
