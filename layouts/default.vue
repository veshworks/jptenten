<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="navbar">
      <strong class="title-1">
        JP点々
      </strong>

      <header>
        <nav class="nav">
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </nav>
      </header>
    </div>

    <slot />

    <footer class="my-1200 text-center">
      made with love by veshworks &copy; {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-0300) 0;
  margin-bottom: var(--space-0300);
  border-bottom: 1px solid var(--color-100);
}

.nav {
  display: flex;
  gap: var(--space-0200);
  margin: var(--space-0300) 0;
}
</style>
