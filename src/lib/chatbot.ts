export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}

export function generateCareerMentorResponse(userMessage: string, stream: string = "Ayurveda"): ChatMessage {
  const query = userMessage.toLowerCase();
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (query.includes("career") || query.includes("job") || query.includes("future") || query.includes("scope")) {
    return {
      id: "bot-" + Date.now(),
      sender: "bot",
      text: `For a graduate in **${stream}**, there are 4 primary high-growth career tracks in 2026:
1. **Clinical Practice & Super-Specialty**: OPD/IPD establishment, integrative wellness resorts, and hospital consultancy.
2. **Ayush Industrial & Pharma R&D**: Roles in formulation development, Pharmacovigilance (ADR monitoring), QC/QA, and Phytochemistry.
3. **Government & Research Fellowships**: AIAPGET for MD/MS, Research Officer positions in CCRAS/CCRH/CCRUM/CCRS, and Medical Officer (UPSC/State PSC).
4. **Ayush Startups & Digital Health**: Telemedicine, standardized nutraceutical brands, and wellness tech backed by the Ministry of Ayush Champion Schemes.`,
      timestamp: time,
      suggestedActions: ["How to prepare for AIAPGET?", "Top Pharma R&D Roles", "Internship Opportunities", "Ayush Startup Grants"],
    };
  }

  if (query.includes("exam") || query.includes("aiapget") || query.includes("pg") || query.includes("higher study") || query.includes("md")) {
    return {
      id: "bot-" + Date.now(),
      sender: "bot",
      text: `### AIAPGET & PG Research Preparation Strategy:
- **Core Samhitas / Canonical Texts**: Focus on Brihat Trayee (Charaka, Sushruta, Vagbhata) or equivalent texts for your stream.
- **Contemporary Research Methodology & Biostatistics**: 15-20% of modern PG entrance questions evaluate clinical trial design, GCP-Ayush, and sample size calculations.
- **Pharmacopoeia Standards**: Regularly review API/UPI/SPI monographs and recent NCISM clinical guidelines.
- **Mock Assessments**: Take weekly timed domain quizzes right here on the portal to benchmark your score!`,
      timestamp: time,
      suggestedActions: ["Take Stream Quiz", "View Offline Exam Schedule", "Browse PG Degree Tracks"],
    };
  }

  if (query.includes("startup") || query.includes("funding") || query.includes("business") || query.includes("entrepreneur")) {
    return {
      id: "bot-" + Date.now(),
      sender: "bot",
      text: `### Entrepreneurship & Ayush Incubation:
- **Ministry of Ayush Innovation Schemes**: Grants up to ₹50 Lakhs are available under BIRAC-Ayush Bio-incubators and AYURGYAN.
- **Regulatory Clearances**: FSSAI Nutraceutical licensing or Ayush State Drug Licensing Authority (GMP Schedule T compliance).
- **External Mentorship**: Use the External Mentor track on this portal to connect with industry manufacturing leaders for formulation scaling and pilot batch validation.`,
      timestamp: time,
      suggestedActions: ["View External Mentor Track", "Industry GMP Certifications", "Post Research Project"],
    };
  }

  if (query.includes("internship") || query.includes("apply") || query.includes("industry")) {
    return {
      id: "bot-" + Date.now(),
      sender: "bot",
      text: `### Finding High-Impact AYUSH Internships:
1. Explore the **Internship & Job Search** tab on your dashboard to view openings tailored to ${stream}.
2. Make sure your **Digital Portfolio** has verified skills and certificates in GMP, clinical pharmacology, or diagnostic techniques.
3. Industry mentors review qualitative problem-solving ratings, so completing portal assessments increases your placement readiness score!`,
      timestamp: time,
      suggestedActions: ["Browse Internships Now", "Update Digital Portfolio", "Take Skill Assessment"],
    };
  }

  // Default intelligent response
  return {
    id: "bot-" + Date.now(),
    sender: "bot",
    text: `Hello! I am your **AYUSH Virtual Career Mentor**. 🌿
I can guide you on:
- Career opportunities and clinical specializations in **${stream}**
- Industrial internships (GMP, QA/QC, Pharmacovigilance, Clinical Trials)
- Competitive exams (AIAPGET, CCRAS/CCRH/CCRS Research Fellowships)
- Building a verified Digital Portfolio for top academia & industry recognition

What topic would you like to explore today?`,
    timestamp: time,
    suggestedActions: ["Top Career Options", "Internship Opportunities", "Preparation for AIAPGET", "Ayush Startup Funding"],
  };
}
