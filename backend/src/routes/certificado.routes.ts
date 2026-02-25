import { validarHash } from './../services/aluno.service';
import { Router, Response, Request } from 'express';
import * as service from '../services/aluno.service'
import { AlunoPublicoDTO } from '../dtos/alunos';
import path from 'path';
import fs from 'fs';
import { getXmlFilePath } from '../services/xml.service';

const certificadoRoutes = Router();

certificadoRoutes.get('/download/:hash', async(req: Request, res: Response) =>{
    try {
        const aluno = await service.validarHash(String(req.params.hash));
        if(!aluno) {return res.status(404).json({error: 'Certificado não encontrado'})}
        const filePath = getXmlFilePath(aluno);
        res.download(filePath, `${aluno.nome}_certificado.xml`)
    } catch (error) {
        res.status(500).json({
            error: "Erro ao validar certificado",
            details: error instanceof Error ? error.message : String(error)
        });
    }
})

certificadoRoutes.get('/certificados/:hash', async(req: Request, res: Response) =>{
    const aluno = await service.validarHash(String(req.params.hash));
    if(!aluno) {
        return res.status(404).json({error: 'Certificado não encontrado'})
    }
    const filePath = getXmlFilePath(aluno);

    res.sendFile(filePath);
})

certificadoRoutes.get('/validar/:hash', async(req: Request, res: Response) =>{
    const aluno = await service.validarHash(String(req.params.hash));
    if(!aluno) {return res.status(404).json({error: 'Certificado não encontrado'})}
    const alunoPublico: AlunoPublicoDTO = {
        nome: aluno.nome,
        cpf: aluno.cpf,
        curso: aluno.curso,
        hash: aluno.hash!,
        validation_code: aluno.validation_code!,
        download: `/download/${aluno.hash}`
    }
    res.status(200).json({valid: true, aluno: alunoPublico});
})

export default certificadoRoutes;