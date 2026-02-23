<template>
  <div class="p-4 h-full">
    <h1 class="text-2xl font-bold mb-4">Lista de Alunos</h1>
    <ul class="space-y-2">
      <li
        v-for="aluno in alunos"
        :key="aluno.id"
        class="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition cursor-pointer"
      >
        {{ aluno.nome }} - {{ aluno.cpf }}
      </li>
    </ul>

  </div>
</template>

<script setup lang="ts">
import { getAlunos } from '@/services/alunos/aluno.service';
import type { AlunoDTO } from '@/types/alunos';
import { onMounted, ref } from 'vue';

const alunos = ref([] as AlunoDTO[]);

onMounted(async () => {
  alunos.value = await getAlunos()
})


</script>

<style scoped>

</style>

