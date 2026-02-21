import express from 'express';
import { prisma }  from './lib/db';
import authRoutes from './routes/instituicao.routes';
import alunoRoutes from './routes/aluno.routes';
import { authenticateToken } from './middlewares/auth.middleware';

const router = express.Router();

router.use('/instituicao', authRoutes);
router.use('/alunos', authenticateToken, alunoRoutes);


export default router;