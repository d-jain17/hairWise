require("dotenv").config();
console.log("CLIENT_ID:", process.env.CLIENT_ID);
console.log("CLIENT_SECRET:", process.env.CLIENT_SECRET ? "Loaded" : "Not Loaded");
console.log("REFRESH_TOKEN:", process.env.REFRESH_TOKEN ? "Loaded" : "Not Loaded");
console.log("EMAIL:", process.env.EMAIL);

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
let REFRESH_TOKEN = process.env.REFRESH_TOKEN; // Store refresh token

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

/**
 * ✅ **Function to Automatically Refresh Access Token**
 * - Refreshes the token if expired
 * - Updates `.env` (or a database) with a new refresh token
 */
async function refreshAccessToken() {
  try {
    const { credentials } = await oAuth2Client.refreshAccessToken();
    const newAccessToken = credentials.access_token;
    const newRefreshToken = credentials.refresh_token || REFRESH_TOKEN; // Use old if new not provided

    console.log("✅ Access Token Refreshed:", newAccessToken);
    
    if (credentials.refresh_token) {
      console.log("✅ New Refresh Token:", newRefreshToken);
      REFRESH_TOKEN = newRefreshToken;
      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    }

    return newAccessToken;
  } catch (error) {
    console.error("❌ Error refreshing access token:", error);
    throw new Error("Failed to refresh access token");
  }
}

/**
 * ✅ **Function to Send Email**
 */
async function sendMail(email, answers) {
  try {
    let pdfPath = path.join(__dirname, "..", "src", "assets", "dry.pdf");
    let pdfFilename = "dry.pdf";

    if (answers["hairChemical"] === "yes") {
      pdfPath = path.join(__dirname, "..", "src", "assets", "colored.pdf");
      pdfFilename = "colored.pdf";
    } else if (answers["hairConcern"] === "Hair fall/thinning") {
      pdfPath = path.join(__dirname, "..", "src", "assets", "hairfall.pdf");
      pdfFilename = "hairfall.pdf";
    } else if (answers["hairScalp"] === "Oily") {
      pdfPath = path.join(__dirname, "..", "src", "assets", "oily.pdf");
      pdfFilename = "oily.pdf";
    } else if (answers["hairScalp"] === "Dry") {
      pdfPath = path.join(__dirname, "..", "src", "assets", "dry.pdf");
      pdfFilename = "dry.pdf";
    } else if (answers["hairType"] === "Curly") {
      pdfPath = path.join(__dirname, "..", "src", "assets", "curly.pdf");
      pdfFilename = "curly.pdf";
    }

    // ✅ Get a Fresh Access Token
    const accessToken = await refreshAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `hair-care-test <${process.env.EMAIL}>`,
      to: email,
      subject: "Your Personalized Hair Care Routine",
      text: "Hello! Here is your customized hair care routine based on your responses.",
      attachments: [
        {
          filename: pdfFilename,
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent Successfully:", result.messageId);
    return result;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

/**
 * ✅ **API Endpoint: Send Email**
 */
app.post("/send-email", async (req, res) => {
  const { email, answers } = req.body;

  try {
    await sendMail(email, answers);
    return res.json({ message: "✅ Email sent successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "❌ Error sending email" });
  }
});

// ✅ **Start Express Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
