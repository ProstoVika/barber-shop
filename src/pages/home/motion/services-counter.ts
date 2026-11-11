import { gsap } from 'gsap';

/** Sticky "01 / 05" counter: shows the service that is in the middle of the screen. */
export function initServicesCounter(): void {
    const current = document.querySelector<HTMLElement>('.services__current');
    const items = Array.from(document.querySelectorAll<HTMLElement>('.service'));
    if (!current || items.length === 0) return;

    const show = (index: number): void => {
        const label = String(index + 1).padStart(2, '0');
        if (current.textContent === label) return;

        gsap.timeline()
            .to(current, { yPercent: -40, autoAlpha: 0, duration: 0.2, ease: 'power2.in' })
            .call(() => { current.textContent = label; })
            .fromTo(current, { yPercent: 40 }, { yPercent: 0, autoAlpha: 1, duration: 0.35, ease: 'power3.out' });
    };

    // A thin band across the middle of the viewport decides which item is "current"
    const observer = new IntersectionObserver(
        (entries) => entries
            .filter((entry) => entry.isIntersecting)
            .forEach((entry) => show(items.indexOf(entry.target as HTMLElement))),
        { rootMargin: '-50% 0px -50% 0px' },
    );

    items.forEach((item) => observer.observe(item));
}
