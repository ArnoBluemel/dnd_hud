<template>
  <div class="map">
    {{name}}
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch, shallowRef } from 'vue'

export default defineComponent({
  components: {},
  setup(props, context) {
   let name = ref("my name")
    return {
      name,
    }
  },
})
</script>
