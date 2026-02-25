import { prisma } from "../lib/db";

export const createCurso = async (nome: string, codigo: string, instituicaoId: number, docente: string, dt_inicio: Date, dt_fim: Date) => {
    try {

        const dtInicio = new Date(dt_inicio).toISOString();
        const dtFim = new Date(dt_fim).toISOString();

        const curso = await prisma.curso.create({
            data: { 
                nome, 
                codigo, 
                instituicaoId, 
                docente, 
                dt_inicio: new Date(dtInicio),
                dt_fim: new Date(dtFim)
            },
        });
        return curso;
    } catch (error) {
        console.error('Error finding or creating curso:', error);
        throw new Error('An error occurred while finding or creating the curso.');
    }
};