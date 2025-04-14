import React from 'react'

const EducationTab = () => {
  return (
<div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-400">Degree*</label>
          <select className="w-full bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Select Degree</option>
            <option>Bachelor&apos;s Degree</option>
            <option>Master&apos;s Degree</option>
            <option>PhD</option>
            <option>Associate Degree</option>
            <option>Diploma</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="block text-gray-400">Institution Name*</label>
          <input
            type="text"
            className="w-full bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="University of Example"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-400">Field of Study*</label>
          <input
            type="text"
            className="w-full bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Computer Science"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-gray-400">Grade/GPA (optional)</label>
          <input
            type="text"
            className="w-full bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="3.8/4.0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-400">Start Date*</label>
          <div className="flex gap-2">
            <select className="w-1/2 bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Month</option>
              <option>January</option>
              {/* Add all months */}
            </select>
            <select className="w-1/2 bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Year</option>
              {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-gray-400">End Date (or expected)</label>
          <div className="flex gap-2">
            <select className="w-1/2 bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Month</option>
              <option>January</option>
              {/* Add all months */}
            </select>
            <select className="w-1/2 bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Year</option>
              {Array.from({length: 30}, (_, i) => new Date().getFullYear() + i).map(year => (
                <option key={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button className="mt-4 text-indigo-400 hover:text-indigo-300 transition">
        + Add Another Education
      </button>
    </div>
  )
}

export default EducationTab
