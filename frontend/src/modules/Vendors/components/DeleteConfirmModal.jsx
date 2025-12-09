import React from "react";

const DeleteConfirmModal = ({ title, message, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop (NOT dark as per your design preference) */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div className="relative bg-[#1f1f1f] border border-white/10 rounded-xl p-6 w-[400px] text-white shadow-xl">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-white/70 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-white/20
                       text-white/80 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600
                       hover:bg-red-700 transition text-white font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
