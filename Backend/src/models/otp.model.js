const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        code: { type: String, required: true, minlength: 6, maxlength: 6 },
        expiresAt: { type: Date, required: true }
    },
    { timestamps: true }
);

// TTL index: auto-delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OtpModel = mongoose.model("Otp", otpSchema);

module.exports = OtpModel;