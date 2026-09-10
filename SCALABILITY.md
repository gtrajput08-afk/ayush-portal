# Scalability & Architectural Blueprint

**Project:** AYUSH Academia-Industry Collaboration Portal (SIH PS 26044)  
**Target Capacity:** Multi-Million Active Students, Faculty & Enterprise Recruiters  
**Infrastructure Model:** Cloud-Native Serverless & Distributed NoSQL Database  

---

## 1. High-Level Architecture

The portal is designed around a **stateless, horizontally scalable serverless architecture** backed by a **globally distributed, indexed NoSQL data layer**:

```
[ Clients (Web & Mobile) ]
           │
           ▼ (CDN / Edge Caching & Anycast DNS)
[ Vercel Serverless Compute Layer ]
    ├── Edge Middleware (RBAC & Auth Verification)
    ├── Next.js App Router (React Server Components)
    └── Stateless API Route Handlers
           │
           ▼ (Connection Pooling & Mongoose Caching)
[ MongoDB Atlas Distributed Cloud Cluster ]
    ├── Compound Indexes for Fast Filter / Sort
    ├── Read Replicas for High-Read Operations
    └── Auto-Sharding Support by Stream / Institution
```

---

## 2. Core Scalability Pillars

### 2.1 Serverless Auto-Scaling Compute (Vercel)
* **On-Demand Concurrency:** Every API endpoint runs as an isolated serverless function that scales automatically from 0 to thousands of concurrent requests in milliseconds.
* **Zero Idle Server Costs:** Eliminates fixed single-server bottlenecks (such as monolithic Node.js thread blocking).
* **Global Edge Network:** Static assets, translations, and cached dashboard views are distributed across worldwide CDN edge nodes for sub-50ms latency.

---

### 2.2 Database Indexing & Query Optimization (MongoDB Atlas)
To guarantee fast query performance under millions of records, compound and targeted indexes have been provisioned across all collections:

| Collection | Indexed Fields | Purpose |
| :--- | :--- | :--- |
| **`User`** | `{ email: 1 }` (Unique), `{ role: 1, stream: 1 }`, `{ role: 1, mentorType: 1 }` | Instant login verification & fast cohort filtering by stream. |
| **`Internship`** | `{ stream: 1, status: 1, createdAt: -1 }`, `{ "location.state": 1, "location.district": 1 }` | Fast multi-criteria job search and location-based filtering. |
| **`Application`** | `{ studentId: 1, internshipId: 1 }` (Unique), `{ internshipId: 1, status: 1 }` | Prevents duplicate applications & powers recruiter candidate tracking. |
| **`CandidateEvaluation`** | `{ studentId: 1, evaluatorId: 1 }`, `{ studentId: 1, createdAt: -1 }` | Quick evaluation retrieval for student portfolio rendering. |
| **`SkillAssessment`** | `{ studentId: 1, stream: 1, createdAt: -1 }` | Efficient retrieval of historical quiz scores and gap analytics. |
| **`DigitalPortfolio`** | `{ studentId: 1 }` (Unique) | O(1) single-document retrieval of verified credentials and badges. |
| **`FdpAndResearch`** | `{ type: 1, stream: 1, status: 1 }` | Fast discovery of faculty grants and research opportunities. |

---

### 2.3 Pagination & Bounded Memory Queries
* **Standard Limit:** All list endpoints default to **20 items per page** with skip-limit or cursor-based streaming.
* **Endpoints with Pagination:**
  - `GET /api/internships` (`page`, `limit`, `total`, `totalPages`, `hasMore`)
  - `GET /api/internships/[id]/applicants`
  - `GET /api/academician/students`
  - `GET /api/fdp-research`
* **Impact:** Prevents unbounded memory bloat and high payload transfer sizes even when tables contain hundreds of thousands of postings or applicants.

---

### 2.4 Graceful Degradation & Network Resilience
* **Loading Skeletons:** Animated skeleton components (`loading.tsx`) prevent UI flashing during slow network conditions.
* **Error Boundaries (`error.tsx`):** Isolated component boundaries ensure that a localized failure never crashes the entire application.

---

## 3. Roadmap to 10 Million Users

1. **Redis / Upstash Caching Layer:** Cache static skill quiz questions, FDP listings, and public stream taxonomies with a 1-hour TTL.
2. **MongoDB Atlas Database Sharding:** Partition student portfolios and assessment collections by `stream` and `institutionId`.
3. **Asynchronous Notification Queue:** Offload email dispatch and certificate PDF generation to background serverless worker queues (e.g. AWS SQS / QStash).
