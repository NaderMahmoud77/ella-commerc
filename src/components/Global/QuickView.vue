<template>
  <div class="quick-pro">
    <v-dialog v-model="dialog" max-width="1000" max-height="595">
      <div class="close">
        <v-icon @click="dialog = false" color="yellow">mdi-close</v-icon>
      </div>
      <v-card elevation="0">
        <!--  skeleton-loader  -->
        <v-container v-if="loading" class="py-10 bg-white">
          <v-row>
            <!-- banner -->
            <v-col cols="12" md="6" class="d-flex flex-column align-center">
              <v-skeleton-loader
                type="image"
                class="mb-6"
                style="height: 200px; width: 100px; border-radius: 16px"
              />
              <!-- toggle-->
              <div class="d-flex" style="gap: 20px">
                <v-skeleton-loader
                  v-for="i in 3"
                  :key="i"
                  type="image"
                  style="height: 60px; width: 60px; border-radius: 12px"
                />
              </div>
            </v-col>

            <!-- details-->
            <v-col cols="12" md="6">
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

        <v-container class="py-10 bg-white" v-else>
          <v-row>
            <v-col cols="12" md="6" class="card-image">
              <!-- Image -->
              <div class="banner">
                <img
                  :src="
                    showImg[productDetails.title] || productDetails.thumbnail
                  "
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
              <div class="wishlist">
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
                {{
                  productDetails.description.split(" ").length < 19
                    ? productDetails.description
                    : productDetails.description
                        .split(" ")
                        .slice(0, 19)
                        .join(" ")
                }}
              </div>
              <!-- Content -->
              <p v-show="productDetails.brand" class="brand">
                Brand: <span>{{ productDetails.brand }}</span>
              </p>
              <p class="availabil">
                Availability:
                <span>{{ productDetails.availabilityStatus }}</span>
              </p>
              <!-- Price -->
              <div>
                <span class="price-text pr-2">Price:</span>
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
                <v-icon
                  class="ic-quan"
                  size="22"
                  @click="quantity > 1 && quantity--"
                  >mdi-minus</v-icon
                >
                <input type="number" v-model="quantity" min="1" />
                <v-icon class="ic-quan" size="22" @click="quantity++"
                  >mdi-plus</v-icon
                >
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
              <v-btn
                @click="addToCart(productDetails)"
                variant="outlined"
                class="add-cart"
                :loading="btnLoading"
              >
                <span>Add To Cart</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
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
    productDetails: [],
    showImg: {},
    quantity: 1,
    loading: false,
    dialog: false,
    btnLoading: false,
  }),
  computed: {
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
        this.dialog = false;
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
    this.loading = true;
    await this.Emitter.on("openQuickView", (product) => {
      this.quantity = 1;
      this.productDetails = product;
      this.dialog = true;
    });
    this.loading = false;
  },
};
</script>

<!-- styleng -->
<style lang="scss" scoped>
.close {
  position: absolute;
  right: -10px;
  top: -10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background: linear-gradient(90deg, #5c6bc0, #3f51b5, #1a237e);
}
.card-image {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.banner {
  height: 320px;
  width: 320px;
  margin-bottom: 25px;

  img {
    width: 100%;
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
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 20px;
}

.desc {
  font-size: 1rem;
  color: #666;
  line-height: 1.8;
  margin: 10px 0 20px;
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
.wishlist,
.price-text {
  color: #444;
}
.sub-total {
  margin: 15px 0 0;
}
.price {
  color: #1a237e;
}
.discount-price {
  font-size: 1.2rem;
  font-weight: 800;
  margin-left: 7px;
}

/* ------- Quantity ------- */
.quantity {
  font-weight: 700;
  margin: 20px 0 12px;
  color: #3f51b5;
}
.ic-quan {
  cursor: pointer;
  color: #3f51b5 !important;
  transition: transform 0.25s ease, color 0.25s ease;

  &:hover {
    transform: scale(1.3);
    color: #1a237e !important;
  }
}
/* ------- Add To Cart ------- */
.add-cart {
  margin-top: 20px;
  width: 230px;
  height: 56px !important;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  color: #fff !important;
  border: none !important;
  background: linear-gradient(135deg, #5c6bc0, #3f51b5, #1a237e);
  box-shadow: 0 6px 20px rgba(63, 81, 181, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 28px rgba(63, 81, 181, 0.2);
  }
}

@media (max-width: 960px) {
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
</style>
