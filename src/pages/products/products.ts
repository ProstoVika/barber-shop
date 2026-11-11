import '../../common/layout';
import './products.scss';
import { fetchProducts, renderProducts } from '../../components/product-list';
import { filterProducts, FilterState } from '../../components/product-filter';
import { Product } from '../../types/product';

const container = document.querySelector('.products');
const searchForm = document.querySelector<HTMLFormElement>('.search');
const searchInput = document.querySelector<HTMLInputElement>('.search__input');
const categoryButtons = document.querySelectorAll<HTMLButtonElement>('.category-btn');

const state: FilterState = { search: '', category: '' };
let products: Product[] = [];

function update(): void {
    if (container) renderProducts(container, filterProducts(products, state));
}

searchInput?.addEventListener('input', () => {
    state.search = searchInput.value;
    update();
});

searchForm?.addEventListener('submit', (e) => e.preventDefault());

categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
        state.category = button.dataset.category ?? '';
        categoryButtons.forEach((b) => b.classList.toggle('is-active', b === button));
        update();
    });
});

fetchProducts()
    .then((data) => {
        products = data;
        update();
    })
    .catch((error) => {
        console.error(error);
        if (container) container.innerHTML = '<p class="products__empty">Products are not available right now.</p>';
    });
