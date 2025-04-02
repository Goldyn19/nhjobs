"use client";
import React, { useState, useEffect } from "react";
import TopNav from "@/app/elements/TopNav";
import { CiBookmark } from "react-icons/ci";
import { CiFlag1 } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { PiShareNetworkFill } from "react-icons/pi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Page = () => {
  interface jobDetails {
    date: string;
    role: string;
    companyName: string;
    location: string;
    salary: number;
    logo: string;
    otherDetails: string[];
  }
  const [job, setJob] = useState<jobDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchjobdetails = async () => {
      try {
        const response = await fetch(`${process.env.BACK_END_URL}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data: jobDetails = await response.json();
        setJob(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchjobdetails();
  });
  console.log(error);
  console.log(job);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <TopNav />
      <div className="flex mx-auto border-2 p-8 max-w-screen-lg md:mt-6 mb-4 bg-white">
        <div className="w-full">
          <div className="flex justify-between w-full container md:mb-10 mb-4">
        <div>
          <h3 className={`font-normal text-sm text-gray-500 ${poppins.className}`}>
            Neural Strategic Solutions, Inc
          </h3>
          <h1 className={`font-bold text-3xl mt-1 text-gray-800 ${poppins.className}`}>
            AEM Web Content
          </h1>
          <h4 className={`text-sm text-gray-600 ${poppins.className}`}>Remote</h4>
        </div>
        <div className="flex justify-center items-center space-x-3">
          <Popover>
            <PopoverTrigger>
          <BsThreeDots size={22} className="text-gray-600 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
            <CiFlag1 size={18} />
            <span>Report</span>
          </button>
            </PopoverContent>
          </Popover>
          <button className="hidden md:block bg-gray-100 hover:bg-gray-200 rounded-full p-2">
            <CiBookmark size={22} className="text-gray-600" />
          </button>
          <button className="hidden md:block bg-gray-100 hover:bg-gray-200 rounded-full p-2">
            <PiShareNetworkFill size={22} className="text-gray-600" />
          </button>
          <div className="flex justify-center items-center">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all text-sm md:px-3 md:py-2">
          Apply
            </button>
          </div>
        </div>
          </div>

          <div className="space-y-6">
        <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
          <h2 className={`font-bold text-xl text-gray-800 ${poppins.className}`}>Job Details</h2>
          <div className="flex items-center space-x-2">
            <h1 className="text-sm font-bold text-gray-700">Title:</h1>
            <h4 className="text-sm text-gray-600">AEM Project Coordinator (Web Content)</h4>
          </div>
          <div className="flex items-center space-x-2">
            <h1 className="text-sm font-bold text-gray-700">Location:</h1>
            <h4 className="text-sm text-gray-600">Remote</h4>
          </div>
          <div className="flex items-center space-x-2">
            <h1 className="text-sm font-bold text-gray-700">Duration:</h1>
            <h4 className="text-sm text-gray-600">12 Months Contract likely to extend</h4>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-lg font-bold text-gray-800">Description:</h1>
            <p className="text-sm text-gray-600 leading-relaxed">
          The person hired for the position of project coordinator will partner with different company departments to co-manage the website delivery projects from planning through build to launch, as well as maintenance...
            </p>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Responsibility:</h1>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
          <li>Learn and become an expert in our Web Content Management toolset – AEM Sites</li>
          <li>Adobe Experience Manager</li>
          <li>Execute page builds, and maintenance tasks, and identify defects within AEM Sites</li>
          <li>Communicate the details of the project to the project team leads...</li>
            </ul>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Qualification:</h1>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
          <li>Excellent communication skills, both written and oral</li>
          <li>Ability to effectively communicate amongst multiple workstreams and stakeholders</li>
          <li>Knowledge of web development methodologies and tools...</li>
            </ul>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Preferred Skills:</h1>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
          <li>Experience with web development</li>
          <li>Experience leading projects</li>
          <li>Experience with JIRA a plus</li>
          <li>Experience with web, mobile, or social applications...</li>
            </ul>
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
          <div className="flex space-x-2">
            <h1 className="text-sm font-bold text-gray-700">Job Type:</h1>
            <h4 className="text-sm text-gray-600">Contract</h4>
          </div>
          <div className="flex space-x-2">
            <h1 className="text-sm font-bold text-gray-700">Pay:</h1>
            <h4 className="text-sm text-gray-600">300,000 per month</h4>
          </div>
          <div className="flex space-x-2">
            <h1 className="text-sm font-bold text-gray-700">Experience:</h1>
            <h4 className="text-sm text-gray-600">Not specified</h4>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
