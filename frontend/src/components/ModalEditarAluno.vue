<template>
  <AppModal :open="openEdicao" title="Detalhes do Aluno" @close="$emit('close')">
    <h1 class="text-xl font-bold ">Dados</h1>
    <div class="p-4">
      <div v-if="alunoEditado">
        <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input v-model="alunoEditado.nome" class="border rounded p-2 w-full mb-2" />
        <label class="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
        <input v-model="alunoEditado.dt_nascimento" type="date" class="border rounded p-2 w-full mb-2" />
      </div>
    </div>
    <div class="flex justify-center mt-4">
    <button @click="$emit('salvar', alunoEditado)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Confirmar edição</button>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AppModal from './ui/AppModal.vue';
import type { AlunoDTO, UpdateAlunoDTO } from '@/types/alunos';

defineEmits(['close',  'salvar']);
const props = defineProps<{
  openEdicao: boolean;
  aluno: AlunoDTO | null;
}>();

const alunoEditado = ref<UpdateAlunoDTO | null>(null);

const formatarParaInputDate = (data: Date | string) => {
  if (!data) return ''

  const date = typeof data === 'string' ? new Date(data) : data
  return date.toISOString().split('T')[0]
}
watch(() => props.aluno, (novoAluno) => {
  alunoEditado.value = novoAluno ? { ...novoAluno, dt_nascimento: formatarParaInputDate(novoAluno.dt_nascimento) } : null;
}, { immediate: true });
</script>

<style scoped>

</style>
