export default function validarCpf(cpf: string){

    const cleanCpf = cpf.replace(/[.-]/g, '');

    if(cleanCpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cleanCpf)) return false;

    let soma = 0
    for(let i = 0; i < 9; i++){
        soma += parseInt(cleanCpf[i]) * (10 - i);
    }
    
    let resto = (soma * 10) % 11;
    if(resto === 10 || resto === 11) resto = 0;
    if(resto !== parseInt(cleanCpf[9])) return false;

    soma = 0;
    for(let i = 0; i < 10; i++){
        soma += parseInt(cleanCpf[i]) * (11 - i);
    }
    resto = (soma * 10)% 11;
    if(resto === 10 || resto === 11) resto = 0;
    if(resto !== parseInt(cleanCpf[10])) return false;
    
    return true;
}