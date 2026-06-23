import ToolPage from "@/components/ToolPage";

const MasterResume = () => (
  <ToolPage
    title="Create a Master Resume"
    description="Build a comprehensive master resume with categorized skills, achievement library, and a per-application tailoring guide."
    toolType="master-resume"
    inputFields={[
      { key: "Work History", label: "Full Work History", placeholder: "All roles, companies, dates, responsibilities", type: "textarea" },
      { key: "Skills", label: "Skills", placeholder: "Hard and soft skills, comma-separated", type: "textarea" },
      { key: "Tools", label: "Tools & Tech", placeholder: "All tools, platforms, frameworks", type: "textarea" },
      { key: "Achievements", label: "Achievements", placeholder: "Wins across your career", type: "textarea" },
      { key: "Industries", label: "Target Industries", placeholder: "e.g. SaaS, Healthcare, Fintech", type: "input" },
      { key: "Job Titles", label: "Target Job Titles", placeholder: "e.g. PM, Senior PM, Product Lead", type: "input" },
    ]}
  />
);

export default MasterResume;
