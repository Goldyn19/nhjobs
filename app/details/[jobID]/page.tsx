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
      <div className="flex mx-auto border-2 shadow-md p-8 max-w-screen-lg md:mt-6 rounded-3xl mb-4">
        <div className="w-full">
          <div className="flex justify-between w-full container md:mb-10 mb-4">
            <div>
              <h3 className={`font-normal text-[14px] ${poppins.className}`}>
                Neural Strategic Solutions, Inc
              </h3>
              <h1 className={` font-bold text-[34px] mt-0" ${poppins.className}`}>AEM Web Content</h1>
              <h4 className={`text-[14px] ${poppins.className}`}>Remote</h4>
            </div>
            <div className="flex justify-center align-middle space-x-3">
              <Popover>
                <PopoverTrigger>
                  <BsThreeDots size={22} />
                </PopoverTrigger>
                <PopoverContent>
                  <button>
                    <CiFlag1 />
                  </button>
                </PopoverContent>
              </Popover>
              <button className="hidden md:block bg-white rounded-full p-2">
                <CiBookmark size={22} />
              </button>

              <button className="hidden md:block bg-white rounded-full p-2">
              <PiShareNetworkFill size={22} />
              </button>

              <div className=" justify-center items-center hidden md:flex">
                <button className="px-3 py-2 bg-nhBlue-200 text-white rounded-full">
                  
                  <span className="text-[14px]">Apply Directly</span>
                </button>
              </div>
            </div>
          </div>
          <div className="md:space-y-2 space-y-1">
            <div className="flex space-x-3">
              <h1 className="text-[16px] font-bold">Title:</h1>
              <h4 className="text-[14px] ">
                AEM Project Coordinator (Web Content)
              </h4>
            </div>
            <div className="flex space-x-1">
              <h1 className="text-[16px] font-bold">Location:</h1>
              <h4 className="text-[14px] ">Remote</h4>
            </div>
            <div className="flex space-x-1">
              <h1 className="text-[16px] font-bold">Duration:</h1>
              <h4 className="text-[14px] ">
                12 Months Contract likely to extend
              </h4>
            </div>
            <div className="md:flex space-x-6 mt-4">
              <h1 className="text-[16px] font-bold">Description:</h1>
              <h4 className="text-[14px] ">
                The person hired for the position of project coordinator will
                partner with different company departments to co-manage the
                website delivery projects from planning through build to launch,
                as well as maintenance. They will interact with multiple team
                members to drive the projects to successful delivery. To be
                successful in this role, you will need to be able to effectively
                communicate through email, chat, phone and Teams with business
                leads, and developers as well as other stakeholders. Project
                coordination skills used will include management of scope and
                schedule as well as business analysis to determine requirements
                and communicate clearly and objectively with the project team
                members. The project coordinator works across organizations to
                resolve issues and drive projects to successful completion by
                championing proactive use of the website development process and
                tools that ensure work performed by all project roles can be
                completed with a high degree of quality. The project coordinator
                role is part of the US Digital Customer Solutions team. We
                deliver effective, timely and cost-effective website services
                and solutions.
              </h4>
            </div>
            <div className="md:flex space-x-6">
              <h1 className="text-[16px] font-bold">Responsibility:</h1>
              <h4 className="text-[14px] ">
                <ul className="list-disc pl-5">
                  <li>
                    Learn and become an expert in our Web Content Management
                    toolset – AEM Sites
                  </li>
                  <li>Adobe Experience Manager</li>
                  <li>
                    Execute page builds, and maintenance tasks, and identify
                    defects within AEM Sites
                  </li>
                  <li>
                    Communicate the details of the project to the project team
                    leads to recognize progress, identify gaps, and resolve or
                    escalate issues to the appropriate team.
                  </li>
                  <li>
                    Understand and follow company-specific standards for website
                    development and replication.
                  </li>
                  <li>
                    Collaborate with peers to keep current on project requests
                    both inside and outside assigned areas of responsibility and
                    to resolve any concerns.
                  </li>
                </ul>
              </h4>
            </div>
            <div className="md:flex space-x-6">
              <h1 className="text-[16px] font-bold">Qualification:</h1>
              <h4 className="text-[14px]">
                <ul className="list-disc pl-5">
                  <li>Excellent communication skills, both written and oral</li>
                  <li>Ability to effectively communicate amongst multiple workstreams and stakeholders</li>
                  <li>Knowledge of web development methodologies and tools (ex: HTML, CSS, JavaScript, etc)</li>
                  <li>Minimum 1 year experience with project coordination, time management, planning, or operations</li>
                  <li>Understanding of wireframes and website prototypes</li>
                  <li>Highly organized with attention to detail</li>
                </ul>
              </h4>
            </div>
            <div className="md:flex space-x-6">
              <h1 className="text-[14px] font-bold">Preferred Skills:</h1>
              <h4 className="text-[14px]">
                <ul className="list-disc pl-5">
                  <li>Experience with web development</li>
                  <li>Experience leading projects</li>
                  <li>Experience with JIRA a plus</li>
                  <li>Experience with web, mobile, or social applications</li>
                  <li>Excellent written communication and verbal communication skills</li>
                  <li>Time Management, planning, and organizational</li>
                  <li>Attention to detail, analyzing information</li>
                  <li>Problem-solving</li>
                  <li>Follow-through, Self-starter</li>
                  <li>Familiarity with HTML, JavaScript, CSS</li>
                  <li>Knowledge of DNS and SSL certificates.</li>
                </ul>
              </h4>
            </div>
            <div className="flex space-x-1">
              <h1 className="text-[14px] font-bold">Job Type:</h1>
              <h4 className="text-[14px] ">Contract</h4>
            </div>
            <div className="flex space-x-1">
              <h1 className="text-[14px] font-bold">Pay:</h1>
              <h4 className="text-[14px]">300,000 per month</h4>
            </div>
            <div className="flex space-x-3">
              <h1 className="text-[14px] font-bold">Experience:</h1>
              <h4 className="text-[14px] font-bold"></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
