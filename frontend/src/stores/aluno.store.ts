import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlunosStore = defineStore('alunos', () => {
  const refreshKey = ref(0)

  function triggerRefresh() {
    refreshKey.value++
      console.log('refresh triggered', refreshKey.value)

  }

  return { refreshKey, triggerRefresh }
})
