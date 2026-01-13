// controllers/merchandiseController.js
const Merchandise = require('../models/Merchandise');

// @desc    Get all merchandise
// @route   GET /api/merchandise
// @access  Public
exports.getMerchandise = async (req, res) => {
  try {
    const merchandise = await Merchandise.find().sort({ createdAt: -1 });
    res.json(merchandise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get single merchandise
// @route   GET /api/merchandise/:id
// @access  Public
exports.getMerchandiseItem = async (req, res) => {
  try {
    const merch = await Merchandise.findById(req.params.id);
    
    if (!merch) {
      return res.status(404).json({ msg: 'Merchandise not found' });
    }
    
    res.json(merch);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add new merchandise
// @route   POST /api/merchandise
// @access  Private (admin only)
exports.addMerchandise = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const newMerch = new Merchandise({
      name,
      description,
      price,
      category,
      image
    });

    const merch = await newMerch.save();
    res.json(merch);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update merchandise
// @route   PUT /api/merchandise/:id
// @access  Private (admin only)
exports.updateMerchandise = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const merchFields = {};
    if (name) merchFields.name = name;
    if (description) merchFields.description = description;
    if (price) merchFields.price = price;
    if (category) merchFields.category = category;
    if (image) merchFields.image = image;

    let merch = await Merchandise.findById(req.params.id);

    if (!merch) {
      return res.status(404).json({ msg: 'Merchandise not found' });
    }

    merch = await Merchandise.findByIdAndUpdate(
      req.params.id,
      { $set: merchFields },
      { new: true }
    );

    res.json(merch);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete merchandise
// @route   DELETE /api/merchandise/:id
// @access  Private (admin only)
exports.deleteMerchandise = async (req, res) => {
  try {
    const merch = await Merchandise.findById(req.params.id);

    if (!merch) {
      return res.status(404).json({ msg: 'Merchandise not found' });
    }

    await Merchandise.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Merchandise removed' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};