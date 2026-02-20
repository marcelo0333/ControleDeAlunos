import express from 'express';
import { prisma }  from './lib/db';
import authRoutes from './routes/instituicao.routes';

const router = express.Router();

router.use('/instituicao', authRoutes);


export default router;