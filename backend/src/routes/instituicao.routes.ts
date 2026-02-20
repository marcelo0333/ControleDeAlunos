import { Instituicao } from './../../node_modules/.prisma/client/index.d';
import { CreateInstituicaoDTO, LoginInstituicaoDTO } from '../dtos/instituicao';
import { login, register } from './../services/instituicao.service';
import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middlewares/auth.middleware';


const authRoutes = Router();

authRoutes.post('/register', authenticateToken, async (req: AuthRequest, res) => {
    const { nome, email, senha } = req.body as CreateInstituicaoDTO;
    try {
        const response = await register({ nome, email, senha });
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

authRoutes.post('/login', async (req, res) => {
    const { email, senha } = req.body as LoginInstituicaoDTO;
    try {
        const response = await login({ email, senha });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

export default authRoutes;