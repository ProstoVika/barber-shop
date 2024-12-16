import './team.css'

class MinimalGallery {
    private modal: HTMLElement;
    private modalImage: HTMLImageElement;
    private closeButton: HTMLElement;

    constructor() {
        // Ініціалізація елементів
        this.modal = document.getElementById('modal')!;
        this.modalImage = document.getElementById('modalImage') as HTMLImageElement;
        this.closeButton = this.modal.querySelector('.close') as HTMLElement;

        this.init();
    }

    private init(): void {
        // Додаємо обробник кліків до кожного зображення
        document.querySelectorAll('.gallery img').forEach((img) => {
            img.addEventListener('click', (event) => {
                this.openModal((event.target as HTMLImageElement).src);
            });
        });

        // Додаємо обробник для кнопки закриття
        this.closeButton.addEventListener('click', () => this.closeModal());
    }

    private openModal(imageSrc: string): void {
        this.modal.style.display = 'flex';
        this.modalImage.src = imageSrc;
    }

    private closeModal(): void {
        this.modal.style.display = 'none';
    }
}

// Ініціалізація класу після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    new MinimalGallery();
});
