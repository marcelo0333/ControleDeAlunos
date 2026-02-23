<template>
  <div class="p-4 h-full">
    <h1 class="text-2xl font-bold mb-4">Lista de Alunos</h1>
  <div class="overflow-x-auto rounded-xl shadow-xl border-1 border-gray-400">
    <table class="w-full text-sm text-left text-gray-500 border-0">
        <thead class="bg-gray-800 text-white uppercase text-xs">
          <tr>
            <th class="px-4 py-3">Nome</th>
            <th class="px-4 py-3">CPF</th>
            <th class="px-4 py-3">Curso</th>
            <th class="px-4 py-3">Status</th>
            <th class=" py-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aluno in alunos" :key="aluno.id">
            <td class="border-collapse px-4 py-2">{{ aluno.nome }}</td>
            <td class="border-collapse px-4 py-2">{{ aluno.cpf }}</td>
            <td class="border-collapse px-4 py-2">{{ aluno.curso.nome }}</td>
            <td class="border-collapse px-4 py-2">
              <span :class="aluno.status === 'ATIVO' ? 'bg-green-500' : 'bg-red-500'" class="text-white font-bold py-1 px-2 rounded">
                {{ aluno.status }}
              </span>
            </td>
            <td class="border-collapse  py-2">
              <button @click="abrirModal(aluno)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Visualizar</button>
              <ModalAluno :open="modalAberto" :aluno="alunoSelecionado" @close="fecharModal" />
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2">Editar</button>
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">Excluir</button>
            </td>
          </tr>
        </tbody>
    </table>
  </div>


  </div>
</template>

<script setup lang="ts">
import { getAlunos } from '@/services/alunos/aluno.service';
import type { AlunoDTO } from '@/types/alunos';
import { onMounted, ref } from 'vue';
import ModalAluno from './ModalAluno.vue';

const alunos = ref([] as AlunoDTO[]);
const alunoSelecionado = ref(null as AlunoDTO | null);
const modalAberto = ref(false);

onMounted(async () => {
  alunos.value = await getAlunos()
})

const abrirModal = (aluno: AlunoDTO) => {
  alunoSelecionado.value = aluno;
  modalAberto.value = true;
}
const fecharModal = () => {
  alunoSelecionado.value = null;
  modalAberto.value = false;
}
</script>

<style scoped>

</style>

