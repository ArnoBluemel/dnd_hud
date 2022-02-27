<template>
  <div class="character-list-container">
    <div class="row character-content">
      <div class="container-scrollable-list">
        <div v-for="character in session.characters" :key="character.id" class="row" style="height: 50px">
          <!-- <div class="row"> -->
          <div class="col-1 container-text-alt" style="margin-left: 2%">
            <a v-if="character.charType == 0">⚔️</a>
            <a v-else-if="character.charType == 1">💀</a>
            <a v-else-if="character.charType == 2">🛡️</a>
          </div>
          <div class="col-6 container-text">{{ character.name }}</div>
          <div class="col-4 container-text-alt" style="font-size: 4mm" @click="editHealth(character, true)">
            <div>♥️:</div>
            <input
              :id="'health' + character.id"
              :value="character.currentHealth"
              @input="(ev) => character.currentHealth = Number(filterNotNumbers(ev.target as any))"
              v-if="character.editingHealth"
              @focusout="editHealth(character, false)"
              style="width: 50px"
              min="0"
            />
            <span v-if="!character.editingHealth">{{ character.currentHealth }}</span>
            /
            <span>{{ character.maxHealth }}</span>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <div class="row character-controls">
      <b-button pill variant="dark" class="character-button" @click="toggleAddCharacter(true)" :disabled="addingCharacter">Add Character</b-button>
    </div>
  </div>
  <div style="height: 1vh" />
  <b-form-group :disabled="!addingCharacter">
    <div class="add-character-container">
      <div class="row character-content">
        <div class="row">
          <div class="col-2 container-text" :style="!addingCharacter ? 'opacity: 0.6' : ''">Name:</div>
          <div class="col-10">
            <input class="container-text-input" style="width: 98%" v-model="newCharacterName" @input="validateNewCharacterName()" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <b-form-radio-group
              id="radio-group-1"
              v-model="newCharacterType"
              :options="characterTypes"
              name="radio-options"
              class="container-text"
              style="font-size: 10mm; margin: 0px; margin-left: 30px"
            ></b-form-radio-group>
          </div>
          <div class="row">
            <div class="col-4" style="text-align: right; vertical-align: bottom; font-size: 10mm" :style="!addingCharacter ? 'opacity: 0.6' : ''">
              ♥️
            </div>
            <div class="col-6">
              <!-- <b-form-input id="hp-input" class="container-text-input" :value="newCharacterHP" @input="validateNewCharacterHP($event)"></b-form-input> -->
              <input
                type="text"
                id="hp-input"
                class="container-text-input"
                :value="newCharacterHP"
                @input="(ev) => validateNewCharacterHP(ev.target as any)"
              />
            </div>
            <div class="col-4"></div>
          </div>
        </div>
      </div>
      <div class="row character-controls">
        <div class="col-6">
          <b-button
            pill
            variant="dark"
            class="character-button"
            @click="saveNewCharacter()"
            :disabled="!(newCharacterNameOkay && newCharacterHPOkay && [0, 1, 2].includes(newCharacterType))"
            >Save</b-button
          >
        </div>
        <div class="col-6">
          <b-button pill variant="dark" class="character-button" @click="endAddCharacter()">Cancel</b-button>
        </div>
      </div>
    </div>
  </b-form-group>
</template>

<script lang="ts" setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { Character } from "../character";
import { Ref, ref, watch } from "vue";
import { session } from "./../dnd_session";

const addingCharacter = ref(false);
const newCharacterName = ref<string>("");
const newCharacterNameOkay = ref<boolean>(false);
const newCharacterHP = ref<string>("");
const newCharacterHPOkay = ref<boolean>(false);
const newCharacterType = ref<number>(-1);

const characterTypes = [
  { text: "⚔️", value: 0 }, //  Player
  { text: "💀", value: 1 }, //  Monster
  { text: "🛡️", value: 2 }, //  NPC
];

function toggleAddCharacter(val: boolean) {
  addingCharacter.value = val;
}

function resetNewCharacter() {
  newCharacterName.value = "";
  newCharacterHP.value = "";
  newCharacterType.value = -1;
}

function resetValidation() {
  newCharacterNameOkay.value = false;
  newCharacterHPOkay.value = false;
}

function saveNewCharacter() {
  let newCharacter = new Character();
  newCharacter.name = newCharacterName.value.trim();
  newCharacter.currentHealth = newCharacter.maxHealth = Number(newCharacterHP.value);
  newCharacter.charType = newCharacterType.value;

  session.characters.push(newCharacter);

  endAddCharacter();
}

function endAddCharacter() {
  resetNewCharacter();
  resetValidation();

  toggleAddCharacter(false);
}

function validateNewCharacterName() {
  newCharacterNameOkay.value = newCharacterName.value.trim().length > 0;
}

function validateNewCharacterHP(target: { value: string }) {
  newCharacterHP.value = filterNotNumbers(target); //target.value.replace(/\D/g, "");
  newCharacterHPOkay.value = +newCharacterHP.value > 0;
  //target.value = newCharacterHP.value;
}

function filterNotNumbers(target: { value: string }): string {
  let newValue = target.value.replace(/\D/g, "");
  target.value = newValue;
  return newValue;
}

function editHealth(character: Character, val: boolean) {
  if (character.editingHealth == val) return;
  character.editHealth(val);
  if (val)
    new Promise(async () => {
      await new Promise((f) => setTimeout(f, 1));
      document.getElementById("health" + character.id)?.focus();
    });
}
</script>

<style lang="scss" scoped>
@import "../index.scss";

.character-button {
  @extend .container-button;
  width: 90%;
  height: calc(100% - 5px);
  margin-left: 5%;
}

.character-list-container {
  @extend .subcontainer;
  height: 58vh;
}

.character-content {
  height: calc(100% - 85px);
  margin-top: 10px;
  margin-left: 0px;
}

.character-controls {
  height: 70px;
}

.add-character-container {
  @extend .subcontainer;
  height: 37vh;
}
</style>
