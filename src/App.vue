<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
import Map from "./components/Map.vue";
import CharacterList from "./components/CharacterList.vue";
</script>

<template>
  <div class="container">
    <div style="height: 2vh" />
    <div class="row">
      <div class="col-3">
        <character-list />
      </div>
      <div class="col-6">
        <Map />
      </div>
      <div class="col-3">Enemy</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
