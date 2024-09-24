const mysql = require("mysql2/promise");

class Config {
  // Método para executar uma consulta SQL com abertura e fechamento da conexão
  static async sql(query) {
    let connection = null;
    try {
      // Abre uma nova conexão a cada consulta
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });
      console.log("Conexão ao banco de dados estabelecida.");

      // Executa a consulta
      const [result] = await connection.execute(query);
      return result;
    } catch (error) {
      console.error("Erro ao executar SQL:", error);
      throw error;
    } finally {
      if (connection) {
        try {
          await connection.end(); // Fecha a conexão após a consulta
          console.log("Conexão ao banco de dados encerrada.");
        } catch (closeError) {
          console.error("Erro ao fechar a conexão ao MySQL:", closeError);
        }
      }
    }
  }
}

module.exports = Config;
