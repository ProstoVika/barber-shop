import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Smooth, slightly inertial scrolling (mouse wheel / trackpad; touch stays native). */
export function initSmoothScroll(): Lenis {
    const lenis = new Lenis({ lerp: 0.1 });

    // Keep ScrollTrigger in sync with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Don't scroll the page behind the open mobile menu
    new MutationObserver(() => {
        if (document.body.classList.contains('menu-open')) lenis.stop();
        else lenis.start();
    }).observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return lenis;
}
