const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs');

// GET user registration page
router.get('/register', (req, res) => {
  res.render('register');
});

// POST new user registration
router.post('/register', async (req, res) => {
  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    // Create new user with hashed password
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword
    });
    
    // Set session user_id to new user's id
    req.session.user_id = newUser.id;
    
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.render('register', { error: 'Error creating user. Please try again.' });
  }
});

// GET user login page
router.get('/login', (req, res) => {
  res.render('login');
});

// POST user login
router.post('/login', async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({ where: { username: req.body.username }});
    
    // Check if password matches hashed password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    
    if (!user || !validPassword) {
      res.render('login', { error: 'Invalid username or password.' });
      return;
    }
    
    // Set session user_id to authenticated user's id
    req.session.user_id = user.id;
    
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.render('login', { error: 'Error logging in. Please try again.' });
  }
});

// POST user logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
