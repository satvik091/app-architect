# JobFit AI – Smart Career Tools

AI-powered career toolkit that helps job seekers optimize resumes, align with job descriptions, prepare for interviews, and more.

## Features

- **Resume Optimizer** – Upload your resume (PDF) and get ATS optimization scores, keyword analysis, and rewritten bullet points.
- **JD Aligner** – Compare your resume against a job description to find skill gaps and alignment scores.
- **Interview Prep** – Generate 10 role-specific STAR-format interview questions with model answers.
- **Cover Letter Generator** – Create tailored, compelling cover letters from your resume and a job description.
- **LinkedIn Optimizer** – Get optimized headlines, About sections, and skill recommendations for your LinkedIn profile.
- **Job Search Planner** – Generate a structured 7-day job search action plan.
- **Resume Ranker** – Upload multiple resumes and a job description to rank candidates by fit score.
- **Saved Documents** – Save, view, and manage all AI-generated outputs.
- **PDF Export** – Download any generated result as a text file.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend:** Lovable Cloud (Supabase) – authentication, database, edge functions
- **AI:** Google Gemini via Lovable AI gateway (streaming responses)
- **PDF Parsing:** pdfjs-dist (client-side text extraction)

## Getting Started

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm i
npm run dev
```

## Project Structure

```
src/
├── components/       # Reusable UI components (PdfUpload, ToolPage, DashboardLayout)
├── contexts/         # Auth context
├── hooks/            # Custom hooks
├── lib/              # Utilities (PDF parsing, AI streaming, helpers)
├── pages/            # Route pages (Auth, Dashboard, tools/*)
│   └── tools/        # Individual AI tool pages
└── integrations/     # Supabase client & types

supabase/
└── functions/
    └── jobfit-ai/    # Edge function handling all AI tool requests
```

## Deployment

[Open [JOBFIT ATS](https://lovable.dev) and click **Share → Publish**.](https://jobfitats.netlify.app/)
