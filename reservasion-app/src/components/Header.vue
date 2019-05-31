<template>
  <div id="app">
    <div class="header-area">
      <div class="logo">
        <img src="../assets/logo.png" width="50px" v-on:click="toHome">
      </div>
      <nav class="header-menu">
        <ul>
        </ul>
      </nav>
      <ul>
        <button class="btn btn-outline-light">Sing in</button>
        <button class="btn btn-outline-light">Sign up</button>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    toHome() {
      this.$router.push("/");
    }
  }
};
</script>


<style>
.header-area {
  display: flex;
  background-color: rgb(7, 76, 116);
  color: #fff;
}
.logo {
  position: relative;
  left: 1px;
  width: 150px;
}
img.logo:hover {
  opacity: 0.5;
  cursor: pointer;
}
img.logo:active {
  position: relative;
  top: 3px;
}
</style>


