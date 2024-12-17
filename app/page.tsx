'use client'
import React, {useState} from "react";
import TopNav from "./elements/TopNav";
import TopFilter from "./elements/TopFilter";
import JobSection from "./elements/JobSection";
import { Separator } from "@/components/ui/separator"

import jobData from "@/utils/data";

interface Job{
  date: string;
  color: string;
  role: string;
  companyName: string;
  location: string;
  salary: number;
  logo: string;
  otherDetails: string[];
}
export default function Home() {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobData);

  const handleFilter = (jobs: Job[]) => {
    setFilteredJobs(jobs);
  };
  const handleMobileFilter = (filters: {
    category?: string;
    location?: string;
    experience?: string;
    salary?: number;
  }) => {
    const filtered = jobData.filter((job) => {
      const matchCategory = filters.category ? job.role.toLowerCase().includes(filters.category.toLowerCase()) : true;
      const matchLocation = filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase())  : true;
      const matchExperience = filters.experience ? job.otherDetails.includes(filters.experience) : true;
      const matchSalary = filters.salary ? job.salary >= filters.salary : true;

      console.log(matchSalary)

      return matchCategory && matchLocation && matchExperience && matchSalary;
    });

    setFilteredJobs(filtered);
  };
  return (
   <div className="md:h-screen flex flex-col overflow-hidden">
    <TopNav/>
    <Separator  />
    <TopFilter jobs={jobData} onFilter={handleFilter} />
    <div className="flex-1 overflow-y-auto ">
        <JobSection jobData={filteredJobs} onMobileFilter={handleMobileFilter}/>
      </div>
   </div>
  );
}
