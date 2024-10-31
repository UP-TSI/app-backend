const Config = require("../config/config.js");
const { Utils } = require("../utils/util.js");

class ProductRepository {
  async getAllProducts() {
    const sql = "SELECT * FROM tb_Produtos";
    return await Config.sql(sql);
  }

  async getProductsPaginated(paginaAtual, porPagina) {
    //calculo para saber em qual index deve iniciar a busca no banco
    const offset = (paginaAtual - 1) * porPagina;

    const sqlSelect = `SELECT * FROM tb_Produtos LIMIT ${porPagina} OFFSET ${offset}`;

    const rows = await Config.sql(sqlSelect, [porPagina, offset]);

    const sqlCount = "SELECT COUNT (*) as total FROM tb_Produtos";
    const [countResult] = await Config.sql(sqlCount);

    const totalItems = countResult.total;
    const totalPaginas = Math.ceil(totalItems / porPagina);

    //objeto de retorno com os valores da paginação
    return {
      paginaAtual: paginaAtual,
      totalPaginas: totalPaginas,
      totalItems: totalItems,
      porPagina: porPagina,
      produtos: rows,
    };
  }

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
    const sql = `SELECT *, (Preco_Venda - Preco_Compra) as Lucro FROM  tb_Produtos ${whereClause}  LIMIT ${perPage} OFFSET ${offset}`;

    // Executa a query com os valores da consulta preparada
    const result = await Config.sql(sql, values);
    return result;
  }
}

module.exports = ProductRepository;
