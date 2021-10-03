<template>
  <div class="map container">
    <!-- Stuff at the top -->
    <div class="row container-fluid">
      <div class="col">
        <button class="button">Load map</button>
        <button class="button">Clear map</button>
        <br />
        <button class="button">Zoom in</button>
        <button class="button">Zoom out</button>
      </div>
      <div class="col">
        Players on map:
        <ul>
          <li v-for="player in onMap" :key="player.id">
            {{ player.name }}
            <input type="color" v-model="player.mapColor" />
            {{ player.mapColor }}
          </li>
        </ul>
        <select v-model="selectedCharacter">
          <option v-for="character in notOnMap" :key="character.id" :value="character.id">
            {{ character.name }}
          </option>
        </select>
        <input type="button" value="Add" @click="addToMap()" />
      </div>
    </div>
    <div class="row">
      <div class="map-container">
        <img src="./../assets/pinescot_farm_ground.png" class="col" />
        <span
          class="map-character"
          v-for="character in onMap"
          :key="character.id"
          :style="{ 'background-color': character.mapColor, left: character.mapPosition[0] + 'px', top: character.mapPosition[1] + 'px' }"
        >
          <div class="map-character-name" :style="{ color: character.mapColor }">
            {{ character.name.substring(0, 2) }}
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, shallowRef, computed } from "vue";
import { v4 as uuid } from "uuid";
import { session } from "./../dnd_session";

export default defineComponent({
  components: {},
  setup(props, context) {
    let name = ref("my name");
    let selectedCharacter = ref("");
    let onMap = computed(() => session.characters.filter((v) => v.isOnMap));
    let notOnMap = computed(() => session.characters.filter((v) => !v.isOnMap));
    //let addToMap = computed(() => session.characters.filter((v) => !v.isOnMap));\

    function addToMap() {
      selectedCharacter.value;
      let character = session.characters.find((v) => v.id == selectedCharacter.value);
      if (!character) return;
      character.isOnMap = true;
    }

    return {
      name,
      onMap,
      notOnMap,
      addToMap,
      selectedCharacter,
    };
  },
});
</script>

<style scoped>
.map-container {
  width: 100%;
  position: relative;
}

.map-container > * {
  position: absolute;
}

.map-character {
  position: absolute;
  display: block;
  border: 2px solid black;
  border-radius: 24px;
  width: 48px;
  height: 48px;
  line-height: 48px;
  text-align: center;
}

.map-character-name {
  font-weight: bold;
  font-size: 24px;
  filter: invert(100%);
}
</style>
