<template>
  <div class="fixed-nav">
    <v-app-bar color="rgb(22, 24, 128)">
      <v-container fluid>
        <v-row class="d-flex align-center">
          <v-col cols="3">
            <router-link :to="{ name: 'home' }">
              <v-lazy>
                <img
                  src="@/assets/logo-app.png"
                  alt="logo"
                  class="cursor-pointer"
                />
              </v-lazy>
            </router-link>
          </v-col>
          <v-col cols="7">
            <ul class="d-flex justify-space-between" style="list-style: none">
              <li v-for="category in categories" :key="category.title">
                <v-tooltip
                  location="bottom"
                  transition="fade-transition"
                  open-delay="150"
                  close-delay="100"
                  :text="'Go to ' + category.title + ' category'"
                >
                  <template v-slot:activator="{ props }">
                    <router-link
                      v-bind="props"
                      :class="
                        $route.params.title === category.title
                          ? 'route valid'
                          : 'route'
                      "
                      :to="{
                        name: 'product-category',
                        params: {
                          category: category.route,
                          title: category.title,
                        },
                      }"
                      class="route-link"
                    >
                      {{ category.title }}
                      <v-icon size="18" color="primary" class="link-icon">
                        mdi-link-variant
                      </v-icon>
                    </router-link>
                  </template>
                </v-tooltip>
              </li>
            </ul>
          </v-col>
          <v-col
            cols="2"
            class="d-flex justify-end align-center"
            style="gap: 20px"
          >
            <!-- wishlist -->
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
                    <v-icon size="30" :color="wishList.length ? 'red' : 'grey'">
                      {{ wishList.length ? "mdi-heart" : "mdi-heart-outline" }}
                    </v-icon>
                  </v-btn>
                </div>
              </template>
            </v-tooltip>
            <!-- cart -->
            <v-tooltip
              text="Open Cart"
              location="bottom"
              transition="fade-transition"
            >
              <template v-slot:activator="{ props }">
                <div
                  v-bind="props"
                  @click="openCart"
                  class="cart"
                  :style="`pointer-events: ${
                    $route.name == 'cart_page' ? 'none' : 'unset'
                  }`"
                >
                  <v-badge
                    color="#2196f3"
                    :content="cartStore.length"
                    v-if="cartStore.length"
                    class="badge"
                  ></v-badge>
                  <v-btn icon elevation="0" class="icon-btn">
                    <v-icon size="30" :color="cartStore.length ? '' : 'grey'"
                      >mdi-cart-outline</v-icon
                    >
                  </v-btn>
                </div>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import { ProductModule } from "@/stores/ProductStore";
import { CartStore } from "@/stores/Cart";
import { wishListStore } from "@/stores/Wishlist";

import { mapState } from "pinia";
export default {
  inject: ["Emitter"],
  computed: {
    ...mapState(ProductModule, ["categories"]),
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
  },
};
</script>
<style lang="scss" scoped>
.route,
.valid {
  position: relative;
  padding: 6px 0;
  transition: color 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, #d1c4e9, #9575cd, #5c6bc0);
    transition: width 0.3s ease;
  }
}
.route {
  &:hover {
    &::after {
      width: 100%;
    }
  }
}
.valid {
  &::after {
    width: 85%;
  }
}
.route-link {
  position: relative;
  transition: color 0.3s ease;
}

.route-link .link-icon {
  opacity: 0;
  transform: translateY(3px);
  transition: 0.3s ease;
}

.route-link:hover .link-icon {
  opacity: 1;
  transform: translateY(0);
}

.wishlist,
.cart {
  position: relative;
  .badge {
    position: absolute;
    z-index: 100;
  }
}
.wishlist {
  .badge {
    right: 13px;
    top: 12px;
  }
}
.cart {
  .badge {
    right: 6px;
    top: 6px;
  }
}

@media (max-width: 1160px) {
  .route {
    font-size: 14px;
  }
}
</style>
