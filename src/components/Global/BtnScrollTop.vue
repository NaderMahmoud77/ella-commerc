<template>
  <div>
    <!-- زرار Scroll To Top -->
    <button v-show="showBtn" class="scroll-top-btn" @click="scrollToTop">
      <svg class="progress-ring" :width="size" :height="size">
        <circle
          class="progress-ring__circle"
          stroke="#1a237e"
          fill="transparent"
          :stroke-width="stroke"
          :r="radius"
          :cx="size / 2"
          :cy="size / 2"
          :style="{
            strokeDasharray: circumference,
            strokeDashoffset: circumference - (progress / 100) * circumference,
          }"
        />
      </svg>
      <v-icon size="20">mdi-chevron-up</v-icon>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBtn: false,
      progress: 0,
      size: 50, // حجم الدايرة
      stroke: 4, // سمك البوردر
    };
  },
  computed: {
    radius() {
      return (this.size - this.stroke) / 2;
    },
    circumference() {
      return 2 * Math.PI * this.radius;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      this.progress = (scrollTop / docHeight) * 100;
      this.showBtn = scrollTop > 200;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped lang="scss">
.scroll-top-btn {
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  color: #1a237e;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 999;
  transition: transform 0.3s ease, background 0.3s;

  &:hover {
    background: #1a237e;
    color: #fff;
    transform: translateY(-4px);
  }

  .progress-ring {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-90deg); /* يبدأ من فوق */
  }

  .progress-ring__circle {
    transition: stroke-dashoffset 0.35s;
    transform-origin: center;
  }

  .v-icon {
    position: absolute;
  }
}
</style>
