<script setup lang="ts">
const props = defineProps<{
  doc: any;
}>();

const { song, download } = useSongYaml(props.doc);

const player = usePlayerStore();

function isBetween(start: number, stop: number) {
  return player.currentTime >= start
    && player.currentTime < stop;
}

const playAt = (time: number) => {
  player.currentTime = time;
  player.currentState = 'playing';
};

const markStart = (index: number) => {
  const humanDelay = 0.100;
  const snap = player.currentTime - humanDelay;

  const last = song.lyrics[index - 1] ?? null;
  const self = song.lyrics[index];

  // Update the current line
  if (last) last.stop = snap;
  self.start = snap;
};

const markStop = (index: number) => {
  const snap = player.currentTime;

  // Update the current line
  song.lyrics[index].stop = snap;
};
</script>

<template>
  <div class="lyrics">
    <div
      v-for="(item, index) in song.lyrics"
      :key="item.start"
      :class="['lyrics__line', {
        'lyrics__line--active': isBetween(item.start, item.stop)
      }]"
    >
      <div>{{ item.kanji }}</div>

      <div class="lyrics__line-actions">
        <button
          @click="playAt(item.start)"
        >
          play
        </button>

        <button
          @click="markStart(index)"
        >
          start
        </button>

        <button
          @click="markStop(index)"
        >
          stop
        </button>
      </div>
    </div>
  </div>

  <button
    class="mt-0300"
    @click="download"
  >
    download lyric file
  </button>
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
  grid-template-columns: 1fr auto;
  gap: var(--space-0100);

  .lyrics__line-actions {
    display: none;
    grid-template-columns: repeat(3, auto);
    gap: var(--space-0050);
  }

  &:hover {
    background-color: var(--color-sugar-pure);

    .lyrics__line-actions {
      display: grid;
    }
  }
}

.lyrics__line--active {
  color: var(--color-primary-pure);
}
</style>
