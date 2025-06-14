import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface JobType {
  id: string;
  role: string;
  companyName: string;
  location: string;
  description: string;
  experience: string;
  salary: number | null;
  logo: string | null;
  color: string;
  qualifications: string[];
  preferredSkills: string[];
  responsibilities: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface FormattedJobType {
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

async function getJobs(): Promise<JobType[]> {
  const jobs = await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });
  return jobs;
}

export default async function Home() {
  const jobs = await getJobs();

  const formattedJobs: FormattedJobType[] = jobs.map((job) => ({
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

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Featured Jobs</h2>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {formattedJobs.map((job: FormattedJobType) => (
              <Link
                key={job.id}
                href={`/details/${job.id}`}
                className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600">
                        {job.role}
                      </h3>
                      <p className="text-gray-600">{job.companyName}</p>
                    </div>
                    {job.logo && (
                      <div className="h-12 w-12 relative">
                        <Image
                          src={job.logo}
                          alt={`${job.companyName} logo`}
                          className="h-full w-full object-contain"
                          width={48}
                          height={48}
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {job.experience} years
                    </div>
                    {job.salary && job.salary > 0 && (
                      <div className="flex items-center text-gray-600">
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ${job.salary.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.otherDetails.slice(0, 3).map((detail, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/jobs" className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700">
              View All Jobs
            </Link>
          </div>
        </div>
      </div>
      <section className="relative overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">What Our Users Say</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-6 shadow-xl ring-1 ring-inset ring-white/10">
              <blockquote className="text-lg font-semibold text-white">
                <p>
                  &quot;This platform transformed my job search. I found my dream role in weeks! Highly recommended for anyone serious about their career.&quot;
                </p>
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">JD</div>
                <div className="ml-4">
                  <div className="text-base font-semibold text-white">Jane Doe</div>
                  <div className="text-sm text-gray-400">Senior Developer at TechCo</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white/10 p-6 shadow-xl ring-1 ring-inset ring-white/10">
              <blockquote className="text-lg font-semibold text-white">
                <p>
                  &quot;The admin interface is intuitive and powerful. Managing job postings has never been easier. A fantastic tool for recruiters.&quot;
                </p>
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">AM</div>
                <div className="ml-4">
                  <div className="text-base font-semibold text-white">Alex Marketing</div>
                  <div className="text-sm text-gray-400">HR Manager at Innovate Corp</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white/10 p-6 shadow-xl ring-1 ring-inset ring-white/10">
              <blockquote className="text-lg font-semibold text-white">
                <p>
                  &quot;I love the streamlined application process. It saved me so much time and hassle. A truly user-friendly experience.&quot;
                </p>
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">SM</div>
                <div className="ml-4">
                  <div className="text-base font-semibold text-white">Sarah Miller</div>
                  <div className="text-sm text-gray-400">Product Designer at Creative Labs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
