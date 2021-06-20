<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
a {
  text-decoration: none;
  color: black;
}
.router-link-active {
  text-decoration: none;
}
</style>
