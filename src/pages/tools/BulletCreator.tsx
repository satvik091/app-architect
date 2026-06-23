import ToolPage from "@/components/ToolPage";

const BulletCreator = () => (
  <ToolPage
    title="Create Resume Bullets"
    description="Turn raw work notes and results into 5–7 strong, measurable resume bullets for your target role."
    toolType="bullet-create"
    inputFields={[
      { key: "Job Title", label: "Job Title (current)", placeholder: "e.g. Operations Lead", type: "input" },
      { key: "Company", label: "Company", placeholder: "e.g. Acme Logistics", type: "input" },
      { key: "Target Role", label: "Target Role", placeholder: "e.g. Senior Operations Manager", type: "input" },
      { key: "Notes", label: "Raw Work Notes", placeholder: "What you did day-to-day, projects, responsibilities", type: "textarea" },
      { key: "Achievements", label: "Results / Achievements", placeholder: "Wins, metrics, outcomes", type: "textarea" },
    ]}
  />
);

export default BulletCreator;
