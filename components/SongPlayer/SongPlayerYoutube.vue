<script setup lang="ts">
defineProps<{
  source: string;
}>();
</script>

<template>
  <div class="player">
    <iframe
      width="560"
      height="315"
      :src="source"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
  </div>
</template>

<style lang="scss" scope>
.player {
  & > iframe {
    aspect-ratio: 16 / 9;
    height: 100%;
    width: 100%;
  }
}
</style>
