"use client";
import React, { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import JobCard from "./JobCard";
import { LuSettings2 } from "react-icons/lu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DropDowns from "./DropDowns";
import MobileFilter from "./MobileFilter";


interface Filters {
  schedule: string[];
  employmentType: string[];
  date: string[];
  searchTerm: string
}

interface JobData {
  id: string
  date: string;
  color: string;
  role: string;
  companyName: string;
  location: string;
  salary: number;
  logo: string | null;
  otherDetails: string[];
}

interface JobSectionProps {
  jobData: JobData[];
  onMobileFilter: (filters: {
    category?: string;
    location?: string;
    experience?: string;
    salary?: number;
  }) => void;
  source: string

}

const JobSection: React.FC<JobSectionProps> = ({ jobData, onMobileFilter, source}) => {
  const workingScheduleOption = [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Internship", label: "Internship" },
    { value: "Contract", label: "Contract" },
  ];
  const employmentTypeOptions = [
    { value: "On-site", label: "On site" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Remote", label: "Remote" },
  ];
  const DdatePostedOptions = [
    { value: "any time", label: "any time" },
    { value: "last day", label: "last day" },
    { value: "last 3 days", label: "last 3 days" },
    { value: "last week", label: "last week" },
    { value: "last 2 weeks", label: "last 2 weeks" },
    { value: "last month", label: "last month" },
  ];

  const [filters, setFilters] = useState<Filters>({
    schedule: [],
    employmentType: [],
    date: [],
    searchTerm: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleFilterChange =
  (filterKey: keyof Filters) =>
  (value: string | string[]) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: Array.isArray(value) ? value : [value], // Always store as an array
    }));
  };

  // Helper function to filter by date
  const isWithinDateRange = (
    jobDate: string,
    selectedRange: string
  ): boolean => {
    const jobDateObj = new Date(jobDate);
    if (isNaN(jobDateObj.getTime())) return false;

    const today = new Date();
    let rangeDate: Date;

    switch (selectedRange) {
      case "last day":
        rangeDate = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);
        break;
      case "last 3 days":
        rangeDate = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000);
        break;
      case "last week":
        rangeDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "last 2 weeks":
        rangeDate = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
        break;
      case "last month":
        rangeDate = new Date(today.setMonth(today.getMonth() - 1));
        break;
      default:
        return true;
    }

    return jobDateObj >= rangeDate;
  };

  const filteredJobs = useMemo(() => {
    return jobData.filter((job) => {
      const matchesSchedule =
        filters.schedule.length === 0 ||
        filters.schedule.some((schedule) =>
          job.otherDetails.includes(schedule)
        );
      const matchesEmploymentType =
        filters.employmentType.length === 0 ||
        filters.employmentType.some((type) => job.otherDetails.includes(type));
      const matchesDate =
        filters.date.length === 0 ||
        filters.date.some((d) => isWithinDateRange(job.date, d));
        const matchesSearchTerm = 
        filters.searchTerm.length === 0 || 
        job.role.toLowerCase().includes(filters.searchTerm) || 
        job.companyName.toLowerCase().includes(filters.searchTerm)
        console.log(filters)
      return matchesSchedule && matchesEmploymentType && matchesDate && matchesSearchTerm;
    });
  }, [filters, jobData]);

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
<div className="mx-0 h-full flex">
  <div className="md:flex min-w-full">
    <div className="md:w-1/6 hidden bg-white md:mx-2 md:flex mx-auto justify-center ">
      <div className={`sm:block mt-10`}>
        <h1 className="hidden md:block text-black font-bold text-xl pb-4">
          Filters
        </h1>
        <hr className="mb-2" />
        <DropDowns
          label="Working Schedule"
          options={workingScheduleOption}
          onChange={handleFilterChange("schedule")}
        />
        <hr className="mb-1 mt-3" />
        <DropDowns
          label="Employment Type"
          options={employmentTypeOptions}
          onChange={handleFilterChange("employmentType")}
        />
        <hr className="mb-1 mt-3" />
        <DropDowns
          label="Date posted"
          options={DdatePostedOptions}
          onChange={handleFilterChange("date")}
        />
      </div>
    </div>
    <div className="md:w-5/6 mt-5 overflow-scroll overflow-x-hidden">
      <div className="container xl:flex xl:justify-between md:px-10 px-3">
        <div className="md:flex md:justify-between space-x-3 ">
          <div>
            <h3 className="xl:text-3xl text-2xl font-[600] text-black">
              {source}
            </h3>
          </div>
            <div className="md:flex hidden items-center space-x-2 bg-blue-100 text-blue-800 rounded-full px-3 py-1">
            <span className="text-sm font-semibold">{filteredJobs.length}</span>
            <span className="text-xs">Jobs Found</span>
            </div>
        </div>
        <div className="relative md:w-[350px] w-full">
            <div className="absolute inset-y-0 left-0 md:flex hidden items-center pl-3">
            <CiSearch className="text-gray-500" />
            </div>
            <input
            type="text"
            className="border border-gray-300 xl:w-[350px]  rounded-full w-full px-6 pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Find your perfect job"
            onChange={(e) => handleFilterChange("searchTerm")(e.target.value)}
            />
          <div className="absolute inset-y-0 right-0  max-h-screen sm:max-h-[100dvh] flex xl:hidden items-center pr-3">
            <Dialog>
              <DialogTrigger>
                <LuSettings2 />
              </DialogTrigger>
              <DialogContent className="bg-nhBlue-200">
                <DialogHeader>
                  <DialogTitle className="text-white">Filters</DialogTitle>
                  <DialogDescription>
                    <hr className="m-4" />
                    <div className={`md:block  `}>
                      <DropDowns
                        label="Working Schedule"
                        options={workingScheduleOption}
                        onChange={handleFilterChange("schedule")}
                      />
                      <DropDowns
                        label="Employment Type"
                        options={employmentTypeOptions}
                        onChange={handleFilterChange("employmentType")}
                      />
                      <DropDowns
                        label="Date posted"
                        options={DdatePostedOptions}
                        onChange={handleFilterChange("date")}
                      />
                      <MobileFilter onFilter={onMobileFilter}/>

                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 xl:grid-cols-4 xl:mx-6 mx-2  md:gap-4 pt-6 ">
        {currentJobs.length > 0 ? (
          currentJobs.map((job, index) => <JobCard key={index} {...job} />)
        ) : (
          <p className="text-center text-gray-500">No jobs found.</p>
        )}
      </div>
      {/* Pagination Controls */}
        <div className="flex justify-between items-center my-6 px-6">
        <button
          onClick={handlePreviousPage}
          className={`px-3 py-2 bg-black text-white rounded-full transition-colors duration-300 ${
          currentPage === 1
          ? "cursor-not-allowed opacity-50"
          : "hover:bg-gray-800"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">{`${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          className={`px-3 py-2 bg-black text-white rounded-full transition-colors duration-300 ${
          currentPage === totalPages
          ? "cursor-not-allowed opacity-50"
          : "hover:bg-gray-800"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        </div>
    </div>
  </div>
</div>
  );
};

export default JobSection;
