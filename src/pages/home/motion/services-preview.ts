import { gsap } from 'gsap';

/**
 * Services list: hovering (or focusing) a row shows its photo in the sticky preview on the left.
 * Photos are preloaded the first time the list is reached, so the swap is instant.
 */
export function initServicesPreview(): void {
    const preview = document.querySelector<HTMLImageElement>('.services__preview img');
    const items = Array.from(document.querySelectorAll<HTMLElement>('.service[data-image]'));
    if (!preview || items.length === 0) return;

    const preload = (): void => items.forEach(({ dataset }) => { new Image().src = dataset.image ?? ''; });
    new IntersectionObserver((entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
            preload();
            observer.disconnect();
        }
    }, { rootMargin: '300px' }).observe(items[0]);

    const activate = (item: HTMLElement): void => {
        const { image = '', alt = '' } = item.dataset;
        items.forEach((el) => el.classList.toggle('is-active', el === item));
        if (preview.getAttribute('src') === image) return;

        gsap.timeline()
            .to(preview, { autoAlpha: 0, scale: 1.04, duration: 0.2, ease: 'power2.in', overwrite: true })
            .call(() => { preview.src = image; preview.alt = alt; })
            .to(preview, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out' });
    };

    items.forEach((item) => {
        item.addEventListener('pointerenter', () => activate(item));
        item.addEventListener('focusin', () => activate(item));
    });

    items[0].classList.add('is-active');
}
