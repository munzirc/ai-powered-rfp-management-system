import React, { useState } from "react";
import SendRfpModal from "./SendRfpModal";

const RfpView = ({ rfp, vendors = [] }) => {
  const [sendOpen, setSendOpen] = useState(false);

  if (!rfp) {
    return (
      <div
        className="h-[95%] flex-5 my-auto flex items-center justify-center 
        border border-white/10 rounded-xl text-white/50"
      >
        Select an RFP to view details
      </div>
    );
  }

  return (
    <>
      <div
        className="relative flex-5 h-[95%] my-auto
        border border-white/10 rounded-xl
        bg-[#1a1a1a] p-5 overflow-y-auto"
      >
        <div className="flex w-full justify-between items-start mb-5">
          <div className="max-w-[70%]">
            <h2 className="text-lg font-semibold text-white w-full leading-tight line-clamp-2 break-words">
              {rfp.title || "Untitled RFP"}
            </h2>

            <p className="text-sm text-white/60 mt-1">
              Created on {new Date(rfp.created_at).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => setSendOpen(true)}
            className="text-sm px-4 py-2 rounded-lg
              bg-blue-600 hover:bg-blue-700
              transition text-white font-medium"
          >
            Send Email
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <Info
            label="Budget"
            value={`${rfp.budget.amount} ${rfp.budget.currency}`}
          />
          <Info label="Deadline" value={rfp.deadline} />
          <Info label="Payment Terms" value={rfp.payment_terms} />
          <Info label="Warranty" value={rfp.warranty_requirement} />
        </div>

        <Section title="Product/Service">
          <div className="space-y-3">
            {rfp.items.map((item) => (
              <div
                key={item._id}
                className="border border-white/10 rounded-lg p-3"
              >
                <div className="flex justify-between">
                  <p className="text-white text-sm font-medium">{item.name}</p>
                  <span className="text-white/60 text-sm">
                    Qty: {item.quantity}
                  </span>
                </div>

                {item.specifications && (
                  <p className="text-white/70 text-xs mt-2">
                    {item.specifications}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>

        {rfp.notes?.length > 0 && (
          <Section title="Notes">
            <ul className="list-disc list-outside pl-5 text-white/70 text-sm space-y-1">
              {rfp.notes.map((note, i) => (
                <li key={i} className="leading-relaxed">
                  {note}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>

      {sendOpen && (
        <SendRfpModal
          vendors={vendors}
          rfp={rfp}
          onClose={() => setSendOpen(false)}
        />
      )}
    </>
  );
};


const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
    {children}
  </div>
);

const Info = ({ label, value }) => (
  <div className="bg-[#222] border border-white/10 rounded-lg p-3">
    <p className="text-white/60 text-xs">{label}</p>
    <p className="text-white text-sm font-medium">{value || "-"}</p>
  </div>
);

export default RfpView;
