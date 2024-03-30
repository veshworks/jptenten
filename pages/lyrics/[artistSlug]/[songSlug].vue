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
    <header>
      <h1>{{ doc.title }}</h1>

      <p>
        <router-link
          v-if="!route.query.edit"
          :to="{ query: { edit: 'true' } }"
        >
          編集
        </router-link>
        <router-link
          v-else
          :to="{ query: { edit: undefined } }"
        >
          閉じる
        </router-link>
      </p>
    </header>

    <SongPlayer
      v-bind="doc.player"
      class="my-0500"
    />

    <SongLyricsEditor
      v-if="route.query.edit"
      :doc="doc"
    />
    <SongLyrics
      v-else
      :doc="doc"
    />
  </ContentDoc>
</template>
