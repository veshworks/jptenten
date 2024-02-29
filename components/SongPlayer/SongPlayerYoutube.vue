<script setup lang="ts">
const props = defineProps<{
  id: string;
  title: string;
}>();

const wrapperEl = ref<HTMLElement | null>(null);

/**
 * @link https://developers.google.com/youtube/iframe_api_reference
 */
const player = ref<any>(null);

const getWindow = () => window as any;

const onYouTubeIframeAPIReady = () => {
  const container = wrapperEl.value?.getBoundingClientRect() ?? new DOMRect(0, 0, 640, 390);

  player.value = new (getWindow()).YT.Player('song-player-youtube', {
    height: container.height,
    width: container.width,
    videoId: props.id,
    playerVars: {
      origin: getWindow().location.origin,
    },
    events: {
    },
  });
};

onMounted(() => {
  const tag = document.createElement('script');
  tag.id = 'youtube-iframe-api';
  tag.src = 'https://www.youtube.com/iframe_api';

  if (!document.getElementById(tag.id)) {
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    (getWindow()).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  } else {
    onYouTubeIframeAPIReady();
  }
});

onUnmounted(() => {
  player.value?.destroy();
  document.querySelector('iframe#song-player-youtube')?.remove();
});

const playerStore = usePlayerStore();

watch(() => playerStore.requestedTime, (time) => {
  if (time === null) return; // prevent loop
  playerStore.requestedTime = null;

  player.value?.seekTo(time);
});

const currentTimeTimeout = ref<any>(null);

watch(player, () => {
  if (player.value === null) {
    if (currentTimeTimeout.value) {
      clearInterval(currentTimeTimeout.value);
    }

    return;
  }

  currentTimeTimeout.value = setInterval(() => {
    if (!player.value) return;
    if (typeof player.value.getCurrentTime !== 'function') return;

    playerStore.actualTime = player.value?.getCurrentTime();
  }, 1);
});

onUnmounted(() => {
  clearInterval(currentTimeTimeout.value);
});
</script>

<template>
  <div class="container">
    <div
      id="song-player-youtube"
      ref="wrapperEl"
      class="player"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}

.player {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  background-color: var(--color-gray-100);
}
</style>
