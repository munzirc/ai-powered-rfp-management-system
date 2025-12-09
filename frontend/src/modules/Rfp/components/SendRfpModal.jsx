import React, { useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { dispatchRfp } from "../../../services/rfp-dispatch.service";

const SendRfpModal = ({ vendors, rfp, onClose }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const { loading, error, call } = useApi();

  const toggleVendor = (vendorId) => {
    setSelectedIds((prev) =>
      prev.includes(vendorId)
        ? prev.filter((id) => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleSend = async () => {
    if (selectedIds.length === 0) return;

    await call(dispatchRfp, rfp._id, selectedIds);

    onClose();
  };

  const isSelected = (id) => selectedIds.includes(id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative bg-[#1f1f1f] border border-white/10
        rounded-xl w-[420px] p-6 text-white"
      >
        <h3 className="text-lg font-semibold mb-4">
          Send RFP to Vendors
        </h3>

        <div className="space-y-2 max-h-[260px] overflow-y-auto mb-5">
          {vendors.map((vendor) => (
            <button
              key={vendor._id}
              onClick={() => toggleVendor(vendor._id)}
              className={`w-full text-left px-3 py-2 rounded-lg
                border transition
                ${
                  isSelected(vendor._id)
                    ? "bg-blue-600 border-blue-500"
                    : "bg-[#222] border-white/10 hover:bg-[#2a2a2a]"
                }`}
            >
              <p className="font-medium text-sm">{vendor.name}</p>
              <p className="text-xs text-white/60">{vendor.email}</p>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs text-white/50">
            {selectedIds.length} selected
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-white/20
                text-white/70 hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              onClick={handleSend}
              disabled={selectedIds.length === 0 || loading}
              className="px-4 py-2 rounded-lg bg-blue-600
                hover:bg-blue-700 disabled:opacity-40"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendRfpModal;
