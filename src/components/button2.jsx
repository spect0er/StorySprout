// File: src/components/ui/button.jsx
import React from "react";

export const Button = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-white font-medium shadow hover:bg-purple-700 transition duration-300 ease-in-out ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
