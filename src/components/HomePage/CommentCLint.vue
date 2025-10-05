<template>
  <section class="reviews py-16">
    <v-container>
      <!-- العنوان + الزر -->
      <div class="d-flex justify-space-between align-center mb-10 flex-wrap">
        <h2 class="text-h4 font-weight-bold">What Our Customers Say</h2>

        <v-btn color="primary" @click="dialog = true" prepend-icon="mdi-plus">
          Add your review
        </v-btn>
      </div>

      <!-- المودال -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold">
            Add a Review
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="Your Name"
              v-model="newReview.name"
              variant="outlined"
              dense
              required
            />
            <v-textarea
              label="Your Comment"
              v-model="newReview.comment"
              variant="outlined"
              dense
              required
            />
            <v-rating
              v-model="newReview.rating"
              color="amber"
              size="large"
              half-increments
            />
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="submitReview">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- عرض الآراء -->
      <v-row>
        <v-col
          v-for="(review, i) in reviews"
          :key="i"
          cols="12"
          md="4"
          class="d-flex"
        >
          <v-card elevation="3" class="review-card pa-6 flex-grow-1">
            <div class="d-flex align-center mb-4">
              <v-avatar size="60" class="overflow-hidden">
                <img
                  :src="review.avatar"
                  alt="avatar"
                  style="object-fit: contain; width: 100%; height: 100%"
                />
              </v-avatar>
              <div class="ml-4">
                <h3 class="text-h6 font-weight-medium mb-1">
                  {{ review.name }}
                </h3>
                <v-rating
                  :model-value="review.rating"
                  color="amber"
                  density="compact"
                  readonly
                  size="small"
                />
              </div>
            </div>

            <p class="review-text">"{{ review.comment }}"</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "CustomerReviews",
  data() {
    return {
      dialog: false,
      newReview: {
        name: "",
        comment: "",
        rating: 0,
      },
      reviews: [
        {
          name: "Ahmed Khaled",
          rating: 5,
          comment:
            "Excellent experience! The product quality and delivery speed were amazing.",
          avatar: "https://randomuser.me/api/portraits/men/15.jpg",
        },
        {
          name: "Omar Nasser",
          rating: 4,
          comment:
            "Very good service and friendly customer support. I will buy again!",
          avatar: "https://randomuser.me/api/portraits/men/28.jpg",
        },
        {
          name: "Youssef Hassan",
          rating: 5,
          comment:
            "Loved the website design and how easy it is to find what I need. Great job!",
          avatar: "https://randomuser.me/api/portraits/men/56.jpg",
        },
      ],
    };
  },
  methods: {
    submitReview() {
      if (
        this.newReview.name.trim() &&
        this.newReview.comment.trim() &&
        this.newReview.rating > 0
      ) {
        this.reviews.unshift({
          ...this.newReview,
          avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        });
        this.newReview = { name: "", comment: "", rating: 0 };
        this.dialog = false;
      } else {
        alert("Please fill all fields and add a rating.");
      }
    },
  },
};
</script>

<style scoped>
.reviews {
  background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%);
}

.review-card {
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 20px rgba(60, 64, 198, 0.15);
}

.review-text {
  color: #555;
  font-size: 15px;
  line-height: 1.6;
}
</style>
