"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface JobData {
  id: string;
  role: string;
  companyName: string;
  location: string;
  description: string;
  salary: number | null;
  experience: string;
  otherDetails: string[];
  logo: string | null;
  color: string;
  qualifications: string[];
  preferredSkills: string[];
  responsibilities: string[];
  createdById: string; // Add createdById to match the prisma job object
}

interface EditJobFormProps {
  job: JobData;
}

interface FormErrors {
  [key: string]: string;
}

export default function EditJobForm({ job }: EditJobFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const [role, setRole] = useState(job.role);
  const [companyName, setCompanyName] = useState(job.companyName);
  const [location, setLocation] = useState(job.location);
  const [description, setDescription] = useState(job.description);
  const [salary, setSalary] = useState<number | string>(job.salary || "");
  const [experience, setExperience] = useState(job.experience);
  const [otherDetails, setOtherDetails] = useState<string[]>(job.otherDetails || []);
  const [logo, setLogo] = useState(job.logo || "");
  const [color, setColor] = useState(job.color || "#FFECB3");
  const [qualifications, setQualifications] = useState<string[]>(job.qualifications || [""]);
  const [preferredSkills, setPreferredSkills] = useState<string[]>(job.preferredSkills || [""]);
  const [responsibilities, setResponsibilities] = useState<string[]>(job.responsibilities || [""]);

  useEffect(() => {
    if (job) {
      setRole(job.role);
      setCompanyName(job.companyName);
      setLocation(job.location);
      setDescription(job.description);
      setSalary(job.salary || "");
      setExperience(job.experience);
      setOtherDetails(job.otherDetails || []);
      setLogo(job.logo || "");
      setColor(job.color || "#FFECB3");
      setQualifications(job.qualifications && job.qualifications.length > 0 ? job.qualifications : [""]);
      setPreferredSkills(job.preferredSkills && job.preferredSkills.length > 0 ? job.preferredSkills : [""]);
      setResponsibilities(job.responsibilities && job.responsibilities.length > 0 ? job.responsibilities : [""]);
    }
  }, [job]);

  const validateForm = (data: JobData): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!data.role?.trim()) {
      newErrors.role = "Job role is required";
    }
    if (!data.companyName?.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!data.location?.trim()) {
      newErrors.location = "Location is required";
    }
    if (!data.description?.trim()) {
      newErrors.description = "Description is required";
    }
    if (!data.experience?.trim()) {
      newErrors.experience = "Experience is required";
    }
    if (data.salary && !/^\d+$/.test(data.salary.toString())) {
      newErrors.salary = "Please enter a valid salary number";
    }
    if (qualifications.some(q => !q.trim())) {
      newErrors.qualifications = "All qualification fields must be filled";
    }
    if (preferredSkills.some(s => !s.trim())) {
      newErrors.preferredSkills = "All preferred skills fields must be filled";
    }
    if (responsibilities.some(r => !r.trim())) {
      newErrors.responsibilities = "All responsibility fields must be filled";
    }

    return newErrors;
  };

  const handleOtherDetailsChange = (detail: string) => {
    setOtherDetails(prev => 
      prev.includes(detail)
        ? prev.filter(d => d !== detail)
        : [...prev, detail]
    );
  };

  const addField = (type: 'qualifications' | 'preferredSkills' | 'responsibilities') => {
    switch (type) {
      case 'qualifications':
        setQualifications(prev => [...prev, ""]);
        break;
      case 'preferredSkills':
        setPreferredSkills(prev => [...prev, ""]);
        break;
      case 'responsibilities':
        setResponsibilities(prev => [...prev, ""]);
        break;
    }
  };

  const removeField = (type: 'qualifications' | 'preferredSkills' | 'responsibilities', index: number) => {
    switch (type) {
      case 'qualifications':
        setQualifications(prev => prev.filter((_, i) => i !== index));
        break;
      case 'preferredSkills':
        setPreferredSkills(prev => prev.filter((_, i) => i !== index));
        break;
      case 'responsibilities':
        setResponsibilities(prev => prev.filter((_, i) => i !== index));
        break;
    }
  };

  const updateField = (type: 'qualifications' | 'preferredSkills' | 'responsibilities', index: number, value: string) => {
    switch (type) {
      case 'qualifications':
        setQualifications(prev => prev.map((item, i) => i === index ? value : item));
        break;
      case 'preferredSkills':
        setPreferredSkills(prev => prev.map((item, i) => i === index ? value : item));
        break;
      case 'responsibilities':
        setResponsibilities(prev => prev.map((item, i) => i === index ? value : item));
        break;
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    const dataToSend = {
      role,
      companyName,
      location,
      description,
      salary: salary ? parseInt(salary as string) : null,
      experience,
      otherDetails,
      logo: logo || null,
      color,
      qualifications: qualifications.filter(q => q.trim()),
      preferredSkills: preferredSkills.filter(s => s.trim()),
      responsibilities: responsibilities.filter(r => r.trim()),
      createdById: job.createdById, // Use existing createdById
    };

    const validationErrors = validateForm(dataToSend as JobData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT", // Change method to PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update job");
      }

      setSuccessMessage("Job updated successfully!");
      setTimeout(() => {
        router.push("/admin/jobs");
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error("Error updating job:", error);
      setErrors({
        submit: error instanceof Error ? error.message : "Failed to update job. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const renderDynamicFields = (
    type: 'qualifications' | 'preferredSkills' | 'responsibilities',
    fields: string[],
    placeholder: string
  ) => (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={field}
            onChange={(e) => updateField(type, index, e.target.value)}
            placeholder={placeholder}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
          />
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => removeField(type, index)}
              className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addField(type)}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add {type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}
      </button>
      {errors[type] && (
        <p className="mt-1 text-sm text-red-600">{errors[type]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {successMessage && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {errors.submit && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{errors.submit}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Job Role
            </label>
            <input
              type="text"
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Developer"
              className={`block w-full rounded-md border ${errors.role ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2`}
            />
            {errors.role && (
              <p className="mt-2 text-sm text-red-600">{errors.role}</p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Google"
              className={`block w-full rounded-md border ${errors.companyName ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2`}
            />
            {errors.companyName && (
              <p className="mt-2 text-sm text-red-600">{errors.companyName}</p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Remote, New York, USA"
              className={`block w-full rounded-md border ${errors.location ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2`}
            />
            {errors.location && (
              <p className="mt-2 text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Salary (USD)
            </label>
            <input
              type="number"
              name="salary"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. 120000"
              className={`block w-full rounded-md border ${errors.salary ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2`}
            />
            {errors.salary && (
              <p className="mt-2 text-sm text-red-600">{errors.salary}</p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Experience (Years)
            </label>
            <input
              type="number"
              name="experience"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. 2"
              className={`block w-full rounded-md border ${errors.experience ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2`}
            />
            {errors.experience && (
              <p className="mt-2 text-sm text-red-600">{errors.experience}</p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Company Logo URL
            </label>
            <input
              type="text"
              name="logo"
              id="logo"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder="e.g. /images/google-logo.png (optional)"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
            />
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the job..."
              className={`block w-full rounded-md border ${errors.description ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2`}
            ></textarea>
            {errors.description && (
              <p className="mt-2 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Other Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
            {[ "Full Time", "Part Time", "Freelance"].map((detail) => (
              <div key={detail} className="flex items-center">
                <input
                  id={detail.replace(/\s/g, '').toLowerCase()}
                  name="otherDetails"
                  type="checkbox"
                  value={detail}
                  checked={otherDetails.includes(detail)}
                  onChange={() => handleOtherDetailsChange(detail)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={detail.replace(/\s/g, '').toLowerCase()} className="ml-3 block text-sm font-medium text-gray-700">
                  {detail}
                </label>
              </div>
            ))}
             {[ "Mid Level", "Senior Level", "Entry Level"].map((detail) => (
              <div key={detail} className="flex items-center">
                <input
                  id={detail.replace(/\s/g, '').toLowerCase()}
                  name="otherDetails"
                  type="checkbox"
                  value={detail}
                  checked={otherDetails.includes(detail)}
                  onChange={() => handleOtherDetailsChange(detail)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={detail.replace(/\s/g, '').toLowerCase()} className="ml-3 block text-sm font-medium text-gray-700">
                  {detail}
                </label>
              </div>
            ))}
             {[ "On-site", "Remote", "Hybrid"].map((detail) => (
              <div key={detail} className="flex items-center">
                <input
                  id={detail.replace(/\s/g, '').toLowerCase()}
                  name="otherDetails"
                  type="checkbox"
                  value={detail}
                  checked={otherDetails.includes(detail)}
                  onChange={() => handleOtherDetailsChange(detail)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={detail.replace(/\s/g, '').toLowerCase()} className="ml-3 block text-sm font-medium text-gray-700">
                  {detail}
                </label>
              </div>
            ))}
             {[ "Permanent", "Contract", "Temporary"].map((detail) => (
              <div key={detail} className="flex items-center">
                <input
                  id={detail.replace(/\s/g, '').toLowerCase()}
                  name="otherDetails"
                  type="checkbox"
                  value={detail}
                  checked={otherDetails.includes(detail)}
                  onChange={() => handleOtherDetailsChange(detail)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={detail.replace(/\s/g, '').toLowerCase()} className="ml-3 block text-sm font-medium text-gray-700">
                  {detail}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Qualifications</h3>
          {renderDynamicFields('qualifications', qualifications, "e.g. Bachelor's degree in Computer Science")}
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Preferred Skills</h3>
          {renderDynamicFields('preferredSkills', preferredSkills, "e.g. React, Node.js, AWS")}
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Responsibilities</h3>
          {renderDynamicFields('responsibilities', responsibilities, "e.g. Develop and maintain web applications")}
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/admin/jobs">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
} 