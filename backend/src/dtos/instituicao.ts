export interface InstituicaoDTO {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

export interface CreateInstituicaoDTO {
    nome: string;
    email: string;
    senha: string;
}

export interface LoginInstituicaoDTO {
    email: string;
    senha: string;
}