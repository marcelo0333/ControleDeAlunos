<template>
  <AppModal :open="open" title="Detalhes do Aluno" @close="$emit('close')">
    <h1 class="text-xl font-bold ">Dados</h1>
    <div class="p-4">
      <h2 class="text-lg font-bold mb-2">{{ props.aluno?.nome }}</h2>
      <p><strong>CPF:</strong> {{ props.aluno?.cpf }}</p>
      <p><strong>Curso:</strong> {{ props.aluno?.curso.nome }}</p>
      <p><strong>Status:</strong>
        <span :class="props.aluno?.status === 'ATIVO' ? 'bg-green-500' : 'bg-red-500'" class="text-white font-bold py-1 px-2 rounded">
          {{ props.aluno?.status }}
        </span>
      </p>
      <p><strong>Data de Nascimento:</strong> {{ props.aluno?.dt_nascimento }}</p>
    </div>
    <h1 class="text-xl font-bold mb-4">Curso</h1>
    <div class="p-4">
      <p><strong>Matriculado em:</strong> {{ props.aluno?.curso.nome }}</p>
      <p><strong>Data de Inicio:</strong> {{ props.aluno?.curso.dt_inicio }}</p>
      <p><strong>Data de Fim:</strong> {{ props.aluno?.curso.dt_fim }}</p>
      <p><strong>Docente:</strong> {{ props.aluno?.curso.docente }}</p>
    </div>
    <div class="flex justify-center mt-4">
    <button @click="$emit('close')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Gerar Hash</button>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from './ui/AppModal.vue';
import type { AlunoDTO } from '@/types/alunos';

defineEmits(['close']);
const props = defineProps<{
  open: boolean;
  aluno: AlunoDTO | null;
}>();

</script>

<style scoped>

</style>
