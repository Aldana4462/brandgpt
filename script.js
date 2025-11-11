document.addEventListener('DOMContentLoaded', () => {
    const rotatingText = document.getElementById('rotating-text');
    const phrases = [
        'Modo terapia OFF',
        'Don\'t touch my algoritmo',
        'Hot pero inestable',
        'Demasiado sincera para LinkedIn'
    ];
    let index = 0;

    setInterval(() => {
        index = (index + 1) % phrases.length;
        rotatingText.classList.add('fade-out');
        setTimeout(() => {
            rotatingText.textContent = phrases[index];
            rotatingText.classList.remove('fade-out');
        }, 350);
    }, 2000);

    const heroCollage = document.querySelectorAll('.collage-item');
    document.addEventListener('mousemove', (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 20;
        const y = (event.clientY / window.innerHeight - 0.5) * 20;
        heroCollage.forEach((item, i) => {
            const depth = (i + 1) * 8;
            item.style.transform = `translate3d(${x / depth * -1}px, ${y / depth * -1}px, 0)`;
        });
    });

    const revealElements = document.querySelectorAll('.section__inner, .section__description, .code-block');
    revealElements.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    revealElements.forEach((el) => observer.observe(el));

    const collectionCards = document.querySelectorAll('.collection-card');
    collectionCards.forEach((card) => {
        const direction = card.dataset.direction;
        let x = 0;
        let y = 20;
        if (direction === 'left') x = -40;
        if (direction === 'right') x = 40;
        if (direction === 'up') y = -40;
        gsap.fromTo(card, { opacity: 0, x, y }, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%'
            },
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, i) => {
        gsap.to(card, {
            y: 'random(-30, 30)',
            x: 'random(-40, 40)',
            opacity: 0.6,
            duration: 4 + i,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });

    const moodItems = document.querySelectorAll('.mood-item');
    moodItems.forEach((item, i) => {
        gsap.to(item, {
            rotation: gsap.utils.random(-8, 8),
            y: gsap.utils.random(-20, 20),
            duration: 6 + (i % 3),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });

    const whyItems = document.querySelectorAll('.why__list li');
    whyItems.forEach((item, index) => {
        gsap.fromTo(item, { opacity: 0, x: -30 }, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%'
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.hero__title', { y: 40, opacity: 0, duration: 1, ease: 'power3.out' })
        .from('.hero__subtitle', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('.hero__tagline', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .from('.hero__scroll', { opacity: 0, duration: 0.6, ease: 'power1.out' }, '-=0.3');

    gsap.to('.hero', {
        backgroundPosition: '50% 55%',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
});
