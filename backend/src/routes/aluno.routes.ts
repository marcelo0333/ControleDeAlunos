import { Router, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as service from '../services/aluno.service'
import { AlunoPublicoDTO, ImportAlunoDTO, UpdateAlunoDTO } from '../dtos/alunos';

const alunosRoutes = Router();

alunosRoutes.get('/', async (req: AuthRequest, res: Response) => {
    try{
        const alunos = await service.listar(req.instituicao!.id);
        res.status(200).json(alunos);
    }catch(error){
        res.status(400).json(error)
    }
});

alunosRoutes.post('/import', async (req: AuthRequest, res: Response) => {
    try{
        const result = await service.importar(req.body as ImportAlunoDTO, req.instituicao!.id);
        res.status(200).json(result);
    }catch(error){
        console.error('error na rota', error)
        res.status(400).json(error);
    }
})

alunosRoutes.put('/:id', async (req: AuthRequest, res: Response) => {
    try{
        const aluno = await service.editar(Number(req.params.id), req.instituicao!.id, req.body as UpdateAlunoDTO);
        res.status(200).json({
            status: 'success',
            aluno: aluno
        });
    }catch(err){
        res.status(400).json({
            error: err
        })
    }
})

alunosRoutes.delete('/:id', async(req: AuthRequest, res: Response) =>{
    await service.cancelar(Number(req.params.id), req.instituicao!.id);
    res.status(204).json({
        message: "Aluno cancelado"
    })
})

alunosRoutes.patch('/:id/gerar-certificado', async(req: AuthRequest, res: Response) =>{
    const resAluno = await service.gerarCertificadoAluno(Number(req.params.id), req.instituicao!.id);
    res.status(201).json({
        message: "Armazenado com sucesso",
        data: resAluno
    });
})


export default alunosRoutes;