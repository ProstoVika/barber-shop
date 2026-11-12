import { gsap } from 'gsap';

/** Scissors run along the wordmark snipping, leave a gold cut and the two halves drift apart. */
function cutWordmark(): gsap.core.Timeline {
    const travel = 1;   // timeline units the scissors need to cross the word
    const snips = 8;    // how many times the blades close on the way

    return gsap.timeline({ defaults: { ease: 'none' } })
        .fromTo('.scissors', { attr: { transform: 'translate(-80 84)' } }, { attr: { transform: 'translate(1080 84)' }, duration: travel }, 0)
        .fromTo('.wordmark__cut', { attr: { x2: 0 } }, { attr: { x2: 1000 }, duration: travel * 0.93 }, 0)
        .fromTo('.scissors__blade:first-child', { attr: { transform: 'rotate(-16)' } },
            { attr: { transform: 'rotate(0)' }, duration: travel / snips / 2, repeat: snips * 2 - 1, yoyo: true }, 0)
        .fromTo('.scissors__blade:nth-child(2)', { attr: { transform: 'rotate(16)' } },
            { attr: { transform: 'rotate(0)' }, duration: travel / snips / 2, repeat: snips * 2 - 1, yoyo: true }, 0)
        .to('.wordmark__half--top', { x: -14, y: -4, duration: 0.45, ease: 'power2.out' }, travel * 0.75)
        .to('.wordmark__half--bottom', { x: 14, y: 4, duration: 0.45, ease: 'power2.out' }, travel * 0.75)
        // once the cut is done, the crown settles next to the word
        .fromTo('.crown', { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, travel * 0.95)
        .fromTo('.crown circle', { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.15, stagger: 0.05, ease: 'back.out(3)' }, travel * 1.3);
}

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
            .to('.wordmark svg', { yPercent: 0, duration: 0.7, ease: 'power3.out' }, 0.35)
            .add(cutWordmark(), 1.1);
    });
}
