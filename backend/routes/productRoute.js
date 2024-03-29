const express = require('express');
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    getAdminProducts
} = require("../controllers/productController");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth");
const {createProductReview, getProductReviews, deleteReview} = require("../controllers/userController");
const router = express.Router();

router.route('/products').get(getAllProducts)
router.route('/products/admin/new').post(isAuthenticatedUser, authorizedRoles('admin'), createProduct)
router.route('/product/admin/:id')
    .put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProduct)
router.route('/product/:id').get(getProductDetails)
router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview)

router.route('/admin/products').get(isAuthenticatedUser, authorizedRoles('admin'), getAdminProducts)


module.exports = router;