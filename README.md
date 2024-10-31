# Back-End
Este repositório contém o código-fonte para o backend da aplicação. O backend é responsável por fornecer APIs para comunicação com o front-end, gerenciar a lógica de negócios e interagir com o banco de dados.

Este backend é construído com Node.js e Express e utiliza um banco de dados MySQL para armazenar e gerenciar dados. O projeto é estruturado para facilitar a manutenção e a escalabilidade, separando a lógica em módulos distintos, incluindo modelos, controladores e rotas.

## Como Desenvolver
Para o deploy em desenvolvimento no domínio de dev do projeto. É necessário seguir alguns passos...
1. Primeiro de tudo crie sua branch `git checkout -b nome_branch`
2. Após as mudanças no código faça o seu commit do jeito que achar melhor. (recomendo interface do vscode)
3. No repositório do GitHub, clique em Novo Pull Request na [página com a listagem dos PR's](https://github.com/UP-TSI/app-backend/pulls)
4. Aonde estará escrito `base:main`, mude para `base:develop` e abra o PR
5. Agora, resolva os conflitos (caso tenha) e faça o merge com a branch develop
6. E pronto o CI/CD já vai rodar e em alguns minutos o seu código estará no domínio em DEV.

## Estrutura do Projeto
O projeto segue a seguinte estrutura de diretórios:

- **config** - Configurações do banco de dados e outras configurações
- **controllers** - Lógica de negócios e manipulação de dados
- **routes** - Definição das rotas da API
- **models** - Modelos de dados e interações com o banco de dados
- **utils** - Funções utilitárias e auxiliares
- **.env** - Arquivo de variáveis de ambiente
- **app.js** - Arquivo principal para inicializar o servidor
- **package.json** - Gerenciador de pacotes e scripts
- **README.md** - Documentação do projeto

## Requisitos
- Node.js
- MySQL

## Utilização

1. Clonar o projeto `git clone https://github.com/UP-TSI/Back-End`
2. Navegue até o diretório e instale as dependências `npm install`
3. Crie um arquivo `.env` na raiz do projeto, contendo estas variáveis e seus valores
```
- DB_HOST=
- DB_USER=
- DB_PASS=
- DB_NAME=
- PORT=
```
4. Inicie o servidor `npm run dev`
