<template>
  <div class="row stat-block-container"></div>
  <div class="row" style="height: 1vh" />
  <div class="initiative-container">
    <div class="row combat-characters">
      <div class="col turn-order">
        <div class="turn-box" v-for="character in inCombat">
          <span class="initiative-box">{{ character.initiative }}</span>
          <span class="name-box">{{ character.name }}</span>
          <span class="remove-box" @click="session.removeFromCombat(character.id)">❌</span>
        </div>
      </div>
    </div>
    <div class="row enter-combat">
      <b-form-select v-model="selectedCharacter" class="col-6 combat-select">
        <!-- <template #first>
                <b-form-select-option :value="null" disabled>-- Select A Character --</b-form-select-option>
              </template> -->
        <b-form-select-option v-for="character in notInCombat" :key="character.id" :value="character.id">
          {{ character.name }}
        </b-form-select-option>
      </b-form-select>
      <b-button
        pill
        variant="dark"
        class="col-3 combat-button"
        @click="askInitiative = true"
        :disabled="notInCombat.length == 0 || selectedCharacter == ''"
        >Enter Combat</b-button
      >
    </div>
  </div>
  <dialog :open="askInitiative">
    <div class="dialog-background"></div>
    <div class="container-dialog">
      <div class="dialog-controls">
        <label class="dialog-label">Initiative:</label>
        <input class="dialog-input" :value="initiative" @input="(ev) => initiative = Number(filterNotNumbers(ev.target as any))" />
        <b-button class="dialog-confirm" @click="enterCombat()">OK</b-button>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { Character } from "../character";
import { session } from "../dnd_session";

const inCombat = computed(() => session.characters.filter((v) => v.isInCombat).sort((v, w) => w.initiative - v.initiative));
const notInCombat = computed(() => session.characters.filter((v) => !v.isInCombat));
const selectedCharacter = ref("");
const askInitiative = ref<Boolean>(false);
const initiative = ref<number>(0);

function enterCombat() {
  askInitiative.value = false;
  session.addCharacterToCombat(selectedCharacter.value, initiative.value);
  selectedCharacter.value = "";
  initiative.value = 0;
}

function filterNotNumbers(target: { value: string }): string {
  let newValue = target.value.replace(/\D/g, "");
  target.value = newValue;
  return newValue;
}
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
  height: calc(100% - 10px);
  margin-top: 10px;
}

.turn-box {
  @extend .container-text-alt;
  border: 2px outset darkgray;
  width: 100%;
  margin: 0px;
}

.initiative-box {
  width: 50px;
  text-align: center;
  display: inline-block;
}

.name-box {
  width: calc(100% - 100px);
  display: inline-block;
}

.remove-box {
  width: 50px;
  text-align: center;
  display: inline-block;
}

.combat-characters {
  height: calc(100% - 85px);
  width: 100%;
  margin-top: 10px;
  margin-left: 0px;
}

.enter-combat {
  height: 70px;
}

.combat-button {
  @extend .container-button;
  width: 35%;
  height: calc(100% - 5px);
  margin-left: 5%;
}

.combat-select {
  @extend .container-select;
  width: 50%;
  height: 100%;
  margin-left: 5%;
}
</style>
