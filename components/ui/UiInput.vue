<script setup lang="ts">
const value = defineModel<string>();
const props = defineProps<{
  label: string;
  id: string;
  type: 'text' | 'select';
  options?: string[] | Record<string, string>;
}>();

const options = computed(() => {
  if (props.type !== 'select') return [];

  if (Array.isArray(props.options)) {
    return props.options.map(value => ({ value, text: value }));
  }

  return Object.entries(props.options).map(([value, text]) => ({ value, text }));
});
</script>

<template>
  <label :for="props.id">
    <p>{{ props.label }}</p>

    <select
      v-if="props.type === 'select'"
      :id="props.id"
    >
      <option
        v-for="option in options.value"
        :key="option.value"
        :value="option.value"
        v-text="option.text"
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
