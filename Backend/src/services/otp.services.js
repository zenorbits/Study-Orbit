const otpGenerator = require("otp-generator");
const otpModel = require("../models/otp.model");
const sendEmail = require('../utils/mailer.utils');
const User = require('../models/user.model');

const generateOtp = async (req, res) => {
    // Clear old OTPs for this user
    const { userId, email } = req.body;

    await otpModel.deleteMany({ userId });

    // Generate new OTP
    const otp = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });

    // Save with expiry
    await otpModel.create({
        userId,
        code: otp,
        expiresAt: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes
    });

    await sendEmail(email, otp);

    return otp; // send via email/SMS, not directly to client
};

const verifyOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        const record = await otpModel.findOne({ userId });
        if (!record) return res.status(400).send("No OTP found");
        if (record.expiresAt < new Date()) return res.status(400).send("OTP expired");
        if (record.code !== otp) return res.status(400).send("Invalid OTP");

        // Success → mark user verified or issue JWT
        await otpModel.deleteMany({ userId }); // clear OTPs
        await User.findByIdAndUpdate(userId, { isVerified: true }); // optional

        res.json({ message: "OTP verified successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to verify OTP" });
    }
};
module.exports = { generateOtp, verifyOtp };