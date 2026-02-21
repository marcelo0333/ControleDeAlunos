import { log } from "node:console";
import validarCpf from "./cpf.utils";

export default function testCpf(){
    const invalidCpf = '111.222.333-44';
    const validCpf = '894.271.393-90';

    console.log(validarCpf(invalidCpf));
    console.log(validarCpf(validCpf));
}

testCpf();