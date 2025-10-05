<template>
  <v-footer app color="indigo-darken-4" class="text-white pt-10" absolute>
    <v-container fluid>
      <v-row>
        <!-- Links -->
        <v-col cols="12" sm="6" md="3">
          <h2 class="text-h6 font-weight-bold mb-2 text">Quick Links</h2>
          <ul>
            <li
              v-for="category in categories"
              :key="category.title"
              class="footer-link px-0"
            >
              <router-link
                :to="{
                  name: 'product-category',
                  params: { category: category.route, title: category.title },
                }"
                class="route footer-link"
              >
                <span>
                  <v-icon icon="mdi-chevron-double-right" size="small" /> </span
                >{{ category.title }}</router-link
              >
            </li>
          </ul>
        </v-col>

        <v-col cols="12" sm="6" md="4" lg="3">
          <h2 class="text-h6 font-weight-bold mb-2 text">Further Info.</h2>
          <ul>
            <li v-for="(inf, i) in info" :key="i" class="footer-link px-0">
              <p>{{ inf.text }}</p>
            </li>
          </ul>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <h2 class="text-h6 font-weight-bold mb-2 text">Customer Service.</h2>
          <ul class="bg-transparent">
            <li v-for="(inf, i) in info" :key="i" class="footer-link px-0">
              <p>{{ inf.text }}</p>
            </li>
          </ul>
        </v-col>

        <!-- About -->
        <v-col cols="12" sm="6" md="3" class="information">
          <v-lazy>
            <img src="@/assets/logo-app.png" alt="" />
          </v-lazy>
          <ul>
            <li>
              <a href="location: Cairo - Egypt">
                <v-avatar size="40" class="avatar">
                  <v-icon class="icon text">mdi-map-marker</v-icon>
                </v-avatar>
                123 Main Street, Cairo - Egypt
              </a>
            </li>
            <li>
              <a href="Call: 0100 123 4567">
                <v-avatar size="40" class="avatar">
                  <v-icon class="icon text">mdi-phone</v-icon>
                </v-avatar>
                Call us at (+20) 100 123 4567
              </a>
            </li>
            <li>
              <a href="email: support@example.com">
                <v-avatar size="40" class="avatar">
                  <v-icon class="icon text">mdi-email</v-icon>
                </v-avatar>
                support@example.com
              </a>
            </li>
          </ul>
        </v-col>
      </v-row>

      <div class="copy text-center pt-6 mt-6 border-t border-black">
        © 2025 Your
        <v-tooltip text="Go to my GitHub profile" location="top">
          <template v-slot:activator="{ props }">
            <a
              v-bind="props"
              href="https://github.com/NaderMahmoud77"
              target="_blank"
              class="font-weight-bold"
            >
              Nader
            </a>
          </template>
        </v-tooltip>

        All rights reserved.
      </div>
    </v-container>
  </v-footer>
</template>

<script>
import { ProductModule } from "@/stores/ProductStore";
import { mapState } from "pinia";

export default {
  data: () => ({
    info: [
      { text: "About us" },
      { text: "Gift Certificates" },
      { text: "Theme Styles" },
      { text: "Contact us" },
      { text: "Blog" },
      { text: "Brands" },
      { text: "Sitemap" },
    ],
  }),
  computed: {
    ...mapState(ProductModule, ["categories"]),
  },
};
</script>

<style scoped>
ul li {
  list-style: none;
}
.footer-link {
  color: white;
  text-decoration: none;
  transition: transform 0.3s ease, color 0.3s ease;
  margin-left: 2px;
  overflow: hidden;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;
}

.footer-link:hover {
  transform: translateX(5px) !important;
  color: #1565c0 !important;
}
.footer-link-text,
.copy a {
  color: #fff;
}
.information img {
  margin-bottom: 20px;
}
.information ul li {
  margin-bottom: 14px;
}
.information ul li a {
  text-decoration: none;
  color: white;
}
.avatar {
  background: white;
  margin-right: 4px;
  transition: 0.9s;
}
.information ul li:hover .avatar {
  background: linear-gradient(90deg, #1565c0, #1e88e5, #42a5f5) !important;
}
.icon {
  transition: 0.9s;
}
.information ul li:hover .icon {
  background: linear-gradient(90deg, white);
  -webkit-background-clip: text;
  background-clip: text;
}
.copy a {
  font-size: 22px;
  background: linear-gradient(90deg, #1565c0, #1e88e5, #42a5f5);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 1200px) {
  .information ul li a {
    font-size: 15px;
  }
}
</style>
