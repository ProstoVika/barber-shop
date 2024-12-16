import './styles.css'
import {ProductList} from "./lego/product";
import {Filter} from "./lego/filter";



export class MainController {
    private readonly productList: ProductList;
    private filter: Filter;
    private readonly productDOM: Element;
    private readonly line: HTMLElement;
    private readonly content: HTMLElement;

    constructor() {
        this.productDOM = document.querySelector(".products-container")!;
        this.productList = new ProductList(this.productDOM);
        this.filter = new Filter(this.productList);
        this.line = document.getElementById('line')!;

        this.content = document.querySelector(".content")!;
        this.updateView();
        window.addEventListener('scroll', this.progressBar.bind(this));



        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    private progressBar() {
        let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let width_progress_line = (windowScroll / windowHeight) * 100;
        this.line.style.width = width_progress_line + '%';
    }
    private handleScroll() {
        this.progressBar();

        const scrollPosition = window.scrollY;
        if (scrollPosition > 90) {
            this.content.classList.add("hidden");
        } else {
            this.content.classList.remove("hidden");
        }
    }

    private updateView = async (): Promise<void> => {
        try {
            await this.productList.fetchProducts();
            const filteredProducts = this.filter.getFilteredProducts();
            this.filter.filterRenderProducts(filteredProducts);
            this.progressBar();
        } catch (error) {
            console.error("Error updating view:", error);
        }
    };


}


export const mainController = new MainController();

