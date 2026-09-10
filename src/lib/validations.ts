import { z } from "zod";

/**
 * XSS & NoSQL Injection Sanitizer
 * Strips script tags, HTML tags, javascript: pseudo-protocols, and dangerous characters.
 */
export function sanitizeString(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove <script>...</script>
    .replace(/<[^>]+>/g, "") // Remove any remaining HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: uri
    .replace(/on\w+\s*=/gi, "") // Remove inline event handlers like onclick=, onerror=
    .trim();
}

// Reusable sanitized string schemas
const safeString = (minLen = 1, maxLen = 1000, fieldName = "Field") =>
  z
    .string()
    .transform(sanitizeString)
    .refine((val) => val.length >= minLen, {
      message: `${fieldName} must contain at least ${minLen} valid character(s)`,
    })
    .refine((val) => val.length <= maxLen, {
      message: `${fieldName} cannot exceed ${maxLen} characters`,
    });

export const SignupSchema = z
  .object({
    name: safeString(2, 100, "Name"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email address")
      .max(150, "Email is too long"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(128, "Password cannot exceed 128 characters"),
    role: z.enum(["student", "academician", "industry"], {
      errorMap: () => ({ message: "Role must be student, academician, or industry" }),
    }),
    stream: z
      .enum(["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy"])
      .optional(),
    mentorType: z.enum(["internal", "external"]).optional(),
    institution: z.string().transform(sanitizeString).optional(),
    designation: z.string().transform(sanitizeString).optional(),
  })
  .refine(
    (data) => {
      if (data.role === "student" && !data.stream) return false;
      return true;
    },
    { message: "Stream is required for students", path: ["stream"] }
  )
  .refine(
    (data) => {
      if ((data.role === "academician" || data.role === "industry") && !data.mentorType)
        return false;
      return true;
    },
    {
      message: "Mentor Type (internal/external) is required for academicians and industry partners",
      path: ["mentorType"],
    }
  );

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address")
    .max(150, "Email is too long"),
  password: z.string().min(1, "Password is required").max(128, "Password is too long"),
});

export const InternshipCreateSchema = z.object({
  title: safeString(3, 200, "Title"),
  description: safeString(10, 5000, "Description"),
  requiredSkills: z
    .array(z.string().transform(sanitizeString))
    .min(1, "At least one skill is required")
    .max(20, "Cannot specify more than 20 skills"),
  stream: z.enum(["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy", "All"]),
  location: z.object({
    state: safeString(2, 100, "State"),
    district: safeString(2, 100, "District"),
  }),
  stipend: z.string().transform(sanitizeString).default("Competitive / As per Ayush norms"),
  duration: z.string().transform(sanitizeString).default("3 Months"),
  type: z.enum(["On-site", "Remote", "Hybrid"]).default("On-site"),
  openings: z.coerce.number().int().min(1, "Openings must be at least 1").max(500).default(2),
});

export const ApplicationCreateSchema = z.object({
  coverNote: z
    .string()
    .transform(sanitizeString)
    .refine((val) => val.length <= 2000, "Cover note cannot exceed 2000 characters")
    .default("I am keen to contribute my clinical and academic AYUSH skills to this position."),
});

export const ApplicationStatusSchema = z.object({
  applicationId: z.string().min(1, "Application ID is required"),
  status: z.enum(["Applied", "Shortlisted", "Under Review", "Rejected", "Selected"]),
  feedbackNote: z.string().transform(sanitizeString).optional(),
});

export const CandidateEvaluationSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  problemSolving: z.coerce.number().min(1).max(5),
  communication: z.coerce.number().min(1).max(5),
  curiosity: z.coerce.number().min(1).max(5),
  practicalInstincts: z.coerce.number().min(1).max(5),
  hiddenGemsNotes: safeString(5, 3000, "Notes"),
  projectsBuiltReview: z.string().transform(sanitizeString).optional(),
  overallVerdict: z
    .enum(["Strongly Recommended", "Recommended", "Needs Development"])
    .default("Recommended"),
});

export const FdpCreateSchema = z.object({
  type: z.enum(["FDP", "Research Project", "Consultancy"]),
  title: safeString(3, 250, "Title"),
  description: safeString(10, 5000, "Description"),
  stream: z.enum(["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy", "All"]).default("All"),
  eligibility: z.string().transform(sanitizeString).default("Faculty & Industry Researchers"),
  fundingAmount: z.string().transform(sanitizeString).optional(),
  duration: z.string().transform(sanitizeString).default("6 Months"),
});

export const QuizSubmitSchema = z.object({
  stream: z.enum(["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy"]),
  answers: z
    .array(
      z.object({
        questionId: z.string().min(1),
        selectedOption: z.coerce.number().int().min(0).max(10),
      })
    )
    .min(1, "Answers array cannot be empty"),
});

export const PortfolioUpdateSchema = z.object({
  headline: z.string().transform(sanitizeString).optional(),
  bio: z.string().transform(sanitizeString).optional(),
  projects: z
    .array(
      z.object({
        title: safeString(2, 200, "Project Title"),
        description: safeString(5, 2000, "Project Description"),
        stream: z.string().transform(sanitizeString).default("Ayurveda"),
        link: z.string().transform(sanitizeString).optional(),
        status: z.enum(["Completed", "In Progress"]).default("Completed"),
      })
    )
    .optional(),
  certificates: z
    .array(
      z.object({
        title: safeString(2, 200, "Certificate Title"),
        issuer: safeString(2, 200, "Issuer"),
        issueDate: z.string().transform(sanitizeString),
        credentialUrl: z.string().transform(sanitizeString).optional(),
        verificationStatus: z.enum(["Verified", "Pending Review"]).default("Pending Review"),
      })
    )
    .optional(),
});
