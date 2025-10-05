<template>
  <div class="feature bg-grey-lighten-4 py-10">
    <v-container fluid>
      <!-- Title -->
      <div class="mb-6">
        <h1 class="section-title font-bold" style="width: fit-content">
          Quality Feature
        </h1>
      </div>

      <!-- Cards Row -->
      <v-row class="d-flex align-center justify-center py-6">
        <v-col
          v-for="(item, i) in feature"
          :key="i"
          cols="12"
          sm="6"
          md="4"
          lg="2"
          class="mb-6"
        >
          <v-card
            class="feature-card pa-8 d-flex flex-column align-center justify-center text-center"
          >
            <span v-html="item.svg" class="icon mb-4"></span>
            <h4 class="text-lg font-bold mb-2">{{ item.title }}</h4>
            <p class="text-gray-600">{{ item.desc }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { feature } from "@/Data/FeaturesData";
</script>

<style scoped>
.feature-card {
  height: 300px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  background: #fff;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  background: linear-gradient(90deg, #1565c0, #1e88e5, #42a5f5);
  color: #fff;
}

.feature-card .icon svg {
  width: 50px;
  height: 50px;
}

.feature-card:hover p {
  color: #f5f5f5;
}
</style>
