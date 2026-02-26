<template>
  <AppModal :open="props.open" title="Importar alunos" @close="$emit('close')">
    <div class="flex justify-center mt-4 overflow-scroll">
      <div class="space-y-4">
        <input
          ref="fileInput"
          type="file"
          accept=".json"
          @change="handleFile"
          class="hidden"
        />
        <button
          @click="fileInput?.click()"
          class="w-full border-2 border-gray-300 rounded-lg p-6
                hover:border-blue-500 hover:bg-blue-50 transition
                flex flex-col items-center justify-center gap-2"
          >
          <span class="text-sm text-gray-500">
            Clique para selecionar um arquivo JSON
          </span>
          <span class="text-xs text-gray-400">
            Apenas arquivos <strong>.json</strong>
          </span>
        </button>
        <div v-if="alunosPreview.length" class="max-h-60  border rounded p-2" >
          <h2>Preview</h2>
          <div
          v-for="(aluno, index) in alunosPreview"
          :key="index"
          class="border-b py-1 text-sm"

          >
          <strong>{{ aluno.nome }}</strong> - {{ aluno.cpf }} - {{ aluno.curso.nome }}
          </div>
        </div>
        <div v-if="alunosResponse?.length">
          <div
          v-for="( aluno, index) in alunosResponse"
          :key="index"
          class="mt-2 p3 border rounded"
          :class="aluno.status === 'error' ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500' "
          >
            <p>
              CPF: {{ aluno.cpf }}
            </p>
             <p
              v-if="aluno.status === 'error'"
              class="text-red-600 text-sm"
            >
              {{ aluno.erros?.map(e => e.motivo).join(', ') }}
            </p>
            <p v-else
            class="text-green-600 text-sm"
            >
            Importado com sucesso!
            </p>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button
            @click="$emit('close')"
            class="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancelar
          </button>

          <button
            :disabled="!alunosPreview.length"
            @click="importar"
            class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Confirmar Importação
          </button>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppModal from './ui/AppModal.vue';
import type { CreateAlunoDTO } from '@/types/alunos';
import { importarAlunos } from '@/services/alunos/aluno.service';
import { useToast } from 'vue-toastification';
import { useAlunosStore } from '@/stores/aluno.store';

defineEmits(['close']);
const props = defineProps<{
  open: boolean;
}>();

const alunosPreview = ref<CreateAlunoDTO[]>([])
const fileInput = ref<HTMLInputElement | null>(null)
const alunosResponse = ref<any[]>([])
const toast = useToast();
const alunosStore = useAlunosStore();

const handleFile = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if(!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string)
          if (!json.alunos || !Array.isArray(json.alunos)) {
            toast.info('Formato inválido. O JSON deve conter { alunos: [] }')
            return
          }
          alunosPreview.value = json.alunos
        } catch (error) {
          console.log(error)
          toast.info('Json invalido')
        }
    }
    reader.readAsText(file);
}
const importar = async () => {
  try {
    const response = await importarAlunos(alunosPreview.value)
    alunosResponse.value = response.data
    alunosStore.triggerRefresh()
    console.log(response.data)
    toast.success('Importação dos alunos validos concluída!')
  } catch (error) {
    toast.info('erro')
    console.log(error)
  }
}
</script>

<style scoped>

</style>
