<p align="center">
  <img src="https://app.empreendeaqui.com.br/dist/figma/login/rocketEllipse.svg" alt="Bank API" />
</p>

# API Bancária
Esta é uma API bancária desenvolvida como desafio técnico para vaga de desenvolvedor Back-End da empresa EmpreendeAqui.

**Funcionalidades Principais.**
Criação de Usuários.
Criação de Contas bancarias.
Transações(Pagamento) Realização de transações entre contas, consulta de histórico de transações.
Upload de imagem vinculada a transação.
Segurança: Autenticação e autorização de usuários para garantir acesso seguro aos recursos.

Tecnologias Utilizadas:
 - Node.js 
 - NestJs 
 - Prisma 
 - Multer 
 - AWS S3.

# Configuração do Banco de Dados
Execute o comando para subir o container do Docker Compose, este comando ira subir uma instância Postgres:

    docker-compose up -d
Após isso execute o comando de migrações para construir o banco de dados e as tabelas:

    npx prisma migrate dev


# Configuração do Ambiente

## Para configurar o ambiente de desenvolvimento, siga os passos abaixo:

**Variáveis de Ambiente:**
Renomeie o arquivo .env.example para .env e preencha as variáveis de ambiente necessárias, como:

    #Aplication
    APLICATION_PORT=
    APLICATION_SALT=
    
    #Data base
    DATABASE_URL=
    
    #S3
    S3_BUCKET=
    S3_REGION=
    S3_ACCESS_KEY_ID=
    S3_SECRET_ACCESS_KEY=
      
    #JWT
    TOKEN_SECRET
    TOKEN_EXPIRESIN=


**Instalação de Dependências:**

    npm install

   **Executar o Servidor:**
   
    npm run build
    npm start

# Endpoints Disponíveis

**A API oferece os seguintes endpoints principais:**


