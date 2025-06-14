import { prisma } from "@/lib/prisma";
import JobsClient from "./jobs-client";

interface JobWithCreator {
  id: string;
  createdAt: Date;
  color: string;
  role: string;
  companyName: string;
  location: string;
  salary: number | null;
  logo: string | null;
  experience: string;
  otherDetails: string[];
  createdBy: {
    email: string;
  };
}

async function getJobs() {
  const jobs = await prisma.job.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      createdBy: {
        select: {
          email: true
        }
      }
    }
  });

  return jobs.map((job: JobWithCreator) => ({
    id: job.id,
    date: new Date(job.createdAt).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    color: job.color,
    role: job.role,
    companyName: job.companyName,
    location: job.location,
    salary: job.salary ?? 0,
   logo: job.logo ?? "/default-logo.png",
    experience: job.experience,
    otherDetails: [
      job.otherDetails.includes("Full Time") ? "Full Time" : "Part Time",
      job.otherDetails.includes("Senior Level") ? "Senior Level" : 
      job.otherDetails.includes("Mid Level") ? "Mid Level" : "Entry Level",
      job.otherDetails.includes("Remote") ? "Remote" : 
      job.otherDetails.includes("Hybrid") ? "Hybrid" : "On-site",
      job.otherDetails.includes("Permanent") ? "Permanent" : 
      job.otherDetails.includes("Contract") ? "Contract" : "Temporary"
    ]
  }));
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return <JobsClient initialJobs={jobs} />;
}