<template>
  <nav class="fixed top-0 left-0 w-full bg-gray-600 text-white shadow-md z-40">
    <div class="mx-auto px-6 flex items-center justify-between w-full">
      <span class="font-bold text-lg ml-1">Controle de Alunos</span>
      <div class="flex gap-6 justify-center align-middle items-center">
        <RouterLink to="/dashboard" class="hover:text-gray-300  hover:bg-gray-600 transition rounded-lg px-2"
          >Dashboard</RouterLink
        >
        <button @click="abrirModal" class="hover:text-gray-300  hover:bg-gray-600 transition rounded-lg px-2"
          >Importar alunos</button>
          <ModalUploadAlunos :open="modalAberto" @close="fecharModal" />
        <RouterLink to="/cursos" class="hover:text-gray-300  hover:bg-gray-600 transition rounded-lg px-2"
          >Cursos</RouterLink
        >
      </div>
      <div
        class="flex items-center gap-2 border-l border-gray-400 p-4 hover:bg-gray-500 transition rounded-l-lg cursor-pointer z-50 "
        @click="menuUser = !menuUser"
      >
        {{ authStore.instituicao?.nome }}
        <svg-icon class="icon" type="mdi" :path="iconUser" />
        <div
          class="absolute top-14 right-2 bg-gray-700 text-white rounded shadow-md py-4 w-1/6 pointer-events-auto"
          v-if="menuUser"
        >
          <button
            class="w-full text-left px-4 py-2 hover:bg-gray-600 transition"
            @click="logout()"
          >
            Logout
          </button>
          <button
            class="w-full text-left px-4 py-2 hover:bg-gray-600 transition"
            @click="goToProfile()"
          >
            Perfil
          </button>
          <button
            class="w-full text-left px-4 py-2 hover:bg-gray-600 transition"
            @click="goToSettings()"
          >
            Configurações
          </button>
        </div>
      </div>
    </div>
  </nav>
  <div class="h-14" />
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { mdiAccount } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import { ref } from "vue";
import router from "@/router";
import type { AlunoDTO } from "@/types/alunos";
import ModalUploadAlunos from "../ModalUploadAlunos.vue";

const menuUser = ref(false);
const modalAberto = ref(false);
const authStore = useAuthStore();

const abrirModal = () => {
  modalAberto.value = true;
}
const fecharModal = () => {
  modalAberto.value = false;
}

const goToProfile = () => {
  console.log("Ir para perfil");
};

const goToSettings = () => {
  console.log("Ir para configurações");
};

const logout = () => {
  authStore.logout();
  router.push("/login");
};
const iconUser = mdiAccount;
</script>
<style scoped></style>
