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
import { Slider } from "@/components/ui/slider";
import debounce from "lodash.debounce";



interface Job {
  id: string,
  date: string;
  color: string;
  role: string;
  companyName: string;
  location: string;
  salary: number;
  experience: string;
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

  const checkExperienceMatch = (
    jobExperience: string,
    filterExperience: string
  ) => {
    const [min, max] = filterExperience.split("-").map(Number); // Split range and convert to numbers
    const jobExp = Number(jobExperience); // Convert job experience to a number
    console.log(jobExperience)
    return jobExp >= min && (max ? jobExp <= max : true);
  };

  // Handle filtering logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const { category, location, experience, salary } = filters;  
      return (
        (!category || job.role.toLowerCase().includes(category.toLowerCase())) &&
        (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
        (!experience || checkExperienceMatch(job.experience, experience)) &&
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

  return (
    <div className="bg-white py-4 hidden xl:block">
      <div className="container mx-auto justify-center flex align-middle space-x-8">
        {/* Category Filter */}
        <div className="flex space-x-3 text-black items-center">
          <div className="rounded-full border flex align-middle justify-center h-auto w-auto p-2 hover:bg-gray-200 transition-colors duration-200">
            <CiSearch className="text-black text-lg" />
          </div>
            <Select onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger className="border-0 w-[180px] bg-white focus:ring-2 focus:ring-blue-500" style={{ borderRadius: '20px' }}>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black" style={{ borderRadius: '20px' }}>
              <SelectItem value="designer">Designer</SelectItem>
              <SelectItem value="frontend">Front End</SelectItem>
              <SelectItem value="backend">Back End</SelectItem>
              <SelectItem value="devops">DevOps</SelectItem>
              <SelectItem value="fullstack">Fullstack</SelectItem>
              <SelectItem value="mobile app developer">Mobile App Developer</SelectItem>
            </SelectContent>
            </Select>
          <Separator orientation="vertical" className="bg-gray-300 h-full" />
        </div>

        {/* Location Filter */}
        <div className="flex space-x-3 text-black items-center">
          <div className="rounded-full border flex align-middle justify-center h-auto w-auto p-2 hover:bg-gray-200 transition-colors duration-200">
            <IoLocationOutline className="text-black text-lg" />
          </div>
          <input
            type="text"
            className="border border-gray-300 md:w-[250px] rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Location"
            onChange={(e) => handleFilterChange("location", e.target.value)}
            style={{ borderRadius: '20px' }}
          />
          <Separator orientation="vertical" className="bg-gray-300 h-full" />
        </div>

        {/* Experience Filter */}
        <div className="flex space-x-3 text-black items-center">
          <div className="rounded-full border flex align-middle justify-center h-auto w-auto p-2 hover:bg-gray-200 transition-colors duration-200">
            <CgBriefcase className="text-black text-lg" />
          </div>
            <Select onValueChange={(value) => handleFilterChange("experience", value)}>
            <SelectTrigger className="border-0 w-[180px] bg-white focus:ring-2 focus:ring-blue-500" style={{ borderRadius: '20px' }}>
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black" style={{ borderRadius: '20px' }}>
              <SelectItem value="0-1">0-1 years</SelectItem>
              <SelectItem value="1-2 ">1-2 years</SelectItem>
              <SelectItem value="2-3">2-3 years</SelectItem>
              <SelectItem value="3-4">3-4 years</SelectItem>
              <SelectItem value="4-5">4-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
            </Select>
          <Separator orientation="vertical" className="bg-gray-300 h-full" />
        </div>
        {/* Salary Filter */}
        <div className="flex space-x-3 items-center text-black">
          <div className="rounded-full border flex items-center justify-center h-auto w-auto p-2 hover:bg-gray-200 transition-colors duration-200">
            <CiMoneyBill className="text-black text-lg" />
          </div>
          <h6 className="text-center">Per Month</h6>
          <Slider
            defaultValue={[50]}
            max={1000}
            step={10}
            onValueChange={(value) => {
              setSliderValue(value[0]);
              handleFilterChange("salary", value[0]);
            }}
            className="w-[200px]"
          />
          <div className="ml-2 text-sm text-gray-500">{sliderValue}</div>
        </div>
      </div>
    </div>
  );
};

export default TopFilter;
