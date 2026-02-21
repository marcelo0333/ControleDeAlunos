import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import schema from '../../schema/alunoSchema.json'


const ajv = new Ajv2020();

addFormats(ajv);

const validate = ajv.compile(schema);

export function validarAluno (data: unknown){
    const valido = validate(data);

    if(!valido){
        return validate.errors?.map(err => {
            const campo = err.instancePath.replace('/', '') || err.params?.missingProperty;
            const mensagens: Record<string, string> = {
                'cpf': 'CPF inválido',
                'nome': 'Nome inválido',
                'url_callback': 'URL de callback inválida',
                'curso.nome': 'Nome do curso inválido',
                'curso.codigo': 'Código do curso inválido',
                'curso.dt_inicio': 'Data de início inválida',
                'curso.dt_fim': 'Data de término inválida',
                'curso.docente': 'Nome do docente inválido',
            };
            return {
                campo,
                motivo: mensagens[campo] ?? err.message,
            }
        });
    }
    return null;
}