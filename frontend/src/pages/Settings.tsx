import React from "react";
import { Sidebar } from "../components/Sidebar";
import { SettingsContent } from "../components/Settings-Content";
export const Settings = () => {
  return (
    <div className="w-full flex  h-screen bg-[#f5f5f5]">
      <Sidebar />
      <SettingsContent />
    </div>
  );
};
