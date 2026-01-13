const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const auth = require('../middleware/auth');

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', getProducts);

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', getProduct);

// @route   POST api/products
// @desc    Add new product
// @access  Private (admin only)
router.post('/', auth, addProduct);

// @route   PUT api/products/:id
// @desc    Update product
// @access  Private (admin only)
router.put('/:id', auth, updateProduct);

// @route   DELETE api/products/:id
// @desc    Delete product
// @access  Private (admin only)
router.delete('/:id', auth, deleteProduct);

module.exports = router;