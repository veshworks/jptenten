<script setup lang="ts">
type LyricsRaw = {
  kanji: string;
  translation: string;
  start: string;
  stop?: string;
}[];

type Lyrics = {
  kanji: string;
  translation: string;

  start: number;
  stop: number;
}[];

const props = defineProps<{
  lyrics: LyricsRaw;
}>();

const player = usePlayerStore();

function parseTime(timeString: string) {
  if (timeString === undefined) return 0;
  if (timeString === '+') return Infinity;

  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
}

const lyricsEdit = ref<Lyrics>([]);

watch(() => props.lyrics, () => {
  lyricsEdit.value = props.lyrics.map((item, index, array) => {
    // set '+' to stop if next.start === item.start
    const next = array[index + 1];
    const stop = next?.start === item.start
      ? '+'
      : item?.stop ?? next?.start ?? '+';

    return {
      ...item,
      start: parseTime(item.start),
      stop: parseTime(stop),
    };
  });
}, { immediate: true });

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

  const last = lyricsEdit.value[index - 1] ?? null;
  const self = lyricsEdit.value[index];

  // Update the current line
  if (last) last.stop = snap;
  self.start = snap;
};

const markStop = (index: number) => {
  const snap = player.currentTime;

  // Update the current line
  lyricsEdit.value[index].stop = snap;
};

const exportLyrics = computed(() => {
  const formatTime = (time: number) => {
    if (time === Infinity) return '+';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor((time % 60) * 1000) / 1000;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const yamlLines = lyricsEdit.value.map((line) => {
    const copy = JSON.parse(JSON.stringify(line));

    copy.start = formatTime(copy.start);
    copy.stop = formatTime(copy.stop);

    const toYalmProp = ([key, value]: [string, any]) => `${key}: ${value}`;

    return '  - ' + Object.entries(copy).map(toYalmProp).join('\n    ');
  });

  return 'lyrics:\n' + yamlLines.join('\n');
});
</script>

<template>
  <div class="lyrics">
    <div
      v-for="(item, index) in lyricsEdit"
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

  <code>
    <pre>{{ exportLyrics }}</pre>
  </code>
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

  &:hover .lyrics__line-actions {
    display: grid;
  }
}

.lyrics__line--active {
  color: var(--color-primary-pure);
}
</style>
