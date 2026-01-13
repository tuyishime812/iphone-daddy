// controllers/authController.js
const jwt = require('jsonwebtoken');

// Hardcoded admin credentials
const ADMIN_EMAIL = 'iphonedaddy@.com';
const ADMIN_PASSWORD = 'iphonedaddy#';

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check hardcoded credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Return jsonwebtoken for admin
      const payload = {
        user: {
          id: 'admin',
          role: 'admin'
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'mySecret',
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: 'admin',
              email: ADMIN_EMAIL,
              role: 'admin'
            }
          });
        }
      );
    } else {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get user data
// @route   GET /api/auth
// @access  Private
exports.getUser = async (req, res) => {
  try {
    // Return hardcoded admin user data
    res.json({
      id: 'admin',
      email: ADMIN_EMAIL,
      role: 'admin',
      name: 'Admin'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};