import { XMLBuilder } from './../../node_modules/xmlbuilder2/lib/interfaces.d';
import { AlunoDTO } from "../dtos/alunos";
import { create } from 'xmlbuilder2';
import path from 'node:path';
import fs from 'fs'


export const gerarXml = (aluno: AlunoDTO): string => {
    const xml = create({version: 1.0, encoding: 'UTF-8'})
    .ele('certificado')
    .ele('aluno')
        .ele('nome').txt(aluno.nome).up()
        .ele('cpf').txt(aluno.cpf).up()
        .ele('hash').txt(aluno.hash || 'sem hash').up()
    .up()
    .ele('curso')
        .ele('codigo').txt(aluno.curso.codigo)
        .ele('nome').txt(aluno.curso.nome)
        .ele('docente').txt(aluno.curso.docente)
        .ele('dt_inicio').txt(aluno.curso.dt_inicio.toISOString()).up()
        .ele('dt_fim').txt(aluno.curso.dt_fim.toISOString()).up()
    .up()
    .ele('validation_code').txt(aluno.hash || 'sem validation_code').up()
    .up()
    .end({prettyPrint: true});

    return xml;
};

export const salvarXml = (xml: string, hash: string): string =>{
    const dir = path.resolve('certificados');

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, `${hash}.xml`);
    
    fs.writeFileSync(filePath, xml, 'utf-8');

    return filePath;
}