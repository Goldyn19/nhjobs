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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

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
    <div className="relative block bg-nhBlue-200 text-white">
      <div className="text-white">
        <button
          type="button"
          className={`inline-flex mt-2 w-full text-xl focus:outline-none ${
            isOpen ? "text-nhOrange-100" : "text-white"
          }`}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {label}
          <svg
            className="-mr-1 ml-2 h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="py-1" role="menu">
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                className="rounded-full ml-6"
                onCheckedChange={() => handleCheckboxChange(option.value)}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDowns;
