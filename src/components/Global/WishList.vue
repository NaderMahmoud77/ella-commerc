<template>
  <v-navigation-drawer v-model="drawer" app right temporary width="350">
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold"> My Wishlist </v-toolbar-title>
      <v-spacer />
      <div class="close">
        <v-icon @click="drawer = false" color="white">mdi-close</v-icon>
      </div>
    </v-toolbar>

    <v-divider />

    <v-list>
      <v-card
        v-for="(item, i) in wishList"
        :key="i"
        class="ma-3 pa-8 d-flex align-center"
        elevation="1"
      >
        <!-- صورة المنتج -->
        <v-img
          :src="item.thumbnail"
          :alt="item.title"
          width="60"
          height="60"
          class="rounded-lg img"
        />

        <!-- تفاصيل المنتج -->
        <div class="ml-3 flex-grow-1">
          <h4 class="text-body-1 font-weight-bold mb-1">
            {{ item.title }}
          </h4>
          <p class="text-caption text-grey-darken-1 mb-0">${{ item.price }}</p>
        </div>

        <!-- زرار الحذف -->
        <v-btn
          icon
          variant="text"
          color="blue-darken-2"
          @click="removeItem(item.id)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card>

      <v-alert v-if="!wishList.length" type="info" variant="tonal" class="ma-3">
        Wishlist is empty
      </v-alert>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { wishListStore } from "@/stores/Wishlist";
import { mapActions, mapState } from "pinia";
export default {
  inject: ["Emitter"],
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    ...mapState(wishListStore, ["wishList"]),
  },
  mounted() {
    this.Emitter.on("openWish", () => {
      this.drawer = !this.drawer;
    });
  },
  methods: {
    ...mapActions(wishListStore, ["removeItemInWish"]),
    removeItem(item) {
      this.removeItemInWish(item);
    },
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

<style scoped>
.close {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #5c6bc0, #3f51b5, #1a237e);
  margin-right: 10px;
}
.img {
  object-fit: cover !important;
}
</style>
