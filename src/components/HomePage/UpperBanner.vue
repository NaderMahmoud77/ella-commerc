<template>
  <div class="upper-banner">
    <div class="parent">
      <img src="@/assets/banner-bg.jpg" alt="" />
      <div class="content">
        <h3>
          <span class="line line1">Huge Savings</span>
          <br />
          <span class="line line2">on UHD Televisions</span>
        </h3>
        <p class="hint">sale up to 70% off on Sony Televisions</p>
        <v-btn
          variant="outlined"
          color="white btn"
          class="text-none px-10 py-6"
          style="
            border-radius: 30px;
            line-height: 1.5;
            display: flex;
            align-items: center;
            margin-top: 40px;
          "
          >Shop Now
          <span class="one"></span>
          <span class="two"></span>
          <span class="three"></span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<!-- Styleng -->
<style scoped lang="scss">
.parent {
  height: 540px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content {
    color: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    padding-left: 50px;

    h3 {
      font-size: 45px;
      font-weight: 900;
      color: #fff;

      .line {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        width: 0;
      }
      .line1 {
        animation: typing1 3s steps(20, end) forwards;
      }
      .line2 {
        animation: typing2 3s steps(30, end) forwards;
        animation-delay: 3.2s;
      }
      span {
        color: #eee;
      }
    }
    .btn {
      position: relative !important;
      overflow: hidden !important;
      z-index: 2 !important;
      .one,
      .two,
      .three {
        position: absolute;
        width: 0px;
        height: 0px;
        transform: translateY(-50%);
        background-color: rgba(255, 255, 255, 0.3);
        opacity: 0;
        z-index: -3;
        border-radius: 30px;
      }
      .one,
      .two,
      .three {
        left: 50%;
        top: 50%;
        animation: bordShow 0.7s ease-in-out infinite alternate;
      }
      .two {
        animation: bordShowTwo 1s ease-in-out infinite alternate;
      }
      .three {
        animation: bordShowThree 1.3s ease-in-out infinite alternate;
      }
    }
  }
  .hint {
    margin: 20px 0;
  }
}

// Typing
@keyframes typing1 {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes typing2 {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

// BTN
@keyframes bordShow {
  0% {
    width: 20%;
    height: 50%;
    opacity: 1;
    left: 40%;
  }
  100% {
    border-width: 0px;
    width: 0%;
    height: 0%;
  }
}
@keyframes bordShowTwo {
  0% {
    width: 100%;
    height: 100%;
    opacity: 1;
    left: 0;
  }
  100% {
    width: 0%;
    height: 0%;
  }
}
@keyframes bordShowThree {
  0% {
    width: 70%;
    height: 70%;
    opacity: 1;
    left: 15%;
  }
  100% {
    width: 0%;
    height: 0%;
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .parent {
    // height: 400px;

    .content {
      padding-left: 30px;

      h3 {
        font-size: 32px;
      }
      .hint {
        font-size: 15px;
      }
      .btn {
        font-size: 14px;
        padding: 10px 20px !important;
      }
    }
  }
}

@media (max-width: 768px) {
  .parent {
    height: 400px;

    .content {
      padding-left: 20px;
      top: 60%;

      h3 {
        font-size: 26px;
        line-height: 1.2;
      }
      .hint {
        font-size: 14px;
      }
      .btn {
        font-size: 13px;
        padding: 8px 16px !important;
        margin-top: 25px !important;
      }
    }
  }
}

@media (max-width: 480px) {
  .parent {
    height: 350px;

    .content {
      padding-left: 15px;
      width: 100%;

      h3 {
        font-size: 20px;
      }
      .hint {
        font-size: 12px;
      }
      .btn {
        font-size: 12px;
        padding: 6px 14px !important;
        margin-top: 20px !important;
      }
    }
  }
}
</style>
