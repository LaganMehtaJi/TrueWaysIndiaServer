import express from "express";
import nodemailer from "nodemailer";
import Email from "../models/email.models.js";

export const SendEmail = async (req, res) => {
  try {
    const { emailContent, recipientEmail, subject } = req.body;

    // ✅ Save email to database
    const result = await new Email({
      sendTo: recipientEmail,
      message: emailContent,
    }).save();

    // ✅ Zoho SMTP setup (SSL)
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",  // or smtp.zoho.com if global
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // ✅ Mail content
    const mailOptions = {
      from: `"TrueWays Team" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: subject,
      text: emailContent,
    };

    // ✅ Send
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");

    res.status(200).json({
      message: "Email sent and saved successfully",
      data: result,
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ error: "Failed to send or save email" });
  }
};
