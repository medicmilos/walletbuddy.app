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
  background: url("../../assets/pattern.png") 0px 0px / 300px 300px,
    linear-gradient(315deg, rgb(24, 13, 28) 0.57%, rgb(69, 38, 80) 100%) 0% 0% /
      cover;

  .content {
    color: #fff;
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
      background-color: #e1567c;
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
      color: #e1567c;
      border-color: currentColor;
    }
  }
}
</style>
