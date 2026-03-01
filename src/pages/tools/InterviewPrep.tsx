import ToolPage from "@/components/ToolPage";

const InterviewPrep = () => (
  <ToolPage
    title="Interview Prep"
    description="Upload a job description PDF and your experience to generate STAR-format interview prep."
    toolType="interview-prep"
    inputFields={[
      { key: "Target Role", label: "Target Role", placeholder: "e.g. Product Manager at Google", type: "input" },
      { key: "Experience Summary", label: "Your Experience (PDF)", placeholder: "Upload your resume or experience PDF", type: "pdf" },
    ]}
  />
);

export default InterviewPrep;
