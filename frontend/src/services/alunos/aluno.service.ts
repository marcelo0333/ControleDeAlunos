import type { AlunoDTO, CreateAlunoDTO } from "@/types/alunos"
import http from "../http"

export const getAlunos = async () => {
  const {data} = await http.get('/alunos')
  return data
}

export const importarAlunos = async (data: CreateAlunoDTO[]) =>{
  const response = await http.post('/alunos/import', {
    alunos: data
  })
  return response;
}

export const gerarCertificado = async(id: number) =>{
  const response = await http.patch(`/alunos/${id}/gerar-certificado`)
  return response;
}

export const editarAluno = async(id: number, data: {nome?: string, dt_nascimento?: Date}) =>{
  const response = await http.put(`/alunos/${id}`, data)
  return response;
}

export const cancelarAluno = async(id: number) =>{
  const response = await http.delete(`/alunos/${id}`)
  return response;
}

export const validarHash = async(hash: string) =>{
  const response = await http.get(`/validar/${hash}`)
  return response;
}
