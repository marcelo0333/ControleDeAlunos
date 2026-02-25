import crypto from 'crypto';


export const gerarHash = (cpf: string, codigo: string, instituicaoId: number ) => {
    const dados = `${cpf}-${codigo}-${instituicaoId}`
    return crypto.createHash('sha256').update(dados).digest('hex');
}