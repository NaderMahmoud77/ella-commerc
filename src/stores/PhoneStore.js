import axios from "axios";
import { defineStore } from "pinia";

export let PhoneStore = defineStore("phoneStore", {
  state: () => ({
    phones: [],
  }),
  actions: {
    async getPhones() {
      await axios
        .get("https://dummyjson.com/products/search?q=phone")
        .then((res) => {
          this.phones = res.data.products.filter(
            (e) => e.category === "smartphones"
          );
        });
    },
  },
});
