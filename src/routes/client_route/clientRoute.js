const express = require("express");
const router = express.Router();

const ProductController = require("../../controllers/product_controller/productController.js");

const productController = new ProductController();

router.get("/", (req, res) => productController.listagemProdutos(req, res));
router.post("/", (req, res) => productController.filtragemProdutos(req, res));
router.post("/getByCod", (req, res) =>
  productController.buscarProdutoPorCodigo(req, res)
);

module.exports = router;