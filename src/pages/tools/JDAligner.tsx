import ToolPage from "@/components/ToolPage";

const JDAligner = () => (
  <ToolPage
    title="JD Aligner"
    description="Match your resume against a job description to get alignment scores and improvement suggestions."
    toolType="jd-align"
    inputFields={[
      { key: "Resume", label: "Your Resume", placeholder: "Paste your resume text...", type: "textarea" },
      { key: "Job Description", label: "Job Description", placeholder: "Paste the job description...", type: "textarea" },
    ]}
  />
);

export default JDAligner;
