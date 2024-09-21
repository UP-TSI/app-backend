const express = require("express");
const router = express.Router();

const productController = require("../../controllers/product_controller/productController.js");

router.get("/", productController.listagemProdutos);

module.exports = router;