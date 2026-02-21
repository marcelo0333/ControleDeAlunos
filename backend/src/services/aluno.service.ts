import { cp } from 'node:fs';
import { CreateAlunoDTO, ImportAlunoDTO, UpdateAlunoDTO } from '../dtos/alunos';
import * as alunoRepo from '../repositories/alunos.repository';
import * as cursoRepo from '../repositories/curso.repository';
import { validarAluno } from '../schemas/alunos.schemas';
import validarCpf from '../utils/cpf.utils';

export const listar = async (instituicaoId: number) => {
    return alunoRepo.findAllAlunos(instituicaoId);
}

export const buscarPorId = async (id: number, instituicaoId: number) => {
    return alunoRepo.findAlunoById(id, instituicaoId);
}

export const criar = async (data: CreateAlunoDTO) => {
    const curso = await cursoRepo.findOrCreateCurso(data.curso.nome, data.curso.codigo, data.instituicaoId, data.curso.docente, data.curso.dt_inicio, data.curso.dt_fim);

    return alunoRepo.createAluno({ ...data, cursoId: curso.id });
}

export const importar = async (data: ImportAlunoDTO, instituicaoId: number) => {
    const results = []; 
    for (const alunoData of data.alunos){
        const erros = validarAluno(alunoData)
        if(erros){
            results.push({cpf: alunoData.cpf, status: 'error', erros});
            continue;
        }
        if(!validarCpf(alunoData.cpf)){
            results.push({
                status: 'error',
                erros: [{
                    campo: 'cpf',
                    motivo: 'CPF inválido'
                }]
            })
            continue;
        }
        try{
            const curso = await cursoRepo.findOrCreateCurso(
                alunoData.curso.nome,
                alunoData.curso.codigo, 
                instituicaoId, 
                alunoData.curso.docente,
                alunoData.curso.dt_inicio,
                alunoData.curso.dt_fim
            )
            const aluno = await alunoRepo.createAluno({
                nome: alunoData.nome,
                cpf: alunoData.cpf,
                dt_nascimento: alunoData.dt_nascimento,
                url_callback: alunoData.url_callback,
                instituicaoId: instituicaoId,
                cursoId: curso.id
            })
            results.push({cpf: alunoData.cpf, status: 'success', aluno})
        }catch(err){

        }
        
    }
    return results;
}

export const editar = async (id: number, instituicaoId: number, data: UpdateAlunoDTO) => {
    await buscarPorId(id, instituicaoId);
    return alunoRepo.updateAluno(id, instituicaoId, {
        ...data,
    })
}

export const cancelar = async (id: number, instituicaoId: number) => {
    return alunoRepo.deleteAluno(id, instituicaoId);
}