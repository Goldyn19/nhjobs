"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface NewJobFormProps {
  userId: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function NewJobForm({ userId }: NewJobFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [otherDetails, setOtherDetails] = useState<string[]>([]);
  const [qualifications, setQualifications] = useState<string[]>([""]);
  const [preferredSkills, setPreferredSkills] = useState<string[]>([""]);
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateForm = (data: any): FormErrors => {
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
    if (data.salary && !/^\d+$/.test(data.salary)) {
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

    const formData = new FormData(event.currentTarget);
    const data = {
      role: formData.get("role"),
      companyName: formData.get("companyName"),
      location: formData.get("location"),
      description: formData.get("description"),
      salary: formData.get("salary") ? parseInt(formData.get("salary") as string) : null,
      experience: formData.get("experience"),
      otherDetails,
      logo: formData.get("logo") || null,
      color: formData.get("color") || "#FFECB3",
      qualifications: qualifications.filter(q => q.trim()),
      preferredSkills: preferredSkills.filter(s => s.trim()),
      responsibilities: responsibilities.filter(r => r.trim()),
      createdById: userId,
    };

    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create job");
      }

      setSuccessMessage("Job created successfully!");
      setTimeout(() => {
        router.push("/admin/jobs");
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error("Error creating job:", error);
      setErrors({
        submit: error instanceof Error ? error.message : "Failed to create job. Please try again.",
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
            <div className="mt-1">
              <input
                type="text"
                name="role"
                id="role"
                required
                className={`block w-full rounded-md shadow-sm sm:text-sm px-4 py-2 ${
                  errors.role
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
                placeholder="e.g., Backend Developer"
              />
              {errors.role && (
                <p className="mt-2 text-sm text-red-600">{errors.role}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Company Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="companyName"
                id="companyName"
                required
                className={`block w-full rounded-md shadow-sm sm:text-sm px-4 py-2 ${
                  errors.companyName
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
                placeholder="e.g., Facebook"
              />
              {errors.companyName && (
                <p className="mt-2 text-sm text-red-600">{errors.companyName}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Location
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="location"
                id="location"
                required
                className={`block w-full rounded-md shadow-sm sm:text-sm px-4 py-2 ${
                  errors.location
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
                placeholder="e.g., Menlo Park, CA"
              />
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">{errors.location}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Experience (Years)
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="experience"
                id="experience"
                required
                className={`block w-full rounded-md shadow-sm sm:text-sm px-4 py-2 ${
                  errors.experience
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
                placeholder="e.g., 3"
              />
              {errors.experience && (
                <p className="mt-2 text-sm text-red-600">{errors.experience}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Salary (K)
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="salary"
                id="salary"
                placeholder="e.g., 170"
                className={`block w-full rounded-md shadow-sm sm:text-sm px-4 py-2 ${
                  errors.salary
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              />
              {errors.salary && (
                <p className="mt-2 text-sm text-red-600">{errors.salary}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Card Color
            </label>
            <div className="mt-1">
              <input
                type="color"
                name="color"
                id="color"
                defaultValue="#FFECB3"
                className="block w-full h-10 rounded-md shadow-sm sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Details
            </label>
            <div className="mt-1 space-y-2">
              {["Full Time", "Part Time", "Mid Level", "Senior Level", "Remote", "On-site", "Hybrid", "Permanent", "Contract"].map((detail) => (
                <label key={detail} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    checked={otherDetails.includes(detail)}
                    onChange={() => handleOtherDetailsChange(detail)}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{detail}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Company Logo URL (Optional)
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="logo"
                id="logo"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
                placeholder="e.g., /images/facebook-logo.png"
              />
              <p className="mt-1 text-sm text-gray-500">
                Leave empty if no logo is available. The default company icon will be used.
              </p>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={6}
                required
                className={`block w-full rounded-md shadow-sm sm:text-sm px-4 py-2 ${
                  errors.description
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
                placeholder="Provide a detailed description of the job..."
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qualifications
            </label>
            {renderDynamicFields('qualifications', qualifications, "Enter a qualification requirement")}
          </div>

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Skills
            </label>
            {renderDynamicFields('preferredSkills', preferredSkills, "Enter a preferred skill")}
          </div>

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Responsibilities
            </label>
            {renderDynamicFields('responsibilities', responsibilities, "Enter a responsibility")}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 border-t border-gray-200 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </>
          ) : (
            "Create Job"
          )}
        </button>
      </div>
    </form>
  );
} 