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

    <ul>
      <li
        v-for="(item, index) in doc.lyrics"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </ContentDoc>
</template>
