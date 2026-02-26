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
            <th class="py-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aluno in alunos" :key="aluno.id">
            <td class="border-collapse px-4 py-2">{{ aluno.nome }}</td>
            <td class="border-collapse px-4 py-2">{{ aluno.cpf }}</td>
            <td class="border-collapse px-4 py-2">{{ aluno.curso.nome }}</td>
            <td class="border-collapse px-4 py-2">
              <span
                :class="aluno.status === 'ATIVO' ? 'bg-green-500' : 'bg-red-500'"
                class="text-white font-bold py-1 px-2 rounded"
              >
                {{ aluno.status }}
              </span>
            </td>
            <td class="border-collapse py-2">
              <button
                @click="abrirModal(aluno)"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
              >
                Visualizar
              </button>
              <ModalAluno
                :open="modalAberto"
                :aluno="alunoSelecionado"
                @close="fecharModal"
                @generate="gerarCertificadoAluno"
              />
              <button
                @click="abrirModalEdicao(aluno)"
                @close="fecharModalEdicao"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2"
              >
                Editar
              </button>
              <ModalEditarAluno
                :openEdicao="modalEdicaoAberto"
                :aluno="alunoSelecionado"
                @close="fecharModalEdicao"
                @salvar="salvarAlunoEditado"
              />
              <button
                @click="excluirAluno(aluno.id)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
              >
                Cancelar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  cancelarAluno,
  editarAluno,
  gerarCertificado,
  getAlunos,
} from "@/services/alunos/aluno.service";
import type { AlunoDTO } from "@/types/alunos";
import { onMounted, ref, watch } from "vue";
import ModalAluno from "./ModalAluno.vue";
import ModalEditarAluno from "./ModalEditarAluno.vue";
import { useToast } from "vue-toastification";
import { useAlunosStore } from "@/stores/aluno.store";

const toast = useToast();
const alunos = ref([] as AlunoDTO[]);
const alunoSelecionado = ref(null as AlunoDTO | null);



const modalAberto = ref(false);
const modalEdicaoAberto = ref(false);

const alunosStore = useAlunosStore()

watch(() => alunosStore.refreshKey, async () => {
  alunos.value = await getAlunos()
},{ immediate: false });

onMounted(async () => {
  alunos.value = await getAlunos();
});

const abrirModal = (aluno: AlunoDTO) => {
  alunoSelecionado.value = aluno;
  modalAberto.value = true;
};
const fecharModal = () => {
  alunoSelecionado.value = null;
  modalAberto.value = false;
};

const abrirModalEdicao = (aluno: AlunoDTO) => {
  alunoSelecionado.value = aluno;
  modalEdicaoAberto.value = true;
};
const fecharModalEdicao = () => {
  alunoSelecionado.value = null;
  modalEdicaoAberto.value = false;
};

const gerarCertificadoAluno = async (aluno: AlunoDTO) => {
  try {
    const response = await gerarCertificado(aluno.id);
    toast.success(response.data.message);
    alunos.value = await getAlunos();
    fecharModal();
  } catch (error) {
    toast.error("Error ao gerar certificado: " + error);
  }
};

const salvarAlunoEditado = async (alunoEditado: AlunoDTO) => {
  try {
    await editarAluno(alunoEditado.id, {
      nome: alunoEditado.nome,
      dt_nascimento: alunoEditado.dt_nascimento,
    });
    toast.success("Aluno editado com sucesso!");
    fecharModalEdicao();
    alunos.value = await getAlunos();
  } catch (error) {
    toast.error("Error ao editar aluno: " + error);
  }
};

const excluirAluno = async (alunoId: number) => {
  try {
    await cancelarAluno(alunoId);
    toast.success("Aluno cancelado com sucesso!");
    alunos.value = await getAlunos();
  } catch (error) {
    toast.error("Error ao cancelar aluno: " + error);
  }
};
</script>

<style scoped></style>
