import React from 'react'

const WorkExperienceTab = () => {
  return (
    <div className="space-y-6">
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-400">Job Title*</label>
          <input
            type="text"
            className="w-full bg-gray-800 rounded px-4 py-2"
            placeholder="Senior Software Engineer"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-400">Company Name*</label>
          <input
            type="text"
            className="w-full bg-gray-800 rounded px-4 py-2"
            placeholder="Tech Corp Inc."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-400">Start Date*</label>
          <input
            type="month"
            className="w-full bg-gray-800 rounded px-4 py-2"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-400">End Date</label>
          <input
            type="month"
            className="w-full bg-gray-800 rounded px-4 py-2"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-400">Location</label>
          <input
            type="text"
            className="w-full bg-gray-800 rounded px-4 py-2"
            placeholder="New York, USA"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-400">Responsibilities & Achievements</label>
        <textarea
          className="w-full bg-gray-800 rounded px-4 py-2 h-32"
          placeholder="• Led team of 5 developers..."
        />
      </div>
    </div>
    <button className="text-indigo-400 hover:text-indigo-300">
      + Add Position
    </button>
  </div>
  )
}

export default WorkExperienceTab
