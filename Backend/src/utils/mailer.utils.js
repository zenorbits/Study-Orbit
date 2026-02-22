const Brevo = require('@getbrevo/brevo');
const client = new Brevo.TransactionalEmailsApi();

// configure API key
client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

/**
 * Send email for OTP or Password Reset
 * @param {string} to - recipient email
 * @param {string} type - "otp" or "reset"
 * @param {string} data - OTP code or reset link
 */
const sendEmail = async (to, type, data) => {
  try {
    let subject, textContent, htmlContent;

    if (type === "otp") {
      subject = "Your OTP Code";
      textContent = `Your OTP is ${data}`;
      htmlContent = `<p>Your OTP is <b>${data}</b></p>`;
    } else if (type === "reset") {
      subject = "Password Reset Request";
      textContent = `Click the link to reset your password: ${data}`;
      htmlContent = `<p>Click <a href="${data}">here</a> to reset your password. This link expires in 15 minutes.</p>`;
    } else {
      throw new Error("Invalid email type");
    }

    const email = {
      sender: { email: process.env.BREVO_USER }, // must be verified in Brevo
      to: [{ email: to }],
      subject,
      textContent,
      htmlContent,
    };

    const response = await client.sendTransacEmail(email);
    console.log(`${type} email sent successfully:`, response);
  } catch (error) {
    console.error(`Error sending ${type} email:`, error);
  }
};

module.exports = sendEmail;