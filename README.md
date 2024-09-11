# Back-End
Este repositório contém o código-fonte para o backend da aplicação. O backend é responsável por fornecer APIs para comunicação com o front-end, gerenciar a lógica de negócios e interagir com o banco de dados.

Descrição
Este backend é construído com Node.js e Express e utiliza um banco de dados MySQL para armazenar e gerenciar dados. O projeto é estruturado para facilitar a manutenção e a escalabilidade, separando a lógica em módulos distintos, incluindo modelos, controladores e rotas.

Estrutura do Projeto
O projeto segue a seguinte estrutura de diretórios:

back-end/
├── src/
│   ├── config/             # Configurações do banco de dados e outras configurações
│   ├── controllers/        # Lógica de negócios e manipulação de dados
│   ├── routes/             # Definição das rotas da API
│   ├── middleware/         # Middleware para autenticação e outras funções
│   ├── models/             # Modelos de dados e interações com o banco de dados
│   ├── server.js           # Arquivo principal para inicializar o servidor
│   └── utils/              # Funções utilitárias e auxiliares
├── .env                    # Arquivo de variáveis de ambiente
├── package.json            # Gerenciador de pacotes e scripts
└── README.md               # Documentação do projeto

