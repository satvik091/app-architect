import ToolPage from "@/components/ToolPage";

const ResumeTailor = () => (
  <ToolPage
    title="Tailor My Resume"
    description="Rewrite your resume for a target job title using the job description. ATS-optimized with role-matched bullets and keywords."
    toolType="resume-tailor"
    inputFields={[
      { key: "Job Title", label: "Target Job Title", placeholder: "e.g. Senior Product Manager", type: "input" },
      { key: "Resume", label: "Your Resume (PDF)", placeholder: "Upload your resume PDF", type: "pdf" },
      { key: "Job Description", label: "Job Description (PDF)", placeholder: "Upload the JD PDF", type: "pdf" },
    ]}
  />
);

export default ResumeTailor;
