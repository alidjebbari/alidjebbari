import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["POST", "GET"],
  credentials: true,
}));
app.use(express.json());

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Google Sheets setup
const initGoogleSheet = async () => {
  try {
    const serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}");
    
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, {
      auth: new JWT({
        email: serviceAccountKey.client_email,
        key: serviceAccountKey.private_key,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      }),
    });

    await doc.loadInfo();
    return doc.sheetsByIndex[0]; // Get first sheet
  } catch (error) {
    console.error("Google Sheets initialization error:", error);
    return null;
  }
};

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

// Contact form submission endpoint
app.post(
  "/api/contact",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;
    const timestamp = new Date().toISOString();

    try {
      // Send email to your inbox
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
        subject: `New message from ${name} - AliDjebbari.com`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <p><small>Received at: ${new Date(timestamp).toLocaleString()}</small></p>
        `,
        replyTo: email,
      });

      // Add to Google Sheets
      const sheet = await initGoogleSheet();
      if (sheet) {
        await sheet.addRow({
          Name: name,
          Email: email,
          Message: message,
          Timestamp: new Date(timestamp).toLocaleString(),
        });
      }

      res.json({
        success: true,
        message: "Your message has been sent successfully!",
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process your message. Please try again.",
      });
    }
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
  console.log(`📧 Email notifications: ${process.env.EMAIL_USER}`);
  console.log(`📊 Google Sheets ID: ${process.env.GOOGLE_SHEET_ID || "Not configured"}`);
});
