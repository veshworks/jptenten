import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('player', () => {
  const actualTime = ref(0);
  const requestedTime = ref(0);

  const seekTo = (time: number) => {
    requestedTime.value = time;
  };

  const currentTime = computed({
    get: () => actualTime.value,
    set: (time: number) => {
      seekTo(time);
    },
  });

  return {
    actualTime,
    requestedTime,

    seekTo,

    currentTime,
  };
});
