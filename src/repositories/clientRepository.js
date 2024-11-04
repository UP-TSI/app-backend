const mysql = require('mysql2/promise'); // Certifique-se de que você tem mysql2 instalado

class ClientRepository {
  constructor() {
    this.connection = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async getClientsPaginated(paginaAtual, porPagina) {
    const offset = (paginaAtual - 1) * porPagina;
    const [rows] = await this.connection.query(
      'SELECT * FROM clients LIMIT ?, ?',
      [offset, porPagina]
    );
    return rows;
  }

  async getAllClientsFiltered(params) {
    const conditions = [];
    const values = [];

    if (params.nome) {
      conditions.push('nome LIKE ?');
      values.push(`%${params.nome}%`);
    }
    if (params.idade) {
      conditions.push(`idade ${params.relacaoIdade} ?`);
      values.push(params.idade);
    }
    if (params.cidade) {
      conditions.push('cidade LIKE ?');
      values.push(`%${params.cidade}%`);
    }

    const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
    const [rows] = await this.connection.query(
      `SELECT * FROM clients ${whereClause}`,
      values
    );

    return rows;
  }
}

module.exports = ClientRepository;
