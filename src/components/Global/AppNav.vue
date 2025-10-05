<template>
  <div class="app-nav">
    <v-app-bar color="rgb(22, 24, 128)" height="fit-content" absolute>
      <!-- <v-app-bar-nav-icon @click="openCart"></v-app-bar-nav-icon> -->
      <v-container fluid>
        <v-row>
          <!-- Col One -->
          <v-col cols="3">
            <router-link :to="{ name: 'home' }">
              <img
                src="@/assets/logo-app.png"
                alt="logo"
                class="cursor-pointer"
              />
            </router-link>
          </v-col>
          <!-- Col Two -->
          <v-col cols="5">
            <div style="width: 85%; position: relative">
              <input
                type="search"
                name="navSearch"
                id="navSearch"
                placeholder="Search the store"
                style="
                  width: 100%;
                  outline: none;
                  border-radius: 30px;
                  caret-color: black;
                "
                class="py-3 px-5 bg-white"
              />
              <v-icon
                class="cursor-pointer"
                color="black"
                style="
                  position: absolute;
                  right: 15px;
                  top: 52%;
                  width: 25px;
                  transform: translateY(-50%);
                "
                small
                icon="mdi-magnify"
              ></v-icon>
            </div>
          </v-col>
          <!-- Col Three -->
          <v-col cols="4" class="ps-8">
            <div class="parent d-flex justify-space-between align-center">
              <div class="available">
                <span> Available 24/7</span>
                <br />
                <span>(+99) 123-456-789</span>
              </div>
              <!--wishlist  -->
              <v-tooltip location="bottom" text="Open Wishlist">
                <template v-slot:activator="{ props }">
                  <div class="wishlist icon" @click="openWish" v-bind="props">
                    <v-badge
                      color="#2196f3"
                      :content="wishList.length"
                      v-if="wishList.length"
                      class="badge"
                    ></v-badge>
                    <svg
                      data-v-4e6da0d2=""
                      viewBox="0 0 512 512"
                      class="icon icon-wishlist"
                      style="width: 30px; fill: #ffb547"
                    >
                      <g data-v-4e6da0d2="">
                        <g data-v-4e6da0d2="">
                          <path
                            data-v-4e6da0d2=""
                            d="M474.644,74.27C449.391,45.616,414.358,29.836,376,29.836c-53.948,0-88.103,32.22-107.255,59.25
            c-4.969,7.014-9.196,14.047-12.745,20.665c-3.549-6.618-7.775-13.651-12.745-20.665c-19.152-27.03-53.307-59.25-107.255-59.25
            c-38.358,0-73.391,15.781-98.645,44.435C13.267,101.605,0,138.213,0,177.351c0,42.603,16.633,82.228,52.345,124.7
            c31.917,37.96,77.834,77.088,131.005,122.397c19.813,16.884,40.302,34.344,62.115,53.429l0.655,0.574
            c2.828,2.476,6.354,3.713,9.88,3.713s7.052-1.238,9.88-3.713l0.655-0.574c21.813-19.085,42.302-36.544,62.118-53.431
            c53.168-45.306,99.085-84.434,131.002-122.395C495.367,259.578,512,219.954,512,177.351
            C512,138.213,498.733,101.605,474.644,74.27z M309.193,401.614c-17.08,14.554-34.658,29.533-53.193,45.646
            c-18.534-16.111-36.113-31.091-53.196-45.648C98.745,312.939,30,254.358,30,177.351c0-31.83,10.605-61.394,29.862-83.245
            C79.34,72.007,106.379,59.836,136,59.836c41.129,0,67.716,25.338,82.776,46.594c13.509,19.064,20.558,38.282,22.962,45.659
            c2.011,6.175,7.768,10.354,14.262,10.354c6.494,0,12.251-4.179,14.262-10.354c2.404-7.377,9.453-26.595,22.962-45.66
            c15.06-21.255,41.647-46.593,82.776-46.593c29.621,0,56.66,12.171,76.137,34.27C471.395,115.957,482,145.521,482,177.351
            C482,254.358,413.255,312.939,309.193,401.614z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    <p
                      data-v-4e6da0d2=""
                      style="color: #ffb547; margin-top: 1px"
                    >
                      Wishlist
                    </p>
                  </div>
                </template>
              </v-tooltip>
              <!-- Sign In -->
              <div class="sign-in icon">
                <svg
                  data-v-4e6da0d2=""
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  class="icon icon-account"
                  viewBox="0 0 1024 1024"
                  width="100%"
                  height="100%"
                  style="width: 30px; fill: #ffb547"
                >
                  <title data-v-4e6da0d2="">user</title>
                  <path
                    data-v-4e6da0d2=""
                    class="path1"
                    d="M486.4 563.2c-155.275 0-281.6-126.325-281.6-281.6s126.325-281.6 281.6-281.6 281.6 126.325 281.6 281.6-126.325 281.6-281.6 281.6zM486.4 51.2c-127.043 0-230.4 103.357-230.4 230.4s103.357 230.4 230.4 230.4c127.042 0 230.4-103.357 230.4-230.4s-103.358-230.4-230.4-230.4z"
                  ></path>
                  <path
                    data-v-4e6da0d2=""
                    class="path2"
                    d="M896 1024h-819.2c-42.347 0-76.8-34.451-76.8-76.8 0-3.485 0.712-86.285 62.72-168.96 36.094-48.126 85.514-86.36 146.883-113.634 74.957-33.314 168.085-50.206 276.797-50.206 108.71 0 201.838 16.893 276.797 50.206 61.37 27.275 110.789 65.507 146.883 113.634 62.008 82.675 62.72 165.475 62.72 168.96 0 42.349-34.451 76.8-76.8 76.8zM486.4 665.6c-178.52 0-310.267 48.789-381 141.093-53.011 69.174-54.195 139.904-54.2 140.61 0 14.013 11.485 25.498 25.6 25.498h819.2c14.115 0 25.6-11.485 25.6-25.6-0.006-0.603-1.189-71.333-54.198-140.507-70.734-92.304-202.483-141.093-381.002-141.093z"
                  ></path>
                </svg>
                <p data-v-4e6da0d2="" style="color: #ffb547; margin-top: 1px">
                  Sign-in
                </p>
              </div>
              <!-- Cart -->
              <v-tooltip text="Open Cart" location="bottom">
                <template v-slot:activator="{ props }">
                  <div
                    v-bind="props"
                    @click="openCart"
                    class="cart icon"
                    :style="`pointer-events: ${
                      $route.name == 'cart_page' ? 'none' : 'unset'
                    }`"
                  >
                    <v-badge
                      location="top right"
                      color="#2196f3"
                      offset-x="-14px"
                      :content="cartStore.length"
                      v-if="cartStore.length"
                    ></v-badge>
                    <svg
                      data-v-4e6da0d2=""
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                      style="width: 30px; fill: #ffb547"
                    >
                      <path
                        data-v-4e6da0d2=""
                        class="path1"
                        d="M409.6 1024c-56.464 0-102.4-45.936-102.4-102.4s45.936-102.4 102.4-102.4S512 865.136 512 921.6 466.064 1024 409.6 1024zm0-153.6c-28.232 0-51.2 22.968-51.2 51.2s22.968 51.2 51.2 51.2 51.2-22.968 51.2-51.2-22.968-51.2-51.2-51.2z"
                      ></path>
                      <path
                        data-v-4e6da0d2=""
                        class="path2"
                        d="M768 1024c-56.464 0-102.4-45.936-102.4-102.4S711.536 819.2 768 819.2s102.4 45.936 102.4 102.4S824.464 1024 768 1024zm0-153.6c-28.232 0-51.2 22.968-51.2 51.2s22.968 51.2 51.2 51.2 51.2-22.968 51.2-51.2-22.968-51.2-51.2-51.2z"
                      ></path>
                      <path
                        data-v-4e6da0d2=""
                        class="path3"
                        d="M898.021 228.688C885.162 213.507 865.763 204.8 844.8 204.8H217.954l-5.085-30.506C206.149 133.979 168.871 102.4 128 102.4H76.8c-14.138 0-25.6 11.462-25.6 25.6s11.462 25.6 25.6 25.6H128c15.722 0 31.781 13.603 34.366 29.112l85.566 513.395C254.65 736.421 291.929 768 332.799 768h512c14.139 0 25.6-11.461 25.6-25.6s-11.461-25.6-25.6-25.6h-512c-15.722 0-31.781-13.603-34.366-29.11l-12.63-75.784 510.206-44.366c39.69-3.451 75.907-36.938 82.458-76.234l34.366-206.194c3.448-20.677-1.952-41.243-14.813-56.424zm-35.69 48.006l-34.366 206.194c-2.699 16.186-20.043 32.221-36.39 33.645l-514.214 44.714-50.874-305.246h618.314c5.968 0 10.995 2.054 14.155 5.782 3.157 3.73 4.357 9.024 3.376 14.912z"
                      ></path>
                    </svg>
                    <p
                      data-v-4e6da0d2=""
                      style="color: #ffb547; margin-top: 1px"
                    >
                      cart
                    </p>
                  </div>
                </template>
              </v-tooltip>
            </div>
          </v-col>
        </v-row>
        <v-row style="margin-top: 6px">
          <v-col cols="7">
            <!-- Nav links -->
            <div class="links">
              <ul class="d-flex justify-space-between" style="list-style: none">
                <li v-for="category in categories" :key="category.title">
                  <v-tooltip
                    location="bottom"
                    transition="fade-transition"
                    open-delay="150"
                    close-delay="100"
                    :text="'Go to ' + category.title + ' category'"
                  >
                    <template v-slot:activator="{ props }">
                      <router-link
                        v-bind="props"
                        :class="
                          $route.params.title === category.title
                            ? 'route valid'
                            : 'route'
                        "
                        :to="{
                          name: 'product-category',
                          params: {
                            category: category.route,
                            title: category.title,
                          },
                        }"
                        class="route-link"
                      >
                        {{ category.title }}
                        <v-icon size="18" color="primary" class="link-icon">
                          mdi-link-variant
                        </v-icon>
                      </router-link>
                    </template>
                  </v-tooltip>
                </li>
              </ul>
            </div>
          </v-col>
          <v-col
            cols="5"
            class="d-flex justify-end align-center"
            style="gap: 25px"
          >
            <div class="d-flex cursor-pointer" style="gap: 2px">
              <svg
                data-v-4e6da0d2=""
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="user-headset"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="svg-inline--fa fa-user-headset fa-w-14 fa-3x"
                style="width: 18px; margin-right: 6px"
              >
                <path
                  data-v-4e6da0d2=""
                  fill="rgb(10, 108, 220)"
                  d="M320 352h-23.1a174.08 174.08 0 0 1-145.8 0H128A128 128 0 0 0 0 480a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32 128 128 0 0 0-128-128zM48 224a16 16 0 0 0 16-16v-16c0-88.22 71.78-160 160-160s160 71.78 160 160v16a80.09 80.09 0 0 1-80 80h-32a32 32 0 0 0-32-32h-32a32 32 0 0 0 0 64h96a112.14 112.14 0 0 0 112-112v-16C416 86.13 329.87 0 224 0S32 86.13 32 192v16a16 16 0 0 0 16 16zm160 0h32a64 64 0 0 1 55.41 32H304a48.05 48.05 0 0 0 48-48v-16a128 128 0 0 0-256 0c0 40.42 19.1 76 48.35 99.47-.06-1.17-.35-2.28-.35-3.47a64.07 64.07 0 0 1 64-64z"
                  class=""
                ></path>
              </svg>
              <span>Help</span>
            </div>
            <!-- Lang -->
            <v-menu open-on-hover>
              <template v-slot:activator="{ props }">
                <div class="d-flex items-center cursor-pointer" v-bind="props">
                  <span v-html="selectLang[0].icon"></span>
                  <span
                    >{{ selectLang[0].lang }} /
                    {{ selectLang[0].currency }}</span
                  >
                  <v-icon>mdi-chevron-down</v-icon>
                </div>
              </template>

              <v-list v-model:selected="selectLang" mandatory>
                <v-list-item
                  v-for="l in lang"
                  :key="l.lang"
                  class="d-flex align-center cursor-pointer"
                  style="gap: 2px"
                  :value="l"
                >
                  <v-list-item-title>
                    <span v-html="l.icon"></span>
                    <span>{{ l.lang }} / {{ l.currency }}</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- === Lang === -->
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<!-- JS -->
<script>
import { ProductModule } from "@/stores/ProductStore";
import { CartStore } from "@/stores/Cart";
import { wishListStore } from "@/stores/Wishlist";
import { mapState } from "pinia";
export default {
  inject: ["Emitter"],

  computed: {
    ...mapState(ProductModule, ["categories"]),
    ...mapState(CartStore, ["cartStore"]),
    ...mapState(wishListStore, ["wishList"]),
  },
  methods: {
    openCart() {
      this.Emitter.emit("openCart");
    },
    openWish() {
      this.Emitter.emit("openWish");
    },
  },
  data: () => ({
    selectLang: [
      {
        lang: "EN",
        icon: `<svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style="
                  enable-background: new 0 0 512 512;
                  width: 20px;
                  margin-right: 6px;
                "
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xml:space="preserve"
              >
                <circle
                  style="fill: #f0f0f0"
                  cx="256"
                  cy="256"
                  r="256"
                ></circle>
                <g>
                  <path
                    style="fill: #0052b4"
                    d="M52.92,100.142c-20.109,26.163-35.272,56.318-44.101,89.077h133.178L52.92,100.142z"
                  ></path>
                  <path
                    style="fill: #0052b4"
                    d="M503.181,189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075,89.076H503.181z"
                  ></path>
                  <path
                    style="fill: #0052b4"
                    d="M8.819,322.784c8.83,32.758,23.993,62.913,44.101,89.075l89.074-89.075L8.819,322.784L8.819,322.784   z"
                  ></path>
                  <path
                    style="fill: #0052b4"
                    d="M411.858,52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177L411.858,52.921z"
                  ></path>
                  <path
                    style="fill: #0052b4"
                    d="M100.142,459.079c26.163,20.109,56.318,35.272,89.076,44.102V370.005L100.142,459.079z"
                  ></path>
                  <path
                    style="fill: #0052b4"
                    d="M189.217,8.819c-32.758,8.83-62.913,23.993-89.075,44.101l89.075,89.075V8.819z"
                  ></path>
                  <path
                    style="fill: #0052b4"
                    d="M322.783,503.181c32.758-8.83,62.913-23.993,89.075-44.101l-89.075-89.075V503.181z"
                  ></path>
                  <path
                    style="fill: #0052b4"
                    d="M370.005,322.784l89.075,89.076c20.108-26.162,35.272-56.318,44.101-89.076H370.005z"
                  ></path>
                </g>
                <g>
                  <path
                    style="fill: #d80027"
                    d="M509.833,222.609h-220.44h-0.001V2.167C278.461,0.744,267.317,0,256,0   c-11.319,0-22.461,0.744-33.391,2.167v220.44v0.001H2.167C0.744,233.539,0,244.683,0,256c0,11.319,0.744,22.461,2.167,33.391   h220.44h0.001v220.442C233.539,511.256,244.681,512,256,512c11.317,0,22.461-0.743,33.391-2.167v-220.44v-0.001h220.442   C511.256,278.461,512,267.319,512,256C512,244.683,511.256,233.539,509.833,222.609z"
                  ></path>
                  <path
                    style="fill: #d80027"
                    d="M322.783,322.784L322.783,322.784L437.019,437.02c5.254-5.252,10.266-10.743,15.048-16.435   l-97.802-97.802h-31.482V322.784z"
                  ></path>
                  <path
                    style="fill: #d80027"
                    d="M189.217,322.784h-0.002L74.98,437.019c5.252,5.254,10.743,10.266,16.435,15.048l97.802-97.804   V322.784z"
                  ></path>
                  <path
                    style="fill: #d80027"
                    d="M189.217,189.219v-0.002L74.981,74.98c-5.254,5.252-10.266,10.743-15.048,16.435l97.803,97.803   H189.217z"
                  ></path>
                  <path
                    style="fill: #d80027"
                    d="M322.783,189.219L322.783,189.219L437.02,74.981c-5.252-5.254-10.743-10.266-16.435-15.047   l-97.802,97.803V189.219z"
                  ></path>
                </g>
              </svg>`,
        currency: "USD",
      },
    ],
    lang: [
      {
        lang: "EN",
        icon: `<svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style="
                  enable-background: new 0 0 512 512;
                  width: 20px;
                  margin-right: 6px;
                "
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xml:space="preserve"
              >
                <circle
                  style="fill: #f0f0f0"
                  cx="256"
                  cy="256"
                  r="256"
                ></circle>
                <g>
                  <path
                    style="fill: #0052b4"
                    d="M52.92,100.142c-20.109,26.163-35.272,56.318-44.101,89.077h133.178L52.92,100.142z"
                  ></path>
                  <path
                    style="fill: #0052b4"
                    d="M503.181,189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075,89.076H503.181z"
                  ></path>
                  <path
                    style="fill: #0052b4"
                    d="M8.819,322.784c8.83,32.758,23.993,62.913,44.101,89.075l89.074-89.075L8.819,322.784L8.819,322.784   z"
                  ></path>
                  <path
                    style="fill: #0052b4"
                    d="M411.858,52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177L411.858,52.921z"
                  ></path>
                  <path
                    style="fill: #0052b4"
                    d="M100.142,459.079c26.163,20.109,56.318,35.272,89.076,44.102V370.005L100.142,459.079z"
                  ></path>
                  <path
                    style="fill: #0052b4"
                    d="M189.217,8.819c-32.758,8.83-62.913,23.993-89.075,44.101l89.075,89.075V8.819z"
                  ></path>
                  <path
                    style="fill: #0052b4"
                    d="M322.783,503.181c32.758-8.83,62.913-23.993,89.075-44.101l-89.075-89.075V503.181z"
                  ></path>
                  <path
                    style="fill: #0052b4"
                    d="M370.005,322.784l89.075,89.076c20.108-26.162,35.272-56.318,44.101-89.076H370.005z"
                  ></path>
                </g>
                <g>
                  <path
                    style="fill: #d80027"
                    d="M509.833,222.609h-220.44h-0.001V2.167C278.461,0.744,267.317,0,256,0   c-11.319,0-22.461,0.744-33.391,2.167v220.44v0.001H2.167C0.744,233.539,0,244.683,0,256c0,11.319,0.744,22.461,2.167,33.391   h220.44h0.001v220.442C233.539,511.256,244.681,512,256,512c11.317,0,22.461-0.743,33.391-2.167v-220.44v-0.001h220.442   C511.256,278.461,512,267.319,512,256C512,244.683,511.256,233.539,509.833,222.609z"
                  ></path>
                  <path
                    style="fill: #d80027"
                    d="M322.783,322.784L322.783,322.784L437.019,437.02c5.254-5.252,10.266-10.743,15.048-16.435   l-97.802-97.802h-31.482V322.784z"
                  ></path>
                  <path
                    style="fill: #d80027"
                    d="M189.217,322.784h-0.002L74.98,437.019c5.252,5.254,10.743,10.266,16.435,15.048l97.802-97.804   V322.784z"
                  ></path>
                  <path
                    style="fill: #d80027"
                    d="M189.217,189.219v-0.002L74.981,74.98c-5.254,5.252-10.266,10.743-15.048,16.435l97.803,97.803   H189.217z"
                  ></path>
                  <path
                    style="fill: #d80027"
                    d="M322.783,189.219L322.783,189.219L437.02,74.981c-5.252-5.254-10.743-10.266-16.435-15.047   l-97.802,97.803V189.219z"
                  ></path>
                </g>
              </svg>`,
        currency: "USD",
      },
      {
        lang: "DE",
        icon: `<svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style="
                            enable-background: new 0 0 512 512;
                            width: 20px;
                            margin-right: 6px;
                        "
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xml:space="preserve"
                        >
                        <path
                            style="fill: #ffda44"
                            d="M15.923,345.043C52.094,442.527,145.929,512,256,512s203.906-69.473,240.077-166.957L256,322.783  L15.923,345.043z"
                        ></path>
                        <path
                            d="M256,0C145.929,0,52.094,69.472,15.923,166.957L256,189.217l240.077-22.261C459.906,69.472,366.071,0,256,0z"
                        ></path>
                        <path
                            style="fill: #d80027"
                            d="M15.923,166.957C5.633,194.69,0,224.686,0,256s5.633,61.31,15.923,89.043h480.155  C506.368,317.31,512,287.314,512,256s-5.632-61.31-15.923-89.043H15.923z"
                        ></path>
                        </svg>`,
        currency: "EURO",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.links {
  .route,
  .valid {
    position: relative;
    padding: 6px 0;
    transition: color 0.3s ease;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 2px;
      width: 0;
      background: linear-gradient(90deg, #d1c4e9, #9575cd, #5c6bc0);
      transition: width 0.3s ease;
    }
  }
  .route {
    &:hover {
      &::after {
        width: 100%;
      }
    }
  }
  .valid {
    &::after {
      width: 85%;
    }
  }
}
.route-link {
  position: relative;
  transition: color 0.3s ease;
}

.route-link .link-icon {
  opacity: 0;
  transform: translateY(3px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.route-link:hover .link-icon {
  opacity: 1;
  transform: translateY(0);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
}
.wishlist {
  position: relative;
  .badge {
    position: absolute;
    right: 9px;
    top: 0;
  }
}
@media (max-width: 1160px) {
  .route {
    font-size: 14px;
  }
}
</style>
