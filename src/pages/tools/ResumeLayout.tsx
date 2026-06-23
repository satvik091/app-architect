import ToolPage from "@/components/ToolPage";

const ResumeLayout = () => (
  <ToolPage
    title="Improve My Resume Layout"
    description="Get a recruiter-friendly review: what to keep, remove, reorder, and improve — plus a clean outline."
    toolType="resume-layout"
    inputFields={[
      { key: "Job Title", label: "Target Job Title", placeholder: "e.g. Product Designer", type: "input" },
      { key: "Resume", label: "Your Resume (PDF)", placeholder: "Upload your resume PDF", type: "pdf" },
    ]}
  />
);

export default ResumeLayout;
