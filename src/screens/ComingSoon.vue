<template>
  <div class="wrapper">
    <h1>
      coming soon
      <span class="dot">.</span>
    </h1>
    <p>WalletBuddy</p>
  </div>
</template>

<script>
export default {
  name: "ComingSoon",
  computed: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
body,
.v-application.theme--light {
  background: #000 !important;
  color: #fff;
}

@keyframes fadeIn {
  from {
    top: 20%;
    opacity: 0;
  }
  to {
    top: 100;
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  from {
    top: 20%;
    opacity: 0;
  }
  to {
    top: 100;
    opacity: 1;
  }
}

.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  animation: fadeIn 1000ms ease;
  -webkit-animation: fadeIn 1000ms ease;
}

h1 {
  font-size: 50px;
  font-family: "Poppins", sans-serif;
  margin-bottom: 0;
  line-height: 1;
  font-weight: 700;
  color: #fff;
}

.dot {
  color: #4febfe;
}

p {
  text-align: center;
  margin: 18px;
  font-family: "Muli", sans-serif;
  font-weight: normal;
  color: #fff;
}

.icons {
  text-align: center;
}

.icons i {
  color: #00091b;
  background: #fff;
  height: 15px;
  width: 15px;
  padding: 13px;
  margin: 0 10px;
  border-radius: 50px;
  border: 2px solid #fff;
  transition: all 200ms ease;
  text-decoration: none;
  position: relative;
}

.icons i:hover,
.icons i:active {
  color: #fff;
  background: none;
  cursor: pointer !important;
  transform: scale(1.2);
  -webkit-transform: scale(1.2);
  text-decoration: none;
}
</style>
