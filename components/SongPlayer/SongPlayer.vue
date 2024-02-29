<script setup lang="ts">
const props = defineProps<{
  type: 'youtube';
  source: string;
  title: string;
}>();
</script>

<template>
  <div>
    <SongPlayerYoutube
      v-if="props.type === 'youtube'"
      :id="props.source"
      :title="props.title"
    />
  </div>
</template>
