<template>
  <v-layout style="position: relative">
    <!-- الهيدر -->
    <CartDrawer />
    <MenuDrawer />
    <WishList />
    <AppNav v-if="$route.name != 'chakeoute_page' && windowWidth > 1100" />
    <ResposevNav
      v-if="$route.name != 'chakeoute_page' && windowWidth <= 1100"
    />
    <FixedNav v-if="$route.name != 'chakeoute_page' && windowWidth > 1100" />

    <!-- المحتوى الرئيسي -->
    <v-main
      :style="`padding-top: ${
        $route.name != 'chakeoute_page' && windowWidth > 1100 ? '130px' : '0'
      }`"
    >
      <slot></slot>
    </v-main>

    <!-- الفوتر -->
    <AppFooter v-if="$route.name != 'chakeoute_page'" />
    <!-- زرار Scroll To Top -->
    <BtnScrollTop />
  </v-layout>
</template>

<script>
import CartDrawer from "./CartDrawer.vue";
import MenuDrawer from "./MenuDrawer.vue";
import WishList from "./WishList.vue";
import AppNav from "./AppNav.vue";
import FixedNav from "./FixedNav.vue";
import AppFooter from "./AppFooter.vue";
import ResposevNav from "./ResposevNav.vue";
import BtnScrollTop from "./BtnScrollTop.vue";
export default {
  data: () => ({
    windowWidth: 0,
  }),
  components: {
    CartDrawer,
    MenuDrawer,
    WishList,
    AppNav,
    ResposevNav,
    FixedNav,
    AppFooter,
    BtnScrollTop,
  },
  mounted() {
    document.documentElement.scrollTop = 0;
    this.windowWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
};
</script>
