<template>
  <div class="responsive-nav">
    <v-app-bar>
      <v-container fluid>
        <v-row align="center">
          <v-col cols="9">
            <router-link :to="{ name: 'home' }">
              <img
                src="@/assets/logo-2.webp"
                alt="logo"
                class="cursor-pointer"
                width="100"
              />
            </router-link>
          </v-col>
          <v-col cols="3" class="d-flex justify-end">
            <v-tooltip
              location="bottom"
              transition="fade-transition"
              text="View Wishlist"
            >
              <template v-slot:activator="{ props }">
                <div
                  class="icon-wrapper wishlist"
                  v-bind="props"
                  @click="openWish"
                >
                  <v-badge
                    v-if="wishList.length"
                    :content="wishList.length"
                    color="#2196f3"
                    class="badge"
                    floating
                  ></v-badge>

                  <v-btn icon elevation="0" class="icon-btn">
                    <v-icon size="28" :color="wishList.length ? 'red' : ''">
                      {{ wishList.length ? "mdi-heart" : "mdi-heart-outline" }}
                    </v-icon>
                  </v-btn>
                </div>
              </template>
            </v-tooltip>
            <!-- Cart -->
            <v-tooltip text="Open Cart" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn icon @click="openCart" v-bind="props">
                  <v-icon size="28">mdi-cart-outline</v-icon>
                  <v-badge
                    location="right top"
                    offset-y="-15"
                    offset-x="-3"
                    color="#2196f3"
                    :content="cartStore.length"
                    v-if="cartStore.length"
                  ></v-badge>
                </v-btn>
              </template>
            </v-tooltip>

            <!-- menu -->
            <v-tooltip text="Open Menu" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn icon @click="toggleMenu" v-bind="props">
                  <v-icon size="28">mdi-menu</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import { CartStore } from "@/stores/Cart";
import { wishListStore } from "@/stores/Wishlist";
import { mapState } from "pinia";
export default {
  inject: ["Emitter"],
  computed: {
    ...mapState(CartStore, ["cartStore"]),
    ...mapState(wishListStore, ["wishList"]),
  },
  methods: {
    openCart() {
      this.Emitter.emit("openCart");
    },
    openWish() {
      this.Emitter.emit("openWish");
    },
    toggleMenu() {
      this.Emitter.emit("toggleMenu");
    },
  },
};
</script>

<style scoped lang="scss">
.wishlist {
  position: relative;
  .badge {
    position: absolute;
    right: 16px;
    top: 15px;
    z-index: 100;
  }
}
</style>
