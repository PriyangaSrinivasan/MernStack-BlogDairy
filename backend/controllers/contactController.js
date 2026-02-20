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
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    // Save to DB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "priyalaksha17@gmail.com",
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("Email sent successfully");

    return res.status(201).json({ message: "Message sent successfully" });

  } catch (error) {
    console.error("CONTACT ERROR:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};