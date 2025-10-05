import { defineStore } from "pinia";

export let wishListStore = defineStore("wishList", {
  state: () => ({
    wishList: JSON.parse(localStorage.getItem("wishList") || "[]"),
  }),
  actions: {
    addItemInWishList(p) {
      const existingItem = this.wishList.find((i) => i.id === p.id);
      if (!existingItem) {
        this.wishList.push(p);
        localStorage.setItem("wishList", JSON.stringify(this.wishList));
      } else {
        this.wishList = this.wishList.filter((i) => i.id != p.id);
        localStorage.setItem("wishList", JSON.stringify(this.wishList));
      }
    },
    removeItemInWish(item) {
      this.wishList = this.wishList.filter((i) => i.id != item);
      localStorage.setItem("wishList", JSON.stringify(this.wishList));
    },
  },
});
