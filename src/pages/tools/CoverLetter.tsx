import ToolPage from "@/components/ToolPage";

const CoverLetter = () => (
  <ToolPage
    title="Cover Letter Generator"
    description="Upload the job description PDF and your resume to generate a tailored cover letter."
    toolType="cover-letter"
    inputFields={[
      { key: "Job Title and Company", label: "Job Title & Company", placeholder: "e.g. Senior Engineer at Stripe", type: "input" },
      { key: "Job Description", label: "Job Description (PDF)", placeholder: "Upload the job description PDF", type: "pdf" },
      { key: "Your Background", label: "Your Resume (PDF)", placeholder: "Upload your resume PDF", type: "pdf" },
    ]}
  />
);

export default CoverLetter;
