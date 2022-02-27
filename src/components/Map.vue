<template>
  <div class="map" style="height: 100%; width: 100%">
    <!-- Map Controls -->
    <div class="row">
      <div class="map-controls">
        <div class="row" style="height: 100%">
          <div class="col-7">
            <div class="row map-control-row">
              <div class="col-4">
                <b-button pill variant="dark" class="map-button" @click="triggerFileUpload()">Load Map</b-button>
                <input ref="file" id="fileInput" v-on:change="handleFileUpload()" type="file" accept="image/*" hidden />
              </div>
              <div class="col-4">
                <b-button pill variant="dark" class="map-button" @click="unloadMap()">Unload Map</b-button>
              </div>
              <div class="col-4">
                <b-button pill variant="dark" class="map-button" @click="() => session.removeAllCharactersFromMap()">Clear Map</b-button>
              </div>
            </div>
            <div class="row map-control-row">
              <div class="col-6">
                <b-form-select v-model="selectedCharacter" class="map-select">
                  <!-- <template #first>
                <b-form-select-option :value="null" disabled>-- Select A Character --</b-form-select-option>
              </template> -->
                  <b-form-select-option v-for="character in notOnMap" :key="character.id" :value="character.id">
                    {{ character.name }}
                  </b-form-select-option>
                </b-form-select>
              </div>
              <div class="col-6">
                <b-button
                  pill
                  variant="dark"
                  class="map-button"
                  @click="() => session.addCharacterToMap(selectedCharacter)"
                  :disabled="!mapIsLoaded || !characterIsSelected"
                  >Add Character To Map</b-button
                >
              </div>
            </div>
          </div>
          <div class="col-5" style="height: 100%">
            <ul class="map-scrollable-list">
              <div v-for="player in onMap" :key="player.id" class="row">
                <div class="col-2">
                  <color-picker v-model:pureColor="player.mapColor" shape="circle" />
                </div>
                <p class="container-text col-8">{{ player.name }}</p>
                <p class="col-2" @click="session.removeFromMap(player.id)">❌</p>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 1vh" />
    <!-- Map -->
    <div class="row">
      <div class="map-container">
        <!--img src="./../assets/pinescot_farm_ground.png" class="col" /-->
        <ol-map
          v-if="mapIsLoaded"
          :loadTilesWhileAnimating="true"
          :loadTilesWhileInteracting="true"
          style="width: 100%; height: 100%; position: absolute; left: 0px"
          @pointermove="getMousePosition"
        >
          <ol-view
            ref="view"
            :center="viewCenter"
            :rotation="rotation"
            :zoom="zoom"
            :projection="viewProjection"
            :extent="viewExtent"
            :smoothExtentConstraint="false"
          />

          <ol-image-layer>
            <ol-source-image-static :url="imgUrl" :imageSize="imgSize" :imageExtent="imgExtent" :projection="imgProjection" />
          </ol-image-layer>

          <ol-overlay
            v-for="character in onMap"
            class="map-character-overlay"
            :position="[character.mapPosition[0], character.mapPosition[1]]"
            @pointerdown="selectCharacter(character)"
          >
            <template v-slot="slotProps">
              <div class="map-character hover-text-base" :style="{ 'background-color': character.mapColor, color: character.mapColor }">
                <div class="map-character-name" :style="{ color: character.mapColor }">
                  {{ character.name.substring(0, 2) }}
                </div>
                <p class="hover-text">{{ character.name }}</p>
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
const file = ref<any>(null);

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
let selectedCharacter = ref("");
let characterIsSelected = ref(false);
let selectedMapCharacter = ref<Character>();
let onMap = computed(() => session.characters.filter((v) => v.isOnMap));
let notOnMap = computed(() => session.characters.filter((v) => !v.isOnMap));
//let addToMap = computed(() => session.characters.filter((v) => !v.isOnMap));

/// == Functions ==

/// -- Image --
function loadMap(url: string) {
  imgUrl.value = url;

  getImageSize(imgUrl.value).then(
    (value) => {
      setMapProperties([value[0], value[1]]);
      mapIsLoaded.value = true;
    },
    (error) => {}
  );
}

function unloadMap() {
  mapIsLoaded.value = false;
  session.removeAllCharactersFromMap();
}

function setMapProperties(dimensions: [number, number]) {
  imgSize.value = session.mapSize = [dimensions[0], dimensions[1]];
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

const handleFileUpload = async () => {
  session.removeAllCharactersFromMap();
  let url = URL.createObjectURL(file.value.files[0]);
  loadMap(url);
};

function triggerFileUpload() {
  document.getElementById("fileInput")?.click();
}

/// -- Characters --

function getMousePosition(ev: { coordinate?: [number, number] }) {
  if (ev.coordinate && selectedMapCharacter.value) {
    selectedMapCharacter.value.mapPosition = ev.coordinate;
  }
}

function selectCharacter(character: Character) {
  if (!selectedMapCharacter.value) selectedMapCharacter.value = character;
  else selectedMapCharacter.value = undefined;
}

watch(selectedCharacter, (newValue) => {
  characterIsSelected.value = newValue != "";
});

/// == Script ==

loadMap("./maps/pinescot_farm_ground.png");
</script>

<style lang="scss" scoped>
@import "../index.scss";

.map-controls {
  width: 100%;
  height: 20vh;
  @extend .subcontainer;
}

.map-container {
  width: 100%;
  height: 75vh;
  position: relative;
  @extend .subcontainer;
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
  @extend .container-text-alt;
  user-select: none;
}

.map-character-overlay {
  transform: translate(-24px, -24px);
}

.map-button {
  @extend .container-button;
  height: 100%;
}

.map-select {
  @extend .container-select;
  height: 100%;
}

.map-control-row {
  height: calc(50% - 7.5px);
  margin-top: 5px;
}

.map-scrollable-list {
  @extend .container-scrollable-list;
  height: calc(100% - 20px);
  margin-top: 10px;
}
</style>
