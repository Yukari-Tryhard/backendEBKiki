const express = require("express");
const multer = require('multer');
const {
  addProduct,
  getProductById,
  getProductDetailsBySlug,
  deleteProductById,
  enableProductById,
  getProducts,
  updateProduct,
  searchByProductName,
  getProductByCategory,
  addProductReview,
  deleteProductByCateId,
  enableProductByCateId,
  getProductsDisable,
  searchProductByImage,
  getProductsByPages,
  getProductByCategoryName
} = require("../controllers/product");
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
  uploadCloud,
} = require("../common-middleware");
const upload = multer();
const router = express.Router();

router.post(
  "/add",
  requireSignin,
  adminMiddleware,
  uploadCloud.array("productPictures"),
  addProduct
);
router.get("/getProducts", getProducts);
router.post("/getProductDisable", getProductsDisable);
router.post(
  "/addProductReview",
  requireSignin,
  userMiddleware,
  addProductReview
);
router.get("/getById", getProductById);
router.post(
  "/update/:slug",
  requireSignin,
  adminMiddleware,
  uploadCloud.array("productPictures"),
  updateProduct
  );
  router.post("/searchByProductName", searchByProductName);
  router.post("/searchByImage",  upload.single('image'), searchProductByImage)
router.get("/getProductsByCategory/:categoryId", getProductByCategory);
router.get("/getProductsByPages", getProductsByPages);
router.get("/getProductsByCategoryName/:categoryName", getProductByCategoryName);
router.post(
  "/deleteByCategory",
  requireSignin,
  adminMiddleware,
  deleteProductByCateId
);
router.post(
  "/enableByCategory",
  requireSignin,
  adminMiddleware,
  enableProductByCateId
);

router.post(
  "/deleteProductById",
  requireSignin,
  adminMiddleware,
  deleteProductById
);

router.post(
  "/enableProductById",
  requireSignin,
  adminMiddleware,
  enableProductById
);

router.get("/:slug", getProductDetailsBySlug);

module.exports = router;
