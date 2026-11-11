import { gsap } from 'gsap';

const SEEN_KEY = 'rc-loader-seen';

/** True once per browser tab session; storage can be blocked, so never throw. */
const isFirstVisit = (): boolean => {
    try {
        const first = sessionStorage.getItem(SEEN_KEY) === null;
        sessionStorage.setItem(SEEN_KEY, '1');
        return first;
    } catch {
        return true;
    }
};

/**
 * Counter 000 → 100 with a thin gold line, then the screen slides up.
 * Short version on repeat visits. Resolves when the page starts to show.
 */
export async function playLoader(): Promise<void> {
    const loader = document.querySelector<HTMLElement>('.loader');
    if (!loader) return;

    const root = document.documentElement;
    const counter = loader.querySelector<HTMLElement>('.loader__count');
    const duration = isFirstVisit() ? 1.6 : 0.5;
    const progress = { value: 0 };

    root.classList.add('is-loading');

    await gsap.timeline()
        .to(progress, {
            value: 100,
            duration,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (counter) counter.textContent = String(Math.round(progress.value)).padStart(3, '0');
            },
        })
        .to('.loader__bar', { scaleX: 1, duration, ease: 'power2.inOut' }, 0)
        .to(loader, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.1');

    loader.remove();
    root.classList.remove('is-loading');
}
