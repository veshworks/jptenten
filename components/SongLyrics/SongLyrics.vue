<script setup lang="ts">
const props = defineProps<{
  lyrics: {
    kanji: string;
    translation: string;
    start: string;
    stop: string;
  }[];
}>();

const player = usePlayerStore();

function isBetween(start: string, stop: string) {
  return player.currentTime >= parseInt(start, 10)
    && player.currentTime <= parseInt(stop, 10);
}
</script>

<template>
  <div class="lyrics">
    <div
      v-for="(item) in props.lyrics"
      :key="item.start"
      :class="{
        'lyrics__line--active': isBetween(item.start, item.stop)
      }"
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
