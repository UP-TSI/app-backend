const ProductRepository = require("../../repositories/productRepository.js");

class productController {
  constructor() {
    this.repository = new ProductRepository();
  }

  async listagemProdutos(req, res) {
    try {
      // const paginaAtual = parseInt(req.query.paginaAtual) || 1;
      // const porPagina = parseInt(req.query.porPagina) ||  10;
      // const offset = (paginaAtual - 1) * porPagina;

      // const [rows] = await connection.execute(
      //     "SELECT * FROM produtos PORPAGINA ? OFFSET ?",
      //     [porPagina, offset]
      // );

      // const [countResult] = await connection.execute(
      //     "SELECT COUNT (*) as total FROM produtos"
      // );

      // const totalItems = countResult[0].total;
      // const totalPaginas = Math.ceil(totalItems/porPagina);

      // res.status(200).json({
      //     paginaAtual: paginaAtual,
      //     totalPaginas: totalPaginas,
      //     totalItems: totalItems,
      //     porPagina: porPagina,
      //     produtos: rows,
      // });

      const result = await this.repository.getAllProducts();

      // Retorna os produtos em formato JSON
      res.status(200).json(result);
    } catch (error) {
      console.log("Erro ao listar produtos: ", error);
      res.status(500).json({ message: "Erro ao listar produtos." });
    }
  }

  async filtragemProdutos(req, res) {
    try {
      const { produto, precoCompra, precoVende, qtdeEstoque } = req.body;
    } catch (error) {
      console.log("Erro ao filtrar produtos: ", error);
      res.status(500).json({ message: "Erro ao filtrar produtos." });
    }
  }
}

module.exports = productController;
