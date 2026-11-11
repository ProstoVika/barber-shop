import { Product } from '../types/product';

export interface FilterState {
    search: string;
    category: string; // '' = all
}

/** Returns the products that match the search text and category. */
export function filterProducts(products: Product[], { search, category }: FilterState): Product[] {
    const query = search.trim().toLowerCase();
    return products.filter((product) =>
        product.title.toLowerCase().includes(query) &&
        (!category || product.category === category),
    );
}
