// const Contact = require("../models/contactModel");
// const sendEmail = require("../utils/sendEmail");

// exports.sendMessage = async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   try {
//     const newContact = new Contact({ name, email, message });
//     await newContact.save();

//     await sendEmail({ name, email, message });

//     res.status(201).json({
//       message: "Message sent & email delivered",
//     });
//   } catch (error) {
//     console.error("CONTACT ERROR:", error);
//     res.status(500).json({ message: "Email failed" });
//   }
// };

// const Contact = require("../models/contactModel");

// exports.sendMessage = async (req, res) => {
//   console.log("Contact route hit");

//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   try {
//     const newContact = new Contact({ name, email, message });
//     await newContact.save();

//     console.log("Saved successfully");

//     return res.status(201).json({
//       message: "Message saved successfully",
//     });

//   } catch (error) {
//     console.error("CONTACT ERROR:", error);
//     return res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer");

exports.sendMessage = async (req, res) => {
  console.log("Contact route hit");

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    // Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("Saved successfully");

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // Send the email
    await transporter.sendMail({
      from: email, // sender is the user
      to: process.env.EMAIL_USER, // receive at your email
      subject: `New Contact Message from ${name}`,
      text: `You received a new message from ${name} (${email}):\n\n${message}`,
    });

    console.log("Email sent successfully");

    return res.status(201).json({
      message: "Message saved and email sent successfully",
    });

  } catch (error) {
    console.error("CONTACT ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
