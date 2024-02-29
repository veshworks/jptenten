<script setup lang="ts">
const props = defineProps<{
  type: 'youtube';
  source: string;
}>();
</script>

<template>
  <SongPlayerYoutube
    v-if="props.type === 'youtube'"
    :id="props.source"
  />
</template>
