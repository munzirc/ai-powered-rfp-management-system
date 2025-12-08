export const getRFPCreationPrompt = (text) => {
  const prompt = `You are an AI that converts procurement requests into structured JSON for an RFP system.
    STRICT RULES YOU MUST FOLLOW:
    1. Return ONLY valid JSON. No explanations, no markdown, no text outside JSON.
    2. If the user mentions any important condition, constraint, preference, delivery condition, brand preference, location, compliance, penalty, support, installation, training, or anything that does NOT clearly fit into the fixed fields — you MUST store each of these as a separate string inside the notes array.
       Example: notes: ["installation required", "on-site training required"];
    3. If information is missing, use empty strings, empty arrays, or zero — NEVER invent fake data.
    4. Specify period for deadline, not just a number.
       Example:
       - 15 Days
       - 3 Weeks
       - 2 months 
    5. If an item is mentioned with "a" or "an" (e.g., "a printer", "an office chair"), set its quantity to 1.
    You must return JSON in EXACTLY this format:
    
    {
      "title": "",
      "description": "",
      "items": [
        {
          "name": "",
          "quantity": 0,
          "specifications": ""
        }
      ],
      "budget": {
        "amount": 0,
        "currency": "USD"
      },
      "deadline": 0,
      "payment_terms": "",
      "warranty_requirement": "",
      "notes": []
    }
    
    User Input:
    "${text}"
    `;

  return prompt;
};

export const getProposalCreationPrompt = (text) => {
  const prompt = `You are an AI assistant that extracts structured data from vendor proposals.
      Extract the following details from the given proposal text and return ONLY valid JSON using this exact structure:

      {
        "total_price": 0,
        "currency": "",
        "delivery_time_days": "",
        "payment_terms": "",
        "warranty": "",
        "notes": [],
        "items": [
          {
            "name": "",
            "quantity": 0,
            "unit_price": 0,
            "specifications": ""
          }
        ]
      }

      Guidelines:
      - Fill in all fields with the appropriate values from the proposal.
      - Any important information that doesn't fit into the fields should go into the "notes" array.
      - Ensure numeric values are numbers, strings are strings, arrays are arrays.
      - Return ONLY valid JSON, no extra explanation or text.
      - Do not include RFP ID's in notes array or anywhere

      Proposal Text:
      """${text}"""
      `;

  return prompt;
};

export const getProposalComparsionPrompt = (rfp, proposals) => {
  const payload = {
    rfp: {
      title: rfp.title,
      description: rfp.description,
      budget: rfp.budget,
      deadline: rfp.deadline,
      items: rfp.items,
      payment_terms: rfp.payment_terms,
      warranty_requirement: rfp.warranty_requirement,
      notes: rfp.notes || [],
    },

    proposals: proposals.map((p) => ({
      proposal_id: p._id,
      total_price: p.extracted_data.total_price,
      currency: p.extracted_data.currency,
      delivery_time_days: p.extracted_data.delivery_time_days,
      payment_terms: p.extracted_data.payment_terms,
      warranty: p.extracted_data.warranty,
      items: p.extracted_data.items,
      notes: p.extracted_data.notes || [],
  
    })),
  };

  const prompt = `
    You are an expert procurement analyst.

    Compare the following proposals against the given RFP.

    Return STRICT JSON ARRAY in this exact format:
    [
      {
        "proposal_id": "",
        "ai_score": 0-100,
        "ai_summary": "short reason",
        "ai_verdict": "Best Choice | Acceptable | Risky | Reject"
      }
    ]

    Scoring must be based on:
    - Price vs budget
    - Item completeness
    - Delivery time
    - Payment terms
    - Warranty
    - Notes & special conditions
    - Completeness of Proposal

    DO NOT return markdown.
    DO NOT add extra fields.

    INPUT DATA:
    ${JSON.stringify(payload, null, 2)}
    `;

  return prompt;
}
