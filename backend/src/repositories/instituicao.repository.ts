import { CreateInstituicaoDTO } from "../dtos/instituicao";
import { prisma } from "../lib/db";

export const findByEmail = async (email: string) => {
    try {
        const user = await prisma.instituicao.findUnique({
            where: { email },
        });
        return user;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw new Error('An error occurred while fetching the user by email.');
    }
};

export const createInstituicao = async (data: CreateInstituicaoDTO) => {
    try {
        const newInstituicao = await prisma.instituicao.create({data});
        return newInstituicao;
    } catch (error) {
        console.error('Error creating instituicao:', error);
        throw new Error('An error occurred while creating the instituicao.');
    }
};