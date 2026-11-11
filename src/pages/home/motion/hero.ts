import { gsap } from 'gsap';

/** Before the loader opens: video slightly zoomed, wordmark and captions hidden. */
export function prepareHero(): void {
    gsap.set('.hero__video', { scale: 1.15 });
    gsap.set('.hero__meta p', { autoAlpha: 0, y: 12 });
    gsap.set('.wordmark svg', { yPercent: 100 });
}

/** After the loader: the video settles, captions fade in. */
export function revealHero(): void {
    gsap.to('.hero__video', { scale: 1, duration: 2, ease: 'power3.out' });
    gsap.to('.hero__meta p', { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.3 });
}

/**
 * Pinned hero: while scrolling, the video shrinks into a frame and the ROYAL CUT
 * wordmark rises underneath. When the pin ends, the portraits follow right below
 * the wordmark, so one section flows into the next. Reversible on scroll up.
 */
export function initHeroScroll(): void {
    const stage = document.querySelector<HTMLElement>('.hero__stage');
    if (!stage) return;

    // Re-built when the layout switches between mobile and desktop (frame size differs)
    gsap.matchMedia().add('(max-width: 768px), (min-width: 769px)', () => {
        const frame = getComputedStyle(stage).getPropertyValue('--frame').trim();

        gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 0.8 },
        })
            .to('.hero__meta', { autoAlpha: 0, duration: 0.2 }, 0)
            .fromTo('.hero__media', { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: `inset(${frame})`, duration: 1, ease: 'power2.inOut' }, 0)
            .fromTo('.hero__video', { filter: 'grayscale(0)' }, { filter: 'grayscale(0.85)', duration: 1 }, 0)
            .to('.wordmark svg', { yPercent: 0, duration: 0.7, ease: 'power3.out' }, 0.35);
    });
}
