export function extractRfpIdFromText(subject = "", body = "") {
  const combinedText = `${subject}\n${body}`;

  const regex = /RFP\s*(?:ID)?[\s:\-_]*([a-fA-F0-9]{24})/i;

  const match = combinedText.match(regex);

  if (!match) return null;

  return match[1];
}
