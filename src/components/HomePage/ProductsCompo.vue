<template>
  <div class="flash pt-16 pb-16 px-5">
    <!-- العنوان + اللينك -->
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="section-title font-bold">{{ title }}</h1>
      <router-link
        v-if="category?.[index]"
        :to="{
          name: 'product-category',
          params: {
            category: category[index].route,
            title: category[index].title,
          },
        }"
      >
        <p class="text-blue-600 font-medium">Shop All</p>
      </router-link>
    </div>

    <!--  skeleton-loader  -->
    <v-container fluid v-if="!products.length" class="py-16">
      <v-row>
        <v-col cols="12" sm="4" md="3" v-for="num in 4" :key="num">
          <v-skeleton-loader type="image, article, button" />
        </v-col>
      </v-row>
    </v-container>
    <!-- == skeleton-loader == -->

    <v-container fluid v-else>
      <v-row>
        <Swiper
          :modules="[Navigation, Pagination, Autoplay]"
          :navigation="products.length > 5"
          :pagination="{ clickable: true }"
          :space-between="20"
          :autoplay="{
            delay: 2000,
            pauseOnMouseEnter: true,
          }"
          :loop="true"
          :breakpoints="breakpoints"
          class="mySwiper custom-swiper py-16 px-6 overflow-hidden"
          grab-cursor
        >
          <SwiperSlide v-for="p in products" :key="p.id">
            <v-card elevation="0" class="flash-card d-flex flex-column">
              <!-- Image -->
              <v-lazy>
                <div class="image-banner">
                  <img :src="showImg[p.title] || p.thumbnail" :alt="p.title" />
                  <v-btn @click="openQuick(p)" density="compact" class="quick">
                    Quick View
                  </v-btn>
                </div>
              </v-lazy>

              <!-- Title & decs -->
              <v-card-text class="flex-grow-1 px-0 pb-1">
                <h3 class="font-weight-bold mb-2 card-title text">
                  {{ p.title }}
                </h3>
                <p class="text-body-2 text-truncate-3 description">
                  {{
                    p.description + " " + p.title.split(" ").length <= 9
                      ? p.description
                      : p.description.split(" ").slice(0, 9).join(" ") +
                        "......"
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
                      @click="addItemInWishList(p), showSnackWish(p)"
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
              <v-card-text class="pl-0 pt-0 price">
                <del class="text-grey-darken-1">${{ p.price }}</del> From
                <span class="discount-price">
                  ${{
                    Math.floor(p.price - p.price * (p.discountPercentage / 100))
                  }}
                </span>
              </v-card-text>

              <!-- Toogle Image -->
              <v-btn-toggle
                v-model="showImg[p.title]"
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
                class="route"
                :to="{ name: 'product-details', params: { id: p.id } }"
              >
                <v-btn variant="outlined" class="choose-btn">
                  <span>Choose Options</span>
                </v-btn>
              </router-link>
            </v-card>
          </SwiperSlide>
        </Swiper>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ProductModule } from "@/stores/ProductStore";
import { wishListStore } from "@/stores/Wishlist";

import { inject } from "vue";

const Emitter = inject("Emitter");

//  open dialog
function openQuick(product) {
  Emitter.emit("openQuickView", product);
}
// Show Snackbar wishlist
function showSnackWish(product) {
  if (findWishList.value.some((item) => item.id === product.id)) {
    Emitter.emit("showMsg", {
      title: product.title,
      msg: "Added to your wishlist!",
    });
  } else {
    Emitter.emit("showMsg", {
      title: product.title,
      msg: "Removed from your wishlist!",
    });
  }
}
import { ref, defineProps, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

let productStore = ProductModule();
let category = productStore.categories;

let wishStore = wishListStore();
let addItemInWishList = wishStore.addItemInWishList;
let findWishList = computed(() => wishStore.wishList);

// eslint-disable-next-line no-unused-vars
let prop = defineProps({
  products: {
    type: Array,
    required: true,
  },
  title: String,
  index: Number,
});

const showImg = ref({});
const breakpoints = ref({
  0: {
    slidesPerView: 1,
  },
  600: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 3,
  },
  1024: {
    slidesPerView: 4,
  },
});
</script>

<style lang="scss" scoped>
/* Swiper */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  background: linear-gradient(90deg, #1a237e, #3f51b5, #5c6bc0);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  position: absolute;
}
:deep(.swiper-button-next) {
  right: 0px;
}
:deep(.swiper-button-prev) {
  left: 0px;
}
:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: linear-gradient(90deg, #1565c0, #1e88e5, #42a5f5);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 18px !important;
  font-weight: bold;
}

/* Title In HomeView*/

/* card */
.flash-card {
  height: 100%;
  padding: 10px;
  transition: 0.3s ease;
}

.flash-card:hover {
  transform: translateY(-5px) scale(1.05);
}
// Title Card
.card-title {
  font-size: 0.9rem;
}

.rating-wishlist {
  display: flex;
  align-items: center;
}

// Style Image Card in homView

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
      margin: auto 0 auto 16px !important;
    }
    .v-btn-toggle {
      overflow: hidden !important;
      margin: 0 auto 7px !important;
    }
  }
  .description {
    margin-top: 10px !important;
  }
  .rating-wishlist {
    flex-direction: column;
  }
}
@media (min-width: 768px) and (max-width: 1250px) {
  .image-banner {
    .quick {
      left: 38%;
    }
  }
}
</style>
