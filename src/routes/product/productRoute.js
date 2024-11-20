const express = require("express");
const router = express.Router();

const ProductController = require("../../controllers/product/productController.js");

const productController = new ProductController();

router.get("/", (req, res) => productController.getProductsFiltered(req, res));
router.get("/getByCod", (req, res) => productController.getProductByCode(req, res));
router.get("/statistics", (req, res) => productController.getStatistics(req, res));

module.exports = router;
