<template>
  <div
    id="app"
    class="grid min-w-full min-h-screen grid-cols-1 bg-gray-100 grid-rows-layout"
  >
    <app-bar />
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import AppFooter from "./components/AppFooter.vue";
export default {
  name: "App",
  components: { AppBar, AppFooter },
};
</script>
