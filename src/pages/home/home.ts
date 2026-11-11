import '../../common/layout';
import './home.scss';

// Fade the hero title out once the user starts scrolling
const heroContent = document.querySelector<HTMLElement>('.hero__content');

if (heroContent) {
    const update = (): void => {
        heroContent.classList.toggle('is-hidden', window.scrollY > 90);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
}
