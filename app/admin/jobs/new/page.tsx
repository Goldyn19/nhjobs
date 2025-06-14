import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NewJobForm from "./new-job-form";
import { authOptions } from "@/lib/auth";

export default async function NewJobPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.user_type !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Job</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill out the form below to create a new job listing.
          </p>
        </div>
        
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <NewJobForm userId={session.user.id} />
          </div>
        </div>
      </div>
    </div>
  );
} 