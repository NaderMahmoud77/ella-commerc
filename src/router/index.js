import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductCategory from "@/views/ProductCategory.vue";
import ProductDetails from "@/views/ProductDetails.vue";
import CartPage from "@/views/CartPage.vue";
import Chakeoute from "@/views/ChakeutePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/products/:category/:title",
    name: "product-category",
    component: ProductCategory,
  },
  {
    path: "/products/:id",
    name: "product-details",
    component: ProductDetails,
  },
  {
    path: "/cart-page",
    name: "cart_page",
    component: CartPage,
  },
  {
    path: "/chakeoute-page",
    name: "chakeoute_page",
    component: Chakeoute,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
