const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/signup
// @desc    Register user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ errors: [{ message: 'Valid email is required' }] });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ errors: [{ message: 'Password must be at least 6 characters' }] });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    user = new User({ email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, email: user.email } });
      }
    );
  } catch (err) {
    console.error(err.stack);
    res.status(500).send(err.stack);
  }
});

// @route   POST api/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ errors: [{ message: 'Valid email is required' }] });
    }
    if (!password) {
      return res.status(400).json({ errors: [{ message: 'Password is required' }] });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, email: user.email } });
      }
    );
  } catch (err) {
    console.error(err.stack);
    res.status(500).send(err.stack);
  }
});

// @route   POST api/logout
// @desc    Logout user
// @access  Public
router.post('/logout', (req, res) => {
  // Since we use JWT on the client side, logout is typically handled by 
  // removing the token on the client. We send a success message here.
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
