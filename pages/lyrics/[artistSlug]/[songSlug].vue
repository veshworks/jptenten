<script setup lang="ts">
definePageMeta({
  titleTemplate: '%s | 歌詞',
});
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

    <SongLyrics
      :lyrics="doc.lyrics"
      :current-time="0"
    />
  </ContentDoc>
</template>
