'use client'
import React, {useState} from 'react'
import TopNav from '@/app/elements/TopNav'
import { Separator } from "@/components/ui/separator"
import JobSection from '@/app/elements/JobSection'
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
const Page = () => {

    const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobData);


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
    <div className="flex-1 overflow-y-auto ">
        <JobSection jobData={filteredJobs} onMobileFilter={handleMobileFilter} source="New Horizons Jobs"/>
      </div>
   </div>
  )
}

export default Page
