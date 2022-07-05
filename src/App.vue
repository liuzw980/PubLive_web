<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  border: none;
}
body {
  padding: 0;
  margin: 0;
  border: none;
}

@media screen and (max-width: 1200px) {
#app {
  width: 1200px;
  margin: 0 auto;
}
}
@media screen and (min-width: 1200px) {
#app {
  /* width: 1200px; */
  margin: 0 auto;
}
}

</style>
