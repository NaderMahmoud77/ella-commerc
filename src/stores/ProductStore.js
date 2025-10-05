import axios from "axios";
import { defineStore } from "pinia";

export const ProductModule = defineStore("productmodule", {
  state: () => ({
    products: [],
    newProduct: [],
    groceries: [],
    mensWatch: [],
    categories: [
      {
        title: "Smart Phones",
        route: "smartphones",
      },
      {
        title: "Laptops",
        route: "laptops",
      },
      {
        title: "Motorcycle",
        route: "motorcycle",
      },
      {
        title: "Dresses",
        route: "womens-dresses",
      },
      {
        title: "Men's Shoes",
        route: "mens-shoes",
      },
      {
        title: "Men's watches",
        route: "mens-watches",
      },
      {
        title: "Fragrances",
        route: "fragrances",
      },
    ],
    productsCategory: [],
    productDetails: "",
  }),
  actions: {
    async gitProducts() {
      await axios
        .get("https://dummyjson.com/products?limit=100")
        .then((res) => {
          this.newProduct = res.data.products.filter(
            (el) => el.category === "fragrances"
          );
          this.groceries = res.data.products
            .filter((el) => el.category === "groceries")
            .slice(10, 20);
          this.mensWatch = res.data.products.filter(
            (el) => el.category === "mens-watches"
          );
          this.products = res.data.products.slice(0, 10);
        })
        .catch((err) => console.log(err));
    },

    async getProductCategory(category) {
      await axios
        .get(`https://dummyjson.com/products/category/${category}`)
        .then((res) => {
          this.productsCategory = res.data.products;
        });
    },

    async getProductDetails(id) {
      await axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
        this.productDetails = res.data;
      });
    },
  },
});
