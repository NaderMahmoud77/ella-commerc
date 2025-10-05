<template>
  <div style="padding-block: 50px" class="product-details">
    <!-- title -->
    <h3 class="title-page text">Product Details</h3>

    <!--  skeleton-loader  -->
    <v-container v-if="loading" class="py-16">
      <v-row>
        <!-- banner -->
        <v-col cols="12" md="7" class="d-flex flex-column align-center">
          <v-skeleton-loader
            type="image"
            class="mb-6"
            style="height: 500px; width: 300px; border-radius: 16px"
          />
          <!-- toggle-->
          <div class="d-flex" style="gap: 20px">
            <v-skeleton-loader
              v-for="i in 3"
              :key="i"
              type="image"
              style="height: 80px; width: 80px; border-radius: 12px"
            />
          </div>
        </v-col>

        <!-- details-->
        <v-col cols="12" md="5">
          <v-skeleton-loader type="heading" class="mb-4" width="70%" />
          <v-skeleton-loader type="text" class="mb-3" width="50%" />
          <v-skeleton-loader type="text" class="mb-3" width="90%" />
          <v-skeleton-loader type="text" class="mb-3" width="80%" />

          <v-skeleton-loader type="text" class="mb-6" width="40%" />

          <v-skeleton-loader type="text" class="mb-4" width="60%" />

          <v-skeleton-loader type="button" width="230" height="56" />
        </v-col>
      </v-row>
    </v-container>

    <!-- == skeleton-loader == -->

    <v-container class="py-16" v-else>
      <v-row>
        <v-col cols="12" md="6" class="card-image">
          <!-- Image -->
          <div class="banner">
            <img
              :src="showImg[productDetails.title] || productDetails.thumbnail"
              :alt="productDetails.title"
              class="w-100"
            />
          </div>

          <!-- Toogle Image -->
          <v-tabs
            height="100"
            width="100"
            v-model="showImg[productDetails.title]"
            class="toggle-btn"
            center-active
            color="deep-purple-accent-4"
          >
            <v-tab
              v-for="(img, i) in productDetails.images"
              :value="img"
              :key="i"
              size="x-small"
            >
              <div class="imgToggle">
                <img :src="img" alt="" />
              </div>
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="12" md="6">
          <h3>
            ({{ productDetails.title }}) Sample -
            {{ productDetails.category }} For Sale
          </h3>

          <!-- Rating & stock -->
          <div class="d-flex items-center" style="gap: 7px">
            <v-rating
              v-model="productDetails.rating"
              readonly
              density="comfortable"
              half-increments
              size="x-small"
              color="yellow-darken-2"
              class="mb-2"
            />
            <p class="stock">
              Stock : <span>{{ productDetails.stock }}</span>
            </p>
          </div>
          <!-- wishList -->
          <div>
            Add to wishlist:
            <v-tooltip
              :text="
                wishList.some((item) => item.id === productDetails.id)
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
                  @click="
                    addItemInWishList(productDetails),
                      showSnackAddWish(productDetails)
                  "
                >
                  <v-icon color="red">
                    {{
                      wishList.some((item) => item.id === productDetails.id)
                        ? "mdi-heart"
                        : "mdi-heart-outline"
                    }}
                  </v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </div>
          <!-- Descreption -->
          <div class="desc">
            {{ productDetails.description }}
          </div>
          <!-- Content -->
          <p v-show="productDetails.brand" class="brand">
            Brand: <span>{{ productDetails.brand }}</span>
          </p>
          <p class="availabil">
            Availability: <span>{{ productDetails.availabilityStatus }}</span>
          </p>
          <!-- Price -->
          <div>
            Price:
            <del class="price">${{ productDetails.price }}</del>
            From
            <span class="discount-price text">
              ${{
                Math.floor(
                  productDetails.price -
                    productDetails.price *
                      (productDetails.discountPercentage / 100)
                )
              }}
            </span>
          </div>
          <!-- Quantity -->
          <div>
            <p class="quantity">Quantity</p>
            <v-icon class="minus" size="22" @click="quantity > 1 && quantity--"
              >mdi-minus</v-icon
            >
            <input type="number" v-model="quantity" min="1" />
            <v-icon class="plus" size="22" @click="quantity++">mdi-plus</v-icon>
          </div>
          <!-- subTotal -->
          <div class="sub-total">
            Subtotal:
            <span class="text"
              >${{
                Math.floor(
                  productDetails.price -
                    productDetails.price *
                      (productDetails.discountPercentage / 100)
                ) * quantity
              }}</span
            >
          </div>

          <!-- Btn Add To Cart -->
          <v-btn
            variant="outlined"
            class="add-cart"
            @click="addToCart(productDetails)"
            :loading="btnLoading"
          >
            <span>Add To Cart</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<!-- JS -->
<script>
import { ProductModule } from "@/stores/ProductStore";
import { CartStore } from "@/stores/Cart";
import { wishListStore } from "@/stores/Wishlist";

import { mapActions, mapState } from "pinia";

export default {
  inject: ["Emitter"],

  data: () => ({
    showImg: {},
    quantity: 1,
    loading: false,
    btnLoading: false,
  }),
  computed: {
    ...mapState(ProductModule, ["productDetails"]),
    ...mapState(wishListStore, ["wishList"]),
  },
  methods: {
    ...mapActions(ProductModule, ["getProductDetails"]),
    ...mapActions(CartStore, ["addItems"]),
    ...mapActions(wishListStore, ["addItemInWishList"]),

    addToCart(item) {
      item.quantity = this.quantity;
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
        this.addItems(item);
        this.Emitter.emit("openCart");
        this.Emitter.emit("showMsg", {
          title: item.title,
          msg: "Item added to your cart",
        });
      }, 1000);
    },
    showSnackAddWish(product) {
      if (this.wishList.some((item) => item.id === product.id)) {
        this.Emitter.emit("showMsg", {
          title: product.title,
          msg: "Added to your wishlist!",
        });
      } else {
        this.Emitter.emit("showMsg", {
          title: product.title,
          msg: "Removed from your wishlist!",
        });
      }
    },
  },
  async mounted() {
    document.documentElement.scrollTo(0, 0);
    this.loading = true;
    await this.getProductDetails(this.$route.params.id);
    this.loading = false;
  },
};
</script>

<!-- styleng -->
<style lang="scss" scoped>
.product-details {
  line-height: 1.6;
  padding: 30px 0;

  .card-image {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .banner {
    height: 420px;
    width: 420px;
    margin-bottom: 25px;

    img {
      height: 100%;
      border-radius: 16px;
      object-fit: contain;
      box-shadow: 0 6px 20px rgba(63, 81, 181, 0.35);
    }
  }

  /* ------- Toggle Images ------- */
  .toggle-btn {
    margin-top: 20px;

    .imgToggle {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      transition: all 0.3s ease;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      &:hover {
        transform: translateY(-3px);
      }
    }
  }

  /* ------- Info Section ------- */
  h3 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #1a237e;
    margin-bottom: 20px;
  }

  .desc {
    font-size: 1rem;
    color: #666;
    line-height: 1.8;
    margin: 20px 0;
  }

  .brand,
  .stock,
  .availabil,
  .sub-total {
    margin-bottom: 10px;
    font-size: 0.95rem;
    color: #444;

    span {
      font-size: 1rem;
      color: #3f51b5;
      font-weight: 600;
    }
  }
  .sub-total {
    margin: 15px 0 0;
  }
  .price {
    color: #1a237e;
  }
  .discount-price {
    font-size: 1.4rem;
    font-weight: 800;
    margin-left: 10px;
  }

  /* ------- Quantity ------- */
  .quantity {
    font-weight: 700;
    margin: 20px 0 12px;
    color: #3f51b5;
  }

  //  input in homeView
  .minus,
  .plus {
    cursor: pointer;
    color: #3f51b5 !important;
    transition: transform 0.25s ease, color 0.25s ease;

    &:hover {
      transform: scale(1.3);
      color: #1a237e;
    }
  }

  /* ------- Add To Cart ------- */
  .add-cart {
    margin-top: 28px;
    width: 230px;
    height: 56px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1rem;
    color: #fff !important;
    border: none !important;
    background: linear-gradient(135deg, #5c6bc0, #3f51b5, #1a237e);
    box-shadow: 0 6px 20px rgba(63, 81, 181, 0.35);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 28px rgba(63, 81, 181, 0.5);
    }
  }
}

@media (max-width: 960px) {
  .product-details {
    padding: 90px 0 30px !important;
    .card-image {
      margin-bottom: 40px;
    }

    .banner {
      height: 300px;
      width: 300px;
    }
    .toggle-btn {
      .imgToggle {
        width: 60px;
        height: 60px;
      }
    }
    h3 {
      font-size: 1.4rem;
    }
    .discount-price {
      font-size: 1.2rem;
    }
    .add-cart {
      width: 200px;
      height: 50px;
      font-size: 0.9rem;
    }
  }
}
</style>
