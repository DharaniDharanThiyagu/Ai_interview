import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = ({ onChange, value, label, placeholder, type = 'text' }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="flex flex-col gap-1 relative">
      {label && <label className="text-sm text-gray-700 font-medium">{label}</label>}
      <input
        type={isPassword && showPassword ? 'text' : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
      />
      {isPassword && (
        <div
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-9 text-gray-500 cursor-pointer"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </div>
      )}
    </div>
  );
};

export default Input;
