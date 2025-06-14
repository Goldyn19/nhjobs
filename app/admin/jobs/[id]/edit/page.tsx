import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EditJobForm from "./edit-job-form";

export default async function EditJobPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.user_type !== "admin") {
    redirect("/");
  }

  const job = await prisma.job.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!job) {
    redirect("/admin/jobs"); // Redirect if job not found
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Job</h1>
        <p className="text-gray-600 mb-6">Modify the details of an existing job listing.</p>
        <EditJobForm job={job} />
      </div>
    </div>
  );
} 