const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/mailer.utils');

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate JWT reset token
    const token = jwt.sign(
      { sub: user._id, purpose: 'password-reset' },
      process.env.JWT_SECRETKEY,
      { expiresIn: '15m' }
    );

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    // Use unified sendEmail utility
    await sendEmail(email, "reset", resetLink);

    return res.json({ message: 'Password reset link sent to email' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = forgotPassword;