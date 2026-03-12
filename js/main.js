// Update time in navigation
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours} : ${minutes}`;
    
    const timeElements = document.querySelectorAll('#currentTime');
    timeElements.forEach(el => {
        el.textContent = timeString;
    });
}

// Update copyright year
function updateCopyright() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Update time immediately and every second
updateTime();
setInterval(updateTime, 1000);

// Update copyright on load
updateCopyright();

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parcours timeline hover effects
const timelineCards = document.querySelectorAll('.timeline-card');

timelineCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Sticky timeline title
const stickyTitle = document.querySelector('.timeline-sticky-title');
const timelineHeader = document.querySelector('.timeline-header');
const parcoursSection = document.querySelector('.parcours');
const lastTimelineCard = document.querySelector('.timeline-card:last-child');

if (stickyTitle && timelineHeader && parcoursSection && lastTimelineCard) {
    window.addEventListener('scroll', () => {
        const headerRect = timelineHeader.getBoundingClientRect();
        const sectionRect = parcoursSection.getBoundingClientRect();
        const lastCardRect = lastTimelineCard.getBoundingClientRect();
        
        if (headerRect.bottom < 0 && sectionRect.bottom > 0 && lastCardRect.bottom > window.innerHeight / 2) {
            stickyTitle.classList.add('visible');
        } else {
            stickyTitle.classList.remove('visible');
        }
    });
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero image
const heroImage = document.querySelector('.hero-image img');
if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    });
}

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to various elements
const fadeElements = document.querySelectorAll('.service-item, .project, .value-item, .process-step');
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(el);
});

// Navigation background on scroll
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Form submission handling with Web3Forms
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.form-submit-modern');
        const btnText = submitButton.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        // Copier l'email dans le champ replyto pour la réponse automatique
        const emailInput = document.getElementById('email');
        document.getElementById('replyto').value = emailInput.value;
        
        btnText.textContent = 'Envoi en cours...';
        submitButton.disabled = true;
        formStatus.textContent = '';
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                formStatus.textContent = 'Message envoyé avec succès ! Je vous recontacterai dans de brefs délais.';
                formStatus.style.color = '#4ade80';
                contactForm.reset();
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        } catch (error) {
            formStatus.textContent = 'Une erreur est survenue. Veuillez réessayer.';
            formStatus.style.color = '#ef4444';
        } finally {
            btnText.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Image hover effects
const projectImages = document.querySelectorAll('.project-image');
projectImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.02)';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Cursor effect (optional luxury touch)
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add cursor styles
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor {
        position: fixed;
        width: 40px;
        height: 40px;
        border: 1px solid rgba(10, 10, 10, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
    }
    
    a:hover ~ .custom-cursor,
    button:hover ~ .custom-cursor {
        width: 60px;
        height: 60px;
        border-color: rgba(10, 10, 10, 0.6);
    }
    
    @media (max-width: 1024px) {
        .custom-cursor {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyle);

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth page transitions
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Projets modal functionality
const projetsData = {
    1: {
        title: 'Axl Std.',
        category: 'Développement, Design Web',
        image: 'https://i.imgur.com/staqs7G.png',
        description: 'Axl Std. (Axel Studio), est un projet de e-portfolio que j\'ai réalisé pour un étudiant en design graphique, quelque chose donc hors du commun.',
        tech: 'HTML, CSS, JavaScript',
        date: 'Janvier 2026',
        link: 'https://burbanofficial.github.io/axel/',
        skills: 'Ce projet met en avant mes compétences en développement web et en design d\'interface utilisateur, qui touche également au monde de la communication.'
    },
    2: {
        title: 'The Digital Studio',
        category: 'Développement, Design Web, Branding',
        image: 'https://i.imgur.com/7A1Jszv.png',
        description: 'The Digital Studio est un projet de création d\'identité de marque et de site web pour une future agence de communication.',
        tech: 'Adobe Suite, HTML, CSS, JavaScript',
        date: 'Janvier 2026',
        link: 'https://burbanofficial.github.io/thedigitalagency/',
        skills: 'Création d\'identité de marque, design graphique, stratégie de communication visuelle, maîtrise des outils Adobe'
    },
    3: {
        title: 'Burban',
        category: 'Développement, Design Web',
        image: 'https://i.imgur.com/q01dPhV.png',
        description: "Burban est une marque de vêtements créant des vêtements respectueux de l’environnement et de la santé humaine, privilégiant la qualité plutôt que la quantité, contrairement à la fast-fashion.",
        tech: 'HTML, CSS, JavaScript',
        date: 'Septembre à Décembre 2025',
        link: 'https://burbanofficial.github.io/BURBAN-V8/',
        skills: 'Ce projet illustre mes compétences en design web et en création d\'interfaces modernes et élégantes, qui font également partie du monde de la communication.'
    }
};

const modal = document.getElementById('projetModal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const projetCards = document.querySelectorAll('.projet-card');

projetCards.forEach(card => {
    card.addEventListener('click', () => {
        const projetId = card.dataset.projet;
        const projet = projetsData[projetId];
        
        document.getElementById('modalTitle').textContent = projet.title;
        document.getElementById('modalCategory').textContent = projet.category;
        document.getElementById('modalImage').src = projet.image;
        document.getElementById('modalImage').alt = projet.title;
        document.getElementById('modalDescription').textContent = projet.description;
        document.getElementById('modalTech').textContent = projet.tech;
        document.getElementById('modalDate').textContent = projet.date;
        document.getElementById('modalSkills').textContent = projet.skills || 'Non spécifiées';
        
        const linkElement = document.getElementById('modalLink');
        if (projet.link) {
            linkElement.href = projet.link;
            linkElement.style.display = 'inline-block';
        } else {
            linkElement.style.display = 'none';
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
