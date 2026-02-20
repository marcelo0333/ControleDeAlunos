import { CreateInstituicaoDTO, InstituicaoDTO, LoginInstituicaoDTO } from "../dtos/instituicao";
import { createInstituicao, findByEmail } from "../repositories/instituicao.repository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (instituicaoData: CreateInstituicaoDTO) => {
    const exist = await findByEmail(instituicaoData.email);
    if (exist) {
        throw new Error('Email already in use');
    }
    const senha_hash = await bcrypt.hash(instituicaoData.senha, 10);
    instituicaoData.senha = senha_hash;
    const newInstituicao = await createInstituicao({ ...instituicaoData});
    return {token: jwtGenerate(newInstituicao), instituicao: newInstituicao};
};

export const login = async (loginData: LoginInstituicaoDTO) => {
    const instituicao = await findByEmail(loginData.email);
    if (!instituicao) {
        throw new Error('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(loginData.senha, instituicao.senha);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }
    return { token: jwtGenerate(instituicao), instituicao };
};

export const jwtGenerate = (instituicao: InstituicaoDTO): string => {
    const payload = {
        id: instituicao.id,
        email: instituicao.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
    return token;
};