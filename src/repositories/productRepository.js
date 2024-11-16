const Config = require("../config/config.js");

class ProductRepository {
  async getProductByCod(codigo) {
    const sql = "SELECT * FROM tb_Produtos WHERE Codigo_Barras =?";
    return await Config.sql(sql, [codigo]);
  }

  async getAllProductsFiltered(params) {
    const {
      equalTo,
      nameIncludes,
      purchaseValueMin,
      purchaseValueMax,
      saleValueMin,
      saleValueMax,
      profitMin,
      profitMax,
      quantityMin,
      quantityMax,
      currentPage = 1,
      perPage = 10,
    } = params;

    // Calculando offset
    const offset = (currentPage - 1) * perPage;

    // Inicializa as condições e os valores para a consulta
    const whereClauses = [];
    const values = [];

    // Monta as condições dinamicamente
    if (equalTo) {
      whereClauses.push(`Produto = ?`);
      values.push(equalTo);
    }
    if (nameIncludes) {
      whereClauses.push(`Produto LIKE ?`);
      values.push(`%${nameIncludes}%`);
    }
    if (purchaseValueMin) {
      whereClauses.push(`Preco_Compra >= ?`);
      values.push(purchaseValueMin);
    }
    if (purchaseValueMax) {
      whereClauses.push(`Preco_Compra <= ?`);
      values.push(purchaseValueMax);
    }
    if (saleValueMin) {
      whereClauses.push(`Preco_Venda >= ?`);
      values.push(saleValueMin);
    }
    if (saleValueMax) {
      whereClauses.push(`Preco_Venda <= ?`);
      values.push(saleValueMax);
    }
    if (profitMin) {
      whereClauses.push(`(Preco_Venda - Preco_Compra)  >= ?`);
      values.push(profitMin);
    }
    if (profitMax) {
      whereClauses.push(`(Preco_Venda - Preco_Compra)  <= ?`);
      values.push(profitMax);
    }
    if (quantityMin) {
      whereClauses.push(`Estoque >= ?`);
      values.push(quantityMin);
    }
    if (quantityMax) {
      whereClauses.push(`Estoque <= ?`);
      values.push(quantityMax);
    }

    // Concatena as cláusulas `WHERE`
    const whereClause = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    // Exemplo de consulta SQL montada
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

    // Executa a query com os valores da consulta preparada
    const mainData = await Config.sql(sql, values);

    // Dados do Pagination
    const sqlCount = `SELECT COUNT (*) as total FROM tb_Produtos ${whereClause}`;
    const [countResult] = await Config.sql(sqlCount, values);

    const totalItems = countResult.total;
    const totalPages = Math.ceil(totalItems / perPage);

    let pagination = {
      currentPage: currentPage,
      totalItems: totalItems,
      totalPages: totalPages,
      perPage: perPage,
    };

    return { pagination, mainData };
  }

  // Função para executar a query
  async getStatistics(graphType = "", params = "") {
    const query = this.getQuery(graphType, params);
    if (!query) {
      throw new Error(`Erro a retornar dados para o grafico: ${graphType}`);
    }
    return await Config.sql(query);
  }

  getQuery(graphType="", params="") {
    var query;
    switch (graphType) {
      case "potencialProfit":
        query = `
              SELECT Codigo as id, Produto as nome, ((Preco_Venda - Preco_Compra) * Estoque) as lucroPotencial 
              FROM   tb_Produtos 
              ORDER BY lucroPotencial DESC LIMIT 5 `;
        break;
      case "allocatedValue":
        query = `
              SELECT  Codigo as id, Produto as nome, ((Preco_Compra) * Estoque) as valorAlocado 
              FROM   tb_Produtos 
              ORDER BY valorAlocado DESC LIMIT 5 `;
        break
      default:
        break;
    }
    return query;

  }
}

module.exports = ProductRepository;
