import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import brainImage from "../assets/brain.png";

export const FloatingExcuseButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState(false);

  if (location.pathname === "/excuse") return null;

  return (
    <div
      className="fixed bottom-6 right-4 z-50 flex flex-col items-end"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`mb-2 max-w-[220px] px-3 py-1 rounded-full text-white text-xs font-medium bg-black/80 backdrop-blur-md shadow-lg transition-all duration-300 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
      >
        Oops… caught in a mess? Tap for your perfect excuse
      </div>

      <button
        onClick={() => navigate("/excuse")}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-700 via-black to-purple-900 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        <img src={brainImage} alt="Excuse" className="w-10 h-10" />
      </button>
    </div>
  );
};
