<template>
  <v-container class="py-16 contact-section">
    <v-row class="d-flex align-center">
      <!-- Left Info -->
      <v-col cols="12" md="6" class="pe-md-12">
        <h2 class="text-h4 font-weight-bold mb-6 text">Contact Us</h2>
        <p class="mb-6 text-subtitle-1">
          We’d love to hear from you! Get in touch and we’ll respond as soon as
          possible.
        </p>

        <v-list density="compact" class="bg-transparent info-list">
          <v-list-item class="list">
            <template #prepend>
              <v-avatar size="40" class="info-avatar">
                <v-icon>mdi-map-marker</v-icon>
              </v-avatar>
            </template>
            <v-list-item-title
              >123 Main Street, Cairo - Egypt</v-list-item-title
            >
          </v-list-item>

          <v-list-item class="list">
            <template #prepend>
              <v-avatar size="40" class="info-avatar">
                <v-icon>mdi-phone</v-icon>
              </v-avatar>
            </template>
            <v-list-item-title>+20 100 123 4567</v-list-item-title>
          </v-list-item>

          <v-list-item class="list">
            <template #prepend>
              <v-avatar size="40" class="info-avatar">
                <v-icon>mdi-email</v-icon>
              </v-avatar>
            </template>
            <v-list-item-title>support@example.com</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Right Form -->
      <v-col cols="12" md="6">
        <v-card class="pa-8 form-card" elevation="8">
          <v-form>
            <v-text-field
              label="Name"
              variant="outlined"
              base-color="#3f51b5"
              density="comfortable"
              class="mb-4 custom-input"
              hide-details
            />
            <v-text-field
              label="Email"
              type="email"
              variant="outlined"
              base-color="#3f51b5"
              density="comfortable"
              class="mb-4 custom-input"
              hide-details
            />
            <v-textarea
              label="Message"
              rows="4"
              variant="outlined"
              base-color="#3f51b5"
              density="comfortable"
              class="mb-6 custom-input"
              hide-details
            />

            <v-btn class="btn font-weight-bold" size="large" block>
              Send
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// no extra logic
</script>

<style lang="scss" scoped>
.contact-section {
  background: transparent !important;
}

/* Info Icons */
.info-avatar {
  background: linear-gradient(135deg, #161880, #3f51b5) !important;
  color: white !important;
  border-radius: 50%;
  transition: 0.5s;
}
.list {
  cursor: pointer;
}
.list:hover .info-avatar {
  background: linear-gradient(90deg, #1565c0, #1e88e5, #42a5f5) !important;
}

/* Form Card */
.form-card {
  border-radius: 20px;
}

/* Labels */
.v-label {
  color: rgba(255, 255, 255, 0.8) !important;
}

.btn {
  background: linear-gradient(270deg, #161880, #3f51b5, #161880);
  background-size: 400% 400%;
  animation: gradientMove 8s ease infinite;
  color: white !important;
  border-radius: 12px;
  transition: opacity 0.3s ease;
}
@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.btn:hover {
  opacity: 0.9;
}
</style>
