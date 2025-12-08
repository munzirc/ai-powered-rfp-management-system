import connectDB from "../config/db.js";
import { extractRfpIdFromText } from "../utils/helper.js";
import { pollEmails } from "./imapClient.js";

connectDB();

setInterval(() => {
  try {
    console.log("Polling started");
    pollEmails();
    console.log("Polling ended");
  } catch (err) {
    console.error("Polling failed:", err);
  }
}, 30 * 1000);

