<template>
  <Teleport to="body">
    <div
      v-if="props.open"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 border-b-1 border-gray-500">
          {{ props.title }}
        </h2>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  title?: string;
}>();
defineEmits(["close"]);
</script>

<style scoped></style>
