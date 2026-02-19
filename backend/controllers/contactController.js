// // const Contact = require("../models/contactModel");
// // const sendEmail = require("../utils/sendEmail");

// // exports.sendMessage = async (req, res) => {
// //   const { name, email, message } = req.body;

// //   if (!name || !email || !message) {
// //     return res.status(400).json({ message: "All fields required" });
// //   }

// //   try {
// //     const newContact = new Contact({ name, email, message });
// //     await newContact.save();

// //     await sendEmail({ name, email, message });

// //     res.status(201).json({
// //       message: "Message sent & email delivered",
// //     });
// //   } catch (error) {
// //     console.error("CONTACT ERROR:", error);
// //     res.status(500).json({ message: "Email failed" });
// //   }
// // };

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
  const { name, email, message } = req.body;

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "loaded" : "undefined");

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `<p>${message}</p>`,
    });

    console.log("Email sent:", info.response); // 👈 add this

    return res.status(201).json({ message: "Message sent successfully" });

  } catch (error) {
    console.error("CONTACT ERROR:", error.message); // 👈 this will show exact error
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};