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

function parseTime(timeString: string) {
  if (timeString === '+') return Infinity;

  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
}

const lyrics = computed(() => {
  return props.lyrics.map((item, index, array) => {
    const stop = item.stop ?? array[index + 1]?.start ?? '+';

    return {
      ...item,
      start: parseTime(item.start),
      stop: parseTime(stop),
    };
  });
});

function isBetween(start: number, stop: number) {
  return player.currentTime >= start
    && player.currentTime < stop;
}

const playAt = (time: number) => {
  player.currentTime = time;
  player.currentState = 'playing';
};
</script>

<template>
  <div class="lyrics">
    <div
      v-for="(item) in lyrics"
      :key="item.start"
      :class="['lyrics__line', {
        'lyrics__line--active': isBetween(item.start, item.stop)
      }]"
    >
      <div>{{ item.kanji }}</div>

      <button
        @click="playAt(item.start)"
      >
        play
      </button>

      <button
        @click="player.currentState = 'paused'"
      >
        pause
      </button>
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

.lyrics__line {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: var(--space-0100);

  button {
    display: none;
  }

  &:hover button {
    display: block;
  }
}

.lyrics__line--active {
  color: var(--color-primary-pure);
}
</style>
