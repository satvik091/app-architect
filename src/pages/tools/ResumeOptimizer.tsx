import ToolPage from "@/components/ToolPage";

const ResumeOptimizer = () => (
  <ToolPage
    title="Resume Optimizer"
    description="Upload your resume PDF and target job title to get an ATS-optimized version."
    toolType="resume-optimize"
    inputFields={[
      { key: "Target Job Title", label: "Target Job Title", placeholder: "e.g. Senior Software Engineer", type: "input" },
      { key: "Resume", label: "Your Resume (PDF)", placeholder: "Upload your resume PDF", type: "pdf" },
    ]}
  />
);

export default ResumeOptimizer;
