import Imap from "node-imap";
import { simpleParser } from "mailparser";
import dotenv from "dotenv";
import { saveProposalFromEmail } from "./saveProposal.js";

dotenv.config();

const imapConfig = {
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
  host: "imap.gmail.com",
  port: 993,
  tls: true,
};

export const pollEmails = () => {
  const imap = new Imap(imapConfig);

  const openInbox = (cb) => {
    imap.openBox("INBOX", false, cb);
  };

  imap.once("ready", () => {
    openInbox((err, box) => {
      if (err) throw err;

      imap.search(["UNSEEN"], (err, results) => {
        if (err) throw err;
        if (!results || !results.length) {
          console.log("No new emails");
          imap.end();
          return;
        }

        const f = imap.fetch(results, { bodies: "", struct: true, markSeen: true });

        f.on("message", (msg, seqno) => {
          let rawEmail = "";

          msg.on("body", (stream, info) => {
            stream.on("data", (chunk) => {
              rawEmail += chunk.toString("utf8");
            });
          });

          msg.once("end", async () => {
            try {
              const parsedEmail = await simpleParser(rawEmail);

              const emailContent = parsedEmail.text || "";
              const attachments = parsedEmail.attachments || [];

              await saveProposalFromEmail(parsedEmail, emailContent, attachments);

              imap.addFlags(seqno, "\\Seen", () => {});
            } catch (err) {
              console.error("Error processing email:", err);
            }
          });
        });

        f.once("error", (err) => {
          console.error("Fetch error:", err);
        });

        f.once("end", () => {
          console.log("Done fetching all unseen emails");
          imap.end();
        });
      });
    });
  });

  imap.once("error", (err) => {
    console.error("IMAP error:", err);
  });

  imap.once("end", () => {
    console.log("IMAP connection ended");
  });

  imap.connect();
};
