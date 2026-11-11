import './gallery.css';

export interface GalleryImage {
    src: string;
    alt: string;
}

const pad = (n: number): string => (n < 10 ? '0' : '') + n;

/**
 * Carousel gallery: framed centre slide, dimmed neighbours,
 * counter, numbered pager, progress bar, swipe/drag and keyboard support.
 */
export function initGallery(root: HTMLElement | null, images: GalleryImage[]): void {
    if (!root || images.length === 0) return;

    const track = root.querySelector<HTMLElement>('.rc-gallery__track');
    const count = root.querySelector<HTMLElement>('.rc-gallery__count');
    const pager = root.querySelector<HTMLElement>('.rc-gallery__pager');
    const progress = root.querySelector<HTMLElement>('.rc-gallery__progress-fill');
    const viewport = root.querySelector<HTMLElement>('.rc-gallery__viewport');
    if (!track || !count || !pager || !progress || !viewport) return;

    const total = images.length;
    let current = 0;

    // Build slides
    const slides = images.map((img, i) => {
        const slide = document.createElement('figure');
        slide.className = 'rc-gallery__slide';
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('aria-label', `${i + 1} of ${total}`);

        const image = document.createElement('img');
        image.src = img.src;
        image.alt = img.alt;
        image.draggable = false;
        image.loading = i < 3 || i === total - 1 ? 'eager' : 'lazy';
        image.decoding = 'async';

        slide.appendChild(image);
        slide.addEventListener('click', () => {
            if (i !== current && !wasDragged) goTo(i);
        });
        track.appendChild(slide);
        return slide;
    });

    // Shortest signed distance between two indexes on a loop
    const offsetOf = (i: number): number => {
        let d = i - current;
        if (d > total / 2) d -= total;
        if (d < -total / 2) d += total;
        return d;
    };

    const render = (): void => {
        slides.forEach((slide, i) => {
            const offset = offsetOf(i);
            const abs = Math.abs(offset);
            slide.style.setProperty('--offset', String(offset));
            slide.classList.toggle('is-active', offset === 0);
            slide.classList.toggle('is-hidden', abs > 1);
            slide.setAttribute('aria-hidden', String(offset !== 0));
            slide.tabIndex = abs === 1 ? 0 : -1;
        });

        count.innerHTML = `<b>${pad(current + 1)}</b> / ${pad(total)}`;

        pager.innerHTML = '';
        for (let d = -2; d <= 2; d++) {
            const i = (current + d + total) % total;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = pad(i + 1);
            btn.className = d === 0 ? 'is-active' : '';
            btn.setAttribute('aria-label', `Show photo ${i + 1}`);
            if (d === 0) btn.setAttribute('aria-current', 'true');
            btn.addEventListener('click', () => goTo(i));
            pager.appendChild(btn);
        }

        progress.style.transform = `scaleX(${(current + 1) / total})`;
    };

    const goTo = (i: number): void => {
        current = (i + total) % total;
        render();
    };
    const next = (): void => goTo(current + 1);
    const prev = (): void => goTo(current - 1);

    // Keyboard
    root.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    });

    // Swipe / drag
    let startX = 0;
    let dragging = false;
    let wasDragged = false;
    const THRESHOLD = 50;

    viewport.addEventListener('pointerdown', (e: PointerEvent) => {
        dragging = true;
        wasDragged = false;
        startX = e.clientX;
        viewport.classList.add('is-dragging');
    });
    window.addEventListener('pointermove', (e: PointerEvent) => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 5) wasDragged = true;
        track.style.setProperty('--drag', `${dx}px`);
    });
    const endDrag = (e: PointerEvent): void => {
        if (!dragging) return;
        dragging = false;
        viewport.classList.remove('is-dragging');
        track.style.setProperty('--drag', '0px');
        const dx = e.clientX - startX;
        if (dx < -THRESHOLD) next();
        else if (dx > THRESHOLD) prev();
    };
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    render();
}
