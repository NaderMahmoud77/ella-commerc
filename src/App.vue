<template>
  <app-layout>
    <!-- slot layout -->
    <router-view />
    <QuickView />
    <!-- snackbar -->
    <v-snackbar
      v-model="bar"
      color="success"
      location="bottom"
      content-class="snackbar-success"
      rounded="lg"
      timeout="3000"
    >
      ({{ title }}) {{ masge }}

      <template v-slot:actions>
        <v-icon @click="bar = false" color="white">mdi-close</v-icon>
      </template>
    </v-snackbar>

    <!-- slot layout -->
  </app-layout>
</template>

<script>
import AppLayout from "@/components/Global/AppLayout.vue";
import QuickView from "@/components/Global/QuickView.vue";

export default {
  inject: ["Emitter"],
  components: {
    AppLayout,
    QuickView,
  },
  data: () => ({
    bar: false,
    title: "",
    masge: "",
  }),
  mounted() {
    this.Emitter.on("showMsg", (data) => {
      this.bar = true;
      this.title = data.title;
      this.masge = data.msg;
    });
  },
};
</script>

<style lang="scss">
.snackbar-success {
  color: #fff;
  font-weight: 500;
  font-size: 13px;
  position: fixed !important;
  bottom: 16px !important;
  left: 20px !important;
  width: 90% !important;
  max-width: 350px !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
