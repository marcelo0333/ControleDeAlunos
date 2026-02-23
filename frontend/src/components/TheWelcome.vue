<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
console.log(authStore.instituicao)
</script>

<template>
  <div class="welcome">
    <h1 class="text-amber-500">Bem-vindo ao Controle de Alunos, {{ authStore.instituicao?.nome }}</h1>
    <p class="welcome-description">
      Este é um sistema de controle de alunos desenvolvido para facilitar a gestão acadêmica. Com ele, você pode cadastrar, editar e excluir informações dos alunos, além de acompanhar o desempenho acadêmico e gerar relatórios personalizados.
    </p>
     <p class="welcome-description">
      O Controle de Alunos oferece uma interface intuitiva e fácil de usar, permitindo que você gerencie os dados dos alunos de forma eficiente. Você pode acessar informações como nome, idade, curso, notas e muito mais, tudo em um só lugar.
    </p>
    <p class="welcome-description">
      Explore as funcionalidades do sistema e aproveite uma experiência eficiente e intuitiva para gerenciar os dados dos alunos de forma prática e organizada.
    </p>

  </div>
  <button class="bg-red-800 p-2.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 text-white mt-4" @click="authStore.logout()">
  Logout
  </button>
</template>
