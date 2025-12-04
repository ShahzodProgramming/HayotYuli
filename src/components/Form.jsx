// src/components/FormInput.jsx
import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  success,
  helperText,
  required = false,
  className = "",
}) => {
  const getInputClass = () => {
    const baseClass = "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors";
    
    if (error) {
      return `${baseClass} border-red-500 focus:ring-red-500 bg-red-50 placeholder-red-300`;
    } else if (value && value.trim() && !error) {
      return `${baseClass} border-green-500 focus:ring-green-500 bg-green-50`;
    } else {
      return `${baseClass} border-gray-300 focus:ring-blue-500`;
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-lg font-medium text-gray-700 mb-2">
          {label}{required && " *"}
        </label>
      )}
      
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={getInputClass()}
        value={value}
        onChange={onChange}
      />
      
      {helperText && !error && !success && (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      )}
      
      {error && (
        <p className="text-sm text-red-600 mt-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {success && value && value.trim() && !error && (
        <p className="text-sm text-green-600 mt-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </p>
      )}
    </div>
  );
};

export default FormInput;