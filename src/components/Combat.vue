<template>
  <div class="row stat-block-container"></div>
  <div class="row" style="height: 1vh" />
  <div class="row initiative-container">
    <div class="col turn-order">
      <div class="row turn-box" v-for="entry in charactersInCombat">{{ entry[1].name.substring(0, 2) }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Character } from "../character";
import { session } from "../dnd_session";

const charactersInCombat = ref<Map<number, Character>>(new Map<number, Character>());
for (let i = 0; i < session.characters.length; i++) charactersInCombat.value.set(i, session.characters[i]);
</script>

<style lang="scss" scoped>
@import "../index.scss";

.stat-block-container {
  @extend .subcontainer;
  height: 48vh;
}

.initiative-container {
  @extend .subcontainer;
  height: 47vh;
}

.turn-order {
  @extend .container-scrollable-list;
  height: calc(100% - 20px);
  margin-top: 10px;
}

.turn-box {
  @extend .container-text-alt;
  text-align: center;
  border: 2px outset darkgray;
  width: 100%;
  margin: 0px;
}
</style>
