import React from "react";
import Image from "next/image";
import { CiBookmark } from "react-icons/ci";

interface jobCardProps {
  date: string;
  color: string;
  role: string;
  companyName: string;
  location: string;
  salary: number;
  logo: string;
  otherDetails: string[];
}

const JobCard: React.FC<jobCardProps> = ({
  date,
  color,
  role,
  companyName,
  location,
  salary,
  otherDetails,
  logo,
}) => {
  return (
    <div className="rounded-3xl border flex flex-col space-y-3 justify-between p-2 max-w-[454px] min-h-[300px]">
      <div
        className={`flex flex-col rounded-3xl p-3 h-full justify-between`}
        style={{ backgroundColor: color }}
      >
        <div className="w-full flex justify-between">
          <div className="rounded-full bg-white px-3 py-2 flex flex-col justify-center">
            {date}
          </div>
          <div className=" flex flex-col justify-center ">
            <button className=" bg-white rounded-full p-2">
              <CiBookmark />
            </button>
          </div>
        </div>
        <div className="flex flex-col space-x-1 mt-5">
          <div className="px-1.5">
            <h1>{companyName}</h1>
          </div>
          <div className="flex justify-between">
            <h1 className="text-2xl max-w-[200px]">{role}</h1>
            <div className="flex flex-col justify-center">
              <Image
                src={logo}
                alt={`${companyName} logo`}
                height={30}
                width={30}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mt-8">
          {otherDetails.map((detail, index) => (
            <h1
              key={index}
              className="rounded-full whitespace-nowrap border border-black px-2 py-1 m-1"
            >
              {detail}
            </h1>
          ))}
        </div>
      </div>
      <div className="flex justify-between p-3">
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">${salary}/hr</h1>
          <h1 className="text-gray-500">{location}</h1>
        </div>
        <div>
          <button className="px-3 py-2 bg-black text-white rounded-full">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
