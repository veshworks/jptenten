<script setup lang="ts">
defineProps<{
  type: 'youtube';
  source: string;
}>();
</script>

<template>
  <SongPlayerYoutube
    v-if="type === 'youtube'"
    :source="source"
  />
</template>
