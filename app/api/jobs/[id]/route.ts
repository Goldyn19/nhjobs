import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.user_type !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const jobId = params.id;
    const data = await request.json();

    const updatedJob = await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        role: data.role,
        companyName: data.companyName,
        location: data.location,
        description: data.description,
        experience: data.experience,
        salary: data.salary,
        otherDetails: data.otherDetails,
        logo: data.logo,
        color: data.color,
        qualifications: data.qualifications,
        preferredSkills: data.preferredSkills,
        responsibilities: data.responsibilities,
        // createdById is not updated here as it's the creator's ID
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error(`Error updating job with ID ${params.id}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const jobId = params.id;
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error(`Error fetching job with ID ${params.id}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 