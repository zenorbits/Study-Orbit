const Brevo = require('@getbrevo/brevo');
const client = new Brevo.TransactionalEmailsApi();

// configure API key
client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

const sendEmail = async (to, otp) => {
  try {
    const email = {
      sender: { email: process.env.BREVO_USER }, // must be a verified sender in Brevo
      to: [{ email: to }],
      subject: "Your OTP Code",
      textContent: `Your OTP is ${otp}`,
      htmlContent: `<p>Your OTP is <b>${otp}</b></p>`,
    };

    const response = await client.sendTransacEmail(email);
    console.log("OTP email sent successfully:", response);
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

module.exports = sendEmail;