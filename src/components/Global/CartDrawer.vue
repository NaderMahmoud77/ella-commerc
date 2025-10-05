<template>
  <div>
    <v-navigation-drawer
      class="drawer"
      v-model="drawer"
      temporary
      location="right"
      width="400"
    >
      <div class="close">
        <v-icon @click="drawer = false" color="white">mdi-close</v-icon>
      </div>
      <!-- card One -->
      <v-card elevation="0" class="cart px-4">
        <v-card-title class="title-page text mb-10 px-0"
          >Shopping Cart</v-card-title
        >
        <v-card-text class="item px-0"
          ><strong>{{ cartStore.length }}</strong> Items</v-card-text
        >
        <v-card-text class="free px-0 py-0" v-if="!cartStore.length">
          $10000 <span>purchases guarantee a</span> free shipping
        </v-card-text>
        <v-card-text class="empty mt-4" v-if="!cartStore.length">
          Your cart is currently empty
        </v-card-text>
        <v-card-actions v-if="!cartStore.length">
          <v-btn
            variant="outlined"
            class="choose-btn w-100"
            @click="drawer = false"
            >Continue Shopping</v-btn
          >
        </v-card-actions>
      </v-card>
      <!-- card Two -->
      <v-card elevation="0" class="cart-2 px-4" v-if="cartStore.length">
        <div class="bar-parent mt-4">
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
        <v-card-text class="only px-0" v-if="totalPriceAll <= 10000">
          Only <strong>${{ totalPriceAll }}</strong> Away from
          <strong>Free shipping!</strong>
        </v-card-text>
        <v-card-text class="only px-0" v-else>
          Your order includes free shipping now!
        </v-card-text>

        <!-- Product -->
        <v-container
          max-height="430"
          style="overflow: auto; margin-bottom: 10px"
        >
          <v-row class="product mb-4" v-for="item in cartStore" :key="item.id">
            <v-col cols="5">
              <img :src="item.thumbnail" alt="" class="w-100" />
            </v-col>
            <v-col cols="7">
              <v-card-text class="content px-0">
                ({{ item.title }}) Sample - {{ item.category }}
              </v-card-text>
              <v-card-text class="category px-0 py-0">
                Category: {{ item.category }}
              </v-card-text>
              <v-card-text class="discount-price text px-1">
                ${{
                  Math.floor(
                    item.price - item.price * (item.discountPercentage / 100)
                  ) * item.quantity
                }}
              </v-card-text>
              <!-- Quantity -->
              <div class="footer-cart">
                <div>
                  <v-icon
                    size="17"
                    @click="item.quantity > 1 && item.quantity--"
                    >mdi-minus</v-icon
                  >
                  <input type="number" v-model="item.quantity" min="1" />
                  <v-icon size="17" @click="item.quantity++">mdi-plus</v-icon>
                </div>
                <!-- Btn delete -->
                <v-tooltip text="Remove item" location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      @click="deleteDialog = item.id"
                      class="ml-2 delete-icon"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                </v-tooltip>

                <v-dialog
                  :model-value="deleteDialog === item.id"
                  @update:model-value="
                    (val) => {
                      if (val) deleteDialog = null;
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
                          deleteItem(item.id),
                            (deleteDialog = false),
                            showSnackDelete(item)
                        "
                        >Confirm</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <!-- == Product == -->
        <v-card-actions>
          <v-btn
            variant="outlined"
            class="choose-btn-2 w-50"
            @click="toChakeoute()"
            >Checkut</v-btn
          >
          <router-link :to="{ name: 'cart_page' }" class="route w-50">
            <v-btn variant="outlined" class="choose-btn w-100">View Cart</v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { CartStore } from "@/stores/Cart";
import { mapActions, mapState } from "pinia";
export default {
  inject: ["Emitter"],
  data: () => ({
    drawer: null,
    deleteDialog: false,
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
      return Math.min(parseInt((this.totalPriceAll / 10000) * 100), 100);
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
    this.Emitter.on("openCart", () => {
      this.drawer = !this.drawer;
    });
    this.getItems();
  },
  watch: {
    drawer(val) {
      if (val) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "";
      }
    },
  },
};
</script>

<!-- style -->
<style scoped lang="scss">
.drawer {
  padding: 30px 10px 30px !important;
}
.close {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background: linear-gradient(90deg, #5c6bc0, #3f51b5, #1a237e);
}
.cart {
  .item,
  .free span {
    color: #525252;
  }
  .empty {
    text-align: center;
    padding-block: 30px;
    font-weight: 600;
  }
  .choose-btn {
    height: 50px !important;
    font-weight: bold !important;
  }
}
.cart-2 {
  .bar-parent {
    position: relative !important;
  }
  .only {
    color: #525252 !important;
    margin-bottom: 15px !important;
  }
  .product {
    display: flex;
    align-items: center;
    .content,
    .category {
      line-height: 1.2;
      font-size: 13px;
      width: 100%;
    }
    .category {
      color: #525252;
    }
    // Prise
    .discount-price {
      font-weight: bold;
    }
    .footer-cart {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  input[type="number"] {
    width: 65px;
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
}
.delete-icon {
  transition: color 0.3s ease, transform 0.2s ease;

  &:hover {
    color: #e53935 !important;
  }
}
.choose-btn,
.choose-btn-2 {
  height: 50px !important;
  font-weight: bold !important;
}
.choose-btn-2 {
  color: white;
  border-radius: 25px !important;
  background: linear-gradient(90deg, #5c6bc0, #3f51b5, #1a237e);
  transition: 0.4s;
}
.choose-btn-2:hover {
  background: linear-gradient(90deg, #1565c0, #1e88e5, #42a5f5);
}
</style>
