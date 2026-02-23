<template>
  <div class="min-h-screen flex items-center justify-center  bg-gray-600">
    <div class="p-8 rounded shadow-md bg-white w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">Registrar</h1>
      <form @submit.prevent="handleRegister" class="flex flex-col gap-4 items-center w-full">
        <div class="space-y-4">
          <AppInput label="Nome: " v-model="data.nome" type="text" />
          <AppInput label="Email: " v-model="data.email" type="email" />
          <AppInput label="Senha: " v-model="data.senha" type="password" />
          <p v-if="erro" class="text-red-500 text-sm">{{ erro }}</p>
        </div>
        <AppButton :carregando="carregando" texto="Registrar" @submit="handleRegister" />
      </form>

      <a @click="router.push('/login')" class="text-blue-500  mt-4 block text-center text-sm">Não tem conta? Registre-se</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppInput from '@/components/ui/AppInput.vue';
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppButton from '@/components/ui/AppButton.vue';

const router = useRouter();

const authStore = useAuthStore();
const data = ref({nome: '', email: '', senha: ''})
const erro = ref('');
const carregando = ref(false);

const handleRegister = async () => {
  erro.value = '';
  carregando.value = true;
  try{
    await authStore.register(data.value.nome, data.value.email, data.value.senha)
    console.log(data)
    router.push('/home');
  }catch(err){
    erro.value = 'Erro ao registrar usuário';
    console.error(err);
  }finally{
    carregando.value = false
  }

}

</script>

<style scoped>

</style>
