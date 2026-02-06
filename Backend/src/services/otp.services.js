const otpGenerator = require("otp-generator");
const otpModel = require("../models/otp.model");

const generateOtp = async (userId) => {
    // Clear old OTPs for this user
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

    return otp; // send via email/SMS, not directly to client
};

module.exports = generateOtp;