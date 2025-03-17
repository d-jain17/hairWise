require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { google } = require("googleapis");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());

let pdfPath = path.join(__dirname, "..", "src", "assets", "dry.pdf");
let pdfFilename = "dry.pdf";

// Check if file exists
const fs = require("fs");
fs.access(pdfPath, fs.constants.F_OK, (err) => {
  if (err) console.error("PDF File Not Found:", err);
  else console.log("PDF File Found:", pdfPath);
});


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(email,answers) {
  try {
    if(answers["hairChemical"]=="yes"){
      pdfPath = path.join(__dirname, "..", "src", "assets", "colored.pdf");
      pdfFilename = "colored.pdf";
      console.log("PDF Path:", pdfPath);
    }
    else if(answers["hairConcern"]=="Hair fall/thinning"){
      pdfPath = path.join(__dirname, "..", "src", "assets", "hairfall.pdf");
      pdfFilename = "hairfall.pdf";
      console.log("PDF Path:", pdfPath);
    }
    else if(answers["hairScalp"]=="Oily"){
      pdfPath = path.join(__dirname, "..", "src", "assets", "oily.pdf");
      pdfFilename = "oily.pdf";
      console.log("PDF Path:", pdfPath);
    }
    else if(answers["hairScalp"]=="Dry"){
      pdfPath = path.join(__dirname, "..", "src", "assets", "dry.pdf");
      pdfFilename = "dry.pdf";
      console.log("PDF Path:", pdfPath);
    }
    else if(answers["hairType"]=="Curly"){
      pdfPath = path.join(__dirname, "..", "src", "assets", "curly.pdf");
      pdfFilename = "curly.pdf";
      console.log("PDF Path:", pdfPath);
    }
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `hair-care-test <${process.env.EMAIL}>`,
      to: email,
      subject: "Test Email",
      text: "Hello! This is a test email from your React app.",
      attachments: [
        {
          filename: pdfFilename,
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

app.post("/send-email", async (req, res) => {
  const { email,answers } = req.body;
  try {
    await sendMail(email,answers);
    return res.json({ message: "Email sent successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error sending email" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
