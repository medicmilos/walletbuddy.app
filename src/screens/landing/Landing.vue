<template>
  <div class="landing-page">
    <div class="content">
      <h1>WalletBuddy</h1>
      <p>Expenses Management App</p>
      <button @click="goToAuth" class="get-started">Get Started</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Landing",
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {
    goToAuth() {
      this.$router.push({ name: "login" })
    }
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Rubik");

body {
  font-family: "Open Sans", sans-serif;
}

.landing-page {
  height: 100vh;
  position: relative;

  .content {
    color: #503396;
    font-family: "Rubik", sans-serif;

    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    h1 {
      font-weight: 700;
      font-size: clamp(2rem, 6vw + 0.5rem, 4.375rem);
    }
    p {
      font-size: 1.125rem;
      font-weight: 400;
      line-height: 1.5625rem;
    }
    .get-started {
      border: none;
      display: inline-block;
      background-color: #503396;
      color: hsl(0, 0%, 100%);
      padding: 0.875rem 1.75rem;
      border-radius: 0.1875rem;
      font-size: 1rem;
      font-weight: 700;
      border: 0.15rem solid transparent;
      transition: all 300ms ease-in-out;
    }
    .get-started:hover {
      opacity: 0.8;
      background-color: transparent;
      color: #503396;
      border-color: currentColor;
    }
  }
}
</style>
