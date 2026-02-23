export type CursoDTO = {
    nome: string;
    codigo: string;
    dt_inicio: Date;
    dt_fim: Date;
    docente: string;
}

export type AlunoDTO = {
    id: number;
    nome: string;
    cpf: string;
    dt_nascimento: Date;
    curso: CursoDTO;
    instituicaoId: number;
    hash?: string;
    file_path?: string;
    url_callback?: string;
    status: 'ATIVO' | 'INATIVO';
    createdAt: Date;
    deleted_at?: Date | null;
}

export type CreateAlunoDTO = {
    nome: string;
    cpf: string;
    dt_nascimento: Date;
    url_callback: string,
    curso: CursoDTO;
    instituicaoId: number;
}

export type UpdateAlunoDTO = {
    nome?: string;
    dt_nascimento?: Date;
}

export type ImportAlunoDTO = {
    alunos: CreateAlunoDTO[];
}
