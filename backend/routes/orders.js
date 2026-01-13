const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getUserOrders, 
  getAllOrders, 
  getOrderById, 
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');
const auth = require('../middleware/auth');

// @route   POST api/orders
// @desc    Create new order
// @access  Private
router.post('/', auth, createOrder);

// @route   GET api/orders/myorders
// @desc    Get user orders
// @access  Private
router.get('/myorders', auth, getUserOrders);

// @route   GET api/orders
// @desc    Get all orders (admin only)
// @access  Private (admin only)
router.get('/', auth, getAllOrders);

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, getOrderById);

// @route   PUT api/orders/:id
// @desc    Update order (admin only)
// @access  Private (admin only)
router.put('/:id', auth, updateOrder);

// @route   DELETE api/orders/:id
// @desc    Delete order (admin only)
// @access  Private (admin only)
router.delete('/:id', auth, deleteOrder);

module.exports = router;