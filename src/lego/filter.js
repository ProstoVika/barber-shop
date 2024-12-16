"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = void 0;
var Filter = /** @class */ (function () {
    function Filter(productList) {
        this.productList = productList;
        this.products = [];
        this.searchWord = "";
        this.company = "";
        this.priceRange = 100;
        this.initFilter();
    }
    Filter.prototype.setSearchWord = function (word) {
        this.searchWord = word.trim().toLowerCase();
    };
    Filter.prototype.setCompany = function (company) {
        this.company = company;
    };
    Filter.prototype.setPriceRange = function (price) {
        this.priceRange = price;
    };
    Filter.prototype.filterProducts = function () {
        var _this = this;
        return this.products.filter(function (product) {
            return (product.title.indexOf(_this.searchWord) !== -1 && (_this.company ? product.company === _this.company : true) && product.price <= _this.priceRange);
        });
    };
    Filter.prototype.getFilteredProducts = function () {
        return this.filterProducts();
    };
    Filter.prototype.filterRenderProducts = function (filteredProducts) {
        this.productList.renderList(filteredProducts);
    };
    Filter.prototype.upgradeProducts = function () {
        if (this.products) {
            var filteredProducts = this.getFilteredProducts();
            this.filterRenderProducts(filteredProducts);
        }
    };
    Filter.prototype.filterByColorWine = function (color) {
        this.setCompany(color);
        this.upgradeProducts();
    };
    Filter.prototype.filterByPriceWine = function (price) {
        this.setPriceRange(price);
        this.upgradeProducts();
    };
    Filter.prototype.filterBySearchWine = function (searchWord) {
        this.setSearchWord(searchWord);
        this.upgradeProducts();
    };
    Filter.prototype.resetFiltersWine = function () {
        var slider = document.querySelector(".slider");
        if (slider) {
            slider.value = "100";
        }
        this.setSearchWord("");
        this.setCompany("");
        this.setPriceRange(100);
        this.upgradeProducts();
        var rangeLabel = document.getElementById("range-label");
        if (rangeLabel) {
            rangeLabel.innerText = "100$";
        }
    };
    Filter.prototype.addEventListeners = function () {
        var _this = this;
        var redButton = document.getElementById("red");
        var whiteButton = document.getElementById("white");
        var roseButton = document.getElementById("rose");
        var sparklingButton = document.getElementById("sparkling");
        var allButton = document.getElementById("all");
        var searchInput = document.querySelector(".search-txt");
        var slider = document.querySelector(".slider");
        var reset = document.querySelector("#reset");
        redButton === null || redButton === void 0 ? void 0 : redButton.addEventListener("click", function () {
            _this.filterByColorWine('red');
        });
        whiteButton === null || whiteButton === void 0 ? void 0 : whiteButton.addEventListener("click", function () {
            _this.filterByColorWine('white');
        });
        roseButton === null || roseButton === void 0 ? void 0 : roseButton.addEventListener("click", function () {
            _this.filterByColorWine('rose');
        });
        sparklingButton === null || sparklingButton === void 0 ? void 0 : sparklingButton.addEventListener("click", function () {
            _this.filterByColorWine('sparkling');
        });
        allButton === null || allButton === void 0 ? void 0 : allButton.addEventListener("click", function () {
            _this.filterByColorWine('');
        });
        if (searchInput) {
            searchInput.addEventListener("keyup", function (e) {
                var searchWord = e.target.value;
                _this.filterBySearchWine(searchWord);
            });
        }
        if (slider) {
            var rangeLabel_1 = document.getElementById("range-label");
            if (rangeLabel_1) {
                slider.addEventListener("input", function (e) {
                    var price = parseInt(e.target.value);
                    rangeLabel_1.innerText = price + "$";
                    _this.filterByPriceWine(price);
                });
            }
        }
        reset === null || reset === void 0 ? void 0 : reset.addEventListener("click", function () {
            _this.setSearchWord('');
            _this.setCompany('');
            _this.setPriceRange(100);
            _this.resetFiltersWine();
        });
    };
    Filter.prototype.initFilter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productList.getProducts()];
                    case 1:
                        products = _a.sent();
                        this.products = products;
                        this.addEventListeners();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Filter;
}());
exports.Filter = Filter;
