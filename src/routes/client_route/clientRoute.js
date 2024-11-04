const express = require("express");
const router = express.Router();

const ClientController = require('../../controllers/client_controller/ClientController'); 

const clientController = new ClientController(); // Corrigido: use clientController

router.get("/", (req, res) => clientController.listagemClientes(req, res));
router.post("/", (req, res) => clientController.filtragemClientes(req, res));
router.post("/getByCod", (req, res) =>
  clientController.buscarClientePorCodigo(req, res)
);

module.exports = router;