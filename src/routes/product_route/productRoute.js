const express = require("express");
const router = express.Router();

const ProductController = require("../../controllers/product_controller/productController.js");

const productController = new ProductController();

router.get("/", (req, res) => productController.filtragemProdutos(req, res));
router.get("/getByCod", (req, res) =>
  productController.buscarProdutoPorCodigo(req, res)
);

module.exports = router;
