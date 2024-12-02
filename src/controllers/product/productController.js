const ProductRepository = require("../../repositories/product/productRepository.js");

class productController {
  constructor() {
    this.repository = new ProductRepository();
  }

  async getProductsFiltered(req, res) {
    try {
      const {
        equalTo = "",
        nameIncludes = "",
        purchaseValueMin = "",
        purchaseValueMax = "",
        saleValueMin = "",
        saleValueMax = "",
        profitMin = "",
        profitMax = "",
        quantityMin = "",
        quantityMax = "",
        currentPage = 1,
        perPage = 10,
        cod_barras = "",
      } = req.query;

      // Cria o objeto com os parâmetros a serem filtrados
      const params = {
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
        currentPage,
        perPage,
        cod_barras,
      };

      // Chama a função de repositório passando o objeto params
      const result = await this.repository.getProductsFiltered(params);

      // Retorna os resultados encontrados
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao filtrar produtos: ", error);
      res.status(500).json({ message: "Erro ao filtrar produtos." });
    }
  }

  async getProductByCode(req, res) {
    try {
      const { codigo } = req.query;

      // Chama a função de repositório passando o código do produto
      const result = await this.repository.getProductByCode(codigo);

      // Retorna os resultados encontrados
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao filtrar produtos: ", error);
      res
        .status(500)
        .json({ message: `Erro ao filtrar produto do codigo ${codigo}.` });
    }
  }

  async getStatistics(req, res) {
    try {
      const { graphType } = req.query;

      const result = await this.repository.getStatistics(graphType);

      // Retorna os resultados encontrados
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao filtrar produtos: ", error);
      res.status(500).json({ message: `Erro ao buscar lucros potenciais.` });
    }
  }
}

module.exports = productController;
