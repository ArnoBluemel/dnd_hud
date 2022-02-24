<script lang="ts" setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { Character } from "src/character";
import { session } from "./../dnd_session";
</script>

<template>
  <div class="subcontainer">
    <div class="container-scrollable-list" style="height: 48vh">
      <div v-for="character in session.characters" :key="character.id" class="row">
        <div class="row">
          <div class="col-1 container-text-alt" style="margin-left: 2%">
            <a v-if="character.charType == 0">⚔️</a>
            <a v-else-if="character.charType == 1">💀</a>
            <a v-else-if="character.charType == 2">🛡️</a>
          </div>
          <div class="col-6 container-text">{{ character.name }}</div>
          <div class="col-3 container-text-alt" style="font-size: 4mm" @click="character.editHealth(true)">
            HP:
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
</template>

<style scoped></style>
