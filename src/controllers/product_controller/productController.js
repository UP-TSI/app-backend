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
        produto = "",
        precoCompra = "",
        relacaoCompra = "=",
        precoVende = "",
        relacaoVende = "=",
        qtdEstoque = "",
        relacaoEstoque = "=",
      } = req.body;

      // Cria o objeto com os parâmetros a serem filtrados
      const params = {
        produto,
        precoCompra,
        relacaoCompra,
        precoVende,
        relacaoVende,
        qtdEstoque,
        relacaoEstoque,
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
      const { codigo } = req.body;

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
