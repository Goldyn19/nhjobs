'use client'
import { useState } from 'react'
import { Globe, Mail, Phone, Linkedin, Upload, Save } from 'lucide-react'

// interface FormData {
//   company_name: string;
//   company_website: string;
//   company_logo: string | null;
//   industry: string;
//   company_size: '' | '1-10' | '11-50' | '51-200' | '201-500' | '500+';
//   location: string;
//   description: string;
//   contact_email: string;
//   contact_phone: string;
//   linkedin_url: string;
// }


const Page = () => {
  const [formData, setFormData] = useState( {
    company_name: '',
    company_website: '',
    company_logo: null,
    industry: '',
    company_size: '',
    location: '',
    description: '',
    contact_email: '',
    contact_phone: '',
    linkedin_url: ''
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submission logic
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file)
    // if (file) {
    //   setFormData(prev => ({
    //     ...prev,
    //     company_logo: URL.createObjectURL(file)
    //   }));
    // }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-xl">
      {/* Banner Section */}
      <div className="relative mb-16">
        <div className="h-40 bg-gray-800 rounded-t-lg"></div>
        <div className="absolute -bottom-12 left-6 flex items-end gap-6">
          <div className="relative group">
            <img
              src={formData.company_logo || "/default-company.png"}
              className="w-24 h-24 rounded-full border-4 border-gray-900 bg-gray-800"
              alt="Company logo"
            />
            <label className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Upload className="w-6 h-6" />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          </div>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={(e) => setFormData({...formData, company_name: e.target.value})}
            placeholder="Company Name"
            className="text-2xl font-bold bg-transparent border-b-2 border-gray-700 focus:border-violet-500 focus:outline-none pb-1 w-64"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-gray-400 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Company Website
              </label>
              <input
                type="url"
                name="company_website"
                value={formData.company_website}
                onChange={(e) => setFormData({...formData, company_website: e.target.value})}
                className="w-full bg-gray-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                placeholder="https://company.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-gray-400">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  className="w-full bg-gray-800 rounded-lg px-4 py-3"
                  placeholder="Information Technology"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-gray-400">Company Size</label>
                <select
                  name="company_size"
                  value={formData.company_size}
                  // onChange={(e) => setFormData({...formData, company_size: e.target.value})}
                  className="w-full bg-gray-800 rounded-lg px-4 py-3"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-gray-400">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full bg-gray-800 rounded-lg px-4 py-3"
                placeholder="New York, USA"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className=" text-gray-400 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                  className="w-full bg-gray-800 rounded-lg px-4 py-3"
                  placeholder="contact@company.com"
                />
              </div>

              <div className="space-y-4">
                <label className=" text-gray-400 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
                  className="w-full bg-gray-800 rounded-lg px-4 py-3"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-gray-400">Company Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-gray-800 rounded-lg px-4 py-3 h-48"
                placeholder="Describe your company culture, mission, and values..."
              />
            </div>

            <div className="space-y-4">
              <label className=" text-gray-400 flex items-center gap-2">
                <Linkedin className="w-5 h-5" />
                LinkedIn Profile
              </label>
              <input
                type="url"
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})}
                className="w-full bg-gray-800 rounded-lg px-4 py-3"
                placeholder="https://linkedin.com/company/..."
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default Page