"use client";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { CgBriefcase } from "react-icons/cg";
import { CiMoneyBill } from "react-icons/ci";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface MobileFilterProps {
  onFilter: (filters: {
    category?: string;
    location?: string;
    experience?: string;
    salary?: number;
  }) => void;
}
const MobileFilter: React.FC<MobileFilterProps> = ({ onFilter }) => {
  const [category, setCategory] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [experience, setExperience] = useState<string>();
  const [salary, setSalary] = useState<number>(50);

  const [sliderValue, setSliderValue] = useState(50);
  const getIcon = (value: number) => {
    if (value == 0) return <CiMoneyBill className="text-white text-lg" />;
    return <h5 className="text-white text-sm">{value}</h5>;
  };

  const handleApplyFilters = () => {
    onFilter({ category, location, experience, salary });
  };
  return (
    <div className="bg-nhBlue-200 py-4 block sm:h-[100dvh]">
      <div className="container mx-auto justify-center flex flex-col align-middle space-y-4">
        <div className="flex  text-white">
          <div className="rounded-full border flex align-middle justify-center justify-items-center h-auto w-auto p-2">
            <CiSearch className="text-white text-lg" />
          </div>
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="border-0 w-[180px] bg-nhBlue-200">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-nhBlue-200 text-white">
              <SelectItem value="designer">designer</SelectItem>
              <SelectItem value="front end">front end</SelectItem>
              <SelectItem value="back end">back end</SelectItem>
              <SelectItem value="devops">devops</SelectItem>
              <SelectItem value="fullstack">fullstack</SelectItem>
              <SelectItem value="mobile app developer">
                mobile app developer
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div className="flex space-x-3 text-white">
          <div className="rounded-full border flex align-middle justify-center justify-items-center h-auto w-auto p-2">
            <IoLocationOutline className="text-white text-lg" />
          </div>
          <input
            type="text"
            className="bg-nhBlue-200 border border-gray-400 rounded-2xl text-white px-3 "
            placeholder="Enter location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex space-x-3 text-white">
          <div className="rounded-full border flex align-middle justify-center justify-items-center h-auto w-auto p-2">
            <CgBriefcase className="text-white text-lg" />
          </div>
          <Select onValueChange={(value) => setExperience(value)}>
            <SelectTrigger className="border-0  w-[180px]">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent className="bg-nhBlue-200 text-white">
              <SelectItem value="0-1">0-1 years</SelectItem>
              <SelectItem value="1-2 ">1-2 years</SelectItem>
              <SelectItem value="2-3">2-3 years</SelectItem>
              <SelectItem value="3-4">3-4 years</SelectItem>
              <SelectItem value="4-5">4-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-3  text-white">
          <div className="rounded-full border flex align-middle justify-center justify-items-center h-auto w-auto p-2">
            {getIcon(sliderValue)}
          </div>
          <h6 className="flex align-middle text-center justify-center pt-1.5">
            Per Month
          </h6>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className={cn("w-[200px]")}
            onValueChange={(value) => {
              setSliderValue(value[0]); // Update slider value
              setSalary(value[0]); // Update salary
            }}
          />
        </div>
        <button
          className="mt-4 bg-white text-nhBlue-200 py-2 px-4 rounded"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default MobileFilter;
