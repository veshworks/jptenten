<script setup lang="ts">
const props = defineProps<{
  currentTime: number;
  lyrics: {
    kanji: string;
    translation: string;
    start: string;
    stop: string;
  }[];
}>();
</script>

<template>
  <div class="lyrics">
    <div
      v-for="(item) in props.lyrics"
      :key="item.start"
    >
      {{ item.kanji }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lyrics {
  display: grid;
  gap: var(--space-0100);
  grid-auto-rows: min-content;
  font-size: var(--font-size-400);
}
</style>
