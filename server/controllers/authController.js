const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    // If user exists but has no password, allow them to set a password
    if (user && !user.password_hash) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await user.update({ password_hash: hashedPassword, full_name: name, role });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "User registration completed successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.full_name,
          role: user.role,
          token: token,
        },
      });
    }

    // If user already exists and has a password, prevent duplicate registration
    if (user) {
      return res.status(409).json({ message: "User already registered" });
    }

    // If user does not exist, create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      email,
      password_hash: hashedPassword,
      full_name: name,
      role,
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If password is NULL, prompt the user to set a password
    if (!user.password_hash) {
      return res.status(400).json({
        message: "User exists but no password set. Please go to register and create a password.",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "User logged successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};
