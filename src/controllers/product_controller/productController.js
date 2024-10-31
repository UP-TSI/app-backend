const ProductRepository = require("../../repositories/productRepository.js");

class productController {
  constructor() {
    this.repository = new ProductRepository();
  }

  async listagemProdutos(req, res) {
    try {
      // Cria a variavel com os valores a serem filtrados
      const paginaAtual = parseInt(req.query.paginaAtual) || 1;
      const porPagina = parseInt(req.query.porPagina) || 10;

      // Chama a função de repositório passando as variaveis paginaAtual e porPagina
      const result = await this.repository.getProductsPaginated(
        paginaAtual,
        porPagina
      );

      // Retorna os produtos e cria um objeto no formato JSON
      res.status(200).json(result);
    } catch (error) {
      console.log("Erro ao listar produtos: ", error);
      res.status(500).json({ message: "Erro ao listar produtos." });
    }
  }

  async filtragemProdutos(req, res) {
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
      };

      // Chama a função de repositório passando o objeto params
      const result = await this.repository.getAllProductsFiltered(params);

      // Retorna os resultados encontrados
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao filtrar produtos: ", error);
      res.status(500).json({ message: "Erro ao filtrar produtos." });
    }
  }

  async buscarProdutoPorCodigo(req, res) {
    try {
      const { codigo } = req.query;

      // Chama a função de repositório passando o código do produto
      const result = await this.repository.getProductByCod(codigo);

      // Retorna os resultados encontrados
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao filtrar produtos: ", error);
      res
        .status(500)
        .json({ message: `Erro ao filtrar produto do codigo ${codigo}.` });
    }
  }
}

module.exports = productController;
