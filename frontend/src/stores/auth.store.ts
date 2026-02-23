import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import http from '@/services/http';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') ?? '');

  const login = async(email: string, senha: string ) => {
    const {data} = await http.post('/instituicao/login', {email, senha})
    token.value = data.token
    instituicao.value = data.instituicao
    localStorage.setItem('token', data.token)
    localStorage.setItem('instituicao', JSON.stringify(data.instituicao))
  }

 const register = async(nome: string, email: string, senha: string ) => {
    const {data} = await http.post('/instituicao/register', {nome, email, senha})
    token.value = data.token
    instituicao.value = data.instituicao
    localStorage.setItem('token', data.token)
    localStorage.setItem('instituicao', JSON.stringify(data.instituicao))
  }

  const instituicao = ref<{ id: number; nome: string; email: string } | null>
  (JSON.parse(localStorage.getItem('instituicao') ?? 'null')
  )



  const logout = () => {
    token.value = '';
    instituicao.value = null ;
    localStorage.removeItem('token')
    localStorage.removeItem('instituicao')
  }
  const isAuthenticated = () => !!token.value

  return {token, instituicao, login, register, logout, isAuthenticated}
})
