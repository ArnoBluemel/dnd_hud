<template>
  <div class="map container" style="height: 100%">
    <!-- Stuff at the top -->
    <div class="row container map-controls">
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
        <ol-map
          v-if="mapIsLoaded"
          :loadTilesWhileAnimating="true"
          :loadTilesWhileInteracting="true"
          style="width: 100%; height: 100%; border: 10px solid red; position: absolute; left: 0px"
          @pointermove="getMousePosition"
        >
          <ol-view ref="view" :center="viewCenter" :rotation="rotation" :zoom="zoom" :projection="viewProjection" :extent="viewExtent" />

          <ol-image-layer>
            <ol-source-image-static :url="imgUrl" :imageSize="imgSize" :imageExtent="imgExtent" :projection="imgProjection" />
          </ol-image-layer>

          <ol-overlay
            v-for="character in onMap"
            class="map-character-overlay"
            :key="character.id"
            :position="[character.mapPosition[0], character.mapPosition[1]]"
            @pointerdown="selectCharacter(character)"
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

<script lang="ts" setup>
import { defineComponent, PropType, ref, watch, shallowRef, computed, reactive } from "vue";
import { v4 as uuid } from "uuid";
import { session } from "./../dnd_session";
import { Character } from "../character";

/// == Constants ==

/// -- View --
const zoom = ref(1);
const rotation = ref(0);

/// == Variables ==

let mapIsLoaded = ref(false);

/// -- Image --
let imgUrl = ref("");
//let imgUrl = ref("./maps/test_sideways.png");
let imgSize = ref([0, 0]);
let imgExtent = ref([0, 0, 0, 0]);
let imgProjection = reactive({
  code: "map image",
  units: "pixels",
  extent: imgExtent,
});

/// -- View --
//const viewSize = ref([100, 100]);
let viewCenter = ref([0, 0]);
let viewExtent = ref([0, 0, 0, 0]);
let viewProjection = reactive({
  code: "map",
  units: "pixels",
  extent: viewExtent,
});

/// -- Characters --
let name = ref("my name");
let selectedCharacter = ref("");
let selectedMapCharacter = ref<Character>();
let onMap = computed(() => session.characters.filter((v) => v.isOnMap));
let notOnMap = computed(() => session.characters.filter((v) => !v.isOnMap));
//let addToMap = computed(() => session.characters.filter((v) => !v.isOnMap));

/// == Functions ==

function loadMap(url: string) {
  imgUrl.value = url;

  getImageSize(imgUrl.value).then(
    (value) => {
      console.log(value);
      setMapProperties([value[0], value[1]]);
      mapIsLoaded.value = true;
    },
    (error) => {}
  );
}

function setMapProperties(dimensions: [number, number]) {
  imgSize.value = [dimensions[0], dimensions[1]];
  imgExtent.value = [0, 0, ...imgSize.value];
  imgProjection = reactive({
    code: "",
    units: "pixels",
    extent: imgExtent,
  });

  viewCenter.value = [imgSize.value[0] / 2, imgSize.value[1] / 2];
  viewExtent.value = [0, 0, ...imgSize.value];
  viewProjection = reactive({
    code: "",
    units: "pixels",
    extent: viewExtent,
  });
}

/// -- Image --

function getImageSize(url: string) {
  return new Promise<[number, number]>((resolve, reject) => {
    const img = new Image();
    img.onload = (ev) => {
      resolve([img.width, img.height]);
    };
    img.onerror = (e) => reject(e);
    img.src = url;
  });
}

/// -- Characters --
function addToMap() {
  selectedCharacter.value;
  let character = session.characters.find((v) => v.id == selectedCharacter.value);
  if (!character) return;
  character.mapPosition = getRelativeMapPosition(50, 50);
  character.isOnMap = true;
}

function getRelativeMapPosition(percX: number, percY: number): [number, number] {
  return [(imgSize.value[0] * percX) / 100, (imgSize.value[1] * percY) / 100];
}

function getMousePosition(ev: { coordinate?: [number, number] }) {
  if (ev.coordinate && selectedMapCharacter.value) {
    selectedMapCharacter.value.mapPosition = ev.coordinate;
  }
}

function selectCharacter(character: Character) {
  if (!selectedMapCharacter.value) selectedMapCharacter.value = character;
  else selectedMapCharacter.value = undefined;
}

/// == Script ==

loadMap("./maps/pinescot_farm_ground.png");

//setMapProperties([5632, 4080]);
</script>

<style scoped>
.map-controls {
  width: 100%;
  height: 20vh;
}

.map-container {
  width: 100%;
  height: 75vh;
  position: relative;
  border: 10px solid green;
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
  user-select: none;
}

.map-character-overlay {
  transform: translate(-24px, -24px);
}
</style>
