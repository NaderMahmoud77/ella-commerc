<template>
  <div class="cart-page py-4">
    <v-container fluid>
      <v-row>
        <v-col cols="12" style="font-size: 13px">
          <strong>Home</strong>
          <v-icon color="#878484">mdi-chevron-right</v-icon> Your Cart
        </v-col>
        <!-- Title -->
        <v-col cols="12">
          <v-card-title class="title-page text mb-10 px-0 pb-0"
            >Your Cart</v-card-title
          >
        </v-col>
        <!-- ==== Title ==== -->
        <!-- Content when impty cart -->
        <v-col cols="12" class="py-0" v-if="!cartStore.length">
          <v-card-text class="px-0 py-1 empty">
            Free Shipping on orders over $10000.00
          </v-card-text>
          <img
            src="@/assets/empty-cart.webp"
            alt=""
            width="300"
            style="margin: 10px auto; display: block"
          />
          <v-card-text class="px-0 py-8 text-center empty">
            Your cart is currently empty.
          </v-card-text>
          <router-link :to="{ name: 'home' }" class="route">
            <v-btn variant="outlined" class="choose-btn choose-btn-empty">
              Continue Shopping
            </v-btn>
          </router-link>
        </v-col>
        <!-- == Content when impty cart == -->
        <!-- Proggres -->
        <v-col cols="12" class="py-0" v-if="cartStore.length">
          <div class="" style="position: relative">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="shipping-fast"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              class="svg-inline--fa fa-shipping-fast fa-w-20 fa-3x"
              width="25"
              :style="`
              position: absolute;
              bottom: 10px;
              z-index: 999;
              left: calc(${progressValue}% - 25px);
              transition: 0.2s all ease-in-out;
            `"
            >
              <path
                :fill="progressValue == 100 ? '#4CAF50' : '#3f51b5'"
                d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"
                class=""
              ></path>
            </svg>
            <v-progress-linear
              height="10"
              striped
              :color="progressValue == 100 ? 'green' : '#3f51b5'"
              :model-value="progressValue"
            >
            </v-progress-linear>
          </div>
          <v-card-text class="px-0 py-3" v-if="totalPriceAll <= 10000">
            Only <strong>${{ totalPriceAll }}</strong> Away from
            <strong>Free shipping!</strong>
          </v-card-text>
          <v-card-text class="px-0" v-else>
            Your order includes free shipping now!
          </v-card-text>
        </v-col>
        <!-- ===== Proggres ===== -->

        <!-- Product -->
        <v-col cols="12" md="8" class="mr-0 mr-md-2" v-if="cartStore.length">
          <div class="table"></div>
          <v-table>
            <thead>
              <tr>
                <th class="px-0">PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartStore" :key="item.id">
                <td style="width: 55%">
                  <v-row class="mb-2 title-category">
                    <v-col
                      cols="12"
                      sm="5"
                      class="d-flex justify-center justify-sm-start"
                    >
                      <img :src="item.thumbnail" alt="" class="product-img" />
                    </v-col>
                    <v-col cols="12" sm="7" class="text-center text-sm-start">
                      <v-card-text class="px-0 py-0 product-title">
                        ({{ item.title }})
                      </v-card-text>
                      <v-card-text class="px-0 py-0 product-category">
                        Category: {{ item.category }}
                      </v-card-text>
                    </v-col>
                  </v-row>
                </td>
                <td class="text" style="width: 15%">
                  <!-- Price -->
                  ${{
                    Math.floor(
                      item.price - item.price * (item.discountPercentage / 100)
                    )
                  }}
                </td>
                <td style="width: 15%">
                  <!-- Quantity -->
                  <div class="footer-cart">
                    <v-icon
                      size="16"
                      @click="item.quantity > 1 && item.quantity--"
                      >mdi-minus</v-icon
                    >
                    <input type="number" v-model="item.quantity" min="1" />
                    <v-icon size="16" @click="item.quantity++">mdi-plus</v-icon>
                  </div>
                </td>
                <td style="width: 15%">
                  ${{
                    Math.floor(
                      item.price - item.price * (item.discountPercentage / 100)
                    ) * item.quantity
                  }}
                </td>
                <td>
                  <!-- Btn delete -->
                  <v-icon @click="deleteDialog = item.id">mdi-delete</v-icon>
                  <v-dialog
                    :model-value="deleteDialog === item.id"
                    @update:modelValue="
                      (val) => {
                        if (!val) deleteDialog = null;
                      }
                    "
                    max-width="400"
                  >
                    <v-card>
                      <v-card-title class="text-h6">
                        Confirm Delete
                      </v-card-title>

                      <v-card-text>
                        Are you sure you want to delete this item?
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="deleteDialog = false">Cancel</v-btn>
                        <v-btn
                          color="red"
                          text
                          @click="
                            deleteItem(item.id);
                            deleteDialog = null;
                            showSnackDelete(item);
                          "
                          >Confirm</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-divider
            v-for="num in 3"
            :key="num"
            color="#000"
            length="100%"
          ></v-divider>
          <!-- Secure -->
          <v-card-text class="d-flex align-center px-0 mt-4" style="gap: 5px">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2 4 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-8-3z"
                  fill="black"
                />
                <path
                  d="M10 16.5 6.5 13l1.41-1.41L10 13.67l6.09-6.09L17.5 9l-7.5 7.5z"
                  fill="white"
                />
              </svg>
            </span>
            <span>Secure shopping guarantee</span>
          </v-card-text>
          <img src="@/assets/footer-images.webp" alt="logo" width="270" />
        </v-col>

        <!-- === Product === -->

        <!-- ORDER SUMMARY -->
        <v-col cols="12" md="3" v-if="cartStore.length" class="mt-6 mt-md-0">
          <v-card elevation="0">
            <v-card-title class="card-title px-0"> ORDER SUMMARY </v-card-title>
            <v-divider
              v-for="num in 4"
              :key="num"
              color="#000"
              length="100%"
            ></v-divider>
            <v-card-text class="subtotal">
              <span>Subtotal:</span>
              <strong>${{ totalPriceAll }}</strong>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="px-0">Get Shipping Estimate</v-card-text>
            <select class="select w-100">
              <option
                v-for="country in countrys"
                :key="country"
                :value="country"
              >
                {{ country }}
              </option>
            </select>
            <div class="d-flex align-center" style="margin-top: 10px; gap: 5px">
              <select class="select select-2">
                <option v-for="city in citys" :key="city" :value="city">
                  {{ city }}
                </option>
              </select>
              <input
                type="text"
                class="select input"
                placeholder="Postal Code"
              />
            </div>
            <v-card-actions>
              <v-btn variant="outlined" class="choose-btn my-4 w-100"
                >Calculate Shipping</v-btn
              >
            </v-card-actions>
            <v-divider class="ma-2 mb-4"></v-divider>
            <v-card-text>Coupon Code:</v-card-text>
            <input
              type="text"
              class="select coupon d-block w-100"
              placeholder="Enter Coupon Code"
            />
            <v-card-text class="will"
              >Coupon code will be applied on the checkout page</v-card-text
            >
            <v-divider class="my-2"></v-divider>
            <v-card-text class="subtotal mb-6">
              <span>Total:</span>
              <strong>${{ totalPriceAll }}</strong>
            </v-card-text>
            <v-divider class="pb-2"></v-divider>

            <v-btn
              variant="outlined"
              class="choose-btn choose-btn-1 w-100 mb-4"
              @click="toChakeoute()"
              >Proseed To Checkut</v-btn
            >
            <router-link :to="{ name: 'home' }" class="route">
              <v-btn variant="outlined" class="choose-btn w-100">
                Continue Shopping
              </v-btn>
            </router-link>
          </v-card>
        </v-col>
        <!-- ==== ORDER SUMMARY ==== -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { CartStore } from "@/stores/Cart";
import { mapActions, mapState } from "pinia";

export default {
  inject: ["Emitter"],
  data: () => ({
    deleteDialog: null,
    countrys: ["Egypt", "Syria", "Qatar", "UAE"],
    citys: ["Cairo", "Giza", "Ryiadh", "Abyss"],
  }),
  computed: {
    ...mapState(CartStore, ["cartStore"]),
    totalPriceAll() {
      let total = 0;
      this.cartStore.forEach((product) => {
        total +=
          Math.floor(
            product.price - product.price * (product.discountPercentage / 100)
          ) * product.quantity;
      });
      return total;
    },
    progressValue() {
      return parseInt((this.totalPriceAll / 10000) * 100) <= 100
        ? (this.totalPriceAll / 10000) * 100
        : 100;
    },
  },
  methods: {
    ...mapActions(CartStore, ["getItems", "deleteItem", "setToLoalStorage"]),
    toChakeoute() {
      this.setToLoalStorage();
      this.$router.push({ name: "chakeoute_page" });
    },
    showSnackDelete(product) {
      this.Emitter.emit("showMsg", {
        title: product.title,
        msg: "Removed from your cart!",
      });
    },
  },
  mounted() {
    document.documentElement.scrollTop = 0;
  },
};
</script>

<style lang="scss" scoped>
.title-page {
  text-align: start !important;
  font-size: 27px;
  &::after {
    position: absolute;
    margin-top: 5px;
    width: 40px;
  }
}
.table {
  width: 100%;
  overflow-x: auto;
}
thead {
  tr {
    th {
      font-size: 13px;
      font-weight: bold !important;
    }
    th:not(:first-child) {
      text-align: center !important;
    }
  }
}
tbody {
  tr {
    td:not(:first-child) {
      text-align: center;
    }
  }
}
.product-img {
  max-width: 100px;
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.product-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.product-category {
  font-size: 13px;
  color: #757575;
}

.footer-cart {
  display: flex;
  align-items: center;
  input[type="number"] {
    width: 60px;
    height: 30px;
    font-size: 0.9rem;
  }
}
.title-category {
  display: flex;
  align-items: center;
}
.category {
  font-size: 16px;
  margin-top: 7px;
  color: #525252;
}

.v-icon {
  cursor: pointer;
  color: #3f51b5 !important;
  transition: transform 0.25s ease, color 0.25s ease;

  &:hover {
    transform: scale(1.3);
    color: #1a237e;
  }
}
.card-title {
  font-size: 13px;
  font-weight: bold;
  padding-block: 16px;
}
.subtotal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0 15px;
}
.select {
  border: 1px solid #dbd5d5;
  border-radius: 30px;
  padding: 10px;
  font-size: 15px;
  color: #848787;
}
.select:focus {
  border-color: #3f51b5;
  outline: none;
}
.select-2 {
  width: 65%;
}
.input {
  width: 35%;
}
.choose-btn,
.choose-btn-1 {
  height: 40px !important;
}
.choose-btn-1 {
  margin-block: 10px;
  background: linear-gradient(90deg, #1565c0, #1e88e5, #42a5f5);
  color: white !important;
}
.coupon {
  margin: 10px 0;
}
.will {
  font-size: 13px;
  color: #848787;
}
// Empty cart
.empty {
  font-size: 16px;
  color: #848787;
}
.choose-btn-empty {
  width: 300px !important;
  margin: 10px auto 80px !important;
  display: block !important;
}

@media (max-width: 767px) {
  .product-img {
    max-width: 150px;
    margin-bottom: 8px;
  }
  .subtotal {
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>
