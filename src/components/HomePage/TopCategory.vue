<template>
  <div class="topCate">
    <div class="image">
      <img
        src="@/assets/categorys/cyber-banner.webp"
        alt=""
        class="w-100 pb-16"
      />
    </div>
    <v-container fluid>
      <!-- Title -->
      <div class="d-flex mb-6">
        <h1 class="section-title font-bold">Top Category</h1>
      </div>
      <v-row class="py-8">
        <v-col
          cols="6"
          lg="2"
          md="4"
          sm="4"
          v-for="(cat, i) in categorys"
          :key="i"
          class="category-card"
        >
          <div class="card-content">
            <v-lazy>
              <img :src="cat.src" :alt="cat.title" />
            </v-lazy>
            <p class="text">{{ cat.title }}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
// Data
import { categorys } from "@/Data/CategoryData";
</script>

<style scoped>
.category-card .card-content {
  background: #fff;
  border-radius: 16px;
  padding: 20px 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.8s ease;
  width: 100%;
  cursor: pointer;
}

.category-card .card-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  background: linear-gradient(90deg, #1565c0, #1e88e5, #42a5f5);
}

.category-card img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.category-card p {
  font-size: 14px;
  font-weight: 600;

  transition: all 0.3s ease;
}

.card-content:hover p {
  background: linear-gradient(90deg, #fff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
