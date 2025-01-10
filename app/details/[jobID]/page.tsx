'use client'
import React, {useState, useEffect} from "react";
import Image from "next/image";

const Page = () => {
    interface jobDetails {
        date: string;
        role: string;
        companyName: string;
        location: string;
        salary: number;
        logo: string;
        otherDetails: string[]
    }
    const [job, setJob] = useState<jobDetails | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchjobdetails = async () => {
            try{
                const response = await fetch(`${process.env.BACK_END_URL}`);
                if (!response.ok) {
                        throw new Error('Failed to fetch job details')
                    }
                const data: jobDetails = await response.json();
                setJob(data);
            }
            catch(err) {
                if (err instanceof Error) {
                    setError(err.message);
                  } else {
                    setError("An unexpected error occurred");
                  }
            }
            finally{
                setLoading(false)
            }
        }
        fetchjobdetails()
    })
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  return (
    <div className="md:flex justify-center">
      <div>
        <div>
          <div>
          {job && (
            <Image
              src={job.logo}
              alt={`${job.companyName} logo`}
              height={50}
              width={50}
              className="rounded-full"
            />
          )}
          </div>
          <div></div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Page;
