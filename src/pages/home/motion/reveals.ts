import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from './split';

/** Blocks marked data-reveal fade up when they enter the screen (batched = cheap). */
function revealBlocks(): void {
    gsap.set('[data-reveal]', { autoAlpha: 0, y: 40 });

    ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12 }),
    });
}

/** Photos open like a curtain from the bottom; a row opens one after another. */
function revealPhotos(): void {
    const photos = gsap.utils.toArray<HTMLElement>('.portrait, .service__media');
    gsap.set(photos, { clipPath: 'inset(100% 0% 0% 0%)' });

    ScrollTrigger.batch(photos, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.3,
            ease: 'power4.inOut',
            stagger: 0.1,
        }),
    });
}

/** Statement words go from grey to white as the paragraph scrolls through the screen. */
function lightUpStatement(): void {
    const text = document.querySelector<HTMLElement>('[data-split]');
    if (!text) return;

    gsap.fromTo(splitWords(text), { opacity: 0.18 }, {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: text, start: 'top 80%', end: 'bottom 45%', scrub: true },
    });
}

/** The small overlapping photo of each service drifts a little slower than the page. */
function parallaxServices(): void {
    gsap.utils.toArray<HTMLElement>('.service__small').forEach((img) =>
        gsap.fromTo(img, { yPercent: 18 }, {
            yPercent: -18,
            ease: 'none',
            scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
        }),
    );
}

export function initReveals(): void {
    revealBlocks();
    revealPhotos();
    lightUpStatement();
    parallaxServices();
}
