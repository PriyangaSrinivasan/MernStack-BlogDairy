const Contact = require("../models/contactModel");
const sendEmail = require("../utils/sendEmail");

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    await sendEmail({ name, email, message });

    res.status(201).json({
      message: "Message sent & email delivered",
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({ message: "Email failed" });
  }
};
