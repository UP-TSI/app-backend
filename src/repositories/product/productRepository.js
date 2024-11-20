// Models
const ProductModel = require("../../models/product/ProductModel.js");

class ProductRepository {
  async getProductByCode(codigo = "") {
    // Validação do código de barras
    if (!codigo || typeof codigo !== "string" || codigo.trim() === "") {
      throw new Error("Código de barras inválido ou não fornecido.");
    }

    // Chama a model para buscar o produto
    try {
      const product = await ProductModel.getProductByCode(codigo);

      // Verifica se o produto foi encontrado
      if (!product || product.length === 0) {
        throw new Error(
          `Produto com o código de barras "${codigo}" não encontrado.`
        );
      }

      return product;
    } catch (error) {
      console.error(
        `Erro ao buscar produto pelo código de barras "${codigo}":`,
        error
      );
      throw error;
    }
  }

  async getProductsFiltered(params) {
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

    // Executa a query com os valores da consulta preparada
    const mainData = await ProductModel.getProductsFiltered(
      whereClause,
      values,
      perPage,
      offset
    );

    // Dados do Pagination
    const [countResult] = await ProductModel.getPagination(whereClause, values);

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
    const result = await ProductModel.getStatistics(graphType, params);
    if (!result) {
      throw new Error(`Erro a retornar dados para o grafico: ${graphType}`);
    }
    return result;
  }
}

module.exports = ProductRepository;
