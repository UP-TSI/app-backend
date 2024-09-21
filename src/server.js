const express = require("express");
const app = express();

// conn
const Config = require("./config/config.js");

// Documentation
const swagger = require("swagger-ui-express");
const swaggerDocs = require("../swagger.json");

// Importing routes
const exampleRouter = require("./routes/example_route/exampleRoute.js");
const productRouter = require("./routes/product_route/producRoute.js");
// Env config
require("dotenv").config();

//  Middlewares
// Handling with json
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Routes
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocs)); // Documentation Route
app.use("/", exampleRouter); // Example Route
app.use("/produtos", productRouter);

// Função para encerrar o servidor e a conexão com o banco de dados
async function shutdown() {
  console.log("Encerrando o servidor...");

  // Encerra a conexão com o banco de dados
  try {
    await Config.closeConnection();
  } catch (error) {
    console.error("Erro ao encerrar a conexão com o banco de dados:", error);
  }

  // Encerra o servidor Express
  if (server) {
    server.close(() => {
      console.log("Servidor encerrado.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

// Captura sinais de encerramento
process.on("SIGINT", shutdown); // Captura Ctrl+C
process.on("SIGTERM", shutdown); // Captura término do processo (geralmente enviado por sistemas de gerenciamento)

try {
  // Inicializa a conexão com o banco
  Config.startConnection();

  // Inicia o servidor Express
  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
  });
} catch (error) {
  console.error("Erro ao iniciar o servidor:", error);
  process.exit(1);
}
