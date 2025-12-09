import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";
import { pollEmails } from "./email/imapClient.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  setInterval(() => {
    try {
      pollEmails();
    } catch (err) {
      console.error("Polling failed:", err);
    }
  }, 30 * 1000);

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
};

startServer();
