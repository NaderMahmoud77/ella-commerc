<template>
  <div class="product-category">
    <!-- title -->
    <h1 class="title-page text">
      {{ $route.params.title || "Category" }}
    </h1>

    <!--  skeleton-loader  -->
    <v-container v-if="loading" class="py-16">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="num in 4" :key="num">
          <v-skeleton-loader type="image, article, button" />
        </v-col>
      </v-row>
    </v-container>
    <!-- == skeleton-loader == -->
    <v-container v-else>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(p, i) in productsCategory"
          :key="i"
        >
          <v-card elevation="0" class="flash-card d-flex flex-column">
            <!-- Image -->
            <v-lazy>
              <div class="image-banner">
                <img
                  :src="showImg[p.title] ? showImg[p.title] : p.thumbnail"
                  :alt="p.title"
                />
                <v-btn @click="openQuick(p)" density="compact" class="quick">
                  Quick View
                </v-btn>
              </div>
            </v-lazy>

            <!-- Title & decs -->
            <v-card-text class="flex-grow-1 px-0 pb-1">
              <h3 class="text-subtitle-2 font-weight-bold mb-2 card-title text">
                {{ p.title }}
              </h3>
              <p class="text-body-2 text-truncate-3">
                {{
                  p.description + " " + p.title.split(" ").length <= 9
                    ? p.description
                    : p.description.split(" ").slice(0, 9).join(" ") + "......"
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
              />
              <v-tooltip
                :text="
                  wishList.some((item) => item.id === p.id)
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
                        wishList.some((item) => item.id === p.id)
                          ? "mdi-heart"
                          : "mdi-heart-outline"
                      }}
                    </v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </div>

            <!-- Price -->
            <v-card-text class="pl-0 pt-0">
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// Data
import { ProductModule } from "@/stores/ProductStore";
import { wishListStore } from "@/stores/Wishlist";

import { mapActions, mapState } from "pinia";
export default {
  inject: ["Emitter"],
  data: () => ({
    showImg: {},
    loading: false,
  }),
  methods: {
    ...mapActions(ProductModule, ["getProductCategory"]),
    ...mapActions(wishListStore, ["addItemInWishList"]),

    //  open dialog
    openQuick(product) {
      this.Emitter.emit("openQuickView", product);
    },
  },
  computed: {
    ...mapState(ProductModule, ["productsCategory"]),
    ...mapState(wishListStore, ["wishList"]),
  },

  watch: {
    async $route() {
      document.documentElement.scrollTo(0, 0);
      this.loading = true;
      await this.getProductCategory(this.$route.params.category);
      this.loading = false;
    },
  },
  async mounted() {
    document.documentElement.scrollTo(0, 0);
    this.loading = true;
    await this.getProductCategory(this.$route.params.category);
    this.loading = false;
  },
};
</script>

<!-- style -->
<style scoped lang="scss">
// Style Title in homeView
.product-category {
  padding-block: 50px;
}
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
  font-size: 1rem;
  font-weight: 700;
}
/* Image Banner */
.image-banner {
  height: 180px;
  margin-bottom: 8px;
  overflow: hidden;
  cursor: pointer;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.05) translateY(-5px);
  }
  .quick {
    left: 35%;
  }
}

.rating-wishlist {
  display: flex;
  align-items: center;
}

// Prise
.discount-price {
  color: rgb(22, 24, 128);
  font-weight: bold;
}

////////////////////
/* Toggle Image Style In File HomeView*/
// Choos BTN Style In File HomeView
.choose-btn {
  font-size: 0.85rem;
  width: 100% !important;
}

// media
@media (max-width: 991px) {
  .product-category {
    padding-block: 100px;
  }
}

@media (max-width: 767px) {
  .flash-card {
    text-align: center;
    align-items: center;
    padding: 16px;
    border-radius: 16px;
    border: 1px solid rgba(63, 81, 181, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .flash-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(63, 81, 181, 0.5),
      0 0 15px rgba(92, 107, 192, 0.3) !important;
  }
  .image-banner {
    height: 150px;
    margin-bottom: 20px;
    .quick {
      width: 90px !important;
      left: 50%;
    }
  }

  .rating-wishlist {
    flex-direction: column;
    gap: 6px;
  }

  .route {
    width: 100%;
  }

  .choose-btn {
    font-size: 0.85rem;
    width: 100%;
  }
}
</style>
