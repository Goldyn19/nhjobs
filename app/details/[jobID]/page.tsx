"use client";
import React, { useState, useEffect } from "react";
import TopNav from "@/app/elements/TopNav";
import { CiBookmark } from "react-icons/ci";
// import { CiFlag1 } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { PiShareNetworkFill } from "react-icons/pi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Poppins } from "next/font/google";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

interface JobDetailsPageProps {
  params: {
    jobId: string;
  };
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const job = await prisma.job.findUnique({
    where: {
      id: params.jobId,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{job.role}</h1>
                <p className="mt-2 text-xl text-gray-600">{job.companyName}</p>
              </div>
              {job.logo && (
                <div className="h-16 w-16 relative">
                  <img
                    src={job.logo}
                    alt={`${job.companyName} logo`}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {job.location}
              </span>
              {job.otherDetails.map((detail: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {detail}
                </span>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{job.description}</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Qualifications</h2>
              <ul className="list-disc pl-5 space-y-2">
                {job.qualifications.map((qualification: string, index: number) => (
                  <li key={index} className="text-gray-600">{qualification}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Preferred Skills</h2>
              <ul className="list-disc pl-5 space-y-2">
                {job.preferredSkills.map((skill: string, index: number) => (
                  <li key={index} className="text-gray-600">{skill}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2">
                {job.responsibilities.map((responsibility: string, index: number) => (
                  <li key={index} className="text-gray-600">{responsibility}</li>
                ))}
              </ul>
            </div>

            {/* Additional Details */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Experience</h3>
                <p className="text-gray-600">{job.experience} years</p>
              </div>
              {job.salary && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Salary</h3>
                  <p className="text-gray-600">${job.salary.toLocaleString()}</p>
                </div>
              )}
            </div>

            {/* Apply Button */}
            <div className="mt-8">
              <button
                className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
