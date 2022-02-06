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
        <!--img src="./../assets/pinescot_farm_ground.png" class="col" /-->
        <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="width: 100%; height: 100%">
          <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />
          <ol-image-layer>
            <ol-source-image-static :url="imgUrl" :imageSize="size" :imageExtent="extent" :projection="projection"></ol-source-image-static>
          </ol-image-layer>

          <ol-overlay
            v-for="character in onMap"
            class="map-character-overlay"
            :key="character.id"
            :positioning="'center-center'"
            :position="[character.mapPosition[0], character.mapPosition[1]]"
          >
            <template v-slot="slotProps">
              <div class="map-character" :style="{ 'background-color': character.mapColor, color: character.mapColor }">
                <div class="map-character-name" :style="{ color: character.mapColor }">
                  {{ character.name.substring(0, 2) }}
                </div>
              </div>
            </template>
          </ol-overlay>
        </ol-map>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, shallowRef, computed, reactive } from "vue";
import { v4 as uuid } from "uuid";
import { session } from "./../dnd_session";

export default defineComponent({
  components: {},
  setup(props, context) {
    const zoom = ref(2);
    const rotation = ref(0);

    const size = ref([1024, 968]);
    const center = ref([size.value[0] / 2, size.value[1] / 2]);
    const extent = ref([0, 0, ...size.value]);
    const projection = reactive({
      code: "xkcd-image",
      units: "pixels",
      extent: extent,
    });
    const imgUrl = ref("./maps/pinescot_farm_ground.png");

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

      center,
      projection,
      zoom,
      rotation,
      size,
      extent,
      imgUrl,
    };
  },
});
</script>

<style scoped>
.map-container {
  width: 500px;
  height: 500px;
  position: relative;
}

.map-container > * {
  position: absolute;
}

.map-character {
  position: absolute;
  display: block;
  border: 2px solid silver;
  border-radius: 24px;
  box-shadow: 0 5px 5px rgb(5 5 5 / 100%);
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

.map-character-overlay {
  transform: translate(-24px, -24px);
}
</style>
