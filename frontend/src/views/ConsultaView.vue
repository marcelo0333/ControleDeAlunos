<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-300">
    <h1 class="text-2xl font-bold text-gray-800">Consulta de Validação</h1>
    <p>Hash: {{ route.params.hash }}</p>
    <div v-if="resultado !== 'Carregando...'" class="mt-4 p-4 bg-white rounded shadow">
      <p class="text-gray-700">Resultado da validação: <span :class="resultado === 'Certificado válido!' ? 'text-green-600' : 'text-red-600'">{{ resultado }}</span></p>
      <div v-if="aluno" class="mt-4">
        <h2 class="text-lg font-semibold text-gray-800">Detalhes do Aluno</h2>
        <p class="text-gray-700">Nome: {{ aluno?.nome }}</p>
        <p class="text-gray-700">CPF: {{ aluno?.cpf }}</p>
        <p class="text-gray-700">Curso: {{ aluno?.curso?.nome }}</p>
        <p class="text-gray-700">Codigo de Validaçao: {{ aluno?.validation_code }}</p>
        <div class="flex justify-center mt-4">
          <a
            v-if="dowloadCertificadoUrl"
            :href="dowloadCertificadoUrl"
            target="_blank"
            class="bg-blue-800 hover:bg-blue-900 transition duration-300 ease-in-out hover:scale-105 text-white font-bold py-2 px-6 rounded"
          >
            Baixar Certificado
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { validarHash } from '@/services/alunos/aluno.service';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import type { AlunoPublicoDTO } from '../types/alunos';

const resultado = ref('Carregando...');
const aluno = ref<AlunoPublicoDTO | null>(null);
const route = useRoute();

onMounted(async () => {
  const hash = route.params.hash as string;
  try {
    const response = await validarHash(hash);
    resultado.value = response.status === 200 ? 'Certificado válido!' : 'Certificado inválido.';
    aluno.value = response.data?.aluno;
  } catch (error) {
    resultado.value = 'Erro ao validar o certificado.';
  }
});

const apiUrl = import.meta.env.VITE_API_URL;

const dowloadCertificadoUrl = computed(() => {
  if (!aluno.value?.download) return null;
  return `${apiUrl}${aluno.value.download}`;
});

</script>

<style scoped>

</style>
