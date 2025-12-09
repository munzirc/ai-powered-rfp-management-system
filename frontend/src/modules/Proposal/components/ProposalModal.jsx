const ProposalModal = ({ proposal, onClose }) => {
  const { vendor, extracted_data, ai_summary, ai_verdict } = proposal;

  const InfoColor = 
    {
      Best_Choice: "#22c55e",
      Acceptable: "#facc15",
      Risky: "#f25c5c",
      Reject: "#ff0000",
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-neutral-900 text-white w-full max-w-3xl rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start px-6 py-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-semibold">
              {vendor?.name}
            </h3>
            <p className="text-xs text-white/50">
              {vendor?.email}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-xl leading-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* AI Verdict */}
          {ai_verdict && (
            <div>
              <p className="text-sm font-semibold" style={{ color: InfoColor[ai_verdict.replace(" ", "_")] }}>
                {ai_verdict}
              </p>
              {ai_summary && (
                <p className="text-sm text-white/70 mt-1">
                  {ai_summary}
                </p>
              )}
            </div>
          )}

          {/* Pricing */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Pricing</h4>
            <div className="space-y-1 text-sm text-white/70">
              <p>
                Total: {extracted_data?.total_price}{" "}
                {extracted_data?.currency}
              </p>
              <p>
                Payment Terms: {extracted_data?.payment_terms}
              </p>
              <p>
                Warranty: {extracted_data?.warranty}
              </p>
              <p>
                Delivery: {extracted_data?.delivery_time_days}
              </p>
            </div>
          </div>

          {/* Items */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Items</h4>
            <div className="space-y-2">
              {extracted_data?.items?.map((item) => (
                <div
                  key={item._id}
                  className="bg-white/5 rounded-lg px-3 py-2"
                >
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">
                      {item.name}
                    </p>
                    <p className="text-sm text-white/70">
                      {item.quantity} × ${item.unit_price}
                    </p>
                  </div>
                  {item.specifications && (
                    <p className="text-xs text-white/50 mt-1">
                      {item.specifications}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {extracted_data?.notes?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Notes</h4>
              <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
                {extracted_data.notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalModal;
