import { cp } from 'node:fs';
import { AlunoDTO, CreateAlunoDTO, ImportAlunoDTO, UpdateAlunoDTO, AlunoWebHookDTO } from '../dtos/alunos';
import * as alunoRepo from '../repositories/alunos.repository';
import * as cursoRepo from '../repositories/curso.repository';
import { validarAluno } from '../schemas/alunos.schemas';
import validarCpf from '../utils/cpf.utils';
import { gerarHash } from './hash.service';
import { gerarXml, salvarXml } from './xml.service';
import { callWebhook } from './webhook.service';

export const listar = async (instituicaoId: number) => {
    return alunoRepo.findAllAlunos(instituicaoId);
}

export const buscarPorId = async (id: number, instituicaoId: number) => {
    return alunoRepo.findAlunoById(id, instituicaoId);
}

export const validarHash = async (hash: string) => {
    return alunoRepo.validateAlunoByHash(hash);
}



export const criar = async (data: CreateAlunoDTO) => {
    const curso = await cursoRepo.createCurso(data.curso.nome, data.curso.codigo, data.instituicaoId, data.curso.docente, data.curso.dt_inicio, data.curso.dt_fim);

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
            const curso = await cursoRepo.createCurso(
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
        }catch (err) {
            const mensagem = err instanceof Error ? err.message : 'Erro desconhecido';
            results.push({ cpf: alunoData.cpf, status: 'error', erros: [{ campo: 'geral', motivo: mensagem }] });
        }
    }
    return results;
}

export const gerarCertificadoAluno = async (id: number, instituicaoId: number) => {
    const alunoOptional = await alunoRepo.findAlunoById(id, instituicaoId);

    if(!alunoOptional) throw new Error('Aluno não encontrado');
    if(alunoOptional.hash) throw new Error('Hash já gerado');

    const hash = gerarHash(alunoOptional.cpf, alunoOptional.curso.codigo, instituicaoId)
    if(await alunoRepo.findAlunoByHash(hash)){
        return 'Já registrado'
    } 
    
    await alunoRepo.generateHashAluno(id, instituicaoId, hash)
    const aluno = await gerarXmlAluno(id, instituicaoId);
    try{
        await callWebhook({
            nome: alunoOptional.nome,
            cpf: alunoOptional.cpf,
            hash,
            validation_code: hash.substring(0, 8).toUpperCase(),
            url_callback: alunoOptional.url_callback,
        })
    }catch(error){

    }
    return aluno
}

export const gerarXmlAluno = async (id: number, instituicaoId: number) =>{
    const aluno = await alunoRepo.findAlunoById(id, instituicaoId) as AlunoDTO;
    if(!aluno.file_path){
        const xml = gerarXml(aluno);
        if(aluno.hash){
            const filePath = salvarXml(xml, aluno.hash);
            const alunoXml = await alunoRepo.generateXmlAluno(id, instituicaoId, filePath)
            return alunoXml;
        }
    }
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
