// Atoms/Label.tsx
import React from "react";

export const HeaderLabel: React.FC<{ text: string }> = ({ text }) => (
  <label className="px-4">{text}</label>
);
