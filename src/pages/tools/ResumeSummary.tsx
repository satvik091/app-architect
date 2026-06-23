import ToolPage from "@/components/ToolPage";

const ResumeSummary = () => (
  <ToolPage
    title="Build a Resume Summary"
    description="Generate short, standard, and ATS-optimized resume summaries tailored to your background."
    toolType="resume-summary"
    inputFields={[
      { key: "Job Title", label: "Target Job Title", placeholder: "e.g. Marketing Manager", type: "input" },
      { key: "Years", label: "Years of Experience", placeholder: "e.g. 6", type: "input" },
      { key: "Industry", label: "Industry", placeholder: "e.g. B2B SaaS", type: "input" },
      { key: "Skills", label: "Core Skills", placeholder: "Comma-separated list", type: "textarea" },
      { key: "Achievements", label: "Top Achievements", placeholder: "Notable wins (one per line)", type: "textarea" },
      { key: "Tools", label: "Tools & Tech", placeholder: "e.g. HubSpot, SQL, Figma", type: "textarea" },
    ]}
  />
);

export default ResumeSummary;
