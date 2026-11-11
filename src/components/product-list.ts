import { Product } from '../types/product';

/** Loads products from /products.json. */
export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch('/products.json');
    if (!response.ok) throw new Error(`Could not load products (${response.status})`);
    return response.json();
}

function createCard(product: Product): HTMLElement {
    const card = document.createElement('article');
    card.className = 'product';

    const image = document.createElement('img');
    image.className = 'product__image';
    image.src = product.image;
    image.alt = product.title;
    image.loading = 'lazy';

    const title = document.createElement('h2');
    title.className = 'product__name';
    title.textContent = product.title;

    const category = document.createElement('span');
    category.className = 'product__category';
    category.textContent = product.category;

    const price = document.createElement('span');
    price.className = 'product__price';
    price.textContent = `£${product.price.toFixed(2)}`;

    const footer = document.createElement('div');
    footer.className = 'product__footer';
    footer.append(title, category, price);

    card.append(image, footer);
    return card;
}

/** Replaces the container content with product cards. */
export function renderProducts(container: Element, products: Product[]): void {
    if (products.length === 0) {
        container.innerHTML = '<p class="products__empty">No products found.</p>';
        return;
    }
    container.replaceChildren(...products.map(createCard));
}
