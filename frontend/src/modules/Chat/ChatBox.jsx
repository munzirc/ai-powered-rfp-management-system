import React, { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { useApi } from "../../hooks/useApi";
import { generateRfp } from "../../services/rfp.service";
import toast from "react-hot-toast";

const ChatBox = () => {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);
  const { loading, error, call } = useApi();

  useEffect(() => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  const handleSubmit = async () => {
    if (value.trim() === "") return;

    try {
      await call(generateRfp, value);
      toast.success("RFP generated successfully!");
      setValue("");
    } catch (error) {
      toast.error("Failed to generate RFP");
    }
  };

  return (
    <div
      className=" absolute w-[70%] bottom-6 left-1/2 -translate-x-1/2
          bg-[#1a1a1a] rounded-2xl shadow-lg shadow-black/50 
          border border-white/10 p-3 flex items-end gap-3
        "
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Start typing your RFP requirements…"
        className="
            w-full bg-transparent resize-none outline-none 
            text-gray-200 placeholder-gray-500 
            max-h-[280px] overflow-y-auto mb-2
          "
        style={{ lineHeight: "1.5" }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`
          p-2 rounded-full 
          transition-all duration-200 
          text-white flex items-center justify-center
          ${
            loading
              ? "bg-white/10 cursor-not-allowed"
              : "bg-white/10 hover:bg-white/20"
          }
        `}
      >
        {loading ? (
          <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <IoSend size={20} />
        )}
      </button>
    </div>
  );
};

export default ChatBox;
