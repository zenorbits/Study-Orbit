const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const { generateOtp } = require('../services/otp.services');

// Register
const registerUser = async (req, res) => {
  const { username, email, phoneNumber, password, secretKey } = req.body;

  try {
    const userExists = await userModel.findOne({
      $or: [{ email }, { phoneNumber }]
    });
    if (userExists) {
      return res.status(400).json({ message: 'User already Exists' });
    }

    let setRole = '';
    const hashedPassword = await bcrypt.hash(password, 10);

    if (secretKey === process.env.ADMIN_SECRETKEY) setRole = 'admin';
    else if (secretKey === process.env.TEACHER_SECRETKEY) setRole = 'teacher';
    else if (secretKey === process.env.STUDENT_SECRETKEY) setRole = 'student';
    else if (secretKey === process.env.PARENT_SECRETKEY) setRole = 'parent';
    else return res.status(400).json({ message: 'Invalid Credentials' });

    // Create user with isVerified = false
    const user = await userModel.create({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
      role: setRole,
      isVerified: false
    });

    // Generate OTP and send email
    req.body.userId = user._id;
    req.body.email = user.email;
    await generateOtp(req, res);

    return res.status(201).json({
      message: 'User registered successfully. Please verify OTP sent to your email.',
      user: { id: user._id, username: user.username, email: user.email, phoneNumber: user.phoneNumber, role: user.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
const loginUser = async (req, res) => {
  const { emailOrphoneNumber, password } = req.body;

  try {
    const user = await userModel.findOne({
      $or: [{ email: emailOrphoneNumber }, { phoneNumber: emailOrphoneNumber }]
    });
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email, phoneNumber: user.phoneNumber, role: user.role },
      process.env.JWT_SECRETKEY,
      { expiresIn: '3h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 3 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: 'User Logged in successfully',
      token,
      user: { id: user._id, username: user.username, email: user.email, phoneNumber: user.phoneNumber, role: user.role }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Logout
const userLogout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });
  return res.status(200).json({ message: 'User Logged Out Successfully' });
};

module.exports = { registerUser, loginUser, userLogout };