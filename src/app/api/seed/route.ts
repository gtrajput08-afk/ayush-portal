import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Internship } from "@/models/Internship";
import { Application } from "@/models/Application";
import { SkillAssessment } from "@/models/SkillAssessment";
import { DigitalPortfolio } from "@/models/DigitalPortfolio";
import { FdpAndResearch } from "@/models/FdpAndResearch";
import { CandidateEvaluation } from "@/models/CandidateEvaluation";
import bcrypt from "bcryptjs";

export async function GET() {
  return seedData();
}

export async function POST() {
  return seedData();
}

async function seedData() {
  try {
    await connectToDatabase();

    // Clear existing collections for a fresh start
    await Promise.all([
      User.deleteMany({}),
      Internship.deleteMany({}),
      Application.deleteMany({}),
      SkillAssessment.deleteMany({}),
      DigitalPortfolio.deleteMany({}),
      FdpAndResearch.deleteMany({}),
      CandidateEvaluation.deleteMany({}),
    ]);

    const salt = await bcrypt.genSalt(10);
    const defaultPasswordHash = await bcrypt.hash("Password123!", salt);

    // 1. Create Users
    const student1 = await User.create({
      name: "Aarav Sharma",
      email: "ayurveda.student@ayush.edu.in",
      passwordHash: defaultPasswordHash,
      role: "student",
      stream: "Ayurveda",
      institution: "National Institute of Ayurveda, Jaipur",
      designation: "Final Year BAMS Scholar",
      bio: "Passionate about Dravyaguna phytochemistry, pulse diagnostics, and evidence-based Ayurvedic formulation development.",
      isVerified: true,
    });

    const student2 = await User.create({
      name: "Priya Varma",
      email: "yoga.scholar@ayush.edu.in",
      passwordHash: defaultPasswordHash,
      role: "student",
      stream: "Yoga",
      institution: "Morarji Desai National Institute of Yoga, New Delhi",
      designation: "M.Sc. Yogic Sciences Researcher",
      bio: "Specializing in autonomic nervous system regulation through Shatkriyas and clinical HRV biofeedback.",
      isVerified: true,
    });

    const student3 = await User.create({
      name: "Mohammad Zaid",
      email: "unani.researcher@ayush.edu.in",
      passwordHash: defaultPasswordHash,
      role: "student",
      stream: "Unani",
      institution: "National Institute of Unani Medicine, Bengaluru",
      designation: "BUMS Clinician & Researcher",
      bio: "Focusing on Ilaj-bit-Tadbeer (regimental therapy) and humoral Mizaj diagnostic systems.",
      isVerified: true,
    });

    const student4 = await User.create({
      name: "Kavitha Sundaram",
      email: "siddha.student@ayush.edu.in",
      passwordHash: defaultPasswordHash,
      role: "student",
      stream: "Siddha",
      institution: "National Institute of Siddha, Chennai",
      designation: "BSMS Final Year Trainee",
      bio: "Expertise in Varmam pressure point manipulation and mineral calcination (Parpam/Chendooram).",
      isVerified: true,
    });

    const student5 = await User.create({
      name: "Rohan Mukherjee",
      email: "homeopathy.student@ayush.edu.in",
      passwordHash: defaultPasswordHash,
      role: "student",
      stream: "Homeopathy",
      institution: "National Institute of Homoeopathy, Kolkata",
      designation: "BHMS Clinical Intern",
      bio: "Proficient in classical Organon philosophy, Kentian repertorization, and chronic disease miasmatic mapping.",
      isVerified: true,
    });

    // Academicians
    const acadInternal = await User.create({
      name: "Prof. Dr. Rajeshwar Sharma",
      email: "prof.sharma.internal@ayush.edu.in",
      passwordHash: defaultPasswordHash,
      role: "academician",
      mentorType: "internal",
      institution: "All India Institute of Ayurveda (AIIA), New Delhi",
      designation: "Dean of Academic Affairs & Professor of Kayachikitsa",
      bio: "Overseeing student academic progression, clinical competencies, and university-level skill assessments.",
      isVerified: true,
    });

    const acadExternal = await User.create({
      name: "Dr. Ananya Menon",
      email: "dr.menon.external@ayush.edu.in",
      passwordHash: defaultPasswordHash,
      role: "academician",
      mentorType: "external",
      institution: "Central Council for Research in Ayurvedic Sciences (CCRAS)",
      designation: "Senior Scientist & Industry-Academia Liaison Officer",
      bio: "Assessing candidate practical instincts, curiosity, problem-solving abilities, and qualitative research readiness.",
      isVerified: true,
    });

    // Industry Partners
    const industryExternal = await User.create({
      name: "Vikram Singhania",
      email: "dabur.industry@ayush-pharma.com",
      passwordHash: defaultPasswordHash,
      role: "industry",
      mentorType: "external",
      institution: "Dabur Research & Development Foundation",
      designation: "Director of Botanical Formulation & Clinical Trials",
      bio: "Screening high-potential candidates based on real-world problem solving, qualitative evaluations, and practical agility.",
      isVerified: true,
    });

    const industryInternal = await User.create({
      name: "Meera Nair",
      email: "himalaya.talent@ayush-pharma.com",
      passwordHash: defaultPasswordHash,
      role: "industry",
      mentorType: "internal",
      institution: "Himalaya Wellness Company",
      designation: "Head of University Partnerships & Campus Talent",
      bio: "Focusing on verified academic project portfolios, degree track credentials, and institutional campus hiring.",
      isVerified: true,
    });

    // 2. Create Portfolios for Students
    await DigitalPortfolio.create({
      studentId: student1._id,
      headline: "Ayurveda Scholar | Nadi Pariksha & Dravyaguna Specialist",
      bio: "Dedicated BAMS scholar with proven domain test excellence, clinical Panchakarma observation experience, and analytical botany skills.",
      verifiedSkills: [
        {
          name: "Ayurveda Clinical Diagnostics (88%)",
          category: "Diagnostics",
          level: "Advanced",
          verifiedBy: "AYUSH National Assessment Engine",
          badge: "Gold",
        },
        {
          name: "Dravyaguna Phytochemistry",
          category: "Pharmacology",
          level: "Advanced",
          verifiedBy: "National Institute of Ayurveda",
          badge: "Gold",
        },
        {
          name: "Panchakarma Protocol Planning",
          category: "Therapeutics",
          level: "Intermediate",
          verifiedBy: "AIIA Delhi Clinical Board",
          badge: "Silver",
        }
      ],
      certificates: [
        {
          title: "Certificate in Good Manufacturing Practice (GMP - Schedule T)",
          issuer: "Ministry of Ayush & Pharmacopoeia Commission",
          issueDate: "2025-10-12",
          credentialUrl: "https://ayush.gov.in/verify/GMP-AYU-8821",
          verificationStatus: "Verified",
        },
        {
          title: "Ayush Standard Mark Quality Certification",
          issuer: "Quality Council of India (QCI)",
          issueDate: "2026-01-20",
          credentialUrl: "https://qcin.org/ayush/QCI-89210",
          verificationStatus: "Verified",
        }
      ],
      projects: [
        {
          title: "Standardization of Triphala Nano-Suspension",
          description: "Conducted HPTLC fingerprinting and anti-oxidant DPPH assay on customized aqueous-ethanolic botanical extracts.",
          stream: "Ayurveda",
          link: "https://ayushresearch.gov.in/triphala-project",
          status: "Completed",
        },
        {
          title: "Digital Nadi Pariksha Sensor Integration",
          description: "Prototyped a piezoelectric sensor array for recording radial pulse wave velocity mapped to Vata-Pitta-Kapha.",
          stream: "Ayurveda",
          status: "Completed",
        }
      ]
    });

    await DigitalPortfolio.create({
      studentId: student2._id,
      headline: "Yoga & Naturopathy Researcher | Autonomic Physiology",
      bio: "M.Sc. researcher analyzing parasympathetic tone modulation via targeted Pranayama in metabolic syndrome patients.",
      verifiedSkills: [
        {
          name: "Yogic Shatkriya & Asana Therapy (92%)",
          category: "Clinical Yoga",
          level: "Expert",
          verifiedBy: "AYUSH National Assessment Engine",
          badge: "Gold",
        },
        {
          name: "Heart Rate Variability (HRV) Analysis",
          category: "Biomarker Diagnostics",
          level: "Advanced",
          verifiedBy: "MDNIY Clinical Labs",
          badge: "Gold",
        }
      ],
      certificates: [
        {
          title: "Level-3 Certified Yoga Master",
          issuer: "Yoga Certification Board (YCB), Ministry of Ayush",
          issueDate: "2025-08-14",
          credentialUrl: "https://yogacertificationboard.nic.in/cert/YCB-99120",
          verificationStatus: "Verified",
        }
      ],
      projects: [
        {
          title: "Efficacy of Sheetali Pranayama on Hypertension",
          description: "Monitored 40 hypertensive subjects measuring systolic blood pressure and salivary alpha-amylase.",
          stream: "Yoga",
          status: "Completed",
        }
      ]
    });

    await DigitalPortfolio.create({
      studentId: student3._id,
      headline: "Unani Clinician | Ilaj-bit-Tadbeer & Mufradat Formulation",
      bio: "Trained in classical Nabz examination, regimental cupping protocols, and Unani pharmacopoeia extractive validation.",
      verifiedSkills: [
        {
          name: "Unani Mizaj & Pulse Analysis (83%)",
          category: "Diagnostics",
          level: "Advanced",
          verifiedBy: "AYUSH National Assessment Engine",
          badge: "Gold",
        },
        {
          name: "Hijamah Wet Cupping Therapy",
          category: "Regimental Therapy",
          level: "Intermediate",
          verifiedBy: "NIUM Bengaluru",
          badge: "Silver",
        }
      ],
      certificates: [
        {
          title: "Certified Unani Pharmacopoeial Analyst",
          issuer: "Central Council for Research in Unani Medicine",
          issueDate: "2025-12-05",
          credentialUrl: "https://ccrum.res.in/cert/UN-7712",
          verificationStatus: "Verified",
        }
      ],
      projects: [
        {
          title: "Formulation of Polyherbal Khamira Gaozaban",
          description: "Analyzed heavy metal limits via AAS and assessed nootropic markers in simulated murine models.",
          stream: "Unani",
          status: "Completed",
        }
      ]
    });

    // 3. Skill Assessments
    await SkillAssessment.create({
      studentId: student1._id,
      stream: "Ayurveda",
      score: 5,
      totalQuestions: 6,
      percentage: 83,
      answers: [
        { questionId: "ayur-1", questionText: "Early morning Dosha", selectedOption: 2, correctOption: 2, isCorrect: true, category: "Fundamentals" },
        { questionId: "ayur-2", questionText: "Vipaka meaning", selectedOption: 1, correctOption: 1, isCorrect: true, category: "Pharmacology" },
        { questionId: "ayur-3", questionText: "Sarpa Gati pulse", selectedOption: 2, correctOption: 2, isCorrect: true, category: "Diagnostics" },
        { questionId: "ayur-4", questionText: "Pitta Panchakarma", selectedOption: 1, correctOption: 1, isCorrect: true, category: "Clinical Practice" },
        { questionId: "ayur-5", questionText: "Bhasma analytical standards", selectedOption: 0, correctOption: 0, isCorrect: true, category: "Quality & Standardization" },
        { questionId: "ayur-6", questionText: "Triphala components", selectedOption: 0, correctOption: 0, isCorrect: true, category: "Clinical Practice" },
      ],
      gapAnalysis: {
        strengths: ["Mastery in Dravyaguna Pharmacology", "Strong Diagnostic Foundation", "Familiarity with Panchakarma Indications"],
        gaps: ["Advanced Heavy Metal Quantitative Spectroscopy Protocols"],
        recommendations: ["Pursue industrial QC/QA training on ICP-MS instrumentation.", "Participate in CCRAS collaborative clinical trial monitoring."],
      },
    });

    // 4. Create Internships
    const intern1 = await Internship.create({
      postedBy: industryExternal._id,
      title: "Ayush Pharmacovigilance & Drug Safety Intern",
      description: "Join Dabur's National Pharmacovigilance Centre to monitor adverse drug reaction (ADR) reporting, causality assessments, and herbal formulation safety compliance under Ministry of Ayush protocols.",
      requiredSkills: ["Pharmacovigilance", "Dravyaguna", "Schedule T GMP", "Adverse Event Reporting", "Regulatory Documentation"],
      stream: "Ayurveda",
      location: { state: "Delhi NCR", district: "Ghaziabad" },
      stipend: "₹18,000 / month + Certificate",
      duration: "6 Months",
      type: "On-site",
      openings: 3,
      status: "Active",
    });

    const intern2 = await Internship.create({
      postedBy: industryInternal._id,
      title: "Botanical Extraction & Phytochemical R&D Trainee",
      description: "Hands-on industrial training at Himalaya Wellness in supercritical CO2 fluid extraction, TLC/HPTLC fingerprinting of polyherbal actives, and standardization of botanical extracts for global markets.",
      requiredSkills: ["Herbal Extraction", "HPTLC Analysis", "Phytochemistry", "Quality Control", "Standardization"],
      stream: "All",
      location: { state: "Karnataka", district: "Bengaluru" },
      stipend: "₹20,000 / month + Accommodation Assistance",
      duration: "4 Months",
      type: "On-site",
      openings: 4,
      status: "Active",
    });

    const intern3 = await Internship.create({
      postedBy: acadExternal._id,
      title: "Integrative Clinical Research Fellow (Cardiometabolic Care)",
      description: "Collaborative research fellowship at All India Institute of Ayurveda exploring integrated Ayurveda & Yoga protocols for metabolic health. Candidates will assist in GCP-compliant clinical trials.",
      requiredSkills: ["Clinical Trial Protocols", "GCP Guidelines", "Nadi Pariksha", "Patient History Documentation", "Biostatistics"],
      stream: "Ayurveda",
      location: { state: "Delhi", district: "South Delhi" },
      stipend: "₹25,000 / month (Ministry Fellowship)",
      duration: "6 Months",
      type: "Hybrid",
      openings: 2,
      status: "Active",
    });

    const intern4 = await Internship.create({
      postedBy: industryExternal._id,
      title: "Unani Regimental Formulation & QC Analyst",
      description: "Hamdard Laboratories opening for BUMS graduates with strong interest in Ilmul Advia, semi-solid formulation stability (Khamira/Majun), and modern pharmacopoeial testing.",
      requiredSkills: ["Ilmul Advia", "Extractive Value Testing", "Microbial Load Safety", "Formulation Stability"],
      stream: "Unani",
      location: { state: "Uttar Pradesh", district: "Ghaziabad" },
      stipend: "₹17,500 / month",
      duration: "3 Months",
      type: "On-site",
      openings: 2,
      status: "Active",
    });

    const intern5 = await Internship.create({
      postedBy: industryInternal._id,
      title: "Clinical Yoga Therapist & Mind-Body Wellness Coach",
      description: "Conduct structured corporate stress-resilience programs, HRV autonomic testing, and therapeutic Asana-Pranayama modules with digital health tracking.",
      requiredSkills: ["Asana Physiology", "Pranayama Protocols", "HRV Biofeedback", "Client Communication", "Shatkriyas"],
      stream: "Yoga",
      location: { state: "Maharashtra", district: "Mumbai" },
      stipend: "₹22,000 / month",
      duration: "3 Months",
      type: "Hybrid",
      openings: 3,
      status: "Active",
    });

    // 5. Create Applications
    await Application.create({
      studentId: student1._id,
      internshipId: intern1._id,
      status: "Shortlisted",
      coverNote: "I have completed Schedule T GMP training and scored 83% on the national Ayurveda competency assessment. Eager to contribute to Dabur's pharmacovigilance team.",
      mentorFeedback: [
        {
          authorId: industryExternal._id,
          authorName: "Vikram Singhania",
          authorRole: "INDUSTRY (External Mentor)",
          comment: "Candidate exhibits high analytical rigor and genuine enthusiasm for adverse reaction documentation. Strongly shortlisted for technical round.",
          createdAt: new Date(Date.now() - 24 * 3600 * 1000),
        }
      ],
    });

    await Application.create({
      studentId: student1._id,
      internshipId: intern2._id,
      status: "Under Review",
      coverNote: "My project in Triphala nano-suspension and HPTLC extraction aligns directly with Himalaya's botanical extraction mandates.",
      mentorFeedback: [
        {
          authorId: industryInternal._id,
          authorName: "Meera Nair",
          authorRole: "INDUSTRY (Internal Mentor)",
          comment: "Verified student project portfolio matches our extraction lab requirements.",
          createdAt: new Date(),
        }
      ],
    });

    await Application.create({
      studentId: student2._id,
      internshipId: intern5._id,
      status: "Shortlisted",
      coverNote: "Level-3 YCB Certified Yoga Master with practical experience in HRV biomarker assessments and clinical trial setup.",
      mentorFeedback: [
        {
          authorId: industryInternal._id,
          authorName: "Meera Nair",
          authorRole: "INDUSTRY (Internal Mentor)",
          comment: "Outstanding YCB Level-3 credentials and publication track record. Recommended for final interview.",
          createdAt: new Date(),
        }
      ],
    });

    // 6. Qualitative Candidate Evaluations (for Academician External / Industry External)
    await CandidateEvaluation.create({
      studentId: student1._id,
      evaluatorId: acadExternal._id,
      mentorType: "external",
      problemSolving: 5,
      communication: 4,
      curiosity: 5,
      practicalInstincts: 4,
      hiddenGemsNotes: "Aarav demonstrated extraordinary diagnostic instincts during the case study interview. He connected classical Charaka Nidana with contemporary liver enzyme biomarkers effortlessly. A genuine hidden gem for translational R&D!",
      projectsBuiltReview: "Built functional piezoelectric Nadi sensor and Triphala nano-suspension HPTLC assay.",
      overallVerdict: "Strongly Recommended",
    });

    await CandidateEvaluation.create({
      studentId: student2._id,
      evaluatorId: acadExternal._id,
      mentorType: "external",
      problemSolving: 4,
      communication: 5,
      curiosity: 5,
      practicalInstincts: 5,
      hiddenGemsNotes: "Priya combines precise anatomical understanding of autonomic nerves with deep traditional mastery of Shatkriyas. Highly coachable and articulate.",
      projectsBuiltReview: "Conducted 40-patient clinical HRV trial with robust biostatistical analysis.",
      overallVerdict: "Strongly Recommended",
    });

    // 7. FDP & Research Opportunities
    await FdpAndResearch.create({
      postedBy: acadInternal._id,
      type: "FDP",
      title: "Faculty Development Program: Modernizing AYUSH Curriculum with Schedule T GMP & AI Tools",
      description: "A 5-day AICTE & NCISM approved National FDP for AYUSH faculty focusing on integrating digital assessment frameworks, computational phytochemistry, and pharmacopeial compliance into BAMS/MD syllabus.",
      stream: "All",
      eligibility: "AYUSH Faculty members, Associate Professors, and Ph.D. Guides",
      fundingAmount: "Ministry of Ayush Sponsored (No registration fee)",
      duration: "5 Days (Hybrid)",
      status: "Open",
    });

    await FdpAndResearch.create({
      postedBy: acadExternal._id,
      type: "Research Project",
      title: "Multicentric Clinical Trial: Standardization of Polyherbal Anti-Diabetic Formulations",
      description: "Inviting proposals for ICMR-CCRAS joint multicentric randomized controlled trial evaluating glycemic control and HbA1c trajectory across 500 pre-diabetic patients.",
      stream: "Ayurveda",
      eligibility: "Medical Institutions with NABH/NABL accredited hospitals",
      fundingAmount: "₹45 Lakhs Grant",
      duration: "18 Months",
      status: "Open",
    });

    await FdpAndResearch.create({
      postedBy: industryExternal._id,
      type: "Consultancy",
      title: "Industry Consultancy: Botanical Supply Chain Traceability & Geo-Tagging Standards",
      description: "Dabur R&D invites academic consultants to build botanical origin verification protocols and DNA barcoding methodologies for rare medicinal plants sourced from Himalayan foothills.",
      stream: "All",
      eligibility: "Senior Botanists, Pharmacognosy Specialists, and Phytochemists",
      fundingAmount: "₹12 Lakhs Retainer",
      duration: "12 Months",
      status: "Open",
    });

    return NextResponse.json({
      message: "Database seeded successfully with rich AYUSH MVP data!",
      credentials: [
        { role: "Student (Ayurveda)", email: "ayurveda.student@ayush.edu.in", password: "Password123!" },
        { role: "Student (Yoga)", email: "yoga.scholar@ayush.edu.in", password: "Password123!" },
        { role: "Student (Unani)", email: "unani.researcher@ayush.edu.in", password: "Password123!" },
        { role: "Academician (Internal)", email: "prof.sharma.internal@ayush.edu.in", password: "Password123!" },
        { role: "Academician (External)", email: "dr.menon.external@ayush.edu.in", password: "Password123!" },
        { role: "Industry (External)", email: "dabur.industry@ayush-pharma.com", password: "Password123!" },
        { role: "Industry (Internal)", email: "himalaya.talent@ayush-pharma.com", password: "Password123!" },
      ],
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message || "Failed to seed database" }, { status: 500 });
  }
}
