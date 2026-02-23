<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import ListAluno from './ui/ListAluno.vue';

const authStore = useAuthStore();
console.log(authStore.instituicao)
</script>

<template>
  <div class="welcome">
   <ListAluno />
  </div>

</template>
