const nodemailer = require('nodemailer');


// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Send an email using async/await

const sendEmail = async (to, otp) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}`, // Plain-text version of the message
            html: `<p>Your OTP is <b>${otp}</b></p>`, // HTML version of the message
        });
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail