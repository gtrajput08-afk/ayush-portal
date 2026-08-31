export interface QuizQuestion {
  id: string;
  stream: "Ayurveda" | "Yoga" | "Unani" | "Siddha" | "Homeopathy";
  category: "Fundamentals" | "Diagnostics" | "Pharmacology" | "Clinical Practice" | "Quality & Standardization";
  question: string;
  options: string[];
  correctOption: number; // 0-indexed
  explanation: string;
}

export const AYUSH_QUESTIONS: Record<string, QuizQuestion[]> = {
  Ayurveda: [
    {
      id: "ayur-1",
      stream: "Ayurveda",
      category: "Fundamentals",
      question: "According to Ayurveda, which Dosha is predominant in the early morning and in the first stage of life (childhood)?",
      options: ["Vata Dosha", "Pitta Dosha", "Kapha Dosha", "Rakta Dhatu"],
      correctOption: 2,
      explanation: "Kapha is characterized by heaviness and stability, predominating during morning hours (6am-10am) and the childhood growth stage."
    },
    {
      id: "ayur-2",
      stream: "Ayurveda",
      category: "Pharmacology",
      question: "In Dravyaguna Vijnana, what does 'Vipaka' refer to in the assessment of a medicinal herb?",
      options: ["Immediate taste on the tongue", "Post-digestive metabolic taste effect", "Therapeutic potency (Hot/Cold)", "Specific action on disease (Prabhava)"],
      correctOption: 1,
      explanation: "Vipaka is the transformed taste of food or drug after digestion, classified into Madhura, Amla, and Katu."
    },
    {
      id: "ayur-3",
      stream: "Ayurveda",
      category: "Diagnostics",
      question: "Which of the following pulse patterns (Nadi Pariksha) is traditionally compared to the movement of a snake (Sarpa Gati)?",
      options: ["Kapha pulse", "Pitta pulse", "Vata pulse", "Sannipata pulse"],
      correctOption: 2,
      explanation: "Vata Nadi feels thin, rapid, irregular, and moves crookedly like a serpent (Sarpa Gati)."
    },
    {
      id: "ayur-4",
      stream: "Ayurveda",
      category: "Clinical Practice",
      question: "In classical Panchakarma therapy, which procedure is specifically indicated for vitiated Pitta dosha located in the Amashaya and Pakvashaya?",
      options: ["Vamana (Therapeutic Emesis)", "Virechana (Therapeutic Purgation)", "Nasya (Nasal Instillation)", "Raktamokshana (Bloodletting)"],
      correctOption: 1,
      explanation: "Virechana is the premier detoxification therapy for eliminating excess Pitta from the liver, gallbladder, and small intestine."
    },
    {
      id: "ayur-5",
      stream: "Ayurveda",
      category: "Quality & Standardization",
      question: "Which standard analytical method is mandated in the Ayurvedic Pharmacopoeia of India (API) to detect heavy metal safety in Rasashastra Bhasma formulations?",
      options: ["Varitara & Rekhapurnata tests plus AAS/ICP-MS", "Paper Chromatography only", "Refractometry index only", "Specific gravity testing only"],
      correctOption: 0,
      explanation: "Classical organoleptic tests (Varitara, Rekhapurnata) combined with modern AAS/ICP-MS elemental analysis ensure Bhasma non-toxicity."
    },
    {
      id: "ayur-6",
      stream: "Ayurveda",
      category: "Clinical Practice",
      question: "Triphala Churna consists of equal parts of which three classical botanical fruits?",
      options: ["Haritaki, Bibhitaki, Amalaki", "Ashwagandha, Shatavari, Gokhru", "Neem, Tulsi, Giloy", "Brahmi, Shankhpushpi, Vacha"],
      correctOption: 0,
      explanation: "Triphala is an iconic formulation combining Terminalia chebula (Haritaki), Terminalia bellirica (Bibhitaki), and Phyllanthus emblica (Amalaki)."
    }
  ],
  Yoga: [
    {
      id: "yoga-1",
      stream: "Yoga",
      category: "Fundamentals",
      question: "According to Patanjali's Yoga Sutras, what is the correct sequential order of the eight limbs (Ashtanga Yoga)?",
      options: [
        "Asana, Pranayama, Yama, Niyama, Pratyahara, Dharana, Dhyana, Samadhi",
        "Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi",
        "Niyama, Yama, Pranayama, Asana, Dharana, Dhyana, Pratyahara, Samadhi",
        "Yama, Niyama, Pratyahara, Asana, Pranayama, Dharana, Dhyana, Samadhi"
      ],
      correctOption: 1,
      explanation: "The 8 limbs begin with external and internal moral codes (Yama, Niyama) followed by physical and energetic mastery (Asana, Pranayama)."
    },
    {
      id: "yoga-2",
      stream: "Yoga",
      category: "Diagnostics",
      question: "Which Pranayama technique produces a cooling physiological response and lowers body temperature and systolic blood pressure?",
      options: ["Surya Bhedana", "Bhastrika", "Sheetali / Sheetkari", "Kapalabhati"],
      correctOption: 2,
      explanation: "Sheetali and Sheetkari pranayama draw air across moist tongue/teeth, stimulating parasympathetic tone and reducing metabolic heat."
    },
    {
      id: "yoga-3",
      stream: "Yoga",
      category: "Clinical Practice",
      question: "In Yogic therapy and Shatkriyas, 'Jala Neti' primarily targets which anatomical and therapeutic objective?",
      options: ["Purification of lower colon", "Cleansing of nasopharyngeal passages and frontal sinuses", "Gastric mucosal detoxification", "Retinal and optic nerve strengthening"],
      correctOption: 1,
      explanation: "Jala Neti uses isotonic saline to clear mucus, allergens, and debris from the nasal mucosa and upper respiratory pathways."
    },
    {
      id: "yoga-4",
      stream: "Yoga",
      category: "Quality & Standardization",
      question: "In clinical Yoga research, what biomarker is most commonly measured to demonstrate autonomic nervous system regulation following mindfulness meditation?",
      options: ["Heart Rate Variability (HRV) and salivary cortisol", "Serum creatinine", "Blood urea nitrogen", "Alkaline phosphatase"],
      correctOption: 0,
      explanation: "High vagal tone and parasympathetic dominance are validated by increased HRV and decreased serum/salivary cortisol levels."
    },
    {
      id: "yoga-5",
      stream: "Yoga",
      category: "Fundamentals",
      question: "In Naturopathy, which vital principle states that 'The body heals itself and acute disease is a corrective effort of nature'?",
      options: ["Theory of Toxemia (Enervation)", "Vis Medicatrix Naturae (Healing Power of Nature)", "Hydrotherapy law of contrast", "Pancha Mahabhuta balance"],
      correctOption: 1,
      explanation: "Vis Medicatrix Naturae asserts that the organism possesses intrinsic self-regulatory mechanisms when unobstructed by toxins."
    },
    {
      id: "yoga-6",
      stream: "Yoga",
      category: "Clinical Practice",
      question: "Which yogic asana is contraindicated in patients with severe lumbar disc herniation and sciatica during acute flare-up?",
      options: ["Bhujangasana (Gentle Cobra)", "Paschimottanasana (Intense Forward Fold)", "Makarasana (Crocodile pose)", "Setu Bandhasana (Supported Bridge)"],
      correctOption: 1,
      explanation: "Extreme lumbar flexion (forward bending) increases intradiscal pressure and can aggravate posterior disc protrusions."
    }
  ],
  Unani: [
    {
      id: "unani-1",
      stream: "Unani",
      category: "Fundamentals",
      question: "In Unani Tibb, what are the four essential humors (Akhlat) described by Buqrat (Hippocrates) and Ibn Sina (Avicenna)?",
      options: [
        "Dam (Blood), Balgham (Phlegm), Safra (Yellow Bile), Sauda (Black Bile)",
        "Ruh (Spirit), Aza (Organs), Quwa (Faculties), Af'al (Functions)",
        "Arkan (Elements), Mizaj (Temperament), Akhlat (Humors), Aza (Organs)",
        "Hararat, Buroodat, Yuboosat, Ratoobat"
      ],
      correctOption: 0,
      explanation: "The Humoral Theory posits health as the equilibrium of Dam (Sanguine), Balgham (Phlegmatic), Safra (Choleric), and Sauda (Melancholic)."
    },
    {
      id: "unani-2",
      stream: "Unani",
      category: "Diagnostics",
      question: "How is 'Nabz' (Pulse) systematically analyzed in classical Unani diagnosis?",
      options: [
        "By 10 specific parameters (Ajnas-e-Nabz) including volume, strength, velocity, and consistency",
        "By pulse rate count per minute only",
        "By stethoscope sound amplification only",
        "By infrared temperature scanning"
      ],
      correctOption: 0,
      explanation: "Unani physicians evaluate 10 Ajnas-e-Nabz (e.g., Miqdar, Qawi, Sari/Bati, Layyin/Salb) to pinpoint humoral dyscrasia."
    },
    {
      id: "unani-3",
      stream: "Unani",
      category: "Clinical Practice",
      question: "Which regimental therapy (Ilaj-bit-Tadbeer) corresponds to therapeutic cupping with scarification in Unani medicine?",
      options: ["Hammam (Turkish Bath)", "Hijamah bil Shart (Wet Cupping)", "Fasd (Venesection)", "Dalk (Massage)"],
      correctOption: 1,
      explanation: "Hijamah bil Shart involves vacuum cups followed by superficial micro-incisions to evacuate morbid toxic humors."
    },
    {
      id: "unani-4",
      stream: "Unani",
      category: "Pharmacology",
      question: "In Unani pharmacology (Ilmul Advia), what is the key therapeutic action of 'Khamira Gaozaban Ambari'?",
      options: ["Muqawwi-e-Qalb wa Dimagh (Tonic for Heart and Brain)", "Mus-hil (Strong Purgative)", "Mudirr-e-Baul (Diuretic)", "Habis-e-Dam (Hemostatic)"],
      correctOption: 0,
      explanation: "Khamira Gaozaban is a classical semi-solid cardiac and neuroprotective formulation formulated with Onosma bracteatum and amber."
    },
    {
      id: "unani-5",
      stream: "Unani",
      category: "Quality & Standardization",
      question: "What is the primary marker used for standardizing Unani herbal decoction formulations (Joshanda)?",
      options: ["Total solids, TLC/HPTLC fingerprinting and microbial load safety", "Color index only", "Taste perception only", "Viscosity index only"],
      correctOption: 0,
      explanation: "Unani Pharmacopoeial standards mandate HPTLC chemical profiling, extractive values, and heavy metal/aflatoxin limits."
    },
    {
      id: "unani-6",
      stream: "Unani",
      category: "Fundamentals",
      question: "What are the 'Asbab-e-Sittah Zarooriyyah' in Unani medicine?",
      options: [
        "Six essential lifestyle factors for maintaining health (Air, Food & Drink, Movement & Rest, Sleep, Retention & Evacuation, Mental States)",
        "Six cardinal pulse beats",
        "Six botanical plant parts",
        "Six types of toxic fevers"
      ],
      correctOption: 0,
      explanation: "These six essential prerequisites form the bedrock of Unani preventive medicine and holistic lifestyle regulation."
    }
  ],
  Siddha: [
    {
      id: "sid-1",
      stream: "Siddha",
      category: "Fundamentals",
      question: "In Siddha medicine, what are the three bodily humors (Mukkuttram) that govern human physiology?",
      options: ["Vali (Vatham), Azhal (Pitham), Iyyam (Kapham)", "Mann, Neer, Thee", "Vaan, Kaatru, Nilam", "Muppu, Guru, Kuligai"],
      correctOption: 0,
      explanation: "The balance of Vali (Vatham - kinetic), Azhal (Pitham - thermal/transformative), and Iyyam (Kapham - structural) determines health."
    },
    {
      id: "sid-2",
      stream: "Siddha",
      category: "Diagnostics",
      question: "What is 'Envagai Thervu' in Siddha clinical methodology?",
      options: [
        "Eight-fold examination system (Na, Niram, Mozhi, Vizhi, Malam, Moothiram, Naadi, Sparisam)",
        "Eight surgical procedures",
        "Eight varieties of medicinal plants",
        "Eight types of salt purification"
      ],
      correctOption: 0,
      explanation: "Envagai Thervu comprises tongue, color, voice, eyes, feces, urine examination (including oil drop Neerkkuri), pulse, and touch."
    },
    {
      id: "sid-3",
      stream: "Siddha",
      category: "Pharmacology",
      question: "Which high-order Siddha medicinal preparation involves metallic/mineral calcination to yield a micro-fine oxide (Chendooram / Parpam)?",
      options: ["Kashayam", "Parpam & Chendooram (Nanoscale mineral medicines)", "Thailam", "Lehyam"],
      correctOption: 1,
      explanation: "Parpam (white calx) and Chendooram (red calx) are esoteric Siddha nanomedicines prepared through extensive calcination cycles (Pudam)."
    },
    {
      id: "sid-4",
      stream: "Siddha",
      category: "Clinical Practice",
      question: "What is 'Varmam Therapy' (Varma Maruthuvam) in the Siddha system?",
      options: [
        "Manipulative healing via vital neuro-muscular pressure points (Varmam locations)",
        "Herbal steam bath application only",
        "Dietary fasting regimen only",
        "Mineral purification using cow urine"
      ],
      correctOption: 0,
      explanation: "Varma therapy focuses on 108 vital energy hubs where bone, muscle, nerve, and blood vessels converge."
    },
    {
      id: "sid-5",
      stream: "Siddha",
      category: "Quality & Standardization",
      question: "Nilavembu Kudineer, a renowned Siddha polyherbal decoction used during viral fevers, has which herb as its chief constituent?",
      options: ["Andrographis paniculata (Nilavembu / King of Bitters)", "Ocimum sanctum (Thulasi)", "Zingiber officinale (Inji)", "Piper nigrum (Milagu)"],
      correctOption: 0,
      explanation: "Andrographis paniculata provides robust immunostimulatory and antiviral diterpenoid lactones (andrographolides)."
    },
    {
      id: "sid-6",
      stream: "Siddha",
      category: "Fundamentals",
      question: "What is the ultimate objective of 'Kayakalpa' therapy in Siddha tradition?",
      options: [
        "Rejuvenation, cellular longevity, and immunity against aging and degenerative disease",
        "Immediate symptomatic fever relief",
        "Temporary pain suppression",
        "Palliative wound dressing"
      ],
      correctOption: 0,
      explanation: "Kayakalpa is the science of immortality/rejuvenation (Kayam = Body, Kalpam = Everlasting / Transformed)."
    }
  ],
  Homeopathy: [
    {
      id: "hom-1",
      stream: "Homeopathy",
      category: "Fundamentals",
      question: "What is the foundational law of Homeopathy formulated by Dr. Christian Friedrich Samuel Hahnemann?",
      options: [
        "Similia Similibus Curentur (Like Cures Like)",
        "Contraria Contrariis Curentur (Opposites cure opposites)",
        "Theory of Spontaneous Generation",
        "Principle of Maximum Dose Concentration"
      ],
      correctOption: 0,
      explanation: "The Law of Similars states that a substance capable of producing symptoms in a healthy person can cure similar symptoms in a sick person."
    },
    {
      id: "hom-2",
      stream: "Homeopathy",
      category: "Pharmacology",
      question: "In Homeopathic Pharmacy, what process liberates the dynamic curative power of a drug through serial dilution and succussion/trituration?",
      options: ["Potentization (Dynamization)", "Centrifugation", "Pasteurization", "Saponification"],
      correctOption: 0,
      explanation: "Potentization involves systematic mechanical succussion with alcohol or trituration with lactose milk sugar."
    },
    {
      id: "hom-3",
      stream: "Homeopathy",
      category: "Fundamentals",
      question: "According to Hahnemann's Chronic Diseases, what is the fundamental non-venereal root Miasm responsible for the vast majority of chronic ailments?",
      options: ["Psora", "Sycosis", "Syphilis", "Tubercular"],
      correctOption: 0,
      explanation: "Hahnemann identified Psora (the internal itch miasm) as the primary mother miasm underlying functional disease vulnerability."
    },
    {
      id: "hom-4",
      stream: "Homeopathy",
      category: "Clinical Practice",
      question: "What is Hering's Law of Cure in Homeopathic case follow-up and prognosis?",
      options: [
        "Healing progresses from above downward, within outward, from more important organs to less important, and in reverse order of appearance",
        "Symptoms vanish randomly without predictable sequence",
        "Skin eruptions must be suppressed with external ointments first",
        "Physical symptoms disappear before mental symptoms"
      ],
      correctOption: 0,
      explanation: "Constantine Hering formulated this fundamental trajectory confirming true holistic constitutional cure rather than disease suppression."
    },
    {
      id: "hom-5",
      stream: "Homeopathy",
      category: "Diagnostics",
      question: "What is a 'Repertory' in Homeopathic clinical decision making?",
      options: [
        "A systematically arranged systematic index of symptoms and their corresponding homeopathic medicines",
        "A textbook of toxic poisons only",
        "A surgical atlas of human anatomy",
        "A prescription ledger for pharmacy records"
      ],
      correctOption: 0,
      explanation: "Repertories (e.g., Kent, Boenninghausen, Synthesis) allow clinicians to analyze complex symptom rubrics to find the similimum."
    },
    {
      id: "hom-6",
      stream: "Homeopathy",
      category: "Quality & Standardization",
      question: "In the Homeopathic Pharmacopoeia of India (HPI), how is a 'Mother Tincture' designated?",
      options: ["With the Greek symbol Theta (Q or θ) or MT", "With the letter 'X' only", "With '30C' designation", "With 'LM1' scale"],
      correctOption: 0,
      explanation: "Mother Tinctures are designated with 'θ' or 'Q' representing the base ethanolic extract of botanical or animal origin."
    }
  ]
};

export function evaluateQuiz(stream: string, answers: { questionId: string; selectedOption: number }[]) {
  const questions = AYUSH_QUESTIONS[stream] || AYUSH_QUESTIONS.Ayurveda;
  let correctCount = 0;
  const answeredDetails: {
    questionId: string;
    questionText: string;
    selectedOption: number;
    correctOption: number;
    isCorrect: boolean;
    category: string;
  }[] = [];

  const categoryScores: Record<string, { correct: number; total: number }> = {};

  questions.forEach((q) => {
    if (!categoryScores[q.category]) {
      categoryScores[q.category] = { correct: 0, total: 0 };
    }
    categoryScores[q.category].total += 1;

    const userAns = answers.find((a) => a.questionId === q.id);
    const selected = userAns !== undefined ? userAns.selectedOption : -1;
    const isCorrect = selected === q.correctOption;

    if (isCorrect) {
      correctCount += 1;
      categoryScores[q.category].correct += 1;
    }

    answeredDetails.push({
      questionId: q.id,
      questionText: q.question,
      selectedOption: selected,
      correctOption: q.correctOption,
      isCorrect,
      category: q.category,
    });
  });

  const totalQuestions = questions.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const strengths: string[] = [];
  const gaps: string[] = [];
  const recommendations: string[] = [];

  Object.entries(categoryScores).forEach(([cat, stat]) => {
    const catPercent = (stat.correct / stat.total) * 100;
    if (catPercent >= 75) {
      strengths.push(`Strong mastery in ${cat} (${stat.correct}/${stat.total} correct)`);
    } else {
      gaps.push(`Needs reinforcement in ${cat} (${stat.correct}/${stat.total} correct)`);
      if (cat === "Fundamentals") {
        recommendations.push(`Review classical ${stream} Samhitas and core philosophical tenets.`);
      } else if (cat === "Diagnostics") {
        recommendations.push(`Participate in clinical Nadi/Envagai/Pulse diagnostic workshops and practical sessions.`);
      } else if (cat === "Pharmacology") {
        recommendations.push(`Study drug standardization, Dravyaguna/Ilmul Advia pharmacodynamics, and formulation monographs.`);
      } else if (cat === "Clinical Practice") {
        recommendations.push(`Seek hands-on internship exposure in hospital OPD/IPD protocols and Panchakarma/Regimental therapies.`);
      } else if (cat === "Quality & Standardization") {
        recommendations.push(`Complete certified training in Pharmacopoeia analytical testing, GMP norms, and Ayush Standard Mark validation.`);
      }
    }
  });

  if (strengths.length === 0) {
    strengths.push(`Foundational familiarity with ${stream} nomenclature`);
  }
  if (recommendations.length === 0) {
    recommendations.push(`Excellent mastery! Explore advanced research fellowships and industry-sponsored clinical trials.`);
  }

  return {
    score: correctCount,
    totalQuestions,
    percentage,
    answers: answeredDetails,
    gapAnalysis: {
      strengths,
      gaps,
      recommendations,
    },
  };
}
