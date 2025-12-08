export const generateRfpEmail = (rfp, vendor) => {
  const itemsList = rfp.items
    .map(
      (item, i) =>
        `<li>${item.name} - Qty: ${item.quantity}${
          item.specifications ? ` (Specs: ${item.specifications})` : ""
        }</li>`
    )
    .join("");

  const notesList = rfp.notes?.map((note) => `<li>${note}</li>`).join("") || "";

  return `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.5;
        }
        h1 {
          color: #2F4F4F;
        }
        h2 {
          color: #555;
          font-size: 16px;
        }
        p {
          margin: 8px 0;
        }
        ul {
          margin: 8px 0;
          padding-left: 20px;
        }
        .rfp-details {
          border: 1px solid #ccc;
          padding: 12px;
          border-radius: 6px;
          background-color: #f9f9f9;
          margin-bottom: 12px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 12px;
        }
      </style>
    </head>
    <body>
      <h1>Hello ${vendor.contact_name || vendor.name},</h1>
      <p>We are pleased to invite you to submit your proposal for the following Request for Proposal (RFP):</p>

      <div class="rfp-details">
        <p><strong>RFP:</strong> ${rfp._id}</p>
        <p><strong>Title:</strong> ${rfp.title}</p>
        <p><strong>Description:</strong> ${rfp.description || "N/A"}</p>
        <p><strong>Items to be supplied:</strong></p>
        <ul>
          ${itemsList || "<li>No items listed</li>"}
        </ul>
        <p><strong>Budget:</strong> ${rfp.budget?.amount || "N/A"} ${
    rfp.budget?.currency || ""
  }</p>
        <p><strong>Deadline:</strong> ${rfp.deadline || "N/A"}</p>
        <p><strong>Payment Terms:</strong> ${rfp.payment_terms || "N/A"}</p>
        <p><strong>Warranty Requirement:</strong> ${
          rfp.warranty_requirement || "N/A"
        }</p>

        ${
          notesList
            ? `<p><strong>Additional Notes:</strong></p><ul>${notesList}</ul>`
            : ""
        }
      </div>

      <p><strong>IMPORTANT:</strong> When replying, please keep the line:</p>
      <p style="font-family: monospace; background: #eee; padding: 4px 8px;">RFP: ${
        rfp._id
      }</p>

      <p>Please reply to this email with your full quotation and terms.</p>

      <div style="
        width: 100%;
        display: block;
        margin-top: 20px;
        padding-top: 12px;
        border-top: 1px solid #ccc;
        font-family: Arial, sans-serif;
        color: #555;
        line-height: 1.4;
      ">
        <p style="margin: 4px 0;">Regards,</p>
        <p style="margin: 4px 0; font-weight: bold;">Procurement Team</p>
        <p style="margin: 4px 0;">AI-RFP</p>
      </div>
      </div>
    </body>
  </html>
  `;
};
