import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-slate-50 text-slate-800 text-base rounded-xl px-4 py-3.5 border border-slate-200 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute right-4 text-slate-400 hover:text-primary transition-colors"
            onClick={toggleShowPassword}
          >
            {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
