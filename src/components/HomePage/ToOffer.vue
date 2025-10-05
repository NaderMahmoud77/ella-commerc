<template>
  <div class="offer bg-grey-lighten-4 pt-5 pb-5">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="4" class="pr-2">
          <v-lazy>
            <div class="parent" style="height: 100%; cursor: pointer">
              <img
                src="@/assets/playstations.webp"
                alt=""
                style="width: 100%"
              /></div
          ></v-lazy>
        </v-col>

        <v-col cols="12" sm="6" md="4" class="pr-2">
          <v-lazy>
            <div class="parent" style="height: 100%; cursor: pointer">
              <img
                src="@/assets/headset.webp"
                alt=""
                style="width: 100%; height: 100%"
              /></div
          ></v-lazy>
        </v-col>

        <v-col cols="12" sm="6" md="4" class="pr-2">
          <v-lazy>
            <div class="parent" style="height: 100%; cursor: pointer">
              <img
                src="@/assets/chairs.webp"
                alt=""
                style="width: 100%; height: 100%"
              /></div
          ></v-lazy>
        </v-col>

        <v-col cols="12" sm="6" class="pr-2 mt-3">
          <v-lazy>
            <div class="parent" style="height: 100%; cursor: pointer">
              <img
                src="@/assets/iphones.webp"
                alt=""
                style="width: 100%; height: 100%"
              /></div
          ></v-lazy>
        </v-col>

        <v-col cols="12" sm="6" class="pl-2 mt-3">
          <v-lazy>
            <div class="parent" style="height: 100%; cursor: pointer">
              <img
                src="@/assets/laptops.webp"
                alt=""
                style="width: 100%; height: 100%"
              /></div
          ></v-lazy>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.offer {
  .parent {
    overflow: hidden;
    border-radius: 8px;
    &:hover img {
      transform: scale(1.1);
    }
    img {
      transition: 0.6s;
    }
  }
}
</style>
