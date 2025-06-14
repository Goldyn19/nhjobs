import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await request.json();

    const job = await prisma.job.create({
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
        createdById: data.createdById,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 