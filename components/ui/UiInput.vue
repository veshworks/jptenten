<script setup lang="ts">
const value = defineModel<string>();
const props = defineProps<{
  label: string;
  id: string;
  type: 'text' | 'select';
  options?: string[];
}>();
</script>

<template>
  <label :for="props.id">
    <p>{{ props.label }}</p>

    <select
      v-if="props.type === 'select'"
      :id="props.id"
      v-model="value"
    >
      <option
        v-for="item in props.options"
        :key="item"
        :value="item"
        v-text="item"
      />
    </select>
    <input
      v-else
      :id="props.id"
      v-model="value"
      :type="props.type"
    >
  </label>
</template>
