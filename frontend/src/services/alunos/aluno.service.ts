import http from "../http"

export const getAlunos = async () => {
  const {data} = await http.get('/alunos')
  return data
}
