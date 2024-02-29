<script setup lang="ts">
definePageMeta({
  titleTemplate: '%s | 歌詞',
});

const route = useRoute();
</script>

<template>
  <ContentDoc
    v-slot="{ doc }"
    tag="main"
    head
  >
    <h1>{{ doc.title }}</h1>

    <SongPlayer
      v-bind="doc.player"
      class="my-0500"
    />

    <SongLyricsEditor
      v-if="route.query.edit"
      :lyrics="doc.lyrics"
    />
    <SongLyrics
      v-else
      :lyrics="doc.lyrics"
    />
  </ContentDoc>
</template>
