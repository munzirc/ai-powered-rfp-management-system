import React, { useState, useEffect } from "react";

const VendorModal = ({ isEdit, form, setForm, onClose, onSave }) => {
  const fields = [
    { key: "name", label: "NAME" },
    { key: "email", label: "EMAIL" },
    { key: "company", label: "COMPANY" },
    { key: "phone", label: "PHONE" },
    { key: "contact_name", label: "CONTACT NAME" },
  ];

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!form.name?.trim()) newErrors.name = "Name is required.";

    if (!form.email?.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!form.company?.trim()) newErrors.company = "Company is required.";

    if (!form.phone?.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!form.contact_name?.trim()) {
      newErrors.contact_name = "Contact name is required.";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSave = () => {
    const result = validateForm();
    if (Object.keys(result).length === 0) {
      onSave();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 w-[400px] shadow-xl shadow-black/40">
        <h3 className="text-lg font-semibold mb-4 text-white">
          {isEdit ? "Edit Vendor" : "Add Vendor"}
        </h3>

        <div className="grid gap-4">
          {fields.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-1">
              <input
                type="text"
                placeholder={label}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="bg-[#121212] text-white/90 border border-white/10 px-3 py-2 rounded-lg 
                placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors[key] && (
                <p className="text-red-400 text-xs">{errors[key]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/20 text-white/80 rounded-lg 
                       hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg transition bg-blue-600 text-white hover:bg-blue-700"
          >
            {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorModal;
