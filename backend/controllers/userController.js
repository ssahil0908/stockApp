const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    // Create a new user
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    // Handle duplicate key error (unique email constraint)
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email
    });

    if (user) {
      // Compare the entered password with the stored password
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        //res.status(200).json({ message: 'Login successful', user });
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, '#secretKeySahil#', { expiresIn: '1h' });
        // Respond with the user and token
        res.status(200).json({ message: 'Login successful', user, token });
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
