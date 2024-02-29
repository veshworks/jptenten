import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('player', () => {
  const actualState = ref<'playing' | 'paused'>('paused');
  const requestedState = ref<'playing' | 'paused' | null>(null);

  const currentState = computed({
    get: () => actualState.value,
    set: (state: 'playing' | 'paused') => {
      requestedState.value = state;
    },
  });

  const actualTime = ref(0);
  const requestedTime = ref<number | null>(null);

  const currentTime = computed({
    get: () => actualTime.value,
    set: (time: number) => {
      requestedTime.value = time;
    },
  });

  return {
    requestedState,
    actualState,
    currentState,

    actualTime,
    requestedTime,
    currentTime,
  };
});
