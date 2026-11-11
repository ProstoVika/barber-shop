
import './team.scss';
import { initGallery } from '../../lego/gallery';

// Gallery photos (from src/product-images)
const photos = [22, 30, 24, 37, 38, 39, 40, 21, 23, 26, 27, 28, 31, 32, 33, 34];

initGallery(
    document.querySelector<HTMLElement>('.rc-gallery'),
    photos.map((n) => ({
        src: `/product-images/${n}.jpg`,
        alt: `Haircut and styling at Royal Cut barbershop, South Ealing (photo ${n})`,
    })),
);