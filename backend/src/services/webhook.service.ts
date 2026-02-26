import { AlunoWebHookDTO } from "../dtos/alunos";

export const callWebhook = async (aluno: AlunoWebHookDTO) => {
    const url_consulta = `${process.env.FRONTEND_URL}/validar/${aluno.hash}`;

    await fetch(aluno.url_callback,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            nome: aluno.nome,
            cpf: aluno.cpf,
            validation_code: aluno.validation_code,
            url_consulta: url_consulta,
            hash: aluno.hash
        })

    })
}