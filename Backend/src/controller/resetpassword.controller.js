const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({
                message: 'Token and new password are required'
            })
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRETKEY)
        } catch (error) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const user = await userModel.findById(decoded.sub);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        await user.save();

        return res.json({ message: 'Password reset successful ✅' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });

    }
}

module.exports = resetPassword;