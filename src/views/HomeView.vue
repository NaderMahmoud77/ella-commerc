<template>
  <div class="home">
    <UpperBanner />
    <TheFeatuers />
    <ToOffer />
    <ProductsCompo :products="mensWatch" title="Mens Watches" :index="5" />
    <TopCategory />
    <NewProduct :products="newProduct" :index="6" />
    <QualiteFeatures />
    <ProductsCompo :products="phones" title="Mobile Phones" :index="0" />
    <!-- Banner -->
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <v-lazy>
            <img
              src="@/assets/band-left-cover.webp"
              alt="cover"
              width="100%"
              class="pr-1"
          /></v-lazy>
        </v-col>
        <v-col cols="12" md="6">
          <v-lazy>
            <img
              src="@/assets/band-right-cover.webp"
              alt="cover"
              width="100%"
              class="pl-1"
          /></v-lazy>
        </v-col>
      </v-row>
    </v-container>
    <ProductsCompo :products="newProduct" title="Fragrances" />
    <v-lazy>
      <img src="@/assets/tv-banner.webp" alt="cover" width="100%"
    /></v-lazy>
    <ProductsCompo :products="groceries" title="Groceries" />
    <WhyShop />
    <ContactUs />
    <CommentCLint />
  </div>
</template>

<!-- JS -->
<script>
// Component
import UpperBanner from "@/components/HomePage/UpperBanner.vue";
import TheFeatuers from "@/components/HomePage/TheFeatuers.vue";
import ToOffer from "@/components/HomePage/ToOffer.vue";
import ProductsCompo from "@/components/HomePage/ProductsCompo.vue";
import TopCategory from "@/components/HomePage/TopCategory.vue";
import NewProduct from "@/components/HomePage/NewProduct.vue";

import QualiteFeatures from "@/components/HomePage/QualiteFeatures.vue";
import WhyShop from "@/components/HomePage/WhyShop.vue";
import ContactUs from "@/components/HomePage/ContactUs.vue";
// Data
import { ProductModule } from "@/stores/ProductStore";
import { PhoneStore } from "@/stores/PhoneStore";
import { mapActions, mapState } from "pinia";
import CommentCLint from "@/components/HomePage/CommentCLint.vue";
//

export default {
  name: "HomeView",
  components: {
    UpperBanner,
    TheFeatuers,
    ToOffer,
    ProductsCompo,
    TopCategory,
    NewProduct,
    QualiteFeatures,
    WhyShop,
    ContactUs,
    CommentCLint,
  },
  computed: {
    ...mapState(ProductModule, [
      "products",
      "newProduct",
      "groceries",
      "mensWatch",
    ]),
    ...mapState(PhoneStore, ["phones"]),
  },
  methods: {
    ...mapActions(ProductModule, ["gitProducts"]),
    ...mapActions(PhoneStore, ["getPhones"]),
  },
  async mounted() {
    await this.gitProducts();
    await this.getPhones();
  },
};
</script>

<!-- Styleng -->
<style lang="scss">
/* All Title */
.section-title {
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(90deg, #1a237e, #3f51b5, #5c6bc0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  cursor: pointer;
}
.section-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 30%;
  height: 3px;
  background-color: rgb(22, 24, 128);
  transition: 0.5s linear;
}
.section-title:hover::after {
  width: 100%;
  background: linear-gradient(90deg, #5c6bc0, #3f51b5, #1a237e);
}

/* Page Title */
.title-page {
  font-size: 2.2rem;
  font-weight: 800 !important;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 0 4px 10px rgba(60, 75, 160, 0.3);
  text-align: center;
  &::after {
    content: "";
    display: block;
    width: 70px;
    height: 4px;
    margin: 12px auto 0;
    border-radius: 4px;
    background: linear-gradient(90deg, #5c6bc0, #3f51b5, #1a237e);
  }
}

/* Text All */
.text {
  background: linear-gradient(90deg, #5c6bc0, #3f51b5, #1a237e);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
/* Rating */
.v-rating__wrapper {
  margin-left: -4px;
}

/* Image Banner */
.image-banner {
  height: 180px;
  margin-bottom: 8px;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.05) translateY(-5px);
  }
  .quick {
    width: 90px !important;
    height: 40px !important;
    position: absolute;
    bottom: -100%;
    left: 30%;
    transform: translate(-50%, -50%);
    transition: 0.4s;
    border-radius: 30px;
    font-size: 10px;
    font-weight: bold;
    &:hover {
      color: white !important;
      background: linear-gradient(90deg, #5c6bc0, #3f51b5, #1a237e);
    }
  }
  &:hover .quick {
    bottom: 40%;
  }
}

/* Toogle Image */
.ToggleImg {
  margin-top: 3px;
  width: 39px;
  height: 39px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 50%;
}

// ============= Buttons ============ //
/* Btn Choose */
.choose-btn {
  border: 2px solid #5c6bc0 !important;
  color: #5c6bc0 !important;
  border-radius: 25px !important;
  font-weight: 600;
  transition: 0.3s ease-in-out !important;
  overflow: hidden;
  width: 80% !important;
}

.choose-btn::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  // background: linear-gradient(90deg, #5c6bc0, #3f51b5, #1a237e);
  background: linear-gradient(90deg, #1565c0, #1e88e5, #42a5f5);

  transition: width 0.4s ease;
  z-index: 0;
}

.choose-btn:hover::before {
  width: 100%;
}

.choose-btn:hover span {
  color: white;
}

.choose-btn span {
  position: relative;
  z-index: 1;
  transition: 0.4s ease;
}

/* Add To Cart */
.add-cart {
  margin-top: 20px;
  width: 230px;
  height: 50px;
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
// ========== Buttons ========== //
/* Routes */
.route {
  text-decoration: none !important;
  color: white !important;
}

// Inputs
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  width: 75px;
  height: 40px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  margin: 0 12px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #3f51b5;
    outline: none;
    box-shadow: 0 0 6px rgba(63, 81, 181, 0.35);
  }
}

.custom-input .v-field.v-field--focused .v-label {
  color: #3f51b5 !important;
  transition: color 0.3s ease;
}

// scroll bar
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #1565c0, #1e88e5, #42a5f5);
  border-radius: 10px;
}

// ========== Responsive ========== //
@media (max-width: 600px) {
  .section-title {
    font-size: 1.5rem;
  }
  .title-page {
    font-size: 1.5rem;
  }
  .image-banner {
    .quick {
      width: 70px !important;
      height: 30px !important;
      font-size: 9px;
      left: 50%;
    }
  }
}
</style>
