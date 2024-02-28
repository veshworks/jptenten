<script setup lang="ts"></script>

<template>
  <main>
    <h1>JP点々</h1>

    <p>
      点々(てんてん) is the colloquial term for
      濁点(だくてん), which is a diacritic used in Japanese
      to indicate that the consonant of a syllable should be pronounced voiced.
      So it's a good play on words, you know? Japanese, but voiced, you know?
      Or rather sang.
    </p>
    <p>
      This project is also inspired by <a href="https://jpmarumaru.com">jpmarumaru.com</a>,
      which, in turn, use the name marumaru and 丸(まる) is
      the colloquial term for 半濁点(はんだくてん), which
      is another diacritic that is usually taught together with
      濁点(だくてん), so I think the name is very fitting,
      anyway, rejoice.
    </p>

    <hr class="my-0300">

    <h2>song list</h2>

    <ContentList
      v-slot="{ list }"
      path="/lyrics"
    >
      <ul>
        <li
          v-for="item in list"
          :key="item._path"
        >
          <NuxtLink :to="item._path">
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </ContentList>
  </main>
</template>
