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
      <div className="flex mx-auto border-2 shadow-md p-8 max-w-screen-lg md:mt-6">
        <div className="flex justify-between w-full container">
          <div>
            <h3>Neural Strategic Solutions, Inc</h3>
            <h1>AEM Web Content</h1>
            <h4>Remote</h4>
          </div>
          <div className="flex align-top space-x-3">
            <Popover>
              <PopoverTrigger><BsThreeDots size={22}/></PopoverTrigger>
              <PopoverContent>
                <button>
                <CiFlag1 />
                </button>
              </PopoverContent>
            </Popover>
            <button className="bg-white rounded-full p-2">
              <CiBookmark size={22} />
            </button>
            <button></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
