<template>
  <div class="why-shop">
    <v-container fluid>
      <h1 class="why-title"><span>Why Shop</span> with us?</h1>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-card elevation="0" class="card">
            <v-lazy>
              <img src="@/assets/us-1.png" alt="" />
            </v-lazy>
            <h3>Free Shipping on First order</h3>
            <p>Present suscipit mattis facilisis.</p>
            <p class="more">Learn More</p>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-card elevation="0" class="card">
            <v-lazy>
              <img src="@/assets/us-2.png" alt="" />
            </v-lazy>
            <h3>Free Shipping on First order</h3>
            <p>Present suscipit mattis facilisis.</p>
            <p class="more">Learn More</p>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-card elevation="0" class="card">
            <v-lazy>
              <img src="@/assets/us-3.png" alt="" />
            </v-lazy>
            <h3>Free Shipping on First order</h3>
            <p>Present suscipit mattis facilisis.</p>
            <p class="more">Learn More</p>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-card elevation="0" class="card">
            <v-lazy>
              <img src="@/assets/us-4.png" alt="" />
            </v-lazy>
            <h3>Free Shipping on First order</h3>
            <p>Present suscipit mattis facilisis.</p>
            <p class="more">Learn More</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.why-shop {
  background: linear-gradient(90deg, #1a237e, #3f51b5, #5c6bc0);
  padding-block: 40px;
  .card {
    background: transparent;
    color: white;
    min-height: 200px;
    text-align: center;
    padding: 20px;
    img {
      max-width: 80px;
      object-fit: cover;
    }
    h3 {
      font-size: 1.1rem;
      text-align: center;
    }
    p {
      font-size: 0.8rem;
      opacity: 0.9;
    }
    .more {
      cursor: pointer;
      transition: color 0.3s ease;
      text-decoration: underline;
      &:hover {
        color: #1a237e;
      }
    }
  }
}
.why-title {
  text-align: center;
  color: white !important;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  span {
    color: #eee;
  }
}
/* Responsive */
@media (max-width: 991px) {
  .why-title {
    font-size: 24px;
  }
  .card h3 {
    font-size: 16px;
  }
}

@media (max-width: 767px) {
  .why-title {
    font-size: 20px;
  }
  .card h3 {
    font-size: 15px;
  }
}
</style>
