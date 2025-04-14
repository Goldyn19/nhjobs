import React from 'react'
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

const BasicInfo = () => {
  return (
    <div className="px-6 py-6 space-y-6 text-sm">
      {/* Profile Picture */}
      <div className="space-y-2">
        <label className="block text-gray-400">Profile Picture</label>
        <div className="flex items-center gap-4">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            className="w-16 h-16 rounded-full"
            alt="User"
          />
          <div className="flex gap-3">
            <button className="bg-gray-800 px-4 py-2 rounded text-white hover:bg-gray-700 transition">
              Update
            </button>
            <button className="text-red-500 hover:text-red-400 transition">
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Full Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-400">First Name</label>
          <input
            type="text"
            defaultValue="Saimon"
            className="w-full bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-400">Last Name</label>
          <input
            type="text"
            defaultValue="Hewitt"
            className="w-full bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <label className="block text-gray-400">Email Address</label>
        <div className="bg-gray-800 rounded px-4 py-2 flex justify-between items-center">
          <span>saimonhewitt@kahf.dev</span>
          <span className="px-2 py-1 bg-gray-700 text-xs rounded-full">Primary</span>
        </div>
        <button className="text-indigo-400 hover:text-indigo-300 transition">
          + Add email address
        </button>
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label className="block text-gray-400">Phone Number</label>
        <div className="bg-gray-800 rounded px-4 py-2 flex justify-between items-center">
          <span>+1 (545) 124-4547</span>
          <span className="px-2 py-1 bg-gray-700 text-xs rounded-full">Primary</span>
        </div>
        <button className="text-indigo-400 hover:text-indigo-300 transition">
          + Add phone number
        </button>
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-400">City</label>
          <input
            type="text"
            className="w-full bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-400">State</label>
          <input
            type="text"
            className="w-full bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-400">Country</label>
          <select className="w-full bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>United States</option>
            <option>Canada</option>
            <option>UK</option>
          </select>
        </div>
      </div>

      {/* Gender & Date of Birth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-400">Gender (optional)</label>
          <select className="w-full bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-gray-400">Date of Birth (optional)</label>
          <input
            type="date"
            className="w-full bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <label className="block text-gray-400">Professional Links (optional)</label>
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-gray-800 p-3 rounded">
            <FaLinkedin className="text-blue-500" />
            <input
              type="url"
              placeholder="LinkedIn URL"
              className="flex-1 bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3 bg-gray-800 p-3 rounded">
            <FaGithub className="text-white" />
            <input
              type="url"
              placeholder="GitHub URL"
              className="flex-1 bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3 bg-gray-800 p-3 rounded">
            <FaGlobe className="text-green-500" />
            <input
              type="url"
              placeholder="Portfolio URL"
              className="flex-1 bg-transparent focus:outline-none"
            />
          </div>
        </div>
        <button className="text-indigo-400 hover:text-indigo-300 transition">
          + Add another link
        </button>
      </div>
    </div>
  )
}

export default BasicInfo