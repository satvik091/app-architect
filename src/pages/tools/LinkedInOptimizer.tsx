import ToolPage from "@/components/ToolPage";

const LinkedInOptimizer = () => (
  <ToolPage
    title="LinkedIn Optimizer"
    description="Upload your current LinkedIn profile PDF to optimize your headline, about section, and skills."
    toolType="linkedin-optimize"
    inputFields={[
      { key: "Current LinkedIn About", label: "LinkedIn Profile (PDF)", placeholder: "Upload your LinkedIn profile PDF", type: "pdf" },
      { key: "Target Role", label: "Target Role", placeholder: "e.g. Data Scientist", type: "input" },
    ]}
  />
);

export default LinkedInOptimizer;
