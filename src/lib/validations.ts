import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "academician", "industry"], {
    errorMap: () => ({ message: "Role must be student, academician, or industry" }),
  }),
  stream: z
    .enum(["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy"])
    .optional(),
  mentorType: z.enum(["internal", "external"]).optional(),
  institution: z.string().optional(),
  designation: z.string().optional(),
}).refine(
  (data) => {
    if (data.role === "student" && !data.stream) return false;
    return true;
  },
  { message: "Stream is required for students", path: ["stream"] }
).refine(
  (data) => {
    if ((data.role === "academician" || data.role === "industry") && !data.mentorType) return false;
    return true;
  },
  { message: "Mentor Type (internal/external) is required for academicians and industry partners", path: ["mentorType"] }
);

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const InternshipCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requiredSkills: z.array(z.string()).min(1, "At least one skill is required"),
  stream: z.enum(["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy", "All"]),
  location: z.object({
    state: z.string().min(2, "State is required"),
    district: z.string().min(2, "District is required"),
  }),
  stipend: z.string().default("Competitive / As per Ayush norms"),
  duration: z.string().default("3 Months"),
  type: z.enum(["On-site", "Remote", "Hybrid"]).default("On-site"),
  openings: z.number().min(1).default(2),
});

export const ApplicationStatusSchema = z.object({
  status: z.enum(["Applied", "Shortlisted", "Under Review", "Rejected", "Selected"]),
  feedbackNote: z.string().optional(),
});

export const CandidateEvaluationSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  problemSolving: z.number().min(1).max(5),
  communication: z.number().min(1).max(5),
  curiosity: z.number().min(1).max(5),
  practicalInstincts: z.number().min(1).max(5),
  hiddenGemsNotes: z.string().min(5, "Notes must be at least 5 characters"),
  projectsBuiltReview: z.string().optional(),
  overallVerdict: z.enum(["Strongly Recommended", "Recommended", "Needs Development"]).default("Recommended"),
});

export const FdpCreateSchema = z.object({
  type: z.enum(["FDP", "Research Project", "Consultancy"]),
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  stream: z.enum(["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy", "All"]).default("All"),
  eligibility: z.string().default("Faculty & Industry Researchers"),
  fundingAmount: z.string().optional(),
  duration: z.string().default("6 Months"),
});

export const QuizSubmitSchema = z.object({
  stream: z.enum(["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy"]),
  answers: z.array(
    z.object({
      questionId: z.string(),
      selectedOption: z.number(),
    })
  ),
});
