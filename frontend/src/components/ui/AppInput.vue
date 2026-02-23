<template>
  <div class="flex items-center gap-3">
    <label class="w-20">{{ label }}</label>
    <input
      :type="type ?? 'text'"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  modelValue: string;
  type?: string;
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()
</script>

<style scoped>

</style>
