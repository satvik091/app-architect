import ToolPage from "@/components/ToolPage";

const JDAligner = () => (
  <ToolPage
    title="JD Aligner"
    description="Upload your resume and job description PDFs to get alignment scores and improvement suggestions."
    toolType="jd-align"
    inputFields={[
      { key: "Resume", label: "Your Resume (PDF)", placeholder: "Upload your resume PDF", type: "pdf" },
      { key: "Job Description", label: "Job Description (PDF)", placeholder: "Upload the job description PDF", type: "pdf" },
    ]}
  />
);

export default JDAligner;
