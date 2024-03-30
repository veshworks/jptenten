<script setup lang="ts">
const value = defineModel<string>({
  default: '',
});

const props = defineProps<{
  label: string;
  id: string;
  type: 'text' | 'select' | 'textarea';
  options?: string[];
}>();

const linesShown = computed(() => {
  if (props.type !== 'textarea') return 1;

  // btw, `value.value` is hilarious
  return Math.max(3, value.value.split('\n').length + 1);
});
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
    <textarea
      v-else-if="props.type === 'textarea'"
      :id="props.id"
      v-model="value"
      :style="{
        height: `calc(var(--field-height-offset) + var(--field-line-height) * ${linesShown})`,
      }"
    />
    <input
      v-else
      :id="props.id"
      v-model="value"
      :type="props.type"
    >
  </label>
</template>
