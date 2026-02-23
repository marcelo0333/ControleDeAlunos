<template>
  <div class="min-h-screen flex items-center justify-center  bg-gray-600">
    <div class="p-8 rounded shadow-md bg-white w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">Entrar</h1>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4 items-center w-full">
        <div class="space-y-4">
          <AppInput label="Email: " v-model="data.email" type="email" />
          <AppInput label="Senha: " v-model="data.senha" type="password" />
          <p v-if="erro" class="text-red-500 text-sm">{{ erro }}</p>
        </div>
        <AppButton :carregando="carregando" texto="Entrar" @submit="handleLogin" />
      </form>

      <a @click="router.push('/register')" class="text-blue-500  mt-4 block text-center text-sm">Não tem conta? Registre-se</a>
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
const data = ref({email: '', senha: ''})
const erro = ref('');
const carregando = ref(false);

const handleLogin = async () => {
  erro.value = '';
  carregando.value = true;
  try{
    await authStore.login(data.value.email, data.value.senha)
    console.log(data)
    router.push('/dashboard');
  }catch(err){
    erro.value = 'email ou senha invalido';
    console.error(err);
  }finally{
    carregando.value = false
  }

}

</script>

<style scoped>

</style>
