import ToolPage from "@/components/ToolPage";

const CareerChange = () => (
  <ToolPage
    title="Rewrite for a Career Change"
    description="Reposition your resume from your current role to a target role using transferable skills and the target JD."
    toolType="career-change"
    inputFields={[
      { key: "Current Role", label: "Current Role", placeholder: "e.g. Teacher", type: "input" },
      { key: "Target Role", label: "Target Role", placeholder: "e.g. UX Researcher", type: "input" },
      { key: "Background", label: "Your Background / Resume Notes", placeholder: "Summarize your experience, skills, projects", type: "textarea" },
      { key: "Job Description", label: "Target Job Description (PDF)", placeholder: "Upload the JD PDF", type: "pdf" },
    ]}
  />
);

export default CareerChange;
