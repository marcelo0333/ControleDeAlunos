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
    validation_code?: string;
    status: 'ATIVO' | 'INATIVO';
    createdAt: Date;
    deleted_at?: Date | null;
}
export interface AlunoPublicoDTO {
    nome: string;
    cpf: string;
    curso: CursoDTO;
    hash: string;
    validation_code: string;
    download: string;
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

export interface AlunoWebHookDTO {
    nome: string;
    cpf: string;
    hash: string;
    validation_code: string;
    url_callback: string;
}

