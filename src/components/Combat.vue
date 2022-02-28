<template>
  <div class="row stat-block-container"></div>
  <div style="height: 1vh"></div>
  <div class="row initiative-container">
    <div class="spinwheel-frame">
      <div class="spinwheel">
        <div class="spinwheel-segment" style="color: transparent"></div>
        <div
          class="spinwheel-segment"
          v-for="entry in combatants"
          :style="{
            transform: 'rotate(' + entry[0] * (360 / numberOfCombatants) + 'deg)',
            borderColor: entry[1].mapColor,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Character } from "../character";
import { computed, Ref, ref, watch } from "vue";
import { session } from "./../dnd_session";

const combatants = computed(() => {
  let dict = new Map<number, Character>();
  let chars = session.characters.filter((v) => v.inCombat);
  for (let i = 0; i < chars.length; i++) {
    dict.set(i, chars[i]);
  }
  return dict;
});
const numberOfCombatants = computed(() => combatants.value.size);
const colors = ref(["red", "blue", "yellow"]);
const angle = ref<number>(0);
</script>

<style lang="scss" scoped>
@import "../index.scss";

.stat-block-container {
  @extend .subcontainer;
  height: 39vh;
}

.initiative-container {
  @extend .subcontainer;
  height: 56vh;
}

.spinwheel-frame {
  border: 10px ridge gold;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  margin-left: calc(50% - 150px);
  margin-top: 10px;
}

.spinwheel {
  background-color: silver;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  position: relative;
  left: -12px;
  //overflow: hidden;
}

.spinwheel-segment {
  position: absolute;
  top: 27.5%;
  height: 50%;
  left: 50%;
  width: 100%;
  color: white;
  text-align: right;
  padding-right: 10px;
  display: block;
  transform-origin: left center;

  &:before,
  &:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
  }

  &:before {
    margin-bottom: -1px;
    margin-top: -2px;
    border-width: 0 0 69.5px 280px;
    //border-color: transparent transparent gray transparent;
  }

  &:after {
    margin-top: -1px;
    margin-bottom: -2px;
    border-width: 0 280px 450px 0;
    //border-color: transparent gray transparent transparent;
  }

  .label {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 70%;
    line-height: 100px;
    padding-top: 1px;
    padding-bottom: 1px;
    font-size: 16px;
    text-align: right;
    padding-left: 20px;
  }
}

// ================================================================

//.dial {
//  height: 100%;
//  transition: all 5s ease-out;
//  animation-fill-mode: forwards;
//  animation-timing-function: linear;
//
//  //&.spinning {
//  //	animation-duration: 5s;
//  //	animation-timing-function: cubic-bezier(0.440, -0.205, 0.000, 1.130);
//  //	animation-name: spinning;
//  //}
//
//  &:before {
//    content: "";
//    text-align: center;
//    display: block;
//    line-height: 60px;
//    position: absolute;
//    height: 40px;
//    width: 40px;
//    background: white;
//    box-shadow: 0 0 5px 5px rgba(#000, 0.1);
//    top: 50%;
//    left: 50%;
//    margin-top: -20px;
//    margin-left: -20px;
//    border-radius: 100%;
//    z-index: 200;
//  }
//
//  .slice {
//    z-index: 150;
//    position: absolute;
//    top: calc(50% - #{$sliceOffeset});
//    height: $sliceHeight;
//    left: 50%;
//    width: 50%;
//    color: white;
//    text-align: right;
//    padding-right: 10px;
//    display: block;
//    transform-origin: left center;
//
//    &:before,
//    &:after {
//      content: "";
//      display: block;
//      width: 0;
//      height: 0;
//      border-style: solid;
//    }
//
//    &:before {
//      margin-bottom: -1px;
//      margin-top: -2px;
//      border-width: 0 0 (($sliceHeight / 2) + 4px) $radius;
//      border-color: transparent transparent $sliceColor transparent;
//    }
//
//    &:after {
//      margin-top: -1px;
//      margin-bottom: -2px;
//      border-width: 0 $radius (($sliceHeight / 2) + 4px) 0;
//      border-color: transparent $sliceColor transparent transparent;
//    }
//
//    &:nth-child(even) {
//      &:after {
//        border-color: transparent darken($sliceColor, 10%) transparent transparent;
//      }
//      &:before {
//        border-color: transparent transparent darken($sliceColor, 10%) transparent;
//      }
//    }
//
//    .label {
//      position: absolute;
//      top: 0;
//      bottom: 0;
//      width: 70%;
//      line-height: $sliceHeight;
//      padding-top: 1px;
//      padding-bottom: 1px;
//      font-size: 16px;
//      text-align: right;
//      padding-left: 20px;
//    }
//
//    &:nth-child(1) {
//      transform: rotate(0deg);
//    }
//    &:nth-child(2) {
//      transform: rotate(30deg);
//    }
//    &:nth-child(3) {
//      transform: rotate(60deg);
//    }
//    &:nth-child(4) {
//      transform: rotate(90deg);
//    }
//    &:nth-child(5) {
//      transform: rotate(120deg);
//    }
//    &:nth-child(6) {
//      transform: rotate(150deg);
//    }
//    &:nth-child(7) {
//      transform: rotate(180deg);
//    }
//    &:nth-child(8) {
//      transform: rotate(210deg);
//    }
//    &:nth-child(9) {
//      transform: rotate(240deg);
//    }
//    &:nth-child(10) {
//      transform: rotate(270deg);
//    }
//    &:nth-child(11) {
//      transform: rotate(300deg);
//    }
//    &:nth-child(12) {
//      transform: rotate(330deg);
//    }
//  }
//}
</style>
