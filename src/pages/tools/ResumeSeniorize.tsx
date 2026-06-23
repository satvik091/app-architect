import ToolPage from "@/components/ToolPage";

const ResumeSeniorize = () => (
  <ToolPage
    title="Make My Resume Sound More Senior"
    description="Reframe your resume for a senior role — leadership, strategy, ownership, and business impact."
    toolType="resume-seniorize"
    inputFields={[
      { key: "Target Role", label: "Target Senior Role", placeholder: "e.g. Director of Engineering", type: "input" },
      { key: "Resume", label: "Your Resume (PDF)", placeholder: "Upload your resume PDF", type: "pdf" },
      { key: "Leadership Experience", label: "Leadership Experience", placeholder: "Teams led, mentorship, cross-functional initiatives", type: "textarea" },
      { key: "Business Impact", label: "Business Impact", placeholder: "Revenue, cost savings, strategic outcomes", type: "textarea" },
    ]}
  />
);

export default ResumeSeniorize;
