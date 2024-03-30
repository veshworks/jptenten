<script setup lang="ts">
const { song, download } = useSongYaml();

// download yaml file
const onSubmit = (e: Event) => {
  e.preventDefault();
  download();
};

const lyrics = computed({
  get: () => song.value.lyrics.map(line => line.kanji).join('\n'),
  set: (value: string) => {
    song.value.lyrics = value.split('\n').map((kanji: string) => ({
      kanji,
      translation: '',
      start: '+',
    }));
  },
});

const translation = computed({
  get: () => song.value.lyrics.map(line => line.translation).join('\n'),
  set: (value: any) => {
    const translations = value.split('\n');

    song.value.lyrics.forEach((line, index) => {
      line.translation = translations[index];
    });
  },
});
</script>

<template>
  <div>
    <h1>
      create
    </h1>

    <form
      class="gy-0200"
      @submit.prevent="onSubmit"
    >
      <UiInput
        id="artist"
        v-model="song.artist"
        label="Artist"
        type="text"
      />

      <UiInput
        id="title"
        v-model="song.title"
        label="Title"
        type="text"
      />

      <fieldset>
        <legend>player</legend>

        <UiInput
          id="player-type"
          v-model="song.player.type"
          label="type"
          type="select"
          :options="['youtube']"
        />

        <UiInput
          id="player-source"
          v-model="song.player.source"
          label="source"
          type="text"
        />
      </fieldset>

      <fieldset>
        <legend>lyrics</legend>

        <p class="mb-0200">
          Lines between original lyrics and translation are matched by line number.
        </p>

        <div class="gx-0200">
          <UiInput
            id="lyrics-kanji"
            v-model="lyrics"
            label="Original"
            type="textarea"
          />

          <UiInput
            id="lyrics-translation"
            v-model="translation"
            label="Translation"
            type="textarea"
          />
        </div>
      </fieldset>

      <div>
        <button type="submit">
          download lyric file
        </button>
      </div>
    </form>

    <p class="mt-0200">
      Open a Pull Request to add your lyric file to the <a href="https://github.com/veshworks/jptenten">jptenten</a>!
    </p>
  </div>
</template>
