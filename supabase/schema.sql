-- ====================================================================
-- AYUSH ACADEMIA-INDUSTRY PORTAL
-- Smart India Hackathon | Problem Statement 26044 (Ministry of Ayush)
-- Database Schema & Row Level Security (RLS) Policies
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS (Profiles table extending Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('student', 'academician', 'industry')),
    stream TEXT CHECK (stream IN ('Ayurveda', 'Yoga', 'Unani', 'Siddha', 'Homeopathy')),
    mentor_type TEXT CHECK (mentor_type IN ('internal', 'external')),
    institution_or_company TEXT,
    is_verified BOOLEAN DEFAULT false,
    phone TEXT,
    location TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. INTERNSHIPS & JOB OPPORTUNITIES
CREATE TABLE IF NOT EXISTS public.internships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    posted_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    required_skills TEXT[] NOT NULL DEFAULT '{}',
    stream TEXT NOT NULL CHECK (stream IN ('Ayurveda', 'Yoga', 'Unani', 'Siddha', 'Homeopathy', 'All')),
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    stipend TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Full-time', 'Internship', 'Research Fellow')),
    duration TEXT DEFAULT '3 Months',
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. APPLICATIONS
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    internship_id UUID NOT NULL REFERENCES public.internships(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'Applied' CHECK (status IN ('Applied', 'Under Review', 'Shortlisted', 'Rejected')),
    cover_note TEXT,
    mentor_feedback TEXT,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(student_id, internship_id)
);

-- 4. SKILL ASSESSMENTS & GAP ANALYSIS
CREATE TABLE IF NOT EXISTS public.skill_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    stream TEXT NOT NULL,
    score NUMERIC(5,2) NOT NULL,
    total_questions INTEGER NOT NULL,
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    gap_analysis JSONB NOT NULL DEFAULT '{}'::jsonb,
    recommendations TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. DIGITAL PORTFOLIOS
CREATE TABLE IF NOT EXISTS public.digital_portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    verified_skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    certificates JSONB NOT NULL DEFAULT '[]'::jsonb,
    projects JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_verified BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. FACULTY DEVELOPMENT PROGRAMS & RESEARCH (FDP & RESEARCH)
CREATE TABLE IF NOT EXISTS public.fdp_and_research (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    posted_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    author_institution TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('FDP', 'Research', 'Consultancy')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    stream TEXT NOT NULL,
    department TEXT,
    duration TEXT,
    eligibility TEXT,
    deadline DATE,
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. QUALITATIVE CANDIDATE EVALUATIONS
CREATE TABLE IF NOT EXISTS public.candidate_evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    evaluator_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    evaluator_name TEXT NOT NULL,
    mentor_type TEXT NOT NULL CHECK (mentor_type IN ('internal', 'external')),
    problem_solving INTEGER NOT NULL CHECK (problem_solving BETWEEN 1 AND 5),
    communication INTEGER NOT NULL CHECK (communication BETWEEN 1 AND 5),
    curiosity INTEGER NOT NULL CHECK (curiosity BETWEEN 1 AND 5),
    practical_instincts INTEGER NOT NULL CHECK (practical_instincts BETWEEN 1 AND 5),
    hidden_gems_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- 1. Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fdp_and_research ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_evaluations ENABLE ROW LEVEL SECURITY;

-- 2. USERS Policies
CREATE POLICY "Users can read all public profiles" 
ON public.users FOR SELECT USING (true);

CREATE POLICY "Users can update only their own profile" 
ON public.users FOR UPDATE USING (auth.uid() = id);

-- 3. INTERNSHIPS Policies
CREATE POLICY "Anyone can view active internships" 
ON public.internships FOR SELECT USING (true);

CREATE POLICY "Industry users can create internships" 
ON public.internships FOR INSERT 
WITH CHECK (
    auth.uid() = posted_by AND 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'industry')
);

CREATE POLICY "Industry users can update their own internships" 
ON public.internships FOR UPDATE 
USING (auth.uid() = posted_by);

-- 4. APPLICATIONS Policies
CREATE POLICY "Students can view their own applications" 
ON public.applications FOR SELECT 
USING (
    auth.uid() = student_id OR
    EXISTS (
        SELECT 1 FROM public.internships 
        WHERE internships.id = applications.internship_id AND internships.posted_by = auth.uid()
    ) OR
    EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'academician'
    )
);

CREATE POLICY "Students can submit applications" 
ON public.applications FOR INSERT 
WITH CHECK (
    auth.uid() = student_id AND
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'student')
);

CREATE POLICY "Industry posters can update applicant status and feedback" 
ON public.applications FOR UPDATE 
USING (
    EXISTS (
        SELECT 1 FROM public.internships 
        WHERE internships.id = applications.internship_id AND internships.posted_by = auth.uid()
    )
);

-- 5. SKILL ASSESSMENTS Policies
CREATE POLICY "Students can view their own skill assessments" 
ON public.skill_assessments FOR SELECT 
USING (
    auth.uid() = student_id OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('academician', 'industry'))
);

CREATE POLICY "Students can record their assessment" 
ON public.skill_assessments FOR INSERT 
WITH CHECK (auth.uid() = student_id);

-- 6. DIGITAL PORTFOLIOS Policies
CREATE POLICY "Public read for portfolios" 
ON public.digital_portfolios FOR SELECT USING (true);

CREATE POLICY "Students can manage their own portfolio" 
ON public.digital_portfolios FOR ALL 
USING (auth.uid() = student_id);

-- 7. FDP & RESEARCH Policies
CREATE POLICY "Anyone can view FDP and Research opportunities" 
ON public.fdp_and_research FOR SELECT USING (true);

CREATE POLICY "Academicians can post FDP & Research" 
ON public.fdp_and_research FOR INSERT 
WITH CHECK (
    auth.uid() = posted_by AND
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'academician')
);

-- 8. CANDIDATE EVALUATIONS Policies
CREATE POLICY "Evaluations viewable by academicians, industry, and evaluated student" 
ON public.candidate_evaluations FOR SELECT 
USING (
    auth.uid() = student_id OR
    auth.uid() = evaluator_id OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('academician', 'industry'))
);

CREATE POLICY "Mentors can insert candidate evaluations" 
ON public.candidate_evaluations FOR INSERT 
WITH CHECK (
    auth.uid() = evaluator_id AND
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('academician', 'industry'))
);
