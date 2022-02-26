<template>
  <div class="character-list-container">
    <div class="row character-content">
      <div class="container-scrollable-list">
        <div v-for="character in session.characters" :key="character.id" class="row">
          <div class="row">
            <div class="col-1 container-text-alt" style="margin-left: 2%">
              <a v-if="character.charType == 0">⚔️</a>
              <a v-else-if="character.charType == 1">💀</a>
              <a v-else-if="character.charType == 2">🛡️</a>
            </div>
            <div class="col-6 container-text">{{ character.name }}</div>
            <div class="col-3 container-text-alt" style="font-size: 4mm" @click="character.editHealth(true)">
              ♥️:
              <br />
              <input
                type="number"
                v-model="character.currentHealth"
                v-if="character.editingHealth"
                @focusout="character.editHealth(false)"
                style="width: 50px"
                min="0"
              />
              <a v-if="!character.editingHealth">{{ character.currentHealth }}</a>
              /
              <a>{{ character.maxHealth }}</a>
            </div>
          </div>
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
          <div class="col-2 container-text">Name:</div>
          <div class="col-10">
            <b-form-input
              class="container-text-input"
              style="width: 98%"
              v-model="newCharacterName"
              @input="validateNewCharacterName()"
            ></b-form-input>
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
            <div class="col-4" style="text-align: right; vertical-align: bottom; font-size: 10mm">♥️</div>
            <div class="col-6">
              <b-form-input id="hp-input" class="container-text-input" v-model="newCharacterHP" @input="validateNewCharacterHP()"></b-form-input>
            </div>
            <div class="col-4"></div>
          </div>
        </div>
      </div>
      <div class="row character-controls">
        <div class="col-6">
          <b-button pill variant="dark" class="character-button" @click="addNewCharacter()">Save</b-button>
        </div>
        <div class="col-6">
          <b-button pill variant="dark" class="character-button">Cancel</b-button>
        </div>
      </div>
    </div>
  </b-form-group>
</template>

<script lang="ts" setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { Character } from "../character";
import { ref, watch } from "vue";
import { session } from "./../dnd_session";

const addingCharacter = ref(false);
const newCharacterName = ref<string>("");
const newCharacterNameOkay = ref<boolean>(false);
const newCharacterHP = ref<string>("");
const newCharacterHPOkay = ref<boolean>(false);
const newCharacterType = ref<number>(-1);
const newCharacterTypeOkay = ref<boolean>(false);

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

function addNewCharacter() {
  let newCharacter = new Character();
  newCharacter.name = newCharacterName.value.trim();
  newCharacter.currentHealth = newCharacter.maxHealth = Number(newCharacterHP.value);
  newCharacter.charType = newCharacterType.value;

  session.characters.push(newCharacter);

  resetNewCharacter();

  toggleAddCharacter(false);
}

function validateNewCharacterName() {
  newCharacterNameOkay.value = newCharacterName.value.trim().length > 0;
}

function validateNewCharacterHP() {
  console.log(newCharacterHP.value);
  newCharacterHP.value = newCharacterHP.value.replace(/\D/g, "");
  console.log(newCharacterHP.value);
  newCharacterHPOkay.value = Number(newCharacterHP.value) > 0;
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
