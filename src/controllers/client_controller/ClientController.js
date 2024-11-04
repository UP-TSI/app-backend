const ClientRepository = require("../../repositories/clientRepository.js");

class ClientController {
  constructor() {
    this.repository = new ClientRepository();
  }

  async listagemClientes(req, res) {
    try {
      // Cria a variável com os valores a serem filtrados
      const paginaAtual = parseInt(req.query.paginaAtual) || 1;
      const porPagina = parseInt(req.query.porPagina) || 10;

      // Chama a função de repositório passando as variáveis paginaAtual e porPagina
      const result = await this.repository.getClientsPaginated(
        paginaAtual,
        porPagina
      );

      // Retorna os clientes e cria um objeto no formato JSON
      res.status(200).json(result);
    } catch (error) {
      console.log("Erro ao listar clientes: ", error);
      res.status(500).json({ message: "Erro ao listar clientes." });
    }
  }

  async filtragemClientes(req, res) {
    try {
      const {
        nome = "",
        idade = "",
        relacaoIdade = "=",
        cidade = "",
        relacaoCidade = "=",
      } = req.body;

      // Cria o objeto com os parâmetros a serem filtrados
      const params = {
        nome,
        idade,
        relacaoIdade,
        cidade,
        relacaoCidade,
      };

      // Chama a função de repositório passando o objeto params
      const result = await this.repository.getAllClientsFiltered(params);

      // Retorna os resultados encontrados
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao filtrar clientes: ", error);
      res.status(500).json({ message: "Erro ao filtrar clientes." });
    }
  }
}

module.exports = ClientController;
