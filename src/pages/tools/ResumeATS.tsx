import ToolPage from "@/components/ToolPage";

const ResumeATS = () => (
  <ToolPage
    title="Optimize My Resume for ATS"
    description="Compare your resume against a job description, find keyword and skill gaps, and get an ATS-friendly rewrite."
    toolType="resume-ats"
    inputFields={[
      { key: "Resume", label: "Your Resume (PDF)", placeholder: "Upload your resume PDF", type: "pdf" },
      { key: "Job Description", label: "Job Description (PDF)", placeholder: "Upload the JD PDF", type: "pdf" },
    ]}
  />
);

export default ResumeATS;
