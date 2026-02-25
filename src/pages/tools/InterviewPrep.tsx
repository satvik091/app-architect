import ToolPage from "@/components/ToolPage";

const InterviewPrep = () => (
  <ToolPage
    title="Interview Prep"
    description="Generate 10 role-specific interview questions with structured STAR-format answers."
    toolType="interview-prep"
    inputFields={[
      { key: "Target Role", label: "Target Role", placeholder: "e.g. Product Manager at Google", type: "input" },
      { key: "Experience Summary", label: "Your Experience Summary", placeholder: "Briefly describe your relevant experience...", type: "textarea" },
    ]}
  />
);

export default InterviewPrep;
