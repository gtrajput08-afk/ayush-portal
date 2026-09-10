# Security Architecture & Hardening Guide

**Project:** AYUSH Academia-Industry Collaboration Portal (SIH PS 26044)  
**Security Posture:** Enterprise-Grade / OWASP Compliant  
**Framework:** Next.js 14 App Router, Mongoose ODM, MongoDB Atlas Cloud  

---

## 1. Executive Security Summary

This document details the security controls, authentication safeguards, and defensive measures implemented in the AYUSH Academia-Industry Portal to protect clinical assessments, verified credentials, and institutional datasets against unauthorized access, injection attacks, and identity theft.

---

## 2. Security Controls & Implementations

### 2.1 Password Hashing & Key Derivation (Bcrypt)
* **Algorithm:** `bcryptjs` with salt round factor `10`.
* **Zero Plain-text Storage:** Passwords are never stored or logged in plain text. Hashing occurs prior to database write operations.
* **Exact Implementation Locations:**
  - **`src/app/api/auth/signup/route.ts` (Lines 32–34):**
    ```typescript
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    ```
  - **`src/app/api/auth/login/route.ts` (Lines 31–32):**
    ```typescript
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    ```
  - **`src/app/api/seed/route.ts` (Line 24):**
    ```typescript
    const defaultPassword = await bcrypt.hash("Password123!", 10);
    ```

---

### 2.2 Strict Input Validation & XSS/NoSQL Injection Sanitization (Zod)
Every API endpoint parsing client payloads enforces typed schema parsing with input sanitization:
* **Schema Definition Location:** `src/lib/validations.ts`
* **Sanitization Engine:**
  - Automatically strips `<script>`, `<iframe>`, and residual HTML tags.
  - Neutralizes `javascript:` URI schemes and inline event attributes (`onerror=`, `onclick=`).
  - Rejects NoSQL operator injections (e.g. `{ $gt: "" }`, `{ $ne: null }`).
* **Endpoints Enforcing Zod Validation:**
  - `POST /api/auth/signup` (`SignupSchema`)
  - `POST /api/auth/login` (`LoginSchema`)
  - `POST /api/internships` (`InternshipCreateSchema`)
  - `POST /api/internships/[id]/apply` (`ApplicationCreateSchema`)
  - `PATCH /api/internships/[id]/applicants` (`ApplicationStatusSchema`)
  - `POST /api/skills/quiz` (`QuizSubmitSchema`)
  - `POST /api/academician/evaluate` (`CandidateEvaluationSchema`)
  - `POST /api/fdp-research` (`FdpCreateSchema`)
  - `PUT /api/student/portfolio` (`PortfolioUpdateSchema`)

---

### 2.3 Rate Limiting & Anti-Brute-Force Protection
* **Module:** `src/lib/rateLimit.ts`
* **Policy:** Maximum **5 requests per client IP within a 15-minute sliding window** on authentication endpoints (`/api/auth/login` and `/api/auth/signup`).
* **Response:** Returns `HTTP 429 Too Many Requests` with a standard `Retry-After` header.
* **Memory Management:** Expired IP rate limit windows are automatically garbage-collected every 5 minutes.

---

### 2.4 Backend Role-Based Access Control (RBAC) & Middleware Protection
* **Next.js Edge Middleware (`src/middleware.ts`):**
  - Intercepts all traffic to `/student/*`, `/academician/*`, and `/industry/*`.
  - Verifies presence and expiration of JWT session tokens before page rendering.
  - Prevents logged-out users from viewing dashboard shells or quiz routes.
  - Enforces cross-role isolation (e.g., student accounts cannot access `/academician` or `/industry`).
* **API Route Gatekeepers (`src/lib/auth.ts`):**
  - Cryptographically verifies JWT signature on every incoming serverless request.
  - Returns `HTTP 401 Unauthorized` or `HTTP 403 Forbidden` if role privileges are insufficient.

---

### 2.5 Secure JWT Token & HttpOnly Cookie Management
* **Token Structure:** Signed JWT payload containing `userId`, `email`, `role`, `stream`, `mentorType`, `name`.
* **Token Expiry:** 7 days (`expiresIn: "7d"`).
* **Storage Standard:** Delivered via **`HttpOnly` cookies (`ayush_token`)**:
  - `httpOnly: true` (Inaccessible to browser JavaScript, mitigating XSS token extraction).
  - `sameSite: "lax"` (Mitigates Cross-Site Request Forgery / CSRF).
  - `secure: true` in production (Transmitted exclusively over TLS/HTTPS).

---

### 2.6 Demo Persona Isolation & Sandbox Mode
* **Separation:** Demo login profiles are clearly distinguished from live production user accounts.
* **UI Indicator:** Displays an isolated `⚠️ Demo Sandbox Session` banner on the dashboard.
* **Security:** Demo accounts are partitioned so that guest evaluators cannot overwrite production institutional postings.

---

### 2.7 Environment Variables & Secrets Management
* **Zero Hardcoded Secrets:** `MONGODB_URI` and `JWT_SECRET` are read exclusively from environment variables (`.env.local` / Vercel Environment Configuration).
* **Git Hygiene:** `.env.local` is listed in `.gitignore` to prevent accidental version control leaks.
