"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutController = exports.AboutController = void 0;
require("./about.css");
var cart_1 = require("../../lego/cart");
var product_1 = require("../../lego/product");
var AboutController = /** @class */ (function () {
    function AboutController() {
        this.cart = new cart_1.Cart();
        this.productList = new product_1.ProductList(product_1.productDOM, this.cart);
        window.addEventListener('scroll', this.progressBar);
    }
    AboutController.prototype.progressBar = function () {
        var line = document.getElementById('line');
        if (!line)
            return;
        var windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var width_progress_line = (windowScroll / windowHeight) * 100;
        line.style.width = width_progress_line + '%';
    };
    AboutController.prototype.initializeAboutPage = function () {
        var _this = this;
        console.log(window.origin);
        var cartContainer = document.getElementById('about-cart-container');
        if (cartContainer) {
            this.cart.cartContainer = cartContainer;
            this.cart.loadCart();
            this.cart.displayCartItems();
        }
        var cartButton = document.getElementById('cart-btn');
        if (cartButton) {
            cartButton.addEventListener('click', function () {
                _this.cart.CartVisibility();
                _this.cart.displayCartItems();
            });
        }
    };
    return AboutController;
}());
exports.AboutController = AboutController;
exports.aboutController = new AboutController();
exports.aboutController.initializeAboutPage();
