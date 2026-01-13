const express = require('express');
const router = express.Router();
const {
  getMerchandise,
  getMerchandiseItem,
  addMerchandise,
  updateMerchandise,
  deleteMerchandise
} = require('../controllers/merchandiseController');
const auth = require('../middleware/auth');

// @route   GET api/merchandise
// @desc    Get all merchandise
// @access  Public
router.get('/', getMerchandise);

// @route   GET api/merchandise/:id
// @desc    Get merchandise by ID
// @access  Public
router.get('/:id', getMerchandiseItem);

// @route   POST api/merchandise
// @desc    Add new merchandise
// @access  Private (admin only)
router.post('/', auth, addMerchandise);

// @route   PUT api/merchandise/:id
// @desc    Update merchandise
// @access  Private (admin only)
router.put('/:id', auth, updateMerchandise);

// @route   DELETE api/merchandise/:id
// @desc    Delete merchandise
// @access  Private (admin only)
router.delete('/:id', auth, deleteMerchandise);

module.exports = router;