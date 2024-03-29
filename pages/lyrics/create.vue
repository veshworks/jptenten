<script setup lang="ts">
import { stringify } from 'yaml';

const doc = ref({
  title: '',
  artist: '',
  player: {
    type: 'youtube',
    source: '',
  },
  lyrics: [],
});

// download yaml file
const onSubmit = (e: Event) => {
  e.preventDefault();

  const yamlString = stringify(doc.value);
  const blob = new Blob([yamlString], { type: 'text/yaml' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${doc.value.artist} - ${doc.value.title}.yaml`;
  a.click();

  URL.revokeObjectURL(url);
};
</script>

<template>
  <div>
    <h1>
      create
    </h1>

    <form @submit.prevent="onSubmit">
      <UiInput
        id="artist"
        v-model="doc.artist"
        label="Artist"
        type="text"
      />

      <UiInput
        id="title"
        v-model="doc.title"
        label="Title"
        type="text"
      />

      <fieldset>
        <legend>player</legend>

        <UiInput
          id="player-type"
          v-model="doc.player.type"
          label="type"
          type="select"
          :options="['youtube']"
        />

        <UiInput
          id="player-source"
          v-model="doc.player.source"
          label="source"
          type="text"
        />
      </fieldset>

      <button type="submit">
        download lyric file
      </button>
    </form>
  </div>
</template>

<style lang="scss">
</style>
