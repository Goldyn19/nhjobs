import { prisma } from "@/lib/prisma";
import JobsClient from "./jobs-client";

interface JobWithCreator {
  id: string;
  role: string;
  companyName: string;
  location: string;
  description: string;
  experience: string;
  salary: number | null;
  otherDetails: string[];
  logo: string | null;
  color: string;
  qualifications: string[];
  preferredSkills: string[];
  responsibilities: string[];
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  createdBy: {
    email: string;
  };
}

async function getJobs(): Promise<JobWithCreator[]> {
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

  return jobs;
}

export default async function JobsPage() {
  const jobs = await getJobs();

  const formattedJobs = jobs.map((job) => ({
    id: job.id,
    date: job.createdAt.toDateString(),
    color: job.color,
    role: job.role,
    companyName: job.companyName,
    location: job.location,
    salary: job.salary !== null ? job.salary : 0,
    logo: job.logo !== null ? job.logo : "",
    experience: job.experience,
    otherDetails: [
      job.experience,
      job.salary !== null ? `$${job.salary.toLocaleString()}` : "",
      ...job.qualifications,
      ...job.preferredSkills,
      ...job.responsibilities,
    ].filter(Boolean) as string[],
  }));

  return <JobsClient jobs={formattedJobs} />;
}
