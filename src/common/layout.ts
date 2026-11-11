import '@fontsource/inter-tight/latin-400.css';
import '@fontsource/inter-tight/latin-500.css';
import '../styles/layout.scss';

/** Burger menu for small screens: open/close, close on link click, Esc or resize. */
function initMenu(): void {
    const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
    const nav = document.querySelector<HTMLElement>('.site-nav');
    if (!toggle || !nav) return;

    const setOpen = (open: boolean): void => {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        nav.classList.toggle('is-open', open);
        document.body.classList.toggle('menu-open', open);
    };

    toggle.addEventListener('click', () => {
        setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) {
            setOpen(false);
            toggle.focus();
        }
    });

    // Going back to desktop width while the menu is open
    window.matchMedia('(min-width: 1025px)').addEventListener('change', (e) => {
        if (e.matches) setOpen(false);
    });
}

/** Gold line under the header that shows how far the page is scrolled. */
function initScrollProgress(): void {
    const bar = document.querySelector<HTMLElement>('.scroll-progress');
    if (!bar) return;

    const update = (): void => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        bar.style.setProperty('--progress', progress.toFixed(4));
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}

initMenu();
initScrollProgress();
