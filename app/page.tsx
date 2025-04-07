"use client";
import React, { useState } from "react";
import TopNav from "./elements/TopNav";
import TopFilter from "./elements/TopFilter";
import JobSection from "./elements/JobSection";
import { Separator } from "@/components/ui/separator";

import jobData from "@/utils/data";

interface Job {
  id: string;
  date: string;
  color: string;
  role: string;
  companyName: string;
  location: string;
  salary: number;
  logo: string;
  experience: string;
  otherDetails: string[];
}
export default function Home() {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobData);

  const handleFilter = (jobs: Job[]) => {
    setFilteredJobs(jobs);
  };
  const checkExperienceMatch = (
    jobExperience: string,
    filterExperience: string
  ) => {
    const [min, max] = filterExperience.split("-").map(Number); // Split range and convert to numbers
    const jobExp = Number(jobExperience); // Convert job experience to a number
    // console.log(jobExperience)
    return jobExp >= min && (max ? jobExp <= max : true);
  };
  const handleMobileFilter = (filters: {
    category?: string;
    location?: string;
    experience?: string;
    salary?: number;
  }) => {
    const filtered = jobData.filter((job) => {
      const matchCategory = filters.category
        ? job.role.toLowerCase().includes(filters.category.toLowerCase())
        : true;
      const matchLocation = filters.location
        ? job.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchExperience = filters.experience
        ? checkExperienceMatch(job.experience, filters.experience)
        : true;
      const matchSalary = filters.salary ? job.salary >= filters.salary : true;

      

      return matchCategory && matchLocation && matchExperience && matchSalary;
    });

    setFilteredJobs(filtered);
  };
  return (
    <div className="md:h-screen flex flex-col overflow-hidden">
      <TopNav />
      <Separator />
      <TopFilter jobs={jobData} onFilter={handleFilter} />
      <div className="flex-1 overflow-y-auto ">
        <JobSection
          jobData={filteredJobs}
          onMobileFilter={handleMobileFilter}
          source="Recommended Jobs"
        />
      </div>
    </div>
  );
}
