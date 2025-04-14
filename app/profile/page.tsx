'use client'
import { useState } from "react";
import { ArrowRightLeft, LogOut } from "lucide-react";
import TopNav from "../elements/TopNav";
import BasicInfo from "../elements/BasicInfo";
import EducationTab from "../elements/EducationTab";
import WorkExperienceTab from "../elements/WorkExperienceTab";

const Page = () => {
  const [activeTab, setActiveTab] = useState("Basic Info");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Basic Info":
        return <BasicInfo />;
      case "Education":
        return <EducationTab />;
      case "Experience":
        return <WorkExperienceTab/>;
      case "Metrics":
        return <div className="text-white px-4 md:px-6 py-4">Performance metrics go here...</div>;
      case "Payments":
        return <div className="text-white px-4 md:px-6 py-4">Payment info goes here...</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <TopNav />
      <div className="max-w-7xl mx-auto bg-black text-white rounded-2xl overflow-hidden shadow-lg">
        {/* Banner */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
            className="w-full h-32 md:h-56 object-cover"
            alt="Banner"
          />
          <div className="absolute -bottom-8 md:-bottom-12 left-4 md:left-6">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 md:border-4 border-black"
              alt="Profile"
            />
          </div>
        </div>

        {/* Top Section */}
        <div className="pt-12 md:pt-16 px-4 md:px-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">Saimon Hewitt</h2>
            <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
              <span>@saimon25</span>
              <span className="hidden md:flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Active
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 hidden flex-col md:flex-row gap-2 md:gap-3">
            <button className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-1 text-sm md:text-base">
              <ArrowRightLeft className="w-4 h-4" />
              <span className="hidden md:inline">Manage account</span>
            </button>
            <button className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-1 text-sm md:text-base">
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Sign out</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 md:mt-8 mx-4 md:mx-6 overflow-x-auto">
          <div className="flex gap-2 md:gap-4 min-w-max">
            {["Basic Info", "Education", "Experience", "Metrics", "Payments"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-xl text-sm whitespace-nowrap ${
                  activeTab === tab 
                    ? "bg-gray-700 text-white" 
                    : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 md:px-6 py-4">{renderTabContent()}</div>

        {/* Footer Buttons */}
        <div className="px-4 md:px-6 py-4 flex flex-col-reverse md:flex-row gap-3 md:justify-end border-t border-gray-800">
          <button className="w-full md:w-auto px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm md:text-base">
            Cancel
          </button>
          <button className="w-full md:w-auto px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm md:text-base">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;