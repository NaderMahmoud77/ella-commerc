<template>
  <v-container fluid class="py-12 px-16 checkout-page">
    <v-row>
      <!-- Left Section: Billing & Shipping -->
      <v-col cols="12" md="7">
        <v-card elevation="0">
          <v-card-title class="title-right px-0">new-ella-demo</v-card-title>
          <v-card-text class="chevron px-0">
            <strong>Cart</strong>
            <v-icon color="#878484">mdi-chevron-right</v-icon> information
          </v-card-text>
          <v-card-actions class="d-flex justify-space-between pa-0 mt-4">
            <v-btn class="btn shop-pay mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 120 30"
                width="100"
                height="20"
              >
                <rect
                  x="0"
                  y="0"
                  width="120"
                  height="30"
                  rx="6"
                  fill="#5A31F4"
                />
                <text
                  x="5"
                  y="20"
                  font-size="16"
                  font-family="Arial, sans-serif"
                  fill="#fff"
                  font-weight="bold"
                >
                  shop
                </text>
                <rect x="60" y="6" width="44" height="18" rx="3" fill="#fff" />
                <text
                  x="68"
                  y="20"
                  font-size="14"
                  font-family="Arial, sans-serif"
                  fill="#5A31F4"
                  font-weight="bold"
                >
                  Pay
                </text>
              </svg>
            </v-btn>
            <v-btn class="btn google-pay">
              <span class="google">G</span> Pay
            </v-btn>
          </v-card-actions>
          <!-- Form -->
          <v-card-title class="title-addres"> Shipping Address </v-card-title>
          <!-- select country -->
          <v-select
            :items="countries"
            label="Country"
            dense
            class="1"
          ></v-select>
          <div class="d-flex" style="gap: 10px">
            <v-text-field label="First Name" dense class="1" />
            <v-text-field label="Last Name" dense class="1" />
          </div>
          <v-text-field label="Address" dense class="1" />
          <v-text-field
            label="Apartment, suite, etc. (optional)"
            dense
            class="1"
          />
          <div class="d-flex" style="gap: 10px">
            <!-- select city -->
            <v-select
              :items="cities"
              label="City"
              dense
              class="mb-4"
            ></v-select>
            <!-- select state -->
            <v-select
              :items="['State 1', 'State 2', 'State 3']"
              label="State"
              dense
              class="mb-4"
            ></v-select>
            <v-text-field label="Postal Code" dense class="mb-4" />
          </div>
          <!-- Submiet -->
          <v-card-actions calss="actions">
            <v-btn
              @click="dialog = true"
              class="submit"
              height="45"
              width="150"
            >
              Submit
            </v-btn>
          </v-card-actions>
          <v-checkbox label="Email me with news and offers"></v-checkbox>
          <v-divider></v-divider>
          <v-card-text>All Rights Reserved new-ella-demo</v-card-text>
          <!-- === Form === -->
        </v-card>
      </v-col>

      <!-- Right Section: Order Summary -->
      <v-col cols="12" md="5">
        <v-card color="grey-lighten-3" elevation="0" class="pa-4 h-100">
          <v-card
            class="product pa-4 mb-2"
            v-for="item in cartStore"
            :key="item.id"
          >
            <v-badge :content="item.quantity" color="primary">
              <img :src="item.thumbnail" alt="" width="60" height="60" />
            </v-badge>
            <div class="flex-grow-1">
              <v-card-title class="title">{{ item.title }}</v-card-title>
              <v-card-text class="category">{{ item.category }}</v-card-text>
            </div>
            <v-card-subtitle class="price">
              ${{
                Math.floor(
                  item.price - item.price * (item.discountPercentage / 100)
                ) * item.quantity
              }}</v-card-subtitle
            >
          </v-card>
          <div class="my-4">
            <v-divider
              color="black"
              length="100%"
              v-for="n in 4"
              :key="n"
            ></v-divider>
          </div>
          <v-card-text
            class="d-flex align-center justify-space-between pa-4 font-weight-bold text-h6"
          >
            <span>Total:</span><span>${{ totalPriceAll }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- order success -->
  <OrderSuccess :popup="dialog" v-if="dialog" @close="dialog = false" />
  <!-- == order success == -->
</template>

<script>
import { CartStore } from "@/stores/Cart";
import { mapState } from "pinia";
import OrderSuccess from "@/components/Order-Success/OrderSuccess.vue";
export default {
  components: { OrderSuccess },
  data: () => ({
    dialog: false,
    countries: [
      "Egypt",
      "Saudi Arabia",
      "United Arab Emirates",
      "Kuwait",
      "Qatar",
      "Bahrain",
      "Oman",
      "Jordan",
      "Lebanon",
      "Palestine",
    ],
    cities: [
      "Cairo",
      "Riyadh",
      "Dubai",
      "Kuwait City",
      "Doha",
      "Manama",
      "Muscat",
      "Amman",
      "Beirut",
      "Gaza",
    ],
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
  },
  mounted() {
    document.documentElement.scrollTop = 0;
  },
};
</script>

<style scoped>
.title-right {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #3f51b5;
  margin-bottom: 18px;
}
.chevron {
  font-size: 14px;
}
.btn {
  flex-grow: 1;
  margin-top: 20px;
  font-weight: 900;
  height: 45px !important;
}
.shop-pay {
  font-weight: bold;
  background-color: #5a31f4;
  margin-right: 6px;
  font-size: 18px;
}
.google {
  font-weight: bold;
  background: linear-gradient(90deg, #4285f4, #ea4335, #fbbc05, #34a853);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-right: 6px;
  font-size: 18px;
}
.google-pay {
  font-weight: bold;
  background-color: #000;
  color: white;
}
/* v-text-field */
v-text-field {
  background-color: white !important;
}
.title-addres {
  display: block;
  margin-block: 40px 10px;
  font-size: 18px;
  font-weight: bold;
}

.submit {
  background-color: #3f51b5;
  color: white;
  font-weight: bold;
  margin: 10px 0 20px auto;
}
/* Col 2 */
.product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
}
.title {
  font-size: 14px;
  white-space: wrap;
}
.category {
  font-size: 12px;
  color: #757575;
}
.price {
  font-weight: bold;
  color: #3f51b5;
}
</style>
