<template>
  <div class="new-pro pt-16">
    <v-container fluid>
      <!-- Title -->
      <div class="d-flex justify-space-between align-center mb-6">
        <h1 class="section-title font-bold">New Product</h1>
        <router-link
          :to="{
            name: 'product-category',
            params: {
              category: 'fragrances',
              title: 'Fragrances',
            },
          }"
        >
          <p class="text-blue-600 font-medium">Shop All</p>
        </router-link>
      </div>
      <v-row>
        <!-- skeleton-loader -->
        <v-col
          cols="12"
          md="8"
          v-if="!products.length"
          style="margin-top: 70px !important"
        >
          <v-row>
            <v-col cols="12" sm="4" v-for="num in 3" :key="num">
              <v-skeleton-loader type="image, article, button" />
            </v-col>
          </v-row>
        </v-col>
        <!-- == skeleton-loader == -->

        <v-col cols="12" md="8" v-else>
          <Swiper
            :modules="[Pagination]"
            :pagination="{ clickable: true }"
            :space-between="20"
            :slides-per-view="3"
            :loop="true"
            class="mySwiper custom-swiper py-16 overflow-hidden"
            grab-cursor
            :breakpoints="breakpoints"
          >
            <SwiperSlide v-for="p in products" :key="p.id">
              <v-card elevation="0" class="flash-card d-flex flex-column">
                <!-- Image -->
                <v-lazy>
                  <div class="image-banner">
                    <img
                      :src="showImg[p.id] ? showImg[p.id] : p.thumbnail"
                      :alt="p.title"
                    />
                    <v-btn @click="openQuick(p)" density="compact" class="quick"
                      >Quick View</v-btn
                    >
                  </div>
                </v-lazy>

                <!-- Title & decs -->
                <v-card-text class="flex-grow-1 px-0 pb-1">
                  <h3
                    class="text-subtitle-2 font-weight-bold mb-2 card-title text"
                  >
                    {{ p.title }}
                  </h3>
                  <p class="text-body-2 description text-truncate-3">
                    {{
                      p.description + " " + p.title.split(" ").length <= 6
                        ? p.description
                        : p.description.split(" ").slice(0, 6).join(" ") + "..."
                    }}
                  </p>
                </v-card-text>

                <!-- Rating && wishlist-->
                <div class="rating-wishlist mb-2">
                  <v-rating
                    v-model="p.rating"
                    readonly
                    density="comfortable"
                    half-increments
                    size="x-small"
                    color="yellow-darken-2"
                    class="rating"
                  />
                  <v-tooltip
                    :text="
                      findWishList.some((item) => item.id === p.id)
                        ? 'Remove from Wishlist'
                        : 'Add to Wishlist'
                    "
                    location="top"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        icon
                        variant="text"
                        size="small"
                        @click="addItemInWishList(p)"
                      >
                        <v-icon color="red">
                          {{
                            findWishList.some((item) => item.id === p.id)
                              ? "mdi-heart"
                              : "mdi-heart-outline"
                          }}
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip>
                </div>

                <!-- Price -->
                <v-card-text class="px-0 price">
                  <del class="text-grey-darken-1">${{ p.price }}</del> From
                  <span class="discount-price">
                    ${{
                      Math.floor(
                        p.price - p.price * (p.discountPercentage / 100)
                      )
                    }}
                  </span>
                </v-card-text>

                <!-- Toogle Image -->
                <v-btn-toggle
                  v-model="showImg[p.id]"
                  class="d-block mb-3"
                  mandatory
                >
                  <v-tooltip
                    v-for="(img, i) in p.images"
                    :key="i"
                    text="Choose image"
                    location="top"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        :value="img"
                        size="x-small"
                        rounded="lg"
                        v-bind="props"
                      >
                        <v-lazy>
                          <div class="ToggleImg">
                            <img
                              :src="img"
                              alt=""
                              style="
                                width: 70%;
                                height: 70%;
                                border-radius: 50%;
                                padding: 5px;
                              "
                            />
                          </div>
                        </v-lazy>
                      </v-btn>
                    </template>
                  </v-tooltip>
                </v-btn-toggle>

                <router-link
                  :to="{ name: 'product-details', params: { id: p.id } }"
                  class="route"
                >
                  <v-btn variant="outlined" class="choose-btn">
                    <span>Choose Options</span>
                  </v-btn>
                </router-link>
              </v-card>
            </SwiperSlide>
          </Swiper>
        </v-col>
        <!-- Col 2 -->
        <v-col cols="12" md="4" class="d-flex order-first order-md-last">
          <v-lazy>
            <img
              src="@/assets/new-banner.webp"
              alt=""
              class="w-100"
              style="height: 520px; object-fit: contain"
          /></v-lazy>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<!-- JS -->
<script setup>
import { ref, inject, defineProps, computed } from "vue";
import { wishListStore } from "@/stores/Wishlist";

// Swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

let wishStore = wishListStore();
let addItemInWishList = wishStore.addItemInWishList;
let findWishList = computed(() => wishStore.wishList);

let showImg = ref({});

const breakpoints = {
  // when window width is >= 0px
  0: {
    slidesPerView: 1,
  },
  // when window width is >= 600px
  600: {
    slidesPerView: 2,
  },
  // when window width is >= 768px
  768: {
    slidesPerView: 3,
  },
};
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  index: Number,
});

const Emitter = inject("Emitter");

//  open dialog
function openQuick(product) {
  Emitter.emit("openQuickView", product);
}
</script>

<!-- Styleng -->
<style lang="scss" scoped>
// Title Card
.card-title {
  font-size: 1rem;
  font-weight: 700;
}
.rating-wishlist {
  display: flex;
  align-items: center;
}

/* Image Banner in homeView*/

// Prise
.discount-price {
  color: rgb(22, 24, 128);
  font-weight: bold;
}

////////////////////
/* Toggle Image Style In File HomeView*/
// Choos BTN Style In File HomeView

@media (max-width: 600px) {
  .flash-card {
    .card-title {
      text-align: center;
    }
    .image-banner,
    .rating,
    .description {
      text-align: center !important;
      margin: 0 auto !important;
    }
    .price {
      margin: 0 auto !important;
    }
    .rating {
      margin-bottom: 5px !important;
    }
    .route {
      width: 100% !important;
      margin: auto 0 auto 30px !important;
    }
    .choose-btn {
      max-width: 100% !important;
    }
    .v-btn-toggle {
      overflow: hidden !important;
      margin: 20px auto !important;
    }
  }
  .description {
    margin-top: 10px !important;
  }
  .rating-wishlist {
    flex-direction: column;
  }
}
</style>
