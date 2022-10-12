<template>
  <div class="app">
    <UsersLIst />
  </div>
</template>

<script>
import UsersLIst from "./components/UsersLIst.vue";

export default {
  name: "App",
  components: {
    UsersLIst,
  },
};
</script>

<style lang="scss">
.app {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
