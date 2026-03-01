import ToolPage from "@/components/ToolPage";

const ResumeRanker = () => (
  <ToolPage
    title="Resume Ranker"
    description="Upload a job description PDF and multiple resume PDFs to rank candidates by fit."
    toolType="resume-rank"
    inputFields={[
      { key: "Job Description", label: "Job Description (PDF)", placeholder: "Upload the job description PDF", type: "pdf" },
      { key: "Resumes", label: "Candidate Resumes (Multiple PDFs)", placeholder: "Upload multiple resume PDFs", type: "pdf-multiple" },
    ]}
  />
);

export default ResumeRanker;
