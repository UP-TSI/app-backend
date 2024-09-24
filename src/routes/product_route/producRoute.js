const express = require("express");
const router = express.Router();

const ProductController = require("../../controllers/product_controller/productController.js");

const productController = new ProductController();

router.get("/", (req, res) => productController.listagemProdutos(req, res));
//router.post("/", productController.filtragemProdutos);

module.exports = router;
