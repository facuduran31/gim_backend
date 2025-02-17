const nodemailer = require("nodemailer");
require("dotenv").config();

const mail = process.env.NODEMAILER_MAIL;
const pass = process.env.NODEMAILER_PASS;

const emailMiddleware = async (to, subject, text) => {
  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mail,
      pass: pass,
    },
  });

  // Set up email options
  let mailOptions = {
    from: mail,
    to: to,
    subject: subject,
    text: text,
  };

  // Send the email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: " + info.response);
    return info;
  } catch (error) {
    console.error("Error enviando correo");
    throw error;
  }
};

module.exports = emailMiddleware;