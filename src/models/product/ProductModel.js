// Database instance
const Config = require("../../config/config.js");

class ProductModel {
  static async getProductByCode(codigo) {
    const sql = "SELECT * FROM tb_Produtos WHERE Codigo_Barras =?";
    return await Config.sql(sql, [codigo]);
  }

  static async getProductsFiltered(whereClause, values, perPage, offset) {
    const sql = `
                SELECT 
                    Codigo_Barras AS cod_barras,
                    Produto AS nome,
                    FORMAT(Preco_Compra, 2) AS v_compra,
                    FORMAT(Preco_Venda, 2) AS v_venda,
                    FORMAT((Preco_Venda - Preco_Compra), 2) AS lucro,
                    Estoque AS estoque
                FROM 
                    tb_Produtos
                ${whereClause}  
                LIMIT ${perPage} 
                OFFSET ${offset}`;

    return Config.sql(sql, values);
  }

  static async getPagination(whereClause, values) {
    const sql = `SELECT COUNT (*) as total FROM tb_Produtos ${whereClause}`;
    return Config.sql(sql, values);
  }

  static async getStatistics(graphType = "", params = "") {
    var sql;
    switch (graphType) {
      case "potencialProfit":
        sql = `
              SELECT Codigo as id, Produto as nome, ((Preco_Venda - Preco_Compra) * Estoque) as lucroPotencial 
              FROM   tb_Produtos 
              ORDER BY lucroPotencial DESC LIMIT 5 `;
        break;
      case "allocatedValue":
        sql = `
              SELECT  Codigo as id, Produto as nome, ((Preco_Compra) * Estoque) as valorAlocado 
              FROM   tb_Produtos 
              ORDER BY valorAlocado DESC LIMIT 5 `;
        break;
      default:
        break;
    }
    return Config.sql(sql);
  }
}

module.exports = ProductModel;
