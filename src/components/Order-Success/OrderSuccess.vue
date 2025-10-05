<template>
  <v-dialog v-model="dialog" max-width="400" persistent @after-leave="onClose">
    <v-card class="rounded-lg pa-4" elevation="8">
      <!-- العنوان + زر الإغلاق -->
      <v-card-title class="d-flex align-center justify-space-between pb-0">
        <span class="text-h6 font-weight-bold">Order Success</span>
      </v-card-title>

      <!-- المحتوى -->
      <v-card-text class="text-center">
        <v-icon size="72" color="green">mdi-check-circle</v-icon>
        <p class="mt-4 text-body-1">Your order has been placed successfully!</p>
      </v-card-text>

      <!-- الأزرار -->
      <v-card-actions class="justify-center">
        <v-btn
          color="primary"
          variant="elevated"
          class="px-6 py-2 rounded-lg text-white"
          @click="clearData()"
        >
          Got it!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { CartStore } from "@/stores/Cart";
import { mapActions } from "pinia";
export default {
  data: () => ({
    dialog: false,
  }),
  props: {
    popup: {
      type: Boolean,
    },
  },
  watch: {
    dialog(newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.$emit("close");
        }, 300);
      }
    },
  },
  methods: {
    ...mapActions(CartStore, ["clearDataOnLocal"]),
    clearData() {
      this.dialog = false;
      this.clearDataOnLocal();
      this.$router.push({ name: "home" });
    },
    onClose() {
      this.$emit("close");
    },
  },
  mounted() {
    this.dialog = this.popup;
    document.documentElement.scrollTop = 0;
  },
};
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease;
}
.v-card:hover {
  transform: translateY(-3px);
}
</style>
