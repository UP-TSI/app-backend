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
    const { produto, precoCompra, precoVende, qtdeEstoque } = params;

    let whereConditions = "";

    if (produto) whereConditions += `Produto = ${produto}`;
    

    const sql = "SELECT * FROM tb_Produtos WHERE 1=1";
  }
}

module.exports = ProductRepository;
