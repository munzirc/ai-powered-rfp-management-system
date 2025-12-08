import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

const textExtensions = [
  ".txt",
  ".csv",
  ".md",
  ".log",
  ".json",
  ".xml",
  ".yaml",
  ".yml",
];

export const extractAttachmentText = async (attachments) => {
  const texts = [];

  for (const att of attachments) {
    try {
      const { filename, contentType, content } = att;

      if (contentType === "application/pdf") {
        const uint8 = new Uint8Array(content);
        const parser = new PDFParse(uint8);
        const result = await parser.getText();
        // console.log("#################### Attachement Text ##############################")
        // console.log(result.text);
        // console.log("##################################################")
        texts.push(result.text);
      } else if (
        contentType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        filename.endsWith(".docx")
      ) {
        const docText = await mammoth.extractRawText({ buffer: content });
        const text = docText.value.replace(/\s+/g, " ").trim();
        texts.push(text);
      } else if (
        contentType.startsWith("text/") ||
        textExtensions.some((ext) => filename.toLowerCase().endsWith(ext)) ||
        contentType === "application/json" ||
        contentType === "application/xml" ||
        contentType === "application/x-yaml" ||
        contentType === "application/octet-stream"
      ) {
        texts.push(content.toString("utf-8"));
      } else {
        console.warn("Unsupported attachment type:", filename, contentType);
      }
    } catch (err) {
      console.error("Error extracting attachment:", att.filename, err);
    }
  }

  return texts.join("\n");
};
