import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface Option {
  label: string;
  value: string;
}

interface DropDownProps {
  label: string;
  options: Option[];
  onChange: (value: string[]) => void;
}

const DropDowns: React.FC<DropDownProps> = ({ label, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (value: string) => {
    let updatedValues: string[];

    if (selectedValues.includes(value)) {
      updatedValues = selectedValues.filter((v) => v !== value); // Remove if already selected
    } else {
      updatedValues = [...selectedValues, value]; // Add if not selected
    }

    setSelectedValues(updatedValues);
    onChange(updatedValues); // Pass updated values to the parent
  };

  return (
    <div className="relative block bg-white text-black">
      <div className="text-white">
      <button
        type="button"
        className={`inline-flex mt-2 w-full text-l focus:outline-none ${
        isOpen ? "text-gray-500 font-bold" : "text-black"
        } p-2`}
        id="menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}
        style={{ fontSize: "14px", justifyContent: "space-between", alignItems: "center" }}
      >
        {label}
        <span className={`ml-2 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
        </span>
      </button>
      </div>
      {isOpen && (
      <div className="py-1" role="menu" style={{ fontSize: "13px" }}>
        {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2 p-1 rounded-md">
          <Checkbox
          id={option.value}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          checked={selectedValues.includes(option.value)}
          onCheckedChange={() => handleCheckboxChange(option.value)}
          />
          <label htmlFor={option.value} className="font-medium text-gray-700">
          {option.label}
          </label>
        </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default DropDowns;
