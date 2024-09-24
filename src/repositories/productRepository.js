const Config = require("../config/config.js");

class ProductRepository {
  async getAllProducts() {
    const sql = "SELECT * FROM tb_Produtos";
    return await Config.sql(sql);
  }

  async getProductById(id) {
    const sql = "SELECT * FROM tb_Produtos WHERE id =?";
    return await Config.sql(sql, [id]);
  }

  async getAllProductsFiltered(params) {
    const {
      produto = "",
      precoCompra = "",
      relacaoCompra = "",
      precoVende = "",
      relacaoVende = "",
      qtdEstoque = "",
      relacaoEstoque = "",
    } = params;

    const whereClauses = [];
    const values = [];

    // Monta as condições dinamicamente
    if (produto) {
      whereClauses.push(`Produto LIKE ?`);
      values.push(`%${produto}%`);
    }
    if (precoCompra) {
      whereClauses.push(`Preco_Compra ${relacaoCompra} ?`);
      values.push(precoCompra);
    }
    if (precoVende) {
      whereClauses.push(`Preco_Venda ${relacaoVende} ?`);
      values.push(precoVende);
    }
    if (qtdEstoque) {
      whereClauses.push(`Estoque ${relacaoEstoque} ?`);
      values.push(qtdEstoque);
    }

    // Se houver condições, adicione WHERE, senão retorne todos os produtos
    const whereCondition =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const sql = `SELECT * FROM tb_Produtos ${whereCondition}`;

    // Executa a query com os valores da consulta preparada
    const result = await Config.sql(sql, values);
    return result;
  }
}

module.exports = ProductRepository;
