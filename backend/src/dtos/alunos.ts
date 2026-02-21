export interface CursoDTO {
    nome: string;
    codigo: string;
    dt_inicio: Date;
    dt_fim: Date;
    docente: string;
}

export interface AlunoDTO {
    id: number;
    cpf: string;
    nome: string;
    curso: CursoDTO;
    instituicaoId: number;
    hash?: string;
    file_path?: string;
    url_callback?: string;
    status: 'ATIVO' | 'INATIVO';
    createdAt: Date;
    deleted_at?: Date | null;
}

export interface CreateAlunoDTO {
    nome: string;
    cpf: string;
    dt_nascimento: Date;
    url_callback: string,
    curso: CursoDTO;
    instituicaoId: number;
}

export interface UpdateAlunoDTO {
    nome?: string;
    dt_nascimento?: Date;
}

export interface ImportAlunoDTO {
    alunos: CreateAlunoDTO[];
}