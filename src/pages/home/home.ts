import '../../common/layout';
import '@fontsource/inter-tight/latin-400.css';
import '@fontsource/inter-tight/latin-500.css';
import './home.scss';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll } from './motion/smooth-scroll';
import { playLoader } from './motion/loader';
import { prepareHero, revealHero, initHeroScroll } from './motion/hero';
import { initReveals } from './motion/reveals';
import { initServicesCounter } from './motion/services-counter';

// `has-motion` is added in <head> unless the visitor turned animations off;
// without it the page stays a static layout and none of this runs.
async function initMotion(): Promise<void> {
    gsap.registerPlugin(ScrollTrigger);
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const lenis = initSmoothScroll();
    lenis.stop();

    prepareHero();
    initHeroScroll();
    initReveals();
    initServicesCounter();

    // Layout shifts once the web font is in, so measure again
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    await playLoader();
    lenis.start();
    revealHero();
}

if (document.documentElement.classList.contains('has-motion')) {
    initMotion().catch((error) => {
        // never leave the page stuck behind the loader
        console.error(error);
        document.querySelector('.loader')?.remove();
        document.documentElement.classList.remove('is-loading');
    });
}
