const nodemailer = require("nodemailer");

const sendEmail = async ({ name, email, message }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Contact Message",
    text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
            `,
    });
};

module.exports = sendEmail; // 🔥 THIS LINE WAS MISSING
