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
    <div>
      {/* Hero Section */}
      <section
        className="bg-gray-900"
        style={{
          backgroundImage: "url('/images/landing-bg.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Top Navigation */}
        <nav className="bg-transparent py-5 md:py-5 px-4 md:px-10 text-white">
          <div className="container mx-auto h-full flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/images/derrida-logo-white.png"
                alt="Derrida logo"
                height={40}
                width={150}
                className="h-auto w-auto"
              />
            </div>
            <div className="hidden lg:flex space-x-8 font-poppins text-sm">
              <Link
                href="/"
                className={`text-green-400 transition-colors duration-200 font-semibold`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`hover:text-green-400 transition-colors duration-200 font-semibold`}
              >
                About
              </Link>
              <Link
                href="/features"
                className={`hover:text-green-400 transition-colors duration-200 font-semibold`}
              >
                Feature
              </Link>
              <Link
                href="/resources"
                className={`hover:text-green-400 transition-colors duration-200 font-semibold`}
              >
                Resource
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <button className="py-2 px-4 hidden md:block text-white ">Sign In</button>
              </Link>
              <Link href="/signup">
                <button className="py-2 px-4 bg-green-500 text-white rounded-md hidden md:block hover:bg-green-600 transition-colors duration-200">
                  Sign Up
                </button>
              </Link>
              {/* Mobile Menu Icon (Hamburger) */}
              <button
                // onClick={toggleSideNav}
                className="lg:hidden text-white hover:text-green-400 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile SideNav Placeholder - will be handled by HomePageClient */}
          {/* {isOpen && (
            <div
              className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <button
                // onClick={toggleSideNav}
                className="absolute top-4 right-4 text-gray-700 hover:text-blue-500 transition-colors duration-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <div className="flex flex-col items-center space-y-4 mt-10">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-3xl font-semibold "
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-3xl font-semibold"
                >
                  About
                </Link>
                <Link
                  href="/features"
                  className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-3xl font-semibold"
                >
                  Features
                </Link>
                <Link
                  href="/resources"
                  className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-3xl font-semibold"
                >
                  Resources
                </Link>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-3xl font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-3xl font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )} */}
        </nav>

        {/* Hero Content */}
        <div className="text-white py-24 px-4 md:px-10">
          <div className="flex justify-center flex-col mx-auto max-w-4xl text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Find Your Next Gig with Our <br /> Freelance Job Platform
            </h1>
            <p className="mt-6 text-lg max-w-2xl mx-auto opacity-80">
              Streamline your freelance business with our job finder platform.
              Find opportunities, manage workloads, and maximize earnings.
            </p>
            <div className="flex justify-center mt-10 space-x-4">
              <Link href="/signup">
                <button className="py-3 px-8 bg-green-500 text-white rounded-md text-lg font-semibold hover:bg-green-600 transition-colors duration-200">
                  Start Free Trial
                </button>
              </Link>
              <Link href="/jobs">
                <button className="py-3 px-8 bg-transparent border-2 border-white text-white rounded-md text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200">
                  Explore Derrida
                </button>
              </Link>
            </div>
          </div>
          {/* Screenshot below hero text */}
          <div className="mt-16 max-w-7xl mx-auto">
            <Image
              src="/images/full-screenshot.png"
              alt="screenshot of job portal"
              className="mx-auto rounded-lg shadow-2xl border border-gray-700"
              height={600}
              width={1000}
            />
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-xl font-semibold text-gray-500 mb-8">Trusted by leading companies</h2>
          <div className="flex justify-center items-center space-x-12 opacity-75">
            <Image src="/images/google-logo.png" alt="Google" width={120} height={40} />
            <Image src="/images/laravel-logo.png" alt="Laravel" width={120} height={40} />
            <Image src="/images/pipedrive-logo.png" alt="Pipedrive" width={120} height={40} />
            <Image src="/images/huawei-logo.png" alt="Huawei" width={120} height={40} />
            <Image src="/images/discord-logo.png" alt="Discord" width={120} height={40} />
          </div>
        </div>
      </section>

      {/* Streamline Your Job Search with Advanced Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-20">
          <div className="md:w-1/2">
            <Image 
              src="/images/advanced-search-illustration.png"
              alt="Advanced Search"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800 leading-tight">Streamline Your Job Search <br /> with Advanced Features</h2>
            <p className="mt-4 text-gray-600 text-lg">
              Our advanced job search feature saves you time and helps you find your dream job more efficiently. You can quickly search to find the most relevant job opportunities.
            </p>
            <ul className="mt-6 space-y-3 text-gray-700 text-lg">
              <li className="flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                Search by our advance search engine
              </li>
              <li className="flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                Filter by your own personalized location
              </li>
              <li className="flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                Refining jobs with popular industry
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Create a Winning Resume With Integrated Builder Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-20">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800 leading-tight">Create a Winning Resume <br /> With Integrated Builder</h2>
            <p className="mt-4 text-gray-600 text-lg">
              By using our tool, you can compare salaries across industries and get accurate information about how your salary stacks up against others in your field.
            </p>
            <div className="mt-8">
              <Link href="/resume-builder">
                <button className="py-3 px-8 bg-green-500 text-white rounded-md text-lg font-semibold hover:bg-green-600 transition-colors duration-200">
                  Create Resume
                </button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/salary-estimate-illustration.png"
              alt="Salary Estimate"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
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
      </div>

      {/* Testimonials Section */}
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

      {/* Call to Action Section */}
      <section className="py-20 bg-green-500 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold">Find your best opportunities today!</h2>
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/jobs">
              <button className="py-3 px-8 bg-white text-green-700 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Explore Derrida
              </button>
            </Link>
            <Link href="/signup">
              <button className="py-3 px-8 bg-transparent border-2 border-white text-white rounded-md text-lg font-semibold hover:bg-white hover:text-green-700 transition-colors duration-200">
                Start My Journey
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <Image
              src="/images/derrida-logo-white.png"
              alt="Derrida logo"
              height={40}
              width={150}
              className="h-auto w-auto mb-4 mx-auto md:mx-0"
            />
            <p className="text-gray-400 text-sm">
              Streamline your freelance business with our job finder platform. Find your best opportunities today!
            </p>
            <div className="flex space-x-4 mt-6 justify-center md:justify-start">
              {/* Social Icons - Placeholder */}
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-youtube"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white">Talent Sourcing</Link></li>
              <li><Link href="#" className="hover:text-white">Alumni Programs</Link></li>
              <li><Link href="#" className="hover:text-white">Employees Referrals</Link></li>
              <li><Link href="#" className="hover:text-white">Internals Mobility</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resource</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white">Blog</Link></li>
              <li><Link href="#" className="hover:text-white">Video Gallery</Link></li>
              <li><Link href="#" className="hover:text-white">Support center</Link></li>
              <li><Link href="#" className="hover:text-white">Integrations</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white">Recruiting Wheel</Link></li>
              <li><Link href="#" className="hover:text-white">About Company</Link></li>
              <li><Link href="#" className="hover:text-white">Careers</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; Copyright 2023 Derrida.io</p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="hover:text-white">Terms and Condition</Link>
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
