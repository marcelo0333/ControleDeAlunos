<template>
        <button
        type="submit"
        :disabled="carregando"
        class="bg-blue-500 text-white  p-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 w-20"
        @click="$emit('submit')"
        >
        {{ carregando ? 'Entrando...':texto }}
        </button>
</template>

<script setup lang="ts">
defineProps<{
  carregando: boolean;
  texto: string;
}>()
defineEmits<{
  (e: 'submit'): void;
}>()
</script>

<style scoped>

</style>
