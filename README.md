# 🎓 Controle de Alunos

Plataforma para instituições de ensino gerenciarem seus alunos. Permite cadastro de instituições, importação de alunos via JSON, geração de certificados em XML e notificação via webhook.

---

## Como rodar o projeto

### Pré-requisitos

- [Docker](https://www.docker.com/) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/controle-de-alunos.git
cd controle-de-alunos
```

### 2. Configure as variáveis de ambiente

Crie o arquivo `backend/.env` com base no exemplo:

```bash
cp backend/.env.example backend/.env
```

Preencha os valores: (valores no example previamente arrumados por se tratar de ambiente teste)

```
PORT=3000
JWT_SECRET=sua_chave_secreta
DATABASE_URL=postgresql://postgres:1234@postgres:5432/controle-alunos
HOST=http://localhost:3000
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
FRONTEND_URL=http://localhost
```

### 3. Suba os containers

```bash
docker compose up --build
```

Aguarde todos os serviços subirem. O backend roda as migrations automaticamente.

### 4. Acesse o sistema

- **Frontend:** http://localhost
- **Backend:** http://localhost:3000

---

## 📦 Estrutura do projeto

```
├── backend/       # API REST em Node.js + Express + Prisma
├── frontend/      # Interface em Vue.js 3
└── docker-compose.yml
```

---

## Funcionalidades

- Cadastro e autenticação de instituições (JWT)
- Importação de alunos via arquivo JSON com validação de schema e CPF
- Geração de certificado em XML por aluno
- Notificação via webhook após geração do certificado
- Consulta pública do certificado via URL: `/validar/:hash`
- Soft delete de alunos

---

## 🛠️ Stack

| Camada | Tecnologia |
| --- | --- |
| Backend | Node.js, Express, Prisma, PostgreSQL |
| Frontend | Vue.js 3, Pinia, Tailwind CSS |
| Infra | Docker, Docker Compose, Nginx |

---

## 📄 Formato do JSON de importação

```json
{
  "alunos": [
    {
      "nome": "Nome do Aluno",
      "cpf": "000.000.000-00",
      "dt_nascimento": "2000-01-01",
      "url_callback": "https://seu-webhook.com",
      "curso": {
        "nome": "Nome do Curso",
        "codigo": "COD2024",
        "dt_inicio": "2024-01-01",
        "dt_fim": "2024-12-01",
        "docente": "Prof. Nome"
      }
    }
  ]
}
```

Na raiz do arquivo, há o `alunos.json` nele já há 3 cadastros previamente formatados e validos.

# Teste WebHook

Caso queira testar as requisições, se estão sendo enviadas o serviço usado foi o [Webhook.site](https://webhook.site/#!/view/4f979a97-0e70-42a1-94be-94cfd2286810/113ddeef-8ca2-4c4b-b603-23e8167317c9/1).

# Decisões Técnicas

### **Pinia para gerenciamento de estado**

Utilizado de forma intencional apenas onde há dados verdadeiramente globais (autenticação, controle de lista de alunos). Dados locais de componente foram mantidos com `ref()`  onde uma store não agrega valor real.

### Nginx como proxy reverso

O frontend em produção é servido via Nginx, que também faz proxy das requisições `/api`  para o backend, centralizando o tráfego em uma única porta (80) e eliminando a necessidade de expor o backend diretamente.

### Multi-tenant por Id

Apesar de não ser uma das melhores decisões em arquiteturas multi-tenant (vide fazer por schemas ou por db), é uma solução solida que garante via verificação backend, segurança das informações.

### **TypeScript no lugar de JavaScript**

Escolhido por garantir segurança de tipos em tempo de desenvolvimento, tornando os contratos entre camadas (DTOs, services, repositories) explícitos e verificáveis pelo compilador, reduzindo erros em runtime e facilitando manutenção, tambem justifico por ser algo mais habitual a minha realidade, o que facilitou o desenvolvimento e organização dos codigos.

# Proximos passos para o Desafio

Dentro do desafio algumas partes faltaram no desenvolvimento, então como observação cito:

**Frontend**

- Paginação ou busca na listagem de alunos
- Separação da lista por curso e filtros para alunos
- Feedback visual de loading na tabela
- Tela de erro para hash inválido no `/validar/:hash`
- Visualização de alunos cancelados && Função de Delete
- Modais para edição de dados das Instituiçõe
- Tratamento de algumas mensagens de erro
- Melhor design ui/ux

**Backend**

- Middleware global de tratamento de erros
- Padronização geral no retorno de tratamento de erros
- Tratamento de token expirado
- Modelagem de dados Aluno → CursoAluno → Curso, evitando redundâncias e diminuindo a tabela, possibilitando melhores filtragens tambem

**Geral**

- Criação da esteira CI/CD para o build, utilizando github runner
- Teste de deploy em uma EC2