import { UpdateAlunoDTO } from "../dtos/alunos";
import { prisma } from "../lib/db";

export const findAllAlunos = async (instituicaoId: number) => {
    try {
        const alunos = await prisma.aluno.findMany({
            where: { instituicaoId, status: 'ATIVO' },
            include: {
                curso: true,
            },
        });
        return alunos;
    } catch (error) {
        console.error('Error fetching alunos:', error);
        throw new Error('An error occurred while fetching alunos.');
    }
};

export const findAlunoById = async (id: number, instituicaoId: number) => {
    try {
        const aluno = await prisma.aluno.findFirst({
            where: { id, instituicaoId, status: 'ATIVO' },
            include: {
                curso: true,
            },
        });
        return aluno;
    } catch (error) {
        console.error('Error fetching aluno by id:', error);
        throw new Error('An error occurred while fetching the aluno by id.');

    }
}

export const findAlunoByHash = async (hash: string) => {
    const aluno = await prisma.aluno.findFirst({
        where: {hash},
    })
    return aluno
}

export const createAluno = async (data: {nome: string, cpf: string, dt_nascimento: Date, url_callback: string, instituicaoId: number, cursoId: number}) => {
    try {
        const dtNasc = new Date(data.dt_nascimento).toISOString();
        data.dt_nascimento = new Date(dtNasc);
        const newAluno = await prisma.aluno.create({ data });
        return newAluno;
    } catch (error) {
        console.error('Error creating aluno:', error);
        throw new Error('An error occurred while creating the aluno.');
    }
};

export const updateAluno = async (id: number, instituicaoId: number, data: Partial<UpdateAlunoDTO>) => {
    try {
        let dataNasc = new Date(data.dt_nascimento!).toISOString();
        data.dt_nascimento! = new Date(dataNasc);
        const updatedAluno = await prisma.aluno.update({
            where: { id, instituicaoId, status: 'ATIVO' },
            data,
        });
        return updatedAluno;
    } catch (error) {
        console.error('Error updating aluno:', error);
        throw new Error('An error occurred while updating the aluno.');
    }
};

export const deleteAluno = async (id: number, instituicaoId: number) => {
    try {
        const deletedAluno = await prisma.aluno.update({
            where: { id, instituicaoId, status: 'ATIVO' },
            data: { status: 'CANCELADO', deleted_at: new Date() },
        });
        return deletedAluno;
    } catch (error) {
        console.error('Error deleting aluno:', error);
        throw new Error('An error occurred while deleting the aluno.');
    }
};

export const generateHashAluno = async (id: number, instituicaoId: number, hash: string) =>{
    try {
        const validationCode = hash.substring(0,8).toUpperCase() 
        const aluno = await prisma.aluno.update({
            where: {id, instituicaoId, status: 'ATIVO'},
            data: {hash: hash, validation_code: validationCode},
        });
        return aluno;
    } catch (error) {
        console.error('Error generating hash', error);
        throw new Error('An error occurred while creating an hash to aluno.')
    }
}

export const generateXmlAluno = async (id: number, instituicaoId: number, file_path: string) => {
    try {
        const updatedAluno = await prisma.aluno.update({
            where: { id, instituicaoId, status: 'ATIVO' },
            data: { file_path},
        });
        return updatedAluno;
    } catch (error) {
        console.error('Error updating aluno:', error);
        throw new Error('An error occurred while updating the aluno.');
    }
};