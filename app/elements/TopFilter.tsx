'use client'
import React, { useMemo, useState, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
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
import debounce from "lodash.debounce";



interface Job {
  date: string;
  color: string;
  role: string;
  companyName: string;
  location: string;
  salary: number;
  logo: string;
  otherDetails: string[];
}

interface TopFilterProps {
  jobs: Job[];
  onFilter: (jobs: Job[]) => void;

}

const TopFilter: React.FC<TopFilterProps> = ({ jobs, onFilter }) => {
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    experience: "",
    salary: 50,
  });

  const handleFilterChange = (key: keyof typeof filters, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Handle filtering logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const { category, location, experience, salary } = filters;  
      return (
        (!category || job.role.toLowerCase().includes(category.toLowerCase())) &&
        (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
        (!experience || job.role.toLowerCase().includes(experience.toLowerCase())) &&
        (!salary || job.salary >= salary)
      );
      
    });
  }, [filters, jobs]);
  

  const debouncedFilter = useCallback(
    debounce((filteredJobs) => onFilter(filteredJobs), 50),
    []
  );

  React.useEffect(() => {
    console.log("Filtered jobs:", filteredJobs);
    debouncedFilter(filteredJobs);
  }, [filteredJobs, debouncedFilter]);

  const [sliderValue, setSliderValue] = useState(50);

  const getIcon = (value: number) => {
    if (value == 0) return <CiMoneyBill className="text-white text-lg" />;
    return <h5 className="text-white text-sm">{value}</h5>
    
  };

  return (
    <div className="bg-nhBlue-200 py-4 hidden md:block">
      <div className="container mx-auto justify-center flex align-middle space-x-8">
        {/* Category Filter */}
        <div className="flex  text-white">
          <div className="rounded-full border flex align-middle justify-center justify-items-center h-auto w-auto p-2">
            <CiSearch className="text-white text-lg" />
          </div>
          <Select onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger className="border-0 w-[180px] bg-nhBlue-200">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-nhBlue-200 text-white">
              <SelectItem value="designer">designer</SelectItem>
              <SelectItem value="frontend">front end</SelectItem>
              <SelectItem value="backend">back end</SelectItem>
              <SelectItem value="devops">devops</SelectItem>
              <SelectItem value="fullstack">fullstack</SelectItem>
              <SelectItem value="mobile app developer">
                mobile app developer
              </SelectItem>
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="bg-white h-full" />
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
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
          <Separator orientation="vertical" className="bg-white h-full" />
        </div>

        {/* Experience Filter */}
        <div className="flex space-x-3 text-white">
          <div className="rounded-full border flex align-middle justify-center justify-items-center h-auto w-auto p-2">
            <CgBriefcase className="text-white text-lg" />
          </div>
          <Select onValueChange={(value) => handleFilterChange("experience", value)}>
            <SelectTrigger className="border-0  w-[180px]">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent className="bg-nhBlue-200 text-white">
              <SelectItem value="designer">0-1 years</SelectItem>
              <SelectItem value="front end">1-2 years</SelectItem>
              <SelectItem value="back end">2-3 years</SelectItem>
              <SelectItem value="devops">3-4 years</SelectItem>
              <SelectItem value="fullstack">4-5 years</SelectItem>
              <SelectItem value="mobile app developer">5+ years</SelectItem>
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="bg-white h-full" />
        </div>
        {/* Salary Filter */}
        <div className="flex space-x-3 align-middle justify-center text-white">
          <div className="rounded-full border flex align-middle justify-center justify-items-center h-auto w-auto p-2">
          {getIcon(sliderValue)}
          </div>
          <h6 className="flex align-middle text-center justify-center pt-1.5">
            Per Month
          </h6>
          <Slider
            defaultValue={[50]}
            max={1000}
            step={10}
            onValueChange={(value) => {
              setSliderValue(value[0]);
              handleFilterChange("salary", value[0]);
            }}
            className={cn("w-[200px]")}
          />
        </div>
      </div>
    </div>
  );
};

export default TopFilter;
