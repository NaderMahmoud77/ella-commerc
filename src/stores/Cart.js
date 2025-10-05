import { defineStore } from "pinia";

export let CartStore = defineStore("cartStore", {
  state: () => ({
    cartStore: [],
  }),
  actions: {
    addItems(item) {
      const existingItem = this.cartStore.find((p) => p.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        this.cartStore.push(structuredClone(item));
      }
      localStorage.setItem("cart-items", JSON.stringify(this.cartStore));
    },
    getItems() {
      if (localStorage.getItem("cart-items")) {
        this.cartStore = JSON.parse(localStorage.getItem("cart-items"));
      }
    },
    deleteItem(id) {
      this.cartStore = this.cartStore.filter((e) => e.id != id);
      localStorage.setItem("cart-items", JSON.stringify(this.cartStore));
    },
    setToLoalStorage() {
      localStorage.setItem("cart-items", JSON.stringify(this.cartStore));
    },
    clearDataOnLocal() {
      this.cartStore = [];
      localStorage.removeItem("cart-items");
    },
  },
});
