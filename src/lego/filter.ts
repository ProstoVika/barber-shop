import {ProductList} from "./product";
import {ProductInterface} from "../inter/interfaces";

export class Filter {
    private productList: ProductList;
    private products: ProductInterface[];
    private searchWord: string;
    private company: string;


    constructor(productList: ProductList) {
        this.productList = productList;
        this.products = [];
        this.searchWord = "";
        this.company = "";
        this.initFilter();
    }

    private setSearchWord(word: string): void {
        this.searchWord = word.trim().toLowerCase();
    }

    private setCompany(company: string): void {
        this.company = company;
    }



    public filterProducts(): ProductInterface[] {
        return this.products.filter((product) => {
            return (
                product.title.indexOf(this.searchWord) !== -1 && (this.company ? product.company === this.company : true) && product.price
            );
        });
    }

    public getFilteredProducts(): ProductInterface[] {
        return this.filterProducts();
    }

    public filterRenderProducts(filteredProducts: ProductInterface[]): void {
        this.productList.renderList(filteredProducts);
    }

    public upgradeProducts(): void {
        if (this.products) {
            const filteredProducts = this.getFilteredProducts();
            this.filterRenderProducts(filteredProducts);
        }
    }

    public filterByColorWine(color: string): void {
        this.setCompany(color);
        this.upgradeProducts();
    }

    public filterByPriceWine(): void {

        this.upgradeProducts();
    }

    public filterBySearchWine(searchWord: string): void {
        this.setSearchWord(searchWord);
        this.upgradeProducts();
    }

    public resetFiltersWine(): void {
        const slider = document.querySelector(".slider") as HTMLInputElement;
        if (slider) {
            slider.value = "100";
        }
        this.setSearchWord("");
        this.setCompany("");
        this.upgradeProducts();
        const rangeLabel = document.getElementById("range-label");
        if (rangeLabel) {
            rangeLabel.innerText = "100$";
        }
    }

    public addEventListeners(): void {
        const hairStyling = document.getElementById("hair styling");
        const beard = document.getElementById("beard");
        const hairCare = document.getElementById("hair care");
        const allButton = document.getElementById("all");
        const searchInput = document.querySelector(".search-txt") as HTMLInputElement;

        const reset = document.querySelector("#reset");

        hairStyling?.addEventListener("click", (): void => {
            this.filterByColorWine('hair styling');
        });

        beard?.addEventListener("click", (): void => {
            this.filterByColorWine('beard');
        });

        hairCare?.addEventListener("click", (): void => {
            this.filterByColorWine('hair care');
        });

        allButton?.addEventListener("click", (): void => {
            this.filterByColorWine('');
        });

        if (searchInput) {
            searchInput.addEventListener("keyup", (e: KeyboardEvent): void => {
                const searchWord = (e.target as HTMLInputElement).value;
                this.filterBySearchWine(searchWord);
            });
        }


        reset?.addEventListener("click", (): void => {
            this.setSearchWord('');
            this.setCompany('');
            this.resetFiltersWine();
        });
    }

    private async initFilter(): Promise<void> {
        await this.productList.fetchProducts();
        const products: ProductInterface[] = await this.productList.getProducts();
        this.products = products;
        this.addEventListeners();
        this.productList.renderList(products);
    }
}

