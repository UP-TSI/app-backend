const mysql = require("mysql2/promise");

class Config {
  static connection = null;

  // Iniciar a conexão com o banco de dados
  static async startConnection() {
    if (!this.connection) {
      try {
        this.connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
        });
        console.log("Conexão ao banco de dados bem-sucedida!");
      } catch (error) {
        console.error("Erro ao conectar ao MySQL:", error);
        throw error;
      }
    } else {
      return this.connection;
    }
  }

  // Fechar a conexão
  static async closeConnection() {
    if (this.connection) {
      try {
        await this.connection.end();
        this.connection = null; // Resetar a conexão
        console.log("Conexão ao banco de dados encerrada.");
      } catch (error) {
        console.error("Erro ao fechar a conexão ao MySQL:", error);
        throw error;
      }
    }
  }
}

module.exports = Config;
