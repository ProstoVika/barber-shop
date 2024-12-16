import {ProductInterface} from "../inter/interfaces";


export const productDOM = document.querySelector(".products-container") as Element;

export class ProductList {
    private readonly productDOM: Element;

    constructor(productDOM: Element) {
        this.productDOM = productDOM;

    }

    public getProducts(): ProductInterface[] {
        const productsData = localStorage.getItem("products");
        return productsData ? JSON.parse(productsData) : [];
    }

    public async fetchProducts(): Promise<void> {
        const response: Response = await fetch("/products.json");
        const data = await response.json();

        const cart: string = localStorage.getItem("cart") || "[]";
        localStorage.setItem("products", JSON.stringify(data));
        if (!cart) {
            localStorage.setItem("cart", "[]");
        }
    }
    public renderList(items: ProductInterface[]): void {
        const productDOM = document.querySelector(".products-container") as Element;
        if (productDOM) {
            productDOM.innerHTML = "";
            for (let product of items) {
                const element: HTMLElement = document.createElement('article');
                element.classList.add('product');
                element.innerHTML = `
                <div class="img-container">
                    <img src="${product.image}" class="product-img" alt="" />
                </div>
                <div class="product-footer">
                    <h5 class="product-name">${product.title}</h5>
                    <span class="company-btn">${product.company}</span>
                     <span class="product-price">£${product.price}</span>
                </div>`;


                if (productDOM) {
                    productDOM.appendChild(element);
                }
            }
        }
    }
}

export class NewProduct{
    productList: ProductList;
    constructor(productDOM: Element) {

        this.productList = new ProductList(productDOM);
    }
}
export const newProduct = new NewProduct(productDOM);