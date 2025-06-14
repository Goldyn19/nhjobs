import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      user_type: 'admin',
    },
  })

  // Job data with additional fields
  const jobs = [
    {
      role: "Frontend Developer",
      companyName: "Google",
      location: "Mountain View, CA",
      salary: 150,
      experience: "2",
      color: "#E0F7FA",
      logo: "/images/google-logo.png",
      description: "Join Google's frontend team to build the next generation of web applications. We're looking for a passionate Frontend Developer who loves creating beautiful, responsive, and performant user interfaces.",
      qualifications: [
        "Bachelor's degree in Computer Science or related field",
        "2+ years of experience in frontend development",
        "Strong proficiency in JavaScript, HTML, and CSS",
        "Experience with modern frontend frameworks (React, Angular, or Vue.js)"
      ],
      preferredSkills: [
        "Experience with TypeScript",
        "Knowledge of state management libraries (Redux, MobX)",
        "Understanding of responsive design principles",
        "Familiarity with testing frameworks (Jest, React Testing Library)"
      ],
      responsibilities: [
        "Develop and maintain user-facing features",
        "Build reusable components and libraries",
        "Optimize applications for maximum speed and scalability",
        "Collaborate with backend developers and designers"
      ]
    },
    {
      role: "Backend Developer",
      companyName: "Facebook",
      location: "Menlo Park, CA",
      salary: 170,
      experience: "3",
      color: "#FFECB3",
      logo: "/images/facebook-logo.png",
      description: "Join Facebook's backend team to build scalable and reliable services that power our social platform. We're looking for a Backend Developer who can design and implement robust server-side solutions.",
      qualifications: [
        "Bachelor's degree in Computer Science or related field",
        "3+ years of backend development experience",
        "Strong knowledge of server-side languages (Node.js, Python, Java)",
        "Experience with database design and optimization"
      ],
      preferredSkills: [
        "Experience with microservices architecture",
        "Knowledge of cloud platforms (AWS, GCP)",
        "Understanding of RESTful APIs and GraphQL",
        "Familiarity with containerization (Docker, Kubernetes)"
      ],
      responsibilities: [
        "Design and implement scalable backend services",
        "Develop and maintain APIs",
        "Optimize database performance",
        "Implement security and data protection measures"
      ]
    },
    {
      role: "Product Designer",
      companyName: "Apple",
      location: "Cupertino, CA",
      salary: 200,
      experience: "5",
      color: "#C8E6C9",
      logo: "/images/apple-logo.png",
      description: "Join Apple's design team to create beautiful and intuitive user experiences. We're looking for a Product Designer who can translate complex problems into elegant solutions.",
      qualifications: [
        "Bachelor's degree in Design or related field",
        "5+ years of product design experience",
        "Strong portfolio demonstrating user-centered design",
        "Proficiency in design tools (Figma, Sketch, Adobe XD)"
      ],
      preferredSkills: [
        "Experience with design systems",
        "Knowledge of user research methodologies",
        "Understanding of accessibility standards",
        "Familiarity with prototyping tools"
      ],
      responsibilities: [
        "Create user-centered designs",
        "Develop wireframes and prototypes",
        "Conduct user research and usability testing",
        "Collaborate with cross-functional teams"
      ]
    },
    {
      role: "Data Scientist",
      companyName: "Netflix",
      location: "Los Gatos, CA",
      salary: 220,
      experience: "2",
      color: "#FFCDD2",
      logo: "/images/netflix-logo.png",
      description: "Join Netflix's data science team to help shape the future of entertainment. We're looking for a Data Scientist who can turn complex data into actionable insights.",
      qualifications: [
        "Master's degree in Statistics, Mathematics, or related field",
        "2+ years of experience in data science",
        "Strong programming skills in Python or R",
        "Experience with machine learning algorithms"
      ],
      preferredSkills: [
        "Experience with big data technologies",
        "Knowledge of deep learning frameworks",
        "Understanding of A/B testing",
        "Familiarity with data visualization tools"
      ],
      responsibilities: [
        "Develop and implement machine learning models",
        "Analyze large datasets to extract insights",
        "Create data-driven recommendations",
        "Collaborate with engineering teams"
      ]
    },
    {
      role: "Software Engineer",
      companyName: "Microsoft",
      location: "Redmond, WA",
      salary: 190,
      experience: "4",
      color: "#D1C4E9",
      logo: "/images/microsoft-logo.png",
      description: "Join Microsoft's engineering team to build the next generation of software solutions. We're looking for a Software Engineer who can design and implement scalable applications.",
      qualifications: [
        "Bachelor's degree in Computer Science or related field",
        "4+ years of software development experience",
        "Strong programming skills in multiple languages",
        "Experience with software design patterns"
      ],
      preferredSkills: [
        "Experience with cloud platforms",
        "Knowledge of CI/CD practices",
        "Understanding of system architecture",
        "Familiarity with agile methodologies"
      ],
      responsibilities: [
        "Design and develop software solutions",
        "Write clean, maintainable code",
        "Participate in code reviews",
        "Collaborate with cross-functional teams"
      ]
    }
  ]

  // Create jobs
  for (const job of jobs) {
    await prisma.job.create({
      data: {
        ...job,
        createdById: admin.id,
      },
    })
  }

  console.log('Database has been seeded. 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 