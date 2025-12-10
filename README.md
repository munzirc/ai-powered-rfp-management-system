# AI-Powered RFP Management System

This project is an **AI-powered RFP management system** that automates the handling of procurement requests and vendor proposals. Users can write their requirements in plain language, and the system converts them into a structured RFP that can be sent to vendors via email. Vendor proposals are received through email, including attachments. AI extracts structured information from these responses and compares them with the original RFP, reducing manual review and providing clear recommendations for vendor selection.

---

## 1. Project Setup

### a. Prerequisites

Make sure you have the following installed and configured:

- **Node.js**: v18 or above
- **MongoDB**:

  - Local MongoDB instance or MongoDB Atlas

- **Email Account (Gmail recommended)**:
  * The system requires a Gmail account to send and receive emails:
  - IMAP: For receiving vendor proposal emails
  - Sending Emails: Handled via Nodemailer Gmail service (no manual SMTP setup required)
  * Note:
  - If using Gmail with 2FA, generate an App Password for Nodemailer.

- **Ollama AI**:
  - Local or hosted Ollama instance
  - Model used: `gpt-oss:120b`

---

### b. Installation Steps

### Clone project

```bash
git clone https://github.com/munzirc/ai-powered-rfp-management-system.git
cd ai-powered-rfp-management-system
```

#### Backend Setup

```bash
cd backend
npm install
```

#### Frontend Setup

```bash
cd frontend
npm install
```

---

### c. Environment Variables

- Create a `.env` file inside the **backend** folder and add the following:

  ```env

  PORT=5000
  NODE_ENV="development"

  # Database
  MONGO_URI=mongodb://localhost:27017/ai-rfp

  # Email configuration
  EMAIL_USER=your_email@gmail.com
  EMAIL_PASS=your_app_password

  # AI (Ollama)
  OLLAMA_API_KEY='your_ollama_cloud_api_key'

  ```

> For Gmail, enable IMAP and generate an **App Password**.

- Create a `.env` file inside the **frontend** folder and add the following:

  ```env

  VITE_BASE_URL="http://localhost:5000/api"
  ```

---

### d. Running the Project Locally

Start the backend server:

```bash
cd backend
npm run dev
```

Start the frontend application:

```bash
cd frontend
npm run dev
```

- Frontend runs on: `http://localhost:5173`
- Backend runs on: `http://localhost:5000`

---

## 2. Tech Stack

### Frontend

- Vite
- React
- Javascript
- Tailwind CSS

### Backend

- Node.js
- Express.js
- Javascript

### Database

- MongoDB
- Mongoose

### AI Provider

- Ollama
- Model: `gpt-oss:120b`

### Email Solution

- SMTP for sending emails
- IMAP for receiving emails
- Nodemailer
- Mail parsing library

### Key Libraries

- mongoose
- nodemailer
- mailparser
- pdf-parser
- ollama
- node-imap

---

## 3. API Documentation

### Create RFP from Natural Language

**POST** `/api/rfp`

**Request Body**:

```json
{
  "text": "Our company is planning to upgrade our office IT infrastructure. We need: 20 laptops with at least 16GB RAM, 512GB SSD, i7 processors.15 24-inch monitors.3 network printers with scanning and duplex printing.2 routers and 5 wireless access points.Delivery and installation should be completed within 30 days.Vendors must provide a minimum 1-year warranty for all hardware.Payment terms: Net 30, with 20% advance payment.Please include setup and post-installation support.Estimated budget: $60,000 USD."
}
```

**Success Response**:

```json
{
  "message": "RFP generated successfully",
  "rfp": {
    "title": "Office IT Infrastructure Upgrade",
    "description": "Upgrade of office IT infrastructure including laptops, monitors, printers, routers, and wireless access points.",
    "budget": {
      "amount": 60000,
      "currency": "USD"
    },
    "deadline": "30 days",
    "items": [
      {
        "name": "Laptop",
        "quantity": 20,
        "specifications": "16GB RAM, 512GB SSD, i7 processor",
        "_id": "69391391709aa524df2cc693"
      },
      {
        "name": "24-inch monitor",
        "quantity": 15,
        "specifications": "",
        "_id": "69391391709aa524df2cc694"
      },
      {
        "name": "Network printer",
        "quantity": 3,
        "specifications": "Scanning and duplex printing",
        "_id": "69391391709aa524df2cc695"
      },
      {
        "name": "Router",
        "quantity": 2,
        "specifications": "",
        "_id": "69391391709aa524df2cc696"
      },
      {
        "name": "Wireless access point",
        "quantity": 5,
        "specifications": "",
        "_id": "69391391709aa524df2cc697"
      }
    ],
    "payment_terms": "Net 30, with 20% advance payment",
    "warranty_requirement": "minimum 1-year warranty for all hardware",
    "notes": ["setup and post-installation support required"],
    "created_at": "2025-12-10T06:30:41.696Z",
    "recommended_proposal_id": null,
    "recommended_vendor_id": null,
    "award_reason": "",
    "_id": "69391391709aa524df2cc692"
  }
}
```

**Error Response**:

```json
{
  "error": "Unable to process requirements"
}
```

---

### Send RFP to Vendors

**POST** `/api/rfp-dispatch`

**Request Body**:

```json
{
  "rfpId": "69331f069cf791a4e1f692a5",
  "vendorIds": ["6942a9bd8cd303e91c5192ef", "6032baa5b9a48c3b46f36074"]
}
```

**Success Response**:

```json
{
  "message": "RFP sent successfully"
}
```

---

### Get Proposal Recommendation

**GET** `/api/proposal/compare/:rfpId`

**Success Response**:

```json
{
  {
  "rfp": {
    "budget": {
      "amount": 12000,
      "currency": "USD"
    },
    "_id": "69331f569cf391b4e1f692a5",
    "title": "Conference Room Setup",
    "description": "Procurement of furniture and AV equipment for a new conference room.",
    "deadline": "45 Days",
    "items": [
      {
        "name": "Ergonomic Chair",
        "quantity": 10,
        "specifications": "Ergonomic design, green color",
        "_id": "69331f569cf391b4e1f692a6"
      },
      {
        "name": "Conference Table",
        "quantity": 2,
        "specifications": "8 feet length, cable management trays",
        "_id": "69331f569cf391b4e1f692a7"
      },
      {
        "name": "Projector",
        "quantity": 1,
        "specifications": "HDMI and wireless capabilities, 4K resolution, remote control",
        "_id": "69331f569cf391b4e1f692a8"
      }
    ],
    "payment_terms": "Net 45",
    "warranty_requirement": "At least 2 years",
    "notes": [
      "Installation and training for staff are required"
    ],
    "created_at": "2025-12-05T18:07:18.643Z",
    "recommended_proposal_id": "69367186ca3c9ee3c9d372a6",
    "recommended_vendor_id": "6932aaa5b9b48c3b46f35074",
    "award_reason": "Best overall fit: low price, full item coverage, meets 2‑year warranty, reasonable Net\u202f30 terms, and includes installation/training."
  },
  "proposals": [
    {
      "extracted_data": {
        "total_price": 4860,
        "currency": "USD",
        "delivery_time_days": "25-28 working days",
        "payment_terms": "50% advance, 50% on delivery",
        "warranty": "3 Years on Projector, 1 Year on Furniture",
        "notes": [
          "On-site installation INCLUDED",
          "Product demo & handover training INCLUDED",
          "Packing + logistics INCLUDED",
          "Quotation validity: 45 days only",
          "GST / Tax (8%) included in total"
        ],
        "items": [
          {
            "name": "Ergonomic Office Chair",
            "quantity": 10,
            "unit_price": 165,
            "specifications": "Breathable mesh, adjustable arms, green finish",
            "_id": "69366f4bca3c9ee3c9d3729d"
          },
          {
            "name": "Conference Table",
            "quantity": 2,
            "unit_price": 750,
            "specifications": "8 ft wooden finish, built-in cable slots",
            "_id": "69366f4bca3c9ee3c9d3729e"
          },
          {
            "name": "Multimedia Projector",
            "quantity": 1,
            "unit_price": 1350,
            "specifications": "4K UHD, HDMI + Wireless, 3500 lumens",
            "_id": "69366f4bca3c9ee3c9d3729f"
          }
        ]
      },
      "_id": "69366f4bca3c9ee3c9d3729c",
      "vendor": {
        "_id": "6932a9bd9cd373e91c5192ef",
        "name": "TechNova Supplies",
        "email": "munzirchnr@gmail.com"
      },
      "ai_score": 80,
      "ai_summary": "Low price and complete items, but requires 50% advance payment and only 1‑year furniture warranty.",
      "ai_verdict": "Acceptable",
      "created_at": "2025-12-08T06:25:15.247Z"
    },
    {
      "extracted_data": {
        "total_price": 4730,
        "currency": "USD",
        "delivery_time_days": "30",
        "payment_terms": "Net 30",
        "warranty": "2 years standard warranty on all supplied items",
        "notes": [
          "Quotation validity: 60 days only",
          "On-site installation of all equipment",
          "Basic operational training for staff",
          "Free after-sales support for 6 months"
        ],
        "items": [
          {
            "name": "Ergonomic Chair",
            "quantity": 10,
            "unit_price": 150,
            "specifications": "Ergonomic design, green color",
            "_id": "69367186ca3c9ee3c9d372a7"
          },
          {
            "name": "Conference Table",
            "quantity": 2,
            "unit_price": 800,
            "specifications": "8 feet length with cable management trays",
            "_id": "69367186ca3c9ee3c9d372a8"
          },
          {
            "name": "Projector",
            "quantity": 1,
            "unit_price": 1200,
            "specifications": "HDMI & wireless support, 4K resolution, remote control",
            "_id": "69367186ca3c9ee3c9d372a9"
          }
        ]
      },
      "_id": "69367186ca3c9ee3c9d372a6",
      "vendor": {
        "_id": "6932aaa5b9b48c3b46f35074",
        "name": "OfficePro Solutions",
        "email": "munzircnr710@gmail.com"
      },
      "ai_score": 91,
      "ai_summary": "Best overall fit: low price, full item coverage, meets 2‑year warranty, reasonable Net\u202f30 terms, and includes installation/training.",
      "ai_verdict": "Best Choice",
      "created_at": "2025-12-08T06:34:46.242Z"
    }
  ]
}
}
```

---

## 4. Decisions & Assumptions

### Key Design Decisions

- User requirements are converted into a structured RFP, and only this structured data is used for proposal comparison.
- Proposal emails are stored in raw form for reference, while AI operates on extracted structured fields.
- Proposal evaluation is AI-based rather than rule-based to handle different vendor formats and writing styles.
- Each proposal is evaluated independently and stores its own AI-generated score and summary.
- The final vendor recommendation is generated on the backend to keep the decision logic centralized.
- Email processing, AI extraction, and proposal evaluation are handled as separate steps to keep the system simple and maintainable.

---

### Assumptions

- Vendor replies include the correct **RFP ID**.
- Attachments are in readable formats such as text-based PDF, DOCX, or TXT.
- Image-only PDFs are not supported.
- AI responses follow the expected JSON structure.
- Vendors usually reply from known email addresses.
- Vendors are instructed to include the unique RFP ID when responding.

---

## 5. AI Tools Usage

### Tools Used

- ChatGPT

### How They Were Used

- Writing initial boilerplate code
- Designing data models and APIs
- Debugging email and IMAP issues
- Improving AI prompts for structured output

### Learnings

- AI performs better with clear structure and constraints.
- AI outputs should always be validated.
- Combining AI with backend logic improves reliability and control.

---
