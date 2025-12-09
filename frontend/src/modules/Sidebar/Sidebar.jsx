import React from "react";
import { FiMessageSquare, FiFileText, FiUsers } from "react-icons/fi";
import useStore from "../../store/store";

const Sidebar = () => {
  const tab = useStore((state) => state.tab);
  const setTab = useStore((state) => state.setTab);

  const items = [
    { label: "Chat", icon: <FiMessageSquare size={18} />, key: "chat" },
    { label: "RFPs", icon: <FiFileText size={18} />, key: "rfps" },
    { label: "Vendors", icon: <FiUsers size={18} />, key: "vendors" },
  ];

  return (
    <div
      className="h-full w-full bg-transparent p-4 flex flex-col gap-2 rounded-l-xl"
    >
      <h1 className="text-white text-xl font-semibold mb-6">Dashboard</h1>

      {items.map((item) => {
        const isActive = tab === item.key;

        return (
          <button
            key={item.key}
            onClick={() => setTab(item.key || "chat")}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-xl transition font-medium
              ${
                isActive
                  ? "bg-white/20 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }
            `}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;
