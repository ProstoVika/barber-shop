import './products.css'
import {Filter} from "../../lego/filter";
import {productDOM, ProductList} from "../../lego/product";




export class MainController {
    private readonly productList: ProductList;
    private filter: Filter;
    private readonly productDOM: Element;
    private readonly line: HTMLElement;

    constructor(productDOM: Element) {
        this.productDOM = document.querySelector(".products-container")!;
        this.productList = new ProductList(this.productDOM);
        this.filter = new Filter(this.productList);
        this.line = document.getElementById('line')!;

        this.updateView();
        window.addEventListener('scroll', this.progressBar);
    }
    private progressBar() {
        let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let width_progress_line = (windowScroll / windowHeight) * 100;
        this.line.style.width = width_progress_line + '%';
    }

    private updateView = async (): Promise<void> => {
        await this.productList.fetchProducts();
        const filteredProducts = this.filter.getFilteredProducts();
        this.filter.filterRenderProducts(filteredProducts);
        this.progressBar();
    }
}


export const mainController = new MainController(productDOM);

