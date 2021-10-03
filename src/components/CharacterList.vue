<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { session } from "./../dnd_session";
</script>

<template>
  <div class="container">
    <ul>
      <li v-for="character in session.characters" :key="character.id">
        <ul>
          <li>
            {{ character.name }}
          </li>
          <li>{{ character.currentHealth }} / {{ character.maxHealth }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
