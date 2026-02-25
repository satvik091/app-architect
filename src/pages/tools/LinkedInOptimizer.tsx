import ToolPage from "@/components/ToolPage";

const LinkedInOptimizer = () => (
  <ToolPage
    title="LinkedIn Optimizer"
    description="Optimize your About section, headline, and skills for maximum recruiter visibility."
    toolType="linkedin-optimize"
    inputFields={[
      { key: "Current LinkedIn About", label: "Current LinkedIn About", placeholder: "Paste your current About section...", type: "textarea" },
      { key: "Target Role", label: "Target Role", placeholder: "e.g. Data Scientist", type: "input" },
    ]}
  />
);

export default LinkedInOptimizer;
